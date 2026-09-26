import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ArrowRight, MessageSquare, Phone, MapPin, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  if (!isOpen) return null;

  const links = [
    { label: 'VR Worlds (20 Games)', href: '/worlds', desc: 'From party chaos to intense horror' },
    { label: 'Corporate Outings', href: '/corporate', desc: 'Private 4-station team building' },
    { label: 'Birthday Parties', href: '/birthday', desc: 'Zero bench time, cake & celebration' },
    { label: 'Pricing & Packages', href: '/pricing', desc: 'Transparent rates from ₹799/person' },
    { label: 'Partner With Us', href: '/partner-with-us', desc: 'Open a Totem VR Arena in your city' },
    { label: 'Common FAQs', href: '/faq', desc: 'Glasses, motion sickness, safety & booking' },
    { label: 'Totem Journal', href: '/blog', desc: 'Guides, offsite strategies & VR insights' },
    { label: 'Location & Venue', href: '/location', desc: 'Koramangala, Bengaluru (Sony World Signal)' },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-black/95 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#222222]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#2B2B2B] flex items-center justify-center">
            <span className="font-mono text-base font-black text-[#39FF14]">T</span>
          </div>
          <span className="font-sans font-black text-lg tracking-wider text-white uppercase">
            TOTEM<span className="text-[#39FF14]">.</span>
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full border border-[#2A2A2A] flex items-center justify-center text-white/80 hover:text-white"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Navigation List */}
      <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-[#1D1D1D]">
        {links.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <Link
              key={link.href}
              to={link.href}
              onClick={onClose}
              className="py-4 flex items-center justify-between group active:bg-white/[0.02]"
            >
              <div>
                <p className={`text-lg font-bold tracking-tight transition-colors ${
                  isActive ? 'text-[#39FF14]' : 'text-white group-hover:text-[#39FF14]'
                }`}>
                  {link.label}
                </p>
                <p className="text-xs text-[#A3A3A3] mt-0.5 font-normal">
                  {link.desc}
                </p>
              </div>
              <ArrowRight className={`w-4 h-4 text-white/30 group-hover:text-[#39FF14] group-hover:translate-x-1 transition-all ${
                isActive ? 'text-[#39FF14] translate-x-0' : ''
              }`} />
            </Link>
          );
        })}

        {/* Weekday Offer Highlight */}
        <div className="pt-4 pb-2">
          <div className="p-3.5 rounded-xl bg-[#141414] border border-[#39FF14]/30 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-[#39FF14] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-white">Weekday Deal (Tue–Thu)</p>
              <p className="text-[11px] text-[#A3A3A3] mt-0.5">Bring 4–6 people and 1 person plays free. Starting ₹799/person.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Drawer */}
      <div className="p-6 border-t border-[#222222] bg-[#0A0A0A] flex flex-col gap-3">
        <Button
          to="/booking"
          variant="primary"
          size="lg"
          className="w-full justify-center text-sm font-mono uppercase tracking-wider"
          onClick={onClose}
        >
          Book a Session Now
        </Button>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href="https://wa.me/917337838303?text=Hi%20Totem%2C%20I%20have%20a%20question%20before%20booking."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 h-11 rounded-full border border-[#2B2B2B] text-xs font-mono text-white/90 hover:bg-white/5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#39FF14]" />
            <span>WhatsApp Us</span>
          </a>
          <a
            href="tel:+917337838303"
            className="flex items-center justify-center gap-2 h-11 rounded-full border border-[#2B2B2B] text-xs font-mono text-white/90 hover:bg-white/5"
          >
            <Phone className="w-3.5 h-3.5 text-white/60" />
            <span>Call Arena</span>
          </a>
        </div>
      </div>
    </div>
  );
};
