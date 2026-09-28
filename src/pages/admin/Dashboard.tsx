import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, TrendingUp, Star, ArrowUp, Clock, CheckCircle } from 'lucide-react';
import { Card, Badge } from '@/components/ui/index';
import { mockDashboardStats, mockAppointments, revenueData } from '@/data/mockData';

const statCards = [
  {
    icon: Users, label: 'Total Customers', value: '1,248',
    change: '+12%', up: true, color: '#C9A227', bg: '#C9A22710'
  },
  {
    icon: Calendar, label: 'Total Appointments', value: '8,642',
    change: '+18%', up: true, color: '#8B5CF6', bg: '#8B5CF610'
  },
  {
    icon: TrendingUp, label: 'Total Revenue', value: '₹42.5L',
    change: '+24%', up: true, color: '#22C55E', bg: '#22C55E10'
  },
  {
    icon: Star, label: 'Average Rating', value: '4.9 ★',
    change: '+0.2', up: true, color: '#F59E0B', bg: '#F59E0B10'
  },
];

const AdminDashboard: React.FC = () => {
  const todayApts = mockAppointments.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-[#1F2937] mb-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
          Good Morning, Admin ✨
        </h1>
        <p className="text-gray-400 text-sm">Here's what's happening at Lumina today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.bg }}>
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <span className={`text-xs font-semibold flex items-center gap-1 ${stat.up ? 'text-green-500' : 'text-red-500'}`}>
                  <ArrowUp className={`w-3 h-3 ${!stat.up ? 'rotate-180' : ''}`} />
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-[#1F2937] mb-0.5">{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart (visual bar chart) */}
        <div className="lg:col-span-2">
          <Card className="p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-[#1F2937]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Revenue Overview
              </h3>
              <Badge variant="gold">Last 6 months</Badge>
            </div>
            <div className="flex items-end gap-3 h-48">
              {revenueData.map((d, i) => {
                const max = Math.max(...revenueData.map(r => r.revenue));
                const h = (d.revenue / max) * 100;
                return (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="relative w-full flex items-end" style={{ height: '160px' }}>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                        className="w-full rounded-t-lg bg-gradient-to-t from-[#C9A227] to-[#E6B8AF] relative cursor-pointer hover:from-[#A8851E] hover:to-[#C9A227] transition-all"
                        style={{ position: 'absolute', bottom: 0 }}
                      >
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1F2937] text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          ₹{(d.revenue / 1000).toFixed(0)}K
                        </div>
                      </motion.div>
                    </div>
                    <span className="text-xs text-gray-400">{d.month}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Quick Stats */}
        <div>
          <Card className="p-6 h-full">
            <h3 className="font-bold text-[#1F2937] mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              Today at a Glance
            </h3>
            <div className="space-y-4">
              {[
                { icon: Calendar, label: 'Appointments Today', value: '18', color: '#C9A227' },
                { icon: Users, label: 'New Customers', value: '4', color: '#8B5CF6' },
                { icon: TrendingUp, label: "Today's Revenue", value: '₹32,400', color: '#22C55E' },
                { icon: Clock, label: 'Pending Confirmations', value: '3', color: '#F59E0B' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 p-3 bg-[#FAF8F5] rounded-xl">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                    <item.icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">{item.label}</p>
                    <p className="font-bold text-sm text-[#1F2937]">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Appointments */}
      <Card className="p-6">
        <h3 className="font-bold text-[#1F2937] mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
          Recent Appointments
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Customer', 'Service', 'Beautician', 'Date & Time', 'Amount', 'Status'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-xs text-gray-400 font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {todayApts.map(apt => (
                <tr key={apt.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-[#1F2937] whitespace-nowrap">{apt.customerName}</td>
                  <td className="py-3 px-4 text-gray-500 whitespace-nowrap">{apt.serviceName}</td>
                  <td className="py-3 px-4 text-gray-500 whitespace-nowrap">{apt.beauticianName}</td>
                  <td className="py-3 px-4 text-gray-400 whitespace-nowrap text-xs">{apt.date} • {apt.time}</td>
                  <td className="py-3 px-4 font-bold text-[#C9A227] whitespace-nowrap">₹{apt.totalPrice.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium
                      ${apt.status === 'completed' ? 'bg-green-100 text-green-700' :
                        apt.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                        apt.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                      {apt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
