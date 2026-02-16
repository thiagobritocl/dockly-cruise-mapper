import { drizzle } from 'drizzle-orm/mysql2';
import { ships, companies } from './drizzle/schema.ts';
import { eq } from 'drizzle-orm';
import { wikipediaScraper } from './server/wikipedia-scraper.ts';

const db = drizzle(process.env.DATABASE_URL);

console.log('🚢 Iniciando busca de imagens no Wikipedia para todos os navios...\n');

// Get all ships with their companies
const allShips = await db
  .select({
    id: ships.id,
    name: ships.name,
    companyId: ships.companyId,
    imageUrl: ships.imageUrl,
  })
  .from(ships);

const allCompanies = await db.select().from(companies);
const companyMap = new Map(allCompanies.map(c => [c.id, c.name]));

console.log(`Total de navios: ${allShips.length}`);
console.log(`Navios sem imagem: ${allShips.filter(s => !s.imageUrl).length}\n`);

let successCount = 0;
let failCount = 0;
let skippedCount = 0;

for (let i = 0; i < allShips.length; i++) {
  const ship = allShips[i];
  const companyName = companyMap.get(ship.companyId);
  
  console.log(`[${i + 1}/${allShips.length}] ${ship.name} (${companyName})`);
  
  // Skip if already has image
  if (ship.imageUrl) {
    console.log(`  ⏭️  Já possui imagem, pulando...\n`);
    skippedCount++;
    continue;
  }
  
  try {
    // Try to get image with fallback
    const imageUrl = await wikipediaScraper.getShipImageWithFallback(ship.name, companyName);
    
    if (imageUrl) {
      // Update database
      await db.update(ships)
        .set({ imageUrl })
        .where(eq(ships.id, ship.id));
      
      console.log(`  ✅ Imagem encontrada e salva!`);
      console.log(`  📷 ${imageUrl}\n`);
      successCount++;
    } else {
      console.log(`  ❌ Nenhuma imagem encontrada\n`);
      failCount++;
    }
    
    // Rate limiting: wait 2 seconds between requests
    if (i < allShips.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
  } catch (error) {
    console.error(`  ❌ Erro:`, error.message);
    failCount++;
  }
}

console.log('\n' + '='.repeat(60));
console.log('📊 RESUMO:');
console.log(`  ✅ Sucesso: ${successCount} imagens`);
console.log(`  ❌ Falha: ${failCount} navios`);
console.log(`  ⏭️  Pulados: ${skippedCount} navios`);
console.log(`  📈 Taxa de sucesso: ${Math.round((successCount / (allShips.length - skippedCount)) * 100)}%`);
console.log('='.repeat(60));

process.exit(0);
