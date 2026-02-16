import { drizzle } from "drizzle-orm/mysql2";
import { ships } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mapping = JSON.parse(fs.readFileSync(path.join(__dirname, 'ship-image-mapping.json'), 'utf8'));

async function update() {
  const db = drizzle(process.env.DATABASE_URL);
  console.log("Updating database with local image paths...");

  let updated = 0;
  for (const [slug, imageUrl] of Object.entries(mapping)) {
    try {
      await db.update(ships)
        .set({ imageUrl })
        .where(eq(ships.slug, slug));
      updated++;
    } catch (error) {
      console.error(`Error updating ${slug}:`, error.message);
    }
  }

  console.log(`Updated ${updated} ships.`);
  process.exit(0);
}

update().catch(console.error);
