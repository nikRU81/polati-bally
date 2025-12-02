import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { YearlyResult } from '../../types';
import { formatNumber } from '../../utils/formatters';

interface MiniChartProps {
  results: YearlyResult[];
}

export function MiniChart({ results }: MiniChartProps) {
  const data = results.map((r) => ({
    year: r.calendarYear,
    budget: r.budget,
    total: r.total,
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Бюджет vs Начисления</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={2}>
            <XAxis
              dataKey="year"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value: number) => formatNumber(value)}
              labelFormatter={(label) => `${label} год`}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px' }}
            />
            <Bar dataKey="budget" name="Бюджет" fill="#94a3b8" radius={[2, 2, 0, 0]} />
            <Bar dataKey="total" name="Итого" fill="#3b82f6" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
