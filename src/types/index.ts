// Types for the entire application

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  price: number;
  duration: number; // in minutes
  image: string;
  rating: number;
  reviewCount: number;
  popular?: boolean;
}

export type ServiceCategory =
  | 'Hair Care'
  | 'Skin Care'
  | 'Makeup'
  | 'Spa'
  | 'Nail Care'
  | 'Bridal';

export interface Beautician {
  id: string;
  name: string;
  role: string;
  specialization: string[];
  experience: number;
  image: string;
  rating: number;
  reviewCount: number;
  bio: string;
  available: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  customerId: string;
  customerName: string;
  serviceId: string;
  serviceName: string;
  beauticianId: string;
  beauticianName: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  totalPrice: number;
  notes?: string;
  createdAt: string;
}

export type AppointmentStatus = 'upcoming' | 'completed' | 'cancelled' | 'in-progress';

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  joinedDate: string;
  totalAppointments: number;
  totalSpent: number;
  loyaltyPoints: number;
}

export interface Review {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar?: string;
  serviceId: string;
  serviceName: string;
  rating: number;
  comment: string;
  date: string;
  approved: boolean;
  reply?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  category: string;
  title: string;
  description?: string;
  beforeAfter?: boolean;
}

export interface PricingPackage {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  duration: string;
  features: string[];
  popular?: boolean;
  color?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'appointment' | 'payment' | 'reminder' | 'promotion';
  read: boolean;
  date: string;
}

export interface DashboardStats {
  totalCustomers: number;
  totalAppointments: number;
  totalRevenue: number;
  avgRating: number;
  newCustomersThisMonth: number;
  appointmentsToday: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'admin' | 'customer' | 'staff';
  avatar?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
