import { drizzle } from 'drizzle-orm/mysql2';
import { ships, itineraries } from './drizzle/schema.ts';
import { eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';

const pool = mysql.createPool(process.env.DATABASE_URL);
const db = drizzle(pool);

async function debug() {
  try {
    // Encontrar um navio
    const shipResult = await db.select().from(ships).where(eq(ships.name, 'MSC Fantasia')).limit(1);
    const ship = shipResult[0];
    
    console.log('Navio encontrado:', ship);
    
    if (ship) {
      // Tentar criar itinerário
      const startDate = new Date('2026-01-01');
      const endDate = new Date('2026-01-08');
      
      console.log('\nTentando criar itinerário...');
      console.log('Ship ID:', ship.id);
      console.log('Start Date:', startDate);
      console.log('End Date:', endDate);
      
      const result = await db.insert(itineraries).values({
        shipId: ship.id,
        name: 'Test Itinerary',
        startDate: startDate,
        endDate: endDate,
        duration: 7,
        description: 'Test',
      });
      
      console.log('\nResultado:', result);
      console.log('Insert ID:', result.insertId);
    }
  } catch (error) {
    console.error('Erro:', error.message);
    console.error('Stack:', error.stack);
  }
  
  process.exit(0);
}

debug();
