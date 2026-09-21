import { BuildStep, UnitInfo, HeroWithExtras, TacticalScenario, FactionLaw, FactionLawPreset } from '../types';
import { getHeroesByFactionKey } from './heroesData';

// Mazmorra (Dungeon)
import { FULL_56_DAY_BUILD_STEPS, DUNGEON_UNITS, DUNGEON_HEROES, TACTICAL_SCENARIOS } from './dungeonData';
import { FACTION_LAWS, FACTION_LAW_PRESETS } from './factionLawsData';

// Templo (Temple)
import { TEMPLE_56_DAY_BUILD_STEPS, TEMPLE_UNITS, TEMPLE_HEROES, TEMPLE_COMBAT_TACTICS } from './templeData';
import { TEMPLE_FACTION_LAWS, TEMPLE_LAW_PRESETS } from './templeLawsData';

// Arboleda (Sylvan)
import { ARBOLEDA_56_DAY_BUILD_STEPS, ARBOLEDA_UNITS, ARBOLEDA_HEROES, ARBOLEDA_COMBAT_TACTICS } from './arboledaData';
import { ARBOLEDA_FACTION_LAWS, ARBOLEDA_LAW_PRESETS } from './arboledaLawsData';

// Necrópolis (Necropolis)
import { NECROPOLIS_56_DAY_BUILD_STEPS, NECROPOLIS_UNITS, NECROPOLIS_HEROES, NECROPOLIS_COMBAT_TACTICS } from './necropolisData';
import { NECROPOLIS_FACTION_LAWS, NECROPOLIS_LAW_PRESETS } from './necropolisLawsData';

// Enjambre (Swarm / Hive)
import { ENJAMBRE_56_DAY_BUILD_STEPS, ENJAMBRE_UNITS, ENJAMBRE_HEROES, ENJAMBRE_COMBAT_TACTICS } from './enjambreData';
import { ENJAMBRE_FACTION_LAWS, ENJAMBRE_LAW_PRESETS } from './enjambreLawsData';

// Cisma (Schism / Arcane)
import { CISMA_56_DAY_BUILD_STEPS, CISMA_UNITS, CISMA_HEROES, CISMA_COMBAT_TACTICS } from './cismaData';
import { CISMA_FACTION_LAWS, CISMA_LAW_PRESETS } from './cismaLawsData';

export type FactionId = 'Mazmorra' | 'Templo' | 'Foresta' | 'Necrópolis' | 'Colmena' | 'Cisma';

export interface FactionTheme {
  id: FactionId;
  name: string;
  themeName: string;
  primary: 'purple' | 'amber' | 'emerald' | 'sky' | 'slate' | 'orange';
  hexPrimary: string;
  gradientBg: string;
  glow: string;
  glowBorder: string;
  border: string;
  borderSubtle: string;
  borderHover: string;
  bgCard: string;
  bgBadge: string;
  bgSubtle: string;
  bgButton: string;
  bgButtonHover: string;
  primaryButton: string;
  shadowAccent: string;
  textAccent: string;
  textAccentHover: string;
  textMuted: string;
  tabActive: string;
  pillActive: string;
  iconColor: string;
  selectionClass: string;
  scrollbarThumbRgba: string;
  badgeBorder: string;
  headerBorder: string;
  dropdownBorder: string;
  cardBorder: string;
  cardGlowHover: string;
  tacticalPlate: string;
  heroBannerBg: string;
  runeBorder: string;
  statGlow: string;
}

export interface FactionMetadata {
  id: FactionId;
  name: string;
  nameEn: string;
  region: string;
  alignment: string;
  primaryMechanic: string;
  primaryMechanicDesc: string;
  startingGold: string;
  colorScheme: {
    primary: string;
    border: string;
    bgBadge: string;
    textAccent: string;
    glow: string;
  };
  status: 'completo' | 'desarrollo';
}

