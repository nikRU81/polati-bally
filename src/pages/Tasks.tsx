import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { categories } from '../data/categories';
import { tasks } from '../data/tasks';
import { formatNumber, calculateProgress } from '../utils/formatters';
import {
  GraduationCap, Calendar, TrendingUp, Trophy, Heart,
  Shield, Plane, Users, Smartphone, Gift, Check, Lock, Clock
} from 'lucide-react';
import type { CategoryId, TaskStatus } from '../types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  Calendar,
  TrendingUp,
  Trophy,
  Heart,
  Shield,
  Plane,
  Users,
  Smartphone,
  Gift,
};

const statusConfig: Record<TaskStatus, { label: string; icon: typeof Check; color: string }> = {
  completed: { label: 'Выполнено', icon: Check, color: 'green' },
  available: { label: 'Доступно', icon: Clock, color: 'blue' },
  in_progress: { label: 'В процессе', icon: Clock, color: 'orange' },
  locked: { label: 'Заблокировано', icon: Lock, color: 'gray' },
};

export function Tasks() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');

  const filteredTasks = tasks.filter((task) => {
    if (selectedCategory !== 'all' && task.categoryId !== selectedCategory) return false;
    if (statusFilter !== 'all' && task.status !== statusFilter) return false;
    return true;
  });

  const getCategoryStats = (categoryId: CategoryId) => {
    const catTasks = tasks.filter((t) => t.categoryId === categoryId);
    const completed = catTasks.filter((t) => t.status === 'completed').length;
    return { completed, total: catTasks.length };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Задания</h1>
        <p className="text-gray-500">Выполняй задания и зарабатывай баллы</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0 space-y-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              selectedCategory === 'all'
                ? 'bg-polati-blue text-white'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">Все категории</span>
              <span className="text-sm opacity-70">{tasks.length}</span>
            </div>
          </button>

          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Gift;
            const stats = getCategoryStats(category.id);

            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-polati-blue text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{category.name}</p>
                    <p className="text-xs opacity-70">
                      {stats.completed}/{stats.total} выполнено
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-4">
          {/* Filters */}
          <div className="flex gap-2">
            {(['all', 'available', 'in_progress', 'completed', 'locked'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === status
                    ? 'bg-polati-blue text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {status === 'all' ? 'Все' : statusConfig[status].label}
              </button>
            ))}
          </div>

          {/* Tasks Grid */}
          <div className="grid gap-4">
            {filteredTasks.map((task) => {
              const status = statusConfig[task.status];
              const StatusIcon = status.icon;
              const category = categories.find((c) => c.id === task.categoryId);

              return (
                <Card key={task.id} hover>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant={status.color as 'green' | 'blue' | 'orange' | 'gray'}
                          size="sm"
                        >
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {status.label}
                        </Badge>
                        {category && (
                          <Badge variant="gray" size="sm">
                            {category.name}
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-1">{task.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">{task.description}</p>

                      {task.progress !== undefined && task.maxProgress && (
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500">Прогресс</span>
                            <span className="font-medium">
                              {task.progress} / {task.maxProgress}
                            </span>
                          </div>
                          <ProgressBar
                            progress={calculateProgress(task.progress, task.maxProgress)}
                            color={task.status === 'completed' ? 'green' : 'blue'}
                            size="sm"
                          />
                        </div>
                      )}

                      {task.frequency && (
                        <p className="text-xs text-gray-400">{task.frequency}</p>
                      )}
                    </div>

                    <div className="text-right ml-4">
                      <p className="text-2xl font-bold text-polati-blue">
                        +{formatNumber(task.points)}
                      </p>
                      <p className="text-xs text-gray-400">баллов</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {filteredTasks.length === 0 && (
            <Card className="text-center py-12">
              <p className="text-gray-500">Нет заданий по выбранным фильтрам</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
