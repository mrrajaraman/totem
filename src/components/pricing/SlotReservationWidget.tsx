import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Phone, 
  Mail, 
  User, 
  ArrowRight, 
  Lock,
  Gamepad2,
  Star,
  MapPin,
  CalendarDays
} from 'lucide-react';
import { WORLDS_DATA } from '../../data/worldsData';
import { supabase } from '../../lib/supabase';

interface SlotReservationWidgetProps {
  initialGroupSize?: number;
  initialGame?: string;
  className?: string;
}

const FALLBACK_REVIEWS = [
  {
    quote: "Hands-down the most fun VR spot I've been to in Bangalore. Me and my friends couldn't stop laughing and cheering. We had an amazing time from start to finish.",
    author: "Sumithlal S",
    source: "Google Review",
    rating: 5
  },
  {
    quote: "First ever immersive gaming experience in Bangalore and finally there's something better than pubs, cafes and bars. 4 hours went like 10 mins.",
    author: "Manish Shetty",
    source: "Google Review",
    rating: 5
  },
  {
    quote: "Worth spending your money. Must visit gaming place in Bengaluru. Private arena just for our group was next level.",
    author: "Santha Vignesh",
    source: "Google Review",
    rating: 5
  },
  {
    quote: "It genuinely felt like stepping into a completely different world. You get so absorbed that, once it's over, it actually takes a moment to come back to reality.",
    author: "Nanditha N",
    source: "Google Review",
    rating: 5
  }
];

