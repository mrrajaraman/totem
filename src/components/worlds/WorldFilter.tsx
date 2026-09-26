import React from 'react';
import { WorldCategory, WORLD_CATEGORIES } from '../../data/worldsData';
import { Search, X, SlidersHorizontal } from 'lucide-react';

export interface WorldFilterProps {
  selectedCategory: WorldCategory;
  onSelectCategory: (category: WorldCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  firstTimersOnly: boolean;
  onToggleFirstTimers: () => void;
  totalCount: number;
}

export const WorldFilter: React.FC<WorldFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  firstTimersOnly,
  onToggleFirstTimers,
  totalCount,
}) => {
  return (
    <div className="space-y-4 mb-8">
      {/* Category Pills & Search */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {WORLD_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#39FF14] text-black font-semibold shadow-[0_0_16px_rgba(57,255,20,0.3)]'
                    : 'bg-[#121212] text-[#A3A3A3] border border-[#262626] hover:text-white hover:border-[#383838]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Bar & First Timer Toggle */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search 20 worlds..."
              className="w-full h-9 pl-9 pr-8 bg-[#101010] border border-[#2B2B2B] rounded-full text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#39FF14] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={onToggleFirstTimers}
            className={`h-9 px-3.5 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors border ${
              firstTimersOnly
                ? 'bg-[#39FF14]/15 border-[#39FF14] text-[#39FF14]'
                : 'bg-[#101010] border-[#2B2B2B] text-[#A3A3A3] hover:text-white'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${firstTimersOnly ? 'bg-[#39FF14]' : 'bg-white/30'}`} />
            <span>Beginner Friendly</span>
          </button>
        </div>
      </div>

      {/* Result Counter */}
      <div className="flex items-center justify-between text-xs font-mono text-[#71717A] pt-1">
        <span>Showing {totalCount} of 20 VR catalog experiences</span>
        {searchQuery && <span>Matching &ldquo;{searchQuery}&rdquo;</span>}
      </div>
    </div>
  );
};
