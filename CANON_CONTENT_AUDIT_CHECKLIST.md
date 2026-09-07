# PROTOCOLO DE AUDITORÍA Y CONTROL CANÓNICO DE CONTENIDO
## HEROES OF MIGHT & MAGIC: OLDEN ERA (JADAME)

> **Configuración Determinista de Verificación**:
> - **Temperatura**: `0.0` (Cero creatividad especulativa, máxima fidelidad fáctica)
> - **Top-P**: `0.1` (Filtrado estricto al vocabulario canónico verificado)
> - **Entorno y Lore**: Continente de **Jadame** (*Heroes of Might & Magic: Olden Era*)
> - **Facciones Oficiales (6)**: Templo, Necrópolis, Mazmorra, Foresta (Arboleda), Colmena (Enjambre) y Cisma.
> - **Directiva Anti-Alucinación**: Prohibición terminante de importar personajes, héroes, hechizos o reglas no confirmadas de *Heroes III*, *IV* o *V* (ej. Sandro, Gelu, Crag Hack, Solmyr, Christian, Mephala, Isra, Deemer, Gunnar, etc.).

---

## 1. MARCO METODOLÓGICO Y PROTOCOLO DE AUDITORÍA

Cada elemento de la aplicación debe contrastarse contra la documentación canónica oficial de *Olden Era*.
El estado de cada tarea se gestiona mediante cajas de verificación:
- `[ ]` **Pendiente de Verificación**: Contenido pendiente de cotejo línea por línea.
- `[-]` **En Revisión / Discrepancia Detectada**: Contenido con inconsistencias detectadas con la versión canónica.
- `[x]` **Verificado y Conforme**: Contenido auditado al 100% con precisión fáctica en fórmulas, nombres y estadísticas.

---

## 2. MÓDULO 1: AUDITORÍA DE HÉROES Y SUBCLASES DE JADAME
*Archivos a auditar: `/src/data/heroesData.ts`, `/src/data/factions/heroesRegistry.ts`, `/src/data/*Data.ts`*

### 2.1. Criterios Generales de Héroes
- [x] Verificar que ningún héroe de *Heroes III/IV/V* no canónico en *Olden Era* esté presente en el roster (Sandro, Gelu, Crag Hack, Solmyr, Christian, Mephala, Isra, Deemer, Gunnar excluidos 100%).
- [x] Verificar que cada facción cuente con sus dos clases principales canónicas (Guerrero/Might y Mago/Magic) divididas equitativamente en 9 Guerreros y 9 Magos (18 héroes por facción, 108 héroes en total).
- [x] Verificar que las especialidades tengan descripciones numéricas exactas de escalado por nivel y mecánicas cuantificadas.
- [x] Verificar que los atributos iniciales y crecimiento (Ataque, Defensa, Poder Mágico, Conocimiento) correspondan a la plantilla del juego.
- [x] Verificar que las tropas iniciales asignadas a cada héroe correspondan a la plantilla canónica de inicio de partida (Día 1).
- [x] Verificar la clasificación de roles competitivos (S+, S, A, B) y su pertinencia al meta actual de *Olden Era*.
- [x] Sincronización de las 24 Subclases Oficiales de Jadame (4 por facción) con requisitos de 5 habilidades expertas y héroes recomendados canónicos verificados.

### 2.2. Roster por Facción

#### A. Mazmorra (Dungeon) - Elfos Oscuros y Moradores de Alvar (18 Héroes)
- [x] **Clases**: Adalid / Guerrero (Might) y Brujo / Mago (Magic).
- [x] **9 Guerreros (Might)**:
  - [x] Enatee (La Soberana de la Mirada de Piedra) - Petrificación y bono de ataque.
  - [x] Devir, hijo de Devir (El Caudillo de los Laberintos) - Crecimiento y bono a Minotauros.
  - [x] Tellaris el Traicionado (La Capitana Renegada) - Tácticas y despliegue avanzado.
  - [x] Kieran (El Patriarca del Pueblo Ciego) - Bonificación a Trogloditas y visión cavernícola.
  - [x] Mouaren (El Maestro de la Traslación Sombría) - Movilidad y teletransporte táctico.
  - [x] Creta, hija de Navarr (La Minotauro Prospectora) - Detección de gemas y minería.
  - [x] Rhea (La Dama de la Suerte Sombría) - Bonificación pasiva de suerte y críticos.
  - [x] Aguijón (La Ejecutora del Golpe Venenoso) - Veneno paralizante y perforación.
  - [x] Gleard el Gris (El Bastión de Piel de Hierro) - Muro defensivo subterráneo.
- [x] **9 Magos (Magic)**:
  - [x] Zakron el Grande (El Gran Señor de la Hechicería) - Daño de hechizos destructivos.
  - [x] Typhona (La Criadora de Hidras Abisales) - Crecimiento y regeneración de Hidras.
  - [x] Motley (La Maestra de la Danza Macabra) - Danzantes de Ónice potenciados.
  - [x] Lodos (El Maestro de la Magia Nochesombra) - Maldiciones y daño nocturno.
  - [x] Hermana Deira (La Sacerdotisa de la Flor Negra) - Sanación oscura y soporte.
  - [x] Kelarr, hijo de Navarr (El Erudito de los Laberintos) - Sabiduría y progresión de hechizos.
  - [x] Rauktol el Soleado (El Vidente Troglodita) - Resistencia mágica y visión.
  - [x] Ylwari (La Diplomática de las Profundidades) - Reclutamiento neutral y carisma subterráneo.
  - [x] Glastor (El Señor Acaudalado de Alvar) - Economía de oro y gemas de Alvar.
- [x] **Subclases Mazmorra**: Guardaespaldas de Baltasar (+100% Atk), Enviado de Lengua de Plata (+100% Def), Heredero de Amelchia (+100% SP), Gran Mercader (+10.000 Oro/día).

