import React, { useState, useMemo } from 'react';
import { WORLDS_DATA, WorldCategory } from '../data/worldsData';
import { WorldFilter } from '../components/worlds/WorldFilter';
import { WorldGrid } from '../components/worlds/WorldGrid';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';
import { ShieldCheck, Sparkles } from 'lucide-react';

export const WorldsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<WorldCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [firstTimersOnly, setFirstTimersOnly] = useState<boolean>(false);

  const filteredWorlds = useMemo(() => {
    return WORLDS_DATA.filter((world) => {
      // Category match
      if (selectedCategory !== 'All' && world.category !== selectedCategory) {
        return false;
      }
      // First timer match
      if (firstTimersOnly && !world.recommendedForFirstTimers) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = world.title.toLowerCase().includes(q);
        const matchesTagline = world.tagline.toLowerCase().includes(q);
        const matchesCategory = world.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesTagline && !matchesCategory) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery, firstTimersOnly]);

  const handleReset = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setFirstTimersOnly(false);
  };

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          eyebrow="Game Catalog"
          title="TWENTY WORLDS."
          highlight="PICK YOURS."
          lede="Sessions from 12 minutes to 45 minutes. Zombie defense, sci-fi sagas, psychological horror, ancient puzzle escapes, and joyful party games. All 100% private to your squad."
          rightAction={
            <Button to="/booking" variant="primary" size="md">
              Book a Session
            </Button>
          }
        />

        {/* Filters */}
        <WorldFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          firstTimersOnly={firstTimersOnly}
          onToggleFirstTimers={() => setFirstTimersOnly(!firstTimersOnly)}
          totalCount={filteredWorlds.length}
        />

        {/* Catalog Grid */}
        <WorldGrid
          worlds={filteredWorlds}
          onResetFilters={handleReset}
        />

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-[#0E0E0E] border border-[#222222] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-black border border-[#2B2B2B] flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-[#39FF14]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                You can always switch your world at the venue.
              </h3>
              <p className="text-xs text-[#A3A3A3] max-w-xl font-normal leading-relaxed">
                Don’t worry about locking yourself in. When you arrive, your game host will brief you and can switch your game on the fly based on how you feel.
              </p>
            </div>
          </div>

          <Button to="/booking" variant="primary" size="md" className="shrink-0">
            Lock Arena Slot (₹354 Deposit)
          </Button>
        </div>
      </div>
    </div>
  );
};
