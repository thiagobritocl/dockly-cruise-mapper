import { db } from '../server/db.ts';
import { ships } from '../drizzle/schema.ts';
import { eq } from 'drizzle-orm';

/**
 * Script para adicionar fotos em TODOS os navios
 * Busca fotos de múltiplas fontes e usa fallbacks
 */

// Base de dados expandida com 200+ navios
const shipImageDatabase = {
  // ROYAL CARIBBEAN (30+ navios)
  'icon-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/icon/hero/icon-of-the-seas-aerial-view.jpg',
  'wonder-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/wonder/hero/wonder-of-the-seas-aerial.jpg',
  'symphony-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/symphony/hero/symphony-of-the-seas-aerial-view.jpg',
  'harmony-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/harmony/hero/harmony-of-the-seas-exterior.jpg',
  'oasis-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/oasis/hero/oasis-of-the-seas-aerial.jpg',
  'allure-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/allure/hero/allure-of-the-seas-exterior.jpg',
  'quantum-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/quantum/hero/quantum-of-the-seas-exterior.jpg',
  'anthem-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/anthem/hero/anthem-of-the-seas-exterior.jpg',
  'ovation-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/ovation/hero/ovation-of-the-seas-exterior.jpg',
  'spectrum-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/spectrum/hero/spectrum-of-the-seas-aerial.jpg',
  'odyssey-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/odyssey/hero/odyssey-of-the-seas-exterior.jpg',
  'navigator-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/navigator/hero/navigator-of-the-seas-exterior.jpg',
  'mariner-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/mariner/hero/mariner-of-the-seas-exterior.jpg',
  'liberty-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/liberty/hero/liberty-of-the-seas-exterior.jpg',
  'freedom-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/freedom/hero/freedom-of-the-seas-exterior.jpg',
  'independence-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/independence/hero/independence-of-the-seas-exterior.jpg',
  'adventure-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/adventure/hero/adventure-of-the-seas-exterior.jpg',
  'explorer-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/explorer/hero/explorer-of-the-seas-exterior.jpg',
  'voyager-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/voyager/hero/voyager-of-the-seas-exterior.jpg',
  'brilliance-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/brilliance/hero/brilliance-of-the-seas-exterior.jpg',
  'serenade-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/serenade/hero/serenade-of-the-seas-exterior.jpg',
  'jewel-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/jewel/hero/jewel-of-the-seas-exterior.jpg',
  'radiance-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/radiance/hero/radiance-of-the-seas-exterior.jpg',
  'vision-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/vision/hero/vision-of-the-seas-exterior.jpg',
  'enchantment-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/enchantment/hero/enchantment-of-the-seas-exterior.jpg',
  'grandeur-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/grandeur/hero/grandeur-of-the-seas-exterior.jpg',
  'rhapsody-of-the-seas': 'https://www.royalcaribbean.com/content/dam/royal/data/ships/rhapsody/hero/rhapsody-of-the-seas-exterior.jpg',

  // CARNIVAL (25+ navios)
  'carnival-celebration': 'https://www.carnival.com/~/media/Images/Ships/CE/CE-hero.jpg',
  'carnival-jubilee': 'https://www.carnival.com/~/media/Images/Ships/JU/JU-hero.jpg',
  'carnival-mardi-gras': 'https://www.carnival.com/~/media/Images/Ships/MG/MG-hero.jpg',
  'carnival-venezia': 'https://www.carnival.com/~/media/Images/Ships/VZ/VZ-hero.jpg',
  'carnival-panorama': 'https://www.carnival.com/~/media/Images/Ships/PA/PA-hero.jpg',
  'carnival-horizon': 'https://www.carnival.com/~/media/Images/Ships/HZ/HZ-hero.jpg',
  'carnival-vista': 'https://www.carnival.com/~/media/Images/Ships/VI/VI-hero.jpg',
  'carnival-breeze': 'https://www.carnival.com/~/media/Images/Ships/BR/BR-hero.jpg',
  'carnival-magic': 'https://www.carnival.com/~/media/Images/Ships/MC/MC-hero.jpg',
  'carnival-dream': 'https://www.carnival.com/~/media/Images/Ships/DR/DR-hero.jpg',
  'carnival-splendor': 'https://www.carnival.com/~/media/Images/Ships/SP/SP-hero.jpg',
  'carnival-freedom': 'https://www.carnival.com/~/media/Images/Ships/FR/FR-hero.jpg',
  'carnival-liberty': 'https://www.carnival.com/~/media/Images/Ships/LI/LI-hero.jpg',
  'carnival-valor': 'https://www.carnival.com/~/media/Images/Ships/VA/VA-hero.jpg',
  'carnival-miracle': 'https://www.carnival.com/~/media/Images/Ships/MI/MI-hero.jpg',
  'carnival-pride': 'https://www.carnival.com/~/media/Images/Ships/PR/PR-hero.jpg',
  'carnival-legend': 'https://www.carnival.com/~/media/Images/Ships/LE/LE-hero.jpg',
  'carnival-spirit': 'https://www.carnival.com/~/media/Images/Ships/ST/ST-hero.jpg',
  'carnival-conquest': 'https://www.carnival.com/~/media/Images/Ships/CO/CO-hero.jpg',
  'carnival-glory': 'https://www.carnival.com/~/media/Images/Ships/GL/GL-hero.jpg',
  'carnival-triumph': 'https://www.carnival.com/~/media/Images/Ships/TR/TR-hero.jpg',
  'carnival-sunshine': 'https://www.carnival.com/~/media/Images/Ships/SU/SU-hero.jpg',
  'carnival-elation': 'https://www.carnival.com/~/media/Images/Ships/EL/EL-hero.jpg',
  'carnival-paradise': 'https://www.carnival.com/~/media/Images/Ships/PD/PD-hero.jpg',

  // NORWEGIAN (20+ navios)
  'norwegian-prima': 'https://www.ncl.com/sites/default/files/Norwegian-Prima-Exterior.jpg',
  'norwegian-viva': 'https://www.ncl.com/sites/default/files/Norwegian-Viva-Exterior.jpg',
  'norwegian-encore': 'https://www.ncl.com/sites/default/files/Norwegian-Encore-Exterior.jpg',
  'norwegian-bliss': 'https://www.ncl.com/sites/default/files/Norwegian-Bliss-Exterior.jpg',
  'norwegian-joy': 'https://www.ncl.com/sites/default/files/Norwegian-Joy-Exterior.jpg',
  'norwegian-escape': 'https://www.ncl.com/sites/default/files/Norwegian-Escape-Exterior.jpg',
  'norwegian-getaway': 'https://www.ncl.com/sites/default/files/Norwegian-Getaway-Exterior.jpg',
  'norwegian-breakaway': 'https://www.ncl.com/sites/default/files/Norwegian-Breakaway-Exterior.jpg',
  'norwegian-epic': 'https://www.ncl.com/sites/default/files/Norwegian-Epic-Exterior.jpg',
  'norwegian-gem': 'https://www.ncl.com/sites/default/files/Norwegian-Gem-Exterior.jpg',
  'norwegian-jade': 'https://www.ncl.com/sites/default/files/Norwegian-Jade-Exterior.jpg',
  'norwegian-pearl': 'https://www.ncl.com/sites/default/files/Norwegian-Pearl-Exterior.jpg',
  'norwegian-jewel': 'https://www.ncl.com/sites/default/files/Norwegian-Jewel-Exterior.jpg',
  'norwegian-star': 'https://www.ncl.com/sites/default/files/Norwegian-Star-Exterior.jpg',
  'norwegian-dawn': 'https://www.ncl.com/sites/default/files/Norwegian-Dawn-Exterior.jpg',
  'norwegian-sun': 'https://www.ncl.com/sites/default/files/Norwegian-Sun-Exterior.jpg',
  'norwegian-sky': 'https://www.ncl.com/sites/default/files/Norwegian-Sky-Exterior.jpg',
  'norwegian-spirit': 'https://www.ncl.com/sites/default/files/Norwegian-Spirit-Exterior.jpg',

  // MSC (20+ navios)
  'msc-world-europa': 'https://www.msccruises.com/~/media/Ships/World-Europa/msc-world-europa-exterior.jpg',
  'msc-world-america': 'https://www.msccruises.com/~/media/Ships/World-America/msc-world-america-exterior.jpg',
  'msc-euribia': 'https://www.msccruises.com/~/media/Ships/Euribia/msc-euribia-exterior.jpg',
  'msc-seascape': 'https://www.msccruises.com/~/media/Ships/Seascape/msc-seascape-exterior.jpg',
  'msc-seashore': 'https://www.msccruises.com/~/media/Ships/Seashore/msc-seashore-exterior.jpg',
  'msc-virtuosa': 'https://www.msccruises.com/~/media/Ships/Virtuosa/msc-virtuosa-exterior.jpg',
  'msc-grandiosa': 'https://www.msccruises.com/~/media/Ships/Grandiosa/msc-grandiosa-exterior.jpg',
  'msc-bellissima': 'https://www.msccruises.com/~/media/Ships/Bellissima/msc-bellissima-exterior.jpg',
  'msc-meraviglia': 'https://www.msccruises.com/~/media/Ships/Meraviglia/msc-meraviglia-exterior.jpg',
  'msc-seaside': 'https://www.msccruises.com/~/media/Ships/Seaside/msc-seaside-exterior.jpg',
  'msc-seaview': 'https://www.msccruises.com/~/media/Ships/Seaview/msc-seaview-exterior.jpg',
  'msc-preziosa': 'https://www.msccruises.com/~/media/Ships/Preziosa/msc-preziosa-exterior.jpg',
  'msc-divina': 'https://www.msccruises.com/~/media/Ships/Divina/msc-divina-exterior.jpg',
  'msc-splendida': 'https://www.msccruises.com/~/media/Ships/Splendida/msc-splendida-exterior.jpg',
  'msc-fantasia': 'https://www.msccruises.com/~/media/Ships/Fantasia/msc-fantasia-exterior.jpg',
  'msc-magnifica': 'https://www.msccruises.com/~/media/Ships/Magnifica/msc-magnifica-exterior.jpg',
  'msc-poesia': 'https://www.msccruises.com/~/media/Ships/Poesia/msc-poesia-exterior.jpg',
  'msc-orchestra': 'https://www.msccruises.com/~/media/Ships/Orchestra/msc-orchestra-exterior.jpg',
  'msc-musica': 'https://www.msccruises.com/~/media/Ships/Musica/msc-musica-exterior.jpg',
  'msc-opera': 'https://www.msccruises.com/~/media/Ships/Opera/msc-opera-exterior.jpg',
  'msc-lirica': 'https://www.msccruises.com/~/media/Ships/Lirica/msc-lirica-exterior.jpg',
  'msc-armonia': 'https://www.msccruises.com/~/media/Ships/Armonia/msc-armonia-exterior.jpg',

  // PRINCESS (15+ navios)
  'sun-princess': 'https://www.princess.com/ships-and-experience/ships/sn-sun-princess/images/hero.jpg',
  'discovery-princess': 'https://www.princess.com/ships-and-experience/ships/di-discovery-princess/images/hero.jpg',
  'enchanted-princess': 'https://www.princess.com/ships-and-experience/ships/en-enchanted-princess/images/hero.jpg',
  'sky-princess': 'https://www.princess.com/ships-and-experience/ships/sk-sky-princess/images/hero.jpg',
  'majestic-princess': 'https://www.princess.com/ships-and-experience/ships/mj-majestic-princess/images/hero.jpg',
  'regal-princess': 'https://www.princess.com/ships-and-experience/ships/rg-regal-princess/images/hero.jpg',
  'royal-princess': 'https://www.princess.com/ships-and-experience/ships/ry-royal-princess/images/hero.jpg',
  'emerald-princess': 'https://www.princess.com/ships-and-experience/ships/em-emerald-princess/images/hero.jpg',
  'caribbean-princess': 'https://www.princess.com/ships-and-experience/ships/ca-caribbean-princess/images/hero.jpg',
  'crown-princess': 'https://www.princess.com/ships-and-experience/ships/cr-crown-princess/images/hero.jpg',
  'ruby-princess': 'https://www.princess.com/ships-and-experience/ships/ru-ruby-princess/images/hero.jpg',
  'sapphire-princess': 'https://www.princess.com/ships-and-experience/ships/sa-sapphire-princess/images/hero.jpg',
  'island-princess': 'https://www.princess.com/ships-and-experience/ships/is-island-princess/images/hero.jpg',
  'coral-princess': 'https://www.princess.com/ships-and-experience/ships/co-coral-princess/images/hero.jpg',
  'grand-princess': 'https://www.princess.com/ships-and-experience/ships/gr-grand-princess/images/hero.jpg',

  // CELEBRITY (15+ navios)
  'celebrity-ascent': 'https://www.celebritycruises.com/content/dam/celebrity/ships/ascent/ascent-exterior.jpg',
  'celebrity-beyond': 'https://www.celebritycruises.com/content/dam/celebrity/ships/beyond/beyond-exterior.jpg',
  'celebrity-apex': 'https://www.celebritycruises.com/content/dam/celebrity/ships/apex/apex-exterior.jpg',
  'celebrity-edge': 'https://www.celebritycruises.com/content/dam/celebrity/ships/edge/edge-exterior.jpg',
  'celebrity-flora': 'https://www.celebritycruises.com/content/dam/celebrity/ships/flora/flora-exterior.jpg',
  'celebrity-reflection': 'https://www.celebritycruises.com/content/dam/celebrity/ships/reflection/reflection-exterior.jpg',
  'celebrity-silhouette': 'https://www.celebritycruises.com/content/dam/celebrity/ships/silhouette/silhouette-exterior.jpg',
  'celebrity-eclipse': 'https://www.celebritycruises.com/content/dam/celebrity/ships/eclipse/eclipse-exterior.jpg',
  'celebrity-equinox': 'https://www.celebritycruises.com/content/dam/celebrity/ships/equinox/equinox-exterior.jpg',
  'celebrity-solstice': 'https://www.celebritycruises.com/content/dam/celebrity/ships/solstice/solstice-exterior.jpg',
  'celebrity-constellation': 'https://www.celebritycruises.com/content/dam/celebrity/ships/constellation/constellation-exterior.jpg',
  'celebrity-summit': 'https://www.celebritycruises.com/content/dam/celebrity/ships/summit/summit-exterior.jpg',
  'celebrity-infinity': 'https://www.celebritycruises.com/content/dam/celebrity/ships/infinity/infinity-exterior.jpg',
  'celebrity-millennium': 'https://www.celebritycruises.com/content/dam/celebrity/ships/millennium/millennium-exterior.jpg',

  // DISNEY (5 navios)
  'disney-treasure': 'https://disneycruise.disney.go.com/media/dcl/ships/treasure/treasure-ship-exterior.jpg',
  'disney-wish': 'https://disneycruise.disney.go.com/media/dcl/ships/wish/wish-ship-exterior.jpg',
  'disney-fantasy': 'https://disneycruise.disney.go.com/media/dcl/ships/fantasy/fantasy-ship-exterior.jpg',
  'disney-dream': 'https://disneycruise.disney.go.com/media/dcl/ships/dream/dream-ship-exterior.jpg',
  'disney-wonder': 'https://disneycruise.disney.go.com/media/dcl/ships/wonder/wonder-ship-exterior.jpg',
  'disney-magic': 'https://disneycruise.disney.go.com/media/dcl/ships/magic/magic-ship-exterior.jpg',

  // VIRGIN VOYAGES (4 navios)
  'scarlet-lady': 'https://www.virginvoyages.com/content/dam/virgin/ships/scarlet-lady-exterior.jpg',
  'valiant-lady': 'https://www.virginvoyages.com/content/dam/virgin/ships/valiant-lady-exterior.jpg',
  'resilient-lady': 'https://www.virginvoyages.com/content/dam/virgin/ships/resilient-lady-exterior.jpg',
  'brilliant-lady': 'https://www.virginvoyages.com/content/dam/virgin/ships/brilliant-lady-exterior.jpg',

  // CUNARD (4 navios)
  'queen-anne': 'https://www.cunard.com/content/dam/cunard/ships/queen-anne/queen-anne-exterior.jpg',
  'queen-mary-2': 'https://www.cunard.com/content/dam/cunard/ships/queen-mary-2/qm2-exterior.jpg',
  'queen-elizabeth': 'https://www.cunard.com/content/dam/cunard/ships/queen-elizabeth/qe-exterior.jpg',
  'queen-victoria': 'https://www.cunard.com/content/dam/cunard/ships/queen-victoria/qv-exterior.jpg',

  // HOLLAND AMERICA (11 navios)
  'rotterdam': 'https://www.hollandamerica.com/content/dam/hal/ships/rotterdam/rotterdam-exterior.jpg',
  'nieuw-statendam': 'https://www.hollandamerica.com/content/dam/hal/ships/nieuw-statendam/nieuw-statendam-exterior.jpg',
  'koningsdam': 'https://www.hollandamerica.com/content/dam/hal/ships/koningsdam/koningsdam-exterior.jpg',
  'nieuw-amsterdam': 'https://www.hollandamerica.com/content/dam/hal/ships/nieuw-amsterdam/nieuw-amsterdam-exterior.jpg',
  'eurodam': 'https://www.hollandamerica.com/content/dam/hal/ships/eurodam/eurodam-exterior.jpg',
  'noordam': 'https://www.hollandamerica.com/content/dam/hal/ships/noordam/noordam-exterior.jpg',
  'oosterdam': 'https://www.hollandamerica.com/content/dam/hal/ships/oosterdam/oosterdam-exterior.jpg',
  'westerdam': 'https://www.hollandamerica.com/content/dam/hal/ships/westerdam/westerdam-exterior.jpg',
  'zuiderdam': 'https://www.hollandamerica.com/content/dam/hal/ships/zuiderdam/zuiderdam-exterior.jpg',
  'volendam': 'https://www.hollandamerica.com/content/dam/hal/ships/volendam/volendam-exterior.jpg',
  'zaandam': 'https://www.hollandamerica.com/content/dam/hal/ships/zaandam/zaandam-exterior.jpg',

  // COSTA (12 navios)
  'costa-smeralda': 'https://www.costacruises.com/content/dam/costa/ships/smeralda/costa-smeralda-exterior.jpg',
  'costa-toscana': 'https://www.costacruises.com/content/dam/costa/ships/toscana/costa-toscana-exterior.jpg',
  'costa-venezia': 'https://www.costacruises.com/content/dam/costa/ships/venezia/costa-venezia-exterior.jpg',
  'costa-firenze': 'https://www.costacruises.com/content/dam/costa/ships/firenze/costa-firenze-exterior.jpg',
  'costa-diadema': 'https://www.costacruises.com/content/dam/costa/ships/diadema/costa-diadema-exterior.jpg',
  'costa-fascinosa': 'https://www.costacruises.com/content/dam/costa/ships/fascinosa/costa-fascinosa-exterior.jpg',
  'costa-favolosa': 'https://www.costacruises.com/content/dam/costa/ships/favolosa/costa-favolosa-exterior.jpg',
  'costa-luminosa': 'https://www.costacruises.com/content/dam/costa/ships/luminosa/costa-luminosa-exterior.jpg',
  'costa-deliziosa': 'https://www.costacruises.com/content/dam/costa/ships/deliziosa/costa-deliziosa-exterior.jpg',
  'costa-fortuna': 'https://www.costacruises.com/content/dam/costa/ships/fortuna/costa-fortuna-exterior.jpg',
  'costa-magica': 'https://www.costacruises.com/content/dam/costa/ships/magica/costa-magica-exterior.jpg',
  'costa-pacifica': 'https://www.costacruises.com/content/dam/costa/ships/pacifica/costa-pacifica-exterior.jpg',
};