export const FACTION_THEMES: Record<FactionId, FactionTheme> = {
  Mazmorra: {
    id: 'Mazmorra',
    name: 'Mazmorra',
    themeName: 'Morado Sombrío',
    primary: 'purple',
    hexPrimary: '#a855f7',
    gradientBg: 'radial-gradient(circle at 50% 0%, #24103c 0%, #0d0a14 55%, #08070b 100%)',
    glow: 'shadow-[0_0_22px_rgba(168,85,247,0.35)]',
    glowBorder: 'rgba(168,85,247,0.4)',
    border: 'border-2 border-purple-600/70',
    borderSubtle: 'border-purple-900/50',
    borderHover: 'hover:border-purple-400',
    bgCard: 'bg-[#120d1c]/90',
    bgBadge: 'bg-purple-950/80',
    bgSubtle: 'bg-purple-950/40',
    bgButton: 'bg-purple-600 hover:bg-purple-500 text-white font-bold',
    bgButtonHover: 'hover:bg-purple-500',
    primaryButton: 'bg-purple-600 hover:bg-purple-500 text-white font-bold border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]',
    shadowAccent: 'shadow-[0_0_25px_rgba(168,85,247,0.35)]',
    textAccent: 'text-purple-400',
    textAccentHover: 'hover:text-purple-300',
    textMuted: 'text-purple-300/70',
    tabActive: 'bg-purple-900/90 text-white shadow-[0_0_18px_rgba(168,85,247,0.55)] border-2 border-purple-400 font-bold',
    pillActive: 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/50',
    iconColor: 'text-purple-400',
    selectionClass: 'selection:bg-purple-600 selection:text-white',
    scrollbarThumbRgba: 'rgba(168, 85, 247, 0.45)',
    badgeBorder: 'border-purple-700/60',
    headerBorder: 'border-purple-900/70',
    dropdownBorder: 'border-purple-700/80',
    cardBorder: 'border-2 border-purple-600/60',
    cardGlowHover: 'hover:shadow-[0_0_22px_rgba(168,85,247,0.4)] hover:border-purple-400',
    tacticalPlate: 'bg-[#150f24]/90 border border-purple-800/60',
    heroBannerBg: 'bg-gradient-to-r from-purple-950/90 via-[#170e28]/95 to-[#0d0a14]/95',
    runeBorder: 'border-purple-500/60',
    statGlow: 'shadow-[0_0_10px_rgba(168,85,247,0.6)]',
  },
  Templo: {
    id: 'Templo',
    name: 'Templo',
    themeName: 'Dorado Sagrado',
    primary: 'amber',
    hexPrimary: '#f59e0b',
    gradientBg: 'radial-gradient(circle at 50% 0%, #3a2507 0%, #150f05 55%, #090805 100%)',
    glow: 'shadow-[0_0_22px_rgba(245,158,11,0.35)]',
    glowBorder: 'rgba(245,158,11,0.4)',
    border: 'border-2 border-amber-500/70',
    borderSubtle: 'border-amber-900/50',
    borderHover: 'hover:border-amber-400',
    bgCard: 'bg-[#181308]/90',
    bgBadge: 'bg-amber-950/80',
    bgSubtle: 'bg-amber-950/40',
    bgButton: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold',
    bgButtonHover: 'hover:bg-amber-400',
    primaryButton: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold border border-yellow-300 shadow-[0_0_15px_rgba(245,158,11,0.4)]',
    shadowAccent: 'shadow-[0_0_25px_rgba(245,158,11,0.35)]',
    textAccent: 'text-amber-400',
    textAccentHover: 'hover:text-amber-300',
    textMuted: 'text-amber-300/70',
    tabActive: 'bg-amber-900/90 text-amber-100 shadow-[0_0_18px_rgba(245,158,11,0.55)] border-2 border-amber-400 font-bold',
    pillActive: 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/50',
    iconColor: 'text-amber-400',
    selectionClass: 'selection:bg-amber-500 selection:text-slate-950',
    scrollbarThumbRgba: 'rgba(245, 158, 11, 0.45)',
    badgeBorder: 'border-amber-700/60',
    headerBorder: 'border-amber-900/70',
    dropdownBorder: 'border-amber-700/80',
    cardBorder: 'border-2 border-amber-500/60',
    cardGlowHover: 'hover:shadow-[0_0_22px_rgba(245,158,11,0.4)] hover:border-amber-400',
    tacticalPlate: 'bg-[#1f170b]/90 border border-amber-800/60',
    heroBannerBg: 'bg-gradient-to-r from-amber-950/90 via-[#211707]/95 to-[#120d04]/95',
    runeBorder: 'border-amber-500/60',
    statGlow: 'shadow-[0_0_10px_rgba(245,158,11,0.6)]',
  },
  Foresta: {
    id: 'Foresta',
    name: 'Foresta',
    themeName: 'Verde Silvano',
    primary: 'emerald',
    hexPrimary: '#10b981',
    gradientBg: 'radial-gradient(circle at 50% 0%, #0d3020 0%, #07170f 55%, #050b07 100%)',
    glow: 'shadow-[0_0_22px_rgba(16,185,129,0.35)]',
    glowBorder: 'rgba(16,185,129,0.4)',
    border: 'border-2 border-emerald-600/70',
    borderSubtle: 'border-emerald-900/50',
    borderHover: 'hover:border-emerald-400',
    bgCard: 'bg-[#0a1811]/90',
    bgBadge: 'bg-emerald-950/80',
    bgSubtle: 'bg-emerald-950/40',
    bgButton: 'bg-emerald-600 hover:bg-emerald-500 text-white font-bold',
    bgButtonHover: 'hover:bg-emerald-500',
    primaryButton: 'bg-emerald-600 hover:bg-emerald-500 text-white font-bold border border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]',
    shadowAccent: 'shadow-[0_0_25px_rgba(16,185,129,0.35)]',
    textAccent: 'text-emerald-400',
    textAccentHover: 'hover:text-emerald-300',
    textMuted: 'text-emerald-300/70',
    tabActive: 'bg-emerald-900/90 text-white shadow-[0_0_18px_rgba(16,185,129,0.55)] border-2 border-emerald-400 font-bold',
    pillActive: 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/50',
    iconColor: 'text-emerald-400',
    selectionClass: 'selection:bg-emerald-500 selection:text-slate-950',
    scrollbarThumbRgba: 'rgba(16, 185, 129, 0.45)',
    badgeBorder: 'border-emerald-700/60',
    headerBorder: 'border-emerald-900/70',
    dropdownBorder: 'border-emerald-700/80',
    cardBorder: 'border-2 border-emerald-600/60',
    cardGlowHover: 'hover:shadow-[0_0_22px_rgba(16,185,129,0.4)] hover:border-emerald-400',
    tacticalPlate: 'bg-[#0e2117]/90 border border-emerald-800/60',
    heroBannerBg: 'bg-gradient-to-r from-emerald-950/90 via-[#0d2217]/95 to-[#06120b]/95',
    runeBorder: 'border-emerald-500/60',
    statGlow: 'shadow-[0_0_10px_rgba(16,185,129,0.6)]',
  },
  Necrópolis: {
    id: 'Necrópolis',
    name: 'Necrópolis',
    themeName: 'Gris Nigromántico & Espectral',
    primary: 'slate',
    hexPrimary: '#94a3b8',
    gradientBg: 'radial-gradient(circle at 50% 0%, #1e242d 0%, #0e1216 55%, #08090b 100%)',
    glow: 'shadow-[0_0_22px_rgba(148,163,184,0.3)]',
    glowBorder: 'rgba(148,163,184,0.35)',
    border: 'border-2 border-slate-500/70',
    borderSubtle: 'border-slate-800/70',
    borderHover: 'hover:border-slate-400',
    bgCard: 'bg-[#101419]/90',
    bgBadge: 'bg-slate-900/90',
    bgSubtle: 'bg-slate-900/50',
    bgButton: 'bg-slate-700 hover:bg-slate-600 text-white font-bold',
    bgButtonHover: 'hover:bg-slate-600',
    primaryButton: 'bg-slate-700 hover:bg-slate-600 text-white font-bold border border-slate-400 shadow-[0_0_15px_rgba(148,163,184,0.35)]',
    shadowAccent: 'shadow-[0_0_25px_rgba(148,163,184,0.3)]',
    textAccent: 'text-slate-300',
    textAccentHover: 'hover:text-slate-100',
    textMuted: 'text-slate-400/80',
    tabActive: 'bg-slate-800/95 text-slate-100 shadow-[0_0_18px_rgba(148,163,184,0.45)] border-2 border-slate-400 font-bold',
    pillActive: 'bg-slate-400 text-slate-950 font-bold shadow-md shadow-slate-400/50',
    iconColor: 'text-slate-300',
    selectionClass: 'selection:bg-slate-600 selection:text-white',
    scrollbarThumbRgba: 'rgba(148, 163, 184, 0.45)',
    badgeBorder: 'border-slate-700/60',
    headerBorder: 'border-slate-800/80',
    dropdownBorder: 'border-slate-700/80',
    cardBorder: 'border-2 border-slate-600/60',
    cardGlowHover: 'hover:shadow-[0_0_22px_rgba(148,163,184,0.35)] hover:border-slate-400',
    tacticalPlate: 'bg-[#141a21]/90 border border-slate-700/60',
    heroBannerBg: 'bg-gradient-to-r from-slate-950/90 via-[#131920]/95 to-[#0b0e12]/95',
    runeBorder: 'border-slate-400/60',
    statGlow: 'shadow-[0_0_10px_rgba(148,163,184,0.5)]',
  },
  Colmena: {
    id: 'Colmena',
    name: 'Colmena',
    themeName: 'Fuego Colmena',
    primary: 'orange',
    hexPrimary: '#ea580c',
    gradientBg: 'radial-gradient(circle at 50% 0%, #3b1406 0%, #170702 55%, #0a0301 100%)',
    glow: 'shadow-[0_0_22px_rgba(234,88,12,0.4)]',
    glowBorder: 'rgba(234,88,12,0.45)',
    border: 'border-2 border-orange-600/70',
    borderSubtle: 'border-orange-950/60',
    borderHover: 'hover:border-orange-400',
    bgCard: 'bg-[#190b04]/90',
    bgBadge: 'bg-orange-950/80',
    bgSubtle: 'bg-orange-950/40',
    bgButton: 'bg-orange-600 hover:bg-orange-500 text-white font-bold',
    bgButtonHover: 'hover:bg-orange-500',
    primaryButton: 'bg-orange-600 hover:bg-orange-500 text-white font-bold border border-orange-400 shadow-[0_0_15px_rgba(234,88,12,0.4)]',
    shadowAccent: 'shadow-[0_0_25px_rgba(234,88,12,0.4)]',
    textAccent: 'text-orange-400',
    textAccentHover: 'hover:text-orange-300',
    textMuted: 'text-orange-300/70',
    tabActive: 'bg-orange-900/90 text-white shadow-[0_0_18px_rgba(234,88,12,0.55)] border-2 border-orange-400 font-bold',
    pillActive: 'bg-orange-500 text-slate-950 font-bold shadow-md shadow-orange-500/50',
    iconColor: 'text-orange-400',
    selectionClass: 'selection:bg-orange-500 selection:text-slate-950',
    scrollbarThumbRgba: 'rgba(234, 88, 12, 0.45)',
    badgeBorder: 'border-orange-700/60',
    headerBorder: 'border-orange-900/70',
    dropdownBorder: 'border-orange-700/80',
    cardBorder: 'border-2 border-orange-600/60',
    cardGlowHover: 'hover:shadow-[0_0_22px_rgba(234,88,12,0.45)] hover:border-orange-400',
    tacticalPlate: 'bg-[#220e06]/90 border border-orange-800/60',
    heroBannerBg: 'bg-gradient-to-r from-orange-950/90 via-[#240e06]/95 to-[#100502]/95',
    runeBorder: 'border-orange-500/60',
    statGlow: 'shadow-[0_0_10px_rgba(234,88,12,0.6)]',
  },
  Cisma: {
    id: 'Cisma',
    name: 'Cisma',
    themeName: 'Celeste Arcano & Vacío',
    primary: 'sky',
    hexPrimary: '#38bdf8',
    gradientBg: 'radial-gradient(circle at 50% 0%, #0b2c45 0%, #061522 55%, #030a10 100%)',
    glow: 'shadow-[0_0_22px_rgba(56,189,248,0.35)]',
    glowBorder: 'rgba(56,189,248,0.4)',
    border: 'border-2 border-sky-500/70',
    borderSubtle: 'border-sky-900/50',
    borderHover: 'hover:border-sky-400',
    bgCard: 'bg-[#081520]/90',
    bgBadge: 'bg-sky-950/80',
    bgSubtle: 'bg-sky-950/40',
    bgButton: 'bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold',
    bgButtonHover: 'hover:bg-sky-400',
    primaryButton: 'bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold border border-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.4)]',
    shadowAccent: 'shadow-[0_0_25px_rgba(56,189,248,0.35)]',
    textAccent: 'text-sky-400',
    textAccentHover: 'hover:text-sky-300',
    textMuted: 'text-sky-300/70',
    tabActive: 'bg-sky-900/90 text-white shadow-[0_0_18px_rgba(56,189,248,0.55)] border-2 border-sky-400 font-bold',
    pillActive: 'bg-sky-400 text-slate-950 font-bold shadow-md shadow-sky-400/50',
    iconColor: 'text-sky-400',
    selectionClass: 'selection:bg-sky-400 selection:text-slate-950',
    scrollbarThumbRgba: 'rgba(56, 189, 248, 0.45)',
    badgeBorder: 'border-sky-700/60',
    headerBorder: 'border-sky-900/70',
    dropdownBorder: 'border-sky-700/80',
    cardBorder: 'border-2 border-sky-500/60',
    cardGlowHover: 'hover:shadow-[0_0_22px_rgba(56,189,248,0.4)] hover:border-sky-400',
    tacticalPlate: 'bg-[#0c1f30]/90 border border-sky-800/60',
    heroBannerBg: 'bg-gradient-to-r from-sky-950/90 via-[#0a1e30]/95 to-[#040e17]/95',
    runeBorder: 'border-sky-500/60',
    statGlow: 'shadow-[0_0_10px_rgba(56,189,248,0.6)]',
  },
};

