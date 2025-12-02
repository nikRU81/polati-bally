import { useState, useEffect, useCallback } from 'react';
import type { Settings } from '../types';
import { defaultSettings } from '../data/defaults';
import { parseSettings } from '../utils/csvParser';

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка настроек из CSV при монтировании
  useEffect(() => {
    async function loadSettings() {
      try {
        const loadedSettings = await parseSettings('/data/settings.csv');
        setSettings(loadedSettings);
      } catch (err) {
        console.error('Failed to load settings:', err);
        setError('Не удалось загрузить настройки');
        // Используем дефолтные значения
        setSettings(defaultSettings);
      } finally {
        setIsLoading(false);
      }
    }

    loadSettings();
  }, []);

  // Обновление отдельного параметра
  const updateSetting = useCallback(<K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  // Сброс к значениям по умолчанию
  const resetToDefaults = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  // Загрузка настроек из файла
  const loadFromFile = useCallback(async (file: File) => {
    try {
      const text = await file.text();
      const blob = new Blob([text], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const loadedSettings = await parseSettings(url);
      URL.revokeObjectURL(url);
      setSettings(loadedSettings);
    } catch (err) {
      console.error('Failed to load settings from file:', err);
      setError('Не удалось загрузить настройки из файла');
    }
  }, []);

  return {
    settings,
    isLoading,
    error,
    updateSetting,
    resetToDefaults,
    loadFromFile,
  };
}
