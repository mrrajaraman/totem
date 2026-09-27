import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Users, Check, ShieldCheck, Sparkles, ChevronDown, ChevronLeft, ChevronRight, X, Phone, Mail, User, ArrowRight, Lock } from 'lucide-react';
import { WORLDS_DATA } from '../../data/worldsData';

interface SlotReservationWidgetProps {
  initialGroupSize?: number;
  initialGame?: string;
  className?: string;
}

const REVIEWS = [
  {
    quote: "Hands-down the most fun VR spot I've been to in Bangalore. Me and my friends couldn't stop laughing and cheering. We had an amazing time from start to finish.",
    author: "Sumithlal S",
    source: "Google Review"
  },
  {
    quote: "First ever immersive gaming experience in Bangalore and finally there's something better than pubs, cafes and bars. 4 hours went like 10 mins.",
    author: "Manish Shetty",
    source: "Google Review"
  },
  {
    quote: "Worth spending your money. Must visit gaming place in Bengaluru.",
    author: "Santha Vignesh",
    source: "Google Review"
  },
  {
    quote: "It genuinely felt like stepping into a completely different world. You get so absorbed that, once it's over, it actually takes a moment to come back to reality.",
    author: "Nanditha N",
    source: "Google Review"
  }
];

const TIME_SLOTS = [
  { label: '11:00 AM', status: 'available' },
  { label: '12:30 PM', status: 'available' },
  { label: '2:00 PM', status: 'filling' },
  { label: '3:30 PM', status: 'available' },
  { label: '5:00 PM', status: 'filling' },
  { label: '6:30 PM', status: 'available' },
  { label: '8:00 PM', status: 'available' },
  { label: '9:30 PM', status: 'available' }
];

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const SlotReservationWidget: React.FC<SlotReservationWidgetProps> = ({
  initialGroupSize = 4,
  initialGame = 'decide-at-venue',
  className = ''
}) => {
  // State
  const [groupSize, setGroupSize] = useState<number>(initialGroupSize);
  const [selectedGameKey, setSelectedGameKey] = useState<string>(initialGame);
  const [isGameDropdownOpen, setIsGameDropdownOpen] = useState<boolean>(false);
  
  // Date state
  const today = useMemo(() => new Date(), []);
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(today);
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    // Default to tomorrow or today
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [selectedTime, setSelectedTime] = useState<string>('6:30 PM');

  // Contact Details
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  // Review index
  const [reviewIdx, setReviewIdx] = useState<number>(0);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>('');

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Rotate review every 5.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIdx((prev) => (prev + 1) % REVIEWS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsGameDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Game list builder
  const gameOptions = useMemo(() => {
    const list = [
      {
        key: 'decide-at-venue',
        displayName: 'Decide at venue (Recommended)',
        price: 799,
        duration: 'Flexible (15-45 min)',
        tagline: 'Choose or switch games upon arrival after host briefing'
      }
    ];

    WORLDS_DATA.forEach((w) => {
      list.push({
        key: w.slug,
        displayName: w.title,
        price: w.duration.includes('45') ? 1499 : 999,
        duration: w.duration,
        tagline: w.tagline
      });
    });

    return list;
  }, []);

  const selectedGame = useMemo(() => {
    return gameOptions.find((g) => g.key === selectedGameKey) || gameOptions[0];
  }, [gameOptions, selectedGameKey]);

  // Check weekday offer eligibility (Tue=2, Wed=3, Thu=4 and 4-6 people)
  const isWeekdayOfferActive = useMemo(() => {
    if (!selectedDate) return false;
    const day = selectedDate.getDay();
    const isTueWedThu = day === 2 || day === 3 || day === 4;
    return isTueWedThu && groupSize >= 4 && groupSize <= 6;
  }, [selectedDate, groupSize]);

  // Pricing calculations
  const perPersonPrice = selectedGame.price;
  const payablePersons = isWeekdayOfferActive ? Math.max(1, groupSize - 1) : groupSize;
  const originalSubtotal = groupSize * perPersonPrice;
  const discountedSubtotal = payablePersons * perPersonPrice;
  const discountSavings = originalSubtotal - discountedSubtotal;
  const advanceLockDeposit = 354; // Flat ₹354 online deposit to lock slot
  const balanceAtVenue = Math.max(0, discountedSubtotal - advanceLockDeposit);

  // Calendar logic
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  const monthName = currentMonthDate.toLocaleString('default', { month: 'long' });

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    const newDate = new Date(year, month - 1, 1);
    if (newDate >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setCurrentMonthDate(newDate);
    }
  };

  const nextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const handleSelectDay = (day: number) => {
    const newDate = new Date(year, month, day);
    // Ignore past dates
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (newDate < startOfToday) return;

    setSelectedDate(newDate);
  };

  // WhatsApp CTA link generator
  const whatsappUrl = useMemo(() => {
    const dateStr = selectedDate
      ? selectedDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
      : '—';
    const text = encodeURIComponent(
      `Hi Totem! I'd like to book a VR session:\n\n• Game: ${selectedGame.displayName}\n• Group size: ${groupSize} players\n• Date: ${dateStr}\n• Time: ${selectedTime || '—'}\n• Name: ${name || '—'}\n• Phone: ${phone || '—'}\n\nPlease confirm my slot!`
    );
    return `https://wa.me/917337838303?text=${text}`;
  }, [selectedGame, groupSize, selectedDate, selectedTime, name, phone]);

  // Form validation & submission
  const handleLockSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!name.trim()) errors.name = 'Please enter your name';
    if (!phone.trim()) {
      errors.phone = 'Please enter your phone number';
    } else if (!/^[0-9]{10}$/.test(phone.replace(/[^0-9]/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit number';
    }
    if (!email.trim()) {
      errors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const randomCode = 'TTM-' + Math.floor(100000 + Math.random() * 900000);
      setConfirmedBookingId(randomCode);
      setIsSuccessModalOpen(true);
    }, 900);
  };

  return (
    <section id="book" className={`relative bg-[#070710] py-20 md:py-28 overflow-hidden border-t border-[#1C1C24] ${className}`}>
      {/* Background radial glow */}
      <div 
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[1200px] h-[650px] opacity-40 blur-3xl rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(57,255,20,0.18) 0%, rgba(57,255,20,0.02) 50%, transparent 75%)'
        }}
        aria-hidden="true"
      />

      {/* Top subtle highlight line */}
      <div 
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent 5%, rgba(57,255,20,0.4) 50%, transparent 95%)'
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#39FF14] mb-3 flex items-center gap-2">
            <span className="w-6 h-[1px] bg-[#39FF14]" />
            Reserve Your Session
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[0.95]">
            Lock your <em className="italic font-bold text-[#39FF14] not-italic">slot.</em>
          </h2>
          <p className="text-[#A3A3A3] text-sm sm:text-base mt-3 max-w-2xl">
            Choose your squad size, pick a date &amp; time, and lock the arena for just ₹354. Remaining balance settled at the venue via UPI or Card.
          </p>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 xl:gap-12 items-start">
          {/* LEFT: Interactive Step Form */}
          <div className="bg-[#0B0B14] border border-[#20202E] rounded-2xl p-6 sm:p-8 xl:p-10 shadow-2xl flex flex-col space-y-8">
            
            {/* Weekday Offer Banner Card */}
            <div 
              className={`p-4 sm:p-5 rounded-xl border transition-all duration-300 flex items-center justify-between gap-4 ${
                isWeekdayOfferActive
                  ? 'bg-[#39FF14]/10 border-[#39FF14]/60 shadow-[0_0_20px_-4px_rgba(57,255,20,0.25)]'
                  : 'bg-[#151522] border-[#2B2B3D]'
              }`}
            >
              <div className="flex items-start sm:items-center gap-3">
                <span 
                  className={`font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shrink-0 transition-colors ${
                    isWeekdayOfferActive
                      ? 'bg-[#39FF14] text-black'
                      : 'bg-[#39FF14]/20 text-[#39FF14] border border-[#39FF14]/30'
                  }`}
                >
                  {isWeekdayOfferActive ? '✓ Offer Applied' : 'Weekday Offer'}
                </span>
                <p className="text-xs sm:text-sm text-white/90 leading-snug">
                  Weekday deal: bring 4–6 people on <strong>Tue, Wed, or Thu</strong> and <strong>1 person plays free</strong>.
                </p>
              </div>

              {isWeekdayOfferActive && (
                <span className="hidden sm:inline-flex text-xs font-mono font-bold text-[#39FF14] shrink-0">
                  Save ₹{selectedGame.price}
                </span>
              )}
            </div>

            {/* STEP 1: Group Size */}
            <div className="border-b border-[#1E1E2A] pb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-[#39FF14] text-black font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <span className="text-white font-semibold text-base sm:text-lg">
                  How many people?
                </span>
              </div>

              <div className="grid grid-cols-6 gap-2 sm:gap-3 max-w-sm w-full">
                {[1, 2, 3, 4, 5, 6].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setGroupSize(size)}
                    className={`h-11 sm:h-14 w-full rounded-xl font-mono text-sm sm:text-lg font-bold transition-all duration-200 flex items-center justify-center ${
                      groupSize === size
                        ? 'bg-[#39FF14] text-black shadow-[0_0_16px_rgba(57,255,20,0.4)] scale-105'
                        : 'bg-[#151522] text-[#C9C6C1] border border-[#272738] hover:border-[#39FF14]/50 hover:text-white active:scale-95'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#71717A] mt-3">
                Max 6 players simultaneously inside the free-roam arena. For larger groups (7 to 50+), explore our <a href="/corporate" className="text-[#39FF14] hover:underline">Corporate Outings</a> or <a href="/birthday" className="text-[#39FF14] hover:underline">Birthday Bashes</a>.
              </p>
            </div>

            {/* OPTIONAL STEP: Which Game? */}
            <div className="border-b border-[#1E1E2A] pb-8 relative" ref={dropdownRef}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#20202E] text-[#A3A3A3] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    *
                  </span>
                  <span className="text-white font-semibold text-base sm:text-lg">
                    Which game?
                  </span>
                  <span className="font-mono text-xs text-[#71717A]">· optional</span>
                </div>
              </div>

              {/* Custom Dropdown Trigger */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsGameDropdownOpen(!isGameDropdownOpen)}
                  className="w-full h-12 sm:h-14 px-4 bg-[#151522] border border-[#272738] hover:border-[#39FF14]/50 rounded-xl text-left flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3 overflow-hidden min-w-0">
                    <span className="text-white font-medium text-xs sm:text-base truncate">
                      {selectedGame.displayName}
                    </span>
                    <span className="font-mono text-[11px] sm:text-xs text-[#39FF14] shrink-0">
                      ₹{selectedGame.price}/person
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[#A3A3A3] group-hover:text-white transition-transform shrink-0 ml-2 ${isGameDropdownOpen ? 'rotate-180 text-[#39FF14]' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isGameDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 right-0 top-full mt-2 bg-[#12121D] border border-[#2E2E42] rounded-xl shadow-2xl max-h-72 overflow-y-auto z-50 p-2 space-y-1"
                    >
                      {gameOptions.map((g) => (
                        <button
                          key={g.key}
                          type="button"
                          onClick={() => {
                            setSelectedGameKey(g.key);
                            setIsGameDropdownOpen(false);
                          }}
                          className={`w-full text-left p-3 rounded-lg flex items-center justify-between transition-colors ${
                            selectedGameKey === g.key
                              ? 'bg-[#39FF14]/15 text-[#39FF14] border border-[#39FF14]/30'
                              : 'text-white/80 hover:bg-[#1A1A2A] hover:text-white'
                          }`}
                        >
                          <div>
                            <div className="text-sm font-semibold">{g.displayName}</div>
                            <div className="text-xs text-[#71717A] truncate max-w-xs">{g.tagline}</div>
                          </div>
                          <div className="text-right shrink-0 ml-3">
                            <span className="font-mono text-xs font-bold block">₹{g.price}</span>
                            <span className="text-[10px] font-mono text-[#71717A]">{g.duration}</span>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <p className="text-xs text-[#71717A] mt-2.5">
                You can always change your game at the venue after testing the headsets with your host.
              </p>
            </div>

            {/* STEP 2: Pick Date & Time */}
            <div className="border-b border-[#1E1E2A] pb-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-7 h-7 rounded-full bg-[#39FF14] text-black font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <span className="text-white font-semibold text-base sm:text-lg">
                  Pick a date and time
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 sm:gap-8">
                {/* Mini Month Calendar */}
                <div className="bg-[#13131F] border border-[#232333] rounded-xl p-3 sm:p-4 max-w-[320px] mx-auto md:mx-0 w-full">
                  {/* Cal Nav */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      type="button"
                      onClick={prevMonth}
                      className="w-8 h-8 rounded-lg border border-[#2A2A3D] text-[#C9C6C1] hover:border-white hover:text-white flex items-center justify-center transition-colors"
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-semibold text-white font-mono">
                      {monthName} {year}
                    </span>
                    <button
                      type="button"
                      onClick={nextMonth}
                      className="w-8 h-8 rounded-lg border border-[#2A2A3D] text-[#C9C6C1] hover:border-white hover:text-white flex items-center justify-center transition-colors"
                      aria-label="Next month"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Day of Week Row */}
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {DAYS_OF_WEEK.map((dow, idx) => {
                      const isOfferDOW = idx === 2 || idx === 3 || idx === 4;
                      return (
                        <div
                          key={dow}
                          className={`font-mono text-[10px] py-1 font-bold ${
                            isOfferDOW ? 'text-[#39FF14]' : 'text-[#71717A]'
                          }`}
                        >
                          {dow}
                        </div>
                      );
                    })}
                  </div>

                  {/* Days Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {/* Blank slots before 1st day */}
                    {[...Array(firstDayOfMonth)].map((_, i) => (
                      <div key={`blank-${i}`} className="w-8 h-8" />
                    ))}

                    {/* Month Days */}
                    {[...Array(daysInMonth)].map((_, i) => {
                      const dayNum = i + 1;
                      const dayDate = new Date(year, month, dayNum);
                      const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                      const isPast = dayDate < startOfToday;
                      const isTodayDate = dayDate.getTime() === startOfToday.getTime();
                      const isSelected =
                        selectedDate &&
                        selectedDate.getFullYear() === year &&
                        selectedDate.getMonth() === month &&
                        selectedDate.getDate() === dayNum;
                      const dow = dayDate.getDay();
                      const isOfferDay = dow === 2 || dow === 3 || dow === 4;

                      return (
                        <button
                          key={dayNum}
                          type="button"
                          disabled={isPast}
                          onClick={() => handleSelectDay(dayNum)}
                          className={`w-8 h-8 rounded-lg text-xs font-mono font-medium transition-all flex items-center justify-center relative ${
                            isPast
                              ? 'text-[#444455] opacity-40 cursor-not-allowed'
                              : isSelected
                              ? 'bg-[#39FF14] text-black font-bold shadow-[0_0_12px_rgba(57,255,20,0.5)] z-10'
                              : isTodayDate
                              ? 'border border-[#39FF14]/60 text-white font-bold bg-[#39FF14]/10'
                              : isOfferDay
                              ? 'bg-[#39FF14]/10 text-white hover:bg-[#39FF14]/20'
                              : 'text-white/80 hover:bg-[#202030] hover:text-white'
                          }`}
                        >
                          {dayNum}
                          {isOfferDay && !isPast && !isSelected && (
                            <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#39FF14]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Timeslots */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-mono text-xs uppercase tracking-wider text-[#A3A3A3]">
                      Available Slots
                    </p>
                    {selectedDate && (
                      <span className="text-xs font-mono text-[#39FF14]">
                        {selectedDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const isSel = selectedTime === slot.label;
                      return (
                        <button
                          key={slot.label}
                          type="button"
                          onClick={() => setSelectedTime(slot.label)}
                          className={`h-12 rounded-xl px-3 font-mono text-xs font-semibold flex flex-col items-center justify-center transition-all ${
                            isSel
                              ? 'bg-[#39FF14] text-black shadow-[0_0_14px_rgba(57,255,20,0.4)] font-bold'
                              : 'bg-[#151522] border border-[#272738] text-white/90 hover:border-[#39FF14]/40 hover:text-white'
                          }`}
                        >
                          <span>{slot.label}</span>
                          <span className={`text-[9px] font-mono tracking-tighter ${isSel ? 'text-black/80' : 'text-[#39FF14]'}`}>
                            {slot.status === 'filling' ? '● 2 left' : 'Open'}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-[#12121C] border border-[#20202E] flex items-center gap-2.5 text-xs text-[#A3A3A3]">
                    <Clock className="w-4 h-4 text-[#39FF14] shrink-0" />
                    <span>Please arrive 10 minutes prior for headset calibration and the squad tactical briefing.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3: Your Details */}
            <form onSubmit={handleLockSlot} className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-7 h-7 rounded-full bg-[#39FF14] text-black font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <span className="text-white font-semibold text-base sm:text-lg">
                  Your details
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Name */}
                <div>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: '' });
                      }}
                      className={`w-full h-12 pl-10 pr-4 bg-[#151522] border rounded-xl text-white text-sm outline-none transition-colors ${
                        fieldErrors.name ? 'border-red-500' : 'border-[#272738] focus:border-[#39FF14]'
                      }`}
                    />
                  </div>
                  {fieldErrors.name && (
                    <p className="text-red-400 text-xs mt-1 pl-1">{fieldErrors.name}</p>
                  )}
                </div>

                {/* Mobile */}
                <div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="Mobile number (10 digits)"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: '' });
                      }}
                      className={`w-full h-12 pl-10 pr-4 bg-[#151522] border rounded-xl text-white text-sm outline-none transition-colors ${
                        fieldErrors.phone ? 'border-red-500' : 'border-[#272738] focus:border-[#39FF14]'
                      }`}
                    />
                  </div>
                  {fieldErrors.phone && (
                    <p className="text-red-400 text-xs mt-1 pl-1">{fieldErrors.phone}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                      }}
                      className={`w-full h-12 pl-10 pr-4 bg-[#151522] border rounded-xl text-white text-sm outline-none transition-colors ${
                        fieldErrors.email ? 'border-red-500' : 'border-[#272738] focus:border-[#39FF14]'
                      }`}
                    />
                  </div>
                  {fieldErrors.email && (
                    <p className="text-red-400 text-xs mt-1 pl-1">{fieldErrors.email}</p>
                  )}
                </div>
              </div>

              <p className="font-mono text-[11px] text-[#71717A] uppercase tracking-wider">
                Booking confirmation and WhatsApp calendar invite will be sent to these details.
              </p>
            </form>

          </div>

          {/* RIGHT: Live Booking Summary Card */}
          <div className="bg-[#0B0B14] border border-[#20202E] rounded-2xl shadow-2xl flex flex-col sticky top-24 overflow-hidden">
            
            {/* Header Body */}
            <div className="p-6 sm:p-7 border-b border-[#1E1E2A]">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#71717A] mb-4">
                Your Booking Summary
              </p>

              <div className="space-y-3.5 text-sm">
                <div className="flex justify-between items-center py-1 border-b border-[#1A1A26]">
                  <span className="text-[#A3A3A3]">Game:</span>
                  <span className="text-white font-medium text-right truncate max-w-[200px]">
                    {selectedGame.displayName}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-[#1A1A26]">
                  <span className="text-[#A3A3A3]">Squad Size:</span>
                  <span className="text-white font-medium">
                    {groupSize} {groupSize === 1 ? 'Player' : 'Players'}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-[#1A1A26]">
                  <span className="text-[#A3A3A3]">Date &amp; Time:</span>
                  <span className="text-white font-medium text-right">
                    {selectedDate ? selectedDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }) : 'Select Date'} · {selectedTime}
                  </span>
                </div>

                {/* Offer Highlight Row if active */}
                {isWeekdayOfferActive && (
                  <div className="bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-lg p-2.5 flex items-center justify-between text-xs">
                    <span className="text-[#39FF14] font-medium flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      1 Player Plays Free
                    </span>
                    <span className="font-mono text-[#39FF14] font-bold">
                      -₹{discountSavings}
                    </span>
                  </div>
                )}

                {/* Total breakdown */}
                <div className="pt-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-[#A3A3A3]">Total Game Fee:</span>
                    <div className="text-right">
                      {isWeekdayOfferActive && (
                        <span className="text-xs text-[#71717A] line-through block font-mono">
                          ₹{originalSubtotal}
                        </span>
                      )}
                      <span className="text-2xl font-black text-white tracking-tight">
                        ₹{discountedSubtotal}
                      </span>
                      <span className="text-[10px] font-mono text-[#71717A] block">
                        + 18% GST settled at venue
                      </span>
                    </div>
                  </div>
                </div>

                {/* Split Breakdown */}
                <div className="mt-4 p-3 rounded-xl bg-[#141420] border border-[#232334] space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-center text-white">
                    <span className="text-[#39FF14] font-bold">Pay Now to Lock Slot:</span>
                    <span className="bg-[#39FF14] text-black font-bold px-2 py-0.5 rounded text-xs shadow-sm">
                      ₹{advanceLockDeposit}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[#71717A]">
                    <span>Balance at Venue:</span>
                    <span>₹{balanceAtVenue}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Actions Section */}
            <div className="p-6 sm:p-7 space-y-3.5">
              <div className="p-3 rounded-xl bg-[#39FF14]/10 border border-[#39FF14]/30 text-xs text-[#C9C6C1] leading-relaxed">
                Pay <strong>₹354</strong> now to guarantee your private arena reservation. Remaining balance settled on-site via UPI or Card.
              </div>

              {/* Primary Lock CTA */}
              <button
                type="button"
                onClick={handleLockSlot}
                disabled={isSubmitting}
                className="w-full h-14 rounded-xl bg-[#39FF14] hover:bg-[#32e012] text-black font-bold text-sm uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-[1.02] shadow-[0_0_24px_rgba(57,255,20,0.35)] disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Securing Arena Slot...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay ₹354 to Lock Slot</span>
                  </>
                )}
              </button>

              <p className="font-mono text-[10px] text-center text-[#71717A] uppercase tracking-wider">
                Instant confirmation · 100% Free cancellation 24h
              </p>

              {/* WhatsApp Alternative */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 rounded-xl bg-[#25D366]/10 border border-[#25D366]/40 hover:bg-[#25D366]/20 text-[#25D366] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <span>Book via WhatsApp instead</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Social Proof Google Review Carousel */}
            <div className="bg-[#08080F] border-t border-[#1C1C28] p-5">
              <div className="flex items-center gap-1 text-[#F5A623] text-xs mb-2">
                ★★★★★
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={reviewIdx}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xs text-[#C9C6C1] italic leading-relaxed line-clamp-3 mb-2">
                    &ldquo;{REVIEWS[reviewIdx].quote}&rdquo;
                  </p>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#71717A]">
                    {REVIEWS[reviewIdx].author} · {REVIEWS[reviewIdx].source}
                  </span>
                </motion.div>
              </AnimatePresence>

              <div className="mt-4 pt-3 border-t border-[#1C1C28] flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[#71717A]">
                <span>UPI &amp; All Cards</span>
                <span>·</span>
                <span>Free Cancellation 24h</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0E0E18] border border-[#39FF14]/50 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-[0_0_50px_rgba(57,255,20,0.25)] relative text-center"
            >
              <button
                type="button"
                onClick={() => setIsSuccessModalOpen(false)}
                className="absolute top-4 right-4 text-[#71717A] hover:text-white p-2"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-[#39FF14]/20 border border-[#39FF14] text-[#39FF14] flex items-center justify-center mx-auto mb-5">
                <Check className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight mb-2">
                Slot Locked &amp; Reserved!
              </h3>
              
              <div className="font-mono text-xs text-[#39FF14] bg-[#39FF14]/10 border border-[#39FF14]/30 py-1.5 px-3 rounded-full inline-block mb-4">
                Booking ID: {confirmedBookingId}
              </div>

              <p className="text-sm text-[#A3A3A3] mb-6">
                Your private arena slot has been locked for <strong className="text-white">{groupSize} players</strong> on <strong className="text-white">{selectedDate?.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} at {selectedTime}</strong>.
              </p>

              <div className="bg-[#141422] rounded-xl p-4 text-xs font-mono text-left space-y-2 mb-6 border border-[#232338]">
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Game:</span>
                  <span className="text-white font-semibold">{selectedGame.displayName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Deposit Paid:</span>
                  <span className="text-[#39FF14] font-semibold">₹{advanceLockDeposit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Remaining at Venue:</span>
                  <span className="text-white font-semibold">₹{balanceAtVenue} + GST</span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-[#39FF14] text-black font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#32e012] transition-colors"
                >
                  <span>Open Confirmation on WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setIsSuccessModalOpen(false)}
                  className="w-full py-2.5 rounded-xl border border-[#272738] text-[#C9C6C1] hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Booking Bar (Visible only on mobile/tablet) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0B14]/95 backdrop-blur-xl border-t border-[#20202E] p-3 px-4 flex items-center justify-between gap-3 shadow-[0_-8px_24px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col">
          <span className="font-mono text-[9px] text-[#A3A3A3] uppercase tracking-wider">Deposit to Lock</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-white font-mono">₹{advanceLockDeposit}</span>
            <span className="text-[10px] text-[#39FF14] font-mono">({groupSize} {groupSize === 1 ? 'player' : 'players'})</span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLockSlot}
          className="h-11 px-5 rounded-xl bg-[#39FF14] hover:bg-[#32e012] text-black font-bold font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_16px_rgba(57,255,20,0.35)] active:scale-95 transition-transform"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Lock Slot</span>
        </button>
      </div>
    </section>
  );
};
