// Форматирование чисел для русской локали

const ruNumberFormat = new Intl.NumberFormat('ru-RU', {
  maximumFractionDigits: 0,
});

const ruCurrencyFormat = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

const ruPercentFormat = new Intl.NumberFormat('ru-RU', {
  style: 'percent',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

// Форматирование числа с разделителями тысяч
export function formatNumber(value: number): string {
  return ruNumberFormat.format(value);
}

// Форматирование как валюта (рубли)
export function formatCurrency(value: number): string {
  return ruCurrencyFormat.format(value);
}

// Форматирование как проценты
export function formatPercent(value: number): string {
  return ruPercentFormat.format(value / 100);
}

// Форматирование баллов
export function formatPoints(value: number): string {
  return `${formatNumber(value)} б.`;
}

// Форматирование коэффициента
export function formatCoefficient(value: number): string {
  return `×${value.toFixed(2)}`;
}

// Форматирование разницы (со знаком)
export function formatDiff(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${formatNumber(value)}`;
}

// Короткое форматирование больших чисел (1.2M, 500K)
export function formatShort(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(0)}K`;
  }
  return value.toString();
}
