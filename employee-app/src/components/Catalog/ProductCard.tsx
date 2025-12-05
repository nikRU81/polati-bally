import { formatNumber } from '../../utils/formatters';
import type { CatalogItem } from '../../types';

interface ProductCardProps {
  item: CatalogItem;
  balance: number;
  onAddToCart: (item: CatalogItem) => void;
  isInCart: boolean;
}

export function ProductCard({ item, balance, onAddToCart, isInCart }: ProductCardProps) {
  const canAfford = balance >= item.price;
  const isAvailable = item.inStock && canAfford;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 flex gap-3">
      {/* Small image placeholder */}
      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 relative">
        <svg
          className="w-8 h-8 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>

        {/* In cart badge */}
        {isInCart && (
          <div className="absolute -top-1 -right-1">
            <span className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        )}

        {/* Out of stock overlay */}
        {!item.inStock && (
          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs">Нет</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Name */}
        <h3 className="text-sm font-medium text-gray-900 truncate">{item.itemName}</h3>

        {/* Price */}
        <div className="mt-1">
          <span className="text-base font-bold text-blue-600">{formatNumber(item.price)}</span>
          <span className="text-xs text-gray-500 ml-1">б.</span>
        </div>

        {/* Not enough points warning */}
        {item.inStock && !canAfford && (
          <p className="text-xs text-red-500 mt-0.5">
            Не хватает {formatNumber(item.price - balance)} б.
          </p>
        )}
      </div>

      {/* Action button */}
      <div className="flex items-center">
        <button
          onClick={() => onAddToCart(item)}
          disabled={!isAvailable || isInCart}
          className={`p-2 rounded-lg transition-colors ${
            isInCart
              ? 'bg-green-100 text-green-700 cursor-default'
              : isAvailable
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isInCart
                ? "M5 13l4 4L19 7"
                : "M12 6v6m0 0v6m0-6h6m-6 0H6"
              }
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
