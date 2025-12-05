interface HistoryTabsProps {
  activeTab: 'all' | 'accrual' | 'redemption';
  onTabChange: (tab: 'all' | 'accrual' | 'redemption') => void;
  counts: {
    all: number;
    accrual: number;
    redemption: number;
  };
}

export function HistoryTabs({ activeTab, onTabChange, counts }: HistoryTabsProps) {
  const tabs = [
    { id: 'all' as const, label: 'Все', count: counts.all },
    { id: 'accrual' as const, label: 'Начисления', count: counts.accrual },
    { id: 'redemption' as const, label: 'Списания', count: counts.redemption },
  ];

  return (
    <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab.label}
          <span
            className={`ml-1 text-xs ${
              activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            ({tab.count})
          </span>
        </button>
      ))}
    </div>
  );
}
