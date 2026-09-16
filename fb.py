import asyncio
from playwright.async_api import async_playwright
import time

async def scrape_fb():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Using a mobile viewport often helps bypass some intrusive login walls on FB
        context = await browser.new_context(
            viewport={'width': 375, 'height': 812},
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
        )
        page = await context.new_page()
        print("Navigating to Facebook...")
        await page.goto("https://www.facebook.com/Motaz.D", wait_until='networkidle', timeout=60000)
        await page.wait_for_timeout(5000)
        
        # Try to scroll a bit
        for _ in range(3):
            await page.mouse.wheel(0, 1000)
            await page.wait_for_timeout(2000)
            
        print("Extracting text...")
        # Get all text from the page to see what's visible
        text = await page.evaluate("() => document.body.innerText")
        
        with open('fb_data.txt', 'w', encoding='utf-8') as f:
            f.write(text)
        print("Done!")
        await browser.close()

asyncio.run(scrape_fb())
