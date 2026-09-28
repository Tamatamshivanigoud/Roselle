import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Phone, Mail, Clock, Globe, Share2, MessageCircle, Play } from 'lucide-react';

const footerServices = [
  'Bridal Makeup',
  'Hair Spa & Coloring',
  'Gold Facial',
  'Aromatherapy Spa',
  'Nail Art',
  'Anti-Aging Therapy',
];

const footerLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
  { label: 'Book Appointment', href: '/book' },
];

const socialLinks = [
  { icon: Globe, href: '#', label: 'Instagram' },
  { icon: Share2, href: '#', label: 'Facebook' },
  { icon: Play, href: '#', label: 'YouTube' },
  { icon: MessageCircle, href: '#', label: 'Twitter' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="luxury-gradient text-white">
      {/* Gold top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A227] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A227] to-[#E6B8AF] flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xl font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  LUMINA
                </p>
                <p className="text-[9px] tracking-[0.3em] text-[#C9A227] uppercase font-semibold -mt-0.5">
                  Beauty Lounge
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Where beauty meets elegance. Experience premium beauty treatments crafted to enhance your natural radiance and confidence.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C9A227] flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#C9A227] font-semibold text-sm tracking-widest uppercase mb-5">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {footerServices.map(service => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-gray-400 hover:text-[#C9A227] text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C9A227]/50 group-hover:bg-[#C9A227] transition-colors" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#C9A227] font-semibold text-sm tracking-widest uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.map(link => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-[#C9A227] text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C9A227]/50 group-hover:bg-[#C9A227] transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#C9A227] font-semibold text-sm tracking-widest uppercase mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C9A227] mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  42, Rose Petal Avenue,<br />
                  Bandra West, Mumbai — 400050
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C9A227] flex-shrink-0" />
                <a href="tel:+919876543210" className="text-gray-400 hover:text-[#C9A227] text-sm transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C9A227] flex-shrink-0" />
                <a href="mailto:hello@luminabeauty.in" className="text-gray-400 hover:text-[#C9A227] text-sm transition-colors">
                  hello@luminabeauty.in
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C9A227] mt-0.5 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <p>Mon – Sat: 9:00 AM – 8:00 PM</p>
                  <p>Sunday: 10:00 AM – 6:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-semibold text-lg mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Stay in the Beauty Loop ✨
              </h4>
              <p className="text-gray-400 text-sm">Subscribe for exclusive offers and beauty tips.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-400 text-sm focus:outline-none focus:border-[#C9A227] transition-colors"
              />
              <button className="px-6 py-3 bg-[#C9A227] hover:bg-[#A8851E] text-white rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © 2026 Lumina Beauty Lounge. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-[#C9A227] transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-[#C9A227] transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-[#C9A227] transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
