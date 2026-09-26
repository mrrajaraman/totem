import React from 'react';
import { Calendar as CalendarIcon, Clock, Check, Sparkles } from 'lucide-react';

export interface StepDateTimeProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  selectedTimeSlot: string;
  onSelectTimeSlot: (slot: string) => void;
}

export const StepDateTime: React.FC<StepDateTimeProps> = ({
  selectedDate,
  onSelectDate,
  selectedTimeSlot,
  onSelectTimeSlot,
}) => {
  // Generate dates for the next 7 days
  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const formatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const value = d.toISOString().split('T')[0];
    const dayOfWeek = d.getDay(); // 2=Tue, 3=Wed, 4=Thu
    const isWeekdayPromo = dayOfWeek >= 2 && dayOfWeek <= 4;
    return { dayName, formatted, value, isWeekdayPromo };
  });

  // Time slots from morning to night
  const timeSlots = [
    { time: '11:00 AM', status: 'Available' },
    { time: '12:15 PM', status: 'Available' },
    { time: '01:30 PM', status: 'Available' },
    { time: '02:45 PM', status: 'Available' },
    { time: '04:00 PM', status: 'Few Left' },
    { time: '05:15 PM', status: 'Few Left' },
    { time: '06:30 PM', status: 'Peak' },
    { time: '07:45 PM', status: 'Peak' },
    { time: '09:00 PM', status: 'Available' },
    { time: '10:15 PM', status: 'Available' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Pick your date &amp; arena time
        </h3>
        <p className="text-sm text-[#A3A3A3]">
          Sessions are strictly private to your group. Slots fill up quickly for weekend evenings.
        </p>
      </div>

      {/* Date Carousel */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-3 flex items-center gap-2">
          <CalendarIcon className="w-3.5 h-3.5 text-[#39FF14]" />
          <span>Select Date</span>
        </label>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
          {dates.map((d) => {
            const isSelected = selectedDate === d.value;
            return (
              <button
                key={d.value}
                type="button"
                onClick={() => onSelectDate(d.value)}
                className={`p-3 rounded-xl border text-center transition-all duration-200 relative ${
                  isSelected
                    ? 'bg-[#161616] border-[#39FF14] shadow-[0_0_16px_-4px_rgba(57,255,20,0.3)]'
                    : 'bg-[#0E0E0E] border-[#242424] hover:border-[#383838]'
                }`}
              >
                {d.isWeekdayPromo && (
                  <span className="absolute -top-1.5 -right-1 w-3 h-3 rounded-full bg-[#39FF14] border-2 border-black" title="Weekday Deal Active" />
                )}
                <span className={`block text-xs font-bold ${isSelected ? 'text-[#39FF14]' : 'text-white'}`}>
                  {d.dayName}
                </span>
                <span className="block text-[11px] font-mono text-[#A3A3A3] mt-0.5">
                  {d.formatted}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-3 flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-[#39FF14]" />
          <span>Available Arena Slots (Koramangala Venue)</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {timeSlots.map((slot) => {
            const isSelected = selectedTimeSlot === slot.time;
            return (
              <button
                key={slot.time}
                type="button"
                onClick={() => onSelectTimeSlot(slot.time)}
                className={`py-3 px-3 rounded-xl border text-center transition-all duration-200 flex flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-[#39FF14] text-black border-[#39FF14] font-bold shadow-[0_0_20px_-4px_rgba(57,255,20,0.4)]'
                    : 'bg-[#0E0E0E] border-[#242424] text-white hover:border-[#383838]'
                }`}
              >
                <span className="font-mono text-xs font-semibold">{slot.time}</span>
                <span className={`text-[10px] font-mono mt-0.5 ${
                  isSelected ? 'text-black/80 font-bold' : slot.status === 'Few Left' ? 'text-amber-400' : slot.status === 'Peak' ? 'text-rose-400' : 'text-[#71717A]'
                }`}>
                  {slot.status}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
