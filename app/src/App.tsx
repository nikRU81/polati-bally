import { useState } from 'react';
import { AppStateProvider } from './context/AppStateProvider';
import { TabNavigation } from './components/common/TabNavigation';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Settings } from './components/Settings/Settings';
import { Tasks } from './components/Tasks/Tasks';
import { Catalog } from './components/Catalog/Catalog';
import { Matrix } from './components/Matrix/Matrix';
import { Calculation } from './components/Calculation/Calculation';
import { Charts } from './components/Charts/Charts';
import { useSettingsContext } from './context/SettingsContext';
import { useCalculation } from './hooks/useCalculation';
import type { TabId } from './types';

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const { settings, isLoading: settingsLoading, updateSetting, resetToDefaults } = useSettingsContext();
  const { calculationResult, isLoading: calcLoading } = useCalculation();

  const toggleInflation = () => {
    updateSetting('noInflation', !settings.noInflation);
  };

  const renderContent = () => {
    if (settingsLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Загрузка...</div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            settings={settings}
            calculationResult={calculationResult}
            isLoading={calcLoading}
          />
        );
      case 'settings':
        return (
          <Settings
            settings={settings}
            onUpdateSetting={updateSetting}
            onReset={resetToDefaults}
          />
        );
      case 'tasks':
        return <Tasks />;
      case 'catalog':
        return <Catalog />;
      case 'matrix':
        return <Matrix />;
      case 'calculation':
        return <Calculation />;
      case 'charts':
        return (
          <Charts
            settings={settings}
            calculationResult={calculationResult}
            isLoading={calcLoading}
          />
        );
      default:
        return (
          <Dashboard
            settings={settings}
            calculationResult={calculationResult}
            isLoading={calcLoading}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        noInflation={settings.noInflation}
        onToggleInflation={toggleInflation}
      />
      <main className="max-w-7xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AppStateProvider>
      <AppContent />
    </AppStateProvider>
  );
}

export default App;
