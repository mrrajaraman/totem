import React, { useState } from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';
import { Building, Check, Send, Sparkles, MessageSquare, ArrowRight, ShieldCheck, Layers, Award } from 'lucide-react';

export const PartnerPage: React.FC = () => {
  const [partnerName, setPartnerName] = useState('');
  const [partnerPhone, setPartnerPhone] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [partnerCity, setPartnerCity] = useState('');
  const [partnerSpace, setPartnerSpace] = useState('1,500 – 2,500 sq ft');
  const [partnerSource, setPartnerSource] = useState('Google Search');
  const [partnerMessage, setPartnerMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const deliverables = [
    {
      title: 'Full Tech & Tracking Stack',
      desc: 'Certified wireless VR headsets, tracking nodes, high-performance local render servers, and centralized management software.'
    },
    {
      title: 'Licensed 20-World Catalog',
      desc: 'Instant commercial licensing for all Anvio VR games with priority access to newly released global worlds.'
    },
    {
      title: 'Complete Ops Playbook',
      desc: 'Tested daily operational SOPs: check-in scripts, equipment maintenance, safety guidelines, and hygiene sanitization protocols.'
    },
    {
      title: 'Bengaluru Training Week',
      desc: 'One full week of intensive hands-on technical and customer-experience training for you and your staff at our Koramangala arena.'
    },
    {
      title: 'Brand & Marketing Kit',
      desc: 'Signage templates, typography standards, high-res photography, social media assets, and regional PR launch strategy.'
    },
    {
      title: 'Continuous Tech Support',
      desc: 'Dedicated hotline channel for troubleshooting, remote system monitoring, and periodic game engine updates.'
    }
  ];

  const steps = [
    { num: '01', title: 'Submit Enquiry', desc: 'Share your city, space, and investment timeline. Our founding team reviews every application personally.' },
    { num: '02', title: 'Discovery & Financials', desc: 'A 30-minute discovery call to review unit economics, rent feasibility, payback periods, and franchise terms.' },
    { num: '03', title: 'Fit-out & Hardware Setup', desc: 'Hardware shipping, arena floor layout optimization, network configuration, and signage installation.' },
    { num: '04', title: 'Training & Soft Launch', desc: 'Staff training week, dry-run sessions, local marketing launch, and open doors to guests.' }
  ];

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Partner Hero */}
        <div className="relative rounded-3xl overflow-hidden border border-[#222222] bg-[#0A0A0A] p-8 sm:p-12 md:p-16 mb-20">
          <img
            src="https://pub-e8615bd8f25545d68dfeb23cda95d612.r2.dev/photos/totem-arena-wide.jpg"
            alt="Totem VR Franchise Expansion"
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent" />

          <div className="relative z-10 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#39FF14] bg-[#39FF14]/10 px-3 py-1 rounded-full border border-[#39FF14]/20 inline-flex items-center gap-1.5 mb-6 font-semibold">
              <Building className="w-3.5 h-3.5" />
              Franchise &amp; Partnership · India
            </span>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1] mb-6">
              OPEN YOUR OWN <br />
              <span className="text-[#39FF14]">VR ARENA.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#C9C6C1] leading-relaxed mb-8">
              Bring untethered free-roam VR to your city under the Totem brand. We provide the hardware, the software license, the operations playbook, and complete training. You run the arena.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                href="#partner-form"
                size="lg"
                variant="primary"
                className="font-mono uppercase tracking-wider text-xs font-bold"
              >
                Start Franchise Enquiry
              </Button>

              <Button
                href="https://wa.me/917337838303?text=Hi%20Totem%2C%20I'm%20interested%20in%20a%20franchise%20partnership."
                isExternal
                size="lg"
                variant="secondary"
                className="font-mono uppercase tracking-wider text-xs"
                icon={<MessageSquare className="w-4 h-4" />}
              >
                Message on WhatsApp
              </Button>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div>
                <span className="text-lg font-bold text-white block">1,500+</span>
                <span className="text-[#A3A3A3]">Sq Ft Min Space</span>
              </div>
              <div>
                <span className="text-lg font-bold text-white block">20</span>
                <span className="text-[#A3A3A3]">Licensed Worlds</span>
              </div>
              <div>
                <span className="text-lg font-bold text-white block">~2–4 Mo</span>
                <span className="text-[#A3A3A3]">Launch Timeline</span>
              </div>
              <div>
                <span className="text-lg font-bold text-white block">100%</span>
                <span className="text-[#A3A3A3]">Turnkey Tech</span>
              </div>
            </div>
          </div>
        </div>

        {/* What You Get */}
        <section className="mb-24">
          <SectionHeader
            eyebrow="Turnkey Model"
            title="EVERYTHING YOU NEED TO"
            highlight="OPEN AND RUN."
            lede="We solved the complex technical problems, licensing, software updates, and daily operational hurdles so you can focus on building your local business."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((d, i) => (
              <div key={i} className="p-7 rounded-2xl bg-[#0B0B0B] border border-[#222222]">
                <span className="font-mono text-xs font-bold text-[#39FF14] block mb-3">
                  0{i + 1}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{d.title}</h3>
                <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4 Step Process */}
        <section className="mb-24">
          <SectionHeader
            eyebrow="Timeline"
            title="FROM ENQUIRY TO"
            highlight="OPENING DAY."
            lede="Our straightforward 4-step framework to launch an operational VR arena in your city."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st) => (
              <div key={st.num} className="p-6 rounded-2xl bg-[#0E0E0E] border border-[#242424]">
                <span className="font-mono text-xs font-black text-[#39FF14] bg-[#39FF14]/10 px-2.5 py-1 rounded-full inline-block mb-4 border border-[#39FF14]/20">
                  STEP {st.num}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{st.title}</h3>
                <p className="text-xs text-[#A3A3A3] leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Partnership Inquiry Form */}
        <div id="partner-form" className="max-w-3xl mx-auto rounded-3xl bg-[#0B0B0B] border border-[#2B2B2B] p-8 sm:p-12 shadow-2xl">
          <div className="text-center mb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[#39FF14] font-semibold block mb-2">
              FOUNDING TEAM REVIEW
            </span>
            <h3 className="text-3xl font-bold text-white tracking-tight mb-2">
              Tell Us Where You Want to Open
            </h3>
            <p className="text-sm text-[#A3A3A3]">
              Every partnership enquiry is reviewed personally by our founding directors within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-black border border-[#39FF14]/50 text-center space-y-4">
              <span className="w-12 h-12 rounded-full bg-[#39FF14]/15 border border-[#39FF14] flex items-center justify-center mx-auto text-[#39FF14]">
                <Check className="w-6 h-6 stroke-[3]" />
              </span>
              <h4 className="text-xl font-bold text-white">Application Received</h4>
              <p className="text-sm text-[#A3A3A3] max-w-md mx-auto">
                Thank you, {partnerName}! We will examine the feasibility of opening a Totem VR Arena in {partnerCity} and reach out to you directly to arrange a discovery video conference.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    placeholder="e.g. Vikram Malhotra"
                    className="w-full h-12 px-4 bg-[#141414] border border-[#2B2B2B] rounded-xl text-sm text-white focus:outline-none focus:border-[#39FF14]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                    WhatsApp / Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    value={partnerPhone}
                    onChange={(e) => setPartnerPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full h-12 px-4 bg-[#141414] border border-[#2B2B2B] rounded-xl text-sm text-white focus:outline-none focus:border-[#39FF14] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={partnerEmail}
                    onChange={(e) => setPartnerEmail(e.target.value)}
                    placeholder="vikram@example.com"
                    className="w-full h-12 px-4 bg-[#141414] border border-[#2B2B2B] rounded-xl text-sm text-white focus:outline-none focus:border-[#39FF14]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                    Target City / Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={partnerCity}
                    onChange={(e) => setPartnerCity(e.target.value)}
                    placeholder="e.g. Mumbai, Hyderabad, Pune, Chennai"
                    className="w-full h-12 px-4 bg-[#141414] border border-[#2B2B2B] rounded-xl text-sm text-white focus:outline-none focus:border-[#39FF14]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                    Space Available (Approx Sq Ft)
                  </label>
                  <select
                    value={partnerSpace}
                    onChange={(e) => setPartnerSpace(e.target.value)}
                    className="w-full h-12 px-4 bg-[#141414] border border-[#2B2B2B] rounded-xl text-sm text-white focus:outline-none focus:border-[#39FF14]"
                  >
                    <option value="Under 1,500 sq ft">Under 1,500 sq ft</option>
                    <option value="1,500 – 2,500 sq ft">1,500 – 2,500 sq ft (Standard)</option>
                    <option value="2,500 – 4,000 sq ft">2,500 – 4,000 sq ft (Double Arena)</option>
                    <option value="4,000+ sq ft">4,000+ sq ft (Flagship Entertainment Hub)</option>
                    <option value="Not secured yet">Space not secured yet (Exploring)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                    How did you discover Totem?
                  </label>
                  <select
                    value={partnerSource}
                    onChange={(e) => setPartnerSource(e.target.value)}
                    className="w-full h-12 px-4 bg-[#141414] border border-[#2B2B2B] rounded-xl text-sm text-white focus:outline-none focus:border-[#39FF14]"
                  >
                    <option value="Google Search">Google Search</option>
                    <option value="Played at Koramangala Arena">Played at Koramangala Arena</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Referral / Word of Mouth">Referral / Word of Mouth</option>
                    <option value="Instagram">Instagram</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                  Anything else you would like us to know (Optional)
                </label>
                <textarea
                  rows={3}
                  value={partnerMessage}
                  onChange={(e) => setPartnerMessage(e.target.value)}
                  placeholder="Share details regarding your commercial background, commercial real estate access, or target launch timeline..."
                  className="w-full p-4 bg-[#141414] border border-[#2B2B2B] rounded-xl text-sm text-white focus:outline-none focus:border-[#39FF14] resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full justify-center font-mono uppercase tracking-wider text-xs font-bold mt-4"
                icon={<Send className="w-4 h-4 ml-1" />}
              >
                Submit Franchise Enquiry
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
