import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  ChevronDown, 
  Check, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { DbBooking, supabase } from '../../lib/supabase';
import { WORLDS_DATA } from '../../data/worldsData';

interface BookingSlideOverDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  booking: DbBooking | null;
  initialDate?: string;
  initialTime?: string;
  initialArena?: string;
  onSave: (booking: DbBooking) => void;
}

const AVAILABLE_TIMES = [
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

// FAANG-grade field validators
const isValidName = (val: string): boolean => {
  const trimmed = val.trim();
  // Name must be at least 2 chars, letters, spaces, hyphens, periods, or apostrophes
  return trimmed.length >= 2 && /^[\p{L}\s.'-]+$/u.test(trimmed);
};

const isValidPhone = (val: string): boolean => {
  const digits = val.replace(/\D/g, '');
  // Standard 10-digit Indian mobile starting with 6, 7, 8, 9, or with +91 (12 digits)
  if (digits.length === 10 && /^[6-9]/.test(digits)) return true;
  if (digits.length === 12 && digits.startsWith('91') && /^[6-9]/.test(digits.slice(2))) return true;
  return false;
};

const isValidEmail = (val: string): boolean => {
  const trimmed = val.trim();
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed);
};

export const BookingSlideOverDrawer: React.FC<BookingSlideOverDrawerProps> = ({
  isOpen,
  onClose,
  booking,
  initialDate,
  initialTime,
  initialArena = 'Arena 1',
  onSave,
}) => {
  const isEditing = !!booking;

  const [date, setDate] = useState(() => booking?.session_date || initialDate || new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(() => booking?.session_time || initialTime || '10:00 AM');
  const [arena, setArena] = useState(() => initialArena || 'Arena 1');
  const [worldSlug, setWorldSlug] = useState(() => booking?.world_slug || 'station-zarya');
  const [squadSize, setSquadSize] = useState(() => booking?.squad_size || 4);
  const [leadName, setLeadName] = useState(() => booking?.lead_guest_name || '');
  const [leadPhone, setLeadPhone] = useState(() => booking?.lead_guest_phone || '');
  const [leadEmail, setLeadEmail] = useState(() => booking?.lead_guest_email || '');
  const [status, setStatus] = useState<'pending_lock' | 'locked' | 'checked_in' | 'completed' | 'cancelled'>(
    () => booking?.status || 'locked'
  );
  const [notes, setNotes] = useState(() => booking?.special_notes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Field touched state for validation
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
  });

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Custom sleek dropdown states
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);
  const [worldDropdownOpen, setWorldDropdownOpen] = useState(false);

  const timeDropdownRef = useRef<HTMLDivElement>(null);
  const worldDropdownRef = useRef<HTMLDivElement>(null);

  // Computed error messages
  const getNameError = (): string => {
    if (!leadName.trim()) return 'Guest name is required';
    if (leadName.trim().length < 2) return 'Name must be at least 2 characters';
    if (!isValidName(leadName)) return 'Please enter a valid name (letters only)';
    return '';
  };

  const getPhoneError = (): string => {
    if (!leadPhone.trim()) return 'Mobile number is required';
    if (!isValidPhone(leadPhone)) return 'Enter a valid 10-digit mobile (e.g. 98450 12345)';
    return '';
  };

  const getEmailError = (): string => {
    if (!leadEmail.trim()) return 'Email address is required';
    if (!isValidEmail(leadEmail)) return 'Enter a valid email (e.g. guest@example.com)';
    return '';
  };

  const nameError = getNameError();
  const phoneError = getPhoneError();
  const emailError = getEmailError();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (timeDropdownRef.current && !timeDropdownRef.current.contains(e.target as Node)) {
        setTimeDropdownOpen(false);
      }
      if (worldDropdownRef.current && !worldDropdownRef.current.contains(e.target as Node)) {
        setWorldDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    if (booking) {
      setDate(booking.session_date);
      setTime(booking.session_time);
      setWorldSlug(booking.world_slug || 'station-zarya');
      setSquadSize(booking.squad_size || 4);
      setLeadName(booking.lead_guest_name || '');
      setLeadPhone(booking.lead_guest_phone || '');
      setLeadEmail(booking.lead_guest_email || '');
      setStatus(booking.status || 'locked');
      setNotes(booking.special_notes || '');
    } else {
      if (initialDate) setDate(initialDate);
      if (initialTime) setTime(initialTime);
      if (initialArena) setArena(initialArena);
      setLeadName('');
      setLeadPhone('');
      setLeadEmail('');
      setStatus('locked');
      setNotes('');
    }
    setTouched({ name: false, phone: false, email: false });
  }, [booking, initialDate, initialTime, initialArena]);

  if (!isOpen) return null;

  // Pricing arithmetic
  const pricePerPlayer = 1999;
  const isWeekday = () => {
    const day = new Date(date).getDay();
    return day >= 2 && day <= 4; // Tue, Wed, Thu
  };
  const isOfferEligible = isWeekday() && squadSize >= 4;
  const payablePlayers = isOfferEligible ? squadSize - 1 : squadSize;
  const totalFee = payablePlayers * pricePerPlayer;
  const deposit = 354;
  const balanceDue = Math.max(0, totalFee - deposit);

  const selectedWorld = WORLDS_DATA.find((w) => w.slug === worldSlug);
  const selectedWorldTitle = selectedWorld?.title || booking?.world_title || 'Station Zarya';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger touched for all inputs to highlight any errors
    setTouched({ name: true, phone: true, email: true });

    const curNameErr = getNameError();
    const curPhoneErr = getPhoneError();
    const curEmailErr = getEmailError();

    if (curNameErr) {
      nameInputRef.current?.focus();
      return;
    }
    if (curPhoneErr) {
      phoneInputRef.current?.focus();
      return;
    }
    if (curEmailErr) {
      emailInputRef.current?.focus();
      return;
    }

    setIsSubmitting(true);

    const bookingCode = booking?.booking_code || `TOTEM-${Math.floor(10000 + Math.random() * 90000)}`;

    const bookingPayload: DbBooking = {
      id: booking?.id,
      booking_code: bookingCode,
      lead_guest_name: leadName.trim(),
      lead_guest_phone: leadPhone.trim(),
      lead_guest_email: leadEmail.trim(),
      squad_size: squadSize,
      world_slug: worldSlug,
      world_title: selectedWorldTitle,
      session_date: date,
      session_time: time,
      status: status,
      slot_lock_deposit: deposit,
      total_game_fee: totalFee,
      discount_amount: isOfferEligible ? pricePerPlayer : 0,
      is_weekday_offer_applied: isOfferEligible,
      balance_due_at_venue: balanceDue,
      special_notes: notes.trim(),
      created_at: booking?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      if (booking?.id) {
        await supabase.from('bookings').update(bookingPayload).eq('id', booking.id);
      } else {
        await supabase.from('bookings').insert([bookingPayload]);
      }
    } catch (err) {
      console.warn('Supabase sync notice:', err);
    }

    onSave(bookingPayload);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 500);
    setIsSubmitting(false);
  };

  const sendWhatsApp = () => {
    const cleanPhone = leadPhone.replace(/[^0-9]/g, '');
    const phone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const msg = `Hi ${leadName}! 🥽 Your Totem VR Arena booking (${booking?.booking_code || 'TOTEM'}) is confirmed!

Date: ${date}
Time: ${time}
Arena: ${arena}
Game: ${selectedWorldTitle}
Squad: ${squadSize} Players
Slot Lock Deposit: ₹${deposit} (Received)
Balance Due at Venue: ₹${balanceDue}

Location: Totem VR Arena, 3rd Floor, 80 Feet Rd, 4th Block, Koramangala, Bengaluru.
Google Maps: https://maps.app.goo.gl/totemvr

Please arrive 15 minutes before your slot for briefing & calibration!`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="flex-1" onClick={onClose} />

      {/* Slide-over panel */}
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-gray-200 z-10 animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-2.5">
            <h2 className="text-base font-semibold text-black tracking-tight">
              {isEditing ? 'Booking Details' : 'New Booking'}
            </h2>
            {isEditing && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-gray-100 text-gray-600 font-medium">
                {booking.booking_code}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form 
          onSubmit={handleSubmit} 
          noValidate 
          id="booking-drawer-form" 
          className="flex-1 overflow-y-auto light-scroll px-6 py-5 space-y-5"
        >
          {/* Schedule: Date & Time in one row */}
          <div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-9 px-3 border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-gray-900 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Time Slot
                </label>
                <div className="relative" ref={timeDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setTimeDropdownOpen(!timeDropdownOpen)}
                    className="w-full h-9 px-3 border border-gray-200 rounded-lg text-xs text-gray-900 bg-white flex items-center justify-between hover:border-gray-300 focus:outline-none focus:border-gray-900 transition-colors text-left"
                  >
                    <span>{time}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${timeDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {timeDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-52 overflow-y-auto light-scroll py-1">
                      {AVAILABLE_TIMES.map((slot) => {
                        const isSelected = time === slot;
                        return (
                          <button
                            type="button"
                            key={slot}
                            onClick={() => {
                              setTime(slot);
                              setTimeDropdownOpen(false);
                            }}
                            className={`w-full px-3 py-2 text-xs text-left flex items-center justify-between hover:bg-gray-50 transition-colors ${
                              isSelected ? 'font-semibold text-black bg-gray-50' : 'text-gray-700'
                            }`}
                          >
                            <span>{slot}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-black shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Arena: Clean Segmented Control */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Arena
            </label>
            <div className="grid grid-cols-2 p-1 bg-gray-100 rounded-lg gap-1">
              {[
                { key: 'Arena 1', label: 'Arena 1 · Free-Roam' },
                { key: 'Arena 2', label: 'Arena 2 · Tactical' },
              ].map((ar) => {
                const isSelected = arena.includes(ar.key);
                return (
                  <button
                    type="button"
                    key={ar.key}
                    onClick={() => setArena(ar.key)}
                    className={`py-1.5 px-3 rounded-md text-xs transition-all text-center ${
                      isSelected
                        ? 'bg-white text-black font-semibold shadow-xs'
                        : 'text-gray-500 hover:text-black font-medium'
                    }`}
                  >
                    {ar.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* VR Experience Dropdown */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Experience
            </label>
            <div className="relative" ref={worldDropdownRef}>
              <button
                type="button"
                onClick={() => setWorldDropdownOpen(!worldDropdownOpen)}
                className="w-full h-9 px-3 border border-gray-200 rounded-lg text-xs text-gray-900 bg-white flex items-center justify-between hover:border-gray-300 focus:outline-none focus:border-gray-900 transition-colors text-left"
              >
                <span className="truncate">
                  {selectedWorldTitle} {selectedWorld?.category ? `(${selectedWorld.category})` : ''}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform shrink-0 ml-2 ${worldDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {worldDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-56 overflow-y-auto light-scroll py-1">
                  {WORLDS_DATA.map((w) => {
                    const isSelected = worldSlug === w.slug;
                    return (
                      <button
                        type="button"
                        key={w.slug}
                        onClick={() => {
                          setWorldSlug(w.slug);
                          setWorldDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-xs text-left flex items-center justify-between hover:bg-gray-50 transition-colors ${
                          isSelected ? 'font-semibold text-black bg-gray-50' : 'text-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="truncate">{w.title}</span>
                          <span className="text-[10px] text-gray-400 px-1.5 py-0.5 rounded bg-gray-100 shrink-0">
                            {w.category}
                          </span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-black shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Players: Sleek Number Row */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-gray-700">
                Squad Size
              </label>
              {isOfferEligible && (
                <span className="text-[11px] font-medium text-black flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  1 Player Free Applied
                </span>
              )}
            </div>
            <div className="grid grid-cols-6 gap-1.5">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setSquadSize(num)}
                  className={`py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    squadSize === num
                      ? 'bg-black border-black text-white font-semibold'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Guest Information with FAANG-Grade Real-Time Validation */}
          <div className="pt-2 border-t border-gray-100 space-y-3">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
              Guest Information
            </span>

            {/* Lead Name */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                ref={nameInputRef}
                type="text"
                value={leadName}
                onChange={(e) => {
                  setLeadName(e.target.value);
                  if (!touched.name) setTouched((prev) => ({ ...prev, name: true }));
                }}
                onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                placeholder="Full Name (e.g. Aditya Verma)"
                className={`w-full h-9 px-3 border rounded-lg text-xs text-gray-900 transition-colors focus:outline-none ${
                  touched.name && nameError
                    ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                    : 'border-gray-200 focus:border-gray-900'
                }`}
              />
              {touched.name && nameError && (
                <p className="text-[11px] text-red-500 flex items-center gap-1 mt-1 font-medium">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{nameError}</span>
                </p>
              )}
            </div>

            {/* Phone & Email (2-Column Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Phone */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  ref={phoneInputRef}
                  type="tel"
                  value={leadPhone}
                  onChange={(e) => {
                    setLeadPhone(e.target.value);
                    if (!touched.phone) setTouched((prev) => ({ ...prev, phone: true }));
                  }}
                  onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
                  placeholder="e.g. 98450 12345"
                  className={`w-full h-9 px-3 border rounded-lg text-xs text-gray-900 font-mono transition-colors focus:outline-none ${
                    touched.phone && phoneError
                      ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                      : 'border-gray-200 focus:border-gray-900'
                  }`}
                />
                {touched.phone && phoneError && (
                  <p className="text-[11px] text-red-500 flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{phoneError}</span>
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  ref={emailInputRef}
                  type="email"
                  value={leadEmail}
                  onChange={(e) => {
                    setLeadEmail(e.target.value);
                    if (!touched.email) setTouched((prev) => ({ ...prev, email: true }));
                  }}
                  onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                  placeholder="name@company.com"
                  className={`w-full h-9 px-3 border rounded-lg text-xs text-gray-900 transition-colors focus:outline-none ${
                    touched.email && emailError
                      ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                      : 'border-gray-200 focus:border-gray-900'
                  }`}
                />
                {touched.email && emailError && (
                  <p className="text-[11px] text-red-500 flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{emailError}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Session Status (If Editing) */}
          {isEditing && (
            <div className="pt-2 border-t border-gray-100">
              <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                Status
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { key: 'locked', label: 'Paid' },
                  { key: 'checked_in', label: 'In Arena' },
                  { key: 'completed', label: 'Done' },
                  { key: 'cancelled', label: 'Cancelled' },
                ].map((st) => (
                  <button
                    type="button"
                    key={st.key}
                    onClick={() => setStatus(st.key as any)}
                    className={`py-1.5 rounded-lg text-xs font-medium border text-center transition-colors ${
                      status === st.key
                        ? 'bg-black border-black text-white font-semibold'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Internal Notes */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Internal Note <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Birthday group, corporate event"
              className="w-full h-9 px-3 border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-gray-900 transition-colors"
            />
          </div>

          {/* Minimal Payment Breakdown */}
          <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3.5 space-y-2 text-xs">
            <div className="flex justify-between text-gray-500">
              <span>Game Fee ({squadSize} players)</span>
              <span>₹{(squadSize * pricePerPlayer).toLocaleString('en-IN')}</span>
            </div>
            {isOfferEligible && (
              <div className="flex justify-between text-black font-medium">
                <span>Weekday Promo (1 Player Free)</span>
                <span>-₹{pricePerPlayer.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-500">
              <span>Slot Lock Deposit</span>
              <span className="text-black font-medium">₹{deposit} (Paid)</span>
            </div>
            <div className="pt-2 border-t border-gray-200/60 flex justify-between items-baseline">
              <span className="font-semibold text-gray-900">Balance Due at Venue</span>
              <span className="text-base font-bold text-black font-mono">₹{balanceDue.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white flex items-center justify-between gap-3 shrink-0">
          {isEditing ? (
            <button
              type="button"
              onClick={sendWhatsApp}
              className="px-3.5 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-gray-600" />
              <span>WhatsApp Pass</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:text-black hover:bg-gray-50 text-xs font-medium transition-colors"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            form="booking-drawer-form"
            disabled={isSubmitting}
            className="flex-1 py-2 rounded-lg bg-black hover:bg-neutral-800 text-white text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5"
          >
            {isSubmitting ? (
              <span>Saving...</span>
            ) : saveSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Confirmed</span>
              </>
            ) : (
              <span>{isEditing ? 'Save Changes' : 'Confirm Booking'}</span>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
