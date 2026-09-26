import React, { useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { ShieldCheck, Eye, Cpu, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '../motion/MotionWrapper';

export const HowItFeels: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const stages = [
    {
      id: 'briefing',
      step: 'STEP 01',
      title: 'Five-minute gear fitting & briefing',
      subtitle: 'No complex controllers or wires.',
      body: 'You arrive at our Koramangala arena on the 2nd floor. Your host fits you with a featherlight untethered headset calibrated to your vision. In under five minutes, you understand how to navigate and interact.',
      icon: <Eye className="w-5 h-5 text-[#39FF14]" />,
      image: 'https://pub-e8615bd8f25545d68dfeb23cda95d612.r2.dev/photos/corporate-arena-briefing.webp',
      stat: '5 Minutes Brief',
      statLabel: 'Zero learning curve'
    },
    {
      id: 'immersion',
      step: 'STEP 02',
      title: 'The floor vanishes beneath your feet',
      subtitle: 'Your nervous system adapts in 90 seconds.',
      body: 'As the world renders, the physical arena walls disappear. You look down and see tactical armor on your hands, glance sideways and see your real friends standing in full 3D combat gear, ready to move.',
      icon: <Cpu className="w-5 h-5 text-[#39FF14]" />,
      image: 'https://pub-e8615bd8f25545d68dfeb23cda95d612.r2.dev/photos/corporate-arena-action.webp',
      stat: '0% Wires',
      statLabel: '100% Free Roam'
    },
    {
      id: 'coordination',
      step: 'STEP 03',
      title: 'High-stakes squad synchronization',
      subtitle: 'Shouting names, covering corners, making calls.',
      body: 'Whether solving ancient temple dials in Wayfinders or holding off synth waves in Revolta, you must communicate audibly. Hierarchy vanishes; the newest hire and company director work as equal teammates.',
      icon: <Users className="w-5 h-5 text-[#39FF14]" />,
      image: 'https://pub-e8615bd8f25545d68dfeb23cda95d612.r2.dev/photos/totem-large-group-corporate-outing.webp',
      stat: 'Up to 6',
      statLabel: 'Simultaneous Players'
    },
    {
      id: 'debrief',
      step: 'STEP 04',
      title: 'Lounge debrief, scoreboards & photos',
      subtitle: 'Unwind with snacks, Xbox, and victory replays.',
      body: 'When your session ends, headsets come off to spontaneous laughter. Transition directly into our private lounge for gourmet bites, victory photos, and match highlights streamed on the big screens.',
      icon: <ShieldCheck className="w-5 h-5 text-[#39FF14]" />,
      image: 'https://pub-e8615bd8f25545d68dfeb23cda95d612.r2.dev/photos/totem-lounge-wide.jpg',
      stat: 'Private Lounge',
      statLabel: 'Xbox & table games'
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-black border-t border-[#1C1C1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            number="03"
            eyebrow="The Experience Flow"
            title="FROM ARRIVAL TO"
            highlight="VICTORY DEBRIEF."
            lede="See how a session flows from the minute you step into our Koramangala venue."
          />
        </FadeIn>

        {/* Interactive Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Interactive Steps List on Left */}
          <div className="lg:col-span-6 space-y-4">
            {stages.map((stage, idx) => {
              const isActive = activeTab === idx;
              return (
                <motion.div
                  key={stage.id}
                  onClick={() => setActiveTab(idx)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer text-left relative ${
                    isActive
                      ? 'bg-[#101010] border-[#39FF14] shadow-[0_0_24px_-6px_rgba(57,255,20,0.3)]'
                      : 'bg-[#080808] border-[#222222] hover:border-[#333333]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <motion.span
                        animate={{ scale: isActive ? [1, 1.4, 1] : 1 }}
                        transition={{ repeat: isActive ? Infinity : 0, duration: 2 }}
                        className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#39FF14] shadow-[0_0_8px_#39FF14]' : 'bg-white/20'}`}
                      />
                      <span className="font-mono text-xs text-[#39FF14] font-semibold tracking-wider">
                        {stage.step}
                      </span>
                    </div>
                    <span className="text-white/40">{stage.icon}</span>
                  </div>

                  <h3 className={`text-lg sm:text-xl font-bold tracking-tight mb-1 transition-colors ${
                    isActive ? 'text-white' : 'text-[#A3A3A3]'
                  }`}>
                    {stage.title}
                  </h3>

                  <p className="text-xs font-mono text-[#71717A] mb-3">
                    {stage.subtitle}
                  </p>

                  <p className="text-sm text-[#A3A3A3] leading-relaxed font-normal">
                    {stage.body}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Sticky Visual Stage on Right with Smooth Fade Animation */}
          <div className="lg:col-span-6 relative">
            <div className="sticky top-28 rounded-3xl overflow-hidden border border-[#2B2B2B] bg-[#0E0E0E] shadow-2xl">
              <div className="aspect-[4/3] relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeTab}
                    src={stages[activeTab].image}
                    alt={stages[activeTab].title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.1]"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />

                {/* Floating Metric Pill */}
                <motion.div
                  key={`pill-${activeTab}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between"
                >
                  <div>
                    <span className="font-mono text-lg sm:text-xl font-black text-[#39FF14] block">
                      {stages[activeTab].stat}
                    </span>
                    <span className="font-mono text-xs text-[#A3A3A3]">
                      {stages[activeTab].statLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 font-mono text-xs text-white/60">
                    <span className="text-[#39FF14] font-bold">0{activeTab + 1}</span>
                    <span className="text-white/30">/</span>
                    <span>0{stages.length}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
