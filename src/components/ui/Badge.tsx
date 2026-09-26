import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'electric' | 'subtle' | 'outline';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  dot = false,
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono tracking-wider uppercase rounded-full';

  const variantStyles = {
    default: 'bg-[#161616] text-[#A3A3A3] border border-[#2B2B2B]',
    electric: 'bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/30',
    subtle: 'bg-white/5 text-white/90 border border-white/10',
    outline: 'border border-white/20 text-white/70',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${variant === 'electric' ? 'bg-[#39FF14] shadow-[0_0_8px_#39FF14]' : 'bg-white/60'}`} />
      )}
      {children}
    </span>
  );
};