export const FACTION_THEMES_LIGHT: Record<FactionId, FactionTheme> = {
  Mazmorra: {
    id: 'Mazmorra',
    name: 'Mazmorra',
    themeName: 'Amatista Luminosa',
    primary: 'purple',
    hexPrimary: '#9333ea',
    gradientBg: 'radial-gradient(circle at 50% 0%, #f3e8ff 0%, #faf5ff 50%, #f8fafc 100%)',
    glow: 'shadow-[0_4px_24px_rgba(147,51,234,0.30)]',
    glowBorder: 'rgba(147,51,234,0.40)',
    border: 'border-2 border-purple-400',
    borderSubtle: 'border-purple-200',
    borderHover: 'hover:border-purple-500',
    bgCard: 'bg-purple-50/90',
    bgBadge: 'bg-purple-100',
    bgSubtle: 'bg-purple-50',
    bgButton: 'bg-purple-600 hover:bg-purple-500 text-white font-bold',
    bgButtonHover: 'hover:bg-purple-500',
    primaryButton: 'bg-purple-600 hover:bg-purple-500 text-white font-bold border border-purple-400 shadow-[0_2px_12px_rgba(147,51,234,0.3)]',
    shadowAccent: 'shadow-[0_4px_24px_rgba(147,51,234,0.28)]',
    textAccent: 'text-purple-700',
    textAccentHover: 'hover:text-purple-900',
    textMuted: 'text-purple-700/80',
    tabActive: 'bg-purple-700 text-white shadow-[0_4px_16px_rgba(147,51,234,0.40)] border-2 border-purple-600 font-bold',
    pillActive: 'bg-purple-600 text-white font-bold shadow-sm shadow-purple-600/30',
    iconColor: 'text-purple-700',
    selectionClass: 'selection:bg-purple-500 selection:text-white',
    scrollbarThumbRgba: 'rgba(147, 51, 234, 0.45)',
    badgeBorder: 'border-purple-300',
    headerBorder: 'border-purple-200',
    dropdownBorder: 'border-purple-300',
    cardBorder: 'border-2 border-purple-300',
    cardGlowHover: 'hover:shadow-[0_4px_20px_rgba(147,51,234,0.3)] hover:border-purple-400',
    tacticalPlate: 'bg-purple-50/70 border border-purple-200',
    heroBannerBg: 'bg-gradient-to-r from-purple-100/90 via-purple-50/90 to-white',
    runeBorder: 'border-purple-400',
    statGlow: 'shadow-[0_0_8px_rgba(147,51,234,0.4)]',
  },
  Templo: {
    id: 'Templo',
    name: 'Templo',
    themeName: 'Dorado Solar',
    primary: 'amber',
    hexPrimary: '#d97706',
    gradientBg: 'radial-gradient(circle at 50% 0%, #fef3c7 0%, #fffbeb 50%, #f8fafc 100%)',
    glow: 'shadow-[0_4px_24px_rgba(217,119,6,0.32)]',
    glowBorder: 'rgba(217,119,6,0.40)',
    border: 'border-2 border-amber-400',
    borderSubtle: 'border-amber-200',
    borderHover: 'hover:border-amber-500',
    bgCard: 'bg-amber-50/90',
    bgBadge: 'bg-amber-100',
    bgSubtle: 'bg-amber-50',
    bgButton: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold',
    bgButtonHover: 'hover:bg-amber-400',
    primaryButton: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold border border-amber-400 shadow-[0_2px_12px_rgba(217,119,6,0.3)]',
    shadowAccent: 'shadow-[0_4px_24px_rgba(217,119,6,0.28)]',
    textAccent: 'text-amber-800',
    textAccentHover: 'hover:text-amber-950',
    textMuted: 'text-amber-800/80',
    tabActive: 'bg-amber-600 text-slate-950 shadow-[0_4px_16px_rgba(217,119,6,0.40)] border-2 border-amber-500 font-bold',
    pillActive: 'bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/30',
    iconColor: 'text-amber-700',
    selectionClass: 'selection:bg-amber-400 selection:text-slate-950',
    scrollbarThumbRgba: 'rgba(217, 119, 6, 0.45)',
    badgeBorder: 'border-amber-300',
    headerBorder: 'border-amber-200',
    dropdownBorder: 'border-amber-300',
    cardBorder: 'border-2 border-amber-300',
    cardGlowHover: 'hover:shadow-[0_4px_20px_rgba(217,119,6,0.3)] hover:border-amber-400',
    tacticalPlate: 'bg-amber-50/70 border border-amber-200',
    heroBannerBg: 'bg-gradient-to-r from-amber-100/90 via-amber-50/90 to-white',
    runeBorder: 'border-amber-400',
    statGlow: 'shadow-[0_0_8px_rgba(217,119,6,0.4)]',
  },
  Foresta: {
    id: 'Foresta',
    name: 'Foresta',
    themeName: 'Esmeralda Silvana',
    primary: 'emerald',
    hexPrimary: '#059669',
    gradientBg: 'radial-gradient(circle at 50% 0%, #d1fae5 0%, #f0fdf4 50%, #f8fafc 100%)',
    glow: 'shadow-[0_4px_24px_rgba(5,150,105,0.32)]',
    glowBorder: 'rgba(5,150,105,0.40)',
    border: 'border-2 border-emerald-400',
    borderSubtle: 'border-emerald-200',
    borderHover: 'hover:border-emerald-500',
    bgCard: 'bg-emerald-50/90',
    bgBadge: 'bg-emerald-100',
    bgSubtle: 'bg-emerald-50',
    bgButton: 'bg-emerald-600 hover:bg-emerald-500 text-white font-bold',
    bgButtonHover: 'hover:bg-emerald-500',
    primaryButton: 'bg-emerald-600 hover:bg-emerald-500 text-white font-bold border border-emerald-400 shadow-[0_2px_12px_rgba(5,150,105,0.3)]',
    shadowAccent: 'shadow-[0_4px_24px_rgba(5,150,105,0.28)]',
    textAccent: 'text-emerald-800',
    textAccentHover: 'hover:text-emerald-950',
    textMuted: 'text-emerald-800/80',
    tabActive: 'bg-emerald-700 text-white shadow-[0_4px_16px_rgba(5,150,105,0.40)] border-2 border-emerald-600 font-bold',
    pillActive: 'bg-emerald-600 text-white font-bold shadow-sm shadow-emerald-600/30',
    iconColor: 'text-emerald-700',
    selectionClass: 'selection:bg-emerald-500 selection:text-white',
    scrollbarThumbRgba: 'rgba(5, 150, 105, 0.45)',
    badgeBorder: 'border-emerald-300',
    headerBorder: 'border-emerald-200',
    dropdownBorder: 'border-emerald-300',
    cardBorder: 'border-2 border-emerald-300',
    cardGlowHover: 'hover:shadow-[0_4px_20px_rgba(5,150,105,0.3)] hover:border-emerald-400',
    tacticalPlate: 'bg-emerald-50/70 border border-emerald-200',
    heroBannerBg: 'bg-gradient-to-r from-emerald-100/90 via-emerald-50/90 to-white',
    runeBorder: 'border-emerald-400',
    statGlow: 'shadow-[0_0_8px_rgba(5,150,105,0.4)]',
  },
  Necrópolis: {
    id: 'Necrópolis',
    name: 'Necrópolis',
    themeName: 'Ceniza Argéntea & Espectral',
    primary: 'slate',
    hexPrimary: '#475569',
    gradientBg: 'radial-gradient(circle at 50% 0%, #e2e8f0 0%, #f1f5f9 50%, #f8fafc 100%)',
    glow: 'shadow-[0_4px_24px_rgba(71,85,105,0.30)]',
    glowBorder: 'rgba(71,85,105,0.40)',
    border: 'border-2 border-slate-400',
    borderSubtle: 'border-slate-200',
    borderHover: 'hover:border-slate-500',
    bgCard: 'bg-slate-50/90',
    bgBadge: 'bg-slate-200',
    bgSubtle: 'bg-slate-100',
    bgButton: 'bg-slate-700 hover:bg-slate-600 text-white font-bold',
    bgButtonHover: 'hover:bg-slate-600',
    primaryButton: 'bg-slate-700 hover:bg-slate-600 text-white font-bold border border-slate-500 shadow-[0_2px_12px_rgba(71,85,105,0.3)]',
    shadowAccent: 'shadow-[0_4px_24px_rgba(71,85,105,0.26)]',
    textAccent: 'text-slate-800',
    textAccentHover: 'hover:text-slate-950',
    textMuted: 'text-slate-700/80',
    tabActive: 'bg-slate-800 text-white shadow-[0_4px_16px_rgba(71,85,105,0.40)] border-2 border-slate-700 font-bold',
    pillActive: 'bg-slate-700 text-white font-bold shadow-sm shadow-slate-700/30',
    iconColor: 'text-slate-700',
    selectionClass: 'selection:bg-slate-600 selection:text-white',
    scrollbarThumbRgba: 'rgba(71, 85, 105, 0.45)',
    badgeBorder: 'border-slate-300',
    headerBorder: 'border-slate-200',
    dropdownBorder: 'border-slate-300',
    cardBorder: 'border-2 border-slate-300',
    cardGlowHover: 'hover:shadow-[0_4px_20px_rgba(71,85,105,0.3)] hover:border-slate-400',
    tacticalPlate: 'bg-slate-100/70 border border-slate-200',
    heroBannerBg: 'bg-gradient-to-r from-slate-200/90 via-slate-100/90 to-white',
    runeBorder: 'border-slate-400',
    statGlow: 'shadow-[0_0_8px_rgba(71,85,105,0.4)]',
  },
  Colmena: {
    id: 'Colmena',
    name: 'Colmena',
    themeName: 'Ámbar Volcánico',
    primary: 'orange',
    hexPrimary: '#ea580c',
    gradientBg: 'radial-gradient(circle at 50% 0%, #ffedd5 0%, #fff7ed 50%, #f8fafc 100%)',
    glow: 'shadow-[0_4px_24px_rgba(234,88,12,0.32)]',
    glowBorder: 'rgba(234,88,12,0.40)',
    border: 'border-2 border-orange-400',
    borderSubtle: 'border-orange-200',
    borderHover: 'hover:border-orange-500',
    bgCard: 'bg-orange-50/90',
    bgBadge: 'bg-orange-100',
    bgSubtle: 'bg-orange-50',
    bgButton: 'bg-orange-600 hover:bg-orange-500 text-white font-bold',
    bgButtonHover: 'hover:bg-orange-500',
    primaryButton: 'bg-orange-600 hover:bg-orange-500 text-white font-bold border border-orange-400 shadow-[0_2px_12px_rgba(234,88,12,0.3)]',
    shadowAccent: 'shadow-[0_4px_24px_rgba(234,88,12,0.28)]',
    textAccent: 'text-orange-800',
    textAccentHover: 'hover:text-orange-950',
    textMuted: 'text-orange-800/80',
    tabActive: 'bg-orange-600 text-white shadow-[0_4px_16px_rgba(234,88,12,0.40)] border-2 border-orange-500 font-bold',
    pillActive: 'bg-orange-600 text-white font-bold shadow-sm shadow-orange-600/30',
    iconColor: 'text-orange-700',
    selectionClass: 'selection:bg-orange-500 selection:text-white',
    scrollbarThumbRgba: 'rgba(234, 88, 12, 0.45)',
    badgeBorder: 'border-orange-300',
    headerBorder: 'border-orange-200',
    dropdownBorder: 'border-orange-300',
    cardBorder: 'border-2 border-orange-300',
    cardGlowHover: 'hover:shadow-[0_4px_20px_rgba(234,88,12,0.3)] hover:border-orange-400',
    tacticalPlate: 'bg-orange-50/70 border border-orange-200',
    heroBannerBg: 'bg-gradient-to-r from-orange-100/90 via-orange-50/90 to-white',
    runeBorder: 'border-orange-400',
    statGlow: 'shadow-[0_0_8px_rgba(234,88,12,0.4)]',
  },
  Cisma: {
    id: 'Cisma',
    name: 'Cisma',
    themeName: 'Zafiro Etéreo & Vacío',
    primary: 'sky',
    hexPrimary: '#0284c7',
    gradientBg: 'radial-gradient(circle at 50% 0%, #e0f2fe 0%, #f0f9ff 50%, #f8fafc 100%)',
    glow: 'shadow-[0_4px_24px_rgba(2,132,199,0.32)]',
    glowBorder: 'rgba(2,132,199,0.40)',
    border: 'border-2 border-sky-400',
    borderSubtle: 'border-sky-200',
    borderHover: 'hover:border-sky-500',
    bgCard: 'bg-sky-50/90',
    bgBadge: 'bg-sky-100',
    bgSubtle: 'bg-sky-50',
    bgButton: 'bg-sky-600 hover:bg-sky-500 text-white font-bold',
    bgButtonHover: 'hover:bg-sky-500',
    primaryButton: 'bg-sky-600 hover:bg-sky-500 text-white font-bold border border-sky-400 shadow-[0_2px_12px_rgba(2,132,199,0.3)]',
    shadowAccent: 'shadow-[0_4px_24px_rgba(2,132,199,0.28)]',
    textAccent: 'text-sky-800',
    textAccentHover: 'hover:text-sky-950',
    textMuted: 'text-sky-800/80',
    tabActive: 'bg-sky-700 text-white shadow-[0_4px_16px_rgba(2,132,199,0.40)] border-2 border-sky-600 font-bold',
    pillActive: 'bg-sky-600 text-white font-bold shadow-sm shadow-sky-600/30',
    iconColor: 'text-sky-700',
    selectionClass: 'selection:bg-sky-500 selection:text-white',
    scrollbarThumbRgba: 'rgba(2, 132, 199, 0.45)',
    badgeBorder: 'border-sky-300',
    headerBorder: 'border-sky-200',
    dropdownBorder: 'border-sky-300',
    cardBorder: 'border-2 border-sky-300',
    cardGlowHover: 'hover:shadow-[0_4px_20px_rgba(2,132,199,0.3)] hover:border-sky-400',
    tacticalPlate: 'bg-sky-50/70 border border-sky-200',
    heroBannerBg: 'bg-gradient-to-r from-sky-100/90 via-sky-50/90 to-white',
    runeBorder: 'border-sky-400',
    statGlow: 'shadow-[0_0_8px_rgba(2,132,199,0.4)]',
  },
};

