import type { TabId } from '../../types';

interface QuickActionsProps {
  onNavigate: (tab: TabId) => void;
}

export function QuickActions({ onNavigate }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={() => onNavigate('tasks')}
        className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-gray-900">Задания</p>
          <p className="text-xs text-gray-500">Заработать баллы</p>
        </div>
      </button>

      <button
        onClick={() => onNavigate('catalog')}
        className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-gray-900">Каталог</p>
          <p className="text-xs text-gray-500">Потратить баллы</p>
        </div>
      </button>
    </div>
  );
}
