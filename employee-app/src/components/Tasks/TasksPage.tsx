import { useState, useMemo } from 'react';
import { TaskCard } from './TaskCard';
import { TasksFilter } from './TasksFilter';
import type { EmployeeTask } from '../../types';

interface TasksPageProps {
  tasks: EmployeeTask[];
  onCompleteTask: (taskId: string) => void;
}

export function TasksPage({ tasks, onCompleteTask }: TasksPageProps) {
  const [activeCategory, setActiveCategory] = useState('Все');

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(tasks.map((t) => t.category))];
    return ['Все', ...uniqueCategories];
  }, [tasks]);

  // Filter tasks
  const filteredTasks = useMemo(() => {
    if (activeCategory === 'Все') return tasks;
    return tasks.filter((t) => t.category === activeCategory);
  }, [tasks, activeCategory]);

  // Group by status for stats
  const stats = useMemo(() => {
    const available = tasks.filter((t) => t.status === 'available').length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const totalPoints = tasks
      .filter((t) => t.status === 'available')
      .reduce((sum, t) => sum + t.basePoints, 0);
    return { available, completed, totalPoints };
  }, [tasks]);

  return (
    <div className="p-4 pb-20 md:pb-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900">Задания</h1>
        <p className="text-sm text-gray-500 mt-1">
          Доступно {stats.available} заданий на {stats.totalPoints.toLocaleString('ru-RU')} баллов
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-2xl font-bold text-blue-600">{stats.available}</p>
          <p className="text-xs text-blue-600">Доступно</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3">
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          <p className="text-xs text-green-600">Выполнено</p>
        </div>
      </div>

      {/* Filter */}
      <TasksFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Tasks list */}
      <div className="mt-4 space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Нет заданий в этой категории</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard key={task.taskId} task={task} onComplete={onCompleteTask} />
          ))
        )}
      </div>
    </div>
  );
}
