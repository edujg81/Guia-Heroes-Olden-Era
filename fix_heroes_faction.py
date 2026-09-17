#!/usr/bin/env python3
"""Inyecta faction en todos los objetos de héroe que falten en los 6 archivos."""
import re, pathlib

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
    # Encontrar el bloque del array de héroes (desde export const ..._HEROES hasta el cierre ])
    # Usamos un enfoque más simple: para cada objeto que empieza con { y tiene id: y no tiene faction:
    # Insertamos faction después de id: '...'
    def fix_obj(m):
        obj = m.group(0)
        if "faction:" in obj:
            return obj
        # Insertar faction después de la línea id: '...'
        # Encontrar la línea id y agregar faction después
        lines = obj.split("\n")
        new_lines = []
        inserted = False
        for line in lines:
            new_lines.append(line)
            if not inserted and re.search(r"id:\s*'[^']+'", line):
                indent = "    "  # indentación estándar
                new_lines.append(f"{indent}faction: '{fac}',")
                inserted = True
        return "\n".join(new_lines)

    # Patrón: objetos literales dentro del array (desde { hasta el cierre correspondiente)
    # Usamos un enfoque de reemplazo por líneas para ser más seguro
    lines = src.splitlines(keepends=True)
    result = []
    in_hero_array = False
    array_depth = 0
    current_obj_lines = []
    current_obj_start = None

    # Encontrar la línea donde empieza el array
    array_start_line = None
    for i, line in enumerate(lines):
        if re.search(r"export const \w+_HEROES.*= \[", line):
            array_start_line = i
            break

    if array_start_line is None:
        print(f"{fname}: no se encontró array de héroes")
        continue

    # Procesar línea por línea desde el array
    i = array_start_line
    result = lines[:array_start_line + 1]
    # Ahora procesamos los elementos del array
    # Encontramos cada objeto { ... }
    content_after_array = "".join(lines[array_start_line + 1:])
    # Usamos regex para encontrar objetos completos
    # Patrón: { ... } donde ... no contiene { ni } a nivel superior (simplificado)
    # En realidad, los objetos son simples y no anidados profundamente
    obj_pattern = re.compile(r"\{[^{}]*\}", re.DOTALL)

    # Mejor enfoque: reemplazar cada objeto individual que no tenga faction
    def replace_obj(m):
        obj_text = m.group(0)
        if "faction:" in obj_text:
            return obj_text
        # Insertar faction después de id: '...'
        # Buscar la línea con id: y agregar faction después
        obj_lines = obj_text.split("\n")
        new_obj_lines = []
        inserted = False
        for line in obj_lines:
            new_obj_lines.append(line)
            if not inserted and re.search(r"id:\s*'[^']+'", line):
                # Obtener indentación de la línea actual
                indent = line[:len(line) - len(line.lstrip())]
                new_obj_lines.append(f"{indent}faction: '{fac}',")
                inserted = True
        return "\n".join(new_obj_lines)

    # Aplicar reemplazo en todo el archivo (solo dentro del array)
    # Dividimos en parte antes del array y parte del array
    before = "".join(lines[:array_start_line + 1])
    array_content = "".join(lines[array_start_line + 1:])

    # Encontrar el cierre del array (último ] antes de algún export o final)
    # Para simplificar, reemplazamos en todo el contenido del archivo
    # pero solo en objetos que no tengan faction
    new_src = before
    # Procesar el resto línea por línea, identificando objetos
    rest_lines = lines[array_start_line + 1:]
    obj_buffer = []
    in_obj = False
    obj_indent = 0

    for line in rest_lines:
        stripped = line.strip()
        if stripped.startswith("{") and not in_obj:
            in_obj = True
            obj_buffer = [line]
            obj_indent = len(line) - len(line.lstrip())
        elif in_obj:
            obj_buffer.append(line)
            # Verificar si cerramos el objeto
            # Un objeto cierra cuando tenemos } con la misma indentación que el inicio
            # o menor (pero no mayor que el inicio del objeto)
            if stripped == "}" or (stripped.startswith("},") and len(line) - len(line.lstrip()) <= obj_indent):
                # Cerrar objeto
                obj_text = "".join(obj_buffer)
                if "faction:" not in obj_text:
                    # Insertar faction
                    obj_lines = obj_text.split("\n")
                    new_obj_lines = []
                    inserted = False
                    for ol in obj_lines:
                        new_obj_lines.append(ol)
                        if not inserted and re.search(r"id:\s*'[^']+'", ol):
                            indent = ol[:len(ol) - len(ol.lstrip())]
                            new_obj_lines.append(f"{indent}faction: '{fac}',")
                            inserted = True
                    obj_text = "\n".join(new_obj_lines)
                new_src += obj_text
                in_obj = False
                obj_buffer = []
            else:
                # Continuar acumulando
                pass
        else:
            # No estamos en un objeto, agregar directamente
            new_src += line

    # Si quedó algo en el buffer (debería ser el cierre del array)
    if obj_buffer:
        obj_text = "".join(obj_buffer)
        if "faction:" not in obj_text:
            obj_lines = obj_text.split("\n")
            new_obj_lines = []
            inserted = False
            for ol in obj_lines:
                new_obj_lines.append(ol)
                if not inserted and re.search(r"id:\s*'[^']+'", ol):
                    indent = ol[:len(ol) - len(ol.lstrip())]
                    new_obj_lines.append(f"{indent}faction: '{fac}',")
                    inserted = True
            obj_text = "\n".join(new_obj_lines)
        new_src += obj_text

    # Asegurar que tenemos el cierre del array
    # Buscar el último ] en el archivo original y agregarlo si falta
    if "]" not in new_src.split("\n")[-10:] and "]" in src:
        # Encontrar dónde debería ir el cierre
        pass  # El cierre debería estar en el buffer o ya agregado

    # Escribir archivo
    p.write_text(new_src, encoding="utf-8")
    # Verificar
    new_content = p.read_text(encoding="utf-8")
    count_faction = new_content.count(f"faction: '{fac}'")
    print(f"{fname}: inyectado {count_faction} veces faction='{fac}'")
