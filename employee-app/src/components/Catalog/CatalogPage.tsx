import { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { CatalogFilter } from './CatalogFilter';
import { formatNumber } from '../../utils/formatters';
import type { CatalogItem, CartItem } from '../../types';
import { catalogCategories } from '../../data/mockCatalog';

interface CatalogPageProps {
  items: CatalogItem[];
  balance: number;
  cartItems: CartItem[];
  onAddToCart: (item: CatalogItem) => void;
}

export function CatalogPage({ items, balance, cartItems, onAddToCart }: CatalogPageProps) {
  const [activeCategory, setActiveCategory] = useState('Все');

  // Filter items
  const filteredItems = useMemo(() => {
    if (activeCategory === 'Все') return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  // Check if item is in cart
  const isInCart = (itemId: string) => {
    return cartItems.some((ci) => ci.item.itemId === itemId);
  };

  return (
    <div className="p-4 pb-20 md:pb-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900">Каталог</h1>
        <p className="text-sm text-gray-500 mt-1">
          Ваш баланс: <span className="font-semibold text-blue-600">{formatNumber(balance)} б.</span>
        </p>
      </div>

      {/* Filter */}
      <CatalogFilter
        categories={catalogCategories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Products list */}
      <div className="mt-4 space-y-3">
        {filteredItems.map((item) => (
          <ProductCard
            key={item.itemId}
            item={item}
            balance={balance}
            onAddToCart={onAddToCart}
            isInCart={isInCart(item.itemId)}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>Нет товаров в этой категории</p>
        </div>
      )}
    </div>
  );
}
