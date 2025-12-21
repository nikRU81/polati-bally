import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, X, Maximize2, Minimize2
} from 'lucide-react';

// Slide components
const TitleSlide = () => (
  <div className="h-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex flex-col items-center justify-center text-white p-12 relative overflow-hidden">
    {/* Background pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-20 right-20 w-64 h-64 border-[40px] border-white rounded-full" />
      <div className="absolute bottom-10 right-40 w-96 h-96 border-[40px] border-white transform rotate-45" />
    </div>

    {/* Logo */}
    <div className="mb-8 flex items-center gap-3 z-10">
      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
        <span className="text-3xl font-bold text-[#2563EB]">П</span>
      </div>
      <div className="text-left">
        <p className="text-2xl font-bold">ПОЛАТИ</p>
        <p className="text-sm text-blue-200">ПРОФЕССИОНАЛЬНАЯ<br/>СТРОИТЕЛЬНАЯ КОМПАНИЯ</p>
      </div>
    </div>

    {/* Badge */}
    <div className="bg-[#F97316] px-6 py-2 rounded-lg mb-8 z-10">
      <span className="font-bold tracking-wide">НОВАЯ ПРОГРАММА ЛОЯЛЬНОСТИ</span>
    </div>

    {/* Title */}
    <h1 className="text-6xl font-bold italic mb-6 z-10">ПОЛАТИ БАЛЛЫ</h1>

    {/* Subtitle */}
    <p className="text-xl text-blue-200 italic z-10">
      Выполняй задания — копи баллы — получай подарки
    </p>
  </div>
);

