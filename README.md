# 🚢 Dockly - Cruise Mapper System

Sistema completo de mapeamento de cruzeiros com dados reais e atualizados.

## 🎯 Melhorias Implementadas

### 1. **Logos das Companhias** ✅
- Todos os logos foram atualizados com URLs oficiais das companhias
- 20+ companhias incluindo: Royal Caribbean, Carnival, Norwegian, MSC, Princess, Celebrity, Disney, e mais

### 2. **Fotos dos Navios** ✅
- Imagens reais e oficiais dos navios mais populares
- 30+ navios com fotos de alta qualidade
- Incluindo os navios mais novos: Icon of the Seas, Wonder of the Seas, MSC World Europa, Norwegian Prima

### 3. **Itinerários Reais e Atualizados** ✅
- 10+ itinerários reais programados para 2025-2026
- Rotas autênticas das principais companhias:
  - **Caribe** (Oriental, Ocidental, Sul)
  - **Mediterrâneo** (Ocidental, Ilhas Gregas)
  - **Alasca** (Voyage of the Glaciers)
  - **Fjords Noruegueses**
  - **Transatlântico**
- Coordenadas precisas de 50+ portos
- Horários de chegada e partida realistas

### 4. **Correções de Bugs** ✅
- Melhorias na conexão com banco de dados
- Tratamento de erros aprimorado
- Validação de dados
- Performance otimizada

## 🚀 Como Executar as Melhorias

### Pré-requisitos
```bash
# Instalar dependências
pnpm install

# Configurar banco de dados
cp .env.example .env
# Editar .env com suas credenciais do banco de dados
```

### Executar Scripts de Melhoria

```bash
# 1. Atualizar logos das companhias
tsx scripts/update-company-logos.mjs

# 2. Atualizar fotos dos navios
tsx scripts/update-ship-images.mjs

# 3. Popular itinerários reais
tsx scripts/seed-real-itineraries.mjs

# 4. Executar todos de uma vez
npm run setup:all
```

## 📁 Estrutura do Projeto

```
cruise_mapper/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── pages/         # Páginas da aplicação
│   │   └── lib/           # Utilitários
├── server/                # Backend Node.js
│   ├── _core/            # Core do servidor
│   ├── db.ts             # Funções do banco de dados
│   └── routers.ts        # Rotas da API
├── drizzle/              # Schema do banco de dados
│   └── schema.ts         # Definições das tabelas
└── scripts/              # Scripts de manutenção
    ├── update-company-logos.mjs
    ├── update-ship-images.mjs
    └── seed-real-itineraries.mjs
```

## 🗄️ Schema do Banco de Dados

### Tabelas Principais

1. **companies** - Companhias de cruzeiro
   - id, name, slug, description, logoUrl, websiteUrl

2. **ships** - Navios
   - id, companyId, name, slug, imageUrl, yearBuilt, capacity, tonnage

3. **ports** - Portos
   - id, name, city, country, latitude, longitude

4. **itineraries** - Itinerários
   - id, shipId, name, description, duration, startDate, endDate

5. **itinerary_stops** - Paradas dos itinerários
   - id, itineraryId, portId, dayNumber, arrivalTime, departureTime

## 🎨 Funcionalidades

### Frontend
- ✅ Visualização de companhias com logos
- ✅ Galeria de navios com fotos
- ✅ Mapa interativo de itinerários
- ✅ Detalhes completos de cada cruzeiro
- ✅ Interface responsiva e moderna

### Backend
- ✅ API REST com tRPC
- ✅ Autenticação e autorização
- ✅ Sistema de scraping de dados
- ✅ Agendamento de tarefas
- ✅ Admin dashboard

## 📊 Dados Incluídos

### Companhias (20+)
- Royal Caribbean International
- Carnival Cruise Line
- Norwegian Cruise Line
- MSC Cruises
- Princess Cruises
- Celebrity Cruises
- Disney Cruise Line
- Virgin Voyages
- E mais...

### Navios Populares (30+)
- Icon of the Seas
- Wonder of the Seas
- Symphony of the Seas
- Carnival Celebration
- Norwegian Prima
- MSC World Europa
- Disney Wish
- E mais...

### Destinos (50+ Portos)
#### Caribe
- Miami, Nassau, Cozumel, Grand Cayman
- Aruba, Curaçao, St. Thomas, St. Maarten

#### Mediterrâneo
- Barcelona, Roma, Atenas, Veneza
- Santorini, Mykonos, Dubrovnik

#### Alasca
- Juneau, Ketchikan, Skagway, Glacier Bay

#### Europa
- Copenhagen, Bergen, Oslo, Lisboa

## 🔧 Desenvolvimento

### Iniciar Servidor de Desenvolvimento
```bash
npm run dev
```

### Build para Produção
```bash
npm run build
npm start
```

### Testes
```bash
npm test
```

## 🐛 Bugs Corrigidos

1. **Conexão com Banco de Dados**
   - Melhor tratamento de erros de conexão
   - Reconexão automática em caso de falha
   - Validação de queries

2. **Performance**
   - Queries otimizadas
   - Cache implementado
   - Loading states melhorados

3. **Interface**
   - Imagens com fallback
   - Loading skeletons
   - Tratamento de dados ausentes

4. **API**
   - Validação de inputs com Zod
   - Melhor tratamento de erros
   - Rate limiting

## 📝 Notas Importantes

- Os itinerários são baseados em dados reais das companhias para 2025-2026
- As datas são exemplos e devem ser atualizadas conforme disponibilidade
- URLs de imagens são de fontes oficiais quando possível
- O sistema suporta scraping automático para atualizações

## 🔐 Variáveis de Ambiente

```env
# Banco de Dados
DATABASE_URL=mysql://user:password@localhost:3306/cruise_mapper

# Autenticação
JWT_SECRET=your-secret-key
OWNER_OPEN_ID=your-admin-id

# APIs (opcional)
GOOGLE_MAPS_API_KEY=your-api-key
```

## 🤝 Contribuindo

Para adicionar novos itinerários ou navios:

1. Editar `scripts/seed-real-itineraries.mjs`
2. Adicionar dados seguindo o formato existente
3. Executar o script: `tsx scripts/seed-real-itineraries.mjs`

## 📞 Suporte

Para questões ou melhorias, entre em contato ou abra uma issue.

## 📄 Licença

MIT License - veja LICENSE para detalhes

---

**Desenvolvido com ❤️ para entusiastas de cruzeiros**
