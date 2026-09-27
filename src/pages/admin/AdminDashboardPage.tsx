import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, 
  Calendar as CalendarIcon, 
  Plus, 
  Building2, 
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { supabase, DbBooking, DbCorporateInquiry } from '../../lib/supabase';
import { AdminStatsCards } from '../../components/admin/AdminStatsCards';
import { AdminCalendarView } from '../../components/admin/AdminCalendarView';
import { BookingSlideOverDrawer } from '../../components/admin/BookingSlideOverDrawer';
import { Link } from 'react-router-dom';

const SAMPLE_BOOKINGS: DbBooking[] = [
  {
    id: 'b-001',
    booking_code: 'TOTEM-89241',
    lead_guest_name: 'Aditya Verma',
    lead_guest_phone: '+91 98450 12345',
    lead_guest_email: 'aditya.v@gmail.com',
    squad_size: 4,
    world_slug: 'station-zarya',
    world_title: 'Station Zarya (Sci-Fi Shooter)',
    session_date: new Date().toISOString().split('T')[0],
    session_time: '11:15 AM',
    status: 'locked',
    slot_lock_deposit: 354,
    total_game_fee: 7996,
    discount_amount: 0,
    is_weekday_offer_applied: false,
    balance_due_at_venue: 7642,
    special_notes: 'Arena 1 · Celebrating team milestone, first time in VR.',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'b-002',
    booking_code: 'TOTEM-74190',
    lead_guest_name: 'Pooja Hegde',
    lead_guest_phone: '+91 97312 88201',
    lead_guest_email: 'pooja.h@yahoo.com',
    squad_size: 5,
    world_slug: 'shikari',
    world_title: 'Shikari (Mythic Survival)',
    session_date: new Date().toISOString().split('T')[0],
    session_time: '04:15 PM',
    status: 'checked_in',
    slot_lock_deposit: 354,
    total_game_fee: 7996,
    discount_amount: 1999,
    is_weekday_offer_applied: true,
    balance_due_at_venue: 5997,
    special_notes: 'Arena 2 · Applied Tuesday Weekday Offer: 1 Player Free',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'b-003',
    booking_code: 'TOTEM-63218',
    lead_guest_name: 'Karan Mehra',
    lead_guest_phone: '+91 99001 54321',
    lead_guest_email: 'karan@zerodha.com',
    squad_size: 6,
    world_slug: 'revolta',
    world_title: 'Mission Revolta (Cyberpunk Heist)',
    session_date: new Date().toISOString().split('T')[0],
    session_time: '06:45 PM',
    status: 'locked',
    slot_lock_deposit: 354,
    total_game_fee: 9995,
    discount_amount: 1999,
    is_weekday_offer_applied: true,
    balance_due_at_venue: 7996,
    special_notes: 'Arena 1 · Fintech engineering squad meetup',
    created_at: new Date(Date.now() - 3600000 * 9).toISOString(),
  },
  {
    id: 'b-004',
    booking_code: 'TOTEM-51209',
    lead_guest_name: 'Sneha Rao',
    lead_guest_phone: '+91 98860 33412',
    lead_guest_email: 'sneha.rao@gmail.com',
    squad_size: 2,
    world_slug: 'lost-sanctuary',
    world_title: 'Lost Sanctuary (VR Escape)',
    session_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    session_time: '01:45 PM',
    status: 'locked',
    slot_lock_deposit: 354,
    total_game_fee: 3998,
    discount_amount: 0,
    is_weekday_offer_applied: false,
    balance_due_at_venue: 3644,
    special_notes: 'Arena 2',
    created_at: new Date(Date.now() - 3600000 * 14).toISOString(),
  },
];

export const AdminDashboardPage: React.FC = () => {
  const [bookings, setBookings] = useState<DbBooking[]>(SAMPLE_BOOKINGS);
  const [corporateLeads, setCorporateLeads] = useState<DbCorporateInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<DbBooking | null>(null);
  const [slotInitDate, setSlotInitDate] = useState<string | undefined>();
  const [slotInitTime, setSlotInitTime] = useState<string | undefined>();
  const [slotInitArena, setSlotInitArena] = useState<string | undefined>();

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: bData, error: bErr } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (!bErr && bData && bData.length > 0) {
        setBookings(bData);
      } else {
        setBookings(SAMPLE_BOOKINGS);
      }

      const { data: cData, error: cErr } = await supabase
        .from('corporate_inquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (!cErr && cData) {
        setCorporateLeads(cData);
      }
    } catch (err) {
      console.warn('Sync notice:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectBooking = (b: DbBooking) => {
    setSelectedBooking(b);
    setDrawerOpen(true);
  };

  const handleNewBookingAtSlot = (date: string, time: string, arena: string) => {
    setSelectedBooking(null);
    setSlotInitDate(date);
    setSlotInitTime(time);
    setSlotInitArena(arena);
    setDrawerOpen(true);
  };

  const handleBookingSaved = (saved: DbBooking) => {
    setBookings((prev) => {
      const exists = prev.some((b) => b.booking_code === saved.booking_code);
      if (exists) {
        return prev.map((b) => (b.booking_code === saved.booking_code ? saved : b));
      }
      return [saved, ...prev];
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-black tracking-tight">
            Arena Facility &amp; Court Schedule
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time session timeline, court utilization, and automated WhatsApp guest passes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-black' : ''}`} />
            <span>Sync Cloud</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Ribbon */}
      <AdminStatsCards bookings={bookings} corporateCount={corporateLeads.length} />

      {/* Quixera-Grade Interactive Arena Calendar */}
      <AdminCalendarView
        bookings={bookings}
        onSelectBooking={handleSelectBooking}
        onNewBookingAtSlot={handleNewBookingAtSlot}
      />

      {/* Slide-over Drawer for Viewing / Creating Bookings */}
      <BookingSlideOverDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        booking={selectedBooking}
        initialDate={slotInitDate}
        initialTime={slotInitTime}
        initialArena={slotInitArena}
        onSave={handleBookingSaved}
      />
    </div>
  );
};
