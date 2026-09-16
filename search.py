import asyncio
from playwright.async_api import async_playwright

async def search_google():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        # Search YouTube specifically for Motaz Dababseh
        await page.goto("https://www.youtube.com/results?search_query=Motaz+Dababseh", wait_until='networkidle', timeout=30000)
        await page.wait_for_timeout(3000)
        
        # Get video titles and channels
        results = await page.evaluate('''() => {
            return Array.from(document.querySelectorAll('ytd-video-renderer')).map(el => {
                let title = el.querySelector('#video-title')?.innerText || '';
                let channel = el.querySelector('#channel-name')?.innerText || '';
                let url = el.querySelector('#video-title')?.href || '';
                return Title: \nChannel: \nURL: \n;
            }).join('\\n');
        }''')
        
        # Search Google
        await page.goto("https://www.google.com/search?q=%22Motaz+Dababseh%22+OR+%22Mouje%22+music+audio+interview", wait_until='networkidle', timeout=30000)
        await page.wait_for_timeout(3000)
        
        google_results = await page.evaluate('''() => {
            return Array.from(document.querySelectorAll('div.g')).map(el => {
                let title = el.querySelector('h3')?.innerText || '';
                let desc = el.querySelector('.VwiC3b')?.innerText || '';
                let url = el.querySelector('a')?.href || '';
                return Google Title: \nDesc: \nURL: \n;
            }).join('\\n');
        }''')
        
        await browser.close()
        return "=== YOUTUBE ===\n" + results + "\n=== GOOGLE ===\n" + google_results

async def main():
    res = await search_google()
    with open('agent_reach_search.txt', 'w', encoding='utf-8') as f:
        f.write(res)
    print("Done")

if __name__ == '__main__':
    asyncio.run(main())
