import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Search, Plus, Edit, Trash2, Eye, Users, Tv, Wind, Calendar } from 'lucide-react';
import { faker } from '@faker-js/faker';
import DashboardLayout from '../../components/Layout/DashboardLayout';

const generateRooms = () => {
  return Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    name: `قاعة ${faker.lorem.word()} ${index + 101}`,
    capacity: faker.number.int({ min: 10, max: 50 }),
    status: faker.helpers.arrayElement(['متاحة', 'محجوزة', 'صيانة']),
    equipment: faker.helpers.arrayElements(['سبورة ذكية', 'بروجيكتور', 'تكييف', 'نظام صوتي'], { min: 1, max: 3 }),
    location: `الطابق ${faker.number.int({ min: 1, max: 4 })}`,
  }));
};

export default function AdminRooms() {
  const [rooms, setRooms] = useState(generateRooms());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<any | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'متاحة': return 'bg-green-100 text-green-600';
      case 'محجوزة': return 'bg-red-100 text-red-600';
      case 'صيانة': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">إدارة القاعات</h1>
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="البحث عن قاعة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
              />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 space-x-reverse bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>إضافة قاعة</span>
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القاعة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">السعة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الموقع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التجهيزات</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRooms.map((room) => (
                  <tr key={room.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{room.capacity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{room.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.equipment.join(', ')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(room.status)}`}>
                        {room.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button onClick={() => setSelectedRoom(room)} className="text-blue-600 hover:text-blue-800"><Calendar className="h-4 w-4" /></button>
                        <button className="text-green-600 hover:text-green-800"><Edit className="h-4 w-4" /></button>
                        <button className="text-red-600 hover:text-red-800"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
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
