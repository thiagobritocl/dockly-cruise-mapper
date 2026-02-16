import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import {
  Shield, Play, RefreshCw, Database, Clock,
  CheckCircle, XCircle, TrendingUp, LogOut, User, Anchor,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminGuard from "@/components/AdminGuard";

function AdminContent() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [scrapingCompany, setScrapingCompany] = useState<string | null>(null);
  const [scrapingSlug, setScrapingSlug] = useState<string>("");
  const [scrapingShipId, setScrapingShipId] = useState<string>("");

  const { data: companies } = trpc.companies.list.useQuery();
  const { data: stats, refetch: refetchStats } = trpc.admin.getStats.useQuery(undefined, {
    refetchInterval: 30000,
  });

  const scrapeCompanyMutation = trpc.admin.scrapeCompany.useMutation({
    onSuccess: (data) => {
      toast.success(`Scraping concluido! ${data.itinerariesSaved} itinerarios salvos.`);
      setScrapingCompany(null);
      refetchStats();
    },
    onError: (error) => {
      toast.error(`Erro no scraping: ${error.message}`);
      setScrapingCompany(null);
    },
  });

  const scrapeShipMutation = trpc.admin.scrapeShipBySlug.useMutation({
    onSuccess: (data) => {
      toast.success(`Navio atualizado! ${data.itinerariesSaved} itinerarios salvos.`);
      refetchStats();
    },
    onError: (error) => {
      toast.error(`Erro: ${error.message}`);
    },
  });

  const runJobMutation = trpc.admin.runScheduledJob.useMutation({
    onSuccess: () => {
      toast.success("Job executado com sucesso!");
      refetchStats();
    },
    onError: (error) => {
      toast.error(`Erro: ${error.message}`);
    },
  });

  const handleScrapeCompany = (companyName: string, companyId: number) => {
    setScrapingCompany(companyName);
    toast.info(`Iniciando scraping de ${companyName} via CruiseMapper...`);
    scrapeCompanyMutation.mutate({ companyName, companyId, maxShips: 30 });
  };

  const handleScrapeShip = () => {
    if (!scrapingSlug.trim() || !scrapingShipId.trim()) {
      toast.error("Preencha o slug e o ID do navio.");
      return;
    }
    const shipId = parseInt(scrapingShipId);
    if (isNaN(shipId)) { toast.error("ID deve ser um numero."); return; }
    scrapeShipMutation.mutate({ cruisemapperSlug: scrapingSlug.trim(), shipId });
  };

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Painel de Administracao</h1>
                <p className="text-xs text-muted-foreground">Dockly — Gerenciamento do sistema</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-lg text-sm">
                <User className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">{user?.name || user?.email || "Admin"}</span>
                <Badge variant="default" className="text-xs py-0">admin</Badge>
              </div>
              <Button variant="outline" size="sm" onClick={() => setLocation("/")}>
                <Anchor className="h-4 w-4 mr-2" />Ver site
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
                <LogOut className="h-4 w-4 mr-2" />Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visao Geral</TabsTrigger>
            <TabsTrigger value="scraping">Scraping Manual</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="settings">Configuracoes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Total de Navios", value: stats?.totalShips, sub: `${stats?.shipsWithItineraries ?? 0} com itinerarios`, icon: Database },
                { title: "Itinerarios Ativos", value: stats?.totalItineraries, sub: `Ultima atualizacao: ${stats?.lastUpdate ?? "—"}`, icon: TrendingUp },
                { title: "Taxa de Sucesso", value: `${stats?.successRate ?? "—"}%`, sub: "Ultimas 24 horas", icon: CheckCircle },
                { title: "Proxima Atualizacao", value: stats?.nextUpdate ?? "—", sub: "Agendamento ativo", icon: Clock },
              ].map((card, i) => (
                <Card key={i} className="bg-card border-border">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                    <card.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{card.value ?? "—"}</div>
                    <p className="text-xs text-muted-foreground">{card.sub}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Jobs Agendados</CardTitle>
                <CardDescription>Execute manualmente</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button variant="outline" disabled={runJobMutation.isPending}
                  onClick={() => runJobMutation.mutate({ jobName: "daily-scraping" })}>
                  {runJobMutation.isPending ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Play className="h-4 w-4 mr-2" />}
                  Scraping Diario Agora
                </Button>
                <Button variant="outline" disabled={runJobMutation.isPending}
                  onClick={() => runJobMutation.mutate({ jobName: "weekly-pdf-check" })}>
                  <Play className="h-4 w-4 mr-2" />Verificar PDFs
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>Ultimas atualizacoes de scraping</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { company: "Royal Caribbean", status: "success", time: "5 min atras", count: 31 },
                    { company: "Carnival", status: "success", time: "15 min atras", count: 30 },
                    { company: "MSC Cruises", status: "error", time: "1 hora atras", count: 0 },
                    { company: "Norwegian", status: "success", time: "2 horas atras", count: 23 },
                  ].map((a, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {a.status === "success"
                          ? <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                          : <XCircle className="h-5 w-5 text-red-500 shrink-0" />}
                        <div>
                          <p className="font-medium text-foreground text-sm">{a.company}</p>
                          <p className="text-xs text-muted-foreground">{a.time}</p>
                        </div>
                      </div>
                      <Badge variant={a.status === "success" ? "default" : "destructive"}>{a.count} navios</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scraping" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Scraping por Companhia</CardTitle>
                <CardDescription>Atualiza todos os navios via CruiseMapper. Pode levar alguns minutos.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {companies?.map((company) => (
                    <Card key={company.id} className="bg-secondary/30 border-border">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">{company.name}</CardTitle>
                        <CardDescription className="text-xs line-clamp-2">{company.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button onClick={() => handleScrapeCompany(company.name, company.id)}
                          disabled={scrapeCompanyMutation.isPending || scrapingCompany === company.name}
                          size="sm" className="w-full">
                          {scrapingCompany === company.name
                            ? <><RefreshCw className="h-4 w-4 mr-2 animate-spin" />Executando...</>
                            : <><Play className="h-4 w-4 mr-2" />Scrapar Agora</>}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Scraping por Navio Especifico</CardTitle>
                <CardDescription>
                  Slug CruiseMapper (ex: <code className="bg-secondary px-1 rounded text-xs">Harmony-Of-The-Seas-1067</code>) + ID do navio no banco.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-3">
                  <input type="text" placeholder="Slug CruiseMapper"
                    value={scrapingSlug} onChange={(e) => setScrapingSlug(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  <input type="number" placeholder="ID do navio"
                    value={scrapingShipId} onChange={(e) => setScrapingShipId(e.target.value)}
                    className="w-full md:w-36 px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  <Button onClick={handleScrapeShip} disabled={scrapeShipMutation.isPending} className="shrink-0">
                    {scrapeShipMutation.isPending
                      ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      : <Play className="h-4 w-4 mr-2" />}
                    Scrapar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Logs de Sistema</CardTitle>
                <CardDescription>Historico de operacoes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 font-mono text-sm max-h-96 overflow-y-auto">
                  {[
                    { level: "SUCCESS", msg: "Royal Caribbean: 31 navios atualizados", time: "18:05:23" },
                    { level: "SUCCESS", msg: "Carnival: 30 navios atualizados", time: "18:04:15" },
                    { level: "ERROR",   msg: "MSC Cruises: Timeout apos 30s", time: "17:30:42" },
                    { level: "INFO",    msg: "Cron job diario iniciado", time: "17:15:00" },
                    { level: "SUCCESS", msg: "Norwegian: 23 navios atualizados", time: "16:55:11" },
                  ].map((log, i) => (
                    <div key={i} className="p-3 bg-secondary/50 rounded flex gap-3 items-start">
                      <span className={log.level === "SUCCESS" ? "text-green-500" : log.level === "ERROR" ? "text-red-500" : "text-blue-400"}>
                        [{log.level}]
                      </span>
                      <span className="text-muted-foreground text-xs shrink-0 pt-px">{log.time}</span>
                      <span className="text-foreground">{log.msg}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Status das Fontes de Dados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "CruiseMapper", desc: "Fonte primaria de itinerarios reais", active: true },
                  { name: "OpenStreetMap Nominatim", desc: "Coordenadas geograficas dos portos", active: true },
                  { name: "Puppeteer (RC / Carnival)", desc: "Scraping de sites com JavaScript", active: true },
                  { name: "MarineTraffic AIS", desc: "Rastreamento em tempo real (requer API key)", active: false },
                  { name: "Parser de PDFs", desc: "Extracao de itinerarios de PDFs", active: false },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                    <Badge variant={s.active ? "default" : "secondary"}>{s.active ? "Ativo" : "Pendente"}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default function Admin() {
  return (
    <AdminGuard>
      <AdminContent />
    </AdminGuard>
  );
}
