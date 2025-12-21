import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { categories } from '../../data/categories';
import { tasks } from '../../data/tasks';

export function CategoryChart() {
  // Calculate progress for each category
  const categoryProgress = categories.map((category) => {
    const categoryTasks = tasks.filter((t) => t.categoryId === category.id);
    const completedTasks = categoryTasks.filter((t) => t.status === 'completed');
    const progress = categoryTasks.length > 0
      ? Math.round((completedTasks.length / categoryTasks.length) * 100)
      : 0;

    return {
      ...category,
      completedCount: completedTasks.length,
      totalCount: categoryTasks.length,
      progress,
    };
  });

  return (
    <Card>
      <h3 className="font-semibold text-gray-800 mb-4">Прогресс по категориям</h3>
      <div className="space-y-4">
        {categoryProgress.slice(0, 6).map((cat) => (
          <div key={cat.id}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm text-gray-600">{cat.name}</span>
              <span className="text-xs text-gray-400">
                {cat.completedCount}/{cat.totalCount}
              </span>
            </div>
            <ProgressBar
              progress={cat.progress}
              color={cat.color === '#F97316' ? 'orange' : cat.color === '#22C55E' ? 'green' : 'blue'}
              size="sm"
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
