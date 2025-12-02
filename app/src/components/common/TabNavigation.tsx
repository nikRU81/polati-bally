import { tabs } from '../../data/defaults';
import type { TabId } from '../../types';

interface TabNavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  noInflation: boolean;
  onToggleInflation: () => void;
}

export function TabNavigation({ activeTab, onTabChange, noInflation, onToggleInflation }: TabNavigationProps) {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-blue-600">ПОЛАТИ</span>
            <span className="text-xl font-light text-gray-600">БАЛЛЫ</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Вкладки */}
            <div className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Разделитель */}
            <div className="h-6 w-px bg-gray-300"></div>

            {/* Переключатель инфляции */}
            <button
              onClick={onToggleInflation}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                noInflation
                  ? 'bg-orange-100 text-orange-700 border border-orange-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={noInflation ? 'Режим без инфляции включён' : 'Включить режим без инфляции'}
            >
              <svg
                className={`w-4 h-4 ${noInflation ? 'text-orange-600' : 'text-gray-400'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <span>{noInflation ? 'Без инфляции' : 'С инфляцией'}</span>
              <div
                className={`w-8 h-4 rounded-full relative transition-colors ${
                  noInflation ? 'bg-orange-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${
                    noInflation ? 'translate-x-4' : 'translate-x-0.5'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
