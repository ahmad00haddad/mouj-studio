with open('src/lib/cms.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("duration?: string;", "duration?: number;")

with open('src/lib/cms.ts', 'w', encoding='utf-8') as f:
    f.write(content)
