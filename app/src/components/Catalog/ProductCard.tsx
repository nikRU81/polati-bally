import { useState } from 'react';
import type { CatalogItem } from '../../types';
import { formatNumber } from '../../utils/formatters';

interface ProductCardProps {
  item: CatalogItem;
  isReference: boolean;
  onPriceChange: (itemId: string, newPrice: number) => void;
}

export function ProductCard({ item, isReference, onPriceChange }: ProductCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(item.basePrice.toString());

  const handleSave = () => {
    const newPrice = parseInt(editValue, 10);
    if (!isNaN(newPrice) && newPrice > 0) {
      onPriceChange(item.itemId, newPrice);
    } else {
      setEditValue(item.basePrice.toString());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditValue(item.basePrice.toString());
      setIsEditing(false);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border p-4 ${
      isReference ? 'border-yellow-400 ring-2 ring-yellow-200' : 'border-gray-200'
    }`}>
      {isReference && (
        <div className="mb-2">
          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
            Референсный товар
          </span>
        </div>
      )}

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.itemName}</h3>

      <div className="flex items-center justify-between mb-3">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
              autoFocus
              className="w-28 px-2 py-1 text-xl font-bold text-blue-600 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-500">б.</span>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="group flex items-center gap-1 hover:bg-blue-50 rounded px-2 py-1 -ml-2 transition-colors"
            title="Нажмите для редактирования цены"
          >
            <span className="text-2xl font-bold text-blue-600">
              {formatNumber(item.basePrice)} <span className="text-sm font-normal">б.</span>
            </span>
            <svg
              className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        )}
      </div>

      {item.description && (
        <p className="text-sm text-gray-500">{item.description}</p>
      )}
    </div>
  );
}