export function getFactionTheme(faction: FactionId | string, mode: 'dark' | 'light' | string = 'dark'): FactionTheme {
  const themeMap = mode === 'light' ? FACTION_THEMES_LIGHT : FACTION_THEMES;
  if (faction in themeMap) {
    return themeMap[faction as FactionId];
  }
  return themeMap.Mazmorra;
}

export const FACTIONS_METADATA: Record<FactionId, FactionMetadata> = {
  Mazmorra: {
    id: 'Mazmorra',
    name: 'Mazmorra',
    nameEn: 'Dungeon',
    region: 'Subterráneos de Alvar',
    alignment: 'Caos & Sombras',
    primaryMechanic: 'Triunvirato (+8)',
    primaryMechanicDesc: '+8 a Ataque, Defensa o Poder de Hechizo según la postura activa en combate.',
    startingGold: '10.000',
    colorScheme: {
      primary: 'purple',
      border: 'border-purple-600',
      bgBadge: 'bg-purple-950/80',
      textAccent: 'text-purple-400',
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.3)]',
    },
    status: 'completo',
  },
  Templo: {
    id: 'Templo',
    name: 'Templo',
    nameEn: 'Temple',
    region: 'Isla de Karigor / Erathia',
    alignment: 'Orden & Luz Sagrada',
    primaryMechanic: 'Gracia de la Luz & Moral',
    primaryMechanicDesc: 'Sinergias masivas de Moral positiva (+3), buffs de Tejedora de Luz y Resurrección de Arcángeles.',
    startingGold: '10.000',
    colorScheme: {
      primary: 'amber',
      border: 'border-amber-500',
      bgBadge: 'bg-amber-950/80',
      textAccent: 'text-amber-400',
      glow: 'shadow-[0_0_20px_rgba(245,158,11,0.3)]',
    },
    status: 'completo',
  },
  Foresta: {
    id: 'Foresta',
    name: 'Foresta',
    nameEn: 'Sylvan / Foresta',
    region: 'Bosques Primigenios de Jadame',
    alignment: 'Naturaleza & Armonía',
    primaryMechanic: 'Enraizamiento & Comunión Botánica',
    primaryMechanicDesc: 'Falange de Hoplitas defensivos, control de enredo de Iriyads, ralentización anfibia de Aqualotls, auras celestiales de Qilins y renacimiento de Fénix.',
    startingGold: '10.000',
    colorScheme: {
      primary: 'emerald',
      border: 'border-emerald-600',
      bgBadge: 'bg-emerald-950/80',
      textAccent: 'text-emerald-400',
      glow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]',
    },
    status: 'completo',
  },
  Necrópolis: {
    id: 'Necrópolis',
    name: 'Necrópolis',
    nameEn: 'Necropolis',
    region: 'Tierras Marchitas de Jadame',
    alignment: 'Muerte & Oscuridad',
    primaryMechanic: 'Nigromancia & Resurrección de Sangre',
    primaryMechanicDesc: 'Levantar ejércitos de esqueletos, Señores de los Vampiros inmortales y Caballeros del Terror devastadores.',
    startingGold: '10.000',
    colorScheme: {
      primary: 'slate',
      border: 'border-slate-500',
      bgBadge: 'bg-slate-900/90',
      textAccent: 'text-slate-300',
      glow: 'shadow-[0_0_20px_rgba(148,163,184,0.3)]',
    },
    status: 'completo',
  },
  Colmena: {
    id: 'Colmena',
    name: 'Colmena',
    nameEn: 'Hive / Colmena',
    region: 'Nidos Subterráneos de Jadame',
    alignment: 'Horda Insectoide & Feromonas',
    primaryMechanic: 'Crecimiento Colosal & Salto de Mantis',
    primaryMechanicDesc: 'Crecimiento de criaturas masivo, doble pinza de Mantis Voraz y Leviatanes Devoradores de colosos.',
    startingGold: '10.000',
    colorScheme: {
      primary: 'orange',
      border: 'border-orange-500',
      bgBadge: 'bg-orange-950/80',
      textAccent: 'text-orange-400',
      glow: 'shadow-[0_0_20px_rgba(249,115,22,0.3)]',
    },
    status: 'completo',
  },
  Cisma: {
    id: 'Cisma',
    name: 'Cisma',
    nameEn: 'Schism',
    region: 'Tierras Heladas de Vori & Grietas del Abismo',
    alignment: 'Demonología del Vacío & Escarcha de Vori',
    primaryMechanic: 'Comunión Abisal & Rito de Invocación',
    primaryMechanicDesc: 'Invocaciones permanentes sobre cadáveres en combate, Comunión Abisal multiplicadora e Inmunidad Mágica con Supervisores Abisales.',
    startingGold: '10.000',
    colorScheme: {
      primary: 'sky',
      border: 'border-sky-500',
      bgBadge: 'bg-sky-950/80',
      textAccent: 'text-sky-400',
      glow: 'shadow-[0_0_20px_rgba(56,189,248,0.3)]',
    },
    status: 'completo',
  },
};

