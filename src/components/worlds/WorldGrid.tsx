import React from 'react';
import { World } from '../../types';
import { WorldCard } from './WorldCard';
import { Button } from '../ui/Button';
import { RotateCcw } from 'lucide-react';

export interface WorldGridProps {
  worlds: World[];
  onResetFilters?: () => void;
}

export const WorldGrid: React.FC<WorldGridProps> = ({ worlds, onResetFilters }) => {
  if (worlds.length === 0) {
    return (
      <div className="rounded-2xl border border-[#222222] bg-[#0E0E0E] p-12 text-center max-w-lg mx-auto my-12">
        <div className="w-12 h-12 rounded-full bg-[#181818] border border-[#2B2B2B] flex items-center justify-center mx-auto mb-4 text-[#A3A3A3]">
          <RotateCcw className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No Worlds Match Your Criteria</h3>
        <p className="text-sm text-[#A3A3A3] mb-6">
          Try adjusting your search query or switching categories to explore our full 20-game catalog.
        </p>
        {onResetFilters && (
          <Button variant="secondary" size="sm" onClick={onResetFilters}>
            Reset Filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {worlds.map((world) => (
        <WorldCard key={world.id} world={world} />
      ))}
    </div>
  );
};
