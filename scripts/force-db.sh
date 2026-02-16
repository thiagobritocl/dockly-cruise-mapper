#!/bin/bash
echo "Forcing database update with local image paths..."
node -e "
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function run() {
  const mapping = JSON.parse(fs.readFileSync('scripts/ship-image-mapping.json', 'utf8'));
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  for (const [slug, relPath] of Object.entries(mapping)) {
    const finalPath = relPath.startsWith('/') ? relPath : '/' + relPath;
    await connection.execute('UPDATE ships SET imageUrl = ? WHERE slug = ?', [finalPath, slug]);
  }
  await connection.end();
  console.log('Update complete.');
}
run().catch(err => { console.error(err); process.exit(1); });
"
