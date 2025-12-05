import { formatNumber, formatDateShort } from '../../utils/formatters';
import type { EmployeeTask } from '../../types';

interface TaskCardProps {
  task: EmployeeTask;
  onComplete: (taskId: string) => void;
}

export function TaskCard({ task, onComplete }: TaskCardProps) {
  const statusConfig = {
    available: {
      bg: 'bg-white',
      border: 'border-gray-200 hover:border-blue-300',
      badge: 'bg-blue-100 text-blue-800',
      badgeText: 'Доступно',
    },
    completed: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      badge: 'bg-green-100 text-green-800',
      badgeText: 'Выполнено',
    },
    unavailable: {
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      badge: 'bg-gray-100 text-gray-600',
      badgeText: 'Недоступно',
    },
  };

  const config = statusConfig[task.status];

  return (
    <div
      className={`${config.bg} rounded-xl shadow-sm border ${config.border} p-4 transition-colors`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          {/* Category badge */}
          <span className="text-xs text-gray-500 mb-1 block">{task.category}</span>

          {/* Task name */}
          <h3 className="text-sm font-medium text-gray-900">{task.taskName}</h3>

          {/* Description */}
          <p className="text-xs text-gray-500 mt-1">{task.description}</p>

          {/* Completed date */}
          {task.status === 'completed' && task.completedAt && (
            <p className="text-xs text-green-600 mt-2">
              Выполнено {formatDateShort(task.completedAt)}
            </p>
          )}
        </div>

        <div className="text-right flex flex-col items-end gap-2">
          {/* Points */}
          <span className="text-lg font-bold text-blue-600">
            +{formatNumber(task.basePoints)}
          </span>

          {/* Status badge */}
          <span className={`text-xs px-2 py-1 rounded-full ${config.badge}`}>
            {config.badgeText}
          </span>
        </div>
      </div>

      {/* Action button */}
      {task.status === 'available' && (
        <button
          onClick={() => onComplete(task.taskId)}
          className="w-full mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Отметить выполненным
        </button>
      )}
    </div>
  );
}
