import puppeteer, { Browser, Page } from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

/**
 * Puppeteer Scraper para Sites com JavaScript Dinâmico
 * Usa Chromium headless para renderizar páginas React/Vue/Angular
 */

interface PuppeteerConfig {
  headless: boolean;
  timeout: number;
  waitForSelector?: string;
  screenshot?: boolean;
}

export class PuppeteerScraper {
  private browser: Browser | null = null;
  private config: PuppeteerConfig = {
    headless: true,
    timeout: 30000,
    screenshot: false,
  };

  /**
   * Inicializa o browser Chromium
   */
  async initialize() {
    if (this.browser) return;

    console.log('[Puppeteer] Inicializando browser...');

    try {
      // Production: use @sparticuz/chromium
      if (process.env.NODE_ENV === 'production') {
        this.browser = await puppeteer.launch({
          args: chromium.args,
          defaultViewport: { width: 1920, height: 1080 },
          executablePath: await chromium.executablePath(),
          headless: true,
        });
      } else {
        // Development: use local Chromium
        this.browser = await puppeteer.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
      }

      console.log('[Puppeteer] Browser inicializado com sucesso');
    } catch (error) {
      console.error('[Puppeteer] Erro ao inicializar browser:', error);
      throw error;
    }
  }

  /**
   * Fecha o browser
   */
  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      console.log('[Puppeteer] Browser fechado');
    }
  }

  /**
   * Scrape uma página com JavaScript dinâmico
   */
  async scrapePage(url: string, config?: Partial<PuppeteerConfig>): Promise<string> {
    await this.initialize();
    
    if (!this.browser) {
      throw new Error('Browser não inicializado');
    }

    const finalConfig = { ...this.config, ...config };
    const page = await this.browser.newPage();

    try {
      console.log(`[Puppeteer] Navegando para ${url}...`);

      // Set user agent to avoid detection
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      );

      // Navigate to page
      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: finalConfig.timeout,
      });

      // Wait for specific selector if provided
      if (finalConfig.waitForSelector) {
        await page.waitForSelector(finalConfig.waitForSelector, {
          timeout: finalConfig.timeout,
        });
      }

      // Take screenshot if enabled
      if (finalConfig.screenshot) {
        const screenshotPath = `/tmp/puppeteer-${Date.now()}.png`;
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`[Puppeteer] Screenshot salvo em ${screenshotPath}`);
      }

      // Get page content
      const html = await page.content();
      console.log(`[Puppeteer] Página carregada: ${html.length} bytes`);

      return html;
    } catch (error) {
      console.error(`[Puppeteer] Erro ao scrapar ${url}:`, error);
      throw error;
    } finally {
      await page.close();
    }
  }

  /**
   * Scrape Royal Caribbean (React app)
   */
  async scrapeRoyalCaribbean(shipName: string) {
    const url = `https://www.royalcaribbean.com/cruise-search`;
    
    try {
      await this.initialize();
      if (!this.browser) throw new Error('Browser não inicializado');

      const page = await this.browser.newPage();
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      );

      console.log(`[Puppeteer] Buscando ${shipName} na Royal Caribbean...`);

      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

      // Wait for search results to load
      await page.waitForSelector('.cruise-results', { timeout: 10000 }).catch(() => {
        console.log('[Puppeteer] Seletor .cruise-results não encontrado, continuando...');
      });

      // Extract itinerary data
      const itineraries = await page.evaluate(() => {
        const results: any[] = [];
        const cards = document.querySelectorAll('.cruise-card, .itinerary-card');
        
        cards.forEach(card => {
          const title = card.querySelector('h3, .title')?.textContent?.trim();
          const duration = card.querySelector('.duration')?.textContent?.trim();
          const ports = Array.from(card.querySelectorAll('.port, .destination')).map(
            el => el.textContent?.trim()
          );

          if (title) {
            results.push({ title, duration, ports });
          }
        });

        return results;
      });

      await page.close();

      console.log(`[Puppeteer] Encontrados ${itineraries.length} itinerários`);
      return itineraries;
    } catch (error) {
      console.error('[Puppeteer] Erro ao scrapar Royal Caribbean:', error);
      return [];
    }
  }

  /**
   * Scrape Carnival (Vue.js app)
   */
  async scrapeCarnival(shipName: string) {
    const url = `https://www.carnival.com/cruise-search`;
    
    try {
      const html = await this.scrapePage(url, {
        waitForSelector: '.search-results',
        timeout: 30000,
      });

      // Parse HTML with cheerio or regex
      // TODO: Implement parsing logic

      return [];
    } catch (error) {
      console.error('[Puppeteer] Erro ao scrapar Carnival:', error);
      return [];
    }
  }

  /**
   * Bypass anti-bot protection
   */
  async setupAntiDetection(page: Page) {
    // Remove webdriver flag
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => false,
      });
    });

    // Add chrome object
    await page.evaluateOnNewDocument(() => {
      (window as any).chrome = {
        runtime: {},
      };
    });

    // Randomize viewport
    const width = 1920 + Math.floor(Math.random() * 100);
    const height = 1080 + Math.floor(Math.random() * 100);
    await page.setViewport({ width, height });

    // Add plugins
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'plugins', {
        get: () => [1, 2, 3, 4, 5],
      });
    });
  }

  /**
   * Pool de browsers para performance
   */
  private browserPool: Browser[] = [];
  private readonly maxPoolSize = 3;

  async getBrowserFromPool(): Promise<Browser> {
    if (this.browserPool.length < this.maxPoolSize) {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      this.browserPool.push(browser);
      return browser;
    }

    // Return existing browser from pool
    return this.browserPool[Math.floor(Math.random() * this.browserPool.length)];
  }

  async closePool() {
    for (const browser of this.browserPool) {
      await browser.close();
    }
    this.browserPool = [];
    console.log('[Puppeteer] Pool de browsers fechado');
  }
}

// Singleton instance
export const puppeteerScraper = new PuppeteerScraper();

// Cleanup on process exit
process.on('SIGINT', async () => {
  console.log('[Puppeteer] Limpando recursos...');
  await puppeteerScraper.close();
  await puppeteerScraper.closePool();
  process.exit(0);
});
