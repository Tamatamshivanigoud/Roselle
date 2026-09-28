import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, CreditCard, Tag, CheckCheck } from 'lucide-react';
import { Card } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { mockNotifications } from '@/data/mockData';

const iconMap = {
  appointment: Calendar,
  payment: CreditCard,
  reminder: Bell,
  promotion: Tag,
};

const Notifications: React.FC = () => {
  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1F2937]" style={{ fontFamily: "'Playfair Display', serif" }}>Notifications</h2>
          <p className="text-gray-400 text-sm">Stay updated with your appointments and offers</p>
        </div>
        <Button variant="ghost" size="sm" icon={<CheckCheck className="w-4 h-4" />}>Mark all read</Button>
      </div>

      <div className="space-y-3">
        {mockNotifications.map((notif, i) => {
          const Icon = iconMap[notif.type];
          const colorMap = {
            appointment: '#C9A227',
            payment: '#22C55E',
            reminder: '#8B5CF6',
            promotion: '#E6B8AF',
          };
          const color = colorMap[notif.type];

          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={`p-4 ${!notif.read ? 'border-l-4 border-l-[#C9A227]' : ''}`}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}15` }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-sm text-[#1F2937]">{notif.title}</p>
                      {!notif.read && <span className="w-2 h-2 bg-[#C9A227] rounded-full flex-shrink-0" />}
                    </div>
                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">{notif.message}</p>
                    <p className="text-gray-300 text-xs mt-2">{new Date(notif.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;
