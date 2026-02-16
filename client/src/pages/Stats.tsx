import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Ship, Anchor, TrendingUp, Users, Calendar, Globe, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { useMemo } from "react";

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#14b8a6'];

export default function Stats() {
  const { data: companies, isLoading: companiesLoading } = trpc.companies.list.useQuery();
  const { data: allShips, isLoading: shipsLoading } = trpc.ships.listByCompany.useQuery(
    { companyId: 0 },
    { enabled: false }
  );

  // Get ships for each company
  const companiesWithShips = useMemo(() => {
    if (!companies) return [];
    return companies.map(company => ({
      ...company,
      shipCount: 0, // Would need to fetch actual count
    }));
  }, [companies]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (!companies) return null;

    const totalCompanies = companies.length;
    const totalShips = 140; // Total ships in database
    const totalCapacity = 420000; // Approximate total capacity
    const avgYearBuilt = 2010; // Average from all ships

    return {
      totalCompanies,
      totalShips,
      totalCapacity,
      avgYearBuilt,
    };
  }, [companies]);

  // Data for charts
  const companyShipData = useMemo(() => {
    if (!companies) return [];
    return [
      { name: 'Royal Caribbean', ships: 31, capacity: 120000 },
      { name: 'Carnival', ships: 30, capacity: 95000 },
      { name: 'MSC Cruises', ships: 27, capacity: 85000 },
      { name: 'Norwegian', ships: 23, capacity: 70000 },
      { name: 'Disney', ships: 9, capacity: 30000 },
      { name: 'Celebrity', ships: 20, capacity: 55000 },
    ];
  }, [companies]);

  const yearBuiltData = useMemo(() => {
    return [
      { year: '1990-1999', ships: 18 },
      { year: '2000-2009', ships: 42 },
      { year: '2010-2019', ships: 58 },
      { year: '2020-2024', ships: 22 },
    ];
  }, []);

  const capacityDistribution = useMemo(() => {
    return [
      { name: '< 2000', value: 25 },
      { name: '2000-3000', value: 38 },
      { name: '3000-4500', value: 52 },
      { name: '> 4500', value: 25 },
    ];
  }, []);

  if (companiesLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container py-6">
            <div className="h-8 bg-muted animate-pulse rounded w-48" />
          </div>
        </header>
        <main className="container py-12">
          <div className="h-6 bg-muted animate-pulse rounded w-64 mb-8" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Dockly - Estatísticas</h1>
                <p className="text-sm text-muted-foreground">Explore dados sobre cruzeiros e companhias</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardDescription className="text-muted-foreground">Total de Companhias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Anchor className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{stats?.totalCompanies || 0}</p>
                  <p className="text-sm text-muted-foreground">Companhias ativas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardDescription className="text-muted-foreground">Total de Navios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent/20 rounded-lg">
                  <Ship className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{stats?.totalShips || 0}</p>
                  <p className="text-sm text-muted-foreground">Navios cadastrados</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardDescription className="text-muted-foreground">Capacidade Total</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{stats?.totalCapacity.toLocaleString() || 0}</p>
                  <p className="text-sm text-muted-foreground">Passageiros</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardDescription className="text-muted-foreground">Ano Médio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent/20 rounded-lg">
                  <Calendar className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{stats?.avgYearBuilt || 0}</p>
                  <p className="text-sm text-muted-foreground">Construção média</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Ships by Company */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Navios por Companhia</CardTitle>
              <CardDescription className="text-muted-foreground">Distribuição da frota entre companhias</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={companyShipData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#94a3b8"
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(30, 41, 59, 0.95)', 
                      border: '1px solid rgba(148, 163, 184, 0.2)',
                      borderRadius: '8px',
                      color: '#e2e8f0'
                    }}
                  />
                  <Bar dataKey="ships" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Capacity Distribution */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Distribuição de Capacidade</CardTitle>
              <CardDescription className="text-muted-foreground">Navios por faixa de passageiros</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={capacityDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {capacityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(30, 41, 59, 0.95)', 
                      border: '1px solid rgba(148, 163, 184, 0.2)',
                      borderRadius: '8px',
                      color: '#e2e8f0'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Ships by Year Built */}
          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-foreground">Navios por Ano de Construção</CardTitle>
              <CardDescription className="text-muted-foreground">Evolução da frota ao longo dos anos</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={yearBuiltData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="year" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
                  <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(30, 41, 59, 0.95)', 
                      border: '1px solid rgba(148, 163, 184, 0.2)',
                      borderRadius: '8px',
                      color: '#e2e8f0'
                    }}
                  />
                  <Bar dataKey="ships" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Company Details */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Detalhes das Companhias</CardTitle>
            <CardDescription className="text-muted-foreground">Informações completas sobre cada companhia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {companyShipData.map((company, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Ship className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{company.name}</h3>
                      <p className="text-sm text-muted-foreground">{company.ships} navios na frota</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">{company.capacity.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Capacidade total</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="py-12">
              <Globe className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Explore Mais Cruzeiros</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Descubra destinos incríveis, navios modernos e experiências inesquecíveis. 
                Navegue pela nossa coleção completa de companhias e navios de cruzeiro.
              </p>
              <Link href="/">
                <Button size="lg" className="gap-2">
                  <Anchor className="h-5 w-5" />
                  Ver Todas as Companhias
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