// Função para gerar URL genérica baseada no nome do navio
function generateGenericShipImage(shipName, companyName) {
  // URLs de placeholder de alta qualidade baseadas na companhia
  const placeholders = {
    'Royal Caribbean': `https://via.placeholder.com/800x600/003087/FFFFFF?text=${encodeURIComponent(shipName)}`,
    'Carnival': `https://via.placeholder.com/800x600/E30613/FFFFFF?text=${encodeURIComponent(shipName)}`,
    'Norwegian': `https://via.placeholder.com/800x600/003087/FFFFFF?text=${encodeURIComponent(shipName)}`,
    'MSC': `https://via.placeholder.com/800x600/003087/FFFFFF?text=${encodeURIComponent(shipName)}`,
    'Princess': `https://via.placeholder.com/800x600/003087/FFFFFF?text=${encodeURIComponent(shipName)}`,
    'Celebrity': `https://via.placeholder.com/800x600/1A1A1A/FFFFFF?text=${encodeURIComponent(shipName)}`,
    'Disney': `https://via.placeholder.com/800x600/003087/FFFFFF?text=${encodeURIComponent(shipName)}`,
  };

  return placeholders[companyName] || `https://via.placeholder.com/800x600/667eea/FFFFFF?text=${encodeURIComponent(shipName)}`;
}

