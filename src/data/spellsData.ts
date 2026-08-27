import { RecommendedSpell } from '../types';
import { DAYLIGHT_SPELLS } from './spells/daylightSpells';
import { NIGHTSHADE_SPELLS } from './spells/nightshadeSpells';
import { PRIMAL_SPELLS } from './spells/primalSpells';
import { ARCANE_SPELLS } from './spells/arcaneSpells';
import { NEUTRAL_SPELLS } from './spells/neutralSpells';

export const OFFICIAL_SPELLS_DATA: RecommendedSpell[] = [
  ...DAYLIGHT_SPELLS,
  ...NIGHTSHADE_SPELLS,
  ...PRIMAL_SPELLS,
  ...ARCANE_SPELLS,
  ...NEUTRAL_SPELLS,
];

export {
  DAYLIGHT_SPELLS,
  NIGHTSHADE_SPELLS,
  PRIMAL_SPELLS,
  ARCANE_SPELLS,
  NEUTRAL_SPELLS,
};