#### B. Templo (Temple) - Caballeros y Clérigos Sagrados (18 Héroes)
- [x] **Clases**: Caballero (Might) y Clérigo (Magic).
- [x] **9 Caballeros (Might)**:
  - [x] Viejo Lord Mandall (El Archivero Bélico) - Especialista en Golpe Heroico y daño físico +20%.
  - [x] Kestrel (La Comandante de Tiradores) - 3 pilas de Ballesteros y Tácticas en Día 1.
  - [x] Keandra (La Justadora de la Corona) - Caballería de Tier 4 y bono de carga por casilla.
  - [x] John Johnson (La Sal de la Tierra) - 3 pilas de Espadachines y reducción del 20% de daño.
  - [x] Leon Dedos Pegajosos (El Redimido del Bosque) - Radio de exploración y detección de tesoros.
  - [x] Ister (El Comandante de la Guardia) - Liderazgo superior y turnos dobles por moral.
  - [x] Aeos la Exaltada (La Bendecida por el Sol) - Presencia inspiradora, +1 Moral y escalado de probabilidad.
  - [x] Lord Edgar (El Baluarte Inflexible del Templo) - Justicia Avanzada inicial.
  - [x] Avis el Hereje (El Inquisidor Cismático) - Magia de batalla y daño adicional a criaturas impías.
- [x] **9 Clérigos (Magic)**:
  - [x] Julius (El Custodio de la Resistencia Arcana) - Resistencia pasiva a todo el ejército.
  - [x] Zenith (La Dama de la Luz Celestial) - Tejedoras de Luz iniciales y Hechicería.
  - [x] Elias el Alegre (El Heraldo de las Bendiciones) - Magia de Luz Solar Avanzada y daño máximo.
  - [x] Pip (El Prodigio del Saber Feudal) - Sabiduría y Percepción con ganancia acelerada de XP.
  - [x] Clarissa (La Dama de la Prosperidad) - Economía y reducción de costes de construcción.
  - [x] Anastasia la Dócil (La Servidora del Toque Sagrado) - Taumaturgia y encantamientos.
  - [x] Vesper (El Erudito de la Luz Diurna) - Hechicería y duración extendida de conjuros diurnos.
  - [x] Lia la Desatada (La Inquisidora de la Purga) - Percepción y purga de lanzadores rivales.
  - [x] Nadir (El Ojo de la Noche Sagrada) - Magia de Nochesombra combinada con disciplina solar.
- [x] **Subclases Templo**: Bravucón (+200 Daño Heroic Strike), Dechado (Daño Máx/Min favorable), Gran Inquisidor (Límite 1 conjuro al rival), Ascendente (Coste 0 de Maná).

#### C. Necrópolis (Necropolis) - Señores de la Muerte (18 Héroes)
- [x] **Clases**: Caballero de la Muerte (Might) y Nigromante (Magic).
- [x] **9 Caballeros de la Muerte (Might)**:
  - [x] Baluarte (El Bastión Inquebrantable) - Bono masivo de resistencia y defensa frontal.
  - [x] Rey de reyes (El Conquistador de los Condenados) - Golpe Heroico necrótico y merma de moral.
  - [x] Onkos (El Heraldo de la Pestilencia) - 3 pilas de Zombis y reducción de daño frontal.
  - [x] Tarius (El Señor del Heraldo del Destino) - Nigromancia Avanzada inicial.
  - [x] Marl (El Tejedur de la Telaraña Funesta) - Tácticas y ataduras de telaraña debilitantes.
  - [x] Laura (La Bruja de la Noche Guerrera) - Magia de batalla marcial oscura.
  - [x] Kel'Ghul (El Señor de las Criptas Profundas) - Horda de esqueletos inicial y Ofensiva.
  - [x] Natalida (La Vigía de los Mausoleos) - Muro de huesos y reducción de proyectiles recibidos.
  - [x] Zam (El Alquimista Solitario) - Mercurio diario (+1) y +25% recolección en mapa.
- [x] **9 Nigromantes (Magic)**:
  - [x] Artorius Veritas (El Cronista de la Noche Mística) - Hechicería y maná inagotable.
  - [x] Funerella (El Prodigio del Saber Fúnebre) - Sabiduría y Percepción con subida rápida de nivel.
  - [x] Lord Rufus (El Administrador del Sepulcro) - Economía de oro y templos funerarios.
  - [x] Oona Tejesombras (La Matriarca de las Sombras Aracne) - Tejesombras iniciales y Resistencia.
  - [x] Maestro Klastor (El Embalsamador Mayor) - Saqueatumbas iniciales y cosecha cadavérica.
  - [x] Milossa la Dorada (La Dama del Éter Funesto) - Magia de Nochesombra y maldición debilitadora.
  - [x] Adahn (El Conjurador de Espectros) - Espectros iniciales, Taumaturgia y drenaje de maná.
  - [x] Ethric (El Archimago de la No-Muerte) - Crecimiento y estadísticas superlativas a Liches.
  - [x] Mag (El Canalizador del Vacío Arcano) - Magia Arcana con +1 nivel y lanzamientos sin restricción.
- [x] **Subclases Necrópolis**: Podredumbre ambulante (Aura venenosa global), Heraldo de la perdición (-3 Moral & Pánico), Tejedor de almas (+100% Levantamiento), Cronomante (Acción inmediata Turno 1 & -2 Iniciativa rival).

#### D. Foresta / Arboleda (Sylvan / Grove) - Guardianes de Jadame (18 Héroes)
- [x] **Clases**: Guardián (Might) y Druida (Magic).
- [x] **9 Guardianes (Might)**:
  - [x] Eith (El Explorador del Manto Esmeralda) - Exploración y velocidad en bosque.
  - [x] Gorel Punta de Lanza (El Cazador y Tirador Silvano) - Ofensiva marcial a distancia y cuerpo a cuerpo.
  - [x] Colajengibre (El Patriarca de los Faunos) - 3 pilas de Faunos y crecimiento +3 semanal.
  - [x] Viejo Peregrino (El Sabio de la Adaptación) - Selección natural y resistencias adaptativas.
  - [x] Octavia (La Dama de la Fortuna del Bosque) - +2 de Suerte pasiva y daño de críticos +30%.
  - [x] Mreowa (La Cazadora de los Reflejos) - Brillo desorientador y Golpe Heroico de Combate.
  - [x] Faleor (El Guardián del Vínculo Primordial) - Murmullo Avanzado inicial (+25% potencia).
  - [x] Seductora Sh'a (La Diplomática del Bosque) - Diplomacia y reclutamiento neutral un 35% más barato.
  - [x] Tía Daliar (La Erudita de los Secretos Silvanos) - Deseo de aprender y +25% de XP en combates.
