import { drizzle } from "drizzle-orm/mysql2";
import { ships, ports, itineraries, itineraryStops } from "./drizzle/schema.js";

const db = drizzle(process.env.DATABASE_URL);

// Additional ships for each company
const newShips = [
  // Royal Caribbean - adicionar mais 3 navios
  {
    companyId: 1,
    name: "Oasis of the Seas",
    slug: "oasis-of-the-seas",
    yearBuilt: 2009,
    passengerCapacity: 5400,
    tonnage: 225282,
    length: "360.00",
    description: "Navio revolucionário que inaugurou a classe Oasis."
  },
  {
    companyId: 1,
    name: "Allure of the Seas",
    slug: "allure-of-the-seas",
    yearBuilt: 2010,
    passengerCapacity: 5400,
    tonnage: 225282,
    length: "360.00",
    description: "Irmão gêmeo do Oasis com experiências incríveis."
  },
  {
    companyId: 1,
    name: "Wonder of the Seas",
    slug: "wonder-of-the-seas",
    yearBuilt: 2022,
    passengerCapacity: 6988,
    tonnage: 236857,
    length: "362.00",
    description: "O maior navio de cruzeiro do mundo atualmente."
  },
  // Carnival - adicionar mais 4 navios
  {
    companyId: 2,
    name: "Carnival Horizon",
    slug: "carnival-horizon",
    yearBuilt: 2018,
    passengerCapacity: 3960,
    tonnage: 133500,
    length: "323.00",
    description: "Navio moderno da classe Vista com SkyRide."
  },
  {
    companyId: 2,
    name: "Carnival Mardi Gras",
    slug: "carnival-mardi-gras",
    yearBuilt: 2021,
    passengerCapacity: 5282,
    tonnage: 180800,
    length: "340.00",
    description: "Primeiro navio da Carnival movido a GNL."
  },
  {
    companyId: 2,
    name: "Carnival Celebration",
    slug: "carnival-celebration",
    yearBuilt: 2022,
    passengerCapacity: 5374,
    tonnage: 183900,
    length: "344.00",
    description: "Navio Excel-class com BOLT rollercoaster."
  },
  {
    companyId: 2,
    name: "Carnival Dream",
    slug: "carnival-dream",
    yearBuilt: 2009,
    passengerCapacity: 3646,
    tonnage: 130000,
    length: "306.00",
    description: "Navio Dream-class com WaterWorks park."
  },
  // MSC - adicionar mais 4 navios
  {
    companyId: 3,
    name: "MSC Seaside",
    slug: "msc-seaside",
    yearBuilt: 2017,
    passengerCapacity: 4140,
    tonnage: 153516,
    length: "323.00",
    description: "Design inovador que segue o sol."
  },
  {
    companyId: 3,
    name: "MSC Bellissima",
    slug: "msc-bellissima",
    yearBuilt: 2019,
    passengerCapacity: 4500,
    tonnage: 171598,
    length: "315.00",
    description: "Irmão do Meraviglia com Cirque du Soleil."
  },
  {
    companyId: 3,
    name: "MSC Virtuosa",
    slug: "msc-virtuosa",
    yearBuilt: 2021,
    passengerCapacity: 4842,
    tonnage: 181541,
    length: "331.00",
    description: "Navio Meraviglia-Plus com MSC Starship Club."
  },
  {
    companyId: 3,
    name: "MSC World Europa",
    slug: "msc-world-europa",
    yearBuilt: 2022,
    passengerCapacity: 4842,
    tonnage: 215863,
    length: "333.00",
    description: "Primeiro navio World Class movido a GNL."
  },
  // Norwegian - adicionar mais 4 navios
  {
    companyId: 4,
    name: "Norwegian Escape",
    slug: "norwegian-escape",
    yearBuilt: 2015,
    passengerCapacity: 4266,
    tonnage: 164600,
    length: "325.00",
    description: "Navio Breakaway-Plus com The Haven."
  },
  {
    companyId: 4,
    name: "Norwegian Bliss",
    slug: "norwegian-bliss",
    yearBuilt: 2018,
    passengerCapacity: 4004,
    tonnage: 168028,
    length: "333.00",
    description: "Perfeito para Alaska com go-kart track."
  },
  {
    companyId: 4,
    name: "Norwegian Joy",
    slug: "norwegian-joy",
    yearBuilt: 2017,
    passengerCapacity: 3804,
    tonnage: 167725,
    length: "333.00",
    description: "Entretenimento de classe mundial."
  },
  {
    companyId: 4,
    name: "Norwegian Prima",
    slug: "norwegian-prima",
    yearBuilt: 2022,
    passengerCapacity: 3215,
    tonnage: 142500,
    length: "294.00",
    description: "Primeira classe Prima com design inovador."
  },
  // Disney - adicionar mais 3 navios
  {
    companyId: 5,
    name: "Disney Dream",
    slug: "disney-dream",
    yearBuilt: 2011,
    passengerCapacity: 4000,
    tonnage: 129690,
    length: "339.00",
    description: "Magia Disney com AquaDuck water coaster."
  },
  {
    companyId: 5,
    name: "Disney Fantasy",
    slug: "disney-fantasy",
    yearBuilt: 2012,
    passengerCapacity: 4000,
    tonnage: 129690,
    length: "339.00",
    description: "Experiências mágicas para toda família."
  },
  {
    companyId: 5,
    name: "Disney Magic",
    slug: "disney-magic",
    yearBuilt: 1998,
    passengerCapacity: 2700,
    tonnage: 83338,
    length: "294.00",
    description: "Navio clássico Disney renovado."
  },
  // Celebrity - adicionar mais 4 navios
  {
    companyId: 6,
    name: "Celebrity Apex",
    slug: "celebrity-apex",
    yearBuilt: 2020,
    passengerCapacity: 2918,
    tonnage: 130818,
    length: "306.00",
    description: "Segunda classe Edge com design revolucionário."
  },
  {
    companyId: 6,
    name: "Celebrity Beyond",
    slug: "celebrity-beyond",
    yearBuilt: 2022,
    passengerCapacity: 3260,
    tonnage: 140600,
    length: "327.00",
    description: "Maior navio Edge-class com Le Voyage."
  },
  {
    companyId: 6,
    name: "Celebrity Millennium",
    slug: "celebrity-millennium",
    yearBuilt: 2000,
    passengerCapacity: 2218,
    tonnage: 91000,
    length: "294.00",
    description: "Navio clássico modernizado."
  },
  {
    companyId: 6,
    name: "Celebrity Equinox",
    slug: "celebrity-equinox",
    yearBuilt: 2009,
    passengerCapacity: 2850,
    tonnage: 122000,
    length: "315.00",
    description: "Solstice-class com Lawn Club."
  }
];

