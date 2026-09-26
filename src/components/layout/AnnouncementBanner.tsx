import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AnnouncementBanner: React.FC = () => {
  return (
    <div className="bg-[#121212] border-b border-[#222222] text-xs py-2 px-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden mx-auto sm:mx-0">
          <span className="inline-flex items-center gap-1 font-mono uppercase bg-[#39FF14]/10 text-[#39FF14] px-2 py-0.5 rounded text-[10px] tracking-widest font-semibold border border-[#39FF14]/30">
            <Sparkles className="w-2.5 h-2.5" />
            Special Offer
          </span>
          <span className="text-[#A3A3A3] truncate text-xs">
            Bring 4–6 players on Tue, Wed or Thu &amp; <strong className="text-white font-medium">1 person plays free</strong>.
          </span>
        </div>

        <Link
          to="/booking"
          className="hidden sm:inline-flex items-center gap-1 text-xs text-[#39FF14] hover:underline font-medium shrink-0 group"
        >
          <span>Claim slot</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
