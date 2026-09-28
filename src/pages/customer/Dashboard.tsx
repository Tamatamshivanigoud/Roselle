import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle, CreditCard, Bell, ArrowRight, Clock, Star } from 'lucide-react';
import { Card, Badge } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { mockAppointments, mockNotifications } from '@/data/mockData';

const statCards = [
  { icon: Calendar, label: 'Upcoming', value: '2', color: '#C9A227', bg: '#C9A22715' },
  { icon: CheckCircle, label: 'Completed', value: '10', color: '#22C55E', bg: '#22C55E15' },
  { icon: CreditCard, label: 'Total Spent', value: '₹45,600', color: '#8B5CF6', bg: '#8B5CF615' },
  { icon: Star, label: 'Loyalty Points', value: '456', color: '#E6B8AF', bg: '#E6B8AF20' },
];

const statusColors: Record<string, string> = {
  upcoming: 'blue',
  completed: 'green',
  cancelled: 'red',
  'in-progress': 'gold',
};

const CustomerDashboard: React.FC = () => {
  const upcoming = mockAppointments.filter(a => a.status === 'upcoming').slice(0, 2);
  const recent = mockAppointments.filter(a => a.status === 'completed').slice(0, 2);
  const unreadNotifications = mockNotifications.filter(n => !n.read);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl luxury-gradient p-6 md:p-8"
      >
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#C9A227]/10 blur-3xl" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-[#C9A227] text-sm font-medium mb-1">Good morning,</p>
            <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              Sneha Gupta ✨
            </h2>
            <p className="text-gray-300 text-sm">You have {upcoming.length} upcoming appointments</p>
          </div>
          <Link to="/customer/book">
            <Button variant="primary" size="md" icon={<Calendar className="w-4 h-4" />}>
              Book Appointment
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: stat.bg }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
              </div>
              <p className="text-2xl font-bold text-[#1F2937] mb-0.5">{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-[#1F2937]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Upcoming Appointments
              </h3>
              <Link to="/customer/appointments">
                <button className="text-xs text-[#C9A227] hover:underline flex items-center gap-1">
                  View all <ArrowRight className="w-3 h-3" />
                </button>
              </Link>
            </div>
            {upcoming.length > 0 ? (
              <div className="space-y-3">
                {upcoming.map(apt => (
                  <div key={apt.id} className="flex items-center gap-4 p-4 bg-[#FAF8F5] rounded-xl border border-gray-100">
                    <div className="w-12 h-12 rounded-xl bg-[#C9A227]/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-[#C9A227]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-[#1F2937] truncate">{apt.serviceName}</p>
                      <p className="text-xs text-gray-400">with {apt.beauticianName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{apt.date} • {apt.time}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-sm text-[#C9A227]">₹{apt.totalPrice.toLocaleString()}</p>
                      <Badge variant={statusColors[apt.status] as any} className="mt-1">{apt.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Calendar className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No upcoming appointments</p>
              </div>
            )}
          </Card>
        </div>

        {/* Notifications */}
        <div>
          <Card className="p-5 h-full">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-[#1F2937]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Notifications
              </h3>
              <Badge variant="gold">{unreadNotifications.length} new</Badge>
            </div>
            <div className="space-y-3">
              {mockNotifications.slice(0, 4).map(notif => (
                <div
                  key={notif.id}
                  className={`p-3 rounded-xl text-sm transition-colors ${!notif.read ? 'bg-[#C9A227]/5 border border-[#C9A227]/15' : 'bg-gray-50'}`}
                >
                  <div className="flex items-start gap-2">
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-[#C9A227] mt-1.5 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#1F2937] text-xs">{notif.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5 line-clamp-2">{notif.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/customer/notifications">
              <Button variant="ghost" size="sm" className="w-full mt-4">View All Notifications</Button>
            </Link>
          </Card>
        </div>
      </div>

      {/* Recent Completed */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-[#1F2937]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Recent Services
          </h3>
          <Link to="/customer/appointments">
            <button className="text-xs text-[#C9A227] hover:underline flex items-center gap-1">
              View history <ArrowRight className="w-3 h-3" />
            </button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 px-3 text-xs text-gray-400 font-medium">Service</th>
                <th className="text-left py-2 px-3 text-xs text-gray-400 font-medium">Artist</th>
                <th className="text-left py-2 px-3 text-xs text-gray-400 font-medium">Date</th>
                <th className="text-right py-2 px-3 text-xs text-gray-400 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {mockAppointments.filter(a => a.status === 'completed').map(apt => (
                <tr key={apt.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-3 font-medium text-[#1F2937]">{apt.serviceName}</td>
                  <td className="py-3 px-3 text-gray-500">{apt.beauticianName}</td>
                  <td className="py-3 px-3 text-gray-500">{apt.date}</td>
                  <td className="py-3 px-3 text-right font-bold text-[#C9A227]">₹{apt.totalPrice.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default CustomerDashboard;
