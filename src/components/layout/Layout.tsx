import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AnnouncementBanner } from './AnnouncementBanner';
import { Navbar } from './Navbar';
import { MobileDrawer } from './MobileDrawer';
import { Footer } from './Footer';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from '../ui/Button';
import { ScrollProgressBar } from '../motion/MotionWrapper';

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isBookingPage = location.pathname === '/booking';

  return (
    <div className="flex flex-col min-h-screen bg-black text-[#F5F5F5] selection:bg-[#39FF14] selection:text-black">
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      <AnnouncementBanner />
      
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <main className="flex-1">
        {children}
      </main>

      <Footer />

      {/* Sticky Mobile Conversion Bar (shown only when NOT on /booking) */}
      {!isBookingPage && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-lg border-t border-[#222222] p-3 px-4 flex items-center justify-between gap-3 shadow-2xl">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-mono tracking-widest text-[#39FF14] uppercase font-semibold">
              From ₹799 / Person
            </span>
            <span className="text-xs text-white/90 font-medium truncate">
              Koramangala · Private Arena
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://wa.me/917337838303?text=Hi%20Totem%2C%20I%27d%20like%20to%20check%20today%27s%20available%20slots."
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[#2E2E2E] flex items-center justify-center text-white/80 hover:text-white"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-4 h-4 text-[#39FF14]" />
            </a>

            <Button
              to="/booking"
              size="sm"
              variant="primary"
              className="text-xs font-mono font-bold tracking-wider uppercase h-10 px-4"
            >
              Book Session
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
