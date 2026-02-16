import { db } from '../server/db.ts';
import { itineraries, itineraryStops } from '../drizzle/schema.ts';
import { eq } from 'drizzle-orm';

/**
 * Script para limpar itinerários incorretos ou incompletos
 * Execute via: railway run tsx scripts/limpar-itinerarios-errados.mjs
 */

async function limparItinerariosErrados() {
  console.log('🧹 LIMPANDO ITINERÁRIOS INCORRETOS\n');
  
  try {
    const database = await db();
    if (!database) {
      console.error('❌ Não foi possível conectar ao banco de dados');
      process.exit(1);
    }

    // 1. Buscar todos os itinerários
    const allItineraries = await database.select().from(itineraries);
    console.log(`📊 Total de itinerários encontrados: ${allItineraries.length}\n`);

    let removidos = 0;
    let mantidos = 0;

    for (const itinerary of allItineraries) {
      // Verificar paradas do itinerário
      const stops = await database.select()
        .from(itineraryStops)
        .where(eq(itineraryStops.itineraryId, itinerary.id));

      // Critérios para remover:
      // - Sem paradas
      // - Menos de 3 paradas (muito curto/incompleto)
      // - Datas inválidas ou muito antigas
      const shouldRemove = 
        stops.length === 0 || 
        stops.length < 3 ||
        !itinerary.startDate ||
        !itinerary.endDate ||
        new Date(itinerary.startDate) < new Date('2024-01-01');

      if (shouldRemove) {
        console.log(`❌ Removendo: "${itinerary.name}"`);
        console.log(`   - Paradas: ${stops.length}`);
        console.log(`   - Datas: ${itinerary.startDate} → ${itinerary.endDate}`);
        
        // Remover paradas primeiro
        if (stops.length > 0) {
          await database.delete(itineraryStops)
            .where(eq(itineraryStops.itineraryId, itinerary.id));
        }
        
        // Remover itinerário
        await database.delete(itineraries)
          .where(eq(itineraries.id, itinerary.id));
        
        removidos++;
      } else {
        mantidos++;
      }
    }

    console.log('\n📊 RESUMO:');
    console.log(`   ❌ Removidos: ${removidos}`);
    console.log(`   ✅ Mantidos: ${mantidos}`);
    console.log('\n✨ Limpeza concluída!');
    console.log('\n💡 Próximo passo: Execute o script de seed para adicionar itinerários corretos:');
    console.log('   railway run tsx scripts/seed-real-itineraries.mjs\n');

  } catch (error) {
    console.error('\n❌ Erro na limpeza:', error);
    process.exit(1);
  }
  
  process.exit(0);
}

limparItinerariosErrados().catch(console.error);
