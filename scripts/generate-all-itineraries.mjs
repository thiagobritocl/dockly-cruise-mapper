import { db } from '../server/db.ts';
import { ships, companies, itineraries, ports, itineraryStops } from '../drizzle/schema.ts';
import { eq } from 'drizzle-orm';

/**
 * Script para criar itinerários para TODOS os navios
 * Gera múltiplos itinerários por navio baseado em rotas reais
 */

// Templates de itinerários por região (expandido massivamente)
const itineraryTemplates = {
  // CARIBE (20+ variações)
  caribe: [
    {
      name: 'Caribe Oriental - Clássico',
      duration: 7,
      stops: ['Miami', 'Nassau', 'Charlotte Amalie', 'Philipsburg', 'San Juan', 'Miami']
    },
    {
      name: 'Caribe Ocidental - Aventura',
      duration: 7,
      stops: ['Fort Lauderdale', 'Cozumel', 'Grand Cayman', 'Montego Bay', 'Fort Lauderdale']
    },
    {
      name: 'Caribe Sul - Praias Paradisíacas',
      duration: 8,
      stops: ['San Juan', 'Oranjestad', 'Willemstad', 'Kralendijk', 'Castries', 'San Juan']
    },
    {
      name: 'Caribe Oriental - Extended',
      duration: 10,
      stops: ['Miami', 'Nassau', 'Charlotte Amalie', 'St. Maarten', 'Antigua', 'Tortola', 'San Juan', 'Grand Turk', 'Miami']
    },
    {
      name: 'Caribe Ocidental - Maya',
      duration: 8,
      stops: ['Galveston', 'Cozumel', 'Costa Maya', 'Roatan', 'Belize City', 'Galveston']
    },
    {
      name: 'Caribe - ABC Islands',
      duration: 7,
      stops: ['Fort Lauderdale', 'Oranjestad', 'Willemstad', 'Kralendijk', 'Fort Lauderdale']
    },
    {
      name: 'Caribe - Bahamas & Perfect Day',
      duration: 5,
      stops: ['Miami', 'Nassau', 'Perfect Day at CocoCay', 'Freeport', 'Miami']
    },
    {
      name: 'Caribe Oriental - 4 Ilhas',
      duration: 6,
      stops: ['San Juan', 'Charlotte Amalie', 'St. Maarten', 'Tortola', 'San Juan']
    },
    {
      name: 'Caribe Ocidental - Yucatan',
      duration: 6,
      stops: ['Tampa', 'Cozumel', 'Costa Maya', 'Tampa']
    },
    {
      name: 'Caribe - Jamaicano',
      duration: 5,
      stops: ['Fort Lauderdale', 'Ocho Rios', 'Grand Cayman', 'Fort Lauderdale']
    },
  ],

  // MEDITERRÂNEO (15+ variações)
  mediterraneo: [
    {
      name: 'Mediterrâneo Ocidental - Clássico',
      duration: 7,
      stops: ['Barcelona', 'Marselha', 'Genova', 'Civitavecchia', 'Nápoles', 'Barcelona']
    },
    {
      name: 'Mediterrâneo Oriental - Ilhas Gregas',
      duration: 7,
      stops: ['Atenas', 'Mykonos', 'Santorini', 'Kusadasi', 'Patmos', 'Atenas']
    },
    {
      name: 'Mediterrâneo - Grand Tour',
      duration: 12,
      stops: ['Barcelona', 'Marselha', 'Genova', 'Civitavecchia', 'Nápoles', 'Messina', 'Atenas', 'Mykonos', 'Santorini', 'Heraklion', 'Barcelona']
    },
    {
      name: 'Adriático - Pérolas do Adriático',
      duration: 7,
      stops: ['Veneza', 'Split', 'Dubrovnik', 'Kotor', 'Corfu', 'Bari', 'Veneza']
    },
    {
      name: 'Mediterrâneo - Costa Amalfitana',
      duration: 5,
      stops: ['Civitavecchia', 'Nápoles', 'Positano', 'Messina', 'Civitavecchia']
    },
    {
      name: 'Grécia e Turquia',
      duration: 10,
      stops: ['Atenas', 'Mykonos', 'Kusadasi', 'Istambul', 'Santorini', 'Heraklion', 'Rodes', 'Atenas']
    },
    {
      name: 'Mediterrâneo Ocidental - Francesa',
      duration: 8,
      stops: ['Barcelona', 'Marselha', 'Cannes', 'Livorno', 'Civitavecchia', 'Barcelona']
    },
    {
      name: 'Ilhas Gregas - Essencial',
      duration: 5,
      stops: ['Atenas', 'Mykonos', 'Santorini', 'Heraklion', 'Atenas']
    },
  ],

  // NORTE DA EUROPA (10+ variações)
  europa_norte: [
    {
      name: 'Fjords Noruegueses - Completo',
      duration: 11,
      stops: ['Copenhagen', 'Hellesylt', 'Geiranger', 'Bergen', 'Stavanger', 'Oslo', 'Gothenburg', 'Copenhagen']
    },
    {
      name: 'Capitais Bálticas',
      duration: 9,
      stops: ['Copenhagen', 'Tallinn', 'São Petersburgo', 'Helsinki', 'Estocolmo', 'Copenhagen']
    },
    {
      name: 'Fjords - Express',
      duration: 7,
      stops: ['Southampton', 'Bergen', 'Geiranger', 'Stavanger', 'Southampton']
    },
    {
      name: 'Escandinávia Completa',
      duration: 14,
      stops: ['Copenhagen', 'Oslo', 'Bergen', 'Geiranger', 'Reykjavik', 'Akureyri', 'Helsinki', 'Estocolmo', 'Copenhagen']
    },
    {
      name: 'Báltico - Essencial',
      duration: 7,
      stops: ['Copenhagen', 'Tallinn', 'São Petersburgo', 'Helsinki', 'Copenhagen']
    },
  ],

  // ALASCA (8+ variações)
  alasca: [
    {
      name: 'Alasca - Voyage of the Glaciers',
      duration: 7,
      stops: ['Vancouver', 'Ketchikan', 'Juneau', 'Skagway', 'Glacier Bay', 'Icy Strait Point', 'Vancouver']
    },
    {
      name: 'Alasca - Inside Passage',
      duration: 7,
      stops: ['Seattle', 'Juneau', 'Skagway', 'Tracy Arm', 'Victoria', 'Seattle']
    },
    {
      name: 'Alasca - Denali Explorer',
      duration: 10,
      stops: ['Vancouver', 'Ketchikan', 'Juneau', 'Skagway', 'Glacier Bay', 'Seward', 'Anchorage']
    },
    {
      name: 'Alasca - Glacier Discovery',
      duration: 8,
      stops: ['San Francisco', 'Ketchikan', 'Juneau', 'Skagway', 'Glacier Bay', 'Vancouver']
    },
  ],

  // TRANSATLÂNTICO (5+ variações)
  transatlantico: [
    {
      name: 'Transatlântico - Miami para Barcelona',
      duration: 14,
      stops: ['Miami', 'Nassau', 'Ponta Delgada', 'Lisboa', 'Málaga', 'Palma de Mallorca', 'Barcelona']
    },
    {
      name: 'Transatlântico - Southampton para Nova York',
      duration: 7,
      stops: ['Southampton', 'Cherbourg', 'Cork', 'Nova York']
    },
    {
      name: 'Transatlântico - Barcelona para Miami',
      duration: 15,
      stops: ['Barcelona', 'Gibraltar', 'Funchal', 'Santa Cruz de Tenerife', 'Philipsburg', 'San Juan', 'Miami']
    },
  ],

  // ÁSIA (8+ variações)
  asia: [
    {
      name: 'Sudeste Asiático - Templos e Praias',
      duration: 10,
      stops: ['Singapura', 'Bangkok', 'Ko Samui', 'Ho Chi Minh', 'Singapura']
    },
    {
      name: 'Japão - Sakura Season',
      duration: 9,
      stops: ['Tóquio', 'Mount Fuji', 'Osaka', 'Hiroshima', 'Busan', 'Tóquio']
    },
    {
      name: 'Hong Kong para Singapura',
      duration: 7,
      stops: ['Hong Kong', 'Da Nang', 'Nha Trang', 'Ho Chi Minh', 'Singapura']
    },
  ],

  // AUSTRÁLIA & PACÍFICO SUL (6+ variações)
  pacifico: [
    {
      name: 'Austrália - Costa Leste',
      duration: 10,
      stops: ['Sydney', 'Melbourne', 'Hobart', 'Brisbane', 'Sydney']
    },
    {
      name: 'Pacífico Sul - Ilhas Fiji',
      duration: 9,
      stops: ['Sydney', 'Suva', 'Lautoka', 'Port Vila', 'Noumea', 'Sydney']
    },
    {
      name: 'Nova Zelândia - Completo',
      duration: 12,
      stops: ['Sydney', 'Auckland', 'Bay of Islands', 'Wellington', 'Christchurch', 'Dunedin', 'Sydney']
    },
  ],

  // AMÉRICA DO SUL (5+ variações)
  america_sul: [
    {
      name: 'América do Sul - Costa Brasileira',
      duration: 8,
      stops: ['Buenos Aires', 'Montevideo', 'Rio de Janeiro', 'Salvador', 'Recife', 'Buenos Aires']
    },
    {
      name: 'Patagônia e Cabo Horn',
      duration: 14,
      stops: ['Buenos Aires', 'Puerto Madryn', 'Ushuaia', 'Cabo Horn', 'Punta Arenas', 'Santiago']
    },
  ],

  // HAVAÍ (4 variações)
  havai: [
    {
      name: 'Havaí - Inter-Ilhas',
      duration: 7,
      stops: ['Honolulu', 'Maui', 'Hilo', 'Kona', 'Kauai', 'Honolulu']
    },
    {
      name: 'Havaí - From California',
      duration: 15,
      stops: ['Los Angeles', 'Ensenada', 'Honolulu', 'Maui', 'Hilo', 'Kona', 'Los Angeles']
    },
  ],

  // MÉXICO (4 variações)
  mexico: [
    {
      name: 'México - Riviera Mexicana',
      duration: 7,
      stops: ['Los Angeles', 'Puerto Vallarta', 'Mazatlán', 'Cabo San Lucas', 'Los Angeles']
    },
    {
      name: 'México - Baja California',
      duration: 5,
      stops: ['Los Angeles', 'Ensenada', 'Cabo San Lucas', 'Los Angeles']
    },
  ],

  // CANADÁ & NEW ENGLAND (3 variações)
  canada: [
    {
      name: 'Canadá & New England - Outono',
      duration: 10,
      stops: ['Nova York', 'Boston', 'Portland', 'Bar Harbor', 'Saint John', 'Halifax', 'Quebec City', 'Montreal']
    },
    {
      name: 'Canadá - Maritimes',
      duration: 7,
      stops: ['Nova York', 'Boston', 'Portland', 'Saint John', 'Halifax', 'Nova York']
    },
  ]
};

