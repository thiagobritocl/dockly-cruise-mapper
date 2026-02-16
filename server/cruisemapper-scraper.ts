import axios from 'axios';
import * as cheerio from 'cheerio';
import * as db from './db';

/**
 * CruiseMapper Scraper
 * Coleta itinerários reais diretamente do CruiseMapper
 * Estrutura HTML identificada:
 *   - Lista de navios: /cruise-lines/[Company-Name]-[ID]  → ul.ships-list li h3 a
 *   - Itinerários do navio: /ships/[Ship-Name]-[ID]       → table#itinerary tr
 *   - Paradas do itinerário: /ships/[Ship-Name]-[ID]?itinerary=[ID] → table.schedule tr
 */

const BASE_URL = 'https://www.cruisemapper.com';

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
  'Cache-Control': 'no-cache',
  Referer: 'https://www.cruisemapper.com/',
};

// Mapeamento de companhias no banco -> slug do CruiseMapper
export const COMPANY_CRUISEMAPPER_MAP: Record<string, string> = {
  'Royal Caribbean': 'Royal-Caribbean-1',
  'Carnival Cruise Line': 'Carnival-Cruise-Line-9',
  'MSC Cruises': 'MSC-Cruises-13',
  'Norwegian Cruise Line': 'Norwegian-Cruise-Line-15',
  'Disney Cruise Line': 'Disney-Cruise-Line-5',
  'Celebrity Cruises': 'Celebrity-Cruises-4',
};

export interface CruiseMapperItinerary {
  cruisemapperShipSlug: string;
  name: string;
  startDate: Date;
  duration: number;
  departurePort: string;
  priceFrom?: string;
  stops: CruiseMapperStop[];
}

export interface CruiseMapperStop {
  portName: string;
  portUrl?: string;
  date: string;
  arrivalTime?: string;
  departureTime?: string;
  dayNumber: number;
  isEmbarkation?: boolean;
  isDisembarkation?: boolean;
}

export interface CruiseMapperShip {
  name: string;
  cruisemapperSlug: string;
  cruisemapperId: string;
  imageUrl?: string;
  yearBuilt?: number;
  passengers?: number;
  currentCruise?: string;
}

/**
 * Busca lista de navios de uma companhia no CruiseMapper
 */
export async function fetchShipsForCompany(companyCruisemapperSlug: string): Promise<CruiseMapperShip[]> {
  const url = `${BASE_URL}/cruise-lines/${companyCruisemapperSlug}`;
  console.log(`[CruiseMapper] Buscando navios: ${url}`);

  try {
    const response = await axios.get(url, { headers: HEADERS, timeout: 15000 });
    const $ = cheerio.load(response.data);
    const ships: CruiseMapperShip[] = [];

    // Navios estão em cards com links no padrão /ships/Ship-Name-ID
    $('ul.ships-list li, .ships-grid li, .ship-card, li').each((_, el) => {
      const $el = $(el);
      const link = $el.find('h3 a').first();
      const href = link.attr('href') || '';

      // Filtrar apenas links de navios
      if (!href.includes('/ships/')) return;

      const shipName = link.text().trim();
      if (!shipName) return;

      // Extrair slug e ID do navio: /ships/Ship-Name-1067 → Ship-Name-1067
      const match = href.match(/\/ships\/(.+)/);
      if (!match) return;

      const fullSlug = match[1];
      const idMatch = fullSlug.match(/-(\d+)$/);
      const cruisemapperId = idMatch ? idMatch[1] : '';

      // Pegar imagem do card
      const imgSrc = $el.find('img').first().attr('src') || '';
      const imageUrl = imgSrc.startsWith('http') ? imgSrc : imgSrc ? `${BASE_URL}${imgSrc}` : undefined;

      // Pegar ano de construção
      const yearText = $el.find('td').filter((_, td) => $(td).prev().text().includes('Year build')).text();
      const yearMatch = yearText.match(/(\d{4})/);
      const yearBuilt = yearMatch ? parseInt(yearMatch[1]) : undefined;

      // Pegar capacidade
      const passText = $el.find('td').filter((_, td) => $(td).prev().text().includes('Passengers')).text();
      const passMatch = passText.match(/(\d+)/);
      const passengers = passMatch ? parseInt(passMatch[1]) : undefined;

      // Cruzeiro atual
      const currentCruise = $el.find('.current-cruise, p').first().text().trim();

      ships.push({
        name: shipName,
        cruisemapperSlug: fullSlug,
        cruisemapperId,
        imageUrl,
        yearBuilt,
        passengers,
        currentCruise: currentCruise || undefined,
      });
    });

    console.log(`[CruiseMapper] ${ships.length} navios encontrados para ${companyCruisemapperSlug}`);
    return ships;
  } catch (error) {
    console.error(`[CruiseMapper] Erro ao buscar navios de ${companyCruisemapperSlug}:`, error);
    return [];
  }
}

