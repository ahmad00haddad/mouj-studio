import asyncio
from playwright.async_api import async_playwright
import re

async def scrape_spotify(url):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        try:
            await page.goto(url, wait_until='networkidle', timeout=30000)
            await page.wait_for_timeout(3000)
            text = await page.evaluate("document.body.innerText")
            await browser.close()
            return text
        except Exception as e:
            await browser.close()
            return str(e)

async def main():
    url = 'https://open.spotify.com/artist/6xRx0cxS6FrZYDccwPQvbz'
    text = await scrape_spotify(url)
    with open('spotify_data.txt', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Done")

if __name__ == '__main__':
    asyncio.run(main())
