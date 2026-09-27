import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Download, 
  RefreshCw, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  MessageSquare, 
  Check, 
  Copy,
  Plus,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { supabase, DbBooking } from '../../lib/supabase';
import { BookingSlideOverDrawer } from '../../components/admin/BookingSlideOverDrawer';

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

export const AdminBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<DbBooking[]>(SAMPLE_BOOKINGS);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'tomorrow' | 'upcoming'>('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<DbBooking | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        setBookings(data);
      } else {
        setBookings(SAMPLE_BOOKINGS);
      }
    } catch (err) {
      console.warn('Supabase fetch notice:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const copyBookingCode = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const exportToCSV = () => {
    const headers = ['Ref Code', 'Lead Name', 'Phone', 'Email', 'Squad Size', 'Game', 'Date', 'Time', 'Deposit Paid', 'Total Fee', 'Balance Due', 'Status'];
    const rows = filteredBookings.map((b) => [
      b.booking_code,
      `"${b.lead_guest_name}"`,
      `"${b.lead_guest_phone}"`,
      `"${b.lead_guest_email}"`,
      b.squad_size,
      `"${b.world_title || b.world_slug}"`,
      b.session_date,
      b.session_time,
      b.slot_lock_deposit,
      b.total_game_fee,
      b.balance_due_at_venue,
      b.status || 'locked'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `totem_bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredBookings = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    return bookings.filter((b) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        b.booking_code.toLowerCase().includes(q) ||
        b.lead_guest_name.toLowerCase().includes(q) ||
        b.lead_guest_phone.includes(q) ||
        b.lead_guest_email.toLowerCase().includes(q) ||
        (b.world_title && b.world_title.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (statusFilter !== 'all' && (b.status || 'locked') !== statusFilter) return false;

      if (dateFilter === 'today' && b.session_date !== todayStr) return false;
      if (dateFilter === 'tomorrow' && b.session_date !== tomorrowStr) return false;
      if (dateFilter === 'upcoming' && b.session_date < todayStr) return false;

      return true;
    });
  }, [bookings, searchQuery, statusFilter, dateFilter]);

  const handleOpenBooking = (b: DbBooking) => {
    setSelectedBooking(b);
    setDrawerOpen(true);
  };

  const handleNewBooking = () => {
    setSelectedBooking(null);
    setDrawerOpen(true);
  };

  const handleSaveBooking = (saved: DbBooking) => {
    setBookings((prev) => {
      const exists = prev.some((b) => b.booking_code === saved.booking_code);
      if (exists) {
        return prev.map((b) => (b.booking_code === saved.booking_code ? saved : b));
      }
      return [saved, ...prev];
    });
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Bookings &amp; Session Passes
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Full operational registry of all online reservations and venue settlements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchBookings}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-black' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={exportToCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleNewBooking}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-black hover:bg-zinc-800 text-white text-xs font-bold transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Booking</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar (Quixera Table style) */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-4 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by lead guest, booking code, phone, or game..."
              className="w-full h-9 pl-9 pr-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-black transition-colors"
            />
          </div>

          {/* Quick Date Filters */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {(['all', 'today', 'tomorrow', 'upcoming'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setDateFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all shrink-0 ${
                  dateFilter === tab
                    ? 'bg-black text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab === 'all' ? 'All Dates' : tab}
              </button>
            ))}
          </div>

          {/* Status Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 px-3 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 focus:outline-none focus:border-black"
            >
              <option value="all">All Statuses</option>
              <option value="locked">Deposit Paid</option>
              <option value="checked_in">Checked In</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
          <span>Showing <strong>{filteredBookings.length}</strong> registered sessions</span>
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-black font-semibold hover:underline">
              Clear Filter
            </button>
          )}
        </div>
      </div>

      {/* Main Quixera-Grade Table (Pure White Surface) */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/75 text-gray-500 font-semibold uppercase text-[11px] tracking-wider">
                <th className="py-3.5 px-5">Ref Code</th>
                <th className="py-3.5 px-5">Lead Guest</th>
                <th className="py-3.5 px-5">Session &amp; World</th>
                <th className="py-3.5 px-5">Squad &amp; Finance</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBookings.map((b) => {
                const initials = b.lead_guest_name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <tr
                    key={b.booking_code}
                    onClick={() => handleOpenBooking(b)}
                    className="hover:bg-gray-50/80 transition-colors cursor-pointer group"
                  >
                    {/* Booking Code with Copy Badge */}
                    <td className="py-3.5 px-5 font-mono">
                      <div className="flex items-center gap-1.5 font-bold text-gray-900">
                        <span>{b.booking_code}</span>
                        <button
                          onClick={(e) => copyBookingCode(b.booking_code, e)}
                          title="Copy Code"
                          className="text-gray-400 hover:text-gray-700"
                        >
                          {copiedCode === b.booking_code ? (
                            <Check className="w-3.5 h-3.5 text-gray-900" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <span className="text-[10px] text-gray-400">
                        {b.created_at ? new Date(b.created_at).toLocaleDateString() : 'Active'}
                      </span>
                    </td>

                    {/* Lead Guest with Avatar Circle */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-900 font-bold text-[11px] flex items-center justify-center shrink-0">
                          {initials}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-xs">{b.lead_guest_name}</p>
                          <p className="text-gray-500 text-[11px] font-mono">{b.lead_guest_phone}</p>
                        </div>
                      </div>
                    </td>

                    {/* Session & World */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-1.5 font-medium text-gray-900">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{b.session_date}</span>
                        <span className="text-gray-900 font-bold font-mono">@{b.session_time}</span>
                      </div>
                      <p className="text-gray-500 text-xs mt-0.5 truncate max-w-[200px]">
                        {b.world_title || b.world_slug}
                      </p>
                    </td>

                    {/* Squad & Finance */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-800 text-[11px] font-semibold">
                          {b.squad_size} Players
                        </span>
                        {b.is_weekday_offer_applied && (
                          <span className="text-[10px] text-gray-900 font-bold bg-gray-100 px-1.5 py-0.5 rounded">
                            1 Free Deal
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-xs font-mono">
                        <span className="text-gray-900 font-semibold">₹{b.slot_lock_deposit}</span> · Bal: <strong className="text-gray-900">₹{b.balance_due_at_venue}</strong>
                      </div>
                    </td>

                    {/* Status Pill */}
                    <td className="py-3.5 px-5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        b.status === 'locked' || b.status === 'checked_in'
                          ? 'bg-gray-100 text-gray-900 border border-gray-200'
                          : b.status === 'completed'
                          ? 'bg-purple-50 text-purple-800 border border-purple-200'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {b.status === 'locked' ? 'Deposit Paid' : b.status || 'Active'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenBooking(b);
                          }}
                          className="px-2.5 py-1 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-700 text-xs font-semibold transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400 text-xs">
                    No reservations matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer */}
      <BookingSlideOverDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        booking={selectedBooking}
        onSave={handleSaveBooking}
      />
    </div>
  );
};
