import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Calendar, Users, Scissors, Settings,
  Image, Star, CreditCard, BarChart3, ChevronLeft, ChevronRight,
  LogOut, Sparkles, UserCog, Tags
} from 'lucide-react';
import { DashboardHeader } from '@/components/common/Navbar';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Calendar, label: 'Appointments', href: '/admin/appointments' },
  { icon: Users, label: 'Customers', href: '/admin/customers' },
  { icon: UserCog, label: 'Staff', href: '/admin/staff' },
  { icon: Scissors, label: 'Services', href: '/admin/services' },
  { icon: Tags, label: 'Categories', href: '/admin/categories' },
  { icon: Image, label: 'Gallery', href: '/admin/gallery' },
  { icon: CreditCard, label: 'Payments', href: '/admin/payments' },
  { icon: BarChart3, label: 'Reports', href: '/admin/reports' },
  { icon: Star, label: 'Reviews', href: '/admin/reviews' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/appointments': 'Appointments',
  '/admin/customers': 'Customers',
  '/admin/staff': 'Staff Management',
  '/admin/services': 'Services',
  '/admin/categories': 'Categories',
  '/admin/gallery': 'Gallery',
  '/admin/payments': 'Payments',
  '/admin/reports': 'Reports',
  '/admin/reviews': 'Reviews',
  '/admin/settings': 'Settings',
};

export const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const title = pageTitles[location.pathname] || 'Admin';

  const Sidebar = () => (
    <aside
      className={`h-full flex flex-col bg-[#111827] text-white transition-all duration-300
        ${collapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 p-4 border-b border-white/10 h-[73px] ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C9A227] to-[#E6B8AF] flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="font-bold text-sm leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>LUMINA</p>
            <p className="text-[8px] tracking-widest text-[#C9A227] uppercase">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {sidebarItems.map(({ icon: Icon, label, href }) => {
          const active = location.pathname === href;
          return (
            <Link
              key={href}
              to={href}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${active
                  ? 'bg-[#C9A227] text-white shadow-lg shadow-[#C9A227]/20'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }
                ${collapsed ? 'justify-center' : ''}
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <Link
          to="/"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Exit to Website</span>}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all ${collapsed ? 'justify-center' : 'justify-between'}`}
          aria-label="Toggle sidebar"
        >
          {!collapsed && <span>Collapse</span>}
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );

  return (
    <div className="h-screen flex overflow-hidden bg-[#F9FAFB]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-shrink-0">
        <Sidebar />
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
              <div className="w-64 h-full"><Sidebar /></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          title={title}
          subtitle="Lumina Beauty Lounge Admin"
          onMenuToggle={() => setMobileOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