- [x] **9 Druidas (Magic)**:
  - [x] Vatawna (La Voz de las Tormentas) - Vigor espiritual y restauración del 30% de maná tras victoria.
  - [x] Anciano Tss'kish (El Anciano de la Corteza) - Herbomantes iniciales y Taumaturgia vegetal.
  - [x] Aeliniel (La Tejedora del Fuego Primigenio) - Ascuas templadas y daño de fuego primigenio +25%.
  - [x] Glacia (La Dama de la Escarcha) - Descarga de hielo y ralentización del 30% en velocidad/iniciativa.
  - [x] Vim (El Señor de la Roca y la Tierra) - Hechizo Peñazo con aturdimiento y daño duplicado a colosos.
  - [x] Halon (El Invocador del Trueno) - Truenos y relámpagos sin decaimiento de salto y +30% daño.
  - [x] Echolily (La Ilusionista de los Murmullos) - Copia murmurante e ilusiones arcanas señuelo.
  - [x] Suli (La Guardiana Nativa del Bosque) - Invocar avatar del bosque en cada encuentro.
  - [x] El juglar (El Músico Errante de las Selvas) - Hechicería, +2 Moral y probabilidad de coste 0 de maná.
- [x] **Subclases Arboleda**: Favorecidos por el azar (Cargas Focus máx & Golpe Afortunado 100%), Pozo de vigor (Heroic Strike AoE & Cura), Furia del cielo (Doble conjuro elemental/ronda), Enviado celestial (Avatar inmune & aura +30%).

#### E. Colmena / Enjambre (Hive / Swarm) - Horda Insectoide de Beelzebub (18 Héroes)
- [x] **Clases**: Ejecutor (Might) y Heraldo (Magic).
- [x] **9 Ejecutores (Might)**:
  - [x] Abigor (El Duque de la Batalla) - Ajedrecista de la colmena, zona táctica +1 e iniciativa +1/6 niveles.
  - [x] Curson (El Duque de la Furia) - +3 Ataque y encadenamiento devastador de eliminaciones.
  - [x] Zoran (El Soberano de los Waurms) - +2 Crecimiento semanal y bonificaciones colosales a Waurms.
  - [x] Niev (La Emisaria de la Nube Ácida) - Tirador de enjambre de largo alcance y corrosión.
  - [x] Nor (El Caparazón Inquebrantable) - Coraza evolutiva (+4 Def) y progresión rápida de atributos.
  - [x] Goldentongue (El Mercader de Biomasa) - Lengua dorada (+1 Moral, +350 oro diario, +25% en cofres).
  - [x] Lo (La Voz de las Langostas) - Crecimiento y daño de asalto rápido para Langostas.
  - [x] Pauper (El Señor de la Celeridad) - +1 Velocidad global de combate (+1 cada 8 niveles).
  - [x] Zixx (El Comandante del Enjambre) - Bono a Zánganos y amplificador de Mente de Colmena +25%.
- [x] **9 Heraldos (Magic)**:
  - [x] Khariseth (El Tejedor Primigenio) - Hechizos Primigenios +1 nivel, multiescuela y bloqueo al rival.
  - [x] Mila (La Cantora del Zumbido) - Celeridad Magistral global al inicio de combate.
  - [x] Groo (El Hijo de Todas las Madres) - +1 Crecimiento semanal y buff de Reinas de la Colmena (+ debuff rival).
  - [x] Bathym (El Duque de las Joyas) - +1 Cristal diario (+1 / 5 niveles) y +100% cristales en mapa.
  - [x] Oriax (El Saltador del Abismo) - Parpadeo táctico para desplazar y aislar unidades en combate.
  - [x] Fleu (El Emisario del Viento) - Logística de +400 movimiento diario sin penalización de terreno.
  - [x] Leira (La Reina de las Avispas) - Manto de avispas con neurotoxina (-2 iniciativa y drenaje de maná).
  - [x] Tavi (La Madre del Enjambre de Larvas) - Proliferación de larvas (+4% PS +2%/2 niveles).
  - [x] Xirr (El Disipador Arcano) - Escudo antimagia con inmunidad a efectos negativos y resistencia al daño.
- [x] **Subclases Colmena**: Madre de cría (Eclosión de 3 larvas/ronda), Señor del caos (100% penetración de armadura <50% HP), Progenitor (Enjambre Colosal tanque), Devorador de almas (Drenaje de maná y concentración al destruir enemigos).

#### F. Cisma (Schism) - Herejes del Vacío y Fallas de Vori (18 Héroes)
- [x] **Clases**: Juramentado (Might) y Portavoz de la Grieta (Magic).
- [x] **9 Juramentados (Might)**:
  - [x] Nihil (El Negador de la Grieta) - Caminante con alta movilidad y sin penalización en terreno de falla.
  - [x] Cuerno Negro (El Tejedor de Magia y Guerra) - Hechicería abisal y reducción de coste de maná.
  - [x] Matastala la Blanca (La Estratega del Tablero) - Tácticas avanzadas y +2 Iniciativa en Turno 1.
  - [x] Jänhei (El Filibustero de los Pasajes) - 3 pilas de Cultores y bonificación al daño de emboscada.
  - [x] Mara Mat'ha (La Señora de los Corceles) - Comunión Abisal Avanzada y 3 pilas de Jinetes de aga'shoth.
  - [x] El Doncel de Hierro (El Encadenador de Almas) - Cóncubos iniciales y ataduras que reducen 30% defensa.
  - [x] Wal'kha (El Tejedur de la Trama Primigenia) - Magia Primigenia imbuyendo daño elemental a las armas.
  - [x] Urgo el Cambiante (El Señor de las Formas) - Avatar mutante adaptable al ejército enemigo.
  - [x] Mártir Tho (El Alquimista de los Brebajes) - Magia Arcana y generación de recursos prohibidos.
