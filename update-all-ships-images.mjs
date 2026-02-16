#!/usr/bin/env node

import { drizzle } from "drizzle-orm/mysql2";
import { ships } from "./drizzle/schema.js";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL);

// Mapa de fotos para cada navio (usando URLs do Unsplash que funcionam)
const shipImages = {
  // Royal Caribbean
  "icon-of-the-seas": "https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?w=800&q=80",
  "wonder-of-the-seas": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  "symphony-of-the-seas": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
  "harmony-of-the-seas": "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
  "allure-of-the-seas": "https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?w=800&q=80",
  "oasis-of-the-seas": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  "odyssey-of-the-seas": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
  "spectrum-of-the-seas": "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
  "ovation-of-the-seas": "https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?w=800&q=80",
  "anthem-of-the-seas": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  "quantum-of-the-seas": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
  "liberty-of-the-seas": "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
  "independence-of-the-seas": "https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?w=800&q=80",
  "freedom-of-the-seas": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  "mariner-of-the-seas": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
  "navigator-of-the-seas": "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
  "adventure-of-the-seas": "https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?w=800&q=80",
  "explorer-of-the-seas": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  "voyager-of-the-seas": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
  "brilliance-of-the-seas": "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
  "serenade-of-the-seas": "https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?w=800&q=80",
  "jewel-of-the-seas": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  "radiance-of-the-seas": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
  "grandeur-of-the-seas": "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
  
  // Carnival
  "carnival-celebration": "https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?w=800&q=80",
  "carnival-mardi-gras": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  "carnival-jubilee": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
  "carnival-venezia": "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
  "carnival-panorama": "https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?w=800&q=80",
  "carnival-horizon": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  "carnival-vista": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
  "carnival-breeze": "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
  "carnival-magic": "https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?w=800&q=80",
  "carnival-dream": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  "carnival-freedom": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
  "carnival-liberty": "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
  "carnival-valor": "https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?w=800&q=80",
  "carnival-glory": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  "carnival-conquest": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
  "carnival-miracle": "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
  "carnival-legend": "https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?w=800&q=80",
  "carnival-pride": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  "carnival-spirit": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
  "carnival-sunshine": "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
  "carnival-elation": "https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?w=800&q=80",
  
  // Norwegian
  "norwegian-prima": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  "norwegian-viva": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
};

async function updateShipImages() {
  console.log("🚀 Iniciando atualização de fotos dos navios...\n");

  try {
    let updated = 0;
    let failed = 0;

    for (const [slug, imageUrl] of Object.entries(shipImages)) {
      try {
        const result = await db
          .update(ships)
          .set({ imageUrl })
          .where(eq(ships.slug, slug));
        
        if (result.rowsAffected > 0) {
          console.log(`✅ ${slug} - Foto atualizada`);
          updated++;
        }
      } catch (error) {
        console.log(`⚠️  ${slug} - ${error.message.substring(0, 50)}`);
        failed++;
      }
    }

    console.log(`\n✨ Atualização concluída!`);
    console.log(`📊 Resumo:`);
    console.log(`   - ${updated} navios atualizados`);
    console.log(`   - ${failed} navios com erro`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Erro durante atualização:", error);
    process.exit(1);
  }
}

updateShipImages();
