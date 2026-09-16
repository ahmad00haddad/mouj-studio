import asyncio
from playwright.async_api import async_playwright
import time

async def grab():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        print("Navigating...")
        await page.goto('https://maps.app.goo.gl/26VcJefWEGD3Uu9KA', wait_until='domcontentloaded', timeout=60000)
        # give it 10 seconds to render the JS
        await page.wait_for_timeout(10000)
        
        html = await page.content()
        with open('maps.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print("Done")
        await browser.close()

asyncio.run(grab())
