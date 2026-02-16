import axios from 'axios';
import * as cheerio from 'cheerio';

/**
 * Wikipedia Scraper para Imagens de Navios de Cruzeiro
 * Busca fotos reais dos navios nas páginas da Wikipedia
 */

interface WikipediaImageResult {
  imageUrl: string | null;
  source: string;
  found: boolean;
}

export class WikipediaScraper {
  private readonly baseUrl = 'https://en.wikipedia.org/w/api.php';
  private readonly userAgent = 'Dockly/1.0 (Cruise Information Service; contact@dockly.com)';

  /**
   * Busca a URL da imagem principal de um navio na Wikipedia
   */
  async getShipImage(shipName: string): Promise<WikipediaImageResult> {
    try {
      console.log(`[Wikipedia] Buscando imagem para "${shipName}"...`);

      // Step 1: Search for the ship page
      const searchUrl = `${this.baseUrl}?action=query&list=search&srsearch=${encodeURIComponent(shipName)}&format=json`;
      
      const searchResponse = await axios.get(searchUrl, {
        headers: { 'User-Agent': this.userAgent },
        timeout: 10000,
      });

      const searchResults = searchResponse.data?.query?.search;
      if (!searchResults || searchResults.length === 0) {
        console.log(`[Wikipedia] Nenhuma página encontrada para "${shipName}"`);
        return { imageUrl: null, source: 'wikipedia', found: false };
      }

      const pageTitle = searchResults[0].title;
      console.log(`[Wikipedia] Página encontrada: "${pageTitle}"`);

      // Step 2: Get page images
      const imagesUrl = `${this.baseUrl}?action=query&titles=${encodeURIComponent(pageTitle)}&prop=pageimages&pithumbsize=800&format=json`;
      
      const imagesResponse = await axios.get(imagesUrl, {
        headers: { 'User-Agent': this.userAgent },
        timeout: 10000,
      });

      const pages = imagesResponse.data?.query?.pages;
      if (!pages) {
        console.log(`[Wikipedia] Nenhuma imagem encontrada para "${pageTitle}"`);
        return { imageUrl: null, source: 'wikipedia', found: false };
      }

      const page = Object.values(pages)[0] as any;
      const imageUrl = page?.thumbnail?.source;

      if (imageUrl) {
        console.log(`[Wikipedia] Imagem encontrada: ${imageUrl}`);
        return { imageUrl, source: 'wikipedia', found: true };
      }

      // Step 3: Fallback - scrape the page HTML for infobox image
      console.log(`[Wikipedia] Tentando fallback com scraping HTML...`);
      const htmlUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(pageTitle.replace(/ /g, '_'))}`;
      
      const htmlResponse = await axios.get(htmlUrl, {
        headers: { 'User-Agent': this.userAgent },
        timeout: 10000,
      });

      const $ = cheerio.load(htmlResponse.data);
      
      // Try to find image in infobox
      const infoboxImage = $('.infobox img').first().attr('src');
      if (infoboxImage) {
        const fullImageUrl = infoboxImage.startsWith('//') ? `https:${infoboxImage}` : infoboxImage;
        console.log(`[Wikipedia] Imagem encontrada via HTML: ${fullImageUrl}`);
        return { imageUrl: fullImageUrl, source: 'wikipedia-html', found: true };
      }

      console.log(`[Wikipedia] Nenhuma imagem encontrada para "${shipName}"`);
      return { imageUrl: null, source: 'wikipedia', found: false };

    } catch (error) {
      console.error(`[Wikipedia] Erro ao buscar imagem para "${shipName}":`, error);
      return { imageUrl: null, source: 'wikipedia', found: false };
    }
  }

  /**
   * Busca imagens para múltiplos navios com rate limiting
   */
  async getMultipleShipImages(shipNames: string[]): Promise<Map<string, string | null>> {
    const results = new Map<string, string | null>();
    
    console.log(`[Wikipedia] Buscando imagens para ${shipNames.length} navios...`);

    for (const shipName of shipNames) {
      const result = await this.getShipImage(shipName);
      results.set(shipName, result.imageUrl);
      
      // Rate limiting: wait 1 second between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const successCount = Array.from(results.values()).filter(url => url !== null).length;
    console.log(`[Wikipedia] Concluído: ${successCount}/${shipNames.length} imagens encontradas`);

    return results;
  }

  /**
   * Busca imagem com fallback para nome alternativo
   */
  async getShipImageWithFallback(shipName: string, companyName?: string): Promise<string | null> {
    // Try with full ship name
    let result = await this.getShipImage(shipName);
    if (result.imageUrl) return result.imageUrl;

    // Try with company name prefix
    if (companyName) {
      const withCompany = `${companyName} ${shipName}`;
      result = await this.getShipImage(withCompany);
      if (result.imageUrl) return result.imageUrl;
    }

    // Try with "cruise ship" suffix
    result = await this.getShipImage(`${shipName} cruise ship`);
    if (result.imageUrl) return result.imageUrl;

    return null;
  }
}

// Singleton instance
export const wikipediaScraper = new WikipediaScraper();
