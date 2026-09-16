import re
from bs4 import BeautifulSoup

with open('maps.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

reviews = soup.find_all(class_='wiI7pd')
print(f"Found {len(reviews)} reviews")
for i, r in enumerate(reviews):
    print(f"--- Review {i+1} ---")
    print(r.get_text())

if len(reviews) == 0:
    print("Trying alternative classes...")
    # Sometimes google maps doesn't render reviews immediately without clicking the "Reviews" tab
    texts = soup.find_all('span', class_='wiI7pd')
    for t in texts:
        print(t.get_text())
