import { useState, useMemo, useCallback } from 'react';
import { PhoneFrame } from './components/common/PhoneFrame';
import { BottomNav } from './components/common/BottomNav';
import { MobileHeader } from './components/common/MobileHeader';
import { Dashboard } from './components/Dashboard/Dashboard';
import { TasksPage } from './components/Tasks/TasksPage';
import { CatalogPage } from './components/Catalog/CatalogPage';
import { CartPage } from './components/Cart/CartPage';
import { HistoryPage } from './components/History/HistoryPage';
import { mockUsers, mockBalances, mockTransactions } from './data/mockUsers';
import { getTasksForEmployee } from './data/mockTasks';
import { mockCatalog } from './data/mockCatalog';
import type { TabId, CartItem, CatalogItem, Transaction, RewardProgress } from './types';

function App() {
  // State
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [currentUserId, setCurrentUserId] = useState(mockUsers[1].id); // Start with Anna (year 3)
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [transactions, setTransactions] = useState<Record<string, Transaction[]>>(mockTransactions);
  const [balances, setBalances] = useState(mockBalances);

  // Current user data
  const currentUser = useMemo(
    () => mockUsers.find((u) => u.id === currentUserId) || mockUsers[0],
    [currentUserId]
  );

  const balance = useMemo(() => balances[currentUserId], [balances, currentUserId]);

  const userTransactions = useMemo(
    () => transactions[currentUserId] || [],
    [transactions, currentUserId]
  );

  // Tasks for current user
  const tasks = useMemo(
    () => getTasksForEmployee(currentUser.employeeYear, completedTaskIds),
    [currentUser.employeeYear, completedTaskIds]
  );

  // Reward progress - find cheapest item user can't afford yet
  const rewardProgress: RewardProgress = useMemo(() => {
    const affordableItems = mockCatalog
      .filter((item) => item.inStock && item.price > balance.current)
      .sort((a, b) => a.price - b.price);

    const targetItem = affordableItems[0] || mockCatalog[mockCatalog.length - 1];
    const percentComplete = Math.min(
      Math.round((balance.current / targetItem.price) * 100),
      100
    );

    return {
      currentPoints: balance.current,
      targetPoints: targetItem.price,
      targetRewardName: targetItem.itemName,
      percentComplete,
    };
  }, [balance.current]);

  // Cart item count
  const cartItemCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  // Handlers
  const handleUserChange = useCallback((userId: string) => {
    setCurrentUserId(userId);
    setCartItems([]); // Clear cart when switching users
    setCompletedTaskIds([]); // Reset completed tasks
  }, []);

  const handleCompleteTask = useCallback(
    (taskId: string) => {
      const task = tasks.find((t) => t.taskId === taskId);
      if (!task || task.status !== 'available') return;

      // Mark task as completed
      setCompletedTaskIds((prev) => [...prev, taskId]);

      // Add points to balance
      setBalances((prev) => ({
        ...prev,
        [currentUserId]: {
          ...prev[currentUserId],
          current: prev[currentUserId].current + task.basePoints,
          totalEarned: prev[currentUserId].totalEarned + task.basePoints,
        },
      }));

      // Add transaction
      const newTransaction: Transaction = {
        id: `TXN_${Date.now()}`,
        type: 'accrual',
        amount: task.basePoints,
        description: task.taskName,
        date: new Date().toISOString().split('T')[0],
        taskId: task.taskId,
      };

      setTransactions((prev) => ({
        ...prev,
        [currentUserId]: [...(prev[currentUserId] || []), newTransaction],
      }));
    },
    [tasks, currentUserId]
  );

  const handleAddToCart = useCallback((item: CatalogItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.itemId === item.itemId);
      if (existing) {
        return prev.map((ci) =>
          ci.item.itemId === item.itemId ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  }, []);

  const handleRemoveFromCart = useCallback((itemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.itemId !== itemId));
  }, []);

  const handleUpdateCartQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((ci) => ci.item.itemId !== itemId));
    } else {
      setCartItems((prev) =>
        prev.map((ci) => (ci.item.itemId === itemId ? { ...ci, quantity } : ci))
      );
    }
  }, []);

  const handleCheckout = useCallback(() => {
    const totalPoints = cartItems.reduce(
      (sum, ci) => sum + ci.item.price * ci.quantity,
      0
    );

    if (balance.current < totalPoints) return;

    // Deduct points
    setBalances((prev) => ({
      ...prev,
      [currentUserId]: {
        ...prev[currentUserId],
        current: prev[currentUserId].current - totalPoints,
        totalSpent: prev[currentUserId].totalSpent + totalPoints,
      },
    }));

    // Add transaction for each item
    const itemDescriptions = cartItems.map((ci) => ci.item.itemName).join(', ');
    const newTransaction: Transaction = {
      id: `TXN_${Date.now()}`,
      type: 'redemption',
      amount: totalPoints,
      description: itemDescriptions,
      date: new Date().toISOString().split('T')[0],
      orderId: `ORD_${Date.now()}`,
    };

    setTransactions((prev) => ({
      ...prev,
      [currentUserId]: [...(prev[currentUserId] || []), newTransaction],
    }));

    // Clear cart
    setCartItems([]);
  }, [cartItems, balance.current, currentUserId]);

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            balance={balance}
            transactions={userTransactions}
            rewardProgress={rewardProgress}
            onNavigate={setActiveTab}
          />
        );
      case 'tasks':
        return <TasksPage tasks={tasks} onCompleteTask={handleCompleteTask} />;
      case 'catalog':
        return (
          <CatalogPage
            items={mockCatalog}
            balance={balance.current}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
          />
        );
      case 'cart':
        return (
          <CartPage
            items={cartItems}
            balance={balance.current}
            onRemove={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onCheckout={handleCheckout}
            onNavigate={setActiveTab}
          />
        );
      case 'history':
        return <HistoryPage transactions={userTransactions} />;
      default:
        return null;
    }
  };

  return (
    <PhoneFrame>
      <div className="min-h-full bg-gray-50 flex flex-col">
        {/* Mobile Header */}
        <MobileHeader
          currentUser={currentUser}
          users={mockUsers}
          onUserChange={handleUserChange}
          balance={balance.current}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto pb-16">{renderContent()}</main>

        {/* Mobile Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          cartItemCount={cartItemCount}
        />
      </div>
    </PhoneFrame>
  );
}

export default App;
