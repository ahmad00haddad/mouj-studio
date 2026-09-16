import re

# ====== about.tsx ======
with open('src/routes/about.tsx', 'r', encoding='utf-8') as f:
    a = f.read()

# Add imports
if 'useI18n' not in a:
    a = a.replace('import { useCms, s as t, list } from "@/lib/useCms";', 'import { useCms, s as t, list } from "@/lib/useCms";\nimport { useI18n } from "@/lib/i18n";\nimport { T } from "@/lib/translations";')
    a = a.replace('const { content } = useCms();', 'const { content } = useCms();\n  const { lang } = useI18n();')

# About intro
a = re.sub(r'\{t\(content, "about_intro", "eyebrow", ".*?"\)\}', '{T[lang].about_eyebrow}', a)
a = re.sub(r'\{t\(content, "about_intro", "title", ".*?"\)\}', '{T[lang].about_title}', a)
a = re.sub(r'\{t\(content, "about_intro", "description", ".*?"\)\}', '{T[lang].about_desc}', a, flags=re.DOTALL)

# Buttons
a = a.replace('>See our works<', '>{T[lang].about_btn_works}<')
a = a.replace('>Get in touch<', '>{T[lang].about_btn_contact}<')

# Pillars section
a = a.replace('<span className="eyebrow">Pillars</span>', '<span className="eyebrow">{T[lang].pillars_eyebrow}</span>')
a = re.sub(r'<h2>What we <span[^>]*>stand for</span></h2>', '<h2>{T[lang].pillars_title}</h2>', a)

# Founder
a = a.replace('<span className="eyebrow">Founder</span>', '<span className="eyebrow">{T[lang].founder_eyebrow}</span>')
a = re.sub(r'<h2>Meet <span[^>]*>\{founderName\}</span></h2>', '<h2>{T[lang].founder_prefix} <span className="accent" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{founderName}</span></h2>', a)
a = a.replace('<h3>Bio</h3>', '<h3>{T[lang].founder_bio_label}</h3>')
a = a.replace('<h3>Skills</h3>', '<h3>{T[lang].founder_skills_label}</h3>')
a = a.replace('<h3>Connect</h3>', '<h3>{T[lang].founder_connect_label}</h3>')
a = a.replace('>Download Full Resume<', '>{T[lang].founder_cv_btn}<')

# Behind the scenes
a = a.replace('<span className="eyebrow">Behind The Scenes</span>', '<span className="eyebrow">{T[lang].bts_eyebrow}</span>')
a = re.sub(r'<h2>The <span[^>]*>Process</span></h2>', '<h2>{T[lang].bts_title}</h2>', a)
a = a.replace('<p>Peek into the workflow and engineering behind the tracks.</p>', '<p>{T[lang].bts_desc}</p>')
a = re.sub(r'<h3 style=\{.*?\}>Project Breakdown: Rah Telhaqni</h3>', '<h3 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1.5rem" }}>{T[lang].bts_project_title}</h3>', a)
a = re.sub(r'<p style=\{.*?\}>\s*Ever wondered.*?mix\.\s*</p>', '<p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "800px", fontSize: "1.1rem" }}>{T[lang].bts_project_desc}</p>', a, flags=re.DOTALL)
a = a.replace('> Watch the Breakdown on YouTube', '> {T[lang].bts_watch_btn}')

# Experience
a = a.replace('<span className="eyebrow">Experience</span>', '<span className="eyebrow">{T[lang].experience_eyebrow}</span>')
a = re.sub(r'<h2>A decade of <span[^>]*>sound work</span></h2>', '<h2>{T[lang].experience_title}</h2>', a)

# Projects
a = a.replace('<span className="eyebrow">Highlighted projects</span>', '<span className="eyebrow">{T[lang].projects_eyebrow}</span>')
a = re.sub(r'<h2>Selected <span[^>]*>case studies</span></h2>', '<h2>{T[lang].projects_title}</h2>', a)

# Toolbox
a = a.replace('<span className="eyebrow">Toolbox</span>', '<span className="eyebrow">{T[lang].toolbox_eyebrow}</span>')
a = re.sub(r'<h2>Tools we <span[^>]*>work with</span></h2>', '<h2>{T[lang].toolbox_title}</h2>', a)

# Clients
a = a.replace('<span className="eyebrow">Worked with</span>', '<span className="eyebrow">{T[lang].clients_eyebrow}</span>')
a = re.sub(r'<h2>Trusted by <span[^>]*>great teams</span></h2>', '<h2>{T[lang].clients_title}</h2>', a)

# Values
a = a.replace('<span className="eyebrow">Values</span>', '<span className="eyebrow">{T[lang].values_eyebrow}</span>')
a = re.sub(r'<h2>How we <span[^>]*>operate</span></h2>', '<h2>{T[lang].values_title}</h2>', a)

# About CTA
a = re.sub(r"<h2>Let's build something <span className=\"accent\">unforgettable</span>\.</h2>", '<h2>{T[lang].about_cta_title}</h2>', a)
a = a.replace("<p>Whether you have a brief or just an idea, we'd love to hear it.</p>", '<p>{T[lang].about_cta_desc}</p>')
a = a.replace('>Start the conversation <i', '>{T[lang].about_cta_btn} <i')

with open('src/routes/about.tsx', 'w', encoding='utf-8') as f:
    f.write(a)
print('about done')
