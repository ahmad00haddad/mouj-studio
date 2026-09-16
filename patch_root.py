import re

with open('src/routes/__root.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add font to links
font_link = '      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" },'
content = content.replace('      { rel: "stylesheet", href: "https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" },', '      { rel: "stylesheet", href: "https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" },\n' + font_link)

# Add import
import_str = 'import { I18nProvider } from "@/lib/i18n";'
content = content.replace('import { usePlayer } from "@/lib/player";', 'import { usePlayer } from "@/lib/player";\n' + import_str)

# Wrap RootComponent return
old_return = '''  return (
    <QueryClientProvider client={queryClient}>'''

new_return = '''  return (
    <I18nProvider>
      <QueryClientProvider client={queryClient}>'''

content = content.replace(old_return, new_return)

old_end = '''      <ShortcutsHelp />
    </QueryClientProvider>
  );'''

new_end = '''      <ShortcutsHelp />
      </QueryClientProvider>
    </I18nProvider>
  );'''

content = content.replace(old_end, new_end)

with open('src/routes/__root.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print(content.find("I18nProvider"))
