import asyncio
from playwright.async_api import async_playwright

async def scrape_soundcloud(url):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        print(f"Loading {url}...")
        try:
            await page.goto(url, wait_until='networkidle', timeout=20000)
            await page.wait_for_timeout(3000)
            text = await page.evaluate("Array.from(document.querySelectorAll('a.soundTitle__title')).map(a => a.innerText).join('\n')")
            await browser.close()
            return text
        except Exception as e:
            await browser.close()
            return str(e)

async def main():
    urls = [
        'https://soundcloud.com/motazdababseh',
        'https://soundcloud.com/mouje',
        'https://soundcloud.com/ertidad'
    ]
    
    with open('soundcloud_data.txt', 'w', encoding='utf-8') as f:
        for url in urls:
            f.write(f"=== {url} ===\n")
            text = await scrape_soundcloud(url)
            f.write(text + "\n\n")
    
    print("Done")

if __name__ == '__main__':
    asyncio.run(main())
