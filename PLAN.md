# План разработки: ПОЛАТИ БАЛЛЫ Calculator

## Технологический стек

- **Framework**: React 18 + TypeScript
- **Сборка**: Vite
- **Стилизация**: Tailwind CSS
- **Графики**: Recharts
- **Работа с CSV**: PapaParse
- **Экспорт PDF**: jsPDF + jspdf-autotable
- **Форматирование чисел**: Intl.NumberFormat (русская локаль)

---

## Архитектура: Single Page Application с вкладками

### Структура вкладок (горизонтальное меню сверху)

| # | Вкладка | Описание | Основной функционал |
|---|---------|----------|---------------------|
| 1 | **Главная** | Дашборд с ключевыми показателями | Сводка проверок, быстрый обзор результатов |
| 2 | **Настройки** | Параметры программы | Ползунки и поля ввода для всех параметров |
| 3 | **Задания** | Редактор заданий | Таблица заданий, фильтры, редактирование баллов |
| 4 | **Каталог** | Каталог товаров | Просмотр товаров, цены с инфляцией по годам |
| 5 | **Расчёт** | Итоговая таблица | Полная таблица расчёта с проверками |
| 6 | **Графики** | Визуализация | Графики бюджета, начислений, покупательной способности |
| 7 | **Экспорт** | Экспорт данных | CSV, PDF, JSON экспорт |

---

## Детальное описание каждой вкладки

### Вкладка 1: Главная (Dashboard)

**Назначение**: Быстрый обзор состояния программы

**Компоненты**:
1. **Карточки KPI** (4 шт.):
   - Средний бюджет в год
   - Среднее начисление в год
   - Отклонение от бюджета (%)
   - Статус всех проверок (✅/❌)

2. **Мини-таблица**: Итоги по годам (год, бюджет, итого, статус)

3. **Статус проверок**:
   - Проверка 1: Среднее отклонение ≤ 2%
   - Проверка 2: Нарастающий итог ≥ бюджета
   - Проверка 3: Покупательная способность

4. **Краткий график**: Бюджет vs Начисления (sparkline)

**Файлы**:
- `src/components/Dashboard/Dashboard.tsx`
- `src/components/Dashboard/KPICard.tsx`
- `src/components/Dashboard/StatusChecks.tsx`
- `src/components/Dashboard/MiniChart.tsx`

---

### Вкладка 2: Настройки (Settings)

**Назначение**: Настройка параметров программы

**Компоненты**:
1. **Секция "Зарплата и бюджет"**:
   - Базовая ЗП (ползунок 500K - 5M)
   - Процент бюджета (ползунок 0.1% - 10%)

2. **Секция "Инфляция"**:
   - Годовая инфляция (ползунок 0% - 50%)

3. **Секция "Индексация"**:
   - Период индексации (ползунок 1-10 лет)
   - Коэффициент индексации (ползунок 1.0 - 3.0)

4. **Секция "Моделирование"**:
   - Период моделирования (ползунок 1-10 лет)
   - Год начала программы (выпадающий список)

5. **Секция "Допуски"**:
   - Макс. отклонение от бюджета (%)
   - Округление добавок (100/500/1000)
   - Округление баллов (10)

6. **Кнопки**:
   - "Сбросить к умолчаниям"
   - "Загрузить из файла"

**Файлы**:
- `src/components/Settings/Settings.tsx`
- `src/components/Settings/SettingsSection.tsx`
- `src/components/Settings/SliderInput.tsx`
- `src/components/Settings/NumberInput.tsx`

---

### Вкладка 3: Задания (Tasks)

**Назначение**: Просмотр и редактирование заданий

**Компоненты**:
1. **Фильтры** (горизонтальная панель):
   - По категории (dropdown: все/Обучение/Смены/Карьера/...)
   - По периодичности (once/yearly/conditional)
   - По году применения (1-5/all)
   - Поиск по названию

2. **Таблица заданий**:
   - ID, Категория, Название, Баллы, Периодичность, Вероятность, Год
   - Inline-редактирование баллов
   - Сортировка по столбцам

3. **Статистика**:
   - Всего заданий
   - Сумма базовых баллов
   - По категориям (pie chart mini)

4. **Действия**:
   - Добавить задание
   - Удалить выбранные
   - Сбросить к исходным

**Файлы**:
- `src/components/Tasks/Tasks.tsx`
- `src/components/Tasks/TasksFilter.tsx`
- `src/components/Tasks/TasksTable.tsx`
- `src/components/Tasks/TaskRow.tsx`
- `src/components/Tasks/TaskStats.tsx`

