import re

# ====== Footer.tsx ======
with open('src/components/Footer.tsx', 'r', encoding='utf-8') as f:
    foot = f.read()

foot = re.sub(r'© 2026 Mouje Studio\. All rights reserved\.', '{T[lang].footer_rights}', foot)
foot = re.sub(r'>Developed by<', '>{T[lang].footer_dev_credit}<', foot)

# Fix link labels if still hardcoded
foot = foot.replace('>Home<', '>{T[lang].nav_home}<')
foot = foot.replace('>Works<', '>{T[lang].nav_works}<')

with open('src/components/Footer.tsx', 'w', encoding='utf-8') as f:
    f.write(foot)
print('footer done')

# ====== Contact page ======
import os
contact_path = 'src/routes/contact.tsx'
if os.path.exists(contact_path):
    with open(contact_path, 'r', encoding='utf-8') as f:
        c = f.read()
    if 'useI18n' not in c:
        c = re.sub(r'^(import .+useCms.+;)', r'\1\nimport { useI18n } from "@/lib/i18n";\nimport { T } from "@/lib/translations";', c)
        c = re.sub(r'(function Contact\w*\(\)[^{]*\{)', r'\1\n  const { lang } = useI18n();', c)
    c = re.sub(r'\{t\(content, "contact_intro", "eyebrow", ".*?"\)\}', '{T[lang].contact_eyebrow}', c)
    c = re.sub(r'\{t\(content, "contact_intro", "title", ".*?"\)\}', '{T[lang].contact_title}', c)
    c = re.sub(r'\{t\(content, "contact_intro", "description", ".*?"\)\}', '{T[lang].contact_desc}', c, flags=re.DOTALL)
    c = re.sub(r'placeholder="Your name"', 'placeholder={T[lang].contact_name}', c)
    c = re.sub(r'placeholder="Your email"', 'placeholder={T[lang].contact_email}', c)
    c = re.sub(r'placeholder="Tell us about your project.*?"', 'placeholder={T[lang].contact_message}', c)
    c = re.sub(r'>Send message<', '>{T[lang].contact_send}<', c)
    with open(contact_path, 'w', encoding='utf-8') as f:
        f.write(c)
    print('contact done')
else:
    print('no contact.tsx')
