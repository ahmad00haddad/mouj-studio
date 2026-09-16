import re

with open('src/components/Navbar.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

import_str = '''import { useI18n } from "@/lib/i18n";
import { T } from "@/lib/translations";'''

content = content.replace('import { usePlayer, toggleMute } from "@/lib/player";', 'import { usePlayer, toggleMute } from "@/lib/player";\n' + import_str)

button_str = '''          <button onClick={toggle} className="btn btn-sm" style={{ padding: "0.35rem 0.85rem", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)", color: "#fff", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em", marginRight: "1rem" }}>
            {lang === "en" ? "عربي" : "EN"}
          </button>'''

content = content.replace('const player = usePlayer();', 'const player = usePlayer();\n  const { lang, toggle } = useI18n();')
content = content.replace('{l.label}', '{l.to === "/" ? T[lang].nav_home : l.to === "/works" ? T[lang].nav_works : l.to === "/about" ? T[lang].nav_about : l.label}')
content = content.replace('What We Do <i className="bx bx-chevron-down"></i>', '{T[lang].nav_services} <i className="bx bx-chevron-down"></i>')

target = '''<button
              type="button"
              className={
av-mute}'''
content = content.replace(target, button_str + '\n            ' + target)

with open('src/components/Navbar.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print(content.find("toggleMute"))
