import type { ReactNode } from 'react';
import { SettingsProvider } from './SettingsContext';
import { TasksProvider } from './TasksContext';
import { CatalogProvider } from './CatalogContext';

interface AppStateProviderProps {
  children: ReactNode;
}

/**
 * Composite provider that combines all context providers
 * Provides global state management for the entire application
 */
export function AppStateProvider({ children }: AppStateProviderProps) {
  return (
    <SettingsProvider>
      <TasksProvider>
        <CatalogProvider>
          {children}
        </CatalogProvider>
      </TasksProvider>
    </SettingsProvider>
  );
}
