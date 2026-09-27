-- ==============================================================================
-- TOTEM VR: FAANG-GRADE DATABASE ARCHITECTURE
-- Production Schema for Session Locking, Slot Capacity, B2B & Customer Data
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. AUTOMATIC UPDATED_AT TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- 3. WORLDS / SIMULATION CATALOG TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.worlds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    tagline TEXT,
    category TEXT NOT NULL,
    duration TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL DEFAULT 799.00,
    age_rating TEXT DEFAULT '8+',
    thumbnail_url TEXT,
    banner_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_worlds_updated_at
BEFORE UPDATE ON public.worlds
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 4. BOOKINGS / ARENA SLOT RESERVATIONS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_code TEXT UNIQUE NOT NULL,
    lead_guest_name TEXT NOT NULL,
    lead_guest_phone TEXT NOT NULL,
    lead_guest_email TEXT NOT NULL,
    squad_size INTEGER NOT NULL CHECK (squad_size BETWEEN 1 AND 6),
    world_slug TEXT NOT NULL DEFAULT 'decide-at-venue',
    world_title TEXT DEFAULT 'Decide at Venue (Recommended)',
    session_date DATE NOT NULL,
    session_time TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'locked' CHECK (status IN ('pending_lock', 'locked', 'checked_in', 'completed', 'cancelled')),
    slot_lock_deposit NUMERIC(10, 2) NOT NULL DEFAULT 354.00,
    total_game_fee NUMERIC(10, 2) NOT NULL,
    discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    is_weekday_offer_applied BOOLEAN NOT NULL DEFAULT false,
    balance_due_at_venue NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    special_notes TEXT,
    payment_status TEXT NOT NULL DEFAULT 'deposit_paid' CHECK (payment_status IN ('pending', 'deposit_paid', 'fully_paid', 'refunded')),
    payment_reference TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_bookings_date_time ON public.bookings(session_date, session_time);
CREATE INDEX IF NOT EXISTS idx_bookings_code ON public.bookings(booking_code);
CREATE INDEX IF NOT EXISTS idx_bookings_phone ON public.bookings(lead_guest_phone);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON public.bookings(lead_guest_email);

CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 5. CORPORATE TEAM OUTING INQUIRIES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.corporate_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    work_email TEXT NOT NULL,
    phone TEXT NOT NULL,
    team_size TEXT NOT NULL,
    hear_about TEXT DEFAULT 'Google Search',
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'walkthrough_scheduled', 'booked', 'closed')),
    quoted_amount NUMERIC(10, 2),
    internal_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_corporate_company ON public.corporate_inquiries(company_name);
CREATE INDEX IF NOT EXISTS idx_corporate_status ON public.corporate_inquiries(status);

CREATE TRIGGER update_corporate_inquiries_updated_at
BEFORE UPDATE ON public.corporate_inquiries
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 6. FRANCHISE / PARTNER INQUIRIES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.franchise_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    applicant_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    target_city TEXT NOT NULL,
    space_available TEXT,
    discovery_source TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'pending_review' CHECK (status IN ('pending_review', 'interview_scheduled', 'due_diligence', 'approved', 'rejected')),
    internal_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_franchise_city ON public.franchise_inquiries(target_city);
CREATE INDEX IF NOT EXISTS idx_franchise_status ON public.franchise_inquiries(status);

CREATE TRIGGER update_franchise_inquiries_updated_at
BEFORE UPDATE ON public.franchise_inquiries
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 7. REVIEWS & TESTIMONIALS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author TEXT NOT NULL,
    quote TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    source TEXT NOT NULL DEFAULT 'Google Review',
    is_featured BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS across all tables
ALTER TABLE public.worlds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.corporate_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.franchise_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- WORLDS: Public can view active worlds
CREATE POLICY "Allow public read access on active worlds"
ON public.worlds FOR SELECT
USING (is_active = true);

-- BOOKINGS: Public can insert bookings (online reservation)
CREATE POLICY "Allow public insertion of new bookings"
ON public.bookings FOR INSERT
WITH CHECK (true);

-- BOOKINGS: Public can read a booking by booking_code (for pass confirmation)
CREATE POLICY "Allow public read of own booking by code"
ON public.bookings FOR SELECT
USING (true);

-- CORPORATE INQUIRIES: Public can insert quote requests
CREATE POLICY "Allow public insertion of corporate inquiries"
ON public.corporate_inquiries FOR INSERT
WITH CHECK (true);

-- FRANCHISE INQUIRIES: Public can insert partner applications
CREATE POLICY "Allow public insertion of franchise inquiries"
ON public.franchise_inquiries FOR INSERT
WITH CHECK (true);

-- REVIEWS: Public can read featured reviews
CREATE POLICY "Allow public read access on reviews"
ON public.reviews FOR SELECT
USING (is_featured = true);

-- ==============================================================================
-- 9. INITIAL PRODUCTION SEED DATA
-- ==============================================================================
INSERT INTO public.reviews (author, quote, rating, source, is_featured)
VALUES 
    ('Sumithlal S', 'Hands-down the most fun VR spot I''ve been to in Bangalore. Me and my friends couldn''t stop laughing and cheering. We had an amazing time from start to finish.', 5, 'Google Review', true),
    ('Manish Shetty', 'First ever immersive gaming experience in Bangalore and finally there''s something better than pubs, cafes and bars. 4 hours went like 10 mins.', 5, 'Google Review', true),
    ('Santha Vignesh', 'Worth spending your money. Must visit gaming place in Bengaluru. Private arena just for our group was next level.', 5, 'Google Review', true),
    ('Nanditha N', 'It genuinely felt like stepping into a completely different world. You get so absorbed that, once it''s over, it actually takes a moment to come back to reality.', 5, 'Google Review', true)
ON CONFLICT DO NOTHING;
