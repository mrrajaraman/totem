import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Plus, 
  Clock, 
  Users, 
  Gamepad2, 
  CheckCircle2, 
  Filter,
  ArrowDownLeft,
  ArrowUpRight,
  Briefcase,
  FileText,
  X
} from 'lucide-react';
import { DbBooking } from '../../lib/supabase';

interface AdminCalendarViewProps {
  bookings: DbBooking[];
  onSelectBooking: (booking: DbBooking) => void;
  onNewBookingAtSlot: (date: string, time: string, arena: string) => void;
}

const ARENAS = [
  { id: 'Arena 1', name: 'Arena 1 (Free-Roam Grid)' },
  { id: 'Arena 2', name: 'Arena 2 (Hologate Tactical)' },
];

const TIME_ROWS = [
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
  '08:00 PM',
  '09:00 PM',
  '10:00 PM',
];

export interface BookingVisualTheme {
  bg: string;
  hoverBg: string;
  cardBg: string;
  cardBorder: string;
  iconColor: string;
  badgeBg: string;
  badgeText: string;
  textColor: string;
  statusText: string;
  shortTag: string;
  category: 'paid' | 'unpaid' | 'checked_in' | 'completed' | 'cancelled';
}

export const getBookingVisualTheme = (booking: DbBooking): BookingVisualTheme => {
  const deposit = Number(booking.slot_lock_deposit) || 0;
  const status = booking.status || 'locked';

  if (status === 'cancelled') {
    return {
      bg: 'bg-[#F4F4F5]',
      hoverBg: 'hover:bg-[#E4E4E7]',
      cardBg: 'bg-[#F4F4F5]',
      cardBorder: 'border-[#E4E4E7]',
      iconColor: 'text-[#71717A]',
      badgeBg: 'bg-[#71717A]',
      badgeText: 'text-white',
      textColor: 'text-gray-500 line-through',
      statusText: 'Cancelled',
      shortTag: 'VOID',
      category: 'cancelled',
    };
  }

  if (status === 'checked_in') {
    // 3. Move-Outs Lavender/Purple style (Ref: #EDE8F9 / #4D2EA9)
    return {
      bg: 'bg-[#EDE8F9]',
      hoverBg: 'hover:bg-[#E2DBF7]',
      cardBg: 'bg-[#F7F4FD]',
      cardBorder: 'border-[#DDD4F7]',
      iconColor: 'text-[#4D2EA9]',
      badgeBg: 'bg-[#4D2EA9]',
      badgeText: 'text-white',
      textColor: 'text-[#1E1B4B]',
      statusText: 'Checked In',
      shortTag: 'IN',
      category: 'checked_in',
    };
  }

  if (status === 'completed') {
    // 4. Notes Butterscotch/Amber style (Ref: #FFF2E0 / #F69E3D)
    return {
      bg: 'bg-[#FFF2E0]',
      hoverBg: 'hover:bg-[#FFE5C2]',
      cardBg: 'bg-[#FFF7ED]',
      cardBorder: 'border-[#FED7AA]',
      iconColor: 'text-[#EA580C]',
      badgeBg: 'bg-[#F69E3D]',
      badgeText: 'text-white',
      textColor: 'text-[#7C2D12]',
      statusText: 'Completed',
      shortTag: 'DONE',
      category: 'completed',
    };
  }

  // 1. Move-Ins Mint Green style (Ref: #E6F9F0 / #00C48C) -> PAID
  if (deposit > 0 || status === 'locked') {
    return {
      bg: 'bg-[#E6F9F0]',
      hoverBg: 'hover:bg-[#D1F5E2]',
      cardBg: 'bg-[#F0FDF4]',
      cardBorder: 'border-[#BBF7D0]',
      iconColor: 'text-[#00A86B]',
      badgeBg: 'bg-[#00C48C]',
      badgeText: 'text-white',
      textColor: 'text-[#064E3B]',
      statusText: 'Deposit Paid',
      shortTag: 'PAID',
      category: 'paid',
    };
  }

  // 2. Work Orders Coral/Salmon style (Ref: #FFEBE6 / #FF6448) -> UNPAID
  return {
    bg: 'bg-[#FFEBE6]',
    hoverBg: 'hover:bg-[#FFD9CF]',
    cardBg: 'bg-[#FFF1EE]',
    cardBorder: 'border-[#FECDD3]',
    iconColor: 'text-[#FF6448]',
    badgeBg: 'bg-[#FF6448]',
    badgeText: 'text-white',
    textColor: 'text-[#881337]',
    statusText: 'Payment Pending',
    shortTag: 'DUE',
    category: 'unpaid',
  };
};

