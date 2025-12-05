import { formatNumber, formatDate } from '../../utils/formatters';
import type { Transaction } from '../../types';

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const isAccrual = transaction.type === 'accrual';

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isAccrual ? 'bg-green-100' : 'bg-red-100'
          }`}
        >
          {isAccrual ? (
            <svg
              className="w-5 h-5 text-green-600"
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
          ) : (
            <svg
              className="w-5 h-5 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
          <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
        </div>
      </div>

      {/* Amount */}
      <span
        className={`text-sm font-semibold ${isAccrual ? 'text-green-600' : 'text-red-600'}`}
      >
        {isAccrual ? '+' : '-'}
        {formatNumber(transaction.amount)} б.
      </span>
    </div>
  );
}