// =========================================================================
// DATA SELECTORS BY ACTIVE FACTION
// =========================================================================

export function getBuildStepsForFaction(faction: FactionId | string): BuildStep[] {
  switch (faction) {
    case 'Templo':
      return TEMPLE_56_DAY_BUILD_STEPS;
    case 'Foresta':
      return ARBOLEDA_56_DAY_BUILD_STEPS;
    case 'Necrópolis':
      return NECROPOLIS_56_DAY_BUILD_STEPS;
    case 'Colmena':
      return ENJAMBRE_56_DAY_BUILD_STEPS;
    case 'Cisma':
      return CISMA_56_DAY_BUILD_STEPS;
    case 'Mazmorra':
    default:
      return FULL_56_DAY_BUILD_STEPS;
  }
}

export function getUnitsForFaction(faction: FactionId | string): UnitInfo[] {
  switch (faction) {
    case 'Templo':
      return TEMPLE_UNITS;
    case 'Foresta':
      return ARBOLEDA_UNITS;
    case 'Necrópolis':
      return NECROPOLIS_UNITS;
    case 'Colmena':
      return ENJAMBRE_UNITS;
    case 'Cisma':
      return CISMA_UNITS;
    case 'Mazmorra':
    default:
      return DUNGEON_UNITS;
  }
}

