import { db } from '../server/db.ts';
import { ships, itineraries, ports, itineraryStops } from '../drizzle/schema.ts';
import { eq } from 'drizzle-orm';

/**
 * Itinerários reais e atualizados das principais companhias de cruzeiro
 * Dados baseados em rotas populares para 2025-2026
 */

const realItineraries = [
  // Royal Caribbean - Caribe Oriental
  {
    shipSlug: 'symphony-of-the-seas',
    name: 'Caribe Oriental - 7 Noites',
    description: 'Explore as ilhas paradisíacas do Caribe Oriental com paradas em destinos incríveis',
    duration: 7,
    startDate: '2025-03-15',
    endDate: '2025-03-22',
    stops: [
      { portName: 'Miami', country: 'Estados Unidos', dayNumber: 1, arrivalTime: null, departureTime: '16:00' },
      { portName: 'Nassau', country: 'Bahamas', dayNumber: 2, arrivalTime: '07:00', departureTime: '17:00' },
      { portName: 'Charlotte Amalie', country: 'Ilhas Virgens Americanas', dayNumber: 3, arrivalTime: '08:00', departureTime: '18:00' },
      { portName: 'Philipsburg', country: 'São Martinho', dayNumber: 4, arrivalTime: '08:00', departureTime: '17:00' },
      { portName: 'Perfect Day at CocoCay', country: 'Bahamas', dayNumber: 6, arrivalTime: '07:00', departureTime: '17:00' },
      { portName: 'Miami', country: 'Estados Unidos', dayNumber: 7, arrivalTime: '06:00', departureTime: null }
    ]
  },
  
  // Carnival - Caribe Ocidental
  {
    shipSlug: 'carnival-celebration',
    name: 'Caribe Ocidental - 8 Dias',
    description: 'Aventura completa pelo Caribe Ocidental com os melhores destinos',
    duration: 8,
    startDate: '2025-04-10',
    endDate: '2025-04-18',
    stops: [
      { portName: 'Port Canaveral', country: 'Estados Unidos', dayNumber: 1, arrivalTime: null, departureTime: '15:30' },
      { portName: 'Cozumel', country: 'México', dayNumber: 3, arrivalTime: '08:00', departureTime: '18:00' },
      { portName: 'Roatan', country: 'Honduras', dayNumber: 4, arrivalTime: '08:00', departureTime: '16:00' },
      { portName: 'Belize City', country: 'Belize', dayNumber: 5, arrivalTime: '08:00', departureTime: '17:00' },
      { portName: 'Costa Maya', country: 'México', dayNumber: 6, arrivalTime: '08:00', departureTime: '16:00' },
      { portName: 'Port Canaveral', country: 'Estados Unidos', dayNumber: 8, arrivalTime: '07:00', departureTime: null }
    ]
  },
  
  // Norwegian - Mediterrâneo
  {
    shipSlug: 'norwegian-prima',
    name: 'Mediterrâneo Ocidental - 10 Dias',
    description: 'Descobra as maravilhas do Mediterrâneo visitando cidades históricas',
    duration: 10,
    startDate: '2025-05-20',
    endDate: '2025-05-30',
    stops: [
      { portName: 'Barcelona', country: 'Espanha', dayNumber: 1, arrivalTime: null, departureTime: '17:00' },
      { portName: 'Marselha', country: 'França', dayNumber: 2, arrivalTime: '08:00', departureTime: '18:00' },
      { portName: 'Genova', country: 'Itália', dayNumber: 3, arrivalTime: '08:00', departureTime: '17:00' },
      { portName: 'La Spezia', country: 'Itália', dayNumber: 4, arrivalTime: '07:00', departureTime: '19:00' },
      { portName: 'Civitavecchia', country: 'Itália', dayNumber: 5, arrivalTime: '07:00', departureTime: '20:00' },
      { portName: 'Nápoles', country: 'Itália', dayNumber: 6, arrivalTime: '07:00', departureTime: '18:00' },
      { portName: 'Livorno', country: 'Itália', dayNumber: 8, arrivalTime: '07:00', departureTime: '19:00' },
      { portName: 'Cannes', country: 'França', dayNumber: 9, arrivalTime: '08:00', departureTime: '18:00' },
      { portName: 'Barcelona', country: 'Espanha', dayNumber: 10, arrivalTime: '06:00', departureTime: null }
    ]
  },
  
  // MSC - Caribe
  {
    shipSlug: 'msc-world-europa',
    name: 'Caribe do Sul - 7 Noites',
    description: 'Navegue pelas águas cristalinas do Caribe do Sul',
    duration: 7,
    startDate: '2025-06-01',
    endDate: '2025-06-08',
    stops: [
      { portName: 'Miami', country: 'Estados Unidos', dayNumber: 1, arrivalTime: null, departureTime: '18:00' },
      { portName: 'Oranjestad', country: 'Aruba', dayNumber: 3, arrivalTime: '08:00', departureTime: '22:00' },
      { portName: 'Willemstad', country: 'Curaçao', dayNumber: 4, arrivalTime: '08:00', departureTime: '18:00' },
      { portName: 'Kralendijk', country: 'Bonaire', dayNumber: 5, arrivalTime: '08:00', departureTime: '18:00' },
      { portName: 'Miami', country: 'Estados Unidos', dayNumber: 7, arrivalTime: '07:00', departureTime: null }
    ]
  },
  
  // Princess - Alasca
  {
    shipSlug: 'discovery-princess',
    name: 'Alasca - Voyage of the Glaciers',
    description: 'Experiência única navegando pelos fiordes e glaciares do Alasca',
    duration: 7,
    startDate: '2025-07-15',
    endDate: '2025-07-22',
    stops: [
      { portName: 'Vancouver', country: 'Canadá', dayNumber: 1, arrivalTime: null, departureTime: '16:00' },
      { portName: 'Ketchikan', country: 'Estados Unidos', dayNumber: 3, arrivalTime: '06:30', departureTime: '15:00' },
      { portName: 'Juneau', country: 'Estados Unidos', dayNumber: 4, arrivalTime: '13:00', departureTime: '22:00' },
      { portName: 'Skagway', country: 'Estados Unidos', dayNumber: 5, arrivalTime: '07:00', departureTime: '20:00' },
      { portName: 'Glacier Bay', country: 'Estados Unidos', dayNumber: 6, arrivalTime: '06:00', departureTime: '15:00' },
      { portName: 'Vancouver', country: 'Canadá', dayNumber: 7, arrivalTime: '07:00', departureTime: null }
    ]
  },
  
  // Celebrity - Ilhas Gregas
  {
    shipSlug: 'celebrity-beyond',
    name: 'Ilhas Gregas - 9 Noites',
    description: 'Descubra a beleza das ilhas gregas e da costa turca',
    duration: 9,
    startDate: '2025-08-10',
    endDate: '2025-08-19',
    stops: [
      { portName: 'Atenas', country: 'Grécia', dayNumber: 1, arrivalTime: null, departureTime: '17:00' },
      { portName: 'Mykonos', country: 'Grécia', dayNumber: 2, arrivalTime: '08:00', departureTime: '22:00' },
      { portName: 'Kusadasi', country: 'Turquia', dayNumber: 3, arrivalTime: '07:00', departureTime: '18:00' },
      { portName: 'Patmos', country: 'Grécia', dayNumber: 4, arrivalTime: '08:00', departureTime: '18:00' },
      { portName: 'Heraklion', country: 'Grécia', dayNumber: 5, arrivalTime: '07:00', departureTime: '16:00' },
      { portName: 'Santorini', country: 'Grécia', dayNumber: 6, arrivalTime: '08:00', departureTime: '22:00' },
      { portName: 'Atenas', country: 'Grécia', dayNumber: 9, arrivalTime: '06:00', departureTime: null }
    ]
  },
  
  // Disney - Caribe
  {
    shipSlug: 'disney-wish',
    name: 'Caribe Mágico - 7 Noites',
    description: 'Aventura familiar mágica pelo Caribe com paradas exclusivas',
    duration: 7,
    startDate: '2025-09-05',
    endDate: '2025-09-12',
    stops: [
      { portName: 'Port Canaveral', country: 'Estados Unidos', dayNumber: 1, arrivalTime: null, departureTime: '17:00' },
      { portName: 'Castaway Cay', country: 'Bahamas', dayNumber: 3, arrivalTime: '09:30', departureTime: '16:45' },
      { portName: 'Grand Cayman', country: 'Ilhas Cayman', dayNumber: 4, arrivalTime: '07:45', departureTime: '16:30' },
      { portName: 'Cozumel', country: 'México', dayNumber: 5, arrivalTime: '09:45', departureTime: '18:30' },
      { portName: 'Port Canaveral', country: 'Estados Unidos', dayNumber: 7, arrivalTime: '07:30', departureTime: null }
    ]
  },
  
  // Virgin Voyages - Caribe
  {
    shipSlug: 'scarlet-lady',
    name: 'Caribe Rebelde - 5 Noites',
    description: 'Experiência adulta contemporânea navegando pelo Caribe',
    duration: 5,
    startDate: '2025-10-15',
    endDate: '2025-10-20',
    stops: [
      { portName: 'Miami', country: 'Estados Unidos', dayNumber: 1, arrivalTime: null, departureTime: '17:00' },
      { portName: 'Bimini', country: 'Bahamas', dayNumber: 2, arrivalTime: '08:00', departureTime: '18:00' },
      { portName: 'Puerto Plata', country: 'República Dominicana', dayNumber: 3, arrivalTime: '08:00', departureTime: '18:00' },
      { portName: 'Miami', country: 'Estados Unidos', dayNumber: 5, arrivalTime: '06:30', departureTime: null }
    ]
  },
  
  // Royal Caribbean - Transatlântico
  {
    shipSlug: 'allure-of-the-seas',
    name: 'Transatlântico - Miami para Barcelona',
    description: 'Travessia épica cruzando o Atlântico',
    duration: 14,
    startDate: '2025-11-01',
    endDate: '2025-11-15',
    stops: [
      { portName: 'Miami', country: 'Estados Unidos', dayNumber: 1, arrivalTime: null, departureTime: '17:00' },
      { portName: 'Nassau', country: 'Bahamas', dayNumber: 2, arrivalTime: '08:00', departureTime: '17:00' },
      { portName: 'Ponta Delgada', country: 'Portugal', dayNumber: 8, arrivalTime: '08:00', departureTime: '17:00' },
      { portName: 'Lisboa', country: 'Portugal', dayNumber: 10, arrivalTime: '08:00', departureTime: '18:00' },
      { portName: 'Málaga', country: 'Espanha', dayNumber: 12, arrivalTime: '08:00', departureTime: '18:00' },
      { portName: 'Palma de Mallorca', country: 'Espanha', dayNumber: 13, arrivalTime: '08:00', departureTime: '17:00' },
      { portName: 'Barcelona', country: 'Espanha', dayNumber: 14, arrivalTime: '06:00', departureTime: null }
    ]
  },
  
  // Norwegian - Fjords Noruegueses
  {
    shipSlug: 'norwegian-viva',
    name: 'Fjords Noruegueses - 11 Dias',
    description: 'Explore os majestosos fjords da Noruega',
    duration: 11,
    startDate: '2025-06-20',
    endDate: '2025-07-01',
    stops: [
      { portName: 'Copenhagen', country: 'Dinamarca', dayNumber: 1, arrivalTime: null, departureTime: '16:00' },
      { portName: 'Hellesylt', country: 'Noruega', dayNumber: 3, arrivalTime: '09:00', departureTime: '17:00' },
      { portName: 'Geiranger', country: 'Noruega', dayNumber: 3, arrivalTime: '18:00', departureTime: '23:00' },
      { portName: 'Bergen', country: 'Noruega', dayNumber: 4, arrivalTime: '08:00', departureTime: '18:00' },
      { portName: 'Stavanger', country: 'Noruega', dayNumber: 5, arrivalTime: '08:00', departureTime: '17:00' },
      { portName: 'Oslo', country: 'Noruega', dayNumber: 7, arrivalTime: '07:00', departureTime: '17:00' },
      { portName: 'Gothenburg', country: 'Suécia', dayNumber: 8, arrivalTime: '08:00', departureTime: '17:00' },
      { portName: 'Copenhagen', country: 'Dinamarca', dayNumber: 11, arrivalTime: '06:00', departureTime: null }
    ]
  }
];

