import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { SectionHeading, StarRating, Card } from '@/components/ui/index';
import { mockBeauticians } from '@/data/mockData';

const values = [
  { icon: '💎', title: 'Excellence', desc: 'We pursue the highest standards in every treatment and interaction.' },
  { icon: '💕', title: 'Care', desc: 'Your comfort, safety, and satisfaction are our top priorities.' },
  { icon: '✨', title: 'Innovation', desc: 'We stay ahead with the latest beauty trends and techniques.' },
  { icon: '🌿', title: 'Integrity', desc: 'Honest advice, transparent pricing, and authentic products always.' },
];

const achievements = [
  { value: '12+', label: 'Years of Excellence' },
  { value: '1200+', label: 'Happy Clients' },
  { value: '50+', label: 'Beauty Services' },
  { value: '4.9★', label: 'Average Rating' },
];

const AboutPage: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden luxury-gradient">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920&q=80"
            alt="About Lumina"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="h-px w-8 bg-[#C9A227]" />
              <span className="text-[#C9A227] font-semibold text-sm tracking-widest uppercase">About Us</span>
              <div className="h-px w-8 bg-[#C9A227]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Story of Beauty
            </h1>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
              Born from a passion for elegance and a commitment to excellence, Lumina Beauty Lounge is where art meets beauty.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <SectionHeading
                eyebrow="Our Beginning"
                title="A Dream Born From Passion"
                subtitle="Founded in 2014 by beauty visionary Priya Sharma, Lumina was created with a singular mission: to redefine the beauty salon experience and make luxury accessible, personal, and transformative."
              />
              <p className="text-gray-500 mt-6 leading-relaxed">
                What started as a small boutique salon in Mumbai has grown into one of India's most beloved luxury beauty destinations, serving over 1,200 clients and hosting a team of internationally certified beauty artisans.
              </p>
              <p className="text-gray-500 mt-4 leading-relaxed">
                Every detail at Lumina — from our curated product selection to our bespoke treatment protocols — reflects our unwavering commitment to beauty, wellness, and the confidence that comes with feeling your absolute best.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80"
                  alt="Our story"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A227] to-[#E6B8AF] flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-[#1F2937]">Est. 2014</p>
                      <p className="text-xs text-gray-400">12 Years of Elegance</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Our Vision',
                text: 'To be India\'s most trusted luxury beauty destination — where every woman walks out feeling confident, beautiful, and empowered.',
              },
              {
                icon: '💡',
                title: 'Our Mission',
                text: 'To deliver transformative beauty experiences through certified expertise, premium products, and personalized care that celebrates each client\'s unique beauty.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className="p-8 h-full" hover>
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-[#1F2937] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">{item.text}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionHeading eyebrow="What Drives Us" title="Our Core Values" center />
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <Card className="p-6 text-center h-full" hover>
                  <div className="text-4xl mb-4">{v.icon}</div>
                  <h3 className="font-bold text-[#1F2937] mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 luxury-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {achievements.map((a, i) => (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-4xl font-bold text-[#C9A227] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {a.value}
                </p>
                <p className="text-gray-300 text-sm">{a.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionHeading eyebrow="Our Experts" title="Meet the Lumina Team" center />
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-12">
            {mockBeauticians.map((artist, i) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <Card className="overflow-hidden text-center group" hover>
                  <div className="relative overflow-hidden">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    {artist.available && (
                      <div className="absolute bottom-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                        Available
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[#1F2937] text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {artist.name}
                    </h3>
                    <p className="text-[#C9A227] text-xs font-medium mb-1">{artist.role}</p>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <StarRating rating={artist.rating} size={11} />
                    </div>
                    <p className="text-gray-400 text-xs">{artist.experience} yrs exp.</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
