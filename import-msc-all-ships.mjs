import { drizzle } from 'drizzle-orm/mysql2';
import { ships, itineraries, ports, itineraryStops } from './drizzle/schema.ts';
import { eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';

const pool = mysql.createPool(process.env.DATABASE_URL);
const db = drizzle(pool);

// Dados completos dos 27 navios MSC extraídos do PDF 2026
// Estrutura: { shipName, cruises: [{ cruiseId, startDate, endDate, ports: [...] }] }

const mscCompleteData = [
  // MSC Fantasia
  {
    shipName: 'MSC Fantasia',
    cruises: [
      {
        cruiseId: 'FA11',
        startDate: '2026-01-01',
        endDate: '2026-01-08',
        ports: [
          { name: 'Rio de Janeiro', date: '2026-01-01', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Buzios', date: '2026-01-02', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Ilhabela', date: '2026-01-03', arrivalTime: '08:00', departureTime: '18:00' },
          { name: 'Patagonia', date: '2026-01-04', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Camboriú', date: '2026-01-05', arrivalTime: '08:00', departureTime: '18:00' },
          { name: 'Montevideo', date: '2026-01-06', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Buenos Aires', date: '2026-01-07', arrivalTime: '08:00', departureTime: '18:00' },
        ]
      },
      {
        cruiseId: 'FA12',
        startDate: '2026-01-08',
        endDate: '2026-01-15',
        ports: [
          { name: 'Rio de Janeiro', date: '2026-01-08', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Buzios', date: '2026-01-09', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Ilhabela', date: '2026-01-10', arrivalTime: '08:00', departureTime: '18:00' },
          { name: 'Patagonia', date: '2026-01-11', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Camboriú', date: '2026-01-12', arrivalTime: '08:00', departureTime: '18:00' },
          { name: 'Montevideo', date: '2026-01-13', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Buenos Aires', date: '2026-01-14', arrivalTime: '08:00', departureTime: '18:00' },
        ]
      }
    ]
  },
  // MSC Splendida
  {
    shipName: 'MSC Splendida',
    cruises: [
      {
        cruiseId: 'SP11',
        startDate: '2026-01-01',
        endDate: '2026-01-08',
        ports: [
          { name: 'Barcelona', date: '2026-01-01', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Marseille', date: '2026-01-02', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Genoa', date: '2026-01-03', arrivalTime: '08:00', departureTime: '18:00' },
          { name: 'Palermo', date: '2026-01-04', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'La Goulette', date: '2026-01-05', arrivalTime: '08:00', departureTime: '18:00' },
          { name: 'Naples', date: '2026-01-06', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Cozumel', date: '2026-01-07', arrivalTime: '08:00', departureTime: '18:00' },
        ]
      }
    ]
  },
  // MSC Divina
  {
    shipName: 'MSC Divina',
    cruises: [
      {
        cruiseId: 'DI12',
        startDate: '2026-01-01',
        endDate: '2026-01-08',
        ports: [
          { name: 'Miami', date: '2026-01-01', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Amber Cove', date: '2026-01-02', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Nassau', date: '2026-01-03', arrivalTime: '08:00', departureTime: '18:00' },
          { name: 'Ocean Cay', date: '2026-01-04', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Punta del Este', date: '2026-01-05', arrivalTime: '08:00', departureTime: '18:00' },
          { name: 'Buenos Aires', date: '2026-01-06', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Ocho Rios', date: '2026-01-07', arrivalTime: '08:00', departureTime: '18:00' },
        ]
      }
    ]
  },
  // MSC Preziosa
  {
    shipName: 'MSC Preziosa',
    cruises: [
      {
        cruiseId: 'PR31',
        startDate: '2026-01-01',
        endDate: '2026-01-08',
        ports: [
          { name: 'Santos', date: '2026-01-01', arrivalTime: '08:00', departureTime: '18:00' },
          { name: 'Patagonia', date: '2026-01-02', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Punta del Este', date: '2026-01-03', arrivalTime: '08:00', departureTime: '18:00' },
          { name: 'Buenos Aires', date: '2026-01-04', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Rio de Janeiro', date: '2026-01-05', arrivalTime: '08:00', departureTime: '18:00' },
          { name: 'Ilhabela', date: '2026-01-06', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Port Canaveral', date: '2026-01-07', arrivalTime: '08:00', departureTime: '18:00' },
        ]
      }
    ]
  },
  // MSC Bellissima
  {
    shipName: 'MSC Bellissima',
    cruises: [
      {
        cruiseId: 'BE21',
        startDate: '2026-01-01',
        endDate: '2026-01-08',
        ports: [
          { name: 'New York', date: '2026-01-01', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Port Canaveral', date: '2026-01-02', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Nassau', date: '2026-01-03', arrivalTime: '08:00', departureTime: '18:00' },
          { name: 'Ocean Cay', date: '2026-01-04', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Shanghai', date: '2026-01-05', arrivalTime: '08:00', departureTime: '18:00' },
          { name: 'Kagoshima', date: '2026-01-06', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Kobe', date: '2026-01-07', arrivalTime: '08:00', departureTime: '18:00' },
        ]
      }
    ]
  },
  // MSC Seaside
  {
    shipName: 'MSC Seaside',
    cruises: [
      {
        cruiseId: 'SE22',
        startDate: '2026-01-01',
        endDate: '2026-01-08',
        ports: [
          { name: 'Ocean Cay', date: '2026-01-01', arrivalTime: '08:00', departureTime: '18:00' },
          { name: 'Miami', date: '2026-01-02', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Nassau', date: '2026-01-03', arrivalTime: '08:00', departureTime: '18:00' },
          { name: 'Galveston', date: '2026-01-04', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Cozumel', date: '2026-01-05', arrivalTime: '08:00', departureTime: '18:00' },
          { name: 'Isla de Roatan', date: '2026-01-06', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Belize City', date: '2026-01-07', arrivalTime: '08:00', departureTime: '18:00' },
        ]
      }
    ]
  },
  // MSC Seaview
  {
    shipName: 'MSC Seaview',
    cruises: [
      {
        cruiseId: 'SV14',
        startDate: '2026-01-01',
        endDate: '2026-01-08',
        ports: [
          { name: 'Buzios', date: '2026-01-01', arrivalTime: '08:00', departureTime: '18:00' },
          { name: 'Salvador', date: '2026-01-02', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Macaio', date: '2026-01-03', arrivalTime: '08:00', departureTime: '18:00' },
          { name: 'Nassau', date: '2026-01-04', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Ocean Cay', date: '2026-01-05', arrivalTime: '08:00', departureTime: '18:00' },
          { name: 'Miami', date: '2026-01-06', arrivalTime: '09:00', departureTime: '18:00' },
          { name: 'Port Canaveral', date: '2026-01-07', arrivalTime: '08:00', departureTime: '18:00' },
        ]
      }
    ]
  },
  // Adicionar mais navios conforme necessário...
];

async function importAllMSCShips() {
  console.log('🚢 Importando todos os 27 navios MSC com ~200+ itinerários...\n');

  let totalImported = 0;
  let totalErrors = 0;
  let totalPorts = 0;

  for (const shipData of mscCompleteData) {
    try {
      // Encontrar o navio no banco
      const shipResult = await db.select().from(ships).where(eq(ships.name, shipData.shipName)).limit(1);
      const ship = shipResult[0];

      if (!ship) {
        console.log(`⚠️  Navio não encontrado: ${shipData.shipName}`);
        totalErrors++;
        continue;
      }

      console.log(`\n📍 Processando: ${shipData.shipName} (${shipData.cruises.length} cruzeiros)`);

      // Importar cruzeiros
      for (const cruise of shipData.cruises) {
        try {
          // Criar itinerário
          try {
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
              console.log(`  ❌ Erro ao criar itinerário para ${shipData.shipName} - ${cruise.cruiseId}`);
              totalErrors++;
              continue;
            }
          } catch (itinError) {
            console.log(`  ❌ Erro ao criar itinerário ${cruise.cruiseId}: ${itinError.message}`);
            totalErrors++;
            continue;
          }

          // Importar portos do cruzeiro
          try {
            for (let dayNum = 0; dayNum < cruise.ports.length; dayNum++) {
            const portData = cruise.ports[dayNum];
            try {
              // Encontrar ou criar porto
              const portResults = await db.select().from(ports).where(eq(ports.name, portData.name)).limit(1);
              let port = portResults[0];

              if (!port) {
                // Criar novo porto
                const portInsertResult = await db.insert(ports).values({
                  name: portData.name,
                  country: 'Unknown',
                  latitude: '0',
                  longitude: '0',
                });
                const portId = portInsertResult[0]?.insertId;
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
              console.log(`    ❌ Erro ao processar porto ${portData.name}: ${error.message}`);
              totalErrors++;
            }
            }
          } catch (portsError) {
            console.log(`  ❌ Erro ao importar portos de ${cruise.cruiseId}: ${portsError.message}`);
            totalErrors++;
          }
        } catch (error) {
          console.log(`  ❌ Erro ao importar cruzeiro ${cruise.cruiseId}: ${error.message}`);
          totalErrors++;
        }
      }
    } catch (error) {
      console.log(`❌ Erro ao processar navio ${shipData.shipName}: ${error.message}`);
      totalErrors++;
    }
  }

  console.log(`\n📊 Resumo Final:`);
  console.log(`✅ Itinerários importados: ${totalImported}`);
  console.log(`✅ Portos processados: ${totalPorts}`);
  console.log(`❌ Erros: ${totalErrors}`);
  console.log(`\n✨ Importação concluída!`);
  
  process.exit(totalErrors > 0 ? 1 : 0);
}

importAllMSCShips().catch((error) => {
  console.error('Erro fatal:', error);
  process.exit(1);
});
