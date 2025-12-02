import type { Settings, CalculationResult } from '../../types';
import { BudgetVsAccrualsChart } from './BudgetVsAccrualsChart';
import { CumulativeChart } from './CumulativeChart';
import { PurchasingPowerChart } from './PurchasingPowerChart';
import { StructureChart } from './StructureChart';

interface ChartsProps {
  settings: Settings;
  calculationResult: CalculationResult | null;
  isLoading: boolean;
}

export function Charts({ calculationResult, isLoading }: ChartsProps) {
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
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Графики</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-700">
          Нет данных для отображения графиков
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Графики</h1>
        <p className="text-gray-500 mt-1">Визуализация расчёта программы лояльности</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BudgetVsAccrualsChart results={calculationResult.yearlyResults} />
        <CumulativeChart results={calculationResult.yearlyResults} />
        <PurchasingPowerChart results={calculationResult.yearlyResults} />
        <StructureChart results={calculationResult.yearlyResults} />
      </div>
    </div>
  );
}
