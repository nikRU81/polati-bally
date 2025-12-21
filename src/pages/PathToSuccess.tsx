import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { demoUser } from '../data/demoUser';
import { formatNumber, formatShifts } from '../utils/formatters';
import { Trophy, Lock, Check, Gift, Star } from 'lucide-react';

const milestones = [
  { shifts: 500, points: 10000, title: 'Этап 1', description: 'Первый каталог эксклюзивных подарков' },
  { shifts: 1000, points: 30000, title: 'Этап 2', description: 'Расширенный каталог премиум подарков' },
  { shifts: 1500, points: 30000, title: 'Этап 3', description: 'VIP каталог' },
  { shifts: 2000, points: 30000, title: 'Этап 4', description: 'Легендарный каталог' },
  { shifts: 2500, points: 30000, title: 'Этап 5', description: 'Эксклюзивные награды' },
];

export function PathToSuccess() {
  const currentShifts = demoUser.totalShifts;
  const nextMilestone = milestones.find((m) => m.shifts > currentShifts) || milestones[milestones.length - 1];
  const progress = Math.min(100, (currentShifts / nextMilestone.shifts) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Путь к успеху</h1>
        <p className="text-gray-500">Награждение за каждые 500 смен в компании</p>
      </div>

      {/* Current Progress */}
      <Card className="bg-gradient-to-r from-polati-blue to-blue-600 text-white">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-white/20 rounded-2xl">
            <Trophy className="w-10 h-10" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">Ваш прогресс</h2>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl font-bold">{formatNumber(currentShifts)}</span>
              <span className="text-blue-200">из {formatNumber(nextMilestone.shifts)} смен</span>
            </div>
            <ProgressBar progress={progress} color="orange" size="lg" />
            <p className="text-blue-200 mt-2">
              Осталось {formatShifts(nextMilestone.shifts - currentShifts)} до награды {formatNumber(nextMilestone.points)} баллов
            </p>
          </div>
        </div>
      </Card>

      {/* Timeline */}
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
        <div
          className="absolute left-8 top-0 w-0.5 bg-polati-blue transition-all"
          style={{
            height: `${Math.min(100, (currentShifts / milestones[milestones.length - 1].shifts) * 100)}%`
          }}
        />

        <div className="space-y-6">
          {milestones.map((milestone, index) => {
            const isCompleted = currentShifts >= milestone.shifts;
            const isCurrent = !isCompleted && (index === 0 || currentShifts >= milestones[index - 1].shifts);

            return (
              <div key={milestone.shifts} className="relative flex items-start gap-6 pl-16">
                {/* Circle */}
                <div
                  className={`absolute left-6 w-5 h-5 rounded-full border-2 -translate-x-1/2 ${
                    isCompleted
                      ? 'bg-polati-blue border-polati-blue'
                      : isCurrent
                      ? 'bg-white border-polati-orange'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {isCompleted && <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5" />}
                </div>

                {/* Card */}
                <Card
                  className={`flex-1 ${
                    isCurrent ? 'border-2 border-polati-orange' : ''
                  } ${isCompleted ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-gray-800">{milestone.title}</h3>
                        {isCompleted ? (
                          <Badge variant="green" size="sm">Выполнено</Badge>
                        ) : isCurrent ? (
                          <Badge variant="orange" size="sm">Текущий</Badge>
                        ) : (
                          <Badge variant="gray" size="sm">
                            <Lock className="w-3 h-3 mr-1" />
                            Заблокировано
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-500 mb-2">{formatShifts(milestone.shifts)}</p>
                      <p className="text-sm text-gray-600">{milestone.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-polati-orange">
                        <Star className="w-5 h-5" />
                        <span className="text-2xl font-bold">{formatNumber(milestone.points)}</span>
                      </div>
                      <p className="text-xs text-gray-400">баллов</p>
                    </div>
                  </div>

                  {isCurrent && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500">Прогресс к этапу</span>
                        <span className="font-medium">{currentShifts} / {milestone.shifts}</span>
                      </div>
                      <ProgressBar
                        progress={(currentShifts / milestone.shifts) * 100}
                        color="orange"
                        size="md"
                      />
                    </div>
                  )}
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Catalog Access */}
      <Card>
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Gift className="w-5 h-5 text-polati-orange" />
          Доступ к каталогам подарков
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <span className="font-medium">Основной каталог</span>
            </div>
            <p className="text-sm text-gray-500">Доступен с первой смены</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg opacity-50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <Lock className="w-4 h-4 text-gray-400" />
              </div>
              <span className="font-medium">Эксклюзивный (500)</span>
            </div>
            <p className="text-sm text-gray-500">Требуется 500 смен</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg opacity-50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <Lock className="w-4 h-4 text-gray-400" />
              </div>
              <span className="font-medium">Премиум (1000)</span>
            </div>
            <p className="text-sm text-gray-500">Требуется 1000 смен</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
