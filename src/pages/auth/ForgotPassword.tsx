import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const schema = z.object({ email: z.string().email('Invalid email address') });
type FormData = z.infer<typeof schema>;

const ForgotPassword: React.FC = () => {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async () => {
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-8">
        <Link to="/login" className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#C9A227] mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </Link>
        <h2 className="text-3xl font-bold text-[#1F2937] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Forgot Password</h2>
        <p className="text-gray-500 text-sm">Enter your email and we'll send you a reset link.</p>
      </div>

      {!sent ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            id="forgot-email"
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            icon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            {...register('email')}
          />
          <Button type="submit" variant="primary" size="lg" loading={isSubmitting} className="w-full">
            Send Reset Link
          </Button>
        </form>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
          <div className="text-5xl mb-4">📧</div>
          <h3 className="text-xl font-bold text-[#1F2937] mb-2">Check your inbox!</h3>
          <p className="text-gray-500 text-sm">We've sent a password reset link to your email address.</p>
          <Link to="/login">
            <Button variant="outline" size="md" className="mt-6">Back to Login</Button>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ForgotPassword;
