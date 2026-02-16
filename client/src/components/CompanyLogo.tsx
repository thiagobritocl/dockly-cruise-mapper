
import React from "react";
import { Ship } from "lucide-react";

interface CompanyLogoProps {
  name: string;
  logoUrl?: string | null;
  className?: string;
}

/**
 * Logos SVG inline das 6 principais companhias de cruzeiro.
 * 100% offline, sem dependência de CDN.
 * Cores e formas baseadas nas identidades visuais oficiais.
 */

function RoyalCaribbeanLogo() {
  return (
    <svg viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <g fill="#003087">
        <polygon points="10,58 17,30 24,46 31,14 38,46 45,30 52,58" />
        <rect x="8" y="60" width="46" height="6" rx="2"/>
        <rect x="8" y="68" width="46" height="4" rx="1"/>
      </g>
      <text x="64" y="38" fontFamily="Times New Roman, serif" fontSize="20" fontWeight="700"
        fill="#003087" letterSpacing="3">ROYAL</text>
      <rect x="64" y="42" width="208" height="1.5" fill="#0066CC"/>
      <text x="64" y="56" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="400"
        fill="#003087" letterSpacing="2.5">CARIBBEAN</text>
      <text x="64" y="70" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="300"
        fill="#0066CC" letterSpacing="3">INTERNATIONAL</text>
    </svg>
  );
}

function CarnivalLogo() {
  return (
    <svg viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="10" y="46" width="44" height="22" rx="3" fill="#E30613"/>
      <rect x="18" y="28" width="28" height="20" rx="2" fill="#FFFFFF" stroke="#E30613" strokeWidth="2"/>
      <rect x="24" y="12" width="16" height="18" rx="2" fill="#E30613"/>
      <rect x="10" y="46" width="44" height="5" fill="#003087"/>
      <rect x="10" y="55" width="44" height="5" fill="#003087"/>
      <text x="66" y="42" fontFamily="Arial Black, sans-serif" fontSize="24" fontWeight="900"
        fill="#E30613" letterSpacing="0.5">CARNIVAL</text>
      <rect x="66" y="46" width="196" height="2" fill="#003087"/>
      <text x="66" y="62" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="400"
        fill="#003087" letterSpacing="5">CRUISE LINE</text>
    </svg>
  );
}

function MSCLogo() {
  return (
    <svg viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="8" y="8" width="64" height="64" rx="4" fill="#003087"/>
      <text x="40" y="52" fontFamily="Arial Black, sans-serif" fontSize="28" fontWeight="900"
        fill="#FFFFFF" textAnchor="middle" letterSpacing="1">MSC</text>
      <text x="86" y="46" fontFamily="Arial Black, sans-serif" fontSize="36" fontWeight="900"
        fill="#003087" letterSpacing="2">MSC</text>
      <text x="88" y="64" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="400"
        fill="#003087" letterSpacing="6">CRUISES</text>
    </svg>
  );
}

function NorwegianLogo() {
  return (
    <svg viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="38" cy="40" r="30" fill="#003087"/>
      <path d="M14 42 Q22 32 30 40 Q38 48 46 38 Q50 33 62 36"
        stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M14 52 Q22 42 30 50 Q38 58 46 48 Q50 43 62 46"
        stroke="#7FB3D3" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <text x="38" y="30" fontFamily="Arial Black, sans-serif" fontSize="14" fontWeight="900"
        fill="#FFFFFF" textAnchor="middle" letterSpacing="1">NCL</text>
      <text x="82" y="34" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="700"
        fill="#003087" letterSpacing="1.5">NORWEGIAN</text>
      <rect x="82" y="38" width="188" height="1.5" fill="#003087"/>
      <text x="82" y="54" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="400"
        fill="#003087" letterSpacing="3.5">CRUISE LINE</text>
    </svg>
  );
}

function DisneyLogo() {
  return (
    <svg viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M38 8 L62 12 L68 50 Q38 72 8 50 L14 12 Z" fill="#003087"/>
      <circle cx="28" cy="22" r="9" fill="#000000"/>
      <circle cx="48" cy="22" r="9" fill="#000000"/>
      <ellipse cx="38" cy="42" rx="18" ry="16" fill="#000000"/>
      <polygon points="38,30 40,36 46,36 41,40 43,46 38,42 33,46 35,40 30,36 36,36"
        fill="#FFD700"/>
      <text x="80" y="34" fontFamily="Georgia, Times New Roman, serif" fontSize="26" fontWeight="700"
        fill="#003087" letterSpacing="1">Disney</text>
      <rect x="80" y="38" width="185" height="1.5" fill="#FFD700"/>
      <text x="80" y="56" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="400"
        fill="#003087" letterSpacing="4">CRUISE LINE</text>
    </svg>
  );
}

function CelebrityLogo() {
  return (
    <svg viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="40" cy="40" r="30" fill="none" stroke="#1A1A1A" strokeWidth="1.5"/>
      <text x="40" y="55" fontFamily="Georgia, serif" fontSize="44" fontWeight="300"
        fill="#1A1A1A" textAnchor="middle">X</text>
      <line x1="18" y1="40" x2="62" y2="40" stroke="#1A1A1A" strokeWidth="0.8"/>
      <text x="82" y="32" fontFamily="Georgia, Times New Roman, serif" fontSize="18" fontWeight="700"
        fill="#1A1A1A" letterSpacing="2.5">CELEBRITY</text>
      <rect x="82" y="36" width="180" height="1" fill="#1A1A1A"/>
      <text x="82" y="54" fontFamily="Georgia, Times New Roman, serif" fontSize="14" fontWeight="300"
        fill="#1A1A1A" letterSpacing="5">CRUISES</text>
    </svg>
  );
}

const LOGO_COMPONENTS: Record<string, React.ReactNode> = {
  "Royal Caribbean": <RoyalCaribbeanLogo />,
  "Carnival Cruise Line": <CarnivalLogo />,
  "MSC Cruises": <MSCLogo />,
  "Norwegian Cruise Line": <NorwegianLogo />,
  "Disney Cruise Line": <DisneyLogo />,
  "Celebrity Cruises": <CelebrityLogo />,
};

export default function CompanyLogo({ name, logoUrl, className = "" }: CompanyLogoProps) {
  const [imageError, setImageError] = React.useState(false);
  const inlineLogo = LOGO_COMPONENTS[name];

  // Se tiver URL de logo no banco e não houver erro, tenta exibir
  // Prioridade absoluta para a imagem real se disponível
  if (logoUrl && !imageError) {
    return (
      <img
        src={logoUrl}
        alt={`${name} logo`}
        className={`w-full h-full object-contain ${className}`}
        loading="lazy"
        onError={() => {
          console.warn(`Failed to load logo for ${name}:`, logoUrl);
          setImageError(true);
        }}
      />
    );
  }

  // SVG inline como fallback para as 6 principais
  if (inlineLogo) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        {inlineLogo}
      </div>
    );
  }

  // Fallback genérico para companhias não mapeadas
  return (
    <div className={`w-full h-full flex items-center justify-center bg-muted rounded-lg p-4 ${className}`}>
      <div className="text-center">
        <Ship className="h-12 w-12 text-primary mx-auto mb-2" />
        <p className="text-xs text-muted-foreground font-semibold">{name}</p>
      </div>
    </div>
  );
}
