import { drizzle } from "drizzle-orm/mysql2";
import { ships, ports, itineraries, itineraryStops, companies } from "./drizzle/schema.js";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL);

// Itinerary templates by region
const itineraryTemplates = {
  caribbean_east: {
    name: "Caribe Oriental",
    duration: 7,
    ports: ["Miami", "Nassau", "St. Thomas", "St. Maarten", "San Juan", "Cozumel"]
  },
  caribbean_west: {
    name: "Caribe Ocidental",
    duration: 7,
    ports: ["Fort Lauderdale", "Cozumel", "Grand Cayman", "Jamaica", "Nassau"]
  },
  caribbean_south: {
    name: "Caribe Sul",
    duration: 8,
    ports: ["Miami", "Aruba", "Barbados", "St. Thomas", "San Juan"]
  },
  bahamas: {
    name: "Bahamas",
    duration: 4,
    ports: ["Port Canaveral", "Nassau", "Port Canaveral"]
  },
  mediterranean_west: {
    name: "Mediterrâneo Ocidental",
    duration: 7,
    ports: ["Barcelona", "Marselha", "Roma (Civitavecchia)", "Nápoles", "Palma de Mallorca"]
  },
  mediterranean_east: {
    name: "Mediterrâneo Oriental",
    duration: 10,
    ports: ["Veneza", "Dubrovnik", "Santorini", "Mykonos", "Atenas (Pireu)", "Nápoles"]
  },
  alaska: {
    name: "Alaska",
    duration: 7,
    ports: ["Seattle", "Juneau", "Skagway", "Glacier Bay", "Ketchikan", "Vancouver"]
  },
  northern_europe: {
    name: "Norte da Europa",
    duration: 12,
    ports: ["Southampton", "Copenhague", "Estocolmo", "Tallinn", "São Petersburgo"]
  }
};

// Company routing preferences
const companyRoutes = {
  1: ["caribbean_east", "caribbean_west", "bahamas"], // Royal Caribbean
  2: ["caribbean_west", "caribbean_south", "bahamas"], // Carnival
  3: ["mediterranean_west", "mediterranean_east"], // MSC
  4: ["alaska", "caribbean_east", "caribbean_west"], // Norwegian
  5: ["bahamas", "caribbean_east"], // Disney
  6: ["northern_europe", "mediterranean_west", "mediterranean_east"] // Celebrity
};

function generateItineraryStops(template, startDate) {
  const stops = [];
  let currentDay = 1;
  
  template.ports.forEach((portName, index) => {
    if (index === 0) {
      // Departure port
      stops.push({
        portName,
        dayNumber: currentDay,
        arrivalTime: null,
        departureTime: "17:00"
      });
    } else if (index === template.ports.length - 1) {
      // Final port
      stops.push({
        portName,
        dayNumber: currentDay + index,
        arrivalTime: "07:00",
        departureTime: null
      });
    } else {
      // Intermediate ports with navigation days
      if (index % 2 === 1) {
        // Add navigation day
        stops.push({
          portName: "Navegação",
          dayNumber: currentDay + index,
          arrivalTime: null,
          departureTime: null
        });
      }
      stops.push({
        portName,
        dayNumber: currentDay + index + (index % 2 === 1 ? 1 : 0),
        arrivalTime: "08:00",
        departureTime: "18:00"
      });
    }
  });
  
  return stops;
}

function getStartDate(monthOffset) {
  const date = new Date();
  date.setMonth(date.getMonth() + monthOffset);
  date.setDate(15); // Always 15th of month
  return date.toISOString().split('T')[0];
}

async function generateItinerariesForAllShips() {
  console.log("Starting itinerary generation for all ships...\n");
  
  // Get all ships with their company info
  const allShips = await db.select().from(ships);
  console.log(`Found ${allShips.length} ships\n`);
  
  // Get all ports
  const allPorts = await db.select().from(ports);
  const portMap = new Map(allPorts.map(p => [p.name, p.id]));
  
  let totalCreated = 0;
  let totalSkipped = 0;
  
  for (const ship of allShips) {
    const routes = companyRoutes[ship.companyId] || ["caribbean_east", "caribbean_west"];
    
    // Generate 2 itineraries per ship
    for (let i = 0; i < 2; i++) {
      const routeKey = routes[i % routes.length];
      const template = itineraryTemplates[routeKey];
      
      const startDate = getStartDate(i * 2 + 1); // Stagger dates
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + template.duration);
      
      try {
        // Create itinerary
        const itinResult = await db.insert(itineraries).values({
          shipId: ship.id,
          name: `${template.name} - ${template.duration} Noites`,
          duration: template.duration,
          startDate: startDate,
          endDate: endDate.toISOString().split('T')[0],
          description: `Explore as maravilhas do ${template.name}`
        });
        
        const itineraryId = Number(itinResult[0].insertId);
        
        // Generate and create stops
        const stops = generateItineraryStops(template, startDate);
        
        for (const stop of stops) {
          let portId = portMap.get(stop.portName);
          
          // Create navigation port if doesn't exist
          if (!portId && stop.portName === "Navegação") {
            const navResult = await db.insert(ports).values({
              name: "Navegação",
              city: null,
              country: null,
              latitude: null,
              longitude: null,
              timezone: null
            });
            portId = Number(navResult[0].insertId);
            portMap.set("Navegação", portId);
          }
          
          if (portId) {
            await db.insert(itineraryStops).values({
              itineraryId,
              portId,
              dayNumber: stop.dayNumber,
              arrivalTime: stop.arrivalTime,
              departureTime: stop.departureTime,
              notes: null
            });
          }
        }
        
        totalCreated++;
        if (totalCreated % 20 === 0) {
          console.log(`Progress: ${totalCreated} itineraries created...`);
        }
      } catch (error) {
        totalSkipped++;
        // Skip if itinerary already exists
      }
    }
  }
  
  console.log(`\n=== Summary ===`);
  console.log(`Total itineraries created: ${totalCreated}`);
  console.log(`Skipped (duplicates): ${totalSkipped}`);
  console.log(`Expected total: ${allShips.length * 2} (2 per ship)`);
  
  process.exit(0);
}

generateItinerariesForAllShips();
