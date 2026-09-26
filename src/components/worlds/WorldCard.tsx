import React from 'react';
import { Link } from 'react-router-dom';
import { World } from '../../types';
import { Clock, Users, ShieldAlert, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { motion } from 'framer-motion';

export interface WorldCardProps {
  world: World;
  compact?: boolean;
}

export const WorldCard: React.FC<WorldCardProps> = ({ world, compact = false }) => {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="group relative rounded-2xl bg-[#0E0E0E] border border-[#222222] hover:border-[#39FF14]/50 transition-colors duration-300 overflow-hidden flex flex-col h-full shadow-card-subtle"
    >
      {/* Visual Image Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#141414]">
        <img
          src={world.thumbnail}
          alt={world.title}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Subtle Dark Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/30 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <Badge variant={world.category === 'Horror' || world.category === 'Zombie' ? 'subtle' : 'electric'}>
            {world.category}
          </Badge>

          {world.recommendedForFirstTimers && (
            <span className="font-mono text-[10px] uppercase tracking-wider bg-black/80 backdrop-blur-md text-[#39FF14] px-2 py-0.5 rounded border border-[#39FF14]/30">
              First-Timer Friendly
            </span>
          )}

          {world.isHorror && (
            <span className="font-mono text-[10px] uppercase tracking-wider bg-black/80 backdrop-blur-md text-red-400 px-2 py-0.5 rounded border border-red-500/30 flex items-center gap-1">
              <ShieldAlert className="w-3 h-3" />
              14+ Scary
            </span>
          )}
        </div>

        {/* Quick Specs Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3 text-xs font-mono text-white/80 z-10">
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded">
            <Clock className="w-3 h-3 text-[#39FF14]" />
            <span>{world.duration}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded">
            <Users className="w-3 h-3 text-[#39FF14]" />
            <span>{world.players}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded">
            <span>Age {world.ageRating}</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#39FF14] transition-colors">
              {world.title}
            </h3>
            <span className="text-[11px] font-mono uppercase text-[#A3A3A3] shrink-0 border border-[#2B2B2B] px-1.5 py-0.5 rounded">
              {world.difficulty}
            </span>
          </div>

          <p className="text-sm text-[#A3A3A3] leading-relaxed line-clamp-2 mb-4 font-normal">
            {world.tagline}
          </p>

          {!compact && world.mechanics && world.mechanics.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {world.mechanics.slice(0, 3).map((mech, idx) => (
                <span
                  key={idx}
                  className="font-mono text-[10px] tracking-wider text-white/60 bg-[#161616] px-2 py-0.5 rounded border border-[#262626]"
                >
                  {mech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-[#1C1C1C] flex items-center justify-between gap-3 mt-auto">
          <Link
            to={`/worlds/${world.slug}`}
            className="text-xs font-mono tracking-wider uppercase text-white hover:text-[#39FF14] flex items-center gap-1 transition-colors group/link"
          >
            <span>World Brief</span>
            <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
          </Link>

          <Link
            to={`/booking?world=${world.slug}`}
            className="text-xs font-mono font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/30 hover:bg-[#39FF14] hover:text-black transition-all"
          >
            Select Slot
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
