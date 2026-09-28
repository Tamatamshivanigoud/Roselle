import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { SectionHeading } from '@/components/ui/index';
import { mockGallery } from '@/data/mockData';

const categories = ['All', 'Makeup', 'Hair Care', 'Skin Care', 'Nail Care', 'Spa', 'Bridal'];

const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = activeCategory === 'All'
    ? mockGallery
    : mockGallery.filter(img => img.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 luxury-gradient relative overflow-hidden">
        <div className="relative max-w-[1440px] mx-auto px-4 md:px-6 xl:px-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="h-px w-8 bg-[#C9A227]" />
              <span className="text-[#C9A227] font-semibold text-sm tracking-widest uppercase">Gallery</span>
              <div className="h-px w-8 bg-[#C9A227]" />
            </div>
            <h1 className="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[64px] font-bold text-white mb-4 lg:mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Beautiful Work
            </h1>
            <p className="text-[14px] sm:text-[16px] lg:text-[18px] text-gray-300 max-w-xl mx-auto">
              A showcase of transformations, artistry, and elegance crafted by our expert team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-white sticky top-20 z-20 border-b shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 xl:px-10">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-[14px] font-medium transition-all
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
      </section>

      {/* Masonry Grid */}
      <section className="py-16 md:py-20 lg:py-24 bg-[#FAF8F5]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 xl:px-10">
          {/* Responsive columns: Mobile 1, Tablet 2, Desktop 4 */}
          <div className="columns-1 md:columns-2 xl:columns-4 gap-6 space-y-6">
            <AnimatePresence>
              {filtered.map((img, i) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.04 }}
                  className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden shadow-sm"
                  onClick={() => setLightbox(img.url)}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex flex-col justify-end p-4">
                    <p className="text-white text-[16px] font-semibold mb-1">{img.title}</p>
                    <p className="text-gray-300 text-[14px]">{img.category}</p>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="relative max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 text-white hover:text-[#C9A227] transition-colors"
                aria-label="Close"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={lightbox}
                alt="Gallery"
                className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryPage;
