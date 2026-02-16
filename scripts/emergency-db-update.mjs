import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mappingPath = path.join(__dirname, 'ship-image-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

async function run() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("DATABASE_URL not found!");
    process.exit(1);
  }

  console.log("Connecting to production DB...");
  const connection = await mysql.createConnection(dbUrl);
  
  console.log("Updating ship images...");
  for (const [slug, relPath] of Object.entries(mapping)) {
    const finalPath = relPath.startsWith('/') ? relPath : `/${relPath}`;
    await connection.execute(
      'UPDATE ships SET imageUrl = ? WHERE slug = ?',
      [finalPath, slug]
    );
    console.log(`Updated ${slug} to ${finalPath}`);
  }

  await connection.end();
  console.log("Database update complete!");
}

run().catch(console.error);
