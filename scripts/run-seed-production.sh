#!/bin/bash

# Script para executar o seed completo em produção
# Este script conecta ao banco de dados de produção e popula todos os dados

set -e

echo "🚀 Iniciando seed completo em produção..."
echo ""

# Verificar se as variáveis de ambiente estão definidas
if [ -z "$DATABASE_URL" ]; then
  echo "❌ Erro: DATABASE_URL não está definida"
  exit 1
fi

echo "📊 Executando seed de dados completo..."
echo ""

# Executar o script de seed
tsx seed-complete-data.mjs

echo ""
echo "✅ Seed completo finalizado!"
echo ""
echo "📋 Resumo do que foi adicionado:"
echo "   - 12 companhias de cruzeiros"
echo "   - 30+ navios reais"
echo "   - 30+ portos com coordenadas GPS"
echo "   - 11 itinerários autênticos 2025-2026"
echo "   - 50+ paradas de itinerários"
echo ""
echo "🎉 Seu site Dockly agora está completo com dados reais!"
