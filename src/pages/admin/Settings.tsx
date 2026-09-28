import React from 'react';
import { Card } from '@/components/ui/index';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Save, Clock, Globe } from 'lucide-react';

const businessHours = [
  { day: 'Monday', open: '09:00', close: '20:00', active: true },
  { day: 'Tuesday', open: '09:00', close: '20:00', active: true },
  { day: 'Wednesday', open: '09:00', close: '20:00', active: true },
  { day: 'Thursday', open: '09:00', close: '20:00', active: true },
  { day: 'Friday', open: '09:00', close: '20:00', active: true },
  { day: 'Saturday', open: '08:00', close: '21:00', active: true },
  { day: 'Sunday', open: '10:00', close: '18:00', active: true },
];

const AdminSettings: React.FC = () => {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#1F2937]" style={{ fontFamily: "'Playfair Display', serif" }}>Settings</h2>
        <p className="text-gray-400 text-sm">Manage your salon settings and preferences</p>
      </div>

      {/* Salon Details */}
      <Card className="p-6">
        <h3 className="font-bold text-[#1F2937] mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Salon Information</h3>
        <div className="space-y-4">
          <Input id="salon-name" label="Salon Name" defaultValue="Lumina Beauty Lounge" />
          <Input id="salon-tagline" label="Tagline" defaultValue="Where Beauty Meets Elegance" />
          <Input id="salon-phone" label="Phone Number" defaultValue="+91 98765 43210" />
          <Input id="salon-email" label="Email Address" type="email" defaultValue="hello@luminabeauty.in" />
          <Textarea id="salon-address" label="Address" defaultValue="42, Rose Petal Avenue, Bandra West, Mumbai — 400050" rows={3} />
          <Button variant="primary" size="md" icon={<Save className="w-4 h-4" />}>Save Details</Button>
        </div>
      </Card>

      {/* Business Hours */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <Clock className="w-5 h-5 text-[#C9A227]" />
          <h3 className="font-bold text-[#1F2937]" style={{ fontFamily: "'Playfair Display', serif" }}>Business Hours</h3>
        </div>
        <div className="space-y-3">
          {businessHours.map(({ day, open, close, active }) => (
            <div key={day} className="flex items-center gap-4 p-3 bg-[#FAF8F5] rounded-xl">
              <div className="flex items-center gap-2 w-28">
                <input type="checkbox" defaultChecked={active} className="accent-[#C9A227]" />
                <span className="text-sm font-medium text-[#1F2937]">{day}</span>
              </div>
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="time"
                  defaultValue={open}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#C9A227]"
                />
                <span className="text-gray-400 text-sm">to</span>
                <input
                  type="time"
                  defaultValue={close}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#C9A227]"
                />
              </div>
            </div>
          ))}
        </div>
        <Button variant="primary" size="md" className="mt-4" icon={<Save className="w-4 h-4" />}>Save Hours</Button>
      </Card>

      {/* Social Media */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <Globe className="w-5 h-5 text-[#C9A227]" />
          <h3 className="font-bold text-[#1F2937]" style={{ fontFamily: "'Playfair Display', serif" }}>Social Media Links</h3>
        </div>
        <div className="space-y-4">
          <Input id="instagram" label="Instagram" placeholder="@luminabeautylounge" />
          <Input id="facebook" label="Facebook" placeholder="facebook.com/luminabeauty" />
          <Input id="youtube" label="YouTube" placeholder="youtube.com/@lumina" />
          <Button variant="primary" size="md" icon={<Save className="w-4 h-4" />}>Save Links</Button>
        </div>
      </Card>
    </div>
  );
};

export default AdminSettings;
