import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { demoHistory } from '../data/demoHistory';
import { categories } from '../data/categories';
import { formatNumber, formatDate } from '../utils/formatters';
import { Download, Filter, TrendingUp } from 'lucide-react';
import type { CategoryId } from '../types';

export function History() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryId | 'all'>('all');

  const filteredHistory = categoryFilter === 'all'
    ? demoHistory
    : demoHistory.filter((h) => h.categoryId === categoryFilter);

  const totalEarned = demoHistory.reduce((sum, h) => sum + h.points, 0);

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return 'gray';
    if (category.color === '#F97316') return 'orange';
    if (category.color === '#22C55E') return 'green';
    if (category.color === '#EF4444') return 'red';
    return 'blue';
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.name || categoryId;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">История начислений</h1>
          <p className="text-gray-500">Все ваши заработанные баллы</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
          <Download className="w-4 h-4" />
          Экспорт CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-polati-blue to-blue-600 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-blue-200 text-sm">Всего заработано</p>
              <p className="text-2xl font-bold">{formatNumber(totalEarned)} б.</p>
            </div>
          </div>
        </Card>
        <Card>
          <p className="text-gray-500 text-sm">Транзакций</p>
          <p className="text-2xl font-bold text-gray-800">{demoHistory.length}</p>
        </Card>
        <Card>
          <p className="text-gray-500 text-sm">Средний размер</p>
          <p className="text-2xl font-bold text-gray-800">
            {formatNumber(Math.round(totalEarned / demoHistory.length))} б.
          </p>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                categoryFilter === 'all'
                  ? 'bg-polati-blue text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Все
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  categoryFilter === cat.id
                    ? 'bg-polati-blue text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* History Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left p-4 text-sm font-medium text-gray-500">Дата</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Задание</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Категория</th>
                <th className="text-right p-4 text-sm font-medium text-gray-500">Баллы</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="p-4">
                    <span className="text-sm text-gray-600">{formatDate(item.date)}</span>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-gray-800">{item.taskName}</p>
                    {item.description && (
                      <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                    )}
                  </td>
                  <td className="p-4">
                    <Badge variant={getCategoryColor(item.categoryId)} size="sm">
                      {getCategoryName(item.categoryId)}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <span className="font-bold text-polati-green">+{formatNumber(item.points)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredHistory.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-gray-500">Нет записей по выбранному фильтру</p>
        </Card>
      )}
    </div>
  );
}
