import type { CatalogItem } from '../../types';
import { formatNumber } from '../../utils/formatters';

interface PricesByYear {
  item: CatalogItem;
  prices: { year: number; calendarYear: number; price: number }[];
}

interface PriceTableProps {
  pricesByYear: PricesByYear[];
  referenceItemId?: string;
  yearlyTotals?: number[];
}

export function PriceTable({ pricesByYear, referenceItemId, yearlyTotals }: PriceTableProps) {
  if (pricesByYear.length === 0) return null;

  const years = pricesByYear[0]?.prices || [];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-900">Цены с учётом инфляции по годам</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Товар
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Базовая цена
              </th>
              {years.map((y) => (
                <th key={y.year} className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {y.calendarYear}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pricesByYear.map(({ item, prices }) => {
              const isReference = item.itemId === referenceItemId || item.isReference;

              return (
                <tr key={item.itemId} className={isReference ? 'bg-yellow-50' : 'hover:bg-gray-50'}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{item.itemName}</span>
                      {isReference && (
                        <span className="px-1.5 py-0.5 text-xs font-medium bg-yellow-200 text-yellow-800 rounded">
                          REF
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-gray-500">
                    {formatNumber(item.basePrice)}
                  </td>
                  {prices.map((p, idx) => {
                    const canAfford = yearlyTotals && yearlyTotals[idx] !== undefined
                      ? yearlyTotals[idx] >= p.price
                      : undefined;

                    return (
                      <td
                        key={p.year}
                        className={`px-4 py-3 text-right text-sm font-medium ${
                          canAfford === false
                            ? 'text-red-600 bg-red-50'
                            : canAfford === true
                            ? 'text-green-600'
                            : 'text-gray-900'
                        }`}
                      >
                        {formatNumber(p.price)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}

            {/* Строка с итогами начислений */}
            {yearlyTotals && (
              <tr className="bg-blue-50 font-semibold">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-900">
                  Итого начислено
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-400">—</td>
                {yearlyTotals.map((total, idx) => (
                  <td key={idx} className="px-4 py-3 text-right text-sm text-blue-600">
                    {formatNumber(total)}
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
