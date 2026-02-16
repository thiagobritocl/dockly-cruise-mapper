import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

console.log('🚀 Executando setup completo...');

try {
  const { stdout, stderr } = await execAsync('npx tsx scripts/corrigir-tudo.mjs');
  console.log(stdout);
  if (stderr) console.error(stderr);
  console.log('✅ Setup concluído!');
} catch (error) {
  console.error('❌ Erro:', error);
  process.exit(1);
}
