#!/usr/bin/env node

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { companies, ships, ports, itineraries, itineraryStops } from "./drizzle/schema.js";
import { eq } from "drizzle-orm";
import { companiesData, shipsData, portsData, itinerariesData, itineraryStopsData } from "./seed-data-working-urls.mjs";

const db = drizzle(process.env.DATABASE_URL);

async function updateDatabase() {
  console.log("🔄 Atualizando banco de dados completo com URLs e itinerários...\n");

  try {
    // Atualizar logos das companhias
    console.log("📋 Atualizando logos das companhias...");
    for (const company of companiesData) {
      await db
        .update(companies)
        .set({ logoUrl: company.logoUrl })
        .where(eq(companies.slug, company.slug));
      console.log(`✅ ${company.name} - Logo atualizada`);
    }
    console.log();

    // Atualizar fotos dos navios
    console.log("🚢 Atualizando fotos dos navios...");
    for (const ship of shipsData) {
      await db
        .update(ships)
        .set({ imageUrl: ship.imageUrl })
        .where(eq(ships.slug, ship.slug));
      console.log(`✅ ${ship.name} - Foto atualizada`);
    }
    console.log();

    // Inserir portos
    console.log("🏝️  Inserindo portos...");
    for (const port of portsData) {
      try {
        await db.insert(ports).values(port).onDuplicateKeyUpdate({
          set: {
            name: port.name,
            country: port.country,
            latitude: port.latitude,
            longitude: port.longitude,
          },
        });
        console.log(`✅ ${port.name} - Porto inserido`);
      } catch (error) {
        console.log(`⚠️  ${port.name} - Já existe ou erro: ${error.message}`);
      }
    }
    console.log();

    // Inserir itinerários
    console.log("🗺️  Inserindo itinerários...");
    for (const itinerary of itinerariesData) {
      try {
        await db.insert(itineraries).values(itinerary).onDuplicateKeyUpdate({
          set: {
            name: itinerary.name,
            duration: itinerary.duration,
            departurePort: itinerary.departurePort,
            departureDate: itinerary.departureDate,
            returnDate: itinerary.returnDate,
            price: itinerary.price,
          },
        });
        console.log(`✅ ${itinerary.name} - Itinerário inserido`);
      } catch (error) {
        console.log(`⚠️  ${itinerary.name} - Erro: ${error.message}`);
      }
    }
    console.log();

    // Inserir paradas de itinerários
    console.log("📍 Inserindo paradas de itinerários...");
    for (const stop of itineraryStopsData) {
      try {
        await db.insert(itineraryStops).values(stop).onDuplicateKeyUpdate({
          set: {
            dayNumber: stop.dayNumber,
            arrivalTime: stop.arrivalTime,
            departureTime: stop.departureTime,
          },
        });
      } catch (error) {
        // Silenciosamente ignorar erros de paradas duplicadas
      }
    }
    console.log(`✅ ${itineraryStopsData.length} paradas inseridas`);
    console.log();

    console.log("✨ Banco de dados atualizado com sucesso!");
    console.log("\n📊 Resumo:");
    console.log(`   - ${companiesData.length} logos de companhias`);
    console.log(`   - ${shipsData.length} fotos de navios`);
    console.log(`   - ${portsData.length} portos`);
    console.log(`   - ${itinerariesData.length} itinerários`);
    console.log(`   - ${itineraryStopsData.length} paradas`);
  } catch (error) {
    console.error("❌ Erro ao atualizar banco de dados:", error);
    process.exit(1);
  }
}

updateDatabase();
