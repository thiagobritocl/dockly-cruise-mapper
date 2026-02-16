import { drizzle } from 'drizzle-orm/mysql2';
import { companies } from './drizzle/schema.ts';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL);

const logos = {
  'royal-caribbean': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663354637664/OAtHYrhWzEcuazVv.jpg',
  'carnival-cruise-line': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663354637664/aIGqJnxkjhKWWTFu.png',
  'msc-cruises': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663354637664/PKsbcuPGvgdeddDw.jpg',
  'norwegian-cruise-line': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663354637664/lyZNCSUJEMtdTeEx.png',
  'disney-cruise-line': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663354637664/RPoEEMiaRmuRBQZR.png',
  'celebrity-cruises': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663354637664/QNolxwUSenWwSKuM.png',
};

console.log('🎨 Atualizando logos das companhias...\n');

for (const [slug, logoUrl] of Object.entries(logos)) {
  try {
    const result = await db
      .update(companies)
      .set({ logoUrl })
      .where(eq(companies.slug, slug));
    
    console.log(`✅ ${slug}: ${logoUrl}`);
  } catch (error) {
    console.error(`❌ Erro ao atualizar ${slug}:`, error.message);
  }
}

console.log('\n✨ Logos atualizados com sucesso!');
process.exit(0);
