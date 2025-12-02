import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import type { YearlyResult } from '../../types';
import { formatNumber } from '../../utils/formatters';

interface BudgetVsAccrualsChartProps {
  results: YearlyResult[];
}

export function BudgetVsAccrualsChart({ results }: BudgetVsAccrualsChartProps) {
  const data = results.map((r) => ({
    year: r.calendarYear,
    budget: r.budget,
    total: r.total,
    diff: r.total - r.budget,
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Бюджет vs Начисления по годам</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
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
                name === 'budget' ? 'Бюджет' : 'Начислено'
              ]}
              labelFormatter={(label) => `${label} год`}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
              formatter={(value) => value === 'budget' ? 'Бюджет' : 'Итого начислено'}
            />
            <Bar dataKey="budget" name="budget" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="total" name="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
