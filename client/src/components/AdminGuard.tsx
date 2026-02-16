import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Anchor, Lock, LogIn, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminGuardProps {
  children: React.ReactNode;
}

/**
 * AdminGuard — protege qualquer conteúdo de admin.
 *
 * Estados possíveis:
 *  1. Carregando sessão     → spinner
 *  2. Não autenticado       → tela de login com link OAuth
 *  3. Autenticado, sem role → tela de acesso negado
 *  4. Admin                 → renderiza children
 */
export default function AdminGuard({ children }: AdminGuardProps) {
  const { user, loading } = useAuth();

  // 1. Carregando
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <Anchor className="h-10 w-10 animate-pulse text-primary" />
          <p className="text-sm">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // 2. Não autenticado
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-card border-border">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Área Restrita</CardTitle>
            <CardDescription>
              Faça login com sua conta para acessar o painel de administração.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pt-4">
            <Button
              size="lg"
              className="w-full gap-2"
              onClick={() => { window.location.href = getLoginUrl(); }}
            >
              <LogIn className="h-5 w-5" />
              Entrar com sua conta
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => { window.location.href = "/"; }}
            >
              Voltar ao site
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 3. Autenticado mas não é admin
  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-card border-border">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <ShieldAlert className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl">Acesso Negado</CardTitle>
            <CardDescription>
              Sua conta <span className="font-medium text-foreground">{user.email || user.name}</span> não
              tem permissão de administrador.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => { window.location.href = "/"; }}
            >
              Voltar ao site
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 4. Admin confirmado — renderiza o conteúdo
  return <>{children}</>;
}
