import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Download, Calendar, DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import DashboardLayout from '../../components/Layout/DashboardLayout';

export default function StudentPayments() {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'pending'>('overview');

  const paymentStats = [
    { label: 'إجمالي المدفوعات', value: '12,500 ر.س', icon: DollarSign, color: 'blue' },
    { label: 'المدفوعات المعلقة', value: '2,500 ر.س', icon: Clock, color: 'orange' },
    { label: 'المدفوعات المكتملة', value: '10,000 ر.س', icon: CheckCircle, color: 'green' },
    { label: 'المدفوعات المتأخرة', value: '0 ر.س', icon: AlertCircle, color: 'red' }
  ];

  const paymentHistory = [
    {
      id: 1,
      courseTitle: 'البرمجة الأساسية',
      amount: 2500,
      date: '2025-01-10',
      status: 'مكتمل',
      method: 'بطاقة ائتمان',
      invoiceNumber: 'INV-2025-001'
    },
    {
      id: 2,
      courseTitle: 'تصميم المواقع',
      amount: 2200,
      date: '2025-01-05',
      status: 'مكتمل',
      method: 'تحويل بنكي',
      invoiceNumber: 'INV-2025-002'
    },
    {
      id: 3,
      courseTitle: 'قواعد البيانات',
      amount: 1800,
      date: '2024-12-28',
      status: 'مكتمل',
      method: 'بطاقة ائتمان',
      invoiceNumber: 'INV-2024-098'
    }
  ];

  const pendingPayments = [
    {
      id: 4,
      courseTitle: 'الذكاء الاصطناعي',
      amount: 2500,
      dueDate: '2025-01-25',
      status: 'معلق',
      description: 'دفعة الدورة الأولى'
    },
    {
      id: 5,
      courseTitle: 'أمن المعلومات',
      amount: 1800,
      dueDate: '2025-02-01',
      status: 'معلق',
      description: 'رسوم التسجيل'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مكتمل': return 'bg-green-100 text-green-600';
      case 'معلق': return 'bg-orange-100 text-orange-600';
      case 'متأخر': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">إدارة المدفوعات</h1>
          <button className="flex items-center space-x-2 space-x-reverse bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Download className="h-4 w-4" />
            <span>تحميل كشف حساب</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paymentStats.map((stat, index) => {
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

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 space-x-reverse">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              نظرة عامة
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              سجل المدفوعات ({paymentHistory.length})
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'pending'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              المدفوعات المعلقة ({pendingPayments.length})
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-2 gap-6"
            >
              {/* Payment Methods */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">طرق الدفع المحفوظة</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <CreditCard className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">بطاقة ائتمان</p>
                        <p className="text-sm text-gray-600">**** **** **** 1234</p>
                      </div>
                    </div>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">افتراضي</span>
                  </div>
                  <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors">
                    + إضافة طريقة دفع جديدة
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">النشاط الأخير</h3>
                <div className="space-y-3">
                  {paymentHistory.slice(0, 3).map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{payment.courseTitle}</p>
                        <p className="text-sm text-gray-600">{payment.date}</p>
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-gray-900">{payment.amount} ر.س</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الدورة</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المبلغ</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">طريقة الدفع</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paymentHistory.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{payment.courseTitle}</p>
                            <p className="text-xs text-gray-500">{payment.invoiceNumber}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          {payment.amount} ر.س
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 ml-1" />
                            {payment.date}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {payment.method}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(payment.status)}`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <button className="text-blue-600 hover:text-blue-800 flex items-center">
                            <Download className="h-4 w-4 ml-1" />
                            تحميل
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'pending' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {pendingPayments.map((payment) => (
                <div key={payment.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1 mb-4 md:mb-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{payment.courseTitle}</h3>
                      <p className="text-gray-600 mb-2">{payment.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 ml-1" />
                        <span>موعد الاستحقاق: {payment.dueDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="text-left">
                        <p className="text-2xl font-bold text-gray-900">{payment.amount} ر.س</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        ادفع الآن
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {pendingPayments.length === 0 && (
                <div className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مدفوعات معلقة</h3>
                  <p className="text-gray-600">جميع مدفوعاتك محدثة ومكتملة</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
