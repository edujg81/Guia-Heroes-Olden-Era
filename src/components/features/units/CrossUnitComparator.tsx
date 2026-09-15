import React, { useState, useMemo } from 'react';
import { UnitInfo, UnitVariant, FactionLaw } from '../../../types';
import {
  FactionId,
  getUnitsForFaction,
  FACTIONS_METADATA,
  getFactionTheme,
} from '../../../data/factionDataProvider';
import { MultiUnitRadarChart, MultiUnitSlot } from '../../ui/MultiUnitRadarChart';
import { parseAverageDamage } from '../../ui/UnitStatRadarChart';
import {
  isAbilityExclusiveToBranch,
  parseAbility,
  getExclusiveAbilitiesForBranch,
} from '../../../utils/abilityUtils';
import {
  Swords,
  Shield,
  Zap,
  ArrowRightLeft,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Award,
  Flame,
  CheckCircle2,
  Crown,
  Heart,
  Gauge,
  Coins,
  Crosshair,
  UserCheck,
  RotateCcw,
  Eye,
  Feather,
  Axe,
  Layers,
  Plus,
  Trash2,
} from 'lucide-react';

interface CrossUnitComparatorProps {
  initialFaction?: FactionId;
  initialTier?: number;
  initialVariant?: 'base' | 'branch_a' | 'branch_b' | string;
  themeMode?: 'dark' | 'light';
  onSelectUnitInCatalog?: (faction: FactionId, tier: number, variant: 'base' | 'branch_a' | 'branch_b') => void;
}

export interface UnitSelectionState {
  factionId: FactionId;
  tier: number;
  variantKey: 'base' | 'branchA' | 'branchB';
}

const CANONICAL_FACTIONS: { id: FactionId; name: string; subtitle: string; color: string; bgBadge: string }[] = [
  { id: 'Mazmorra', name: 'Mazmorra', subtitle: 'Caos & Sombras', color: '#a855f7', bgBadge: 'bg-purple-950/60' },
  { id: 'Templo', name: 'Templo', subtitle: 'Orden & Luz Sagrada', color: '#f59e0b', bgBadge: 'bg-amber-950/60' },
  { id: 'Foresta', name: 'Foresta', subtitle: 'Naturaleza & Armonía', color: '#10b981', bgBadge: 'bg-emerald-950/60' },
  { id: 'Necrópolis', name: 'Necrópolis', subtitle: 'Muerte & Oscuridad', color: '#94a3b8', bgBadge: 'bg-slate-900/80' },
  { id: 'Colmena', name: 'Colmena', subtitle: 'Horda Demoníaca', color: '#f97316', bgBadge: 'bg-orange-950/60' },
  { id: 'Cisma', name: 'Cisma', subtitle: 'Vacío Abisal', color: '#6366f1', bgBadge: 'bg-indigo-950/60' },
];

const PRESETS = [
  {
    title: '👑 Choque de Titanes (Tier 7 Míticos)',
    desc: 'Dragón Negro vs Arcángel vs Supervisor Abisal',
    unit1: { factionId: 'Mazmorra' as FactionId, tier: 7, variantKey: 'branchA' as const },
    unit2: { factionId: 'Templo' as FactionId, tier: 7, variantKey: 'branchA' as const },
    unit3: { factionId: 'Cisma' as FactionId, tier: 7, variantKey: 'branchA' as const },
  },
  {
    title: '🏹 Duelo de Tiradores (Rango & Proyectiles)',
    desc: 'Ballestero vs Bailarina de Jaspe vs Liche Pestilente',
    unit1: { factionId: 'Templo' as FactionId, tier: 2, variantKey: 'branchB' as const },
    unit2: { factionId: 'Mazmorra' as FactionId, tier: 3, variantKey: 'branchA' as const },
    unit3: { factionId: 'Necrópolis' as FactionId, tier: 5, variantKey: 'branchA' as const },
  },
  {
    title: '🛡️ Tanques & Infantería de Choque (Melé)',
    desc: 'Señor Minotauro vs Égida del Sol vs Íriyad de Cristal',
    unit1: { factionId: 'Mazmorra' as FactionId, tier: 4, variantKey: 'branchA' as const },
    unit2: { factionId: 'Templo' as FactionId, tier: 1, variantKey: 'branchB' as const },
    unit3: { factionId: 'Foresta' as FactionId, tier: 3, variantKey: 'branchB' as const },
  },
  {
    title: '⚡ Asalto Rápido Día 1 (Tier 1 Melé)',
    desc: 'Troglodita Infernal vs Capitán de la Guardia vs Esqueleto Guerrero',
    unit1: { factionId: 'Mazmorra' as FactionId, tier: 1, variantKey: 'branchA' as const },
    unit2: { factionId: 'Templo' as FactionId, tier: 1, variantKey: 'branchA' as const },
    unit3: { factionId: 'Necrópolis' as FactionId, tier: 1, variantKey: 'branchA' as const },
  },
  {
    title: '💀 Pesadilla de la Cripta vs Mazmorra',
    desc: 'Señor Vampiro vs Hidra Ctónica',
    unit1: { factionId: 'Necrópolis' as FactionId, tier: 7, variantKey: 'branchA' as const },
    unit2: { factionId: 'Mazmorra' as FactionId, tier: 6, variantKey: 'branchA' as const },
    unit3: undefined,
  },
  {
    title: '🔮 Especialistas Arcanos & Magia a Distancia',
    desc: 'Medusa Reina vs Esporamante vs Vinculador',
    unit1: { factionId: 'Mazmorra' as FactionId, tier: 5, variantKey: 'branchB' as const },
    unit2: { factionId: 'Foresta' as FactionId, tier: 5, variantKey: 'branchA' as const },
    unit3: { factionId: 'Cisma' as FactionId, tier: 2, variantKey: 'branchA' as const },
  },
];

