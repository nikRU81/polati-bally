import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { rewards } from '../data/rewards';
import { demoUser } from '../data/demoUser';
import { formatNumber } from '../utils/formatters';
import { ShoppingBag, Lock, Gift, Package } from 'lucide-react';

type RewardCategory = 'general' | 'path_to_success' | 'safety';

const tabs: { id: RewardCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'general', label: 'Основной каталог', icon: ShoppingBag },
  { id: 'path_to_success', label: 'Путь к успеху', icon: Gift },
  { id: 'safety', label: 'Охрана труда', icon: Package },
];

export function Shop() {
  const [activeTab, setActiveTab] = useState<RewardCategory>('general');
  const balance = demoUser.balance;

  const filteredRewards = rewards.filter((r) => r.category === activeTab);

  const canAfford = (price: number) => balance >= price;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Магазин подарков</h1>
          <p className="text-gray-500">Обменивайте баллы на ценные подарки</p>
        </div>
        <Card padding="sm" className="bg-polati-blue text-white">
          <p className="text-sm text-blue-200">Ваш баланс</p>
          <p className="text-2xl font-bold">{formatNumber(balance)} б.</p>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-polati-blue text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Info Banner for locked catalogs */}
      {activeTab !== 'general' && (
        <Card className="bg-orange-50 border-orange-200">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-orange-500" />
            <div>
              <p className="font-medium text-orange-800">
                {activeTab === 'path_to_success'
                  ? 'Требуется 500+ смен для доступа к эксклюзивным подаркам'
                  : 'Доступно сотрудникам с наградами по охране труда'}
              </p>
              <p className="text-sm text-orange-600">
                У вас {demoUser.totalShifts} смен. Осталось {500 - demoUser.totalShifts} смен.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredRewards.map((reward) => {
          const isLocked = !reward.available || (reward.requiredShifts && demoUser.totalShifts < reward.requiredShifts);
          const affordable = canAfford(reward.price);

          return (
            <Card key={reward.id} className={isLocked ? 'opacity-60' : ''}>
              {/* Image Placeholder */}
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                {isLocked ? (
                  <Lock className="w-12 h-12 text-gray-300" />
                ) : (
                  <Gift className="w-12 h-12 text-gray-300" />
                )}
              </div>

              <h3 className="font-semibold text-gray-800 mb-1">{reward.name}</h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{reward.description}</p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-polati-blue">{formatNumber(reward.price)}</p>
                  <p className="text-xs text-gray-400">баллов</p>
                </div>

                {isLocked ? (
                  <Badge variant="gray">
                    <Lock className="w-3 h-3 mr-1" />
                    Недоступно
                  </Badge>
                ) : !affordable ? (
                  <Badge variant="orange">Не хватает баллов</Badge>
                ) : (
                  <Button size="sm">Обменять</Button>
                )}
              </div>

              {reward.requiredShifts && (
                <p className="text-xs text-gray-400 mt-2">
                  Требуется: {reward.requiredShifts} смен
                </p>
              )}
            </Card>
          );
        })}
      </div>

      {filteredRewards.length === 0 && (
        <Card className="text-center py-12">
          <Gift className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">В этой категории пока нет подарков</p>
        </Card>
      )}
    </div>
  );
}
