import asyncio
from playwright.async_api import async_playwright

async def get_pdf():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        # CV URL
        url = 'https://www.canva.com/design/DAGnDJRd7z4/thEzjBHAj_vtf4wM78gEAA/view'
        await page.goto(url, wait_until='networkidle', timeout=30000)
        await page.wait_for_timeout(5000)
        # Print to PDF
        await page.pdf(path="public/assets/mouje_cv.pdf", format="A4", print_background=True)
        await browser.close()
        print("PDF saved.")

asyncio.run(get_pdf())
