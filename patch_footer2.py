import re
with open('src/components/Footer.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

import_str = '''import { useI18n } from "@/lib/i18n";
import { T } from "@/lib/translations";'''

content = content.replace('import { useCms, s as t } from "@/lib/useCms";', 'import { useCms, s as t } from "@/lib/useCms";\n' + import_str)
content = content.replace('const { content } = useCms();', 'const { content } = useCms();\n  const { lang } = useI18n();')

# <h4>Explore</h4> -> <h4>{T[lang].footer_explore}</h4>
content = content.replace('<h4>Explore</h4>', '<h4>{T[lang].footer_explore}</h4>')
content = content.replace('<h4>Services</h4>', '<h4>{T[lang].footer_services}</h4>')
content = content.replace('<h4>Contact</h4>', '<h4>{T[lang].footer_contact}</h4>')
content = re.sub(r'\{t\(content, "site_footer", "tagline", ".*?"\)\}', '{T[lang].footer_tagline}', content)

content = content.replace('<Link to="/">Home</Link>', '<Link to="/">{T[lang].nav_home}</Link>')
content = content.replace('<Link to="/works">Works</Link>', '<Link to="/works">{T[lang].nav_works}</Link>')
content = content.replace('<Link to="/services">Services</Link>', '<Link to="/services">{T[lang].nav_services}</Link>')
content = content.replace('<Link to="/about">About</Link>', '<Link to="/about">{T[lang].nav_about}</Link>')
content = content.replace('<Link to="/contact">Contact</Link>', '<Link to="/contact">{T[lang].nav_contact}</Link>')

with open('src/components/Footer.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
