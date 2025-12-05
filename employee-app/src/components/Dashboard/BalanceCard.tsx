import { formatNumber } from '../../utils/formatters';
import type { Balance } from '../../types';

interface BalanceCardProps {
  balance: Balance;
}

export function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
      <p className="text-sm opacity-80">Ваш баланс</p>
      <p className="text-4xl font-bold mt-1">{formatNumber(balance.current)} б.</p>

      <div className="mt-6 pt-4 border-t border-white/20 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs opacity-70">Всего заработано</p>
          <p className="text-lg font-semibold">{formatNumber(balance.totalEarned)} б.</p>
        </div>
        <div>
          <p className="text-xs opacity-70">Потрачено</p>
          <p className="text-lg font-semibold">{formatNumber(balance.totalSpent)} б.</p>
        </div>
      </div>
    </div>
  );
}
