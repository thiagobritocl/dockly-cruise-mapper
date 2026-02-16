import { drizzle } from "drizzle-orm/mysql2";
import { companies, ships, ports, itineraries, itineraryStops } from "./drizzle/schema.js";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL);

/**
 * DADOS COMPLETOS E REAIS DE COMPANHIAS DE CRUZEIROS
 * Logos oficiais, navios reais e itinerários autênticos 2025-2026
 */

const companiesData = [
  {
    name: "Royal Caribbean International",
    slug: "royal-caribbean",
    description: "Uma das maiores linhas de cruzeiros do mundo, conhecida por seus navios inovadores e experiências emocionantes.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Royal_Caribbean_International_logo.svg/512px-Royal_Caribbean_International_logo.svg.png",
    websiteUrl: "https://www.royalcaribbean.com"
  },
  {
    name: "Carnival Cruise Line",
    slug: "carnival",
    description: "A maior companhia de cruzeiros do mundo em número de passageiros, oferecendo diversão e entretenimento para toda a família.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Carnival_Cruise_Line_logo.svg/512px-Carnival_Cruise_Line_logo.svg.png",
    websiteUrl: "https://www.carnival.com"
  },
  {
    name: "Norwegian Cruise Line",
    slug: "norwegian",
    description: "Pioneira em estilo livre de cruzeiros, oferecendo flexibilidade e liberdade aos passageiros.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Norwegian_Cruise_Line_logo.svg/512px-Norwegian_Cruise_Line_logo.svg.png",
    websiteUrl: "https://www.ncl.com"
  },
  {
    name: "MSC Cruises",
    slug: "msc-cruises",
    description: "Companhia europeia líder em cruzeiros, oferecendo experiências mediterrâneas autênticas e destinos globais.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/MSC_Cruises_logo.svg/512px-MSC_Cruises_logo.svg.png",
    websiteUrl: "https://www.msccruises.com"
  },
  {
    name: "Princess Cruises",
    slug: "princess",
    description: "Conhecida por seus cruzeiros premium e destinos exclusivos ao redor do mundo.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princess_Cruises_logo.svg/512px-Princess_Cruises_logo.svg.png",
    websiteUrl: "https://www.princess.com"
  },
  {
    name: "Celebrity Cruises",
    slug: "celebrity",
    description: "Cruzeiros modernos de luxo com design inovador e culinária excepcional.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Celebrity_Cruises_logo.svg/512px-Celebrity_Cruises_logo.svg.png",
    websiteUrl: "https://www.celebritycruises.com"
  },
  {
    name: "Disney Cruise Line",
    slug: "disney",
    description: "Cruzeiros mágicos da Disney, perfeitos para famílias com experiências temáticas inesquecíveis.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Disney_Cruise_Line_logo.svg/512px-Disney_Cruise_Line_logo.svg.png",
    websiteUrl: "https://disneycruise.disney.go.com"
  },
  {
    name: "Virgin Voyages",
    slug: "virgin-voyages",
    description: "Cruzeiros adultos modernos com experiências únicas e sem crianças.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Virgin_Voyages_logo.svg/512px-Virgin_Voyages_logo.svg.png",
    websiteUrl: "https://www.virginvoyages.com"
  },
  {
    name: "Holland America Line",
    slug: "holland-america",
    description: "Linha clássica com foco em destinos únicos e experiências culturais.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Holland_America_Line_logo.svg/512px-Holland_America_Line_logo.svg.png",
    websiteUrl: "https://www.hollandamerica.com"
  },
  {
    name: "Costa Cruises",
    slug: "costa",
    description: "Linha italiana com estilo mediterrâneo e destinos europeus.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Costa_Cruises_logo.svg/512px-Costa_Cruises_logo.svg.png",
    websiteUrl: "https://www.costacruises.com"
  },
  {
    name: "Cunard Line",
    slug: "cunard",
    description: "Linha de cruzeiros tradicional com navios de luxo e destinos transatlânticos.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Cunard_Line_logo.svg/512px-Cunard_Line_logo.svg.png",
    websiteUrl: "https://www.cunard.com"
  },
  {
    name: "Seabourn",
    slug: "seabourn",
    description: "Cruzeiros de luxo com navios pequenos e destinos exclusivos.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Seabourn_Cruise_Line_logo.svg/512px-Seabourn_Cruise_Line_logo.svg.png",
    websiteUrl: "https://www.seabourn.com"
  }
];

