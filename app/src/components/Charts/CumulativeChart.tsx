import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import type { YearlyResult } from '../../types';
import { formatNumber } from '../../utils/formatters';

interface CumulativeChartProps {
  results: YearlyResult[];
}

export function CumulativeChart({ results }: CumulativeChartProps) {
  const data = results.map((r) => ({
    year: r.calendarYear,
    cumulativeBudget: r.cumulativeBudget,
    cumulativeTotal: r.cumulativeTotal,
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Нарастающий итог</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
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
                name === 'cumulativeBudget' ? 'Накопленный бюджет' : 'Накопленные начисления'
              ]}
              labelFormatter={(label) => `${label} год`}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
              formatter={(value) => value === 'cumulativeBudget' ? 'Накопленный бюджет' : 'Накопленные начисления'}
            />
            <Area
              type="monotone"
              dataKey="cumulativeBudget"
              name="cumulativeBudget"
              stroke="#94a3b8"
              fill="#e2e8f0"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="cumulativeTotal"
              name="cumulativeTotal"
              stroke="#3b82f6"
              fill="#93c5fd"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
