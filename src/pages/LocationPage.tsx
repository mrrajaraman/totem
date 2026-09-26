import React from 'react';
import { LocationMap } from '../components/sections/LocationMap';
import { SectionHeader } from '../components/ui/SectionHeader';
import { MapPin, Navigation, Car, Train, Clock, Phone, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const LocationPage: React.FC = () => {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          eyebrow="Venue &amp; Accessibility"
          title="HOW TO GET TO"
          highlight="TOTEM VR."
          lede="Centrally located in Koramangala 6th Block, Bangalore. Easily reached from Indiranagar, HSR Layout, BTM Layout, and Jayanagar."
        />

        <LocationMap />

        {/* Detailed Transit Guide */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0B0B0B] border border-[#222222]">
            <Car className="w-5 h-5 text-[#39FF14] mb-3" />
            <h4 className="text-base font-bold text-white mb-2">Cabs &amp; Rideshares</h4>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              Set your drop location in Uber or Ola to <strong className="text-white">&ldquo;Totem VR Arena&rdquo;</strong> or &ldquo;648 Mahakavi Vemana Road&rdquo;. Drivers drop off directly in front of the ground floor entrance.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B0B0B] border border-[#222222]">
            <Navigation className="w-5 h-5 text-[#39FF14] mb-3" />
            <h4 className="text-base font-bold text-white mb-2">Driving &amp; Parking</h4>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              Street parking is available directly along 100 Feet Road and adjacent residential lanes in 6th Block. Two-wheeler parking is available inside the compound.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B0B0B] border border-[#222222]">
            <Clock className="w-5 h-5 text-[#39FF14] mb-3" />
            <h4 className="text-base font-bold text-white mb-2">Operating Schedule</h4>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              Open Tuesday to Sunday from 11:00 AM until 10:30 PM. Advance bookings strongly recommended for Friday, Saturday, and Sunday evening slots.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
