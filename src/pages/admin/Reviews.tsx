import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Check, X, MessageCircle, ThumbsUp } from 'lucide-react';
import { Card, StarRating } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { mockReviews } from '@/data/mockData';

const AdminReviews: React.FC = () => {
  const [reviews, setReviews] = useState(mockReviews);
  const avgRating = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;

  const approve = (id: string) => setReviews(prev => prev.map(r => r.id === id ? { ...r, approved: true } : r));

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-[#1F2937]" style={{ fontFamily: "'Playfair Display', serif" }}>Reviews Management</h2>
        <p className="text-gray-400 text-sm">Moderate and respond to client reviews</p>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Reviews', value: reviews.length },
          { label: 'Avg Rating', value: `${avgRating.toFixed(1)} ★` },
          { label: 'Approved', value: reviews.filter(r => r.approved).length },
          { label: 'Pending', value: reviews.filter(r => !r.approved).length },
        ].map((s, i) => (
          <Card key={s.label} className="p-4 text-center">
            <p className="text-2xl font-bold text-[#C9A227]">{s.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {reviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Card className={`p-5 border-l-4 ${review.approved ? 'border-l-green-400' : 'border-l-amber-400'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  {review.customerAvatar ? (
                    <img src={review.customerAvatar} alt={review.customerName} className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#C9A227] to-[#E6B8AF] flex items-center justify-center text-white font-bold flex-shrink-0">
                      {review.customerName[0]}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm text-[#1F2937]">{review.customerName}</p>
                      <span className="text-xs text-gray-300">•</span>
                      <p className="text-xs text-gray-400">{review.serviceName}</p>
                      <span className="text-xs text-gray-300">•</span>
                      <p className="text-xs text-gray-400">{review.date}</p>
                    </div>
                    <StarRating rating={review.rating} size={13} />
                    <p className="text-gray-500 text-sm mt-2 leading-relaxed">{review.comment}</p>
                    {review.reply && (
                      <div className="mt-3 p-3 bg-[#C9A227]/5 rounded-xl border border-[#C9A227]/15">
                        <p className="text-xs font-semibold text-[#C9A227] mb-1">Lumina's Reply:</p>
                        <p className="text-xs text-gray-500">{review.reply}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${review.approved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {review.approved ? 'Approved' : 'Pending'}
                  </span>
                  <div className="flex gap-1">
                    {!review.approved && (
                      <button
                        onClick={() => approve(review.id)}
                        className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                        title="Approve"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors" title="Reply">
                      <MessageCircle className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 bg-red-100 text-red-500 rounded-lg hover:bg-red-200 transition-colors" title="Delete">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminReviews;
