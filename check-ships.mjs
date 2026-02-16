import { drizzle } from 'drizzle-orm/mysql2';
import { ships, companies } from './drizzle/schema.js';

const db = drizzle(process.env.DATABASE_URL);

async function check() {
  const allShips = await db.select().from(ships);
  const allCompanies = await db.select().from(companies);
  
  console.log('Total companies:', allCompanies.length);
  console.log('Total ships:', allShips.length);
  console.log('\nShips per company:');
  
  allCompanies.forEach(c => {
    const count = allShips.filter(s => s.companyId === c.id).length;
    console.log(`  ${c.name}: ${count} navios`);
  });
  
  process.exit(0);
}

check();
