import { formatNumber } from '../../utils/formatters';

interface TasksStatsProps {
  totalTasks: number;
  totalPoints: number;
  byCategory: Record<string, number>;
  filteredCount: number;
}

const categoryColors: Record<string, string> = {
  'Обучение': 'bg-purple-500',
  'Смены': 'bg-blue-500',
  'Карьера': 'bg-green-500',
  'Лояльность': 'bg-yellow-500',
  'Межвахта': 'bg-orange-500',
  'Приведи друга': 'bg-pink-500',
  'Активности': 'bg-cyan-500',
  'События': 'bg-red-500',
};

export function TasksStats({ totalTasks, totalPoints, byCategory, filteredCount }: TasksStatsProps) {
  const sortedCategories = Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Статистика</h3>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{totalTasks}</div>
          <div className="text-xs text-gray-500">Всего заданий</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{formatNumber(totalPoints)}</div>
          <div className="text-xs text-gray-500">Сумма баллов</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-700">{filteredCount}</div>
          <div className="text-xs text-gray-500">Показано</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs font-medium text-gray-500 mb-2">По категориям:</div>
        {sortedCategories.map(([category, points]) => {
          const percentage = (points / totalPoints) * 100;
          const colorClass = categoryColors[category] || 'bg-gray-500';

          return (
            <div key={category} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${colorClass}`} />
              <div className="flex-1 text-xs text-gray-600 truncate">{category}</div>
              <div className="text-xs font-medium text-gray-900">{formatNumber(points)}</div>
              <div className="w-12 text-right text-xs text-gray-400">
                {percentage.toFixed(0)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
