// Группы сотрудников
export type EmployeeGroup = 'РС' | 'ИТР' | 'ЦО';

// Статус задания
export type TaskStatus = 'available' | 'completed' | 'locked' | 'in_progress';

// Категории заданий
export type CategoryId =
  | 'education'      // Обучение
  | 'shifts'         // Смены
  | 'career'         // Карьера
  | 'path_to_success'// Путь к успеху
  | 'loyalty'        // Лояльность
  | 'safety'         // Охрана труда
  | 'between_shifts' // Межвахта
  | 'referral'       // Приведи друга
  | 'activities'     // Активности
  | 'events';        // События

// Категория заданий
export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
  color: string;
  taskCount: number;
  availableFor: EmployeeGroup[];
}

// Задание
export interface Task {
  id: string;
  categoryId: CategoryId;
  name: string;
  description: string;
  points: number;
  status: TaskStatus;
  progress?: number;      // для многоуровневых заданий
  maxProgress?: number;
  frequency?: string;     // "однократно", "ежегодно", "до 4 раз/год"
  availableFor: EmployeeGroup[];
  milestone?: number;     // требуемое количество смен для разблокировки
}

// Пользователь
export interface User {
  id: string;
  name: string;
  group: EmployeeGroup;
  position: string;
  category?: string;      // СЛИП уровень для РС
  totalShifts: number;
  balance: number;
  level: 'Новичок' | 'Серебро' | 'Золото' | 'Платина' | 'Бриллиант';
  startDate: string;
  currentObject?: string;
  objectsCount: number;
  achievements: string[];
}

// История начислений
export interface HistoryItem {
  id: string;
  date: string;
  taskName: string;
  categoryId: CategoryId;
  points: number;
  description?: string;
}

// Подарок
export interface Reward {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: 'general' | 'path_to_success' | 'safety';
  requiredShifts?: number;  // для эксклюзивных подарков
  available: boolean;
}

// Контент слайда презентации
export interface SlideContent {
  id: number;
  title?: string;
  subtitle?: string;
  background: 'blue' | 'orange' | 'white';
  content: React.ReactNode;
}

// Статистика для дашборда
export interface DashboardStats {
  balance: number;
  totalShifts: number;
  objectsCount: number;
  level: string;
  nextMilestone: number;
  progressToNextMilestone: number;
}
