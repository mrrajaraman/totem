import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { CORPORATE_STATIONS } from '../../data/corporateData';
import { Gamepad2, Users, Coffee, Sparkles } from 'lucide-react';

export const StationShowcase: React.FC = () => {
  const stationIcons = [
    <Sparkles className="w-5 h-5 text-[#39FF14]" key="1" />,
    <Gamepad2 className="w-5 h-5 text-[#39FF14]" key="2" />,
    <Coffee className="w-5 h-5 text-[#39FF14]" key="3" />,
    <Users className="w-5 h-5 text-[#39FF14]" key="4" />
  ];

  return (
    <section className="py-20 md:py-28 bg-[#070707] border-t border-[#1C1C1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="04"
          eyebrow="Zero Bench Time"
          title="FOUR STATIONS RUNNING SIMULTANEOUSLY."
          highlight="NOBODY WAITS."
          lede="Unlike typical entertainment venues that leave half your group sitting on sidelines, Totem operates four simultaneous entertainment zones."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORPORATE_STATIONS.map((st, idx) => (
            <div
              key={st.number}
              className="p-6 sm:p-7 rounded-2xl bg-[#0D0D0D] border border-[#222222] hover:border-[#39FF14]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-bold text-[#39FF14] bg-[#39FF14]/10 px-2.5 py-1 rounded-full border border-[#39FF14]/20">
                    STATION {st.number}
                  </span>
                  {stationIcons[idx]}
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#39FF14] transition-colors">
                  {st.name}
                </h3>

                <p className="font-mono text-xs text-[#71717A] mb-4">
                  {st.tagline}
                </p>
              </div>

              <p className="text-sm text-[#A3A3A3] leading-relaxed pt-4 border-t border-[#1C1C1C]">
                {st.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
