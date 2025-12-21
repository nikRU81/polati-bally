import { Coins, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { formatNumber } from '../../utils/formatters';

interface BalanceCardProps {
  balance: number;
  monthlyEarned?: number;
}

export function BalanceCard({ balance, monthlyEarned = 1200 }: BalanceCardProps) {
  return (
    <Card className="bg-gradient-to-br from-polati-blue to-polati-blue-dark text-white">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-blue-200 text-sm mb-1">Ваш баланс</p>
          <p className="text-4xl font-bold mb-2">{formatNumber(balance)}</p>
          <p className="text-blue-200 text-sm">баллов</p>
        </div>
        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
          <Coins className="w-7 h-7" />
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/20 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-green-300" />
        <span className="text-green-300 font-medium">+{formatNumber(monthlyEarned)}</span>
        <span className="text-blue-200 text-sm">за этот месяц</span>
      </div>
    </Card>
  );
}
