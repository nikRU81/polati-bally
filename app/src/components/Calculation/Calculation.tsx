import { useCalculation } from '../../hooks/useCalculation';
import { useSettingsContext } from '../../context/SettingsContext';
import { ResultTable } from './ResultTable';

export function Calculation() {
  const { settings } = useSettingsContext();
  const { calculationResult, isLoading, error, referenceItem } = useCalculation();

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="text-gray-500">Загрузка данных для расчёта...</div>
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

  if (!calculationResult) {
    return (
      <div className="p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-700">
          Нет данных для расчёта
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Расчёт экономического эффекта</h1>
        <p className="text-gray-500 mt-1">
          Итоговая таблица программы лояльности на {settings.simulationYears} лет
          {referenceItem && ` (референс: ${referenceItem.itemName})`}
          {settings.noInflation && (
            <span className="ml-2 text-orange-600 font-medium">(без инфляции)</span>
          )}
        </p>
      </div>

      <ResultTable
        results={calculationResult.yearlyResults}
        totals={calculationResult.totals}
        maxDeviation={settings.maxBudgetDeviation}
        noInflation={settings.noInflation}
      />
    </div>
  );
}
