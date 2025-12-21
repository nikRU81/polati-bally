import { Bell, Search, User } from 'lucide-react';
import { demoUser } from '../../data/demoUser';
import { formatNumber } from '../../utils/formatters';

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-10">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-polati-blue rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">П</span>
        </div>
        <div>
          <h1 className="font-bold text-lg text-gray-800">ПОЛАТИ БАЛЛЫ</h1>
          <p className="text-xs text-gray-500">Программа лояльности</p>
        </div>
      </div>

      {/* Search (Desktop) */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск заданий..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-polati-blue focus:border-transparent"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Balance */}
        <div className="hidden sm:block text-right">
          <p className="text-xs text-gray-500">Баланс</p>
          <p className="font-bold text-polati-blue">{formatNumber(demoUser.balance)} б.</p>
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-polati-orange rounded-full" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 p-1.5 pr-3 hover:bg-gray-100 rounded-lg transition-colors">
          <div className="w-8 h-8 bg-polati-blue rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-gray-800">{demoUser.name.split(' ')[0]}</p>
            <p className="text-xs text-gray-500">{demoUser.group}</p>
          </div>
        </button>
      </div>
    </header>
  );
}