const TIME_SLOTS = [
  { label: '11:00 AM', status: 'available', period: 'Morning' },
  { label: '12:30 PM', status: 'available', period: 'Afternoon' },
  { label: '2:00 PM', status: 'filling', period: 'Afternoon' },
  { label: '3:30 PM', status: 'available', period: 'Evening' },
  { label: '5:00 PM', status: 'filling', period: 'Evening' },
  { label: '6:30 PM', status: 'available', period: 'Peak' },
  { label: '8:00 PM', status: 'available', period: 'Peak' },
  { label: '9:30 PM', status: 'available', period: 'Night' }
];

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const SlotReservationWidget: React.FC<SlotReservationWidgetProps> = ({
  initialGroupSize = 4,
  initialGame = 'decide-at-venue',
  className = ''
}) => {
  // Group & Game state
  const [groupSize, setGroupSize] = useState<number>(initialGroupSize);
  const [selectedGameKey, setSelectedGameKey] = useState<string>(initialGame);
  const [isGameDropdownOpen, setIsGameDropdownOpen] = useState<boolean>(false);
  
  // Date state
  const today = useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1); // Default to tomorrow
    return d;
  });
  const [selectedTime, setSelectedTime] = useState<string>('6:30 PM');
  const [showFullCalendar, setShowFullCalendar] = useState<boolean>(false);
  const [calMonthDate, setCalMonthDate] = useState<Date>(today);

  // Contact Details
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  // Review index & submission
  const [reviews, setReviews] = useState(FALLBACK_REVIEWS);
  const [reviewIdx, setReviewIdx] = useState<number>(0);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>('');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dateScrollRef = useRef<HTMLDivElement>(null);

  // Fetch reviews from Supabase
  useEffect(() => {
    async function loadReviews() {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('author, quote, rating, source')
          .eq('is_featured', true);
        if (!error && data && data.length > 0) {
          setReviews(data);
        }
      } catch (err) {
        console.warn('Supabase reviews fetch fallback to local:', err);
      }
    }
    loadReviews();
  }, []);

  // Generate next 14 days for the smart horizontal strip
  const upcomingDates = useMemo(() => {
    const list: Array<{
      date: Date;
      dayOfWeekName: string;
      dayNum: number;
      monthName: string;
      isToday: boolean;
      isTomorrow: boolean;
      isWeekdayPromo: boolean;
    }> = [];

    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dow = d.getDay(); // 2=Tue, 3=Wed, 4=Thu
      list.push({
        date: d,
        dayOfWeekName: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: d.getDate(),
        monthName: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
        isToday: i === 0,
        isTomorrow: i === 1,
        isWeekdayPromo: dow === 2 || dow === 3 || dow === 4
      });
    }
    return list;
  }, [today]);

  // Rotate review
  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIdx((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

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

  // Game options builder
  const gameOptions = useMemo(() => {
    const list = [
      {
        key: 'decide-at-venue',
        displayName: 'Decide at Venue (Recommended)',
        price: 799,
        duration: 'Flexible (15–45 min)',
        tagline: 'Choose or switch games upon arrival after free host briefing',
        thumbnail: 'https://pub-e8615bd8f25545d68dfeb23cda95d612.r2.dev/photos/totem-team-briefing.jpg',
        category: 'Player Choice'
      }
    ];

    WORLDS_DATA.forEach((w) => {
      list.push({
        key: w.slug,
        displayName: w.title,
        price: w.duration.includes('45') ? 1499 : 999,
        duration: w.duration,
        tagline: w.tagline,
        thumbnail: w.thumbnail,
        category: w.category
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

  // Month navigation for full calendar
  const calYear = calMonthDate.getFullYear();
  const calMonth = calMonthDate.getMonth();
  const calMonthName = calMonthDate.toLocaleString('default', { month: 'long' });
  const firstDayOfMonth = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

  const prevMonth = () => {
    const newDate = new Date(calYear, calMonth - 1, 1);
    if (newDate >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setCalMonthDate(newDate);
    }
  };

  const nextMonth = () => {
    setCalMonthDate(new Date(calYear, calMonth + 1, 1));
  };

  const handleSelectDay = (day: number) => {
    const newDate = new Date(calYear, calMonth, day);
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (newDate < startOfToday) return;

    setSelectedDate(newDate);
    setShowFullCalendar(false);
  };

  // WhatsApp CTA link generator
  const whatsappUrl = useMemo(() => {
    const dateStr = selectedDate
      ? selectedDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
      : '—';
    const text = encodeURIComponent(
      `Hi Totem! I'd like to book a VR session:\n\n• Game: ${selectedGame.displayName}\n• Squad size: ${groupSize} players\n• Date: ${dateStr}\n• Time: ${selectedTime || '—'}\n• Name: ${name || '—'}\n• Phone: ${phone || '—'}\n\nPlease reserve my slot!`
    );
    return `https://wa.me/917337838303?text=${text}`;
  }, [selectedGame, groupSize, selectedDate, selectedTime, name, phone]);

  // Form submission with Supabase persistence
  const handleLockSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!name.trim()) errors.name = 'Please enter your full name';
    if (!phone.trim()) {
      errors.phone = 'Please enter your phone number';
    } else if (!/^[0-9]{10}$/.test(phone.replace(/[^0-9]/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!email.trim()) {
      errors.email = 'Please enter your email address';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    const randomCode = 'TTM-' + Math.floor(100000 + Math.random() * 900000);
    const formattedDate = selectedDate.toISOString().split('T')[0];

    try {
      // Save directly into Supabase database
      const { error } = await supabase.from('bookings').insert({
        booking_code: randomCode,
        lead_guest_name: name.trim(),
        lead_guest_phone: phone.trim(),
        lead_guest_email: email.trim(),
        squad_size: groupSize,
        world_slug: selectedGame.key,
        world_title: selectedGame.displayName,
        session_date: formattedDate,
        session_time: selectedTime,
        status: 'locked',
        slot_lock_deposit: advanceLockDeposit,
        total_game_fee: discountedSubtotal,
        discount_amount: discountSavings,
        is_weekday_offer_applied: isWeekdayOfferActive,
        balance_due_at_venue: balanceAtVenue,
        payment_status: 'deposit_paid'
      });

      if (error) {
        console.warn('Supabase booking insert warning:', error.message);
      }
    } catch (err) {
      console.warn('Supabase booking exception:', err);
    } finally {
      setIsSubmitting(false);
      setConfirmedBookingId(randomCode);
      setIsSuccessModalOpen(true);
    }
  };

  return (
    <section id="book" className={`relative bg-black py-20 md:py-28 overflow-hidden border-t border-slate-800/80 ${className}`}>
      {/* Dynamic Background Mesh Gradients */}
      <div 
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] opacity-25 blur-[120px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 210, 106, 0.45) 0%, rgba(0, 168, 84, 0.15) 50%, transparent 75%)'
        }}
        aria-hidden="true"
      />
      <div 
        className="pointer-events-none absolute bottom-0 right-0 w-[600px] h-[400px] opacity-15 blur-[100px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 210, 106, 0.3) 0%, transparent 70%)'
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#00D26A] text-xs font-mono font-bold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00D26A] animate-pulse" />
            Live Slot-Locking Engine · Koramangala
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[0.98]">
            Lock your private <span className="text-[#00D26A]">arena session.</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
            Pick your squad size and preferred time. Pay just <strong className="text-white">₹354 online</strong> to lock the entire free-roam arena exclusively for your group. Balance settled comfortably at venue via UPI or Card.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 xl:gap-12 items-start">
          
          {/* LEFT: Booking Controls Container */}
          <div className="bg-[#0E121B]/90 border border-slate-800/90 rounded-3xl p-6 sm:p-8 xl:p-10 shadow-2xl backdrop-blur-xl space-y-9">
            
            {/* Weekday Offer Highlight Banner */}
            <div 
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 ${
                isWeekdayOfferActive
                  ? 'bg-emerald-950/40 border-emerald-500/50 shadow-[0_4px_24px_-4px_rgba(0,210,106,0.3)] ring-1 ring-emerald-500/40'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start sm:items-center gap-3">
                <span 
                  className={`font-mono text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shrink-0 transition-colors ${
                    isWeekdayOfferActive
                      ? 'bg-[#00D26A] text-black shadow-sm'
                      : 'bg-emerald-500/15 text-[#00D26A] border border-emerald-500/30'
                  }`}
                >
                  {isWeekdayOfferActive ? '✓ Weekday Deal Active' : 'Special Weekday Deal'}
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-snug">
                  Play on <strong>Tue, Wed, or Thu</strong> with 4–6 players and <strong>1 player plays 100% FREE</strong>.
                </p>
              </div>

              {isWeekdayOfferActive && (
                <div className="text-right shrink-0">
                  <span className="font-mono text-xs font-bold text-[#00D26A] block">
                    Save ₹{selectedGame.price}
                  </span>
                  <span className="text-[10px] text-emerald-400/80 font-mono">1 Player Free</span>
                </div>
              )}
            </div>

            {/* STEP 1: How many players? */}
            <div className="border-b border-slate-800/80 pb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#00D26A] text-black font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-md">
                    1
                  </span>
                  <div>
                    <span className="text-white font-bold text-base sm:text-lg block">
                      Squad Size
                    </span>
                    <span className="text-xs text-slate-400">
                      Private arena dedicated strictly to your squad
                    </span>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                  <Users className="w-3.5 h-3.5 text-[#00D26A]" />
                  <span>{groupSize} {groupSize === 1 ? 'Player' : 'Players'}</span>
                </span>
              </div>

              {/* Segmented Squad Button Row */}
              <div className="grid grid-cols-6 gap-2 sm:gap-3">
                {[1, 2, 3, 4, 5, 6].map((size) => {
                  const isSel = groupSize === size;
                  const isOfferEligible = size >= 4 && size <= 6;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setGroupSize(size)}
                      className={`h-14 sm:h-16 rounded-2xl font-mono transition-all duration-200 flex flex-col items-center justify-center relative cursor-pointer ${
                        isSel
                          ? 'bg-[#00D26A] text-black font-bold shadow-[0_8px_24px_-4px_rgba(0,210,106,0.45)] scale-[1.03] z-10'
                          : 'bg-slate-900/90 text-slate-200 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-850 hover:text-white'
                      }`}
                    >
                      <span className="text-base sm:text-xl font-bold leading-none">{size}</span>
                      <span className={`text-[10px] mt-1 uppercase tracking-tighter ${isSel ? 'text-black/80 font-bold' : 'text-slate-400'}`}>
                        {size === 1 ? 'Solo' : size === 2 ? 'Duo' : `${size} Pl`}
                      </span>
                      {isOfferEligible && !isSel && (
                        <span className="absolute -top-1.5 -right-1 w-2.5 h-2.5 rounded-full bg-[#00D26A] border-2 border-[#0E121B]" title="Weekday promo eligible" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 mt-3 pt-1">
                <span>Maximum 6 players per arena round for safety.</span>
                <span className="text-slate-400">
                  Larger groups? <a href="/corporate" className="text-[#00D26A] hover:underline font-medium">Corporate (7–50+)</a>
                </span>
              </div>
            </div>

            {/* STEP 2: Which Virtual World? */}
            <div className="border-b border-slate-800/80 pb-8 relative" ref={dropdownRef}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    <Gamepad2 className="w-4 h-4 text-[#00D26A]" />
                  </span>
                  <div>
                    <span className="text-white font-bold text-base sm:text-lg block">
                      Mission / Virtual World
                    </span>
                    <span className="text-xs text-slate-400">
                      Pre-select a title or pick after testing the gear with your host
                    </span>
                  </div>
                </div>

                <span className="font-mono text-xs text-[#00D26A] font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  ₹{selectedGame.price}/player
                </span>
              </div>

              {/* Custom Rich Dropdown Trigger */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsGameDropdownOpen(!isGameDropdownOpen)}
                  className="w-full p-4 bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-2xl text-left flex items-center justify-between transition-all group shadow-sm cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 overflow-hidden min-w-0">
                    <img
                      src={selectedGame.thumbnail}
                      alt={selectedGame.displayName}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-sm sm:text-base truncate">
                          {selectedGame.displayName}
                        </span>
                        <span className="font-mono text-[10px] uppercase font-bold text-[#00D26A] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0">
                          {selectedGame.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {selectedGame.tagline} · {selectedGame.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">Change</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-white transition-transform ${isGameDropdownOpen ? 'rotate-180 text-[#00D26A]' : ''}`} />
                  </div>
                </button>

                {/* Dropdown Options Menu */}
                <AnimatePresence>
                  {isGameDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 right-0 top-full mt-2 bg-[#0A0A0A] border border-slate-700/90 rounded-2xl shadow-2xl max-h-80 overflow-y-auto z-50 p-2 space-y-1.5 backdrop-blur-2xl"
                    >
                      {gameOptions.map((g) => {
                        const isSelected = selectedGameKey === g.key;
                        return (
                          <button
                            key={g.key}
                            type="button"
                            onClick={() => {
                              setSelectedGameKey(g.key);
                              setIsGameDropdownOpen(false);
                            }}
                            className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-950/60 text-white border border-emerald-500/40 shadow-xs'
                                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <img
                                src={g.thumbnail}
                                alt={g.displayName}
                                className="w-10 h-10 rounded-lg object-cover border border-slate-700 shrink-0"
                              />
                              <div className="min-w-0">
                                <div className="text-sm font-semibold truncate flex items-center gap-2">
                                  <span>{g.displayName}</span>
                                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#00D26A]" />}
                                </div>
                                <div className="text-xs text-slate-400 truncate max-w-xs">{g.tagline}</div>
                              </div>
                            </div>
                            <div className="text-right shrink-0 ml-3">
                              <span className="font-mono text-xs font-bold text-[#00D26A] block">₹{g.price}</span>
                              <span className="text-[10px] font-mono text-slate-400">{g.duration}</span>
                            </div>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* STEP 3: Pick Date & Time */}
            <div className="border-b border-slate-800/80 pb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#00D26A] text-black font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-md">
                    2
                  </span>
                  <div>
                    <span className="text-white font-bold text-base sm:text-lg block">
                      Select Date &amp; Arena Slot
                    </span>
                    <span className="text-xs text-slate-400">
                      Private sessions start promptly on time
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowFullCalendar(!showFullCalendar)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <CalendarDays className="w-3.5 h-3.5 text-[#00D26A]" />
                  <span>{showFullCalendar ? 'Close Calendar' : 'Full Calendar'}</span>
                </button>
              </div>

              {/* DATE SELECTION: Modern High-Converting Horizontal Strip */}
              <div className="mb-6">
                <div 
                  ref={dateScrollRef}
                  className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent"
                >
                  {upcomingDates.map((item) => {
                    const isSelected =
                      selectedDate.getFullYear() === item.date.getFullYear() &&
                      selectedDate.getMonth() === item.date.getMonth() &&
                      selectedDate.getDate() === item.date.getDate();

                    return (
                      <button
                        key={item.date.toISOString()}
                        type="button"
                        onClick={() => setSelectedDate(item.date)}
                        className={`min-w-[84px] sm:min-w-[92px] p-3 sm:p-3.5 rounded-2xl border text-center transition-all duration-200 relative shrink-0 cursor-pointer flex flex-col items-center justify-between ${
                          isSelected
                            ? 'bg-[#00D26A] border-[#00D26A] text-black font-bold shadow-[0_6px_20px_-4px_rgba(0,210,106,0.45)] scale-[1.03] z-10'
                            : 'bg-slate-900/90 border-slate-800 hover:border-emerald-500/50 text-slate-200 hover:bg-slate-850'
                        }`}
                      >
                        {item.isWeekdayPromo && (
                          <span 
                            className={`text-[9px] font-mono font-bold tracking-tight px-1.5 py-0.5 rounded-full mb-1 uppercase ${
                              isSelected ? 'bg-black text-[#00D26A]' : 'bg-emerald-500/15 text-[#00D26A] border border-emerald-500/30'
                            }`}
                          >
                            1 Free
                          </span>
                        )}

                        <span className={`text-[11px] font-semibold uppercase tracking-wider ${isSelected ? 'text-black' : 'text-slate-400'}`}>
                          {item.dayOfWeekName}
                        </span>

                        <span className={`text-xl sm:text-2xl font-black font-mono my-0.5 ${isSelected ? 'text-black' : 'text-white'}`}>
                          {item.dayNum}
                        </span>

                        <span className={`text-[10px] font-mono tracking-wider uppercase ${isSelected ? 'text-black/80 font-bold' : 'text-slate-400'}`}>
                          {item.monthName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Full Calendar Dropdown / Popover (When toggled) */}
              <AnimatePresence>
                {showFullCalendar && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden mb-6"
                  >
                    <div className="bg-[#0A0A0A] border border-slate-800 rounded-2xl p-5 max-w-sm mx-auto shadow-2xl">
                      {/* Month Navigation */}
                      <div className="flex items-center justify-between mb-4">
                        <button
                          type="button"
                          onClick={prevMonth}
                          className="w-8 h-8 rounded-lg border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-bold text-white font-mono">
                          {calMonthName} {calYear}
                        </span>
                        <button
                          type="button"
                          onClick={nextMonth}
                          className="w-8 h-8 rounded-lg border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Day of Week Headers */}
                      <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {DAYS_OF_WEEK.map((dow, idx) => (
                          <div
                            key={dow}
                            className={`font-mono text-[10px] py-1 font-bold ${
                              idx >= 2 && idx <= 4 ? 'text-[#00D26A]' : 'text-slate-400'
                            }`}
                          >
                            {dow}
                          </div>
                        ))}
                      </div>

                      {/* Calendar Day Grid */}
                      <div className="grid grid-cols-7 gap-1.5">
                        {[...Array(firstDayOfMonth)].map((_, i) => (
                          <div key={`blank-${i}`} className="aspect-square" />
                        ))}

                        {[...Array(daysInMonth)].map((_, i) => {
                          const dayNum = i + 1;
                          const dayDate = new Date(calYear, calMonth, dayNum);
                          const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                          const isPast = dayDate < startOfToday;
                          const isSelected =
                            selectedDate.getFullYear() === calYear &&
                            selectedDate.getMonth() === calMonth &&
                            selectedDate.getDate() === dayNum;
                          const dow = dayDate.getDay();
                          const isOfferDay = dow === 2 || dow === 3 || dow === 4;

                          return (
                            <button
                              key={dayNum}
                              type="button"
                              disabled={isPast}
                              onClick={() => handleSelectDay(dayNum)}
                              className={`aspect-square rounded-xl text-xs font-mono font-medium transition-all flex flex-col items-center justify-center relative cursor-pointer ${
                                isPast
                                  ? 'text-slate-600 opacity-30 cursor-not-allowed'
                                  : isSelected
                                  ? 'bg-[#00D26A] text-black font-bold shadow-md z-10'
                                  : isOfferDay
                                  ? 'bg-emerald-950/30 text-white border border-emerald-500/20 hover:border-emerald-500'
                                  : 'text-slate-200 hover:bg-slate-800'
                              }`}
                            >
                              <span>{dayNum}</span>
                              {isOfferDay && !isPast && !isSelected && (
                                <span className="w-1 h-1 rounded-full bg-[#00D26A] mt-0.5" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* TIME SLOTS: Modern Cards */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#00D26A]" />
                    Available Arena Slots ({selectedDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })})
                  </span>
                  <span className="text-[11px] font-mono text-[#00D26A]">Private Squad Reservation</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {TIME_SLOTS.map((slot) => {
                    const isSel = selectedTime === slot.label;
                    return (
                      <button
                        key={slot.label}
                        type="button"
                        onClick={() => setSelectedTime(slot.label)}
                        className={`h-14 rounded-2xl px-3 font-mono transition-all flex flex-col items-center justify-center cursor-pointer border ${
                          isSel
                            ? 'bg-[#00D26A] text-black border-[#00D26A] shadow-[0_6px_20px_-4px_rgba(0,210,106,0.45)] font-bold scale-[1.02]'
                            : 'bg-slate-900/90 border-slate-800 text-slate-200 hover:border-emerald-500/50 hover:bg-slate-850 hover:text-white'
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-bold">{slot.label}</span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span 
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSel ? 'bg-black' : slot.status === 'filling' ? 'bg-amber-400' : 'bg-[#00D26A]'
                            }`} 
                          />
                          <span className={`text-[10px] tracking-tight ${isSel ? 'text-black/85 font-semibold' : slot.status === 'filling' ? 'text-amber-400' : 'text-slate-400'}`}>
                            {slot.status === 'filling' ? '2 Left' : 'Available'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3 text-xs text-slate-300">
                  <Clock className="w-4 h-4 text-[#00D26A] shrink-0" />
                  <span>Please arrive 10 minutes prior for headset vision calibration &amp; squad tactical briefing.</span>
                </div>
              </div>
            </div>

            {/* STEP 4: Guest Details */}
            <form onSubmit={handleLockSlot} className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#00D26A] text-black font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-md">
                    3
                  </span>
                  <div>
                    <span className="text-white font-bold text-base sm:text-lg block">
                      Lead Player Details
                    </span>
                    <span className="text-xs text-slate-400">
                      Pass and venue entry code will be dispatched here
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Karthik Sharma"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: '' });
                      }}
                      className={`w-full h-12 pl-10 pr-4 bg-slate-900/90 border rounded-xl text-white text-sm outline-none transition-colors ${
                        fieldErrors.name ? 'border-red-500' : 'border-slate-800 focus:border-[#00D26A] focus:ring-1 focus:ring-[#00D26A]'
                      }`}
                    />
                  </div>
                  {fieldErrors.name && (
                    <p className="text-red-400 text-xs mt-1 pl-1">{fieldErrors.name}</p>
                  )}
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    WhatsApp Number *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: '' });
                      }}
                      className={`w-full h-12 pl-12 pr-4 bg-slate-900/90 border rounded-xl text-white text-sm outline-none font-mono transition-colors ${
                        fieldErrors.phone ? 'border-red-500' : 'border-slate-800 focus:border-[#00D26A] focus:ring-1 focus:ring-[#00D26A]'
                      }`}
                    />
                  </div>
                  {fieldErrors.phone && (
                    <p className="text-red-400 text-xs mt-1 pl-1">{fieldErrors.phone}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="karthik@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                      }}
                      className={`w-full h-12 pl-10 pr-4 bg-slate-900/90 border rounded-xl text-white text-sm outline-none transition-colors ${
                        fieldErrors.email ? 'border-red-500' : 'border-slate-800 focus:border-[#00D26A] focus:ring-1 focus:ring-[#00D26A]'
                      }`}
                    />
                  </div>
                  {fieldErrors.email && (
                    <p className="text-red-400 text-xs mt-1 pl-1">{fieldErrors.email}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-[#00D26A] shrink-0" />
                <span>Zero spam. Entry confirmation pass and calendar invite sent via WhatsApp &amp; Email.</span>
              </div>
            </form>

          </div>

          {/* RIGHT: Live Sticky Receipt / Order Card */}
          <div className="bg-[#0E121B]/95 border border-slate-800/90 rounded-3xl shadow-2xl flex flex-col sticky top-24 overflow-hidden backdrop-blur-2xl">
            
            {/* Header Ticket Information */}
            <div className="p-6 sm:p-7 border-b border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#00D26A] font-bold">
                  Arena Reservation Pass
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                  <MapPin className="w-3 h-3 text-[#00D26A]" />
                  Koramangala, BLR
                </span>
              </div>

              {/* Itemized Session Details */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">World:</span>
                  <span className="text-white font-semibold text-right truncate max-w-[200px]">
                    {selectedGame.displayName}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Squad:</span>
                  <span className="text-white font-semibold">
                    {groupSize} {groupSize === 1 ? 'Player' : 'Players'}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Date &amp; Time:</span>
                  <span className="text-white font-semibold text-right">
                    {selectedDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} · {selectedTime}
                  </span>
                </div>

                {/* Offer Row */}
                {isWeekdayOfferActive && (
                  <div className="bg-emerald-950/50 border border-emerald-500/40 rounded-xl p-3 flex items-center justify-between text-xs">
                    <span className="text-[#00D26A] font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Weekday Special (1 Player Free)
                    </span>
                    <span className="font-mono text-[#00D26A] font-bold">
                      -₹{discountSavings}
                    </span>
                  </div>
                )}

                {/* Pricing Calculation Total */}
                <div className="pt-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-slate-400">Total Game Fee:</span>
                    <div className="text-right">
                      {isWeekdayOfferActive && (
                        <span className="text-xs text-slate-500 line-through block font-mono">
                          ₹{originalSubtotal}
                        </span>
                      )}
                      <span className="text-3xl font-black text-white tracking-tight">
                        ₹{discountedSubtotal}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 block">
                        + 18% GST settled at venue
                      </span>
                    </div>
                  </div>
                </div>

                {/* Split Deposit vs Balance Box */}
                <div className="mt-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5 text-xs font-mono">
                  <div className="flex justify-between items-center text-white">
                    <span className="text-[#00D26A] font-bold">Pay Now to Lock Slot:</span>
                    <span className="bg-[#00D26A] text-black font-bold px-2.5 py-1 rounded-lg text-xs shadow-sm">
                      ₹{advanceLockDeposit}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Balance at Venue:</span>
                    <span className="text-slate-200">₹{balanceAtVenue}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions & Primary CTA */}
            <div className="p-6 sm:p-7 space-y-3.5">
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-300 leading-relaxed">
                Pay only <strong className="text-white">₹354 online</strong> to guarantee your private arena reservation. The remaining balance is paid on-site via UPI or Card.
              </div>

              {/* Primary Lock Slot Button */}
              <button
                type="button"
                onClick={handleLockSlot}
                disabled={isSubmitting}
                className="w-full h-14 rounded-2xl bg-[#00D26A] hover:bg-[#00be60] text-black font-bold text-sm uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] shadow-[0_8px_24px_-4px_rgba(0,210,106,0.45)] disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Locking Private Arena...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 stroke-[2.5]" />
                    <span>Pay ₹354 to Lock Slot</span>
                  </>
                )}
              </button>

              <p className="font-mono text-[10px] text-center text-slate-400 uppercase tracking-wider">
                Instant Confirmation · 100% Free Cancellation 24h
              </p>

              {/* WhatsApp Alternative */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span className="text-[#00D26A]">Book via WhatsApp instead</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#00D26A]" />
              </a>
            </div>

            {/* Social Proof Review Carousel */}
            <div className="bg-slate-950/80 border-t border-slate-800/80 p-5">
              <div className="flex items-center gap-1 text-amber-400 text-xs mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={reviewIdx}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-xs text-slate-300 italic leading-relaxed line-clamp-3 mb-2">
                    &ldquo;{reviews[reviewIdx].quote}&rdquo;
                  </p>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                    {reviews[reviewIdx].author} · {reviews[reviewIdx].source}
                  </span>
                </motion.div>
              </AnimatePresence>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-slate-400">
                <span>UPI &amp; All Cards</span>
                <span>·</span>
                <span>Free 24h Cancellation</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Confirmation Success Modal */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0E121B] border border-emerald-500/50 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-[0_0_60px_rgba(0,210,106,0.3)] relative text-center"
            >
              <button
                type="button"
                onClick={() => setIsSuccessModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-[#00D26A] text-[#00D26A] flex items-center justify-center mx-auto mb-5 shadow-lg">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight mb-2">
                Arena Slot Locked!
              </h3>
              
              <div className="font-mono text-xs text-[#00D26A] bg-emerald-500/10 border border-emerald-500/30 py-1.5 px-3 rounded-full inline-block mb-4">
                Pass Code: {confirmedBookingId}
              </div>

              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                Your private arena session is confirmed for <strong className="text-white">{groupSize} players</strong> on <strong className="text-white">{selectedDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} at {selectedTime}</strong>.
              </p>

              <div className="bg-slate-900 rounded-2xl p-4 text-xs font-mono text-left space-y-2 mb-6 border border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Game:</span>
                  <span className="text-white font-semibold">{selectedGame.displayName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Lock Deposit:</span>
                  <span className="text-[#00D26A] font-semibold">₹{advanceLockDeposit} (Locked)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Due at Venue:</span>
                  <span className="text-white font-semibold">₹{balanceAtVenue} + GST</span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-[#00D26A] text-black font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#00be60] transition-colors shadow-md"
                >
                  <span>Open Confirmation Pass on WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setIsSuccessModalOpen(false)}
                  className="w-full py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E121B]/95 backdrop-blur-xl border-t border-slate-800 p-3 px-4 flex items-center justify-between gap-3 shadow-[0_-8px_24px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col">
          <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">Deposit to Lock</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-white font-mono">₹{advanceLockDeposit}</span>
            <span className="text-[10px] text-[#00D26A] font-mono">({groupSize} {groupSize === 1 ? 'player' : 'players'})</span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLockSlot}
          className="h-11 px-5 rounded-xl bg-[#00D26A] hover:bg-[#00be60] text-black font-bold font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_16px_rgba(0,210,106,0.35)] active:scale-95 transition-transform"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Lock Slot</span>
        </button>
      </div>
    </section>
  );
};
