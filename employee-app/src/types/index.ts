// Пользователь
export interface User {
  id: string;
  name: string;
  employeeYear: number;
  position: string;
}

// Баланс
export interface Balance {
  current: number;
  totalEarned: number;
  totalSpent: number;
}

// Прогресс до награды
export interface RewardProgress {
  currentPoints: number;
  targetPoints: number;
  targetRewardName: string;
  percentComplete: number;
}

// Задание для работника
export interface EmployeeTask {
  taskId: string;
  category: string;
  taskName: string;
  basePoints: number;
  description: string;
  status: 'available' | 'completed' | 'unavailable';
  completedAt?: string;
  frequency: 'once' | 'yearly' | 'conditional';
  appliesToYear?: string; // "1", "2", "3", "4", "5", "all"
}

// Товар каталога
export interface CatalogItem {
  itemId: string;
  itemName: string;
  price: number;
  category: string;
  imageUrl?: string;
  description: string;
  inStock: boolean;
}

// Товар в корзине
export interface CartItem {
  item: CatalogItem;
  quantity: number;
}

// Транзакция (начисление/списание)
export interface Transaction {
  id: string;
  type: 'accrual' | 'redemption';
  amount: number;
  description: string;
  date: string;
  taskId?: string;
  orderId?: string;
}

// Заказ
export interface Order {
  id: string;
  items: CartItem[];
  totalPoints: number;
  status: 'pending' | 'confirmed' | 'delivered';
  createdAt: string;
}

// Вкладки навигации
export type TabId = 'dashboard' | 'tasks' | 'catalog' | 'cart' | 'history';

export interface Tab {
  id: TabId;
  label: string;
  icon: string;
  badgeCount?: number;
}
