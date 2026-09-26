import React from 'react';

export interface SectionHeaderProps {
  number?: string;
  eyebrow?: string;
  title: string;
  highlight?: string;
  lede?: string;
  align?: 'left' | 'center';
  className?: string;
  rightAction?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  eyebrow,
  title,
  highlight,
  lede,
  align = 'left',
  className = '',
  rightAction,
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-4xl'} ${className}`}>
      {(number || eyebrow) && (
        <div className={`flex items-center gap-3 font-mono text-xs tracking-widest uppercase text-white/50 mb-4 ${align === 'center' ? 'justify-center' : ''}`}>
          {number && <span className="text-[#39FF14] font-semibold">{number}</span>}
          {number && eyebrow && <span className="text-white/20">/</span>}
          {eyebrow && <span>{eyebrow}</span>}
        </div>
      )}

      <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6`}>
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05]">
            {title}{' '}
            {highlight && (
              <span className="text-[#39FF14] inline-block">
                {highlight}
              </span>
            )}
          </h2>

          {lede && (
            <p className="mt-4 md:mt-5 text-base sm:text-lg text-[#A3A3A3] leading-relaxed max-w-2xl font-normal">
              {lede}
            </p>
          )}
        </div>

        {rightAction && (
          <div className="shrink-0 pt-2 md:pt-0 self-start md:self-end">
            {rightAction}
          </div>
        )}
      </div>
    </div>
  );
};
