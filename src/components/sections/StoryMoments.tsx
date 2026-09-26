import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { FadeIn, StaggerContainer, StaggerItem } from '../motion/MotionWrapper';
import { motion } from 'framer-motion';

export const StoryMoments: React.FC = () => {
  const moments = [
    {
      num: '01',
      title: 'Your body forgets.',
      description: "You'll lean back from a ledge. Grab for a wall that isn't there. Flinch at something flying at your face. It happens to everyone, every time. Your brain knows you are in Koramangala; your nervous system is convinced otherwise."
    },
    {
      num: '02',
      title: 'Your friends are right there.',
      description: "Same world, same moment. You'll hear them shout your name from across the room, watch them duck under fire, panic, laugh, and make bad decisions together. It’s an intensely shared physical reality."
    },
    {
      num: '03',
      title: 'An hour feels like ten minutes.',
      description: "You step into the headset and walk out blinking at the arena lights. Nobody is checking notifications. Nobody is distracted. In an age of endless phone scrolling, this is 100% uninterrupted human focus."
    },
    {
      num: '04',
      title: 'You talk about it on the way home.',
      description: "Not the score or points. You talk about the exact second someone screamed, the call your teammate almost didn't make, and the creature that suddenly rounded the corridor corner."
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-[#050505] border-t border-[#1C1C1C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            number="02"
            eyebrow="The Sensation"
            title="YOUR BODY FORGETS IT IS"
            highlight="NOT REAL."
            lede="Free-roam VR isn’t looking at a screen through goggles. You physically walk, turn, and react inside a room-scale simulated environment."
          />
        </FadeIn>

        {/* 4 Moments Grid with Staggered Scroll Animation */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {moments.map((m) => (
            <StaggerItem key={m.num}>
              <motion.div
                whileHover={{ y: -6, borderColor: 'rgba(57, 255, 20, 0.4)' }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8 rounded-2xl bg-[#0A0A0A] border border-[#222222] transition-all duration-300 flex flex-col justify-between group h-full shadow-card-subtle"
              >
                <div>
                  <span className="font-mono text-xs font-semibold text-[#39FF14] block mb-4">
                    [{m.num}]
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3 group-hover:text-[#39FF14] transition-colors">
                    {m.title}
                  </h3>
                </div>
                <p className="text-sm text-[#A3A3A3] leading-relaxed font-normal pt-2 border-t border-[#1C1C1C]">
                  {m.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
