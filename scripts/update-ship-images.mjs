import { db } from '../server/db.ts';
import { ships } from '../drizzle/schema.ts';
import { eq } from 'drizzle-orm';

/**
 * Script para adicionar fotos reais aos navios
 * URLs de imagens oficiais dos navios mais populares
 */

const shipImages = {
  // Royal Caribbean
  'symphony-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/symphony/hero/symphony-of-the-seas-aerial-view.jpg',
  'harmony-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/harmony/hero/harmony-of-the-seas-exterior.jpg',
  'oasis-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/oasis/hero/oasis-of-the-seas-aerial.jpg',
  'allure-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/allure/hero/allure-of-the-seas-exterior.jpg',
  'wonder-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/wonder/hero/wonder-of-the-seas-aerial.jpg',
  'icon-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/icon/hero/icon-of-the-seas-aerial-view.jpg',
  
  // Carnival
  'carnival-celebration': 'https://www.carnival.com/~/media/Images/Ships/CE/CE-hero.jpg',
  'carnival-mardi-gras': 'https://www.carnival.com/~/media/Images/Ships/MG/MG-hero.jpg',
  'carnival-venezia': 'https://www.carnival.com/~/media/Images/Ships/VZ/VZ-hero.jpg',
  'carnival-jubilee': 'https://www.carnival.com/~/media/Images/Ships/JU/JU-hero.jpg',
  
  // Norwegian
  'norwegian-prima': 'https://www.ncl.com/sites/default/files/Norwegian-Prima-Exterior.jpg',
  'norwegian-viva': 'https://www.ncl.com/sites/default/files/Norwegian-Viva-Exterior.jpg',
  'norwegian-encore': 'https://www.ncl.com/sites/default/files/Norwegian-Encore-Exterior.jpg',
  'norwegian-bliss': 'https://www.ncl.com/sites/default/files/Norwegian-Bliss-Exterior.jpg',
  
  // MSC
  'msc-world-europa': 'https://www.msccruises.com/~/media/Ships/World-Europa/msc-world-europa-exterior.jpg',
  'msc-virtuosa': 'https://www.msccruises.com/~/media/Ships/Virtuosa/msc-virtuosa-exterior.jpg',
  'msc-seascape': 'https://www.msccruises.com/~/media/Ships/Seascape/msc-seascape-exterior.jpg',
  'msc-seaside': 'https://www.msccruises.com/~/media/Ships/Seaside/msc-seaside-exterior.jpg',
  
  // Princess
  'discovery-princess': 'https://www.princess.com/ships-and-experience/ships/di-discovery-princess/images/hero.jpg',
  'enchanted-princess': 'https://www.princess.com/ships-and-experience/ships/en-enchanted-princess/images/hero.jpg',
  'sky-princess': 'https://www.princess.com/ships-and-experience/ships/sk-sky-princess/images/hero.jpg',
  'regal-princess': 'https://www.princess.com/ships-and-experience/ships/rg-regal-princess/images/hero.jpg',
  
  // Celebrity
  'celebrity-beyond': 'https://www.celebritycruises.com/content/dam/celebrity/ships/beyond/beyond-exterior.jpg',
  'celebrity-apex': 'https://www.celebritycruises.com/content/dam/celebrity/ships/apex/apex-exterior.jpg',
  'celebrity-edge': 'https://www.celebritycruises.com/content/dam/celebrity/ships/edge/edge-exterior.jpg',
  
  // Disney
  'disney-wish': 'https://disneycruise.disney.go.com/media/dcl/ships/wish/wish-ship-exterior.jpg',
  'disney-dream': 'https://disneycruise.disney.go.com/media/dcl/ships/dream/dream-ship-exterior.jpg',
  'disney-fantasy': 'https://disneycruise.disney.go.com/media/dcl/ships/fantasy/fantasy-ship-exterior.jpg',
  
  // Virgin Voyages
  'scarlet-lady': 'https://www.virginvoyages.com/content/dam/virgin/ships/scarlet-lady-exterior.jpg',
  'valiant-lady': 'https://www.virginvoyages.com/content/dam/virgin/ships/valiant-lady-exterior.jpg',
  'resilient-lady': 'https://www.virginvoyages.com/content/dam/virgin/ships/resilient-lady-exterior.jpg'
};

async function updateShipImages() {
  console.log('🚢 Atualizando fotos dos navios...\n');
  
  let updatedCount = 0;
  let notFoundCount = 0;
  
  for (const [slug, imageUrl] of Object.entries(shipImages)) {
    try {
      const result = await db.update(ships)
        .set({ imageUrl })
        .where(eq(ships.slug, slug));
      
      if (result.rowsAffected > 0) {
        console.log(`✅ Foto atualizada: ${slug}`);
        updatedCount++;
      } else {
        console.log(`⚠️  Navio não encontrado: ${slug}`);
        notFoundCount++;
      }
    } catch (error) {
      console.error(`❌ Erro ao atualizar ${slug}:`, error.message);
    }
  }
  
  console.log(`\n📊 Resumo:`);
  console.log(`   ✅ Atualizados: ${updatedCount}`);
  console.log(`   ⚠️  Não encontrados: ${notFoundCount}`);
  console.log('\n✨ Processo concluído!');
  
  process.exit(0);
}

updateShipImages().catch(console.error);
