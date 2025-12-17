import { useMemo } from 'react';
import type { YearlyTotal, CalculationResult, CatalogItem } from '../types';
import { calculateProgram } from '../utils/calculations';
import { useTasksContext } from '../context/TasksContext';
import { useSettingsContext } from '../context/SettingsContext';
import { useCatalogContext } from '../context/CatalogContext';

export function useCalculation() {
  const { settings } = useSettingsContext();
  const { tasks, isLoading: tasksLoading, error: tasksError } = useTasksContext();
  const { items: catalogItems, isLoading: catalogLoading, error: catalogError } = useCatalogContext();

  // Reference item from catalog
  const referenceItem = useMemo((): CatalogItem | undefined => {
    return catalogItems.find(item => item.isReference) ||
           catalogItems.find(item => item.itemId === settings.referenceItemId);
  }, [catalogItems, settings.referenceItemId]);

  // Динамический расчёт yearlyTotals из заданий
  const yearlyTotals = useMemo((): YearlyTotal[] => {
    const years = Array.from({ length: settings.simulationYears }, (_, i) => i + 1);

    return years.map(year => {
      // Суммируем баллы для этого года
      const totalBasePoints = tasks.reduce((sum, task) => {
        const appliesToYearStr = String(task.appliesToYear);

        if (appliesToYearStr === 'all') {
          return sum + (task.basePoints * task.probability);
        }

        // Обработка списков годов через split(';')
        const taskYears = appliesToYearStr.split(';').map(y => parseInt(y.trim(), 10));
        if (taskYears.includes(year)) {
          return sum + (task.basePoints * task.probability);
        }

        return sum;
      }, 0);

      return {
        employeeYear: year,
        totalBasePoints: Math.round(totalBasePoints),
        description: `Год ${year}`
      };
    });
  }, [tasks, settings.simulationYears]);

  // Результат расчёта
  const calculationResult: CalculationResult | null = useMemo(() => {
    if (yearlyTotals.length === 0) return null;
    return calculateProgram(settings, yearlyTotals, referenceItem);
  }, [settings, yearlyTotals, referenceItem]);

  // Общий статус загрузки и ошибок
  const isLoading = tasksLoading || catalogLoading;
  const error = tasksError || catalogError;

  return {
    calculationResult,
    isLoading,
    error,
    referenceItem,
  };
}