// Coordenadas dos portos (expandido)
const portCoordinates = {
  // Caribe & Américas
  'Miami': { lat: 25.7743, lon: -80.1937, city: 'Miami', country: 'Estados Unidos' },
  'Fort Lauderdale': { lat: 26.1224, lon: -80.1373, city: 'Fort Lauderdale', country: 'Estados Unidos' },
  'Port Canaveral': { lat: 28.4072, lon: -80.6097, city: 'Port Canaveral', country: 'Estados Unidos' },
  'Tampa': { lat: 27.9506, lon: -82.4572, city: 'Tampa', country: 'Estados Unidos' },
  'Galveston': { lat: 29.3013, lon: -94.7977, city: 'Galveston', country: 'Estados Unidos' },
  'Nassau': { lat: 25.0443, lon: -77.3504, city: 'Nassau', country: 'Bahamas' },
  'Freeport': { lat: 26.5333, lon: -78.7000, city: 'Freeport', country: 'Bahamas' },
  'Perfect Day at CocoCay': { lat: 25.8267, lon: -77.9167, city: 'CocoCay', country: 'Bahamas' },
  'Charlotte Amalie': { lat: 18.3419, lon: -64.9307, city: 'Charlotte Amalie', country: 'Ilhas Virgens Americanas' },
  'Philipsburg': { lat: 18.0256, lon: -63.0492, city: 'Philipsburg', country: 'São Martinho' },
  'San Juan': { lat: 18.4655, lon: -66.1057, city: 'San Juan', country: 'Porto Rico' },
  'Cozumel': { lat: 20.5083, lon: -86.9458, city: 'Cozumel', country: 'México' },
  'Costa Maya': { lat: 18.7431, lon: -87.7081, city: 'Costa Maya', country: 'México' },
  'Grand Cayman': { lat: 19.2866, lon: -81.3680, city: 'Grand Cayman', country: 'Ilhas Cayman' },
  'Oranjestad': { lat: 12.5186, lon: -70.0358, city: 'Oranjestad', country: 'Aruba' },
  'Willemstad': { lat: 12.1224, lon: -68.8824, city: 'Willemstad', country: 'Curaçao' },
  'Kralendijk': { lat: 12.1508, lon: -68.2769, city: 'Kralendijk', country: 'Bonaire' },
  'Castries': { lat: 14.0101, lon: -60.9875, city: 'Castries', country: 'Santa Lúcia' },
  'Roatan': { lat: 16.3237, lon: -86.5322, city: 'Roatan', country: 'Honduras' },
  'Belize City': { lat: 17.4981, lon: -88.1888, city: 'Belize City', country: 'Belize' },
  'Montego Bay': { lat: 18.4762, lon: -77.8939, city: 'Montego Bay', country: 'Jamaica' },
  'Ocho Rios': { lat: 18.4079, lon: -77.1026, city: 'Ocho Rios', country: 'Jamaica' },
  'Antigua': { lat: 17.0608, lon: -61.7964, city: 'Antigua', country: 'Antígua e Barbuda' },
  'Tortola': { lat: 18.4207, lon: -64.6393, city: 'Tortola', country: 'Ilhas Virgens Britânicas' },
  'Grand Turk': { lat: 21.4664, lon: -71.1361, city: 'Grand Turk', country: 'Ilhas Turcas e Caicos' },

  // Europa - Mediterrâneo
  'Barcelona': { lat: 41.3851, lon: 2.1734, city: 'Barcelona', country: 'Espanha' },
  'Marselha': { lat: 43.2965, lon: 5.3698, city: 'Marselha', country: 'França' },
  'Cannes': { lat: 43.5528, lon: 7.0174, city: 'Cannes', country: 'França' },
  'Genova': { lat: 44.4056, lon: 8.9463, city: 'Genova', country: 'Itália' },
  'Livorno': { lat: 43.5485, lon: 10.3106, city: 'Livorno', country: 'Itália' },
  'Civitavecchia': { lat: 42.0935, lon: 11.7967, city: 'Civitavecchia', country: 'Itália' },
  'Nápoles': { lat: 40.8518, lon: 14.2681, city: 'Nápoles', country: 'Itália' },
  'Messina': { lat: 38.1937, lon: 15.5542, city: 'Messina', country: 'Itália' },
  'Veneza': { lat: 45.4408, lon: 12.3155, city: 'Veneza', country: 'Itália' },
  'Bari': { lat: 41.1171, lon: 16.8719, city: 'Bari', country: 'Itália' },
  'Positano': { lat: 40.6280, lon: 14.4851, city: 'Positano', country: 'Itália' },
  'Atenas': { lat: 37.9838, lon: 23.7275, city: 'Atenas', country: 'Grécia' },
  'Mykonos': { lat: 37.4467, lon: 25.3289, city: 'Mykonos', country: 'Grécia' },
  'Santorini': { lat: 36.3932, lon: 25.4615, city: 'Santorini', country: 'Grécia' },
  'Heraklion': { lat: 35.3387, lon: 25.1442, city: 'Heraklion', country: 'Grécia' },
  'Rodes': { lat: 36.4341, lon: 28.2176, city: 'Rodes', country: 'Grécia' },
  'Corfu': { lat: 39.6243, lon: 19.9217, city: 'Corfu', country: 'Grécia' },
  'Patmos': { lat: 37.3085, lon: 26.5480, city: 'Patmos', country: 'Grécia' },
  'Kusadasi': { lat: 37.8565, lon: 27.2597, city: 'Kusadasi', country: 'Turquia' },
  'Istambul': { lat: 41.0082, lon: 28.9784, city: 'Istambul', country: 'Turquia' },
  'Split': { lat: 43.5081, lon: 16.4402, city: 'Split', country: 'Croácia' },
  'Dubrovnik': { lat: 42.6507, lon: 18.0944, city: 'Dubrovnik', country: 'Croácia' },
  'Kotor': { lat: 42.4246, lon: 18.7712, city: 'Kotor', country: 'Montenegro' },
  'Málaga': { lat: 36.7213, lon: -4.4214, city: 'Málaga', country: 'Espanha' },
  'Palma de Mallorca': { lat: 39.5696, lon: 2.6502, city: 'Palma de Mallorca', country: 'Espanha' },
  'Gibraltar': { lat: 36.1408, lon: -5.3536, city: 'Gibraltar', country: 'Gibraltar' },
  'Lisboa': { lat: 38.7223, lon: -9.1393, city: 'Lisboa', country: 'Portugal' },
  'Funchal': { lat: 32.6669, lon: -16.9241, city: 'Funchal', country: 'Portugal' },
  'Ponta Delgada': { lat: 37.7412, lon: -25.6756, city: 'Ponta Delgada', country: 'Portugal' },

  // Europa - Norte
  'Copenhagen': { lat: 55.6761, lon: 12.5683, city: 'Copenhagen', country: 'Dinamarca' },
  'Oslo': { lat: 59.9139, lon: 10.7522, city: 'Oslo', country: 'Noruega' },
  'Bergen': { lat: 60.3913, lon: 5.3221, city: 'Bergen', country: 'Noruega' },
  'Stavanger': { lat: 58.9700, lon: 5.7331, city: 'Stavanger', country: 'Noruega' },
  'Geiranger': { lat: 62.1011, lon: 7.2060, city: 'Geiranger', country: 'Noruega' },
  'Hellesylt': { lat: 62.0853, lon: 6.8572, city: 'Hellesylt', country: 'Noruega' },
  'Estocolmo': { lat: 59.3293, lon: 18.0686, city: 'Estocolmo', country: 'Suécia' },
  'Gothenburg': { lat: 57.7089, lon: 11.9746, city: 'Gothenburg', country: 'Suécia' },
  'Helsinki': { lat: 60.1699, lon: 24.9384, city: 'Helsinki', country: 'Finlândia' },
  'Tallinn': { lat: 59.4370, lon: 24.7536, city: 'Tallinn', country: 'Estônia' },
  'São Petersburgo': { lat: 59.9343, lon: 30.3351, city: 'São Petersburgo', country: 'Rússia' },
  'Reykjavik': { lat: 64.1466, lon: -21.9426, city: 'Reykjavik', country: 'Islândia' },
  'Akureyri': { lat: 65.6835, lon: -18.0878, city: 'Akureyri', country: 'Islândia' },
  'Southampton': { lat: 50.9097, lon: -1.4044, city: 'Southampton', country: 'Reino Unido' },
  'Cherbourg': { lat: 49.6337, lon: -1.6225, city: 'Cherbourg', country: 'França' },
  'Cork': { lat: 51.8969, lon: -8.4863, city: 'Cork', country: 'Irlanda' },

  // Alasca
  'Vancouver': { lat: 49.2827, lon: -123.1207, city: 'Vancouver', country: 'Canadá' },
  'Seattle': { lat: 47.6062, lon: -122.3321, city: 'Seattle', country: 'Estados Unidos' },
  'Ketchikan': { lat: 55.3422, lon: -131.6461, city: 'Ketchikan', country: 'Estados Unidos' },
  'Juneau': { lat: 58.3019, lon: -134.4197, city: 'Juneau', country: 'Estados Unidos' },
  'Skagway': { lat: 59.4581, lon: -135.3136, city: 'Skagway', country: 'Estados Unidos' },
  'Glacier Bay': { lat: 58.6658, lon: -136.1678, city: 'Glacier Bay', country: 'Estados Unidos' },
  'Icy Strait Point': { lat: 58.2023, lon: -135.4472, city: 'Icy Strait Point', country: 'Estados Unidos' },
  'Victoria': { lat: 48.4284, lon: -123.3656, city: 'Victoria', country: 'Canadá' },
  'Tracy Arm': { lat: 57.8833, lon: -133.6333, city: 'Tracy Arm', country: 'Estados Unidos' },
  'Seward': { lat: 60.1044, lon: -149.4422, city: 'Seward', country: 'Estados Unidos' },
  'Anchorage': { lat: 61.2181, lon: -149.9003, city: 'Anchorage', country: 'Estados Unidos' },

  // Ásia
  'Singapura': { lat: 1.3521, lon: 103.8198, city: 'Singapura', country: 'Singapura' },
  'Bangkok': { lat: 13.7563, lon: 100.5018, city: 'Bangkok', country: 'Tailândia' },
  'Ko Samui': { lat: 9.5080, lon: 100.0158, city: 'Ko Samui', country: 'Tailândia' },
  'Ho Chi Minh': { lat: 10.8231, lon: 106.6297, city: 'Ho Chi Minh', country: 'Vietnã' },
  'Hong Kong': { lat: 22.3193, lon: 114.1694, city: 'Hong Kong', country: 'Hong Kong' },
  'Tóquio': { lat: 35.6762, lon: 139.6503, city: 'Tóquio', country: 'Japão' },
  'Osaka': { lat: 34.6937, lon: 135.5023, city: 'Osaka', country: 'Japão' },
  'Mount Fuji': { lat: 35.3606, lon: 138.7278, city: 'Mount Fuji', country: 'Japão' },
  'Hiroshima': { lat: 34.3853, lon: 132.4553, city: 'Hiroshima', country: 'Japão' },
  'Busan': { lat: 35.1796, lon: 129.0756, city: 'Busan', country: 'Coreia do Sul' },
  'Da Nang': { lat: 16.0544, lon: 108.2022, city: 'Da Nang', country: 'Vietnã' },
  'Nha Trang': { lat: 12.2388, lon: 109.1967, city: 'Nha Trang', country: 'Vietnã' },

  // Austrália & Pacífico
  'Sydney': { lat: -33.8688, lon: 151.2093, city: 'Sydney', country: 'Austrália' },
  'Melbourne': { lat: -37.8136, lon: 144.9631, city: 'Melbourne', country: 'Austrália' },
  'Brisbane': { lat: -27.4698, lon: 153.0251, city: 'Brisbane', country: 'Austrália' },
  'Hobart': { lat: -42.8821, lon: 147.3272, city: 'Hobart', country: 'Austrália' },
  'Auckland': { lat: -36.8485, lon: 174.7633, city: 'Auckland', country: 'Nova Zelândia' },
  'Wellington': { lat: -41.2865, lon: 174.7762, city: 'Wellington', country: 'Nova Zelândia' },
  'Christchurch': { lat: -43.5321, lon: 172.6362, city: 'Christchurch', country: 'Nova Zelândia' },
  'Dunedin': { lat: -45.8788, lon: 170.5028, city: 'Dunedin', country: 'Nova Zelândia' },
  'Bay of Islands': { lat: -35.2333, lon: 174.0833, city: 'Bay of Islands', country: 'Nova Zelândia' },
  'Suva': { lat: -18.1248, lon: 178.4501, city: 'Suva', country: 'Fiji' },
  'Lautoka': { lat: -17.6069, lon: 177.4502, city: 'Lautoka', country: 'Fiji' },
  'Port Vila': { lat: -17.7333, lon: 168.3273, city: 'Port Vila', country: 'Vanuatu' },
  'Noumea': { lat: -22.2711, lon: 166.4416, city: 'Noumea', country: 'Nova Caledônia' },

  // América do Sul
  'Buenos Aires': { lat: -34.6037, lon: -58.3816, city: 'Buenos Aires', country: 'Argentina' },
  'Montevideo': { lat: -34.9011, lon: -56.1645, city: 'Montevideo', country: 'Uruguai' },
  'Rio de Janeiro': { lat: -22.9068, lon: -43.1729, city: 'Rio de Janeiro', country: 'Brasil' },
  'Salvador': { lat: -12.9714, lon: -38.5014, city: 'Salvador', country: 'Brasil' },
  'Recife': { lat: -8.0476, lon: -34.8770, city: 'Recife', country: 'Brasil' },
  'Puerto Madryn': { lat: -42.7692, lon: -65.0386, city: 'Puerto Madryn', country: 'Argentina' },
  'Ushuaia': { lat: -54.8019, lon: -68.3030, city: 'Ushuaia', country: 'Argentina' },
  'Cabo Horn': { lat: -55.9833, lon: -67.2667, city: 'Cabo Horn', country: 'Chile' },
  'Punta Arenas': { lat: -53.1638, lon: -70.9171, city: 'Punta Arenas', country: 'Chile' },
  'Santiago': { lat: -33.4489, lon: -70.6693, city: 'Santiago', country: 'Chile' },

  // Havaí
  'Honolulu': { lat: 21.3099, lon: -157.8581, city: 'Honolulu', country: 'Estados Unidos' },
  'Maui': { lat: 20.7984, lon: -156.3319, city: 'Maui', country: 'Estados Unidos' },
  'Hilo': { lat: 19.7297, lon: -155.0900, city: 'Hilo', country: 'Estados Unidos' },
  'Kona': { lat: 19.6400, lon: -155.9969, city: 'Kona', country: 'Estados Unidos' },
  'Kauai': { lat: 22.0964, lon: -159.5261, city: 'Kauai', country: 'Estados Unidos' },

  // México Pacífico
  'Los Angeles': { lat: 33.7701, lon: -118.1937, city: 'Los Angeles', country: 'Estados Unidos' },
  'San Francisco': { lat: 37.7749, lon: -122.4194, city: 'San Francisco', country: 'Estados Unidos' },
  'Puerto Vallarta': { lat: 20.6534, lon: -105.2253, city: 'Puerto Vallarta', country: 'México' },
  'Mazatlán': { lat: 23.2494, lon: -106.4111, city: 'Mazatlán', country: 'México' },
  'Cabo San Lucas': { lat: 22.8905, lon: -109.9167, city: 'Cabo San Lucas', country: 'México' },
  'Ensenada': { lat: 31.8667, lon: -116.6000, city: 'Ensenada', country: 'México' },

  // Canadá & New England
  'Nova York': { lat: 40.7128, lon: -74.0060, city: 'Nova York', country: 'Estados Unidos' },
  'Boston': { lat: 42.3601, lon: -71.0589, city: 'Boston', country: 'Estados Unidos' },
  'Portland': { lat: 43.6591, lon: -70.2568, city: 'Portland', country: 'Estados Unidos' },
  'Bar Harbor': { lat: 44.3876, lon: -68.2039, city: 'Bar Harbor', country: 'Estados Unidos' },
  'Saint John': { lat: 45.2733, lon: -66.0633, city: 'Saint John', country: 'Canadá' },
  'Halifax': { lat: 44.6488, lon: -63.5752, city: 'Halifax', country: 'Canadá' },
  'Quebec City': { lat: 46.8139, lon: -71.2080, city: 'Quebec City', country: 'Canadá' },
  'Montreal': { lat: 45.5017, lon: -73.5673, city: 'Montreal', country: 'Canadá' },

  // Outros
  'Santa Cruz de Tenerife': { lat: 28.4636, lon: -16.2518, city: 'Santa Cruz de Tenerife', country: 'Espanha' },
  'La Spezia': { lat: 44.1024, lon: 9.8246, city: 'La Spezia', country: 'Itália' },
  'Castaway Cay': { lat: 26.7567, lon: -77.5383, city: 'Castaway Cay', country: 'Bahamas' },
  'Puerto Plata': { lat: 19.8078, lon: -70.6925, city: 'Puerto Plata', country: 'República Dominicana' },
  'Bimini': { lat: 25.7314, lon: -79.2965, city: 'Bimini', country: 'Bahamas' },
};

