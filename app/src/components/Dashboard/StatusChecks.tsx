import type { ValidationResult } from '../../types';

interface StatusChecksProps {
  validation: ValidationResult;
}

export function StatusChecks({ validation }: StatusChecksProps) {
  const checks = [
    {
      name: 'Среднее отклонение',
      passed: validation.deviationCheck.passed,
      detail: `${validation.deviationCheck.value >= 0 ? '+' : ''}${validation.deviationCheck.value.toFixed(1)}%`,
    },
    {
      name: 'Нарастающий итог',
      passed: validation.cumulativeCheck.passed,
      detail: validation.cumulativeCheck.passed
        ? 'Все годы OK'
        : `Проблемы: ${validation.cumulativeCheck.failedYears.join(', ')}`,
    },
    {
      name: 'Покупательная способность',
      passed: validation.purchaseCheck.passed,
      detail: validation.purchaseCheck.passed
        ? 'Все годы OK'
        : `Проблемы: ${validation.purchaseCheck.failedYears.join(', ')}`,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Статус проверок</h3>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          validation.allPassed
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {validation.allPassed ? 'Все OK' : 'Есть проблемы'}
        </span>
      </div>

      <div className="space-y-3">
        {checks.map((check) => (
          <div
            key={check.name}
            className={`p-3 rounded-lg ${
              check.passed ? 'bg-green-50' : 'bg-red-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                check.passed
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}>
                {check.passed ? '✓' : '✗'}
              </span>
              <span className="text-sm font-medium text-gray-900">{check.name}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1 ml-7">{check.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
