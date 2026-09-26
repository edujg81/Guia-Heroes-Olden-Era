import { FACTION_PREFIX_MAP } from './heroAssetsPrefixMap';

// Catalogo explicito de retratos de heroes (estilo unitAssetsData)
// Cada entrada relaciona hero_id -> archivo PNG exacto
export interface HeroAssetEntry {
  hero_id: string;
  icon: string;
  faction: string;
  faction_id: string;
  nameEs: string;
  nameEn: string;
}

/*export const HERO_ASSETS_CATALOG: HeroAssetEntry[] = [
  // Mazmorra (dungeon) - posiciones 1-18
  { hero_id: 'hero-enatee', icon: 'src/assets/icons/heroes/hero_dungeon_1_enatee.png', faction: 'Mazmorra', faction_id: 'dungeon', nameEs: 'Enatee', nameEn: 'Enatee' },
  { hero_id: 'hero-tellaris', icon: 'src/assets/icons/heroes/hero_dungeon_2_talleris_the_betrayed.png', faction: 'Mazmorra', faction_id: 'dungeon', nameEs: 'Tellaris', nameEn: 'Tellaris' },
  { hero_id: 'hero-stinger', icon: 'src/assets/icons/heroes/hero_dungeon_3_stinger.png', faction: 'Mazmorra', faction_id: 'dungeon', nameEs: 'Stinger', nameEn: 'Stinger' },
  { hero_id: 'hero-kieran', icon: 'src/assets/icons/heroes/hero_dungeon_4_blind_kieran.png', faction: 'Mazmorra', faction_id: 'dungeon', nameEs: 'Kieran', nameEn: 'Kieran' },
  { hero_id: 'hero-mouaren', icon: 'src/assets/icons/heroes/hero_dungeon_5_mouaren.png', faction: 'Mazmorra', faction_id: 'dungeon', nameEs: 'Mouaren', nameEn: 'Mouaren' },
  { hero_id: 'hero-devir', icon: 'src/assets/icons/heroes/hero_dungeon_6_devir.png', faction: 'Mazmorra', faction_id: 'dungeon', nameEs: 'Devir', nameEn: 'Devir' },
  { hero_id: 'hero-creta', icon: 'src/assets/icons/heroes/hero_dungeon_7_creta.png', faction: 'Mazmorra', faction_id: 'dungeon', nameEs: 'Creta', nameEn: 'Creta' },
  { hero_id: 'hero-rhea', icon: 'src/assets/icons/heroes/hero_dungeon_8_rhea.png', faction: 'Mazmorra', faction_id: 'dungeon', nameEs: 'Rhea', nameEn: 'Rhea' },
  { hero_id: 'hero-gleard', icon: 'src/assets/icons/heroes/hero_dungeon_9_gleard.png', faction: 'Mazmorra', faction_id: 'dungeon', nameEs: 'Gleard', nameEn: 'Gleard' },
  { hero_id: 'hero-kelarr', icon: 'src/assets/icons/heroes/hero_dungeon_10_kelarr.png', faction: 'Mazmorra', faction_id: 'dungeon', nameEs: 'Kelarr', nameEn: 'Kelarr' },
  { hero_id: 'hero-zakron', icon: 'src/assets/icons/heroes/hero_dungeon_11_zachron.png', faction: 'Mazmorra', faction_id: 'dungeon', nameEs: 'Zakron', nameEn: 'Zakron' },
  { hero_id: 'hero-deira', icon: 'src/assets/icons/heroes/hero_dungeon_12_sister_deira.png', faction: 'Mazmorra', faction_id: 'dungeon', nameEs: 'Deira', nameEn: 'Deira' },
  { hero_id: 'hero-motley', icon: 'src/assets/icons/heroes/hero_dungeon_13_motley.png', faction: 'Mazmorra', faction_id: 'dungeon', nameEs: 'Motley', nameEn: 'Motley' },
  { hero_id: 'hero-ylwari', icon: 'src/assets/icons/heroes/hero_dungeon_14_ylwara.png', faction: 'Mazmorra', faction_id: 'dungeon', nameEs: 'Ylwari', nameEn: 'Ylwari' },
  { hero_id: 'hero-glastor', icon: 'src/assets/icons/heroes/hero_dungeon_15_glastor.png', faction: 'Mazmorra', faction_id: 'dungeon', nameEs: 'Glastor', nameEn: 'Glastor' },
  { hero_id: 'hero-typhona', icon: 'src/assets/icons/heroes/hero_dungeon_16_typhona.png', faction: 'Mazmorra', faction_id: 'dungeon', nameEs: 'Typhona', nameEn: 'Typhona' },
  { hero_id: 'hero-sunny', icon: 'src/assets/icons/heroes/hero_dungeon_17_sunny_rauktol.png', faction: 'Mazmorra', faction_id: 'dungeon', nameEs: 'Sunny', nameEn: 'Sunny' },
  { hero_id: 'hero-lodos', icon: 'src/assets/icons/heroes/hero_dungeon_18_lodos.png', faction: 'Mazmorra', faction_id: 'dungeon', nameEs: 'Lodos', nameEn: 'Lodos' },

  // Templo (human) - posiciones 1-18
  { hero_id: 'hero-ister', icon: 'src/assets/icons/heroes/hero_human_1_ister.png', faction: 'Templo', faction_id: 'human', nameEs: 'Ister', nameEn: 'Ister' },
  { hero_id: 'hero-leon-manospegajosas', icon: 'src/assets/icons/heroes/hero_human_2_leon_sticky_fingers.png', faction: 'Templo', faction_id: 'human', nameEs: 'Leon Manos Pegajosas', nameEn: 'Leon Sticky Fingers' },
  { hero_id: 'hero-john-johnson', icon: 'src/assets/icons/heroes/hero_human_3_john_johnson.png', faction: 'Templo', faction_id: 'human', nameEs: 'John Johnson', nameEn: 'John Johnson' },
  { hero_id: 'hero-kestrel', icon: 'src/assets/icons/heroes/hero_human_4_kestrel.png', faction: 'Templo', faction_id: 'human', nameEs: 'Kestrel', nameEn: 'Kestrel' },
  { hero_id: 'hero-aeos-exaltada', icon: 'src/assets/icons/heroes/hero_human_5_aeos_the_exalted.png', faction: 'Templo', faction_id: 'human', nameEs: 'Aeos Exaltada', nameEn: 'Aeos the Exalted' },
  { hero_id: 'hero-heretic-avis', icon: 'src/assets/icons/heroes/hero_human_6_heretic_avis.png', faction: 'Templo', faction_id: 'human', nameEs: 'Heretic Avis', nameEn: 'Heretic Avis' },
  { hero_id: 'hero-leandra', icon: 'src/assets/icons/heroes/hero_human_7_leandra.png', faction: 'Templo', faction_id: 'human', nameEs: 'Leandra', nameEn: 'Leandra' },
  { hero_id: 'hero-lord-edgar', icon: 'src/assets/icons/heroes/hero_human_8_lord_edgar.png', faction: 'Templo', faction_id: 'human', nameEs: 'Lord Edgar', nameEn: 'Lord Edgar' },
  { hero_id: 'hero-old-lord-mandall', icon: 'src/assets/icons/heroes/hero_human_9_old_lord_mandall.png', faction: 'Templo', faction_id: 'human', nameEs: 'Old Lord Mandall', nameEn: 'Old Lord Mandall' },
  { hero_id: 'hero-merry-elias', icon: 'src/assets/icons/heroes/hero_human_10_merry_elias.png', faction: 'Templo', faction_id: 'human', nameEs: 'Merry Elias', nameEn: 'Merry Elias' },
  { hero_id: 'hero-pip', icon: 'src/assets/icons/heroes/hero_human_11_pip.png', faction: 'Templo', faction_id: 'human', nameEs: 'Pip', nameEn: 'Pip' },
  { hero_id: 'hero-zenith', icon: 'src/assets/icons/heroes/hero_human_12_zenith.png', faction: 'Templo', faction_id: 'human', nameEs: 'Zenith', nameEn: 'Zenith' },
  { hero_id: 'hero-lia-the-untethered', icon: 'src/assets/icons/heroes/hero_human_13_lia_the_untethered.png', faction: 'Templo', faction_id: 'human', nameEs: 'Lia the Untethered', nameEn: 'Lia the Untethered' },
  { hero_id: 'hero-julius', icon: 'src/assets/icons/heroes/hero_human_14_julius.png', faction: 'Templo', faction_id: 'human', nameEs: 'Julius', nameEn: 'Julius' },
  { hero_id: 'hero-vesper', icon: 'src/assets/icons/heroes/hero_human_15_vesper.png', faction: 'Templo', faction_id: 'human', nameEs: 'Vesper', nameEn: 'Vesper' },
  { hero_id: 'hero-anastasia-the-meek', icon: 'src/assets/icons/heroes/hero_human_16_anastasia_the_meek.png', faction: 'Templo', faction_id: 'human', nameEs: 'Anastasia the Meek', nameEn: 'Anastasia the Meek' },
  { hero_id: 'hero-nadir', icon: 'src/assets/icons/heroes/hero_human_17_nadir.png', faction: 'Templo', faction_id: 'human', nameEs: 'Nadir', nameEn: 'Nadir' },
  { hero_id: 'hero-clarissa', icon: 'src/assets/icons/heroes/hero_human_18_clarissa.png', faction: 'Templo', faction_id: 'human', nameEs: 'Clarissa', nameEn: 'Clarissa' },

  // Arboleda (nature) - posiciones 1-18
  { hero_id: 'hero-eith', icon: 'src/assets/icons/heroes/hero_nature_1_eith.png', faction: 'Arboleda', faction_id: 'nature', nameEs: 'Eith', nameEn: 'Eith' },
  { hero_id: 'hero-gorel-spearhead', icon: 'src/assets/icons/heroes/hero_nature_2_gorel_spearhead.png', faction: 'Arboleda', faction_id: 'nature', nameEs: 'Gorel Spearhead', nameEn: 'Gorel Spearhead' },
  { hero_id: 'hero-gingertail', icon: 'src/assets/icons/heroes/hero_nature_3_gingertail.png', faction: 'Arboleda', faction_id: 'nature', nameEs: 'Gingertail', nameEn: 'Gingertail' },
  { hero_id: 'hero-old-peregrinator', icon: 'src/assets/icons/heroes/hero_nature_4_old_peregrinator.png', faction: 'Arboleda', faction_id: 'nature', nameEs: 'Old Peregrinator', nameEn: 'Old Peregrinator' },
  { hero_id: 'hero-octavia', icon: 'src/assets/icons/heroes/hero_nature_5_octavia.png', faction: 'Arboleda', faction_id: 'nature', nameEs: 'Octavia', nameEn: 'Octavia' },
  { hero_id: 'hero-mreowa', icon: 'src/assets/icons/heroes/hero_nature_6_mreowa.png', faction: 'Arboleda', faction_id: 'nature', nameEs: 'Mreowa', nameEn: 'Mreowa' },
  { hero_id: 'hero-faleor', icon: 'src/assets/icons/heroes/hero_nature_7_faleor.png', faction: 'Arboleda', faction_id: 'nature', nameEs: 'Faleor', nameEn: 'Faleor' },
  { hero_id: 'hero-alluring-sha', icon: 'src/assets/icons/heroes/hero_nature_8_alluring_sha.png', faction: 'Arboleda', faction_id: 'nature', nameEs: 'Alluring Sha', nameEn: 'Alluring Sha' },
  { hero_id: 'hero-aunt-daliar', icon: 'src/assets/icons/heroes/hero_nature_9_aunt_daliar.png', faction: 'Arboleda', faction_id: 'nature', nameEs: 'Aunt Daliar', nameEn: 'Aunt Daliar' },
  { hero_id: 'hero-vatawna', icon: 'src/assets/icons/heroes/hero_nature_10_vatawna.png', faction: 'Arboleda', faction_id: 'nature', nameEs: 'Vatawna', nameEn: 'Vatawna' },
  { hero_id: 'hero-elder-tsskish', icon: 'src/assets/icons/heroes/hero_nature_11_elder_tsskish.png', faction: 'Arboleda', faction_id: 'nature', nameEs: 'Elder Tsskish', nameEn: 'Elder Tsskish' },
  { hero_id: 'hero-capreola', icon: 'src/assets/icons/heroes/hero_nature_12_capreola.png', faction: 'Arboleda', faction_id: 'nature', nameEs: 'Capreola', nameEn: 'Capreola' },
  { hero_id: 'hero-glacia', icon: 'src/assets/icons/heroes/hero_nature_13_glacia.png', faction: 'Arboleda', faction_id: 'nature', nameEs: 'Glacia', nameEn: 'Glacia' },
  { hero_id: 'hero-vim', icon: 'src/assets/icons/heroes/hero_nature_14_vim.png', faction: 'Arboleda', faction_id: 'nature', nameEs: 'Vim', nameEn: 'Vim' },
  { hero_id: 'hero-halon', icon: 'src/assets/icons/heroes/hero_nature_15_halon.png', faction: 'Arboleda', faction_id: 'nature', nameEs: 'Halon', nameEn: 'Halon' },
  { hero_id: 'hero-echolalia', icon: 'src/assets/icons/heroes/hero_nature_16_echolalia.png', faction: 'Arboleda', faction_id: 'nature', nameEs: 'Echolalia', nameEn: 'Echolalia' },
  { hero_id: 'hero-sullie', icon: 'src/assets/icons/heroes/hero_nature_17_sullie.png', faction: 'Arboleda', faction_id: 'nature', nameEs: 'Sullie', nameEn: 'Sullie' },
  { hero_id: 'hero-mute-minstrel', icon: 'src/assets/icons/heroes/hero_nature_18_mute_minstrel.png', faction: 'Arboleda', faction_id: 'nature', nameEs: 'Mute Minstrel', nameEn: 'Mute Minstrel' },

  // Necrópolis (necromancer) - posiciones 1-18
  { hero_id: 'hero-baluarte', icon: 'src/assets/icons/heroes/hero_necromancer_1_bulwark.png', faction: 'Necrópolis', faction_id: 'necromancer', nameEs: 'Baluarte', nameEn: 'Bulwark' },
  { hero_id: 'hero-rey-de-reyes', icon: 'src/assets/icons/heroes/hero_necromancer_2_king_of_kings.png', faction: 'Necrópolis', faction_id: 'necromancer', nameEs: 'Rey de Reyes', nameEn: 'King of Kings' },
  { hero_id: 'hero-onkos', icon: 'src/assets/icons/heroes/hero_necromancer_3_onkos.png', faction: 'Necrópolis', faction_id: 'necromancer', nameEs: 'Onkos', nameEn: 'Onkos' },
  { hero_id: 'hero-kelghul', icon: 'src/assets/icons/heroes/hero_necromancer_4_kelghul.png', faction: 'Necrópolis', faction_id: 'necromancer', nameEs: 'Kelghul', nameEn: 'Kelghul' },
  { hero_id: 'hero-natalida', icon: 'src/assets/icons/heroes/hero_necromancer_5_natalida.png', faction: 'Necrópolis', faction_id: 'necromancer', nameEs: 'Natalida', nameEn: 'Natalida' },
  { hero_id: 'hero-artorius-veritas', icon: 'src/assets/icons/heroes/hero_necromancer_6_artorius_veritas.png', faction: 'Necrópolis', faction_id: 'necromancer', nameEs: 'Artorius Veritas', nameEn: 'Artorius Veritas' },
  { hero_id: 'hero-marl', icon: 'src/assets/icons/heroes/hero_necromancer_7_marl.png', faction: 'Necrópolis', faction_id: 'necromancer', nameEs: 'Marl', nameEn: 'Marl' },
  { hero_id: 'hero-iratus', icon: 'src/assets/icons/heroes/hero_necromancer_8_iratus.png', faction: 'Necrópolis', faction_id: 'necromancer', nameEs: 'Iratus', nameEn: 'Iratus' },
  { hero_id: 'hero-zam', icon: 'src/assets/icons/heroes/hero_necromancer_9_zam.png', faction: 'Necrópolis', faction_id: 'necromancer', nameEs: 'Zam', nameEn: 'Zam' },
  { hero_id: 'hero-mag', icon: 'src/assets/icons/heroes/hero_necromancer_10_mag.png', faction: 'Necrópolis', faction_id: 'necromancer', nameEs: 'Mag', nameEn: 'Mag' },
  { hero_id: 'hero-adahn', icon: 'src/assets/icons/heroes/hero_necromancer_11_adahn.png', faction: 'Necrópolis', faction_id: 'necromancer', nameEs: 'Adahn', nameEn: 'Adahn' },
  { hero_id: 'hero-ethric', icon: 'src/assets/icons/heroes/hero_necromancer_12_ethric.png', faction: 'Necrópolis', faction_id: 'necromancer', nameEs: 'Ethric', nameEn: 'Ethric' },
  { hero_id: 'hero-klasto', icon: 'src/assets/icons/heroes/hero_necromancer_13_klasto.png', faction: 'Necrópolis', faction_id: 'necromancer', nameEs: 'Klasto', nameEn: 'Klasto' },
  { hero_id: 'hero-oona-tejesombras', icon: 'src/assets/icons/heroes/hero_necromancer_14_shadespinner_oona.png', faction: 'Necrópolis', faction_id: 'necromancer', nameEs: 'Oona Tejesombras', nameEn: 'Shadespinner Oona' },
  { hero_id: 'hero-laura', icon: 'src/assets/icons/heroes/hero_necromancer_15_laura.png', faction: 'Necrópolis', faction_id: 'necromancer', nameEs: 'Laura', nameEn: 'Laura' },
  { hero_id: 'hero-lord-rufus', icon: 'src/assets/icons/heroes/hero_necromancer_16_lord_rufus.png', faction: 'Necrópolis', faction_id: 'necromancer', nameEs: 'Lord Rufus', nameEn: 'Lord Rufus' },
  { hero_id: 'hero-funerella', icon: 'src/assets/icons/heroes/hero_necromancer_17_funerella.png', faction: 'Necrópolis', faction_id: 'necromancer', nameEs: 'Funerella', nameEn: 'Funerella' },
  { hero_id: 'hero-milossa-the-golden', icon: 'src/assets/icons/heroes/hero_necromancer_18_milossa_the_golden.png', faction: 'Necrópolis', faction_id: 'necromancer', nameEs: 'Milossa the Golden', nameEn: 'Milossa the Golden' },

  // Enjambre (demon) - posiciones 1-18
  { hero_id: 'hero-abigor-enjambre', icon: 'src/assets/icons/heroes/hero_demon_1_x_nieven.png', faction: 'Enjambre', faction_id: 'demon', nameEs: 'Abigor', nameEn: 'Abigor' },
  { hero_id: 'hero-curson-enjambre', icon: 'src/assets/icons/heroes/hero_demon_2_maelstrom.png', faction: 'Enjambre', faction_id: 'demon', nameEs: 'Curson', nameEn: 'Curson' },
  { hero_id: 'hero-zoran-enjambre', icon: 'src/assets/icons/heroes/hero_demon_3_x_ubunor.png', faction: 'Enjambre', faction_id: 'demon', nameEs: 'Zoran', nameEn: 'Zoran' },
  { hero_id: 'hero-niev-enjambre', icon: 'src/assets/icons/heroes/hero_demon_4_zoran_self_founded.png', faction: 'Enjambre', faction_id: 'demon', nameEs: 'Niev', nameEn: 'Niev' },
  { hero_id: 'hero-nor-enjambre', icon: 'src/assets/icons/heroes/hero_demon_5_purson_duke_of_rage.png', faction: 'Enjambre', faction_id: 'demon', nameEs: 'Nor', nameEn: 'Nor' },
  { hero_id: 'hero-xtaviola', icon: 'src/assets/icons/heroes/hero_demon_6_xtaviola.png', faction: 'Enjambre', faction_id: 'demon', nameEs: 'Xtaviola', nameEn: 'Xtaviola' },
  { hero_id: 'hero-x-lo', icon: 'src/assets/icons/heroes/hero_demon_7_x_lo.png', faction: 'Enjambre', faction_id: 'demon', nameEs: 'X-Lo', nameEn: 'X-Lo' },
  { hero_id: 'hero-goldentongue', icon: 'src/assets/icons/heroes/hero_demon_8_goldentongue.png', faction: 'Enjambre', faction_id: 'demon', nameEs: 'Goldentongue', nameEn: 'Goldentongue' },
  { hero_id: 'hero-eligos-duke-of-battle', icon: 'src/assets/icons/heroes/hero_demon_9_eligos_duke_of_battle.png', faction: 'Enjambre', faction_id: 'demon', nameEs: 'Eligos Duke of Battle', nameEn: 'Eligos Duke of Battle' },
  { hero_id: 'hero-fleu', icon: 'src/assets/icons/heroes/hero_demon_10_fleu.png', faction: 'Enjambre', faction_id: 'demon', nameEs: 'Fleu', nameEn: 'Fleu' },
  { hero_id: 'hero-x-ramman', icon: 'src/assets/icons/heroes/hero_demon_11_x_ramman.png', faction: 'Enjambre', faction_id: 'demon', nameEs: 'X-Ramman', nameEn: 'X-Ramman' },
  { hero_id: 'hero-bathin-duke-of-jewels', icon: 'src/assets/icons/heroes/hero_demon_12_bathin_duke_of_jewels.png', faction: 'Enjambre', faction_id: 'demon', nameEs: 'Bathin Duke of Jewels', nameEn: 'Bathin Duke of Jewels' },
  { hero_id: 'hero-x-aleria', icon: 'src/assets/icons/heroes/hero_demon_13_x_aleria.png', faction: 'Enjambre', faction_id: 'demon', nameEs: 'X-Aleria', nameEn: 'X-Aleria' },
  { hero_id: 'hero-grooo', icon: 'src/assets/icons/heroes/hero_demon_14_grooo.png', faction: 'Enjambre', faction_id: 'demon', nameEs: 'Grooo', nameEn: 'Grooo' },
  { hero_id: 'hero-x-mila', icon: 'src/assets/icons/heroes/hero_demon_15_x_mila.png', faction: 'Enjambre', faction_id: 'demon', nameEs: 'X-Mila', nameEn: 'X-Mila' },
  { hero_id: 'hero-oriax', icon: 'src/assets/icons/heroes/hero_demon_16_oriax.png', faction: 'Enjambre', faction_id: 'demon', nameEs: 'Oriax', nameEn: 'Oriax' },
  { hero_id: 'hero-hera-hera', icon: 'src/assets/icons/heroes/hero_demon_17_hera-hera.png', faction: 'Enjambre', faction_id: 'demon', nameEs: 'Hera-Hera', nameEn: 'Hera-Hera' },
  { hero_id: 'hero-pauper-x-wistari', icon: 'src/assets/icons/heroes/hero_demon_18_pauper_x_wistari.png', faction: 'Enjambre', faction_id: 'demon', nameEs: 'Pauper X-Wistari', nameEn: 'Pauper X-Wistari' },

  // Cisma (unfrozen) - posiciones 1-18
  { hero_id: 'hero-nihil', icon: 'src/assets/icons/heroes/hero_unfrozen_1_nihil.png', faction: 'Cisma', faction_id: 'unfrozen', nameEs: 'Nihil', nameEn: 'Nihil' },
  { hero_id: 'hero-cuerno-negro', icon: 'src/assets/icons/heroes/hero_unfrozen_2_blackhorn.png', faction: 'Cisma', faction_id: 'unfrozen', nameEs: 'Cuerno Negro', nameEn: 'Blackhorn' },
  { hero_id: 'hero-matastala-la-blanca', icon: 'src/assets/icons/heroes/hero_unfrozen_3_matastala_the_white.png', faction: 'Cisma', faction_id: 'unfrozen', nameEs: 'Matastala la Blanca', nameEn: 'Matastala the White' },
  { hero_id: 'hero-janhei', icon: 'src/assets/icons/heroes/hero_unfrozen_4_janhei.png', faction: 'Cisma', faction_id: 'unfrozen', nameEs: 'Janhei', nameEn: 'Janhei' },
  { hero_id: 'hero-mara-matha', icon: 'src/assets/icons/heroes/hero_unfrozen_5_mara_matha.png', faction: 'Cisma', faction_id: 'unfrozen', nameEs: 'Mara Matha', nameEn: 'Mara Matha' },
  { hero_id: 'hero-el-doncel-de-hierro', icon: 'src/assets/icons/heroes/hero_unfrozen_6_iron_master.png', faction: 'Cisma', faction_id: 'unfrozen', nameEs: 'El Doncel de Hierro', nameEn: 'Iron Master' },
  { hero_id: 'hero-walkha', icon: 'src/assets/icons/heroes/hero_unfrozen_7_walkha.png', faction: 'Cisma', faction_id: 'unfrozen', nameEs: 'Walkha', nameEn: 'Walkha' },
  { hero_id: 'hero-urgo-el-cambiante', icon: 'src/assets/icons/heroes/hero_unfrozen_8_changeling_urgo.png', faction: 'Cisma', faction_id: 'unfrozen', nameEs: 'Urgo el Cambiante', nameEn: 'Changeling Urgo' },
  { hero_id: 'hero-martir-tho', icon: 'src/assets/icons/heroes/hero_unfrozen_9_martyr_tho.png', faction: 'Cisma', faction_id: 'unfrozen', nameEs: 'Martir Tho', nameEn: 'Martyr Tho' },
  { hero_id: 'hero-grellekh-el-traidor', icon: 'src/assets/icons/heroes/hero_unfrozen_10_grellekh.png', faction: 'Cisma', faction_id: 'unfrozen', nameEs: 'Grellekh el Traidor', nameEn: 'Grellekh the Traitor' },
  { hero_id: 'hero-reina-de-hielo-helghat', icon: 'src/assets/icons/heroes/hero_unfrozen_11_ice_queen_ort.png', faction: 'Cisma', faction_id: 'unfrozen', nameEs: 'Reina de Hielo Helghat', nameEn: 'Ice Queen Helghat' },
  { hero_id: 'hero-kwinri', icon: 'src/assets/icons/heroes/hero_unfrozen_12_kwinri.png', faction: 'Cisma', faction_id: 'unfrozen', nameEs: 'Kwinri', nameEn: 'Kwinri' },
  { hero_id: 'hero-la-mirada-colectiva', icon: 'src/assets/icons/heroes/hero_unfrozen_13_the_eye_colletcive.png', faction: 'Cisma', faction_id: 'unfrozen', nameEs: 'La Mirada Colectiva', nameEn: 'The Eye Collective' },
  { hero_id: 'hero-tolketh', icon: 'src/assets/icons/heroes/hero_unfrozen_14_tolketh_guiding_star.png', faction: 'Cisma', faction_id: 'unfrozen', nameEs: 'Tolketh', nameEn: 'Tolketh' },
  { hero_id: 'hero-ulkuth', icon: 'src/assets/icons/heroes/hero_unfrozen_15_ulkuth.png', faction: 'Cisma', faction_id: 'unfrozen', nameEs: 'Ulkuth', nameEn: 'Ulkuth' },
  { hero_id: 'hero-radavok', icon: 'src/assets/icons/heroes/hero_unfrozen_16_ra_daphokh.png', faction: 'Cisma', faction_id: 'unfrozen', nameEs: 'Radavok', nameEn: 'Radavok' },
  { hero_id: 'hero-hermana-keiri', icon: 'src/assets/icons/heroes/hero_unfrozen_17_sister_keiri.png', faction: 'Cisma', faction_id: 'unfrozen', nameEs: 'Hermana Keiri', nameEn: 'Sister Keiri' },
  { hero_id: 'hero-dhuvri', icon: 'src/assets/icons/heroes/hero_unfrozen_18_dhuvri.png', faction: 'Cisma', faction_id: 'unfrozen', nameEs: 'Dhuvri', nameEn: 'Dhuvri' },
];*/

