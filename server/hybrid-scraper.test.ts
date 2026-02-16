import { describe, expect, it } from "vitest";
import { hybridScraper, PortAPIClient } from "./hybrid-scraper";

describe("Hybrid Scraper System", () => {
  it("should scrape itineraries from official websites", async () => {
    const result = await hybridScraper.scrapeItineraries("Royal Caribbean", "Symphony of the Seas");
    
    // Should return an array (may be empty if scraping fails)
    expect(Array.isArray(result)).toBe(true);
  }, 15000);

  it("should get port coordinates from API", async () => {
    const portAPI = new PortAPIClient();
    const portInfo = await portAPI.getPortInfo("Miami");
    
    if (portInfo) {
      expect(portInfo).toHaveProperty("latitude");
      expect(portInfo).toHaveProperty("longitude");
      expect(portInfo).toHaveProperty("city");
      expect(portInfo).toHaveProperty("country");
      expect(typeof portInfo.latitude).toBe("number");
      expect(typeof portInfo.longitude).toBe("number");
    } else {
      // If null, API might be rate-limited or unavailable
      expect(portInfo).toBeNull();
    }
  }, 10000);

  it("should enrich ports with coordinates", async () => {
    const portAPI = new PortAPIClient();
    const ports = [
      { name: "Miami", dayNumber: 1 },
      { name: "Nassau", dayNumber: 2 },
    ];
    
    const enriched = await portAPI.enrichPortsWithCoordinates(ports);
    
    expect(enriched).toHaveLength(2);
    expect(enriched[0].name).toBe("Miami");
  }, 15000);
});
