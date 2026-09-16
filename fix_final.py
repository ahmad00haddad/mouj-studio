import re

# ========== Fix contact.tsx ==========
with open('src/routes/contact.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

# Ensure single clean import block
if 'useI18n' not in c:
    c = c.replace(
        'from "@/lib/useCms";',
        'from "@/lib/useCms";\nimport { useI18n } from "@/lib/i18n";\nimport { T } from "@/lib/translations";',
        1
    )
if 'const { lang }' not in c:
    c = re.sub(r'(const \{ content \} = useCms\(\);)', r'\1\n  const { lang } = useI18n();', c)

with open('src/routes/contact.tsx', 'w', encoding='utf-8') as f:
    f.write(c)

# ========== Fix works.tsx - useI18n not in component ==========
with open('src/routes/works.tsx', 'r', encoding='utf-8') as f:
    w = f.read()

if 'useI18n' not in w:
    w = w.replace(
        'from "@/lib/useCms";',
        'from "@/lib/useCms";\nimport { useI18n } from "@/lib/i18n";\nimport { T } from "@/lib/translations";',
        1
    )
if 'const { lang } = useI18n();' not in w:
    w = re.sub(r'(const \{ content, works: dbWorks \} = useCms\(\);)', r'\1\n  const { lang } = useI18n();', w)

# Find and fix the remaining T[lang] uses that appear before lang is declared (module level)
# These are in lines 148-150 which look like getTabsAr()/getTabsEn() or similar
# Check what's on those lines
lines = w.split('\n')
for i, line in enumerate(lines):
    if 'T[lang]' in line and i < 50:
        print(f"Line {i+1}: {line[:80]}")

with open('src/routes/works.tsx', 'w', encoding='utf-8') as f:
    f.write(w)

# ========== Fix services.tsx ==========
with open('src/routes/services.tsx', 'r', encoding='utf-8') as f:
    s = f.read()

lines = s.split('\n')
for i, line in enumerate(lines):
    if 'lang' in line and i < 70:
        print(f"services L{i+1}: {line[:100]}")

with open('src/routes/services.tsx', 'w', encoding='utf-8') as f:
    f.write(s)
