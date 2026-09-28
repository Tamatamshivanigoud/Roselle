import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Calendar, CalendarCheck, User, Bell, Star, LogOut, Sparkles
} from 'lucide-react';
import { DashboardHeader } from '@/components/common/Navbar';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/customer' },
  { icon: Calendar, label: 'Book Appointment', href: '/customer/book' },
  { icon: CalendarCheck, label: 'My Appointments', href: '/customer/appointments' },
  { icon: Star, label: 'Reviews', href: '/customer/reviews' },
  { icon: Bell, label: 'Notifications', href: '/customer/notifications' },
  { icon: User, label: 'My Profile', href: '/customer/profile' },
];

const pageTitles: Record<string, string> = {
  '/customer': 'My Dashboard',
  '/customer/book': 'Book Appointment',
  '/customer/appointments': 'My Appointments',
  '/customer/reviews': 'My Reviews',
  '/customer/notifications': 'Notifications',
  '/customer/profile': 'My Profile',
};

export const CustomerLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Dashboard';

  const SidebarContent = () => (
    <div className="w-64 h-full flex flex-col bg-white border-r border-gray-100">
      {/* Logo */}
      <div className="flex items-center gap-3 p-5 border-b border-gray-100 h-[73px]">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C9A227] to-[#E6B8AF] flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-bold text-sm text-[#1F2937]" style={{ fontFamily: "'Playfair Display', serif" }}>LUMINA</p>
          <p className="text-[8px] tracking-widest text-[#C9A227] uppercase">My Account</p>
        </div>
      </div>

      {/* User card */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F8E7E9]/50">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A227] to-[#E6B8AF] flex items-center justify-center text-white font-bold text-sm">
            SG
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1F2937]">Sneha Gupta</p>
            <p className="text-xs text-gray-400">Loyalty: 456 pts</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {sidebarItems.map(({ icon: Icon, label, href }) => {
          const active = location.pathname === href;
          return (
            <Link
              key={href}
              to={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${active
                  ? 'bg-[#C9A227]/10 text-[#C9A227] border border-[#C9A227]/20'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-[#C9A227]'
                }
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{label}</span>
              {href === '/customer/notifications' && (
                <span className="ml-auto text-xs bg-[#C9A227] text-white rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <Link
          to="/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex overflow-hidden bg-[#FAF8F5]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block flex-shrink-0 h-full">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed left-0 top-0 bottom-0 z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          title={title}
          subtitle="Welcome back, Sneha!"
          onMenuToggle={() => setMobileOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
