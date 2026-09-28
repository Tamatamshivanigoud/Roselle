import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Card, Badge, StarRating } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { mockServices } from '@/data/mockData';

const AdminServices: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = mockServices.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#1F2937]" style={{ fontFamily: "'Playfair Display', serif" }}>Services Management</h2>
          <p className="text-gray-400 text-sm">Manage all beauty services</p>
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>Add Service</Button>
      </div>

      <Card className="p-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A227]"
          />
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Service', 'Category', 'Duration', 'Price', 'Rating', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-400 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((service, i) => (
                <motion.tr
                  key={service.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={service.image} alt={service.name} className="w-10 h-10 rounded-xl object-cover" />
                      <span className="font-medium text-[#1F2937]">{service.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="gold">{service.category}</Badge>
                  </td>
                  <td className="py-3 px-4 text-gray-400">{service.duration} min</td>
                  <td className="py-3 px-4 font-bold text-[#C9A227]">₹{service.price.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <StarRating rating={service.rating} size={11} />
                      <span className="text-xs text-gray-400 ml-1">{service.rating}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {service.popular
                      ? <Badge variant="green">Popular</Badge>
                      : <Badge variant="gray">Active</Badge>
                    }
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" icon={<Edit className="w-3.5 h-3.5" />}>Edit</Button>
                      <Button variant="danger" size="sm" icon={<Trash2 className="w-3.5 h-3.5" />}>Delete</Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminServices;
