import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams, useLocation } from "wouter";
import { Ship as ShipIcon, ArrowLeft, Users, Calendar, Anchor, MapPin, Clock, Download } from "lucide-react";
import { exportItineraryToPDF } from "@/lib/pdfExport";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";
import { ItineraryMap } from "@/components/ItineraryMap";

export default function Ship() {
  const params = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const slug = params.slug || "";

  const { data: ship, isLoading: shipLoading } = trpc.ships.getBySlug.useQuery({ slug });
  const { data: itineraries, isLoading: itinerariesLoading } = trpc.itineraries.listByShip.useQuery(
    { shipId: ship?.id || 0 },
    { enabled: !!ship?.id }
  );

  // Group itineraries by month
  const itinerariesByMonth = useMemo(() => {
    if (!itineraries) return {};
    
    const grouped: Record<string, typeof itineraries> = {};
    
    itineraries.forEach((itinerary) => {
      const date = new Date(itinerary.startDate);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
      
      if (!grouped[monthKey]) {
        grouped[monthKey] = [];
      }
      grouped[monthKey].push(itinerary);
    });
    
    return grouped;
  }, [itineraries]);

  const monthKeys = Object.keys(itinerariesByMonth).sort();

  if (shipLoading) {
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

  if (!ship) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="bg-card border-border max-w-md">
          <CardContent className="py-12 text-center">
            <ShipIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-foreground font-semibold mb-2">Navio não encontrado</p>
            <p className="text-muted-foreground mb-6">O navio que você procura não existe.</p>
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
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <Anchor className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">{ship.name}</h1>
                <p className="text-sm text-muted-foreground">Detalhes e Itinerários</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Ship Details */}
      <div className="container py-8">
        {ship.imageUrl && (
          <div className="mb-8 rounded-lg overflow-hidden max-h-96">
            <img 
              src={ship.imageUrl} 
              alt={ship.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <Card className="bg-card border-border mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Informações do Navio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {ship.yearBuilt && (
                <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Ano de Construção</p>
                    <p className="text-lg font-semibold text-foreground">{ship.yearBuilt}</p>
                  </div>
                </div>
              )}
              {ship.passengerCapacity && (
                <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Capacidade</p>
                    <p className="text-lg font-semibold text-foreground">{ship.passengerCapacity.toLocaleString()}</p>
                  </div>
                </div>
              )}
              {ship.tonnage && (
                <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
                  <ShipIcon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Tonelagem</p>
                    <p className="text-lg font-semibold text-foreground">{ship.tonnage.toLocaleString()} GT</p>
                  </div>
                </div>
              )}
              {ship.length && (
                <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
                  <ShipIcon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Comprimento</p>
                    <p className="text-lg font-semibold text-foreground">{ship.length} m</p>
                  </div>
                </div>
              )}
            </div>
            {ship.description && (
              <div className="mt-6">
                <p className="text-muted-foreground">{ship.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Itineraries by Month */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-6">Itinerários</h2>
          
          {itinerariesLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="bg-card border-border">
                  <CardHeader>
                    <div className="h-6 bg-muted animate-pulse rounded w-48 mb-2" />
                    <div className="h-4 bg-muted animate-pulse rounded w-64" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : monthKeys.length > 0 ? (
            <Tabs defaultValue={monthKeys[0]} className="w-full">
              <TabsList className="mb-6 flex-wrap h-auto bg-card border border-border">
                {monthKeys.map((monthKey) => {
                  const date = new Date(monthKey + '-01');
                  const monthName = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
                  return (
                    <TabsTrigger key={monthKey} value={monthKey} className="capitalize">
                      {monthName}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {monthKeys.map((monthKey) => (
                <TabsContent key={monthKey} value={monthKey} className="space-y-6">
                  {itinerariesByMonth[monthKey]?.map((itinerary) => (
                    <Card key={itinerary.id} className="bg-card border-border">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-xl text-foreground mb-2">{itinerary.name}</CardTitle>
                            <CardDescription className="text-muted-foreground">
                              {itinerary.description}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Badge variant="secondary">
                              {itinerary.duration} dias
                            </Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2"
                              onClick={() => {
                                try {
                                  exportItineraryToPDF({
                                    ship: {
                                      name: ship.name,
                                      passengerCapacity: ship.passengerCapacity || 0,
                                      yearBuilt: ship.yearBuilt || 0,
                                      tonnage: ship.tonnage || 0,
                                    },
                                    company: {
                                      name: ship.company?.name || 'Companhia Desconhecida',
                                    },
                                    itinerary: {
                                      name: itinerary.name,
                                      duration: itinerary.duration,
                                      startDate: itinerary.startDate.toISOString().split('T')[0],
                                      endDate: itinerary.endDate.toISOString().split('T')[0],
                                      description: itinerary.description,
                                    },
                                    stops: itinerary.stops.map(stop => ({
                                      dayNumber: stop.dayNumber,
                                      arrivalTime: stop.arrivalTime,
                                      departureTime: stop.departureTime,
                                      port: {
                                        name: stop.port?.name || 'Porto Desconhecido',
                                        city: stop.port?.city || null,
                                        country: stop.port?.country || null,
                                        latitude: stop.port?.latitude ? parseFloat(stop.port.latitude) : null,
                                        longitude: stop.port?.longitude ? parseFloat(stop.port.longitude) : null,
                                      },
                                    })),
                                  });
                                  toast.success('PDF gerado com sucesso!');
                                } catch (error) {
                                  console.error('Erro ao gerar PDF:', error);
                                  toast.error('Erro ao gerar PDF. Tente novamente.');
                                }
                              }}
                            >
                              <Download className="h-4 w-4" />
                              Exportar PDF
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(itinerary.startDate).toLocaleDateString('pt-BR')} - {new Date(itinerary.endDate).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-6">
                          <ItineraryMap
                            ports={itinerary.stops.map(stop => ({
                              name: stop.port?.name || 'Porto Desconhecido',
                              latitude: stop.port?.latitude ? parseFloat(stop.port.latitude) : 0,
                              longitude: stop.port?.longitude ? parseFloat(stop.port.longitude) : 0,
                              city: stop.port?.city || undefined,
                              country: stop.port?.country || undefined,
                            }))}
                            itineraryName={itinerary.name}
                          />
                        </div>
                        <h4 className="text-sm font-semibold text-foreground mb-4">Portos de Escala</h4>
                        <div className="space-y-3">
                          {itinerary.stops.map((stop, index) => (
                            <div key={stop.id} className="flex items-start gap-4 p-3 bg-secondary/30 rounded-lg">
                              <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                                <span className="text-primary font-semibold">Dia {stop.dayNumber}</span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <MapPin className="h-4 w-4 text-primary" />
                                  <h5 className="font-semibold text-foreground">
                                    {stop.port?.name || 'Porto Desconhecido'}
                                  </h5>
                                </div>
                                {stop.port?.city && stop.port?.country && (
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {stop.port.city}, {stop.port.country}
                                  </p>
                                )}
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  {stop.arrivalTime && (
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      <span>Chegada: {stop.arrivalTime}</span>
                                    </div>
                                  )}
                                  {stop.departureTime && (
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      <span>Saída: {stop.departureTime}</span>
                                    </div>
                                  )}
                                </div>
                                {stop.notes && (
                                  <p className="text-sm text-muted-foreground mt-2">{stop.notes}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum itinerário disponível para este navio.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