---

### Вкладка 4: Каталог (Catalog)

**Назначение**: Просмотр товаров и цен

**Компоненты**:
1. **Карточки товаров** (grid layout):
   - Название
   - Базовая цена
   - Категория (anchor/dynamic)
   - Метка референсного товара

2. **Таблица цен по годам**:
   - Товар | Год 1 | Год 2 | Год 3 | Год 4 | Год 5
   - Цены с учётом инфляции

3. **Выделение референсного товара**:
   - Подсветка "Сумка ПОЛАТИ"
   - Показ: можно ли купить в каждый год

**Файлы**:
- `src/components/Catalog/Catalog.tsx`
- `src/components/Catalog/ProductCard.tsx`
- `src/components/Catalog/PriceTable.tsx`

---

### Вкладка 5: Расчёт (Calculation)

**Назначение**: Полная итоговая таблица

**Компоненты**:
1. **Основная таблица** (13 столбцов):
   - Год
   - ЗП/год
   - Бюджет 1%
   - Базовые (до инд.)
   - Индекс.
   - Базовые (после инд.)
   - Добавка
   - **Итого**
   - Нараст. бюджет
   - **Нараст. итого**
   - Нараст. ≥ бюджет?
   - Сумка стоит
   - Итого ≥ Сумка?

2. **Строка ИТОГО/СРЕДНЕЕ** внизу таблицы

3. **Блок проверок**:
   - Среднее отклонение: X% (✅/❌)
   - Нарастающий итог: все годы (✅/❌)
   - Покупательная способность: все годы (✅/❌)

4. **Легенда цветов**:
   - Зелёный: проверка пройдена
   - Красный: проверка не пройдена
   - Жёлтый: близко к границе

**Файлы**:
- `src/components/Calculation/Calculation.tsx`
- `src/components/Calculation/ResultTable.tsx`
- `src/components/Calculation/SummaryRow.tsx`
- `src/components/Calculation/ValidationBlock.tsx`

---

### Вкладка 6: Графики (Charts)

**Назначение**: Визуализация данных

**Компоненты**:
1. **График 1: Бюджет vs Начисления**
   - Тип: Bar chart (сгруппированные столбцы)
   - X: Годы
   - Y: Бюджет (синий), Итого начислено (зелёный)

2. **График 2: Нарастающий итог**
   - Тип: Area chart
   - X: Годы
   - Y: Нарастающий бюджет vs Нарастающие начисления
   - Заливка области между линиями

3. **График 3: Покупательная способность**
   - Тип: Line chart
   - X: Годы
   - Y: Цена референсного товара, Итого начислено
   - Подсветка зон где Итого < Цена

4. **График 4: Структура начислений по категориям**
   - Тип: Stacked bar chart
   - X: Годы
   - Y: Баллы по категориям (Обучение, Смены, Карьера, ...)

**Файлы**:
- `src/components/Charts/Charts.tsx`
- `src/components/Charts/BudgetVsAccrualsChart.tsx`
- `src/components/Charts/CumulativeChart.tsx`
- `src/components/Charts/PurchasingPowerChart.tsx`
- `src/components/Charts/CategoryBreakdownChart.tsx`

---

### Вкладка 7: Экспорт (Export)

**Назначение**: Экспорт данных в различные форматы

**Компоненты**:
1. **Секция CSV**:
   - Экспорт итоговой таблицы
   - Экспорт заданий
   - Экспорт настроек

2. **Секция PDF**:
   - Полный отчёт с таблицами и графиками
   - Только таблица расчёта
   - Сводка проверок

3. **Секция JSON**:
   - Все данные (настройки + задания + расчёт)
   - Только результаты расчёта

4. **Предпросмотр** перед экспортом

**Файлы**:
- `src/components/Export/Export.tsx`
- `src/components/Export/CSVExport.tsx`
- `src/components/Export/PDFExport.tsx`
- `src/components/Export/JSONExport.tsx`
- `src/components/Export/ExportPreview.tsx`

---

## Общая структура проекта

