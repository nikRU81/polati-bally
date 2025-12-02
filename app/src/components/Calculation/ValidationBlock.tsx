import type { ValidationResult } from '../../types';

interface ValidationBlockProps {
  validation: ValidationResult;
  maxDeviation: number;
}

export function ValidationBlock({ validation, maxDeviation }: ValidationBlockProps) {
  const CheckIcon = ({ passed }: { passed: boolean }) => (
    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
      passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
    }`}>
      {passed ? '✓' : '✗'}
    </span>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Проверки</h3>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          validation.allPassed
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {validation.allPassed ? 'Все пройдены' : 'Есть проблемы'}
        </span>
      </div>

      <div className="space-y-4">
        {/* Проверка 1: Среднее отклонение */}
        <div className={`p-4 rounded-lg ${
          validation.deviationCheck.passed ? 'bg-green-50' : 'bg-red-50'
        }`}>
          <div className="flex items-center gap-3">
            <CheckIcon passed={validation.deviationCheck.passed} />
            <div className="flex-1">
              <div className="font-medium text-gray-900">Среднее отклонение от бюджета</div>
              <div className="text-sm text-gray-600">
                Должно быть ≤ {maxDeviation}%
              </div>
            </div>
            <div className={`text-lg font-bold ${
              validation.deviationCheck.passed ? 'text-green-600' : 'text-red-600'
            }`}>
              {validation.deviationCheck.value >= 0 ? '+' : ''}
              {validation.deviationCheck.value.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Проверка 2: Нарастающий итог */}
        <div className={`p-4 rounded-lg ${
          validation.cumulativeCheck.passed ? 'bg-green-50' : 'bg-red-50'
        }`}>
          <div className="flex items-center gap-3">
            <CheckIcon passed={validation.cumulativeCheck.passed} />
            <div className="flex-1">
              <div className="font-medium text-gray-900">Нарастающий итог ≥ бюджета</div>
              <div className="text-sm text-gray-600">
                {validation.cumulativeCheck.passed
                  ? 'Все годы проходят проверку'
                  : `Не проходят годы: ${validation.cumulativeCheck.failedYears.join(', ')}`
                }
              </div>
            </div>
          </div>
        </div>

        {/* Проверка 3: Покупательная способность */}
        <div className={`p-4 rounded-lg ${
          validation.purchaseCheck.passed ? 'bg-green-50' : 'bg-red-50'
        }`}>
          <div className="flex items-center gap-3">
            <CheckIcon passed={validation.purchaseCheck.passed} />
            <div className="flex-1">
              <div className="font-medium text-gray-900">Покупательная способность</div>
              <div className="text-sm text-gray-600">
                {validation.purchaseCheck.passed
                  ? 'Сотрудник может купить референсный товар каждый год'
                  : `Не хватает баллов в годы: ${validation.purchaseCheck.failedYears.join(', ')}`
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Легенда */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          <span className="font-medium">Легенда:</span>
          <span className="inline-flex items-center gap-1 ml-3">
            <span className="w-3 h-3 rounded bg-green-500"></span> Проверка пройдена
          </span>
          <span className="inline-flex items-center gap-1 ml-3">
            <span className="w-3 h-3 rounded bg-red-500"></span> Проверка не пройдена
          </span>
        </div>
      </div>
    </div>
  );
}
