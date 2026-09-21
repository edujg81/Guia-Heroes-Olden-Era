const fs = require('fs');
let s = fs.readFileSync('src/data/apiHeroesData.ts', 'utf8');
s = s.replace(/    iconPath: '([^']+)',\n/g, "    iconPath: '$1',\n    icon: '$1',\n");
fs.writeFileSync('src/data/apiHeroesData.ts', s);
console.log('icon added');
