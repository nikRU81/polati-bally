import type { CatalogItem } from '../types';

// Original 6 POLATI branded items from catalog.csv
export const mockCatalog: CatalogItem[] = [
  {
    itemId: 'CAT_001',
    itemName: 'Термокружка ПОЛАТИ',
    price: 1995,
    category: 'Аксессуары',
    description: 'Термокружка с логотипом компании',
    inStock: true,
  },
  {
    itemId: 'CAT_002',
    itemName: 'Футболка белая ПОЛАТИ',
    price: 2099,
    category: 'Одежда',
    description: 'Белая футболка с логотипом',
    inStock: true,
  },
  {
    itemId: 'CAT_003',
    itemName: 'Бейсболка ПОЛАТИ',
    price: 2449,
    category: 'Аксессуары',
    description: 'Бейсболка с вышитым логотипом',
    inStock: true,
  },
  {
    itemId: 'CAT_004',
    itemName: 'Свитшот серый ПОЛАТИ',
    price: 4549,
    category: 'Одежда',
    description: 'Серый свитшот с логотипом',
    inStock: true,
  },
  {
    itemId: 'CAT_005',
    itemName: 'Худи оверсайз ПОЛАТИ',
    price: 10149,
    category: 'Одежда',
    description: 'Худи свободного кроя с логотипом',
    inStock: true,
  },
  {
    itemId: 'CAT_006',
    itemName: 'Сумка ПОЛАТИ',
    price: 10499,
    category: 'Аксессуары',
    description: 'Сумка с логотипом - референсный товар для проверок',
    inStock: true,
  },
];

export const catalogCategories = ['Все', 'Одежда', 'Аксессуары'];
