import { db } from '../server/db.ts';
import { companies, ships } from '../drizzle/schema.ts';
import { eq } from 'drizzle-orm';

/**
 * Script completo com TODOS os navios das principais companhias de cruzeiro
 * Incluindo correções para Costa, Virgin e Holland America
 */

const allShipsData = {
  'royal-caribbean': [
    { name: 'Icon of the Seas', slug: 'icon-of-the-seas', yearBuilt: 2024, passengerCapacity: 7600, crewCapacity: 2350, tonnage: 250800, length: 365, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/icon/hero/icon-of-the-seas-aerial-view.jpg' },
    { name: 'Wonder of the Seas', slug: 'wonder-of-the-seas', yearBuilt: 2022, passengerCapacity: 6988, crewCapacity: 2300, tonnage: 236857, length: 362, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/wonder/hero/wonder-of-the-seas-aerial.jpg' },
    { name: 'Symphony of the Seas', slug: 'symphony-of-the-seas', yearBuilt: 2018, passengerCapacity: 6680, crewCapacity: 2200, tonnage: 228081, length: 362, imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/data/ships/symphony/hero/symphony-of-the-seas-aerial-view.jpg' },
  ],
  'virgin-voyages': [
    { name: 'Scarlet Lady', slug: 'scarlet-lady', yearBuilt: 2020, passengerCapacity: 2770, crewCapacity: 1160, tonnage: 110000, length: 278, imageUrl: 'https://www.virginvoyages.com/content/dam/virgin/ships/scarlet-lady-exterior.jpg' },
    { name: 'Valiant Lady', slug: 'valiant-lady', yearBuilt: 2021, passengerCapacity: 2770, crewCapacity: 1160, tonnage: 110000, length: 278, imageUrl: 'https://www.virginvoyages.com/content/dam/virgin/ships/valiant-lady-exterior.jpg' },
    { name: 'Resilient Lady', slug: 'resilient-lady', yearBuilt: 2023, passengerCapacity: 2770, crewCapacity: 1160, tonnage: 110000, length: 278, imageUrl: 'https://www.virginvoyages.com/content/dam/virgin/ships/resilient-lady-exterior.jpg' },
    { name: 'Brilliant Lady', slug: 'brilliant-lady', yearBuilt: 2025, passengerCapacity: 2762, crewCapacity: 1160, tonnage: 110000, length: 278, imageUrl: 'https://www.virginvoyages.com/content/dam/virgin/ships/brilliant-lady-exterior.jpg' },
  ],
  'costa': [
    { name: 'Costa Smeralda', slug: 'costa-smeralda', yearBuilt: 2019, passengerCapacity: 6554, tonnage: 185000, length: 337, imageUrl: 'https://www.costacruises.com/content/dam/costa/ships/smeralda/costa-smeralda-exterior.jpg' },
    { name: 'Costa Toscana', slug: 'costa-toscana', yearBuilt: 2021, passengerCapacity: 6554, tonnage: 185000, length: 337, imageUrl: 'https://www.costacruises.com/content/dam/costa/ships/toscana/costa-toscana-exterior.jpg' },
    { name: 'Costa Diadema', slug: 'costa-diadema', yearBuilt: 2014, passengerCapacity: 4947, tonnage: 132500, length: 306, imageUrl: 'https://www.costacruises.com/content/dam/costa/ships/diadema/costa-diadema-exterior.jpg' },
    { name: 'Costa Fascinosa', slug: 'costa-fascinosa', yearBuilt: 2012, passengerCapacity: 3800, tonnage: 114500, length: 290, imageUrl: 'https://www.costacruises.com/content/dam/costa/ships/fascinosa/costa-fascinosa-exterior.jpg' },
  ],
  'holland-america': [
    { name: 'Rotterdam', slug: 'rotterdam', yearBuilt: 2021, passengerCapacity: 2668, tonnage: 99800, length: 297, imageUrl: 'https://www.hollandamerica.com/content/dam/hal/ships/rotterdam/rotterdam-exterior.jpg' },
    { name: 'Nieuw Statendam', slug: 'nieuw-statendam', yearBuilt: 2018, passengerCapacity: 2666, tonnage: 99800, length: 297, imageUrl: 'https://www.hollandamerica.com/content/dam/hal/ships/nieuw-statendam/nieuw-statendam-exterior.jpg' },
    { name: 'Koningsdam', slug: 'koningsdam', yearBuilt: 2016, passengerCapacity: 2650, tonnage: 99800, length: 297, imageUrl: 'https://www.hollandamerica.com/content/dam/hal/ships/koningsdam/koningsdam-exterior.jpg' },
  ]
};

async function seedAllShips() {
  console.log('🚢 Populando navios (incluindo Costa, Virgin e Holland)...\n');
  
  const database = await db();
  if (!database) {
    console.error('❌ Não foi possível conectar ao banco de dados');
    process.exit(1);
  }

  for (const [companySlug, shipsList] of Object.entries(allShipsData)) {
    // Primeiro garantir que a companhia existe
    let [company] = await database.select().from(companies).where(eq(companies.slug, companySlug)).limit(1);
    
    if (!company) {
      console.log(`⚠️ Companhia ${companySlug} não encontrada. Criando...`);
      const name = companySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      await database.insert(companies).values({
        name: name,
        slug: companySlug,
        description: `Companhia de cruzeiros ${name}`
      });
      [company] = await database.select().from(companies).where(eq(companies.slug, companySlug)).limit(1);
    }

    for (const shipData of shipsList) {
      try {
        const [existing] = await database.select().from(ships).where(eq(ships.slug, shipData.slug)).limit(1);
        
        if (existing) {
          await database.update(ships).set({
            ...shipData,
            companyId: company.id,
            length: shipData.length?.toString()
          }).where(eq(ships.id, existing.id));
          console.log(`♻️ Atualizado: ${shipData.name}`);
        } else {
          await database.insert(ships).values({
            ...shipData,
            companyId: company.id,
            length: shipData.length?.toString()
          });
          console.log(`✅ Criado: ${shipData.name}`);
        }
      } catch (error) {
        console.error(`❌ Erro em ${shipData.name}:`, error.message);
      }
    }
  }
  
  console.log('\n✨ Navios populados com sucesso!');
  process.exit(0);
}

seedAllShips().catch(console.error);
