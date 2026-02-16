import { drizzle } from 'drizzle-orm/mysql2';
import { companies } from './drizzle/schema.ts';
import mysql from 'mysql2/promise';

const pool = mysql.createPool(process.env.DATABASE_URL);
const db = drizzle(pool);

const result = await db.select().from(companies);
console.log('\n📋 Status dos Logos:\n');
result.forEach(c => {
  const hasLogo = c.logoUrl ? '✅' : '❌';
  console.log(`${hasLogo} ${c.name}`);
  if (c.logoUrl) {
    console.log(`   URL: ${c.logoUrl.substring(0, 60)}...`);
  }
});
console.log('\n');
process.exit(0);
