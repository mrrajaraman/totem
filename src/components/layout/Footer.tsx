import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Phone, Mail, Instagram, MapPin, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] border-t border-[#222222] text-[#A3A3A3] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
          {/* Brand & Editorial Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link to="/" className="inline-flex items-center gap-2 group mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#2B2B2B] flex items-center justify-center">
                  <span className="font-mono text-base font-black text-[#39FF14]">T</span>
                </div>
                <span className="font-sans font-black text-xl tracking-wider text-white uppercase">
                  TOTEM<span className="text-[#39FF14]">.</span>
                </span>
              </Link>

              <p className="text-sm text-[#A3A3A3] leading-relaxed max-w-sm mb-6">
                Bangalore’s premier free-roam VR arena in Koramangala. Built for people who’d rather walk inside a story than scroll past it.
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#101010] border border-[#222222] text-xs font-mono text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
                <span>Featuring licensed worlds by <strong className="text-white">Anvio VR</strong></span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#1C1C1C]">
              <span className="font-mono text-[11px] tracking-widest text-[#71717A] uppercase block">
                ARENA TELEMETRY
              </span>
              <span className="font-mono text-xs text-white/90">
                12.9374° N · 77.6265° E · Koramangala 6th Block
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs text-white tracking-widest uppercase mb-4 font-semibold">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/worlds" className="hover:text-white transition-colors">
                  All 20 Worlds
                </Link>
              </li>
              <li>
                <Link to="/corporate" className="hover:text-white transition-colors">
                  Corporate Outings
                </Link>
              </li>
              <li>
                <Link to="/birthday" className="hover:text-white transition-colors">
                  Birthday Parties
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">
                  Pricing &amp; Rates
                </Link>
              </li>
              <li>
                <Link to="/partner-with-us" className="hover:text-white transition-colors">
                  Partner / Franchise
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Totem Journal
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Frequently Asked
                </Link>
              </li>
            </ul>
          </div>

          {/* Venue & Location Column */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs text-white tracking-widest uppercase mb-4 font-semibold">
              Visit Arena
            </h4>
            <div className="space-y-3 text-sm leading-relaxed">
              <p className="text-white font-medium">
                Totem · Anvio VR Arena
              </p>
              <p className="text-xs text-[#A3A3A3]">
                2nd Floor, 648 Mahakavi Vemana Road,<br />
                100 Feet Road, 6th Block,<br />
                Koramangala, Bengaluru, Karnataka 560095<br />
                <span className="text-[#39FF14] text-[11px]">(Near Sony World Signal)</span>
              </p>

              <div className="pt-2">
                <a
                  href="https://www.google.com/maps?q=12.937434,77.626500"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#39FF14] hover:underline"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Direct Contact Column */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs text-white tracking-widest uppercase mb-4 font-semibold">
              Direct Contact
            </h4>
            <div className="space-y-3 text-xs font-mono">
              <a
                href="https://wa.me/917337838303"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#39FF14] transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#39FF14]" />
                <span>WhatsApp Us</span>
              </a>
              <a
                href="tel:+917337838303"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-white/50" />
                <span>+91 73378 38303</span>
              </a>
              <a
                href="mailto:info@entertotem.in"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-white/50" />
                <span>info@entertotem.in</span>
              </a>
              <a
                href="https://instagram.com/anvio_bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4 text-white/50" />
                <span>@anvio_bengaluru</span>
              </a>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 border-t border-[#1C1C1C] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#71717A]">
          <p>© 2026 V6 Arena Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/faq" className="hover:text-white transition-colors">Safety &amp; Rules</Link>
            <Link to="/pricing" className="hover:text-white transition-colors">Booking Policies</Link>
            <Link to="/partner-with-us" className="hover:text-white transition-colors">Franchise Terms</Link>
            <Link to="/admin" className="text-zinc-500 hover:text-[#39FF14] transition-colors">HQ Command</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
