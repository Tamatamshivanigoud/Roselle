import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Trash2, Plus } from 'lucide-react';
import { Card } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { mockGallery } from '@/data/mockData';

const AdminGallery: React.FC = () => {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#1F2937]" style={{ fontFamily: "'Playfair Display', serif" }}>Gallery Management</h2>
          <p className="text-gray-400 text-sm">Manage your salon's gallery images</p>
        </div>
        <Button variant="primary" size="sm" icon={<Upload className="w-4 h-4" />}>Upload Images</Button>
      </div>

      {/* Upload area */}
      <Card className="p-8 border-2 border-dashed border-[#C9A227]/30 text-center hover:border-[#C9A227] transition-colors cursor-pointer">
        <Upload className="w-10 h-10 text-[#C9A227]/50 mx-auto mb-3" />
        <p className="text-sm font-medium text-gray-500">Drag & drop images here or <span className="text-[#C9A227]">browse files</span></p>
        <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
      </Card>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {mockGallery.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="relative group rounded-xl overflow-hidden"
          >
            <img src={img.url} alt={img.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors" title="Delete">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
              <p className="text-white text-xs font-medium truncate">{img.title}</p>
              <p className="text-gray-300 text-[10px]">{img.category}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;