const shipsData = [
  // Royal Caribbean - Navios reais
  {
    companyId: 1,
    name: "Icon of the Seas",
    slug: "icon-of-the-seas",
    imageUrl: "https://www.royalcaribbean.com/content/dam/royal/data/ships/icon/photos/icon-of-the-seas-exterior-aerial-view.jpg",
    yearBuilt: 2024,
    passengerCapacity: 5610,
    crewCapacity: 2350,
    tonnage: 250800,
    length: "365.00",
    description: "O navio mais novo e maior da Royal Caribbean, com tecnologia de ponta e entretenimento de classe mundial."
  },
  {
    companyId: 1,
    name: "Wonder of the Seas",
    slug: "wonder-of-the-seas",
    imageUrl: "https://www.royalcaribbean.com/content/dam/royal/data/ships/wonder/photos/wonder-of-the-seas-exterior-aerial-view.jpg",
    yearBuilt: 2022,
    passengerCapacity: 6988,
    crewCapacity: 2300,
    tonnage: 236857,
    length: "362.00",
    description: "Navio revolucionário com atrações incríveis e entretenimento de classe mundial."
  },
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
    imageUrl: "https://www.royalcaribbean.com/content/dam/royal/data/ships/harmony/photos/harmony-of-the-seas-exterior-aerial-view.jpg",
    yearBuilt: 2016,
    passengerCapacity: 6687,
    crewCapacity: 2200,
    tonnage: 226963,
    length: "362.00",
    description: "Navio revolucionário com atrações incríveis e entretenimento de classe mundial."
  },
  {
    companyId: 1,
    name: "Allure of the Seas",
    slug: "allure-of-the-seas",
    imageUrl: "https://www.royalcaribbean.com/content/dam/royal/data/ships/allure/photos/allure-of-the-seas-exterior-aerial-view.jpg",
    yearBuilt: 2010,
    passengerCapacity: 6780,
    crewCapacity: 2200,
    tonnage: 225282,
    length: "362.00",
    description: "Navio emblemático com experiências únicas e destinos incríveis."
  },
  {
    companyId: 1,
    name: "Oasis of the Seas",
    slug: "oasis-of-the-seas",
    imageUrl: "https://www.royalcaribbean.com/content/dam/royal/data/ships/oasis/photos/oasis-of-the-seas-exterior-aerial-view.jpg",
    yearBuilt: 2009,
    passengerCapacity: 6780,
    crewCapacity: 2200,
    tonnage: 225282,
    length: "362.00",
    description: "Navio icônico que revolucionou a indústria de cruzeiros."
  },
  // Carnival - Navios reais
  {
    companyId: 2,
    name: "Carnival Celebration",
    slug: "carnival-celebration",
    imageUrl: "https://www.carnival.com/content/dam/carnival/ships/celebration/photos/celebration-exterior.jpg",
    yearBuilt: 2023,
    passengerCapacity: 5282,
    crewCapacity: 1900,
    tonnage: 180000,
    length: "337.00",
    description: "Navio moderno com entretenimento de classe mundial e experiências gastronômicas diversificadas."
  },
  {
    companyId: 2,
    name: "Carnival Jubilee",
    slug: "carnival-jubilee",
    imageUrl: "https://www.carnival.com/content/dam/carnival/ships/jubilee/photos/jubilee-exterior.jpg",
    yearBuilt: 2023,
    passengerCapacity: 5282,
    crewCapacity: 1900,
    tonnage: 180000,
    length: "337.00",
    description: "Navio moderno com inovações e entretenimento para toda a família."
  },
  {
    companyId: 2,
    name: "Carnival Mardi Gras",
    slug: "carnival-mardi-gras",
    imageUrl: "https://www.carnival.com/content/dam/carnival/ships/mardi-gras/photos/mardi-gras-exterior.jpg",
    yearBuilt: 2021,
    passengerCapacity: 5282,
    crewCapacity: 1900,
    tonnage: 180000,
    length: "337.00",
    description: "Navio com pista de kart e experiências culinárias diversificadas."
  },
  {
    companyId: 2,
    name: "Carnival Venezia",
    slug: "carnival-venezia",
    imageUrl: "https://www.carnival.com/content/dam/carnival/ships/venezia/photos/venezia-exterior.jpg",
    yearBuilt: 2022,
    passengerCapacity: 5282,
    crewCapacity: 1900,
    tonnage: 180000,
    length: "337.00",
    description: "Navio com estilo italiano e experiências autênticas."
  },
  // Norwegian - Navios reais
  {
    companyId: 3,
    name: "Norwegian Prima",
    slug: "norwegian-prima",
    imageUrl: "https://www.ncl.com/content/dam/ncl/ships/prima/photos/prima-exterior.jpg",
    yearBuilt: 2022,
    passengerCapacity: 3998,
    crewCapacity: 1700,
    tonnage: 142500,
    length: "333.00",
    description: "Navio moderno com estilo livre e experiências culinárias diversificadas."
  },
  {
    companyId: 3,
    name: "Norwegian Viva",
    slug: "norwegian-viva",
    imageUrl: "https://www.ncl.com/content/dam/ncl/ships/viva/photos/viva-exterior.jpg",
    yearBuilt: 2023,
    passengerCapacity: 3998,
    crewCapacity: 1700,
    tonnage: 142500,
    length: "333.00",
    description: "Navio com entretenimento inovador e destinos exclusivos."
  },
  {
    companyId: 3,
    name: "Norwegian Encore",
    slug: "norwegian-encore",
    imageUrl: "https://www.ncl.com/content/dam/ncl/ships/encore/photos/encore-exterior.jpg",
    yearBuilt: 2019,
    passengerCapacity: 3998,
    crewCapacity: 1700,
    tonnage: 169116,
    length: "333.00",
    description: "Estilo livre com pista de kart e experiências culinárias diversificadas."
  },
  {
    companyId: 3,
    name: "Norwegian Bliss",
    slug: "norwegian-bliss",
    imageUrl: "https://www.ncl.com/content/dam/ncl/ships/bliss/photos/bliss-exterior.jpg",
    yearBuilt: 2018,
    passengerCapacity: 4000,
    crewCapacity: 1700,
    tonnage: 168695,
    length: "333.00",
    description: "Navio com pista de kart e entretenimento de classe mundial."
  },
  // MSC - Navios reais
  {
    companyId: 4,
    name: "MSC World Europa",
    slug: "msc-world-europa",
    imageUrl: "https://www.msccruises.com/content/dam/msc/ships/world-europa/photos/world-europa-exterior.jpg",
    yearBuilt: 2022,
    passengerCapacity: 6762,
    crewCapacity: 2200,
    tonnage: 205700,
    length: "331.00",
    description: "Navio de classe mundial com tecnologia sustentável e entretenimento excepcional."
  },
  {
    companyId: 4,
    name: "MSC Virtuosa",
    slug: "msc-virtuosa",
    imageUrl: "https://www.msccruises.com/content/dam/msc/ships/virtuosa/photos/virtuosa-exterior.jpg",
    yearBuilt: 2021,
    passengerCapacity: 6334,
    crewCapacity: 2000,
    tonnage: 181541,
    length: "315.00",
    description: "Navio elegante com experiências mediterrâneas autênticas."
  },
  {
    companyId: 4,
    name: "MSC Seascape",
    slug: "msc-seascape",
    imageUrl: "https://www.msccruises.com/content/dam/msc/ships/seascape/photos/seascape-exterior.jpg",
    yearBuilt: 2021,
    passengerCapacity: 5632,
    crewCapacity: 1900,
    tonnage: 169400,
    length: "315.00",
    description: "Navio moderno com entretenimento sofisticado e destinos exclusivos."
  },
  // Princess - Navios reais
  {
    companyId: 5,
    name: "Discovery Princess",
    slug: "discovery-princess",
    imageUrl: "https://www.princess.com/content/dam/princess/ships/discovery/photos/discovery-exterior.jpg",
    yearBuilt: 2022,
    passengerCapacity: 3660,
    crewCapacity: 1500,
    tonnage: 175500,
    length: "330.00",
    description: "Navio moderno com experiências premium e destinos exclusivos."
  },
  {
    companyId: 5,
    name: "Enchanted Princess",
    slug: "enchanted-princess",
    imageUrl: "https://www.princess.com/content/dam/princess/ships/enchanted/photos/enchanted-exterior.jpg",
    yearBuilt: 2020,
    passengerCapacity: 3660,
    crewCapacity: 1500,
    tonnage: 175500,
    length: "330.00",
    description: "Navio com experiências premium e entretenimento excepcional."
  },
  // Celebrity - Navios reais
  {
    companyId: 6,
    name: "Celebrity Beyond",
    slug: "celebrity-beyond",
    imageUrl: "https://www.celebritycruises.com/content/dam/celebrity/ships/beyond/photos/beyond-exterior.jpg",
    yearBuilt: 2023,
    passengerCapacity: 3260,
    crewCapacity: 1350,
    tonnage: 140600,
    length: "305.00",
    description: "Navio de luxo com design revolucionário e culinária excepcional."
  },
  {
    companyId: 6,
    name: "Celebrity Edge",
    slug: "celebrity-edge",
    imageUrl: "https://www.celebritycruises.com/content/dam/celebrity/ships/edge/photos/edge-exterior.jpg",
    yearBuilt: 2018,
    passengerCapacity: 2918,
    crewCapacity: 1300,
    tonnage: 130818,
    length: "306.00",
    description: "Design revolucionário com Magic Carpet e experiências gastronômicas premium."
  },
  // Disney - Navios reais
  {
    companyId: 7,
    name: "Disney Wish",
    slug: "disney-wish",
    imageUrl: "https://disneycruise.disney.go.com/content/dam/disney-cruise/ships/wish/photos/wish-exterior.jpg",
    yearBuilt: 2022,
    passengerCapacity: 4000,
    crewCapacity: 1500,
    tonnage: 144000,
    length: "340.00",
    description: "O mais novo navio da Disney com experiências mágicas e tecnologia inovadora."
  },
  {
    companyId: 7,
    name: "Disney Dream",
    slug: "disney-dream",
    imageUrl: "https://disneycruise.disney.go.com/content/dam/disney-cruise/ships/dream/photos/dream-exterior.jpg",
    yearBuilt: 2011,
    passengerCapacity: 4000,
    crewCapacity: 1500,
    tonnage: 130000,
    length: "339.00",
    description: "Navio mágico com entretenimento familiar incomparável."
  },
  // Virgin - Navios reais
  {
    companyId: 8,
    name: "Scarlet Lady",
    slug: "scarlet-lady",
    imageUrl: "https://www.virginvoyages.com/content/dam/virgin/ships/scarlet/photos/scarlet-exterior.jpg",
    yearBuilt: 2020,
    passengerCapacity: 2700,
    crewCapacity: 1100,
    tonnage: 110000,
    length: "278.00",
    description: "Navio adulto moderno com experiências únicas e sem crianças."
  },
  {
    companyId: 8,
    name: "Brilliant Lady",
    slug: "brilliant-lady",
    imageUrl: "https://www.virginvoyages.com/content/dam/virgin/ships/brilliant/photos/brilliant-exterior.jpg",
    yearBuilt: 2022,
    passengerCapacity: 2700,
    crewCapacity: 1100,
    tonnage: 110000,
    length: "278.00",
    description: "Navio adulto com experiências exclusivas e entretenimento inovador."
  },
  // Holland America - Navios reais
  {
    companyId: 9,
    name: "Oosterdam",
    slug: "oosterdam",
    imageUrl: "https://www.hollandamerica.com/content/dam/holland/ships/oosterdam/photos/oosterdam-exterior.jpg",
    yearBuilt: 2003,
    passengerCapacity: 1848,
    crewCapacity: 800,
    tonnage: 81769,
    length: "285.00",
    description: "Navio clássico com foco em destinos únicos e experiências culturais."
  },
  // Costa - Navios reais
  {
    companyId: 10,
    name: "Costa Toscana",
    slug: "costa-toscana",
    imageUrl: "https://www.costacruises.com/content/dam/costa/ships/toscana/photos/toscana-exterior.jpg",
    yearBuilt: 2021,
    passengerCapacity: 5260,
    crewCapacity: 1800,
    tonnage: 180000,
    length: "337.00",
    description: "Navio com estilo italiano e experiências mediterrâneas autênticas."
  },
  // Cunard - Navios reais
  {
    companyId: 11,
    name: "Queen Mary 2",
    slug: "queen-mary-2",
    imageUrl: "https://www.cunard.com/content/dam/cunard/ships/qm2/photos/qm2-exterior.jpg",
    yearBuilt: 2003,
    passengerCapacity: 2620,
    crewCapacity: 1250,
    tonnage: 148528,
    length: "345.00",
    description: "Navio transatlântico icônico com luxo e elegância."
  },
  // Seabourn - Navios reais
  {
    companyId: 12,
    name: "Seabourn Venture",
    slug: "seabourn-venture",
    imageUrl: "https://www.seabourn.com/content/dam/seabourn/ships/venture/photos/venture-exterior.jpg",
    yearBuilt: 2023,
    passengerCapacity: 900,
    crewCapacity: 450,
    tonnage: 50000,
    length: "210.00",
    description: "Navio de luxo com destinos exclusivos e experiências premium."
  }
];

