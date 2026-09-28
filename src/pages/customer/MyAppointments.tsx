import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, RotateCcw, X, CheckCircle } from 'lucide-react';
import { Card, Badge } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { mockAppointments } from '@/data/mockData';
import type { AppointmentStatus } from '@/types';

type Tab = 'upcoming' | 'completed' | 'cancelled';
const tabs: { key: Tab; label: string }[] = [
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
];

const statusConfig: Record<AppointmentStatus, { variant: any; label: string }> = {
  upcoming: { variant: 'blue', label: 'Upcoming' },
  completed: { variant: 'green', label: 'Completed' },
  cancelled: { variant: 'red', label: 'Cancelled' },
  'in-progress': { variant: 'gold', label: 'In Progress' },
};

const MyAppointments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('upcoming');
  const filtered = mockAppointments.filter(a =>
    a.status === activeTab || (activeTab === 'upcoming' && a.status === 'in-progress')
  );

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-[#1F2937] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>My Appointments</h2>
        <p className="text-gray-400 text-sm">Manage and track all your beauty appointments</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1.5 rounded-xl w-fit mb-4">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.key ? 'bg-white text-[#C9A227] shadow-sm' : 'text-gray-500 hover:text-[#C9A227]'}`}
          >
            <span>{tab.label}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === tab.key ? 'bg-[#C9A227]/10 text-[#C9A227]' : 'bg-gray-200 text-gray-500'}`}>
              {mockAppointments.filter(a => {
                if (tab.key === 'upcoming') return a.status === 'upcoming' || a.status === 'in-progress';
                return a.status === tab.key;
              }).length}
            </span>
          </button>
        ))}
      </div>

      {/* Appointment list */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((apt, i) => {
            const config = statusConfig[apt.status];
            return (
              <motion.div
                key={apt.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Card className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Info */}
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-[#C9A227]/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-7 h-7 text-[#C9A227]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#1F2937] mb-0.5">{apt.serviceName}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-400 mb-1">
                          <User className="w-3.5 h-3.5" />
                          {apt.beauticianName}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {apt.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {apt.time}
                          </span>
                        </div>
                        {apt.notes && (
                          <p className="text-xs text-gray-400 mt-1 italic">"{apt.notes}"</p>
                        )}
                      </div>
                    </div>

                    {/* Right (Actions & Price) */}
                    <div className="flex flex-col sm:items-end gap-4 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-0 border-gray-100 shrink-0">
                      <div className="flex items-center justify-between w-full sm:w-auto sm:block sm:text-right">
                        <p className="font-bold text-[20px] text-[#C9A227] sm:mb-1.5">₹{apt.totalPrice.toLocaleString()}</p>
                        <Badge variant={config.variant}>{config.label}</Badge>
                      </div>
                      
                      {apt.status === 'upcoming' && (
                        <div className="flex gap-3 w-full sm:w-auto">
                          <Button variant="outline" size="sm" className="flex-1 sm:flex-none justify-center rounded-full shadow-sm hover:shadow-md transition-shadow" icon={<RotateCcw className="w-3.5 h-3.5" />}>
                            Reschedule
                          </Button>
                          <Button variant="danger" size="sm" className="flex-1 sm:flex-none justify-center rounded-full shadow-sm hover:shadow-md transition-shadow" icon={<X className="w-3.5 h-3.5" />}>
                            Cancel
                          </Button>
                        </div>
                      )}
                      {apt.status === 'completed' && (
                        <Button variant="primary" size="sm" className="w-full sm:w-auto justify-center rounded-full shadow-md" icon={<CheckCircle className="w-3.5 h-3.5" />}>
                          Write Review
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <Card className="p-16 text-center">
          <Calendar className="w-14 h-14 mx-auto mb-4 text-gray-200" />
          <h3 className="text-lg font-semibold text-gray-400 mb-2">No {activeTab} appointments</h3>
          <p className="text-gray-300 text-sm">Book your first appointment now!</p>
        </Card>
      )}
    </div>
  );
};

export default MyAppointments;
