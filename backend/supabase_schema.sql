-- Drop existing services table to fix schema mismatch
DROP TABLE IF EXISTS public.services CASCADE;

-- Create Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    duration INTEGER NOT NULL, -- in minutes
    image TEXT,
    rating NUMERIC DEFAULT 0,
    "reviewCount" INTEGER DEFAULT 0,
    popular BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Appointments Table
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT, -- Can be a foreign key to auth.users if you implement auth later
    service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, confirmed, completed, cancelled
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Gallery Table
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT,
    image_url TEXT NOT NULL,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Optional: Insert some initial mock data for Services
INSERT INTO public.services (name, category, description, price, duration, image, rating, "reviewCount", popular)
VALUES
('Bridal Makeup Package', 'Makeup', 'Complete bridal makeup with HD foundation, contouring, and long-lasting formula for your special day.', 8500, 180, 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80', 4.9, 124, true),
('Keratin Hair Spa', 'Hair Care', 'Deep conditioning treatment that eliminates frizz, adds intense shine, and smooths hair cuticles.', 3500, 120, 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80', 4.8, 98, true),
('Gold Facial Treatment', 'Skin Care', '24K gold-infused facial that rejuvenates, brightens, and gives a natural glow to your skin.', 2800, 90, 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80', 4.7, 86, true);