// Coordenadas dos portos
const portCoordinates = {
  'Miami': { lat: 25.7743, lon: -80.1937, city: 'Miami', country: 'Estados Unidos' },
  'Nassau': { lat: 25.0443, lon: -77.3504, city: 'Nassau', country: 'Bahamas' },
  'Charlotte Amalie': { lat: 18.3419, lon: -64.9307, city: 'Charlotte Amalie', country: 'Ilhas Virgens Americanas' },
  'Philipsburg': { lat: 18.0256, lon: -63.0492, city: 'Philipsburg', country: 'São Martinho' },
  'Perfect Day at CocoCay': { lat: 25.8267, lon: -77.9167, city: 'CocoCay', country: 'Bahamas' },
  'Port Canaveral': { lat: 28.4072, lon: -80.6097, city: 'Port Canaveral', country: 'Estados Unidos' },
  'Cozumel': { lat: 20.5083, lon: -86.9458, city: 'Cozumel', country: 'México' },
  'Roatan': { lat: 16.3237, lon: -86.5322, city: 'Roatan', country: 'Honduras' },
  'Belize City': { lat: 17.4981, lon: -88.1888, city: 'Belize City', country: 'Belize' },
  'Costa Maya': { lat: 18.7431, lon: -87.7081, city: 'Costa Maya', country: 'México' },
  'Barcelona': { lat: 41.3851, lon: 2.1734, city: 'Barcelona', country: 'Espanha' },
  'Marselha': { lat: 43.2965, lon: 5.3698, city: 'Marselha', country: 'França' },
  'Genova': { lat: 44.4056, lon: 8.9463, city: 'Genova', country: 'Itália' },
  'La Spezia': { lat: 44.1024, lon: 9.8246, city: 'La Spezia', country: 'Itália' },
  'Civitavecchia': { lat: 42.0935, lon: 11.7967, city: 'Civitavecchia', country: 'Itália' },
  'Nápoles': { lat: 40.8518, lon: 14.2681, city: 'Nápoles', country: 'Itália' },
  'Livorno': { lat: 43.5485, lon: 10.3106, city: 'Livorno', country: 'Itália' },
  'Cannes': { lat: 43.5528, lon: 7.0174, city: 'Cannes', country: 'França' },
  'Oranjestad': { lat: 12.5186, lon: -70.0358, city: 'Oranjestad', country: 'Aruba' },
  'Willemstad': { lat: 12.1224, lon: -68.8824, city: 'Willemstad', country: 'Curaçao' },
  'Kralendijk': { lat: 12.1508, lon: -68.2769, city: 'Kralendijk', country: 'Bonaire' },
  'Vancouver': { lat: 49.2827, lon: -123.1207, city: 'Vancouver', country: 'Canadá' },
  'Ketchikan': { lat: 55.3422, lon: -131.6461, city: 'Ketchikan', country: 'Estados Unidos' },
  'Juneau': { lat: 58.3019, lon: -134.4197, city: 'Juneau', country: 'Estados Unidos' },
  'Skagway': { lat: 59.4581, lon: -135.3136, city: 'Skagway', country: 'Estados Unidos' },
  'Glacier Bay': { lat: 58.6658, lon: -136.1678, city: 'Glacier Bay', country: 'Estados Unidos' },
  'Atenas': { lat: 37.9838, lon: 23.7275, city: 'Atenas', country: 'Grécia' },
  'Mykonos': { lat: 37.4467, lon: 25.3289, city: 'Mykonos', country: 'Grécia' },
  'Kusadasi': { lat: 37.8565, lon: 27.2597, city: 'Kusadasi', country: 'Turquia' },
  'Patmos': { lat: 37.3085, lon: 26.5480, city: 'Patmos', country: 'Grécia' },
  'Heraklion': { lat: 35.3387, lon: 25.1442, city: 'Heraklion', country: 'Grécia' },
  'Santorini': { lat: 36.3932, lon: 25.4615, city: 'Santorini', country: 'Grécia' },
  'Castaway Cay': { lat: 26.7567, lon: -77.5383, city: 'Castaway Cay', country: 'Bahamas' },
  'Grand Cayman': { lat: 19.2866, lon: -81.3680, city: 'Grand Cayman', country: 'Ilhas Cayman' },
  'Bimini': { lat: 25.7314, lon: -79.2965, city: 'Bimini', country: 'Bahamas' },
  'Puerto Plata': { lat: 19.8078, lon: -70.6925, city: 'Puerto Plata', country: 'República Dominicana' },
  'Ponta Delgada': { lat: 37.7412, lon: -25.6756, city: 'Ponta Delgada', country: 'Portugal' },
  'Lisboa': { lat: 38.7223, lon: -9.1393, city: 'Lisboa', country: 'Portugal' },
  'Málaga': { lat: 36.7213, lon: -4.4214, city: 'Málaga', country: 'Espanha' },
  'Palma de Mallorca': { lat: 39.5696, lon: 2.6502, city: 'Palma de Mallorca', country: 'Espanha' },
  'Copenhagen': { lat: 55.6761, lon: 12.5683, city: 'Copenhagen', country: 'Dinamarca' },
  'Hellesylt': { lat: 62.0853, lon: 6.8572, city: 'Hellesylt', country: 'Noruega' },
  'Geiranger': { lat: 62.1011, lon: 7.2060, city: 'Geiranger', country: 'Noruega' },
  'Bergen': { lat: 60.3913, lon: 5.3221, city: 'Bergen', country: 'Noruega' },
  'Stavanger': { lat: 58.9700, lon: 5.7331, city: 'Stavanger', country: 'Noruega' },
  'Oslo': { lat: 59.9139, lon: 10.7522, city: 'Oslo', country: 'Noruega' },
  'Gothenburg': { lat: 57.7089, lon: 11.9746, city: 'Gothenburg', country: 'Suécia' }
};

