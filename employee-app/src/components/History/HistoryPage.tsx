import { useState, useMemo } from 'react';
import { TransactionItem } from './TransactionItem';
import { HistoryTabs } from './HistoryTabs';
import { formatNumber } from '../../utils/formatters';
import type { Transaction } from '../../types';

interface HistoryPageProps {
  transactions: Transaction[];
}

export function HistoryPage({ transactions }: HistoryPageProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'accrual' | 'redemption'>('all');

  // Sort transactions by date (newest first)
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [transactions]);

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    if (activeTab === 'all') return sortedTransactions;
    return sortedTransactions.filter((t) => t.type === activeTab);
  }, [sortedTransactions, activeTab]);

  // Calculate counts
  const counts = useMemo(() => {
    const accrual = transactions.filter((t) => t.type === 'accrual').length;
    const redemption = transactions.filter((t) => t.type === 'redemption').length;
    return {
      all: transactions.length,
      accrual,
      redemption,
    };
  }, [transactions]);

  // Calculate totals
  const totals = useMemo(() => {
    const earned = transactions
      .filter((t) => t.type === 'accrual')
      .reduce((sum, t) => sum + t.amount, 0);
    const spent = transactions
      .filter((t) => t.type === 'redemption')
      .reduce((sum, t) => sum + t.amount, 0);
    return { earned, spent };
  }, [transactions]);

  return (
    <div className="p-4 pb-20 md:pb-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900">История</h1>
        <p className="text-sm text-gray-500 mt-1">Ваши начисления и списания</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-green-50 rounded-lg p-3">
          <p className="text-xs text-green-600 mb-1">Заработано</p>
          <p className="text-xl font-bold text-green-600">+{formatNumber(totals.earned)}</p>
        </div>
        <div className="bg-red-50 rounded-lg p-3">
          <p className="text-xs text-red-600 mb-1">Потрачено</p>
          <p className="text-xl font-bold text-red-600">-{formatNumber(totals.spent)}</p>
        </div>
      </div>

      {/* Tabs */}
      <HistoryTabs activeTab={activeTab} onTabChange={setActiveTab} counts={counts} />

      {/* Transactions list */}
      <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Нет транзакций</p>
          </div>
        ) : (
          <div>
            {filteredTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