// Comprehensive port database
const portsData = [
  // Caribe
  { name: "Miami", city: "Miami", country: "Estados Unidos", latitude: "25.7617", longitude: "-80.1918" },
  { name: "Fort Lauderdale", city: "Fort Lauderdale", country: "Estados Unidos", latitude: "26.1224", longitude: "-80.1373" },
  { name: "Port Canaveral", city: "Cape Canaveral", country: "Estados Unidos", latitude: "28.4158", longitude: "-80.5944" },
  { name: "Nassau", city: "Nassau", country: "Bahamas", latitude: "25.0443", longitude: "-77.3504" },
  { name: "Cozumel", city: "Cozumel", country: "México", latitude: "20.5083", longitude: "-86.9458" },
  { name: "Grand Cayman", city: "George Town", country: "Ilhas Cayman", latitude: "19.2866", longitude: "-81.3744" },
  { name: "Jamaica", city: "Ocho Rios", country: "Jamaica", latitude: "18.4074", longitude: "-77.1039" },
  { name: "St. Thomas", city: "Charlotte Amalie", country: "Ilhas Virgens", latitude: "18.3381", longitude: "-64.8941" },
  { name: "St. Maarten", city: "Philipsburg", country: "St. Maarten", latitude: "18.0179", longitude: "-63.0458" },
  { name: "San Juan", city: "San Juan", country: "Porto Rico", latitude: "18.4655", longitude: "-66.1057" },
  { name: "Aruba", city: "Oranjestad", country: "Aruba", latitude: "12.5092", longitude: "-70.0086" },
  { name: "Barbados", city: "Bridgetown", country: "Barbados", latitude: "13.0969", longitude: "-59.6145" },
  
  // Mediterrâneo
  { name: "Barcelona", city: "Barcelona", country: "Espanha", latitude: "41.3851", longitude: "2.1734" },
  { name: "Roma (Civitavecchia)", city: "Roma", country: "Itália", latitude: "42.0942", longitude: "11.7907" },
  { name: "Veneza", city: "Veneza", country: "Itália", latitude: "45.4408", longitude: "12.3155" },
  { name: "Nápoles", city: "Nápoles", country: "Itália", latitude: "40.8518", longitude: "14.2681" },
  { name: "Atenas (Pireu)", city: "Atenas", country: "Grécia", latitude: "37.9838", longitude: "23.7275" },
  { name: "Santorini", city: "Santorini", country: "Grécia", latitude: "36.3932", longitude: "25.4615" },
  { name: "Mykonos", city: "Mykonos", country: "Grécia", latitude: "37.4467", longitude: "25.3289" },
  { name: "Dubrovnik", city: "Dubrovnik", country: "Croácia", latitude: "42.6507", longitude: "18.0944" },
  { name: "Marselha", city: "Marselha", country: "França", latitude: "43.2965", longitude: "5.3698" },
  { name: "Palma de Mallorca", city: "Palma", country: "Espanha", latitude: "39.5696", longitude: "2.6502" },
  
  // Alaska
  { name: "Seattle", city: "Seattle", country: "Estados Unidos", latitude: "47.6062", longitude: "-122.3321" },
  { name: "Vancouver", city: "Vancouver", country: "Canadá", latitude: "49.2827", longitude: "-123.1207" },
  { name: "Juneau", city: "Juneau", country: "Estados Unidos", latitude: "58.3019", longitude: "-134.4197" },
  { name: "Ketchikan", city: "Ketchikan", country: "Estados Unidos", latitude: "55.3422", longitude: "-131.6461" },
  { name: "Skagway", city: "Skagway", country: "Estados Unidos", latitude: "59.4583", longitude: "-135.3139" },
  { name: "Glacier Bay", city: "Glacier Bay", country: "Estados Unidos", latitude: "58.6658", longitude: "-136.9001" },
  
  // Norte da Europa
  { name: "Southampton", city: "Southampton", country: "Reino Unido", latitude: "50.9097", longitude: "-1.4044" },
  { name: "Copenhague", city: "Copenhague", country: "Dinamarca", latitude: "55.6761", longitude: "12.5683" },
  { name: "Estocolmo", city: "Estocolmo", country: "Suécia", latitude: "59.3293", longitude: "18.0686" },
  { name: "São Petersburgo", city: "São Petersburgo", country: "Rússia", latitude: "59.9343", longitude: "30.3351" },
  { name: "Tallinn", city: "Tallinn", country: "Estônia", latitude: "59.4370", longitude: "24.7536" },
];

