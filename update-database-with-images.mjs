#!/usr/bin/env node

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { companies, ships } from "./drizzle/schema.js";
import { eq } from "drizzle-orm";
import { companiesData, shipsData } from "./seed-data-working-urls.mjs";

const db = drizzle(process.env.DATABASE_URL);

async function updateDatabase() {
  console.log("🔄 Atualizando banco de dados com URLs de imagens funcionais...\n");

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

    console.log("✨ Banco de dados atualizado com sucesso!");
    console.log("\n📊 Resumo:");
    console.log(`   - ${companiesData.length} logos de companhias`);
    console.log(`   - ${shipsData.length} fotos de navios`);
  } catch (error) {
    console.error("❌ Erro ao atualizar banco de dados:", error);
    process.exit(1);
  }
}

updateDatabase();
