import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Ship, Anchor, TrendingUp } from "lucide-react";
import CompanyLogo from "@/components/CompanyLogo";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: companies, isLoading } = trpc.companies.list.useQuery();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Anchor className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">Dockly</h1>
                <p className="text-sm text-muted-foreground">Seu guia completo de cruzeiros</p>
              </div>
            </div>
            <Link href="/stats">
              <Button variant="outline" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Estatísticas
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Companhias de Cruzeiro</h2>
          <p className="text-muted-foreground">Selecione uma companhia para explorar sua frota de navios</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-card border-border">
                <CardHeader className="space-y-3">
                  <div className="h-6 bg-muted animate-pulse rounded" />
                  <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : companies && companies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <Link key={company.id} href={`/company/${company.slug}`}>
                <Card className="bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer h-full overflow-hidden">
                  <div className="h-32 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-6 border-b border-border overflow-hidden group">
                    <CompanyLogo
                      name={company.name}
                      logoUrl={company.logoUrl}
                      className="w-full max-h-20 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">{company.name}</CardTitle>
                    {company.description && (
                      <CardDescription className="text-muted-foreground line-clamp-3">
                        {company.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-primary font-medium">
                      <Ship className="h-4 w-4" />
                      <span>Ver navios</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="bg-card border-border">
            <CardContent className="py-12 text-center">
              <Ship className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhuma companhia de cruzeiro disponível no momento.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
