# 🚀 Guia de Instalação - Dockly Cruise Mapper

Este guia irá orientá-lo através da instalação completa do sistema Dockly com todas as melhorias implementadas.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- ✅ **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- ✅ **MySQL** >= 8.0 ([Download](https://dev.mysql.com/downloads/))
- ✅ **pnpm** (gerenciador de pacotes)
- ✅ **Git** (para clonar o repositório)

### Verificar Instalações

```bash
# Verificar Node.js
node --version  # Deve mostrar v18.x.x ou superior

# Verificar MySQL
mysql --version  # Deve mostrar 8.0.x ou superior

# Instalar pnpm (se necessário)
npm install -g pnpm
pnpm --version
```

---

## 📦 Passo 1: Preparar o Banco de Dados

### 1.1 Criar Banco de Dados

```bash
# Conectar ao MySQL
mysql -u root -p

# No console MySQL:
CREATE DATABASE cruise_mapper CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Criar usuário (opcional, mas recomendado)
CREATE USER 'dockly_user'@'localhost' IDENTIFIED BY 'senha_segura';
GRANT ALL PRIVILEGES ON cruise_mapper.* TO 'dockly_user'@'localhost';
FLUSH PRIVILEGES;

# Sair
exit;
```

### 1.2 Testar Conexão

```bash
mysql -u dockly_user -p cruise_mapper
# Digite a senha quando solicitado
# Se conectar com sucesso, digite 'exit;'
```

---

## 🔧 Passo 2: Configurar o Projeto

### 2.1 Extrair Arquivos

O projeto já está extraído. Vamos configurá-lo:

```bash
cd cruise_mapper
```

### 2.2 Instalar Dependências

```bash
# Limpar cache (se necessário)
pnpm store prune

# Instalar todas as dependências
pnpm install

# Verificar se instalou corretamente
ls node_modules | wc -l  # Deve mostrar um número alto (>100)
```

### 2.3 Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar arquivo .env
nano .env  # ou use seu editor preferido
```

**Configurar no mínimo estas variáveis OBRIGATÓRIAS:**

```env
# Banco de Dados (AJUSTE COM SEUS DADOS)
DATABASE_URL=mysql://dockly_user:senha_segura@localhost:3306/cruise_mapper

# Autenticação (GERAR CHAVE SEGURA)
JWT_SECRET=sua-chave-super-secreta-aqui-mude-isso
OWNER_OPEN_ID=admin-12345

# Servidor
NODE_ENV=development
PORT=5000
```

**Gerar JWT_SECRET seguro:**

```bash
# Gerar uma chave aleatória forte
openssl rand -base64 32
# Copie o resultado e cole no JWT_SECRET
```

---

## 🗄️ Passo 3: Inicializar Banco de Dados

### 3.1 Executar Migrações

```bash
# Criar tabelas no banco de dados
pnpm run db:push
```

**Saída esperada:**
```
✓ Migrations executed successfully
✓ Database schema updated
```

### 3.2 Verificar Tabelas Criadas

```bash
mysql -u dockly_user -p cruise_mapper -e "SHOW TABLES;"
```

**Deve mostrar:**
```
+---------------------------+
| Tables_in_cruise_mapper   |
+---------------------------+
| companies                 |
| itineraries               |
| itinerary_stops           |
| ports                     |
| ships                     |
| users                     |
+---------------------------+
```

---

## ✨ Passo 4: Aplicar Melhorias

### 4.1 Executar Script de Setup Completo

Este é o passo principal que aplica todas as melhorias:

```bash
# Tornar script executável (se necessário)
chmod +x setup-improvements.sh

# Executar todas as melhorias de uma vez
./setup-improvements.sh
```

**O script irá:**
1. ✅ Atualizar logos das companhias
2. ✅ Adicionar fotos dos navios
3. ✅ Popular itinerários reais 2025-2026

### 4.2 Executar Melhorias Individualmente (Alternativa)

Se preferir executar um de cada vez:

```bash
# 1. Logos das companhias
pnpm run setup:logos

# 2. Fotos dos navios
pnpm run setup:ships

# 3. Itinerários reais
pnpm run setup:itineraries
```

---

## 🎯 Passo 5: Verificar Dados

### 5.1 Verificar Companhias

```bash
mysql -u dockly_user -p cruise_mapper -e "SELECT name, logoUrl FROM companies LIMIT 5;"
```

### 5.2 Verificar Navios

```bash
mysql -u dockly_user -p cruise_mapper -e "SELECT name, imageUrl FROM ships LIMIT 5;"
```

### 5.3 Verificar Itinerários

```bash
mysql -u dockly_user -p cruise_mapper -e "SELECT COUNT(*) as total FROM itineraries;"
```

---

## 🚀 Passo 6: Iniciar Aplicação

### 6.1 Modo Desenvolvimento

```bash
pnpm run dev
```

**Saída esperada:**
```
🚢 Dockly Cruise Mapper
📍 Server running at http://localhost:5000
✅ Database connected
✨ Ready to accept connections
```

### 6.2 Acessar Aplicação

Abra seu navegador e acesse:

```
http://localhost:5000
```

### 6.3 Verificar Páginas

- **Home**: `http://localhost:5000/`
- **Companhias**: `http://localhost:5000/companies`
- **Admin**: `http://localhost:5000/admin` (requer autenticação)

---

## ✅ Verificação de Instalação

### Checklist Final

Execute este checklist para confirmar que tudo está funcionando:

- [ ] Banco de dados conectado
- [ ] Todas as tabelas criadas
- [ ] Logos das companhias carregando
- [ ] Fotos dos navios aparecendo
- [ ] Itinerários visíveis nos navios
- [ ] Mapas renderizando corretamente
- [ ] Nenhum erro no console do navegador
- [ ] API respondendo em http://localhost:5000/api

### Comando de Teste Rápido

```bash
# Testar conexão com API
curl http://localhost:5000/api/companies

# Deve retornar JSON com lista de companhias
```

---

## 🔧 Solução de Problemas Comuns

### ❌ Erro: "Cannot connect to database"

```bash
# Verificar se MySQL está rodando
sudo systemctl status mysql

# Verificar credenciais no .env
cat .env | grep DATABASE_URL

# Testar conexão manualmente
mysql -u dockly_user -p cruise_mapper
```

### ❌ Erro: "Port 5000 already in use"

```bash
# Encontrar processo usando a porta
lsof -i :5000

# Matar o processo (ajuste o PID)
kill -9 [PID]

# Ou usar outra porta no .env
PORT=3000
```

### ❌ Erro: "Module not found"

```bash
# Reinstalar dependências
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### ❌ Imagens não carregam

```bash
# Verificar URLs no banco
mysql -u dockly_user -p cruise_mapper -e "SELECT logoUrl FROM companies WHERE logoUrl IS NOT NULL LIMIT 3;"

# Reexecutar script de imagens
pnpm run setup:ships
```

---

## 📊 Dados Incluídos Após Instalação

### Companhias
- 20+ companhias com logos oficiais

### Navios
- 30+ navios com fotos reais

### Itinerários
- 10+ itinerários completos para 2025-2026
- 50+ portos com coordenadas

### Destinos Cobertos
- Caribe (Oriental, Ocidental, Sul)
- Mediterrâneo (Ocidental, Ilhas Gregas)
- Alasca
- Fjords Noruegueses
- Transatlântico

---

## 🎓 Próximos Passos

Após instalação bem-sucedida:

1. **Explorar a Interface**
   - Navegue pelas companhias
   - Veja detalhes dos navios
   - Explore itinerários no mapa

2. **Configurar Admin**
   - Criar conta de administrador
   - Explorar painel admin
   - Testar funcionalidades de scraping

3. **Personalizar**
   - Adicionar mais companhias
   - Incluir novos navios
   - Criar itinerários personalizados

4. **Deploy (Produção)**
   - Configurar variáveis de ambiente de produção
   - Fazer build: `pnpm run build`
   - Iniciar: `pnpm start`

---

## 📚 Documentação Adicional

- **README.md**: Visão geral do projeto
- **CHANGELOG.md**: Histórico de mudanças
- **TROUBLESHOOTING.md**: Soluções de problemas
- **.env.example**: Variáveis disponíveis

---

## 🆘 Precisa de Ajuda?

Se encontrar problemas:

1. Consulte **TROUBLESHOOTING.md**
2. Verifique logs: `tail -f logs/app.log`
3. Execute com debug: `DEBUG=true pnpm run dev`

---

## 🎉 Pronto!

Seu sistema Dockly está instalado e pronto para uso!

```
     ⚓ BEM-VINDO AO DOCKLY! ⚓
  Sistema de Mapeamento de Cruzeiros
    Com Dados Reais e Atualizados
```

**Desenvolvido com ❤️ para entusiastas de cruzeiros**

---

**Última atualização**: 2025-02-15
**Versão**: 2.0.0
