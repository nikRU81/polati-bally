import { frequencyLabels, yearOptions } from '../../data/defaults';

interface TasksFilterProps {
  categories: string[];
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  frequencyFilter: string;
  setFrequencyFilter: (value: string) => void;
  yearFilter: string;
  setYearFilter: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export function TasksFilter({
  categories,
  categoryFilter,
  setCategoryFilter,
  frequencyFilter,
  setFrequencyFilter,
  yearFilter,
  setYearFilter,
  searchQuery,
  setSearchQuery,
}: TasksFilterProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Поиск */}
        <div className="lg:col-span-2">
          <label className="block text-xs font-medium text-gray-500 mb-1">Поиск</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Название задания..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Категория */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Категория</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Периодичность */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Периодичность</label>
          <select
            value={frequencyFilter}
            onChange={(e) => setFrequencyFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Все</option>
            {Object.entries(frequencyLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* Год применения */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Год применения</label>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Все годы</option>
            {yearOptions.filter(y => y !== 'all').map(year => (
              <option key={year} value={year}>Год {year}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
