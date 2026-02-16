import { getDb } from '../server/db.ts';
import { companies, ships } from '../drizzle/schema.ts';
import { eq } from 'drizzle-orm';

/**
 * Script completo: insere companhias + navios
 */

const companiesData = [
  { name: 'Royal Caribbean', slug: 'royal-caribbean', websiteUrl: 'https://www.royalcaribbean.com', description: 'Uma das maiores linhas de cruzeiros do mundo, conhecida por seus navios inovadores e destinos globais.' },
  { name: 'Carnival Cruise Line', slug: 'carnival', websiteUrl: 'https://www.carnival.com', description: 'A maior linha de cruzeiros do mundo, oferecendo cruzeiros acessíveis e divertidos.' },
  { name: 'Norwegian Cruise Line', slug: 'norwegian', websiteUrl: 'https://www.ncl.com', description: 'Pioneira no estilo freestyle cruising, oferecendo liberdade e flexibilidade aos passageiros.' },
  { name: 'MSC Cruises', slug: 'msc-cruises', websiteUrl: 'https://www.msccruises.com', description: 'Linha de cruzeiros europeia com forte presença global e frota moderna.' },
  { name: 'Princess Cruises', slug: 'princess', websiteUrl: 'https://www.princess.com', description: 'Conhecida por seus cruzeiros premium e destinos exclusivos ao redor do mundo.' },
  { name: 'Celebrity Cruises', slug: 'celebrity', websiteUrl: 'https://www.celebritycruises.com', description: 'Cruzeiros modernos de luxo com experiências gastronômicas e de spa excepcionais.' },
  { name: 'Disney Cruise Line', slug: 'disney', websiteUrl: 'https://disneycruise.disney.go.com', description: 'A magia Disney no mar, com entretenimento familiar incomparável.' },
  { name: 'Virgin Voyages', slug: 'virgin-voyages', websiteUrl: 'https://www.virginvoyages.com', description: 'Cruzeiros adultos modernos com experiências únicas e sem crianças.' },
  { name: 'Holland America Line', slug: 'holland-america', websiteUrl: 'https://www.hollandamerica.com', description: 'Linha clássica com foco em destinos únicos e experiências culturais.' },
  { name: 'Costa Cruises', slug: 'costa', websiteUrl: 'https://www.costacruises.com', description: 'Linha italiana com estilo mediterrâneo e destinos europeus.' },
];

