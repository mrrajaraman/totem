import React from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';
import { BIRTHDAY_PACKAGES, BIRTHDAY_MOMENTS } from '../data/birthdayData';
import { Cake, Sparkles, Check, ArrowRight, MessageSquare, Clock, Users, Gift } from 'lucide-react';

export const BirthdayPage: React.FC = () => {
  const partyImages = [
    {
      title: 'First-timers, five minutes in',
      tag: 'Untethered Fun',
      img: 'https://pub-e8615bd8f25545d68dfeb23cda95d612.r2.dev/photos/corporate-arena-action.webp'
    },
    {
      title: 'The lounge between rounds',
      tag: 'Xbox & Bites',
      img: 'https://pub-e8615bd8f25545d68dfeb23cda95d612.r2.dev/photos/totem-lounge-wide.jpg'
    },
    {
      title: 'Hats on, cake incoming',
      tag: 'Private Lounge',
      img: 'https://pub-e8615bd8f25545d68dfeb23cda95d612.r2.dev/photos/totem-arena-and-lounge.jpg'
    }
  ];

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Birthday Hero */}
        <div className="relative rounded-3xl overflow-hidden border border-[#222222] bg-[#0A0A0A] p-8 sm:p-12 md:p-16 mb-20">
          <img
            src="https://pub-e8615bd8f25545d68dfeb23cda95d612.r2.dev/photos/totem-team-briefing.jpg"
            alt="Birthday party celebration at Totem VR"
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

          <div className="relative z-10 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#39FF14] bg-[#39FF14]/10 px-3 py-1 rounded-full border border-[#39FF14]/20 inline-flex items-center gap-1.5 mb-6 font-semibold">
              <Cake className="w-3.5 h-3.5" />
              Birthday Celebrations · Bangalore
            </span>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1] mb-6">
              THE BIRTHDAY THEY WILL CALL{' '}
              <span className="text-[#39FF14]">LEGENDARY.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#C9C6C1] leading-relaxed mb-8">
              No wires, no sitting out on a bench. Your entire squad inside the same virtual world, screaming each other’s names, laughing uncontrollably, and celebrating in our private lounge. We run everything; you just show up.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                href="https://wa.me/917337838303?text=Hi%20Totem%2C%20I'd%20like%20to%20plan%20a%20birthday%20party."
                isExternal
                size="lg"
                variant="primary"
                className="font-mono uppercase tracking-wider text-xs font-bold"
                icon={<MessageSquare className="w-4 h-4 ml-1" />}
              >
                Plan the Party · From ₹1,099/Head
              </Button>

              <Button
                to="/worlds"
                size="lg"
                variant="secondary"
                className="font-mono uppercase tracking-wider text-xs"
              >
                Explore Party Worlds
              </Button>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-6 text-xs font-mono text-[#A3A3A3]">
              <span>Ages 8+ &amp; Adults</span>
              <span>·</span>
              <span>100% Private Slot</span>
              <span>·</span>
              <span>Lounge for Cake Cutting</span>
            </div>
          </div>
        </div>

        {/* Why Totem Birthday */}
        <section className="mb-24">
          <SectionHeader
            eyebrow="No Boredom"
            title="NOT ANOTHER PARTY WHERE EVERYONE IS"
            highlight="ON THEIR PHONE."
            lede="Kids, teens, and grown-ups all play together. Here’s why our birthday format works:"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BIRTHDAY_MOMENTS.map((m, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#0B0B0B] border border-[#222222] flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-[#39FF14] bg-[#39FF14]/10 px-2.5 py-1 rounded-full border border-[#39FF14]/20 inline-block mb-4">
                    {m.tag}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">{m.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed pt-4 border-t border-[#1C1C1C]">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Party Snapshot Gallery */}
        <section className="mb-24">
          <SectionHeader
            eyebrow="Live Energy"
            title="ACTUAL PARTIES."
            highlight="ACTUAL CHAOS."
            lede="Real moments captured from our Koramangala arena lounge and VR floors."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partyImages.map((p, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden border border-[#222222] bg-[#0E0E0E] group">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.8]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-wider bg-black/80 text-[#39FF14] px-2.5 py-1 rounded-full border border-white/10">
                    {p.tag}
                  </span>
                  <p className="absolute bottom-3 left-3 right-3 text-xs font-semibold text-white">
                    {p.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Packages */}
        <section className="mb-24">
          <SectionHeader
            eyebrow="Birthday Packages"
            title="PICK YOUR CELEBRATION"
            highlight="PACKAGE."
            lede="Customized to your squad size and world preferences. Prices exclude GST."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {BIRTHDAY_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="rounded-3xl border border-[#2B2B2B] bg-[#0E0E0E] p-8 flex flex-col justify-between hover:border-[#39FF14]/50 transition-all shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#39FF14] bg-[#39FF14]/10 px-3 py-1 rounded-full border border-[#39FF14]/20 font-semibold">
                      {pkg.badge}
                    </span>
                    <span className="font-mono text-xs text-[#71717A]">{pkg.duration}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-black text-white">{pkg.pricePerPerson}</span>
                    <span className="text-xs font-mono text-[#A3A3A3]">/ head + GST</span>
                  </div>

                  <p className="text-xs text-[#A3A3A3] mb-6 leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="space-y-2.5 mb-8 pt-4 border-t border-[#1C1C1C]">
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#C9C6C1]">
                        <Check className="w-3.5 h-3.5 text-[#39FF14] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={`https://wa.me/917337838303?text=Hi%20Totem%2C%20I'd%20like%20to%20plan%20a%20birthday%20party%20using%20the%20${encodeURIComponent(pkg.name)}%20package.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-12 rounded-full bg-[#39FF14] text-black font-semibold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#32e612] transition-colors"
                >
                  <span>Book on WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Contact Help */}
        <div className="text-center p-8 rounded-3xl bg-[#090909] border border-[#222222]">
          <h3 className="text-xl font-bold text-white mb-2">Want a custom cake, pizza, or specific theme?</h3>
          <p className="text-xs text-[#A3A3A3] mb-6">
            We reply on WhatsApp in under two minutes during business hours.
          </p>
          <Button
            href="https://wa.me/917337838303?text=Hi%20Totem%2C%20I%20have%20custom%20requests%20for%20a%20birthday%20party."
            isExternal
            variant="outline"
            size="md"
          >
            Chat with Birthday Coordinator
          </Button>
        </div>
      </div>
    </div>
  );
};
