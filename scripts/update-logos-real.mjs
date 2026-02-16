#!/usr/bin/env node

import { drizzle } from "drizzle-orm/mysql2";
import { companies } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";

/**
 * Script para atualizar logos das companhias com logos REAIS e OFICIAIS
 * Todas as URLs são de fontes oficiais e confiáveis
 */

const companyLogos = {
  "royal-caribbean": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Royal_Caribbean_International_logo.svg/512px-Royal_Caribbean_International_logo.svg.png",
  "carnival": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Carnival_Cruise_Line_logo.svg/512px-Carnival_Cruise_Line_logo.svg.png",
  "norwegian": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Norwegian_Cruise_Line_logo.svg/512px-Norwegian_Cruise_Line_logo.svg.png",
  "msc-cruises": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/MSC_Cruises_logo.svg/512px-MSC_Cruises_logo.svg.png",
  "princess": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princess_Cruises_logo.svg/512px-Princess_Cruises_logo.svg.png",
  "celebrity": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Celebrity_Cruises_logo.svg/512px-Celebrity_Cruises_logo.svg.png",
  "disney": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Disney_Cruise_Line_logo.svg/512px-Disney_Cruise_Line_logo.svg.png",
  "virgin-voyages": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Virgin_Voyages_logo.svg/512px-Virgin_Voyages_logo.svg.png",
  "holland-america": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Holland_America_Line_logo.svg/512px-Holland_America_Line_logo.svg.png",
  "costa": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Costa_Cruises_logo.svg/512px-Costa_Cruises_logo.svg.png",
  "cunard": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Cunard_Line_logo.svg/512px-Cunard_Line_logo.svg.png",
  "seabourn": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Seabourn_Cruise_Line_logo.svg/512px-Seabourn_Cruise_Line_logo.svg.png"
};

async function updateCompanyLogos() {
  try {
    const db = drizzle(process.env.DATABASE_URL);
    
    console.log("🎨 Atualizando logos das companhias com logos REAIS e OFICIAIS...\n");
    
    let updated = 0;
    let failed = 0;

    for (const [slug, logoUrl] of Object.entries(companyLogos)) {
      try {
        const result = await db.update(companies)
          .set({ logoUrl, updatedAt: new Date() })
          .where(eq(companies.slug, slug));
        
        console.log(`✅ Logo atualizado: ${slug}`);
        updated++;
      } catch (error) {
        console.error(`❌ Erro ao atualizar ${slug}:`, error.message);
        failed++;
      }
    }
    
    console.log(`\n✨ Atualização concluída!`);
    console.log(`   ✅ ${updated} logos atualizados`);
    console.log(`   ❌ ${failed} erros`);
    
    process.exit(failed > 0 ? 1 : 0);
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco de dados:", error.message);
    process.exit(1);
  }
}

updateCompanyLogos();
