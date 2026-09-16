import re

with open('src/components/Navbar.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('{l.to === "/" ? T[lang].nav_home : l.to === "/works" ? T[lang].nav_works : l.to === "/about" ? T[lang].nav_about : l.label}', '{l.to === "/" ? T[lang].nav_home : l.to === "/works" ? T[lang].nav_works : T[lang].nav_about}')

with open('src/components/Navbar.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
