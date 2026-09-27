import React, { useState } from 'react';
import { Clock, Calendar, ChevronLeft, ChevronRight, User, CheckCircle2 } from 'lucide-react';
import { DbBooking } from '../../lib/supabase';

interface AdminSlotTimelineProps {
  bookings: DbBooking[];
  onSelectBooking: (booking: DbBooking) => void;
}

const ARENA_TIME_SLOTS = [
  '10:00 AM',
  '11:15 AM',
  '12:30 PM',
  '01:45 PM',
  '03:00 PM',
  '04:15 PM',
  '05:30 PM',
  '06:45 PM',
  '08:00 PM',
  '09:15 PM',
  '10:00 PM',
];

export const AdminSlotTimeline: React.FC<AdminSlotTimelineProps> = ({ bookings, onSelectBooking }) => {
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);

  const changeDateBy = (days: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const formattedDate = new Date(selectedDate).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  const isToday = selectedDate === new Date().toISOString().split('T')[0];
  const dateBookings = bookings.filter((b) => b.session_date === selectedDate);

  return (
    <div className="rounded-xl bg-[#121215] border border-zinc-800/80 p-5">
      {/* Date Switcher & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">Daily Session Schedule</span>
          {isToday && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
              Today
            </span>
          )}
          <span className="text-xs text-zinc-500 font-mono">
            ({dateBookings.length} of {ARENA_TIME_SLOTS.length} slots booked)
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-lg p-1 self-start sm:self-auto">
          <button
            onClick={() => changeDateBy(-1)}
            className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="px-2 text-xs font-medium text-zinc-200 min-w-[100px] text-center">
            {formattedDate}
          </span>

          <button
            onClick={() => changeDateBy(1)}
            className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {!isToday && (
            <button
              onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
              className="text-[11px] px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors ml-1"
            >
              Today
            </button>
          )}
        </div>
      </div>

      {/* Horizontal Compact Slot Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-2">
        {ARENA_TIME_SLOTS.map((slot) => {
          const booking = dateBookings.find(
            (b) => b.session_time?.trim().toLowerCase() === slot.trim().toLowerCase()
          );

          if (booking) {
            return (
              <button
                key={slot}
                onClick={() => onSelectBooking(booking)}
                className="text-left p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 hover:border-emerald-500/60 transition-all flex flex-col justify-between h-[76px] group"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[11px] font-mono font-semibold text-emerald-400">{slot}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white truncate group-hover:text-emerald-300">
                    {booking.lead_guest_name}
                  </p>
                  <p className="text-[10px] text-zinc-400 truncate">
                    {booking.squad_size} Pax · ₹{booking.slot_lock_deposit}
                  </p>
                </div>
              </button>
            );
          }

          return (
            <div
              key={slot}
              className="p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/50 flex flex-col justify-between h-[76px]"
            >
              <span className="text-[11px] font-mono text-zinc-400">{slot}</span>
              <span className="text-[10px] text-zinc-400">Available</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