/**
 * Busca itinerários de um navio específico no CruiseMapper
 */
export async function fetchItinerariesForShip(shipCruisemapperSlug: string): Promise<CruiseMapperItinerary[]> {
  const url = `${BASE_URL}/ships/${shipCruisemapperSlug}`;
  console.log(`[CruiseMapper] Buscando itinerários: ${url}`);

  try {
    const response = await axios.get(url, { headers: HEADERS, timeout: 15000 });
    const $ = cheerio.load(response.data);
    const itineraries: CruiseMapperItinerary[] = [];

    // A tabela de itinerários fica na seção #itinerary
    // Estrutura: | Date | Itinerary | Departure Port | From |
    let foundTable = false;

    $('table').each((_, table) => {
      const $table = $(table);
      const headers = $table.find('th').map((_, th) => $(th).text().trim().toLowerCase()).get();

      // Identificar a tabela de itinerários pelos cabeçalhos
      const isItineraryTable =
        headers.some(h => h.includes('date')) &&
        headers.some(h => h.includes('itinerary') || h.includes('cruise'));

      if (!isItineraryTable) return;
      foundTable = true;

      $table.find('tbody tr, tr').each((_, row) => {
        const $row = $(row);
        const cells = $row.find('td').map((_, td) => $(td).text().trim()).get();

        if (cells.length < 2) return;

        // Formato da data: "2026 Jan 04" ou "2026 Jan"
        const dateStr = cells[0]?.trim();
        if (!dateStr || !dateStr.match(/^\d{4}/)) return;

        const itineraryName = cells[1]?.trim() || '';
        const departurePort = cells[2]?.trim() || '';
        const priceFrom = cells[3]?.trim() || undefined;

        // Parse de duração: "7 days" ou "14 days" no nome
        const durationMatch = itineraryName.match(/(\d+)\s*days?/i);
        const duration = durationMatch ? parseInt(durationMatch[1]) : 7;

        // Parse da data de início
        let startDate: Date;
        try {
          startDate = new Date(dateStr.replace(/(\d{4})\s+(\w+)\s+(\d+)/, '$2 $3, $1'));
          if (isNaN(startDate.getTime())) {
            // Formato alternativo: "2026 Jan" (sem dia)
            startDate = new Date(`${dateStr.split(' ').slice(0, 2).join(' ')} 01`);
          }
          if (isNaN(startDate.getTime())) return;
        } catch {
          return;
        }

        itineraries.push({
          cruisemapperShipSlug: shipCruisemapperSlug,
          name: itineraryName,
          startDate,
          duration,
          departurePort,
          priceFrom,
          stops: [], // Stops são buscados separadamente se necessário
        });
      });
    });

    if (!foundTable) {
      console.log(`[CruiseMapper] Tabela de itinerários não encontrada para ${shipCruisemapperSlug}, tentando parsear seção #itinerary`);
    }

    console.log(`[CruiseMapper] ${itineraries.length} itinerários encontrados para ${shipCruisemapperSlug}`);
    return itineraries;
  } catch (error) {
    console.error(`[CruiseMapper] Erro ao buscar itinerários de ${shipCruisemapperSlug}:`, error);
    return [];
  }
}

