// Форматирование чисел с разделителями
export function formatNumber(num: number): string {
  return num.toLocaleString('ru-RU');
}

// Форматирование баллов
export function formatPoints(points: number): string {
  return `${formatNumber(points)} б.`;
}

// Форматирование даты
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// Короткий формат даты
export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
  });
}

// Относительная дата (сегодня, вчера, X дней назад)
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Сегодня';
  if (diffDays === 1) return 'Вчера';
  if (diffDays < 7) return `${diffDays} дн. назад`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} нед. назад`;
  return formatDateShort(dateString);
}

// Склонение слов (смен/смена/смены)
export function pluralize(
  count: number,
  one: string,
  few: string,
  many: string
): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 19) {
    return many;
  }
  if (mod10 === 1) {
    return one;
  }
  if (mod10 >= 2 && mod10 <= 4) {
    return few;
  }
  return many;
}

// Форматирование смен
export function formatShifts(count: number): string {
  return `${formatNumber(count)} ${pluralize(count, 'смена', 'смены', 'смен')}`;
}

// Форматирование баллов с единицей
export function formatPointsWithUnit(points: number): string {
  return `${formatNumber(points)} ${pluralize(points, 'балл', 'балла', 'баллов')}`;
}

// Расчёт процента прогресса
export function calculateProgress(current: number, max: number): number {
  if (max === 0) return 0;
  return Math.min(100, Math.round((current / max) * 100));
}
