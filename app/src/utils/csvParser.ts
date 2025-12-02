import Papa from 'papaparse';
import type { Settings, Task, CatalogItem, YearlyTotal, EmployeePattern, SettingMeta } from '../types';

// Парсинг CSV файла
export async function parseCSV<T>(filePath: string): Promise<T[]> {
  const response = await fetch(filePath);
  const text = await response.text();

  const result = Papa.parse<T>(text, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
    transformHeader: (header) => {
      // Преобразуем snake_case в camelCase
      return header.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    },
  });

  return result.data;
}

// Парсинг настроек
export async function parseSettings(filePath: string): Promise<Settings> {
  const data = await parseCSV<SettingMeta>(filePath);

  const settings: Settings = {
    baseSalary: 1200000,
    budgetPercent: 1.0,
    inflationRate: 15.0,
    indexationPeriod: 3,
    simulationYears: 5,
    maxBudgetDeviation: 2.0,
    allowanceRounding: 100,
    pointsRounding: 10,
    startYear: 2025,
    referenceItemId: 'CAT_006',
    noInflation: true,
  };

  for (const item of data) {
    // Преобразуем snake_case в camelCase для parameter
    const key = item.parameter.replace(/_([a-z])/g, (_: string, letter: string) => letter.toUpperCase()) as keyof Settings;
    if (key in settings) {
      // Обработка boolean значений
      let value: string | number | boolean = item.value;
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (settings as any)[key] = value;
    }
  }

  return settings;
}

// Парсинг заданий
export async function parseTasks(filePath: string): Promise<Task[]> {
  const data = await parseCSV<Record<string, unknown>>(filePath);

  return data.map(item => ({
    taskId: String(item.taskId ?? ''),
    category: String(item.category ?? ''),
    taskName: String(item.taskName ?? ''),
    basePoints: Number(item.basePoints ?? 0),
    frequency: (item.frequency as Task['frequency']) ?? 'once',
    condition: String(item.condition ?? ''),
    probability: Number(item.probability ?? 1),
    appliesToYear: String(item.appliesToYear ?? 'all'),
    description: String(item.description ?? ''),
  }));
}

// Парсинг каталога
export async function parseCatalog(filePath: string): Promise<CatalogItem[]> {
  const data = await parseCSV<Record<string, unknown>>(filePath);

  return data.map(item => ({
    itemId: String(item.itemId ?? ''),
    itemName: String(item.itemName ?? ''),
    basePrice: Number(item.basePrice ?? 0),
    isReference: item.isReference === true || item.isReference === 'true',
    description: String(item.description ?? ''),
  }));
}

// Парсинг yearly_totals
export async function parseYearlyTotals(filePath: string): Promise<YearlyTotal[]> {
  const data = await parseCSV<Record<string, unknown>>(filePath);

  return data.map(item => ({
    employeeYear: Number(item.employeeYear ?? 0),
    totalBasePoints: Number(item.totalBasePoints ?? 0),
    description: String(item.description ?? ''),
  }));
}

// Парсинг employee_patterns
export async function parseEmployeePatterns(filePath: string): Promise<EmployeePattern[]> {
  const data = await parseCSV<Record<string, unknown>>(filePath);

  return data.map(item => ({
    employeeYear: Number(item.employeeYear ?? 0),
    category: String(item.category ?? ''),
    points: Number(item.points ?? 0),
    description: String(item.description ?? ''),
  }));
}
