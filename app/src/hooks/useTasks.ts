import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Task } from '../types';
import { parseTasks } from '../utils/csvParser';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [originalTasks, setOriginalTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Фильтры
  const [categoryFilter, setCategoryFilter] = useState<string>('Все');
  const [frequencyFilter, setFrequencyFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Сортировка
  const [sortField, setSortField] = useState<keyof Task>('taskId');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Загрузка заданий из CSV
  useEffect(() => {
    async function loadTasks() {
      try {
        const loadedTasks = await parseTasks('/data/tasks.csv');
        setTasks(loadedTasks);
        setOriginalTasks(loadedTasks);
      } catch (err) {
        console.error('Failed to load tasks:', err);
        setError('Не удалось загрузить задания');
      } finally {
        setIsLoading(false);
      }
    }

    loadTasks();
  }, []);

  // Получение уникальных категорий
  const categories = useMemo(() => {
    const cats = new Set(tasks.map(t => t.category));
    return ['Все', ...Array.from(cats).sort()];
  }, [tasks]);

  // Фильтрованные задания
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Фильтр по категории
      if (categoryFilter !== 'Все' && task.category !== categoryFilter) {
        return false;
      }

      // Фильтр по периодичности
      if (frequencyFilter !== 'all' && task.frequency !== frequencyFilter) {
        return false;
      }

      // Фильтр по году
      if (yearFilter !== 'all' && task.appliesToYear !== yearFilter && task.appliesToYear !== 'all') {
        return false;
      }

      // Поиск по названию
      if (searchQuery && !task.taskName.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [tasks, categoryFilter, frequencyFilter, yearFilter, searchQuery]);

  // Отсортированные задания
  const sortedTasks = useMemo(() => {
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

  // Статистика
  const stats = useMemo(() => {
    const totalTasks = tasks.length;
    const totalPoints = tasks.reduce((sum, t) => sum + t.basePoints, 0);

    const byCategory = tasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + task.basePoints;
      return acc;
    }, {} as Record<string, number>);

    return { totalTasks, totalPoints, byCategory };
  }, [tasks]);

  // Обновление задания
  const updateTask = useCallback((taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task =>
      task.taskId === taskId
        ? { ...task, ...updates }
        : task
    ));
  }, []);

  // Обновление баллов задания (для совместимости)
  const updateTaskPoints = useCallback((taskId: string, newPoints: number) => {
    updateTask(taskId, { basePoints: newPoints });
  }, [updateTask]);

  // Добавление нового задания
  const addTask = useCallback((task: Omit<Task, 'taskId'>) => {
    const newTaskId = `TASK_${String(tasks.length + 1).padStart(3, '0')}`;
    const newTask: Task = {
      ...task,
      taskId: newTaskId,
    };
    setTasks(prev => [...prev, newTask]);
  }, [tasks.length]);

  // Удаление задания
  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(task => task.taskId !== taskId));
  }, []);

  // Сброс к исходным значениям
  const resetTasks = useCallback(() => {
    setTasks(originalTasks);
  }, [originalTasks]);

  // Изменение сортировки
  const handleSort = useCallback((field: keyof Task) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  }, [sortField]);

  return {
    tasks: sortedTasks,
    allTasks: tasks,
    isLoading,
    error,
    categories,
    stats,
    // Фильтры
    categoryFilter,
    setCategoryFilter,
    frequencyFilter,
    setFrequencyFilter,
    yearFilter,
    setYearFilter,
    searchQuery,
    setSearchQuery,
    // Сортировка
    sortField,
    sortDirection,
    handleSort,
    // Действия
    updateTask,
    updateTaskPoints,
    addTask,
    deleteTask,
    resetTasks,
  };
}
