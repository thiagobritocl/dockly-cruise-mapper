import { getDb } from "../server/db.js";
import { ships } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mappingPath = path.join(__dirname, 'ship-image-mapping.json');
if (!fs.existsSync(mappingPath)) {
  console.error("Mapping file not found!");
  process.exit(1);
}

const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

async function update() {
  const db = await getDb();
  if (!db) {
    console.error("Database connection failed!");
    process.exit(1);
  }
  
  console.log("Updating database with local image paths...");

  let updated = 0;
  for (const [slug, imageUrl] of Object.entries(mapping)) {
    try {
      const result = await db.update(ships)
        .set({ imageUrl })
        .where(eq(ships.slug, slug));
      
      // En mysql2/drizzle, el resultado suele ser un array donde el primer elemento tiene info de la op
      if (result[0].affectedRows > 0) {
        updated++;
      }
    } catch (error) {
      console.error(`Error updating ${slug}:`, error.message);
    }
  }

  console.log(`Successfully updated ${updated} ships in the database.`);
  process.exit(0);
}

update().catch(console.error);
