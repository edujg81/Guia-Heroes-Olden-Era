import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const baseDir = path.resolve('src/data');
const files = {
  'dungeonData.ts': 'Mazmorra',
  'templeData.ts': 'Templo',
  'arboledaData.ts': 'Arboleda',
  'necropolisData.ts': 'Necrópolis',
  'enjambreData.ts': 'Enjambre',
  'cismaData.ts': 'Cisma',
};

function lineStart(sourceText, position) {
  const previousNewline = sourceText.lastIndexOf('\n', position - 1);
  return previousNewline + 1;
}

function lineEnd(sourceText, position) {
  const nextNewline = sourceText.indexOf('\n', position);
  return nextNewline === -1 ? sourceText.length : nextNewline;
}

for (const [fileName, faction] of Object.entries(files)) {
  const filePath = path.join(baseDir, fileName);
  const sourceText = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );

  const heroArrays = [];
  const visit = (node) => {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      /^([A-Z]+_HEROES)$/.test(node.name.text) &&
      node.initializer &&
      ts.isArrayLiteralExpression(node.initializer)
    ) {
      heroArrays.push(node.initializer);
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);

  if (heroArrays.length !== 1) {
    throw new Error(`${fileName}: se esperaban 1 array de héroes, se encontraron ${heroArrays.length}`);
  }

  const replacements = [];
  let heroCount = 0;
  let missingCount = 0;

  for (const element of heroArrays[0].elements) {
    if (!ts.isObjectLiteralExpression(element)) {
      continue;
    }

    heroCount += 1;
    let hasFaction = false;
    let idProperty = null;

    for (const property of element.properties) {
      if (!ts.isPropertyAssignment(property)) {
        continue;
      }

      if (ts.isIdentifier(property.name)) {
        if (property.name.text === 'faction') {
          hasFaction = true;
        }
        if (property.name.text === 'id') {
          idProperty = property;
        }
      }
    }

    if (!hasFaction) {
      missingCount += 1;
      if (!idProperty) {
        throw new Error(`${fileName}: héroe sin faction y sin propiedad id`);
      }

      const lineStartPos = lineStart(sourceText, idProperty.getStart(sourceFile));
      const lineEndPos = lineEnd(sourceText, idProperty.getEnd(sourceFile));
      const idLine = sourceText.slice(lineStartPos, lineEndPos);
      const indent = idLine.match(/^\s*/)?.[0] ?? '';
      const insertion = `\n${indent}faction: '${faction}',`;
      replacements.push({
        start: lineEndPos,
        end: lineEndPos,
        text: insertion,
      });
    }
  }

  if (replacements.length > 0) {
    replacements.sort((a, b) => b.start - a.start);
    let updated = sourceText;
    for (const replacement of replacements) {
      updated = updated.slice(0, replacement.start) + replacement.text + updated.slice(replacement.end);
    }
    fs.writeFileSync(filePath, updated, 'utf8');
  }

  console.log(`${fileName}: ${heroCount} héroes, ${missingCount} propiedades faction añadidas`);
}
