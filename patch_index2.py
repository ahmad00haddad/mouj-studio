import re
with open('src/routes/index.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(
    r'<p>\{t\(content, "home_hero", "subtitle", ".*?"\)\}</p>',
    r'<p>{T[lang].hero_desc}</p>',
    content
)

with open('src/routes/index.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
