import asyncio
from playwright.async_api import async_playwright

async def get_maps_reviews():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        # The short link redirects to the full Google Maps URL
        url = 'https://maps.app.goo.gl/26VcJefWEGD3Uu9KA'
        print("Navigating to Maps...")
        await page.goto(url, wait_until='networkidle', timeout=60000)
        await page.wait_for_timeout(5000)
        
        # Google Maps usually has a "Reviews" tab or shows reviews on the left pane.
        # It's tricky to click the reviews tab if the UI language varies, but we can try extracting visible text.
        # Let's just grab all text with class 'wiI7pd' (typical review text class) or just any large text block.
        print("Extracting text...")
        reviews = await page.evaluate('''() => {
            let els = document.querySelectorAll('.wiI7pd');
            if(els.length === 0) {
                // fallback: get all spans/divs that might be reviews
                return document.body.innerText;
            }
            return Array.from(els).map(e => e.innerText).join('\\n---REVIEW---\\n');
        }''')
        
        with open('maps_reviews.txt', 'w', encoding='utf-8') as f:
            f.write(reviews)
        print("Done!")
        await browser.close()

asyncio.run(get_maps_reviews())
