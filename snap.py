import asyncio
from playwright.async_api import async_playwright

async def snap():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        print("Navigating...")
        await page.goto('https://maps.app.goo.gl/26VcJefWEGD3Uu9KA', wait_until='networkidle', timeout=60000)
        await page.wait_for_timeout(5000)
        await page.screenshot(path="public/assets/maps.png")
        print("Screenshot saved to public/assets/maps.png")
        await browser.close()

asyncio.run(snap())
