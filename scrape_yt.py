import asyncio
from playwright.async_api import async_playwright

async def scrape_youtube(url):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        try:
            await page.goto(url, wait_until='networkidle', timeout=30000)
            await page.wait_for_timeout(3000)
            # get all video titles
            titles = await page.evaluate("Array.from(document.querySelectorAll('a#video-title')).map(a => a.innerText)")
            await browser.close()
            return '\n'.join(titles)
        except Exception as e:
            await browser.close()
            return str(e)

async def main():
    url = 'https://www.youtube.com/@Moujemusic/videos'
    text = await scrape_youtube(url)
    with open('yt_data.txt', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Done")

if __name__ == '__main__':
    asyncio.run(main())
