import type { YearlyResult } from '../../types';
import { formatNumber } from '../../utils/formatters';

interface MiniTableProps {
  results: YearlyResult[];
}

export function MiniTable({ results }: MiniTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-900">Итоги по годам</h3>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Год</th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Бюджет</th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Итого</th>
            <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Статус</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {results.map((row) => (
            <tr key={row.year} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm font-medium text-gray-900">
                {row.calendarYear}
              </td>
              <td className="px-4 py-2 text-sm text-right text-gray-600">
                {formatNumber(row.budget)}
              </td>
              <td className="px-4 py-2 text-sm text-right font-medium text-blue-600">
                {formatNumber(row.total)}
              </td>
              <td className="px-4 py-2 text-center">
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                  row.cumulativeCheck && row.purchaseCheck
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                }`}>
                  {row.cumulativeCheck && row.purchaseCheck ? '✓' : '✗'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
