import axios from 'axios';
import { cruisemapperScraper, CruiseMapperItinerary, CruiseMapperStop } from './cruisemapper-scraper';

/**
 * Sistema Híbrido de Scraping de Itinerários
 * Fonte primária: CruiseMapper (dados reais)
 * Fonte secundária: Nominatim (coordenadas de portos)
 */

export interface ScrapedItinerary {
  shipName: string;
  itineraryName: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  ports: ScrapedPort[];
  source: 'cruisemapper' | 'official_website' | 'pdf' | 'api' | 'ais';
  confidence: number;
  priceFrom?: string;
  departurePort?: string;
}

export interface ScrapedPort {
  name: string;
  city?: string;
  country?: string;
  arrivalTime?: string;
  departureTime?: string;
  dayNumber: number;
  latitude?: number;
  longitude?: number;
  isEmbarkation?: boolean;
  isDisembarkation?: boolean;
}

export class CruiseMapperSource {
  async scrapeItineraries(companyName: string, shipName: string): Promise<ScrapedItinerary[]> {
    try {
      const shipSlug = shipName.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
      const rawItineraries = await cruisemapperScraper.fetchItinerariesForShip(shipSlug);
      return rawItineraries.map(itin => this.convert(itin, shipName));
    } catch (error) {
      console.error(`[HybridScraper] Erro CruiseMapper ${shipName}:`, error);
      return [];
    }
  }

  async scrapeByExactSlug(cruisemapperSlug: string, shipName: string): Promise<ScrapedItinerary[]> {
    try {
      const rawItineraries = await cruisemapperScraper.fetchItinerariesForShip(cruisemapperSlug);
      const stops = await cruisemapperScraper.fetchCurrentItineraryStops(cruisemapperSlug);

      return rawItineraries.map((itin, idx) => {
        const result = this.convert(itin, shipName);
        if (idx === 0 && stops.length > 0) {
          result.ports = stops.map(s => ({
            name: s.portName,
            arrivalTime: s.arrivalTime,
            departureTime: s.departureTime,
            dayNumber: s.dayNumber,
            isEmbarkation: s.isEmbarkation,
            isDisembarkation: s.isDisembarkation,
          }));
        }
        return result;
      });
    } catch (error) {
      console.error(`[HybridScraper] Erro slug ${cruisemapperSlug}:`, error);
      return [];
    }
  }

  private convert(raw: CruiseMapperItinerary, shipName: string): ScrapedItinerary {
    const endDate = new Date(raw.startDate);
    endDate.setDate(endDate.getDate() + raw.duration);
    return {
      shipName,
      itineraryName: raw.name,
      startDate: raw.startDate,
      endDate,
      duration: raw.duration,
      ports: raw.stops.map(s => ({
        name: s.portName,
        arrivalTime: s.arrivalTime,
        departureTime: s.departureTime,
        dayNumber: s.dayNumber,
        isEmbarkation: s.isEmbarkation,
        isDisembarkation: s.isDisembarkation,
      })),
      source: 'cruisemapper',
      confidence: 90,
      priceFrom: raw.priceFrom,
      departurePort: raw.departurePort,
    };
  }
}

export class PortAPIClient {
  private cache = new Map<string, { lat: number; lng: number; city: string; country: string }>();

  async getPortInfo(portName: string): Promise<{ latitude: number; longitude: number; city: string; country: string } | null> {
    const key = portName.toLowerCase().trim();
    if (this.cache.has(key)) {
      const c = this.cache.get(key)!;
      return { latitude: c.lat, longitude: c.lng, city: c.city, country: c.country };
    }

    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: { q: `${portName} port cruise`, format: 'json', limit: 1 },
        headers: { 'User-Agent': 'Dockly-CruiseMapper/1.0' },
        timeout: 8000,
      });

      if (response.data?.length > 0) {
        const result = response.data[0];
        const parts = result.display_name.split(',').map((p: string) => p.trim());
        const data = {
          lat: parseFloat(result.lat),
          lng: parseFloat(result.lon),
          city: parts[0],
          country: parts[parts.length - 1],
        };
        this.cache.set(key, data);
        return { latitude: data.lat, longitude: data.lng, city: data.city, country: data.country };
      }
      return null;
    } catch {
      return null;
    }
  }

  async enrichPortsWithCoordinates(ports: ScrapedPort[]): Promise<ScrapedPort[]> {
    const enriched: ScrapedPort[] = [];
    for (const port of ports) {
      const isSeaDay = ['navigation', 'navega', 'at sea', 'sea day'].some(k =>
        port.name.toLowerCase().includes(k)
      );
      if (isSeaDay || (port.latitude && port.longitude)) {
        enriched.push(port);
        continue;
      }
      const info = await this.getPortInfo(port.name);
      enriched.push(info ? { ...port, latitude: info.latitude, longitude: info.longitude, city: port.city || info.city, country: port.country || info.country } : port);
      await new Promise(r => setTimeout(r, 1100)); // Rate limit Nominatim
    }
    return enriched;
  }
}

export class HybridScraperOrchestrator {
  private cruisemapperSource = new CruiseMapperSource();
  private portAPI = new PortAPIClient();

  async scrapeItineraries(companyName: string, shipName: string): Promise<ScrapedItinerary[]> {
    const results: ScrapedItinerary[] = [];

    try {
      console.log(`[Orchestrator] CruiseMapper → ${companyName} / ${shipName}`);
      const data = await this.cruisemapperSource.scrapeItineraries(companyName, shipName);
      if (data.length > 0) {
        console.log(`[Orchestrator] ${data.length} itinerários encontrados`);
        results.push(...data);
      }
    } catch (error) {
      console.error('[Orchestrator] CruiseMapper falhou:', error);
    }

    for (const itin of results) {
      if (itin.ports.length > 0) {
        itin.ports = await this.portAPI.enrichPortsWithCoordinates(itin.ports);
      }
    }

    return results.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  }

  async scrapeByExactSlug(cruisemapperSlug: string, shipName: string): Promise<ScrapedItinerary[]> {
    const results = await this.cruisemapperSource.scrapeByExactSlug(cruisemapperSlug, shipName);
    for (const itin of results) {
      if (itin.ports.length > 0) {
        itin.ports = await this.portAPI.enrichPortsWithCoordinates(itin.ports);
      }
    }
    return results;
  }

  async getPortCoordinates(portName: string) {
    return this.portAPI.getPortInfo(portName);
  }

  async getCompanyShips(companyName: string) {
    const slug = cruisemapperScraper.COMPANY_MAP[companyName];
    if (!slug) return [];
    return cruisemapperScraper.fetchShipsForCompany(slug);
  }

  async parsePDFItinerary(_pdfUrl: string): Promise<ScrapedItinerary | null> {
    console.log('[Orchestrator] PDF parsing não implementado');
    return null;
  }
}

export const hybridScraper = new HybridScraperOrchestrator();
