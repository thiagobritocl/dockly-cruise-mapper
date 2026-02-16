import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mappingPath = path.join(__dirname, 'ship-image-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

async function update() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL not set!");
    process.exit(1);
  }

  const connection = await mysql.createConnection(databaseUrl);
  console.log("Connected to database. Updating with relative paths...");

  let updated = 0;
  for (const [slug, relPath] of Object.entries(mapping)) {
    try {
      // Usamos la ruta relativa que el navegador entiende como /ships/nombre.jpg
      const finalPath = relPath.startsWith('http') ? relPath : (relPath.startsWith('/') ? relPath : `/${relPath}`);
      
      const [result] = await connection.execute(
        'UPDATE ships SET imageUrl = ? WHERE slug = ?',
        [finalPath, slug]
      );
      
      if (result.affectedRows > 0) {
        updated++;
        console.log(`✅ ${slug} -> ${finalPath}`);
      }
    } catch (error) {
      console.error(`❌ ${slug}: ${error.message}`);
    }
  }

  await connection.end();
  console.log(`Updated ${updated} ships.`);
  process.exit(0);
}

update().catch(console.error);