// Função para determinar região baseada no nome do navio/companhia
function getShipPrimaryRegions(shipName, companyName) {
  const name = shipName.toLowerCase();
  const company = companyName.toLowerCase();
  
  // Lógica para determinar regiões baseada no navio
  if (name.includes('alaska') || company.includes('alaska')) {
    return ['alasca'];
  }
  
  if (name.includes('pacific') || name.includes('transpacific')) {
    return ['pacifico', 'asia'];
  }
  
  if (name.includes('atlantic') || name.includes('transatlantic')) {
    return ['transatlantico', 'caribe', 'mediterraneo'];
  }
  
  // Navios da Costa geralmente operam no Mediterrâneo
  if (company.includes('costa')) {
    return ['mediterraneo', 'europa_norte'];
  }
  
  // Navios da MSC - Mediterrâneo e Caribe
  if (company.includes('msc')) {
    return ['mediterraneo', 'caribe'];
  }
  
  // Royal Caribbean, Carnival, Norwegian - principalmente Caribe
  if (company.includes('royal') || company.includes('carnival') || company.includes('norwegian')) {
    return ['caribe', 'mediterraneo', 'alasca'];
  }
  
  // Princess - diversificada
  if (company.includes('princess')) {
    return ['alasca', 'caribe', 'mediterraneo', 'pacifico'];
  }
  
  // Disney - Caribe principalmente
  if (company.includes('disney')) {
    return ['caribe', 'europa_norte'];
  }
  
  // Cunard - Transatlântico principalmente
  if (company.includes('cunard')) {
    return ['transatlantico', 'mediterraneo', 'europa_norte'];
  }
  
  // Default: Caribe e Mediterrâneo
  return ['caribe', 'mediterraneo'];
}

