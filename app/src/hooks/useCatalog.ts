import { useState, useEffect, useMemo, useCallback } from 'react';
import type { CatalogItem, Settings } from '../types';
import { parseCatalog } from '../utils/csvParser';
import { calculatePriceWithInflation } from '../utils/calculations';

export function useCatalog(settings: Settings) {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка каталога из CSV
  useEffect(() => {
    async function loadCatalog() {
      try {
        const loadedItems = await parseCatalog('/data/catalog.csv');
        setItems(loadedItems);
      } catch (err) {
        console.error('Failed to load catalog:', err);
        setError('Не удалось загрузить каталог');
      } finally {
        setIsLoading(false);
      }
    }

    loadCatalog();
  }, []);

  // Обновление цены товара
  const updateItemPrice = useCallback((itemId: string, newPrice: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.itemId === itemId
          ? { ...item, basePrice: newPrice }
          : item
      )
    );
  }, []);

  // Референсный товар
  const referenceItem = useMemo(() => {
    return items.find(item => item.isReference) || items.find(item => item.itemId === settings.referenceItemId);
  }, [items, settings.referenceItemId]);

  // Цены товаров по годам
  const pricesByYear = useMemo(() => {
    const years = Array.from({ length: settings.simulationYears }, (_, i) => i + 1);

    return items.map(item => ({
      item,
      prices: years.map(year => ({
        year,
        calendarYear: settings.startYear + year - 1,
        price: calculatePriceWithInflation(item.basePrice, settings.inflationRate, year),
      })),
    }));
  }, [items, settings.inflationRate, settings.simulationYears, settings.startYear]);

  return {
    items,
    isLoading,
    error,
    referenceItem,
    pricesByYear,
    updateItemPrice,
  };
}
