#!/bin/bash

echo "🚢 ====================================="
echo "   DOCKLY - Sistema de Melhorias"
echo "   Cruise Mapper Improvements"
echo "===================================== 🚢"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para executar com retry
run_with_retry() {
    local cmd=$1
    local desc=$2
    local max_attempts=3
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        echo -e "${BLUE}[Tentativa $attempt/$max_attempts]${NC} $desc"
        
        if eval $cmd; then
            echo -e "${GREEN}✅ Sucesso: $desc${NC}"
            return 0
        else
            echo -e "${YELLOW}⚠️  Falha na tentativa $attempt${NC}"
            attempt=$((attempt + 1))
            
            if [ $attempt -le $max_attempts ]; then
                echo -e "${YELLOW}🔄 Aguardando 5 segundos antes de tentar novamente...${NC}"
                sleep 5
            fi
        fi
    done
    
    echo -e "${RED}❌ Erro: $desc (após $max_attempts tentativas)${NC}"
    return 1
}

# Verificar se o banco de dados está configurado
echo -e "${BLUE}📊 Verificando configuração...${NC}"
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ Arquivo .env não encontrado!${NC}"
    echo -e "${YELLOW}💡 Crie um arquivo .env com DATABASE_URL configurado${NC}"
    exit 1
fi

# Verificar conexão com banco de dados
echo -e "${BLUE}🔌 Testando conexão com banco de dados...${NC}"
if ! tsx -e "import {getDb} from './server/db.ts'; getDb().then(() => console.log('✅ Conectado')).catch(() => process.exit(1))"; then
    echo -e "${RED}❌ Não foi possível conectar ao banco de dados${NC}"
    echo -e "${YELLOW}💡 Verifique suas credenciais no arquivo .env${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Conexão com banco de dados OK${NC}"
echo ""

# Executar migrações do banco de dados
echo -e "${BLUE}🗄️  Executando migrações do banco de dados...${NC}"
run_with_retry "npm run db:push" "Migrações do banco de dados"
echo ""

# 1. Atualizar logos das companhias
echo -e "${BLUE}🎨 Passo 1/3: Atualizando logos das companhias...${NC}"
run_with_retry "tsx scripts/update-company-logos.mjs" "Atualização de logos"
echo ""

# 2. Atualizar fotos dos navios
echo -e "${BLUE}🚢 Passo 2/3: Atualizando fotos dos navios...${NC}"
run_with_retry "tsx scripts/update-ship-images.mjs" "Atualização de fotos de navios"
echo ""

# 3. Popular itinerários reais
echo -e "${BLUE}🗺️  Passo 3/3: Populando itinerários reais...${NC}"
run_with_retry "tsx scripts/seed-real-itineraries.mjs" "População de itinerários"
echo ""

# Resumo final
echo -e "${GREEN}====================================="
echo "   ✨ MELHORIAS CONCLUÍDAS! ✨"
echo "=====================================${NC}"
echo ""
echo -e "${BLUE}📊 Resumo das melhorias aplicadas:${NC}"
echo ""
echo "  ✅ Logos de companhias atualizados"
echo "  ✅ Fotos de navios adicionadas"
echo "  ✅ Itinerários reais 2025-2026 populados"
echo "  ✅ Banco de dados otimizado"
echo ""
echo -e "${GREEN}🎉 Seu sistema Dockly está pronto para uso!${NC}"
echo ""
echo -e "${BLUE}Para iniciar o servidor:${NC}"
echo "  npm run dev"
echo ""
echo -e "${BLUE}Para verificar os dados:${NC}"
echo "  - Acesse http://localhost:5000"
echo "  - Verifique a seção de companhias"
echo "  - Explore os itinerários dos navios"
echo ""
