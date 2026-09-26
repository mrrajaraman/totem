import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'surface' | 'glass' | 'interactive';
  hoverEffect?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hoverEffect = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'relative rounded-2xl border transition-all duration-300 overflow-hidden';

  const variantStyles = {
    default: 'bg-[#0E0E0E] border-[#222222]',
    surface: 'bg-[#141414] border-[#2A2A2A]',
    glass: 'bg-[#0A0A0A]/80 backdrop-blur-md border-white/[0.08]',
    interactive: 'bg-[#0E0E0E] border-[#222222] hover:border-[#39FF14]/50 cursor-pointer',
  };

  const hoverStyles = hoverEffect ? 'hover:-translate-y-1 hover:border-white/30' : '';

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};