// Mapa rapido O(1) por hero_id y por nombre normalizado
const HERO_NORM_MAP = new Map<string, HeroAssetEntry>();

function normalizeStr(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’\-_]/g, '')
    .trim();
}

/*HERO_ASSETS_CATALOG.forEach((entry) => {
  HERO_NORM_MAP.set(entry.hero_id.toLowerCase(), entry);
  HERO_NORM_MAP.set(normalizeStr(entry.nameEs), entry);
  HERO_NORM_MAP.set(normalizeStr(entry.nameEn), entry);
  if (entry.hero_id.includes('-')) {
    HERO_NORM_MAP.set(entry.hero_id.toLowerCase(), entry);
  }
});*/

export function getHeroPortrait(nameOrId: string, faction?: string): string | undefined {
  if (!nameOrId) return undefined;

  // 1. Catalogo explicito por hero_id (mas confiable)
  const key = nameOrId.toLowerCase();
  if (HERO_NORM_MAP.has(key)) {
    const entry = HERO_NORM_MAP.get(key)!;
    // Si se pasa faccion, verificar consistencia (opcional)
    return entry.icon;
  }

  // 2. Intentar con nombre normalizado
  const normKey = normalizeStr(nameOrId);
  if (HERO_NORM_MAP.has(normKey)) {
    return HERO_NORM_MAP.get(normKey)!.icon;
  }

  // 3. Fallback: buscar por posicion numerica + faccion (para casos sin catalogo)
  const numericPos = parseInt(nameOrId, 10);
  if (!isNaN(numericPos) && numericPos >= 1 && numericPos <= 18 && faction) {
    const prefixes = FACTION_PREFIX_MAP[faction] || [faction.toLowerCase()];
    for (const prefix of prefixes) {
      const path = `src/assets/icons/heroes/hero_${prefix}_${numericPos}_`;
      // No podemos resolver sin glob aqui; devolver ruta estimada
      // El componente usara import.meta.glob para resolver
      return `src/assets/icons/heroes/hero_${prefix}_${numericPos}_placeholder.png`;
    }
  }

  // 4. Fallback final: buscar en modulos importados
  const heroImageModules = (import.meta as any).glob
    ? (import.meta as any).glob('src/assets/icons/heroes/hero_*.png', { eager: true, query: '?url', import: 'default' })
    : {};
  for (const [modPath] of Object.entries(heroImageModules)) {
    const fileName = (modPath as string).split('/').pop() || '';
    const fileBase = fileName.replace(/^hero_/, '').replace(/\.png$/, '');
    if (normalizeStr(fileBase).includes(normKey)) {
      return modPath as string;
    }
  }

  return undefined;
}
