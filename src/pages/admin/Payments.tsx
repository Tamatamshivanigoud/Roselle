import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, CreditCard, Download } from 'lucide-react';
import { Card } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { mockAppointments, revenueData } from '@/data/mockData';

const AdminPayments: React.FC = () => {
  const completedApts = mockAppointments.filter(a => a.status === 'completed');
  const totalRevenue = completedApts.reduce((sum, a) => sum + a.totalPrice, 0);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-[#1F2937]" style={{ fontFamily: "'Playfair Display', serif" }}>Payments & Revenue</h2>
        <p className="text-gray-400 text-sm">Track all transactions and financial overview</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '₹42.5L', icon: TrendingUp, color: '#22C55E' },
          { label: 'This Month', value: '₹5,00,000', icon: CreditCard, color: '#C9A227' },
          { label: 'Transactions', value: '8,642', icon: CreditCard, color: '#8B5CF6' },
          { label: 'Avg. Per Visit', value: '₹4,920', icon: TrendingUp, color: '#F59E0B' },
        ].map((s, i) => (
          <Card key={s.label} className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <s.icon className="w-4 h-4" style={{ color: s.color }} />
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
            <p className="text-xl font-bold text-[#1F2937]">{s.value}</p>
          </Card>
        ))}
      </div>

      {/* Transactions */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[#1F2937]" style={{ fontFamily: "'Playfair Display', serif" }}>Recent Transactions</h3>
          <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />}>Export</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Transaction ID', 'Customer', 'Service', 'Date', 'Amount', 'Status'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-xs text-gray-400 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockAppointments.map((apt, i) => (
                <motion.tr
                  key={apt.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-gray-50 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-xs text-gray-400 font-mono">TXN-{apt.id.toUpperCase()}</td>
                  <td className="py-3 px-4 font-medium text-[#1F2937]">{apt.customerName}</td>
                  <td className="py-3 px-4 text-gray-500">{apt.serviceName}</td>
                  <td className="py-3 px-4 text-gray-400">{apt.date}</td>
                  <td className="py-3 px-4 font-bold text-[#C9A227]">₹{apt.totalPrice.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium
                      ${apt.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}
                    >
                      {apt.status === 'completed' ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminPayments;
