import asyncio
from playwright.async_api import async_playwright

async def scrape_canva(url):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        print(f"Loading {url}...")
        await page.goto(url, wait_until='networkidle', timeout=30000)
        
        # Give it a bit more time to render canvases or text divs
        await page.wait_for_timeout(5000)
        
        # Get all visible text on the page
        text = await page.evaluate('document.body.innerText')
        await browser.close()
        return text

async def main():
    cv_url = 'https://www.canva.com/design/DAGnDJRd7z4/thEzjBHAj_vtf4wM78gEAA/view'
    portfolio_url = 'https://www.canva.com/design/DAGfQe7y8pk/dfc0FvAPvirqfQ_qtNQzog/view'
    
    cv_text = await scrape_canva(cv_url)
    with open('canva_cv.txt', 'w', encoding='utf-8') as f:
        f.write(cv_text)
        
    port_text = await scrape_canva(portfolio_url)
    with open('canva_portfolio.txt', 'w', encoding='utf-8') as f:
        f.write(port_text)
    
    print("Done")

if __name__ == '__main__':
    asyncio.run(main())
