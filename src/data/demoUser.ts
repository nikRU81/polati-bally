import type { User } from '../types';

export const demoUser: User = {
  id: '001',
  name: 'Иванов Алексей Петрович',
  group: 'РС',
  position: 'Монтажник',
  category: 'СЛИП 3',
  totalShifts: 347,
  balance: 8750,
  level: 'Золото',
  startDate: '2023-03-15',
  currentObject: 'Объект Северный-12',
  objectsCount: 5,
  achievements: [
    'Велком бонус',
    'Первое обучение в УЦ',
    'Эволюция 300',
    'Кочевник 2 объекта',
    'Герб x5',
    'СЛИП 3',
    'Ночная Сова',
    'ПОЛАТИ БОНУС Золото',
    'ПОЛАТИ СТАЖ 250',
  ],
};
