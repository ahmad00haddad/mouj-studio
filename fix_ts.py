import re

with open('src/lib/cms.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("export type Work = {", "export type Work = {\n  link?: string;")
content = content.replace("export type Track = {", "export type Track = {\n  link_url?: string;")

with open('src/lib/cms.ts', 'w', encoding='utf-8') as f:
    f.write(content)

with open('src/routes/__root.tsx', 'r', encoding='utf-8') as f:
    root = f.read()

root = root.replace("({ error, reset }: { error: Error; reset: () => void }) => (", "({ error, reset }: { error: any; reset: () => void }) => (")

with open('src/routes/__root.tsx', 'w', encoding='utf-8') as f:
    f.write(root)
