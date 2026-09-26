import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, MessageSquare } from 'lucide-react';
import { Button } from '../ui/Button';

export interface NavbarProps {
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleMobileMenu,
  isMobileMenuOpen,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Worlds', href: '/worlds' },
    { label: 'Corporate', href: '/corporate' },
    { label: 'Birthday', href: '/birthday' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Partner With Us', href: '/partner-with-us' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Journal', href: '/blog' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#000000]/85 backdrop-blur-md border-b border-[#222222] py-3.5 shadow-lg'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group focus-visible:outline-none"
            aria-label="Totem VR Home"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0E0E0E] border border-[#2B2B2B] flex items-center justify-center group-hover:border-[#39FF14]/50 transition-colors">
              <span className="font-mono text-base font-black text-[#39FF14] tracking-tighter">T</span>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black text-lg tracking-wider text-white uppercase leading-none">
                TOTEM<span className="text-[#39FF14]">.</span>
              </span>
              <span className="font-mono text-[9px] text-[#A3A3A3] tracking-widest uppercase">
                VR Arena · BLR
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-xs tracking-wider uppercase font-medium transition-colors relative py-1 ${
                    active
                      ? 'text-white font-semibold'
                      : 'text-[#A3A3A3] hover:text-white'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#39FF14] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp Direct */}
            <a
              href="https://wa.me/917337838303?text=Hi%20Totem%2C%20I%27d%20like%20to%20know%20more%20about%20booking%20a%20session."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#2B2B2B] text-xs font-mono text-[#A3A3A3] hover:text-white hover:border-white/30 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#39FF14]" />
              <span className="hidden md:inline">+91 73378 38303</span>
              <span className="md:hidden">WhatsApp</span>
            </a>

            {/* Book Now Primary Button */}
            <Button
              to="/booking"
              size="sm"
              variant="primary"
              className="font-mono font-semibold h-9 px-3.5 text-[11px] sm:text-xs shrink-0"
            >
              Book Now
            </Button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden w-9 h-9 rounded-full border border-[#2A2A2A] flex items-center justify-center text-white/80 hover:text-white hover:border-[#39FF14]/50 focus-visible:outline-none shrink-0 transition-colors"
              aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
