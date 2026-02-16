# 🔧 Guia de Solução de Problemas - Dockly

## 📋 Índice
1. [Problemas Comuns](#problemas-comuns)
2. [Banco de Dados](#banco-de-dados)
3. [Scripts de Setup](#scripts-de-setup)
4. [Performance](#performance)
5. [Frontend](#frontend)
6. [Backend](#backend)

---

## 🔥 Problemas Comuns

### ❌ Erro: "Cannot connect to database"

**Sintomas**: Aplicação não consegue conectar ao banco de dados

**Soluções**:

1. **Verificar credenciais no .env**
```bash
# Verifique se o arquivo .env existe
cat .env

# Formato correto:
DATABASE_URL=mysql://usuario:senha@localhost:3306/nome_do_banco
```

2. **Testar conexão manualmente**
```bash
mysql -u usuario -p -h localhost nome_do_banco
```

3. **Verificar se o MySQL está rodando**
```bash
# Linux/Mac
sudo systemctl status mysql

# Ou verificar processo
ps aux | grep mysql
```

4. **Verificar firewall**
```bash
# Garantir que porta 3306 está aberta
sudo ufw allow 3306
```

---

### ❌ Erro: "Module not found"

**Sintomas**: Erro ao importar módulos

**Soluções**:

1. **Limpar node_modules e reinstalar**
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

2. **Verificar versão do Node.js**
```bash
node --version  # Deve ser >= 18
```

3. **Instalar dependências globais**
```bash
npm install -g tsx pnpm
```

---

### ❌ Scripts de setup falham

**Sintomas**: Scripts não executam ou falham no meio

**Soluções**:

1. **Executar com retry automático**
```bash
./setup-improvements.sh
# O script já tem retry incorporado
```

2. **Executar scripts individualmente**
```bash
# Um de cada vez para identificar o problema
tsx scripts/update-company-logos.mjs
tsx scripts/update-ship-images.mjs
tsx scripts/seed-real-itineraries.mjs
```

3. **Verificar logs**
```bash
tsx scripts/update-company-logos.mjs 2>&1 | tee setup.log
```

---

## 🗄️ Banco de Dados

### ❌ Erro: "Table doesn't exist"

**Soluções**:

1. **Executar migrações**
```bash
npm run db:push
```

2. **Resetar banco de dados (CUIDADO: apaga dados)**
```bash
# Fazer backup primeiro!
mysqldump -u usuario -p nome_do_banco > backup.sql

# Dropar e recriar
mysql -u usuario -p
DROP DATABASE nome_do_banco;
CREATE DATABASE nome_do_banco;
exit;

# Executar migrações
npm run db:push
```

---

### ❌ Erro: "Duplicate entry"

**Sintomas**: Tentando inserir dados que já existem

**Soluções**:

1. **Limpar dados duplicados**
```bash
tsx scripts/remove-duplicates.mjs
```

2. **Verificar dados manualmente**
```sql
-- Conectar ao MySQL
mysql -u usuario -p nome_do_banco

-- Ver companhias duplicadas
SELECT slug, COUNT(*) as count 
FROM companies 
GROUP BY slug 
HAVING count > 1;

-- Remover duplicatas (manter primeira entrada)
DELETE c1 FROM companies c1
INNER JOIN companies c2 
WHERE c1.id > c2.id 
AND c1.slug = c2.slug;
```

---

### 🐌 Banco de dados lento

**Soluções**:

1. **Adicionar índices**
```sql
-- Índices importantes
CREATE INDEX idx_ships_company ON ships(companyId);
CREATE INDEX idx_itineraries_ship ON itineraries(shipId);
CREATE INDEX idx_stops_itinerary ON itinerary_stops(itineraryId);
CREATE INDEX idx_stops_port ON itinerary_stops(portId);
```

2. **Analisar queries lentas**
```sql
-- Ativar slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;

-- Ver queries lentas
SELECT * FROM mysql.slow_log;
```

---

## 🚀 Performance

### 🐌 Aplicação lenta

**Soluções**:

1. **Habilitar cache**
```typescript
// No código, já implementado
// Verificar se está funcionando
```

2. **Otimizar imagens**
```bash
# Usar CDN ou otimizar localmente
npm install sharp
# Script para otimizar imagens
```

3. **Lazy loading**
```typescript
// Já implementado no frontend
// Verificar se está ativo
```

---

## 💻 Frontend

### ❌ Imagens não carregam

**Soluções**:

1. **Verificar URLs**
```typescript
// Logs no console do navegador
console.log('Image URL:', imageUrl);
```

2. **Usar fallback**
```typescript
// Já implementado
<img 
  src={imageUrl} 
  onError={(e) => e.target.src = '/placeholder.jpg'}
/>
```

3. **Verificar CORS**
```bash
# Headers devem permitir origem
Access-Control-Allow-Origin: *
```

---

### ❌ Layout quebrado

**Soluções**:

1. **Limpar cache do navegador**
```
Ctrl + Shift + Delete (Chrome/Edge)
Cmd + Shift + Delete (Safari)
```

2. **Verificar CSS**
```bash
# Rebuild assets
npm run build
```

3. **Verificar console para erros**
```javascript
// Abrir DevTools
F12 ou Cmd+Option+I
```

---

## 🔧 Backend

### ❌ API não responde

**Soluções**:

1. **Verificar se servidor está rodando**
```bash
ps aux | grep node
# Ou
lsof -i :5000
```

2. **Verificar logs**
```bash
# Ver logs do servidor
npm run dev
```

3. **Testar endpoint manualmente**
```bash
curl http://localhost:5000/api/companies
```

---

### ❌ Scraper não funciona

**Soluções**:

1. **Verificar rate limiting**
```typescript
// Aumentar delay entre requests
const delayMs = 5000; // 5 segundos
```

2. **Verificar user agent**
```typescript
headers: {
  'User-Agent': 'Mozilla/5.0 ...'
}
```

3. **Verificar proxy (se necessário)**
```bash
export HTTP_PROXY=http://proxy:port
```

---

## 📝 Logs e Debug

### Habilitar logs detalhados

```bash
# No .env
DEBUG=true
LOG_LEVEL=verbose

# Executar com logs
npm run dev 2>&1 | tee debug.log
```

### Verificar logs do sistema

```bash
# Logs do Node.js
tail -f ~/.npm/_logs/*.log

# Logs do MySQL
tail -f /var/log/mysql/error.log
```

---

## 🔍 Comandos Úteis de Debug

```bash
# Verificar versões
node --version
npm --version
pnpm --version
mysql --version

# Verificar processos
ps aux | grep node
ps aux | grep mysql

# Verificar portas
lsof -i :5000  # Servidor
lsof -i :3306  # MySQL

# Verificar espaço em disco
df -h

# Verificar memória
free -h

# Logs em tempo real
tail -f debug.log

# Testar conexão MySQL
telnet localhost 3306

# Verificar se aplicação responde
curl -I http://localhost:5000
```

---

## 🆘 Quando tudo mais falhar

### Reset completo (CUIDADO)

```bash
# 1. Backup dos dados
mysqldump -u usuario -p nome_do_banco > backup.sql

# 2. Limpar tudo
rm -rf node_modules
rm pnpm-lock.yaml
rm -rf dist

# 3. Reinstalar
pnpm install

# 4. Resetar banco
mysql -u usuario -p
DROP DATABASE nome_do_banco;
CREATE DATABASE nome_do_banco;
exit;

# 5. Executar setup completo
npm run db:push
npm run setup:all

# 6. Iniciar aplicação
npm run dev
```

---

## 📞 Precisa de mais ajuda?

1. **Verificar documentação**
   - README.md
   - CHANGELOG.md
   - Código fonte (comentários)

2. **Logs**
   - Sempre verifique os logs
   - Use `console.log` para debug
   - Ative modo verbose

3. **Comunidade**
   - Abra uma issue
   - Stack Overflow
   - Discord/Slack da comunidade

4. **Backup**
   - Sempre faça backup antes de mudanças grandes
   - Use git para versionamento
   - Backup regular do banco de dados

---

## 💡 Dicas de Prevenção

### ✅ Boas Práticas

1. **Sempre use .env para configurações**
2. **Mantenha backups regulares**
3. **Teste em ambiente de dev primeiro**
4. **Use git para versionar código**
5. **Monitore logs regularmente**
6. **Mantenha dependências atualizadas**
7. **Documente mudanças**
8. **Teste após cada mudança**

### ✅ Checklist Diário

- [ ] Backup do banco de dados
- [ ] Verificar logs de erro
- [ ] Monitorar performance
- [ ] Testar endpoints críticos
- [ ] Verificar espaço em disco
- [ ] Atualizar dependências (semanalmente)

---

**Última atualização**: 2025-02-15

Mantenha este guia atualizado com novos problemas e soluções conforme aparecem!