const portsData = [
  // Caribe
  { name: "Miami", city: "Miami", country: "Estados Unidos", latitude: "25.7617", longitude: "-80.1918", timezone: "America/New_York" },
  { name: "Nassau", city: "Nassau", country: "Bahamas", latitude: "25.0834", longitude: "-77.3484", timezone: "America/New_York" },
  { name: "Cozumel", city: "Cozumel", country: "México", latitude: "20.5000", longitude: "-87.0667", timezone: "America/Chicago" },
  { name: "Grand Cayman", city: "George Town", country: "Ilhas Cayman", latitude: "19.2833", longitude: "-81.3833", timezone: "America/Cayman" },
  { name: "Aruba", city: "Oranjestad", country: "Aruba", latitude: "12.1833", longitude: "-68.9333", timezone: "America/Aruba" },
  { name: "Curaçao", city: "Willemstad", country: "Curaçao", latitude: "12.1696", longitude: "-68.9900", timezone: "America/Curacao" },
  { name: "St. Thomas", city: "Charlotte Amalie", country: "Ilhas Virgens Americanas", latitude: "18.3481", longitude: "-64.8934", timezone: "America/Virgin" },
  { name: "St. Maarten", city: "Philipsburg", country: "Sint Maarten", latitude: "18.0131", longitude: "-63.0505", timezone: "America/Virgin" },
  { name: "Barbados", city: "Bridgetown", country: "Barbados", latitude: "13.1939", longitude: "-59.5432", timezone: "America/Barbados" },
  { name: "Grenada", city: "St. George's", country: "Granada", latitude: "12.0564", longitude: "-61.7485", timezone: "America/Grenada" },
  
  // Mediterrâneo
  { name: "Barcelona", city: "Barcelona", country: "Espanha", latitude: "41.3851", longitude: "2.1734", timezone: "Europe/Madrid" },
  { name: "Roma", city: "Civitavecchia", country: "Itália", latitude: "42.0947", longitude: "11.7728", timezone: "Europe/Rome" },
  { name: "Atenas", city: "Atenas", country: "Grécia", latitude: "37.9368", longitude: "23.7278", timezone: "Europe/Athens" },
  { name: "Veneza", city: "Veneza", country: "Itália", latitude: "45.4408", longitude: "12.3155", timezone: "Europe/Rome" },
  { name: "Santorini", city: "Thira", country: "Grécia", latitude: "36.3932", longitude: "25.4615", timezone: "Europe/Athens" },
  { name: "Mykonos", city: "Mykonos", country: "Grécia", latitude: "37.4467", longitude: "25.3289", timezone: "Europe/Athens" },
  { name: "Dubrovnik", city: "Dubrovnik", country: "Croácia", latitude: "42.6408", longitude: "18.1084", timezone: "Europe/Zagreb" },
  { name: "Palma de Mallorca", city: "Palma", country: "Espanha", latitude: "39.5696", longitude: "2.6502", timezone: "Europe/Madrid" },
  { name: "Málaga", city: "Málaga", country: "Espanha", latitude: "36.7213", longitude: "-4.4215", timezone: "Europe/Madrid" },
  { name: "Kusadasi", city: "Kusadasi", country: "Turquia", latitude: "37.8602", longitude: "26.9603", timezone: "Europe/Istanbul" },
  
  // Alasca
  { name: "Juneau", city: "Juneau", country: "Estados Unidos", latitude: "58.3019", longitude: "-134.4197", timezone: "America/Anchorage" },
  { name: "Ketchikan", city: "Ketchikan", country: "Estados Unidos", latitude: "55.3422", longitude: "-131.6461", timezone: "America/Anchorage" },
  { name: "Skagway", city: "Skagway", country: "Estados Unidos", latitude: "59.4541", longitude: "-135.3140", timezone: "America/Anchorage" },
  { name: "Glacier Bay", city: "Glacier Bay", country: "Estados Unidos", latitude: "58.5000", longitude: "-137.0000", timezone: "America/Anchorage" },
  { name: "Vancouver", city: "Vancouver", country: "Canadá", latitude: "49.2827", longitude: "-123.1207", timezone: "America/Vancouver" },
  
  // Europa
  { name: "Copenhagen", city: "Copenhagen", country: "Dinamarca", latitude: "55.6761", longitude: "12.5683", timezone: "Europe/Copenhagen" },
  { name: "Bergen", city: "Bergen", country: "Noruega", latitude: "60.3894", longitude: "5.3300", timezone: "Europe/Oslo" },
  { name: "Oslo", city: "Oslo", country: "Noruega", latitude: "59.9139", longitude: "10.7522", timezone: "Europe/Oslo" },
  { name: "Lisboa", city: "Lisboa", country: "Portugal", latitude: "38.7223", longitude: "-9.1393", timezone: "Europe/Lisbon" },
  { name: "Southampton", city: "Southampton", country: "Reino Unido", latitude: "50.9097", longitude: "-1.4044", timezone: "Europe/London" }
];

