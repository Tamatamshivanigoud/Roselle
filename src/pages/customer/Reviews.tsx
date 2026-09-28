import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send } from 'lucide-react';
import { Card, StarRating } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { mockReviews } from '@/data/mockData';

const CustomerReviews: React.FC = () => {
  const [newRating, setNewRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const myReviews = mockReviews.slice(0, 2);

  const handleSubmit = async () => {
    await new Promise(r => setTimeout(r, 800));
    setSubmitted(true);
    setComment('');
    setNewRating(0);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[#1F2937]" style={{ fontFamily: "'Playfair Display', serif" }}>My Reviews</h2>

      {/* Write Review */}
      <Card className="p-6">
        <h3 className="font-bold text-[#1F2937] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Write a Review
        </h3>
        {submitted ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
            <span className="text-4xl mb-2 block">⭐</span>
            <p className="font-semibold text-[#1F2937]">Review submitted!</p>
            <p className="text-gray-400 text-sm">Thank you for your feedback.</p>
            <button onClick={() => setSubmitted(false)} className="mt-3 text-[#C9A227] text-sm hover:underline">Write another</button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-[#1F2937] mb-2">Your Rating</p>
              <StarRating rating={newRating} size={28} interactive onChange={setNewRating} />
            </div>
            <div>
              <label className="text-sm font-medium text-[#1F2937] block mb-2">Your Review</label>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows={4}
                placeholder="Share your experience..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm resize-none focus:outline-none focus:border-[#C9A227]"
              />
            </div>
            <Button
              variant="primary"
              size="md"
              icon={<Send className="w-4 h-4" />}
              disabled={!newRating || !comment}
              onClick={handleSubmit}
            >
              Submit Review
            </Button>
          </div>
        )}
      </Card>

      {/* Past reviews */}
      <div>
        <h3 className="font-bold text-[#1F2937] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>My Past Reviews</h3>
        <div className="space-y-4">
          {myReviews.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-sm text-[#1F2937]">{r.serviceName}</p>
                  <p className="text-xs text-gray-400">{r.date}</p>
                </div>
                <StarRating rating={r.rating} size={14} />
                <p className="text-gray-500 text-sm mt-2">{r.comment}</p>
                {r.reply && (
                  <div className="mt-3 p-3 bg-[#C9A227]/5 border border-[#C9A227]/15 rounded-xl">
                    <p className="text-xs font-semibold text-[#C9A227] mb-1">Lumina's Reply:</p>
                    <p className="text-xs text-gray-500">{r.reply}</p>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