const allShipsData = {
  'royal-caribbean': [
    { name: 'Icon of the Seas', slug: 'icon-of-the-seas', yearBuilt: 2024, passengerCapacity: 7600, crewCapacity: 2350, tonnage: 250800, length: 365, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/icon/hero/icon-of-the-seas-aerial-view.jpg' },
    { name: 'Wonder of the Seas', slug: 'wonder-of-the-seas', yearBuilt: 2022, passengerCapacity: 6988, crewCapacity: 2300, tonnage: 236857, length: 362, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/wonder/hero/wonder-of-the-seas-aerial.jpg' },
    { name: 'Symphony of the Seas', slug: 'symphony-of-the-seas', yearBuilt: 2018, passengerCapacity: 6680, crewCapacity: 2200, tonnage: 228081, length: 362, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/symphony/hero/symphony-of-the-seas-aerial-view.jpg' },
    { name: 'Harmony of the Seas', slug: 'harmony-of-the-seas', yearBuilt: 2016, passengerCapacity: 6687, crewCapacity: 2300, tonnage: 226963, length: 362, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/harmony/hero/harmony-of-the-seas-exterior.jpg' },
    { name: 'Oasis of the Seas', slug: 'oasis-of-the-seas', yearBuilt: 2009, passengerCapacity: 6771, crewCapacity: 2165, tonnage: 225282, length: 362, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/oasis/hero/oasis-of-the-seas-aerial.jpg' },
    { name: 'Allure of the Seas', slug: 'allure-of-the-seas', yearBuilt: 2010, passengerCapacity: 6780, crewCapacity: 2200, tonnage: 225282, length: 362, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/allure/hero/allure-of-the-seas-exterior.jpg' },
    { name: 'Odyssey of the Seas', slug: 'odyssey-of-the-seas', yearBuilt: 2021, passengerCapacity: 4198, crewCapacity: 1550, tonnage: 169379, length: 347, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/odyssey/hero/odyssey-of-the-seas.jpg' },
    { name: 'Spectrum of the Seas', slug: 'spectrum-of-the-seas', yearBuilt: 2019, passengerCapacity: 4246, crewCapacity: 1551, tonnage: 169379, length: 347, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/spectrum/hero/spectrum-of-the-seas.jpg' },
    { name: 'Ovation of the Seas', slug: 'ovation-of-the-seas', yearBuilt: 2016, passengerCapacity: 4180, crewCapacity: 1500, tonnage: 168666, length: 348, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/ovation/hero/ovation-of-the-seas.jpg' },
    { name: 'Anthem of the Seas', slug: 'anthem-of-the-seas', yearBuilt: 2015, passengerCapacity: 4180, crewCapacity: 1500, tonnage: 168666, length: 348, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/anthem/hero/anthem-of-the-seas.jpg' },
    { name: 'Quantum of the Seas', slug: 'quantum-of-the-seas', yearBuilt: 2014, passengerCapacity: 4180, crewCapacity: 1500, tonnage: 168666, length: 348, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/quantum/hero/quantum-of-the-seas.jpg' },
    { name: 'Liberty of the Seas', slug: 'liberty-of-the-seas', yearBuilt: 2007, passengerCapacity: 3634, crewCapacity: 1360, tonnage: 154407, length: 339, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/liberty/hero/liberty-of-the-seas.jpg' },
    { name: 'Independence of the Seas', slug: 'independence-of-the-seas', yearBuilt: 2008, passengerCapacity: 3634, crewCapacity: 1360, tonnage: 154407, length: 339, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/independence/hero/independence-of-the-seas.jpg' },
    { name: 'Freedom of the Seas', slug: 'freedom-of-the-seas', yearBuilt: 2006, passengerCapacity: 3634, crewCapacity: 1360, tonnage: 154407, length: 339, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/freedom/hero/freedom-of-the-seas.jpg' },
    { name: 'Mariner of the Seas', slug: 'mariner-of-the-seas', yearBuilt: 2003, passengerCapacity: 3114, crewCapacity: 1185, tonnage: 138279, length: 311, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/mariner/hero/mariner-of-the-seas.jpg' },
    { name: 'Navigator of the Seas', slug: 'navigator-of-the-seas', yearBuilt: 2002, passengerCapacity: 3114, crewCapacity: 1185, tonnage: 138279, length: 311, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/navigator/hero/navigator-of-the-seas.jpg' },
    { name: 'Adventure of the Seas', slug: 'adventure-of-the-seas', yearBuilt: 2001, passengerCapacity: 3114, crewCapacity: 1185, tonnage: 138000, length: 311, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/adventure/hero/adventure-of-the-seas.jpg' },
    { name: 'Explorer of the Seas', slug: 'explorer-of-the-seas', yearBuilt: 2000, passengerCapacity: 3114, crewCapacity: 1185, tonnage: 137308, length: 311, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/explorer/hero/explorer-of-the-seas.jpg' },
    { name: 'Voyager of the Seas', slug: 'voyager-of-the-seas', yearBuilt: 1999, passengerCapacity: 3114, crewCapacity: 1176, tonnage: 137276, length: 311, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/voyager/hero/voyager-of-the-seas.jpg' },
    { name: 'Brilliance of the Seas', slug: 'brilliance-of-the-seas', yearBuilt: 2002, passengerCapacity: 2142, crewCapacity: 859, tonnage: 90090, length: 293, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/brilliance/hero/brilliance-of-the-seas.jpg' },
    { name: 'Serenade of the Seas', slug: 'serenade-of-the-seas', yearBuilt: 2003, passengerCapacity: 2142, crewCapacity: 859, tonnage: 90090, length: 293, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/serenade/hero/serenade-of-the-seas.jpg' },
    { name: 'Jewel of the Seas', slug: 'jewel-of-the-seas', yearBuilt: 2004, passengerCapacity: 2142, crewCapacity: 859, tonnage: 90090, length: 293, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/jewel/hero/jewel-of-the-seas.jpg' },
    { name: 'Radiance of the Seas', slug: 'radiance-of-the-seas', yearBuilt: 2001, passengerCapacity: 2142, crewCapacity: 859, tonnage: 90090, length: 293, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/radiance/hero/radiance-of-the-seas.jpg' },
    { name: 'Grandeur of the Seas', slug: 'grandeur-of-the-seas', yearBuilt: 1996, passengerCapacity: 1950, crewCapacity: 760, tonnage: 73817, length: 279, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/grandeur/hero/grandeur-of-the-seas.jpg' },
  ],

  'carnival': [
    { name: 'Carnival Celebration', slug: 'carnival-celebration', yearBuilt: 2022, passengerCapacity: 5374, crewCapacity: 1735, tonnage: 183521, length: 344, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/CE/CE-hero.jpg' },
    { name: 'Carnival Mardi Gras', slug: 'carnival-mardi-gras', yearBuilt: 2021, passengerCapacity: 5282, crewCapacity: 1745, tonnage: 180800, length: 344, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/MG/MG-hero.jpg' },
    { name: 'Carnival Jubilee', slug: 'carnival-jubilee', yearBuilt: 2023, passengerCapacity: 5374, crewCapacity: 1735, tonnage: 183521, length: 344, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/JU/JU-hero.jpg' },
    { name: 'Carnival Venezia', slug: 'carnival-venezia', yearBuilt: 2019, passengerCapacity: 4232, crewCapacity: 1450, tonnage: 135225, length: 323, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/VZ/VZ-hero.jpg' },
    { name: 'Carnival Panorama', slug: 'carnival-panorama', yearBuilt: 2019, passengerCapacity: 4008, crewCapacity: 1450, tonnage: 133596, length: 323, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/PA/PA-hero.jpg' },
    { name: 'Carnival Horizon', slug: 'carnival-horizon', yearBuilt: 2018, passengerCapacity: 3974, crewCapacity: 1450, tonnage: 133596, length: 323, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/HZ/HZ-hero.jpg' },
    { name: 'Carnival Vista', slug: 'carnival-vista', yearBuilt: 2016, passengerCapacity: 3934, crewCapacity: 1450, tonnage: 133596, length: 323, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/VI/VI-hero.jpg' },
    { name: 'Carnival Breeze', slug: 'carnival-breeze', yearBuilt: 2012, passengerCapacity: 3690, crewCapacity: 1386, tonnage: 130000, length: 306, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/BR/BR-hero.jpg' },
    { name: 'Carnival Magic', slug: 'carnival-magic', yearBuilt: 2011, passengerCapacity: 3690, crewCapacity: 1386, tonnage: 130000, length: 306, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/MA/MA-hero.jpg' },
    { name: 'Carnival Dream', slug: 'carnival-dream', yearBuilt: 2009, passengerCapacity: 3646, crewCapacity: 1367, tonnage: 128251, length: 306, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/DR/DR-hero.jpg' },
    { name: 'Carnival Freedom', slug: 'carnival-freedom', yearBuilt: 2007, passengerCapacity: 2980, crewCapacity: 1150, tonnage: 110239, length: 290, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/FD/FD-hero.jpg' },
    { name: 'Carnival Liberty', slug: 'carnival-liberty', yearBuilt: 2005, passengerCapacity: 2974, crewCapacity: 1160, tonnage: 110000, length: 290, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/LI/LI-hero.jpg' },
    { name: 'Carnival Valor', slug: 'carnival-valor', yearBuilt: 2004, passengerCapacity: 2974, crewCapacity: 1160, tonnage: 110000, length: 290, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/VA/VA-hero.jpg' },
    { name: 'Carnival Glory', slug: 'carnival-glory', yearBuilt: 2003, passengerCapacity: 2980, crewCapacity: 1150, tonnage: 110000, length: 290, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/GL/GL-hero.jpg' },
    { name: 'Carnival Conquest', slug: 'carnival-conquest', yearBuilt: 2002, passengerCapacity: 2980, crewCapacity: 1150, tonnage: 110239, length: 290, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/CO/CO-hero.jpg' },
    { name: 'Carnival Miracle', slug: 'carnival-miracle', yearBuilt: 2004, passengerCapacity: 2124, crewCapacity: 961, tonnage: 88500, length: 294, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/MI/MI-hero.jpg' },
    { name: 'Carnival Legend', slug: 'carnival-legend', yearBuilt: 2002, passengerCapacity: 2124, crewCapacity: 930, tonnage: 86000, length: 294, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/LE/LE-hero.jpg' },
    { name: 'Carnival Pride', slug: 'carnival-pride', yearBuilt: 2002, passengerCapacity: 2124, crewCapacity: 930, tonnage: 88500, length: 294, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/PR/PR-hero.jpg' },
    { name: 'Carnival Spirit', slug: 'carnival-spirit', yearBuilt: 2001, passengerCapacity: 2124, crewCapacity: 961, tonnage: 88500, length: 294, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/SP/SP-hero.jpg' },
    { name: 'Carnival Sunshine', slug: 'carnival-sunshine', yearBuilt: 1996, passengerCapacity: 3002, crewCapacity: 1150, tonnage: 102853, length: 272, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/SH/SH-hero.jpg' },
    { name: 'Carnival Elation', slug: 'carnival-elation', yearBuilt: 1998, passengerCapacity: 2052, crewCapacity: 920, tonnage: 70367, length: 260, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/EL/EL-hero.jpg' },
  ],

  'norwegian': [
    { name: 'Norwegian Viva', slug: 'norwegian-viva', yearBuilt: 2023, passengerCapacity: 3099, crewCapacity: 1700, tonnage: 142500, length: 299, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Viva-Exterior.jpg' },
    { name: 'Norwegian Prima', slug: 'norwegian-prima', yearBuilt: 2022, passengerCapacity: 3099, crewCapacity: 1700, tonnage: 142500, length: 299, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Prima-Exterior.jpg' },
    { name: 'Norwegian Encore', slug: 'norwegian-encore', yearBuilt: 2019, passengerCapacity: 3998, crewCapacity: 1735, tonnage: 169116, length: 333, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Encore-Exterior.jpg' },
    { name: 'Norwegian Bliss', slug: 'norwegian-bliss', yearBuilt: 2018, passengerCapacity: 4004, crewCapacity: 1716, tonnage: 168028, length: 333, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Bliss-Exterior.jpg' },
    { name: 'Norwegian Joy', slug: 'norwegian-joy', yearBuilt: 2017, passengerCapacity: 3804, crewCapacity: 1821, tonnage: 167725, length: 333, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Joy-Exterior.jpg' },
    { name: 'Norwegian Escape', slug: 'norwegian-escape', yearBuilt: 2015, passengerCapacity: 4266, crewCapacity: 1733, tonnage: 164600, length: 326, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Escape-Exterior.jpg' },
    { name: 'Norwegian Getaway', slug: 'norwegian-getaway', yearBuilt: 2014, passengerCapacity: 3963, crewCapacity: 1646, tonnage: 145655, length: 326, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Getaway-Exterior.jpg' },
    { name: 'Norwegian Breakaway', slug: 'norwegian-breakaway', yearBuilt: 2013, passengerCapacity: 3963, crewCapacity: 1657, tonnage: 145655, length: 326, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Breakaway-Exterior.jpg' },
    { name: 'Norwegian Epic', slug: 'norwegian-epic', yearBuilt: 2010, passengerCapacity: 4100, crewCapacity: 1753, tonnage: 155873, length: 329, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Epic-Exterior.jpg' },
    { name: 'Norwegian Gem', slug: 'norwegian-gem', yearBuilt: 2007, passengerCapacity: 2394, crewCapacity: 1100, tonnage: 93530, length: 294, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Gem-Exterior.jpg' },
    { name: 'Norwegian Pearl', slug: 'norwegian-pearl', yearBuilt: 2006, passengerCapacity: 2394, crewCapacity: 1100, tonnage: 93530, length: 294, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Pearl-Exterior.jpg' },
    { name: 'Norwegian Jewel', slug: 'norwegian-jewel', yearBuilt: 2005, passengerCapacity: 2376, crewCapacity: 1100, tonnage: 93502, length: 294, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Jewel-Exterior.jpg' },
    { name: 'Norwegian Star', slug: 'norwegian-star', yearBuilt: 2001, passengerCapacity: 2348, crewCapacity: 1100, tonnage: 91740, length: 294, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Star-Exterior.jpg' },
    { name: 'Norwegian Dawn', slug: 'norwegian-dawn', yearBuilt: 2002, passengerCapacity: 2340, crewCapacity: 1146, tonnage: 92250, length: 294, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Dawn-Exterior.jpg' },
    { name: 'Pride of America', slug: 'pride-of-america', yearBuilt: 2005, passengerCapacity: 2186, crewCapacity: 927, tonnage: 81000, length: 280, imageUrl: 'https://www.ncl.com/sites/default/files/Pride-of-America-Exterior.jpg' },
  ],

  'msc-cruises': [
    { name: 'MSC World Europa', slug: 'msc-world-europa', yearBuilt: 2022, passengerCapacity: 6762, crewCapacity: 2138, tonnage: 215863, length: 333, imageUrl: 'https://www.msccruises.com/~/media/Ships/World-Europa/msc-world-europa-exterior.jpg' },
    { name: 'MSC Virtuosa', slug: 'msc-virtuosa', yearBuilt: 2021, passengerCapacity: 6334, crewCapacity: 1704, tonnage: 181541, length: 331, imageUrl: 'https://www.msccruises.com/~/media/Ships/Virtuosa/msc-virtuosa-exterior.jpg' },
    { name: 'MSC Grandiosa', slug: 'msc-grandiosa', yearBuilt: 2019, passengerCapacity: 6334, crewCapacity: 1704, tonnage: 181541, length: 331, imageUrl: 'https://www.msccruises.com/~/media/Ships/Grandiosa/msc-grandiosa-exterior.jpg' },
    { name: 'MSC Bellissima', slug: 'msc-bellissima', yearBuilt: 2019, passengerCapacity: 5686, crewCapacity: 1536, tonnage: 171598, length: 316, imageUrl: 'https://www.msccruises.com/~/media/Ships/Bellissima/msc-bellissima-exterior.jpg' },
    { name: 'MSC Meraviglia', slug: 'msc-meraviglia', yearBuilt: 2017, passengerCapacity: 5714, crewCapacity: 1536, tonnage: 171598, length: 316, imageUrl: 'https://www.msccruises.com/~/media/Ships/Meraviglia/msc-meraviglia-exterior.jpg' },
    { name: 'MSC Seascape', slug: 'msc-seascape', yearBuilt: 2022, passengerCapacity: 5632, crewCapacity: 1648, tonnage: 170412, length: 339, imageUrl: 'https://www.msccruises.com/~/media/Ships/Seascape/msc-seascape-exterior.jpg' },
    { name: 'MSC Seashore', slug: 'msc-seashore', yearBuilt: 2021, passengerCapacity: 5632, crewCapacity: 1648, tonnage: 169380, length: 339, imageUrl: 'https://www.msccruises.com/~/media/Ships/Seashore/msc-seashore-exterior.jpg' },
    { name: 'MSC Seaside', slug: 'msc-seaside', yearBuilt: 2017, passengerCapacity: 5179, crewCapacity: 1413, tonnage: 160000, length: 323, imageUrl: 'https://www.msccruises.com/~/media/Ships/Seaside/msc-seaside-exterior.jpg' },
    { name: 'MSC Seaview', slug: 'msc-seaview', yearBuilt: 2018, passengerCapacity: 5179, crewCapacity: 1413, tonnage: 160000, length: 323, imageUrl: 'https://www.msccruises.com/~/media/Ships/Seaview/msc-seaview-exterior.jpg' },
    { name: 'MSC Euribia', slug: 'msc-euribia', yearBuilt: 2023, passengerCapacity: 4888, crewCapacity: 1704, tonnage: 184011, length: 331, imageUrl: 'https://www.msccruises.com/~/media/Ships/Euribia/msc-euribia-exterior.jpg' },
    { name: 'MSC Divina', slug: 'msc-divina', yearBuilt: 2012, passengerCapacity: 4363, crewCapacity: 1388, tonnage: 139400, length: 333, imageUrl: 'https://www.msccruises.com/~/media/Ships/Divina/msc-divina-exterior.jpg' },
    { name: 'MSC Preziosa', slug: 'msc-preziosa', yearBuilt: 2013, passengerCapacity: 4345, crewCapacity: 1388, tonnage: 139400, length: 333, imageUrl: 'https://www.msccruises.com/~/media/Ships/Preziosa/msc-preziosa-exterior.jpg' },
    { name: 'MSC Splendida', slug: 'msc-splendida', yearBuilt: 2009, passengerCapacity: 4363, crewCapacity: 1370, tonnage: 137936, length: 333, imageUrl: 'https://www.msccruises.com/~/media/Ships/Splendida/msc-splendida-exterior.jpg' },
    { name: 'MSC Fantasia', slug: 'msc-fantasia', yearBuilt: 2008, passengerCapacity: 4363, crewCapacity: 1370, tonnage: 137936, length: 333, imageUrl: 'https://www.msccruises.com/~/media/Ships/Fantasia/msc-fantasia-exterior.jpg' },
    { name: 'MSC Magnifica', slug: 'msc-magnifica', yearBuilt: 2010, passengerCapacity: 3223, crewCapacity: 1013, tonnage: 95128, length: 294, imageUrl: 'https://www.msccruises.com/~/media/Ships/Magnifica/msc-magnifica-exterior.jpg' },
    { name: 'MSC Musica', slug: 'msc-musica', yearBuilt: 2006, passengerCapacity: 3223, crewCapacity: 1013, tonnage: 92409, length: 294, imageUrl: 'https://www.msccruises.com/~/media/Ships/Musica/msc-musica-exterior.jpg' },
  ],

  'princess': [
    { name: 'Discovery Princess', slug: 'discovery-princess', yearBuilt: 2022, passengerCapacity: 3660, crewCapacity: 1346, tonnage: 145281, length: 330, imageUrl: 'https://www.princess.com/ships-and-experience/ships/di-discovery-princess/images/hero.jpg' },
    { name: 'Enchanted Princess', slug: 'enchanted-princess', yearBuilt: 2020, passengerCapacity: 3660, crewCapacity: 1346, tonnage: 145281, length: 330, imageUrl: 'https://www.princess.com/ships-and-experience/ships/en-enchanted-princess/images/hero.jpg' },
    { name: 'Sky Princess', slug: 'sky-princess', yearBuilt: 2019, passengerCapacity: 3660, crewCapacity: 1346, tonnage: 143700, length: 330, imageUrl: 'https://www.princess.com/ships-and-experience/ships/sk-sky-princess/images/hero.jpg' },
    { name: 'Majestic Princess', slug: 'majestic-princess', yearBuilt: 2017, passengerCapacity: 3560, crewCapacity: 1346, tonnage: 143700, length: 330, imageUrl: 'https://www.princess.com/ships-and-experience/ships/mj-majestic-princess/images/hero.jpg' },
    { name: 'Regal Princess', slug: 'regal-princess', yearBuilt: 2014, passengerCapacity: 3560, crewCapacity: 1346, tonnage: 141000, length: 330, imageUrl: 'https://www.princess.com/ships-and-experience/ships/rg-regal-princess/images/hero.jpg' },
    { name: 'Royal Princess', slug: 'royal-princess', yearBuilt: 2013, passengerCapacity: 3560, crewCapacity: 1346, tonnage: 141000, length: 330, imageUrl: 'https://www.princess.com/ships-and-experience/ships/ry-royal-princess/images/hero.jpg' },
    { name: 'Caribbean Princess', slug: 'caribbean-princess', yearBuilt: 2004, passengerCapacity: 3142, crewCapacity: 1200, tonnage: 113000, length: 290, imageUrl: 'https://www.princess.com/ships-and-experience/ships/ca-caribbean-princess/images/hero.jpg' },
    { name: 'Crown Princess', slug: 'crown-princess', yearBuilt: 2006, passengerCapacity: 3080, crewCapacity: 1200, tonnage: 113561, length: 290, imageUrl: 'https://www.princess.com/ships-and-experience/ships/cr-crown-princess/images/hero.jpg' },
    { name: 'Emerald Princess', slug: 'emerald-princess', yearBuilt: 2007, passengerCapacity: 3080, crewCapacity: 1200, tonnage: 113561, length: 290, imageUrl: 'https://www.princess.com/ships-and-experience/ships/em-emerald-princess/images/hero.jpg' },
    { name: 'Ruby Princess', slug: 'ruby-princess', yearBuilt: 2008, passengerCapacity: 3080, crewCapacity: 1200, tonnage: 113561, length: 290, imageUrl: 'https://www.princess.com/ships-and-experience/ships/ru-ruby-princess/images/hero.jpg' },
    { name: 'Coral Princess', slug: 'coral-princess', yearBuilt: 2003, passengerCapacity: 2000, crewCapacity: 900, tonnage: 91627, length: 294, imageUrl: 'https://www.princess.com/ships-and-experience/ships/co-coral-princess/images/hero.jpg' },
  ],

  'celebrity': [
    { name: 'Celebrity Beyond', slug: 'celebrity-beyond', yearBuilt: 2022, passengerCapacity: 3260, crewCapacity: 1400, tonnage: 140600, length: 327, imageUrl: 'https://www.celebritycruises.com/content/dam/celebrity/ships/beyond/beyond-exterior.jpg' },
    { name: 'Celebrity Apex', slug: 'celebrity-apex', yearBuilt: 2020, passengerCapacity: 2918, crewCapacity: 1320, tonnage: 129500, length: 306, imageUrl: 'https://www.celebritycruises.com/content/dam/celebrity/ships/apex/apex-exterior.jpg' },
    { name: 'Celebrity Edge', slug: 'celebrity-edge', yearBuilt: 2018, passengerCapacity: 2918, crewCapacity: 1320, tonnage: 129500, length: 306, imageUrl: 'https://www.celebritycruises.com/content/dam/celebrity/ships/edge/edge-exterior.jpg' },
    { name: 'Celebrity Reflection', slug: 'celebrity-reflection', yearBuilt: 2012, passengerCapacity: 3046, crewCapacity: 1271, tonnage: 126000, length: 319, imageUrl: 'https://www.celebritycruises.com/content/dam/celebrity/ships/reflection/reflection-exterior.jpg' },
    { name: 'Celebrity Silhouette', slug: 'celebrity-silhouette', yearBuilt: 2011, passengerCapacity: 2886, crewCapacity: 1271, tonnage: 122400, length: 319, imageUrl: 'https://www.celebritycruises.com/content/dam/celebrity/ships/silhouette/silhouette-exterior.jpg' },
    { name: 'Celebrity Eclipse', slug: 'celebrity-eclipse', yearBuilt: 2010, passengerCapacity: 2852, crewCapacity: 1271, tonnage: 122400, length: 317, imageUrl: 'https://www.celebritycruises.com/content/dam/celebrity/ships/eclipse/eclipse-exterior.jpg' },
    { name: 'Celebrity Equinox', slug: 'celebrity-equinox', yearBuilt: 2009, passengerCapacity: 2850, crewCapacity: 1271, tonnage: 122000, length: 317, imageUrl: 'https://www.celebritycruises.com/content/dam/celebrity/ships/equinox/equinox-exterior.jpg' },
    { name: 'Celebrity Solstice', slug: 'celebrity-solstice', yearBuilt: 2008, passengerCapacity: 2850, crewCapacity: 1271, tonnage: 122000, length: 317, imageUrl: 'https://www.celebritycruises.com/content/dam/celebrity/ships/solstice/solstice-exterior.jpg' },
    { name: 'Celebrity Constellation', slug: 'celebrity-constellation', yearBuilt: 2002, passengerCapacity: 2170, crewCapacity: 999, tonnage: 91000, length: 294, imageUrl: 'https://www.celebritycruises.com/content/dam/celebrity/ships/constellation/constellation-exterior.jpg' },
    { name: 'Celebrity Summit', slug: 'celebrity-summit', yearBuilt: 2001, passengerCapacity: 2158, crewCapacity: 999, tonnage: 91000, length: 294, imageUrl: 'https://www.celebritycruises.com/content/dam/celebrity/ships/summit/summit-exterior.jpg' },
    { name: 'Celebrity Millennium', slug: 'celebrity-millennium', yearBuilt: 2000, passengerCapacity: 2218, crewCapacity: 999, tonnage: 91000, length: 294, imageUrl: 'https://www.celebritycruises.com/content/dam/celebrity/ships/millennium/millennium-exterior.jpg' },
  ],

  'disney': [
    { name: 'Disney Wish', slug: 'disney-wish', yearBuilt: 2022, passengerCapacity: 4000, crewCapacity: 1555, tonnage: 144000, length: 342, imageUrl: 'https://disneycruise.disney.go.com/media/dcl/ships/wish/wish-ship-exterior.jpg' },
    { name: 'Disney Fantasy', slug: 'disney-fantasy', yearBuilt: 2012, passengerCapacity: 4000, crewCapacity: 1458, tonnage: 129750, length: 340, imageUrl: 'https://disneycruise.disney.go.com/media/dcl/ships/fantasy/fantasy-ship-exterior.jpg' },
    { name: 'Disney Dream', slug: 'disney-dream', yearBuilt: 2011, passengerCapacity: 4000, crewCapacity: 1458, tonnage: 129750, length: 340, imageUrl: 'https://disneycruise.disney.go.com/media/dcl/ships/dream/dream-ship-exterior.jpg' },
    { name: 'Disney Wonder', slug: 'disney-wonder', yearBuilt: 1999, passengerCapacity: 2400, crewCapacity: 950, tonnage: 83969, length: 294, imageUrl: 'https://disneycruise.disney.go.com/media/dcl/ships/wonder/wonder-ship-exterior.jpg' },
    { name: 'Disney Magic', slug: 'disney-magic', yearBuilt: 1998, passengerCapacity: 2400, crewCapacity: 950, tonnage: 83969, length: 294, imageUrl: 'https://disneycruise.disney.go.com/media/dcl/ships/magic/magic-ship-exterior.jpg' },
  ],

  'virgin-voyages': [
    { name: 'Scarlet Lady', slug: 'scarlet-lady', yearBuilt: 2020, passengerCapacity: 2770, crewCapacity: 1160, tonnage: 110000, length: 278, imageUrl: 'https://www.virginvoyages.com/content/dam/virgin/ships/scarlet-lady-exterior.jpg' },
    { name: 'Valiant Lady', slug: 'valiant-lady', yearBuilt: 2021, passengerCapacity: 2770, crewCapacity: 1160, tonnage: 110000, length: 278, imageUrl: 'https://www.virginvoyages.com/content/dam/virgin/ships/valiant-lady-exterior.jpg' },
    { name: 'Resilient Lady', slug: 'resilient-lady', yearBuilt: 2023, passengerCapacity: 2770, crewCapacity: 1160, tonnage: 110000, length: 278, imageUrl: 'https://www.virginvoyages.com/content/dam/virgin/ships/resilient-lady-exterior.jpg' },
  ],
};

async function seedAllShips() {
  console.log('🚢 Iniciando população de companhias e navios...\n');

  const db = await getDb();
  if (!db) {
    console.error('❌ Banco de dados não disponível. Verifique a variável DATABASE_URL.');
    process.exit(1);
  }

  // 1. Inserir companhias
  console.log('🏢 Inserindo companhias...\n');
  for (const companyData of companiesData) {
    try {
      const [existing] = await db.select().from(companies).where(eq(companies.slug, companyData.slug)).limit(1);
      if (existing) {
        console.log(`   ♻️  Companhia já existe: ${companyData.name}`);
      } else {
        await db.insert(companies).values(companyData);
        console.log(`   ✅ Companhia criada: ${companyData.name}`);
      }
    } catch (error) {
      console.error(`   ❌ Erro ao inserir ${companyData.name}:`, error.message);
    }
  }

  // 2. Inserir navios
  console.log('\n🚢 Inserindo navios...\n');
  let successCount = 0;
  let errorCount = 0;

  for (const [companySlug, shipsList] of Object.entries(allShipsData)) {
    console.log(`\n📋 Processando: ${companySlug} (${shipsList.length} navios)`);

    const [company] = await db.select().from(companies).where(eq(companies.slug, companySlug)).limit(1);
    if (!company) {
      console.log(`   ⚠️  Companhia não encontrada: ${companySlug}`);
      errorCount += shipsList.length;
      continue;
    }

    for (const shipData of shipsList) {
      try {
        const [existing] = await db.select().from(ships).where(eq(ships.slug, shipData.slug)).limit(1);
        if (existing) {
          await db.update(ships).set({
            name: shipData.name,
            imageUrl: shipData.imageUrl,
            yearBuilt: shipData.yearBuilt,
            passengerCapacity: shipData.passengerCapacity,
            crewCapacity: shipData.crewCapacity,
            tonnage: shipData.tonnage,
            length: shipData.length?.toString(),
          }).where(eq(ships.id, existing.id));
          console.log(`   ♻️  Atualizado: ${shipData.name}`);
        } else {
          await db.insert(ships).values({
            companyId: company.id,
            name: shipData.name,
            slug: shipData.slug,
            imageUrl: shipData.imageUrl,
            yearBuilt: shipData.yearBuilt,
            passengerCapacity: shipData.passengerCapacity,
            crewCapacity: shipData.crewCapacity,
            tonnage: shipData.tonnage,
            length: shipData.length?.toString(),
          });
          console.log(`   ✅ Criado: ${shipData.name}`);
        }
        successCount++;
      } catch (error) {
        console.error(`   ❌ Erro em ${shipData.name}:`, error.message);
        errorCount++;
      }
    }
  }

  console.log(`\n📊 Resumo:`);
  console.log(`   ✅ Sucesso: ${successCount}`);
  console.log(`   ❌ Erros: ${errorCount}`);
  console.log('\n✨ Processo concluído!');
  process.exit(0);
}

seedAllShips().catch((error) => {
  console.error('💥 Erro fatal:', error);
  process.exit(1);
});
