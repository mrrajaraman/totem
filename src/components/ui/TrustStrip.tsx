import React from 'react';
import { Star, ShieldCheck, Footprints, Users, Clock, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export const TrustStrip: React.FC = () => {
  const trustPoints = [
    {
      icon: <Star className="w-4 h-4 text-[#39FF14] fill-[#39FF14]" />,
      label: '5.0 Google Rating',
      sub: 'Verified guest reviews',
    },
    {
      icon: <Users className="w-4 h-4 text-[#39FF14]" />,
      label: '100% Private Sessions',
      sub: 'Never play with strangers',
    },
    {
      icon: <Footprints className="w-4 h-4 text-[#39FF14]" />,
      label: 'Zero Motion Sickness',
      sub: 'Real untethered walking',
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-[#39FF14]" />,
      label: 'Ages 8+ & First-Timer Ready',
      sub: '5-min friendly briefing',
    },
    {
      icon: <RotateCcw className="w-4 h-4 text-[#39FF14]" />,
      label: '24h Free Cancellation',
      sub: '100% full refund policy',
    },
  ];

  return (
    <div className="w-full border-y border-[#222222] bg-[#0A0A0A]/95 backdrop-blur-md relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center"
        >
          {trustPoints.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-black border border-[#262626] flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-white tracking-tight truncate">
                  {item.label}
                </p>
                <p className="text-[11px] text-[#A3A3A3] truncate font-mono">
                  {item.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