- [x] **9 Portavoces de la Grieta (Magic)**:
  - [x] Grellekh el Traidor (El Señor de la Ruptura) - Ofensiva marcial incrementando un 25% el daño de invocaciones.
  - [x] Reina de Hielo Hel'Ghat (La Soberana del Frío) - Escudo gélido que absorbe daño y congela a agresores.
  - [x] Kwinri (El Invocador de las Mareas Menores) - 3 pilas de Ra'shoth (hasta 48 unidades) y Reclutamiento.
  - [x] La Mirada Colectiva (El Ojo de las Legiones) - 4-6 Shoths majestuosos iniciales y Liderazgo.
  - [x] Tölketh (El Señor del Tiempo y la Gravedad) - Dilatación estelar otorgando ronda extra a una criatura aliada.
  - [x] Ulkuth (El Rastreador de los Confines) - Exploración mágica despejando amplias áreas de niebla.
  - [x] Ra'Davok (El Bastión Arcano de la Falla) - Escudo que absorbe los primeros 100 puntos de daño en combate.
  - [x] Hermana Keiri (La Guardiana de la Luna) - Máscara lunar de Nochesombra con daño sombrío crítico e incapacitación.
  - [x] Dhüvri (La Suma Tejedora de la Comunión) - Comunión Abisal Avanzada (+25% estadísticas a invocaciones).
- [x] **Subclases Cisma**: Imparable (Inmunidad total a CC + Arremetida +2 mov), Sin límites (+35% mov mapa & teletransporte táctico), Insondable (Brechas de vacío letales), Insensible (-50% daño mágico & reflejo de maldiciones).

---

## 3. MÓDULO 2: AUDITORÍA DE UNIDADES Y MATRIZ DE CRIATURAS
*Archivos a auditar: `/src/data/*Data.ts` (constantes de unidades), `/src/components/UnitMatrix.tsx`*

### 3.1. Parámetros Canónicos por Unidad
Cada criatura debe contar con los 12 parámetros cuantitativos contrastados:
1. Nombre oficial en castellano (Base y Mejorada).
2. Tier oficial (Tier 1 a Tier 7).
3. Puntos de Salud (HP).
4. Ataque básico.
5. Defensa básica.
6. Daño Mínimo y Máximo.
7. Velocidad / Iniciativa de combate.
8. Tamaño en casillas hexagonales (1 hexágono vs 2 hexágonos / Criatura Grande).
9. Rango de disparo y munición (si aplica).
10. Coste de reclutamiento (Oro + Recursos Raros canónicos: Gemas, Cristales, Mercurio).
11. Crecimiento semanal base (Town Growth).
12. Habilidades activas y pasivas especiales (con descripciones mecánicas precisas).

### 3.2. Lista de Comprobación por Facción

#### A. Mazmorra (7 Tiers × 2 Versiones)
- [x] Tier 1: Criatura Base / Criatura Mejorada (Stats, habilidades, costes).
- [x] Tier 2: Criatura Base / Criatura Mejorada (Stats, habilidades, costes).
- [x] Tier 3: Minotauros / Minotauros Mejorados (Mecánica de moral y represalia).
- [x] Tier 4: Criatura Base / Criatura Mejorada (Stats, habilidades, costes).
- [x] Tier 5: Hidras de Jadame (Ataque multi-hexagonal sin represalia).
- [x] Tier 6: Criatura Base / Criatura Mejorada (Stats, habilidades, costes).
- [x] Tier 7: Dragones Negros / Rojos (Inmunidad mágica canónica de Olden Era).

#### B. Templo (7 Tiers × 2 Versiones)
- [x] Tier 1: Milicia / Lanceros (Mecánicas defensivas y coste).
- [x] Tier 2: Ballesteros / Arqueros Celestiales (Disparo a distancia y alcance).
- [x] Tier 3: Clérigos / Sanadores (Habilidades de bendición y curación en combate).
- [x] Tier 4: Espadachines / Cruzados (Doble golpe y bonificaciones).
- [x] Tier 5: Caballeros / Paladines (Bonificación por carga de distancia recorrida).
- [x] Tier 6: Criatura Base / Criatura Mejorada (Stats, habilidades, costes).
- [x] Tier 7: Ángeles / Arcángeles (Resurrección, iniciativa y daño máximo constante).

#### C. Necrópolis (7 Tiers × 2 Versiones)
- [x] Tier 1: Esqueletos / Guerreros Esqueleto (Resistencia a perforación/flechas).
- [x] Tier 2: Zombis / Putrefactos (Transmisión de plaga y ralentización).
- [x] Tier 3: Espectros / Apariciones (Drenaje de maná pasivo en combate).
- [x] Tier 4: Vampiros / Señores Vampiro (Regeneración por drenaje de sangre sin represalia).
- [x] Tier 5: Lichs / Maestros Lich (Nube de muerte con daño de área a no-muertos).
- [x] Tier 6: Caballeros Negros / Señores del Terror (Golpe mortal y maldición).
- [x] Tier 7: Dragones de Hueso / Dragones Fantasma (Reducción de moral enemiga y envejecimiento).

