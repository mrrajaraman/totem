import React from 'react';
import { WORLDS_DATA } from '../../data/worldsData';
import { Check, HelpCircle, Sparkles } from 'lucide-react';

export interface StepWorldProps {
  selectedWorldSlug: string;
  onSelectWorld: (slug: string) => void;
}

export const StepWorld: React.FC<StepWorldProps> = ({
  selectedWorldSlug,
  onSelectWorld,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Choose your virtual world
        </h3>
        <p className="text-sm text-[#A3A3A3]">
          Pick your mission now, or select &ldquo;Decide at Venue&rdquo; and let your dedicated host recommend the best world based on your squad’s taste.
        </p>
      </div>

      {/* Decide at Venue Option (Prominent Top Card) */}
      <button
        type="button"
        onClick={() => onSelectWorld('decide-at-venue')}
        className={`w-full p-5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-4 ${
          selectedWorldSlug === 'decide-at-venue'
            ? 'bg-[#161616] border-[#39FF14] shadow-[0_0_20px_-4px_rgba(57,255,20,0.3)]'
            : 'bg-[#0E0E0E] border-[#2B2B2B] hover:border-[#3D3D3D]'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#181818] border border-[#2E2E2E] flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-[#39FF14]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white">Decide at Venue</span>
              <span className="font-mono text-[10px] tracking-wider uppercase bg-[#39FF14]/15 text-[#39FF14] px-2 py-0.5 rounded border border-[#39FF14]/30">
                Recommended
              </span>
            </div>
            <p className="text-xs text-[#A3A3A3] mt-1 font-normal">
              You can test the gear and pick between all 20 worlds with your game host after arrival.
            </p>
          </div>
        </div>

        {selectedWorldSlug === 'decide-at-venue' && (
          <span className="w-6 h-6 rounded-full bg-[#39FF14] flex items-center justify-center text-black shrink-0">
            <Check className="w-4 h-4 stroke-[3]" />
          </span>
        )}
      </button>

      <div className="relative flex items-center justify-center my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#222222]" />
        </div>
        <div className="relative bg-black px-4 font-mono text-xs uppercase tracking-widest text-[#71717A]">
          Or Pre-Select a Specific Title
        </div>
      </div>

      {/* World Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
        {WORLDS_DATA.map((world) => {
          const isSelected = selectedWorldSlug === world.slug;
          return (
            <button
              key={world.slug}
              type="button"
              onClick={() => onSelectWorld(world.slug)}
              className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between gap-3 ${
                isSelected
                  ? 'bg-[#161616] border-[#39FF14] shadow-[0_0_16px_-4px_rgba(57,255,20,0.3)]'
                  : 'bg-[#0E0E0E] border-[#222222] hover:border-[#383838]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={world.thumbnail}
                  alt={world.title}
                  className="w-12 h-12 rounded-lg object-cover shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white truncate">{world.title}</span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#39FF14]">
                      {world.category}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#A3A3A3] block mt-0.5">
                    {world.duration} · Age {world.ageRating}
                  </span>
                </div>
              </div>

              {isSelected && (
                <span className="w-5 h-5 rounded-full bg-[#39FF14] flex items-center justify-center text-black shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
