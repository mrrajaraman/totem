import React from 'react';
import { BookingState } from '../../types';
import { WORLDS_DATA } from '../../data/worldsData';
import { Users, Gamepad2, Calendar, Clock, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react';

export interface BookingSummaryProps {
  booking: BookingState;
  depositAmount: number;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  booking,
  depositAmount,
}) => {
  const selectedWorld = WORLDS_DATA.find((w) => w.slug === booking.selectedWorldSlug);
  const worldName = booking.selectedWorldSlug === 'decide-at-venue' 
    ? 'Decide at Venue' 
    : selectedWorld?.title || 'Not selected';

  const basePricePerPerson = 799;
  const estimatedTotal = booking.groupSize * basePricePerPerson;
  const balanceAtVenue = Math.max(0, estimatedTotal - depositAmount);

  return (
    <div className="rounded-2xl bg-[#0D0D0D] border border-[#222222] p-6 space-y-6 sticky top-24">
      <div className="flex items-center justify-between border-b border-[#1E1E1E] pb-4">
        <h4 className="font-mono text-xs uppercase tracking-widest text-[#39FF14] font-semibold">
          Session Summary
        </h4>
        <span className="text-[11px] font-mono text-[#A3A3A3] bg-[#161616] px-2 py-0.5 rounded border border-[#262626]">
          100% Private Arena
        </span>
      </div>

      {/* Breakdown Items */}
      <div className="space-y-3.5 text-xs font-mono">
        <div className="flex items-center justify-between">
          <span className="text-[#A3A3A3] flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-[#39FF14]" />
            Group Size:
          </span>
          <span className="text-white font-semibold">
            {booking.groupSize} {booking.groupSize === 1 ? 'Player' : 'Players'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#A3A3A3] flex items-center gap-2">
            <Gamepad2 className="w-3.5 h-3.5 text-[#39FF14]" />
            VR World:
          </span>
          <span className="text-white font-semibold truncate max-w-[160px] text-right">
            {worldName}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#A3A3A3] flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#39FF14]" />
            Date:
          </span>
          <span className="text-white font-semibold">
            {booking.selectedDate || 'Select Date'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#A3A3A3] flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#39FF14]" />
            Time Slot:
          </span>
          <span className="text-white font-semibold">
            {booking.selectedTimeSlot || 'Select Time'}
          </span>
        </div>
      </div>

      {/* Financial Breakdown */}
      <div className="border-t border-[#1E1E1E] pt-4 space-y-2">
        <div className="flex items-center justify-between text-xs text-[#A3A3A3]">
          <span>Estimated Game Total:</span>
          <span className="font-mono text-white">~₹{estimatedTotal.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between text-xs text-[#39FF14] font-semibold">
          <span>Lock Slot Deposit (Pay Now):</span>
          <span className="font-mono text-base font-bold">₹{depositAmount}</span>
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#71717A]">
          <span>Balance Settled at Venue:</span>
          <span className="font-mono">~₹{balanceAtVenue.toLocaleString()} + GST</span>
        </div>
      </div>

      {/* Trust Bullet points */}
      <div className="rounded-xl bg-[#080808] border border-[#1A1A1A] p-3.5 space-y-2 text-[11px] text-[#A3A3A3]">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#39FF14] shrink-0 mt-0.5" />
          <span>Pay ₹{depositAmount} now to lock slot; balance settled at venue via UPI/Card.</span>
        </div>
        <div className="flex items-start gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#39FF14] shrink-0 mt-0.5" />
          <span>Free cancellation up to 24h prior. Full instant refund.</span>
        </div>
      </div>

      {/* WhatsApp Fallback Booking Button */}
      <div className="pt-1">
        <a
          href={`https://wa.me/917337838303?text=Hi%20Totem!%20I'd%20like%20to%20reserve%20a%20slot%20for%20${booking.groupSize}%20players%20on%20${booking.selectedDate}%20at%20${booking.selectedTimeSlot}%20(${worldName}).`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-3 rounded-xl border border-[#2B2B2B] bg-[#111111] hover:bg-[#161616] text-xs font-mono text-[#A3A3A3] hover:text-white flex items-center justify-center gap-2 transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#39FF14]" />
          <span>Book via WhatsApp Instead</span>
        </a>
      </div>
    </div>
  );
};
