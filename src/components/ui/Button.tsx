import React from 'react';
import { Link } from 'react-router-dom';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  isExternal?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  isExternal,
  icon,
  iconPosition = 'right',
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 select-none whitespace-nowrap active:translate-y-px disabled:opacity-50 disabled:pointer-events-none rounded-full';

  const sizeStyles = {
    sm: 'h-9 px-4 text-xs tracking-wider uppercase gap-1.5',
    md: 'h-12 px-6 text-sm tracking-wide gap-2',
    lg: 'h-14 px-8 text-base tracking-wide gap-3 font-semibold',
  };

  const variantStyles = {
    primary: 'bg-[#39FF14] text-black hover:bg-[#32e612] hover:shadow-[0_0_24px_-4px_rgba(57,255,20,0.45)] hover:-translate-y-0.5 font-semibold',
    secondary: 'bg-transparent text-white border border-[#333333] hover:border-white/40 hover:bg-white/[0.04]',
    ghost: 'bg-transparent text-white/80 hover:text-white hover:bg-white/[0.05]',
    outline: 'bg-transparent text-[#39FF14] border border-[#39FF14]/40 hover:border-[#39FF14] hover:bg-[#39FF14]/10',
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-1">{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`group ${combinedStyles}`}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a 
        href={href} 
        target={isExternal ? '_blank' : undefined} 
        rel={isExternal ? 'noopener noreferrer' : undefined} 
        className={`group ${combinedStyles}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={`group ${combinedStyles}`} disabled={disabled} {...props}>
      {content}
    </button>
  );
};