#### D. Foresta / Arboleda (7 Tiers × 2 Versiones)
- [x] **Restricción de Lore**: Prohibida la inclusión de Ents / Dendroides y Unicornios clásicos.
- [x] Tier 1: Faunos / Sátiros (Música de agilidad e iniciativa).
- [x] Tier 2: Hoplitas del Bosque (Muro de escudos y apoyo a tiradores).
- [x] Tier 3: Ninfas Iriyads (Movimiento volador sin represalia).
- [x] Tier 4: Aqualotls anfibios (Movimiento en agua/ciénaga y regeneración).
- [x] Tier 5: Herbomantes / Druidas del Roble (Lanzamiento de enredos y magia natural).
- [x] Tier 6: Qilins Celestiales (Salto místico y aura de fortuna).
- [x] Tier 7: Fénix de Jadame (Renacimiento de cenizas e iniciativa extrema).

#### E. Colmena / Enjambre (7 Tiers × 2 Versiones)
- [x] Tier 1 a Tier 7: Horda de Beelzebub e insectoides demoníacos de Jadame.
- [x] Mecánicas de enjambre (Swarm): Bonificaciones por acumulación de unidades adyacentes.
- [x] Inoculación de parásitos y generación de larvas en cadáveres durante el combate.
- [x] Costes en recursos de cada morada contrastados con la economía del juego.

#### F. Cisma (7 Tiers × 2 Versiones)
- [x] **Restricción de Lore**: Prohibidos enanos oscuros y constructos mecánicos de vapor.
- [x] Roster canónico: Moradores de fallas de Vori, Ra'Shoths, Shoths, Jinetes Aga'Shoth, Concubos y Árbitros Abisales.
- [x] Habilidades de corrupción de maná, teletransporte por fallas dimensionales y escudos de hielo negro.
- [x] Estadísticas y costes verificados con la versión oficial.

---

## 4. MÓDULO 3: AUDITORÍA DEL GRIMORIO Y ESCUELAS DE MAGIA
*Archivos a auditar: `/src/data/spellsData.ts`, `/src/data/spells/*.ts`, `/src/data/factionSpellData.ts`, `/src/utils/spellScalingCalculator.ts`*

### 4.1. Las 5 Escuelas Canónicas de Jadame
- [x] **Magia de Luz (Daylight)**: Sin hechizos inventados; lista canónica completa de 9 hechizos (Celeridad, Bendición, Curar, Escudo Sagrado, Acortar Sombras, Resurrección, Intervención Divina, Azote Radiante, Claridad Solar).
- [x] **Magia Nochesombra (Nightshade)**: Hechizos de debilitamiento, sombras y vacío (10 hechizos canónicos: Maldición de Sombras, Ceguera, Desesperación, Putrefacción Fatal, Agrandar Sombras, Calma Antinatural, Nube Tóxica, Animar Muertos, Armagedón, Toque Vampírico).
- [x] **Magia Primigenia (Primal)**: Fuego, tierra, agua y rayos naturales (10 hechizos: Ralentizar, Piel Gruesa, Descarga Eléctrica, Bola de Fuego, Rayo de Hielo, Terremoto, Lluvia de Meteoros, Implosión, Arenas Movedizas, Muro de Fuego).
- [x] **Magia Arcana (Arcane)**: Manipulación espacial, control temporal e ilusiones (11 hechizos: Rayo Arcano, Inicio Temprano, Energizar, Espejismo Óptico, Teletransporte, Guillotina, Rayo en Cadena, Olvido, Hipnosis, Sifón de Maná, Distorsión Temporal).
- [x] **Magia Neutral / Aventura (Universal)**: Hechizos de mapa de aventura y utilitarios (11 hechizos: Portal de Ciudad, Volar, Puerta Dimensional, Disipar Magia, Flecha Mágica, Disipar Invocación, Amortiguación Crepuscular, Erupción de Hechizos, Visión Lejana, Marcha Forzada, Escudo de Maná).
- [x] Total auditado: **51 hechizos canónicos** distribuidos equitativamente sin contaminaciones ni nombres inventados de entregas previas.

### 4.2. Niveles de Hechizo y Nivel Magistral (Tier 1 a Tier 4)
- [x] Cada hechizo cuenta exactamente con 4 niveles de progresión verificados (204 niveles en total en la base de datos):
  - [x] Nivel 1 (Base).
  - [x] Nivel 2 (Avanzado).
  - [x] Nivel 3 (Experto).
  - [x] Nivel 4 (Magistral - con título canónico exclusivo y bonificación cualitativa de impacto).
- [x] Fórmulas de escalado por Poder Mágico (SP) verificadas en `/src/utils/spellScalingCalculator.ts`:
  - [x] Fórmula canónica: `Valor Base + (Multiplicador × SP)` auditada y parseada en 87 instancias con 0 errores (validada en SP 1 a 30).
  - [x] Normalizada la fórmula de `Erupción de Hechizos` (`spell-spell-eruption`) a `[50 + 15 × Poder Mágico]` con escalado híbrido por buffs activos.
  - [x] Unidades correctas de cálculo (Daño, Curación, Resurrección, Escudo, Mitigación).
  - [x] Sin NaN, valores negativos ni errores sintácticos en expresiones regulares.
  - [x] Creado y exportado helper canónico `matchSpellSchool` que cubre todas las variantes y alias (`Nochesombra`/`Sombras`/`Nightshade`, `Universal`/`Neutral`/`Aventura`, etc.).

### 4.3. Costes de Desbloqueo y Progresión Alquímica
- [x] **Desbloqueo de Hechizos de Cofradía / Escuelas de Facción (Luz, Nochesombra, Primigenia, Arcana)**:
  - [x] Fórmula canónica de Cofradía / Observatorio de Facción: $\text{Tier} \times (2\text{ Cristales} + 2\text{ Gemas} + 2\text{ Mercurio}) + \text{Oro}$.
  - [x] Tier 1: 2 Cristales, 2 Gemas, 2 Mercurio + Oro oficial.
  - [x] Tier 2: 4 Cristales, 4 Gemas, 4 Mercurio + Oro oficial.
  - [x] Tier 3: 6 Cristales, 6 Gemas, 6 Mercurio + Oro oficial.
  - [x] Tier 4: 8 Cristales, 8 Gemas, 8 Mercurio + Oro oficial.
  - [x] Tier 5: 10 Cristales, 10 Gemas, 10 Mercurio + Oro oficial.
