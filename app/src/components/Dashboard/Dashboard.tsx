import type { Settings, CalculationResult } from '../../types';
import { formatNumber } from '../../utils/formatters';
import { KPICard } from './KPICard';
import { MiniTable } from './MiniTable';
import { MiniChart } from './MiniChart';
import { StatusChecks } from './StatusChecks';

interface DashboardProps {
  settings: Settings;
  calculationResult: CalculationResult | null;
  isLoading: boolean;
}

export function Dashboard({ settings, calculationResult, isLoading }: DashboardProps) {
  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="text-gray-500">Загрузка данных...</div>
      </div>
    );
  }

  if (!calculationResult) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Главная</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-700">
          Нет данных для отображения. Проверьте настройки и данные.
        </div>
      </div>
    );
  }

  const { totals, validation, yearlyResults } = calculationResult;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Главная</h1>
        <p className="text-gray-500 mt-1">
          Обзор программы лояльности ПОЛАТИ БАЛЛЫ на {settings.startYear}—{settings.startYear + settings.simulationYears - 1}
        </p>
      </div>

      {/* KPI карточки */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          title="Средний бюджет в год"
          value={`${formatNumber(Math.round(totals.avgBudget))} ₽`}
          subtitle="1% от средней ЗП"
          icon="budget"
        />
        <KPICard
          title="Среднее начисление"
          value={`${formatNumber(Math.round(totals.avgAccrued))} б.`}
          subtitle="Баллов в среднем за год"
          icon="points"
        />
        <KPICard
          title="Отклонение от бюджета"
          value={`${totals.deviationPercent >= 0 ? '+' : ''}${totals.deviationPercent.toFixed(1)}%`}
          subtitle={`Допустимо: ≤${settings.maxBudgetDeviation}%`}
          trend={totals.deviationPercent <= settings.maxBudgetDeviation ? 'up' : 'down'}
          trendValue={totals.deviationPercent <= settings.maxBudgetDeviation ? 'В норме' : 'Превышение'}
          icon="percent"
        />
        <KPICard
          title="Статус проверок"
          value={validation.allPassed ? 'Все OK' : 'Требует внимания'}
          subtitle={`${[validation.deviationCheck, validation.cumulativeCheck, validation.purchaseCheck].filter(c => c.passed).length}/3 проверок`}
          trend={validation.allPassed ? 'up' : 'down'}
          trendValue={validation.allPassed ? 'Пройдены' : 'Есть проблемы'}
          icon="check"
        />
      </div>

      {/* Основной контент */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <MiniChart results={yearlyResults} />
          <MiniTable results={yearlyResults} />
        </div>
        <div>
          <StatusChecks validation={validation} />
        </div>
      </div>
    </div>
  );
}
