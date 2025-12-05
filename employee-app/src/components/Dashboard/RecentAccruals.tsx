import { formatNumber, formatDateShort } from '../../utils/formatters';
import type { Transaction } from '../../types';

interface RecentAccrualsProps {
  transactions: Transaction[];
}

export function RecentAccruals({ transactions }: RecentAccrualsProps) {
  // Show only last 5 accruals
  const recentAccruals = transactions
    .filter((t) => t.type === 'accrual')
    .slice(-5)
    .reverse();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <h3 className="text-sm font-medium text-gray-900 mb-3">Последние начисления</h3>

      {recentAccruals.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-4">Пока нет начислений</p>
      ) : (
        <div className="space-y-3">
          {recentAccruals.map((txn) => (
            <div
              key={txn.id}
              className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{txn.description}</p>
                  <p className="text-xs text-gray-500">{formatDateShort(txn.date)}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-green-600">
                +{formatNumber(txn.amount)} б.
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
