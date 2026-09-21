const fs = require('fs');
const path = 'src/data/templeData.ts';
let c = fs.readFileSync(path, 'utf8');

// Remove unwanted fields from hero objects (only within TEMPLE_HEROES_LOCAL array)
const unwantedFields = [
  'faction:', 'heroClass:', 'heroType:', 'specialtyName:', 'specialtyEffect:',
  'initialSkills:', 'initialArmy:'
];
for (const field of unwantedFields) {
  const regex = new RegExp('^[ \\t]*' + field.replace(':', '\\:') + '.*$', 'gm');
  c = c.replace(regex, '');
}

// Clean excessive blank lines
c = c.replace(/\n{3,}/g, '\n\n');

fs.writeFileSync(path, c);
console.log('templeData.ts fields cleaned');