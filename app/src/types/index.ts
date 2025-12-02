// Настройки программы
export interface Settings {
  baseSalary: number;
  budgetPercent: number;
  inflationRate: number;
  indexationPeriod: number;
  simulationYears: number;
  maxBudgetDeviation: number;
  allowanceRounding: number;
  pointsRounding: number;
  startYear: number;
  referenceItemId: string;
  noInflation: boolean; // Режим без инфляции
}

// Метаданные настройки (для UI)
export interface SettingMeta {
  parameter: string;
  value: number | string;
  type: 'number' | 'string';
  min?: number;
  max?: number;
  description: string;
}

// Задание
export interface Task {
  taskId: string;
  category: string;
  taskName: string;
  basePoints: number;
  frequency: 'once' | 'yearly' | 'conditional';
  condition: string;
  probability: number;
  appliesToYear: string; // "1", "2", "3", "4", "5", "all"
  description: string;
}

// Товар каталога
export interface CatalogItem {
  itemId: string;
  itemName: string;
  basePrice: number;
  isReference: boolean;
  description: string;
}

// Паттерн начислений по годам
export interface EmployeePattern {
  employeeYear: number;
  category: string;
  points: number;
  description: string;
}

// Суммарные баллы по году
export interface YearlyTotal {
  employeeYear: number;
  totalBasePoints: number;
  description: string;
}

// Добавки по годам
export interface Allowance {
  calendarYear: number;
  period: string;
  allowance: number;
  cumulativeAllowance: number;
  note: string;
}

// Результат расчёта за год
export interface YearlyResult {
  year: number;              // Год работы (1, 2, 3...)
  calendarYear: number;      // Календарный год (2025, 2026...)
  salary: number;            // ЗП за год
  budget: number;            // Бюджет 1%
  basePointsRaw: number;     // Базовые баллы до индексации
  indexation: number;        // Коэффициент индексации
  basePointsIndexed: number; // Базовые баллы после индексации
  allowance: number;         // Добавка
  total: number;             // Итого за год
  cumulativeBudget: number;  // Нарастающий бюджет
  cumulativeTotal: number;   // Нарастающий итого
  cumulativeCheck: boolean;  // Проверка нарастающего итога
  cumulativeDiff: number;    // Разница нарастающего итога и бюджета
  referencePrice: number;    // Цена референсного товара
  purchaseCheck: boolean;    // Проверка покупательной способности
  purchaseDiff: number;      // Разница итого и цены товара
}

// Результаты всех проверок
export interface ValidationResult {
  deviationCheck: {
    passed: boolean;
    value: number; // Отклонение в %
  };
  cumulativeCheck: {
    passed: boolean;
    failedYears: number[]; // Годы, где не прошла проверка
  };
  purchaseCheck: {
    passed: boolean;
    failedYears: number[]; // Годы, где не прошла проверка
  };
  allPassed: boolean;
}

// Полный результат расчёта
export interface CalculationResult {
  yearlyResults: YearlyResult[];
  totals: {
    totalBudget: number;
    totalAccrued: number;
    avgBudget: number;
    avgAccrued: number;
    deviationPercent: number;
  };
  validation: ValidationResult;
}

// Вкладки приложения
export type TabId = 'dashboard' | 'settings' | 'tasks' | 'catalog' | 'matrix' | 'calculation' | 'charts';

export interface Tab {
  id: TabId;
  label: string;
  icon?: string;
}
