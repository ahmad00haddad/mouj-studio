import re

# ====== services.tsx ======
with open('src/routes/services.tsx', 'r', encoding='utf-8') as f:
    s = f.read()

# Add imports
if 'useI18n' not in s:
    s = s.replace('import { useCms, s as t } from "@/lib/useCms";', 'import { useCms, s as t } from "@/lib/useCms";\nimport { useI18n } from "@/lib/i18n";\nimport { T } from "@/lib/translations";')
    s = s.replace('const { content, services: dbServices } = useCms();', 'const { content, services: dbServices } = useCms();\n  const { lang } = useI18n();')

# Page header
s = re.sub(r'\{t\(content, "services_intro", "eyebrow", ".*?"\)\}', '{T[lang].services_page_eyebrow}', s)
s = re.sub(r'\{t\(content, "services_intro", "title", ".*?"\)\}', '{T[lang].services_page_title}', s)
s = re.sub(r'\{t\(content, "services_intro", "description", ".*?"\)\}', '{T[lang].services_page_desc}', s)

# Process section
s = s.replace('<span className="eyebrow">Process</span>', '<span className="eyebrow">{T[lang].process_eyebrow}</span>')
s = s.replace('<h2>How we <span className="accent" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>work</span></h2>', '<h2>{T[lang].process_title}</h2>')
s = s.replace('<p>A clear, collaborative path from idea to final master.</p>', '<p>{T[lang].process_desc}</p>')

# Process steps - replace the static data with a dynamic approach
old_steps = '''const processSteps = [
  { n: "01", title: "Discovery", text: "We listen first \u00ef?" brief, audience and the emotion you want to evoke." },
  { n: "02", title: "Pre-production", text: "Mood boards, references and a clear creative direction." },
  { n: "03", title: "Production", text: "Recording, scoring and design with award-winning engineers." },
  { n: "04", title: "Mix & Master", text: "Hybrid analog/digital mixing, broadcast-spec mastered." },
  { n: "05", title: "Delivery", text: "Every stem, format and spec you need \u00ef?" on time and on brief." },
];'''

new_steps = '''const getProcessSteps = (lang: "en" | "ar") => [
  { n: "01", title: lang === "ar" ? "\u0627\u0644\u0627\u0633\u062a\u0643\u0634\u0627\u0641" : "Discovery", text: lang === "ar" ? "\u0646\u0633\u062a\u0645\u0639 \u0623\u0648\u0644\u0627\u064b \u2014 \u0645\u0648\u062c\u0632 \u0627\u0644\u0645\u0634\u0631\u0648\u0639\u060c \u0627\u0644\u062c\u0645\u0647\u0648\u0631\u060c \u0648\u0627\u0644\u0645\u0634\u0627\u0639\u0631 \u0627\u0644\u062a\u064a \u062a\u0631\u064a\u062f \u0625\u064a\u0635\u0627\u0644\u0647\u0627." : "We listen first \u2014 brief, audience and the emotion you want to evoke." },
  { n: "02", title: lang === "ar" ? "\u0645\u0627 \u0642\u0628\u0644 \u0627\u0644\u0625\u0646\u062a\u0627\u062c" : "Pre-production", text: lang === "ar" ? "\u0644\u0648\u062d\u0627\u062a \u0645\u0632\u0627\u062c \u0648\u0645\u0631\u0627\u062c\u0639 \u0648\u062a\u0648\u062c\u0647 \u0625\u0628\u062f\u0627\u0639\u064a \u0648\u0627\u0636\u062d." : "Mood boards, references and a clear creative direction." },
  { n: "03", title: lang === "ar" ? "\u0627\u0644\u0625\u0646\u062a\u0627\u062c" : "Production", text: lang === "ar" ? "\u062a\u0633\u062c\u064a\u0644 \u0648\u062a\u0644\u062d\u064a\u0646 \u0648\u062a\u0635\u0645\u064a\u0645 \u0628\u0623\u064a\u062f\u064a \u0645\u0647\u0646\u062f\u0633\u064a\u0646 \u062d\u0627\u0635\u0644\u064a\u0646 \u0639\u0644\u0649 \u062c\u0648\u0627\u0626\u0632." : "Recording, scoring and design with award-winning engineers." },
  { n: "04", title: lang === "ar" ? "\u0627\u0644\u0645\u0643\u0633\u0627\u062c \u0648\u0627\u0644\u0645\u0627\u0633\u062a\u0631\u064a\u0646\u062c" : "Mix & Master", text: lang === "ar" ? "\u0645\u0643\u0633\u0627\u062c \u0647\u062c\u064a\u0646 \u0623\u0646\u0627\u0644\u0648\u062c/\u0631\u0642\u0645\u064a\u060c \u0645\u0627\u0633\u062a\u0631\u064a\u0646\u062c \u0648\u0641\u0642 \u0645\u0648\u0627\u0635\u0641\u0627\u062a \u0627\u0644\u0628\u062b." : "Hybrid analog/digital mixing, broadcast-spec mastered." },
  { n: "05", title: lang === "ar" ? "\u0627\u0644\u062a\u0633\u0644\u064a\u0645" : "Delivery", text: lang === "ar" ? "\u0643\u0644 \u0633\u062a\u064a\u0645 \u0648\u0635\u064a\u063a\u0629 \u0648\u0645\u0648\u0627\u0635\u0641\u0629 \u062a\u062d\u062a\u0627\u062c\u0647\u0627 \u2014 \u0641\u064a \u0627\u0644\u0648\u0642\u062a \u0627\u0644\u0645\u062d\u062f\u062f \u0648\u0628\u0627\u0644\u062c\u0648\u062f\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629." : "Every stem, format and spec you need \u2014 on time and on brief." },
];'''

