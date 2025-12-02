# CLAUDE.md - App Directory

## Overview

React + TypeScript SPA приложение для калькулятора программы лояльности "ПОЛАТИ БАЛЛЫ".

## Tech Stack

- **Framework**: React 19 + TypeScript 5.9
- **Build**: Vite 7
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts 3
- **PDF Export**: jsPDF + jspdf-autotable
- **CSV Parsing**: PapaParse

## Commands

```bash
npm run dev      # Запуск dev-сервера (Vite)
npm run build    # TypeScript компиляция + Vite build
npm run lint     # ESLint проверка
npm run preview  # Просмотр production build
```

## Project Structure

```
src/
├── main.tsx                 # Entry point
├── App.tsx                  # Root component с навигацией
├── index.css                # Global styles
├── types/index.ts           # TypeScript типы
├── data/defaults.ts         # Дефолтные настройки
├── utils/
│   ├── calculations.ts      # Основные расчёты
│   ├── csvParser.ts         # Парсинг CSV
│   └── formatters.ts        # Форматирование чисел
├── hooks/
│   ├── useSettings.ts       # Управление настройками
│   ├── useCalculation.ts    # Расчёты по настройкам
│   ├── useTasks.ts          # Управление заданиями
│   ├── useCatalog.ts        # Каталог товаров
│   └── useExport.ts         # Экспорт в PDF/CSV
└── components/
    ├── common/
    │   └── TabNavigation.tsx           # Вкладки навигации
    ├── Dashboard/
    │   ├── Dashboard.tsx               # Главная панель
    │   ├── KPICard.tsx                 # Карточки KPI
    │   ├── MiniChart.tsx               # Мини-графики
    │   ├── MiniTable.tsx               # Мини-таблицы
    │   └── StatusChecks.tsx            # Статус проверок
    ├── Settings/
    │   ├── Settings.tsx                # Настройки
    │   ├── SettingsSection.tsx         # Секции настроек
    │   ├── SliderInput.tsx             # Слайдер инпут
    │   ├── NumberInput.tsx             # Числовой инпут
    │   └── SelectInput.tsx             # Селект инпут
    ├── Tasks/
    │   ├── Tasks.tsx                   # Задания
    │   ├── TasksTable.tsx              # Таблица заданий
    │   ├── TasksFilter.tsx             # Фильтр заданий
    │   ├── TasksStats.tsx              # Статистика заданий
    │   └── AddTaskModal.tsx            # Модалка добавления задания
    ├── Catalog/
    │   ├── Catalog.tsx                 # Каталог товаров
    │   ├── ProductCard.tsx             # Карточка товара
    │   └── PriceTable.tsx              # Таблица цен
    ├── Matrix/
    │   └── Matrix.tsx                  # Матрица начислений
    ├── Calculation/
    │   ├── Calculation.tsx             # Расчёты
    │   ├── ResultTable.tsx             # Таблица результатов
    │   └── ValidationBlock.tsx         # Блок валидации
    ├── Charts/
    │   ├── Charts.tsx                  # Графики
    │   ├── BudgetVsAccrualsChart.tsx   # Бюджет vs начисления
    │   ├── CumulativeChart.tsx         # Накопительный график
    │   ├── PurchasingPowerChart.tsx    # Покупательная способность
    │   └── StructureChart.tsx          # Структура начислений
    └── Export/
        └── Export.tsx                  # Экспорт данных
```

## Key Types

```typescript
interface Settings {
  baseSalary: number;        // Базовая ЗП (1,200,000)
  budgetPercent: number;     // % бюджета (1.0)
  inflationRate: number;     // Инфляция % (15.0)
  indexationPeriod: number;  // Период индексации (3 года)
  simulationYears: number;   // Срок моделирования (5 лет)
  noInflation: boolean;      // Режим без инфляции
}

interface YearlyResult {
  year: number;              // Год работы
  calendarYear: number;      // Календарный год
  salary: number;            // ЗП за год
  budget: number;            // Бюджет 1%
  basePointsIndexed: number; // Баллы после индексации
  total: number;             // Итого за год
  cumulativeTotal: number;   // Нарастающий итого
}
```

## Application Tabs

| Tab | Component | Description |
|-----|-----------|-------------|
| dashboard | Dashboard | KPI карточки, мини-графики, статус проверок |
| settings | Settings | Слайдеры и инпуты настроек |
| tasks | Tasks | Таблица заданий с фильтрами |
| catalog | Catalog | Карточки товаров с ценами |
| matrix | Matrix | Матрица начислений по годам |
| calculation | Calculation | Детальная таблица расчётов |
| charts | Charts | Полноразмерные графики |

## Data Files

CSV файлы загружаются из `public/data/`:
- `tasks.csv` - Задания с баллами
- `catalog.csv` - Каталог товаров
- `settings.csv` - Дефолтные настройки

## Testing

Python тесты для проверки функциональности:
```bash
python test_app.py       # Основные тесты
python test_catalog.py   # Тесты каталога
python test_export.py    # Тесты экспорта
python test_final.py     # Финальные тесты
```

## Code Style

- Компоненты: функциональные с хуками
- Именование: camelCase для переменных, PascalCase для компонентов
- UI текст: на русском языке
- Код и комментарии: на английском (допускается русский в JSDoc)
