import { formatNumber } from '../../utils/formatters';
import type { RewardProgress } from '../../types';

interface ProgressCardProps {
  progress: RewardProgress;
}

export function ProgressCard({ progress }: ProgressCardProps) {
  const { currentPoints, targetPoints, targetRewardName, percentComplete } = progress;
  const remaining = targetPoints - currentPoints;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-900">До награды</h3>
        <span className="text-xs text-gray-500">{percentComplete}%</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(percentComplete, 100)}%` }}
        />
      </div>

      {/* Target info */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-900">{targetRewardName}</p>
          <p className="text-xs text-gray-500">
            Осталось {formatNumber(remaining)} б.
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-blue-600">{formatNumber(targetPoints)}</p>
          <p className="text-xs text-gray-500">баллов</p>
        </div>
      </div>
    </div>
  );
}
