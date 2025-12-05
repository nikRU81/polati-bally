import { useState } from 'react';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import type { CartItem as CartItemType, TabId } from '../../types';

interface CartPageProps {
  items: CartItemType[];
  balance: number;
  onRemove: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onCheckout: () => void;
  onNavigate: (tab: TabId) => void;
}

export function CartPage({
  items,
  balance,
  onRemove,
  onUpdateQuantity,
  onCheckout,
  onNavigate,
}: CartPageProps) {
  const [showSuccess, setShowSuccess] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPoints = items.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  const handleCheckout = () => {
    onCheckout();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Success toast
  if (showSuccess) {
    return (
      <div className="p-4 pb-20 md:pb-4">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Заказ оформлен!</h2>
          <p className="text-gray-500 text-center mb-6">
            Мы свяжемся с вами для уточнения деталей доставки
          </p>
          <button
            onClick={() => onNavigate('catalog')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Продолжить покупки
          </button>
        </div>
      </div>
    );
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <div className="p-4 pb-20 md:pb-4">
        <h1 className="text-xl font-bold text-gray-900 mb-4">Корзина</h1>
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-medium text-gray-900 mb-2">Корзина пуста</h2>
          <p className="text-gray-500 text-center mb-6">
            Добавьте товары из каталога
          </p>
          <button
            onClick={() => onNavigate('catalog')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Перейти в каталог
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pb-20 flex flex-col">
      {/* Header */}
      <div className="mb-4 flex-shrink-0">
        <h1 className="text-xl font-bold text-gray-900">Корзина</h1>
        <p className="text-sm text-gray-500 mt-1">
          {totalItems} {totalItems === 1 ? 'товар' : totalItems < 5 ? 'товара' : 'товаров'}
        </p>
      </div>

      {/* Cart items */}
      <div className="space-y-3 mb-4">
        {items.map((cartItem) => (
          <CartItem
            key={cartItem.item.itemId}
            cartItem={cartItem}
            onRemove={onRemove}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>

      {/* Summary */}
      <div className="mt-auto">
        <CartSummary
          totalItems={totalItems}
          totalPoints={totalPoints}
          balance={balance}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
}
