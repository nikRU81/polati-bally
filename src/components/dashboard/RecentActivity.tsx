import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { demoHistory } from '../../data/demoHistory';
import { categories } from '../../data/categories';
import { formatRelativeDate, formatNumber } from '../../utils/formatters';

export function RecentActivity() {
  const recentItems = demoHistory.slice(0, 5);

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return 'gray';
    if (category.color === '#F97316') return 'orange';
    if (category.color === '#22C55E') return 'green';
    if (category.color === '#EF4444') return 'red';
    return 'blue';
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.name || categoryId;
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Последние начисления</h3>
        <a href="/history" className="text-sm text-polati-blue hover:underline">
          Все
        </a>
      </div>
      <div className="space-y-3">
        {recentItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {item.taskName}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={getCategoryColor(item.categoryId)} size="sm">
                  {getCategoryName(item.categoryId)}
                </Badge>
                <span className="text-xs text-gray-400">
                  {formatRelativeDate(item.date)}
                </span>
              </div>
            </div>
            <div className="text-right ml-4">
              <span className="text-sm font-bold text-polati-green">
                +{formatNumber(item.points)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
