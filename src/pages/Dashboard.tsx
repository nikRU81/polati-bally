import { BalanceCard } from '../components/dashboard/BalanceCard';
import { StatsGrid } from '../components/dashboard/StatsGrid';
import { CategoryChart } from '../components/dashboard/CategoryChart';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { QuickActions } from '../components/dashboard/QuickActions';
import { demoUser } from '../data/demoUser';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Card } from '../components/ui/Card';
import { Trophy, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatNumber, calculateProgress } from '../utils/formatters';

export function Dashboard() {
  const nextMilestone = 500;
  const progressToMilestone = calculateProgress(demoUser.totalShifts, nextMilestone);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Привет, {demoUser.name.split(' ')[1]}!
        </h1>
        <p className="text-gray-500">
          Выполняй задания и копи баллы для получения подарков
        </p>
      </div>

      {/* Balance and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BalanceCard balance={demoUser.balance} />
        <div className="lg:col-span-2">
          <StatsGrid
            totalShifts={demoUser.totalShifts}
            objectsCount={demoUser.objectsCount}
            level={demoUser.level}
            nextMilestone={nextMilestone}
          />
        </div>
      </div>

      {/* Path to Success Banner */}
      <Link to="/path">
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-polati-orange rounded-xl">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Путь к успеху</h3>
                <p className="text-sm text-gray-600">
                  {formatNumber(demoUser.totalShifts)} из {formatNumber(nextMilestone)} смен • Награда: 10 000 баллов
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32">
                <ProgressBar progress={progressToMilestone} color="orange" size="md" />
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </Card>
      </Link>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <CategoryChart />
          <RecentActivity />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <QuickActions />

          {/* Exchange Rate Info */}
          <Card className="bg-blue-50 border-blue-200">
            <div className="text-center">
              <p className="text-sm text-blue-600 mb-1">Курс обмена</p>
              <p className="text-3xl font-bold text-polati-blue">1 = 1 ₽</p>
              <p className="text-sm text-blue-600 mt-1">1 балл = 1 рубль</p>
            </div>
          </Card>

          {/* Points Never Expire */}
          <Card className="bg-green-50 border-green-200">
            <div className="text-center">
              <p className="text-2xl mb-1">✨</p>
              <p className="font-semibold text-green-700">Баллы никогда не сгорают</p>
              <p className="text-sm text-green-600 mt-1">Копите без ограничений</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
