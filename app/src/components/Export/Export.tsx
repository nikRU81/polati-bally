import { useState } from 'react';
import type { Settings, CalculationResult } from '../../types';
import { useExport } from '../../hooks/useExport';
import { formatNumber } from '../../utils/formatters';

interface ExportProps {
  settings: Settings;
  calculationResult: CalculationResult | null;
}

export function Export({ settings, calculationResult }: ExportProps) {
  const { exportToCSV, exportSettingsToCSV, exportToJSON, exportResultsToJSON } = useExport();
  const [exportStatus, setExportStatus] = useState<string | null>(null);

  const showStatus = (message: string) => {
    setExportStatus(message);
    setTimeout(() => setExportStatus(null), 3000);
  };

  const handleExportResultsCSV = () => {
    if (!calculationResult) return;
    const timestamp = new Date().toISOString().split('T')[0];
    exportToCSV(calculationResult.yearlyResults, `polati_results_${timestamp}.csv`);
    showStatus('Результаты расчёта экспортированы в CSV');
  };

  const handleExportSettingsCSV = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    exportSettingsToCSV(settings, `polati_settings_${timestamp}.csv`);
    showStatus('Настройки экспортированы в CSV');
  };

  const handleExportFullJSON = () => {
    if (!calculationResult) return;
    const timestamp = new Date().toISOString().split('T')[0];
    exportToJSON({ settings, results: calculationResult }, `polati_full_${timestamp}.json`);
    showStatus('Полные данные экспортированы в JSON');
  };

  const handleExportResultsJSON = () => {
    if (!calculationResult) return;
    const timestamp = new Date().toISOString().split('T')[0];
    exportResultsToJSON(calculationResult, `polati_results_${timestamp}.json`);
    showStatus('Результаты экспортированы в JSON');
  };

  const ExportCard = ({
    title,
    description,
    icon,
    buttons,
    disabled = false,
  }: {
    title: string;
    description: string;
    icon: React.ReactNode;
    buttons: { label: string; onClick: () => void; variant?: 'primary' | 'secondary' }[];
    disabled?: boolean;
  }) => (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${disabled ? 'opacity-50' : ''}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {buttons.map((btn, index) => (
              <button
                key={index}
                onClick={btn.onClick}
                disabled={disabled}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  btn.variant === 'secondary'
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:hover:bg-gray-100'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 disabled:hover:bg-indigo-600'
                } disabled:cursor-not-allowed`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Экспорт</h1>
          <p className="text-gray-600 mt-1">Сохраните данные расчётов в удобном формате</p>
        </div>
        {exportStatus && (
          <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium animate-pulse">
            ✓ {exportStatus}
          </div>
        )}
      </div>

      {/* Предупреждение если нет данных */}
      {!calculationResult && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-amber-800">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-medium">Нет данных для экспорта</span>
          </div>
          <p className="text-sm text-amber-700 mt-1">
            Перейдите на вкладку "Расчёт" чтобы выполнить расчёт программы
          </p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* CSV экспорт */}
        <ExportCard
          title="Экспорт в CSV"
          description="Формат для Excel и других табличных редакторов. Разделитель — точка с запятой, кодировка UTF-8 с BOM."
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
          buttons={[
            { label: 'Результаты расчёта', onClick: handleExportResultsCSV },
            { label: 'Настройки', onClick: handleExportSettingsCSV, variant: 'secondary' },
          ]}
          disabled={!calculationResult}
        />

        {/* JSON экспорт */}
        <ExportCard
          title="Экспорт в JSON"
          description="Структурированный формат для программной обработки и интеграции с другими системами."
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          }
          buttons={[
            { label: 'Полный экспорт', onClick: handleExportFullJSON },
            { label: 'Только результаты', onClick: handleExportResultsJSON, variant: 'secondary' },
          ]}
          disabled={!calculationResult}
        />
      </div>

      {/* Превью данных */}
      {calculationResult && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Превью данных для экспорта</h3>

          {/* Сводка */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 uppercase tracking-wide">Лет в программе</div>
              <div className="text-xl font-bold text-gray-900">{calculationResult.yearlyResults.length}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 uppercase tracking-wide">Итого баллов</div>
              <div className="text-xl font-bold text-gray-900">
                {formatNumber(calculationResult.totals.totalAccrued)}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 uppercase tracking-wide">Общий бюджет</div>
              <div className="text-xl font-bold text-gray-900">
                {formatNumber(calculationResult.totals.totalBudget)}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 uppercase tracking-wide">Статус</div>
              <div className={`text-xl font-bold ${
                calculationResult.validation.allPassed ? 'text-green-600' : 'text-red-600'
              }`}>
                {calculationResult.validation.allPassed ? 'OK' : 'Ошибки'}
              </div>
            </div>
          </div>

          {/* Таблица превью */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-medium text-gray-600">Год</th>
                  <th className="text-right py-2 px-3 font-medium text-gray-600">ЗП</th>
                  <th className="text-right py-2 px-3 font-medium text-gray-600">Бюджет</th>
                  <th className="text-right py-2 px-3 font-medium text-gray-600">Базовые</th>
                  <th className="text-right py-2 px-3 font-medium text-gray-600">Добавка</th>
                  <th className="text-right py-2 px-3 font-medium text-gray-600">Итого</th>
                  <th className="text-center py-2 px-3 font-medium text-gray-600">Проверка</th>
                </tr>
              </thead>
              <tbody>
                {calculationResult.yearlyResults.slice(0, 5).map((row) => (
                  <tr key={row.year} className="border-b border-gray-100">
                    <td className="py-2 px-3 text-gray-900">{row.calendarYear}</td>
                    <td className="py-2 px-3 text-right text-gray-600">{formatNumber(row.salary)}</td>
                    <td className="py-2 px-3 text-right text-gray-600">{formatNumber(row.budget)}</td>
                    <td className="py-2 px-3 text-right text-gray-600">{formatNumber(row.basePointsIndexed)}</td>
                    <td className="py-2 px-3 text-right text-gray-600">{formatNumber(row.allowance)}</td>
                    <td className="py-2 px-3 text-right font-medium text-gray-900">{formatNumber(row.total)}</td>
                    <td className="py-2 px-3 text-center">
                      <span className={`inline-flex w-6 h-6 items-center justify-center rounded-full text-xs ${
                        row.cumulativeCheck && row.purchaseCheck
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {row.cumulativeCheck && row.purchaseCheck ? '✓' : '✗'}
                      </span>
                    </td>
                  </tr>
                ))}
                {calculationResult.yearlyResults.length > 5 && (
                  <tr>
                    <td colSpan={7} className="py-2 px-3 text-center text-gray-500 text-xs">
                      ... и ещё {calculationResult.yearlyResults.length - 5} строк
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Информация о форматах */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">О форматах экспорта</h3>
        <div className="grid gap-4 md:grid-cols-2 text-sm text-gray-600">
          <div>
            <span className="font-medium text-gray-900">CSV (Comma-Separated Values)</span>
            <p className="mt-1">
              Табличный формат, открывается в Excel, Google Sheets и других редакторах.
              Используется разделитель ";" для корректного отображения в русской локали Excel.
            </p>
          </div>
          <div>
            <span className="font-medium text-gray-900">JSON (JavaScript Object Notation)</span>
            <p className="mt-1">
              Структурированный формат данных для программной обработки.
              Сохраняет иерархию данных и типы значений.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
