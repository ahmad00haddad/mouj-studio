import re

with open('src/lib/cms.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("export type Track = {\n  link_url?: string;", "export type Track = {\n  link_url?: string;\n  duration?: string;")

with open('src/lib/cms.ts', 'w', encoding='utf-8') as f:
    f.write(content)

with open('src/routes/__root.tsx', 'r', encoding='utf-8') as f:
    root = f.read()

root = re.sub(r'\{ error, reset \}:\s*\{ error: Error;\s*reset: \(\) => void \}', '{ error, reset }: any', root)

with open('src/routes/__root.tsx', 'w', encoding='utf-8') as f:
    f.write(root)
