import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Mail, Lock, Camera, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Card } from '@/components/ui/index';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const CustomerProfile: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: 'Sneha',
      lastName: 'Gupta',
      email: 'sneha.gupta@email.com',
      phone: '+91 98765 43210',
    }
  });

  const onSubmit = async () => {
    await new Promise(r => setTimeout(r, 800));
    setEditMode(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-700 flex items-center gap-2"
        >
          ✅ Profile updated successfully!
        </motion.div>
      )}

      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C9A227] to-[#E6B8AF] flex items-center justify-center text-white text-2xl font-bold">
              SG
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#C9A227] rounded-full flex items-center justify-center shadow-lg">
              <Camera className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1F2937]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Sneha Gupta
            </h2>
            <p className="text-gray-400 text-sm">Member since March 2025</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs bg-[#C9A227]/10 text-[#A8851E] px-2.5 py-1 rounded-full font-medium">
                ⭐ 456 Loyalty Points
              </span>
              <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">
                Gold Member
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Personal Info */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-[#1F2937]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Personal Information
          </h3>
          <Button
            variant={editMode ? 'ghost' : 'outline'}
            size="sm"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              id="firstName"
              label="First Name"
              icon={<User className="w-4 h-4" />}
              disabled={!editMode}
              {...register('firstName')}
            />
            <Input
              id="lastName"
              label="Last Name"
              disabled={!editMode}
              {...register('lastName')}
            />
          </div>
          <Input
            id="profile-email"
            label="Email Address"
            type="email"
            icon={<Mail className="w-4 h-4" />}
            disabled={!editMode}
            {...register('email')}
          />
          <Input
            id="profile-phone"
            label="Phone Number"
            icon={<Phone className="w-4 h-4" />}
            disabled={!editMode}
            {...register('phone')}
          />

          {editMode && (
            <Button type="submit" variant="primary" size="md" icon={<Save className="w-4 h-4" />} className="w-full">
              Save Changes
            </Button>
          )}
        </form>
      </Card>

      {/* Change Password */}
      <Card className="p-6">
        <h3 className="font-bold text-[#1F2937] mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
          Change Password
        </h3>
        <div className="space-y-4">
          <Input id="current-password" label="Current Password" type="password" icon={<Lock className="w-4 h-4" />} />
          <Input id="new-password" label="New Password" type="password" icon={<Lock className="w-4 h-4" />} />
          <Input id="confirm-new-password" label="Confirm New Password" type="password" icon={<Lock className="w-4 h-4" />} />
          <Button variant="primary" size="md">Update Password</Button>
        </div>
      </Card>

      {/* Stats */}
      <Card className="p-6">
        <h3 className="font-bold text-[#1F2937] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Your Statistics
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { value: '12', label: 'Total Visits' },
            { value: '₹45,600', label: 'Total Spent' },
            { value: '456', label: 'Points Earned' },
          ].map(stat => (
            <div key={stat.label} className="p-4 bg-[#FAF8F5] rounded-xl">
              <p className="text-xl font-bold text-[#C9A227]">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CustomerProfile;
