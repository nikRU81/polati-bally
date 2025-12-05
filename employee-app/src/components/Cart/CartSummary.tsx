import { formatNumber } from '../../utils/formatters';

interface CartSummaryProps {
  totalItems: number;
  totalPoints: number;
  balance: number;
  onCheckout: () => void;
}

export function CartSummary({ totalItems, totalPoints, balance, onCheckout }: CartSummaryProps) {
  const canCheckout = balance >= totalPoints && totalItems > 0;
  const insufficientPoints = totalItems > 0 && balance < totalPoints;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      {/* Summary */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Товаров:</span>
          <span className="font-medium">{totalItems}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Ваш баланс:</span>
          <span className="font-medium text-blue-600">{formatNumber(balance)} б.</span>
        </div>
        <div className="h-px bg-gray-200 my-2" />
        <div className="flex justify-between">
          <span className="font-medium text-gray-900">Итого:</span>
          <span className="text-xl font-bold text-blue-600">{formatNumber(totalPoints)} б.</span>
        </div>
      </div>

      {/* Insufficient points warning */}
      {insufficientPoints && (
        <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-red-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div>
              <p className="text-sm font-medium text-red-800">Недостаточно баллов</p>
              <p className="text-xs text-red-600">
                Не хватает {formatNumber(totalPoints - balance)} б.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Checkout button */}
      <button
        onClick={onCheckout}
        disabled={!canCheckout}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
          canCheckout
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        Оформить заказ
      </button>

      {/* Remaining balance */}
      {canCheckout && (
        <p className="text-xs text-center text-gray-500 mt-2">
          После заказа останется: {formatNumber(balance - totalPoints)} б.
        </p>
      )}
    </div>
  );
}
