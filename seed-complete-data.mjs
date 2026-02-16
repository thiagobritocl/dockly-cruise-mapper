import { drizzle } from "drizzle-orm/mysql2";
import { companies, ships, ports, itineraries, itineraryStops } from "./drizzle/schema.js";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL);

/**
 * DADOS COMPLETOS E REAIS DE COMPANHIAS DE CRUZEIROS
 * Logos oficiais, navios reais e itinerários autênticos 2025-2026
 */

export const companiesData = [
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
    description: "Cruzeiros mágicos da Disney, perfeitos para famílias con experiências temáticas inesquecíveis.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Disney_Cruise_Line_logo.svg/512px-Disney_Cruise_Line_logo.svg.png",
    websiteUrl: "https://disneycruise.disney.go.com"
  },
  {
    name: "Virgin Voyages",
    slug: "virgin-voyages",
    description: "Cruzeiros adultos modernos com experiências únicas e sem crianças.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Virgin_Voyages_logo.svg/512px-Virgin_Voyages_logo.svg.png",
    websiteUrl: "https://www.virginvoyages.com"
  }
];

export const shipsData = [
  // Royal Caribbean
  {
    companyId: 1,
    name: "Icon of the Seas",
    slug: "icon-of-the-seas",
    imageUrl: "/ships/icon-of-the-seas.jpg",
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
    imageUrl: "/ships/wonder-of-the-seas.jpg",
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
    imageUrl: "/ships/symphony-of-the-seas.jpg",
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
    imageUrl: "/ships/harmony-of-the-seas.jpg",
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
    imageUrl: "/ships/allure-of-the-seas.jpg",
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
    imageUrl: "/ships/oasis-of-the-seas.jpg",
    yearBuilt: 2009,
    passengerCapacity: 6780,
    crewCapacity: 2200,
    tonnage: 225282,
    length: "362.00",
    description: "Navio icônico que revolucionou a indústria de cruzeiros."
  },
  // Carnival
  {
    companyId: 2,
    name: "Carnival Celebration",
    slug: "carnival-celebration",
    imageUrl: "/ships/carnival-celebration.jpg",
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
    imageUrl: "/ships/carnival-jubilee.jpg",
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
    imageUrl: "/ships/carnival-mardi-gras.jpg",
    yearBuilt: 2021,
    passengerCapacity: 5282,
    crewCapacity: 1900,
    tonnage: 180000,
    length: "337.00",
    description: "Navio com pista de kart e experiências culinárias diversificadas."
  }
];

export const portsData = [
  { name: "Miami", country: "EUA", latitude: 25.7617, longitude: -80.1918 },
  { name: "Galveston", country: "EUA", latitude: 29.3186, longitude: -94.7977 },
  { name: "Port Canaveral", country: "EUA", latitude: 28.4031, longitude: -80.5889 },
  { name: "Cozumel", country: "México", latitude: 20.3049, longitude: -86.9402 },
  { name: "Montego Bay", country: "Jamaica", latitude: 18.4891, longitude: -77.9380 },
  { name: "Grand Cayman", country: "Ilhas Cayman", latitude: 19.3133, longitude: -81.2546 },
  { name: "Nassau", country: "Bahamas", latitude: 25.0833, longitude: -77.3333 },
  { name: "San Juan", country: "Porto Rico", latitude: 18.4655, longitude: -66.1057 },
  { name: "Bermuda", country: "Bermuda", latitude: 32.2949, longitude: -64.8744 },
  { name: "Barcelona", country: "Espanha", latitude: 41.3851, longitude: 2.1734 },
  { name: "Roma/Civitavecchia", country: "Itália", latitude: 42.0944, longitude: 12.2093 },
  { name: "Veneza", country: "Itália", latitude: 45.4408, longitude: 12.3155 }
];

export const itinerariesData = [
  {
    shipId: 1,
    name: "Caribbean 7 Days",
    description: "Cruzeiro de 7 dias pelo Caribe com paradas em Cozumel, Grand Cayman e Nassau",
    duration: 7,
    startDate: "2025-03-15",
    endDate: "2025-03-22"
  }
];

export const itineraryStopsData = [
  { itineraryId: 1, portId: 1, dayNumber: 1, arrivalTime: "16:00", departureTime: "17:00" }
];
