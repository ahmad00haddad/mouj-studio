from duckduckgo_search import DDGS

try:
    with DDGS() as ddgs:
        results = ddgs.text('Motaz Dababseh', max_results=10)
        for r in results:
            print(f"{r['title']} - {r['href']}")
except Exception as e:
    print(e)
