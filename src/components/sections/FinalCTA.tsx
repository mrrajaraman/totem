import React from 'react';
import { Button } from '../ui/Button';
import { ArrowRight, MessageSquare, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-24 md:py-36 bg-black relative overflow-hidden border-t border-[#1C1C1C]">
      {/* Background Animated Radial Gradient */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#39FF14] blur-[140px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs uppercase tracking-widest text-[#39FF14] block mb-6 font-semibold"
        >
          LIMITED WEEKEND CAPACITY · 100% PRIVATE SLOTS
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[0.95] max-w-4xl mx-auto mb-8"
        >
          READY TO WALK <br />
          INSIDE <span className="text-[#39FF14]">THE GAME?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-xl text-[#A3A3A3] max-w-2xl mx-auto mb-10 font-normal leading-relaxed"
        >
          Book your private arena session in Koramangala today. Lock your slot online with just ₹354, or message our team directly on WhatsApp.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            to="/booking"
            size="lg"
            variant="primary"
            className="w-full sm:w-auto font-mono uppercase tracking-wider text-sm font-bold shadow-[0_0_36px_-6px_rgba(57,255,20,0.5)] hover:scale-105 transition-transform"
            icon={<ArrowRight className="w-4 h-4 ml-1" />}
          >
            Book a Session Now
          </Button>

          <Button
            href="https://wa.me/917337838303?text=Hi%20Totem%2C%20I'd%20like%20to%20know%20more%20about%20booking%20a%20slot."
            isExternal
            size="lg"
            variant="secondary"
            className="w-full sm:w-auto font-mono uppercase tracking-wider text-xs hover:border-[#39FF14]/40"
            icon={<MessageSquare className="w-4 h-4" />}
          >
            WhatsApp Us
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-12 flex items-center justify-center gap-6 text-xs font-mono text-[#71717A]"
        >
          <span>Free cancellation up to 24h</span>
          <span>·</span>
          <span>UPI &amp; Cards accepted</span>
          <span>·</span>
          <span>Ages 8+</span>
        </motion.div>
      </div>
    </section>
  );
};
