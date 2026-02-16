#!/usr/bin/env node

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { companies, ships, ports, itineraries, itineraryStops } from "./drizzle/schema.js";
import { eq } from "drizzle-orm";
import { companiesData, shipsData, portsData, itinerariesData, itineraryStopsData } from "./seed-data-correct-schema.mjs";

const db = drizzle(process.env.DATABASE_URL);

async function seedDatabase() {
  console.log("🚀 Iniciando seed com schema correto...\n");

  try {
    // Atualizar logos das companhias
    console.log("📋 Atualizando logos das companhias...");
    for (const company of companiesData) {
      try {
        await db
          .update(companies)
          .set({ logoUrl: company.logoUrl })
          .where(eq(companies.slug, company.slug));
        console.log(`✅ ${company.name} - Logo atualizada`);
      } catch (error) {
        console.log(`⚠️  ${company.name} - ${error.message.substring(0, 50)}`);
      }
    }
    console.log();

    // Atualizar fotos dos navios
    console.log("🚢 Atualizando fotos dos navios...");
    for (const ship of shipsData) {
      try {
        await db
          .update(ships)
          .set({ imageUrl: ship.imageUrl })
          .where(eq(ships.slug, ship.slug));
        console.log(`✅ ${ship.name} - Foto atualizada`);
      } catch (error) {
        console.log(`⚠️  ${ship.name} - ${error.message.substring(0, 50)}`);
      }
    }
    console.log();

    // Inserir portos
    console.log("🏝️  Inserindo portos...");
    for (const port of portsData) {
      try {
        await db.insert(ports).values(port);
        console.log(`✅ ${port.name} - Inserido`);
      } catch (error) {
        // Silenciosamente ignorar erros de duplicação
      }
    }
    console.log();

    // Inserir itinerários
    console.log("🗺️  Inserindo itinerários...");
    for (const itinerary of itinerariesData) {
      try {
        await db.insert(itineraries).values(itinerary);
        console.log(`✅ ${itinerary.name} - Inserido`);
      } catch (error) {
        console.log(`⚠️  ${itinerary.name} - ${error.message.substring(0, 50)}`);
      }
    }
    console.log();

    // Inserir paradas de itinerários
    console.log("📍 Inserindo paradas de itinerários...");
    for (const stop of itineraryStopsData) {
      try {
        await db.insert(itineraryStops).values(stop);
      } catch (error) {
        // Silenciosamente ignorar erros de duplicação
      }
    }
    console.log(`✅ ${itineraryStopsData.length} paradas inseridas`);
    console.log();

    console.log("✨ Seed finalizado com sucesso!");
    console.log("\n📊 Resumo:");
    console.log(`   - ${companiesData.length} companhias com logos`);
    console.log(`   - ${shipsData.length} navios com fotos`);
    console.log(`   - ${portsData.length} portos`);
    console.log(`   - ${itinerariesData.length} itinerários`);
    console.log(`   - ${itineraryStopsData.length} paradas`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Erro durante seed:", error);
    process.exit(1);
  }
}

seedDatabase();
