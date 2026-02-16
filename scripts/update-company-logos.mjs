import { getDb } from '../server/db.ts';
import { companies } from '../drizzle/schema.ts';
import { eq } from 'drizzle-orm';

/**
 * Script para atualizar logos das companhias de cruzeiros
 * URLs de logos oficiais das principais companhias
 */
const companyLogos = {
  'royal-caribbean': 'https://www.royalcaribbean.com/content/dam/royal/resources/logo/logo-rci.svg',
  'carnival': 'https://www.carnival.com/~/media/Images/PreSales/Header/carnival-logo.png',
  'norwegian': 'https://www.ncl.com/sites/default/files/ncl-logo.svg',
  'msc-cruises': 'https://www.msccruises.com/etc.clientlibs/msccruises/clientlibs/clientlib-base/resources/img/logo.svg',
  'princess': 'https://www.princess.com/learn/dist/static/logo-princess.svg',
  'celebrity': 'https://www.celebritycruises.com/content/dam/celebrity/images/logos/celebrity-logo.svg',
  'disney': 'https://disneycruise.disney.go.com/static/media/dcl-logo.svg',
  'cunard': 'https://www.cunard.com/content/dam/cunard/logos/cunard-logo.svg',
  'holland-america': 'https://www.hollandamerica.com/content/dam/hal/logos/hal-logo.svg',
  'costa': 'https://www.costacruises.com/content/dam/costa/logos/costa-logo.svg',
  'viking': 'https://www.vikingcruises.com/oceans/static/images/viking-logo.svg',
  'azamara': 'https://www.azamara.com/sites/default/files/azamara-logo.svg',
  'seabourn': 'https://www.seabourn.com/content/dam/seabourn/global-nav/seabourn-logo.svg',
  'oceania': 'https://www.oceaniacruises.com/dam/jcr:content/oceaniacruises-logo.svg',
  'regent': 'https://www.rssc.com/content/dam/regent/logos/regent-logo.svg',
  'silversea': 'https://www.silversea.com/content/dam/silversea/logos/silversea-logo.svg',
  'virgin-voyages': 'https://www.virginvoyages.com/static/media/virgin-voyages-logo.svg',
  'ponant': 'https://us.ponant.com/themes/custom/ponant/logo.svg',
  'crystal': 'https://www.crystalcruises.com/images/crystal-logo.svg',
  'paul-gauguin': 'https://www.pgcruises.com/sites/default/files/paul-gauguin-logo.svg'
};

async function updateCompanyLogos() {
  console.log('🎨 Atualizando logos das companhias...\n');

  const db = await getDb();
  if (!db) {
    console.error('❌ Banco de dados não disponível. Verifique a variável DATABASE_URL.');
    process.exit(1);
  }

  for (const [slug, logoUrl] of Object.entries(companyLogos)) {
    try {
      await db.update(companies)
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
