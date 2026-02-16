import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Health check endpoint for Railway
  app.get("/health", (_req, res) => {
    res.status(200).json({ ok: true, timestamp: Date.now() });
  });

  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // ==========================================
  // ENDPOINTS DE SETUP - EXECUTAR SCRIPTS
  // ==========================================

  // Endpoint para executar setup completo
  app.get('/admin/run-setup/:secret', async (req, res) => {
    const { secret } = req.params;
    
    if (secret !== 'setup-dockly-2025') {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked'
    });

    res.write('🚀 Iniciando população de dados...\n\n');

    const scripts = [
      { name: 'Diagnóstico', cmd: 'npx tsx scripts/diagnostico.mjs' },
      { name: 'Limpar Errados', cmd: 'npx tsx scripts/limpar-itinerarios-errados.mjs' },
      { name: 'Logos', cmd: 'npx tsx scripts/update-company-logos.mjs' },
      { name: 'Fotos', cmd: 'npx tsx scripts/update-all-ship-images.mjs' },
      { name: 'Itinerários', cmd: 'npx tsx scripts/generate-all-itineraries.mjs' }
    ];

    for (const script of scripts) {
      try {
        res.write(`\n📋 Executando: ${script.name}\n`);
        res.write('='.repeat(50) + '\n');
        
        const { stdout, stderr } = await execAsync(script.cmd, { 
          cwd: process.cwd(),
          maxBuffer: 10 * 1024 * 1024 
        });
        
        res.write(stdout + '\n');
        if (stderr) res.write('⚠️ Warnings: ' + stderr + '\n');
        res.write(`✅ ${script.name} concluído!\n\n`);
        
      } catch (error: any) {
        res.write(`❌ Erro em ${script.name}: ${error.message}\n\n`);
      }
    }

    res.write('\n🎉 População de dados concluída!\n');
    res.write('\n✅ Acesse: https://dockly-cruise-mapper-production.up.railway.app\n');
    res.end();
  });

  // Endpoint de diagnóstico rápido
  app.get('/admin/diagnostic/:secret', async (req, res) => {
    const { secret } = req.params;
    
    if (secret !== 'setup-dockly-2025') {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    try {
      const { stdout } = await execAsync('npx tsx scripts/diagnostico.mjs');
      res.type('text').send(stdout);
    } catch (error: any) {
      res.status(500).send(`Erro: ${error.message}`);
    }
  });

  // ==========================================
  // FIM DOS ENDPOINTS DE SETUP
  // ==========================================

  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