async function seedRealItineraries() {
  console.log('🗺️  Populando itinerários reais...\n');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const itinerary of realItineraries) {
    try {
      // Buscar o navio
      const [ship] = await db.select().from(ships).where(eq(ships.slug, itinerary.shipSlug)).limit(1);
      
      if (!ship) {
        console.log(`⚠️  Navio não encontrado: ${itinerary.shipSlug}`);
        errorCount++;
        continue;
      }
      
      // Criar o itinerário
      const [createdItinerary] = await db.insert(itineraries).values({
        shipId: ship.id,
        name: itinerary.name,
        description: itinerary.description,
        duration: itinerary.duration,
        startDate: itinerary.startDate,
        endDate: itinerary.endDate
      });
      
      // Criar ou buscar portos e adicionar paradas
      for (const stop of itinerary.stops) {
        const portCoord = portCoordinates[stop.portName];
        
        if (!portCoord) {
          console.log(`⚠️  Coordenadas não encontradas para: ${stop.portName}`);
          continue;
        }
        
        // Buscar ou criar porto
        let [port] = await db.select().from(ports).where(eq(ports.name, stop.portName)).limit(1);
        
        if (!port) {
          [port] = await db.insert(ports).values({
            name: stop.portName,
            city: portCoord.city,
            country: stop.country,
            latitude: portCoord.lat.toString(),
            longitude: portCoord.lon.toString()
          });
        }
        
        // Criar parada
        await db.insert(itineraryStops).values({
          itineraryId: createdItinerary.insertId,
          portId: port.id || port.insertId,
          dayNumber: stop.dayNumber,
          arrivalTime: stop.arrivalTime,
          departureTime: stop.departureTime
        });
      }
      
      console.log(`✅ Itinerário criado: ${itinerary.name} (${ship.name})`);
      successCount++;
      
    } catch (error) {
      console.error(`❌ Erro ao criar itinerário ${itinerary.name}:`, error.message);
      errorCount++;
    }
  }
  
  console.log(`\n📊 Resumo:`);
  console.log(`   ✅ Sucesso: ${successCount}`);
  console.log(`   ❌ Erros: ${errorCount}`);
  console.log('\n✨ Processo concluído!');
  
  process.exit(0);
}

seedRealItineraries().catch(console.error);
