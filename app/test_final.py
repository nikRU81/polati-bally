from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "C:/Users/nikolay.kozlov/claude/polati-bally/app/screenshots"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    page.goto('http://localhost:5175')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(1000)

    page.screenshot(path=f'{OUTPUT_DIR}/final_dashboard.png', full_page=True)
    print("Final screenshot saved - Export tab removed")

    browser.close()
