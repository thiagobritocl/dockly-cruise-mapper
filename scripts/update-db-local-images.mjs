import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mappingPath = path.join(__dirname, 'ship-image-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

async function update() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL not set!");
    return;
  }

  console.log("Attempting to update database images...");
  
  let connection;
  try {
    connection = await mysql.createConnection(databaseUrl);
    console.log("Connected successfully.");

    for (const [slug, relPath] of Object.entries(mapping)) {
      const finalPath = relPath.startsWith('/') ? relPath : `/${relPath}`;
      await connection.execute(
        'UPDATE ships SET imageUrl = ? WHERE slug = ?',
        [finalPath, slug]
      );
      console.log(`Updated ${slug} -> ${finalPath}`);
    }
    
    console.log("All ships updated successfully.");
  } catch (error) {
    console.error("Database update failed:", error.message);
  } finally {
    if (connection) await connection.end();
  }
}

update();
