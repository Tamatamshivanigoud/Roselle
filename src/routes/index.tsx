import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PageLoader } from '@/components/ui/index';

// Layouts
import { PublicLayout } from '@/layouts/PublicLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { CustomerLayout } from '@/layouts/CustomerLayout';

// ─── Lazy load all pages ──────────────────────────────────────────────────────
// Public
const HomePage = lazy(() => import('@/pages/public/HomePage'));
const AboutPage = lazy(() => import('@/pages/public/AboutPage'));
const ServicesPage = lazy(() => import('@/pages/public/ServicesPage'));
const GalleryPage = lazy(() => import('@/pages/public/GalleryPage'));
const PricingPage = lazy(() => import('@/pages/public/PricingPage'));
const ContactPage = lazy(() => import('@/pages/public/ContactPage'));

// Auth
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const ForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword'));

// Customer
const CustomerDashboard = lazy(() => import('@/pages/customer/Dashboard'));
const BookAppointment = lazy(() => import('@/pages/customer/BookAppointment'));
const MyAppointments = lazy(() => import('@/pages/customer/MyAppointments'));
const CustomerProfile = lazy(() => import('@/pages/customer/Profile'));
const Notifications = lazy(() => import('@/pages/customer/Notifications'));
const CustomerReviews = lazy(() => import('@/pages/customer/Reviews'));

// Admin
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
const AdminAppointments = lazy(() => import('@/pages/admin/Appointments'));
const AdminCustomers = lazy(() => import('@/pages/admin/Customers'));
const AdminStaff = lazy(() => import('@/pages/admin/Staff'));
const AdminServices = lazy(() => import('@/pages/admin/Services'));
const AdminGallery = lazy(() => import('@/pages/admin/Gallery'));
const AdminPayments = lazy(() => import('@/pages/admin/Payments'));
const AdminReviews = lazy(() => import('@/pages/admin/Reviews'));
const AdminSettings = lazy(() => import('@/pages/admin/Settings'));

// ─── APP ROUTER ───────────────────────────────────────────────────────────────
const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Customer Routes */}
          <Route path="/customer" element={<CustomerLayout />}>
            <Route index element={<CustomerDashboard />} />
            <Route path="book" element={<BookAppointment />} />
            <Route path="appointments" element={<MyAppointments />} />
            <Route path="profile" element={<CustomerProfile />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="reviews" element={<CustomerReviews />} />
          </Route>

          {/* Shorthand book route */}
          <Route path="/book" element={<CustomerLayout />}>
            <Route index element={<BookAppointment />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="staff" element={<AdminStaff />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
