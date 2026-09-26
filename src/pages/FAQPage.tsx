import React, { useState, useMemo } from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { FAQ_DATA, FAQ_CATEGORIES } from '../data/faqData';
import { Accordion } from '../components/ui/Accordion';
import { Button } from '../components/ui/Button';
import { Search, MessageSquare, Phone, ArrowRight, X } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      if (selectedCat !== 'All' && item.category !== selectedCat) {
        return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesQ = item.question.toLowerCase().includes(q);
        const matchesA = item.answer.toLowerCase().includes(q);
        if (!matchesQ && !matchesA) return false;
      }
      return true;
    }).map((item) => ({
      id: item.id,
      title: item.question,
      category: item.category,
      content: item.answer,
    }));
  }, [selectedCat, search]);

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          eyebrow="Help &amp; Knowledge Base"
          title="FREQUENTLY ASKED"
          highlight="QUESTIONS."
          lede="Everything you need to know before stepping into the arena: equipment, eyeglasses, motion sickness, age limits, and venue logistics."
        />

        {/* Filter & Search Bar */}
        <div className="space-y-4 mb-10">
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions (e.g. glasses, pricing, kids, shoes)..."
              className="w-full h-12 pl-11 pr-10 bg-[#101010] border border-[#2B2B2B] rounded-full text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#39FF14]"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCat === cat
                    ? 'bg-[#39FF14] text-black font-bold'
                    : 'bg-[#101010] text-[#A3A3A3] border border-[#262626] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion Component */}
        {filteredFaqs.length > 0 ? (
          <Accordion items={filteredFaqs} allowMultiple={false} />
        ) : (
          <div className="p-12 text-center rounded-2xl bg-[#0E0E0E] border border-[#222222]">
            <p className="text-white font-semibold mb-2">No matching questions found</p>
            <p className="text-xs text-[#A3A3A3] mb-4">Try clearing your search term or selecting another category.</p>
            <Button size="sm" variant="secondary" onClick={() => { setSearch(''); setSelectedCat('All'); }}>
              Reset Filters
            </Button>
          </div>
        )}

        {/* WhatsApp Help Fallback Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-[#0A0A0A] border border-[#222222] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#39FF14] font-semibold block mb-1">
              STILL WONDERING SOMETHING SPECIFIC?
            </span>
            <h3 className="text-xl font-bold text-white mb-1">
              Ask our arena hosts on WhatsApp.
            </h3>
            <p className="text-xs text-[#A3A3A3]">
              We reply in about two minutes during business hours.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              href="https://wa.me/917337838303?text=Hi%20Totem%2C%20I%20have%20a%20question%20before%20booking."
              isExternal
              variant="primary"
              size="md"
              icon={<MessageSquare className="w-4 h-4" />}
            >
              Ask on WhatsApp
            </Button>
            <Button
              href="tel:+917337838303"
              variant="secondary"
              size="md"
              icon={<Phone className="w-4 h-4" />}
            >
              Call Arena
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
