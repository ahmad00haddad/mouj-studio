import re

with open('src/components/Footer.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

replacement = '''      <div className="footer-bottom" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <div>{copyright}</div>
        <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>
          Developed by <a href="https://haddad-dev.lovable.app/" target="_blank" rel="noreferrer" style={{ color: "var(--primary-glow)", textDecoration: "none", fontWeight: "bold" }}>Ahmad Haddad</a>
        </div>
      </div>'''

content = content.replace('<div className="footer-bottom">{copyright}</div>', replacement)

with open('src/components/Footer.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print(content.find("Ahmad Haddad"))