/**
 * Busca as paradas detalhadas do itinerário ATUAL de um navio
 * (a seção "Current itinerary" que tem tabela com Date/Time e Port)
 */
export async function fetchCurrentItineraryStops(shipCruisemapperSlug: string): Promise<CruiseMapperStop[]> {
  const url = `${BASE_URL}/ships/${shipCruisemapperSlug}`;

  try {
    const response = await axios.get(url, { headers: HEADERS, timeout: 15000 });
    const $ = cheerio.load(response.data);
    const stops: CruiseMapperStop[] = [];

    // A tabela de paradas fica na seção "Current itinerary"
    // Estrutura: | Date / Time | Port |
    $('table').each((_, table) => {
      const $table = $(table);
      const headers = $table.find('th').map((_, th) => $(th).text().trim().toLowerCase()).get();

      const isStopsTable =
        headers.some(h => h.includes('date') || h.includes('time')) &&
        headers.some(h => h.includes('port'));

      if (!isStopsTable) return;

      let dayNumber = 1;

      $table.find('tbody tr, tr').each((_, row) => {
        const $row = $(row);
        const cells = $row.find('td');
        if (cells.length < 2) return;

        const dateTimeCell = $(cells[0]).text().trim();
        const portCell = $(cells[1]);
        const portName = portCell.text().trim();
        const portUrl = portCell.find('a').attr('href') || undefined;

        if (!portName || !dateTimeCell) return;

        // Parse de horários: "04 Jan 15:00" ou "07 Jan 08:00 - 17:00"
        const timeMatch = dateTimeCell.match(/(\d{2}:\d{2})(?:\s*-\s*(\d{2}:\d{2}))?/);
        const arrivalTime = timeMatch ? timeMatch[1] : undefined;
        const departureTime = timeMatch && timeMatch[2] ? timeMatch[2] : undefined;

        // Verificar se é embarque ou desembarque
        const fullText = dateTimeCell + ' ' + portName;
        const isEmbarkation = fullText.toLowerCase().includes('depart') || fullText.toLowerCase().includes('embark');
        const isDisembarkation = fullText.toLowerCase().includes('arriv') || fullText.toLowerCase().includes('disembark');

        stops.push({
          portName: portName.replace(/\s+/g, ' ').trim(),
          portUrl: portUrl ? `${BASE_URL}${portUrl}` : undefined,
          date: dateTimeCell,
          arrivalTime: isEmbarkation ? undefined : arrivalTime,
          departureTime: isEmbarkation ? arrivalTime : departureTime,
          dayNumber,
          isEmbarkation,
          isDisembarkation,
        });

        dayNumber++;
      });
    });

    return stops;
  } catch (error) {
    console.error(`[CruiseMapper] Erro ao buscar paradas de ${shipCruisemapperSlug}:`, error);
    return [];
  }
}

/**
 * Salva itinerários raspados no banco de dados
 */
export async function saveItinerariesToDb(
  shipId: number,
  itineraries: CruiseMapperItinerary[]
): Promise<{ saved: number; errors: number }> {
  let saved = 0;
  let errors = 0;

  for (const itin of itineraries) {
    try {
      const endDate = new Date(itin.startDate);
      endDate.setDate(endDate.getDate() + itin.duration);

      const itineraryId = await db.createItinerary({
        shipId,
        name: itin.name,
        description: itin.departurePort ? `Partindo de ${itin.departurePort}` : undefined,
        duration: itin.duration,
        startDate: itin.startDate.toISOString().split('T')[0] as any,
        endDate: endDate.toISOString().split('T')[0] as any,
      });

      // Se tiver paradas detalhadas, salvar
      for (const stop of itin.stops) {
        const portId = await db.createPort({
          name: stop.portName,
          city: null,
          country: null,
          latitude: null,
          longitude: null,
          timezone: null,
        });

        await db.createItineraryStop({
          itineraryId,
          portId,
          dayNumber: stop.dayNumber,
          arrivalTime: stop.arrivalTime || null,
          departureTime: stop.departureTime || null,
          notes: stop.isEmbarkation ? 'Embarque' : stop.isDisembarkation ? 'Desembarque' : null,
        });
      }

      saved++;
    } catch (error) {
      console.error(`[CruiseMapper] Erro ao salvar itinerário "${itin.name}":`, error);
      errors++;
    }
  }

  return { saved, errors };
}