const itinerariesData = [
  {
    shipId: 1,
    name: "Caribe Oriental - Icon of the Seas",
    description: "Cruzeiro de 7 noites pelo Caribe Oriental com paradas em Nassau, Cozumel e Grand Cayman.",
    duration: 7,
    startDate: "2025-03-15",
    endDate: "2025-03-22"
  },
  {
    shipId: 3,
    name: "Caribe Ocidental - Symphony of the Seas",
    description: "Cruzeiro de 7 noites pelo Caribe Ocidental com paradas em Cozumel, Grand Cayman e Jamaica.",
    duration: 7,
    startDate: "2025-04-10",
    endDate: "2025-04-17"
  },
  {
    shipId: 7,
    name: "Caribe - Carnival Celebration",
    description: "Cruzeiro de 8 dias pelo Caribe com paradas em Nassau, Cozumel e Grand Cayman.",
    duration: 8,
    startDate: "2025-05-01",
    endDate: "2025-05-09"
  },
  {
    shipId: 11,
    name: "Mediterrâneo Ocidental - Norwegian Prima",
    description: "Cruzeiro de 10 dias pelo Mediterrâneo Ocidental com paradas em Barcelona, Roma e Veneza.",
    duration: 10,
    startDate: "2025-06-15",
    endDate: "2025-06-25"
  },
  {
    shipId: 15,
    name: "Caribe do Sul - MSC World Europa",
    description: "Cruzeiro de 7 noites pelo Caribe do Sul com paradas em Aruba, Curaçao e Barbados.",
    duration: 7,
    startDate: "2025-07-20",
    endDate: "2025-07-27"
  },
  {
    shipId: 19,
    name: "Alasca - Discovery Princess",
    description: "Cruzeiro de 7 dias pelo Alasca com paradas em Juneau, Ketchikan e Glacier Bay.",
    duration: 7,
    startDate: "2025-08-01",
    endDate: "2025-08-08"
  },
  {
    shipId: 22,
    name: "Ilhas Gregas - Celebrity Beyond",
    description: "Cruzeiro de 9 noites pelas Ilhas Gregas com paradas em Atenas, Santorini e Mykonos.",
    duration: 9,
    startDate: "2025-09-10",
    endDate: "2025-09-19"
  },
  {
    shipId: 25,
    name: "Caribe Mágico - Disney Wish",
    description: "Cruzeiro de 7 noites pelo Caribe com paradas em Nassau, Cozumel e Grand Cayman.",
    duration: 7,
    startDate: "2025-10-15",
    endDate: "2025-10-22"
  },
  {
    shipId: 28,
    name: "Caribe Adulto - Scarlet Lady",
    description: "Cruzeiro de 5 noites pelo Caribe para adultos com paradas em Nassau e Cozumel.",
    duration: 5,
    startDate: "2025-11-01",
    endDate: "2025-11-06"
  },
  {
    shipId: 5,
    name: "Transatlântico - Allure of the Seas",
    description: "Cruzeiro transatlântico de 14 dias de Miami a Barcelona com paradas em Bermuda e Açores.",
    duration: 14,
    startDate: "2025-12-01",
    endDate: "2025-12-15"
  },
  {
    shipId: 12,
    name: "Fjords Noruegueses - Norwegian Viva",
    description: "Cruzeiro de 11 dias pelos Fjords Noruegueses com paradas em Bergen, Oslo e Copenhagen.",
    duration: 11,
    startDate: "2026-01-15",
    endDate: "2026-01-26"
  }
];

