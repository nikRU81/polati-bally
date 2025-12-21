import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ListTodo,
  Trophy,
  ShoppingBag,
  History,
  User,
  Presentation,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Главная' },
  { to: '/tasks', icon: ListTodo, label: 'Задания' },
  { to: '/path', icon: Trophy, label: 'Путь к успеху' },
  { to: '/shop', icon: ShoppingBag, label: 'Магазин' },
  { to: '/history', icon: History, label: 'История' },
  { to: '/profile', icon: User, label: 'Профиль' },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] sticky top-16 flex flex-col">
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg transition-all
              ${isActive
                ? 'bg-polati-blue text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              }
            `}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Presentation Button */}
      <div className="p-4 border-t border-gray-200">
        <NavLink
          to="/presentation"
          className={({ isActive }) => `
            flex items-center gap-3 px-4 py-3 rounded-lg transition-all
            ${isActive
              ? 'bg-polati-orange text-white'
              : 'bg-orange-50 text-polati-orange hover:bg-orange-100'
            }
          `}
        >
          <Presentation className="w-5 h-5" />
          <span className="font-medium">Презентация</span>
        </NavLink>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-400">ПОЛАТИ БАЛЛЫ</p>
          <p className="text-xs text-gray-400">Запуск 2026</p>
        </div>
      </div>
    </aside>
  );
}
