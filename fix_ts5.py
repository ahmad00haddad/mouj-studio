with open('src/lib/cms.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("tags: string[];", "tags?: string[];")

with open('src/lib/cms.ts', 'w', encoding='utf-8') as f:
    f.write(content)