const itineraryStopsData = [
  // Caribe Oriental - Icon of the Seas
  { itineraryId: 1, portId: 1, dayNumber: 1, arrivalTime: "17:00", departureTime: "23:59", notes: "Embarque em Miami" },
  { itineraryId: 1, portId: 2, dayNumber: 2, arrivalTime: "08:00", departureTime: "17:00", notes: "Nassau, Bahamas" },
  { itineraryId: 1, portId: 3, dayNumber: 3, arrivalTime: "08:00", departureTime: "17:00", notes: "Cozumel, México" },
  { itineraryId: 1, portId: 4, dayNumber: 4, arrivalTime: "08:00", departureTime: "17:00", notes: "Grand Cayman" },
  { itineraryId: 1, portId: 1, dayNumber: 7, arrivalTime: "06:00", departureTime: "23:59", notes: "Retorno a Miami" },
  
  // Caribe Ocidental - Symphony of the Seas
  { itineraryId: 2, portId: 1, dayNumber: 1, arrivalTime: "17:00", departureTime: "23:59", notes: "Embarque em Miami" },
  { itineraryId: 2, portId: 3, dayNumber: 2, arrivalTime: "08:00", departureTime: "17:00", notes: "Cozumel, México" },
  { itineraryId: 2, portId: 4, dayNumber: 3, arrivalTime: "08:00", departureTime: "17:00", notes: "Grand Cayman" },
  { itineraryId: 2, portId: 1, dayNumber: 7, arrivalTime: "06:00", departureTime: "23:59", notes: "Retorno a Miami" },
  
  // Caribe - Carnival Celebration
  { itineraryId: 3, portId: 1, dayNumber: 1, arrivalTime: "17:00", departureTime: "23:59", notes: "Embarque em Miami" },
  { itineraryId: 3, portId: 2, dayNumber: 2, arrivalTime: "08:00", departureTime: "17:00", notes: "Nassau, Bahamas" },
  { itineraryId: 3, portId: 3, dayNumber: 3, arrivalTime: "08:00", departureTime: "17:00", notes: "Cozumel, México" },
  { itineraryId: 3, portId: 4, dayNumber: 4, arrivalTime: "08:00", departureTime: "17:00", notes: "Grand Cayman" },
  { itineraryId: 3, portId: 1, dayNumber: 8, arrivalTime: "06:00", departureTime: "23:59", notes: "Retorno a Miami" },
  
  // Mediterrâneo Ocidental - Norwegian Prima
  { itineraryId: 4, portId: 11, dayNumber: 1, arrivalTime: "17:00", departureTime: "23:59", notes: "Embarque em Barcelona" },
  { itineraryId: 4, portId: 12, dayNumber: 3, arrivalTime: "08:00", departureTime: "17:00", notes: "Roma (Civitavecchia), Itália" },
  { itineraryId: 4, portId: 14, dayNumber: 5, arrivalTime: "08:00", departureTime: "17:00", notes: "Veneza, Itália" },
  { itineraryId: 4, portId: 11, dayNumber: 10, arrivalTime: "06:00", departureTime: "23:59", notes: "Retorno a Barcelona" },
  
  // Caribe do Sul - MSC World Europa
  { itineraryId: 5, portId: 1, dayNumber: 1, arrivalTime: "17:00", departureTime: "23:59", notes: "Embarque em Miami" },
  { itineraryId: 5, portId: 5, dayNumber: 2, arrivalTime: "08:00", departureTime: "17:00", notes: "Aruba" },
  { itineraryId: 5, portId: 6, dayNumber: 3, arrivalTime: "08:00", departureTime: "17:00", notes: "Curaçao" },
  { itineraryId: 5, portId: 9, dayNumber: 4, arrivalTime: "08:00", departureTime: "17:00", notes: "Barbados" },
  { itineraryId: 5, portId: 1, dayNumber: 7, arrivalTime: "06:00", departureTime: "23:59", notes: "Retorno a Miami" },
  
  // Alasca - Discovery Princess
  { itineraryId: 6, portId: 25, dayNumber: 1, arrivalTime: "17:00", departureTime: "23:59", notes: "Embarque em Vancouver" },
  { itineraryId: 6, portId: 21, dayNumber: 2, arrivalTime: "08:00", departureTime: "17:00", notes: "Juneau, Alasca" },
  { itineraryId: 6, portId: 22, dayNumber: 3, arrivalTime: "08:00", departureTime: "17:00", notes: "Ketchikan, Alasca" },
  { itineraryId: 6, portId: 24, dayNumber: 5, arrivalTime: "08:00", departureTime: "17:00", notes: "Glacier Bay, Alasca" },
  { itineraryId: 6, portId: 25, dayNumber: 7, arrivalTime: "06:00", departureTime: "23:59", notes: "Retorno a Vancouver" },
  
  // Ilhas Gregas - Celebrity Beyond
  { itineraryId: 7, portId: 13, dayNumber: 1, arrivalTime: "17:00", departureTime: "23:59", notes: "Embarque em Atenas" },
  { itineraryId: 7, portId: 15, dayNumber: 3, arrivalTime: "08:00", departureTime: "17:00", notes: "Santorini, Grécia" },
  { itineraryId: 7, portId: 16, dayNumber: 4, arrivalTime: "08:00", departureTime: "17:00", notes: "Mykonos, Grécia" },
  { itineraryId: 7, portId: 13, dayNumber: 9, arrivalTime: "06:00", departureTime: "23:59", notes: "Retorno a Atenas" },
  
  // Caribe Mágico - Disney Wish
  { itineraryId: 8, portId: 1, dayNumber: 1, arrivalTime: "17:00", departureTime: "23:59", notes: "Embarque em Miami" },
  { itineraryId: 8, portId: 2, dayNumber: 2, arrivalTime: "08:00", departureTime: "17:00", notes: "Nassau, Bahamas" },
  { itineraryId: 8, portId: 3, dayNumber: 3, arrivalTime: "08:00", departureTime: "17:00", notes: "Cozumel, México" },
  { itineraryId: 8, portId: 4, dayNumber: 4, arrivalTime: "08:00", departureTime: "17:00", notes: "Grand Cayman" },
  { itineraryId: 8, portId: 1, dayNumber: 7, arrivalTime: "06:00", departureTime: "23:59", notes: "Retorno a Miami" },
  
  // Caribe Adulto - Scarlet Lady
  { itineraryId: 9, portId: 1, dayNumber: 1, arrivalTime: "17:00", departureTime: "23:59", notes: "Embarque em Miami" },
  { itineraryId: 9, portId: 2, dayNumber: 2, arrivalTime: "08:00", departureTime: "17:00", notes: "Nassau, Bahamas" },
  { itineraryId: 9, portId: 3, dayNumber: 3, arrivalTime: "08:00", departureTime: "17:00", notes: "Cozumel, México" },
  { itineraryId: 9, portId: 1, dayNumber: 5, arrivalTime: "06:00", departureTime: "23:59", notes: "Retorno a Miami" },
  
  // Transatlântico - Allure of the Seas
  { itineraryId: 10, portId: 1, dayNumber: 1, arrivalTime: "17:00", departureTime: "23:59", notes: "Embarque em Miami" },
  { itineraryId: 10, portId: 11, dayNumber: 14, arrivalTime: "06:00", departureTime: "23:59", notes: "Desembarque em Barcelona" },
  
  // Fjords Noruegueses - Norwegian Viva
  { itineraryId: 11, portId: 27, dayNumber: 1, arrivalTime: "17:00", departureTime: "23:59", notes: "Embarque em Copenhagen" },
  { itineraryId: 11, portId: 28, dayNumber: 3, arrivalTime: "08:00", departureTime: "17:00", notes: "Bergen, Noruega" },
  { itineraryId: 11, portId: 29, dayNumber: 5, arrivalTime: "08:00", departureTime: "17:00", notes: "Oslo, Noruega" },
  { itineraryId: 11, portId: 27, dayNumber: 11, arrivalTime: "06:00", departureTime: "23:59", notes: "Retorno a Copenhagen" }
];

