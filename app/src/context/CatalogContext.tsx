import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { CatalogItem } from '../types';
import { parseCatalog } from '../utils/csvParser';

interface CatalogContextValue {
  items: CatalogItem[];
  originalItems: CatalogItem[];
  isLoading: boolean;
  error: string | null;
  updateItem: (itemId: string, updates: Partial<CatalogItem>) => void;
  updateItemPrice: (itemId: string, newPrice: number) => void;
  addItem: (item: Omit<CatalogItem, 'itemId'>) => void;
  deleteItem: (itemId: string) => void;
  resetItems: () => void;
}

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [originalItems, setOriginalItems] = useState<CatalogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load catalog from CSV on mount
  useEffect(() => {
    async function loadCatalog() {
      try {
        const loadedItems = await parseCatalog('/data/catalog.csv');
        setItems(loadedItems);
        setOriginalItems(loadedItems);
      } catch (err) {
        console.error('Failed to load catalog:', err);
        setError('Не удалось загрузить каталог');
      } finally {
        setIsLoading(false);
      }
    }

    loadCatalog();
  }, []);

  // Update item
  const updateItem = useCallback((itemId: string, updates: Partial<CatalogItem>) => {
    setItems(prev => prev.map(item =>
      item.itemId === itemId
        ? { ...item, ...updates }
        : item
    ));
  }, []);

  // Update item price (shortcut)
  const updateItemPrice = useCallback((itemId: string, newPrice: number) => {
    updateItem(itemId, { basePrice: newPrice });
  }, [updateItem]);

  // Add new item
  const addItem = useCallback((item: Omit<CatalogItem, 'itemId'>) => {
    setItems(prev => {
      const newItemId = `ITEM_${String(prev.length + 1).padStart(3, '0')}`;
      const newItem: CatalogItem = {
        ...item,
        itemId: newItemId,
      };
      return [...prev, newItem];
    });
  }, []);

  // Delete item
  const deleteItem = useCallback((itemId: string) => {
    setItems(prev => prev.filter(item => item.itemId !== itemId));
  }, []);

  // Reset to original items
  const resetItems = useCallback(() => {
    setItems(originalItems);
  }, [originalItems]);

  return (
    <CatalogContext.Provider
      value={{
        items,
        originalItems,
        isLoading,
        error,
        updateItem,
        updateItemPrice,
        addItem,
        deleteItem,
        resetItems,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalogContext() {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalogContext must be used within CatalogProvider');
  }
  return context;
}
