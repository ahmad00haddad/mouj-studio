with open('src/lib/cms.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("role: string | null;", "role?: string | null;")
content = content.replace("external_url: string | null;", "external_url?: string | null;")
content = content.replace("tags: string[] | null;", "tags?: string[] | null;")

with open('src/lib/cms.ts', 'w', encoding='utf-8') as f:
    f.write(content)