export const CrossUnitComparator: React.FC<CrossUnitComparatorProps> = ({
  initialFaction = 'Mazmorra',
  initialTier = 1,
  initialVariant = 'branch_a',
  themeMode = 'dark',
  onSelectUnitInCatalog,
}) => {
  const isDark = themeMode === 'dark';

  const mapInitialVariant = (v?: string): 'base' | 'branchA' | 'branchB' => {
    if (v === 'base') return 'base';
    if (v === 'branch_b' || v === 'branchB') return 'branchB';
    return 'branchA';
  };

  // State for Unit 1, Unit 2, and optional Unit 3
  const [slot1, setSlot1] = useState<UnitSelectionState>({
    factionId: initialFaction,
    tier: initialTier,
    variantKey: mapInitialVariant(initialVariant),
  });

  const [slot2, setSlot2] = useState<UnitSelectionState>({
    factionId: initialFaction === 'Templo' ? 'Mazmorra' : 'Templo',
    tier: initialTier,
    variantKey: 'branchA',
  });

  const [slot3, setSlot3] = useState<UnitSelectionState | null>(null);
  const [highlightedSlotId, setHighlightedSlotId] = useState<string | null>(null);

  // Helper to resolve unit info and variant
  const resolveUnitSlot = (
    slot: UnitSelectionState,
    id: string,
    fallbackColor: string
  ): MultiUnitSlot => {
    const factionUnits = getUnitsForFaction(slot.factionId);
    const unit = factionUnits.find((u) => u.tier === slot.tier) || factionUnits[0];
    const meta = FACTIONS_METADATA[slot.factionId] || FACTIONS_METADATA.Mazmorra;

    const variant: UnitVariant =
      slot.variantKey === 'base'
        ? unit.variants.base
        : slot.variantKey === 'branchB'
        ? unit.variants.branchB
        : unit.variants.branchA;

    const variantLabel =
      slot.variantKey === 'base'
        ? 'Base'
        : slot.variantKey === 'branchB'
        ? 'Rama B'
        : 'Rama A';

    return {
      id,
      factionId: slot.factionId,
      factionName: meta.name,
      unitName: unit.name,
      tier: unit.tier,
      variantKey: slot.variantKey,
      variantLabel,
      variant,
      unit,
      color: fallbackColor,
    };
  };

  const resolvedSlot1 = useMemo(
    () => resolveUnitSlot(slot1, 'slot1', '#a855f7'),
    [slot1]
  );
  const resolvedSlot2 = useMemo(
    () => resolveUnitSlot(slot2, 'slot2', '#f59e0b'),
    [slot2]
  );
  const resolvedSlot3 = useMemo(
    () => (slot3 ? resolveUnitSlot(slot3, 'slot3', '#10b981') : null),
    [slot3]
  );

  const activeSlots: MultiUnitSlot[] = useMemo(() => {
    const list = [resolvedSlot1, resolvedSlot2];
    if (resolvedSlot3) list.push(resolvedSlot3);
    return list;
  }, [resolvedSlot1, resolvedSlot2, resolvedSlot3]);

  // Swap Slot 1 and Slot 2
  const handleSwapSlots = () => {
    setSlot1(slot2);
    setSlot2(slot1);
  };

  // Toggle Slot 3
  const handleToggleSlot3 = () => {
    if (slot3) {
      setSlot3(null);
    } else {
      setSlot3({
        factionId: 'Foresta',
        tier: slot1.tier,
        variantKey: 'branchA',
      });
    }
  };

  // Apply Preset
  const handleApplyPreset = (preset: typeof PRESETS[0]) => {
    setSlot1(preset.unit1);
    setSlot2(preset.unit2);
    if (preset.unit3) {
      setSlot3(preset.unit3);
    } else {
      setSlot3(null);
    }
  };

  // Calculate combat clash between Slot 1 and Slot 2
  const combatSimulation = useMemo(() => {
    const u1 = resolvedSlot1.variant;
    const u2 = resolvedSlot2.variant;

    const atk1 = u1.stats.attack;
    const def1 = u1.stats.defense;
    const hp1 = u1.stats.hp;
    const dmg1Avg = parseAverageDamage(u1.stats.damage);
    const init1 = u1.stats.initiative;

    const atk2 = u2.stats.attack;
    const def2 = u2.stats.defense;
    const hp2 = u2.stats.hp;
    const dmg2Avg = parseAverageDamage(u2.stats.damage);
    const init2 = u2.stats.initiative;

    // Damage mod 1 against 2
    let mod1To2 = 1.0;
    if (atk1 >= def2) {
      mod1To2 = 1 + Math.min((atk1 - def2) * 0.05, 3.0); // max +300%
    } else {
      mod1To2 = Math.max(1 - (def2 - atk1) * 0.025, 0.25); // max -75%
    }

    // Damage mod 2 against 1
    let mod2To1 = 1.0;
    if (atk2 >= def1) {
      mod2To1 = 1 + Math.min((atk2 - def1) * 0.05, 3.0);
    } else {
      mod2To1 = Math.max(1 - (def1 - atk2) * 0.025, 0.25);
    }

    const strike1Dealt = dmg1Avg * mod1To2;
    const strike2Dealt = dmg2Avg * mod2To1;

    // Hits required to kill 1 unit
    const hitsToKill2 = Math.ceil(hp2 / Math.max(strike1Dealt, 0.1));
    const hitsToKill1 = Math.ceil(hp1 / Math.max(strike2Dealt, 0.1));

    // First strike based on initiative
    const firstStriker = init1 >= init2 ? 1 : 2;

    // Retaliation check: Does any unit prevent retaliation?
    const hasNoRetaliation1 = u1.abilities.some(
      (a) => a.toLowerCase().includes('sin represalia') || a.toLowerCase().includes('no retaliation')
    );
    const hasNoRetaliation2 = u2.abilities.some(
      (a) => a.toLowerCase().includes('sin represalia') || a.toLowerCase().includes('no retaliation')
    );

    return {
      strike1Dealt: Math.round(strike1Dealt * 10) / 10,
      strike2Dealt: Math.round(strike2Dealt * 10) / 10,
      hitsToKill2,
      hitsToKill1,
      firstStriker,
      hasNoRetaliation1,
      hasNoRetaliation2,
    };
  }, [resolvedSlot1, resolvedSlot2]);

  // Render individual Slot Selector
  const renderSlotSelector = (
    slot: UnitSelectionState,
    setSlot: React.Dispatch<React.SetStateAction<UnitSelectionState>>,
    slotIndex: number,
    color: string,
    onRemove?: () => void
  ) => {
    const factionUnits = getUnitsForFaction(slot.factionId);
    const currentUnit = factionUnits.find((u) => u.tier === slot.tier) || factionUnits[0];

    return (
      <div
        className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
          isDark ? 'bg-black/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
        style={{ borderTopColor: color, borderTopWidth: 4 }}
      >
        <div className="flex items-center justify-between gap-2 border-b pb-2 border-slate-800/40">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full inline-block shadow-sm shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color }}>
              Unidad {slotIndex}
            </span>
          </div>
          {onRemove && (
            <button
              onClick={onRemove}
              className="text-[11px] font-mono text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Quitar
            </button>
          )}
        </div>

        {/* Faction Selector */}
        <div>
          <label className="text-[10px] font-mono uppercase font-bold text-slate-400 block mb-1">
            Facción:
          </label>
          <select
            value={slot.factionId}
            onChange={(e) => {
              const newFaction = e.target.value as FactionId;
              setSlot((prev) => ({
                ...prev,
                factionId: newFaction,
              }));
            }}
            className={`w-full p-2 rounded-xl text-xs font-mono font-bold focus:outline-none cursor-pointer border ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-white'
                : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          >
            {CANONICAL_FACTIONS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.subtitle})
              </option>
            ))}
          </select>
        </div>

        {/* Tier & Unit Selector */}
        <div>
          <label className="text-[10px] font-mono uppercase font-bold text-slate-400 block mb-1">
            Criatura (Tier 1 - 7):
          </label>
          <select
            value={slot.tier}
            onChange={(e) => {
              const newTier = parseInt(e.target.value, 10);
              setSlot((prev) => ({
                ...prev,
                tier: newTier,
              }));
            }}
            className={`w-full p-2 rounded-xl text-xs font-mono font-bold focus:outline-none cursor-pointer border ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-white'
                : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          >
            {factionUnits.map((u) => (
              <option key={u.tier} value={u.tier}>
                T{u.tier} • {u.name} ({u.dwelling} • {u.attackType || 'Melé'})
              </option>
            ))}
          </select>
        </div>

        {/* Variant Selector (Base / Rama A / Rama B) */}
        <div>
          <label className="text-[10px] font-mono uppercase font-bold text-slate-400 block mb-1">
            Variante / Rama:
          </label>
          <div className="grid grid-cols-3 gap-1.5 font-mono text-[11px]">
            <button
              type="button"
              onClick={() => setSlot((prev) => ({ ...prev, variantKey: 'base' }))}
              className={`py-1.5 px-2 rounded-lg border text-center transition-all cursor-pointer truncate ${
                slot.variantKey === 'base'
                  ? isDark
                    ? 'bg-slate-700 border-slate-400 text-white shadow-sm font-bold'
                    : 'bg-slate-800 border-slate-900 text-white font-bold'
                  : isDark
                  ? 'bg-black/40 border-slate-800 text-slate-400 hover:text-white'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Base
            </button>
            <button
              type="button"
              onClick={() => setSlot((prev) => ({ ...prev, variantKey: 'branchA' }))}
              className={`py-1.5 px-2 rounded-lg border text-center transition-all cursor-pointer truncate ${
                slot.variantKey === 'branchA'
                  ? 'bg-purple-600 border-purple-400 text-white shadow-sm font-bold'
                  : isDark
                  ? 'bg-black/40 border-slate-800 text-slate-400 hover:text-purple-300'
                  : 'bg-purple-50 border-purple-200 text-purple-900 hover:bg-purple-100'
              }`}
            >
              Rama A
            </button>
            <button
              type="button"
              onClick={() => setSlot((prev) => ({ ...prev, variantKey: 'branchB' }))}
              className={`py-1.5 px-2 rounded-lg border text-center transition-all cursor-pointer truncate ${
                slot.variantKey === 'branchB'
                  ? 'bg-emerald-600 border-emerald-400 text-white shadow-sm font-bold'
                  : isDark
                  ? 'bg-black/40 border-slate-800 text-slate-400 hover:text-emerald-300'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100'
              }`}
            >
              Rama B
            </button>
          </div>
        </div>

        {/* Selected Variant Summary Pill */}
        <div
          className={`p-2.5 rounded-xl border text-xs font-mono flex items-center justify-between gap-2 ${
            isDark ? 'bg-black/40 border-white/5' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="truncate">
            <div className="font-bold truncate" style={{ color }}>
              {slot.variantKey === 'base'
                ? currentUnit.variants.base.name
                : slot.variantKey === 'branchB'
                ? currentUnit.variants.branchB.name
                : currentUnit.variants.branchA.name}
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              {currentUnit.dwelling} • {currentUnit.attackType || 'Melé'}
            </div>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded border border-slate-600 text-slate-300 shrink-0">
            T{currentUnit.tier}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Strategy Intro */}
      <div
        className={`border rounded-2xl p-5 sm:p-6 backdrop-blur-md transition-all ${
          isDark
            ? 'bg-black/50 border-slate-800 text-white shadow-xl'
            : 'bg-white border-slate-200 text-slate-900 shadow-md'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Swords className="w-5 h-5 text-amber-400" />
              <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-amber-400">
                Herramienta Competitiva • Olden Era Theorycrafting
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold uppercase tracking-wide">
              Comparador Universal Entre Unidades y Facciones
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Compara de forma interactiva cualquier criatura de Jadame frente a otra: analiza el orden
              de iniciativa, balance de atributos en radar hexagonal, ratios de coste-daño y simulación de
              duelo directo 1 vs 1.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSwapSlots}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
              }`}
              title="Intercambiar Unidad 1 y Unidad 2"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Invertir (U1 ↔ U2)</span>
            </button>

            <button
              onClick={handleToggleSlot3}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                slot3
                  ? 'bg-emerald-600 border-emerald-400 text-white shadow-sm'
                  : isDark
                  ? 'bg-black/60 hover:bg-white/10 border-slate-800 text-slate-300'
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
              }`}
            >
              {slot3 ? <Trash2 className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              <span>{slot3 ? 'Quitar 3ª Unidad' : '+ Añadir 3ª Unidad'}</span>
            </button>
          </div>
        </div>

        {/* Presets Row */}
        <div className="mt-4 pt-3 border-t border-slate-800/40">
          <div className="text-[10px] font-mono uppercase font-bold text-slate-400 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Enfrentamientos Clásicos & Matchups Típicos de Jadame:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(preset)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer border text-left flex items-center gap-2 ${
                  isDark
                    ? 'bg-slate-900/80 hover:bg-slate-800 border-slate-700/80 text-slate-300 hover:text-white'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800 shadow-xs'
                }`}
              >
                <span>{preset.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selectors Grid: Slot 1, Slot 2, and optional Slot 3 */}
      <div
        className={`grid grid-cols-1 ${
          slot3 ? 'lg:grid-cols-3' : 'md:grid-cols-2'
        } gap-4`}
      >
        {renderSlotSelector(slot1, setSlot1, 1, '#a855f7')}
        {renderSlotSelector(slot2, setSlot2, 2, '#f59e0b')}
        {slot3 &&
          renderSlotSelector(slot3, setSlot3 as React.Dispatch<React.SetStateAction<UnitSelectionState>>, 3, '#10b981', () =>
            setSlot3(null)
          )}
      </div>

      {/* Interactive Hexagonal Radar Chart */}
      <MultiUnitRadarChart
        units={activeSlots}
        themeMode={themeMode}
        onHighlightUnit={setHighlightedSlotId}
        highlightedUnitId={highlightedSlotId}
      />

      {/* 1 vs 1 Direct Clash Theorycrafting Simulator (Slot 1 vs Slot 2) */}
      <div
        className={`p-5 rounded-2xl border transition-all space-y-4 ${
          isDark
            ? 'bg-gradient-to-r from-purple-950/30 via-black/60 to-amber-950/30 border-slate-800'
            : 'bg-gradient-to-r from-purple-50/70 via-white to-amber-50/70 border-slate-200 shadow-md'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 border-slate-800/40">
          <div>
            <div className="flex items-center gap-2">
              <Swords className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-serif font-bold uppercase tracking-wide">
                Simulación de Intercambio Táctico 1 vs 1
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-amber-500/40 text-amber-400 bg-amber-950/40 font-bold">
                Mecánica Oficial Olden Era
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Evaluación de primer golpe por Iniciativa, modificador de Daño (Atq vs Def) y represalia.
            </p>
          </div>
          <div className="text-xs font-mono font-bold text-slate-400">
            {resolvedSlot1.variant.name} vs {resolvedSlot2.variant.name}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
          {/* Unit 1 Strike Preview */}
          <div
            className={`p-3.5 rounded-xl border space-y-1.5 ${
              isDark ? 'bg-black/50 border-purple-900/50' : 'bg-white border-purple-200 shadow-xs'
            }`}
          >
            <div className="text-xs font-bold text-purple-400 flex items-center justify-between">
              <span>Golpe de {resolvedSlot1.variant.name}</span>
              <span className="text-[10px] text-slate-400">
                Iniciativa: {resolvedSlot1.variant.stats.initiative}
              </span>
            </div>
            <div className="text-xl font-bold text-white">
              ~{combatSimulation.strike1Dealt}{' '}
              <span className="text-xs font-normal text-slate-400">daño estimado / golpe</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Necesita <strong>{combatSimulation.hitsToKill2}</strong> golpes para liquidar a 1{' '}
              {resolvedSlot2.variant.name} ({resolvedSlot2.variant.stats.hp} HP).
            </div>
            {combatSimulation.hasNoRetaliation1 && (
              <div className="text-[10px] text-emerald-400 font-bold">
                ✦ Anula el contraataque enemigo
              </div>
            )}
          </div>

          {/* Clash Verdict Card */}
          <div
            className={`p-3.5 rounded-xl border flex flex-col justify-center items-center text-center space-y-2 ${
              isDark ? 'bg-black/70 border-slate-700' : 'bg-slate-100 border-slate-300'
            }`}
          >
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
              Orden de Turno & Primer Golpe
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-bold text-amber-400">
                {combatSimulation.firstStriker === 1
                  ? `${resolvedSlot1.variant.name} golpea primero`
                  : `${resolvedSlot2.variant.name} golpea primero`}
              </span>
            </div>
            <div className="text-[11px] text-slate-300">
              {resolvedSlot1.variant.stats.initiative === resolvedSlot2.variant.stats.initiative ? (
                <span>Empate de iniciativa ({resolvedSlot1.variant.stats.initiative}). El atacante activo tiene prioridad.</span>
              ) : combatSimulation.firstStriker === 1 ? (
                <span>
                  Ventaja de +
                  {resolvedSlot1.variant.stats.initiative - resolvedSlot2.variant.stats.initiative} puntos de
                  iniciativa sobre {resolvedSlot2.variant.name}.
                </span>
              ) : (
                <span>
                  Ventaja de +
                  {resolvedSlot2.variant.stats.initiative - resolvedSlot1.variant.stats.initiative} puntos de
                  iniciativa sobre {resolvedSlot1.variant.name}.
                </span>
              )}
            </div>
          </div>

          {/* Unit 2 Strike Preview */}
          <div
            className={`p-3.5 rounded-xl border space-y-1.5 ${
              isDark ? 'bg-black/50 border-amber-900/50' : 'bg-white border-amber-200 shadow-xs'
            }`}
          >
            <div className="text-xs font-bold text-amber-400 flex items-center justify-between">
              <span>Golpe de {resolvedSlot2.variant.name}</span>
              <span className="text-[10px] text-slate-400">
                Iniciativa: {resolvedSlot2.variant.stats.initiative}
              </span>
            </div>
            <div className="text-xl font-bold text-white">
              ~{combatSimulation.strike2Dealt}{' '}
              <span className="text-xs font-normal text-slate-400">daño estimado / golpe</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Necesita <strong>{combatSimulation.hitsToKill1}</strong> golpes para liquidar a 1{' '}
              {resolvedSlot1.variant.name} ({resolvedSlot1.variant.stats.hp} HP).
            </div>
            {combatSimulation.hasNoRetaliation2 && (
              <div className="text-[10px] text-emerald-400 font-bold">
                ✦ Anula el contraataque enemigo
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Side-by-Side Detailed Quantitative Metrics Table */}
      <div
        className={`rounded-2xl border overflow-hidden transition-all ${
          isDark ? 'bg-black/50 border-slate-800' : 'bg-white border-slate-200 shadow-md'
        }`}
      >
        <div className="p-4 border-b border-slate-800/40 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-serif font-bold uppercase tracking-wider">
              Tabla Comparativa Métrica & Eficiencia Económica
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            Valores en verde representan superioridad estadística directa.
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono text-left">
            <thead>
              <tr className={isDark ? 'bg-slate-900/80 text-slate-300' : 'bg-slate-100 text-slate-800'}>
                <th className="p-3 font-bold uppercase text-[10px] tracking-wider w-1/4">Atributo / Métrica</th>
                {activeSlots.map((slot) => (
                  <th key={slot.id} className="p-3 font-bold uppercase text-[10px] tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                        style={{ backgroundColor: slot.color }}
                      />
                      <span className="truncate" style={{ color: slot.color }}>
                        {slot.variant.name}
                      </span>
                    </div>
                    <div className="text-[9px] text-slate-500 normal-case font-normal">
                      T{slot.tier} • {slot.factionName} • {slot.variantLabel}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {/* Ataque */}
              <tr className={isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}>
                <td className="p-3 font-semibold text-slate-400 flex items-center gap-1.5">
                  <Swords className="w-3.5 h-3.5 text-purple-400" /> Ataque
                </td>
                {activeSlots.map((slot) => {
                  const val = slot.variant.stats.attack;
                  const maxAtk = Math.max(...activeSlots.map((s) => s.variant.stats.attack));
                  const isMax = val === maxAtk;
                  return (
                    <td key={slot.id} className="p-3 font-bold">
                      <span className={isMax ? 'text-emerald-400 flex items-center gap-1' : 'text-slate-200'}>
                        {val} {isMax && <Crown className="w-3 h-3 text-amber-400 inline" />}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Daño Medio & Rango */}
              <tr className={isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}>
                <td className="p-3 font-semibold text-slate-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-red-400" /> Daño (Rango & Medio)
                </td>
                {activeSlots.map((slot) => {
                  const avg = parseAverageDamage(slot.variant.stats.damage);
                  const maxAvg = Math.max(
                    ...activeSlots.map((s) => parseAverageDamage(s.variant.stats.damage))
                  );
                  const isMax = avg === maxAvg;
                  return (
                    <td key={slot.id} className="p-3 font-bold">
                      <div className={isMax ? 'text-emerald-400 font-bold' : 'text-slate-200'}>
                        {slot.variant.stats.damage}{' '}
                        <span className="text-[10px] text-slate-400 font-normal">
                          (Medio: {Number.isInteger(avg) ? avg : avg.toFixed(1)})
                        </span>{' '}
                        {isMax && <Crown className="w-3 h-3 text-amber-400 inline ml-1" />}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Defensa */}
              <tr className={isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}>
                <td className="p-3 font-semibold text-slate-400 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-blue-400" /> Defensa
                </td>
                {activeSlots.map((slot) => {
                  const val = slot.variant.stats.defense;
                  const maxDef = Math.max(...activeSlots.map((s) => s.variant.stats.defense));
                  const isMax = val === maxDef;
                  return (
                    <td key={slot.id} className="p-3 font-bold">
                      <span className={isMax ? 'text-emerald-400 flex items-center gap-1' : 'text-slate-200'}>
                        {val} {isMax && <Crown className="w-3 h-3 text-amber-400 inline" />}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Salud (HP) */}
              <tr className={isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}>
                <td className="p-3 font-semibold text-slate-400 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-red-500" /> Salud (HP)
                </td>
                {activeSlots.map((slot) => {
                  const val = slot.variant.stats.hp;
                  const maxHp = Math.max(...activeSlots.map((s) => s.variant.stats.hp));
                  const isMax = val === maxHp;
                  return (
                    <td key={slot.id} className="p-3 font-bold">
                      <span className={isMax ? 'text-emerald-400 flex items-center gap-1' : 'text-slate-200'}>
                        {val} HP {isMax && <Crown className="w-3 h-3 text-amber-400 inline" />}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Velocidad */}
              <tr className={isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}>
                <td className="p-3 font-semibold text-slate-400 flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-yellow-400" /> Velocidad (Hexágonos)
                </td>
                {activeSlots.map((slot) => {
                  const val = slot.variant.stats.speed;
                  const maxSpd = Math.max(...activeSlots.map((s) => s.variant.stats.speed));
                  const isMax = val === maxSpd;
                  return (
                    <td key={slot.id} className="p-3 font-bold">
                      <span className={isMax ? 'text-emerald-400 flex items-center gap-1' : 'text-slate-200'}>
                        {val} casillas {isMax && <Crown className="w-3 h-3 text-amber-400 inline" />}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Iniciativa */}
              <tr className={isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}>
                <td className="p-3 font-semibold text-slate-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> Iniciativa (Turno)
                </td>
                {activeSlots.map((slot) => {
                  const val = slot.variant.stats.initiative;
                  const maxInit = Math.max(...activeSlots.map((s) => s.variant.stats.initiative));
                  const isMax = val === maxInit;
                  return (
                    <td key={slot.id} className="p-3 font-bold">
                      <span className={isMax ? 'text-emerald-400 flex items-center gap-1' : 'text-slate-200'}>
                        {val} {isMax && <Crown className="w-3 h-3 text-amber-400 inline" />}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Tipo de Ataque & Alcance */}
              <tr className={isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}>
                <td className="p-3 font-semibold text-slate-400 flex items-center gap-1.5">
                  <Crosshair className="w-3.5 h-3.5 text-cyan-400" /> Tipo de Ataque
                </td>
                {activeSlots.map((slot) => (
                  <td key={slot.id} className="p-3 text-slate-200">
                    <span className="px-1.5 py-0.5 rounded border border-slate-700 bg-black/40 text-[10px]">
                      {slot.variant.attackType || 'Melé'}
                      {slot.variant.stats.shots ? ` (${slot.variant.stats.shots} tiros)` : ''}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Movimiento & Clase */}
              <tr className={isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}>
                <td className="p-3 font-semibold text-slate-400 flex items-center gap-1.5">
                  <Feather className="w-3.5 h-3.5 text-teal-400" /> Movimiento & Clase
                </td>
                {activeSlots.map((slot) => (
                  <td key={slot.id} className="p-3 text-slate-300 text-[11px]">
                    {slot.variant.movementType || 'Terrestre'} • {slot.variant.unitClass || 'Viviente'}
                  </td>
                ))}
              </tr>

              {/* Crecimiento Semanal */}
              <tr className={isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}>
                <td className="p-3 font-semibold text-slate-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-lime-400" /> Crecimiento Semanal
                </td>
                {activeSlots.map((slot) => (
                  <td key={slot.id} className="p-3 text-slate-200 font-bold">
                    {slot.variant.stats.weeklyGrowth} / semana
                  </td>
                ))}
              </tr>

              {/* Coste de Reclutamiento */}
              <tr className={isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}>
                <td className="p-3 font-semibold text-slate-400 flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-yellow-500" /> Coste por Unidad
                </td>
                {activeSlots.map((slot) => {
                  const c = slot.variant.cost;
                  return (
                    <td key={slot.id} className="p-3 font-bold">
                      <span className="text-yellow-400">{c.gold} Oro</span>
                      {c.gems ? <span className="text-emerald-400 ml-1">+{c.gems} Gemas</span> : null}
                      {c.ore ? <span className="text-amber-400 ml-1">+{c.ore} Mineral</span> : null}
                      {c.mercury ? <span className="text-red-400 ml-1">+{c.mercury} Merc</span> : null}
                      {c.alchemicalDust ? <span className="text-cyan-400 ml-1">+{c.alchemicalDust} Polvo</span> : null}
                    </td>
                  );
                })}
              </tr>

              {/* Efficiency Metric: DPS per 100 Gold */}
              <tr className={isDark ? 'bg-white/5' : 'bg-slate-50'}>
                <td className="p-3 font-bold text-amber-400 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> Daño Medio / 100 Oro
                </td>
                {activeSlots.map((slot) => {
                  const avg = parseAverageDamage(slot.variant.stats.damage);
                  const gold = slot.variant.cost.gold || 1;
                  const ratio = (avg / gold) * 100;
                  return (
                    <td key={slot.id} className="p-3 font-bold text-amber-300">
                      {ratio.toFixed(2)} pts
                    </td>
                  );
                })}
              </tr>

              {/* Efficiency Metric: HP per 100 Gold */}
              <tr className={isDark ? 'bg-white/5' : 'bg-slate-50'}>
                <td className="p-3 font-bold text-emerald-400 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-emerald-400" /> HP Eficiencia / 100 Oro
                </td>
                {activeSlots.map((slot) => {
                  const hp = slot.variant.stats.hp;
                  const gold = slot.variant.cost.gold || 1;
                  const ratio = (hp / gold) * 100;
                  return (
                    <td key={slot.id} className="p-3 font-bold text-emerald-300">
                      {ratio.toFixed(1)} HP
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Side-by-Side Abilities, Stances & Tactical Breakdown */}
      <div
        className={`grid grid-cols-1 ${
          slot3 ? 'lg:grid-cols-3' : 'md:grid-cols-2'
        } gap-4`}
      >
        {activeSlots.map((slot) => (
          <div
            key={slot.id}
            className={`p-5 rounded-2xl border space-y-4 flex flex-col justify-between ${
              isDark ? 'bg-black/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
            style={{ borderTopColor: slot.color, borderTopWidth: 4 }}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 border-b pb-2 border-slate-800/40">
                <div>
                  <span
                    className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded border"
                    style={{
                      borderColor: slot.color,
                      color: slot.color,
                      backgroundColor: `${slot.color}15`,
                    }}
                  >
                    T{slot.tier} • {slot.factionName}
                  </span>
                  <h4 className="text-base font-serif font-bold uppercase mt-1 text-white">
                    {slot.variant.name}
                  </h4>
                  <div className="text-[11px] font-mono text-slate-400">{slot.variant.dwellingName}</div>
                </div>
              </div>

              {/* Stance */}
              <div
                className={`p-2.5 rounded-xl border space-y-1 ${
                  isDark ? 'bg-black/40 border-white/5' : 'bg-amber-50/60 border-amber-200'
                }`}
              >
                <div className="text-[10px] font-mono font-bold uppercase text-yellow-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" /> Postura de Combate
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{slot.variant.combatStance}</p>
              </div>

              {/* Abilities */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-mono font-bold uppercase text-purple-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Habilidades ({slot.variant.abilities.length})
                  </div>
                  {(() => {
                    if (!slot.unit) return null;
                    const branchId = slot.variantKey === 'branchA' ? 'branch_a' : slot.variantKey === 'branchB' ? 'branch_b' : 'base';
                    const exclusiveList = getExclusiveAbilitiesForBranch(branchId, slot.unit);
                    if (exclusiveList.length === 0) return null;
                    return (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase flex items-center gap-1 bg-purple-950/70 text-purple-300 border-purple-500/40">
                        ★ {exclusiveList.length} {exclusiveList.length === 1 ? 'exclusiva' : 'exclusivas'}
                      </span>
                    );
                  })()}
                </div>
                <ul className="space-y-1.5 text-xs font-mono">
                  {slot.variant.abilities.map((ab, idx) => {
                    const branchId = slot.variantKey === 'branchA' ? 'branch_a' : slot.variantKey === 'branchB' ? 'branch_b' : 'base';
                    const isExclusive = slot.unit ? isAbilityExclusiveToBranch(ab, branchId, slot.unit) : false;
                    const parsed = parseAbility(ab);

                    if (isExclusive) {
                      return (
                        <li
                          key={idx}
                          className="p-2 rounded-xl border text-[11px] font-sans leading-snug space-y-1 bg-purple-950/40 border-purple-500/50 text-purple-100 shadow-[0_0_10px_rgba(168,85,247,0.15)]"
                        >
                          <div className="flex items-center justify-between gap-1.5">
                            <div className="flex items-center gap-1.5 font-bold">
                              {parsed.prefix && (
                                <span className="px-1 py-0.2 text-[9px] font-mono rounded border uppercase bg-black/40 border-white/20 text-slate-300">
                                  {parsed.prefix}
                                </span>
                              )}
                              <span className="font-semibold tracking-tight">{parsed.title}</span>
                            </div>
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase shrink-0 bg-purple-500/25 text-purple-200 border-purple-400/50">
                              ★ Exclusiva
                            </span>
                          </div>
                          {parsed.description && (
                            <p
                              className="text-[11px] opacity-90 leading-relaxed font-sans"
                              dangerouslySetInnerHTML={{ __html: parsed.description }}
                            />
                          )}
                        </li>
                      );
                    }

                    return (
                      <li key={idx} className="flex items-start gap-1.5 leading-snug text-slate-300 font-sans text-xs">
                        <span className="font-bold shrink-0 mt-0.5" style={{ color: slot.color }}>
                          ✦
                        </span>
                        <div>
                          {parsed.prefix && (
                            <span className="text-[10px] font-mono font-semibold opacity-75 mr-1 text-slate-400">
                              {parsed.prefix}
                            </span>
                          )}
                          <strong className="font-semibold text-slate-200">{parsed.title}:</strong>{' '}
                          <span
                            className="text-slate-300"
                            dangerouslySetInnerHTML={{ __html: parsed.description || parsed.raw }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Tactical Strengths */}
              <div
                className={`p-2.5 rounded-xl border text-xs space-y-1 ${
                  isDark ? 'bg-teal-950/20 border-teal-900/40 text-teal-200' : 'bg-teal-50 border-teal-200 text-teal-950'
                }`}
              >
                <div className="font-bold flex items-center gap-1 text-[10px] uppercase">
                  <Shield className="w-3 h-3" /> Puntos Fuertes:
                </div>
                <p className="leading-relaxed text-[11px]">{slot.variant.strengths}</p>
              </div>
            </div>

            {/* Link to view in catalog */}
            {onSelectUnitInCatalog && (
              <button
                onClick={() =>
                  onSelectUnitInCatalog(
                    slot.factionId,
                    slot.tier,
                    slot.variantKey === 'branchB' ? 'branch_b' : slot.variantKey === 'base' ? 'base' : 'branch_a'
                  )
                }
                className={`w-full py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
                    : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                }`}
              >
                Ver en Catálogo de {slot.factionName} →
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
