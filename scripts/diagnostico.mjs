import { db } from '../server/db.ts';
import { companies, ships, itineraries, ports, itineraryStops } from '../drizzle/schema.ts';

/**
 * Script de Diagnóstico - Verifica todos os dados no banco
 * Execute via: railway run tsx scripts/diagnostico.mjs
 */

async function diagnostico() {
  console.log('🔍 DIAGNÓSTICO DO BANCO DE DADOS\n');
  console.log('='.repeat(60));
  
  try {
    const database = await db();
    if (!database) {
      console.error('❌ Não foi possível conectar ao banco de dados');
      process.exit(1);
    }

    // 1. Verificar Companhias
    console.log('\n📊 COMPANHIAS:');
    console.log('-'.repeat(60));
    const allCompanies = await database.select().from(companies);
    console.log(`Total: ${allCompanies.length}`);
    
    const withLogos = allCompanies.filter(c => c.logoUrl);
    const withoutLogos = allCompanies.filter(c => !c.logoUrl);
    
    console.log(`✅ Com logos: ${withLogos.length}`);
    console.log(`❌ Sem logos: ${withoutLogos.length}`);
    
    if (withoutLogos.length > 0) {
      console.log('\n⚠️  Companhias sem logo:');
      withoutLogos.forEach(c => console.log(`   - ${c.name}`));
    }

    // 2. Verificar Navios
    console.log('\n\n🚢 NAVIOS:');
    console.log('-'.repeat(60));
    const allShips = await database.select().from(ships);
    console.log(`Total: ${allShips.length}`);
    
    const shipsWithImages = allShips.filter(s => s.imageUrl);
    const shipsWithoutImages = allShips.filter(s => !s.imageUrl);
    
    console.log(`✅ Com fotos: ${shipsWithImages.length}`);
    console.log(`❌ Sem fotos: ${shipsWithoutImages.length}`);
    
    if (shipsWithoutImages.length > 0) {
      console.log('\n⚠️  Navios sem foto:');
      shipsWithoutImages.slice(0, 10).forEach(s => console.log(`   - ${s.name}`));
      if (shipsWithoutImages.length > 10) {
        console.log(`   ... e mais ${shipsWithoutImages.length - 10}`);
      }
    }

    // 3. Verificar Itinerários
    console.log('\n\n🗺️  ITINERÁRIOS:');
    console.log('-'.repeat(60));
    const allItineraries = await database.select().from(itineraries);
    console.log(`Total: ${allItineraries.length}`);
    
    // Verificar itinerários por navio
    const shipItineraryCount = {};
    for (const itinerary of allItineraries) {
      shipItineraryCount[itinerary.shipId] = (shipItineraryCount[itinerary.shipId] || 0) + 1;
    }
    
    const shipsWithItineraries = Object.keys(shipItineraryCount).length;
    const shipsWithoutItineraries = allShips.length - shipsWithItineraries;
    
    console.log(`✅ Navios com itinerários: ${shipsWithItineraries}`);
    console.log(`❌ Navios sem itinerários: ${shipsWithoutItineraries}`);
    
    // Verificar itinerários incompletos (sem paradas)
    console.log('\n🔍 Verificando completude dos itinerários...');
    let itinerariesWithoutStops = 0;
    let itinerariesWithFewStops = 0;
    
    for (const itinerary of allItineraries) {
      const stops = await database.select()
        .from(itineraryStops)
        .where(eq(itineraryStops.itineraryId, itinerary.id));
      
      if (stops.length === 0) {
        itinerariesWithoutStops++;
      } else if (stops.length < 3) {
        itinerariesWithFewStops++;
      }
    }
    
    console.log(`❌ Itinerários sem paradas: ${itinerariesWithoutStops}`);
    console.log(`⚠️  Itinerários com poucas paradas (<3): ${itinerariesWithFewStops}`);

    // 4. Verificar Portos
    console.log('\n\n📍 PORTOS:');
    console.log('-'.repeat(60));
    const allPorts = await database.select().from(ports);
    console.log(`Total: ${allPorts.length}`);
    
    const portsWithCoordinates = allPorts.filter(p => p.latitude && p.longitude);
    const portsWithoutCoordinates = allPorts.filter(p => !p.latitude || !p.longitude);
    
    console.log(`✅ Com coordenadas: ${portsWithCoordinates.length}`);
    console.log(`❌ Sem coordenadas: ${portsWithoutCoordinates.length}`);

    // 5. Verificar Paradas de Itinerário
    console.log('\n\n🛑 PARADAS DE ITINERÁRIO:');
    console.log('-'.repeat(60));
    const allStops = await database.select().from(itineraryStops);
    console.log(`Total: ${allStops.length}`);

    // 6. Resumo Geral
    console.log('\n\n📊 RESUMO GERAL:');
    console.log('='.repeat(60));
    console.log(`Companhias: ${allCompanies.length} (${withLogos.length} com logos)`);
    console.log(`Navios: ${allShips.length} (${shipsWithImages.length} com fotos)`);
    console.log(`Itinerários: ${allItineraries.length}`);
    console.log(`Portos: ${allPorts.length}`);
    console.log(`Paradas: ${allStops.length}`);

    // 7. Ações Recomendadas
    console.log('\n\n🔧 AÇÕES RECOMENDADAS:');
    console.log('='.repeat(60));
    
    if (withoutLogos.length > 0) {
      console.log('1️⃣  Executar: railway run tsx scripts/update-company-logos.mjs');
    }
    
    if (shipsWithoutImages.length > 0) {
      console.log('2️⃣  Executar: railway run tsx scripts/update-ship-images.mjs');
    }
    
    if (allItineraries.length < 10 || itinerariesWithoutStops > 0) {
      console.log('3️⃣  Executar: railway run tsx scripts/seed-real-itineraries.mjs');
    }
    
    if (allItineraries.length === 0) {
      console.log('4️⃣  Executar TODOS os scripts de setup:');
      console.log('     railway run tsx scripts/update-company-logos.mjs');
      console.log('     railway run tsx scripts/update-ship-images.mjs');
      console.log('     railway run tsx scripts/seed-real-itineraries.mjs');
    }

    console.log('\n✅ Diagnóstico concluído!\n');
    
  } catch (error) {
    console.error('\n❌ Erro no diagnóstico:', error);
    process.exit(1);
  }
  
  process.exit(0);
}

// Importar eq para queries
import { eq } from 'drizzle-orm';

diagnostico().catch(console.error);
