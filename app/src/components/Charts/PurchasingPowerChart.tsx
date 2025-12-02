import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import type { YearlyResult } from '../../types';
import { formatNumber } from '../../utils/formatters';

interface PurchasingPowerChartProps {
  results: YearlyResult[];
  referenceName?: string;
}

export function PurchasingPowerChart({ results, referenceName = 'Сумка' }: PurchasingPowerChartProps) {
  const data = results.map((r) => ({
    year: r.calendarYear,
    total: r.total,
    referencePrice: r.referencePrice,
    canAfford: r.purchaseCheck,
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Покупательная способность</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11 }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value: number, name: string) => [
                formatNumber(value),
                name === 'total' ? 'Итого начислено' : `Цена (${referenceName})`
              ]}
              labelFormatter={(label) => `${label} год`}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
              formatter={(value) => value === 'total' ? 'Итого начислено' : `Цена ${referenceName}`}
            />
            <Line
              type="monotone"
              dataKey="referencePrice"
              name="referencePrice"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ fill: '#f59e0b', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="total"
              name="total"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: '#10b981', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        Зелёная линия должна быть выше оранжевой, чтобы сотрудник мог купить референсный товар
      </div>
    </div>
  );
}
