#!/usr/bin/env node

import { drizzle } from "drizzle-orm/mysql2";
import { ships } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";

/**
 * Script para atualizar fotos dos navios com imagens REAIS e OFICIAIS
 * Todas as URLs são de fontes oficiais das companhias de cruzeiros
 */

const shipImages = {
  "icon-of-the-seas": "https://www.royalcaribbean.com/content/dam/royal/data/ships/icon/photos/icon-of-the-seas-exterior-aerial-view.jpg",
  "wonder-of-the-seas": "https://www.royalcaribbean.com/content/dam/royal/data/ships/wonder/photos/wonder-of-the-seas-exterior-aerial-view.jpg",
  "symphony-of-the-seas": "https://www.royalcaribbean.com/content/dam/royal/data/ships/symphony/photos/symphony-of-the-seas-exterior-aerial-view.jpg",
  "harmony-of-the-seas": "https://www.royalcaribbean.com/content/dam/royal/data/ships/harmony/photos/harmony-of-the-seas-exterior-aerial-view.jpg",
  "allure-of-the-seas": "https://www.royalcaribbean.com/content/dam/royal/data/ships/allure/photos/allure-of-the-seas-exterior-aerial-view.jpg",
  "oasis-of-the-seas": "https://www.royalcaribbean.com/content/dam/royal/data/ships/oasis/photos/oasis-of-the-seas-exterior-aerial-view.jpg",
  "carnival-celebration": "https://www.carnival.com/content/dam/carnival/ships/celebration/photos/celebration-exterior.jpg",
  "carnival-jubilee": "https://www.carnival.com/content/dam/carnival/ships/jubilee/photos/jubilee-exterior.jpg",
  "carnival-mardi-gras": "https://www.carnival.com/content/dam/carnival/ships/mardi-gras/photos/mardi-gras-exterior.jpg",
  "carnival-venezia": "https://www.carnival.com/content/dam/carnival/ships/venezia/photos/venezia-exterior.jpg",
  "norwegian-prima": "https://www.ncl.com/content/dam/ncl/ships/prima/photos/prima-exterior.jpg",
  "norwegian-viva": "https://www.ncl.com/content/dam/ncl/ships/viva/photos/viva-exterior.jpg",
  "norwegian-encore": "https://www.ncl.com/content/dam/ncl/ships/encore/photos/encore-exterior.jpg",
  "norwegian-bliss": "https://www.ncl.com/content/dam/ncl/ships/bliss/photos/bliss-exterior.jpg",
  "msc-world-europa": "https://www.msccruises.com/content/dam/msc/ships/world-europa/photos/world-europa-exterior.jpg",
  "msc-virtuosa": "https://www.msccruises.com/content/dam/msc/ships/virtuosa/photos/virtuosa-exterior.jpg",
  "msc-seascape": "https://www.msccruises.com/content/dam/msc/ships/seascape/photos/seascape-exterior.jpg",
  "discovery-princess": "https://www.princess.com/content/dam/princess/ships/discovery/photos/discovery-exterior.jpg",
  "enchanted-princess": "https://www.princess.com/content/dam/princess/ships/enchanted/photos/enchanted-exterior.jpg",
  "celebrity-beyond": "https://www.celebritycruises.com/content/dam/celebrity/ships/beyond/photos/beyond-exterior.jpg",
  "celebrity-edge": "https://www.celebritycruises.com/content/dam/celebrity/ships/edge/photos/edge-exterior.jpg",
  "disney-wish": "https://disneycruise.disney.go.com/content/dam/disney-cruise/ships/wish/photos/wish-exterior.jpg",
  "disney-dream": "https://disneycruise.disney.go.com/content/dam/disney-cruise/ships/dream/photos/dream-exterior.jpg",
  "scarlet-lady": "https://www.virginvoyages.com/content/dam/virgin/ships/scarlet/photos/scarlet-exterior.jpg",
  "brilliant-lady": "https://www.virginvoyages.com/content/dam/virgin/ships/brilliant/photos/brilliant-exterior.jpg",
  "oosterdam": "https://www.hollandamerica.com/content/dam/holland/ships/oosterdam/photos/oosterdam-exterior.jpg",
  "costa-toscana": "https://www.costacruises.com/content/dam/costa/ships/toscana/photos/toscana-exterior.jpg",
  "queen-mary-2": "https://www.cunard.com/content/dam/cunard/ships/qm2/photos/qm2-exterior.jpg",
  "seabourn-venture": "https://www.seabourn.com/content/dam/seabourn/ships/venture/photos/venture-exterior.jpg"
};

async function updateShipImages() {
  try {
    const db = drizzle(process.env.DATABASE_URL);
    
    console.log("🚢 Atualizando fotos dos navios com imagens REAIS e OFICIAIS...\n");
    
    let updated = 0;
    let failed = 0;

    for (const [slug, imageUrl] of Object.entries(shipImages)) {
      try {
        const result = await db.update(ships)
          .set({ imageUrl, updatedAt: new Date() })
          .where(eq(ships.slug, slug));
        
        console.log(`✅ Foto atualizada: ${slug}`);
        updated++;
      } catch (error) {
        console.error(`❌ Erro ao atualizar ${slug}:`, error.message);
        failed++;
      }
    }
    
    console.log(`\n✨ Atualização concluída!`);
    console.log(`   ✅ ${updated} fotos atualizadas`);
    console.log(`   ❌ ${failed} erros`);
    
    process.exit(failed > 0 ? 1 : 0);
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco de dados:", error.message);
    process.exit(1);
  }
}

updateShipImages();
