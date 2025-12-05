from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.set_viewport_size({"width": 1400, "height": 1200})

    # Открываем приложение
    page.goto('http://localhost:5175')
    page.wait_for_load_state('networkidle')

    # Переходим на вкладку Расчёт
    calc_tab = page.locator('button:has-text("Расчёт")')
    calc_tab.click()
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(500)

    # Скриншот с инфляцией
    page.screenshot(path='/tmp/calc_01_with_inflation.png', full_page=True)
    print("1. Вкладка Расчёт с инфляцией")

    # Включаем режим без инфляции
    inflation_toggle = page.locator('button:has-text("С инфляцией"), button:has-text("Без инфляции")')
    if inflation_toggle.count() > 0:
        inflation_toggle.first.click()
        page.wait_for_timeout(500)
        page.screenshot(path='/tmp/calc_02_no_inflation.png', full_page=True)
        print("2. Вкладка Расчёт без инфляции")

    browser.close()
    print("\nТестирование завершено!")