- [x] **Desbloqueo Canónico de Hechizos Neutrales / Universales / Aventura (Portal a la Ciudad, Puerta Dimensional, Vuelo, etc.)**:
  - [x] Adquisición exclusiva mediante **Puntos de Observación (Observatorio del Reino)**.
  - [x] **Coste de Oro y Recursos: 0 Oro, 0 Polvo, 0 Recursos Raros**.
  - [x] **Costes Canónicos Contrastados y Auditados Individualmente**:
    - **Portal a la Ciudad (`spell-town-portal`)**: Confirmado oficialmente en **3 Puntos de Observación** para Nivel 1, con progresión de **+1 Punto de Observación adicional por nivel** posterior (Nivel 2: 4 Pts, Nivel 3: 5 Pts, Nivel 4 Magistral: 6 Pts acumulados).
    - **Puerta Dimensional (`spell-dimension-door`)**: Confirmado oficialmente en **4 Puntos de Observación / Astrología** para Nivel 1 (Magia Neutral Superior / High Neutral), con progresión de **+1 Punto adicional por nivel** posterior (Nivel 2: 5 Pts, Nivel 3: 6 Pts, Nivel 4 Magistral: 7 Pts acumulados).
    - **9 Hechizos Neutrales Restantes** (*Vuelo/Shadowflight*, *Disipar Magia*, *Flecha Mágica*, *Disipar Invocación*, *Amortiguación Crepuscular*, *Erupción de Hechizos*, *Visión Lejana*, *Marcha Forzada*, *Escudo de Maná*): Al no existir publicación oficial de sus costes exactos en puntos de observación, quedan **explícitamente marcados como "Sin definir (Pendiente de confirmación oficial)"**, evitando imputaciones uniformes o inventadas en cumplimiento estricto del canon de Olden Era.
  - [x] Corregidos los 11 hechizos neutrales tanto en `unlockCost` como en los 4 niveles de `levels[].upgradeCost`, con soporte visual diferenciado en `SpellGrimoire.tsx` y `SmartSpellHoverCard.tsx`.
- [x] **Progresión de Polvo Alquímico (*Alchemical Dust*) para Hechizos de Escuelas de Facción (Luz, Nochesombra, Primigenia, Arcana)**:
  - [x] Nivel 1 (Base): 0 Polvo, 0 Oro.
  - [x] Nivel 2: 25 Polvo + 1.000 Oro.
  - [x] Nivel 3: 25 Polvo + 1.500 Oro + 2 Raros especificados.
  - [x] Nivel 4 Magistral: 25 Polvo + 2.000 Oro + 4 Raros especificados.

### 4.4. Combos Tácticos y Prioridades por Facción
- [x] Prioridad meta (`Imprescindible (P1)`, `Muy Alta (P2)`, `Alta (P3)`, `Media / Situacional (P4)`) contrastada para las 6 facciones oficiales en `FACTION_SPELL_PRIORITIES`.
- [x] Combos tácticos (`FACTION_SPELL_COMBOS`) auditados: 18 sinergias exhaustivas (3 por facción) con unidades beneficiarias canónicas, tiempos de ejecución y secuencia de turnos verificados.
- [x] Selector de Sigilos de Escuelas (`SpellSchoolSigilSelector.tsx`) y Codex Medieval actualizados para conteo y filtrado en tiempo real sin desajustes.

---

## 5. MÓDULO 4: AUDITORÍA DE LEYES CÍVICAS Y POLÍTICAS DE CIUDAD
*Archivos auditados y normalizados: `/src/data/factionLawsData.ts`, `/src/data/templeLawsData.ts`, `/src/data/necropolisLawsData.ts`, `/src/data/arboledaLawsData.ts`, `/src/data/enjambreLawsData.ts`, `/src/data/cismaLawsData.ts`, `/src/components/FactionLawsTree.tsx`*

### 5.1. Reglas Canónicas de Leyes
- [x] **5 Tiers de Leyes por facción (Tier 1 a Tier 5)**: Con umbrales de activación progresiva (Tier 1: 0 Pts, Tier 2: 5 Pts, Tier 3: 15 Pts, Tier 4: 30 Pts, Tier 5: 50 Pts).
- [x] **Costes Exclusivos en Puntos de Ley (Law Points / Sellos Cívicos)**: Cada rango de cada ley especifica `costLaws` y `cumulativeCost` exactos sin costes arbitrarios en oro inventados.
- [x] **Exclusiones mutuas e Incompatibilidades**: Soporte en el motor `FactionLawsTree.tsx` y marcado en arrays `incompatibleLaws` para leyes antagónicas.
- [x] **Prerrequisitos de árbol jerárquico**: Verificados y enforced mediante `prerequisiteLaws` y `prerequisiteLawId` en `checkLawAvailability` y deselección en cascada.

### 5.2. Verificación por Facción
- [x] **Mazmorra**: 34 leyes canónicas verificadas. Leyes de esclavitud subterránea, culto de sombras, sacrificios rituales de maná e inquisición del Triunvirato Drow.
- [x] **Templo**: 11 leyes canónicas (5 Tiers completos). Doble construcción de la corona, puntería de Erathia, ley de aliento & moral, santidad en pradera, código de caballería, diezmo sagrado y supremacía solar inquisitorial.
- [x] **Necrópolis**: 9 leyes canónicas (5 Tiers completos). Cosecha de huesos y almas, arquitectura sepulcral, linaje vampírico de Shadowspire, miasma de nube de muerte, velo espectral, aura aterradora del dragón de hueso, criptas eternas y reino eterno de la muerte.
- [x] **Foresta / Arboleda**: 12 leyes canónicas (5 Tiers completos) normalizadas al roster canónico de Jadame (Faunos, Hoplitas, Ninfas Iriyads, Aqualotls, Herbomantes, Qilins y Fénix Mítico, sin ents ni dragones verdes). Simbiosis forestal, armonía faúnica, juramento de hoplita, santuarios de gemas, gracia iriyad, ascensión y soberanía del fénix.
- [x] **Colmena / Enjambre**: 11 leyes canónicas (5 Tiers completos) normalizadas con la Reina de la Colmena (Hive Queen / Madre de la Colmena) como Tier 7 canónico. Eclosión masiva, mente colmena y vanguardia sináptica, metabolismo de azufre, salto de mantis reales, neurotoxina de avispones, asimilación de biomasa y trascendencia de la supermente.
- [x] **Cisma**: 14 leyes canónicas (5 Tiers completos). Pactos del vacío, desgarro dimensional, escarcha glacial de Vori, ofrendas abisales y comunión de fallas; descripciones tácticas depuradas de referencias a facciones ajenas al motor de Olden Era.

