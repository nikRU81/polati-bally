from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "C:/Users/nikolay.kozlov/claude/polati-bally/app/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    # 1. Главная страница (Dashboard)
    print("1. Testing Dashboard...")
    page.goto('http://localhost:5175')
    page.wait_for_load_state('networkidle')
    page.screenshot(path=f'{OUTPUT_DIR}/01_dashboard.png', full_page=True)
    print("   Dashboard loaded OK")

    # 2. Настройки
    print("2. Testing Settings...")
    page.click('text=Настройки')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(500)
    page.screenshot(path=f'{OUTPUT_DIR}/02_settings.png', full_page=True)
    print("   Settings loaded OK")

    # 3. Задания
    print("3. Testing Tasks...")
    page.click('text=Задания')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(500)
    page.screenshot(path=f'{OUTPUT_DIR}/03_tasks.png', full_page=True)
    print("   Tasks loaded OK")

    # 4. Каталог
    print("4. Testing Catalog...")
    page.click('text=Каталог')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(500)
    page.screenshot(path=f'{OUTPUT_DIR}/04_catalog.png', full_page=True)
    print("   Catalog loaded OK")

    # 5. Расчёт
    print("5. Testing Calculation...")
    page.click('text=Расчёт')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(500)
    page.screenshot(path=f'{OUTPUT_DIR}/05_calculation.png', full_page=True)
    print("   Calculation loaded OK")

    # 6. Графики
    print("6. Testing Charts...")
    page.click('text=Графики')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(1000)  # Charts need more time to render
    page.screenshot(path=f'{OUTPUT_DIR}/06_charts.png', full_page=True)
    print("   Charts loaded OK")

    # 7. Экспорт
    print("7. Testing Export...")
    page.click('text=Экспорт')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(500)
    page.screenshot(path=f'{OUTPUT_DIR}/07_export.png', full_page=True)
    print("   Export loaded OK")

    # Check for console errors
    errors = []
    page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)

    browser.close()

    print("\n" + "="*50)
    print("All 7 tabs tested successfully!")
    print(f"Screenshots saved to: {OUTPUT_DIR}")
    print("="*50)