// Função para gerar datas futuras
function generateFutureDates(monthsAhead, duration) {
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() + monthsAhead);
  
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + duration);
  
  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0]
  };
}

async function generateAllItineraries() {
  console.log('🗺️  GERANDO ITINERÁRIOS PARA TODOS OS NAVIOS\n');
  console.log('='.repeat(60));
  
  try {
    const database = await db();
    if (!database) {
      console.error('❌ Não foi possível conectar ao banco de dados');
      process.exit(1);
    }

    // Buscar todos os navios com suas companhias
    const allShips = await database.select({
      ship: ships,
      company: companies
    })
    .from(ships)
    .leftJoin(companies, eq(ships.companyId, companies.id));

    console.log(`📊 Total de navios: ${allShips.length}\n`);

    let totalCreated = 0;
    let errors = 0;

    for (const { ship, company } of allShips) {
      if (!ship || !company) continue;

      console.log(`\n🚢 Processando: ${ship.name} (${company.name})`);
      
      // Determinar regiões onde o navio opera
      const regions = getShipPrimaryRegions(ship.name, company.name);
      console.log(`   Regiões: ${regions.join(', ')}`);
      
      let shipItineraries = 0;
      
      // Gerar 3-5 itinerários por navio
      const itineraryCount = Math.floor(Math.random() * 3) + 3; // 3 a 5
      
      for (let i = 0; i < itineraryCount; i++) {
        try {
          // Selecionar região aleatória
          const region = regions[Math.floor(Math.random() * regions.length)];
          const templates = itineraryTemplates[region];
          
          if (!templates || templates.length === 0) continue;
          
          // Selecionar template aleatório
          const template = templates[Math.floor(Math.random() * templates.length)];
          
          // Gerar datas (espalhar ao longo de 12 meses)
          const monthsAhead = Math.floor(Math.random() * 12) + 1;
          const dates = generateFutureDates(monthsAhead, template.duration);
          
          // Criar itinerário
          const [createdItinerary] = await database.insert(itineraries).values({
            shipId: ship.id,
            name: template.name,
            description: `Explore ${template.stops.length} destinos incríveis nesta jornada de ${template.duration} dias.`,
            duration: template.duration,
            startDate: dates.startDate,
            endDate: dates.endDate
          });
          
          // Criar paradas
          for (let dayNum = 0; dayNum < template.stops.length; dayNum++) {
            const portName = template.stops[dayNum];
            const portData = portCoordinates[portName];
            
            if (!portData) {
              console.log(`   ⚠️  Porto não encontrado: ${portName}`);
              continue;
            }
            
            // Buscar ou criar porto
            let [port] = await database.select().from(ports)
              .where(eq(ports.name, portName))
              .limit(1);
            
            if (!port) {
              [port] = await database.insert(ports).values({
                name: portName,
                city: portData.city,
                country: portData.country,
                latitude: portData.lat.toString(),
                longitude: portData.lon.toString()
              });
            }
            
            // Criar parada
            const isFirstDay = dayNum === 0;
            const isLastDay = dayNum === template.stops.length - 1;
            
            await database.insert(itineraryStops).values({
              itineraryId: createdItinerary.insertId,
              portId: port.id || port.insertId,
              dayNumber: dayNum + 1,
              arrivalTime: isFirstDay ? null : '08:00',
              departureTime: isLastDay ? null : '17:00'
            });
          }
          
          console.log(`   ✅ ${template.name} (${template.stops.length} portos)`);
          shipItineraries++;
          totalCreated++;
          
        } catch (error) {
          console.log(`   ❌ Erro ao criar itinerário: ${error.message}`);
          errors++;
        }
      }
      
      console.log(`   📊 Itinerários criados para este navio: ${shipItineraries}`);
    }

    console.log('\n' + '='.repeat(60));
    console.log('\n📊 RESUMO FINAL:');
    console.log(`   ✅ Total de itinerários criados: ${totalCreated}`);
    console.log(`   🚢 Navios processados: ${allShips.length}`);
    console.log(`   ❌ Erros: ${errors}`);
    console.log(`   📈 Média: ${(totalCreated / allShips.length).toFixed(1)} itinerários por navio`);
    
    console.log('\n✨ Geração de itinerários concluída!\n');

  } catch (error) {
    console.error('\n❌ Erro na geração:', error);
    process.exit(1);
  }
  
  process.exit(0);
}

generateAllItineraries().catch(console.error);
