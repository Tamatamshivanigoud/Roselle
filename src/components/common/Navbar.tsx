import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Bell, User } from 'lucide-react';
import { useScroll } from '@/hooks';
import { Button } from '@/components/ui/Button';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollY = useScroll();
  const location = useLocation();
  const scrolled = scrollY > 40;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-100'
            : 'bg-gray-900/80 backdrop-blur-md'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 xl:px-10">
          <div className="flex items-center justify-between h-20">

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C9A227] to-[#E6B8AF] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Sparkles className="w-4.5 h-4.5 text-white" size={18} />
              </div>
              <div>
                <p
                  className={`font-bold text-lg leading-tight transition-colors ${
                    scrolled ? 'text-[#1F2937]' : 'text-white'
                  }`}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  LUMINA
                </p>
                <p className="text-[9px] tracking-[0.35em] text-[#C9A227] uppercase font-bold -mt-0.5">
                  Beauty Lounge
                </p>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-7">
              {navItems.map(item => {
                const active = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`text-sm font-medium relative group transition-colors duration-200 ${
                      active
                        ? 'text-[#C9A227]'
                        : scrolled
                          ? 'text-[#374151] hover:text-[#C9A227]'
                          : 'text-white/90 hover:text-[#C9A227]'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-[#C9A227] rounded-full transition-all duration-300 ${
                        active ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* ── CTA ── */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to="/login">
                <button
                  className={`text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 ${
                    scrolled
                      ? 'text-[#374151] hover:text-[#C9A227]'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  Login
                </button>
              </Link>
              <Link to="/book">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 bg-[#C9A227] hover:bg-[#A8851E] text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg shadow-[#C9A227]/30 transition-all duration-200"
                >
                  <Sparkles size={15} />
                  Book Now
                </motion.button>
              </Link>
            </div>

            {/* ── Mobile Toggle ── */}
            <button
              className={`lg:hidden p-2 rounded-xl transition-colors ${
                scrolled ? 'text-[#1F2937] hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 shadow-2xl flex flex-col lg:hidden"
            >
              {/* drawer header */}
              <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A227] to-[#E6B8AF] flex items-center justify-center">
                    <Sparkles size={15} className="text-white" />
                  </div>
                  <span className="font-bold text-[#1F2937]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    LUMINA
                  </span>
                </div>
                <button onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-gray-600 p-1">
                  <X size={20} />
                </button>
              </div>

              {/* nav links */}
              <nav className="flex-1 px-4 py-4 space-y-1">
                {navItems.map(item => {
                  const active = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                        active
                          ? 'bg-[#C9A227]/10 text-[#C9A227] border border-[#C9A227]/20'
                          : 'text-[#374151] hover:bg-gray-50 hover:text-[#C9A227]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* drawer footer */}
              <div className="p-4 space-y-3 border-t border-gray-100">
                <Link to="/login" onClick={() => setMenuOpen(false)} className="block">
                  <button className="w-full border-2 border-[#C9A227] text-[#C9A227] text-sm font-semibold py-3 rounded-full hover:bg-[#C9A227] hover:text-white transition-all">
                    Login
                  </button>
                </Link>
                <Link to="/book" onClick={() => setMenuOpen(false)} className="block">
                  <button className="w-full bg-[#C9A227] text-white text-sm font-semibold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#A8851E] transition-all shadow-lg">
                    <Sparkles size={15} /> Book Appointment
                  </button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// ─── Dashboard Header ─────────────────────────────────────────────────────────
interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  onMenuToggle: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle, onMenuToggle }) => {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden text-gray-400 hover:text-[#C9A227] transition-colors p-1.5 rounded-lg hover:bg-gray-50"
        >
          <Menu size={22} />
        </button>
        <div>
          <h1
            className="text-xl font-bold text-[#1F2937]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {title}
          </h1>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 text-gray-400 hover:text-[#C9A227] transition-colors rounded-xl hover:bg-gray-50">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C9A227] rounded-full ring-2 ring-white" />
        </button>
        <Link to="/customer/profile">
          <div className="w-9 h-9 bg-gradient-to-br from-[#C9A227] to-[#E6B8AF] rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-md">
            <User size={17} className="text-white" />
          </div>
        </Link>
      </div>
    </header>
  );
};
