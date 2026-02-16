import { drizzle } from 'drizzle-orm/mysql2';
import { ships, itineraries, ports, itineraryStops } from './drizzle/schema.ts';
import { eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';

const pool = mysql.createPool(process.env.DATABASE_URL);
const db = drizzle(pool);

// Dados dos 7 navios MSC principais
const mscData = [
  {
    shipName: 'MSC Fantasia',
    cruises: [
      {
        cruiseId: 'FA11',
        startDate: '2026-01-01',
        endDate: '2026-01-08',
        ports: [
          { name: 'Rio de Janeiro', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Buzios', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Ilhabela', arrivalTime: '08:00', departureTime: '18:00' },
          { name: 'Patagonia', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Camboriú', arrivalTime: '08:00', departureTime: '18:00' },
          { name: 'Montevideo', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Buenos Aires', arrivalTime: '08:00', departureTime: '18:00' },
        ]
      }
    ]
  },
  {
    shipName: 'MSC Splendida',
    cruises: [
      {
        cruiseId: 'SP11',
        startDate: '2026-01-01',
        endDate: '2026-01-08',
        ports: [
          { name: 'Barcelona', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Marseille', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Genoa', arrivalTime: '08:00', departureTime: '18:00' },
          { name: 'Palermo', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'La Goulette', arrivalTime: '08:00', departureTime: '18:00' },
          { name: 'Naples', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Cozumel', arrivalTime: '08:00', departureTime: '18:00' },
        ]
      }
    ]
  },
  {
    shipName: 'MSC Divina',
    cruises: [
      {
        cruiseId: 'DI12',
        startDate: '2026-01-01',
        endDate: '2026-01-08',
        ports: [
          { name: 'Miami', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Amber Cove', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Nassau', arrivalTime: '08:00', departureTime: '18:00' },
          { name: 'Ocean Cay', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Punta del Este', arrivalTime: '08:00', departureTime: '18:00' },
          { name: 'Buenos Aires', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Ocho Rios', arrivalTime: '08:00', departureTime: '18:00' },
        ]
      }
    ]
  },
];

async function importMSCData() {
  console.log('🚢 Importando dados MSC...\n');

  let totalItineraries = 0;
  let totalPorts = 0;
  let totalErrors = 0;

  for (const shipData of mscData) {
    try {
      // Encontrar navio
      const shipResults = await db.select().from(ships).where(eq(ships.name, shipData.shipName)).limit(1);
      const ship = shipResults[0];

      if (!ship) {
        console.log(`⚠️  Navio não encontrado: ${shipData.shipName}`);
        totalErrors++;
        continue;
      }

      console.log(`\n📍 ${shipData.shipName}`);

      // Processar cada cruzeiro
      for (const cruise of shipData.cruises) {
        try {
          // Criar itinerário
          const startDate = new Date(cruise.startDate);
          const endDate = new Date(cruise.endDate);
          const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

          const itineraryResult = await db.insert(itineraries).values({
            shipId: ship.id,
            name: `${shipData.shipName} - ${cruise.cruiseId}`,
            startDate: startDate,
            endDate: endDate,
            duration: duration,
            description: `Cruzeiro ${cruise.cruiseId} - ${cruise.ports.length} portos`,
          });

          const itineraryId = itineraryResult[0]?.insertId;

          if (!itineraryId) {
            console.log(`  ❌ Erro ao criar itinerário ${cruise.cruiseId}`);
            totalErrors++;
            continue;
          }

          console.log(`  ✅ Cruzeiro ${cruise.cruiseId} criado (ID: ${itineraryId})`);
          totalItineraries++;

          // Processar portos
          for (let dayNum = 0; dayNum < cruise.ports.length; dayNum++) {
            const portData = cruise.ports[dayNum];

            try {
              // Encontrar ou criar porto
              const portResults = await db.select().from(ports).where(eq(ports.name, portData.name)).limit(1);
              let port = portResults[0];

              if (!port) {
                const portResult = await db.insert(ports).values({
                  name: portData.name,
                  country: 'Unknown',
                  latitude: '0',
                  longitude: '0',
                });
                const portId = portResult[0]?.insertId;
                port = { id: portId };
              }

              // Criar escala
              await db.insert(itineraryStops).values({
                itineraryId: itineraryId,
                portId: port.id,
                dayNumber: dayNum + 1,
                arrivalTime: portData.arrivalTime,
                departureTime: portData.departureTime,
              });

              totalPorts++;
            } catch (error) {
              console.log(`    ❌ Erro com porto ${portData.name}: ${error.message}`);
              totalErrors++;
            }
          }
        } catch (error) {
          console.log(`  ❌ Erro ao processar cruzeiro ${cruise.cruiseId}: ${error.message}`);
          totalErrors++;
        }
      }
    } catch (error) {
      console.log(`❌ Erro ao processar ${shipData.shipName}: ${error.message}`);
      totalErrors++;
    }
  }

  console.log(`\n📊 Resumo:`);
  console.log(`✅ Itinerários: ${totalItineraries}`);
  console.log(`✅ Portos: ${totalPorts}`);
  console.log(`❌ Erros: ${totalErrors}`);
  console.log(`\n✨ Concluído!`);

  process.exit(totalErrors > 0 ? 1 : 0);
}

importMSCData().catch((error) => {
  console.error('Erro fatal:', error);
  process.exit(1);
});
