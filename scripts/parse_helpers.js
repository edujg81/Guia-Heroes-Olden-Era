const fs = require('fs');
const path = require('path');
const { formatStep } = require('./step_formatter');
const { FACTION_CONFIGS, generateSecondCitySteps, generateThirdCitySteps } = require('./faction_schedule_templates');

function extractArrayRange(filePath, varName) {
  const content = fs.readFileSync(filePath, 'utf8');
  const startMarker = `export const ${varName}: BuildStep[] = [`;
  const startIndex = content.indexOf(startMarker);
  if (startIndex === -1) {
    throw new Error(`Could not find ${startMarker} in ${filePath}`);
  }

  // Find the closing bracket followed by semicolon
  // Start searching after startIndex
  const arrayContentStart = startIndex + startMarker.length;
  
  // We need to find the matching '];'
  // Since BuildStep objects are closed with '},', the array closing is '\n];'
  let depth = 1;
  let inString = false;
  let stringChar = '';
  let escape = false;
  let endIndex = -1;

  for (let i = arrayContentStart; i < content.length; i++) {
    const char = content[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (char === '\\') {
      escape = true;
      continue;
    }
    if (inString) {
      if (char === stringChar) {
        inString = false;
      }
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      inString = true;
      stringChar = char;
      continue;
    }
    if (char === '[') {
      depth++;
    } else if (char === ']') {
      depth--;
      if (depth === 0) {
        // Found end of array
        endIndex = i;
        break;
      }
    }
  }

  if (endIndex === -1) {
    throw new Error(`Could not find matching closing bracket for ${varName} in ${filePath}`);
  }

  // Check if followed by semicolon
  let afterClose = endIndex + 1;
  if (content[afterClose] === ';') {
    afterClose++;
  }

  const before = content.substring(0, startIndex);
  const after = content.substring(afterClose);
  return { before, after, rawArray: content.substring(arrayContentStart, endIndex) };
}

console.log("extractArrayRange function ready.");