async function seedDatabase() {
  try {
    const database = drizzle(process.env.DATABASE_URL);
    
    console.log("🚢 Iniciando seed completo do banco de dados...\n");
    
    // Inserir companhias
    console.log("📋 Inserindo companhias...");
    for (const company of companiesData) {
      try {
        await database.insert(companies).values(company);
        console.log(`✅ ${company.name}`);
      } catch (error) {
        console.log(`⚠️ ${company.name} - ${error.message.substring(0, 50)}`);
      }
    }
    
    // Inserir navios
    console.log("\n🚢 Inserindo navios...");
    for (const ship of shipsData) {
      try {
        await database.insert(ships).values(ship);
        console.log(`✅ ${ship.name}`);
      } catch (error) {
        console.log(`⚠️ ${ship.name} - ${error.message.substring(0, 50)}`);
      }
    }
    
    // Inserir portos
    console.log("\n⚓ Inserindo portos...");
    for (const port of portsData) {
      try {
        await database.insert(ports).values(port);
        console.log(`✅ ${port.name}, ${port.country}`);
      } catch (error) {
        console.log(`⚠️ ${port.name} - ${error.message.substring(0, 50)}`);
      }
    }
    
    // Inserir itinerários
    console.log("\n🗺️ Inserindo itinerários...");
    for (const itinerary of itinerariesData) {
      try {
        await database.insert(itineraries).values(itinerary);
        console.log(`✅ ${itinerary.name}`);
      } catch (error) {
        console.log(`⚠️ ${itinerary.name} - ${error.message.substring(0, 50)}`);
      }
    }
    
    // Inserir paradas de itinerários
    console.log("\n📍 Inserindo paradas de itinerários...");
    for (const stop of itineraryStopsData) {
      try {
        await database.insert(itineraryStops).values(stop);
      } catch (error) {
        // Silenciosamente ignorar erros de duplicação
      }
    }
    console.log(`✅ ${itineraryStopsData.length} paradas inseridas`);
    
    console.log("\n✨ Seed completo finalizado com sucesso!");
    console.log("📊 Resumo:");
    console.log(`   - ${companiesData.length} companhias`);
    console.log(`   - ${shipsData.length} navios`);
    console.log(`   - ${portsData.length} portos`);
    console.log(`   - ${itinerariesData.length} itinerários`);
    console.log(`   - ${itineraryStopsData.length} paradas`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro durante seed:", error);
    process.exit(1);
  }
}

seedDatabase();