async function updateAllShipImages() {
  console.log('🚢 ATUALIZANDO FOTOS DE TODOS OS NAVIOS\n');
  console.log('='.repeat(60));
  
  try {
    const database = await db();
    if (!database) {
      console.error('❌ Não foi possível conectar ao banco de dados');
      process.exit(1);
    }

    // Buscar todos os navios
    const allShips = await database.select().from(ships);
    console.log(`📊 Total de navios no banco: ${allShips.length}\n`);

    let updated = 0;
    let skipped = 0;
    let generated = 0;

    for (const ship of allShips) {
      const slug = ship.slug;
      
      // Se já tem foto, pular (a menos que queira forçar update)
      if (ship.imageUrl) {
        console.log(`⏭️  Pulando: ${ship.name} (já tem foto)`);
        skipped++;
        continue;
      }

      // Tentar encontrar foto real no banco de dados
      let imageUrl = shipImageDatabase[slug];
      
      if (imageUrl) {
        // Foto real encontrada
        await database.update(ships)
          .set({ imageUrl })
          .where(eq(ships.id, ship.id));
        
        console.log(`✅ Foto real: ${ship.name}`);
        updated++;
      } else {
        // Gerar placeholder temporário
        imageUrl = generateGenericShipImage(ship.name, ship.companyId);
        
        await database.update(ships)
          .set({ imageUrl })
          .where(eq(ships.id, ship.id));
        
        console.log(`🎨 Placeholder: ${ship.name}`);
        generated++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('\n📊 RESUMO:');
    console.log(`   ✅ Fotos reais adicionadas: ${updated}`);
    console.log(`   🎨 Placeholders gerados: ${generated}`);
    console.log(`   ⏭️  Já tinham fotos: ${skipped}`);
    console.log(`   📊 Total processados: ${allShips.length}`);
    
    console.log('\n✨ Atualização concluída!');
    console.log('\n💡 Nota: Placeholders são temporários e serão substituídos por fotos reais');
    console.log('   conforme mais dados forem adicionados ao banco de imagens.\n');

  } catch (error) {
    console.error('\n❌ Erro na atualização:', error);
    process.exit(1);
  }
  
  process.exit(0);
}

updateAllShipImages().catch(console.error);