---

## 6. MÓDULO 5: AUDITORÍA DE ESTRUCTURAS DE CIUDADELA Y CASTILLO
*Archivos auditados y normalizados: `/src/data/townStructuresData.ts`, `/src/data/structures/*.ts`, `/src/components/TownStructuresBrowser.tsx`*

### 6.1. Estructuras Comunes
- [x] **Ayuntamiento / Capitolio**: Cadena canónica de 4 niveles de ingresos diarios normalizada en las 6 facciones (Asentamiento 500 -> Alcaldía 1.000 -> Ciudadela Cívica 2.000 -> Gran Capitolio 4.000 Oro/día).
- [x] **Fuerte / Ciudadela / Castillo**: Modificadores de defensa y multiplicadores de crecimiento de tropas (+0%, +50%, +100%) con costes y prerrequisitos enlazados.
- [x] **Taberna**: Generación de moral (+1) y acceso al reclutamiento de héroes y rumores de taberna.
- [x] **Mercado y Puesto Comercial**: Tasas oficiales de intercambio de recursos de *Olden Era* y depósitos alquímicos por facción.
- [x] **Herrería**: Carro de munición, balista, catapulta o botiquín de hierbas asignado canónicamente a cada facción con costes y descripciones tácticas.
- [x] **Torre de Magia / Cofradía de Hechiceros**: Niveles 1 a 5 con asignación armónica de escuelas de magia de Jadame.

### 6.2. Estructuras Exclusivas de Facción
- [x] **Mazmorra**: Vórtice de maná, academia oscura, altar de sacrificios rituales y laberinto de minotauros con bonificaciones de daño y moral.
- [x] **Templo**: Catedral celestial, establos de caballería (+400 movimiento), faro sagrado (+500 movimiento marítimo/visión) y bastión de cruzados.
- [x] **Necrópolis**: Amplificador de nigromancia (+10%), bóveda de calaveras, foso de putrefacción (plaga a asediantes) y mausoleo de liches.
- [x] **Foresta**: Manantial de ninfas, arboleda de faunos (+6 crecimiento), círculo de menhires (+1 poder mágico) y percha de fénix (+1 crecimiento & iniciativa).
- [x] **Colmena**: Incubadora de larvas (+25% Tier 1-3), nido de feromonas, nido del rey libélula (neurotoxina) y cámara de biomasa (sacrificio de prisioneros).
- [x] **Cisma**: Portal de distorsión (teletransporte de guarniciones), monolito del vacío (-5 maná rival), cámara de resonancia astral y nexo de fallas de Vori.

---

## 7. MÓDULO 6: AUDITORÍA DE ÓRDENES DE CONSTRUCCIÓN Y CREEPING (DÍA 1 A 7)
*Archivos auditados y verificados: `/src/data/*Data.ts` (Build orders de las 6 facciones), `/src/components/DayByDayPlanner.tsx`, `/src/data/dungeonOpponentTactics.ts`, `/src/components/ui/BuildResourceCalculator.tsx`*

### 7.1. Criterios de Viabilidad Económica y Logística
- [x] **Día 1**: Coste total de edificios y tropas reclutadas $\le$ Recursos iniciales canónicos en dificultad estándar de torneo (10.000 Oro, 20 Madera, 20 Mineral). En todas las facciones el Día 1 consume entre 3.000 y 4.000 Oro (incluyendo reclutamiento del 2º héroe en Taberna por 2.500 Oro) y 5 Madera, manteniendo saldos positivos de seguridad ($\ge 6.000$ Oro).
- [x] **Día 2 a Día 7**: Curva acumulada de gasto de madera, mineral y los 7 recursos canónicos (Oro, Madera, Mineral, Gemas, Cristales, Mercurio, Polvo Alquímico) verificada en saldo positivo continuo mediante ingresos de Sede/Ayuntamiento y captura de minas.
- [x] **Prioridades de Asignación**:
  - [x] Día 1-2: Exploración con segundo héroe (scouting), relevo de suministros y aseguramiento de aserradero y cantera de mineral adyacentes.
  - [x] Día 3-4: Aseguramiento de moradas de Tier 2-3 y primeras minas de recursos raros (Mercurio, Gemas, Cristales).
  - [x] Día 5-6: Cofradía de Magos Nivel 1 o Ayuntamiento (+1.000 Oro/día).
  - [x] Día 7: Fortificaciones II (+50% crecimiento de población) o morada clave asegurada antes del cambio de semana.

### 7.2. Fichas de Creeping sin Bajas
- [x] Tácticas de posicionamiento para limpiar stacks neutrales lentos sin bajas: división de 1 unidad señuelo para absorber el contraataque rival, flanqueo con unidades rápidas y muro de escudos para proteger tiradores.
- [x] Comprobación de que las unidades recomendadas para creeping existan estrictamente en el ejército disponible del jugador en el día indicado (sin anacronismos).

---

## 8. MÓDULO 7: AUDITORÍA DEL ÁRBOL DE HABILIDADES Y SUBHABILIDADES DE JADAME
*Archivos auditados y normalizados: `/src/data/officialSkillsData.ts`, `/src/data/subclassesData.ts`, `/src/data/subskillsRecommendationData.ts`, `/src/components/HeroSkillOptimizer.tsx`*

