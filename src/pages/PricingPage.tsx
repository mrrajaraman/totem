import React from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { PRICING_TIERS, PRICING_FAQ_SNIPPETS } from '../data/pricingData';
import { Button } from '../components/ui/Button';
import { SlotReservationWidget } from '../components/pricing/SlotReservationWidget';
import { Check, ShieldCheck, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';

export const PricingPage: React.FC = () => {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          eyebrow="Transparent Rates"
          title="SIMPLE, HONEST"
          highlight="PRICING."
          lede="No hidden fees, no surge charges. Every session includes private arena time, gear, and a dedicated host."
        />

        {/* Weekday Offer Highlight Banner */}
        <div className="max-w-3xl mx-auto mb-16 p-5 rounded-2xl bg-[#0D0D0D] border border-[#39FF14]/40 flex items-center justify-between gap-4 shadow-[0_0_20px_-6px_rgba(57,255,20,0.2)]">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#39FF14] shrink-0" />
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#39FF14] font-bold block">
                Weekday Group Promotion
              </span>
              <p className="text-xs text-[#A3A3A3] mt-0.5">
                Bring 4 to 6 people on <strong className="text-white">Tuesday, Wednesday, or Thursday</strong> and 1 person plays completely free.
              </p>
            </div>
          </div>
          <Button to="/booking" size="sm" variant="primary" className="shrink-0 font-mono text-xs">
            Claim Offer
          </Button>
        </div>

        {/* 3 Tier Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl border p-8 flex flex-col justify-between relative transition-all duration-300 ${
                tier.isPopular
                  ? 'bg-[#101010] border-[#39FF14] shadow-[0_0_30px_-8px_rgba(57,255,20,0.3)] -translate-y-1'
                  : 'bg-[#0A0A0A] border-[#222222] hover:border-[#333333]'
              }`}
            >
              {tier.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest bg-[#39FF14] text-black font-bold px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                <span className="font-mono text-xs text-[#71717A] uppercase tracking-widest block mb-2">
                  {tier.target}
                </span>

                <h3 className="text-2xl font-bold text-white mb-4">
                  {tier.name}
                </h3>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    {tier.startingPrice}
                  </span>
                  <span className="text-xs font-mono text-[#A3A3A3]">
                    {tier.priceNote}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-black/60 border border-[#222222] text-xs font-mono text-[#C9C6C1] mb-6 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#71717A]">Duration:</span>
                    <span className="text-white font-medium">{tier.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#71717A]">Capacity:</span>
                    <span className="text-white font-medium">{tier.groupSize}</span>
                  </div>
                </div>

                <ul className="space-y-3 text-xs text-[#A3A3A3] mb-8 font-normal">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#39FF14] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                to={tier.ctaLink}
                variant={tier.isPopular ? 'primary' : 'secondary'}
                size="md"
                className="w-full justify-center font-mono uppercase tracking-wider text-xs font-bold"
                icon={<ArrowRight className="w-4 h-4 ml-1" />}
              >
                {tier.ctaText}
              </Button>
            </div>
          ))}
        </div>

        {/* Interactive Instant Slot Reservation & Price Calculator matching entertotem.in */}
        <div className="mb-20">
          <SlotReservationWidget className="rounded-3xl border border-[#222230]" />
        </div>

        {/* Pricing Policies and Conditions */}
        <div className="rounded-3xl bg-[#0B0B0B] border border-[#222222] p-8 sm:p-10 mb-16">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#39FF14]" />
            <span>Billing &amp; Payment Policies</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING_FAQ_SNIPPETS.map((snippet, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-black border border-[#1E1E1E]">
                <h4 className="text-sm font-semibold text-white mb-2">
                  {snippet.q}
                </h4>
                <p className="text-xs text-[#A3A3A3] leading-relaxed">
                  {snippet.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Contact Help */}
        <div className="text-center">
          <p className="text-xs font-mono text-[#71717A] mb-3">
            HAVE A CUSTOM GROUP SIZE OR SPECIAL LOGISTICAL REQUEST?
          </p>
          <a
            href="https://wa.me/917337838303?text=Hi%20Totem%2C%20I%20have%20a%20question%20regarding%20pricing."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#39FF14] hover:underline"
          >
            <span>Ask our team directly on WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
