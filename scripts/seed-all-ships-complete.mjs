import { db } from '../server/db.ts';
import { companies, ships } from '../drizzle/schema.ts';
import { eq } from 'drizzle-orm';

/**
 * Script completo com TODOS os navios das principais companhias de cruzeiro
 * Dados reais atualizados em 2025
 */

const allShipsData = {
  'royal-caribbean': [
    // Classe Oasis
    { name: 'Icon of the Seas', slug: 'icon-of-the-seas', yearBuilt: 2024, passengerCapacity: 7600, crewCapacity: 2350, tonnage: 250800, length: 365, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/icon/hero/icon-of-the-seas-aerial-view.jpg' },
    { name: 'Wonder of the Seas', slug: 'wonder-of-the-seas', yearBuilt: 2022, passengerCapacity: 6988, crewCapacity: 2300, tonnage: 236857, length: 362, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/wonder/hero/wonder-of-the-seas-aerial.jpg' },
    { name: 'Symphony of the Seas', slug: 'symphony-of-the-seas', yearBuilt: 2018, passengerCapacity: 6680, crewCapacity: 2200, tonnage: 228081, length: 362, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/symphony/hero/symphony-of-the-seas-aerial-view.jpg' },
    { name: 'Harmony of the Seas', slug: 'harmony-of-the-seas', yearBuilt: 2016, passengerCapacity: 6687, crewCapacity: 2300, tonnage: 226963, length: 362, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/harmony/hero/harmony-of-the-seas-exterior.jpg' },
    { name: 'Oasis of the Seas', slug: 'oasis-of-the-seas', yearBuilt: 2009, passengerCapacity: 6771, crewCapacity: 2165, tonnage: 225282, length: 362, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/oasis/hero/oasis-of-the-seas-aerial.jpg' },
    { name: 'Allure of the Seas', slug: 'allure-of-the-seas', yearBuilt: 2010, passengerCapacity: 6780, crewCapacity: 2200, tonnage: 225282, length: 362, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/allure/hero/allure-of-the-seas-exterior.jpg' },
    
    // Classe Quantum
    { name: 'Odyssey of the Seas', slug: 'odyssey-of-the-seas', yearBuilt: 2021, passengerCapacity: 4198, crewCapacity: 1550, tonnage: 169379, length: 347, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/odyssey/hero/odyssey-of-the-seas.jpg' },
    { name: 'Spectrum of the Seas', slug: 'spectrum-of-the-seas', yearBuilt: 2019, passengerCapacity: 4246, crewCapacity: 1551, tonnage: 169379, length: 347, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/spectrum/hero/spectrum-of-the-seas.jpg' },
    { name: 'Ovation of the Seas', slug: 'ovation-of-the-seas', yearBuilt: 2016, passengerCapacity: 4180, crewCapacity: 1500, tonnage: 168666, length: 348, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/ovation/hero/ovation-of-the-seas.jpg' },
    { name: 'Anthem of the Seas', slug: 'anthem-of-the-seas', yearBuilt: 2015, passengerCapacity: 4180, crewCapacity: 1500, tonnage: 168666, length: 348, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/anthem/hero/anthem-of-the-seas.jpg' },
    { name: 'Quantum of the Seas', slug: 'quantum-of-the-seas', yearBuilt: 2014, passengerCapacity: 4180, crewCapacity: 1500, tonnage: 168666, length: 348, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/quantum/hero/quantum-of-the-seas.jpg' },
    
    // Classe Freedom
    { name: 'Liberty of the Seas', slug: 'liberty-of-the-seas', yearBuilt: 2007, passengerCapacity: 3634, crewCapacity: 1360, tonnage: 154407, length: 339, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/liberty/hero/liberty-of-the-seas.jpg' },
    { name: 'Independence of the Seas', slug: 'independence-of-the-seas', yearBuilt: 2008, passengerCapacity: 3634, crewCapacity: 1360, tonnage: 154407, length: 339, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/independence/hero/independence-of-the-seas.jpg' },
    { name: 'Freedom of the Seas', slug: 'freedom-of-the-seas', yearBuilt: 2006, passengerCapacity: 3634, crewCapacity: 1360, tonnage: 154407, length: 339, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/freedom/hero/freedom-of-the-seas.jpg' },
    
    // Classe Voyager
    { name: 'Mariner of the Seas', slug: 'mariner-of-the-seas', yearBuilt: 2003, passengerCapacity: 3114, crewCapacity: 1185, tonnage: 138279, length: 311, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/mariner/hero/mariner-of-the-seas.jpg' },
    { name: 'Navigator of the Seas', slug: 'navigator-of-the-seas', yearBuilt: 2002, passengerCapacity: 3114, crewCapacity: 1185, tonnage: 138279, length: 311, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/navigator/hero/navigator-of-the-seas.jpg' },
    { name: 'Adventure of the Seas', slug: 'adventure-of-the-seas', yearBuilt: 2001, passengerCapacity: 3114, crewCapacity: 1185, tonnage: 138000, length: 311, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/adventure/hero/adventure-of-the-seas.jpg' },
    { name: 'Explorer of the Seas', slug: 'explorer-of-the-seas', yearBuilt: 2000, passengerCapacity: 3114, crewCapacity: 1185, tonnage: 137308, length: 311, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/explorer/hero/explorer-of-the-seas.jpg' },
    { name: 'Voyager of the Seas', slug: 'voyager-of-the-seas', yearBuilt: 1999, passengerCapacity: 3114, crewCapacity: 1176, tonnage: 137276, length: 311, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/voyager/hero/voyager-of-the-seas.jpg' },
    
    // Classe Radiance
    { name: 'Brilliance of the Seas', slug: 'brilliance-of-the-seas', yearBuilt: 2002, passengerCapacity: 2142, crewCapacity: 859, tonnage: 90090, length: 293, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/brilliance/hero/brilliance-of-the-seas.jpg' },
    { name: 'Serenade of the Seas', slug: 'serenade-of-the-seas', yearBuilt: 2003, passengerCapacity: 2142, crewCapacity: 859, tonnage: 90090, length: 293, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/serenade/hero/serenade-of-the-seas.jpg' },
    { name: 'Jewel of the Seas', slug: 'jewel-of-the-seas', yearBuilt: 2004, passengerCapacity: 2142, crewCapacity: 859, tonnage: 90090, length: 293, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/jewel/hero/jewel-of-the-seas.jpg' },
    { name: 'Radiance of the Seas', slug: 'radiance-of-the-seas', yearBuilt: 2001, passengerCapacity: 2142, crewCapacity: 859, tonnage: 90090, length: 293, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/radiance/hero/radiance-of-the-seas.jpg' },
    
    // Outros
    { name: 'Vision of the Seas', slug: 'vision-of-the-seas', yearBuilt: 1998, passengerCapacity: 2000, crewCapacity: 765, tonnage: 78340, length: 279, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/vision/hero/vision-of-the-seas.jpg' },
    { name: 'Enchantment of the Seas', slug: 'enchantment-of-the-seas', yearBuilt: 1997, passengerCapacity: 2252, crewCapacity: 840, tonnage: 81500, length: 301, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/enchantment/hero/enchantment-of-the-seas.jpg' },
    { name: 'Rhapsody of the Seas', slug: 'rhapsody-of-the-seas', yearBuilt: 1997, passengerCapacity: 2000, crewCapacity: 765, tonnage: 78491, length: 279, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/rhapsody/hero/rhapsody-of-the-seas.jpg' },
    { name: 'Grandeur of the Seas', slug: 'grandeur-of-the-seas', yearBuilt: 1996, passengerCapacity: 1950, crewCapacity: 760, tonnage: 73817, length: 279, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/grandeur/hero/grandeur-of-the-seas.jpg' },
  ],

  'carnival': [
    // Classe Excel
    { name: 'Carnival Celebration', slug: 'carnival-celebration', yearBuilt: 2022, passengerCapacity: 5374, crewCapacity: 1735, tonnage: 183521, length: 344, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/CE/CE-hero.jpg' },
    { name: 'Carnival Mardi Gras', slug: 'carnival-mardi-gras', yearBuilt: 2021, passengerCapacity: 5282, crewCapacity: 1745, tonnage: 180800, length: 344, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/MG/MG-hero.jpg' },
    { name: 'Carnival Jubilee', slug: 'carnival-jubilee', yearBuilt: 2023, passengerCapacity: 5374, crewCapacity: 1735, tonnage: 183521, length: 344, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/JU/JU-hero.jpg' },
    
    // Classe Vista
    { name: 'Carnival Venezia', slug: 'carnival-venezia', yearBuilt: 2019, passengerCapacity: 4232, crewCapacity: 1450, tonnage: 135225, length: 323, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/VZ/VZ-hero.jpg' },
    { name: 'Carnival Firenze', slug: 'carnival-firenze', yearBuilt: 2020, passengerCapacity: 4232, crewCapacity: 1450, tonnage: 135225, length: 323, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/FI/FI-hero.jpg' },
    { name: 'Carnival Panorama', slug: 'carnival-panorama', yearBuilt: 2019, passengerCapacity: 4008, crewCapacity: 1450, tonnage: 133596, length: 323, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/PA/PA-hero.jpg' },
    { name: 'Carnival Horizon', slug: 'carnival-horizon', yearBuilt: 2018, passengerCapacity: 3974, crewCapacity: 1450, tonnage: 133596, length: 323, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/HZ/HZ-hero.jpg' },
    { name: 'Carnival Vista', slug: 'carnival-vista', yearBuilt: 2016, passengerCapacity: 3934, crewCapacity: 1450, tonnage: 133596, length: 323, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/VI/VI-hero.jpg' },
    
    // Classe Dream
    { name: 'Carnival Breeze', slug: 'carnival-breeze', yearBuilt: 2012, passengerCapacity: 3690, crewCapacity: 1386, tonnage: 130000, length: 306, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/BR/BR-hero.jpg' },
    { name: 'Carnival Magic', slug: 'carnival-magic', yearBuilt: 2011, passengerCapacity: 3690, crewCapacity: 1386, tonnage: 130000, length: 306, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/MA/MA-hero.jpg' },
    { name: 'Carnival Dream', slug: 'carnival-dream', yearBuilt: 2009, passengerCapacity: 3646, crewCapacity: 1367, tonnage: 128251, length: 306, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/DR/DR-hero.jpg' },
    
    // Classe Conquest
    { name: 'Carnival Freedom', slug: 'carnival-freedom', yearBuilt: 2007, passengerCapacity: 2980, crewCapacity: 1150, tonnage: 110239, length: 290, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/FD/FD-hero.jpg' },
    { name: 'Carnival Liberty', slug: 'carnival-liberty', yearBuilt: 2005, passengerCapacity: 2974, crewCapacity: 1160, tonnage: 110000, length: 290, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/LI/LI-hero.jpg' },
    { name: 'Carnival Valor', slug: 'carnival-valor', yearBuilt: 2004, passengerCapacity: 2974, crewCapacity: 1160, tonnage: 110000, length: 290, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/VA/VA-hero.jpg' },
    { name: 'Carnival Glory', slug: 'carnival-glory', yearBuilt: 2003, passengerCapacity: 2980, crewCapacity: 1150, tonnage: 110000, length: 290, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/GL/GL-hero.jpg' },
    { name: 'Carnival Conquest', slug: 'carnival-conquest', yearBuilt: 2002, passengerCapacity: 2980, crewCapacity: 1150, tonnage: 110239, length: 290, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/CO/CO-hero.jpg' },
    
    // Classe Spirit
    { name: 'Carnival Miracle', slug: 'carnival-miracle', yearBuilt: 2004, passengerCapacity: 2124, crewCapacity: 961, tonnage: 88500, length: 294, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/MI/MI-hero.jpg' },
    { name: 'Carnival Legend', slug: 'carnival-legend', yearBuilt: 2002, passengerCapacity: 2124, crewCapacity: 930, tonnage: 86000, length: 294, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/LE/LE-hero.jpg' },
    { name: 'Carnival Pride', slug: 'carnival-pride', yearBuilt: 2002, passengerCapacity: 2124, crewCapacity: 930, tonnage: 88500, length: 294, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/PR/PR-hero.jpg' },
    { name: 'Carnival Spirit', slug: 'carnival-spirit', yearBuilt: 2001, passengerCapacity: 2124, crewCapacity: 961, tonnage: 88500, length: 294, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/SP/SP-hero.jpg' },
    
    // Outros
    { name: 'Carnival Sunrise', slug: 'carnival-sunrise', yearBuilt: 1999, passengerCapacity: 2984, crewCapacity: 1150, tonnage: 101509, length: 272, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/SU/SU-hero.jpg' },
    { name: 'Carnival Sunshine', slug: 'carnival-sunshine', yearBuilt: 1996, passengerCapacity: 3002, crewCapacity: 1150, tonnage: 102853, length: 272, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/SH/SH-hero.jpg' },
    { name: 'Carnival Radiance', slug: 'carnival-radiance', yearBuilt: 2000, passengerCapacity: 2984, crewCapacity: 1150, tonnage: 101509, length: 272, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/RA/RA-hero.jpg' },
    { name: 'Carnival Luminosa', slug: 'carnival-luminosa', yearBuilt: 2009, passengerCapacity: 2260, crewCapacity: 920, tonnage: 92600, length: 294, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/LU/LU-hero.jpg' },
    { name: 'Carnival Elation', slug: 'carnival-elation', yearBuilt: 1998, passengerCapacity: 2052, crewCapacity: 920, tonnage: 70367, length: 260, imageUrl: 'https://www.carnival.com/~/media/Images/Ships/EL/EL-hero.jpg' },
  ],

  'norwegian': [
    // Classe Prima
    { name: 'Norwegian Viva', slug: 'norwegian-viva', yearBuilt: 2023, passengerCapacity: 3099, crewCapacity: 1700, tonnage: 142500, length: 299, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Viva-Exterior.jpg' },
    { name: 'Norwegian Prima', slug: 'norwegian-prima', yearBuilt: 2022, passengerCapacity: 3099, crewCapacity: 1700, tonnage: 142500, length: 299, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Prima-Exterior.jpg' },
    
    // Classe Breakaway Plus
    { name: 'Norwegian Encore', slug: 'norwegian-encore', yearBuilt: 2019, passengerCapacity: 3998, crewCapacity: 1735, tonnage: 169116, length: 333, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Encore-Exterior.jpg' },
    { name: 'Norwegian Bliss', slug: 'norwegian-bliss', yearBuilt: 2018, passengerCapacity: 4004, crewCapacity: 1716, tonnage: 168028, length: 333, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Bliss-Exterior.jpg' },
    { name: 'Norwegian Joy', slug: 'norwegian-joy', yearBuilt: 2017, passengerCapacity: 3804, crewCapacity: 1821, tonnage: 167725, length: 333, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Joy-Exterior.jpg' },
    
    // Classe Breakaway
    { name: 'Norwegian Escape', slug: 'norwegian-escape', yearBuilt: 2015, passengerCapacity: 4266, crewCapacity: 1733, tonnage: 164600, length: 326, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Escape-Exterior.jpg' },
    { name: 'Norwegian Getaway', slug: 'norwegian-getaway', yearBuilt: 2014, passengerCapacity: 3963, crewCapacity: 1646, tonnage: 145655, length: 326, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Getaway-Exterior.jpg' },
    { name: 'Norwegian Breakaway', slug: 'norwegian-breakaway', yearBuilt: 2013, passengerCapacity: 3963, crewCapacity: 1657, tonnage: 145655, length: 326, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Breakaway-Exterior.jpg' },
    
    // Classe Epic
    { name: 'Norwegian Epic', slug: 'norwegian-epic', yearBuilt: 2010, passengerCapacity: 4100, crewCapacity: 1753, tonnage: 155873, length: 329, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Epic-Exterior.jpg' },
    
    // Classe Jewel
    { name: 'Norwegian Gem', slug: 'norwegian-gem', yearBuilt: 2007, passengerCapacity: 2394, crewCapacity: 1100, tonnage: 93530, length: 294, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Gem-Exterior.jpg' },
    { name: 'Norwegian Jade', slug: 'norwegian-jade', yearBuilt: 2006, passengerCapacity: 2402, crewCapacity: 1100, tonnage: 93558, length: 294, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Jade-Exterior.jpg' },
    { name: 'Norwegian Pearl', slug: 'norwegian-pearl', yearBuilt: 2006, passengerCapacity: 2394, crewCapacity: 1100, tonnage: 93530, length: 294, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Pearl-Exterior.jpg' },
    { name: 'Norwegian Jewel', slug: 'norwegian-jewel', yearBuilt: 2005, passengerCapacity: 2376, crewCapacity: 1100, tonnage: 93502, length: 294, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Jewel-Exterior.jpg' },
    
    // Classe Dawn
    { name: 'Norwegian Star', slug: 'norwegian-star', yearBuilt: 2001, passengerCapacity: 2348, crewCapacity: 1100, tonnage: 91740, length: 294, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Star-Exterior.jpg' },
    { name: 'Norwegian Dawn', slug: 'norwegian-dawn', yearBuilt: 2002, passengerCapacity: 2340, crewCapacity: 1146, tonnage: 92250, length: 294, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Dawn-Exterior.jpg' },
    
    // Outros
    { name: 'Norwegian Sun', slug: 'norwegian-sun', yearBuilt: 2001, passengerCapacity: 1936, crewCapacity: 906, tonnage: 78309, length: 258, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Sun-Exterior.jpg' },
    { name: 'Norwegian Sky', slug: 'norwegian-sky', yearBuilt: 1999, passengerCapacity: 2004, crewCapacity: 900, tonnage: 77104, length: 258, imageUrl: 'https://www.ncl.com/sites/default/files/Norwegian-Sky-Exterior.jpg' },
    { name: 'Pride of America', slug: 'pride-of-america', yearBuilt: 2005, passengerCapacity: 2186, crewCapacity: 927, tonnage: 81000, length: 280, imageUrl: 'https://www.ncl.com/sites/default/files/Pride-of-America-Exterior.jpg' },
  ],

  'msc-cruises': [
    // Classe World
    { name: 'MSC World Europa', slug: 'msc-world-europa', yearBuilt: 2022, passengerCapacity: 6762, crewCapacity: 2138, tonnage: 215863, length: 333, imageUrl: 'https://www.msccruises.com/~/media/Ships/World-Europa/msc-world-europa-exterior.jpg' },
    { name: 'MSC World America', slug: 'msc-world-america', yearBuilt: 2025, passengerCapacity: 6762, crewCapacity: 2138, tonnage: 215863, length: 333, imageUrl: 'https://www.msccruises.com/~/media/Ships/World-America/msc-world-america-exterior.jpg' },
    
    // Classe Meraviglia Plus
    { name: 'MSC Virtuosa', slug: 'msc-virtuosa', yearBuilt: 2021, passengerCapacity: 6334, crewCapacity: 1704, tonnage: 181541, length: 331, imageUrl: 'https://www.msccruises.com/~/media/Ships/Virtuosa/msc-virtuosa-exterior.jpg' },
    { name: 'MSC Grandiosa', slug: 'msc-grandiosa', yearBuilt: 2019, passengerCapacity: 6334, crewCapacity: 1704, tonnage: 181541, length: 331, imageUrl: 'https://www.msccruises.com/~/media/Ships/Grandiosa/msc-grandiosa-exterior.jpg' },
    
    // Classe Meraviglia
    { name: 'MSC Bellissima', slug: 'msc-bellissima', yearBuilt: 2019, passengerCapacity: 5686, crewCapacity: 1536, tonnage: 171598, length: 316, imageUrl: 'https://www.msccruises.com/~/media/Ships/Bellissima/msc-bellissima-exterior.jpg' },
    { name: 'MSC Meraviglia', slug: 'msc-meraviglia', yearBuilt: 2017, passengerCapacity: 5714, crewCapacity: 1536, tonnage: 171598, length: 316, imageUrl: 'https://www.msccruises.com/~/media/Ships/Meraviglia/msc-meraviglia-exterior.jpg' },
    
    // Classe Seaside
    { name: 'MSC Seascape', slug: 'msc-seascape', yearBuilt: 2022, passengerCapacity: 5632, crewCapacity: 1648, tonnage: 170412, length: 339, imageUrl: 'https://www.msccruises.com/~/media/Ships/Seascape/msc-seascape-exterior.jpg' },
    { name: 'MSC Seashore', slug: 'msc-seashore', yearBuilt: 2021, passengerCapacity: 5632, crewCapacity: 1648, tonnage: 169380, length: 339, imageUrl: 'https://www.msccruises.com/~/media/Ships/Seashore/msc-seashore-exterior.jpg' },
    { name: 'MSC Seaside', slug: 'msc-seaside', yearBuilt: 2017, passengerCapacity: 5179, crewCapacity: 1413, tonnage: 160000, length: 323, imageUrl: 'https://www.msccruises.com/~/media/Ships/Seaside/msc-seaside-exterior.jpg' },
    { name: 'MSC Seaview', slug: 'msc-seaview', yearBuilt: 2018, passengerCapacity: 5179, crewCapacity: 1413, tonnage: 160000, length: 323, imageUrl: 'https://www.msccruises.com/~/media/Ships/Seaview/msc-seaview-exterior.jpg' },
    
    // Classe Fantasia
    { name: 'MSC Euribia', slug: 'msc-euribia', yearBuilt: 2023, passengerCapacity: 4888, crewCapacity: 1704, tonnage: 184011, length: 331, imageUrl: 'https://www.msccruises.com/~/media/Ships/Euribia/msc-euribia-exterior.jpg' },
    { name: 'MSC Divina', slug: 'msc-divina', yearBuilt: 2012, passengerCapacity: 4363, crewCapacity: 1388, tonnage: 139400, length: 333, imageUrl: 'https://www.msccruises.com/~/media/Ships/Divina/msc-divina-exterior.jpg' },
    { name: 'MSC Preziosa', slug: 'msc-preziosa', yearBuilt: 2013, passengerCapacity: 4345, crewCapacity: 1388, tonnage: 139400, length: 333, imageUrl: 'https://www.msccruises.com/~/media/Ships/Preziosa/msc-preziosa-exterior.jpg' },
    { name: 'MSC Splendida', slug: 'msc-splendida', yearBuilt: 2009, passengerCapacity: 4363, crewCapacity: 1370, tonnage: 137936, length: 333, imageUrl: 'https://www.msccruises.com/~/media/Ships/Splendida/msc-splendida-exterior.jpg' },
    { name: 'MSC Fantasia', slug: 'msc-fantasia', yearBuilt: 2008, passengerCapacity: 4363, crewCapacity: 1370, tonnage: 137936, length: 333, imageUrl: 'https://www.msccruises.com/~/media/Ships/Fantasia/msc-fantasia-exterior.jpg' },
    
    // Classe Musica
    { name: 'MSC Magnifica', slug: 'msc-magnifica', yearBuilt: 2010, passengerCapacity: 3223, crewCapacity: 1013, tonnage: 95128, length: 294, imageUrl: 'https://www.msccruises.com/~/media/Ships/Magnifica/msc-magnifica-exterior.jpg' },
    { name: 'MSC Poesia', slug: 'msc-poesia', yearBuilt: 2008, passengerCapacity: 3223, crewCapacity: 1013, tonnage: 93330, length: 294, imageUrl: 'https://www.msccruises.com/~/media/Ships/Poesia/msc-poesia-exterior.jpg' },
    { name: 'MSC Orchestra', slug: 'msc-orchestra', yearBuilt: 2007, passengerCapacity: 3223, crewCapacity: 1013, tonnage: 92409, length: 294, imageUrl: 'https://www.msccruises.com/~/media/Ships/Orchestra/msc-orchestra-exterior.jpg' },
    { name: 'MSC Musica', slug: 'msc-musica', yearBuilt: 2006, passengerCapacity: 3223, crewCapacity: 1013, tonnage: 92409, length: 294, imageUrl: 'https://www.msccruises.com/~/media/Ships/Musica/msc-musica-exterior.jpg' },
    
    // Outros
    { name: 'MSC Armonia', slug: 'msc-armonia', yearBuilt: 2001, passengerCapacity: 2679, crewCapacity: 987, tonnage: 65542, length: 275, imageUrl: 'https://www.msccruises.com/~/media/Ships/Armonia/msc-armonia-exterior.jpg' },
    { name: 'MSC Opera', slug: 'msc-opera', yearBuilt: 2004, passengerCapacity: 2679, crewCapacity: 1013, tonnage: 65591, length: 275, imageUrl: 'https://www.msccruises.com/~/media/Ships/Opera/msc-opera-exterior.jpg' },
    { name: 'MSC Lirica', slug: 'msc-lirica', yearBuilt: 2003, passengerCapacity: 2679, crewCapacity: 1013, tonnage: 65542, length: 275, imageUrl: 'https://www.msccruises.com/~/media/Ships/Lirica/msc-lirica-exterior.jpg' },
  ],

  'princess': [
    // Classe Royal
    { name: 'Discovery Princess', slug: 'discovery-princess', yearBuilt: 2022, passengerCapacity: 3660, crewCapacity: 1346, tonnage: 145281, length: 330, imageUrl: 'https://www.princess.com/ships-and-experience/ships/di-discovery-princess/images/hero.jpg' },
    { name: 'Enchanted Princess', slug: 'enchanted-princess', yearBuilt: 2020, passengerCapacity: 3660, crewCapacity: 1346, tonnage: 145281, length: 330, imageUrl: 'https://www.princess.com/ships-and-experience/ships/en-enchanted-princess/images/hero.jpg' },
    { name: 'Sky Princess', slug: 'sky-princess', yearBuilt: 2019, passengerCapacity: 3660, crewCapacity: 1346, tonnage: 143700, length: 330, imageUrl: 'https://www.princess.com/ships-and-experience/ships/sk-sky-princess/images/hero.jpg' },
    { name: 'Majestic Princess', slug: 'majestic-princess', yearBuilt: 2017, passengerCapacity: 3560, crewCapacity: 1346, tonnage: 143700, length: 330, imageUrl: 'https://www.princess.com/ships-and-experience/ships/mj-majestic-princess/images/hero.jpg' },
    { name: 'Regal Princess', slug: 'regal-princess', yearBuilt: 2014, passengerCapacity: 3560, crewCapacity: 1346, tonnage: 141000, length: 330, imageUrl: 'https://www.princess.com/ships-and-experience/ships/rg-regal-princess/images/hero.jpg' },
    { name: 'Royal Princess', slug: 'royal-princess', yearBuilt: 2013, passengerCapacity: 3560, crewCapacity: 1346, tonnage: 141000, length: 330, imageUrl: 'https://www.princess.com/ships-and-experience/ships/ry-royal-princess/images/hero.jpg' },
    
    // Classe Grand
    { name: 'Caribbean Princess', slug: 'caribbean-princess', yearBuilt: 2004, passengerCapacity: 3142, crewCapacity: 1200, tonnage: 113000, length: 290, imageUrl: 'https://www.princess.com/ships-and-experience/ships/ca-caribbean-princess/images/hero.jpg' },
    { name: 'Crown Princess', slug: 'crown-princess', yearBuilt: 2006, passengerCapacity: 3080, crewCapacity: 1200, tonnage: 113561, length: 290, imageUrl: 'https://www.princess.com/ships-and-experience/ships/cr-crown-princess/images/hero.jpg' },
    { name: 'Emerald Princess', slug: 'emerald-princess', yearBuilt: 2007, passengerCapacity: 3080, crewCapacity: 1200, tonnage: 113561, length: 290, imageUrl: 'https://www.princess.com/ships-and-experience/ships/em-emerald-princess/images/hero.jpg' },
    { name: 'Ruby Princess', slug: 'ruby-princess', yearBuilt: 2008, passengerCapacity: 3080, crewCapacity: 1200, tonnage: 113561, length: 290, imageUrl: 'https://www.princess.com/ships-and-experience/ships/ru-ruby-princess/images/hero.jpg' },
    
    // Outros
    { name: 'Sapphire Princess', slug: 'sapphire-princess', yearBuilt: 2004, passengerCapacity: 2670, crewCapacity: 1100, tonnage: 116000, length: 290, imageUrl: 'https://www.princess.com/ships-and-experience/ships/sa-sapphire-princess/images/hero.jpg' },
    { name: 'Diamond Princess', slug: 'diamond-princess', yearBuilt: 2004, passengerCapacity: 2706, crewCapacity: 1100, tonnage: 115906, length: 290, imageUrl: 'https://www.princess.com/ships-and-experience/ships/di-diamond-princess/images/hero.jpg' },
    { name: 'Grand Princess', slug: 'grand-princess', yearBuilt: 1998, passengerCapacity: 2600, crewCapacity: 1150, tonnage: 107517, length: 290, imageUrl: 'https://www.princess.com/ships-and-experience/ships/gr-grand-princess/images/hero.jpg' },
    { name: 'Island Princess', slug: 'island-princess', yearBuilt: 2003, passengerCapacity: 2200, crewCapacity: 900, tonnage: 92627, length: 294, imageUrl: 'https://www.princess.com/ships-and-experience/ships/is-island-princess/images/hero.jpg' },
    { name: 'Coral Princess', slug: 'coral-princess', yearBuilt: 2003, passengerCapacity: 2000, crewCapacity: 900, tonnage: 91627, length: 294, imageUrl: 'https://www.princess.com/ships-and-experience/ships/co-coral-princess/images/hero.jpg' },
  ],

  'celebrity': [
    // Classe Edge
    { name: 'Celebrity Beyond', slug: 'celebrity-beyond', yearBuilt: 2022, passengerCapacity: 3260, crewCapacity: 1400, tonnage: 140600, length: 327, imageUrl: 'https://www.celebritycruises.com/content/dam/celebrity/ships/beyond/beyond-exterior.jpg' },
    { name: 'Celebrity Apex', slug: 'celebrity-apex', yearBuilt: 2020, passengerCapacity: 2918, crewCapacity: 1320, tonnage: 129500, length: 306, imageUrl: 'https://www.celebritycruises.com/content/dam/celebrity/ships/apex/apex-exterior.jpg' },
    { name: 'Celebrity Edge', slug: 'celebrity-edge', yearBuilt: 2018, passengerCapacity: 2918, crewCapacity: 1320, tonnage: 129500, length: 306, imageUrl: 'https://www.celebritycruises.com/content/dam/celebrity/ships/edge/edge-exterior.jpg' },
    
    // Classe Solstice
    { name: 'Celebrity Reflection', slug: 'celebrity-reflection', yearBuilt: 2012, passengerCapacity: 3046, crewCapacity: 1271, tonnage: 126000, length: 319, imageUrl: 'https://www.celebritycruises.com/content/dam/celebrity/ships/reflection/reflection-exterior.jpg' },
    { name: 'Celebrity Silhouette', slug: 'celebrity-silhouette', yearBuilt: 2011, passengerCapacity: 2886, crewCapacity: 1271, tonnage: 122400, length: 319, imageUrl: 'https://www.celebritycruises.com/content/dam/celebrity/ships/silhouette/silhouette-exterior.jpg' },
    { name: 'Celebrity Eclipse', slug: 'celebrity-eclipse', yearBuilt: 2010, passengerCapacity: 2852, crewCapacity: 1271, tonnage: 122400, length: 317, imageUrl: 'https://www.celebritycruises.com/content/dam/celebrity/ships/eclipse/eclipse-exterior.jpg' },
    { name: 'Celebrity Equinox', slug: 'celebrity-equinox', yearBuilt: 2009, passengerCapacity: 2850, crewCapacity: 1271, tonnage: 122000, length: 317, imageUrl: 'https://www.celebritycruises.com/content/dam/celebrity/ships/equinox/equinox-exterior.jpg' },
    { name: 'Celebrity Solstice', slug: 'celebrity-solstice', yearBuilt: 2008, passengerCapacity: 2850, crewCapacity: 1271, tonnage: 122000, length: 317, imageUrl: 'https://www.celebritycruises.com/content/dam/celebrity/ships/solstice/solstice-exterior.jpg' },
    
    // Classe Millennium
    { name: 'Celebrity Constellation', slug: 'celebrity-constellation', yearBuilt: 2002, passengerCapacity: 2170, crewCapacity: 999, tonnage: 91000, length: 294, imageUrl: 'https://www.celebritycruises.com/content/dam/celebrity/ships/constellation/constellation-exterior.jpg' },
    { name: 'Celebrity Summit', slug: 'celebrity-summit', yearBuilt: 2001, passengerCapacity: 2158, crewCapacity: 999, tonnage: 91000, length: 294, imageUrl: 'https://www.celebritycruises.com/content/dam/celebrity/ships/summit/summit-exterior.jpg' },
    { name: 'Celebrity Infinity', slug: 'celebrity-infinity', yearBuilt: 2001, passengerCapacity: 2170, crewCapacity: 999, tonnage: 91000, length: 294, imageUrl: 'https://www.celebritycruises.com/content/dam/celebrity/ships/infinity/infinity-exterior.jpg' },
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
    { name: 'Brilliant Lady', slug: 'brilliant-lady', yearBuilt: 2025, passengerCapacity: 2762, crewCapacity: 1160, tonnage: 110000, length: 278, imageUrl: 'https://www.virginvoyages.com/content/dam/virgin/ships/brilliant-lady-exterior.jpg' },
    { name: 'Resilient Lady', slug: 'resilient-lady', yearBuilt: 2023, passengerCapacity: 2770, crewCapacity: 1160, tonnage: 110000, length: 278, imageUrl: 'https://www.virginvoyages.com/content/dam/virgin/ships/resilient-lady-exterior.jpg' },
    { name: 'Valiant Lady', slug: 'valiant-lady', yearBuilt: 2021, passengerCapacity: 2770, crewCapacity: 1160, tonnage: 110000, length: 278, imageUrl: 'https://www.virginvoyages.com/content/dam/virgin/ships/valiant-lady-exterior.jpg' },
    { name: 'Scarlet Lady', slug: 'scarlet-lady', yearBuilt: 2020, passengerCapacity: 2770, crewCapacity: 1160, tonnage: 110000, length: 278, imageUrl: 'https://www.virginvoyages.com/content/dam/virgin/ships/scarlet-lady-exterior.jpg' },
  ],
};

async function seedAllShips() {
  console.log('🚢 Iniciando população de TODOS os navios...\n');
  
  let totalShips = 0;
  let successCount = 0;
  let errorCount = 0;
  
  for (const [companySlug, shipsList] of Object.entries(allShipsData)) {
    console.log(`\n📋 Processando: ${companySlug}`);
    console.log(`   Total de navios: ${shipsList.length}`);
    
    // Buscar companhia
    const [company] = await db.select().from(companies).where(eq(companies.slug, companySlug)).limit(1);
    
    if (!company) {
      console.log(`   ⚠️  Companhia não encontrada: ${companySlug}`);
      errorCount += shipsList.length;
      continue;
    }
    
    // Inserir cada navio
    for (const shipData of shipsList) {
      try {
        // Verificar se já existe
        const [existing] = await db.select().from(ships).where(eq(ships.slug, shipData.slug)).limit(1);
        
        if (existing) {
          // Atualizar
          await db.update(ships)
            .set({
              name: shipData.name,
              imageUrl: shipData.imageUrl,
              yearBuilt: shipData.yearBuilt,
              passengerCapacity: shipData.passengerCapacity,
              crewCapacity: shipData.crewCapacity,
              tonnage: shipData.tonnage,
              length: shipData.length?.toString(),
            })
            .where(eq(ships.id, existing.id));
          
          console.log(`   ♻️  Atualizado: ${shipData.name}`);
        } else {
          // Criar novo
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
        totalShips++;
      } catch (error) {
        console.error(`   ❌ Erro em ${shipData.name}:`, error.message);
        errorCount++;
      }
    }
  }
  
  console.log(`\n\n📊 ========================================`);
  console.log(`   RESUMO FINAL`);
  console.log(`========================================`);
  console.log(`   ✅ Sucesso: ${successCount}`);
  console.log(`   ❌ Erros: ${errorCount}`);
  console.log(`   📦 Total processado: ${totalShips}`);
  console.log(`========================================\n`);
  
  // Estatísticas por companhia
  console.log(`📈 Estatísticas por Companhia:\n`);
  for (const [companySlug, shipsList] of Object.entries(allShipsData)) {
    console.log(`   ${companySlug}: ${shipsList.length} navios`);
  }
  
  console.log('\n✨ Processo concluído!\n');
  process.exit(0);
}

seedAllShips().catch((error) => {
  console.error('💥 Erro fatal:', error);
  process.exit(1);
});
