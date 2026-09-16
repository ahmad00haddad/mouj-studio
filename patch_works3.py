import re

# ====== works.tsx ======
with open('src/routes/works.tsx', 'r', encoding='utf-8') as f:
    w = f.read()

if 'useI18n' not in w:
    w = w.replace('import { useCms, s as t, list } from "@/lib/useCms";', 'import { useCms, s as t, list } from "@/lib/useCms";\nimport { useI18n } from "@/lib/i18n";\nimport { T } from "@/lib/translations";')
    w = re.sub(r'const \{ content, works: dbWorks \} = useCms\(\);', 'const { content, works: dbWorks } = useCms();\n  const { lang } = useI18n();', w)

# Page head
w = re.sub(r'\{t\(content, "works_intro", "eyebrow", ".*?"\)\}', '{T[lang].works_eyebrow}', w)
w = re.sub(r'\{t\(content, "works_intro", "title", ".*?"\)\}', '{T[lang].works_title}', w)
w = re.sub(r'\{t\(content, "works_intro", "description", ".*?"\)\}', '{T[lang].works_desc}', w)

# Filter buttons (hardcoded All, Featured, etc.)
w = w.replace('"All"', 'T[lang].works_filter_all')
w = w.replace('"Featured"', 'T[lang].works_filter_featured')
w = w.replace('"Advertising"', 'T[lang].works_filter_advertising')
w = w.replace('"Film & TV"', 'T[lang].works_filter_film')
w = w.replace('"Games"', 'T[lang].works_filter_games')
w = w.replace('"Podcasts"', 'T[lang].works_filter_podcasts')
w = w.replace('"Sound & Mix"', 'T[lang].works_filter_sound_mix')

# Load more / show less
w = w.replace('>Load more<', '>{T[lang].works_load_more}<')
w = w.replace('>Show less<', '>{T[lang].works_show_less}<')
w = w.replace('>Load more testimonials<', '>{T[lang].testimonials_load_more}<')
w = w.replace('>Show less<', '>{T[lang].testimonials_show_less}<')

# Testimonials heading
w = re.sub(r'<span className="eyebrow">What clients say</span>', '<span className="eyebrow">{T[lang].testimonials_eyebrow}</span>', w)
w = re.sub(r'<h2>.*?Testimonials.*?about Mouje.*?</h2>', '<h2>{T[lang].testimonials_title}</h2>', w, flags=re.DOTALL)

# Xetopia eyebrow
w = w.replace('>Upcoming LP<', '>{T[lang].xetopia_eyebrow}<')

# Vault section
w = re.sub(r'<span className="eyebrow">From The Vault</span>', '<span className="eyebrow">{T[lang].vault_eyebrow}</span>', w)
w = re.sub(r'<h2>Deep Roots</h2>', '<h2>{T[lang].vault_title}</h2>', w)
w = re.sub(r'<p>Looking back at the foundations.*?</p>', '<p>{T[lang].vault_desc}</p>', w, flags=re.DOTALL)

with open('src/routes/works.tsx', 'w', encoding='utf-8') as f:
    f.write(w)
print('works done')