s = re.sub(r'const processSteps = \[.*?\];', new_steps, s, flags=re.DOTALL)
s = s.replace('{processSteps.map(p =>', '{getProcessSteps(lang).map(p =>')

# Gear section
s = s.replace('<span className="eyebrow">Studio</span>', '<span className="eyebrow">{T[lang].gear_eyebrow}</span>')
s = s.replace('<h2>Hand-picked <span className="accent" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>gear</span></h2>', '<h2>{T[lang].gear_title}</h2>')
s = s.replace('<p>A curated locker of analog warmth and digital precision.</p>', '<p>{T[lang].gear_desc}</p>')

# FAQ section
s = s.replace('<span className="eyebrow">FAQ</span>', '<span className="eyebrow">{T[lang].faq_eyebrow}</span>')
s = s.replace('<h2>Frequently asked <span className="accent" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>questions</span></h2>', '<h2>{T[lang].faq_title}</h2>')

# FAQ items - replace static with dynamic
old_faqs = '''const faqs = [
  { q: "How long does a typical project take?", a: "A 30-second ad usually wraps in 3-5 days. A short film score takes 2-4 weeks. We always agree on a milestone schedule up front." },
  { q: "Do you work remotely with clients abroad?", a: "Yes. We deliver via Source-Connect, Audiomovers and shared sessions, with daily review links and revision rounds built into every quote." },
  { q: "Can you license existing music too?", a: "Absolutely \u00ef?" our music supervision team handles licensing, clearance and original commissions across local and international catalogs." },
  { q: "What deliverables do we receive?", a: "Final mix, stems, M&E, broadcast-spec masters and a documented session archive \u00ef?" everything you need to re-version later." },
];'''
new_faqs = '''const getFaqs = (lang: "en" | "ar") => [
  { q: T[lang].faq_q1, a: T[lang].faq_a1 },
  { q: T[lang].faq_q2, a: T[lang].faq_a2 },
  { q: T[lang].faq_q3, a: T[lang].faq_a3 },
  { q: T[lang].faq_q4, a: T[lang].faq_a4 },
];'''
s = re.sub(r'const faqs = \[.*?\];', new_faqs, s, flags=re.DOTALL)
s = s.replace('const [openFaq, setOpenFaq] = useState<number | null>(0);', 'const [openFaq, setOpenFaq] = useState<number | null>(0);\n  const faqs = getFaqs(lang);')

# Services CTA
s = re.sub(r'\{t\(content, "services_cta", "title", ".*?"\)\}', '{T[lang].services_cta_title}', s)
s = re.sub(r'\{t\(content, "services_cta", "description", ".*?"\)\}', '{T[lang].services_cta_desc}', s)
s = re.sub(r'\{t\(content, "services_cta", "buttonLabel", ".*?"\)\}', '{T[lang].services_cta_btn}', s)

with open('src/routes/services.tsx', 'w', encoding='utf-8') as f:
    f.write(s)
print('services done')
