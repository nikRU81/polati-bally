import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Settings } from '../types';
import { defaultSettings } from '../data/defaults';
import { parseSettings } from '../utils/csvParser';

interface SettingsContextValue {
  settings: Settings;
  isLoading: boolean;
  error: string | null;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  resetToDefaults: () => void;
  loadFromFile: (file: File) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load settings from CSV on mount
  useEffect(() => {
    async function loadSettings() {
      try {
        const loadedSettings = await parseSettings('/data/settings.csv');
        setSettings(loadedSettings);
      } catch (err) {
        console.error('Failed to load settings:', err);
        setError('Не удалось загрузить настройки');
        // Use default settings on error
        setSettings(defaultSettings);
      } finally {
        setIsLoading(false);
      }
    }

    loadSettings();
  }, []);

  // Update single setting
  const updateSetting = useCallback(<K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  // Load from file
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

  return (
    <SettingsContext.Provider
      value={{
        settings,
        isLoading,
        error,
        updateSetting,
        resetToDefaults,
        loadFromFile,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettingsContext() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettingsContext must be used within SettingsProvider');
  }
  return context;
}
