import { useMemo } from 'react';
import { useCatalogContext } from '../../context/CatalogContext';
import { useSettingsContext } from '../../context/SettingsContext';
import { calculatePriceWithInflation } from '../../utils/calculations';
import { ProductCard } from './ProductCard';
import { PriceTable } from './PriceTable';

export function Catalog() {
  const { items, isLoading, error, updateItemPrice } = useCatalogContext();
  const { settings } = useSettingsContext();

  // Reference item
  const referenceItem = useMemo(() => {
    return items.find(item => item.isReference) ||
           items.find(item => item.itemId === settings.referenceItemId);
  }, [items, settings.referenceItemId]);

  // Prices by year
  const pricesByYear = useMemo(() => {
    const years = Array.from({ length: settings.simulationYears }, (_, i) => i + 1);

    return items.map(item => ({
      item,
      prices: years.map(year => ({
        year,
        calendarYear: settings.startYear + year - 1,
        price: calculatePriceWithInflation(item.basePrice, settings.inflationRate, year, settings.noInflation),
      })),
    }));
  }, [items, settings.inflationRate, settings.simulationYears, settings.startYear, settings.noInflation]);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="text-gray-500">Загрузка каталога...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Каталог</h1>
        <p className="text-gray-500 mt-1">Товары программы лояльности с ценами по годам</p>
        <p className="text-sm text-blue-600 mt-2">
          Нажмите на цену товара, чтобы изменить её
        </p>
      </div>

      {/* Карточки товаров */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {items.map((item) => (
          <ProductCard
            key={item.itemId}
            item={item}
            isReference={item.itemId === referenceItem?.itemId}
            onPriceChange={updateItemPrice}
          />
        ))}
      </div>

      {/* Таблица цен по годам */}
      <PriceTable
        pricesByYear={pricesByYear}
        referenceItemId={referenceItem?.itemId}
      />
    </div>
  );
}
