import type { User } from '../../types';
import { ProfileSwitcher } from './ProfileSwitcher';
import { formatNumber } from '../../utils/formatters';

interface MobileHeaderProps {
  currentUser: User;
  users: User[];
  onUserChange: (userId: string) => void;
  balance: number;
}

export function MobileHeader({ currentUser, users, onUserChange, balance }: MobileHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Profile */}
        <ProfileSwitcher
          currentUser={currentUser}
          users={users}
          onUserChange={onUserChange}
        />

        {/* Balance */}
        <div className="text-right">
          <p className="text-xs text-gray-500">Баланс</p>
          <p className="text-lg font-bold text-blue-600">{formatNumber(balance)} б.</p>
        </div>
      </div>
    </header>
  );
}
