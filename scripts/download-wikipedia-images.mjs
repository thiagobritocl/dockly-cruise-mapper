import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../client/public/ships');
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

class WikipediaScraper {
  constructor() {
    this.baseUrl = 'https://en.wikipedia.org/w/api.php';
    this.userAgent = 'Dockly/1.0 (Cruise Information Service; contact@dockly.com)';
  }

  async getShipImage(shipName) {
    try {
      console.log(`[Wikipedia] Buscando imagem para "${shipName}"...`);
      const searchUrl = `${this.baseUrl}?action=query&list=search&srsearch=${encodeURIComponent(shipName + ' cruise ship')}&format=json`;
      const searchResponse = await axios.get(searchUrl, { headers: { 'User-Agent': this.userAgent } });
      const searchResults = searchResponse.data?.query?.search;
      if (!searchResults || searchResults.length === 0) return null;

      const pageTitle = searchResults[0].title;
      const imagesUrl = `${this.baseUrl}?action=query&titles=${encodeURIComponent(pageTitle)}&prop=pageimages&pithumbsize=1000&format=json`;
      const imagesResponse = await axios.get(imagesUrl, { headers: { 'User-Agent': this.userAgent } });
      const pages = imagesResponse.data?.query?.pages;
      if (!pages) return null;
      const page = Object.values(pages)[0];
      return page?.thumbnail?.source || null;
    } catch (error) {
      console.error(`Error searching ${shipName}:`, error.message);
      return null;
    }
  }

  async downloadImage(url, filename) {
    try {
      const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
        headers: { 'User-Agent': this.userAgent }
      });
      const filePath = path.join(PUBLIC_DIR, filename);
      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);
      return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
    } catch (error) {
      console.error(`Error downloading ${url}:`, error.message);
      return false;
    }
  }
}

const shipsToDownload = [
  "Icon of the Seas", "Wonder of the Seas", "Symphony of the Seas", "Harmony of the Seas",
  "Oasis of the Seas", "Allure of the Seas", "Odyssey of the Seas", "Spectrum of the Seas",
  "Ovation of the Seas", "Anthem of the Seas", "Quantum of the Seas", "Liberty of the Seas",
  "Independence of the Seas", "Freedom of the Seas", "Mariner of the Seas", "Navigator of the Seas",
  "Adventure of the Seas", "Explorer of the Seas", "Voyager of the Seas", "Brilliance of the Seas",
  "Serenade of the Seas", "Jewel of the Seas", "Radiance of the Seas", "Grandeur of the Seas",
  "Carnival Celebration", "Carnival Mardi Gras", "Carnival Jubilee", "Carnival Venezia",
  "Carnival Panorama", "Carnival Horizon", "Carnival Vista", "Carnival Breeze",
  "Carnival Magic", "Carnival Dream", "Carnival Freedom", "Carnival Liberty",
  "Carnival Valor", "Carnival Glory", "Carnival Conquest", "Carnival Miracle",
  "Carnival Legend", "Carnival Pride", "Carnival Spirit", "Carnival Sunshine",
  "Carnival Elation", "Norwegian Prima", "Norwegian Viva", "Norwegian Encore",
  "Norwegian Bliss", "Norwegian Joy", "Norwegian Escape", "MSC Meraviglia",
  "MSC World Europa", "MSC Virtuosa", "MSC Grandiosa", "Disney Wish",
  "Disney Dream", "Disney Fantasy", "Disney Magic", "Disney Wonder",
  "Scarlet Lady", "Valiant Lady", "Resilient Lady", "Brilliant Lady"
];

async function run() {
  const scraper = new WikipediaScraper();
  const mapping = {};

  for (const shipName of shipsToDownload) {
    const slug = shipName.toLowerCase().replace(/ /g, '-');
    const filename = `${slug}.jpg`;
    
    const imageUrl = await scraper.getShipImage(shipName);
    if (imageUrl) {
      console.log(`Downloading ${shipName}...`);
      await scraper.downloadImage(imageUrl, filename);
      mapping[slug] = `/ships/${filename}`;
    } else {
      console.log(`No image found for ${shipName}`);
    }
    // Rate limit
    await new Promise(r => setTimeout(r, 1000));
  }

  fs.writeFileSync(path.join(__dirname, 'ship-image-mapping.json'), JSON.stringify(mapping, null, 2));
  console.log('Done! Mapping saved to scripts/ship-image-mapping.json');
}

run();
