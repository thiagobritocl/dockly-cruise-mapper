
import { cn } from "@/lib/utils";
import React from "react";
import { Ship } from "lucide-react";

interface CompanyLogoProps {
  name: string;
  logoUrl?: string | null;
  className?: string;
}

export default function CompanyLogo({ name, logoUrl, className }: CompanyLogoProps) {
  const [imageError, setImageError] = React.useState(false);

  // Se tivermos uma logoUrl do banco de dados e ela não falhou, EXIBIMOS ELA.
  // Isso garante que as logos REAIS que colocamos no banco apareçam.
  if (logoUrl && !imageError) {
    return (
      <div className={cn("relative w-full h-full flex items-center justify-center p-2", className)}>
        <img
          src={logoUrl}
          alt={`${name} logo`}
          className="max-w-full max-h-full object-contain"
          onError={() => {
            console.warn(`Erro ao carregar logo real para ${name}:`, logoUrl);
            setImageError(true);
          }}
        />
      </div>
    );
  }

  // Fallback apenas se a imagem falhar ou não existir
  return (
    <div className={cn("flex flex-col items-center justify-center bg-muted/30 rounded-lg p-4", className)}>
      <Ship className="h-8 w-8 text-muted-foreground mb-1" />
      <span className="text-[10px] font-bold text-muted-foreground text-center uppercase tracking-tighter">
        {name}
      </span>
    </div>
  );
}
