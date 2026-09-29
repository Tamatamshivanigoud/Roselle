import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionHeading, Card } from '@/components/ui/index';
import { useServices } from '@/hooks/useServices';

// Global responsive container classes
const containerClasses = "max-w-[1440px] mx-auto px-4 md:px-6 xl:px-10";

const Hero: React.FC = () => (
  <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1920&q=90"
        alt="Lumina Beauty Lounge Interior"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gray-900/60" />
    </div>
    
    <div className={`relative z-10 w-full ${containerClasses}`}>
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Desktop: Two-column layout, Mobile: Single-column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="text-left"
        >
          <h1 
            className="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[64px] font-bold text-white mb-4 lg:mb-6 leading-tight" 
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Where Beauty Meets Elegance
          </h1>
          <p className="text-[14px] sm:text-[16px] lg:text-[18px] text-gray-200 mb-6 lg:mb-8 max-w-xl">
            Experience premium beauty treatments designed to enhance your confidence and natural radiance in a relaxing, luxurious environment.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/book" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" icon={<Sparkles size={16} />} className="w-full sm:w-auto">
                Book Appointment
              </Button>
            </Link>
            <Link to="/services" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white hover:bg-white/10 px-8">
                Explore Services
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Services: React.FC = () => {
  const { services, loading, error } = useServices();
  
  // Use 4 services for 4-column desktop layout
  const featured = services.slice(0, 4);

  if (loading) return <div className="py-20 text-center">Loading services...</div>;
  if (error) return <div className="py-20 text-center text-red-500">Error loading services</div>;
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white scroll-mt-20">
      <div className={containerClasses}>
        <SectionHeading title="Our Signature Services" subtitle="Discover our most loved treatments tailored just for you." center />
        
        {/* Responsive Grid: Mobile 1, Tablet 2, Desktop 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 mt-10 lg:mt-12">
          {featured.map((svc) => (
            <Card key={svc.id} className="overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow flex flex-col h-full rounded-2xl border-0 shadow-md">
              <div className="h-48 lg:h-56 overflow-hidden shrink-0">
                <img src={svc.image} alt={svc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 lg:p-6 flex flex-col flex-1 bg-white">
                <div className="flex justify-between items-start mb-3 gap-4">
                  <h3 className="font-bold text-[18px] text-[#1F2937] leading-tight">{svc.name}</h3>
                  <span className="font-bold text-[#C9A227] shrink-0">₹{svc.price}</span>
                </div>
                <p className="text-gray-500 text-[14px] lg:text-[16px] mb-6 flex-1 line-clamp-3">{svc.description}</p>
                <Link to="/book" className="mt-auto block w-full">
                  <Button variant="outline" className="w-full">Book Now</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
        <div className="text-center mt-10 lg:mt-12">
          <Link to="/services">
            <Button variant="ghost" icon={<ArrowRight size={16} />} iconPosition="right">View All Services</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const Features: React.FC = () => (
  <section className="py-16 lg:py-20 bg-[#FAF8F5]">
    <div className={containerClasses}>
      {/* Responsive Grid: Mobile 1, Tablet 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 text-center">
        {[
          { icon: Star, title: 'Expert Stylists', text: 'Highly trained beauty professionals' },
          { icon: CheckCircle, title: 'Premium Products', text: 'Using only the finest luxury brands' },
          { icon: MapPin, title: 'Prime Location', text: 'Easily accessible in the heart of the city' }
        ].map(f => (
          <div key={f.title} className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-[#C9A227]/10 rounded-full flex items-center justify-center mb-5 text-[#C9A227]">
              <f.icon size={26} />
            </div>
            <h3 className="font-bold text-[18px] text-[#1F2937] mb-2">{f.title}</h3>
            <p className="text-gray-500 text-[14px] lg:text-[16px]">{f.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const HomePage: React.FC = () => (
  <main className="w-full overflow-hidden">
    <Hero />
    <Services />
    <Features />
  </main>
);

export default HomePage;
