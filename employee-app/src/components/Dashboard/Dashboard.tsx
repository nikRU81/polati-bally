import { BalanceCard } from './BalanceCard';
import { ProgressCard } from './ProgressCard';
import { RecentAccruals } from './RecentAccruals';
import { QuickActions } from './QuickActions';
import type { Balance, Transaction, RewardProgress, TabId } from '../../types';

interface DashboardProps {
  balance: Balance;
  transactions: Transaction[];
  rewardProgress: RewardProgress;
  onNavigate: (tab: TabId) => void;
}

export function Dashboard({ balance, transactions, rewardProgress, onNavigate }: DashboardProps) {
  return (
    <div className="p-4 space-y-4 pb-20 md:pb-4">
      {/* Balance Card - Always on top */}
      <BalanceCard balance={balance} />

      {/* Progress to next reward */}
      <ProgressCard progress={rewardProgress} />

      {/* Quick Actions */}
      <QuickActions onNavigate={onNavigate} />

      {/* Recent Accruals */}
      <RecentAccruals transactions={transactions} />
    </div>
  );
}
