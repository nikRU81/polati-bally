import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Task } from '../types';
import { parseTasks } from '../utils/csvParser';

interface TasksContextValue {
  tasks: Task[];
  originalTasks: Task[];
  isLoading: boolean;
  error: string | null;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  addTask: (task: Omit<Task, 'taskId'>) => void;
  deleteTask: (taskId: string) => void;
  resetTasks: () => void;
}

const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [originalTasks, setOriginalTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load tasks from CSV on mount
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

  // Update task
  const updateTask = useCallback((taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task =>
      task.taskId === taskId
        ? { ...task, ...updates }
        : task
    ));
  }, []);

  // Add new task
  const addTask = useCallback((task: Omit<Task, 'taskId'>) => {
    setTasks(prev => {
      const newTaskId = `TASK_${String(prev.length + 1).padStart(3, '0')}`;
      const newTask: Task = {
        ...task,
        taskId: newTaskId,
      };
      return [...prev, newTask];
    });
  }, []);

  // Delete task
  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(task => task.taskId !== taskId));
  }, []);

  // Reset to original tasks
  const resetTasks = useCallback(() => {
    setTasks(originalTasks);
  }, [originalTasks]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        originalTasks,
        isLoading,
        error,
        updateTask,
        addTask,
        deleteTask,
        resetTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasksContext() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasksContext must be used within TasksProvider');
  }
  return context;
}
