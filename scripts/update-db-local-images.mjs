import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mappingPath = path.join(__dirname, 'ship-image-mapping.json');
if (!fs.existsSync(mappingPath)) {
  console.error("Mapping file not found!");
  process.exit(1);
}

const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

async function update() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL environment variable is not set!");
    process.exit(1);
  }

  console.log("Connecting to database directly via mysql2...");
  const connection = await mysql.createConnection(databaseUrl);
  
  console.log("Updating database with local image paths...");

  let updated = 0;
  for (const [slug, imageUrl] of Object.entries(mapping)) {
    try {
      const [result] = await connection.execute(
        'UPDATE ships SET imageUrl = ? WHERE slug = ?',
        [imageUrl, slug]
      );
      
      if (result.affectedRows > 0) {
        updated++;
        console.log(`✅ Updated: ${slug}`);
      }
    } catch (error) {
      console.error(`❌ Error updating ${slug}:`, error.message);
    }
  }

  await connection.end();
  console.log(`Successfully updated ${updated} ships in the database.`);
  process.exit(0);
}

update().catch(console.error);
