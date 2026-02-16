import { hybridScraper } from './hybrid-scraper';
import { scrapeAndSaveCompany, COMPANY_CRUISEMAPPER_MAP } from './cruisemapper-scraper';
import * as db from './db';

/**
 * Sistema de Agendamento Automático
 * Atualiza itinerários de cruzeiros periodicamente
 */

interface ScheduledJob {
  name: string;
  cronExpression: string;
  lastRun?: Date;
  nextRun?: Date;
  enabled: boolean;
}

export class CronScheduler {
  private jobs: Map<string, NodeJS.Timeout> = new Map();
  private jobConfigs: ScheduledJob[] = [
    {
      name: 'daily-scraping',
      cronExpression: '0 3 * * *', // 03:00 every day
      enabled: true,
    },
    {
      name: 'weekly-pdf-check',
      cronExpression: '0 4 * * 0', // 04:00 every Sunday
      enabled: true,
    },
  ];

  /**
   * Inicia todos os cron jobs configurados
   */
  start() {
    console.log('[Scheduler] Iniciando sistema de agendamento...');
    
    // Daily scraping - every day at 3 AM
    this.scheduleDaily('daily-scraping', async () => {
      await this.runDailyScraping();
    });

    // Weekly PDF check - every Sunday at 4 AM
    this.scheduleWeekly('weekly-pdf-check', async () => {
      await this.runWeeklyPDFCheck();
    });

    console.log(`[Scheduler] ${this.jobs.size} jobs agendados`);
  }

  /**
   * Para todos os cron jobs
   */
  stop() {
    console.log('[Scheduler] Parando todos os jobs...');
    this.jobs.forEach((timeout, name) => {
      clearTimeout(timeout);
      console.log(`[Scheduler] Job "${name}" parado`);
    });
    this.jobs.clear();
  }

  /**
   * Agenda um job diário
   */
  private scheduleDaily(name: string, task: () => Promise<void>) {
    const now = new Date();
    const targetHour = 3; // 3 AM
    
    // Calculate next run time
    const nextRun = new Date(now);
    nextRun.setHours(targetHour, 0, 0, 0);
    
    if (nextRun <= now) {
      nextRun.setDate(nextRun.getDate() + 1);
    }

    const delay = nextRun.getTime() - now.getTime();
    
    console.log(`[Scheduler] "${name}" agendado para ${nextRun.toLocaleString('pt-BR')}`);

    const timeout = setTimeout(async () => {
      await this.executeJob(name, task);
      // Reschedule for next day
      this.scheduleDaily(name, task);
    }, delay);

    this.jobs.set(name, timeout);
  }

  /**
   * Agenda um job semanal
   */
  private scheduleWeekly(name: string, task: () => Promise<void>) {
    const now = new Date();
    const targetDay = 0; // Sunday
    const targetHour = 4; // 4 AM
    
    // Calculate next run time
    const nextRun = new Date(now);
    nextRun.setHours(targetHour, 0, 0, 0);
    
    const daysUntilTarget = (targetDay - now.getDay() + 7) % 7;
    if (daysUntilTarget === 0 && nextRun <= now) {
      nextRun.setDate(nextRun.getDate() + 7);
    } else {
      nextRun.setDate(nextRun.getDate() + daysUntilTarget);
    }

    const delay = nextRun.getTime() - now.getTime();
    
    console.log(`[Scheduler] "${name}" agendado para ${nextRun.toLocaleString('pt-BR')}`);

    const timeout = setTimeout(async () => {
      await this.executeJob(name, task);
      // Reschedule for next week
      this.scheduleWeekly(name, task);
    }, delay);

    this.jobs.set(name, timeout);
  }

  /**
   * Executa um job com tratamento de erros e logging
   */
  private async executeJob(name: string, task: () => Promise<void>) {
    const startTime = Date.now();
    console.log(`[Scheduler] Executando job "${name}"...`);

    try {
      await task();
      const duration = Date.now() - startTime;
      console.log(`[Scheduler] Job "${name}" concluído em ${duration}ms`);
    } catch (error) {
      console.error(`[Scheduler] Erro no job "${name}":`, error);
      // Retry after 1 hour on failure
      setTimeout(() => {
        console.log(`[Scheduler] Tentando novamente job "${name}"...`);
        this.executeJob(name, task);
      }, 60 * 60 * 1000);
    }
  }

  /**
   * Scraping diário de todas as companhias via CruiseMapper
   */
  private async runDailyScraping() {
    console.log('[Scheduler] Iniciando scraping diário via CruiseMapper...');

    const companies = await db.getAllCompanies();
    let successCount = 0;
    let errorCount = 0;
    let totalItineraries = 0;

    for (const company of companies) {
      if (!COMPANY_CRUISEMAPPER_MAP[company.name]) {
        console.log(`[Scheduler] ${company.name}: sem mapeamento CruiseMapper, pulando`);
        continue;
      }

      try {
        console.log(`[Scheduler] Scraping ${company.name} via CruiseMapper...`);

        const result = await scrapeAndSaveCompany(company.name, company.id, {
          maxShips: 30,
          delayMs: 2500,
        });

        if (result.itinerariesSaved > 0) {
          successCount++;
          totalItineraries += result.itinerariesSaved;
          console.log(`[Scheduler] ${company.name}: ${result.shipsScraped} navios, ${result.itinerariesSaved} itinerários`);
        } else {
          console.log(`[Scheduler] ${company.name}: nenhum itinerário novo`);
        }

        await new Promise(resolve => setTimeout(resolve, 10000));
      } catch (error) {
        errorCount++;
        console.error(`[Scheduler] Erro ao scrapar ${company.name}:`, error);
      }
    }

    console.log(`[Scheduler] Concluído: ${successCount} companhias, ${totalItineraries} itinerários, ${errorCount} erros`);
  }

  /**
   * Verificação semanal de PDFs
   */
  private async runWeeklyPDFCheck() {
    console.log('[Scheduler] Iniciando verificação semanal de PDFs...');
    
    // TODO: Implement PDF checking logic
    // This would scan known PDF sources and update itineraries
    
    console.log('[Scheduler] Verificação de PDFs concluída');
  }

  /**
   * Executa um job manualmente (para testes ou admin dashboard)
   */
  async runJobManually(jobName: string) {
    console.log(`[Scheduler] Executando job "${jobName}" manualmente...`);
    
    switch (jobName) {
      case 'daily-scraping':
        await this.runDailyScraping();
        break;
      case 'weekly-pdf-check':
        await this.runWeeklyPDFCheck();
        break;
      default:
        throw new Error(`Job desconhecido: ${jobName}`);
    }
  }

  /**
   * Retorna status de todos os jobs
   */
  getJobsStatus(): ScheduledJob[] {
    return this.jobConfigs.map(config => ({
      ...config,
      lastRun: undefined, // TODO: Track last run time
      nextRun: undefined, // TODO: Calculate next run time
    }));
  }
}

// Singleton instance
export const scheduler = new CronScheduler();

// Auto-start in production
if (process.env.NODE_ENV === 'production') {
  scheduler.start();
  console.log('[Scheduler] Sistema de agendamento iniciado automaticamente');
}
