import re

with open('src/routes/index.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

import_str = '''import { useI18n } from "@/lib/i18n";
import { T } from "@/lib/translations";'''

content = content.replace('import { useCms, s as t, list } from "@/lib/useCms";', 'import { useCms, s as t, list } from "@/lib/useCms";\n' + import_str)
content = content.replace('const { content, services: dbServices } = useCms();', 'const { content, services: dbServices } = useCms();\n  const { lang } = useI18n();')

# Replace the hero text directly
content = content.replace('<h1>{hp[0]}<span className="accent">{heroAccent}</span>{hp[1] ?? ""}</h1>', '<h1>{T[lang].hero_title}</h1>')
content = content.replace('<p>{t(content, "home_hero", "subtitle", "We craft music, mixes and sonic worlds for film, brands and games ?" from the first note to the final master, all under one roof.")}</p>', '<p>{T[lang].hero_desc}</p>')
content = content.replace('{t(content, "home_hero", "ctaPrimaryLabel", "Start a project")}', '{T[lang].hero_btn_contact}')
content = content.replace('{t(content, "home_hero", "ctaSecondaryLabel", "View our works")}', '{T[lang].hero_btn_works}')

with open('src/routes/index.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print(content.find("T[lang].hero_title"))
