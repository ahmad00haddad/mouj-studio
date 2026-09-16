import re

# Fix contact.tsx imports - the regex put import in wrong spot
with open('src/routes/contact.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

# Remove bad injection
c = re.sub(r'\nimport \{ useI18n \} from "@/lib/i18n";\nimport \{ T \} from "@/lib/translations";\nimport \{ useI18n \} from "@/lib/i18n";\nimport \{ T \} from "@/lib/translations";', '\nimport { useI18n } from "@/lib/i18n";\nimport { T } from "@/lib/translations";', c)

if 'useI18n' not in c:
    c = c.replace('from "@/lib/useCms";', 'from "@/lib/useCms";\nimport { useI18n } from "@/lib/i18n";\nimport { T } from "@/lib/translations";')

# Make sure lang is declared inside component function
if 'const { lang }' not in c:
    c = re.sub(r'(const \{ content \} = useCms\(\);)', r'\1\n  const { lang } = useI18n();', c)

with open('src/routes/contact.tsx', 'w', encoding='utf-8') as f:
    f.write(c)

# Fix works.tsx - T[lang] used in module-level constants before component
with open('src/routes/works.tsx', 'r', encoding='utf-8') as f:
    w = f.read()

# The filter tabs were replaced with T[lang]... at module level - revert to static strings
w = w.replace('T[lang].works_filter_all', '"All"')
w = w.replace('T[lang].works_filter_featured', '"Featured"')
w = w.replace('T[lang].works_filter_advertising', '"Advertising"')
w = w.replace('T[lang].works_filter_film', '"Film & TV"')
w = w.replace('T[lang].works_filter_games', '"Games"')
w = w.replace('T[lang].works_filter_podcasts', '"Podcasts"')
w = w.replace('T[lang].works_filter_sound_mix', '"Sound & Mix"')

# Now add dynamic filters inside the component - find the tabs array usage
w = re.sub(
    r'const tabs = \["All", "Featured", "Advertising", "Film & TV", "Games", "Podcasts", "Sound & Mix"\];',
    'const getTabsEn = () => ["All", "Featured", "Advertising", "Film & TV", "Games", "Podcasts", "Sound & Mix"];\nconst getTabsAr = () => ["الكل", "مميزة", "إعلانات", "أفلام وتلفزيون", "ألعاب", "بودكاست", "صوت وميكساج"];',
    w
)

# Make sure useI18n is called inside component
if 'const { lang } = useI18n();' not in w:
    w = re.sub(r'(const \{ content, works: dbWorks \} = useCms\(\);)', r'\1\n  const { lang } = useI18n();', w)

# Replace tabs usage
w = w.replace('{tabs.map(tab =>', '{(lang === "ar" ? getTabsAr() : getTabsEn()).map((tab, tabIdx) =>')
w = w.replace('{tab}', '{lang === "ar" ? getTabsAr()[tabIdx] : tab}')
# Fix the filter logic - tabs are now English always for filtering
w = re.sub(r'tab === filter', 'getTabsEn()[tabIdx] === filter', w)
w = re.sub(r"setFilter\(tab\)", "setFilter(getTabsEn()[tabIdx])", w)

with open('src/routes/works.tsx', 'w', encoding='utf-8') as f:
    f.write(w)

# Fix services.tsx - lang used before declaration
with open('src/routes/services.tsx', 'r', encoding='utf-8') as f:
    s = f.read()

if 'const { lang } = useI18n();' not in s:
    s = re.sub(r'(const \{ content, services: dbServices \} = useCms\(\);)', r'const { lang } = useI18n();\n  \1', s)

with open('src/routes/services.tsx', 'w', encoding='utf-8') as f:
    f.write(s)

# Fix index.tsx stats
with open('src/routes/index.tsx', 'r', encoding='utf-8') as f:
    idx = f.read()

# Replace the broken stats fallback & display with cleaner solution
idx = re.sub(
    r'const fallbackStats = \[.*?\];',
    '''const fallbackStats = [
  { n: "13+", l: "stat_years" },
  { n: "10k", l: "stat_listeners" },
  { n: "150k+", l: "stat_radio" },
  { n: "80", l: "stat_episodes" },
];''',
    idx, flags=re.DOTALL
)
# Display using T[lang][s.l as key]
idx = idx.replace(
    '<h3>{s.n}</h3>\n              <p>{lang === "en" ? [T["en"].stat_years, T["en"].stat_listeners, T["en"].stat_radio, T["en"].stat_episodes][stats.indexOf(s)] : [T["ar"].stat_years, T["ar"].stat_listeners, T["ar"].stat_radio, T["ar"].stat_episodes][stats.indexOf(s)]}</p>',
    '<h3>{s.n}</h3>\n              <p>{T[lang][s.l as keyof typeof T["en"]]}</p>'
)

with open('src/routes/index.tsx', 'w', encoding='utf-8') as f:
    f.write(idx)

print('all fixes done')
