path = 'src/components/features/heroes/HeroDetailModal.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('src={offenceIcon}', 'src="/src/assets/icons/hero_stats/offence.png"')
content = content.replace('src={defenceIcon}', 'src="/src/assets/icons/hero_stats/defence.png"')
content = content.replace('src={spellpowerIcon}', 'src="/src/assets/icons/hero_stats/spellpower.png"')
content = content.replace('src={intelligenceIcon}', 'src="/src/assets/icons/hero_stats/intelligence.png"')

old = '''            <div className="grid grid-cols-8 gap-0 mt-4">
              <div className="rounded-lg bg-slate-950/40 text-center">
                <img src="/src/assets/icons/hero_stats/offence.png" alt="ATQ" className="w-6 h-6 mx-auto mb-1" />
              </div>
              <div className="font-bold text-slate-200">{hero.attack}</div>
              <div className="rounded-lg bg-slate-950/40 text-center">
                <img src="/src/assets/icons/hero_stats/defence.png" alt="DEF" className="w-6 h-6 mx-auto mb-1" />
              </div>
              <div className="font-bold text-slate-200">{hero.defence}</div>
              <div className="rounded-lg bg-slate-950/40 text-center">
                <img src="/src/assets/icons/hero_stats/spellpower.png" alt="PODER" className="w-6 h-6 mx-auto mb-1" />
              </div>
              <div className="font-bold text-slate-200">{hero.spellPower}</div>
              <div className="rounded-lg bg-slate-950/40 text-center">
                <img src="/src/assets/icons/hero_stats/intelligence.png" alt="CONOC" className="w-6 h-6 mx-auto mb-1" />
              </div>
              <div className="font-bold text-slate-200">{hero.knowledge}</div>
            </div>'''
new = '''            <div className="grid grid-cols-4 gap-2 mt-4">
              <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800 text-center">
                <img src="/src/assets/icons/hero_stats/offence.png" alt="ATQ" className="w-5 h-5 mx-auto mb-1" />
                <div className="font-bold text-slate-200">{hero.attack}</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800 text-center">
                <img src="/src/assets/icons/hero_stats/defence.png" alt="DEF" className="w-5 h-5 mx-auto mb-1" />
                <div className="font-bold text-slate-200">{hero.defence}</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800 text-center">
                <img src="/src/assets/icons/hero_stats/spellpower.png" alt="PODER" className="w-5 h-5 mx-auto mb-1" />
                <div className="font-bold text-slate-200">{hero.spellPower}</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800 text-center">
                <img src="/src/assets/icons/hero_stats/intelligence.png" alt="CONOC" className="w-5 h-5 mx-auto mb-1" />
                <div className="font-bold text-slate-200">{hero.knowledge}</div>
              </div>
            </div>'''
content = content.replace(old, new)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed')
