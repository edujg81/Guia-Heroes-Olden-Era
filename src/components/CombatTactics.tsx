import React from 'react';
import { FactionId, getCombatTacticsForFaction, FACTIONS_METADATA, getFactionTheme } from '../data/factionDataProvider';
import { useStickyState } from '../utils/useStickyState';
import { Swords, ShieldAlert, Zap, Flame, UserCheck, Bot, Sparkles, ChevronRight, HelpCircle, Shield, Crown, AlertTriangle, Bug, Skull, Wand2, Trees } from 'lucide-react';

interface CombatTacticsProps {
  selectedFaction?: FactionId;
  themeMode?: 'dark' | 'light';
}

export const CombatTactics: React.FC<CombatTacticsProps> = ({ 
  selectedFaction = 'Mazmorra',
  themeMode = 'dark',
}) => {
  const scenarios = getCombatTacticsForFaction(selectedFaction);
  const meta = FACTIONS_METADATA[selectedFaction] || FACTIONS_METADATA.Mazmorra;
  const theme = getFactionTheme(selectedFaction, themeMode);

  const defaultScenarioId = scenarios[0]?.id || 'scenario-1';
  const [selectedScenario, setSelectedScenario] = useStickyState<string>(defaultScenarioId, `combat_selected_scenario_${selectedFaction}`);

  const current = scenarios.find((s) => s.id === selectedScenario) || scenarios[0];

  return (
    <div className="space-y-6">
      {/* Immersive Overview Card */}
      <div className={`bg-black/40 border ${theme.border} rounded-2xl p-6 ${theme.shadowAccent} backdrop-blur-md space-y-5 transition-colors duration-300`}>
        <div className="flex items-center gap-3.5">
          <div className={`p-3 ${theme.bgBadge} border ${theme.borderSubtle} rounded-xl ${theme.textAccent} shadow-md`}>
            <Swords className="w-6 h-6" />
          </div>
          <div>
            <div className={`text-[10px] uppercase font-mono tracking-widest ${theme.textAccent} font-bold`}>
              Grimorio Táctico • Olden Era Combat Engine ({meta.name})
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-white uppercase tracking-wide">
              Manual de Combate, Posturas & Control de Campo
            </h2>
          </div>
        </div>

        {/* 3 Core Pillars of Faction Combat in Olden Era */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {selectedFaction === 'Templo' && (
            <>
              <div className="bg-black/50 border border-amber-900/40 p-4 rounded-xl space-y-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider font-mono">
                  <Shield className="w-4 h-4 text-yellow-400" />
                  <span>1. Muro de Fe (Falange & Luz)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Coloca a los Soldados y Cruzados en primera línea. Absorben el choque frontal con su alta defensa y protección a distancia mientras los Arqueros castigan al enemigo.
                </p>
              </div>

              <div className="bg-black/50 border border-amber-900/40 p-4 rounded-xl space-y-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider font-mono">
                  <Flame className="w-4 h-4 text-cyan-400" />
                  <span>2. Carga Devastadora</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Los Caballeros y Justicieros multiplican su daño por cada casilla recorrida en línea recta. Mantén despejadas las líneas de carga para un golpe letal en Turno 1 o 2.
                </p>
              </div>

              <div className="bg-black/50 border border-amber-900/40 p-4 rounded-xl space-y-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500"></div>
                <div className="flex items-center gap-2 text-yellow-300 font-bold text-xs uppercase tracking-wider font-mono">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span>3. Ángeles & Resurrección</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Los Arcángeles dominan el combate con vuelo total, daño máximo constante y habilidad de Resurrección activa para revivir tropas caídas antes de que termine el asalto.
                </p>
              </div>
            </>
          )}

          {(selectedFaction === 'Foresta' || selectedFaction === 'Arboleda') && (
            <>
              <div className="bg-black/50 border border-emerald-900/40 p-4 rounded-xl space-y-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider font-mono">
                  <Trees className="w-4 h-4 text-emerald-400" />
                  <span>1. Doble Disparo Silvano</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Protege a los Cazadores Elfos y Cazadores del Viento. Su doble disparo y rango absoluto aniquilan las unidades prioritarias antes del choque.
                </p>
              </div>

              <div className="bg-black/50 border border-emerald-900/40 p-4 rounded-xl space-y-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-teal-500"></div>
                <div className="flex items-center gap-2 text-teal-300 font-bold text-xs uppercase tracking-wider font-mono">
                  <Shield className="w-4 h-4 text-teal-400" />
                  <span>2. Enredo de Hombres Árbol</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Los Treants enraízan a cualquier atacante, inmovilizando a caballeros y bestias enemigas mientras la retaguardia silvana las acribilla.
                </p>
              </div>

              <div className="bg-black/50 border border-emerald-900/40 p-4 rounded-xl space-y-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-lime-500"></div>
                <div className="flex items-center gap-2 text-lime-300 font-bold text-xs uppercase tracking-wider font-mono">
                  <Sparkles className="w-4 h-4 text-lime-400" />
                  <span>3. Dragones Esmeralda & Veneno</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Su aliento ácido penetra 2 casillas consecutivas y reduce la armadura rival a la mitad. Ideales para flanquear y arrasar tiradores.
                </p>
              </div>
            </>
          )}

          {selectedFaction === 'Necrópolis' && (
            <>
              <div className="bg-black/50 border border-slate-700/40 p-4 rounded-xl space-y-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-slate-400"></div>
                <div className="flex items-center gap-2 text-slate-300 font-bold text-xs uppercase tracking-wider font-mono">
                  <Skull className="w-4 h-4 text-slate-300" />
                  <span>1. Drenaje Vampírico (0 Bajas)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Los Señores Vampiros atacan sin recibir contragolpe y regeneran el 100% del daño infligido en PS. Limpian neutrales vivos con cero bajas.
                </p>
              </div>

              <div className="bg-black/50 border border-slate-700/40 p-4 rounded-xl space-y-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-zinc-500"></div>
                <div className="flex items-center gap-2 text-zinc-300 font-bold text-xs uppercase tracking-wider font-mono">
                  <Zap className="w-4 h-4 text-zinc-400" />
                  <span>2. Nube de Muerte en Área</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Los Archiliches disparan nubes tóxicas en área. Tus tropas no-muertas son 100% inmunes al daño mientras el enemigo muere atrapado en el miasma.
                </p>
              </div>

              <div className="bg-black/50 border border-slate-700/40 p-4 rounded-xl space-y-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-neutral-400"></div>
                <div className="flex items-center gap-2 text-slate-200 font-bold text-xs uppercase tracking-wider font-mono">
                  <Flame className="w-4 h-4 text-slate-300" />
                  <span>3. Terror & Envejecimiento</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Los Dragones Espectrales reducen la vida enemiga a la mitad (Envejecimiento) y provocan fallos de turno por moral negativa (-2).
                </p>
              </div>
            </>
          )}

          {(selectedFaction === 'Colmena' || selectedFaction === 'Enjambre') && (
            <>
              <div className="bg-black/50 border border-orange-900/40 p-4 rounded-xl space-y-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                <div className="flex items-center gap-2 text-orange-300 font-bold text-xs uppercase tracking-wider font-mono">
                  <Bug className="w-4 h-4 text-orange-400" />
                  <span>1. Manada Quinosa & Frenesí</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Rodea al enemigo con múltiples pilas de Larvas y Escarabajos. Cada unidad adyacente multiplica exponencialmente el daño de manada.
                </p>
              </div>

              <div className="bg-black/50 border border-orange-900/40 p-4 rounded-xl space-y-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider font-mono">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>2. Salto de Asedio de Mantis</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Las Mantis Voraces saltan por encima de murallas y obstáculos trabando tiradores enemigos en Turno 1 con doble ataque letal.
                </p>
              </div>

              <div className="bg-black/50 border border-orange-900/40 p-4 rounded-xl space-y-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                <div className="flex items-center gap-2 text-red-300 font-bold text-xs uppercase tracking-wider font-mono">
                  <Sparkles className="w-4 h-4 text-red-400" />
                  <span>3. Devoración de Leviatanes</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  El Leviatán Devorador engulle unidades colosales enemigas al instante y desata la Pisada Sísmica en área 3x3 curándose por completo.
                </p>
              </div>
            </>
          )}

          {selectedFaction === 'Cisma' && (
            <>
              <div className="bg-black/50 border border-cyan-900/40 p-4 rounded-xl space-y-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider font-mono">
                  <Wand2 className="w-4 h-4 text-cyan-400" />
                  <span>1. Comunión Abisal & Ra'Shoths</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Despliega hordas de Ra'Shoths Punzantes y Feroces con Cleave frontal. Aprovecha el Rito de Invocación sobre cadáveres para multiplicar tropas permanentes durante el combate.
                </p>
              </div>

              <div className="bg-black/50 border border-cyan-900/40 p-4 rounded-xl space-y-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-sky-500"></div>
                <div className="flex items-center gap-2 text-sky-300 font-bold text-xs uppercase tracking-wider font-mono">
                  <Shield className="w-4 h-4 text-sky-400" />
                  <span>2. Ataduras del Vacío & Concubis</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Los Cultistas Vinculadores inmovilizan a los atacantes con ataduras planares mientras las Señoras de las Cadenas encarecen los hechizos rivales y bloquean habilidades activas.
                </p>
              </div>

              <div className="bg-black/50 border border-cyan-900/40 p-4 rounded-xl space-y-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                <div className="flex items-center gap-2 text-blue-300 font-bold text-xs uppercase tracking-wider font-mono">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>3. Árbitros & Supervisores Abisales</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Los Árbitros castigan con Disparo Paradójico a distancia máxima, y los Supervisores Abisales dominan el coloso rival con Momento de Demencia e Inmunidad Mágica al 100%.
                </p>
              </div>
            </>
          )}

          {selectedFaction === 'Mazmorra' && (
            <>
              <div className="bg-black/50 border border-purple-900/40 p-4 rounded-xl space-y-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                <div className="flex items-center gap-2 text-purple-300 font-bold text-xs uppercase tracking-wider font-mono">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span>1. Cebo de 1-Troglodita & Danzantes</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Separa tus Trogloditas en pilas de 1 soldado para absorber contragolpes sin sufrir ceguera, permitiendo que tus Danzantes de Jaspe y Áureos desaten doble golpe y contragolpe infinito.
                </p>
              </div>

              <div className="bg-black/50 border border-purple-900/40 p-4 rounded-xl space-y-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-teal-500"></div>
                <div className="flex items-center gap-2 text-teal-300 font-bold text-xs uppercase tracking-wider font-mono">
                  <Flame className="w-4 h-4 text-teal-400" />
                  <span>2. Infiltrados (Blink) & Medusas</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Activa el Salto Sombrío (Blink) de los Infiltradores para silenciar tiradores enemigos en Turno 1, apoyado por la Petrificación infalible en melé de las Emperatrices Medusas.
                </p>
              </div>

              <div className="bg-black/50 border border-purple-900/40 p-4 rounded-xl space-y-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
                <div className="flex items-center gap-2 text-rose-300 font-bold text-xs uppercase tracking-wider font-mono">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>3. Dragón Negro vs Dragón Cenizo</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  El Dragón Negro ofrece Inmunidad Nv 1-5 para el cataclismo de Drago-Armageddon, mientras que el Dragón Cenizo aporta 330 HP, nube protectora de humo y aliento de cenizas que sofoca el ataque rival.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Interactive Scenario Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scenario List */}
        <div className="lg:col-span-4 space-y-2.5">
          <h3 className={`text-xs font-bold uppercase tracking-widest ${theme.textAccent} font-mono px-1`}>
            Escenarios de Combate Clave ({meta.name})
          </h3>
          <div className="space-y-2">
            {scenarios.map((scen, idx) => (
              <button
                key={scen.id}
                onClick={() => setSelectedScenario(scen.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                  selectedScenario === scen.id
                    ? `${theme.bgBadge} ${theme.border} text-white ${theme.shadowAccent}`
                    : `bg-black/40 ${theme.borderSubtle} text-slate-300 hover:bg-white/5`
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <span className={`font-serif text-sm ${theme.textAccent} font-bold italic mt-0.5`}>
                    0{idx + 1}
                  </span>
                  <div className="space-y-1">
                    <div className="font-semibold text-xs sm:text-sm tracking-wide font-sans">{scen.title}</div>
                    {scen.category && (
                      <span className="inline-block text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-black/50 text-slate-400 border border-slate-800">
                        {scen.category}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 ${selectedScenario === scen.id ? 'text-yellow-400' : 'text-slate-600'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Selected Scenario Details */}
        <div className={`lg:col-span-8 bg-black/40 border ${theme.border} rounded-2xl p-6 shadow-xl space-y-5 transition-colors duration-300`}>
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b ${theme.borderSubtle} pb-4`}>
            <div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${theme.bgBadge} ${theme.textAccent} border ${theme.borderSubtle} font-mono uppercase tracking-wider`}>
                Caso Práctico en Partida
              </span>
              <h3 className="text-xl font-serif text-white uppercase mt-1 tracking-wide">{current.title}</h3>
            </div>

            {/* Recommended Triumvirate Stance */}
            <div className={`bg-black/70 border ${theme.borderSubtle} px-3.5 py-2 rounded-xl text-left sm:text-right self-start sm:self-auto shadow-md`}>
              <span className="text-[10px] text-yellow-400 font-mono font-bold uppercase tracking-wider block">
                Postura Triunvirato Sugerida:
              </span>
              <span className="text-xs font-mono font-bold text-white uppercase">
                {current.triumvirateStance}
              </span>
            </div>
          </div>

          <div className={`bg-black/60 p-3.5 rounded-xl border ${theme.borderSubtle} text-xs sm:text-sm text-slate-300 flex items-start gap-3`}>
            <HelpCircle className={`w-4 h-4 ${theme.textAccent} shrink-0 mt-0.5`} />
            <div>
              <strong className={`${theme.textAccent} font-mono uppercase text-[11px] block mb-0.5`}>Situación en el Tablero:</strong>
              {current.situation}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* AI match-up */}
            <div className={`bg-black/40 border ${theme.borderSubtle} p-4 rounded-xl space-y-2`}>
              <div className={`flex items-center gap-2 ${theme.textAccent} font-bold text-xs uppercase font-mono tracking-wider`}>
                <Bot className="w-4 h-4" />
                <span>Estrategia vs Inteligencia Artificial (IA):</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {current.recommendationAI}
              </p>
            </div>

            {/* Human match-up */}
            <div className="bg-teal-950/20 border border-teal-900/40 p-4 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-teal-300 font-bold text-xs uppercase font-mono tracking-wider">
                <UserCheck className="w-4 h-4 text-teal-400" />
                <span>Estrategia vs Jugadores Humanos:</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {current.recommendationHuman}
              </p>
            </div>
          </div>

          {/* Recommended Spells & Thaumaturgy */}
          <div className={`bg-black/60 border ${theme.border} p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${theme.shadowAccent}`}>
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-yellow-400 shrink-0" />
              <div>
                <div className={`text-[10px] ${theme.textAccent} font-bold uppercase tracking-widest font-mono`}>
                  Hechizo Clave Recomendado (Grimorio / Cofradía)
                </div>
                <div className="text-sm sm:text-base font-bold text-yellow-400 font-mono">{current.recommendedSpell}</div>
              </div>
            </div>
            <span className={`text-[11px] ${theme.textAccent} font-mono ${theme.bgBadge} px-2.5 py-1 rounded border ${theme.borderSubtle}`}>
              Sinergia Taumaturgia & Astrología
            </span>
          </div>

          {/* Turn-by-turn Combat Execution Loop */}
          {current.turnByTurnLoop && current.turnByTurnLoop.length > 0 && (
            <div className={`bg-black/40 border ${theme.borderSubtle} p-4 rounded-xl space-y-2.5`}>
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-mono uppercase font-bold ${theme.textAccent} tracking-wider flex items-center gap-1.5`}>
                  <Swords className="w-3.5 h-3.5" />
                  Secuencia de Rondas & Ejecución en Combate
                </span>
                <span className="text-[10px] font-mono text-slate-400">Paso a Paso</span>
              </div>
              <div className="space-y-1.5">
                {current.turnByTurnLoop.map((step, sIdx) => (
                  <div key={sIdx} className={`flex items-start gap-2.5 bg-black/40 p-2.5 rounded-lg border ${theme.borderSubtle} text-xs text-slate-200`}>
                    <span className={`w-5 h-5 rounded-full ${theme.bgBadge} ${theme.textAccent} flex items-center justify-center text-[10px] font-mono font-bold shrink-0 border ${theme.borderSubtle}`}>
                      {sIdx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Heroes & Units & CounterPlay */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            {current.recommendedHeroes && (
              <div className={`bg-black/50 border ${theme.borderSubtle} p-3 rounded-xl space-y-1.5`}>
                <div className={`text-[10px] uppercase font-mono tracking-wider ${theme.textAccent} font-bold flex items-center gap-1`}>
                  <Crown className="w-3.5 h-3.5 text-yellow-400" />
                  Héroes Recomendados
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {current.recommendedHeroes.map((h, i) => (
                    <span key={i} className={`text-[11px] font-mono ${theme.bgBadge} ${theme.textAccent} px-2 py-0.5 rounded border ${theme.borderSubtle}`}>
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {current.recommendedUnits && (
              <div className="bg-black/50 border border-teal-900/40 p-3 rounded-xl space-y-1.5">
                <div className="text-[10px] uppercase font-mono tracking-wider text-teal-400 font-bold flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-teal-400" />
                  Tropas & Sinergias Clave
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {current.recommendedUnits.map((u, i) => (
                    <span key={i} className="text-[11px] font-mono bg-teal-950/80 text-teal-200 px-2 py-0.5 rounded border border-teal-800/60">
                      {u}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {current.counterPlayNote && (
            <div className="bg-amber-950/20 border border-amber-800/40 p-3 rounded-xl text-xs text-amber-200/90 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 font-mono uppercase text-[10px] block">Nota de Adaptación Táctica:</strong>
                {current.counterPlayNote}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
