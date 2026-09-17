#!/usr/bin/env python3
"""Script para inyectar la propiedad faction en todos los héroes."""
import re
import pathlib

BASE = pathlib.Path("d:/Edu/code/oldenera/Guia-Heroes-Olden-Era/src/data")
FILES = {
    "dungeonData.ts": "Mazmorra",
    "templeData.ts": "Templo",
    "arboledaData.ts": "Arboleda",
    "necropolisData.ts": "Necrópolis",
    "enjambreData.ts": "Enjambre",
    "cismaData.ts": "Cisma",
}

for fname, fac in FILES.items():
    p = BASE / fname
    src = p.read_text(encoding="utf-8")
    lines = src.splitlines()
    
    # Find all hero objects (those starting with { and ending with })
    # We'll look for objects that have id: and should have faction
    hero_objects = []
    for i, line in enumerate(lines):
        if line.strip().startswith("{") and "id:" in line:
            # Check if this is a hero object (not another object)
            # Look ahead to see if it contains id and likely has faction
            obj_start = i
            # Find closing brace
            depth = 0
            for j in range(i, len(lines)):
                if lines[j].strip().startswith("{"):
                    depth += 1
                elif lines[j].strip().startswith("}"):
                    depth -= 1
                    if depth == 0:
                        hero_objects.append((obj_start, j))
                        break
    
    print(f"{fname}: {len(hero_objects)} objetos de héroes encontrados")
    
    # Now check each object for faction
    for start, end in hero_objects:
        obj_text = "\n".join(lines[start:end+1])
        has_faction = "faction:" in obj_text
        if not has_faction:
            # Insert faction after id line
            # Find the line with id:
            for idx, line in enumerate(lines[start:], start=start):
                if "id:" in line:
                    # Insert faction after this line
                    indent = len(line) - len(line.lstrip())
                    new_line = f"{indent}faction: '{fac}',"
                    # Replace the line
                    lines[idx] = new_line
                    print(f"  INSERTED faction in {fname} line {idx+1}")
                    break
    
    # Write back
    p.write_text("\n".join(lines), encoding="utf-8")
    print(f"  Written back to {fname}")