export const AdminCalendarView: React.FC<AdminCalendarViewProps> = ({
  bookings,
  onSelectBooking,
  onNewBookingAtSlot,
}) => {
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedArenaFilter, setSelectedArenaFilter] = useState<string>('all');

  // Helpers for date navigation
  const navigateDate = (delta: number) => {
    const next = new Date(currentDate);
    if (viewMode === 'day') next.setDate(next.getDate() + delta);
    else if (viewMode === 'week') next.setDate(next.getDate() + delta * 7);
    else if (viewMode === 'month') next.setMonth(next.getMonth() + delta);
    setCurrentDate(next);
  };

  const resetToToday = () => {
    setCurrentDate(new Date());
  };

  const currentDateString = currentDate.toISOString().split('T')[0];
  const isCurrentDateToday = currentDateString === new Date().toISOString().split('T')[0];

  const formattedHeaderDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  // Calculate live current time position (red/orange line like Quixera)
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const isNowWithinSchedule = currentHours >= 10 && currentHours <= 22;
  const currentMinutesFrom10AM = (currentHours - 10) * 60 + currentMinutes;
  const totalScheduleMinutes = 12 * 60; // 10 AM to 10 PM
  const currentTimePercentage = Math.max(0, Math.min(100, (currentMinutesFrom10AM / totalScheduleMinutes) * 100));

  // Filter bookings for this day
  const dayBookings = bookings.filter((b) => b.session_date === currentDateString);

  // Helper to match slot with booking
  const getBookingForSlotAndArena = (timeRow: string, arenaId: string) => {
    const rowHour = parseInt(timeRow.split(':')[0], 10);
    const rowIsPM = timeRow.includes('PM') && rowHour !== 12;
    const adjustedRowHour = rowIsPM ? rowHour + 12 : (timeRow.includes('AM') && rowHour === 12 ? 0 : rowHour);

    return dayBookings.find((b) => {
      // Approximate hour matching
      const bTime = b.session_time || '';
      const bHour = parseInt(bTime.split(':')[0], 10);
      const bIsPM = bTime.includes('PM') && bHour !== 12;
      const adjustedBHour = bIsPM ? bHour + 12 : (bTime.includes('AM') && bHour === 12 ? 0 : bHour);
      
      const hourMatches = adjustedRowHour === adjustedBHour;
      // If booking doesn't specify arena, map based on index or booking code
      const assignedArena = b.special_notes?.includes('Arena 2') ? 'Arena 2' : 'Arena 1';
      return hourMatches && (assignedArena === arenaId || (arenaId === 'Arena 1' && !b.special_notes?.includes('Arena 2')));
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden flex flex-col font-sans">
      {/* Calendar Control Header (Exact Quixera Layout) */}
      <div className="px-5 py-4 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white">
        {/* Left: View Mode Toggle */}
        <div className="flex items-center gap-1 bg-gray-100/90 p-1 rounded-xl border border-gray-200 self-start">
          {(['day', 'week', 'month'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                viewMode === mode
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Center: Date Navigator with Arrows */}
        <div className="flex items-center gap-2 self-start lg:self-center">
          <button
            onClick={() => navigateDate(-1)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors border border-gray-200"
            title="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-900 min-w-[170px] justify-center">
            <CalendarIcon className="w-3.5 h-3.5 text-gray-900" />
            <span>{formattedHeaderDate}</span>
          </div>

          <button
            onClick={() => navigateDate(1)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors border border-gray-200"
            title="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {!isCurrentDateToday && (
            <button
              onClick={resetToToday}
              className="text-xs font-semibold text-gray-900 hover:text-black bg-gray-100 hover:bg-gray-200 px-2.5 py-1.5 rounded-lg transition-colors ml-1 border border-gray-200"
            >
              Today
            </button>
          )}
        </div>

        {/* Right: Resource Filter & New Booking Button */}
        <div className="flex items-center gap-2.5 self-start lg:self-auto">
          <select
            value={selectedArenaFilter}
            onChange={(e) => setSelectedArenaFilter(e.target.value)}
            className="h-9 px-3 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 focus:outline-none focus:border-gray-900"
          >
            <option value="all">All Arenas</option>
            <option value="Arena 1">Arena 1 (Free-Roam Grid)</option>
            <option value="Arena 2">Arena 2 (Hologate Tactical)</option>
          </select>

          <button
            onClick={() => onNewBookingAtSlot(currentDateString, '10:00 AM', 'Arena 1')}
            className="h-9 px-3.5 bg-black hover:bg-zinc-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>New Booking</span>
          </button>
        </div>
      </div>

      {/* Main Grid View */}
      {viewMode === 'day' && (
        <div className="overflow-x-auto relative min-w-[700px]">
          {/* Column Header: Venue Resources */}
          <div className="grid grid-cols-12 border-b border-gray-200 bg-gray-50/80 sticky top-0 z-20 text-xs font-semibold text-gray-600">
            <div className="col-span-2 py-3 px-4 border-r border-gray-200 text-gray-400 font-mono text-[11px] uppercase tracking-wider">
              Time
            </div>
            {ARENAS.filter((a) => selectedArenaFilter === 'all' || selectedArenaFilter === a.id).map((ar, idx, arr) => (
              <div 
                key={ar.id} 
                className={`${arr.length === 1 ? 'col-span-10' : 'col-span-5'} py-3 px-5 border-r border-gray-200 last:border-r-0 flex items-center justify-between`}
              >
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-mono">
                    Venue Facility
                  </span>
                  <span className="text-gray-900 font-bold">{ar.name}</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-black" />
              </div>
            ))}
          </div>

          {/* Time Rows Container */}
          <div className="relative">
            {/* Live Current Time Red Ruler Line (Quixera Reference Feature) */}
            {isCurrentDateToday && isNowWithinSchedule && (
              <div 
                className="absolute left-0 right-0 z-20 pointer-events-none flex items-center"
                style={{ top: `${currentTimePercentage}%` }}
              >
                <div className="w-16 bg-rose-500 text-white font-mono text-[10px] font-bold py-0.5 px-1 rounded-r-md shadow-sm">
                  {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="flex-1 h-[2px] bg-rose-500 shadow-sm" />
              </div>
            )}

            {/* Time Grid Rows */}
            {TIME_ROWS.map((timeRow, idx) => {
              const visibleArenas = ARENAS.filter((a) => selectedArenaFilter === 'all' || selectedArenaFilter === a.id);
              const colWidth = visibleArenas.length === 1 ? 'col-span-10' : 'col-span-5';

              return (
                <div key={timeRow} className="grid grid-cols-12 border-b border-gray-100 min-h-[92px] group">
                  {/* Time label column */}
                  <div className="col-span-2 py-3 px-4 border-r border-gray-100 bg-white font-mono text-xs text-gray-500 font-medium">
                    {timeRow}
                  </div>

                  {/* Arena Columns for this hour */}
                  {visibleArenas.map((ar) => {
                    const booking = getBookingForSlotAndArena(timeRow, ar.id);

                    if (booking) {
                      const theme = getBookingVisualTheme(booking);
                      return (
                        <div
                          key={ar.id}
                          className={`${colWidth} p-2 border-r border-gray-100 last:border-r-0 bg-white relative`}
                        >
                          <div
                            onClick={() => onSelectBooking(booking)}
                            className={`h-full p-3 rounded-xl border shadow-xs cursor-pointer transition-all duration-150 flex flex-col justify-between ${theme.cardBg} ${theme.cardBorder}`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <div className={`p-1.5 rounded-lg ${theme.bg} ${theme.iconColor} shrink-0`}>
                                  {theme.category === 'paid' && <ArrowDownLeft className="w-4 h-4" />}
                                  {theme.category === 'unpaid' && <Briefcase className="w-4 h-4" />}
                                  {theme.category === 'checked_in' && <ArrowUpRight className="w-4 h-4" />}
                                  {theme.category === 'completed' && <FileText className="w-4 h-4" />}
                                  {theme.category === 'cancelled' && <X className="w-4 h-4" />}
                                </div>
                                <div className="min-w-0">
                                  <h4 className={`text-xs font-bold tracking-tight line-clamp-1 ${theme.textColor}`}>
                                    {booking.lead_guest_name}
                                  </h4>
                                  <p className="text-[11px] opacity-75 line-clamp-1 mt-0.5 text-gray-600">
                                    {booking.world_title || booking.world_slug} · {booking.squad_size} Pax
                                  </p>
                                </div>
                              </div>
                              <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider shrink-0 shadow-2xs ${theme.badgeBg} ${theme.badgeText}`}>
                                {theme.shortTag}
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-[10px] font-mono opacity-85 pt-2 border-t border-black/5">
                              <span className="flex items-center gap-1 font-semibold text-gray-700">
                                <Clock className="w-3 h-3" />
                                {booking.session_time} · 60 min
                              </span>
                              <span className="font-bold text-gray-900">
                                ₹{booking.slot_lock_deposit} {theme.category === 'paid' ? 'Paid' : 'Due'}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    // Empty slot cell -> Click to create booking
                    return (
                      <div
                        key={ar.id}
                        onClick={() => onNewBookingAtSlot(currentDateString, timeRow, ar.id)}
                        className={`${colWidth} p-2 border-r border-gray-100 last:border-r-0 hover:bg-gray-50 cursor-pointer transition-colors relative flex items-center justify-center group/cell`}
                      >
                        <span className="hidden group-hover/cell:inline-flex items-center gap-1 text-[11px] text-white font-semibold bg-black px-2 py-1 rounded-md shadow-xs">
                          <Plus className="w-3 h-3" />
                          <span>Book Slot</span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Week Mode: Continuous Edge-to-Edge Grid with 1px Lines (NO GAPS) */}
      {viewMode === 'week' && (
        <div className="border-t border-gray-200 bg-white">
          <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50/80 text-xs font-bold text-gray-700 uppercase tracking-wider text-center divide-x divide-gray-200">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
              <div key={d} className="py-2.5">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 divide-x divide-gray-200 min-h-[440px]">
            {[0, 1, 2, 3, 4, 5, 6].map((offset) => {
              const d = new Date(currentDate);
              d.setDate(d.getDate() - d.getDay() + 1 + offset);
              const dateStr = d.toISOString().split('T')[0];
              const isToday = d.toDateString() === new Date().toDateString();
              const matches = bookings.filter((b) => b.session_date === dateStr);

              return (
                <div 
                  key={offset} 
                  className="p-2 text-left flex flex-col justify-between hover:bg-gray-50/40 transition-colors group/col cursor-pointer"
                  onClick={() => onNewBookingAtSlot(dateStr, '10:00 AM', 'Arena 1')}
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
                    <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                      <span className={isToday ? "w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs shadow-xs" : ""}>
                        {d.getDate()}
                      </span>
                      <span className="text-[11px] text-gray-500 font-normal">
                        {d.toLocaleDateString([], { month: 'short' })}
                      </span>
                    </span>
                    <button
                      type="button"
                      title="Add booking"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNewBookingAtSlot(dateStr, '10:00 AM', 'Arena 1');
                      }}
                      className="opacity-0 group-hover/col:opacity-100 p-1 rounded hover:bg-gray-200/70 text-gray-400 hover:text-black transition-opacity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    {matches.map((b) => {
                      const theme = getBookingVisualTheme(b);
                      return (
                        <div
                          key={b.booking_code}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectBooking(b);
                          }}
                          className={`w-full px-2 py-1.5 rounded-lg ${theme.bg} ${theme.hoverBg} transition-all flex items-center justify-between gap-1.5 cursor-pointer shadow-2xs`}
                          title={`${b.session_time} - ${b.lead_guest_name} (${theme.statusText})`}
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            {theme.category === 'paid' && <ArrowDownLeft className={`w-3.5 h-3.5 shrink-0 ${theme.iconColor}`} />}
                            {theme.category === 'unpaid' && <Briefcase className={`w-3.5 h-3.5 shrink-0 ${theme.iconColor}`} />}
                            {theme.category === 'checked_in' && <ArrowUpRight className={`w-3.5 h-3.5 shrink-0 ${theme.iconColor}`} />}
                            {theme.category === 'completed' && <FileText className={`w-3.5 h-3.5 shrink-0 ${theme.iconColor}`} />}
                            {theme.category === 'cancelled' && <X className={`w-3.5 h-3.5 shrink-0 ${theme.iconColor}`} />}
                            <span className={`text-xs font-semibold truncate ${theme.textColor}`}>
                              {b.lead_guest_name}
                            </span>
                          </div>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${theme.badgeBg} ${theme.badgeText} shrink-0`}>
                            {theme.shortTag}
                          </span>
                        </div>
                      );
                    })}
                    {matches.length === 0 && (
                      <span className="text-[11px] text-gray-400 block pt-4 text-center">No sessions</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Month Mode: Continuous Edge-to-Edge Grid with 1px Lines (NO GAPS) */}
      {viewMode === 'month' && (
        <div className="border-t border-gray-200 bg-white">
          {/* Day of Week Headers: 1px divider lines */}
          <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50/80 text-xs font-bold text-gray-600 uppercase tracking-wider text-center divide-x divide-gray-200">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="py-2.5">
                {day}
              </div>
            ))}
          </div>

          {/* 5-Week Grid: Seamless cells separated ONLY by 1px lines (no gaps) */}
          <div className="grid grid-cols-7 divide-x divide-y divide-gray-200 border-b border-gray-200">
            {Array.from({ length: 35 }).map((_, i) => {
              const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
              const firstDayIndex = (startOfMonth.getDay() + 6) % 7; // Monday start
              const dayNum = i - firstDayIndex + 1;
              const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNum);
              const cellDateStr = cellDate.toISOString().split('T')[0];
              const isCurrentMonth = cellDate.getMonth() === currentDate.getMonth();
              const isToday = cellDate.toDateString() === new Date().toDateString();
              const dayBookings = bookings.filter((b) => b.session_date === cellDateStr);

              return (
                <div
                  key={i}
                  className={`min-h-[120px] p-2 text-left flex flex-col justify-between transition-colors relative group/cell cursor-pointer ${
                    isCurrentMonth ? 'bg-white hover:bg-gray-50/60' : 'bg-gray-50/40 text-gray-400'
                  }`}
                  onClick={() => onNewBookingAtSlot(cellDateStr, '10:00 AM', 'Arena 1')}
                >
                  {/* Top Bar inside cell: Date number & Today circle indicator */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-xs font-mono font-bold flex items-center justify-center ${
                        isToday
                          ? 'w-6 h-6 rounded-full bg-black text-white shadow-xs'
                          : isCurrentMonth
                          ? 'text-gray-900'
                          : 'text-gray-400'
                      }`}
                    >
                      {cellDate.getDate()}
                    </span>

                    {/* Quick plus on cell hover */}
                    <button
                      type="button"
                      title="Add booking on this day"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNewBookingAtSlot(cellDateStr, '10:00 AM', 'Arena 1');
                      }}
                      className="opacity-0 group-hover/cell:opacity-100 p-1 rounded hover:bg-gray-200/70 text-gray-400 hover:text-black transition-opacity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Comfort View Booking Pills inside cell (Exact Reference Layout) */}
                  <div className="space-y-1.5 mt-auto">
                    {dayBookings.slice(0, 3).map((b) => {
                      const theme = getBookingVisualTheme(b);
                      return (
                        <div
                          key={b.booking_code}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectBooking(b);
                          }}
                          className={`w-full px-2 py-1.5 rounded-lg ${theme.bg} ${theme.hoverBg} transition-all flex items-center justify-between gap-1.5 cursor-pointer shadow-2xs group/pill`}
                          title={`${b.session_time} - ${b.lead_guest_name} (${theme.statusText})`}
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            {theme.category === 'paid' && <ArrowDownLeft className={`w-3.5 h-3.5 shrink-0 ${theme.iconColor}`} />}
                            {theme.category === 'unpaid' && <Briefcase className={`w-3.5 h-3.5 shrink-0 ${theme.iconColor}`} />}
                            {theme.category === 'checked_in' && <ArrowUpRight className={`w-3.5 h-3.5 shrink-0 ${theme.iconColor}`} />}
                            {theme.category === 'completed' && <FileText className={`w-3.5 h-3.5 shrink-0 ${theme.iconColor}`} />}
                            {theme.category === 'cancelled' && <X className={`w-3.5 h-3.5 shrink-0 ${theme.iconColor}`} />}
                            <span className={`text-xs font-semibold truncate ${theme.textColor}`}>
                              {b.lead_guest_name}
                            </span>
                          </div>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${theme.badgeBg} ${theme.badgeText} shrink-0`}>
                            {theme.shortTag}
                          </span>
                        </div>
                      );
                    })}

                    {dayBookings.length > 3 && (
                      <span className="text-[10px] text-gray-500 font-bold block pt-0.5">
                        +{dayBookings.length - 3} more sessions
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
