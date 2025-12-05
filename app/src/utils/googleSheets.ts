import type { Task } from '../types';

interface TasksResponse {
  tasks: Task[];
  source: 'google' | 'local';
}

export async function fetchTasksFromAPI(): Promise<TasksResponse> {
  try {
    const response = await fetch('/api/tasks');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    if (data.tasks?.length > 0) {
      return { tasks: data.tasks, source: 'google' };
    }
    throw new Error('Empty response');
  } catch (error) {
    console.warn('API недоступен, fallback на локальный CSV:', error);
    return { tasks: [], source: 'local' };
  }
}
