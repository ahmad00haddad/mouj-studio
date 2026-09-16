import json
import subprocess

with open('comments_out.txt', 'w', encoding='utf-8') as f:
    def get_comments(url):
        cmd = ['python', '-m', 'yt_dlp', '--dump-json', url]
        try:
            output = subprocess.check_output(cmd).decode('utf-8')
            data = json.loads(output)
            comments = data.get('comments', [])
            f.write(f"\n=== {data.get('title')} ===\n")
            if comments:
                for c in comments[:5]:
                    f.write(f"- {c.get('author')}: {c.get('text')}\n")
            else:
                f.write("No comments found.\n")
        except Exception as e:
            f.write(f"Error on {url}: {e}\n")

    get_comments("https://www.youtube.com/watch?v=1Rr1J74TVBE")
    get_comments("https://www.youtube.com/watch?v=Xo9oKRVmwdA")
    get_comments("https://www.youtube.com/watch?v=qGzOumAFimA")
    get_comments("https://www.youtube.com/watch?v=ivWObD7kW_c")
