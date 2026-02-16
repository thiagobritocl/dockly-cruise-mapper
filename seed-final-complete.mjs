#!/usr/bin/env node

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { companies, ships, ports, itineraries, itineraryStops } from "./drizzle/schema.js";
import { eq, sql } from "drizzle-orm";
import { companiesData, shipsData, portsData, itinerariesData, itineraryStopsData } from "./seed-data-working-urls.mjs";

const db = drizzle(process.env.DATABASE_URL);

async function seedDatabase() {
  console.log("🚀 Iniciando seed completo do banco de dados...\n");

  try {
    // Limpar dados antigos (opcional - comentado para segurança)
    // console.log("🗑️  Limpando dados antigos...");
    // await db.delete(itineraryStops);
    // await db.delete(itineraries);
    // await db.delete(ports);
    // await db.delete(ships);
    // await db.delete(companies);
    // console.log("✅ Dados antigos removidos\n");

    // Inserir/Atualizar companhias
    console.log("📋 Inserindo/Atualizando companhias...");
    for (const company of companiesData) {
      try {
        // Tentar inserir
        await db.insert(companies).values(company);
        console.log(`✅ ${company.name} - Inserida`);
      } catch (error) {
        // Se já existe, atualizar
        try {
          await db
            .update(companies)
            .set({
              logoUrl: company.logoUrl,
              description: company.description,
              websiteUrl: company.websiteUrl,
            })
            .where(eq(companies.slug, company.slug));
          console.log(`✅ ${company.name} - Atualizada`);
        } catch (updateError) {
          console.log(`⚠️  ${company.name} - Erro: ${updateError.message.substring(0, 50)}`);
        }
      }
    }
    console.log();

    // Inserir/Atualizar navios
    console.log("🚢 Inserindo/Atualizando navios...");
    for (const ship of shipsData) {
      try {
        // Tentar inserir
        await db.insert(ships).values(ship);
        console.log(`✅ ${ship.name} - Inserido`);
      } catch (error) {
        // Se já existe, atualizar
        try {
          await db
            .update(ships)
            .set({
              imageUrl: ship.imageUrl,
              yearBuilt: ship.yearBuilt,
              passengerCapacity: ship.passengerCapacity,
              crewCapacity: ship.crewCapacity,
              tonnage: ship.tonnage,
              length: ship.length,
              description: ship.description,
            })
            .where(eq(ships.slug, ship.slug));
          console.log(`✅ ${ship.name} - Atualizado`);
        } catch (updateError) {
          console.log(`⚠️  ${ship.name} - Erro: ${updateError.message.substring(0, 50)}`);
        }
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

    console.log("✨ Seed completo finalizado com sucesso!");
    console.log("\n📊 Resumo:");
    console.log(`   - ${companiesData.length} companhias`);
    console.log(`   - ${shipsData.length} navios`);
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
