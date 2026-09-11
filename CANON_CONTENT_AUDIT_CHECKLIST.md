# PROTOCOLO DE AUDITORÍA Y CONTROL CANÓNICO DE CONTENIDO
## HEROES OF MIGHT & MAGIC: OLDEN ERA (JADAME)

> **Configuración Determinista de Verificación**:
> - **Temperatura**: `0.0` (Cero creatividad especulativa, máxima fidelidad fáctica)
> - **Top-P**: `0.1` (Filtrado estricto al vocabulario canónico verificado)
> - **Entorno y Lore**: Continente de **Jadame** (*Heroes of Might & Magic: Olden Era*)
> - **Facciones Oficiales (6)**: Templo, Necrópolis, Mazmorra, Foresta (Arboleda), Colmena (Enjambre) y Cisma.
> - **Directiva Anti-Alucinación**: Prohibición terminante de importar personajes, héroes, hechizos o reglas no confirmadas de *Heroes III*, *IV* o *V* (ej. Sandro, Gelu, Crag Hack, Solmyr, Christian, Mephala, Isra, Deemer, Gunnar, etc.).
> - **Verificación de Datos**: Todos los datos deben ser verificados en fuentes fidedignas exclusivamente de Heroes Olden Era y usando la nomenclatura oficial de la edición en castellano.
> - **Fuentes consultables**: `https://oldenera.th.gl/es`, `https://oldeneradb.com/`, `https://heavenlyforge.gg/es`, `https://heroes-olden-era.com/es`, `https://paradrew.com/es/olden-era/`, `https://www.olden-era.com/en`.

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
  - [x] Onkos (El Director del Teatro Macabro) - Especialista en Esqueletos (crecimiento, velocidad, iniciativa y escalado por nivel).
  - [x] Tarius (El Señor del Heraldo del Destino) - Nigromancia Avanzada inicial.
  - [x] Marl (El Tejedur de la Telaraña Funesta) - Tácticas y ataduras de telaraña debilitantes.
  - [x] Laura (La Bruja de la Noche Guerrera) - Magia de batalla marcial oscura.
  - [x] Kel'Ghul (El Señor de las Criptas Profundas) - Horda de esqueletos inicial y Ofensiva.
  - [x] Natalida (La Vigía de los Mausoleos) - Muro de huesos y reducción de proyectiles recibidos.
  - [x] Zam (El Alquimista Solitario) - Mercurio diario (+1) y +25% recolección en mapa.
- [x] **9 Nigromantes (Magic)**:
  - [x] Artorius Veritas (El Cronista de la Noche Mística) - Hechicería y maná inagotable.
  - [x] Funerella (La Dama de la Reanimación Eterna) - Nigromancia Avanzada inicial y escalado de cosecha cadavérica.
  - [x] Lord Rufus (El Administrador del Sepulcro) - Economía de oro y templos funerarios.
  - [x] Oona Tejesombras (La Dama de la Nochesombra) - Maestría de Nochesombra (+1 nivel por década, doble lanzamiento y bloqueo al rival).
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

### 2.2. Directrices Canónicas de Auditoría Permanente para Héroes y Habilidades

Para preservar la pureza canónica del roster en cualquier iteración, se establecen los siguientes mandatos de auditoría continua:

1. **Paridad Canónica Estricta de 18 Comandantes por Facción**:
   - Cada una de las 6 facciones de Jadame debe contar con exactamente **18 héroes únicos** (9 de la clase de Might y 9 de la clase de Magic), totalizando 108 héroes en la base de datos global.
   - **Templo**: 9 Caballeros (Might: *Viejo Lord Mandall, Kestrel, Keandra, John Johnson, Leon Dedos Pegajosos, Ister, Aeos la Exaltada, Lord Edgar, Avis el Hereje*) y 9 Clérigos (Magic: *Julius, Zenith, Elias el Alegre, Pip, Clarissa, Anastasia la Dócil, Vesper, Lia la Desatada, Nadir*).
   - **Necrópolis**: 9 Caballeros de la Muerte (Might: *Baluarte, Rey de reyes, Onkos, Tarius, Marl, Laura, Kel'Ghul, Natalida, Zam*) y 9 Nigromantes (Magic: *Artorius Veritas, Funerella, Lord Rufus, Oona Tejesombras, Maestro Klastor, Milossa la Dorada, Adahn, Ethric, Mag*).
   - **Mazmorra**: 9 Señores Supremos (Might: *Devir hijo de Devir, Gleard el Gris, Tellaris el Traicionado, Hermana Deira, Morwenna, Vane, Kaelis, Sorsha de las Cavernas, Balthazar*) y 9 Brujos (Magic: *Zakron el Grande, Enatee, Typhona Madre de hidras, Motley el Bufón, Xyron, Malakai, Zanna la Vidente, Alyssa, Vokial el Oculto*).
   - **Foresta / Arboleda**: 9 Guardianes (Might: *Eith, Gorel Punta de Lanza, Anciano Tss'kish, Colajengibre, Caelan, Thorne, Bran, Sylva, Kael*) y 9 Druidas (Magic: *Vatawna, Glacia, Aeliniel, Moira, Faelar, Nerida, Orion, Tara, Zephyr*).
   - **Colmena / Enjambre**: 9 Ejecutores (Might: *Abigor, Curson, Zoran, Niev, Nor, Goldentongue, Lo, Pauper, Zixx*) y 9 Heraldos (Magic: *Khariseth, Mila, Groo, Bathym, Oriax, Fleu, Leira, Tavi, Xirr*).
   - **Cisma**: 9 Campeones de la Falla (Might: *Cuerno Negro, Nihil, Mara Mat'ha, Krell, Vael, Xaron, Gorg, Tharn, Mor*) y 9 Enviados del Vacío (Magic: *La Mirada Colectiva, Tölketh, Ulkuth, Ra'Davok, Hermana Keiri, Dhüvri, Elyon, Sael, Kaelen*).

2. **Prohibición Absoluta de Personajes Clásicos Ajenos (Anti-Alucinación)**:
   - Queda estrictamente vetada la importación de personajes clásicos de Erathia, Enroth o Ashan (*Sandro, Gelu, Crag Hack, Solmyr, Christian, Mephala, Isra, Deemer, Gunnar, Catherine, Roland, Sir Mullich*, etc.), salvo confirmación explícita oficial en *Olden Era*.

3. **Autenticidad de los Ejércitos Iniciales**:
   - El ejército inicial de cada héroe debe estar compuesto **exclusivamente por unidades de su facción de origen** y acordes a su especialidad.
   - Prohibido incluir unidades no pertenecientes a la facción (ej: tropas de Templo en Necrópolis) o unidades inexistentes/anacrónicas en la facción de *Olden Era* (ej: Zombis o Momias en Necrópolis; Faunos en Templo).

4. **Escalado y Modelado de Especialidades**:
   - Cada héroe debe poseer una especialidad única con descripción temática, fórmula de escalado numérico por nivel y tipificación de rol competitivo (`S+`, `S`, `A`, `B`).

5. **Estructura Tridimensional de Habilidades y 4 Subclases de Élite**:
   - Cada árbol de habilidades secundarias debe respetar los rangos canónicos: Básica, Avanzada y Experta, con 6 subhabilidades únicas (3 en Avanzada y 3 en Experta).
   - Cada facción cuenta con exactamente 4 subclases de prestigio (2 para Might y 2 para Magic) cuyo prerrequisito inmutable es alcanzar 5 habilidades secundarias en rango Experta.

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

#### A. Mazmorra (7 Tiers × Ramas Duales de Mejora)
- [x] Tier 1: Troglodita / Troglodita Infernal (Rama A) / Troglodita Tóxico (Rama B) - Cubil.
- [x] Tier 2: Infiltrador / Infiltrador Astuto (Rama A) / Infiltrador Sombrío (Rama B) - Refugio.
- [x] Tier 3: Bailarina de Ónice / Bailarina de Jaspe (Rama A) / Bailarina Áurea (Rama B) - Anfiteatro.
- [x] Tier 4: Minotauro / Señor Minotauro (Rama A) / Vanguardia Minotauro (Rama B) - Laberinto (Moral Implacable).
- [x] Tier 5: Medusa / Bruja Medusa (Rama A) / Emperatriz Medusa (Rama B) - Voces Silenciadas (Mirada Petrificante y proyectiles).
- [x] Tier 6: Hidra / Hidra Abisal (Rama A - Vampirismo) / Hidra Ctónica (Rama B - Ácido de Armadura) - Hogar Ctónico (Ataque multi-hexagonal 360º sin represalia).
- [x] Tier 7: Dragón de Cueva / Dragón Negro (Rama A - Inmunidad Mágica Canónica Nivel 1-5) / Dragón de Ceniza (Rama B - Nube Cenicienta) - Palacio de las Cavernas.

#### B. Templo (7 Tiers × Ramas Duales de Mejora)
- [x] Tier 1: Ballestero / Tirador Certero (Rama A) / Halconero (Rama B) - Campo de Tiro.
- [x] Tier 2: Espadachín / Égida del Sol (Rama A) / Capitán de la Guardia (Rama B) - Barracones (Muro de Escudos y contragolpes).
- [x] Tier 3: Grifo / Grifo Guardián (Rama A) / Grifo de Templo (Rama B) - Torre de los Grifos (Contragolpe ilimitado).
- [x] Tier 4: Tejedora de Luz / Heraldo del Sol (Rama A) / Hierofante (Rama B) - Capilla Radiante (Bendiciones y ceguera luminosa).
- [x] Tier 5: Caballería / Caballería de Lanza Solar (Rama A) / Caballería Noble (Rama B) - Cuadras (Bonificación por carga proporcional a distancia).
- [x] Tier 6: Inquisidor / Excomulgador (Rama A) / Madre Superiora (Rama B) - Tribunal Sagrado (Proyectiles sagrados y purga de magia oscura).
- [x] Tier 7: Ángel / Arcángel (Rama A - Resurrección y Daño Máximo) / Apoteosis (Rama B - Furia Celestial) - Portal Celestial.

#### C. Necrópolis (7 Tiers × Ramas Duales de Mejora)
- [x] Tier 1: Esqueleto / Guerrero Esqueleto (Rama A) / Arquero Esqueleto (Rama B) - Criptas y Tumbas (Resistencia a proyectiles y levantamiento por Nigromancia).
- [x] Tier 2: Aparición / Espectro (Rama A) / Fantasma (Rama B) - Pabellón Silencioso (Incorpóreo y drenaje pasivo de maná).
- [x] Tier 3: Sabueso No-Muerto / Bargeist (Rama A) / Sabueso Acorazado (Rama B) - Perrera de Sabuesos (Alta velocidad de flanqueo e iniciativa temprana).
- [x] Tier 4: Saqueatumbas / Mercader de la Muerte (Rama A) / Maestro de Perreras (Rama B) - Cámara de los Saqueatumbas (Recolección cadavérica y soporte de primera línea).
- [x] Tier 5: Liche / Liche Pestilente (Rama A - Nube de Muerte en área) / Liche Sanguíneo (Rama B) - Mansión Intemporal (Fuego amigo inmune sobre no-muertos).
- [x] Tier 6: Caballero del Terror / Avatar de la Guerra (Rama A - Golpe Mortal y Maldición) / Segador Hueco (Rama B) - Tumba de Guerreros.
- [x] Tier 7: Vampiro / Señor de los Vampiros (Rama A - Drenaje de Vida 100% sin represalia) / Vampiro Erudito (Rama B) - Château de los Festines (Coloso supremo de Tier 7 de Olden Era, sustituyendo los anacronismos de Dragones de Hueso y Zombis de entregas previas).

#### D. Foresta / Arboleda (7 Tiers × Ramas Duales de Mejora)
- [x] **Restricción de Lore Canónico**: Prohibida la inclusión de Ents / Dendroides y Unicornios clásicos.
- [x] Tier 1: Faunos / Sátiros (Rama A) / Arqueros Faunos (Rama B) - Cabañas de Faunos (Paso Silvano y agilidad).
- [x] Tier 2: Hoplitas del Bosque / Centuriones Silvanos (Rama A) / Falangistas (Rama B) - Pabellón de Hoplitas (Muro de lanzas protector para tiradores).
- [x] Tier 3: Ninfas Iriyads / Iriyads Celestiales (Rama A) / Náyades de Jade (Rama B) - Arboleda de Ninfas (Movimiento volador sin contragolpe).
- [x] Tier 4: Aqualotls anfibios / Aqualotls Polares (Rama A - Congelación) / Aqualotls Abisales (Rama B - Mordisco Corrosivo) - Estanque Floreciente.
- [x] Tier 5: Herbomantes / Druidas del Roble (Rama A) / Sabios del Bosque (Rama B) - Círculo de Herbomantes (Lanzamiento de raíces y magia natural).
- [x] Tier 6: Qilins Celestiales / Grandes Qilins (Rama A) / Qilins de la Suerte (Rama B) - Cúspide de Jade (Salto místico y aura de fortuna).
- [x] Tier 7: Fénix de Jadame / Fénix Radiantes (Rama A - Renacimiento de Cenizas e Iniciativa Extrema) / Aves de Fuego (Rama B) - Nido Solar.

#### E. Colmena / Enjambre (7 Tiers × Ramas Duales de Mejora)
- [x] Tier 1: Parásitos / Larvas Asesinas (Rama A) / Parásitos Inoculadores (Rama B) - Vivienda Descuidada.
- [x] Tier 2: Langostas / Langostas Voraces (Rama A) / Langostas Carroñeras (Rama B) - Guarida de Carroña.
- [x] Tier 3: Avispones / Avispones Cazadores (Rama A) / Avispones Zumbadores (Rama B) - Nido de Papel (Hostigamiento veloz).
- [x] Tier 4: Escorpiones / Escorpiones de Azufre (Rama A) / Escorpiones Quitináceos (Rama B) - Zigurat Quitináceo (Aguijonazo venenoso).
- [x] Tier 5: Saqueadores / Reavers / Desgarradores (Rama A) / Saqueadores Élite (Rama B) - Cúspide (Corte lacerante en carrera).
- [x] Tier 6: Waurms / Waurms de Magma (Rama A) / Gusanos de Ceniza (Rama B) - Madrigueras de Almas Ardientes (Túnel subterráneo y erupción ígnea).
- [x] Tier 7: Reinas de la Colmena / Beelzebub / Rey Libélula - Torre del Amor (Monarcas absolutos del enjambre con multiplicación de larvas).
- [x] Mecánicas de enjambre (Swarm): Bonificaciones por concentración y proliferación de crías.

#### F. Cisma (7 Tiers × Ramas Duales de Mejora)
- [x] **Restricción de Lore Canónico**: Prohibidos enanos oscuros, autómatas y constructos mecánicos de vapor.
- [x] Tier 1: Cultores / Siervos de la Grieta (Rama A) / Acólitos del Frío (Rama B) - Cripta de los Herejes.
- [x] Tier 2: Ra'Shoths / Ra'Shoths Glaciales (Rama A) / Ra'Shoths Profundos (Rama B) - Falla Helada (Aura de escarcha de Vori).
- [x] Tier 3: Shoths / Shoths del Vacío (Rama A) / Shoths Etéreos (Rama B) - Brecha Umbría (Distorsión de proyectiles).
- [x] Tier 4: Jinetes Aga'Shoth / Cazadores de la Fisura (Rama A) / Jinetes del Hielo Negro (Rama B) - Corceles de Falla (Carga con teletransporte de fase).
- [x] Tier 5: Concubos / Súcubos del Vacío (Rama A) / Seductores de Sombras (Rama B) - Altar de la Comunión (Seducción, drenaje vital y confusión).
- [x] Tier 6: Árbitros Abisales / Jueces de la Grieta (Rama A) / Inquisidores del Vacío (Rama B) - Cámara de los Ritos (Veredicto de anulación mágica).
- [x] Tier 7: Enviados Abisales / Colosos de Vori (Rama A - Deformación Espacial) / Titanes de la Grieta (Rama B) - Vórtice del Abismo.

### 3.3. Directrices Canónicas de Auditoría Permanente para Unidades y Criaturas

Para garantizar la integridad canónica del compendio de unidades en cualquier desarrollo futuro, se establecen los siguientes mandatos obligatorios:

1. **Estructura Piramidal Canónica de 7 Tiers con Ramas Duales**:
   - Cada facción dispone exactamente de 7 escalones (Tier 1 a Tier 7). Cada tier cuenta con una unidad Base y dos opciones de mejora alternativas (Rama A y Rama B), sumando 21 perfiles de combate por facción (126 perfiles en el universo de Jadame).
2. **Correspondencia Estricta Morada-Criatura (1:1)**:
   - La morada (`dwelling` y `dwellingName`) de cada criatura debe coincidir con precisión milimétrica con la estructura registrada en `/src/data/structures/*Structures.ts`.
3. **Erradicación Total de Anacronismos y Rosters de Terceros**:
   - Ninguna facción puede contener criaturas heredadas de entregas previas ajenas al diseño canónico de *Olden Era* (ejemplos prohibidos: Zombis o Dragones de Hueso en Necrópolis; Treants/Ents o Unicornios en Foresta; Enanos oscuros o autómatas en Cisma).
4. **Los 12 Parámetros Cuantitativos Obligatorios**:
   - Cada ficha debe poblar de manera explícita y coherente: `hp`, `attack`, `defense`, `damage` (rango mínimo-máximo), `speed`, `initiative`, `weeklyGrowth`, `cost` (oro y recursos raros: gemas, cristales, mercurio), `combatStance`, `abilities`, `strengths`, `tacticalUsage`, `idealMatchup` y `synergyLaws`.
5. **Consistencia de Sinergias y Matchups Cruzados**:
   - En las descripciones de `idealMatchup`, tácticas y combos, todas las criaturas citadas deben existir dentro del roster canónico de *Olden Era*.

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
- [x] Purgados todos los términos fantasma o desajustes de unidades en Colmena ("Mantis Voraces", "Avispas Asesinas", "Escarabajos Acorazados", "Colosos Quitinosos") y Foresta ("Murmuramantes"), sustituyéndolos por sus contrapartes oficiales de *Olden Era* (Avispones Cazadores, Langostas Carroñeras, Escorpiones de Azufre, Saqueadores Desgarradores, Waurms de Magma, Reinas de la Colmena y Herbomantes).
- [x] Selector de Sigilos de Escuelas (`SpellSchoolSigilSelector.tsx`) y Codex Medieval actualizados para conteo y filtrado en tiempo real sin desajustes.

### 4.5. Directrices Canónicas de Auditoría Permanente para Grimorio y Hechizos (Protocolo Obligatorio)
> 📜 **DIRECTRICES DE AUDITORÍA PERMANENTE - GRIMORIO & ESCUELAS DE MAGIA**:
> 1. **Pureza de Escuelas (5 Escuelas Oficiales)**: Únicamente existen 5 escuelas canónicas en Jadame: Magia de Luz (*Daylight*), Magia Nochesombra (*Nightshade*), Magia Primigenia (*Primal*), Magia Arcana (*Arcane*) y Magia Neutral / Aventura (*Universal*). Queda prohibida la reintroducción de escuelas de *Heroes III/IV/V* (Fuego/Tierra/Agua/Aire como escuelas independientes, Destrucción, Caos o Conjuración).
> 2. **Progresión Alquímica Estándar (Escuelas de Facción)**:
>    - **Nivel 1 (Base)**: 0 Polvo Alquímico (*Dust*), 0 Oro adicional.
>    - **Nivel 2 (Avanzado)**: 25 Polvo + 1.000 Oro.
>    - **Nivel 3 (Experto)**: 25 Polvo + 1.500 Oro + 2 Recursos Raros específicos.
>    - **Nivel 4 (Magistral)**: 25 Polvo + 2.000 Oro + 4 Recursos Raros específicos + Bono cualitativo de impacto táctico.
> 3. **Fórmula de Desbloqueo de Cofradía / Observatorio de Facción**:
>    - Coste: $\text{Tier} \times (2\text{ Cristales} + 2\text{ Gemas} + 2\text{ Mercurio}) + \text{Oro}$ (Tier 1 a 5).
> 4. **Hechizos Neutrales / Aventura (Observatorio del Reino)**:
>    - Coste en Oro, Polvo y Recursos: **Estrictamente 0 Oro, 0 Polvo, 0 Recursos Raros**.
>    - Desbloqueo y mejora exclusivamente mediante **Puntos de Observación**.
>    - *Portal a la Ciudad*: 3 Puntos (N1) + 1 Punto por nivel (N2: 4, N3: 5, N4: 6).
>    - *Puerta Dimensional*: 4 Puntos (N1) + 1 Punto por nivel (N2: 5, N3: 6, N4: 7).
>    - Los 9 hechizos neutrales restantes deben mantenerse marcados como *"Sin definir (Pendiente de confirmación oficial)"*, prohibiéndose costes imputados o arbitrarios.
> 5. **Normalización de Fórmulas de Escalado**:
>    - Todo efecto numérico dependiente del héroe debe declararse con la sintaxis parseable canónica: `[Valor Base + Multiplicador × Poder Mágico]`.
> 6. **Flujo de Datos y Desacoplamiento de Componentes**:
>    - Componentes de interfaz (`SpellGrimoire.tsx`, etc.) deben consumir datos mágicos exclusivamente desde la fuente canónica central (`/src/data/spellsData.ts`), quedando prohibido el acoplamiento a ficheros de facción específicos como `dungeonData.ts`.
> 7. **Sinergias y Combos de Facción**:
>    - Todo combo o prioridad en `factionSpellData.ts` debe referenciar exclusivamente los 18 héroes canónicos de la facción y su matriz de unidades oficiales verificada.

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

### 5.3. Directrices Canónicas de Auditoría Permanente para Leyes de Facción y Políticas de Ciudad
Toda auditoría o adición en el sistema de leyes cívicas debe contrastar obligatoriamente los siguientes 6 principios canónicos:
1. **Estructura Estricta de 5 Tiers**: Cada árbol de leyes se divide sin excepción en 5 Tiers con los umbrales cuantitativos universales de activación progresiva:
   - **Tier 1**: `tierMinPoints: 0` (Disponible desde el Día 1).
   - **Tier 2**: `tierMinPoints: 5` (Requiere un mínimo de 5 Sellos invertidos en el árbol).
   - **Tier 3**: `tierMinPoints: 15` (Requiere un mínimo de 15 Sellos invertidos en el árbol).
   - **Tier 4**: `tierMinPoints: 30` (Requiere un mínimo de 30 Sellos invertidos en el árbol).
   - **Tier 5**: `tierMinPoints: 50` (Cúspide de metagame / Ley Suprema; requiere 50 Sellos invertidos).
   *Queda prohibido cualquier umbral arbitrario (ej. 10, 20) que rompa la curva de progresión matemática.*
2. **Moneda Exclusiva: Sellos Cívicos (Law Points)**: Cada nivel y rango debe contar con `costLaws` (generalmente 2 a 6 puntos) y `cumulativeCost` consistentes. No se admiten costes inventados en oro para decretar leyes en el compendio.
3. **Pureza de Roster en `recommendedForHeroes`**: Los héroes sugeridos para cada ley deben pertenecer estrictamente a los 18 comandantes oficiales de la facción correspondiente en Jadame. Prohibición total de nombres mitológicos inventados (como Pan, Silvanus, Lyra, Aura) o héroes clásicos de sagas previas.
4. **Coherencia de Criaturas y Tiers en Efectos y Tags**: Los efectos, descripciones de bonificación y tags de cada ley deben reflejar fielmente el tier canónico de cada criatura (ej. Vampiros son Tier 5, Dragón de Hueso / Señor del Festín es Tier 7; Fénix es Tier 7 de Foresta; Reina de la Colmena es Tier 7 de Colmena).
5. **Alineación con el Modelo Municipal de 3 Niveles**: Las referencias a fuentes de puntos de ley por edificios municipales deben coincidir con la arquitectura oficial de *Olden Era*: Town Hall (Asentamiento), City Hall II (con especialización), y Metropolis III (sin anacronismos como "Capitolio").
6. **Validación Mecánica en el Motor UI (`FactionLawsTree.tsx`)**: La función `checkLawAvailability` debe auditar y verificar simultáneamente:
   - Cumplimiento del umbral `pointsSpent >= (law.tierMinPoints || 0)`.
   - Prerrequisitos directos (`prerequisiteLawId` o `prerequisiteLaws`).
   - Incompatibilidades mutuas (`incompatibleLaws`).
   - Deselección en cascada de ramas dependientes al retirar una ley previa.

---

## 6. MÓDULO 5: AUDITORÍA DE ESTRUCTURAS DE CIUDADELA Y CASTILLO
*Archivos auditados y normalizados: `/src/data/townStructuresData.ts`, `/src/data/structures/*.ts`, `/src/components/TownStructuresBrowser.tsx`*

### 6.1. Arquitectura Cívica, Económica y Defensiva Canónica de Olden Era
- [x] **Centro Cívico Canónico de 3 Niveles (Town Hall / City Hall / Metropolis)**: Verificado e implementado el modelo oficial de 3 niveles progresivos de *Heroes of Might & Magic: Olden Era*:
  - **Nivel I (Town Hall - Asentamiento de Facción)**: Sede administrativa inicial de la ciudad. Genera 1.000 de Oro diario, Puntos de Ley y Puntos de Astrología, y fija el límite de héroes activos en +1.
  - **Nivel II (City Hall - [Nombre Canónico] II)**: Expansión de la sede cívica (Coste: 2.500 Oro, 5 Madera, 5 Mineral; Prerrequisito: Mercado). Otorga 1.000 de Oro, Puntos de Ley y Astrología al día, y permite al gobernador elegir **una de 3 mejoras económicas de Nivel 2**: +1.000 Oro/día, +1.000 Puntos de Ley/día, o +1.000 Puntos de Astrología/día.
  - **Nivel III (Metropolis - [Nombre Canónico] III)**: Máxima cúspide cívica de la ciudad (Coste: 5.000 Oro, 10 Madera, 10 Mineral; Prerrequisito: Nivel II). Otorga 1.000 de Oro, Puntos de Ley y Puntos de Astrología diarios adicionales para el reino, consolidando el pleno potencial de desarrollo gubernamental y de leyes de Jadame.
  - Nombres cívicos canónicos verificados por facción en los 3 niveles:
    - *Mazmorra*: **Nivel I**: Asentamiento de Alvar (Town Hall) -> **Nivel II**: Palacio Bizantino II (City Hall) -> **Nivel III**: Palacio Bizantino III (Metropolis).
    - *Templo*: **Nivel I**: Asentamiento Solar (Town Hall) -> **Nivel II**: Templo Solar II (City Hall) -> **Nivel III**: Templo Solar III (Metropolis).
    - *Necrópolis*: **Nivel I**: Asentamiento Tétrico (Town Hall) -> **Nivel II**: Rostro Eterno II (City Hall) -> **Nivel III**: Rostro Eterno III (Metropolis).
    - *Foresta / Arboleda*: **Nivel I**: Asentamiento Silvano (Town Hall) -> **Nivel II**: Palacio de la Arboleda II (City Hall) -> **Nivel III**: Palacio de la Arboleda III (Metropolis).
    - *Colmena / Enjambre*: **Nivel I**: Asentamiento del Enjambre (Town Hall) -> **Nivel II**: Corazón del Apiario II (City Hall) -> **Nivel III**: Corazón del Apiario III (Metropolis).
    - *Cisma*: **Nivel I**: Asentamiento del Vacío (Town Hall) -> **Nivel II**: Remanente Abisal II (City Hall) -> **Nivel III**: Remanente Abisal III (Metropolis).
- [x] **Expansión Económica: Banco y Tesorería (Bank & Treasury)**:
  - **Banco (Bank)**: Estructura financiera intermedia (+500 de Oro diario). Prerrequisito indispensable para la Tesorería.
  - **Tesorería (Treasury)**: Estructura económica suprema de *Olden Era* (+2.000 de Oro diario permanente para el reino). Requiere Banco, Mercado y Fortificaciones.
- [x] **Fortificaciones (Fortifications Niveles I, II y III)**:
  - **Nivel I (Fortificaciones I)**: Muralla defensiva perimetral y baluartes de asedio.
  - **Nivel II (Citadel)**: 2 torres de proyectiles automáticas en las almenas y **+50% de crecimiento semanal de todas las criaturas de la ciudad**.
  - **Nivel III (Castle)**: Gran torre central con alcance total, foso defensivo y **+100% de crecimiento semanal (duplica la producción)**.
- [x] **Gremio de Magos (Mage Guild Niveles 1 a 5)**:
  - Conexión canónica directa con la red del **Observatorio Mágico** (*Celestial Observatory*).
  - Desbloquea hechizos de Tiers 1 a 5 según la afinidad elemental de cada facción (Templo: Luz Solar; Mazmorra: Nochesombra/Primigenia; Necrópolis: Nochesombra; Arboleda: Primigenia; Enjambre: Primigenia/Nochesombra; Cisma: Arcana/Nochesombra).
  - Recarga del 100% de maná para cualquier héroe visitante y entrega del Libro de Hechizos.
- [x] **Servicios Cívicos, Comercio y Silos de Recursos**:
  - **Taberna (Tavern)**: +1 Moral para la guarnición, acceso a reclutamiento de héroes adicionales y rumores del mapa. Prerrequisito del Mercado.
  - **Mercado (Marketplace)**: Intercambio oficial de recursos según las tasas de mercado y número de mercados controlados. **Requiere la Taberna**.
  - **Comerciante de Artefactos (Artifact Merchant)**: Tienda fija para compra y venta de artefactos y reliquias en la ciudad. Requiere Mercado.
  - **Silo de Recursos (Resource Silo)**: Genera +1 recurso raro diario pasivo según la facción (+1 Gemas en Mazmorra; +1 Cristal en Templo y Arboleda; +1 Mercurio en Necrópolis y Cisma; +1 Azufre en Enjambre). Coste canónico: 3 de cada recurso raro secundario (sin oro). **Requiere Mercado y Banco**.
  - **Silo Alquímico (Alchemic Silo)**: Produce **Polvo Alquímico** (*Alchemical Dust*) diariamente, necesario para ascender moradas a nivel magistral y potenciar hechizos. **Requiere el Silo de Recursos**.

### 6.2. Moradas de Criaturas de Tier 1 a Tier 7 y Estructuras Exclusivas Canónicas
- [x] **Mazmorra (Dungeon)**:
  - Moradas: Cubil (T1 Trogloditas), Refugio (T2 Infiltradores), Anfiteatro (T3 Bailarinas de Ónice), Laberinto (T4 Minotauros), Voces Silenciadas (T5 Medusas), Hogar Ctónico (T6 Hidras), Palacio de las Cavernas (T7 Dragones de Cueva).
  - Ramas de mejora duales (Branch A / Branch B) y estadísticas completas estrictamente alineadas entre `dungeonData.ts` y `dungeonStructures.ts`.
  - Estructuras Especiales: Gimnasio (*Gymnasium*), Santuario del Grial de la Mazmorra (*Grail Sanctuary*).
- [x] **Templo (Temple)**:
  - Moradas: Cuartel de Milicia (T1), Campo de Tiro (T2 Ballesteros), Monasterio (T3 Clérigos), Salón de Espadas (T4 Espadachines), Establos Celestiales (T5 Caballeros), Bastión de Grifos (T6 Grifos), Catedral Radiante (T7 Ángeles).
  - Estructuras Especiales: Altar del Sol Radiante (*Radiant Sun Altar*), Tribunal de la Fe (*Tribunal of Faith*), Baluarte de Luz (*Bulwark of Light*), Faro Sagrado (*Sacred Lighthouse*).
- [x] **Necrópolis (Necropolis)**:
  - Moradas: Criptas y Tumbas (T1 Esqueletos), Pabellón Silencioso (T2 Apariciones), Perrera de Sabuesos (T3 Sabuesos No-Muertos), Cámara de los Saqueatumbas (T4 Saqueatumbas), Mansión Intemporal (T5 Liches), Tumba de Guerreros (T6 Caballeros del Terror), Château de los Festines (T7 Vampiros).
  - Estructuras Especiales: Intercambio Óseo (*Bone Exchange*), Transformador de No-Muertos (*Undead Transformer*), Pozo de Almas (*Well of Souls*), Serpiente Eterna (*Everserpent - Santuario del Grial*).
- [x] **Foresta / Arboleda (Sylvan / Grove)**:
  - Moradas: Cabañas de Faunos (T1 Faunos), Semillero de Lúpulo (T2 Hoplitas), Círculo de Menhires (T3 Ninfas Iriyads), Estanque Floreciente (T4 Aqualotls), Choza de Madetahongo (T5 Herbomantes), Guarida del Trueno (T6 Qilins), Pira (T7 Fénix).
  - Estructuras Especiales: Santuario de la Arboleda (*Grove Grail Sanctuary*).
- [x] **Colmena / Enjambre (Hive / Swarm)**:
  - Moradas: Vivienda Descuidada (T1 Parásitos), Guarida de Carroña (T2 Langostas), Nido de Papel (T3 Avispones), Zigurat Quitináceo (T4 Escorpiones), Cúspide (T5 Saqueadores / Reavers), Madrigueras de Almas Ardientes (T6 Waurms), Torre del Amor (T7 Reinas de la Colmena).
  - Estructuras Especiales: Santuario del Enjambre (*Hive Grail Sanctuary*).
- [x] **Cisma (Schism)**:
  - Moradas: Rito Menor de Invocación (T1 Cultistas), Aguja de los Cultistas (T2 Shoths), Establos de Aga'Shoth (T3 Jinetes Aga'Shoth), Rito Inquietante de Invocación (T4 Cóncubos), Casa de Cadenas (T5 Árbitros), Mansión Abotagada (T6 Enviados Abisales), Rito Supremo del Vacío (T7 Devoradores Cósmicos / Titanes).
  - Estructuras Especiales: Santuario del Abismo (*Schism Grail Sanctuary*).

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

### 7.3. Directrices Canónicas de Auditoría Permanente para Cronogramas (56 Días / 8 Semanas)
- [x] **Estructura Temporal de 56 Días**: El cronograma de desarrollo abarca 2 meses completos (8 semanas de 7 días cada una). Las 6 facciones cuentan con progresión detallada Día 1 a 56, con soporte dinámico de filtrado por semanas y meses en `DayByDayPlanner.tsx`.
- [x] **Progresión Municipal Canónica de 3 Niveles**: Queda formal y estrictamente vetado el término "Capitolio" o "Capital (Capitol)". La progresión oficial de sede municipal es:
  - *Nivel I*: Town Hall (+1.000 Oro/día, coste 2.500 Oro).
  - *Nivel II*: City Hall (+2.000 Oro/día, coste 5.000 Oro + especialización en Oro, Leyes o Astrología).
  - *Nivel III*: Metropolis (+4.000 Oro/día o bonificaciones combinadas, coste 10.000 Oro + estructuras avanzadas).
- [x] **Sincronización Estricta de Moradas con `src/data/structures/*.ts`**:
  - *Mazmorra*: Cubil (T1), Refugio (T2), Anfiteatro (T3), Laberinto (T4), Voces Silenciadas (T5), Hogar Ctónico (T6), Palacio de las Cavernas (T7).
  - *Templo*: Campo de Tiro (T1), Barracones (T2), Torre de los Grifos (T3), Capilla Radiante (T4), Hipódromo (T5), Tribunal Sagrado (T6), Portal Celestial (T7).
  - *Foresta / Arboleda*: Cabañas de Faunos (T1), Semillero de Lúpulo (T2), Círculo de Menhires (T3), Estanque Floreciente (T4), Choza de Maderahongo (T5), Guarida del Trueno (T6), Pira (T7).
  - *Necrópolis*: Criptas y Tumbas (T1), Pabellón Silencioso (T2), Perrera de Sabuesos (T3), Cámara de los Saqueatumbas (T4), Mansión Intemporal (T5), Tumba de Guerreros (T6), Château de los Festines (T7).
  - *Colmena / Enjambre*: Vivienda Descuidada (T1), Guarida de Carroña (T2), Nido de Papel (T3), Zigurat Quitináceo (T4), Cúspide (T5), Fosa de la Prole / Madrigueras de Almas Ardientes (T6), Torre del Amor (T7).
  - *Cisma*: Rito Menor de Invocación (T1), Aguja de los Cultistas (T2), Establos de Aga'Shoth (T3), Rito Inquietante de Invocación (T4), Casa de las Cadenas (T5), Mansión Hinchada / Abotagada (T6), Santuario del Abismo (T7).
- [x] **Prohibición de Anacronismos Geográficos y de Lore**: Queda prohibida cualquier referencia a reinos de entregas previas ajenos a Jadame (como "Erathia", "Antagarich" o "Enroth") en títulos, textos o descripciones de construcción. Todas las ambientaciones deben anclarse en Jadame y sus regiones canónicas (Karigor, Shadowspire, Bahía de la Niebla, Tierras Altas de Vori, etc.).

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
| *INC-008* | `/src/data/townStructuresData.ts` & `/src/data/subskillsRecommendationData.ts` | Discrepancia de estructuras: `getStructuresForFaction` omitía `Foresta` y `Colmena` cayendo en default (Mazmorra / Palacio Bizantino); mención de Palacio Bizantino en subhabilidades genéricas | Añadidos casos `Foresta` y `Colmena` en selector de estructuras y normalizadas las recomendaciones de subhabilidades a términos neutrales de facción | `CORREGIDO` |
| *INC-009* | `/src/data/structures/*.ts` & `CANON_CONTENT_AUDIT_CHECKLIST.md` | Inconsistencias en el centro cívico: omisión del 3.er nivel y anacronismos de entregas previas | Implementación del sistema cívico canónico de 3 niveles de *Olden Era* en las 6 facciones: Nivel I Town Hall (Asentamiento), Nivel II City Hall con elección de 1 de 3 especializaciones económicas (+1.000 Oro, Ley o Astrología), y Nivel III Metropolis ([Nombre] III, +1.000 Oro, Ley y Astrología adicionales), complementado con Banco (+500 Oro) y Tesorería (+2.000 Oro), Fortificaciones I-III (+50% y +100% crecimiento), Gremio de Magos I-V, Depósitos Alquímicos y moradas T1-T7 con ramas duales | `CORREGIDO` |
| *INC-010* | `/src/data/structures/*.ts` & `CANON_CONTENT_AUDIT_CHECKLIST.md` | Prerrequisitos de la cadena comercial y de silos: Mercado no requería Taberna, Silo de Recursos omitía el Banco, y Silo Alquímico no requería el Silo de Recursos | Corregidos los prerrequisitos en las 6 facciones: Mercado requiere Taberna; Silo de Recursos requiere Mercado y Banco; Silo Alquímico requiere Silo de Recursos. Normalizada la nomenclatura canónica a "Silo de Recursos (Resource Silo)" y "Silo Alquímico (Alchemic Silo)" | `CORREGIDO` |
| *INC-011* | `/src/data/arboledaData.ts` | Escenarios tácticos con criaturas y héroes de entregas clásicas (Hadas, Cazadores Elfos, Treants, Hombres Árbol, Pegasos, Dragones Esmeralda/Oro y héroe "Kelarr") ajenos a Jadame | Reemplazados por el roster y mecánicas oficiales de Arboleda en *Olden Era*: Faunos, Hoplitas del Bosque, Ninfas Iriyads, Aqualotls, Herbomantes, Qilins y Fénix, y héroes oficiales (Eith, Gorel, Anciano Tss'kish, Vatawna, Aeliniel) | `CORREGIDO` |
| *INC-012* | `/src/data/enjambreData.ts` | Nombres no canónicos en matriz de unidades y tácticas de Colmena según fuentes oficiales (`th.gl`, `paradrew.com`): T2 Escarabajo en lugar de Langosta/Locust; T4 Mantis en lugar de Escorpión/Scorpion; T5 Quimera en lugar de Saqueador/Reaver; T6 Rama B con alucinación "Matriarca Tiranida" | Corregida la matriz de unidades y escenarios tácticos alineándolos al canon oficial: Langosta (T2), Escorpión (T4), Saqueador / Reaver (T5), Gusanos de Magma / Reinas de la Colmena (T6) y Beelzebub / Rey Libélula (T7), purgando cualquier vestigio ajeno al lore | `CORREGIDO` |
| *INC-013* | `/src/data/templeData.ts` | Héroes no canónicos en escenarios tácticos: "Sir Galahad" (tradición artúrica ajena al roster oficial) y referencias anacrónicas | Sustituidos por héroes oficiales de Templo en *Olden Era*: Lord Edgar, Kestrel, Keandra, Avis el Hereje, Lia la Desatada, Viejo Lord Mandall y Aeos la Exaltada | `CORREGIDO` |
| *INC-014* | `/src/data/cismaData.ts` | Nombres en inglés ("Blackhorn", "Sister Keiri", "The Eye Collective") y héroes no oficiales ("Vaelor the Heretic", "Kaelen Vori", "Malakor") en escenarios tácticos de Cisma | Normalizados los 6 escenarios tácticos a la nomenclatura oficial en castellano y a los 18 héroes canónicos de Cisma (Cuerno Negro, Hermana Keiri, La Mirada Colectiva, Mara Mat'ha, Nihil, Dhüvri, Grellekh el Traidor) | `CORREGIDO` |
| *INC-015* | `/src/data/templeData.ts` & `/src/data/templeLawsData.ts` | Héroes no canónicos ("Sir Ronald", "Walter", "Valentina") dispersos en el orden de construcción y en 12 leyes cívicas de Templo | Reemplazados por los 18 héroes canónicos de Templo de Jadame: Viejo Lord Mandall, Kestrel, Keandra, John Johnson, Leon Dedos Pegajosos, Ister, Aeos la Exaltada, Lord Edgar, Avis el Hereje, Julius, Zenith, Elias el Alegre, Pip, Clarissa, Anastasia la Dócil, Vesper, Lia la Desatada, Nadir | `CORREGIDO` |
| *INC-016* | `/src/data/factionSpellData.ts` | Héroes recomendados en combos de hechizos de Templo, Necrópolis, Mazmorra, Arboleda y Cisma con nombres especulativos (Valerius, Adelaide, Seraphina, Celeste, Aurelius, Lucian, Mortis, Naadir, Sarix, Malakor, Jedda, Thalor, Alis, Thorne, Kelarr, Sister Keiri, Kyros, Oron, Blackhorn) | Sustituidos en los 18 combos por los héroes oficiales canónicos correspondientes a cada escuela y facción de Jadame (Lord Edgar, Aeos, Anastasia, Klastor, Ethric, Baluarte, Zakron, Motley, Deira, Devir, Eith, Gorel, Tss'kish, Keiri, Cuerno Negro, Nihil, Mara Mat'ha, Dhüvri) | `CORREGIDO` |
| *INC-017* | `/src/data/cismaData.ts`, `/src/data/cismaLawsData.ts`, `/src/data/dungeonData.ts` | Restos de terminología no castellana ("Sister Keiri" en acciones de héroe y sinergias) y denominación ambigua "Postura de Gorgona" en Emperatriz Medusa | Normalizado a "Hermana Keiri" en la totalidad del repositorio y renombrado a "Postura Petrificante" para evitar cualquier confusión con la criatura clásica de Fortaleza | `CORREGIDO` |
| *INC-018* | `/src/data/necropolisData.ts` & `/src/data/structures/necropolisStructures.ts` | Inconsistencias de correspondencia en nombres de moradas entre `necropolisData.ts` y el árbol estructural `necropolisStructures.ts` | Homogeneizados los campos `dwelling` y `dwellingName` de los 7 tiers de Necrópolis al árbol canónico de *Olden Era*: Criptas y Tumbas (T1), Pabellón Silencioso (T2), Perrera de Sabuesos (T3), Cámara de los Saqueatumbas (T4), Mansión Intemporal (T5), Tumba de Guerreros (T6) y Château de los Festines (T7) | `CORREGIDO` |
| *INC-019* | `/src/data/enjambreData.ts` & `/src/data/structures/hiveStructures.ts` | Desajuste en la matriz de unidades y moradas de Colmena (Hive) frente al canon de *Olden Era* registrado en `th.gl` y `hiveStructures.ts` | Sincronizadas las 7 moradas y la matriz de criaturas con el canon oficial: T1 Parásitos (Vivienda Descuidada), T2 Langostas (Guarida de Carroña), T3 Avispones (Nido de Papel), T4 Escorpiones (Zigurat Quitináceo), T5 Saqueadores / Reavers (Cúspide), T6 Waurms (Madrigueras de Almas Ardientes), T7 Reinas de la Colmena (Torre del Amor) | `CORREGIDO` |
| *INC-020* | `/src/data/dungeonData.ts` & `/src/data/structures/dungeonStructures.ts` | Discrepancias en nombres de moradas y estructuras de Mazmorra (Dungeon) frente al canon oficial de *Olden Era*: "Cueva de Trogloditas" en vez de "Cubil", "Salón de Sombras" en vez de "Refugio", "Anfiteatro" con costes desfasados, "Voces quietas", "Hogar ctónico" y "Palacio de cueva" | Auditadas y sincronizadas todas las moradas T1-T7 ("Cubil", "Refugio", "Anfiteatro", "Laberinto", "Voces Silenciadas", "Hogar Ctónico", "Palacio de las Cavernas"), costes exactos, estadísticas y estructuras especiales (Gimnasio) en ambos ficheros | `CORREGIDO` |
| *INC-021* | `/src/data/factionSpellData.ts` | Unidades y criaturas anacrónicas o no canónicas en perfiles, combos y prioridades de hechizos de Colmena ("Mantis Voraces", "Avispas Asesinas", "Zánganos", "Escarabajos Acorazados", "Colosos Quitinosos") y Foresta ("Murmuramantes") | Sincronizados todos los combos, perfiles y prioridades con las criaturas oficiales de Jadame en *Olden Era*: Avispones Cazadores, Langostas Carroñeras, Escorpiones de Azufre, Saqueadores Desgarradores, Waurms de Magma, Reinas de la Colmena y Herbomantes | `CORREGIDO` |
| *INC-022* | `/src/components/SpellGrimoire.tsx` | Acoplamiento anómalo de datos: `SpellGrimoire.tsx` importaba `RECOMMENDED_SPELLS` desde `/src/data/dungeonData.ts` en lugar del repositorio central de hechizos | Desacoplado de Mazmorra: ahora importa `OFFICIAL_SPELLS_DATA as RECOMMENDED_SPELLS` directamente desde `/src/data/spellsData.ts`, asegurando una fuente de verdad única e inmutable para el grimorio | `CORREGIDO` |
| *INC-023* | `CANON_CONTENT_AUDIT_CHECKLIST.md` | Ausencia de sección formal con directrices de auditoría permanente para la sección de Grimorio & Hechizos | Incorporada la subsección canónica `4.5. Directrices Canónicas de Auditoría Permanente para Grimorio y Hechizos` con las reglas de 5 escuelas, progresión alquímica, Puntos de Observación para neutrales, fórmulas de escalado `[Base + Multiplicador × SP]` y pureza de sinergias | `CORREGIDO` |
| *INC-024* | `/src/data/cismaLawsData.ts` | Umbrales de activación de Tiers desalineados en leyes de Cisma: Tier 3 con 10 Pts (en lugar de 15), Tier 4 con 15 Pts (en lugar de 30) y Tier 5 con 20 Pts (en lugar de 50) | Corregidos y normalizados los umbrales de activación al estándar canónico oficial de 5 tiers de *Olden Era*: Tier 1 (0 Pts), Tier 2 (5 Pts), Tier 3 (15 Pts), Tier 4 (30 Pts) y Tier 5 (50 Pts) | `CORREGIDO` |
| *INC-025* | `/src/data/arboledaLawsData.ts` | Héroes no canónicos ("Aura", "Silvanus", "Pan", "Lyra") de inspiración mitológica clásica en el atributo `recommendedForHeroes` de leyes de Arboleda | Reemplazados por los héroes oficiales del roster de Jadame de *Olden Era*: Eith y Vatawna (Simbiosis Forestal), y Colajengibre y Gorel Punta de Lanza (Armonía Faúnica) | `CORREGIDO` |
| *INC-026* | `/src/data/necropolisLawsData.ts` & `/src/data/factionLawsData.ts` | Discrepancia en nomenclatura de morada de Vampiros ("Palacio de los Vampiros") y presencia de "Capitolio" en fuentes de puntos de ley municipales | Corregida morada a Château de los Festines para los Vampiros de Tier 7, y normalizada la fuente municipal al modelo canónico de 3 niveles (Town Hall, City Hall II, Metropolis III) | `CORREGIDO` |
| *INC-027* | `/src/components/FactionLawsTree.tsx` | La función `checkLawAvailability` no verificaba el umbral de puntos mínimos de tier (`tierMinPoints`), permitiendo seleccionar leyes de tiers superiores sin inversión previa | Incorporada la verificación estricta de `tierMinPoints`: bloquea la activación de leyes de Tiers 2 (5 pts), 3 (15 pts), 4 (30 pts) y 5 (50 pts) si el gasto acumulado en el árbol es inferior al umbral | `CORREGIDO` |
| *INC-028* | `CANON_CONTENT_AUDIT_CHECKLIST.md` | Ausencia de sección formal con directrices de auditoría permanente para Leyes de Facción y Políticas de Ciudad | Creada la subsección canónica `5.3. Directrices Canónicas de Auditoría Permanente para Leyes de Facción y Políticas de Ciudad` con las 6 reglas obligatorias de tiers, sellos cívicos, integridad de rosters y validación mecánica en UI | `CORREGIDO` |
| *INC-029* | `/src/data/necropolisData.ts`, `/src/data/subclassesData.ts`, `/src/data/templeData.ts`, `/src/data/dungeonData.ts`, `/src/data/arboledaData.ts`, `/src/data/factionSpellData.ts` | Remanentes de criaturas anacrónicas de Heroes III en Necrópolis ("Zombis", "Momias", "Dragones de Hueso" y "Dragones Esmeralda") en tropas iniciales, tácticas y matchups | Depurados todos los ficheros: ratificado el roster canónico de Necrópolis en *Olden Era* con Vampiros en Tier 7 (Château de los Festines), Sabuesos No-Muertos en Tier 3, y purgadas todas las referencias tácticas y sinergias cruzadas | `CORREGIDO` |
| *INC-030* | `/src/data/necropolisData.ts` | Especialidades y ejércitos iniciales desfasados en héroes de Necrópolis: Onkos con ejército de Zombis, Funerella desalineada, y Oona Tejesombras con asignaciones genéricas | Reconfigurados los 18 héroes de Necrópolis al canon estricto: Onkos como Director del Teatro Macabro especializado en Esqueletos, Funerella con Nigromancia Avanzada, Oona con Maestría de Nochesombra, y ejércitos iniciales compuestos solo por tropas canónicas (Esqueletos, Apariciones, Sabuesos No-Muertos) | `CORREGIDO` |
| *INC-031* | `/src/data/necropolisLawsData.ts` | Presencia de la ley "Aura Aterradora del Dragón de Hueso" en Tier 4 de leyes de Necrópolis, desfasada con el roster oficial de *Olden Era* | Reemplazada por la ley canónica "Soberanía del Château de los Festines" (Tier 4, 30 Pts) que potencia a los Vampiros y Señores de los Vampiros (Tier 7) con +25% daño, 100% drenaje y -2 de Moral enemiga | `CORREGIDO` |
| *INC-032* | `CANON_CONTENT_AUDIT_CHECKLIST.md` | Sección 3.2 de unidades desactualizada con listas genéricas y anacronismos de entregas previas | Sincronizados exhaustivamente los 7 tiers con sus moradas canónicas de Jadame y ramas duales de mejora (A y B) para las 6 facciones (Mazmorra, Templo, Necrópolis, Foresta/Arboleda, Colmena/Enjambre y Cisma) | `CORREGIDO` |
| *INC-033* | `CANON_CONTENT_AUDIT_CHECKLIST.md` | Ausencia de directrices de auditoría permanente para las secciones de "Héroes & Habilidades" y "Unidades & Criaturas" | Incorporadas formalmente la subsección `2.2. Directrices Canónicas de Auditoría Permanente para Héroes y Habilidades` y la subsección `3.3. Directrices Canónicas de Auditoría Permanente para Unidades y Criaturas` | `CORREGIDO` |
| *INC-034* | `/src/data/structures/templeStructures.ts` & `/src/data/structures/schismStructures.ts` | Discrepancia en nomenclatura de moradas y criaturas frente al canon oficial de *Olden Era* (T1 a T7 en Templo y Cisma) | Normalizadas todas las moradas de Templo y Cisma a los términos canónicos contrastados | `CORREGIDO` |
| *INC-035* | `/src/data/subclassesData.ts` | Mención residual anacrónica de "unicornios y dríadas" en la subclase Favorecidos por el azar de Foresta / Arboleda | Reemplazados por faunos arqueros, ninfas iriyad, herbomantes y qilins celestiales de Jadame | `CORREGIDO` |
| *INC-036* | `/src/components/CombatTactics.tsx` | Nomenclatura desfasada en tácticas de Templo (Soldados/Cruzados), Colmena (Larvas/Escarabajos/Mantis/Leviatán) y Mazmorra | Actualizado a unidades canónicas: Espadachines y Égidas del Sol (Templo), Parásitos, Langostas, Avispones, Saqueadores, Waurms y Reina de la Colmena (Colmena), e Infiltradores Sombríos con Minotauros (Mazmorra) | `CORREGIDO` |
| *INC-037* | `/src/data/templeData.ts` | Ausencia de Aeos la Exaltada en `TEMPLE_HEROES` a pesar de estar referenciada en `templeLawsData.ts`, rompiendo la paridad estricta de 18 héroes | Añadida Aeos la Exaltada (Caballero / Guerrero, Presencia Inspiradora y Moral solar) alcanzando exactamente 18 héroes canónicos en Templo (9 Guerreros / 9 Clérigos) | `CORREGIDO` |
| *INC-038* | `/src/data/dungeonOpponentTactics.ts` | Referencias desfasadas a Danzantes en tácticas de creeping Día 3 y Día 8 | Ajustado a Infiltradores Sombríos y Medusas en sinergia con el orden de construcción de Mazmorra | `CORREGIDO` |
| *INC-039* | `/src/data/dungeonData.ts` & `/src/data/enjambreData.ts` | Erradicación definitiva del anacronismo "Capitolio" en encabezados y perfiles de héroes (Día 10 de Mazmorra y Goldentongue de Colmena) | Sustituido por el nivel III canónico "Palacio Bizantino III (Metropolis)" y "Metropolis III (Corazón del Apiario III)" respetando el sistema municipal de 3 niveles | `CORREGIDO` |
| *INC-040* | `/src/data/enjambreData.ts` | Discrepancias en ejércitos iniciales y menciones tácticas de los 18 héroes de Colmena con nombres de insectos no canónicos ("Larva", "Escarabajo", "Avispa", "Mantis", "Leviatán") | Normalizados los 18 comandantes al roster oficial de Jadame de *Olden Era*: Parásito (T1), Langosta (T2), Avispón (T3), Escorpión (T4), Saqueador / Reaver (T5), Waurm (T6) y Reina de la Colmena (T7) | `CORREGIDO` |
| *INC-041* | `/src/data/templeData.ts` | Presencia de anacronismos geográficos de Enroth/Erathia ("Erathia" en D1, D9, D17 y D42) y denominación municipal clásica "Capital de Karigor (Capitol)" en D21 | Reemplazado "Erathia" por las tierras y reinos canónicos de Jadame (Karigor, Templo Solar) y sustituida la "Capital (Capitol)" por "Metrópolis Solar (Templo Solar III / Metropolis)" en el estándar municipal de 3 niveles | `CORREGIDO` |
| *INC-042* | `/src/data/arboledaData.ts` | Nombres no canónicos de moradas en el cronograma de construcción de Foresta / Arboleda (D2 Claro de Faunos, D3 Cuartel de Hoplitas, D4 Arboleda de Iriyads, D6 Estanque de Aqualotls, D8 Santuario de Herbomantes, D10 Cúspide de Qilins, D14 Nido de Fénix) | Sincronizadas las moradas con el árbol canónico de `groveStructures.ts`: Cabañas de Faunos (T1), Semillero de Lúpulo (T2), Círculo de Menhires (T3), Estanque Floreciente (T4), Choza de Maderahongo (T5), Guarida del Trueno (T6) y Pira (T7) | `CORREGIDO` |
| *INC-043* | `/src/data/necropolisData.ts` | Moradas y hechizos no canónicos en el cronograma de construcción de Necrópolis (D2 Cripta Maldita, D3 Tumba de Apariciones, D4 Perrera Maldita, D10 Mausoleo de Liches, D14/D21 Palacio de Vampiros, D15 Salón de Caballeros del Terror, D28 hechizo "Ola de Muerte") | Homogeneizadas las moradas con `necropolisStructures.ts`: Criptas y Tumbas (T1), Pabellón Silencioso (T2), Perrera de Sabuesos (T3), Mansión Intemporal (T5), Tumba de Guerreros (T6), Château de los Festines (T7) y hechizo oficial de Nochesombra Decadencia Fatal | `CORREGIDO` |
| *INC-044* | `/src/data/enjambreData.ts` | Desajuste en el orden de sedes cívicas del cronograma de Colmena (D5 y D9 ambos rotulados como Corazón del Apiario II con costes idénticos de 2.500) | Ajustada la progresión canónica a Asentamiento del Enjambre (Town Hall, +1.000 Oro/día, coste 2.500 Oro) en Día 5 y Corazón del Apiario II (City Hall, +2.000 Oro/día, coste 5.000 Oro) en Día 9 | `CORREGIDO` |

---

## 11. INSTRUCCIONES DE EJECUCIÓN DEL CONTROL DE CALIDAD

1. **Revisión por Lotes**: Realizar la auditoría módulo por módulo, ejecutando `view_file` sobre los ficheros de datos correspondientes.
2. **Validación TypeScript**: Tras cualquier corrección de datos, ejecutar `lint_applet` y `compile_applet` para certificar 0 errores de tipado y 0 roturas de interfaz.
3. **Persistencia de Estado**: Actualizar los checkboxes `[x]` de este documento conforme se valide y certifique cada elemento contra el canon de *Heroes of Might & Magic: Olden Era*.
