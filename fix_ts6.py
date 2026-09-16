with open('src/lib/cms.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("tags?: string[];", "tags: string[];")
content = content.replace("duration: 182,", "duration: 182,\n      tags: [],")
content = content.replace("duration: 147,", "duration: 147,\n      tags: [],")
content = content.replace("duration: 251,", "duration: 251,\n      tags: [],")
content = content.replace("duration: 277,", "duration: 277,\n      tags: [],")

with open('src/lib/cms.ts', 'w', encoding='utf-8') as f:
    f.write(content)
