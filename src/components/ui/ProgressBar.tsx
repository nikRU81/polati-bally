interface ProgressBarProps {
  progress: number; // 0-100
  color?: 'blue' | 'orange' | 'green';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
}

export function ProgressBar({
  progress,
  color = 'blue',
  size = 'md',
  showLabel = false,
  label,
}: ProgressBarProps) {
  const colorClasses = {
    blue: 'bg-polati-blue',
    orange: 'bg-polati-orange',
    green: 'bg-polati-green',
  };

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1 text-sm">
          <span className="text-gray-600">{label}</span>
          <span className="font-medium text-gray-800">{clampedProgress}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
}