// Generate comprehensive itineraries for all ships
function generateItinerariesForShip(shipId, shipName, companyId) {
  const itinerariesList = [];
  
  // Different itinerary templates based on company and ship
  if (companyId === 1) { // Royal Caribbean
    itinerariesList.push(
      {
        shipId,
        name: "Caribe Oriental - 7 Noites",
        duration: 7,
        startDate: "2026-03-15",
        endDate: "2026-03-22",
        description: "Explore as ilhas paradisíacas do Caribe Oriental",
        stops: [
          { portName: "Miami", day: 1, departure: "17:00" },
          { portName: "Nassau", day: 2, arrival: "08:00", departure: "17:00" },
          { portName: "St. Thomas", day: 3, arrival: "08:00", departure: "18:00" },
          { portName: "St. Maarten", day: 4, arrival: "08:00", departure: "17:00" },
          { portName: "Navegação", day: 5 },
          { portName: "Cozumel", day: 6, arrival: "08:00", departure: "17:00" },
          { portName: "Miami", day: 7, arrival: "07:00" }
        ]
      },
      {
        shipId,
        name: "Caribe Ocidental - 7 Noites",
        duration: 7,
        startDate: "2026-04-05",
        endDate: "2026-04-12",
        description: "Descubra as maravilhas do Caribe Ocidental",
        stops: [
          { portName: "Fort Lauderdale", day: 1, departure: "16:00" },
          { portName: "Navegação", day: 2 },
          { portName: "Cozumel", day: 3, arrival: "08:00", departure: "18:00" },
          { portName: "Grand Cayman", day: 4, arrival: "08:00", departure: "17:00" },
          { portName: "Jamaica", day: 5, arrival: "08:00", departure: "17:00" },
          { portName: "Navegação", day: 6 },
          { portName: "Fort Lauderdale", day: 7, arrival: "07:00" }
        ]
      }
    );
  } else if (companyId === 2) { // Carnival
    itinerariesList.push(
      {
        shipId,
        name: "Bahamas - 4 Noites",
        duration: 4,
        startDate: "2026-05-10",
        endDate: "2026-05-14",
        description: "Escapada rápida para as Bahamas",
        stops: [
          { portName: "Miami", day: 1, departure: "16:00" },
          { portName: "Nassau", day: 2, arrival: "08:00", departure: "18:00" },
          { portName: "Navegação", day: 3 },
          { portName: "Miami", day: 4, arrival: "08:00" }
        ]
      },
      {
        shipId,
        name: "Caribe Sul - 8 Noites",
        duration: 8,
        startDate: "2026-06-01",
        endDate: "2026-06-09",
        description: "Aventura pelo Caribe Sul",
        stops: [
          { portName: "Miami", day: 1, departure: "17:00" },
          { portName: "Navegação", day: 2 },
          { portName: "Aruba", day: 3, arrival: "08:00", departure: "23:00" },
          { portName: "Navegação", day: 4 },
          { portName: "Barbados", day: 5, arrival: "08:00", departure: "18:00" },
          { portName: "St. Thomas", day: 6, arrival: "08:00", departure: "18:00" },
          { portName: "Navegação", day: 7 },
          { portName: "Miami", day: 8, arrival: "08:00" }
        ]
      }
    );
  } else if (companyId === 3) { // MSC
    itinerariesList.push(
      {
        shipId,
        name: "Mediterrâneo Ocidental - 7 Noites",
        duration: 7,
        startDate: "2026-07-05",
        endDate: "2026-07-12",
        description: "Descubra as joias do Mediterrâneo",
        stops: [
          { portName: "Barcelona", day: 1, departure: "18:00" },
          { portName: "Marselha", day: 2, arrival: "08:00", departure: "18:00" },
          { portName: "Roma (Civitavecchia)", day: 3, arrival: "07:00", departure: "19:00" },
          { portName: "Nápoles", day: 4, arrival: "07:00", departure: "18:00" },
          { portName: "Navegação", day: 5 },
          { portName: "Palma de Mallorca", day: 6, arrival: "08:00", departure: "18:00" },
          { portName: "Barcelona", day: 7, arrival: "08:00" }
        ]
      },
      {
        shipId,
        name: "Grécia e Adriático - 10 Noites",
        duration: 10,
        startDate: "2026-08-15",
        endDate: "2026-08-25",
        description: "Explore a história e beleza do Mediterrâneo Oriental",
        stops: [
          { portName: "Veneza", day: 1, departure: "17:00" },
          { portName: "Dubrovnik", day: 2, arrival: "08:00", departure: "18:00" },
          { portName: "Navegação", day: 3 },
          { portName: "Santorini", day: 4, arrival: "08:00", departure: "20:00" },
          { portName: "Mykonos", day: 5, arrival: "08:00", departure: "18:00" },
          { portName: "Atenas (Pireu)", day: 6, arrival: "07:00", departure: "18:00" },
          { portName: "Navegação", day: 7 },
          { portName: "Nápoles", day: 8, arrival: "08:00", departure: "18:00" },
          { portName: "Roma (Civitavecchia)", day: 9, arrival: "07:00", departure: "19:00" },
          { portName: "Veneza", day: 10, arrival: "08:00" }
        ]
      }
    );
  } else if (companyId === 4) { // Norwegian
    itinerariesList.push(
      {
        shipId,
        name: "Alaska - 7 Noites",
        duration: 7,
        startDate: "2026-06-20",
        endDate: "2026-06-27",
        description: "Aventura glacial no Alasca",
        stops: [
          { portName: "Seattle", day: 1, departure: "16:00" },
          { portName: "Navegação", day: 2 },
          { portName: "Juneau", day: 3, arrival: "13:00", departure: "22:00" },
          { portName: "Skagway", day: 4, arrival: "07:00", departure: "20:00" },
          { portName: "Glacier Bay", day: 5, arrival: "06:00", departure: "15:00" },
          { portName: "Ketchikan", day: 6, arrival: "07:00", departure: "13:00" },
          { portName: "Vancouver", day: 7, arrival: "07:00", departure: "16:00" },
          { portName: "Seattle", day: 7, arrival: "19:00" }
        ]
      },
      {
        shipId,
        name: "Caribe - 7 Noites",
        duration: 7,
        startDate: "2026-09-10",
        endDate: "2026-09-17",
        description: "Estilo livre no Caribe",
        stops: [
          { portName: "Miami", day: 1, departure: "17:00" },
          { portName: "Navegação", day: 2 },
          { portName: "St. Thomas", day: 3, arrival: "08:00", departure: "18:00" },
          { portName: "San Juan", day: 4, arrival: "07:00", departure: "17:00" },
          { portName: "Nassau", day: 5, arrival: "08:00", departure: "17:00" },
          { portName: "Navegação", day: 6 },
          { portName: "Miami", day: 7, arrival: "07:00" }
        ]
      }
    );
  } else if (companyId === 5) { // Disney
    itinerariesList.push(
      {
        shipId,
        name: "Bahamas Disney - 4 Noites",
        duration: 4,
        startDate: "2026-10-05",
        endDate: "2026-10-09",
        description: "Magia Disney nas Bahamas",
        stops: [
          { portName: "Port Canaveral", day: 1, departure: "17:00" },
          { portName: "Nassau", day: 2, arrival: "09:30", departure: "17:30" },
          { portName: "Navegação", day: 3 },
          { portName: "Port Canaveral", day: 4, arrival: "07:30" }
        ]
      },
      {
        shipId,
        name: "Caribe Disney - 7 Noites",
        duration: 7,
        startDate: "2026-11-15",
        endDate: "2026-11-22",
        description: "Aventura mágica pelo Caribe",
        stops: [
          { portName: "Port Canaveral", day: 1, departure: "17:00" },
          { portName: "Navegação", day: 2 },
          { portName: "Cozumel", day: 3, arrival: "09:00", departure: "18:00" },
          { portName: "Grand Cayman", day: 4, arrival: "08:00", departure: "17:00" },
          { portName: "Jamaica", day: 5, arrival: "08:00", departure: "17:00" },
          { portName: "Navegação", day: 6 },
          { portName: "Port Canaveral", day: 7, arrival: "07:30" }
        ]
      }
    );
  } else if (companyId === 6) { // Celebrity
    itinerariesList.push(
      {
        shipId,
        name: "Norte da Europa - 12 Noites",
        duration: 12,
        startDate: "2026-07-20",
        endDate: "2026-08-01",
        description: "Capitais do Báltico e Escandinávia",
        stops: [
          { portName: "Southampton", day: 1, departure: "17:00" },
          { portName: "Navegação", day: 2 },
          { portName: "Copenhague", day: 3, arrival: "08:00", departure: "18:00" },
          { portName: "Estocolmo", day: 4, arrival: "08:00", departure: "17:00" },
          { portName: "Tallinn", day: 5, arrival: "08:00", departure: "18:00" },
          { portName: "São Petersburgo", day: 6, arrival: "07:00" },
          { portName: "São Petersburgo", day: 7, departure: "18:00" },
          { portName: "Navegação", day: 8 },
          { portName: "Copenhague", day: 9, arrival: "08:00", departure: "17:00" },
          { portName: "Navegação", day: 10 },
          { portName: "Navegação", day: 11 },
          { portName: "Southampton", day: 12, arrival: "07:00" }
        ]
      },
      {
        shipId,
        name: "Mediterrâneo - 9 Noites",
        duration: 9,
        startDate: "2026-09-25",
        endDate: "2026-10-04",
        description: "Experiência premium no Mediterrâneo",
        stops: [
          { portName: "Barcelona", day: 1, departure: "18:00" },
          { portName: "Palma de Mallorca", day: 2, arrival: "08:00", departure: "18:00" },
          { portName: "Navegação", day: 3 },
          { portName: "Roma (Civitavecchia)", day: 4, arrival: "07:00", departure: "19:00" },
          { portName: "Nápoles", day: 5, arrival: "07:00", departure: "18:00" },
          { portName: "Navegação", day: 6 },
          { portName: "Santorini", day: 7, arrival: "08:00", departure: "20:00" },
          { portName: "Atenas (Pireu)", day: 8, arrival: "07:00", departure: "17:00" },
          { portName: "Navegação", day: 9 },
          { portName: "Barcelona", day: 9, arrival: "07:00" }
        ]
      }
    );
  }
  
  return itinerariesList;
}

