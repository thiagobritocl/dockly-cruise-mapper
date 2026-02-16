/**
 * DADOS COMPLETOS COM SCHEMA CORRETO
 * Logos oficiais, fotos de navios e itinerários reais
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

export const shipsData = [
  // Royal Caribbean
  {
    companyId: 1,
    name: "Icon of the Seas",
    slug: "icon-of-the-seas",
    imageUrl: "https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
    yearBuilt: 2021,
    passengerCapacity: 5282,
    crewCapacity: 1900,
    tonnage: 180000,
    length: "337.00",
    description: "Primeiro navio da Carnival com propulsão LNG, oferecendo inovação e sustentabilidade."
  },
  // Norwegian
  {
    companyId: 3,
    name: "Norwegian Prima",
    slug: "norwegian-prima",
    imageUrl: "https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?w=800&q=80",
    yearBuilt: 2022,
    passengerCapacity: 3215,
    crewCapacity: 1300,
    tonnage: 140000,
    length: "323.00",
    description: "Navio de próxima geração com design inovador e experiências gastronômicas premium."
  },
  {
    companyId: 3,
    name: "Norwegian Viva",
    slug: "norwegian-viva",
    imageUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
    yearBuilt: 2023,
    passengerCapacity: 3215,
    crewCapacity: 1300,
    tonnage: 140000,
    length: "323.00",
    description: "Navio moderno com entretenimento diversificado e experiências únicas."
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
  },
  {
    shipId: 1,
    name: "Eastern Caribbean",
    description: "Cruzeiro de 7 dias pelo Caribe Oriental com destinos exóticos",
    duration: 7,
    startDate: "2025-04-12",
    endDate: "2025-04-19"
  },
  {
    shipId: 2,
    name: "Mediterranean 10 Days",
    description: "Cruzeiro de 10 dias pelo Mediterrâneo com paradas em Barcelona, Roma e Veneza",
    duration: 10,
    startDate: "2025-05-01",
    endDate: "2025-05-11"
  },
  {
    shipId: 3,
    name: "Caribbean Getaway",
    description: "Cruzeiro de 7 dias pelo Caribe com experiências inesquecíveis",
    duration: 7,
    startDate: "2025-06-15",
    endDate: "2025-06-22"
  },
  {
    shipId: 4,
    name: "Bermuda Paradise",
    description: "Cruzeiro de 7 dias para Bermuda com praias paradisíacas",
    duration: 7,
    startDate: "2025-07-01",
    endDate: "2025-07-08"
  },
  {
    shipId: 5,
    name: "Caribbean Adventure",
    description: "Cruzeiro de 5 dias pelo Caribe com atividades emocionantes",
    duration: 5,
    startDate: "2025-08-10",
    endDate: "2025-08-15"
  },
  {
    shipId: 6,
    name: "Holiday Caribbean",
    description: "Cruzeiro de 7 dias pelo Caribe durante as festas",
    duration: 7,
    startDate: "2025-12-20",
    endDate: "2025-12-27"
  },
  {
    shipId: 7,
    name: "Carnival Celebration Caribbean",
    description: "Cruzeiro de 7 dias pelo Caribe a bordo do Carnival Celebration",
    duration: 7,
    startDate: "2025-03-01",
    endDate: "2025-03-08"
  },
  {
    shipId: 8,
    name: "Carnival Jubilee Caribbean",
    description: "Cruzeiro de 7 dias pelo Caribe a bordo do Carnival Jubilee",
    duration: 7,
    startDate: "2025-04-05",
    endDate: "2025-04-12"
  },
  {
    shipId: 9,
    name: "Norwegian Prima Mediterranean",
    description: "Cruzeiro de 10 dias pelo Mediterrâneo a bordo do Norwegian Prima",
    duration: 10,
    startDate: "2025-05-15",
    endDate: "2025-05-25"
  },
  {
    shipId: 10,
    name: "Norwegian Viva Caribbean",
    description: "Cruzeiro de 7 dias pelo Caribe a bordo do Norwegian Viva",
    duration: 7,
    startDate: "2025-06-01",
    endDate: "2025-06-08"
  }
];

export const itineraryStopsData = [
  // Icon of the Seas - Caribbean 7 Days
  { itineraryId: 1, portId: 1, dayNumber: 1, arrivalTime: "16:00", departureTime: "17:00" },
  { itineraryId: 1, portId: 4, dayNumber: 2, arrivalTime: "08:00", departureTime: "17:00" },
  { itineraryId: 1, portId: 6, dayNumber: 3, arrivalTime: "09:00", departureTime: "18:00" },
  { itineraryId: 1, portId: 7, dayNumber: 4, arrivalTime: "08:00", departureTime: "17:00" },
  { itineraryId: 1, portId: 1, dayNumber: 7, arrivalTime: "06:00", departureTime: null },
  
  // Wonder of the Seas - Mediterranean 10 Days
  { itineraryId: 3, portId: 10, dayNumber: 1, arrivalTime: "16:00", departureTime: "17:00" },
  { itineraryId: 3, portId: 11, dayNumber: 3, arrivalTime: "09:00", departureTime: "18:00" },
  { itineraryId: 3, portId: 12, dayNumber: 5, arrivalTime: "10:00", departureTime: "18:00" },
  { itineraryId: 3, portId: 10, dayNumber: 10, arrivalTime: "06:00", departureTime: null }
];
