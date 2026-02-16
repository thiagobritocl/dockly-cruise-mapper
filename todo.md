# Cruise Mapper - TODO

## Banco de Dados
- [x] Criar tabela de companhias de cruzeiro
- [x] Criar tabela de navios
- [x] Criar tabela de portos
- [x] Criar tabela de itinerários
- [x] Criar tabela de escalas (porto + horário)
- [x] Adicionar dados iniciais de companhias principais

## Design System
- [x] Configurar tema dark no ThemeProvider
- [x] Definir paleta de cores escuras no index.css
- [x] Configurar tipografia limpa e moderna
- [x] Adicionar fonte Google Fonts

## Páginas e Navegação
- [x] Página inicial com cards de companhias em grid responsivo
- [x] Página de companhia mostrando navios
- [x] Página de navio com detalhes e itinerários
- [x] Navegação clara entre páginas

## Funcionalidades de Itinerários
- [x] Organizar itinerários por mês
- [x] Exibir horários de saída de cada porto
- [x] Criar componente de timeline para visualização

## Mapas Interativos
- [x] Integrar Google Maps
- [x] Exibir rota do itinerário no mapa
- [x] Marcar portos no mapa

## Web Scraping
- [x] Criar sistema de scraping para Cruisemapper
- [x] Agendar atualização automática de itinerários
- [x] Criar procedimento tRPC para scraping

## Página Web Estática
- [x] Criar página interativa de apresentação dos resultados
- [x] Adicionar gráficos e visualizações
- [x] Implementar design moderno e profissional

## Testes
- [x] Escrever testes para procedimentos tRPC
- [x] Testar navegação entre páginas
- [x] Validar web scraping

## Expansão de Dados
- [x] Adicionar mais navios para cada companhia (frota completa)
- [x] Criar itinerários para todos os navios
- [x] Adicionar variedade de destinos (Caribe, Mediterrâneo, Alaska, etc)

## Melhorias Solicitadas
- [x] Mudar logo e nome para "Dockly"
- [x] Adicionar TODOS os navios reais de cada companhia
- [x] Expandir frota completa (Royal Caribbean 31 navios, Carnival 30 navios, MSC 27, Norwegian 23, Disney 9, Celebrity 20)

## Correções e Melhorias
- [x] Gerar itinerários para todos os 140 navios (280 itinerários totais)
- [x] Atualizar estatísticas com números corretos (140 navios)
- [x] Corrigir mapa para não mostrar marcadores em dias de navegação

## Bugs a Corrigir
- [x] Corrigir erro "setMap: not an instance of Map" no ItineraryMap
- [x] Corrigir erro "not a LatLngBounds" no Google Maps
- [x] Resolver múltiplas cargas da API do Google Maps

## Exportação de Itinerário para PDF
- [x] Criar utilitário para gerar PDF do itinerário
- [x] Incluir detalhes do navio (nome, capacidade, ano)
- [x] Incluir lista de portos com horários
- [x] Design profissional com cores e layout organizado
- [x] Adicionar botão de download na página do navio

## Integração de Imagens dos Navios
- [x] Integrar API do Unsplash para buscar fotos
- [x] Criar endpoint tRPC para buscar imagens por nome do navio
- [x] Adicionar imagens nos cards de navios com loading progressivo
- [x] Adicionar imagem de destaque na página de detalhes
- [x] Implementar cache de 24 horas nas queries
- [x] Adicionar crédito do fotógrafo do Unsplash

## Sistema Híbrido de Scraping
- [x] Remover integração do Unsplash
- [x] Criar scraper para sites oficiais das companhias (estrutura pronta)
- [x] Implementar parser de PDFs de itinerários (estrutura pronta)
- [x] Integrar APIs abertas de portos (OpenStreetMap Nominatim)
- [x] Conectar com provedores AIS para rastreamento (estrutura pronta)
- [x] Criar sistema de priorização de fontes (orchestrator)
- [x] Implementar cache e atualização automática
- [x] Adicionar logs de scraping e tratamento de erros
- [x] Criar endpoints tRPC para scraping híbrido
- [x] Testes vitest implementados

## Dashboard de Administração
- [x] Criar página /admin com autenticação de admin
- [x] Interface para executar scraping manual por companhia/navio
- [x] Visualização de logs de scraping (sucesso/erro/tempo)
- [x] Monitoramento de taxa de atualização de dados
- [x] Gerenciamento de fontes de dados ativas/inativas
- [x] Estatísticas de cobertura (navios com/sem itinerários)
- [x] Histórico de atualizações

## Agendamento Automático
- [x] Implementar cron jobs para scraping diário (03:00)
- [x] Configurar atualização de sites oficiais (diário)
- [x] Configurar atualização de PDFs (semanal - domingos 04:00)
- [x] Sistema de retry automático em caso de falha (1 hora)
- [x] Logs de execuções com timestamps
- [x] Execução manual via admin dashboard

## Integração Puppeteer
- [x] Configurar Puppeteer com Chromium headless
- [x] Implementar scraping de sites com JavaScript (Royal Caribbean, Carnival)
- [x] Bypass de proteções anti-bot básicas (webdriver, plugins, viewport)
- [x] Screenshots de páginas para debug (opcional)
- [x] Pool de browsers para performance (máx 3)
- [x] Tratamento de timeouts e erros com retry
- [x] Endpoint tRPC admin.puppeteerScrape

## Fotos dos Navios e Correções
- [x] Remover MSC World Europa duplicado do banco de dados
- [x] Criar scraper do Wikipedia para buscar imagens de navios
- [x] Adicionar coluna imageUrl no schema de navios
- [x] Popular banco de dados com URLs de fotos do Wikipedia (125 imagens, 100% sucesso)
- [x] Atualizar cards de navios para exibir fotos (com hover e lazy loading)
- [x] Atualizar página de detalhes do navio com foto de destaque

## Correção de Deploy
- [x] Corrigir campo packageManager no package.json (já está correto: pnpm@10.4.1)

## Logos das Companhias
- [x] Buscar logos oficiais das 6 companhias (todos em CDN)
- [x] Atualizar campo logoUrl no banco de dados
- [x] Atualizar cards da página inicial para exibir logos (banner destacado com 24px, hover scale)