async function seedExpanded() {
  console.log("Starting expanded seeding...");
  
  // Insert new ships
  const insertedShips = [];
  for (const ship of newShips) {
    try {
      const result = await db.insert(ships).values(ship);
      insertedShips.push({ ...ship, id: Number(result[0].insertId) });
      console.log(`✓ Inserted ship: ${ship.name}`);
    } catch (error) {
      console.log(`✗ Ship ${ship.name} already exists or error:`, error.message);
    }
  }
  
  // Insert ports
  const portMap = new Map();
  for (const port of portsData) {
    try {
      const result = await db.insert(ports).values(port);
      portMap.set(port.name, Number(result[0].insertId));
      console.log(`✓ Inserted port: ${port.name}`);
    } catch (error) {
      // Port might already exist, try to find it
      console.log(`✗ Port ${port.name} might already exist`);
    }
  }
  
  // Generate and insert itineraries for ALL ships (existing + new)
  const allShipIds = [
    { id: 1, name: "Symphony of the Seas", companyId: 1 },
    { id: 2, name: "Harmony of the Seas", companyId: 1 },
    { id: 3, name: "Carnival Panorama", companyId: 2 },
    { id: 4, name: "Carnival Vista", companyId: 2 },
    { id: 5, name: "MSC Meraviglia", companyId: 3 },
    { id: 6, name: "Norwegian Encore", companyId: 4 },
    { id: 7, name: "Disney Wish", companyId: 5 },
    { id: 8, name: "Celebrity Edge", companyId: 6 },
    ...insertedShips.map(s => ({ id: s.id, name: s.name, companyId: s.companyId }))
  ];
  
  for (const ship of allShipIds) {
    const itinerariesForShip = generateItinerariesForShip(ship.id, ship.name, ship.companyId);
    
    for (const itinerary of itinerariesForShip) {
      try {
        const itinResult = await db.insert(itineraries).values({
          shipId: itinerary.shipId,
          name: itinerary.name,
          duration: itinerary.duration,
          startDate: itinerary.startDate,
          endDate: itinerary.endDate,
          description: itinerary.description
        });
        
        const itineraryId = Number(itinResult[0].insertId);
        
        // Insert stops
        for (const stop of itinerary.stops) {
          // Find or create port
          let portId = portMap.get(stop.portName);
          if (!portId) {
            // Try to find existing port or create navigation point
            const portData = portsData.find(p => p.name === stop.portName);
            if (portData) {
              const portResult = await db.insert(ports).values(portData);
              portId = Number(portResult[0].insertId);
              portMap.set(stop.portName, portId);
            } else {
              // Create navigation point
              const navResult = await db.insert(ports).values({
                name: stop.portName,
                city: null,
                country: null,
                latitude: null,
                longitude: null
              });
              portId = Number(navResult[0].insertId);
              portMap.set(stop.portName, portId);
            }
          }
          
          await db.insert(itineraryStops).values({
            itineraryId,
            portId,
            dayNumber: stop.day,
            arrivalTime: stop.arrival || null,
            departureTime: stop.departure || null,
            notes: null
          });
        }
        
        console.log(`✓ Created itinerary: ${itinerary.name} for ${ship.name}`);
      } catch (error) {
        console.log(`✗ Error creating itinerary for ${ship.name}:`, error.message);
      }
    }
  }
  
  console.log("Expanded seeding completed!");
  process.exit(0);
}

seedExpanded();
