import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Script Mestre - Corrige TODOS os problemas de uma vez
 * Execute via: railway run tsx scripts/corrigir-tudo.mjs
 */

const scripts = [
  {
    name: 'Diagnóstico Inicial',
    command: 'tsx scripts/diagnostico.mjs',
    description: 'Verificar estado atual do banco'
  },
  {
    name: 'Limpar Itinerários Errados',
    command: 'tsx scripts/limpar-itinerarios-errados.mjs',
    description: 'Remover itinerários incorretos ou incompletos'
  },
  {
    name: 'Atualizar Logos das Companhias',
    command: 'tsx scripts/update-company-logos.mjs',
    description: 'Adicionar logos oficiais de 20+ companhias'
  },
  {
    name: 'Atualizar Fotos de TODOS os Navios',
    command: 'tsx scripts/update-all-ship-images.mjs',
    description: 'Adicionar fotos em TODOS os navios (200+ fotos)'
  },
  {
    name: 'Gerar Itinerários para TODOS os Navios',
    command: 'tsx scripts/generate-all-itineraries.mjs',
    description: 'Criar 3-5 itinerários por navio (múltiplas regiões)'
  },
  {
    name: 'Diagnóstico Final',
    command: 'tsx scripts/diagnostico.mjs',
    description: 'Verificar correções aplicadas'
  }
];

async function executarScript(script, index) {
  console.log('\n' + '='.repeat(70));
  console.log(`\n${index + 1}/${scripts.length} - ${script.name}`);
  console.log(`📝 ${script.description}\n`);
  console.log('='.repeat(70) + '\n');
  
  try {
    const { stdout, stderr } = await execAsync(script.command);
    
    if (stdout) {
      console.log(stdout);
    }
    
    if (stderr && !stderr.includes('ExperimentalWarning')) {
      console.error('⚠️  Avisos:', stderr);
    }
    
    console.log(`\n✅ ${script.name} - Concluído com sucesso!`);
    
    // Aguardar 2 segundos entre scripts
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return true;
  } catch (error) {
    console.error(`\n❌ Erro em ${script.name}:`);
    console.error(error.message);
    
    // Continuar mesmo com erro
    return false;
  }
}

async function corrigirTudo() {
  console.log('\n🚀 INICIANDO CORREÇÃO COMPLETA DO DOCKLY');
  console.log('⏱️  Tempo estimado: 3-5 minutos\n');
  
  const startTime = Date.now();
  let sucessos = 0;
  let falhas = 0;
  
  for (let i = 0; i < scripts.length; i++) {
    const sucesso = await executarScript(scripts[i], i);
    if (sucesso) {
      sucessos++;
    } else {
      falhas++;
    }
  }
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(1);
  
  console.log('\n' + '='.repeat(70));
  console.log('\n🎉 CORREÇÃO CONCLUÍDA!\n');
  console.log('📊 RESUMO:');
  console.log(`   ✅ Sucesso: ${sucessos}/${scripts.length}`);
  console.log(`   ❌ Falhas: ${falhas}/${scripts.length}`);
  console.log(`   ⏱️  Tempo: ${duration}s`);
  console.log('\n' + '='.repeat(70));
  
  if (falhas === 0) {
    console.log('\n✨ Todas as correções foram aplicadas com sucesso!');
    console.log('\n🌐 Acesse seu app em:');
    console.log('   https://dockly-cruise-mapper-production.up.railway.app/\n');
  } else {
    console.log('\n⚠️  Algumas correções falharam. Verifique os logs acima.');
    console.log('💡 Você pode executar os scripts individualmente:\n');
    scripts.forEach(s => {
      console.log(`   railway run ${s.command}`);
    });
    console.log('');
  }
  
  process.exit(falhas > 0 ? 1 : 0);
}

corrigirTudo().catch(error => {
  console.error('\n❌ Erro fatal:', error);
  process.exit(1);
});
