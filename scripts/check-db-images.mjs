import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function check() {
  const dbUrl = process.env.DATABASE_URL || "mysql://root:UoGvHjXFwRInOByoNshTshLpEByYqVlW@junction.proxy.rlwy.net:45408/railway";
  const connection = await mysql.createConnection(dbUrl);
  
  const [rows] = await connection.execute('SELECT name, slug, imageUrl FROM ships LIMIT 10');
  console.log("Current ship data in DB:");
  console.table(rows);
  
  await connection.end();
}

check().catch(console.error);
