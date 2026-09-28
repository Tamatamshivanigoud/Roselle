import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Eye, Mail, Phone } from 'lucide-react';
import { Card, StarRating } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { mockCustomers } from '@/data/mockData';

const AdminCustomers: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = mockCustomers.filter(c =>
    `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#1F2937]" style={{ fontFamily: "'Playfair Display', serif" }}>Customer Management</h2>
          <p className="text-gray-400 text-sm">Manage your client database</p>
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>Add Customer</Button>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A227]"
          />
        </div>
      </Card>

      {/* Customer grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((customer, i) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="p-5 hover:shadow-lg transition-all duration-300" hover>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A227] to-[#E6B8AF] flex items-center justify-center text-white font-bold">
                  {customer.firstName[0]}{customer.lastName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#1F2937] truncate">{customer.firstName} {customer.lastName}</p>
                  <p className="text-xs text-gray-400">Since {customer.joinedDate}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Mail className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Phone className="w-3.5 h-3.5 text-[#C9A227]" />
                  {customer.phone}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                {[
                  { v: customer.totalAppointments, l: 'Visits' },
                  { v: `₹${(customer.totalSpent / 1000).toFixed(0)}K`, l: 'Spent' },
                  { v: customer.loyaltyPoints, l: 'Points' },
                ].map(stat => (
                  <div key={stat.l} className="bg-[#FAF8F5] rounded-lg p-2">
                    <p className="font-bold text-xs text-[#C9A227]">{stat.v}</p>
                    <p className="text-[10px] text-gray-400">{stat.l}</p>
                  </div>
                ))}
              </div>

              <Button variant="outline" size="sm" className="w-full" icon={<Eye className="w-3.5 h-3.5" />}>
                View Profile
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminCustomers;
