import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Globe, Share2, Play } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/index';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z.string().refine(val => val === '' || val.length >= 10, { 
    message: 'Phone number must be at least 10 digits' 
  }).optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

const contactInfo = [
  { icon: MapPin, label: 'Address', value: '42, Rose Petal Avenue, Bandra West, Mumbai — 400050', href: '#' },
  { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: Mail, label: 'Email', value: 'hello@luminabeauty.in', href: 'mailto:hello@luminabeauty.in' },
];

const businessHours = [
  { day: 'Monday – Friday', hours: '9:00 AM – 8:00 PM' },
  { day: 'Saturday', hours: '8:00 AM – 9:00 PM' },
  { day: 'Sunday', hours: '10:00 AM – 6:00 PM' },
];

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await new Promise(r => setTimeout(r, 1500));
    console.log(data);
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 luxury-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="h-px w-8 bg-[#C9A227]" />
              <span className="text-[#C9A227] font-semibold text-sm tracking-widest uppercase">Contact</span>
              <div className="h-px w-8 bg-[#C9A227]" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Get in Touch
            </h1>
            <p className="text-gray-300 max-w-xl mx-auto">
              Have questions or ready to book? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left - Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact info */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-[#1F2937] mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Contact Information
                </h3>
                <div className="space-y-5">
                  {contactInfo.map(({ icon: Icon, label, value, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#C9A227]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A227] transition-all">
                        <Icon className="w-5 h-5 text-[#C9A227] group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                        <p className="text-sm font-medium text-[#1F2937] group-hover:text-[#C9A227] transition-colors">
                          {value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </Card>

              {/* Hours */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <Clock className="w-5 h-5 text-[#C9A227]" />
                  <h3 className="text-lg font-bold text-[#1F2937]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Working Hours
                  </h3>
                </div>
                <div className="space-y-3">
                  {businessHours.map(({ day, hours }) => (
                    <div key={day} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <span className="text-sm text-gray-500">{day}</span>
                      <span className="text-sm font-semibold text-[#1F2937]">{hours}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Social */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-[#1F2937] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  {[Globe, Share2, Play].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-[#C9A227] flex items-center justify-center transition-all hover:text-white text-gray-500 hover:scale-110"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right - Form */}
            <div className="lg:col-span-3">
              <Card className="p-8">
                {!submitted ? (
                  <>
                    <h3 className="text-2xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Send Us a Message
                    </h3>
                    <p className="text-gray-400 text-sm mb-6">We'll get back to you within 24 hours.</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input
                          id="name"
                          label="Full Name *"
                          placeholder="Priya Sharma"
                          error={errors.name?.message}
                          {...register('name')}
                        />
                        <Input
                          id="email"
                          label="Email Address *"
                          type="email"
                          placeholder="priya@email.com"
                          error={errors.email?.message}
                          {...register('email')}
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input
                          id="phone"
                          label="Phone Number"
                          placeholder="+91 98765 43210"
                          error={errors.phone?.message}
                          {...register('phone')}
                        />
                        <Input
                          id="subject"
                          label="Subject *"
                          placeholder="Bridal package enquiry"
                          error={errors.subject?.message}
                          {...register('subject')}
                        />
                      </div>
                      <Textarea
                        id="message"
                        label="Your Message *"
                        placeholder="Tell us how we can help you..."
                        error={errors.message?.message}
                        {...register('message')}
                      />
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        loading={isSubmitting}
                        icon={<Send className="w-4 h-4" />}
                        className="w-full"
                      >
                        Send Message
                      </Button>
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="text-6xl mb-4">💌</div>
                    <h3 className="text-2xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Message Sent!
                    </h3>
                    <p className="text-gray-500">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-[#C9A227] text-sm font-medium hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </Card>

              {/* Map placeholder */}
              <Card className="mt-6 overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-[#F8E7E9] to-[#FAF8F5] flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-10 h-10 text-[#C9A227] mx-auto mb-2" />
                    <p className="font-semibold text-[#1F2937]">Lumina Beauty Lounge</p>
                    <p className="text-sm text-gray-400">42, Rose Petal Avenue, Bandra West, Mumbai</p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block text-[#C9A227] text-sm font-medium hover:underline"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
