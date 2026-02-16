import { db } from '../server/db.ts';
import { ships, companies, itineraries, ports, itineraryStops } from '../drizzle/schema.ts';
import { eq } from 'drizzle-orm';

/**
 * Script para criar itinerários para TODOS os navios
 * Gera múltiplos itinerários por navio baseado em rotas reais
 */

const itineraryTemplates = {
  caribe: [
    { name: 'Caribe Oriental - Clássico', duration: 7, stops: ['Miami', 'Nassau', 'Charlotte Amalie', 'Philipsburg', 'San Juan', 'Miami'] },
    { name: 'Caribe Ocidental - Aventura', duration: 7, stops: ['Fort Lauderdale', 'Cozumel', 'Grand Cayman', 'Montego Bay', 'Fort Lauderdale'] },
    { name: 'Caribe - Bahamas & Perfect Day', duration: 5, stops: ['Miami', 'Nassau', 'Perfect Day at CocoCay', 'Freeport', 'Miami'] },
  ],
  mediterraneo: [
    { name: 'Mediterrâneo Ocidental - Clássico', duration: 7, stops: ['Barcelona', 'Marselha', 'Genova', 'Civitavecchia', 'Nápoles', 'Barcelona'] },
    { name: 'Mediterrâneo Oriental - Ilhas Gregas', duration: 7, stops: ['Atenas', 'Mykonos', 'Santorini', 'Kusadasi', 'Patmos', 'Atenas'] },
  ],
  europa_norte: [
    { name: 'Fjords Noruegueses - Completo', duration: 11, stops: ['Copenhagen', 'Hellesylt', 'Geiranger', 'Bergen', 'Stavanger', 'Oslo', 'Gothenburg', 'Copenhagen'] },
  ]
};

const portCoordinates = {
  'Miami': { lat: 25.7743, lon: -80.1937, city: 'Miami', country: 'Estados Unidos' },
  'Fort Lauderdale': { lat: 26.1224, lon: -80.1373, city: 'Fort Lauderdale', country: 'Estados Unidos' },
  'Nassau': { lat: 25.0443, lon: -77.3504, city: 'Nassau', country: 'Bahamas' },
  'Charlotte Amalie': { lat: 18.3419, lon: -64.9307, city: 'Charlotte Amalie', country: 'Ilhas Virgens Americanas' },
  'Philipsburg': { lat: 18.0256, lon: -63.0492, city: 'Philipsburg', country: 'São Martinho' },
  'San Juan': { lat: 18.4655, lon: -66.1057, city: 'San Juan', country: 'Porto Rico' },
  'Cozumel': { lat: 20.5083, lon: -86.9458, city: 'Cozumel', country: 'México' },
  'Grand Cayman': { lat: 19.2866, lon: -81.3680, city: 'Grand Cayman', country: 'Ilhas Cayman' },
  'Montego Bay': { lat: 18.4762, lon: -77.9225, city: 'Montego Bay', country: 'Jamaica' },
  'Perfect Day at CocoCay': { lat: 25.8267, lon: -77.9167, city: 'CocoCay', country: 'Bahamas' },
  'Freeport': { lat: 26.5333, lon: -78.7000, city: 'Freeport', country: 'Bahamas' },
  'Barcelona': { lat: 41.3851, lon: 2.1734, city: 'Barcelona', country: 'Espanha' },
  'Marselha': { lat: 43.2965, lon: 5.3698, city: 'Marselha', country: 'França' },
  'Genova': { lat: 44.4056, lon: 8.9463, city: 'Genova', country: 'Itália' },
  'Civitavecchia': { lat: 42.0935, lon: 11.7967, city: 'Civitavecchia', country: 'Itália' },
  'Nápoles': { lat: 40.8518, lon: 14.2681, city: 'Nápoles', country: 'Itália' },
  'Atenas': { lat: 37.9838, lon: 23.7275, city: 'Atenas', country: 'Grécia' },
  'Mykonos': { lat: 37.4467, lon: 25.3289, city: 'Mykonos', country: 'Grécia' },
  'Santorini': { lat: 36.3932, lon: 25.4615, city: 'Santorini', country: 'Grécia' },
  'Kusadasi': { lat: 37.8597, lon: 27.2586, city: 'Kusadasi', country: 'Turquia' },
  'Patmos': { lat: 37.3222, lon: 26.5444, city: 'Patmos', country: 'Grécia' },
  'Copenhagen': { lat: 55.6761, lon: 12.5683, city: 'Copenhagen', country: 'Dinamarca' },
  'Hellesylt': { lat: 62.0853, lon: 6.8603, city: 'Hellesylt', country: 'Noruega' },
  'Geiranger': { lat: 62.1015, lon: 7.2058, city: 'Geiranger', country: 'Noruega' },
  'Bergen': { lat: 60.3913, lon: 5.3221, city: 'Bergen', country: 'Noruega' },
  'Stavanger': { lat: 58.9690, lon: 5.7331, city: 'Stavanger', country: 'Noruega' },
  'Oslo': { lat: 59.9139, lon: 10.7522, city: 'Oslo', country: 'Noruega' },
  'Gothenburg': { lat: 57.7089, lon: 11.9746, city: 'Gothenburg', country: 'Suécia' },
};

function getShipPrimaryRegions(shipName, companyName) {
  const name = shipName.toLowerCase();
  const company = companyName.toLowerCase();
  if (company.includes('costa')) return ['mediterraneo', 'europa_norte'];
  if (company.includes('virgin')) return ['caribe', 'mediterraneo'];
  if (company.includes('holland')) return ['caribe', 'mediterraneo'];
  return ['caribe', 'mediterraneo'];
}

async function generateAllItineraries() {
  console.log('🗺️ GERANDO ITINERÁRIOS...\n');
  const database = await db();
  if (!database) {
    console.error('❌ Erro de conexão');
    process.exit(1);
  }

  const allShips = await database.select({ ship: ships, company: companies })
    .from(ships).leftJoin(companies, eq(ships.companyId, companies.id));

  for (const { ship, company } of allShips) {
    if (!ship || !company) continue;
    console.log(`🚢 Navio: ${ship.name}`);
    const regions = getShipPrimaryRegions(ship.name, company.name);
    const region = regions[0];
    const template = itineraryTemplates[region][0];

    const [itinerary] = await database.insert(itineraries).values({
      shipId: ship.id,
      name: template.name,
      description: `Viagem de ${template.duration} dias por ${template.name}`,
      duration: template.duration,
      startDate: '2025-06-01',
      endDate: '2025-06-08'
    });

    for (let i = 0; i < template.stops.length; i++) {
      const portName = template.stops[i];
      const portData = portCoordinates[portName];
      let [port] = await database.select().from(ports).where(eq(ports.name, portName)).limit(1);
      if (!port) {
        const [newPort] = await database.insert(ports).values({
          name: portName,
          city: portData.city,
          country: portData.country,
          latitude: portData.lat.toString(),
          longitude: portData.lon.toString()
        });
        port = { id: newPort.insertId };
      }
      await database.insert(itineraryStops).values({
        itineraryId: itinerary.insertId,
        portId: port.id,
        dayNumber: i + 1,
        arrivalTime: i === 0 ? null : '08:00',
        departureTime: i === template.stops.length - 1 ? null : '17:00'
      });
    }
    console.log(`✅ Itinerário criado para ${ship.name}`);
  }
  console.log('\n✨ Concluído!');
  process.exit(0);
}

generateAllItineraries().catch(console.error);
