import { Link } from 'react-router-dom';
import { ListTodo, Trophy, ShoppingBag, UserPlus } from 'lucide-react';
import { Card } from '../ui/Card';

const actions = [
  {
    to: '/tasks',
    icon: ListTodo,
    label: 'Все задания',
    description: 'Посмотреть доступные задания',
    color: 'bg-blue-50 text-polati-blue',
  },
  {
    to: '/path',
    icon: Trophy,
    label: 'Путь к успеху',
    description: '153 смены до награды',
    color: 'bg-orange-50 text-polati-orange',
  },
  {
    to: '/shop',
    icon: ShoppingBag,
    label: 'Магазин',
    description: 'Обменять баллы на подарки',
    color: 'bg-green-50 text-polati-green',
  },
  {
    to: '/tasks?category=referral',
    icon: UserPlus,
    label: 'Приведи друга',
    description: 'Получи 1500 баллов',
    color: 'bg-purple-50 text-purple-600',
  },
];

export function QuickActions() {
  return (
    <Card>
      <h3 className="font-semibold text-gray-800 mb-4">Быстрые действия</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <div className={`p-2 rounded-lg ${action.color}`}>
              <action.icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-800 group-hover:text-polati-blue transition-colors">
                {action.label}
              </p>
              <p className="text-xs text-gray-500 truncate">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}
