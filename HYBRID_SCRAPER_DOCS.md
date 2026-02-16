# Sistema de Scraping - Documentacao

## Visao Geral

O sistema coleta dados reais de itinerarios de cruzeiros do **CruiseMapper** (fonte primaria), enriquecendo
os portos com coordenadas geograficas via **OpenStreetMap Nominatim**.

---

## Arquitetura

```
CruiseMapper (fonte real)
    |
HybridScraperOrchestrator
    |
PortAPIClient (enriquece com lat/lng via Nominatim)
    |
Banco de dados (MySQL via Drizzle ORM)
```

---

## 1. CruiseMapperScraper (cruisemapper-scraper.ts) -- NOVO

Raspa dados diretamente do CruiseMapper (https://www.cruisemapper.com), que agrega itinerarios
de todas as principais companhias de cruzeiro.

### URLs utilizadas

- Lista de navios por companhia: /cruise-lines/[Company-Name]-[ID]
- Itinerarios de um navio: /ships/[Ship-Name]-[ID]

### Mapeamento de Companhias

```typescript
const COMPANY_CRUISEMAPPER_MAP = {
  'Royal Caribbean':      'Royal-Caribbean-1',
  'Carnival Cruise Line': 'Carnival-Cruise-Line-9',
  'MSC Cruises':          'MSC-Cruises-13',
  'Norwegian Cruise Line':'Norwegian-Cruise-Line-15',
  'Disney Cruise Line':   'Disney-Cruise-Line-5',
  'Celebrity Cruises':    'Celebrity-Cruises-4',
};
```

### Uso via tRPC (Admin Dashboard)

```typescript
// Scraping de uma empresa completa (salva no banco)
await trpc.admin.scrapeCompany.mutate({
  companyName: 'Royal Caribbean',
  companyId: 1,
  maxShips: 30,
});

// Scraping de navio especifico por slug exato do CruiseMapper
await trpc.admin.scrapeShipBySlug.mutate({
  cruisemapperSlug: 'Harmony-Of-The-Seas-1067',
  shipId: 42,
});

// Scraping de itinerarios (retorna sem salvar no banco)
await trpc.hybridScraper.scrapeByExactSlug.mutate({
  cruisemapperSlug: 'Harmony-Of-The-Seas-1067',
  shipName: 'Harmony of the Seas',
});
```

---

## 2. PortAPIClient

Enriquece dados de portos com coordenadas geograficas via OpenStreetMap Nominatim.

- Cache em memoria: evita chamadas repetidas para o mesmo porto
- Rate limiting: 1 requisicao/segundo (limite do Nominatim)
- Dias de navegacao: identificados e pulados automaticamente

---

## 3. Scheduler (scheduler.ts)

| Job | Horario | Acao |
|-----|---------|------|
| daily-scraping | 03:00 todos os dias | Scraping via CruiseMapper |
| weekly-pdf-check | 04:00 domingos | Verificacao de PDFs (a implementar) |

Retry automatico apos 1 hora em caso de falha.

---

## 4. Como encontrar o slug de um navio

O slug do CruiseMapper segue o padrao Nome-Do-Navio-ID. Para encontra-lo:

1. Acesse https://www.cruisemapper.com/ships
2. Filtre pela companhia desejada
3. Clique no navio
4. A URL sera: https://www.cruisemapper.com/ships/Harmony-Of-The-Seas-1067
5. O slug e: Harmony-Of-The-Seas-1067

---

## 5. Fontes

| Fonte | Status | Notas |
|-------|--------|-------|
| CruiseMapper | IMPLEMENTADO | Fonte primaria real |
| Nominatim (coordenadas) | IMPLEMENTADO | Enriquecimento de portos |
| PDFs das companhias | Estrutura pronta | MSC e Costa publicam PDFs |
| MarineTraffic AIS | Estrutura pronta | Requer API key paga |
| Puppeteer (sites com JS) | Implementado | Fallback para RC/Carnival |
