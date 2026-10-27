import os
import asyncio
from playwright.async_api import async_playwright

OUT_DIR = "/Users/felipeandresvivancocornejo/.gemini/antigravity/brain/e03abb34-78a0-4a1e-aec4-2be226463fba/puelche_audit"
os.makedirs(OUT_DIR, exist_ok=True)

PAGES = [
    ("home", "http://localhost:3002/"),
    ("portafolio", "http://localhost:3002/portafolio"),
    ("fotografia", "http://localhost:3002/servicios/fotografia"),
    ("desarrollo_web", "http://localhost:3002/servicios/desarrollo-web"),
    ("clientes", "http://localhost:3002/clientes"),
    ("contacto", "http://localhost:3002/contacto"),
]

VIEWPORTS = [
    ("1440_desktop", 1440, 900),
    ("768_tablet", 768, 1024),
    ("375_mobile", 375, 812),
]

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        for page_name, url in PAGES:
            for vp_name, width, height in VIEWPORTS:
                context = await browser.new_context(
                    viewport={"width": width, "height": height},
                    device_scale_factor=1,
                )
                page = await context.new_page()
                try:
                    await page.goto(url, wait_until="networkidle", timeout=15000)
                except Exception as e:
                    print(f"Warning on {url}: {e}")
                    await page.goto(url, wait_until="load")

                await asyncio.sleep(1) # wait for Lenis and font render
                out_path = os.path.join(OUT_DIR, f"{page_name}_{vp_name}.png")
                await page.screenshot(path=out_path, full_page=False)
                print(f"Captured: {out_path}")
                await context.close()
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
