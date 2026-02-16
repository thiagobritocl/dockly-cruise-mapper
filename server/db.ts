import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, companies, ships, ports, itineraries, itineraryStops, Company, Ship, Port, Itinerary, ItineraryStop, InsertCompany, InsertShip, InsertPort, InsertItinerary, InsertItineraryStop } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Companies
export async function getAllCompanies(): Promise<Company[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(companies);
}

export async function getCompanyBySlug(slug: string): Promise<Company | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(companies).where(eq(companies.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createCompany(company: InsertCompany): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.insert(companies).values(company);
}

// Ships
export async function getShipsByCompanyId(companyId: number): Promise<Ship[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(ships).where(eq(ships.companyId, companyId));
}

export async function getShipBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select({
      ship: ships,
      company: companies,
    })
    .from(ships)
    .leftJoin(companies, eq(ships.companyId, companies.id))
    .where(eq(ships.slug, slug))
    .limit(1);
  
  if (result.length === 0) return undefined;
  
  return {
    ...result[0].ship,
    company: result[0].company,
  };
}

export async function createShip(ship: InsertShip): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.insert(ships).values(ship);
}

// Ports
export async function getPortById(id: number): Promise<Port | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(ports).where(eq(ports.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createPort(port: InsertPort): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(ports).values(port);
  return Number(result[0].insertId);
}

// Itineraries
export async function getItinerariesByShipId(shipId: number): Promise<Itinerary[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(itineraries).where(eq(itineraries.shipId, shipId));
}

export async function createItinerary(itinerary: InsertItinerary): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(itineraries).values(itinerary);
  return Number(result[0].insertId);
}

// Itinerary Stops
export async function getStopsByItineraryId(itineraryId: number): Promise<ItineraryStop[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(itineraryStops).where(eq(itineraryStops.itineraryId, itineraryId));
}

export async function createItineraryStop(stop: InsertItineraryStop): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.insert(itineraryStops).values(stop);
}

// Admin Stats
export async function countShips(): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select().from(ships);
  return result.length;
}

export async function countItineraries(): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select().from(itineraries);
  return result.length;
}

export async function countShipsWithItineraries(): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  
  // Get unique ship IDs that have itineraries
  const result = await db.select({ shipId: itineraries.shipId })
    .from(itineraries)
    .groupBy(itineraries.shipId);
  
  return result.length;
}
