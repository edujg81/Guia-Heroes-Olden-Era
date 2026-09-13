const fs = require('fs');
const path = require('path');

// Helper to format a TypeScript object nicely
function formatStep(step) {
  const lines = ['  {'];
  lines.push(`    day: ${step.day},`);
  lines.push(`    month: ${step.month},`);
  lines.push(`    week: ${step.week},`);
  lines.push(`    title: ${JSON.stringify(step.title)},`);
  lines.push(`    building: ${JSON.stringify(step.building)},`);
  lines.push(`    buildingTierLevel: ${JSON.stringify(step.buildingTierLevel)},`);
  lines.push(`    cityScope: ${JSON.stringify(step.cityScope)},`);
  lines.push(`    cityName: ${JSON.stringify(step.cityName)},`);
  
  if (step.buildingChoice) {
    lines.push(`    buildingChoice: {`);
    lines.push(`      type: ${JSON.stringify(step.buildingChoice.type)},`);
    lines.push(`      recommendedOption: ${JSON.stringify(step.buildingChoice.recommendedOption)},`);
    lines.push(`      alternativeOption: ${JSON.stringify(step.buildingChoice.alternativeOption)},`);
    lines.push(`      reason: ${JSON.stringify(step.buildingChoice.reason)},`);
    lines.push(`    },`);
  }

  // Cost
  const costParts = [];
  if (step.cost.gold) costParts.push(`gold: ${step.cost.gold}`);
  if (step.cost.wood) costParts.push(`wood: ${step.cost.wood}`);
  if (step.cost.ore) costParts.push(`ore: ${step.cost.ore}`);
  if (step.cost.gems) costParts.push(`gems: ${step.cost.gems}`);
  if (step.cost.crystal) costParts.push(`crystal: ${step.cost.crystal}`);
  if (step.cost.mercury) costParts.push(`mercury: ${step.cost.mercury}`);
  if (step.cost.alchemicalDust) costParts.push(`alchemicalDust: ${step.cost.alchemicalDust}`);
  lines.push(`    cost: { ${costParts.join(', ')} },`);

  // Hero actions
  lines.push(`    heroActions: [`);
  step.heroActions.forEach(action => {
    lines.push(`      ${JSON.stringify(action)},`);
  });
  lines.push(`    ],`);

  lines.push(`    combatTactic: ${JSON.stringify(step.combatTactic)},`);
  lines.push(`    criticalTip: ${JSON.stringify(step.criticalTip)},`);
  lines.push(`    priority: ${JSON.stringify(step.priority)},`);
  lines.push(`  },`);
  return lines.join('\n');
}

module.exports = { formatStep };
