import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { WORLDS_DATA } from '../data/worldsData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { WorldCard } from '../components/worlds/WorldCard';
import {
  Clock,
  Users,
  ShieldAlert,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Gamepad2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

export const WorldDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const world = WORLDS_DATA.find((w) => w.slug === slug);

  if (!world) {
    return <Navigate to="/worlds" replace />;
  }

  // Related worlds in same or adjacent categories
  const relatedWorlds = WORLDS_DATA
    .filter((w) => w.slug !== world.slug)
    .slice(0, 3);

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          to="/worlds"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#A3A3A3] hover:text-[#39FF14] mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All 20 Worlds</span>
        </Link>

        {/* Hero Visual Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-[#222222] bg-[#0E0E0E] min-h-[380px] sm:min-h-[460px] flex items-end p-6 sm:p-10 md:p-12 mb-12 shadow-2xl">
          <img
            src={world.heroImage}
            alt={world.title}
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

          {/* Content Overlay */}
          <div className="relative z-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="electric">{world.category}</Badge>
              {world.recommendedForFirstTimers && (
                <Badge variant="subtle" dot>First-Timer Friendly</Badge>
              )}
              {world.isHorror && (
                <span className="font-mono text-xs uppercase tracking-wider bg-red-950/80 text-red-400 px-3 py-1 rounded-full border border-red-800 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  14+ Horror Experience
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[0.95] mb-4">
              {world.title}
            </h1>

            <p className="text-base sm:text-xl text-[#C9C6C1] font-normal leading-relaxed max-w-2xl mb-6">
              {world.tagline}
            </p>

            {/* Quick Specs Badges */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/90">
              <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <Clock className="w-3.5 h-3.5 text-[#39FF14]" />
                <span>{world.duration} Duration</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <Users className="w-3.5 h-3.5 text-[#39FF14]" />
                <span>{world.players} Players</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <span>Age: {world.ageRating}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <span>Difficulty: {world.difficulty}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Detail Layout: Content Left, Sticky Booking Action Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-12">
            {/* Mission Overview */}
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#39FF14] block mb-2 font-semibold">
                01 / THE MISSION
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                Overview
              </h2>
              <p className="text-base text-[#A3A3A3] leading-relaxed font-normal">
                {world.overview}
              </p>
            </div>

            {/* What to Expect */}
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#39FF14] block mb-2 font-semibold">
                02 / EXPERIENCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                What to Expect
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {world.whatToExpect.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#0D0D0D] border border-[#222222] flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#39FF14] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-[#C9C6C1] leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mechanics & Controls */}
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#39FF14] block mb-2 font-semibold">
                03 / TACTICAL SYSTEMS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                Gameplay Mechanics
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {world.mechanics.map((mech, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2.5 rounded-xl bg-[#111111] border border-[#2B2B2B] text-xs font-mono text-white flex items-center gap-2"
                  >
                    <Gamepad2 className="w-3.5 h-3.5 text-[#39FF14]" />
                    <span>{mech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Who It's For */}
            <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-[#222222]">
              <span className="font-mono text-xs uppercase tracking-widest text-[#71717A] block mb-1">
                Recommendation
              </span>
              <h3 className="text-lg font-bold text-white mb-2">
                Who this world is designed for
              </h3>
              <p className="text-sm text-[#A3A3A3] leading-relaxed">
                {world.whoItsFor}
              </p>
            </div>
          </div>

          {/* Sticky Booking CTA Card */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="rounded-3xl bg-[#0E0E0E] border border-[#2E2E2E] p-6 sm:p-8 space-y-6 shadow-2xl">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#39FF14] font-semibold block mb-1">
                  100% PRIVATE ARENA
                </span>
                <h3 className="text-xl font-bold text-white">
                  Book {world.title}
                </h3>
                <p className="text-xs text-[#A3A3A3] mt-1 font-mono">
                  Starting from ₹799 / person + GST
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#1E1E1E] text-xs font-mono">
                <div className="flex justify-between text-[#A3A3A3]">
                  <span>Duration:</span>
                  <span className="text-white font-semibold">{world.duration}</span>
                </div>
                <div className="flex justify-between text-[#A3A3A3]">
                  <span>Squad Size:</span>
                  <span className="text-white font-semibold">{world.players}</span>
                </div>
                <div className="flex justify-between text-[#A3A3A3]">
                  <span>Intensity:</span>
                  <span className="text-white font-semibold">{world.intensity}</span>
                </div>
                <div className="flex justify-between text-[#A3A3A3]">
                  <span>Slot Deposit:</span>
                  <span className="text-[#39FF14] font-bold">₹354 (Pay Online)</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Button
                  to={`/booking?world=${world.slug}`}
                  variant="primary"
                  size="lg"
                  className="w-full justify-center font-mono uppercase tracking-wider text-xs font-bold"
                  icon={<ArrowRight className="w-4 h-4 ml-1" />}
                >
                  Book This World
                </Button>

                <a
                  href={`https://wa.me/917337838303?text=Hi%20Totem%2C%20I'd%20like%20to%20book%20a%20session%20for%20${encodeURIComponent(world.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-11 rounded-full border border-[#2B2B2B] bg-[#141414] hover:bg-[#1A1A1A] flex items-center justify-center text-xs font-mono text-[#A3A3A3] hover:text-white transition-colors"
                >
                  Check Slots on WhatsApp
                </a>
              </div>

              <p className="text-[11px] text-[#71717A] text-center font-mono">
                Free cancellation up to 24h prior. UPI &amp; Cards accepted at venue.
              </p>
            </div>
          </div>
        </div>

        {/* Related Worlds */}
        <div className="pt-12 border-t border-[#222222]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              More Worlds to Explore
            </h3>
            <Link
              to="/worlds"
              className="text-xs font-mono uppercase tracking-wider text-[#39FF14] hover:underline"
            >
              See all 20 worlds &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedWorlds.map((w) => (
              <WorldCard key={w.id} world={w} compact />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
