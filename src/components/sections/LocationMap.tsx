import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { MapPin, Navigation, Phone, MessageSquare, Clock, Car, Compass } from 'lucide-react';
import { Button } from '../ui/Button';

export const LocationMap: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#050505] border-t border-[#1C1C1C]" id="location">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="07"
          eyebrow="Venue &amp; Accessibility"
          title="CENTRAL KORAMANGALA."
          highlight="EASY TO FIND."
          lede="Located on 100 Feet Road near the Sony World signal, accessible within 15 minutes from Indiranagar, HSR Layout, and Jayanagar."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Venue Details Card */}
          <div className="lg:col-span-6 rounded-3xl bg-[#0A0A0A] border border-[#222222] p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212] border border-[#2B2B2B] text-xs font-mono text-[#39FF14]">
                <Compass className="w-3.5 h-3.5" />
                <span>12.9374° N · 77.6265° E</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Totem · Anvio VR Arena
                </h3>
                <p className="text-base text-[#C9C6C1] leading-relaxed">
                  2nd Floor, 648 Mahakavi Vemana Road,<br />
                  100 Feet Road, 6th Block, Koramangala,<br />
                  Bengaluru, Karnataka 560095
                </p>
                <p className="text-xs font-mono text-[#39FF14] mt-2">
                  Landmark: Near Sony World Signal
                </p>
              </div>

              {/* Transit & Parking Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#1C1C1C] text-xs">
                <div className="flex items-start gap-2.5">
                  <Car className="w-4 h-4 text-[#39FF14] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-mono">Parking:</strong>
                    <span className="text-[#A3A3A3]">Street parking on 100ft Road and adjacent 6th Block lanes.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Navigation className="w-4 h-4 text-[#39FF14] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-mono">Cabs:</strong>
                    <span className="text-[#A3A3A3]">Ola &amp; Uber drop off directly at building reception door.</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs pt-2">
                <Clock className="w-4 h-4 text-[#39FF14] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-mono">Operating Hours:</strong>
                  <span className="text-[#A3A3A3]">Tuesday – Sunday: 11:00 AM – 10:30 PM (Mondays open for corporate advance bookings)</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-8 border-t border-[#1C1C1C] flex flex-wrap gap-3 mt-8">
              <Button
                href="https://www.google.com/maps?q=12.937434,77.626500"
                isExternal
                variant="primary"
                size="sm"
                icon={<Navigation className="w-3.5 h-3.5" />}
              >
                Open Google Maps
              </Button>

              <Button
                href="https://wa.me/917337838303?text=Hi%20Totem%2C%20could%20you%20share%20directions%20to%20the%20arena%3F"
                isExternal
                variant="secondary"
                size="sm"
                icon={<MessageSquare className="w-3.5 h-3.5" />}
              >
                WhatsApp Directions
              </Button>

              <Button
                href="tel:+917337838303"
                variant="ghost"
                size="sm"
                icon={<Phone className="w-3.5 h-3.5" />}
              >
                +91 73378 38303
              </Button>
            </div>
          </div>

          {/* Right Visual / Map Graphic */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-[#222222] bg-[#0A0A0A] relative flex flex-col min-h-[380px]">
            {/* Visual Photo with Map Pin Overlay */}
            <div className="relative flex-1">
              <img
                src="https://pub-e8615bd8f25545d68dfeb23cda95d612.r2.dev/photos/totem-arena-wide.jpg"
                alt="Totem VR Venue Entrance"
                className="w-full h-full object-cover filter brightness-[0.5] contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Pin Callout */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="relative inline-flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#39FF14]/20 animate-ping absolute" />
                  <div className="w-12 h-12 rounded-full bg-black border-2 border-[#39FF14] flex items-center justify-center text-[#39FF14] shadow-[0_0_24px_#39FF14] relative z-10">
                    <MapPin className="w-6 h-6" />
                  </div>
                </div>
                <div className="mt-3 bg-black/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-mono text-white inline-block">
                  TOTEM · 100 FT ROAD
                </div>
              </div>
            </div>

            <div className="p-5 bg-[#0C0C0C] border-t border-[#1C1C1C] flex items-center justify-between text-xs font-mono text-[#A3A3A3]">
              <span>Koramangala 6th Block · Sony World Signal</span>
              <a
                href="https://www.google.com/maps?q=12.937434,77.626500"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#39FF14] hover:underline"
              >
                View Live Satellite &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
