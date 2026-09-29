import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeading, StarRating, Card, Badge } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { useServices } from '@/hooks/useServices';
import type { ServiceCategory } from '@/types';

const categories: ServiceCategory[] = ['Hair Care', 'Skin Care', 'Makeup', 'Spa', 'Nail Care', 'Bridal'];

const ServicesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { services, loading, error } = useServices();

  if (loading) return <div className="py-32 text-center">Loading services...</div>;
  if (error) return <div className="py-32 text-center text-red-500">Error loading services</div>;

  const filtered = services.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 luxury-gradient relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="h-px w-8 bg-[#C9A227]" />
              <span className="text-[#C9A227] font-semibold text-sm tracking-widest uppercase">Our Services</span>
              <div className="h-px w-8 bg-[#C9A227]" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Premium Beauty Services
            </h1>
            <p className="text-gray-300 text-lg max-w-xl mx-auto">
              Explore our full range of luxury treatments, each crafted for your unique beauty journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white sticky top-20 z-20 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-[#C9A227] transition-colors"
              />
            </div>
            {/* Category filters */}
            <div className="flex items-center gap-2 flex-wrap">
              {['All', ...categories].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${activeCategory === cat
                      ? 'bg-[#C9A227] text-white shadow-md shadow-[#C9A227]/25'
                      : 'bg-gray-100 text-gray-600 hover:bg-[#C9A227]/10 hover:text-[#C9A227]'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Grid */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-500 text-sm">{filtered.length} services found</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6 }}
              >
                <Card className="overflow-hidden h-full flex flex-col group" hover>
                  <div className="relative overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {service.popular && (
                      <Badge variant="gold" className="absolute top-3 left-3">⭐ Popular</Badge>
                    )}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#C9A227] text-sm font-bold px-2.5 py-1 rounded-lg">
                      ₹{service.price.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <Badge variant="rose" className="self-start mb-2">{service.category}</Badge>
                    <h3 className="font-bold text-[#1F2937] text-sm mb-1">{service.name}</h3>
                    <p className="text-gray-400 text-xs line-clamp-2 flex-1 mb-3">{service.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <StarRating rating={service.rating} size={12} />
                        <span className="text-xs text-gray-400">({service.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        {service.duration} min
                      </div>
                    </div>
                    <Link to="/book">
                      <Button variant="primary" size="sm" className="w-full">Book Now</Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <h3 className="text-xl font-semibold text-gray-500">No services found</h3>
              <p className="text-gray-400 mt-2">Try a different search or category</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
