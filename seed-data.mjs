import { drizzle } from "drizzle-orm/mysql2";
import { companies, ships } from "./drizzle/schema.js";

const db = drizzle(process.env.DATABASE_URL);

const companiesData = [
  {
    name: "Royal Caribbean",
    slug: "royal-caribbean",
    description: "Uma das maiores companhias de cruzeiro do mundo, conhecida por seus navios inovadores e experiências emocionantes.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Royal_Caribbean_International_logo.svg/200px-Royal_Caribbean_International_logo.svg.png",
    websiteUrl: "https://www.royalcaribbean.com"
  },
  {
    name: "Carnival Cruise Line",
    slug: "carnival",
    description: "A maior companhia de cruzeiros do mundo em número de passageiros, oferecendo diversão e entretenimento para toda a família.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Carnival_Cruise_Line_logo.svg/200px-Carnival_Cruise_Line_logo.svg.png",
    websiteUrl: "https://www.carnival.com"
  },
  {
    name: "MSC Cruises",
    slug: "msc-cruises",
    description: "Companhia europeia líder em cruzeiros, oferecendo experiências mediterrâneas autênticas e destinos globais.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/MSC_Cruises_logo.svg/200px-MSC_Cruises_logo.svg.png",
    websiteUrl: "https://www.msccruises.com"
  },
  {
    name: "Norwegian Cruise Line",
    slug: "norwegian",
    description: "Pioneira em estilo livre de cruzeiros, oferecendo flexibilidade e liberdade aos passageiros.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Norwegian_Cruise_Line_logo.svg/200px-Norwegian_Cruise_Line_logo.svg.png",
    websiteUrl: "https://www.ncl.com"
  },
  {
    name: "Disney Cruise Line",
    slug: "disney",
    description: "Cruzeiros mágicos da Disney, perfeitos para famílias com experiências temáticas inesquecíveis.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Disney_Cruise_Line_logo.svg/200px-Disney_Cruise_Line_logo.svg.png",
    websiteUrl: "https://disneycruise.disney.go.com"
  },
  {
    name: "Celebrity Cruises",
    slug: "celebrity",
    description: "Cruzeiros premium com design moderno e culinária excepcional.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Celebrity_Cruises_logo.svg/200px-Celebrity_Cruises_logo.svg.png",
    websiteUrl: "https://www.celebritycruises.com"
  }
];

const shipsData = [
  // Royal Caribbean
  {
    companyId: 1,
    name: "Symphony of the Seas",
    slug: "symphony-of-the-seas",
    imageUrl: "https://www.royalcaribbean.com/content/dam/royal/data/ships/symphony/photos/symphony-of-the-seas-exterior-aerial-view.jpg",
    yearBuilt: 2018,
    passengerCapacity: 6680,
    crewCapacity: 2200,
    tonnage: 228081,
    length: "362.00",
    description: "O maior navio de cruzeiro do mundo, oferecendo experiências incomparáveis."
  },
  {
    companyId: 1,
    name: "Harmony of the Seas",
    slug: "harmony-of-the-seas",
    yearBuilt: 2016,
    passengerCapacity: 6687,
    tonnage: 226963,
    length: "362.00",
    description: "Navio revolucionário com atrações incríveis e entretenimento de classe mundial."
  },
  // Carnival
  {
    companyId: 2,
    name: "Carnival Panorama",
    slug: "carnival-panorama",
    yearBuilt: 2019,
    passengerCapacity: 3954,
    tonnage: 133500,
    length: "323.00",
    description: "Navio moderno com montanha-russa e experiências gastronômicas diversificadas."
  },
  {
    companyId: 2,
    name: "Carnival Vista",
    slug: "carnival-vista",
    yearBuilt: 2016,
    passengerCapacity: 3934,
    tonnage: 133500,
    length: "323.00",
    description: "Inovação e diversão em alto mar com atrações para toda a família."
  },
  // MSC
  {
    companyId: 3,
    name: "MSC Meraviglia",
    slug: "msc-meraviglia",
    yearBuilt: 2017,
    passengerCapacity: 5714,
    tonnage: 171598,
    length: "315.00",
    description: "Elegância mediterrânea com tecnologia de ponta e entretenimento sofisticado."
  },
  // Norwegian
  {
    companyId: 4,
    name: "Norwegian Encore",
    slug: "norwegian-encore",
    yearBuilt: 2019,
    passengerCapacity: 3998,
    tonnage: 169116,
    length: "333.00",
    description: "Estilo livre com pista de kart e experiências culinárias diversificadas."
  },
  // Disney
  {
    companyId: 5,
    name: "Disney Wish",
    slug: "disney-wish",
    yearBuilt: 2022,
    passengerCapacity: 4000,
    tonnage: 144000,
    length: "340.00",
    description: "O mais novo navio da Disney com experiências mágicas e tecnologia inovadora."
  },
  // Celebrity
  {
    companyId: 6,
    name: "Celebrity Edge",
    slug: "celebrity-edge",
    yearBuilt: 2018,
    passengerCapacity: 2918,
    tonnage: 130818,
    length: "306.00",
    description: "Design revolucionário com Magic Carpet e experiências gastronômicas premium."
  }
];

async function seed() {
  console.log("Seeding database...");
  
  // Insert companies
  for (const company of companiesData) {
    try {
      await db.insert(companies).values(company);
      console.log(`✓ Inserted company: ${company.name}`);
    } catch (error) {
      console.log(`✗ Company ${company.name} already exists or error:`, error.message);
    }
  }
  
  // Insert ships
  for (const ship of shipsData) {
    try {
      await db.insert(ships).values(ship);
      console.log(`✓ Inserted ship: ${ship.name}`);
    } catch (error) {
      console.log(`✗ Ship ${ship.name} already exists or error:`, error.message);
    }
  }
  
  console.log("Seeding completed!");
  process.exit(0);
}

seed();