```
polati-bally/
├── data/                          # Исходные данные (существующие)
├── examples/                      # Примеры расчётов (существующие)
├── src/
│   ├── components/
│   │   ├── common/                # Общие компоненты
│   │   │   ├── TabNavigation.tsx  # Навигация по вкладкам
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Slider.tsx
│   │   │   ├── Table.tsx
│   │   │   └── StatusBadge.tsx
│   │   ├── Dashboard/
│   │   ├── Settings/
│   │   ├── Tasks/
│   │   ├── Catalog/
│   │   ├── Calculation/
│   │   ├── Charts/
│   │   └── Export/
│   ├── hooks/
│   │   ├── useSettings.ts         # Управление настройками
│   │   ├── useTasks.ts            # Управление заданиями
│   │   ├── useCalculation.ts      # Логика расчёта
│   │   └── useExport.ts           # Логика экспорта
│   ├── utils/
│   │   ├── calculations.ts        # Формулы расчёта
│   │   ├── validation.ts          # Валидация данных
│   │   ├── formatters.ts          # Форматирование чисел
│   │   └── csvParser.ts           # Парсинг CSV
│   ├── types/
│   │   └── index.ts               # TypeScript типы
│   ├── data/
│   │   └── defaults.ts            # Значения по умолчанию
│   ├── App.tsx                    # Главный компонент
│   ├── main.tsx                   # Точка входа
│   └── index.css                  # Tailwind стили
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── CLAUDE.md
```

---

## План реализации по вкладкам

### Этап 0: Инициализация проекта
- [ ] Создание Vite + React + TypeScript проекта
- [ ] Настройка Tailwind CSS
- [ ] Установка зависимостей (Recharts, PapaParse, jsPDF)
- [ ] Базовая структура папок
- [ ] Типы TypeScript для всех сущностей
- [ ] Утилиты расчёта и форматирования

### Этап 1: Вкладка "Настройки"
- [ ] Компоненты ввода (Slider, NumberInput)
- [ ] Форма настроек с секциями
- [ ] Загрузка defaults из settings.csv
- [ ] Валидация значений
- [ ] Кнопка сброса

### Этап 2: Вкладка "Задания"
- [ ] Загрузка tasks.csv через PapaParse
- [ ] Таблица с сортировкой
- [ ] Фильтры по категории/периодичности
- [ ] Inline-редактирование баллов
- [ ] Статистика по заданиям

### Этап 3: Вкладка "Каталог"
- [ ] Загрузка catalog.csv
- [ ] Карточки товаров
- [ ] Таблица цен с инфляцией
- [ ] Выделение референсного товара

### Этап 4: Вкладка "Расчёт"
- [ ] Реализация алгоритма расчёта
- [ ] Основная таблица результатов
- [ ] Проверки и индикаторы
- [ ] Цветовая подсветка

### Этап 5: Вкладка "Главная" (Dashboard)
- [ ] KPI карточки
- [ ] Мини-таблица итогов
- [ ] Статус проверок
- [ ] Мини-график

### Этап 6: Вкладка "Графики"
- [ ] Бюджет vs Начисления (Bar)
- [ ] Нарастающий итог (Area)
- [ ] Покупательная способность (Line)
- [ ] Структура по категориям (Stacked Bar)

### Этап 7: Вкладка "Экспорт"
- [ ] CSV экспорт
- [ ] JSON экспорт
- [ ] PDF экспорт с таблицами
- [ ] Предпросмотр

---

## Ключевые TypeScript типы

```typescript
interface Settings {
  baseSalary: number;
  budgetPercent: number;
  inflationRate: number;
  indexationPeriod: number;
  indexationCoefficient: number;
  simulationYears: number;
  maxBudgetDeviation: number;
  allowanceRounding: number;
  pointsRounding: number;
  startYear: number;
  referenceItemId: string;
}

interface Task {
  taskId: string;
  category: string;
  taskName: string;
  basePoints: number;
  frequency: 'once' | 'yearly' | 'conditional';
  condition: string;
  probability: number;
  appliesToYear: string;
  description: string;
}

interface CatalogItem {
  itemId: string;
  itemName: string;
  basePrice: number;
  category: 'anchor' | 'dynamic';
  isReference: boolean;
  description: string;
}

interface YearlyResult {
  year: number;
  calendarYear: number;
  salary: number;
  budget: number;
  basePointsRaw: number;
  indexation: number;
  basePointsIndexed: number;
  allowance: number;
  total: number;
  cumulativeBudget: number;
  cumulativeTotal: number;
  cumulativeCheck: boolean;
  cumulativeDiff: number;
  referencePrice: number;
  purchaseCheck: boolean;
  purchaseDiff: number;
}

interface ValidationResult {
  deviationCheck: { passed: boolean; value: number };
  cumulativeCheck: { passed: boolean; failedYears: number[] };
  purchaseCheck: { passed: boolean; failedYears: number[] };
  allPassed: boolean;
}
```
