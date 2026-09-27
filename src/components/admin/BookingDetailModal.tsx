import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Phone, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  FileText
} from 'lucide-react';
import { DbBooking, supabase } from '../../lib/supabase';

interface BookingDetailModalProps {
  booking: DbBooking | null;
  onClose: () => void;
  onStatusUpdate: (updatedBooking: DbBooking) => void;
}

export const BookingDetailModal: React.FC<BookingDetailModalProps> = ({
  booking,
  onClose,
  onStatusUpdate,
}) => {
  if (!booking) return null;

  const [currentStatus, setCurrentStatus] = useState(booking.status || 'locked');
  const [internalNotes, setInternalNotes] = useState(booking.special_notes || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveStatus = async (newStatus: 'pending_lock' | 'locked' | 'checked_in' | 'completed' | 'cancelled') => {
    setIsUpdating(true);
    setSaveSuccess(false);

    try {
      const updatedData = {
        ...booking,
        status: newStatus,
        special_notes: internalNotes,
        updated_at: new Date().toISOString(),
      };

      if (booking.id) {
        await supabase
          .from('bookings')
          .update({
            status: newStatus,
            special_notes: internalNotes,
          })
          .eq('id', booking.id);
      } else if (booking.booking_code) {
        await supabase
          .from('bookings')
          .update({
            status: newStatus,
            special_notes: internalNotes,
          })
          .eq('booking_code', booking.booking_code);
      }

      setCurrentStatus(newStatus);
      onStatusUpdate(updatedData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      console.warn('Status update fallback:', err);
      setCurrentStatus(newStatus);
      onStatusUpdate({ ...booking, status: newStatus, special_notes: internalNotes });
    } finally {
      setIsUpdating(false);
    }
  };

  const sendWhatsAppDispatch = () => {
    const cleanPhone = booking.lead_guest_phone.replace(/[^0-9]/g, '');
    const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const msg = `Hi ${booking.lead_guest_name}! 🥽 Your Totem VR Arena booking (${booking.booking_code}) is confirmed!

Date: ${booking.session_date}
Time: ${booking.session_time}
Game: ${booking.world_title || booking.world_slug}
Squad: ${booking.squad_size} Players
Slot Lock Deposit: ₹${booking.slot_lock_deposit} (Received)
Balance Due at Venue: ₹${booking.balance_due_at_venue}

Location: Totem VR Arena, 3rd Floor, 80 Feet Rd, 4th Block, Koramangala, Bengaluru.
Google Maps: https://maps.app.goo.gl/totemvr

Please arrive 15 minutes before your slot for briefing & headset calibration. See you at Totem!`;

    window.open(`https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div 
        className="w-full max-w-xl bg-[#121215] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-[#151518]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-white">{booking.booking_code}</span>
              <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                currentStatus === 'locked' || currentStatus === 'checked_in'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : currentStatus === 'completed'
                  ? 'bg-purple-500/10 text-purple-300'
                  : 'bg-zinc-800 text-zinc-300'
              }`}>
                {currentStatus === 'locked' ? 'Deposit Paid' : currentStatus}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">Booking Details &amp; Check-In</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Guest Info */}
          <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-3">
            <span className="text-xs font-semibold text-zinc-300 block">
              Lead Guest
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-zinc-500">Name</p>
                <p className="font-medium text-white text-sm">{booking.lead_guest_name}</p>
              </div>

              <div>
                <p className="text-zinc-500">Phone</p>
                <a
                  href={`tel:${booking.lead_guest_phone}`}
                  className="font-mono text-zinc-200 hover:text-emerald-400 flex items-center gap-1.5 underline"
                >
                  <Phone className="w-3.5 h-3.5 text-zinc-500" />
                  {booking.lead_guest_phone}
                </a>
              </div>

              <div className="sm:col-span-2">
                <p className="text-zinc-500">Email</p>
                <p className="text-zinc-300 font-mono flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-zinc-500" />
                  {booking.lead_guest_email}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800/80 flex gap-2">
              <button
                onClick={sendWhatsAppDispatch}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-medium transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Send WhatsApp Pass</span>
              </button>

              <a
                href={`tel:${booking.lead_guest_phone}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-zinc-400" />
                <span>Call</span>
              </a>
            </div>
          </div>

          {/* Session Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs">
            <div>
              <span className="text-zinc-500 block">Game</span>
              <span className="text-white font-medium truncate block">{booking.world_title || booking.world_slug}</span>
            </div>
            <div>
              <span className="text-zinc-500 block">Squad</span>
              <span className="text-white font-medium">{booking.squad_size} Players</span>
            </div>
            <div>
              <span className="text-zinc-500 block">Date</span>
              <span className="text-white font-medium font-mono">{booking.session_date}</span>
            </div>
            <div>
              <span className="text-zinc-500 block">Time</span>
              <span className="text-emerald-400 font-medium font-mono">{booking.session_time}</span>
            </div>
          </div>

          {/* Financials */}
          <div className="p-3.5 rounded-lg bg-zinc-900/40 border border-zinc-800 text-xs space-y-1.5 font-mono">
            <div className="flex justify-between text-zinc-400">
              <span>Total Game Fee</span>
              <span>₹{booking.total_game_fee.toLocaleString('en-IN')}</span>
            </div>
            {booking.is_weekday_offer_applied && (
              <div className="flex justify-between text-emerald-400">
                <span>Weekday Promo (1 Player Free)</span>
                <span>Applied</span>
              </div>
            )}
            <div className="flex justify-between text-emerald-400">
              <span>Online Slot Lock Deposit</span>
              <span>₹{booking.slot_lock_deposit}</span>
            </div>
            <div className="pt-2 border-t border-zinc-800 flex justify-between font-bold text-white text-sm">
              <span>Balance Due at Reception</span>
              <span className="text-emerald-400">₹{booking.balance_due_at_venue.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs text-zinc-400 mb-1 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" />
              Staff Notes
            </label>
            <textarea
              rows={2}
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              placeholder="Add notes e.g. birthday group, special assistance..."
              className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-zinc-600 resize-none"
            />
          </div>

          {/* Status Change */}
          <div className="space-y-1.5">
            <span className="text-xs text-zinc-400 block font-medium">Update Status</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                disabled={isUpdating}
                onClick={() => handleSaveStatus('locked')}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                  currentStatus === 'locked'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                Deposit Paid
              </button>

              <button
                disabled={isUpdating}
                onClick={() => handleSaveStatus('checked_in')}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                  currentStatus === 'checked_in'
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-semibold'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                Checked In
              </button>

              <button
                disabled={isUpdating}
                onClick={() => handleSaveStatus('completed')}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                  currentStatus === 'completed'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                Completed
              </button>

              <button
                disabled={isUpdating}
                onClick={() => handleSaveStatus('cancelled')}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                  currentStatus === 'cancelled'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40 font-semibold'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                Cancelled
              </button>
            </div>

            {saveSuccess && (
              <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Status updated successfully
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-zinc-800 bg-[#151518] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
