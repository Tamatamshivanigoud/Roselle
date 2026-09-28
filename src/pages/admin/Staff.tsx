import React from 'react';
import { Card } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { mockBeauticians } from '@/data/mockData';
import { StarRating } from '@/components/ui/index';
import { motion } from 'framer-motion';

const AdminStaff: React.FC = () => {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#1F2937]" style={{ fontFamily: "'Playfair Display', serif" }}>Staff Management</h2>
          <p className="text-gray-400 text-sm">Manage beauticians and their availability</p>
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>Add Staff</Button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockBeauticians.map((b, i) => (
          <motion.div key={b.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="p-5" hover>
              <div className="flex items-center gap-4 mb-4">
                <img src={b.image} alt={b.name} className="w-16 h-16 rounded-full object-cover object-top" />
                <div>
                  <p className="font-bold text-[#1F2937]">{b.name}</p>
                  <p className="text-[#C9A227] text-sm">{b.role}</p>
                  <StarRating rating={b.rating} size={12} />
                </div>
              </div>
              <p className="text-gray-400 text-xs mb-3">{b.bio}</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {b.specialization.map(s => (
                  <span key={s} className="text-xs bg-[#C9A227]/10 text-[#A8851E] px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2.5 py-1 rounded-full ${b.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                  {b.available ? '● Available' : '● Unavailable'}
                </span>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminStaff;
