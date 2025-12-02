import type { Settings, Tab } from '../types';

// Настройки по умолчанию
export const defaultSettings: Settings = {
  baseSalary: 1200000,
  budgetPercent: 1.0,
  inflationRate: 15.0,
  indexationPeriod: 3,
  simulationYears: 5,
  maxBudgetDeviation: 5.0,
  allowanceRounding: 100,
  pointsRounding: 10,
  startYear: 2025,
  referenceItemId: 'CAT_006',
  noInflation: true,
};

// Вкладки приложения
export const tabs: Tab[] = [
  { id: 'dashboard', label: 'Главная' },
  { id: 'settings', label: 'Настройки' },
  { id: 'tasks', label: 'Задания' },
  { id: 'catalog', label: 'Каталог' },
  { id: 'matrix', label: 'Матрица' },
  { id: 'calculation', label: 'Расчёт' },
  { id: 'charts', label: 'Графики' },
];

// Категории заданий
export const taskCategories = [
  'Все',
  'Обучение',
  'Смены',
  'Карьера',
  'Лояльность',
  'Межвахта',
  'Приведи друга',
  'Активности',
  'События',
];

// Типы периодичности
export const frequencyLabels: Record<string, string> = {
  once: 'Разово',
  yearly: 'Ежегодно',
  conditional: 'По условию',
};

// Годы применения
export const yearOptions = ['all', '1', '2', '3', '4', '5'];
