import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, date } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Cruise companies/lines
 */
export const companies = mysqlTable("companies", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  logoUrl: text("logoUrl"),
  websiteUrl: text("websiteUrl"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Company = typeof companies.$inferSelect;
export type InsertCompany = typeof companies.$inferInsert;

/**
 * Cruise ships
 */
export const ships = mysqlTable("ships", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  imageUrl: text("imageUrl"),
  yearBuilt: int("yearBuilt"),
  passengerCapacity: int("passengerCapacity"),
  crewCapacity: int("crewCapacity"),
  tonnage: int("tonnage"),
  length: decimal("length", { precision: 10, scale: 2 }),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Ship = typeof ships.$inferSelect;
export type InsertShip = typeof ships.$inferInsert;

/**
 * Ports of call
 */
export const ports = mysqlTable("ports", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  city: varchar("city", { length: 255 }),
  country: varchar("country", { length: 255 }),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  timezone: varchar("timezone", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Port = typeof ports.$inferSelect;
export type InsertPort = typeof ports.$inferInsert;

/**
 * Cruise itineraries
 */
export const itineraries = mysqlTable("itineraries", {
  id: int("id").autoincrement().primaryKey(),
  shipId: int("shipId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  duration: int("duration").notNull(), // days
  startDate: date("startDate").notNull(),
  endDate: date("endDate").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Itinerary = typeof itineraries.$inferSelect;
export type InsertItinerary = typeof itineraries.$inferInsert;

/**
 * Port stops in an itinerary
 */
export const itineraryStops = mysqlTable("itinerary_stops", {
  id: int("id").autoincrement().primaryKey(),
  itineraryId: int("itineraryId").notNull(),
  portId: int("portId").notNull(),
  dayNumber: int("dayNumber").notNull(), // day in the itinerary (1, 2, 3...)
  arrivalTime: varchar("arrivalTime", { length: 10 }), // HH:MM format
  departureTime: varchar("departureTime", { length: 10 }), // HH:MM format
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ItineraryStop = typeof itineraryStops.$inferSelect;
export type InsertItineraryStop = typeof itineraryStops.$inferInsert;
