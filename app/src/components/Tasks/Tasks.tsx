import { useState, useMemo, useCallback } from 'react';
import { useTasksContext } from '../../context/TasksContext';
import type { Task } from '../../types';
import { TasksFilter } from './TasksFilter';
import { TasksTable } from './TasksTable';
import { TasksStats } from './TasksStats';
import { AddTaskModal } from './AddTaskModal';

export function Tasks() {
  const [showAddModal, setShowAddModal] = useState(false);
  const {
    tasks: allTasks,
    isLoading,
    error,
    updateTask,
    addTask,
    deleteTask,
    resetTasks,
  } = useTasksContext();

  // Local filters (not in context)
  const [categoryFilter, setCategoryFilter] = useState<string>('Все');
  const [frequencyFilter, setFrequencyFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Local sorting (not in context)
  const [sortField, setSortField] = useState<keyof Task>('taskId');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(allTasks.map(t => t.category));
    return ['Все', ...Array.from(cats).sort()];
  }, [allTasks]);

  // Filtered tasks
  const filteredTasks = useMemo(() => {
    return allTasks.filter(task => {
      if (categoryFilter !== 'Все' && task.category !== categoryFilter) {
        return false;
      }
      if (frequencyFilter !== 'all' && task.frequency !== frequencyFilter) {
        return false;
      }
      if (yearFilter !== 'all' && task.appliesToYear !== yearFilter && task.appliesToYear !== 'all') {
        return false;
      }
      if (searchQuery && !task.taskName.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [allTasks, categoryFilter, frequencyFilter, yearFilter, searchQuery]);

  // Sorted tasks
  const tasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      return sortDirection === 'asc'
        ? aStr.localeCompare(bStr, 'ru')
        : bStr.localeCompare(aStr, 'ru');
    });
  }, [filteredTasks, sortField, sortDirection]);

  // Stats
  const stats = useMemo(() => {
    const totalTasks = allTasks.length;
    const totalPoints = allTasks.reduce((sum, t) => sum + t.basePoints, 0);

    const byCategory = allTasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + task.basePoints;
      return acc;
    }, {} as Record<string, number>);

    return { totalTasks, totalPoints, byCategory };
  }, [allTasks]);

  // Handle sort
  const handleSort = useCallback((field: keyof Task) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  }, [sortField]);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="text-gray-500">Загрузка заданий...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Задания</h1>
          <p className="text-gray-500 mt-1">Редактор заданий программы лояльности</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Добавить задание
          </button>
          <button
            onClick={resetTasks}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Сбросить изменения
          </button>
        </div>
      </div>

      <TasksFilter
        categories={categories}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        frequencyFilter={frequencyFilter}
        setFrequencyFilter={setFrequencyFilter}
        yearFilter={yearFilter}
        setYearFilter={setYearFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <TasksTable
            tasks={tasks}
            categories={categories}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
        </div>
        <div className="lg:col-span-1">
          <TasksStats
            totalTasks={stats.totalTasks}
            totalPoints={stats.totalPoints}
            byCategory={stats.byCategory}
            filteredCount={tasks.length}
          />
        </div>
      </div>

      {showAddModal && (
        <AddTaskModal
          categories={categories.filter(c => c !== 'Все')}
          onAdd={addTask}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}
