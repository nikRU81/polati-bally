import type { Settings, YearlyResult, CalculationResult, ValidationResult, YearlyTotal, CatalogItem } from '../types';

// Округление до заданного шага
export function roundTo(value: number, step: number): number {
  return Math.round(value / step) * step;
}

// Округление до числа, оканчивающегося на 9
// Например: 2090 -> 2089, 2085 -> 2079, 2091 -> 2089
export function roundToEndingNine(value: number): number {
  const rounded = Math.round(value);
  const remainder = rounded % 10;
  // Округляем к ближайшему числу на 9
  if (remainder === 9) {
    return rounded;
  } else if (remainder >= 5) {
    // Округляем вверх: 2095 -> 2099, 2096 -> 2099
    return rounded + (9 - remainder);
  } else {
    // Округляем вниз: 2090 -> 2089, 2091 -> 2089, 2094 -> 2089
    return rounded - remainder - 1;
  }
}

// Расчёт зарплаты за год с учётом инфляции
export function calculateSalary(baseSalary: number, inflationRate: number, year: number, noInflation: boolean = false): number {
  if (noInflation || year === 1) {
    return baseSalary;
  }
  return Math.round(baseSalary * Math.pow(1 + inflationRate / 100, year - 1));
}

// Расчёт бюджета (% от ЗП)
export function calculateBudget(salary: number, budgetPercent: number): number {
  return Math.round(salary * budgetPercent / 100);
}

// Расчёт цены товара с инфляцией (округление до числа на 9)
export function calculatePriceWithInflation(basePrice: number, inflationRate: number, year: number, noInflation: boolean = false): number {
  if (noInflation || year === 1) {
    return basePrice;
  }
  const rawPrice = basePrice * Math.pow(1 + inflationRate / 100, year - 1);
  return roundToEndingNine(rawPrice);
}

// Расчёт коэффициента индексации от накопленной инфляции
// Индексация = накопленная инфляция за период индексации
export function calculateIndexationCoefficient(inflationRate: number, indexationPeriod: number): number {
  // Накопленная инфляция за indexationPeriod лет
  return Math.pow(1 + inflationRate / 100, indexationPeriod);
}

// Получение коэффициента индексации для года (расчётный от инфляции)
export function getIndexation(year: number, indexationPeriod: number, inflationRate: number, noInflation: boolean = false): number {
  if (noInflation) {
    return 1.0;
  }
  if (year <= indexationPeriod) {
    return 1.0;
  }
  // После периода индексации применяем коэффициент = накопленная инфляция
  return calculateIndexationCoefficient(inflationRate, indexationPeriod);
}

// Расчёт индексированных баллов
export function calculateIndexedPoints(basePoints: number, indexation: number, rounding: number): number {
  return roundTo(basePoints * indexation, rounding);
}

// Основной расчёт программы
export function calculateProgram(
  settings: Settings,
  yearlyTotals: YearlyTotal[],
  referenceItem: CatalogItem | undefined
): CalculationResult {
  const results: YearlyResult[] = [];
  let cumulativeBudget = 0;
  let cumulativeTotal = 0;

  const baseReferencePrice = referenceItem?.basePrice ?? 10499;
  const effectiveInflation = settings.noInflation ? 0 : settings.inflationRate;

  for (let year = 1; year <= settings.simulationYears; year++) {
    const calendarYear = settings.startYear + year - 1;

    // ЗП и бюджет
    const salary = calculateSalary(settings.baseSalary, settings.inflationRate, year, settings.noInflation);
    const budget = calculateBudget(salary, settings.budgetPercent);
    cumulativeBudget += budget;

    // Базовые баллы
    const yearlyTotal = yearlyTotals.find(t => t.employeeYear === year);
    const basePointsRaw = yearlyTotal?.totalBasePoints ?? 0;

    // Индексация (расчётная от инфляции)
    const indexation = getIndexation(year, settings.indexationPeriod, settings.inflationRate, settings.noInflation);
    const basePointsIndexed = calculateIndexedPoints(basePointsRaw, indexation, settings.pointsRounding);

    // Расчёт добавки
    const projectedTotal = cumulativeTotal + basePointsIndexed;
    let allowance = 0;

    if (projectedTotal < cumulativeBudget) {
      const gap = cumulativeBudget - projectedTotal;
      allowance = roundTo(gap, settings.allowanceRounding);
    }

    // Итого
    const total = basePointsIndexed + allowance;
    cumulativeTotal += total;

    // Цена референсного товара
    const referencePrice = calculatePriceWithInflation(baseReferencePrice, effectiveInflation, year, settings.noInflation);

    // Проверки
    const cumulativeCheck = cumulativeTotal >= cumulativeBudget;
    const cumulativeDiff = cumulativeTotal - cumulativeBudget;
    const purchaseCheck = total >= referencePrice;
    const purchaseDiff = total - referencePrice;

    results.push({
      year,
      calendarYear,
      salary,
      budget,
      basePointsRaw,
      indexation,
      basePointsIndexed,
      allowance,
      total,
      cumulativeBudget,
      cumulativeTotal,
      cumulativeCheck,
      cumulativeDiff,
      referencePrice,
      purchaseCheck,
      purchaseDiff,
    });
  }

  // Итоги
  const totalBudget = results.reduce((sum, r) => sum + r.budget, 0);
  const totalAccrued = results.reduce((sum, r) => sum + r.total, 0);
  const avgBudget = totalBudget / results.length;
  const avgAccrued = totalAccrued / results.length;
  const deviationPercent = ((totalAccrued / totalBudget) - 1) * 100;

  // Валидация
  const validation = validateResults(results, deviationPercent, settings.maxBudgetDeviation);

  return {
    yearlyResults: results,
    totals: {
      totalBudget,
      totalAccrued,
      avgBudget,
      avgAccrued,
      deviationPercent,
    },
    validation,
  };
}

// Валидация результатов
function validateResults(
  results: YearlyResult[],
  deviationPercent: number,
  maxDeviation: number
): ValidationResult {
  const deviationCheck = {
    passed: deviationPercent <= maxDeviation,
    value: deviationPercent,
  };

  const failedCumulativeYears = results
    .filter(r => !r.cumulativeCheck)
    .map(r => r.year);

  const cumulativeCheck = {
    passed: failedCumulativeYears.length === 0,
    failedYears: failedCumulativeYears,
  };

  const failedPurchaseYears = results
    .filter(r => !r.purchaseCheck)
    .map(r => r.year);

  const purchaseCheck = {
    passed: failedPurchaseYears.length === 0,
    failedYears: failedPurchaseYears,
  };

  return {
    deviationCheck,
    cumulativeCheck,
    purchaseCheck,
    allPassed: deviationCheck.passed && cumulativeCheck.passed && purchaseCheck.passed,
  };
}
