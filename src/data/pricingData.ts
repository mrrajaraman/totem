export interface PricingTier {
  id: string;
  name: string;
  target: string;
  startingPrice: string;
  priceNote: string;
  duration: string;
  groupSize: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  isPopular?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'consumer-session',
    name: 'Standard Arena Session',
    target: 'Friends, Couples & Small Groups',
    startingPrice: '₹799',
    priceNote: 'per person + GST',
    duration: '15 to 45 min worlds',
    groupSize: '1 to 6 players',
    features: [
      'Entire VR arena private to your squad',
      'Untethered wireless headsets with full room mobility',
      'Choice of any of our 20 VR Worlds',
      '5-minute host briefing & gear fitting',
      'Advance deposit only ₹354 to lock slot',
      'Free cancellation up to 24h prior'
    ],
    ctaText: 'Book a Session',
    ctaLink: '/booking',
    isPopular: true
  },
  {
    id: 'birthday-party',
    name: 'Birthday & Squad Bash',
    target: 'Celebrations & Social Gatherings',
    startingPrice: '₹1,099',
    priceNote: 'per person + GST',
    duration: '90 to 120 minutes',
    groupSize: '6 to 25+ guests',
    features: [
      'Private arena time with rotating batches',
      'Exclusive party lounge for cake & dining',
      'Dedicated host managing the whole event',
      'Xbox lounge & board game stations included',
      'Custom cake & catering arrangements available',
      'Memorable group photos & digital video clips'
    ],
    ctaText: 'Plan a Party',
    ctaLink: '/birthday'
  },
  {
    id: 'corporate-offsite',
    name: 'Corporate Team Outing',
    target: 'Startups, Teams & Companies',
    startingPrice: '₹1,400',
    priceNote: 'per head + GST (Packages from ₹20k)',
    duration: '2 to 5 hours',
    groupSize: '8 to 50 people',
    features: [
      'Full private venue exclusivity (no walk-ins)',
      'Four simultaneous stations (VR, Xbox, Food, Tabletop)',
      'Tournament leaderboard & squad rotations',
      'Snacks & refreshments included',
      'Free 20-min pre-booking venue walkthrough',
      'Official GST company invoicing'
    ],
    ctaText: 'Get a Corporate Quote',
    ctaLink: '/corporate'
  }
];

export const PRICING_FAQ_SNIPPETS = [
  {
    q: 'How does the booking payment work?',
    a: 'For consumer sessions, you pay a small deposit of ₹354 online to lock your private arena slot. The remaining balance based on your chosen world and final headcount is settled conveniently at the venue via UPI or Card.'
  },
  {
    q: 'Is there a weekday promotion?',
    a: 'Yes! Bring a group of 4 to 6 people on Tuesday, Wednesday, or Thursday, and 1 person plays completely free.'
  },
  {
    q: 'What is your cancellation and rescheduling policy?',
    a: 'We offer 100% free cancellation with a full refund up to 24 hours before your booked slot. If you need to change your time within 24 hours, our team will do our best to reschedule you to another open slot within the same week.'
  }
];
