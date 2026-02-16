import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import * as cheerio from 'cheerio';
import {
  fetchItinerariesForShip,
  fetchShipsForCompany,
  fetchCurrentItineraryStops,
  COMPANY_CRUISEMAPPER_MAP,
} from './cruisemapper-scraper';

// Mock axios para não fazer requisições reais nos testes
vi.mock('axios');

const mockShipPageHTML = `
<html><body>
  <h1>Harmony Of The Seas</h1>
  <section id="itinerary">
    <table>
      <thead>
        <tr><th>Date</th><th>Itinerary</th><th>Departure Port</th><th>From</th></tr>
      </thead>
      <tbody>
        <tr><td>2026 Jan 04</td><td>7 days, round-trip Western Caribbean Cruise</td><td>Galveston</td><td>$610</td></tr>
        <tr><td>2026 Jan 11</td><td>7 days, round-trip Western Caribbean Cruise</td><td>Galveston</td><td>$620</td></tr>
        <tr><td>2026 May 24</td><td>7 days, round-trip Western Mediterranean Cruise</td><td>Barcelona</td><td>$1503</td></tr>
      </tbody>
    </table>
  </section>
  <section>
    <h3>Current itinerary</h3>
    <table>
      <thead>
        <tr><th>Date / Time</th><th>Port</th></tr>
      </thead>
      <tbody>
        <tr><td>04 Jan 15:00 Departing</td><td><a href="/ports/galveston-port-88">Galveston, Texas</a></td></tr>
        <tr><td>07 Jan 08:00 - 17:00</td><td><a href="/ports/roatan-port-29">Roatan Island, Honduras</a></td></tr>
        <tr><td>09 Jan 07:00 - 17:00</td><td><a href="/ports/cozumel-port-26">Cozumel, Mexico</a></td></tr>
        <tr><td>11 Jan 07:00 Arriving</td><td><a href="/ports/galveston-port-88">Galveston, Texas</a></td></tr>
      </tbody>
    </table>
  </section>
</body></html>
`;

const mockCompanyPageHTML = `
<html><body>
  <ul class="ships-list">
    <li>
      <h3><a href="/ships/Harmony-Of-The-Seas-1067">Harmony Of The Seas</a></h3>
      <img src="/images/ships/1067-abc.jpg" />
      <table><tr><th>Year build</th><td>2016</td></tr><tr><th>Passengers</th><td>5497 - 6410</td></tr></table>
    </li>
    <li>
      <h3><a href="/ships/Symphony-Of-The-Seas-1730">Symphony Of The Seas</a></h3>
      <img src="/images/ships/1730-def.jpg" />
      <table><tr><th>Year build</th><td>2018</td></tr><tr><th>Passengers</th><td>5518 - 6780</td></tr></table>
    </li>
  </ul>
</body></html>
`;

describe('CruiseMapper Scraper', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('COMPANY_CRUISEMAPPER_MAP', () => {
    it('should have mappings for all major cruise lines', () => {
      expect(COMPANY_CRUISEMAPPER_MAP['Royal Caribbean']).toBeTruthy();
      expect(COMPANY_CRUISEMAPPER_MAP['Carnival Cruise Line']).toBeTruthy();
      expect(COMPANY_CRUISEMAPPER_MAP['MSC Cruises']).toBeTruthy();
      expect(COMPANY_CRUISEMAPPER_MAP['Norwegian Cruise Line']).toBeTruthy();
      expect(COMPANY_CRUISEMAPPER_MAP['Disney Cruise Line']).toBeTruthy();
      expect(COMPANY_CRUISEMAPPER_MAP['Celebrity Cruises']).toBeTruthy();
    });

    it('should use correct CruiseMapper IDs', () => {
      expect(COMPANY_CRUISEMAPPER_MAP['Royal Caribbean']).toBe('Royal-Caribbean-1');
      expect(COMPANY_CRUISEMAPPER_MAP['MSC Cruises']).toBe('MSC-Cruises-13');
    });
  });

  describe('fetchItinerariesForShip', () => {
    it('should parse itinerary table from ship page', async () => {
      (axios.get as ReturnType<typeof vi.fn>).mockResolvedValue({
        data: mockShipPageHTML,
        status: 200,
      });

      const result = await fetchItinerariesForShip('Harmony-Of-The-Seas-1067');

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);

      const first = result[0];
      expect(first.name).toContain('7 days');
      expect(first.duration).toBe(7);
      expect(first.departurePort).toBeTruthy();
    });

    it('should parse duration from itinerary name', async () => {
      (axios.get as ReturnType<typeof vi.fn>).mockResolvedValue({
        data: mockShipPageHTML,
        status: 200,
      });

      const result = await fetchItinerariesForShip('Harmony-Of-The-Seas-1067');
      const allDurations = result.map(i => i.duration);
      
      expect(allDurations.every(d => d > 0)).toBe(true);
    });

    it('should parse start dates correctly', async () => {
      (axios.get as ReturnType<typeof vi.fn>).mockResolvedValue({
        data: mockShipPageHTML,
        status: 200,
      });

      const result = await fetchItinerariesForShip('Harmony-Of-The-Seas-1067');

      expect(result.length).toBeGreaterThan(0);
      result.forEach(itin => {
        expect(itin.startDate).toBeInstanceOf(Date);
        expect(itin.startDate.getFullYear()).toBeGreaterThanOrEqual(2025);
      });
    });

    it('should return empty array on HTTP error', async () => {
      (axios.get as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Network error'));

      const result = await fetchItinerariesForShip('Non-Existent-Ship-9999');
      expect(result).toEqual([]);
    });
  });

  describe('fetchCurrentItineraryStops', () => {
    it('should parse port stops from current itinerary table', async () => {
      (axios.get as ReturnType<typeof vi.fn>).mockResolvedValue({
        data: mockShipPageHTML,
        status: 200,
      });

      const stops = await fetchCurrentItineraryStops('Harmony-Of-The-Seas-1067');

      expect(stops).toBeInstanceOf(Array);
    });

    it('should return empty array on error', async () => {
      (axios.get as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Timeout'));

      const stops = await fetchCurrentItineraryStops('Ship-123');
      expect(stops).toEqual([]);
    });
  });

  describe('fetchShipsForCompany', () => {
    it('should parse ship list from company page', async () => {
      (axios.get as ReturnType<typeof vi.fn>).mockResolvedValue({
        data: mockCompanyPageHTML,
        status: 200,
      });

      const ships = await fetchShipsForCompany('Royal-Caribbean-1');

      expect(ships).toBeInstanceOf(Array);
    });

    it('should return empty array on error', async () => {
      (axios.get as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('403 Forbidden'));

      const ships = await fetchShipsForCompany('Company-999');
      expect(ships).toEqual([]);
    });
  });
});
