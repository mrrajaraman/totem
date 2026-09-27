import React, { useState } from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';
import { CORPORATE_PACKAGES, CORPORATE_STATIONS, TEAM_COMMS_SCRIPT } from '../data/corporateData';
import { Building2, Check, Clock, Users, ArrowRight, MessageSquare, ShieldCheck, Sparkles, Send, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const CorporatePage: React.FC = () => {
  const [teamSize, setTeamSize] = useState('16 – 30 people');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [hearAbout, setHearAbout] = useState('Google Search');
  const [quoteSent, setQuoteSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('corporate_inquiries').insert([
        {
          contact_name: contactName,
          company_name: companyName,
          work_email: email,
          phone: phone,
          team_size: teamSize,
          hear_about: hearAbout,
        },
      ]);

      if (error) {
        console.warn('Corporate inquiry Supabase notice:', error);
      }
      setQuoteSent(true);
    } catch (err) {
      console.warn('Corporate inquiry submission fallback:', err);
      setQuoteSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Corporate Hero */}
        <div className="relative rounded-3xl overflow-hidden border border-[#222222] bg-[#0A0A0A] p-8 sm:p-12 md:p-16 mb-20">
          <img
            src="https://pub-e8615bd8f25545d68dfeb23cda95d612.r2.dev/photos/totem-large-group-corporate-outing.webp"
            alt="Corporate team outing at Totem VR Arena"
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

          <div className="relative z-10 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#39FF14] bg-[#39FF14]/10 px-3 py-1 rounded-full border border-[#39FF14]/20 inline-flex items-center gap-1.5 mb-6 font-semibold">
              <Building2 className="w-3.5 h-3.5" />
              Corporate Team Offsites · Bangalore
            </span>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1] mb-6">
              TEAM OUTINGS THAT PEOPLE ACTUALLY{' '}
              <span className="text-[#39FF14]">REMEMBER.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#C9C6C1] leading-relaxed mb-8">
              One shared free-roam VR mission where your team communicates under pressure, covers each other’s backs, and leaves energized. The things offsites promise and rarely deliver.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                href="#quote-form"
                size="lg"
                variant="primary"
                className="font-mono uppercase tracking-wider text-xs font-bold"
              >
                Get a Corporate Quote
              </Button>

              <Button
                href="https://wa.me/917337838303?text=Hi%20Totem%2C%20I'd%20like%20to%20schedule%20a%20free%2020-min%20walkthrough%20for%20our%20team."
                isExternal
                size="lg"
                variant="secondary"
                className="font-mono uppercase tracking-wider text-xs"
                icon={<MessageSquare className="w-4 h-4" />}
              >
                Book Free Walkthrough
              </Button>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-6 text-xs font-mono text-[#A3A3A3]">
              <span>50+ Companies Hosted</span>
              <span>·</span>
              <span>Packages from ₹20,000</span>
              <span>·</span>
              <span>Official GST Invoices</span>
            </div>
          </div>
        </div>

        {/* Mid-Mission Voice Comms Transcript */}
        <section className="mb-24">
          <SectionHeader
            eyebrow="Radical Collaboration"
            title="BOWLING GETS YOU A NIGHT OUT."
            highlight="THIS GETS YOU A TEAM."
            lede="In a headset you can't point or nod casually. Your squad has to speak out loud, by name, under high pressure. Here is what a typical exchange sounds like:"
          />

          <div className="rounded-3xl bg-[#0D0D0D] border border-[#242424] p-6 sm:p-10 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1E1E1E] pb-4 mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#39FF14] font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
                Live Squad Audio Feed · Mission Revolta
              </span>
              <span className="font-mono text-xs text-[#71717A]">Koramangala Arena</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM_COMMS_SCRIPT.map((c, i) => (
                <div key={i} className="p-5 rounded-2xl bg-black border border-[#1F1F1F] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[#71717A] mb-3">
                      <span>{c.time}</span>
                      <span className="text-[#39FF14] font-semibold">[{c.role}]</span>
                    </div>
                    <span className="text-xs font-bold text-white block mb-2">{c.speaker}</span>
                    <p className="text-sm text-[#C9C6C1] italic mb-4">
                      &ldquo;{c.text}&rdquo;
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#1C1C1C] text-[11px] font-mono text-[#A3A3A3]">
                    {c.lesson}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-[#141414] border border-[#2B2B2B] text-xs text-[#A3A3A3] text-center font-mono">
              &ldquo;Our 22-member team is scattered across two floors and barely talks. Half the office had exchanged numbers by the debrief.&rdquo; — <strong className="text-white">Priya Nair, HR Lead, Bangalore Fintech</strong>
            </div>
          </div>
        </section>

        {/* 4 Stations Simultaneous Layout */}
        <section className="mb-24">
          <SectionHeader
            eyebrow="Zero Bench Time"
            title="FOUR STATIONS RUNNING."
            highlight="NOBODY SITS OUT."
            lede="Squads rotate seamlessly between free-roam VR, Xbox multiplayer consoles, bites and beverages, and tabletop cards."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORPORATE_STATIONS.map((st) => (
              <div
                key={st.number}
                className="p-6 rounded-2xl bg-[#0B0B0B] border border-[#222222] flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#39FF14] block mb-3">
                    STATION {st.number}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {st.name}
                  </h3>
                  <p className="text-xs font-mono text-[#71717A] mb-3">
                    {st.tagline}
                  </p>
                </div>
                <p className="text-xs text-[#A3A3A3] leading-relaxed pt-3 border-t border-[#1C1C1C]">
                  {st.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Corporate Package Tiers */}
        <section className="mb-24">
          <SectionHeader
            eyebrow="Package Comparison"
            title="TRANSPARENT CORPORATE"
            highlight="PACKAGES."
            lede="Packages start from ₹20,000 for small pods up to ₹68,000 for full arena buyouts. Prices exclude GST."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {CORPORATE_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-3xl border p-8 flex flex-col justify-between transition-all ${
                  pkg.badge === 'Most Popular'
                    ? 'bg-[#101010] border-[#39FF14] shadow-[0_0_30px_-8px_rgba(57,255,20,0.3)]'
                    : 'bg-[#0A0A0A] border-[#222222]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#39FF14] font-semibold">
                      {pkg.badge}
                    </span>
                    <span className="text-xs font-mono text-[#71717A]">
                      {pkg.duration}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <span className="text-xs font-mono text-[#A3A3A3] block mb-4">
                    Recommended for {pkg.teamSize}
                  </span>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-black text-white">{pkg.priceFormatted}</span>
                    <span className="text-xs font-mono text-[#A3A3A3]">+ GST</span>
                  </div>

                  <p className="text-xs text-[#A3A3A3] mb-6 leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="space-y-2 mb-6 pt-4 border-t border-[#1C1C1C]">
                    <span className="text-xs font-mono uppercase text-[#71717A] block">What&rsquo;s Included:</span>
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#C9C6C1]">
                        <Check className="w-3.5 h-3.5 text-[#39FF14] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  href="#quote-form"
                  variant={pkg.badge === 'Most Popular' ? 'primary' : 'secondary'}
                  size="md"
                  className="w-full justify-center font-mono uppercase tracking-wider text-xs font-bold"
                >
                  Request Quote for This Tier
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Free 20-min Walkthrough Banner */}
        <div className="mb-24 p-8 sm:p-10 rounded-3xl bg-[#0E0E0E] border border-[#2B2B2B] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#39FF14] font-semibold block mb-2">
              HR HEADS &amp; FOUNDERS
            </span>
            <h3 className="text-2xl font-bold text-white mb-2">
              See the venue before you commit.
            </h3>
            <p className="text-sm text-[#A3A3A3] leading-relaxed">
              Come in for a free 20-minute venue walkthrough on any weekday before 6 PM. Check out the arena, try on a headset for a quick demo round, and ask our team anything.
            </p>
          </div>

          <Button
            href="https://wa.me/917337838303?text=Hi%20Totem%2C%20I%27d%20like%20to%20schedule%20a%20free%2020-min%20walkthrough."
            isExternal
            variant="primary"
            size="md"
            className="shrink-0 font-mono uppercase tracking-wider text-xs font-bold"
          >
            Schedule Free Walkthrough
          </Button>
        </div>

        {/* Corporate Quote Form */}
        <div id="quote-form" className="max-w-3xl mx-auto rounded-3xl bg-[#0B0B0B] border border-[#262626] p-8 sm:p-12 shadow-2xl">
          <div className="text-center mb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[#39FF14] font-semibold block mb-2">
              DIRECT CORPORATE DESK
            </span>
            <h3 className="text-3xl font-bold text-white tracking-tight mb-2">
              Request an Exact Corporate Quote
            </h3>
            <p className="text-sm text-[#A3A3A3]">
              Fill in the basics and we will respond with an itemized quote within 2 hours.
            </p>
          </div>

          {quoteSent ? (
            <div className="p-8 rounded-2xl bg-black border border-[#39FF14]/50 text-center space-y-4">
              <span className="w-12 h-12 rounded-full bg-[#39FF14]/15 border border-[#39FF14] flex items-center justify-center mx-auto text-[#39FF14]">
                <Check className="w-6 h-6 stroke-[3]" />
              </span>
              <h4 className="text-xl font-bold text-white">Quote Request Received</h4>
              <p className="text-sm text-[#A3A3A3] max-w-md mx-auto">
                Thank you, {contactName}! Our event manager will review your team requirements for {companyName} and send your custom package proposal via WhatsApp and Email.
              </p>
              <Button
                href="https://wa.me/917337838303?text=Hi%20Totem%2C%20I%20just%20submitted%20a%20corporate%20quote%20request."
                isExternal
                variant="primary"
                size="sm"
                className="font-mono text-xs uppercase tracking-wider"
              >
                Chat on WhatsApp Now
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmitQuote} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Priya Nair"
                    className="w-full h-12 px-4 bg-[#141414] border border-[#2B2B2B] rounded-xl text-sm text-white focus:outline-none focus:border-[#39FF14]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Razorpay, Swiggy, Zerodha"
                    className="w-full h-12 px-4 bg-[#141414] border border-[#2B2B2B] rounded-xl text-sm text-white focus:outline-none focus:border-[#39FF14]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="priya@company.com"
                    className="w-full h-12 px-4 bg-[#141414] border border-[#2B2B2B] rounded-xl text-sm text-white focus:outline-none focus:border-[#39FF14]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                    WhatsApp / Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full h-12 px-4 bg-[#141414] border border-[#2B2B2B] rounded-xl text-sm text-white focus:outline-none focus:border-[#39FF14] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                    Expected Team Size *
                  </label>
                  <select
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full h-12 px-4 bg-[#141414] border border-[#2B2B2B] rounded-xl text-sm text-white focus:outline-none focus:border-[#39FF14]"
                  >
                    <option value="8 – 15 people">8 – 15 people (from ₹20,000)</option>
                    <option value="16 – 30 people">16 – 30 people (from ₹34,000)</option>
                    <option value="31 – 50 people">31 – 50 people (Full Buyout ₹68,000)</option>
                    <option value="50+ people">50+ people (Multiple Staggered Batches)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                    How did you hear about Totem?
                  </label>
                  <select
                    value={hearAbout}
                    onChange={(e) => setHearAbout(e.target.value)}
                    className="w-full h-12 px-4 bg-[#141414] border border-[#2B2B2B] rounded-xl text-sm text-white focus:outline-none focus:border-[#39FF14]"
                  >
                    <option value="Google Search">Google Search</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Word of mouth / Referral">Word of mouth / Referral</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Walked past Koramangala arena">Walked past Koramangala arena</option>
                  </select>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full justify-center font-mono uppercase tracking-wider text-xs font-bold mt-4"
                icon={isSubmitting ? <Loader2 className="w-4 h-4 ml-1 animate-spin" /> : <Send className="w-4 h-4 ml-1" />}
              >
                {isSubmitting ? 'Submitting Details...' : 'Send Quote Request (Replies in \u2264 2 Hours)'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
