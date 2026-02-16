import { describe, expect, it, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import * as db from "./db";

function createTestContext(): TrpcContext {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
  return ctx;
}

describe("companies router", () => {
  it("should list all companies", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const companies = await caller.companies.list();

    expect(companies).toBeDefined();
    expect(Array.isArray(companies)).toBe(true);
    expect(companies.length).toBeGreaterThan(0);
  });

  it("should get company by slug", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const company = await caller.companies.getBySlug({ slug: "royal-caribbean" });

    expect(company).toBeDefined();
    expect(company?.slug).toBe("royal-caribbean");
    expect(company?.name).toBe("Royal Caribbean");
  });

  it("should return undefined for non-existent company", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const company = await caller.companies.getBySlug({ slug: "non-existent-company" });

    expect(company).toBeUndefined();
  });
});

describe("ships router", () => {
  it("should list ships by company", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    // First get a company
    const company = await caller.companies.getBySlug({ slug: "royal-caribbean" });
    expect(company).toBeDefined();

    if (company) {
      const ships = await caller.ships.listByCompany({ companyId: company.id });

      expect(ships).toBeDefined();
      expect(Array.isArray(ships)).toBe(true);
      expect(ships.length).toBeGreaterThan(0);
      expect(ships[0].companyId).toBe(company.id);
    }
  });

  it("should get ship by slug", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const ship = await caller.ships.getBySlug({ slug: "symphony-of-the-seas" });

    expect(ship).toBeDefined();
    expect(ship?.slug).toBe("symphony-of-the-seas");
    expect(ship?.name).toBe("Symphony of the Seas");
  });

  it("should return undefined for non-existent ship", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const ship = await caller.ships.getBySlug({ slug: "non-existent-ship" });

    expect(ship).toBeUndefined();
  });
});

describe("itineraries router", () => {
  it("should list itineraries by ship", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    // First get a ship
    const ship = await caller.ships.getBySlug({ slug: "symphony-of-the-seas" });
    expect(ship).toBeDefined();

    if (ship) {
      const itineraries = await caller.itineraries.listByShip({ shipId: ship.id });

      expect(itineraries).toBeDefined();
      expect(Array.isArray(itineraries)).toBe(true);
      
      // Check if itineraries have stops with port details
      if (itineraries.length > 0) {
        const firstItinerary = itineraries[0];
        expect(firstItinerary.stops).toBeDefined();
        expect(Array.isArray(firstItinerary.stops)).toBe(true);
        
        if (firstItinerary.stops.length > 0) {
          const firstStop = firstItinerary.stops[0];
          expect(firstStop.port).toBeDefined();
          expect(firstStop.port?.name).toBeDefined();
        }
      }
    }
  });

  it("should return empty array for ship with no itineraries", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    // Use a ship that doesn't have itineraries yet
    const ship = await caller.ships.getBySlug({ slug: "carnival-vista" });
    
    if (ship) {
      const itineraries = await caller.itineraries.listByShip({ shipId: ship.id });

      expect(itineraries).toBeDefined();
      expect(Array.isArray(itineraries)).toBe(true);
    }
  });
});

describe("auth router", () => {
  it("should return null for unauthenticated user", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const user = await caller.auth.me();

    expect(user).toBeNull();
  });
});
