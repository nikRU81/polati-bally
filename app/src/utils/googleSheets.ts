import type { Task } from '../types';

interface TasksResponse {
  tasks: Task[];
  source: 'google' | 'local';
}

// Convert snake_case to camelCase
function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

// Transform API response to match Task interface
function transformTask(rawTask: Record<string, any>): Task {
  const transformed: Record<string, any> = {};

  for (const [key, value] of Object.entries(rawTask)) {
    const camelKey = snakeToCamel(key);
    transformed[camelKey] = value;
  }

  // Ensure numeric fields are numbers
  return {
    taskId: String(transformed.taskId ?? ''),
    category: String(transformed.category ?? ''),
    taskName: String(transformed.taskName ?? ''),
    basePoints: Number(transformed.basePoints ?? 0),
    frequency: (transformed.frequency as Task['frequency']) ?? 'once',
    condition: String(transformed.condition ?? ''),
    probability: Number(transformed.probability ?? 1),
    appliesToYear: String(transformed.appliesToYear ?? 'all'),
    description: String(transformed.description ?? ''),
  };
}

export async function fetchTasksFromAPI(): Promise<TasksResponse> {
  try {
    const response = await fetch('/api/tasks');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    if (data.tasks?.length > 0) {
      // Transform snake_case to camelCase
      const transformedTasks = data.tasks.map(transformTask);
      return { tasks: transformedTasks, source: 'google' };
    }
    throw new Error('Empty response');
  } catch (error) {
    console.warn('API недоступен, fallback на локальный CSV:', error);
    return { tasks: [], source: 'local' };
  }
}
