import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Search, Plus, TrendingUp, TrendingDown, Download, Eye, Calendar } from 'lucide-react';
import { faker } from '@faker-js/faker';
import DashboardLayout from '../../components/Layout/DashboardLayout';

const generateTransactions = () => {
  return Array.from({ length: 50 }, (_, index) => ({
    id: `TRN-${1001 + index}`,
    description: faker.finance.transactionDescription(),
    amount: faker.number.int({ min: 100, max: 5000 }),
    type: faker.helpers.arrayElement<'إيراد' | 'مصروف'>(['إيراد', 'مصروف']),
    date: faker.date.past({ years: 1 }).toISOString().split('T')[0],
    category: faker.helpers.arrayElement(['رسوم دراسية', 'رواتب', 'مستلزمات', 'صيانة', 'تسويق']),
    studentName: faker.helpers.arrayElement([faker.person.fullName(), null]),
    invoiceNumber: `INV-${faker.string.alphanumeric(8).toUpperCase()}`
  }));
};

export default function AdminFinancial() {
  const [transactions, setTransactions] = useState(generateTransactions());
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter(t =>
    t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.studentName && t.studentName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalRevenue = transactions.filter(t => t.type === 'إيراد').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'مصروف').reduce((sum, t) => sum + t.amount, 0);
  const netProfit = totalRevenue - totalExpenses;

  const stats = [
    { label: 'إجمالي الإيرادات', value: `${totalRevenue.toLocaleString()} ر.س`, icon: TrendingUp, color: 'green' },
    { label: 'إجمالي المصروفات', value: `${totalExpenses.toLocaleString()} ر.س`, icon: TrendingDown, color: 'red' },
    { label: 'صافي الربح', value: `${netProfit.toLocaleString()} ر.س`, icon: DollarSign, color: 'blue' },
  ];

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">الإدارة المالية</h1>
          <div className="flex items-center space-x-4 space-x-reverse">
            <button className="flex items-center space-x-2 space-x-reverse bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Download className="h-4 w-4" />
              <span>تصدير تقرير</span>
            </button>
            <button className="flex items-center space-x-2 space-x-reverse bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Plus className="h-4 w-4" />
              <span>إضافة معاملة</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                    <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="البحث في المعاملات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الوصف</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المبلغ</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النوع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التصنيف</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.slice(0, 15).map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">{t.description}</p>
                      <p className="text-sm text-gray-500">{t.studentName || t.invoiceNumber}</p>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${t.type === 'إيراد' ? 'text-green-600' : 'text-red-600'}`}>
                      {t.amount.toLocaleString()} ر.س
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${t.type === 'إيراد' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {t.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{t.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
