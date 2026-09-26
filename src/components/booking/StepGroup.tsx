import React from 'react';
import { Users, Sparkles, Check } from 'lucide-react';

export interface StepGroupProps {
  selectedGroupSize: number;
  onSelectGroupSize: (size: number) => void;
}

export const StepGroup: React.FC<StepGroupProps> = ({
  selectedGroupSize,
  onSelectGroupSize,
}) => {
  const sizes = [1, 2, 3, 4, 5, 6];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
          How many players are in your squad?
        </h3>
        <p className="text-sm text-[#A3A3A3]">
          Totem VR arena accommodates up to 6 players inside the virtual world simultaneously. The entire arena remains 100% private to your group.
        </p>
      </div>

      {/* Weekday Promotion Banner */}
      <div className="p-4 rounded-xl bg-[#141414] border border-[#39FF14]/30 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-[#39FF14] shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
            Weekday Promo Alert
          </p>
          <p className="text-xs text-[#A3A3A3] mt-1 leading-relaxed">
            Booking for Tuesday, Wednesday, or Thursday? Groups of 4–6 players automatically get <strong className="text-[#39FF14]">1 player completely FREE</strong> at check-in.
          </p>
        </div>
      </div>

      {/* Group Size Grid Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
        {sizes.map((size) => {
          const isSelected = selectedGroupSize === size;
          const isPromoEligible = size >= 4;

          return (
            <button
              key={size}
              type="button"
              onClick={() => onSelectGroupSize(size)}
              className={`p-5 rounded-2xl border text-left transition-all duration-200 relative group flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#161616] border-[#39FF14] shadow-[0_0_20px_-4px_rgba(57,255,20,0.3)]'
                  : 'bg-[#0E0E0E] border-[#242424] hover:border-[#383838]'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm ${
                  isSelected ? 'bg-[#39FF14] text-black' : 'bg-[#1C1C1C] text-white'
                }`}>
                  {size}
                </div>
                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-[#39FF14] flex items-center justify-center text-black">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>

              <div>
                <span className="text-base font-semibold text-white block">
                  {size === 1 ? 'Solo Player' : size === 2 ? 'Duo Squad' : `${size} Players`}
                </span>
                <span className="text-xs font-mono text-[#A3A3A3] block mt-0.5">
                  From ₹{799 * size}
                </span>

                {isPromoEligible && (
                  <span className="inline-block mt-2 text-[10px] font-mono uppercase tracking-wider text-[#39FF14] bg-[#39FF14]/10 px-1.5 py-0.5 rounded border border-[#39FF14]/20">
                    Weekday Free Player
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#222222] text-xs font-mono text-[#71717A] flex items-center justify-between">
        <span>More than 6 people?</span>
        <a
          href="/corporate"
          className="text-[#39FF14] hover:underline"
        >
          See Corporate &amp; Large Group Outings &rarr;
        </a>
      </div>
    </div>
  );
};
