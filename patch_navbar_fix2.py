import re

with open('src/components/Navbar.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

button_str = '''<button onClick={toggle} className="btn btn-sm" style={{ padding: "0.35rem 0.85rem", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)", color: "#fff", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em", marginRight: "1rem" }}>{lang === "en" ? "عربي" : "EN"}</button>'''

content = re.sub(
    r'(<button\s+type="button"\s+className=\{
av-mute)',
    button_str + r'\n            \1',
    content
)

with open('src/components/Navbar.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Check:", content.find("عربي"))