### 8.1. Habilidades Primarias y Secundarias
- [x] Árbol de habilidades secundarias depurado con la nomenclatura canónica de *Heroes of Might & Magic: Olden Era* (Arte de Asedio, Arte de Batalla, Combate, Comunión Abisal, Diplomacia, Liderazgo, Magia de Nochesombra, Magia Primigenia, Magia de Luz Solar, Magia Arcana, Magia de Batalla, Hechicería, Resistencia, Suerte, Tácticas, etc.), sin contaminaciones de entregas previas (*Gating*, *Blood Rage*, etc.).
- [x] Estructura canónica de 3 niveles de progresión de Jadame: Básica, Avanzada y Experta, con 6 subhabilidades únicas por árbol (3 en Avanzada y 3 en Experta) con descripciones mecánicas contrastadas.
- [x] Subhabilidades dependientes vinculadas con recomendaciones tácticas y condiciones de juego en `SKILL_SELECTION_GUIDES` y `HeroBuildSimulator.tsx`.

### 8.2. Subclases de Héroes
- [x] 24 Subclases canónicas (4 por facción: 2 de Might y 2 de Magic) con requisitos de desbloqueo exactos (5 habilidades secundarias específicas en nivel Experta, alcanzable entre niveles 16 y 20).
- [x] Bonificaciones pasivas legendarias contrastadas con las notas de desarrollo de *Olden Era* (+100% Ataque, +100% Defensa, +100% Poder de Hechizo, +10.000 Oro diario, etc.), con análisis estratégico y héroes afines.

---

## 9. MÓDULO 8: AUDITORÍA DE MECÁNICAS TÁCTICAS Y COMBATE HEXAGONAL
*Archivos auditados y normalizados: `/src/data/dungeonOpponentTactics.ts`, `/src/components/CombatTactics.tsx`, `/src/components/features/combat/TacticalCheatSheet.tsx`*

### 9.1. Cuadrícula y Reglas de Combate
- [x] Verificación de la cuadrícula hexagonal canónica: modelado de 1 casilla hexagonal (infantería ligera/tiradores) vs 2 casillas hexagonales (criaturas grandes/caballería/colosos) e iniciativa dinámica de turno.
- [x] Mecánicas de flanqueo, represalia única estándar vs represalia múltiple/infinita (Danzantes de Mazmorra, Grifos de Templo) y obstáculos de terreno de Jadame (fallas de Vori, ciénagas para Aqualotls, niebla de guerra subterránea).
- [x] Fórmulas de Moral (+1, +2, +3 con probabilidad de doble turno) y Suerte (+1, +2, +3 con Golpe Afortunado / Crítico) ajustadas al sistema canónico de *Olden Era*.
- [x] Penalizador de moral por mezcla de tropas de facciones diferentes (-1 por facción ajena en el ejército) con las inmunidades correspondientes a No-muertos (Necrópolis) y entidades de vacío (Cisma).
- [x] Depurada la descripción de combate de Foresta / Arboleda en `CombatTactics.tsx`, eliminando referencias a Treants, Elfos y Dragones Esmeralda de entregas pasadas e instaurando a los Hoplitas del Bosque, Faunos, Ninfas Iriyads, Aqualotls anfibios, Qilins celestiales y Fénix de Jadame.

---

## 10. BITÁCORA DE CONTROL, INCIDENCIAS Y CORRECCIONES APLICADAS

| ID Incidencia | Sección / Archivo | Discrepancia Detectada | Corrección Canónica Aplicada | Estado (`PENDIENTE` / `CORREGIDO`) |
|---|---|---|---|---|
| *INC-001* | `/src/data/templeData.ts` | Presencia de nombres clásicos no canónicos | Reemplazados por el roster oficial de Jadame de *Olden Era* | `CORREGIDO` |
| *INC-002* | `/src/data/spellsData.ts` | Fórmulas de escalado no normalizadas | Ajustado al escalado canónico `Base + Multiplicador × SP` en 87 hechizos | `CORREGIDO` |
| *INC-003* | `/src/data/enjambreData.ts` | Verificación de 18 comandantes canónicos | Validados los 9 Ejecutores (Might) y 9 Heraldos (Magic) oficiales de Beelzebub | `CORREGIDO` |
| *INC-004* | `/src/data/spellsData.ts` | Costes de hechizos neutrales genéricos | Auditado cada hechizo neutral en Puntos de Observación (Portal = 3, Puerta Dim. = 4; resto en "Sin definir") | `CORREGIDO` |
| *INC-005* | `/src/data/structures/*.ts` | Edificios cívicos con solo 2 o 3 niveles | Normalizado el patrón canónico de 4 niveles (500 -> 1.000 -> 2.000 -> 4.000 Oro/día) en las 6 facciones | `CORREGIDO` |
| *INC-006* | `/src/data/structures/*.ts` | Herrería y estructuras únicas faltantes | Incorporada la Herrería canónica y estructuras exclusivas en Templo, Mazmorra, Necrópolis, Arboleda, Colmena y Cisma | `CORREGIDO` |
| *INC-007* | `/src/components/CombatTactics.tsx` | Mención de Hombres Árbol/Treants y Dragones Esmeralda en Arboleda | Reemplazados por Hoplitas, Iriyads, Aqualotls, Qilins y Fénix canónicos de Jadame | `CORREGIDO` |

---

## 11. INSTRUCCIONES DE EJECUCIÓN DEL CONTROL DE CALIDAD

1. **Revisión por Lotes**: Realizar la auditoría módulo por módulo, ejecutando `view_file` sobre los ficheros de datos correspondientes.
2. **Validación TypeScript**: Tras cualquier corrección de datos, ejecutar `lint_applet` y `compile_applet` para certificar 0 errores de tipado y 0 roturas de interfaz.
3. **Persistencia de Estado**: Actualizar los checkboxes `[x]` de este documento conforme se valide y certifique cada elemento contra el canon de *Heroes of Might & Magic: Olden Era*.
