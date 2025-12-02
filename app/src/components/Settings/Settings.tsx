import type { Settings as SettingsType } from '../../types';
import { formatNumber, formatPercent, formatCoefficient } from '../../utils/formatters';
import { SettingsSection } from './SettingsSection';
import { SliderInput } from './SliderInput';
import { NumberInput } from './NumberInput';
import { SelectInput } from './SelectInput';

interface SettingsProps {
  settings: SettingsType;
  onUpdateSetting: <K extends keyof SettingsType>(key: K, value: SettingsType[K]) => void;
  onReset: () => void;
}

export function Settings({ settings, onUpdateSetting, onReset }: SettingsProps) {
  const yearOptions = Array.from({ length: 7 }, (_, i) => ({
    value: 2024 + i,
    label: String(2024 + i),
  }));

  const roundingOptions = [
    { value: 10, label: '10' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
    { value: 500, label: '500' },
    { value: 1000, label: '1 000' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Настройки</h1>
          <p className="text-gray-500 mt-1">Параметры программы лояльности</p>
        </div>
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Сбросить к умолчаниям
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Зарплата и бюджет */}
        <SettingsSection title="Зарплата и бюджет">
          <SliderInput
            label="Базовая годовая зарплата"
            value={settings.baseSalary}
            min={500000}
            max={5000000}
            step={50000}
            onChange={(v) => onUpdateSetting('baseSalary', v)}
            formatValue={(v) => `${formatNumber(v)} ₽`}
            description="Базовая годовая ЗП сотрудника до инфляции"
          />
          <SliderInput
            label="Процент бюджета"
            value={settings.budgetPercent}
            min={0.1}
            max={10}
            step={0.1}
            onChange={(v) => onUpdateSetting('budgetPercent', v)}
            formatValue={(v) => formatPercent(v)}
            description="Процент от ЗП на программу лояльности"
          />
        </SettingsSection>

        {/* Инфляция */}
        <SettingsSection title="Инфляция">
          <SliderInput
            label="Годовая инфляция"
            value={settings.inflationRate}
            min={0}
            max={50}
            step={0.5}
            onChange={(v) => onUpdateSetting('inflationRate', v)}
            formatValue={(v) => formatPercent(v)}
            description="Применяется к ЗП и ценам каталога"
          />
        </SettingsSection>

        {/* Индексация */}
        <SettingsSection title="Индексация ставок">
          <SliderInput
            label="Период индексации"
            value={settings.indexationPeriod}
            min={1}
            max={10}
            step={1}
            onChange={(v) => onUpdateSetting('indexationPeriod', v)}
            formatValue={(v) => `${v} ${v === 1 ? 'год' : v < 5 ? 'года' : 'лет'}`}
            description="Через сколько лет применяется индексация"
          />
          <div className="bg-gray-50 rounded-lg p-3 text-sm">
            <span className="text-gray-600">Коэффициент индексации:</span>{' '}
            <span className="font-medium">
              {formatCoefficient(Math.pow(1 + settings.inflationRate / 100, settings.indexationPeriod))}
            </span>
            <div className="text-xs text-gray-500 mt-1">
              Рассчитывается автоматически на основе инфляции и периода
            </div>
          </div>
        </SettingsSection>

        {/* Моделирование */}
        <SettingsSection title="Моделирование">
          <SliderInput
            label="Период моделирования"
            value={settings.simulationYears}
            min={1}
            max={10}
            step={1}
            onChange={(v) => onUpdateSetting('simulationYears', v)}
            formatValue={(v) => `${v} ${v === 1 ? 'год' : v < 5 ? 'года' : 'лет'}`}
            description="Количество лет для расчёта"
          />
          <SelectInput
            label="Год начала программы"
            value={settings.startYear}
            options={yearOptions}
            onChange={(v) => onUpdateSetting('startYear', Number(v))}
            description="Календарный год запуска программы"
          />
        </SettingsSection>

        {/* Допуски и округления */}
        <SettingsSection title="Допуски и округления">
          <NumberInput
            label="Максимальное отклонение от бюджета"
            value={settings.maxBudgetDeviation}
            min={0}
            max={10}
            step={0.1}
            onChange={(v) => onUpdateSetting('maxBudgetDeviation', v)}
            suffix="%"
            description="Допустимое превышение бюджета в среднем"
          />
          <SelectInput
            label="Округление добавок"
            value={settings.allowanceRounding}
            options={roundingOptions}
            onChange={(v) => onUpdateSetting('allowanceRounding', Number(v))}
            description="Шаг округления для добавок (баллов)"
          />
          <NumberInput
            label="Округление индексированных баллов"
            value={settings.pointsRounding}
            min={1}
            max={100}
            step={1}
            onChange={(v) => onUpdateSetting('pointsRounding', v)}
            suffix="баллов"
            description="Округление базовых баллов после индексации"
          />
        </SettingsSection>

        {/* Текущие значения */}
        <SettingsSection title="Сводка параметров">
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Бюджет в 1-й год:</span>
              <span className="font-medium">{formatNumber(settings.baseSalary * settings.budgetPercent / 100)} ₽</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Инфляция за {settings.simulationYears} лет:</span>
              <span className="font-medium">{formatPercent(Math.pow(1 + settings.inflationRate / 100, settings.simulationYears) * 100 - 100)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Индексация с:</span>
              <span className="font-medium">{settings.startYear + settings.indexationPeriod} года</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Период расчёта:</span>
              <span className="font-medium">{settings.startYear} — {settings.startYear + settings.simulationYears - 1}</span>
            </div>
          </div>
        </SettingsSection>
      </div>
    </div>
  );
}
