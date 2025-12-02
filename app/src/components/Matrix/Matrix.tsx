import React, { useMemo, useState, useEffect } from 'react';
import { useTasksContext } from '../../context/TasksContext';
import { useSettingsContext } from '../../context/SettingsContext';
import { formatNumber } from '../../utils/formatters';
import { getIndexation } from '../../utils/calculations';

interface GroupedTask {
  name: string;
  category: string;
  pointsPerYear: number[];
  basePoints: number;
  frequency: string;
  probability: number;
}

export function Matrix() {
  const { tasks, isLoading, error } = useTasksContext();
  const { settings } = useSettingsContext();
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());

  // Группировка заданий и расчёт баллов по годам
  const groupedTasks = useMemo(() => {
    if (!tasks.length) return [];

    const years = Array.from({ length: settings.simulationYears }, (_, i) => i + 1);
    const groups: Map<string, GroupedTask> = new Map();

    // Группируем однородные задания (например, Эволюция)
    tasks.forEach(task => {
      // Определяем ключ группировки
      let groupKey = task.taskName;
      let groupName = task.taskName;

      // Объединяем однородные задания
      if (task.taskName.startsWith('Эволюция')) {
        groupKey = 'Эволюция (смены)';
        groupName = 'Эволюция (смены)';
      } else if (task.taskName.startsWith('Кочевник')) {
        groupKey = 'Кочевник (объекты)';
        groupName = 'Кочевник (объекты)';
      } else if (task.taskName.startsWith('Ночная Сова')) {
        groupKey = 'Ночная Сова';
        groupName = 'Ночная Сова';
      } else if (task.taskName.startsWith('Повышение СЛИП')) {
        groupKey = 'Повышение СЛИП';
        groupName = 'Повышение СЛИП';
      } else if (task.taskName.startsWith('ПОЛАТИ СТАЖ')) {
        groupKey = 'ПОЛАТИ СТАЖ';
        groupName = 'ПОЛАТИ СТАЖ';
      } else if (task.taskName.startsWith('ПОЛАТИ БОНУС')) {
        groupKey = 'ПОЛАТИ БОНУС';
        groupName = 'ПОЛАТИ БОНУС';
      }

      if (!groups.has(groupKey)) {
        groups.set(groupKey, {
          name: groupName,
          category: task.category,
          pointsPerYear: years.map(() => 0),
          basePoints: 0,
          frequency: task.frequency,
          probability: task.probability,
        });
      }

      const group = groups.get(groupKey)!;

      // Распределяем баллы по годам
      years.forEach((year, idx) => {
        let yearPoints = 0;

        if (task.appliesToYear === 'all') {
          // Ежегодное задание
          if (task.frequency === 'yearly') {
            yearPoints = task.basePoints * task.probability;
          } else if (task.frequency === 'conditional') {
            yearPoints = task.basePoints * task.probability;
          }
        } else {
          // Задание для конкретного года
          const taskYear = parseInt(task.appliesToYear, 10);
          if (taskYear === year) {
            yearPoints = task.basePoints * task.probability;
          }
        }

        // Применяем индексацию если включена инфляция
        if (!settings.noInflation && yearPoints > 0) {
          const indexation = getIndexation(year, settings.indexationPeriod, settings.inflationRate, false);
          yearPoints = Math.round(yearPoints * indexation);
        }

        group.pointsPerYear[idx] += yearPoints;
      });

      group.basePoints += task.basePoints * task.probability;
    });

    return Array.from(groups.values());
  }, [tasks, settings]);

  // Группировка по категориям с сортировкой по сумме баллов
  const tasksByCategory = useMemo(() => {
    const grouped: Record<string, GroupedTask[]> = {};

    groupedTasks.forEach(task => {
      if (!grouped[task.category]) {
        grouped[task.category] = [];
      }
      grouped[task.category].push(task);
    });

    // Сортируем категории по сумме баллов (от большего к меньшему)
    const sortedEntries = Object.entries(grouped).sort((a, b) => {
      const sumA = a[1].reduce((sum, t) => t.pointsPerYear.reduce((s, p) => s + p, sum), 0);
      const sumB = b[1].reduce((sum, t) => t.pointsPerYear.reduce((s, p) => s + p, sum), 0);
      return sumB - sumA;
    });

    return sortedEntries;
  }, [groupedTasks]);

  // Инициализируем все категории как свёрнутые при первой загрузке
  useEffect(() => {
    if (tasksByCategory.length > 0 && collapsedCategories.size === 0) {
      const allCategories = new Set(tasksByCategory.map(([cat]) => cat));
      setCollapsedCategories(allCategories);
    }
  }, [tasksByCategory]);

  const toggleCategory = (category: string) => {
    setCollapsedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  // Итоги по годам
  const yearTotals = useMemo(() => {
    const years = Array.from({ length: settings.simulationYears }, (_, i) => i + 1);
    return years.map((_, idx) =>
      groupedTasks.reduce((sum, task) => sum + task.pointsPerYear[idx], 0)
    );
  }, [groupedTasks, settings.simulationYears]);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="text-gray-500">Загрузка матрицы...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  const years = Array.from({ length: settings.simulationYears }, (_, i) => i + 1);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Матрица начислений</h1>
        <p className="text-gray-500 mt-1">
          Распределение баллов по заданиям и годам работы
          {settings.noInflation && (
            <span className="ml-2 text-orange-600 font-medium">(без инфляции)</span>
          )}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                  Задание
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Категория
                </th>
                {years.map(year => (
                  <th key={year} className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Год {year}
                    <div className="text-gray-400 font-normal normal-case">
                      {settings.startYear + year - 1}
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-medium text-blue-600 uppercase tracking-wider bg-blue-50">
                  Всего
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasksByCategory.map(([category, categoryTasks]) => {
                const isCollapsed = collapsedCategories.has(category);
                const categoryTotal = categoryTasks.reduce(
                  (sum, task) => sum + task.pointsPerYear.reduce((a, b) => a + b, 0),
                  0
                );
                return (
                  <React.Fragment key={category}>
                    {/* Заголовок категории */}
                    <tr
                      className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors"
                      onClick={() => toggleCategory(category)}
                    >
                      <td colSpan={2} className="px-4 py-2 sticky left-0 bg-gray-100">
                        <div className="flex items-center gap-2">
                          <svg
                            className={`w-4 h-4 text-gray-500 transition-transform ${isCollapsed ? '' : 'rotate-90'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <span className="font-semibold text-gray-700">{category}</span>
                          <span className="text-sm text-gray-500">
                            ({categoryTasks.length} {categoryTasks.length === 1 ? 'задание' : categoryTasks.length < 5 ? 'задания' : 'заданий'})
                          </span>
                        </div>
                      </td>
                      {years.map((_, idx) => {
                        const yearTotal = categoryTasks.reduce((sum, task) => sum + task.pointsPerYear[idx], 0);
                        return (
                          <td key={idx} className="px-4 py-2 text-right text-sm font-medium text-gray-700 bg-gray-100">
                            {formatNumber(Math.round(yearTotal))}
                          </td>
                        );
                      })}
                      <td className="px-4 py-2 text-right text-sm font-semibold text-blue-600 bg-gray-100">
                        {formatNumber(Math.round(categoryTotal))}
                      </td>
                    </tr>
                    {/* Задания категории */}
                    {!isCollapsed && categoryTasks.map((task, idx) => {
                      const rowTotal = task.pointsPerYear.reduce((a, b) => a + b, 0);
                      return (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white">
                            {task.name}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                              {task.category}
                            </span>
                          </td>
                          {task.pointsPerYear.map((points, yIdx) => (
                            <td
                              key={yIdx}
                              className={`px-4 py-2 text-right text-sm ${
                                points > 0 ? 'text-gray-900' : 'text-gray-300'
                              }`}
                            >
                              {points > 0 ? formatNumber(Math.round(points)) : '—'}
                            </td>
                          ))}
                          <td className="px-4 py-2 text-right text-sm font-semibold text-blue-600 bg-blue-50">
                            {formatNumber(Math.round(rowTotal))}
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                );
              })}

              {/* Итоговая строка */}
              <tr className="bg-gray-100 font-bold">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 sticky left-0 bg-gray-100">
                  ИТОГО
                </td>
                <td className="px-3 py-3"></td>
                {yearTotals.map((total, idx) => (
                  <td key={idx} className="px-4 py-3 text-right text-sm text-gray-900">
                    {formatNumber(Math.round(total))}
                  </td>
                ))}
                <td className="px-4 py-3 text-right text-sm text-blue-700 bg-blue-100">
                  {formatNumber(Math.round(yearTotals.reduce((a, b) => a + b, 0)))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Таблица процентов по категориям */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 px-6 py-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Распределение по категориям (%)</h2>
          <p className="text-sm text-gray-600 mt-1">Доля каждой категории от общего объёма начислений</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                  Категория
                </th>
                {years.map(year => (
                  <th key={year} className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Год {year}
                    <div className="text-gray-400 font-normal normal-case">
                      {settings.startYear + year - 1}
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-medium text-purple-600 uppercase tracking-wider bg-purple-50">
                  Среднее
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasksByCategory.map(([category, categoryTasks]) => {
                const categoryYearTotals = years.map((_, idx) =>
                  categoryTasks.reduce((sum, task) => sum + task.pointsPerYear[idx], 0)
                );
                const categoryTotal = categoryYearTotals.reduce((a, b) => a + b, 0);
                const avgPercent = categoryTotal > 0
                  ? (categoryTotal / yearTotals.reduce((a, b) => a + b, 0)) * 100
                  : 0;

                return (
                  <tr key={category} className="hover:bg-purple-50">
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white">
                      {category}
                    </td>
                    {categoryYearTotals.map((categoryYearTotal, idx) => {
                      const percent = yearTotals[idx] > 0
                        ? (categoryYearTotal / yearTotals[idx]) * 100
                        : 0;
                      return (
                        <td key={idx} className="px-4 py-2 text-right text-sm text-gray-900">
                          {percent > 0 ? `${percent.toFixed(1)}%` : '—'}
                        </td>
                      );
                    })}
                    <td className="px-4 py-2 text-right text-sm font-semibold text-purple-600 bg-purple-50">
                      {avgPercent > 0 ? `${avgPercent.toFixed(1)}%` : '—'}
                    </td>
                  </tr>
                );
              })}

              {/* Итоговая строка */}
              <tr className="bg-gray-100 font-bold">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 sticky left-0 bg-gray-100">
                  ИТОГО
                </td>
                {years.map((_, idx) => (
                  <td key={idx} className="px-4 py-3 text-right text-sm text-gray-900">
                    100.0%
                  </td>
                ))}
                <td className="px-4 py-3 text-right text-sm text-purple-700 bg-purple-100">
                  100.0%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Информация об индексации */}
      {!settings.noInflation && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Индексация:</span> С года {settings.indexationPeriod + 1} применяется коэффициент{' '}
            <span className="font-mono font-medium">
              ×{Math.pow(1 + settings.inflationRate / 100, settings.indexationPeriod).toFixed(2)}
            </span>{' '}
            (накопленная инфляция {settings.inflationRate}% за {settings.indexationPeriod} года)
          </div>
        </div>
      )}
    </div>
  );
}