export function getHeroesForFaction(faction: FactionId | string): HeroWithExtras[] {
  return getHeroesByFactionKey(faction);
}

export function getCombatTacticsForFaction(faction: FactionId | string): TacticalScenario[] {
  switch (faction) {
    case 'Templo':
      return TEMPLE_COMBAT_TACTICS;
    case 'Foresta':
      return ARBOLEDA_COMBAT_TACTICS;
    case 'Necrópolis':
      return NECROPOLIS_COMBAT_TACTICS;
    case 'Colmena':
      return ENJAMBRE_COMBAT_TACTICS;
    case 'Cisma':
      return CISMA_COMBAT_TACTICS;
    case 'Mazmorra':
    default:
      return TACTICAL_SCENARIOS;
  }
}

export function getFactionLawsForFaction(faction: FactionId | string): FactionLaw[] {
  switch (faction) {
    case 'Templo':
      return TEMPLE_FACTION_LAWS;
    case 'Foresta':
      return ARBOLEDA_FACTION_LAWS;
    case 'Necrópolis':
      return NECROPOLIS_FACTION_LAWS;
    case 'Colmena':
      return ENJAMBRE_FACTION_LAWS;
    case 'Cisma':
      return CISMA_FACTION_LAWS;
    case 'Mazmorra':
    default:
      return FACTION_LAWS;
  }
}

export function getFactionLawPresetsForFaction(faction: FactionId | string): FactionLawPreset[] {
  switch (faction) {
    case 'Templo':
      return TEMPLE_LAW_PRESETS;
    case 'Foresta':
      return ARBOLEDA_LAW_PRESETS;
    case 'Necrópolis':
      return NECROPOLIS_LAW_PRESETS;
    case 'Colmena':
      return ENJAMBRE_LAW_PRESETS;
    case 'Cisma':
      return CISMA_LAW_PRESETS;
    case 'Mazmorra':
    default:
      return FACTION_LAW_PRESETS;
  }
}
