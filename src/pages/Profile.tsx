import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { demoUser } from '../data/demoUser';
import { formatNumber, formatDate } from '../utils/formatters';
import {
  User, Calendar, Building2, Award, MapPin,
  Briefcase, Star, Trophy, CheckCircle
} from 'lucide-react';

export function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Профиль</h1>
        <p className="text-gray-500">Информация о вашем аккаунте</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Card */}
          <Card>
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-polati-blue rounded-2xl flex items-center justify-center flex-shrink-0">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-1">{demoUser.name}</h2>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="blue">{demoUser.group}</Badge>
                  <Badge variant="orange">{demoUser.level}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase className="w-4 h-4" />
                    <span>{demoUser.position}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="w-4 h-4" />
                    <span>{demoUser.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{demoUser.currentObject}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>С {formatDate(demoUser.startDate)}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <Card>
            <h3 className="font-semibold text-gray-800 mb-4">Статистика</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <Calendar className="w-6 h-6 text-polati-blue mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{formatNumber(demoUser.totalShifts)}</p>
                <p className="text-sm text-gray-500">смен</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <Building2 className="w-6 h-6 text-polati-orange mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{demoUser.objectsCount}</p>
                <p className="text-sm text-gray-500">объектов</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <Award className="w-6 h-6 text-polati-green mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{demoUser.achievements.length}</p>
                <p className="text-sm text-gray-500">достижений</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <Trophy className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{formatNumber(demoUser.balance)}</p>
                <p className="text-sm text-gray-500">баллов</p>
              </div>
            </div>
          </Card>

          {/* Achievements */}
          <Card>
            <h3 className="font-semibold text-gray-800 mb-4">Достижения</h3>
            <div className="flex flex-wrap gap-2">
              {demoUser.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg"
                >
                  <CheckCircle className="w-4 h-4 text-polati-green" />
                  <span className="text-sm font-medium text-gray-700">{achievement}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Balance */}
          <Card className="bg-gradient-to-br from-polati-blue to-blue-600 text-white">
            <div className="text-center">
              <p className="text-blue-200 mb-1">Текущий баланс</p>
              <p className="text-4xl font-bold mb-2">{formatNumber(demoUser.balance)}</p>
              <p className="text-blue-200">баллов</p>
            </div>
          </Card>

          {/* Level Info */}
          <Card>
            <h3 className="font-semibold text-gray-800 mb-4">Уровень лояльности</h3>
            <div className="space-y-3">
              {['Новичок', 'Серебро', 'Золото', 'Платина', 'Бриллиант'].map((level) => (
                <div
                  key={level}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    level === demoUser.level
                      ? 'bg-yellow-50 border border-yellow-200'
                      : 'bg-gray-50'
                  }`}
                >
                  <span className={`font-medium ${
                    level === demoUser.level ? 'text-yellow-700' : 'text-gray-500'
                  }`}>
                    {level}
                  </span>
                  {level === demoUser.level && (
                    <Badge variant="orange">Текущий</Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Group Info */}
          <Card>
            <h3 className="font-semibold text-gray-800 mb-4">Группа сотрудника</h3>
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <p className="text-3xl font-bold text-polati-blue mb-1">{demoUser.group}</p>
              <p className="text-sm text-gray-600">
                {demoUser.group === 'РС' && 'Рабочие специальности'}
                {demoUser.group === 'ИТР' && 'Инженерно-технические работники'}
                {demoUser.group === 'ЦО' && 'Центральный офис'}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