const AudienceSlide = () => (
  <div className="h-full bg-white p-12">
    <div className="border-t-4 border-[#2563EB] pt-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-12">Для кого программа?</h2>

      <div className="grid grid-cols-2 gap-12">
        <div className="space-y-6">
          {[
            { title: 'ЦЕЛЕВАЯ АУДИТОРИЯ', text: 'Программа лояльности для всех сотрудников компании ПОЛАТИ', color: 'border-[#2563EB]' },
            { title: 'ПРИНЦИП РАБОТЫ', text: 'Баллы начисляются автоматически за выполнение заданий в приложении ПОЛАТИ', color: 'border-[#F97316]' },
            { title: 'КЛЮЧЕВОЕ ПРЕИМУЩЕСТВО', text: 'Баллы никогда не сгорают — копите без ограничений', color: 'border-[#22C55E]' },
          ].map((item) => (
            <div key={item.title} className={`bg-gray-50 p-6 rounded-lg border-l-4 ${item.color}`}>
              <p className="text-sm font-bold text-[#2563EB] mb-2">{item.title}</p>
              <p className="text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>

        <div>
          <p className="text-sm font-bold text-gray-500 mb-6">ЗАПУСК ПРОГРАММЫ</p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#2563EB] rounded-full flex items-center justify-center text-white font-bold">1</div>
              <div>
                <p className="text-xl font-bold text-[#22C55E]">2026 год — Запуск</p>
                <p className="text-gray-500">Все группы сотрудников</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#2563EB] rounded-full flex items-center justify-center text-white font-bold">2</div>
              <div>
                <p className="text-xl font-bold">Единый старт</p>
                <p className="text-gray-500">РС, ИТР и ЦО — без этапности</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HowItWorksSlide = () => (
  <div className="h-full bg-white p-12">
    <div className="border-t-4 border-[#2563EB] pt-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-12">Что такое ПОЛАТИ БАЛЛЫ?</h2>

      <div className="grid grid-cols-3 gap-8 mb-12">
        {[
          { num: 1, title: 'ВЫПОЛНЯЙ', text: 'Выполняй задания из разных категорий: обучение, смены, карьера, лояльность и другие', color: 'bg-[#2563EB]' },
          { num: 2, title: 'КОПИ', text: 'Накапливай баллы на своём счёте в приложении ПОЛАТИ. Баллы никогда не сгорают!', color: 'bg-[#F97316]' },
          { num: 3, title: 'ОБМЕНИВАЙ', text: 'Обменивай баллы на ценные подарки в интернет-магазине ПОЛАТИ ПАЛАТКА и витрине ПОЛАТИ', color: 'bg-[#22C55E]' },
        ].map((item) => (
          <div key={item.num} className="bg-gray-50 p-6 rounded-lg">
            <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center text-white font-bold mb-4`}>
              {item.num}
            </div>
            <p className={`font-bold mb-3 ${item.color === 'bg-[#2563EB]' ? 'text-[#2563EB]' : item.color === 'bg-[#F97316]' ? 'text-[#F97316]' : 'text-[#22C55E]'}`}>
              {item.title}
            </p>
            <p className="text-gray-600 text-sm">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] rounded-xl p-8 text-white flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="text-6xl font-bold">1</div>
          <div>
            <p className="text-blue-200 text-sm">КУРС ОБМЕНА</p>
            <p className="text-3xl font-bold">1 БАЛЛ = 1 РУБЛЬ</p>
          </div>
        </div>
        <p className="text-4xl font-bold">ПРОСТОЙ РАСЧЁТ</p>
      </div>
    </div>
  </div>
);

const CategoriesSlide = () => (
  <div className="h-full bg-[#3B5BDB] flex flex-col items-center justify-center text-white p-12">
    <p className="text-sm tracking-widest mb-6">РАЗДЕЛ</p>
    <h2 className="text-6xl font-bold mb-8">КАТЕГОРИИ ЗАДАНИЙ</h2>
    <p className="text-xl">10 категорий • Более 130 способов заработать баллы</p>
  </div>
);

const TasksDetailSlide = () => (
  <div className="h-full bg-white p-12">
    <div className="border-t-4 border-[#2563EB] pt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Детализация заданий: Рабочие специальности (РС)</h2>
      <p className="text-gray-500 mb-8">Полный каталог заданий для сотрудников рабочих специальностей</p>

      <div className="grid grid-cols-5 gap-4">
        {[
          { name: 'ОБУЧЕНИЕ', count: '4 задания', color: 'bg-[#2563EB]' },
          { name: 'СМЕНЫ', count: '~200 заданий', color: 'bg-[#F97316]' },
          { name: 'КАРЬЕРА', count: '8 заданий', color: 'bg-[#22C55E]' },
          { name: 'ПУТЬ К УСПЕХУ', count: '15 заданий', color: 'bg-[#2563EB]' },
          { name: 'ЛОЯЛЬНОСТЬ', count: '16 заданий', color: 'bg-[#2563EB]' },
          { name: 'ОХРАНА ТРУДА', count: '2 задания', color: 'bg-[#EF4444]' },
          { name: 'МЕЖВАХТА', count: '3 задания', color: 'bg-[#2563EB]' },
          { name: 'ПРИВЕДИ ДРУГА', count: '1 задание', color: 'bg-[#F97316]' },
          { name: 'АКТИВНОСТИ', count: '5 заданий', color: 'bg-[#22C55E]' },
          { name: 'СОБЫТИЯ', count: '6 заданий', color: 'bg-[#22C55E]' },
        ].map((cat) => (
          <div key={cat.name} className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="font-bold text-gray-800 text-sm mb-2">{cat.name}</p>
            <div className={`h-1 ${cat.color} rounded mb-3`} />
            <p className="text-gray-500 text-sm">{cat.count}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const GroupsTableSlide = () => (
  <div className="h-full bg-white p-12">
    <div className="border-t-4 border-[#2563EB] pt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Распределение заданий по группам сотрудников</h2>
      <p className="text-gray-500 mb-8">РС — рабочие специальности, ИТР — инженерно-технические работники, ЦО — центральный офис</p>

      <table className="w-full">
        <thead>
          <tr className="bg-[#2563EB] text-white">
            <th className="text-left p-4 rounded-tl-lg">Группа заданий</th>
            <th className="p-4 text-center">РС</th>
            <th className="p-4 text-center">ИТР</th>
            <th className="p-4 text-center rounded-tr-lg">ЦО</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['ОБУЧЕНИЕ (WELCOME)', true, true, true],
            ['СМЕНЫ', true, true, true],
            ['КАРЬЕРА', true, true, true],
            ['ПУТЬ К УСПЕХУ', true, true, true],
            ['ЛОЯЛЬНОСТЬ', true, true, true],
            ['ОХРАНА ТРУДА', true, false, false],
            ['МЕЖВАХТА', true, true, false],
            ['ПРИВЕДИ ДРУГА', true, true, true],
            ['АКТИВНОСТИ В ПРИЛОЖЕНИИ', true, true, true],
            ['СОБЫТИЯ', true, true, true],
          ].map(([name, rs, itr, co], idx) => (
            <tr key={name as string} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="p-4 font-medium">{name}</td>
              <td className="p-4 text-center">
                <span className={rs ? 'text-[#22C55E] font-bold' : 'text-gray-300'}>
                  {rs ? 'ДА' : 'НЕТ'}
                </span>
              </td>
              <td className="p-4 text-center">
                <span className={itr ? 'text-[#22C55E] font-bold' : 'text-gray-300'}>
                  {itr ? 'ДА' : 'НЕТ'}
                </span>
              </td>
              <td className="p-4 text-center">
                <span className={co ? 'text-[#22C55E] font-bold' : 'text-gray-300'}>
                  {co ? 'ДА' : 'НЕТ'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const PointsSlide1 = () => (
  <div className="h-full bg-white p-12">
    <div className="border-t-4 border-[#2563EB] pt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">За что можно получить баллы?</h2>

      <div className="grid grid-cols-3 gap-6">
        {[
          {
            title: 'ОБУЧЕНИЕ', color: 'bg-[#F97316]',
            items: ['Велком бонус', 'Ачивка обучение (прошел обучение в УЦ)', 'Повторное обучение на другую специальность', 'Золотая Медаль УЦ']
          },
          {
            title: 'СМЕНЫ', color: 'bg-[#F97316]',
            items: ['Эволюция (за каждый уровень)', 'Ачивка Герб (за каждый)', 'Ачивка Кочевник (за каждый уровень)', 'Ночная Сова (за каждый уровень)']
          },
          {
            title: 'КАРЬЕРА', color: 'bg-[#22C55E]',
            items: ['Бригадир (первый раз в акт бригадиром)', 'Повышение категории', 'Из W в I', 'Изменение должности рабочей специальности']
          },
        ].map((cat) => (
          <div key={cat.title} className="bg-gray-50 rounded-lg overflow-hidden">
            <div className={`${cat.color} text-white p-4 font-bold`}>{cat.title}</div>
            <ul className="p-4 space-y-2">
              {cat.items.map((item) => (
                <li key={item} className="text-sm text-gray-700">•{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="text-gray-400 mt-6">Часть 1 из 3</p>
    </div>
  </div>
);

const PointsSlide2 = () => (
  <div className="h-full bg-white p-12">
    <div className="border-t-4 border-[#2563EB] pt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">За что можно получить баллы?</h2>

      <div className="grid grid-cols-3 gap-6">
        {[
          {
            title: 'ПУТЬ К УСПЕХУ', color: 'bg-[#2563EB]',
            items: ['Переход на уровень программы'],
            note: 'Награждение за каждые 500 смен в компании — открывает доступ к эксклюзивным подаркам'
          },
          {
            title: 'ЛОЯЛЬНОСТЬ', color: 'bg-[#2563EB]',
            items: ['ПОЛАТИ БОНУС (разовое достижение уровня)', 'ПОЛАТИ СТАЖ (переход на уровень)'],
            note: 'Баллы за достижения в других программах лояльности ПОЛАТИ'
          },
          {
            title: 'ОХРАНА ТРУДА', color: 'bg-[#EF4444]',
            items: ['Грамота охраны труда'],
            note: 'Сотрудники с наградами по ОТ получают доступ к эксклюзивным подаркам в приложении'
          },
        ].map((cat) => (
          <div key={cat.title} className="bg-gray-50 rounded-lg overflow-hidden">
            <div className={`${cat.color} text-white p-4 font-bold`}>{cat.title}</div>
            <div className="p-4">
              <ul className="space-y-2 mb-4">
                {cat.items.map((item) => (
                  <li key={item} className="text-sm text-gray-700">•{item}</li>
                ))}
              </ul>
              {cat.note && (
                <div className="bg-white p-3 rounded border-l-4 border-gray-300">
                  <p className="text-xs text-gray-500">{cat.note}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="text-gray-400 mt-6">Часть 2 из 3</p>
    </div>
  </div>
);

const PointsSlide3 = () => (
  <div className="h-full bg-white p-12">
    <div className="border-t-4 border-[#2563EB] pt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">За что можно получить баллы?</h2>

      <div className="grid grid-cols-4 gap-4">
        {[
          { title: 'МЕЖВАХТА', color: 'bg-[#2563EB]', items: ['Возврат на 2-ю вахту после полной 1-й', 'Возврат на 3-ю вахту (для новичков)', 'Межвахтовый отпуск до 30 дней'] },
          { title: 'ПРИВЕДИ ДРУГА', color: 'bg-[#F97316]', items: ['Друг отработал 1 вахту (60-80 смен)'], note: 'Получай баллы за каждого приведённого друга' },
          { title: 'АКТИВНОСТИ', color: 'bg-[#22C55E]', items: ['Актуализация номера телефона', 'Добавление размера СИЗ', 'Значимые оценки ИТР (3+ в месяц)', 'Полное прохождение опроса', 'Наклейка ПОЛАТИ на машине'] },
          { title: 'СОБЫТИЯ', color: 'bg-[#22C55E]', items: ['Новый год', '23 февраля', '8 марта', 'День строителя', 'День рождения', 'Рождение ребёнка'] },
        ].map((cat) => (
          <div key={cat.title} className="bg-gray-50 rounded-lg overflow-hidden">
            <div className={`${cat.color} text-white p-3 font-bold text-sm`}>{cat.title}</div>
            <div className="p-3">
              <ul className="space-y-1">
                {cat.items.map((item) => (
                  <li key={item} className="text-xs text-gray-700">•{item}</li>
                ))}
              </ul>
              {cat.note && (
                <p className="text-xs text-[#F97316] mt-2">{cat.note}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="text-gray-400 mt-6">Часть 3 из 3</p>
    </div>
  </div>
);

const EarningsSlide = () => (
  <div className="h-full bg-white p-12">
    <div className="border-t-4 border-[#2563EB] pt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Сколько можно заработать за год?</h2>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white p-8 rounded-xl">
          <p className="text-sm text-blue-200 mb-2">БЮДЖЕТ ПРОГРАММЫ</p>
          <p className="text-6xl font-bold mb-2">2%</p>
          <p className="text-blue-200">от средней заработной платы за год</p>
        </div>
        <div className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200">
          <p className="text-sm text-gray-500 mb-2">ПРИ 160-180 СМЕНАХ В ГОД</p>
          <p className="text-5xl font-bold text-[#F97316] mb-2">11-12 тыс.</p>
          <p className="text-gray-500">баллов в год</p>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-xl mb-6">
        <div className="flex items-center gap-8">
          <div className="bg-[#2563EB] text-white px-4 py-2 rounded-lg">ПУТЬ К УСПЕХУ</div>
          <p className="text-gray-600">Баллы в отдельном порядке</p>
          <div className="flex-1 flex justify-end gap-8">
            <div className="text-center">
              <p className="text-sm text-[#F97316] font-bold">500 смен</p>
              <p className="text-2xl font-bold">10 000</p>
              <p className="text-xs text-gray-500">баллов</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-[#F97316] font-bold">1000+ смен</p>
              <p className="text-2xl font-bold">30 000</p>
              <p className="text-xs text-gray-500">баллов</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-l-4 border-[#2563EB] bg-gray-50 p-4 rounded-r-lg">
        <p className="text-sm text-gray-500 font-bold mb-1">ПРИМЕР РАСЧЁТА</p>
        <p className="text-gray-700">Сотрудник с 500+ сменами: 11-12 тыс. (основные задания) + 10 000 (ПУТЬ К УСПЕХУ) = до 22 000 баллов</p>
      </div>
    </div>
  </div>
);

const RewardsSectionSlide = () => (
  <div className="h-full bg-[#F97316] flex flex-col items-center justify-center text-white p-12">
    <p className="text-sm tracking-widest mb-6">РАЗДЕЛ</p>
    <h2 className="text-6xl font-bold mb-8">ПОДАРКИ</h2>
    <p className="text-xl">На что можно обменять баллы</p>
  </div>
);

const RewardsTypesSlide = () => (
  <div className="h-full bg-white p-12">
    <div className="border-t-4 border-[#2563EB] pt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">На что можно обменять баллы?</h2>
      <p className="text-gray-500 mb-8">Баллы можно обменять на подарки в приложении. Программой предусмотрены 3 типа подарков</p>

      <div className="grid grid-cols-3 gap-6">
        {[
          {
            num: 1, title: 'ПОДАРКИ ЗА ЗАДАНИЯ', color: 'bg-[#2563EB]',
            items: [
              { subtitle: 'ДОСТУПНЫ С ПЕРВОЙ СМЕНЫ', text: 'Можно получить сразу после начала работы' },
              { subtitle: 'ПОЛАТИ ПАЛАТКА', text: 'Заказ через интернет-магазин с доставкой' },
            ]
          },
          {
            num: 2, title: 'ПУТЬ К УСПЕХУ', color: 'bg-[#A855F7]',
            items: [
              { subtitle: 'ЭТАП 1 — 500 смен', text: 'Открывается первый каталог эксклюзивных подарков' },
              { subtitle: 'ЭТАП 2 — 1000 смен', text: 'Открывается расширенный каталог премиум подарков' },
            ],
            footer: 'Обмен в приложении, получение на объекте'
          },
          {
            num: 3, title: 'ОХРАНА ТРУДА', color: 'bg-[#22C55E]',
            items: [
              { subtitle: 'СПЕЦИАЛЬНЫЙ ДОСТУП', text: 'Доступны сотрудникам с награждением по охране труда' },
            ],
            footer: 'Обмен в приложении, получение на объекте'
          },
        ].map((type) => (
          <div key={type.num} className="bg-gray-50 rounded-lg overflow-hidden">
            <div className={`${type.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold m-4`}>
              {type.num}
            </div>
            <p className="px-4 text-[#2563EB] font-bold mb-4">{type.title}</p>
            <div className="px-4 pb-4 space-y-4">
              {type.items.map((item) => (
                <div key={item.subtitle} className="bg-white p-3 rounded-lg">
                  <p className="text-xs text-[#F97316] font-bold mb-1">{item.subtitle}</p>
                  <p className="text-sm text-gray-600">{item.text}</p>
                </div>
              ))}
              {type.footer && (
                <p className="text-xs text-gray-400 pt-2 border-t">{type.footer}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SummarySlide = () => (
  <div className="h-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white p-12">
    <h2 className="text-4xl font-bold mb-8">ПОЛАТИ БАЛЛЫ — Главное</h2>

    <div className="grid grid-cols-3 gap-4 mb-8">
      {[
        { label: 'ПРИНЦИП', value: 'Выполняй — Копи — Обменивай' },
        { label: 'КАТЕГОРИИ', value: '10 категорий заданий' },
        { label: 'КУРС', value: '1 балл = 1 рубль' },
        { label: 'БЮДЖЕТ', value: '11-12 тыс. баллов в год' },
        { label: 'ВАЖНО', value: 'Баллы никогда не сгорают' },
        { label: 'ПОДАРКИ', value: '3 типа подарков в приложении' },
      ].map((item) => (
        <div key={item.label} className="bg-white/20 backdrop-blur rounded-xl p-4">
          <p className="text-xs text-blue-200 mb-1">{item.label}</p>
          <p className="font-semibold">{item.value}</p>
        </div>
      ))}
    </div>

    <div className="bg-white/10 backdrop-blur rounded-xl p-6 flex items-center justify-between">
      <div>
        <p className="text-blue-200 text-sm mb-1">НАЧНИ КОПИТЬ БАЛЛЫ</p>
        <p className="text-xl font-bold">Скачай приложение ПОЛАТИ и начни копить уже сегодня!</p>
      </div>
      <div className="bg-[#F97316] px-8 py-3 rounded-xl font-bold text-lg">ПОЛАТИ</div>
    </div>
  </div>
);

const slides = [
  TitleSlide,
  AudienceSlide,
  HowItWorksSlide,
  CategoriesSlide,
  TasksDetailSlide,
  GroupsTableSlide,
  PointsSlide1,
  PointsSlide2,
  PointsSlide3,
  EarningsSlide,
  RewardsSectionSlide,
  RewardsTypesSlide,
  SummarySlide,
];

export function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const navigate = useNavigate();

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(Math.max(0, Math.min(slides.length - 1, index)));
  }, []);

  const nextSlide = useCallback(() => goToSlide(currentSlide + 1), [currentSlide, goToSlide]);
  const prevSlide = useCallback(() => goToSlide(currentSlide - 1), [currentSlide, goToSlide]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      else if (e.key === 'ArrowLeft') prevSlide();
      else if (e.key === 'Escape') navigate('/');
      else if (e.key === 'f' || e.key === 'F') toggleFullscreen();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, navigate, toggleFullscreen]);

  const CurrentSlideComponent = slides[currentSlide];

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Toolbar */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={toggleFullscreen}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
        >
          {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>
        <button
          onClick={() => navigate('/')}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Slide */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl aspect-[16/9] bg-white rounded-xl overflow-hidden shadow-2xl">
          <CurrentSlideComponent />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 p-4">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-full text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="p-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-full text-white transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-4 right-4 text-white/50 text-sm">
        {currentSlide + 1} / {slides.length}
      </div>

      {/* Keyboard hints */}
      <div className="absolute bottom-4 left-4 text-white/30 text-xs">
        ← → навигация • F полный экран • Esc выход
      </div>
    </div>
  );
}
