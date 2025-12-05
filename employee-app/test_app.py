from playwright.sync_api import sync_playwright
import os

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1280, 'height': 800})

    # Go to the app
    page.goto('http://localhost:5173')
    page.wait_for_load_state('networkidle')

    # Take screenshot of Dashboard
    screenshots_dir = os.path.dirname(os.path.abspath(__file__))
    page.screenshot(path=os.path.join(screenshots_dir, 'screenshots', 'dashboard.png'), full_page=True)
    print("Screenshot: Dashboard")

    # Click on Tasks tab
    page.click('text=Задания')
    page.wait_for_load_state('networkidle')
    page.screenshot(path=os.path.join(screenshots_dir, 'screenshots', 'tasks.png'), full_page=True)
    print("Screenshot: Tasks")

    # Click on Catalog tab
    page.click('text=Каталог')
    page.wait_for_load_state('networkidle')
    page.screenshot(path=os.path.join(screenshots_dir, 'screenshots', 'catalog.png'), full_page=True)
    print("Screenshot: Catalog")

    # Click on Cart tab
    page.click('text=Корзина')
    page.wait_for_load_state('networkidle')
    page.screenshot(path=os.path.join(screenshots_dir, 'screenshots', 'cart.png'), full_page=True)
    print("Screenshot: Cart")

    # Click on History tab
    page.click('text=История')
    page.wait_for_load_state('networkidle')
    page.screenshot(path=os.path.join(screenshots_dir, 'screenshots', 'history.png'), full_page=True)
    print("Screenshot: History")

    browser.close()
    print("All screenshots captured successfully!")
