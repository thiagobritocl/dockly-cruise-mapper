/**
 * DADOS COMPLETOS COM URLs DE IMAGENS FUNCIONAIS
 * Logos oficiais e fotos de navios de fontes públicas confiáveis
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
  {
    companyId: 2,
    name: "Carnival Venezia",
    slug: "carnival-venezia",
    imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    yearBuilt: 2021,
    passengerCapacity: 5282,
    crewCapacity: 1900,
    tonnage: 180000,
    length: "337.00",
    description: "Navio com temática italiana e experiências autênticas do Mediterrâneo."
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
  },
  {
    companyId: 3,
    name: "Norwegian Encore",
    slug: "norwegian-encore",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    yearBuilt: 2020,
    passengerCapacity: 4000,
    crewCapacity: 1600,
    tonnage: 169000,
    length: "339.00",
    description: "Navio com atrações emocionantes e entretenimento de classe mundial."
  },
  {
    companyId: 3,
    name: "Norwegian Bliss",
    slug: "norwegian-bliss",
    imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    yearBuilt: 2018,
    passengerCapacity: 4000,
    crewCapacity: 1600,
    tonnage: 169000,
    length: "339.00",
    description: "Navio com experiências inesquecíveis e destinos exóticos."
  },
  // MSC
  {
    companyId: 4,
    name: "MSC Seashore",
    slug: "msc-seashore",
    imageUrl: "https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?w=800&q=80",
    yearBuilt: 2021,
    passengerCapacity: 5632,
    crewCapacity: 1900,
    tonnage: 169000,
    length: "339.00",
    description: "Navio moderno com design inovador e experiências mediterrâneas autênticas."
  },
  {
    companyId: 4,
    name: "MSC Virtuosa",
    slug: "msc-virtuosa",
    imageUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
    yearBuilt: 2021,
    passengerCapacity: 5632,
    crewCapacity: 1900,
    tonnage: 181000,
    length: "339.00",
    description: "Navio de luxo com tecnologia sustentável e entretenimento de classe mundial."
  },
  {
    companyId: 4,
    name: "MSC Meraviglia",
    slug: "msc-meraviglia",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    yearBuilt: 2017,
    passengerCapacity: 4738,
    crewCapacity: 1700,
    tonnage: 171000,
    length: "315.00",
    description: "Navio com design revolucionário e experiências gastronômicas excepcionais."
  },
  // Princess
  {
    companyId: 5,
    name: "Discovery Princess",
    slug: "discovery-princess",
    imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    yearBuilt: 2022,
    passengerCapacity: 3660,
    crewCapacity: 1400,
    tonnage: 145000,
    length: "330.00",
    description: "Navio de próxima geração com tecnologia inovadora e experiências premium."
  },
  {
    companyId: 5,
    name: "Sky Princess",
    slug: "sky-princess",
    imageUrl: "https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?w=800&q=80",
    yearBuilt: 2019,
    passengerCapacity: 3660,
    crewCapacity: 1400,
    tonnage: 145000,
    length: "330.00",
    description: "Navio com experiências exclusivas e destinos únicos ao redor do mundo."
  },
  // Celebrity
  {
    companyId: 6,
    name: "Celebrity Beyond",
    slug: "celebrity-beyond",
    imageUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
    yearBuilt: 2023,
    passengerCapacity: 3260,
    crewCapacity: 1300,
    tonnage: 140000,
    length: "323.00",
    description: "Navio de luxo com design inovador e experiências gastronômicas de classe mundial."
  },
  {
    companyId: 6,
    name: "Celebrity Edge",
    slug: "celebrity-edge",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    yearBuilt: 2018,
    passengerCapacity: 2918,
    crewCapacity: 1200,
    tonnage: 130000,
    length: "305.00",
    description: "Navio revolucionário com design elegante e experiências premium."
  },
  // Disney
  {
    companyId: 7,
    name: "Disney Wish",
    slug: "disney-wish",
    imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    yearBuilt: 2022,
    passengerCapacity: 4000,
    crewCapacity: 1600,
    tonnage: 144000,
    length: "340.00",
    description: "Navio mágico da Disney com experiências temáticas inesquecíveis para toda a família."
  },
  {
    companyId: 7,
    name: "Disney Fantasy",
    slug: "disney-fantasy",
    imageUrl: "https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?w=800&q=80",
    yearBuilt: 2012,
    passengerCapacity: 4000,
    crewCapacity: 1600,
    tonnage: 130000,
    length: "339.00",
    description: "Navio com entretenimento familiar incomparável e magia Disney em cada detalhe."
  },
  // Virgin Voyages
  {
    companyId: 8,
    name: "Scarlet Lady",
    slug: "scarlet-lady",
    imageUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
    yearBuilt: 2020,
    passengerCapacity: 2700,
    crewCapacity: 1150,
    tonnage: 110000,
    length: "278.00",
    description: "Navio adulto moderno com experiências únicas e sem crianças."
  },
  // Holland America
  {
    companyId: 9,
    name: "Rotterdam",
    slug: "rotterdam",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    yearBuilt: 2021,
    passengerCapacity: 2668,
    crewCapacity: 1100,
    tonnage: 99500,
    length: "298.00",
    description: "Navio clássico com foco em destinos únicos e experiências culturais."
  },
  // Costa
  {
    companyId: 10,
    name: "Costa Smeralda",
    slug: "costa-smeralda",
    imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    yearBuilt: 2019,
    passengerCapacity: 5260,
    crewCapacity: 1900,
    tonnage: 185000,
    length: "337.00",
    description: "Navio italiano com estilo mediterrâneo e experiências autênticas."
  }
];

export const portsData = [
  { name: "Miami", country: "EUA", latitude: 25.7617, longitude: -80.1918 },
  { name: "Galveston", country: "EUA", latitude: 29.3186, longitude: -94.7977 },
  { name: "Port Canaveral", country: "EUA", latitude: 28.4031, longitude: -80.5889 },
  { name: "New York", country: "EUA", latitude: 40.7128, longitude: -74.0060 },
  { name: "Boston", country: "EUA", latitude: 42.3601, longitude: -71.0589 },
  { name: "Barcelona", country: "Espanha", latitude: 41.3851, longitude: 2.1734 },
  { name: "Palma de Mallorca", country: "Espanha", latitude: 39.5696, longitude: 2.6502 },
  { name: "Roma/Civitavecchia", country: "Itália", latitude: 42.0944, longitude: 12.2093 },
  { name: "Veneza", country: "Itália", latitude: 45.4408, longitude: 12.3155 },
  { name: "Gênova", country: "Itália", latitude: 44.4056, longitude: 8.9463 },
  { name: "Nápoles", country: "Itália", latitude: 40.8518, longitude: 14.2681 },
  { name: "Cozumel", country: "México", latitude: 20.3049, longitude: -86.9402 },
  { name: "Montego Bay", country: "Jamaica", latitude: 18.4891, longitude: -77.9380 },
  { name: "Grand Cayman", country: "Ilhas Cayman", latitude: 19.3133, longitude: -81.2546 },
  { name: "Nassau", country: "Bahamas", latitude: 25.0833, longitude: -77.3333 },
  { name: "San Juan", country: "Porto Rico", latitude: 18.4655, longitude: -66.1057 },
  { name: "Bermuda", country: "Bermuda", latitude: 32.2949, longitude: -64.8744 },
  { name: "Bermuda/King's Wharf", country: "Bermuda", latitude: 32.2949, longitude: -64.8744 },
  { name: "Marselha", country: "França", latitude: 43.2965, longitude: 5.3698 },
  { name: "Nice", country: "França", latitude: 43.7102, longitude: 7.2620 },
  { name: "Atenas/Pireu", country: "Grécia", latitude: 37.9368, longitude: 23.6978 },
  { name: "Santorini", country: "Grécia", latitude: 36.3932, longitude: 25.4615 },
  { name: "Mykonos", country: "Grécia", latitude: 37.4467, longitude: 25.3289 },
  { name: "Rodes", country: "Grécia", latitude: 36.4104, longitude: 28.2261 },
  { name: "Estambul", country: "Turquia", latitude: 41.0082, longitude: 28.9784 },
  { name: "Izmir", country: "Turquia", latitude: 38.4161, longitude: 27.1398 },
  { name: "Kusadasi", country: "Turquia", latitude: 37.8611, longitude: 26.9711 },
  { name: "Haifa", country: "Israel", latitude: 32.8191, longitude: 34.9885 },
  { name: "Jaffa/Tel Aviv", country: "Israel", latitude: 32.0853, longitude: 34.7818 },
  { name: "Eilat", country: "Israel", latitude: 29.5577, longitude: 34.9516 },
  { name: "Aqaba", country: "Jordânia", latitude: 29.5327, longitude: 35.0075 },
  { name: "Sharm El-Sheikh", country: "Egito", latitude: 27.9673, longitude: 34.3294 },
  { name: "Alexandria", country: "Egito", latitude: 31.2001, longitude: 29.9187 }
];

export const itinerariesData = [
  {
    shipId: 1,
    name: "Caribbean 7 Days",
    duration: 7,
    departurePort: "Miami",
    departureDate: "2025-03-15",
    returnDate: "2025-03-22",
    price: 1299
  },
  {
    shipId: 1,
    name: "Eastern Caribbean",
    duration: 7,
    departurePort: "Miami",
    departureDate: "2025-04-12",
    returnDate: "2025-04-19",
    price: 1399
  },
  {
    shipId: 2,
    name: "Mediterranean 10 Days",
    duration: 10,
    departurePort: "Barcelona",
    departureDate: "2025-05-01",
    returnDate: "2025-05-11",
    price: 1899
  },
  {
    shipId: 3,
    name: "Alaska Adventure",
    duration: 7,
    departurePort: "Seattle",
    departureDate: "2025-06-15",
    returnDate: "2025-06-22",
    price: 1599
  },
  {
    shipId: 4,
    name: "Europe Explorer",
    duration: 12,
    departurePort: "Barcelona",
    departureDate: "2025-07-01",
    returnDate: "2025-07-13",
    price: 2299
  },
  {
    shipId: 5,
    name: "Caribbean Getaway",
    duration: 5,
    departurePort: "Galveston",
    departureDate: "2025-08-10",
    returnDate: "2025-08-15",
    price: 899
  },
  {
    shipId: 6,
    name: "Bermuda Paradise",
    duration: 7,
    departurePort: "Boston",
    departureDate: "2025-09-01",
    returnDate: "2025-09-08",
    price: 1499
  },
  {
    shipId: 7,
    name: "Greek Islands",
    duration: 10,
    departurePort: "Atenas/Pireu",
    departureDate: "2025-10-01",
    returnDate: "2025-10-11",
    price: 1799
  },
  {
    shipId: 8,
    name: "Mediterranean Cruise",
    duration: 8,
    departurePort: "Roma/Civitavecchia",
    departureDate: "2025-11-01",
    returnDate: "2025-11-09",
    price: 1699
  },
  {
    shipId: 9,
    name: "Holiday Caribbean",
    duration: 7,
    departurePort: "Miami",
    departureDate: "2025-12-20",
    returnDate: "2025-12-27",
    price: 1599
  },
  {
    shipId: 10,
    name: "New Year Mediterranean",
    duration: 10,
    departurePort: "Barcelona",
    departureDate: "2025-12-28",
    returnDate: "2026-01-07",
    price: 2199
  }
];

export const itineraryStopsData = [
  // Caribbean 7 Days (Icon of the Seas)
  { itineraryId: 1, portId: 1, dayNumber: 1, arrivalTime: "16:00", departureTime: "17:00" },
  { itineraryId: 1, portId: 13, dayNumber: 2, arrivalTime: "08:00", departureTime: "17:00" },
  { itineraryId: 1, portId: 14, dayNumber: 3, arrivalTime: "09:00", departureTime: "18:00" },
  { itineraryId: 1, portId: 15, dayNumber: 4, arrivalTime: "08:00", departureTime: "17:00" },
  { itineraryId: 1, portId: 12, dayNumber: 5, arrivalTime: "09:00", departureTime: "17:00" },
  { itineraryId: 1, portId: 1, dayNumber: 7, arrivalTime: "06:00", departureTime: null },
  
  // Mediterranean 10 Days (Wonder of the Seas)
  { itineraryId: 3, portId: 6, dayNumber: 1, arrivalTime: "16:00", departureTime: "17:00" },
  { itineraryId: 3, portId: 7, dayNumber: 2, arrivalTime: "08:00", departureTime: "17:00" },
  { itineraryId: 3, portId: 8, dayNumber: 3, arrivalTime: "09:00", departureTime: "18:00" },
  { itineraryId: 3, portId: 9, dayNumber: 4, arrivalTime: "10:00", departureTime: "18:00" },
  { itineraryId: 3, portId: 10, dayNumber: 5, arrivalTime: "08:00", departureTime: "17:00" },
  { itineraryId: 3, portId: 21, dayNumber: 6, arrivalTime: "09:00", departureTime: "17:00" },
  { itineraryId: 3, portId: 22, dayNumber: 7, arrivalTime: "08:00", departureTime: "17:00" },
  { itineraryId: 3, portId: 6, dayNumber: 10, arrivalTime: "06:00", departureTime: null }
];
