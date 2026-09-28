import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, Calendar, Clock } from 'lucide-react';
import { Card, Badge } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { mockAppointments } from '@/data/mockData';

type StatusFilter = 'all' | 'upcoming' | 'completed' | 'cancelled' | 'in-progress';

const AdminAppointments: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const filtered = mockAppointments.filter(a => {
    const matchSearch = a.customerName.toLowerCase().includes(search.toLowerCase()) ||
      a.serviceName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-[#1F2937] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Appointments Management</h2>
        <p className="text-gray-400 text-sm">View and manage all salon appointments</p>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer or service..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A227]"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['all', 'upcoming', 'in-progress', 'completed', 'cancelled'] as StatusFilter[]).map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all capitalize
                  ${statusFilter === s ? 'bg-[#C9A227] text-white' : 'bg-gray-100 text-gray-600 hover:bg-[#C9A227]/10 hover:text-[#C9A227]'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['ID', 'Customer', 'Service', 'Beautician', 'Date', 'Time', 'Amount', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-400 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((apt, i) => (
                <motion.tr
                  key={apt.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-xs text-gray-400 font-mono">#{apt.id}</td>
                  <td className="py-3 px-4 font-medium text-[#1F2937] whitespace-nowrap">{apt.customerName}</td>
                  <td className="py-3 px-4 text-gray-500 whitespace-nowrap">{apt.serviceName}</td>
                  <td className="py-3 px-4 text-gray-500 whitespace-nowrap">{apt.beauticianName}</td>
                  <td className="py-3 px-4 text-gray-400 whitespace-nowrap">
                    <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {apt.date}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-400 whitespace-nowrap">
                    <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> {apt.time}</div>
                  </td>
                  <td className="py-3 px-4 font-bold text-[#C9A227]">₹{apt.totalPrice.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize
                      ${apt.status === 'completed' ? 'bg-green-100 text-green-700' :
                        apt.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                        apt.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm" icon={<Eye className="w-3.5 h-3.5" />}>View</Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Calendar className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>No appointments found</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AdminAppointments;
