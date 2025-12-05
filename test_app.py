from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    # 1. Открываем приложение
    page.goto('http://localhost:5175')
    page.wait_for_load_state('networkidle')

    # Скриншот главной страницы
    page.screenshot(path='/tmp/01_dashboard.png', full_page=True)
    print("1. Dashboard загружен")

    # 2. Кликаем на вкладку Матрица
    matrix_tab = page.locator('button:has-text("Матрица")')
    if matrix_tab.count() > 0:
        matrix_tab.click()
        page.wait_for_load_state('networkidle')
        page.wait_for_timeout(500)
        page.screenshot(path='/tmp/02_matrix.png', full_page=True)
        print("2. Вкладка Матрица открыта")
    else:
        print("2. ERROR: Вкладка Матрица не найдена!")

    # 3. Проверяем переключатель инфляции
    inflation_toggle = page.locator('button:has-text("С инфляцией"), button:has-text("Без инфляции")')
    if inflation_toggle.count() > 0:
        current_text = inflation_toggle.first.text_content()
        print(f"3. Переключатель найден: '{current_text}'")

        # Кликаем чтобы переключить
        inflation_toggle.first.click()
        page.wait_for_timeout(500)
        page.screenshot(path='/tmp/03_matrix_no_inflation.png', full_page=True)
        new_text = inflation_toggle.first.text_content()
        print(f"4. После переключения: '{new_text}'")
    else:
        print("3. ERROR: Переключатель инфляции не найден!")

    # 4. Проверяем вкладку Расчёт
    calc_tab = page.locator('button:has-text("Расчёт")')
    if calc_tab.count() > 0:
        calc_tab.click()
        page.wait_for_load_state('networkidle')
        page.wait_for_timeout(500)
        page.screenshot(path='/tmp/04_calculation_no_inflation.png', full_page=True)
        print("5. Вкладка Расчёт (без инфляции)")

    # 5. Переключаем обратно на инфляцию и проверяем Каталог
    inflation_toggle = page.locator('button:has-text("С инфляцией"), button:has-text("Без инфляции")')
    if inflation_toggle.count() > 0:
        inflation_toggle.first.click()
        page.wait_for_timeout(500)

    catalog_tab = page.locator('button:has-text("Каталог")')
    if catalog_tab.count() > 0:
        catalog_tab.click()
        page.wait_for_load_state('networkidle')
        page.wait_for_timeout(500)
        page.screenshot(path='/tmp/05_catalog.png', full_page=True)
        print("6. Вкладка Каталог (с инфляцией)")

    browser.close()
    print("\nТестирование завершено!")
