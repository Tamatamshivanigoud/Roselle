-- Drop existing tables to start fresh
DROP TABLE IF EXISTS public.appointments CASCADE;
DROP TABLE IF EXISTS public.services CASCADE;
DROP TABLE IF EXISTS public.beauticians CASCADE;
DROP TABLE IF EXISTS public.packages CASCADE;
DROP TABLE IF EXISTS public.gallery CASCADE;
DROP TABLE IF EXISTS public.testimonials CASCADE;
DROP TABLE IF EXISTS public.faqs CASCADE;

-- 1. Services
CREATE TABLE public.services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    duration INTEGER NOT NULL,
    image TEXT,
    rating NUMERIC DEFAULT 0,
    "reviewCount" INTEGER DEFAULT 0,
    popular BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Beauticians
CREATE TABLE public.beauticians (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    specialization TEXT[],
    experience INTEGER,
    image TEXT,
    rating NUMERIC,
    "reviewCount" INTEGER,
    bio TEXT,
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Packages
CREATE TABLE public.packages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    "originalPrice" NUMERIC,
    duration TEXT,
    popular BOOLEAN DEFAULT false,
    color TEXT,
    features TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Gallery
CREATE TABLE public.gallery (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT,
    image_url TEXT NOT NULL,
    category TEXT,
    "beforeAfter" BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Appointments
CREATE TABLE public.appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "customerName" TEXT,
    service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
    beautician_id UUID REFERENCES public.beauticians(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    status TEXT DEFAULT 'upcoming',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Testimonials
CREATE TABLE public.testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    avatar TEXT,
    rating NUMERIC,
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. FAQs
CREATE TABLE public.faqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    q TEXT NOT NULL,
    a TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- INSERTS

-- Insert Services
INSERT INTO public.services (name, category, description, price, duration, image, rating, "reviewCount", popular) VALUES
('Bridal Makeup Package', 'Makeup', 'Complete bridal makeup with HD foundation, contouring, and long-lasting formula for your special day.', 8500, 180, 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80', 4.9, 124, true),
('Keratin Hair Spa', 'Hair Care', 'Deep conditioning treatment that eliminates frizz, adds intense shine, and smooths hair cuticles.', 3500, 120, 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80', 4.8, 98, true),
('Gold Facial Treatment', 'Skin Care', '24K gold-infused facial that rejuvenates, brightens, and gives a natural glow to your skin.', 2800, 90, 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80', 4.7, 86, true),
('Luxury Manicure & Pedicure', 'Nail Care', 'Indulgent nail care with exfoliation, massage, and premium gel polish for lasting elegance.', 1800, 90, 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80', 4.6, 72, false);

-- Insert Beauticians
INSERT INTO public.beauticians (name, role, specialization, experience, image, rating, "reviewCount", bio, available) VALUES
('Priya Sharma', 'Senior Makeup Artist', '{"Bridal Makeup", "Party Makeup", "HD Makeup"}', 8, 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', 4.9, 214, 'Award-winning makeup artist', true),
('Ananya Kapoor', 'Hair Specialist', '{"Balayage", "Keratin Treatment", "Hair Styling"}', 6, 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80', 4.8, 168, 'Trained in Paris', true);

-- Insert Packages
INSERT INTO public.packages (name, price, "originalPrice", duration, popular, color, features) VALUES
('Silver Glow', 4999, NULL, 'Per Visit', false, NULL, '{"Basic Facial", "Blow Dry & Styling"}'),
('Gold Elegance', 9999, 13000, 'Per Visit', true, '#C9A227', '{"Gold Facial Treatment", "Keratin Hair Treatment"}');

-- Insert Gallery
INSERT INTO public.gallery (title, image_url, category) VALUES
('Bridal Glow', 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80', 'Makeup'),
('Silky Smooth', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80', 'Hair Care');

-- Insert FAQs
INSERT INTO public.faqs (q, a) VALUES
('Do I need to book an appointment in advance?', 'We recommend booking at least 24–48 hours in advance.');
