import React, { useState, useMemo, useEffect } from 'react';
import type { Task } from '../../types';
import { formatNumber } from '../../utils/formatters';
import { frequencyLabels, yearOptions } from '../../data/defaults';

interface TasksTableProps {
  tasks: Task[];
  categories: string[];
  sortField: keyof Task;
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof Task) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TasksTable({
  tasks,
  categories,
  sortField,
  sortDirection,
  onSort,
  onUpdateTask,
  onDeleteTask,
}: TasksTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editField, setEditField] = useState<keyof Task | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());

  // Группировка заданий по категориям с сортировкой по сумме баллов (убывание)
  const sortedCategoriesWithTasks = useMemo(() => {
    const grouped: Record<string, Task[]> = {};
    for (const task of tasks) {
      if (!grouped[task.category]) {
        grouped[task.category] = [];
      }
      grouped[task.category].push(task);
    }

    // Сортируем категории по сумме баллов (от большего к меньшему)
    const sortedEntries = Object.entries(grouped).sort((a, b) => {
      const sumA = a[1].reduce((sum, t) => sum + t.basePoints, 0);
      const sumB = b[1].reduce((sum, t) => sum + t.basePoints, 0);
      return sumB - sumA;
    });

    return sortedEntries;
  }, [tasks]);

  // Инициализируем все категории как свёрнутые при первой загрузке
  useEffect(() => {
    if (sortedCategoriesWithTasks.length > 0 && collapsedCategories.size === 0) {
      const allCategories = new Set(sortedCategoriesWithTasks.map(([cat]) => cat));
      setCollapsedCategories(allCategories);
    }
  }, [sortedCategoriesWithTasks]);

  const toggleCategory = (category: string) => {
    setCollapsedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const handleStartEdit = (task: Task, field: keyof Task) => {
    setEditingId(task.taskId);
    setEditField(field);
    setEditValue(String(task[field]));
  };

  const handleSaveEdit = (taskId: string) => {
    if (!editField) return;

    let value: string | number = editValue;
    if (editField === 'basePoints' || editField === 'probability') {
      const num = editField === 'probability' ? parseFloat(editValue) : parseInt(editValue, 10);
      if (isNaN(num) || num < 0) {
        setEditingId(null);
        setEditField(null);
        return;
      }
      value = num;
    }

    onUpdateTask(taskId, { [editField]: value });
    setEditingId(null);
    setEditField(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, taskId: string) => {
    if (e.key === 'Enter') {
      handleSaveEdit(taskId);
    } else if (e.key === 'Escape') {
      setEditingId(null);
      setEditField(null);
    }
  };

  const handleSelectChange = (taskId: string, field: keyof Task, value: string) => {
    onUpdateTask(taskId, { [field]: value });
  };

  const handleDelete = (taskId: string, taskName: string) => {
    if (confirm(`Удалить задание "${taskName}"?`)) {
      onDeleteTask(taskId);
    }
  };

  const SortIcon = ({ field }: { field: keyof Task }) => {
    if (sortField !== field) return <span className="text-gray-300 ml-1">↕</span>;
    return <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>;
  };

  const headerClass = "px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th onClick={() => onSort('taskId')} className={headerClass}>
                ID <SortIcon field="taskId" />
              </th>
              <th onClick={() => onSort('category')} className={headerClass}>
                Категория <SortIcon field="category" />
              </th>
              <th onClick={() => onSort('taskName')} className={`${headerClass} min-w-[200px]`}>
                Название <SortIcon field="taskName" />
              </th>
              <th onClick={() => onSort('basePoints')} className={headerClass}>
                Баллы <SortIcon field="basePoints" />
              </th>
              <th onClick={() => onSort('frequency')} className={headerClass}>
                Периодичность <SortIcon field="frequency" />
              </th>
              <th onClick={() => onSort('probability')} className={headerClass}>
                Вероятность <SortIcon field="probability" />
              </th>
              <th onClick={() => onSort('appliesToYear')} className={headerClass}>
                Год <SortIcon field="appliesToYear" />
              </th>
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-10">

              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedCategoriesWithTasks.map(([category, categoryTasks]) => {
              const isCollapsed = collapsedCategories.has(category);
              const categoryPoints = categoryTasks.reduce((sum, t) => sum + t.basePoints, 0);
              return (
                <React.Fragment key={category}>
                  {/* Заголовок категории */}
                  <tr
                    className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => toggleCategory(category)}
                  >
                    <td colSpan={8} className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <svg
                          className={`w-4 h-4 text-gray-500 transition-transform ${isCollapsed ? '' : 'rotate-90'}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="font-semibold text-gray-700">{category}</span>
                        <span className="text-sm text-gray-500">
                          ({categoryTasks.length} {categoryTasks.length === 1 ? 'задание' : categoryTasks.length < 5 ? 'задания' : 'заданий'})
                        </span>
                        <span className="text-sm text-blue-600 font-medium ml-auto">
                          {formatNumber(categoryPoints)} баллов
                        </span>
                      </div>
                    </td>
                  </tr>
                  {/* Задания категории */}
                  {!isCollapsed && categoryTasks.map((task) => (
                    <tr key={task.taskId} className="hover:bg-gray-50">
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 font-mono">
                        {task.taskId}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <select
                          value={task.category}
                          onChange={(e) => handleSelectChange(task.taskId, 'category', e.target.value)}
                          className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 border-none cursor-pointer hover:bg-blue-200"
                        >
                          {categories.filter(c => c !== 'Все').map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-2 text-sm text-gray-900" title={task.description}>
                        {editingId === task.taskId && editField === 'taskName' ? (
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={() => handleSaveEdit(task.taskId)}
                            onKeyDown={(e) => handleKeyDown(e, task.taskId)}
                            className="w-full px-2 py-1 text-sm border border-blue-400 rounded focus:ring-2 focus:ring-blue-500"
                            autoFocus
                          />
                        ) : (
                          <button
                            onClick={() => handleStartEdit(task, 'taskName')}
                            className="text-left hover:text-blue-600 hover:underline w-full"
                          >
                            {task.taskName}
                          </button>
                        )}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {editingId === task.taskId && editField === 'basePoints' ? (
                          <input
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={() => handleSaveEdit(task.taskId)}
                            onKeyDown={(e) => handleKeyDown(e, task.taskId)}
                            className="w-20 px-2 py-1 text-sm border border-blue-400 rounded focus:ring-2 focus:ring-blue-500"
                            autoFocus
                          />
                        ) : (
                          <button
                            onClick={() => handleStartEdit(task, 'basePoints')}
                            className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            {formatNumber(task.basePoints)}
                          </button>
                        )}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm">
                        <select
                          value={task.frequency}
                          onChange={(e) => handleSelectChange(task.taskId, 'frequency', e.target.value)}
                          className="px-2 py-1 text-sm border border-gray-200 rounded cursor-pointer hover:border-gray-400"
                        >
                          {Object.entries(frequencyLabels).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {editingId === task.taskId && editField === 'probability' ? (
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="1"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={() => handleSaveEdit(task.taskId)}
                            onKeyDown={(e) => handleKeyDown(e, task.taskId)}
                            className="w-16 px-2 py-1 text-sm border border-blue-400 rounded focus:ring-2 focus:ring-blue-500"
                            autoFocus
                          />
                        ) : (
                          <button
                            onClick={() => handleStartEdit(task, 'probability')}
                            className="text-sm text-gray-600 hover:text-blue-600 hover:underline"
                          >
                            {task.probability === 1 ? '100%' : `${(task.probability * 100).toFixed(0)}%`}
                          </button>
                        )}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm">
                        <select
                          value={task.appliesToYear}
                          onChange={(e) => handleSelectChange(task.taskId, 'appliesToYear', e.target.value)}
                          className="px-2 py-1 text-sm border border-gray-200 rounded cursor-pointer hover:border-gray-400"
                        >
                          {yearOptions.map(year => (
                            <option key={year} value={year}>{year === 'all' ? 'Все' : year}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleDelete(task.taskId, task.taskName)}
                          className="text-red-400 hover:text-red-600 transition-colors"
                          title="Удалить задание"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      {tasks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Нет заданий, соответствующих фильтрам
        </div>
      )}
    </div>
  );
}
