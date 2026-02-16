import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mappingPath = path.join(__dirname, 'ship-image-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

async function run() {
  // En Railway, DATABASE_URL es la forma estándar de conexión interna
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.log("No DATABASE_URL found, skipping local update.");
    return;
  }

  console.log("Updating database with local mapping...");
  let connection;
  try {
    connection = await mysql.createConnection(dbUrl);
    for (const [slug, relPath] of Object.entries(mapping)) {
      const finalPath = relPath.startsWith('/') ? relPath : `/${relPath}`;
      await connection.execute(
        'UPDATE ships SET imageUrl = ? WHERE slug = ?',
        [finalPath, slug]
      );
    }
    console.log("Database update successful.");
  } catch (e) {
    console.error("Database update failed:", e.message);
  } finally {
    if (connection) await connection.end();
  }
}

run();
