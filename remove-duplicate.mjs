import { drizzle } from 'drizzle-orm/mysql2';
import { ships } from './drizzle/schema.ts';
import { like, eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL);

console.log('Buscando MSC World Europa duplicados...');

const duplicates = await db.select().from(ships).where(like(ships.name, '%MSC World Europa%'));

console.log(`\nEncontrados ${duplicates.length} navios MSC World Europa:`);
duplicates.forEach(s => {
  console.log(`  ID: ${s.id}, Nome: "${s.name}", Capacidade: ${s.capacity}, Ano: ${s.yearBuilt}`);
});

if (duplicates.length > 1) {
  // Keep the one with correct data (capacity 6762, year 2022)
  const correct = duplicates.find(s => s.capacity === 6762 && s.yearBuilt === 2022);
  const toDelete = duplicates.filter(s => s.id !== correct?.id);
  
  console.log(`\nMantendo: ID ${correct?.id} - ${correct?.name} (${correct?.capacity} passageiros, ${correct?.yearBuilt})`);
  console.log(`Removendo ${toDelete.length} duplicata(s):`);
  
  for (const ship of toDelete) {
    console.log(`  Removendo ID ${ship.id} - ${ship.name}`);
    await db.delete(ships).where(eq(ships.id, ship.id));
  }
  
  console.log('\n✓ Duplicatas removidas com sucesso!');
} else {
  console.log('\nNenhuma duplicata encontrada.');
}

process.exit(0);
