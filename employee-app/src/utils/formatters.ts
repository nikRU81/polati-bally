// Форматирование чисел с разделителями тысяч
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('ru-RU').format(value);
}

// Форматирование даты
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

// Короткий формат даты (без года)
export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
  }).format(date);
}
