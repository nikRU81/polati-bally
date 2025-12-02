import { useState } from 'react';
import type { YearlyResult } from '../../types';
import { formatNumber, formatCoefficient, formatDiff } from '../../utils/formatters';

interface ResultTableProps {
  results: YearlyResult[];
  totals: {
    totalBudget: number;
    totalAccrued: number;
    avgBudget: number;
    avgAccrued: number;
    deviationPercent: number;
  };
  maxDeviation: number;
  noInflation?: boolean;
}

export function ResultTable({ results, totals, maxDeviation, noInflation }: ResultTableProps) {
  const deviationPassed = Math.abs(totals.deviationPercent) <= maxDeviation;
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="space-y-6">
      {/* Блок 1: Бюджет vs Начисления */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Соответствие бюджету</h3>
              <p className="text-sm text-gray-500">
                Среднее начисление = среднему бюджету (±{maxDeviation}%)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs text-blue-600 hover:text-blue-800 underline"
              >
                {showDetails ? 'Скрыть детали' : 'Показать детали расчёта'}
              </button>
              <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                deviationPassed
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {deviationPassed ? '✓ В норме' : '✗ Превышено'}
              </div>
            </div>
          </div>
        </div>

        {/* Компактная сводка */}
        <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 border-b border-gray-200">
          <div className="text-center">
            <div className="text-xs text-gray-500 uppercase">Средний бюджет</div>
            <div className="text-lg font-bold text-gray-900">{formatNumber(Math.round(totals.avgBudget))}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 uppercase">Среднее начисление</div>
            <div className="text-lg font-bold text-blue-600">{formatNumber(Math.round(totals.avgAccrued))}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 uppercase">Отклонение</div>
            <div className={`text-lg font-bold ${deviationPassed ? 'text-green-600' : 'text-red-600'}`}>
              {totals.deviationPercent >= 0 ? '+' : ''}{totals.deviationPercent.toFixed(1)}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 uppercase">Допуск</div>
            <div className="text-lg font-bold text-gray-600">±{maxDeviation}%</div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-24">Год</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Бюджет</th>
                {showDetails && (
                  <>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase">Баллы</th>
                    {!noInflation && (
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase">Инд.</th>
                    )}
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase">После инд.</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-orange-500 uppercase">Добавка</th>
                  </>
                )}
                <th className="px-4 py-3 text-right text-xs font-medium text-blue-600 uppercase bg-blue-50">Начислено</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase w-20">Статус</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((row) => {
                const yearDeviation = row.budget > 0 ? ((row.total - row.budget) / row.budget) * 100 : 0;
                const yearPassed = Math.abs(yearDeviation) <= maxDeviation;
                return (
                  <tr key={row.year} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">Год {row.year}</div>
                      <div className="text-xs text-gray-400">{row.calendarYear}</div>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600">{formatNumber(row.budget)}</td>
                    {showDetails && (
                      <>
                        <td className="px-4 py-3 text-right text-gray-400">{formatNumber(row.basePointsRaw)}</td>
                        {!noInflation && (
                          <td className="px-4 py-3 text-center text-gray-400">{formatCoefficient(row.indexation)}</td>
                        )}
                        <td className="px-4 py-3 text-right text-gray-400">{formatNumber(row.basePointsIndexed)}</td>
                        <td className="px-4 py-3 text-right text-orange-600">{formatNumber(row.allowance)}</td>
                      </>
                    )}
                    <td className="px-4 py-3 text-right font-bold text-blue-600 bg-blue-50">{formatNumber(row.total)}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                        yearPassed
                          ? 'bg-green-100 text-green-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {yearPassed ? '✓' : '~'}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {/* Строка ИТОГО */}
              <tr className="bg-gray-100 font-semibold border-t-2 border-gray-300">
                <td className="px-4 py-3 text-gray-700">Итого</td>
                <td className="px-4 py-3 text-right text-gray-900">{formatNumber(totals.totalBudget)}</td>
                {showDetails && (
                  <>
                    <td className="px-4 py-3 text-right text-gray-400">—</td>
                    {!noInflation && <td className="px-4 py-3"></td>}
                    <td className="px-4 py-3 text-right text-gray-400">—</td>
                    <td className="px-4 py-3 text-right text-gray-400">—</td>
                  </>
                )}
                <td className="px-4 py-3 text-right text-blue-700 bg-blue-100">{formatNumber(totals.totalAccrued)}</td>
                <td className="px-4 py-3"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Блок 2: Нарастающий итог */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-green-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Накопление баллов</h3>
              <p className="text-sm text-gray-500">
                Накоплено ≥ накопленного бюджета каждый год
              </p>
            </div>
            {(() => {
              const allPassed = results.every(r => r.cumulativeCheck);
              return (
                <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  allPassed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {allPassed ? '✓ Все годы в норме' : '✗ Есть проблемы'}
                </div>
              );
            })()}
          </div>
        </div>

        {/* Финальный результат */}
        {results.length > 0 && (
          <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 border-b border-gray-200">
            <div className="text-center">
              <div className="text-xs text-gray-500 uppercase">Накоплено баллов</div>
              <div className="text-lg font-bold text-blue-600">{formatNumber(results[results.length - 1].cumulativeTotal)}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 uppercase">Накопленный бюджет</div>
              <div className="text-lg font-bold text-gray-900">{formatNumber(results[results.length - 1].cumulativeBudget)}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 uppercase">Запас</div>
              <div className={`text-lg font-bold ${results[results.length - 1].cumulativeCheck ? 'text-green-600' : 'text-red-600'}`}>
                {formatDiff(results[results.length - 1].cumulativeDiff)}
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-24">Год</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-green-600 uppercase bg-green-50">Накоплено</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Бюджет нараст.</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase w-20">Статус</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Запас</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((row) => (
                <tr key={row.year} className={`hover:bg-gray-50 ${!row.cumulativeCheck ? 'bg-red-50' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">Год {row.year}</div>
                    <div className="text-xs text-gray-400">{row.calendarYear}</div>
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-green-600 bg-green-50">{formatNumber(row.cumulativeTotal)}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{formatNumber(row.cumulativeBudget)}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                      row.cumulativeCheck
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {row.cumulativeCheck ? '✓' : '✗'}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-right font-medium ${
                    row.cumulativeCheck ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatDiff(row.cumulativeDiff)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Блок 3: Покупательная способность */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Покупательная способность</h3>
              <p className="text-sm text-gray-500">
                Баллов хватает на референсный товар каждый год
              </p>
            </div>
            {(() => {
              const allPassed = results.every(r => r.purchaseCheck);
              return (
                <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  allPassed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {allPassed ? '✓ Можно купить' : '✗ Не хватает'}
                </div>
              );
            })()}
          </div>
        </div>

        {/* Сводка по покупательной способности */}
        {results.length > 0 && (
          <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 border-b border-gray-200">
            <div className="text-center">
              <div className="text-xs text-gray-500 uppercase">Мин. начисление</div>
              <div className="text-lg font-bold text-blue-600">{formatNumber(Math.min(...results.map(r => r.total)))}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 uppercase">Макс. цена товара</div>
              <div className="text-lg font-bold text-gray-900">{formatNumber(Math.max(...results.map(r => r.referencePrice)))}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 uppercase">Худший год</div>
              <div className={`text-lg font-bold ${Math.min(...results.map(r => r.purchaseDiff)) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatDiff(Math.min(...results.map(r => r.purchaseDiff)))}
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-24">Год</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-purple-600 uppercase bg-purple-50">Начислено</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Цена товара</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase w-20">Статус</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Остаток</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((row) => (
                <tr key={row.year} className={`hover:bg-gray-50 ${!row.purchaseCheck ? 'bg-red-50' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">Год {row.year}</div>
                    <div className="text-xs text-gray-400">{row.calendarYear}</div>
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-purple-600 bg-purple-50">{formatNumber(row.total)}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{formatNumber(row.referencePrice)}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                      row.purchaseCheck
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {row.purchaseCheck ? '✓' : '✗'}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-right font-medium ${
                    row.purchaseCheck ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatDiff(row.purchaseDiff)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
