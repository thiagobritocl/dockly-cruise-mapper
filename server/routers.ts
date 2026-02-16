import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, adminProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { updateShipItineraries } from "./scraper";
import { hybridScraper } from "./hybrid-scraper";
import { puppeteerScraper } from "./puppeteer-scraper";
import { scheduler } from "./scheduler";
import { cruisemapperScraper, scrapeAndSaveCompany } from "./cruisemapper-scraper";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // Rotas públicas
  companies: router({
    list: publicProcedure.query(async () => db.getAllCompanies()),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => db.getCompanyBySlug(input.slug)),
  }),

  ships: router({
    listByCompany: publicProcedure
      .input(z.object({ companyId: z.number() }))
      .query(async ({ input }) => db.getShipsByCompanyId(input.companyId)),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => db.getShipBySlug(input.slug)),
  }),

  itineraries: router({
    listByShip: publicProcedure
      .input(z.object({ shipId: z.number() }))
      .query(async ({ input }) => {
        const itinerariesList = await db.getItinerariesByShipId(input.shipId);
        const itinerariesWithStops = await Promise.all(
          itinerariesList.map(async (itinerary) => {
            const stops = await db.getStopsByItineraryId(itinerary.id);
            const stopsWithPorts = await Promise.all(
              stops.map(async (stop) => {
                const port = await db.getPortById(stop.portId);
                return { ...stop, port };
              })
            );
            return { ...itinerary, stops: stopsWithPorts };
          })
        );
        return itinerariesWithStops;
      }),
    // Atualizar itinerário requer autenticação de admin
    updateForShip: adminProcedure
      .input(z.object({ shipSlug: z.string() }))
      .mutation(async ({ input }) => updateShipItineraries(input.shipSlug)),
  }),

  // Rotas de scraping — apenas admins
  hybridScraper: router({
    scrapeItineraries: adminProcedure
      .input(z.object({ companyName: z.string(), shipName: z.string() }))
      .mutation(async ({ input }) => {
        const itineraries = await hybridScraper.scrapeItineraries(input.companyName, input.shipName);
        return { success: true, count: itineraries.length, itineraries };
      }),
    scrapeByExactSlug: adminProcedure
      .input(z.object({ cruisemapperSlug: z.string(), shipName: z.string() }))
      .mutation(async ({ input }) => {
        const itineraries = await hybridScraper.scrapeByExactSlug(input.cruisemapperSlug, input.shipName);
        return { success: true, count: itineraries.length, itineraries };
      }),
    getPortCoordinates: adminProcedure
      .input(z.object({ portName: z.string() }))
      .query(async ({ input }) => hybridScraper.getPortCoordinates(input.portName)),
    getCompanyShips: adminProcedure
      .input(z.object({ companyName: z.string() }))
      .query(async ({ input }) => {
        const ships = await hybridScraper.getCompanyShips(input.companyName);
        return { success: true, count: ships.length, ships };
      }),
  }),

  // Rotas de seed de dados
  seed: router({
    runComplete: adminProcedure.mutation(async () => {
      try {
        const { seedCompleteData } = await import('./seed-runner');
        const result = await seedCompleteData();
        return { success: true, ...result };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    }),
  }),

  // Painel de administração — apenas admins
  admin: router({
    getStats: adminProcedure.query(async () => {
      const totalShips = await db.countShips();
      const totalItineraries = await db.countItineraries();
      const shipsWithItineraries = await db.countShipsWithItineraries();
      return {
        totalShips,
        totalItineraries,
        shipsWithItineraries,
        successRate: 95,
        lastUpdate: 'Hoje',
        nextUpdate: '2h',
      };
    }),
    runScheduledJob: adminProcedure
      .input(z.object({ jobName: z.string() }))
      .mutation(async ({ input }) => {
        await scheduler.runJobManually(input.jobName);
        return { success: true };
      }),
    scrapeCompany: adminProcedure
      .input(z.object({ companyName: z.string(), companyId: z.number(), maxShips: z.number().optional() }))
      .mutation(async ({ input }) => {
        const result = await scrapeAndSaveCompany(input.companyName, input.companyId, {
          maxShips: input.maxShips ?? 50,
          delayMs: 2000,
        });
        return { success: true, ...result };
      }),
    scrapeShipBySlug: adminProcedure
      .input(z.object({ cruisemapperSlug: z.string(), shipId: z.number() }))
      .mutation(async ({ input }) => {
        const { scrapeShipBySlug } = await import('./cruisemapper-scraper');
        const result = await scrapeShipBySlug(input.cruisemapperSlug, input.shipId);
        return { success: true, ...result };
      }),
    puppeteerScrape: adminProcedure
      .input(z.object({ companyName: z.string(), shipName: z.string() }))
      .mutation(async ({ input }) => {
        let results: any[] = [];
        if (input.companyName === 'Royal Caribbean') {
          results = await puppeteerScraper.scrapeRoyalCaribbean(input.shipName);
        } else if (input.companyName === 'Carnival Cruise Line') {
          results = await puppeteerScraper.scrapeCarnival(input.shipName);
        }
        return { success: true, count: results.length, results };
      }),
  }),
});

export type AppRouter = typeof appRouter;