/**
 * Scraping completo: busca itinerários de todos os navios de uma companhia
 * e salva no banco de dados
 */
export async function scrapeAndSaveCompany(
  companyName: string,
  companyId: number,
  options: { maxShips?: number; delayMs?: number } = {}
): Promise<{ shipsScraped: number; itinerariesSaved: number; errors: number }> {
  const { maxShips = 50, delayMs = 2000 } = options;

  const cruisemapperSlug = COMPANY_CRUISEMAPPER_MAP[companyName];
  if (!cruisemapperSlug) {
    console.log(`[CruiseMapper] Companhia não mapeada: ${companyName}`);
    return { shipsScraped: 0, itinerariesSaved: 0, errors: 1 };
  }

  console.log(`[CruiseMapper] Iniciando scraping de ${companyName} (${cruisemapperSlug})`);

  // Busca navios do banco de dados para cruzar com o CruiseMapper
  const dbShips = await db.getShipsByCompanyId(companyId);

  let shipsScraped = 0;
  let totalItinerariesSaved = 0;
  let totalErrors = 0;

  for (const dbShip of dbShips.slice(0, maxShips)) {
    try {
      // Converter o slug do banco para o formato do CruiseMapper
      // Ex: "harmony-of-the-seas" → busca "Harmony-Of-The-Seas-1067"
      const shipNameNormalized = dbShip.name
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9-]/g, '');

      // Tentativa de montar a URL diretamente (heurística)
      const cruisemapperShipSlug = shipNameNormalized;

      console.log(`[CruiseMapper] Scraping navio: ${dbShip.name}`);
      const itineraries = await fetchItinerariesForShip(cruisemapperShipSlug);

      if (itineraries.length > 0) {
        const { saved, errors } = await saveItinerariesToDb(dbShip.id, itineraries);
        totalItinerariesSaved += saved;
        totalErrors += errors;
        shipsScraped++;
        console.log(`[CruiseMapper] ${dbShip.name}: ${saved} itinerários salvos`);
      } else {
        console.log(`[CruiseMapper] ${dbShip.name}: nenhum itinerário encontrado`);
      }

      // Rate limiting: aguardar entre requisições
      await delay(delayMs);
    } catch (error) {
      console.error(`[CruiseMapper] Erro no navio ${dbShip.name}:`, error);
      totalErrors++;
    }
  }

  console.log(
    `[CruiseMapper] ${companyName}: ${shipsScraped} navios, ${totalItinerariesSaved} itinerários, ${totalErrors} erros`
  );
  return { shipsScraped, itinerariesSaved: totalItinerariesSaved, errors: totalErrors };
}

/**
 * Scraping direto por slug do CruiseMapper (para uso no admin dashboard)
 * Mais confiável pois usa o slug exato do CruiseMapper
 */
export async function scrapeShipBySlug(
  cruisemapperSlug: string,
  shipId: number
): Promise<{ itinerariesSaved: number; errors: number }> {
  console.log(`[CruiseMapper] Scraping direto por slug: ${cruisemapperSlug}`);

  const itineraries = await fetchItinerariesForShip(cruisemapperSlug);

  // Tentar buscar paradas do itinerário atual
  if (itineraries.length > 0) {
    const stops = await fetchCurrentItineraryStops(cruisemapperSlug);
    if (stops.length > 0) {
      itineraries[0].stops = stops;
    }
  }

  return saveItinerariesToDb(shipId, itineraries);
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Singleton para uso no orchestrator
export const cruisemapperScraper = {
  fetchShipsForCompany,
  fetchItinerariesForShip,
  fetchCurrentItineraryStops,
  scrapeAndSaveCompany,
  scrapeShipBySlug,
  COMPANY_MAP: COMPANY_CRUISEMAPPER_MAP,
};
