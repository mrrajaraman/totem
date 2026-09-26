import React, { useState, useMemo } from 'react';
import { Hero } from '../components/sections/Hero';
import { TrustStrip } from '../components/ui/TrustStrip';
import { StoryMoments } from '../components/sections/StoryMoments';
import { HowItFeels } from '../components/sections/HowItFeels';
import { StationShowcase } from '../components/sections/StationShowcase';
import { LocationMap } from '../components/sections/LocationMap';
import { FinalCTA } from '../components/sections/FinalCTA';
import { SectionHeader } from '../components/ui/SectionHeader';
import { WorldCard } from '../components/worlds/WorldCard';
import { SlotReservationWidget } from '../components/pricing/SlotReservationWidget';
import { WORLDS_DATA } from '../data/worldsData';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';
import { FAQ_DATA } from '../data/faqData';
import { Accordion } from '../components/ui/Accordion';
import { Button } from '../components/ui/Button';
import { ArrowRight, Star, Users, Cake, Building2, Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/motion/MotionWrapper';
import { motion, AnimatePresence } from 'framer-motion';

export const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Featured worlds for homepage
  const featuredWorlds = useMemo(() => {
    return WORLDS_DATA.filter((w) => {
      if (selectedCategory === 'All') return w.featured || w.recommendedForFirstTimers;
      return w.category.toLowerCase() === selectedCategory.toLowerCase();
    }).slice(0, 6);
  }, [selectedCategory]);

  // Top FAQs for homepage preview
  const topFaqs = FAQ_DATA.slice(0, 5).map((f) => ({
    id: f.id,
    title: f.question,
    category: f.category,
    content: f.answer,
  }));

  return (
    <div className="flex flex-col">
      {/* 01 · Hero with Authentic Live Video Feed */}
      <Hero />

      {/* Trust Strip */}
      <TrustStrip />

      {/* 02 · How it Feels / Body Forgets Story */}
      <StoryMoments />

      {/* 03 · Split-view interactive Experience Flow */}
      <HowItFeels />

      {/* 04 · Choose Your World Showcase */}
      <section className="py-20 md:py-28 bg-[#080808] border-t border-[#1C1C1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader
              number="04"
              eyebrow="Game Catalog"
              title="CHOOSE YOUR"
              highlight="VIRTUAL WORLD."
              lede="20 worlds ranging from lighthearted family parties to heart-stopping zombie survival. Pick one now or let your host guide you upon arrival."
              rightAction={
                <Button
                  to="/worlds"
                  variant="outline"
                  size="sm"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  View All 20 Worlds
                </Button>
              }
            />
          </FadeIn>

          {/* Quick Category Filter Pills */}
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
              {['All', 'Action', 'Sci-Fi', 'Zombie', 'Horror', 'Party', 'Escape'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap shrink-0 active:scale-95 ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-[#39FF14] text-black font-bold shadow-[0_0_16px_rgba(57,255,20,0.3)]'
                      : 'bg-[#121212] text-[#A3A3A3] border border-[#242424] hover:text-white hover:border-[#383838]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Worlds Grid with Fluid AnimatePresence Transition */}
          <div className="mb-12 min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {featuredWorlds.map((world) => (
                  <WorldCard key={world.id} world={world} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <FadeIn delay={0.2}>
            <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-[#222222] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-white font-semibold text-sm">
                  Can&rsquo;t decide which game to play?
                </p>
                <p className="text-xs text-[#A3A3A3] mt-0.5">
                  Select &ldquo;Decide at Venue&rdquo; during booking and try demo rounds with your dedicated host.
                </p>
              </div>
              <Button to="/booking" variant="primary" size="sm">
                Lock Your Slot Now
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 05 · Four Stations Running Simultaneously */}
      <StationShowcase />

      {/* 06 · Exact Interactive Pricing & Slot Lock Widget matching entertotem.in */}
      <SlotReservationWidget />

      {/* 07 · Corporate & Birthday Dual Spotlight */}
      <section className="py-20 md:py-28 bg-[#050505] border-t border-[#1C1C1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader
              number="07"
              eyebrow="Events & Groups"
              title="BRINGING MORE THAN"
              highlight="SIX PLAYERS?"
              lede="Book out our entire private arena. Dedicated host, lounge, catering add-ons, and multi-squad rotations."
            />
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Corporate Card */}
            <FadeIn delay={0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className="rounded-3xl bg-[#0B0B0B] border border-[#222222] p-8 sm:p-10 flex flex-col justify-between hover:border-[#39FF14]/40 transition-colors duration-300 group h-full shadow-card-subtle"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#39FF14] bg-[#39FF14]/10 px-3 py-1 rounded-full border border-[#39FF14]/20 flex items-center gap-1.5 font-semibold">
                      <Building2 className="w-3.5 h-3.5" />
                      Corporate &amp; Teams
                    </span>
                    <span className="font-mono text-xs text-[#A3A3A3]">8 to 50 People</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3 group-hover:text-[#39FF14] transition-colors">
                    Team outings people actually remember.
                  </h3>

                  <p className="text-sm text-[#A3A3A3] leading-relaxed mb-6">
                    Shared missions, zero hierarchy, live tournament scoreboards, and a dedicated debrief lounge. Official GST invoicing and customizable catering packages.
                  </p>

                  <ul className="space-y-2.5 text-xs font-mono text-[#C9C6C1] mb-8">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#39FF14]" />
                      <span>Four-station layout: VR, Xbox, Lounge &amp; Board Games</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#39FF14]" />
                      <span>Packages from ₹20,000 (starting ₹1,400/head)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#39FF14]" />
                      <span>Free 20-min pre-booking walkthrough on weekdays</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-[#1C1C1C] flex items-center justify-between gap-4">
                  <Button to="/corporate" variant="primary" size="md">
                    Plan Corporate Outing
                  </Button>
                  <a
                    href="https://wa.me/917337838303?text=Hi%20Totem%2C%20I'd%20like%20a%20corporate%20quote."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#A3A3A3] hover:text-white flex items-center gap-1"
                  >
                    <span>Quick WhatsApp Quote</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            </FadeIn>

            {/* Birthday Card */}
            <FadeIn delay={0.2}>
              <motion.div
                whileHover={{ y: -6 }}
                className="rounded-3xl bg-[#0B0B0B] border border-[#222222] p-8 sm:p-10 flex flex-col justify-between hover:border-[#39FF14]/40 transition-colors duration-300 group h-full shadow-card-subtle"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#39FF14] bg-[#39FF14]/10 px-3 py-1 rounded-full border border-[#39FF14]/20 flex items-center gap-1.5 font-semibold">
                      <Cake className="w-3.5 h-3.5" />
                      Birthdays &amp; Celebrations
                    </span>
                    <span className="font-mono text-xs text-[#A3A3A3]">Ages 8 &amp; Up</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3 group-hover:text-[#39FF14] transition-colors">
                    The birthday they will talk about for months.
                  </h3>

                  <p className="text-sm text-[#A3A3A3] leading-relaxed mb-6">
                    The entire arena to yourselves, zero waiting on benches, private lounge for cake cutting, and funny celebration photos that look like nothing else.
                  </p>

                  <ul className="space-y-2.5 text-xs font-mono text-[#C9C6C1] mb-8">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#39FF14]" />
                      <span>Dedicated host runs the entire session start-to-finish</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#39FF14]" />
                      <span>Packages start from ₹1,099 per person</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#39FF14]" />
                      <span>Lounge reserved for cake, snacks &amp; victory celebration</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-[#1C1C1C] flex items-center justify-between gap-4">
                  <Button to="/birthday" variant="primary" size="md">
                    Plan Birthday Party
                  </Button>
                  <a
                    href="https://wa.me/917337838303?text=Hi%20Totem%2C%20I'd%20like%20to%20plan%20a%20birthday%20party."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#A3A3A3] hover:text-white flex items-center gap-1"
                  >
                    <span>Chat on WhatsApp</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 07 · Verified Guest Testimonials with Stagger */}
      <section className="py-20 md:py-28 bg-[#080808] border-t border-[#1C1C1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader
              number="06"
              eyebrow="Social Proof"
              title="WHAT PEOPLE SAY IN THE"
              highlight="PARKING LOT."
              lede="Unfiltered reactions from real Bangalore tech teams, couples, and weekend squads."
            />
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS_DATA.map((t) => (
              <StaggerItem key={t.id}>
                <motion.div
                  whileHover={{ y: -4, borderColor: 'rgba(57, 255, 20, 0.3)' }}
                  className="p-6 sm:p-7 rounded-2xl bg-[#0D0D0D] border border-[#222222] flex flex-col justify-between transition-colors duration-200 h-full shadow-card-subtle"
                >
                  <div>
                    <div className="flex items-center gap-1 text-[#39FF14] mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#39FF14]" />
                      ))}
                    </div>

                    <p className="text-sm text-white/90 leading-relaxed italic mb-6">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#1C1C1C] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {t.author}
                      </span>
                      <span className="text-[11px] font-mono text-[#A3A3A3]">
                        {t.role}
                      </span>
                    </div>

                    {t.badge && (
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#39FF14] bg-[#39FF14]/10 px-2 py-0.5 rounded border border-[#39FF14]/20">
                        {t.badge}
                      </span>
                    )}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 08 · Common FAQs Accordion */}
      <section className="py-20 md:py-28 bg-[#050505] border-t border-[#1C1C1C]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader
              align="center"
              number="07"
              eyebrow="Knowledge Base"
              title="THE QUESTIONS EVERYONE"
              highlight="ASKS."
              lede="Everything you need to know about gear, glasses, motion sickness, and booking rules."
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            <Accordion items={topFaqs} />
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-8 text-center">
              <Link
                to="/faq"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#39FF14] hover:underline"
              >
                <span>View all frequently asked questions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 09 · Venue & Location */}
      <LocationMap />

      {/* 10 · Final Closing CTA */}
      <FinalCTA />
    </div>
  );
};
