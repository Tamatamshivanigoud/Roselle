import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Crown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeading, Card } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { mockPackages } from '@/data/mockData';
import { useServices } from '@/hooks/useServices';

const PricingPage: React.FC = () => {
  const { services: mockServices, loading, error } = useServices();

  if (loading) return <div className="py-32 text-center">Loading pricing...</div>;
  if (error) return <div className="py-32 text-center text-red-500">Error loading pricing</div>;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 luxury-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="h-px w-8 bg-[#C9A227]" />
              <span className="text-[#C9A227] font-semibold text-sm tracking-widest uppercase">Pricing</span>
              <div className="h-px w-8 bg-[#C9A227]" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Transparent Pricing
            </h1>
            <p className="text-gray-300 max-w-xl mx-auto">
              No hidden fees, no surprises — just honest, premium beauty services at clear prices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Packages" title="Luxury Packages" subtitle="Curated combinations for the ultimate Lumina experience." center />

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {mockPackages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className={`relative ${pkg.popular ? 'md:-mt-4' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-[#C9A227] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                      ✨ Most Popular
                    </span>
                  </div>
                )}
                <Card
                  className={`p-7 h-full flex flex-col border-2 transition-all duration-300
                    ${pkg.popular ? 'border-[#C9A227] shadow-2xl shadow-[#C9A227]/20' : 'border-transparent'}
                  `}
                >
                  <div className="mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${pkg.color || '#C9A227'}15` }}
                    >
                      <Crown className="w-6 h-6" style={{ color: pkg.color || '#C9A227' }} />
                    </div>
                    <h3
                      className="text-2xl font-bold text-[#1F2937] mb-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {pkg.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{pkg.duration}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-bold text-[#1F2937]">₹{pkg.price.toLocaleString()}</span>
                      {pkg.originalPrice && (
                        <span className="text-gray-400 line-through text-lg mb-1">
                          ₹{pkg.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {pkg.originalPrice && (
                      <span className="text-green-600 text-sm font-medium">
                        Save ₹{(pkg.originalPrice - pkg.price).toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 flex-1 mb-8">
                    {pkg.features.map(f => (
                      <li key={f} className="flex items-center gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${pkg.color || '#C9A227'}20` }}
                        >
                          <Check className="w-3 h-3" style={{ color: pkg.color || '#C9A227' }} />
                        </div>
                        <span className="text-sm text-gray-600">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/book">
                    <Button
                      variant={pkg.popular ? 'primary' : 'outline'}
                      size="lg"
                      className="w-full"
                    >
                      {pkg.popular ? '✨ Choose This Package' : 'Get Started'}
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Service Prices */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Individual Services" title="À La Carte Pricing" subtitle="Choose exactly what you need from our full service menu." center />

          <div className="mt-12 overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1F2937] text-white">
                  <th className="text-left px-6 py-4 text-sm font-semibold">Service</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Category</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Duration</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Rating</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold">Price</th>
                </tr>
              </thead>
              <tbody>
                {mockServices.map((service, i) => (
                  <motion.tr
                    key={service.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-gray-50 hover:bg-[#FAF8F5] transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <span className="font-semibold text-sm text-[#1F2937]">{service.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-[#C9A227]/10 text-[#A8851E] px-2.5 py-1 rounded-full font-medium">
                        {service.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{service.duration} min</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-[#C9A227] text-[#C9A227]" />
                        <span className="text-sm text-gray-600">{service.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold text-[#C9A227]">₹{service.price.toLocaleString()}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Membership */}
      <section className="py-16 luxury-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="w-16 h-16 rounded-full bg-[#C9A227]/20 border border-[#C9A227]/40 flex items-center justify-center mx-auto mb-5">
              <Sparkles className="w-8 h-8 text-[#C9A227]" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Lumina Loyalty Program
            </h2>
            <p className="text-gray-300 mb-6">
              Earn 1 point for every ₹100 spent. Redeem points for free services, exclusive discounts, and VIP privileges.
            </p>
            <Link to="/register">
              <Button variant="primary" size="lg">Join Loyalty Club — It's Free</Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default PricingPage;
