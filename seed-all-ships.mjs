import { drizzle } from "drizzle-orm/mysql2";
import { ships } from "./drizzle/schema.js";

const db = drizzle(process.env.DATABASE_URL);

// Complete fleet of all major cruise lines (as of 2024-2026)
const allShips = [
  // ROYAL CARIBBEAN INTERNATIONAL (26 navios)
  { companyId: 1, name: "Icon of the Seas", slug: "icon-of-the-seas", yearBuilt: 2024, passengerCapacity: 7600, tonnage: 250800, length: "365.00", description: "O maior navio de cruzeiro já construído." },
  { companyId: 1, name: "Wonder of the Seas", slug: "wonder-of-the-seas-new", yearBuilt: 2022, passengerCapacity: 6988, tonnage: 236857, length: "362.00", description: "Maior navio da classe Oasis." },
  { companyId: 1, name: "Symphony of the Seas", slug: "symphony-of-the-seas-new", yearBuilt: 2018, passengerCapacity: 6680, tonnage: 228081, length: "361.00", description: "Inovação e entretenimento de classe mundial." },
  { companyId: 1, name: "Harmony of the Seas", slug: "harmony-of-the-seas-new", yearBuilt: 2016, passengerCapacity: 6687, tonnage: 226963, length: "362.00", description: "Experiências inesquecíveis a bordo." },
  { companyId: 1, name: "Allure of the Seas", slug: "allure-of-the-seas-new", yearBuilt: 2010, passengerCapacity: 5400, tonnage: 225282, length: "360.00", description: "Irmão do Oasis com experiências incríveis." },
  { companyId: 1, name: "Oasis of the Seas", slug: "oasis-of-the-seas-new", yearBuilt: 2009, passengerCapacity: 5400, tonnage: 225282, length: "360.00", description: "Revolucionou a indústria de cruzeiros." },
  { companyId: 1, name: "Quantum of the Seas", slug: "quantum-of-the-seas", yearBuilt: 2014, passengerCapacity: 4180, tonnage: 168666, length: "348.00", description: "Tecnologia de ponta e inovação." },
  { companyId: 1, name: "Anthem of the Seas", slug: "anthem-of-the-seas", yearBuilt: 2015, passengerCapacity: 4180, tonnage: 168666, length: "348.00", description: "Aventuras high-tech no mar." },
  { companyId: 1, name: "Ovation of the Seas", slug: "ovation-of-the-seas", yearBuilt: 2016, passengerCapacity: 4180, tonnage: 168666, length: "348.00", description: "Experiência Quantum no Pacífico." },
  { companyId: 1, name: "Spectrum of the Seas", slug: "spectrum-of-the-seas", yearBuilt: 2019, passengerCapacity: 4246, tonnage: 169379, length: "347.00", description: "Quantum Ultra para mercado asiático." },
  { companyId: 1, name: "Odyssey of the Seas", slug: "odyssey-of-the-seas", yearBuilt: 2021, passengerCapacity: 4198, tonnage: 169300, length: "347.00", description: "Mais novo da classe Quantum Ultra." },
  { companyId: 1, name: "Freedom of the Seas", slug: "freedom-of-the-seas", yearBuilt: 2006, passengerCapacity: 3634, tonnage: 154407, length: "339.00", description: "Liberdade e diversão a bordo." },
  { companyId: 1, name: "Liberty of the Seas", slug: "liberty-of-the-seas", yearBuilt: 2007, passengerCapacity: 3634, tonnage: 154407, length: "339.00", description: "Aventura sem limites." },
  { companyId: 1, name: "Independence of the Seas", slug: "independence-of-the-seas", yearBuilt: 2008, passengerCapacity: 3634, tonnage: 154407, length: "339.00", description: "Independência e estilo." },
  { companyId: 1, name: "Navigator of the Seas", slug: "navigator-of-the-seas", yearBuilt: 2002, passengerCapacity: 3386, tonnage: 138279, length: "311.00", description: "Navegação com estilo Voyager." },
  { companyId: 1, name: "Mariner of the Seas", slug: "mariner-of-the-seas", yearBuilt: 2003, passengerCapacity: 3386, tonnage: 138279, length: "311.00", description: "Marinheiro dos sete mares." },
  { companyId: 1, name: "Explorer of the Seas", slug: "explorer-of-the-seas", yearBuilt: 2000, passengerCapacity: 3286, tonnage: 137308, length: "311.00", description: "Explore o mundo com conforto." },
  { companyId: 1, name: "Adventure of the Seas", slug: "adventure-of-the-seas", yearBuilt: 2001, passengerCapacity: 3286, tonnage: 137276, length: "311.00", description: "Aventura a cada porto." },
  { companyId: 1, name: "Voyager of the Seas", slug: "voyager-of-the-seas", yearBuilt: 1999, passengerCapacity: 3286, tonnage: 137276, length: "311.00", description: "Primeiro da revolucionária classe Voyager." },
  { companyId: 1, name: "Brilliance of the Seas", slug: "brilliance-of-the-seas", yearBuilt: 2002, passengerCapacity: 2142, tonnage: 90090, length: "293.00", description: "Brilho e elegância." },
  { companyId: 1, name: "Serenade of the Seas", slug: "serenade-of-the-seas", yearBuilt: 2003, passengerCapacity: 2142, tonnage: 90090, length: "293.00", description: "Serenata ao mar." },
  { companyId: 1, name: "Jewel of the Seas", slug: "jewel-of-the-seas", yearBuilt: 2004, passengerCapacity: 2142, tonnage: 90090, length: "293.00", description: "Joia dos oceanos." },
  { companyId: 1, name: "Radiance of the Seas", slug: "radiance-of-the-seas", yearBuilt: 2001, passengerCapacity: 2142, tonnage: 90090, length: "293.00", description: "Radiância e sofisticação." },
  { companyId: 1, name: "Vision of the Seas", slug: "vision-of-the-seas", yearBuilt: 1998, passengerCapacity: 2000, tonnage: 78491, length: "279.00", description: "Visão de futuro." },
  { companyId: 1, name: "Enchantment of the Seas", slug: "enchantment-of-the-seas", yearBuilt: 1997, passengerCapacity: 2252, tonnage: 82910, length: "301.00", description: "Encanto clássico." },
  { companyId: 1, name: "Grandeur of the Seas", slug: "grandeur-of-the-seas", yearBuilt: 1996, passengerCapacity: 1992, tonnage: 73817, length: "279.00", description: "Grandeza atemporal." },

  // CARNIVAL CRUISE LINE (24 navios)
  { companyId: 2, name: "Carnival Celebration", slug: "carnival-celebration-new", yearBuilt: 2022, passengerCapacity: 5374, tonnage: 183900, length: "344.00", description: "Celebração com BOLT rollercoaster." },
  { companyId: 2, name: "Carnival Mardi Gras", slug: "carnival-mardi-gras-new", yearBuilt: 2021, passengerCapacity: 5282, tonnage: 180800, length: "340.00", description: "Primeiro navio Carnival a GNL." },
  { companyId: 2, name: "Carnival Panorama", slug: "carnival-panorama-new", yearBuilt: 2019, passengerCapacity: 3954, tonnage: 133500, length: "323.00", description: "Vista panorâmica do Pacífico." },
  { companyId: 2, name: "Carnival Horizon", slug: "carnival-horizon-new", yearBuilt: 2018, passengerCapacity: 3960, tonnage: 133500, length: "323.00", description: "Horizonte de diversão." },
  { companyId: 2, name: "Carnival Vista", slug: "carnival-vista-new", yearBuilt: 2016, passengerCapacity: 3934, tonnage: 133500, length: "323.00", description: "Vista espetacular." },
  { companyId: 2, name: "Carnival Breeze", slug: "carnival-breeze", yearBuilt: 2012, passengerCapacity: 3690, tonnage: 130000, length: "306.00", description: "Brisa refrescante." },
  { companyId: 2, name: "Carnival Magic", slug: "carnival-magic", yearBuilt: 2011, passengerCapacity: 3690, tonnage: 130000, length: "306.00", description: "Magia a bordo." },
  { companyId: 2, name: "Carnival Dream", slug: "carnival-dream-new", yearBuilt: 2009, passengerCapacity: 3646, tonnage: 130000, length: "306.00", description: "Sonho realizado." },
  { companyId: 2, name: "Carnival Splendor", slug: "carnival-splendor", yearBuilt: 2008, passengerCapacity: 3006, tonnage: 113300, length: "290.00", description: "Esplendor e conforto." },
  { companyId: 2, name: "Carnival Freedom", slug: "carnival-freedom", yearBuilt: 2007, passengerCapacity: 2974, tonnage: 110239, length: "290.00", description: "Liberdade total." },
  { companyId: 2, name: "Carnival Liberty", slug: "carnival-liberty", yearBuilt: 2005, passengerCapacity: 2974, tonnage: 110239, length: "290.00", description: "Liberdade de escolha." },
  { companyId: 2, name: "Carnival Valor", slug: "carnival-valor", yearBuilt: 2004, passengerCapacity: 2974, tonnage: 110239, length: "290.00", description: "Valor e coragem." },
  { companyId: 2, name: "Carnival Glory", slug: "carnival-glory", yearBuilt: 2003, passengerCapacity: 2974, tonnage: 110239, length: "290.00", description: "Glória nos mares." },
  { companyId: 2, name: "Carnival Conquest", slug: "carnival-conquest", yearBuilt: 2002, passengerCapacity: 2974, tonnage: 110239, length: "290.00", description: "Conquista dos oceanos." },
  { companyId: 2, name: "Carnival Pride", slug: "carnival-pride", yearBuilt: 2002, passengerCapacity: 2124, tonnage: 88500, length: "294.00", description: "Orgulho Carnival." },
  { companyId: 2, name: "Carnival Legend", slug: "carnival-legend", yearBuilt: 2002, passengerCapacity: 2124, tonnage: 88500, length: "294.00", description: "Lenda viva." },
  { companyId: 2, name: "Carnival Spirit", slug: "carnival-spirit", yearBuilt: 2001, passengerCapacity: 2124, tonnage: 88500, length: "294.00", description: "Espírito aventureiro." },
  { companyId: 2, name: "Carnival Miracle", slug: "carnival-miracle", yearBuilt: 2004, passengerCapacity: 2124, tonnage: 88500, length: "294.00", description: "Milagre flutuante." },
  { companyId: 2, name: "Carnival Sunrise", slug: "carnival-sunrise", yearBuilt: 1999, passengerCapacity: 2984, tonnage: 101509, length: "261.00", description: "Nascer do sol no mar." },
  { companyId: 2, name: "Carnival Sunshine", slug: "carnival-sunshine", yearBuilt: 1996, passengerCapacity: 3002, tonnage: 102853, length: "262.00", description: "Sol brilhante." },
  { companyId: 2, name: "Carnival Elation", slug: "carnival-elation", yearBuilt: 1998, passengerCapacity: 2052, tonnage: 70367, length: "260.00", description: "Euforia a bordo." },
  { companyId: 2, name: "Carnival Paradise", slug: "carnival-paradise", yearBuilt: 1998, passengerCapacity: 2052, tonnage: 70367, length: "260.00", description: "Paraíso flutuante." },
  { companyId: 2, name: "Carnival Ecstasy", slug: "carnival-ecstasy", yearBuilt: 1991, passengerCapacity: 2052, tonnage: 70367, length: "260.00", description: "Êxtase no mar." },
  { companyId: 2, name: "Carnival Sensation", slug: "carnival-sensation", yearBuilt: 1993, passengerCapacity: 2052, tonnage: 70367, length: "260.00", description: "Sensação única." },

  // MSC CRUISES (22 navios)
  { companyId: 3, name: "MSC World Europa", slug: "msc-world-europa-new", yearBuilt: 2022, passengerCapacity: 6762, tonnage: 215863, length: "333.00", description: "Primeiro World Class a GNL." },
  { companyId: 3, name: "MSC Virtuosa", slug: "msc-virtuosa-new", yearBuilt: 2021, passengerCapacity: 4842, tonnage: 181541, length: "331.00", description: "Virtuosa em todos os sentidos." },
  { companyId: 3, name: "MSC Seashore", slug: "msc-seashore", yearBuilt: 2021, passengerCapacity: 4540, tonnage: 169400, length: "339.00", description: "Costa do mar." },
  { companyId: 3, name: "MSC Grandiosa", slug: "msc-grandiosa", yearBuilt: 2019, passengerCapacity: 4842, tonnage: 181541, length: "331.00", description: "Grandiosidade italiana." },
  { companyId: 3, name: "MSC Bellissima", slug: "msc-bellissima-new", yearBuilt: 2019, passengerCapacity: 4500, tonnage: 171598, length: "315.00", description: "Bellissima com Cirque du Soleil." },
  { companyId: 3, name: "MSC Seaview", slug: "msc-seaview", yearBuilt: 2018, passengerCapacity: 4140, tonnage: 153516, length: "323.00", description: "Vista para o mar." },
  { companyId: 3, name: "MSC Seaside", slug: "msc-seaside-new", yearBuilt: 2017, passengerCapacity: 4140, tonnage: 153516, length: "323.00", description: "Ao lado do mar." },
  { companyId: 3, name: "MSC Meraviglia", slug: "msc-meraviglia-new", yearBuilt: 2017, passengerCapacity: 4488, tonnage: 171598, length: "315.00", description: "Maravilha dos mares." },
  { companyId: 3, name: "MSC Preziosa", slug: "msc-preziosa", yearBuilt: 2013, passengerCapacity: 3502, tonnage: 139400, length: "333.00", description: "Preciosa joia." },
  { companyId: 3, name: "MSC Divina", slug: "msc-divina", yearBuilt: 2012, passengerCapacity: 3502, tonnage: 139400, length: "333.00", description: "Divina experiência." },
  { companyId: 3, name: "MSC Splendida", slug: "msc-splendida", yearBuilt: 2009, passengerCapacity: 3274, tonnage: 137936, length: "333.00", description: "Esplêndida viagem." },
  { companyId: 3, name: "MSC Magnifica", slug: "msc-magnifica", yearBuilt: 2010, passengerCapacity: 2518, tonnage: 95128, length: "294.00", description: "Magnífica aventura." },
  { companyId: 3, name: "MSC Poesia", slug: "msc-poesia", yearBuilt: 2008, passengerCapacity: 2550, tonnage: 92627, length: "294.00", description: "Poesia em movimento." },
  { companyId: 3, name: "MSC Orchestra", slug: "msc-orchestra", yearBuilt: 2007, passengerCapacity: 2550, tonnage: 92409, length: "294.00", description: "Orquestra sinfônica." },
  { companyId: 3, name: "MSC Musica", slug: "msc-musica", yearBuilt: 2006, passengerCapacity: 2550, tonnage: 92409, length: "294.00", description: "Música para os ouvidos." },
  { companyId: 3, name: "MSC Fantasia", slug: "msc-fantasia", yearBuilt: 2008, passengerCapacity: 3274, tonnage: 137936, length: "333.00", description: "Fantasia realizada." },
  { companyId: 3, name: "MSC Sinfonia", slug: "msc-sinfonia", yearBuilt: 2005, passengerCapacity: 1950, tonnage: 65542, length: "251.00", description: "Sinfonia perfeita." },
  { companyId: 3, name: "MSC Armonia", slug: "msc-armonia", yearBuilt: 2004, passengerCapacity: 1950, tonnage: 65542, length: "251.00", description: "Harmonia total." },
  { companyId: 3, name: "MSC Lirica", slug: "msc-lirica", yearBuilt: 2003, passengerCapacity: 1984, tonnage: 65591, length: "251.00", description: "Lírica e elegante." },
  { companyId: 3, name: "MSC Opera", slug: "msc-opera", yearBuilt: 2004, passengerCapacity: 1712, tonnage: 65591, length: "251.00", description: "Ópera nos mares." },
  { companyId: 3, name: "MSC Euribia", slug: "msc-euribia", yearBuilt: 2023, passengerCapacity: 4842, tonnage: 184011, length: "331.00", description: "Deusa dos mares." },
  { companyId: 3, name: "MSC Seascape", slug: "msc-seascape", yearBuilt: 2022, passengerCapacity: 4540, tonnage: 169400, length: "339.00", description: "Paisagem marítima." },

  // NORWEGIAN CRUISE LINE (18 navios)
  { companyId: 4, name: "Norwegian Prima", slug: "norwegian-prima-new", yearBuilt: 2022, passengerCapacity: 3215, tonnage: 142500, length: "294.00", description: "Prima classe inovadora." },
  { companyId: 4, name: "Norwegian Viva", slug: "norwegian-viva", yearBuilt: 2023, passengerCapacity: 3219, tonnage: 142500, length: "294.00", description: "Viva a vida." },
  { companyId: 4, name: "Norwegian Encore", slug: "norwegian-encore-new", yearBuilt: 2019, passengerCapacity: 3998, tonnage: 169116, length: "333.00", description: "Encore espetacular." },
  { companyId: 4, name: "Norwegian Bliss", slug: "norwegian-bliss-new", yearBuilt: 2018, passengerCapacity: 4004, tonnage: 168028, length: "333.00", description: "Felicidade no Alasca." },
  { companyId: 4, name: "Norwegian Joy", slug: "norwegian-joy-new", yearBuilt: 2017, passengerCapacity: 3804, tonnage: 167725, length: "333.00", description: "Alegria a bordo." },
  { companyId: 4, name: "Norwegian Escape", slug: "norwegian-escape-new", yearBuilt: 2015, passengerCapacity: 4266, tonnage: 164600, length: "325.00", description: "Escape perfeito." },
  { companyId: 4, name: "Norwegian Getaway", slug: "norwegian-getaway", yearBuilt: 2014, passengerCapacity: 3963, tonnage: 145655, length: "325.00", description: "Fuga ideal." },
  { companyId: 4, name: "Norwegian Breakaway", slug: "norwegian-breakaway", yearBuilt: 2013, passengerCapacity: 3963, tonnage: 145655, length: "325.00", description: "Rompendo barreiras." },
  { companyId: 4, name: "Norwegian Epic", slug: "norwegian-epic", yearBuilt: 2010, passengerCapacity: 4100, tonnage: 155873, length: "329.00", description: "Épico em todos os sentidos." },
  { companyId: 4, name: "Norwegian Gem", slug: "norwegian-gem", yearBuilt: 2007, passengerCapacity: 2394, tonnage: 93530, length: "294.00", description: "Gema preciosa." },
  { companyId: 4, name: "Norwegian Jade", slug: "norwegian-jade", yearBuilt: 2006, passengerCapacity: 2402, tonnage: 93558, length: "294.00", description: "Jade refinado." },
  { companyId: 4, name: "Norwegian Pearl", slug: "norwegian-pearl", yearBuilt: 2006, passengerCapacity: 2394, tonnage: 93530, length: "294.00", description: "Pérola dos oceanos." },
  { companyId: 4, name: "Norwegian Jewel", slug: "norwegian-jewel", yearBuilt: 2005, passengerCapacity: 2376, tonnage: 93502, length: "294.00", description: "Joia rara." },
  { companyId: 4, name: "Norwegian Star", slug: "norwegian-star", yearBuilt: 2001, passengerCapacity: 2348, tonnage: 91740, length: "294.00", description: "Estrela brilhante." },
  { companyId: 4, name: "Norwegian Dawn", slug: "norwegian-dawn", yearBuilt: 2002, passengerCapacity: 2340, tonnage: 92250, length: "294.00", description: "Amanhecer no mar." },
  { companyId: 4, name: "Norwegian Sun", slug: "norwegian-sun", yearBuilt: 2001, passengerCapacity: 1936, tonnage: 78309, length: "258.00", description: "Sol radiante." },
  { companyId: 4, name: "Norwegian Sky", slug: "norwegian-sky", yearBuilt: 1999, passengerCapacity: 2004, tonnage: 77104, length: "258.00", description: "Céu azul." },
  { companyId: 4, name: "Norwegian Spirit", slug: "norwegian-spirit", yearBuilt: 1998, passengerCapacity: 2018, tonnage: 75904, length: "268.00", description: "Espírito livre." },

  // DISNEY CRUISE LINE (5 navios)
  { companyId: 5, name: "Disney Wish", slug: "disney-wish-new", yearBuilt: 2022, passengerCapacity: 4000, tonnage: 144000, length: "340.00", description: "Realize seus desejos Disney." },
  { companyId: 5, name: "Disney Fantasy", slug: "disney-fantasy-new", yearBuilt: 2012, passengerCapacity: 4000, tonnage: 129690, length: "339.00", description: "Fantasia mágica." },
  { companyId: 5, name: "Disney Dream", slug: "disney-dream-new", yearBuilt: 2011, passengerCapacity: 4000, tonnage: 129690, length: "339.00", description: "Sonho Disney." },
  { companyId: 5, name: "Disney Wonder", slug: "disney-wonder", yearBuilt: 1999, passengerCapacity: 2700, tonnage: 83338, length: "294.00", description: "Maravilha Disney." },
  { companyId: 5, name: "Disney Magic", slug: "disney-magic-new", yearBuilt: 1998, passengerCapacity: 2700, tonnage: 83338, length: "294.00", description: "Magia Disney clássica." },

  // CELEBRITY CRUISES (15 navios)
  { companyId: 6, name: "Celebrity Beyond", slug: "celebrity-beyond-new", yearBuilt: 2022, passengerCapacity: 3260, tonnage: 140600, length: "327.00", description: "Além das expectativas." },
  { companyId: 6, name: "Celebrity Apex", slug: "celebrity-apex-new", yearBuilt: 2020, passengerCapacity: 2918, tonnage: 130818, length: "306.00", description: "Ápice do luxo." },
  { companyId: 6, name: "Celebrity Edge", slug: "celebrity-edge-new", yearBuilt: 2018, passengerCapacity: 2918, tonnage: 130818, length: "306.00", description: "Na vanguarda." },
  { companyId: 6, name: "Celebrity Reflection", slug: "celebrity-reflection", yearBuilt: 2012, passengerCapacity: 3046, tonnage: 126000, length: "319.00", description: "Reflexão perfeita." },
  { companyId: 6, name: "Celebrity Silhouette", slug: "celebrity-silhouette", yearBuilt: 2011, passengerCapacity: 2886, tonnage: 122000, length: "315.00", description: "Silhueta elegante." },
  { companyId: 6, name: "Celebrity Eclipse", slug: "celebrity-eclipse", yearBuilt: 2010, passengerCapacity: 2850, tonnage: 122000, length: "315.00", description: "Eclipse total." },
  { companyId: 6, name: "Celebrity Equinox", slug: "celebrity-equinox-new", yearBuilt: 2009, passengerCapacity: 2850, tonnage: 122000, length: "315.00", description: "Equinócio perfeito." },
  { companyId: 6, name: "Celebrity Solstice", slug: "celebrity-solstice", yearBuilt: 2008, passengerCapacity: 2850, tonnage: 122000, length: "315.00", description: "Solstício brilhante." },
  { companyId: 6, name: "Celebrity Constellation", slug: "celebrity-constellation", yearBuilt: 2002, passengerCapacity: 2170, tonnage: 91000, length: "294.00", description: "Constelação de estrelas." },
  { companyId: 6, name: "Celebrity Summit", slug: "celebrity-summit", yearBuilt: 2001, passengerCapacity: 2158, tonnage: 91000, length: "294.00", description: "Cume do luxo." },
  { companyId: 6, name: "Celebrity Infinity", slug: "celebrity-infinity", yearBuilt: 2001, passengerCapacity: 2170, tonnage: 91000, length: "294.00", description: "Infinitas possibilidades." },
  { companyId: 6, name: "Celebrity Millennium", slug: "celebrity-millennium-new", yearBuilt: 2000, passengerCapacity: 2218, tonnage: 91000, length: "294.00", description: "Milênio de luxo." },
  { companyId: 6, name: "Celebrity Ascent", slug: "celebrity-ascent", yearBuilt: 2023, passengerCapacity: 3260, tonnage: 140600, length: "327.00", description: "Ascensão ao topo." },
  { companyId: 6, name: "Celebrity Flora", slug: "celebrity-flora", yearBuilt: 2019, passengerCapacity: 100, tonnage: 5739, length: "100.00", description: "Expedição Galápagos." },
  { companyId: 6, name: "Celebrity Xpedition", slug: "celebrity-xpedition", yearBuilt: 2001, passengerCapacity: 48, tonnage: 2842, length: "90.00", description: "Expedição íntima." },
];

async function seedAllShips() {
  console.log("Starting complete fleet seeding...");
  console.log(`Total ships to add: ${allShips.length}`);
  
  let successCount = 0;
  let skipCount = 0;
  
  for (const ship of allShips) {
    try {
      await db.insert(ships).values(ship);
      console.log(`✓ Added: ${ship.name}`);
      successCount++;
    } catch (error) {
      console.log(`✗ Skipped (already exists): ${ship.name}`);
      skipCount++;
    }
  }
  
  console.log(`\n=== Summary ===`);
  console.log(`Successfully added: ${successCount} ships`);
  console.log(`Skipped (duplicates): ${skipCount} ships`);
  console.log(`Total in database: ${successCount + skipCount} ships`);
  
  process.exit(0);
}

seedAllShips();
