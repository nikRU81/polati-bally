import type { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'education',
    name: 'Обучение',
    icon: 'GraduationCap',
    color: '#F97316', // orange
    taskCount: 4,
    availableFor: ['РС', 'ИТР', 'ЦО'],
  },
  {
    id: 'shifts',
    name: 'Смены',
    icon: 'Calendar',
    color: '#F97316',
    taskCount: 200,
    availableFor: ['РС', 'ИТР', 'ЦО'],
  },
  {
    id: 'career',
    name: 'Карьера',
    icon: 'TrendingUp',
    color: '#22C55E', // green
    taskCount: 8,
    availableFor: ['РС', 'ИТР', 'ЦО'],
  },
  {
    id: 'path_to_success',
    name: 'Путь к успеху',
    icon: 'Trophy',
    color: '#2563EB', // blue
    taskCount: 15,
    availableFor: ['РС', 'ИТР', 'ЦО'],
  },
  {
    id: 'loyalty',
    name: 'Лояльность',
    icon: 'Heart',
    color: '#2563EB',
    taskCount: 16,
    availableFor: ['РС', 'ИТР', 'ЦО'],
  },
  {
    id: 'safety',
    name: 'Охрана труда',
    icon: 'Shield',
    color: '#EF4444', // red
    taskCount: 2,
    availableFor: ['РС'],
  },
  {
    id: 'between_shifts',
    name: 'Межвахта',
    icon: 'Plane',
    color: '#2563EB',
    taskCount: 3,
    availableFor: ['РС', 'ИТР'],
  },
  {
    id: 'referral',
    name: 'Приведи друга',
    icon: 'Users',
    color: '#F97316',
    taskCount: 1,
    availableFor: ['РС', 'ИТР', 'ЦО'],
  },
  {
    id: 'activities',
    name: 'Активности',
    icon: 'Smartphone',
    color: '#22C55E',
    taskCount: 5,
    availableFor: ['РС', 'ИТР', 'ЦО'],
  },
  {
    id: 'events',
    name: 'События',
    icon: 'Gift',
    color: '#22C55E',
    taskCount: 6,
    availableFor: ['РС', 'ИТР', 'ЦО'],
  },
];
