import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mappingPath = path.join(__dirname, 'ship-image-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

// URL pública de Railway (obtenida de los intentos anteriores)
const PUBLIC_DB_URL = "mysql://root:UoGvHjXFwRInOByoNshTshLpEByYqVlW@junction.proxy.rlwy.net:45408/railway";

async function run() {
  console.log("Connecting to production DB via public URL...");
  let connection;
  try {
    connection = await mysql.createConnection(PUBLIC_DB_URL);
    console.log("Connected.");

    for (const [slug, relPath] of Object.entries(mapping)) {
      const finalPath = relPath.startsWith('/') ? relPath : `/${relPath}`;
      await connection.execute(
        'UPDATE ships SET imageUrl = ? WHERE slug = ?',
        [finalPath, slug]
      );
      console.log(`Updated ${slug} -> ${finalPath}`);
    }
    console.log("Success!");
  } catch (e) {
    console.error("Failed:", e.message);
  } finally {
    if (connection) await connection.end();
  }
}

run();
