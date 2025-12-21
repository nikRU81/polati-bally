import { Calendar, Building2, Award, Target } from 'lucide-react';
import { Card } from '../ui/Card';
import { formatNumber } from '../../utils/formatters';

interface StatsGridProps {
  totalShifts: number;
  objectsCount: number;
  level: string;
  nextMilestone: number;
}

export function StatsGrid({ totalShifts, objectsCount, level, nextMilestone }: StatsGridProps) {
  const stats = [
    {
      icon: Calendar,
      label: 'Смены',
      value: formatNumber(totalShifts),
      color: 'text-polati-blue',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Building2,
      label: 'Объекты',
      value: objectsCount.toString(),
      color: 'text-polati-orange',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Award,
      label: 'Уровень',
      value: level,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: Target,
      label: 'До следующей цели',
      value: `${nextMilestone - totalShifts}`,
      subValue: 'смен',
      color: 'text-polati-green',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} hover>
          <div className="flex items-start gap-3">
            <div className={`p-2.5 rounded-xl ${stat.bgColor}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-xl font-bold text-gray-800">{stat.value}</p>
              {stat.subValue && (
                <p className="text-xs text-gray-400">{stat.subValue}</p>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
