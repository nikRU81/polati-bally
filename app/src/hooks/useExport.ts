import { useCallback } from 'react';
import type { Settings, CalculationResult, YearlyResult } from '../types';

export function useExport() {
  // Экспорт в CSV
  const exportToCSV = useCallback((results: YearlyResult[], filename: string) => {
    const headers = [
      'Год',
      'Календарный год',
      'ЗП/год',
      'Бюджет 1%',
      'Базовые (до инд.)',
      'Индексация',
      'Базовые (после инд.)',
      'Добавка',
      'Итого',
      'Нарастающий бюджет',
      'Нарастающий итого',
      'Проверка нарастающего',
      'Разница нарастающего',
      'Цена референса',
      'Проверка покупки',
      'Разница покупки',
    ];

    const rows = results.map((r) => [
      r.year,
      r.calendarYear,
      r.salary,
      r.budget,
      r.basePointsRaw,
      r.indexation,
      r.basePointsIndexed,
      r.allowance,
      r.total,
      r.cumulativeBudget,
      r.cumulativeTotal,
      r.cumulativeCheck ? 'PASS' : 'FAIL',
      r.cumulativeDiff,
      r.referencePrice,
      r.purchaseCheck ? 'PASS' : 'FAIL',
      r.purchaseDiff,
    ]);

    const csv = [
      headers.join(';'),
      ...rows.map((row) => row.join(';')),
    ].join('\n');

    downloadFile(csv, filename, 'text/csv;charset=utf-8;');
  }, []);

  // Экспорт настроек в CSV
  const exportSettingsToCSV = useCallback((settings: Settings, filename: string) => {
    const rows = Object.entries(settings).map(([key, value]) => `${key};${value}`);
    const csv = ['parameter;value', ...rows].join('\n');
    downloadFile(csv, filename, 'text/csv;charset=utf-8;');
  }, []);

  // Экспорт в JSON
  const exportToJSON = useCallback((data: { settings: Settings; results: CalculationResult }, filename: string) => {
    const json = JSON.stringify(data, null, 2);
    downloadFile(json, filename, 'application/json');
  }, []);

  // Экспорт только результатов в JSON
  const exportResultsToJSON = useCallback((results: CalculationResult, filename: string) => {
    const json = JSON.stringify(results, null, 2);
    downloadFile(json, filename, 'application/json');
  }, []);

  return {
    exportToCSV,
    exportSettingsToCSV,
    exportToJSON,
    exportResultsToJSON,
  };
}

// Вспомогательная функция для скачивания файла
function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob(['\ufeff' + content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
