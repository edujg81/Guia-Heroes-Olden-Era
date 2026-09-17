import pathlib
import re
import difflib

base = pathlib.Path('d:/Edu/code/oldenera/Guia-Heroes-Olden-Era')
data_dir = base / 'src/data'
asset_dir = base / 'src/assets/icons/heroes'

files = {
    'Mazmorra': 'dungeonData.ts',
    'Templo': 'templeData.ts',
    'Arboleda': 'arboledaData.ts',
    'Necrópolis': 'necropolisData.ts',
    'Enjambre': 'enjambreData.ts',
    'Cisma': 'cismaData.ts',
}

def norm(s):
    s = s.lower().replace("'", '')
    s = ''.join(c for c in s if not unicodedata.combining(c)) if False else s
    return re.sub(r'[^a-z0-9]+', '_', s).strip('_')

for faction, fname in files.items():
    text = (data_dir / fname).read_text(encoding='utf-8')
    names = re.findall(r"\n\s+name:\s*'([^']+)'", text)
    ids = re.findall(r"\n\s+id:\s*'([^']+)'", text)
    # restrict to hero array
    start = text.find(f"export const { {'Mazmorra':'DUNGEON_HEROES','Templo':'TEMPLE_HEROES','Arboleda':'ARBOLEDA_HEROES','Necrópolis':'NECROPOLIS_HEROES','Enjambre':'ENJAMBRE_HEROES','Cisma':'CISMA_HEROES'}[faction] }")
    end = text.find('\n];', start)
    block = text[start:end]
    names = re.findall(r"\n\s+name:\s*'([^']+)'", block)
    ids = re.findall(r"\n\s+id:\s*'([^']+)'", block)
    assets = [p.stem for p in asset_dir.glob('*.png') if p.stem.startswith({'Mazmorra':'hero_dungeon','Templo':'hero_human','Arboleda':'hero_nature','Necrópolis':'hero_necromancer','Enjambre':'hero_demon','Cisma':'hero_unfrozen'}[faction] + '_')]
    print('\n###', faction, len(names), len(assets))
    for i, (name, hero_id) in enumerate(zip(names, ids), 1):
        candidates = difflib.get_close_matches(norm(name), [norm(a) for a in assets], n=1, cutoff=0.25)
        print(f'{i:2} {name:28} | {hero_id:32} | {candidates[0] if candidates else "?"}')
