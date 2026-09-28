import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left - Decorative */}
      <div className="hidden lg:flex flex-1 luxury-gradient relative overflow-hidden items-center justify-center">
        {/* Background decor */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#C9A227]/10 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-[#E6B8AF]/10 blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-12">
          <Link to="/" className="flex items-center gap-3 justify-center mb-8">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C9A227] to-[#E6B8AF] flex items-center justify-center shadow-2xl pulse-gold">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <p className="text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                LUMINA
              </p>
              <p className="text-xs tracking-[0.3em] text-[#C9A227] uppercase font-semibold">
                Beauty Lounge
              </p>
            </div>
          </Link>
          <h2
            className="text-4xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Where Beauty<br />Meets Elegance
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-sm mx-auto">
            Unlock premium beauty experiences curated just for you.
          </p>

          {/* Floating image cards */}
          <div className="mt-10 grid grid-cols-2 gap-3 max-w-xs mx-auto">
            {[
              { img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200&q=80', label: 'Makeup' },
              { img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200&q=80', label: 'Skincare' },
              { img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=80', label: 'Hair Spa' },
              { img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&q=80', label: 'Wellness' },
            ].map((item, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-xl float-animation"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                <img src={item.img} alt={item.label} className="w-full h-24 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                  <span className="text-white text-xs font-semibold">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 lg:max-w-md xl:max-w-lg flex items-center justify-center p-8 bg-[#FAF8F5]">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A227] to-[#E6B8AF] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <p className="text-xl font-bold text-[#1F2937]" style={{ fontFamily: "'Playfair Display', serif" }}>
              LUMINA
            </p>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
