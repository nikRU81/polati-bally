import type { User, Balance, Transaction } from '../types';

export const mockUsers: User[] = [
  { id: 'EMP_001', name: 'Иванов Иван', employeeYear: 1, position: 'Монтажник' },
  { id: 'EMP_002', name: 'Петрова Анна', employeeYear: 3, position: 'Монтажник' },
  { id: 'EMP_003', name: 'Сидоров Пётр', employeeYear: 5, position: 'Бригадир' },
];

export const mockBalances: Record<string, Balance> = {
  'EMP_001': { current: 1800, totalEarned: 3800, totalSpent: 2000 },
  'EMP_002': { current: 5500, totalEarned: 12000, totalSpent: 6500 },
  'EMP_003': { current: 15000, totalEarned: 28000, totalSpent: 13000 },
};

// Transactions based on original tasks.csv
export const mockTransactions: Record<string, Transaction[]> = {
  'EMP_001': [
    { id: 'TXN_001', type: 'accrual', amount: 500, description: 'Велком бонус', date: '2024-09-01', taskId: 'OBU_001' },
    { id: 'TXN_002', type: 'accrual', amount: 300, description: 'Ачивка обучение', date: '2024-09-05', taskId: 'OBU_002' },
    { id: 'TXN_003', type: 'accrual', amount: 100, description: 'Эволюция 1 смена', date: '2024-09-10', taskId: 'SME_001' },
    { id: 'TXN_004', type: 'accrual', amount: 100, description: 'Эволюция 10 смен', date: '2024-09-20', taskId: 'SME_002' },
    { id: 'TXN_005', type: 'accrual', amount: 2000, description: 'Возврат на 2-ю вахту', date: '2024-10-01', taskId: 'MEZ_001' },
    { id: 'TXN_006', type: 'accrual', amount: 500, description: 'ПОЛАТИ БОНУС Серебро', date: '2024-10-15', taskId: 'LOY_001' },
    { id: 'TXN_007', type: 'accrual', amount: 300, description: 'Новый год', date: '2024-01-01', taskId: 'SOB_001' },
    { id: 'TXN_008', type: 'redemption', amount: 1995, description: 'Термокружка ПОЛАТИ', date: '2024-11-01', orderId: 'ORD_001' },
  ],
  'EMP_002': [
    { id: 'TXN_101', type: 'accrual', amount: 500, description: 'Велком бонус', date: '2022-03-01', taskId: 'OBU_001' },
    { id: 'TXN_102', type: 'accrual', amount: 300, description: 'Ачивка обучение', date: '2022-03-10', taskId: 'OBU_002' },
    { id: 'TXN_103', type: 'accrual', amount: 100, description: 'Эволюция 1 смена', date: '2022-03-15', taskId: 'SME_001' },
    { id: 'TXN_104', type: 'accrual', amount: 2000, description: 'Возврат на 2-ю вахту', date: '2022-04-01', taskId: 'MEZ_001' },
    { id: 'TXN_105', type: 'accrual', amount: 1000, description: 'Межвахтовый отпуск до 20 дней', date: '2022-06-01', taskId: 'MEZ_002' },
    { id: 'TXN_106', type: 'accrual', amount: 500, description: 'Герб объекта', date: '2022-08-01', taskId: 'SME_020' },
    { id: 'TXN_107', type: 'accrual', amount: 1000, description: 'ПОЛАТИ СТАЖ 250 смен', date: '2023-03-01', taskId: 'LOY_003' },
    { id: 'TXN_108', type: 'accrual', amount: 750, description: 'Повышение СЛИП 4', date: '2023-06-01', taskId: 'KAR_004' },
    { id: 'TXN_109', type: 'redemption', amount: 2099, description: 'Футболка белая ПОЛАТИ', date: '2023-08-01', orderId: 'ORD_002' },
    { id: 'TXN_110', type: 'accrual', amount: 1000, description: 'ПОЛАТИ СТАЖ 500 смен', date: '2024-03-01', taskId: 'LOY_004' },
    { id: 'TXN_111', type: 'accrual', amount: 300, description: 'День строителя', date: '2024-08-11', taskId: 'SOB_004' },
    { id: 'TXN_112', type: 'accrual', amount: 150, description: 'Оценка ИТР', date: '2024-09-01', taskId: 'AKT_003' },
    { id: 'TXN_113', type: 'redemption', amount: 4549, description: 'Свитшот серый ПОЛАТИ', date: '2024-10-15', orderId: 'ORD_003' },
  ],
  'EMP_003': [
    { id: 'TXN_201', type: 'accrual', amount: 500, description: 'Велком бонус', date: '2020-01-15', taskId: 'OBU_001' },
    { id: 'TXN_202', type: 'accrual', amount: 300, description: 'Ачивка обучение', date: '2020-01-20', taskId: 'OBU_002' },
    { id: 'TXN_203', type: 'accrual', amount: 2000, description: 'Возврат на 2-ю вахту', date: '2020-02-01', taskId: 'MEZ_001' },
    { id: 'TXN_204', type: 'accrual', amount: 500, description: 'Бригадир', date: '2021-01-15', taskId: 'KAR_001' },
    { id: 'TXN_205', type: 'accrual', amount: 1000, description: 'ПОЛАТИ СТАЖ 250 смен', date: '2021-06-01', taskId: 'LOY_003' },
    { id: 'TXN_206', type: 'redemption', amount: 2449, description: 'Бейсболка ПОЛАТИ', date: '2021-08-01', orderId: 'ORD_004' },
    { id: 'TXN_207', type: 'accrual', amount: 1000, description: 'ПОЛАТИ СТАЖ 500 смен', date: '2022-06-01', taskId: 'LOY_004' },
    { id: 'TXN_208', type: 'accrual', amount: 300, description: 'Ночная Сова 500 смен', date: '2022-09-01', taskId: 'SME_024' },
    { id: 'TXN_209', type: 'accrual', amount: 1500, description: 'Друг отработал 60 смен', date: '2023-03-01', taskId: 'DRU_001' },
    { id: 'TXN_210', type: 'accrual', amount: 1000, description: 'ПОЛАТИ СТАЖ 750 смен', date: '2023-06-01', taskId: 'LOY_005' },
    { id: 'TXN_211', type: 'redemption', amount: 10499, description: 'Сумка ПОЛАТИ', date: '2023-08-01', orderId: 'ORD_005' },
    { id: 'TXN_212', type: 'accrual', amount: 1000, description: 'ПОЛАТИ СТАЖ 1000 смен', date: '2024-06-01', taskId: 'LOY_006' },
    { id: 'TXN_213', type: 'accrual', amount: 100, description: 'Эволюция 1000 смен', date: '2024-06-01', taskId: 'SME_019' },
    { id: 'TXN_214', type: 'accrual', amount: 300, description: 'День рождения', date: '2024-10-15', taskId: 'SOB_005' },
  ],
};
