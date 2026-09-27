-- ==============================================================================
-- TOTEM VR ARENA - ADMIN RLS POLICIES FOR MANAGEMENT OPERATIONS
-- ==============================================================================

-- BOOKINGS: Allow updates (status change, notes, payment status)
CREATE POLICY "Allow public update of bookings"
ON public.bookings FOR UPDATE
USING (true)
WITH CHECK (true);

-- BOOKINGS: Allow deletion if needed (e.g. test bookings)
CREATE POLICY "Allow public delete of bookings"
ON public.bookings FOR DELETE
USING (true);

-- CORPORATE INQUIRIES: Allow updates (status change, internal notes, quoted amount)
CREATE POLICY "Allow public update of corporate inquiries"
ON public.corporate_inquiries FOR UPDATE
USING (true)
WITH CHECK (true);

-- CORPORATE INQUIRIES: Allow read access for admin dashboard
CREATE POLICY "Allow public read of corporate inquiries"
ON public.corporate_inquiries FOR SELECT
USING (true);

-- FRANCHISE INQUIRIES: Allow updates (status change, internal notes)
CREATE POLICY "Allow public update of franchise inquiries"
ON public.franchise_inquiries FOR UPDATE
USING (true)
WITH CHECK (true);

-- FRANCHISE INQUIRIES: Allow read access for admin dashboard
CREATE POLICY "Allow public read of franchise inquiries"
ON public.franchise_inquiries FOR SELECT
USING (true);
