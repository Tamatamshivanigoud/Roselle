import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, User, Calendar, Clock, CreditCard, Sparkles } from 'lucide-react';
import { Card, StarRating } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Input';
import { mockServices, mockBeauticians, timeSlots } from '@/data/mockData';
import type { ServiceCategory } from '@/types';

const categories: ServiceCategory[] = ['Hair Care', 'Skin Care', 'Makeup', 'Spa', 'Nail Care', 'Bridal'];

const steps = ['Category', 'Service', 'Beautician', 'Date & Time', 'Confirm'];

interface BookingState {
  category: string;
  serviceId: string;
  beauticianId: string;
  date: string;
  timeSlotId: string;
  notes: string;
}

const BookAppointment: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [booking, setBooking] = useState<BookingState>({
    category: '', serviceId: '', beauticianId: '', date: '', timeSlotId: '', notes: ''
  });
  const [confirmed, setConfirmed] = useState(false);

  const selectedService = mockServices.find(s => s.id === booking.serviceId);
  const selectedBeautician = mockBeauticians.find(b => b.id === booking.beauticianId);
  const selectedSlot = timeSlots.find(t => t.id === booking.timeSlotId);
  const filteredServices = booking.category ? mockServices.filter(s => s.category === booking.category) : mockServices;

  const canNext = () => {
    if (currentStep === 0) return !!booking.category;
    if (currentStep === 1) return !!booking.serviceId;
    if (currentStep === 2) return !!booking.beauticianId;
    if (currentStep === 3) return !!booking.date && !!booking.timeSlotId;
    return true;
  };

  if (confirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-96 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Appointment Confirmed! 🎉
        </h2>
        <p className="text-gray-500 mb-2">
          Your <strong>{selectedService?.name}</strong> appointment has been booked.
        </p>
        <p className="text-gray-400 text-sm mb-6">
          {booking.date} at {selectedSlot?.time} with {selectedBeautician?.name}
        </p>
        <Button variant="primary" onClick={() => setConfirmed(false)} icon={<Calendar className="w-4 h-4" />}>
          Book Another
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1F2937] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
          Book an Appointment
        </h2>
        <p className="text-gray-400 text-sm">Choose your services and preferred time.</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-0 mb-8 overflow-x-auto pb-2">
        {steps.map((step, i) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                  ${i < currentStep ? 'bg-green-500 text-white' : i === currentStep ? 'bg-[#C9A227] text-white' : 'bg-gray-100 text-gray-400'}
                `}
              >
                {i < currentStep ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs font-medium whitespace-nowrap ${i === currentStep ? 'text-[#C9A227]' : 'text-gray-400'}`}>
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mb-4 transition-colors ${i < currentStep ? 'bg-green-400' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {/* Step 0: Category */}
          {currentStep === 0 && (
            <Card className="p-6">
              <h3 className="font-bold text-[#1F2937] mb-4">Select a Category</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setBooking({ ...booking, category: cat, serviceId: '' })}
                    className={`p-4 rounded-xl border-2 text-sm font-medium transition-all text-left
                      ${booking.category === cat
                        ? 'border-[#C9A227] bg-[#C9A227]/5 text-[#C9A227]'
                        : 'border-gray-100 hover:border-[#C9A227]/40 text-gray-600'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </Card>
          )}

          {/* Step 1: Service */}
          {currentStep === 1 && (
            <Card className="p-6">
              <h3 className="font-bold text-[#1F2937] mb-4">Select a Service</h3>
              <div className="space-y-3">
                {filteredServices.map(service => (
                  <button
                    key={service.id}
                    onClick={() => setBooking({ ...booking, serviceId: service.id })}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all
                      ${booking.serviceId === service.id
                        ? 'border-[#C9A227] bg-[#C9A227]/5'
                        : 'border-gray-100 hover:border-[#C9A227]/40'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={service.image} alt={service.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-[#1F2937]">{service.name}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <StarRating rating={service.rating} size={11} />
                          <span className="text-xs text-gray-400">• {service.duration} min</span>
                        </div>
                      </div>
                      <span className="font-bold text-[#C9A227]">₹{service.price.toLocaleString()}</span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          )}

          {/* Step 2: Beautician */}
          {currentStep === 2 && (
            <Card className="p-6">
              <h3 className="font-bold text-[#1F2937] mb-4">Choose Your Beautician</h3>
              <div className="space-y-3">
                {mockBeauticians.map(b => (
                  <button
                    key={b.id}
                    onClick={() => b.available && setBooking({ ...booking, beauticianId: b.id })}
                    disabled={!b.available}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all
                      ${booking.beauticianId === b.id ? 'border-[#C9A227] bg-[#C9A227]/5' : 'border-gray-100'}
                      ${!b.available ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#C9A227]/40'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <img src={b.image} alt={b.name} className="w-12 h-12 rounded-full object-cover object-top" />
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-[#1F2937]">{b.name}</p>
                        <p className="text-xs text-[#C9A227]">{b.role}</p>
                        <StarRating rating={b.rating} size={11} />
                      </div>
                      {!b.available && <span className="text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-full">Unavailable</span>}
                      {b.available && <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">Available</span>}
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          )}

          {/* Step 3: Date & Time */}
          {currentStep === 3 && (
            <Card className="p-6">
              <h3 className="font-bold text-[#1F2937] mb-4">Choose Date & Time</h3>
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-[#1F2937] block mb-2">Select Date</label>
                  <input
                    type="date"
                    value={booking.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setBooking({ ...booking, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A227] text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1F2937] block mb-2">Select Time Slot</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map(slot => (
                      <button
                        key={slot.id}
                        disabled={!slot.available}
                        onClick={() => slot.available && setBooking({ ...booking, timeSlotId: slot.id })}
                        className={`py-2.5 rounded-lg text-xs font-medium transition-all
                          ${booking.timeSlotId === slot.id ? 'bg-[#C9A227] text-white' : ''}
                          ${!slot.available ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : booking.timeSlotId !== slot.id ? 'bg-white border border-gray-200 text-gray-600 hover:border-[#C9A227]' : ''}
                        `}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1F2937] block mb-2">Notes (optional)</label>
                  <textarea
                    value={booking.notes}
                    onChange={e => setBooking({ ...booking, notes: e.target.value })}
                    rows={3}
                    placeholder="Any special requests or preferences..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A227] text-sm resize-none"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Step 4: Confirm */}
          {currentStep === 4 && (
            <Card className="p-6">
              <h3 className="font-bold text-[#1F2937] mb-5">Booking Summary</h3>
              <div className="space-y-4">
                {[
                  { icon: Sparkles, label: 'Service', value: selectedService?.name },
                  { icon: User, label: 'Beautician', value: selectedBeautician?.name },
                  { icon: Calendar, label: 'Date', value: booking.date },
                  { icon: Clock, label: 'Time', value: selectedSlot?.time },
                  { icon: CreditCard, label: 'Total', value: `₹${selectedService?.price.toLocaleString()}` },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3 p-3 bg-[#FAF8F5] rounded-xl">
                    <div className="w-9 h-9 rounded-lg bg-[#C9A227]/10 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-[#C9A227]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{item.label}</p>
                      <p className="font-semibold text-sm text-[#1F2937]">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          size="md"
          onClick={() => setCurrentStep(s => s - 1)}
          disabled={currentStep === 0}
        >
          Back
        </Button>
        {currentStep < 4 ? (
          <Button
            variant="primary"
            size="md"
            disabled={!canNext()}
            onClick={() => setCurrentStep(s => s + 1)}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Continue
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            icon={<CheckCircle className="w-4 h-4" />}
            onClick={() => setConfirmed(true)}
          >
            Confirm Booking
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
