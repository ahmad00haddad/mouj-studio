import json
import glob
import os

files = glob.glob('*.info.json')

with open('parsed_comments.txt', 'w', encoding='utf-8') as out:
    for f in files:
        out.write(f"\n\n=== {os.path.basename(f)} ===\n")
        with open(f, 'r', encoding='utf-8') as jf:
            try:
                data = json.load(jf)
                comments = data.get('comments', [])
                if comments:
                    for c in comments[:20]: # get first 20
                        # only get top-level comments (not replies, or just print all)
                        text = c.get('text', '').replace('\n', ' ')
                        author = c.get('author', 'Unknown')
                        like_count = c.get('like_count', 0)
                        if like_count > 0 or author == "Madeon": # prioritize liked comments
                            out.write(f"[{like_count} likes] {author}: {text}\n")
            except Exception as e:
                out.write(f"Error parsing: {e}\n")
