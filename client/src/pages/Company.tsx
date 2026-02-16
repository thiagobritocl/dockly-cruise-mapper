import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useParams, useLocation } from "wouter";
import { Ship, Anchor, ArrowLeft, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Company() {
  const params = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const slug = params.slug || "";

  const { data: company, isLoading: companyLoading } = trpc.companies.getBySlug.useQuery({ slug });
  const { data: ships, isLoading: shipsLoading } = trpc.ships.listByCompany.useQuery(
    { companyId: company?.id || 0 },
    { enabled: !!company?.id }
  );

  const isLoading = companyLoading || shipsLoading;

  if (companyLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container py-6">
            <div className="h-8 bg-muted animate-pulse rounded w-48" />
          </div>
        </header>
        <main className="container py-12">
          <div className="h-6 bg-muted animate-pulse rounded w-64 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-card border-border">
                <div className="h-48 bg-muted animate-pulse" />
                <CardHeader>
                  <div className="h-6 bg-muted animate-pulse rounded mb-2" />
                  <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                </CardHeader>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="bg-card border-border max-w-md">
          <CardContent className="py-12 text-center">
            <Ship className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-foreground font-semibold mb-2">Companhia não encontrada</p>
            <p className="text-muted-foreground mb-6">A companhia que você procura não existe.</p>
            <Button onClick={() => setLocation("/")} variant="default">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para início
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setLocation("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              {company.logoUrl ? (
                <img 
                  src={company.logoUrl} 
                  alt={company.name}
                  className="h-10 w-10 object-contain rounded"
                />
              ) : (
                <Anchor className="h-8 w-8 text-primary" />
              )}
              <div>
                <h1 className="text-2xl font-bold text-foreground">{company.name}</h1>
                {company.description && (
                  <p className="text-sm text-muted-foreground">{company.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Frota de Navios</h2>
          <p className="text-muted-foreground">Selecione um navio para ver seus itinerários</p>
        </div>

        {shipsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-card border-border">
                <div className="h-48 bg-muted animate-pulse" />
                <CardHeader>
                  <div className="h-6 bg-muted animate-pulse rounded mb-2" />
                  <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : ships && ships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ships.map((ship) => {
              // Forçar URL absoluta para evitar problemas de base path em produção
              const imageUrl = ship.imageUrl?.startsWith('/') 
                ? `${window.location.origin}${ship.imageUrl}`
                : ship.imageUrl;

              return (
                <Link key={ship.id} href={`/ship/${ship.slug}`}>
                  <Card className="bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer h-full overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative overflow-hidden">
                      {imageUrl ? (
                        <img 
                          src={`${imageUrl}?v=${Date.now()}`} 
                          alt={ship.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            // Fallback se a imagem falhar
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80';
                          }}
                        />
                      ) : (
                        <Ship className="h-16 w-16 text-primary/50" />
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-foreground">{ship.name}</CardTitle>
                      {ship.yearBuilt && (
                        <CardDescription className="text-muted-foreground">
                          Construído em {ship.yearBuilt}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {ship.passengerCapacity && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{ship.passengerCapacity.toLocaleString()} passageiros</span>
                        </div>
                      )}
                      {ship.tonnage && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Anchor className="h-4 w-4" />
                          <span>{ship.tonnage.toLocaleString()} GT</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <Card className="bg-card border-border">
            <CardContent className="py-12 text-center">
              <Ship className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum navio disponível para esta companhia.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
