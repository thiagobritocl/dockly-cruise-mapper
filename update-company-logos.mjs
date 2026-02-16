import { db } from '../server/db.ts';
import { companies } from '../drizzle/schema.ts';
import { eq } from 'drizzle-orm';

/**
 * Script para atualizar logos das companhias de cruzeiros com logos REAIS e OFICIAIS
 */

const companyLogos = {
  'royal-caribbean': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Royal_Caribbean_International_logo.svg/512px-Royal_Caribbean_International_logo.svg.png',
  'carnival': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Carnival_Cruise_Line_logo.svg/512px-Carnival_Cruise_Line_logo.svg.png',
  'norwegian': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Norwegian_Cruise_Line_logo.svg/512px-Norwegian_Cruise_Line_logo.svg.png',
  'msc-cruises': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/MSC_Cruises_logo.svg/512px-MSC_Cruises_logo.svg.png',
  'princess': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princess_Cruises_logo.svg/512px-Princess_Cruises_logo.svg.png',
  'celebrity': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Celebrity_Cruises_logo.svg/512px-Celebrity_Cruises_logo.svg.png',
  'disney': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Disney_Cruise_Line_logo.svg/512px-Disney_Cruise_Line_logo.svg.png',
  'cunard': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Cunard_Line_logo.svg/512px-Cunard_Line_logo.svg.png',
  'holland-america': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Holland_America_Line_logo.svg/512px-Holland_America_Line_logo.svg.png',
  'costa': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Costa_Cruises_logo.svg/512px-Costa_Cruises_logo.svg.png',
  'viking': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Viking_Cruises_logo.svg/512px-Viking_Cruises_logo.svg.png',
  'azamara': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Azamara_Cruises_logo.svg/512px-Azamara_Cruises_logo.svg.png',
  'seabourn': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Seabourn_Cruise_Line_logo.svg/512px-Seabourn_Cruise_Line_logo.svg.png',
  'oceania': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Oceania_Cruises_logo.svg/512px-Oceania_Cruises_logo.svg.png',
  'regent': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Regent_Seven_Seas_Cruises_logo.svg/512px-Regent_Seven_Seas_Cruises_logo.svg.png',
  'silversea': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Silversea_Cruises_logo.svg/512px-Silversea_Cruises_logo.svg.png',
  'virgin-voyages': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Virgin_Voyages_logo.svg/512px-Virgin_Voyages_logo.svg.png',
  'ponant': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Ponant_logo.svg/512px-Ponant_logo.svg.png',
  'crystal': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Crystal_Cruises_logo.svg/512px-Crystal_Cruises_logo.svg.png',
  'paul-gauguin': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Paul_Gauguin_Cruises_logo.svg/512px-Paul_Gauguin_Cruises_logo.svg.png'
};

async function updateCompanyLogos() {
  console.log('🎨 Atualizando logos das companhias com logos reais...\n');
  
  const database = await db();
  if (!database) {
    console.error('❌ Não foi possível conectar ao banco de dados');
    process.exit(1);
  }

  for (const [slug, logoUrl] of Object.entries(companyLogos)) {
    try {
      await database.update(companies)
        .set({ logoUrl })
        .where(eq(companies.slug, slug));
      
      console.log(`✅ Atualizado logo para: ${slug}`);
    } catch (error) {
      console.error(`❌ Erro ao atualizar ${slug}:`, error.message);
    }
  }
  
  console.log('\n✨ Logos atualizados com sucesso!');
  process.exit(0);
}

updateCompanyLogos().catch(console.error);
