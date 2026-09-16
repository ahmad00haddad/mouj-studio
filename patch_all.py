import re

# ====== index.tsx ======
with open('src/routes/index.tsx', 'r', encoding='utf-8') as f:
    idx = f.read()

# Stats - only fallbackStats
idx = idx.replace('const fallbackStats = [\n  { n: "13+", l: "Years in audio" },\n  { n: "10k", l: "Peak live listeners" },\n  { n: "150k+", l: "World Cup Radio reach" },', 'const fallbackStats = [\n  { n: "13+" },\n  { n: "10k" },\n  { n: "150k+" },')
idx = re.sub(r'\{ n: "80", l: "Episodes.*?" \}', '{ n: "80" }', idx)

# Stats display
idx = idx.replace('<h3>{s.n}</h3>\n              <p>{s.l}</p>', '<h3>{s.n}</h3>\n              <p>{lang === "en" ? [T["en"].stat_years, T["en"].stat_listeners, T["en"].stat_radio, T["en"].stat_episodes][stats.indexOf(s)] : [T["ar"].stat_years, T["ar"].stat_listeners, T["ar"].stat_radio, T["ar"].stat_episodes][stats.indexOf(s)]}</p>')

# Service learn more
idx = idx.replace('>Learn more <i', '>{T[lang].svc_learn_more} <i')

# Headings
idx = re.sub(r'\{t\(content, "home_services_intro", "eyebrow", ".*?"\)\}', '{T[lang].home_svc_eyebrow}', idx)
idx = re.sub(r'\{t\(content, "home_services_intro", "description", ".*?"\)\}', '{T[lang].home_svc_desc}', idx)
idx = re.sub(r'\{t\(content, "home_cta", "description", ".*?"\)\}', '{T[lang].home_cta_desc}', idx, flags=re.DOTALL)
idx = re.sub(r'\{t\(content, "home_cta", "buttonLabel", ".*?"\)\}', '{T[lang].home_cta_btn}', idx)

# hero pill/rig
idx = re.sub(r'\{t\(content, "home_hero", "pillTitle", ".*?"\)\}', '{T[lang].hero_pill_title}', idx)
idx = re.sub(r'\{t\(content, "home_hero", "pillSub", ".*?"\)\}', '{T[lang].hero_pill_sub}', idx)
idx = re.sub(r'\{t\(content, "home_hero", "rigTitle", ".*?"\)\}', '{T[lang].hero_rig_title}', idx)
idx = re.sub(r'\{t\(content, "home_hero", "rigDescription", ".*?"\)\}', '{T[lang].hero_rig_desc}', idx)
idx = re.sub(r'\{t\(content, "home_hero", "eyebrow", ".*?"\)\}', '{T[lang].hero_eyebrow}', idx)

# Services and CTA h2 (the split logic)
idx = re.sub(
    r'<h2>\{sp\[0\]\}<span[^>]+>\{sAccent\}</span>\{sp\[1\] \?\? ""\}</h2>',
    '<h2>{T[lang].home_svc_title}</h2>',
    idx, flags=re.DOTALL
)
idx = re.sub(
    r'<h2>\{cp\[0\]\}<span[^>]*>\{cAccent\}</span>\{cp\[1\] \?\? ""\}</h2>',
    '<h2>{T[lang].home_cta_title}</h2>',
    idx, flags=re.DOTALL
)

with open('src/routes/index.tsx', 'w', encoding='utf-8') as f:
    f.write(idx)
print('index done')
