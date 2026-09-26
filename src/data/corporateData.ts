import { CorporatePackage } from '../types';

export const CORPORATE_PACKAGES: CorporatePackage[] = [
  {
    id: 'corp-small',
    name: 'Small Squad Outing',
    teamSize: '8 – 15 people',
    priceFormatted: '₹20,000',
    startingPriceNumber: 20000,
    duration: '2 – 3 Hours',
    description: 'Perfect for startups, engineering pods, and project teams celebrating a launch or milestone.',
    includedStations: [
      'Station 01: Free-Roam VR Arena (rotations of 6)',
      'Station 02: Console & Xbox Lounge (racing & football)',
      'Station 03: Refreshments Lounge & bites',
      'Station 04: Tabletop & party games'
    ],
    features: [
      'Private arena time — no outside walk-ins',
      'Dedicated game host to brief & run sessions',
      'All 20 VR worlds available to play',
      'Live gameplay streaming to lounge screens',
      'Official GST invoice provided'
    ],
    badge: 'Popular for Pods'
  },
  {
    id: 'corp-medium',
    name: 'Department Offsite',
    teamSize: '16 – 30 people',
    priceFormatted: '₹34,000',
    startingPriceNumber: 34000,
    duration: '3 – 5 Hours',
    description: 'Designed for cross-functional teams, quarterly off-sites, and company-wide social mixers.',
    includedStations: [
      'Station 01: Free-Roam VR Arena (multi-squad tournament format)',
      'Station 02: Xbox Lounge with 4-player split-screen',
      'Station 03: Extended catering & refreshments area',
      'Station 04: Dedicated board game & chill lounge'
    ],
    features: [
      'Full private arena exclusivity',
      'Tournament leaderboard setup & awards',
      'Multiple game rotations with squad switching',
      'Complimentary snacks and soft drinks',
      'Debrief session + high-res team photo on Slack',
      'Official GST tax invoice'
    ],
    badge: 'Most Popular'
  },
  {
    id: 'corp-buyout',
    name: 'Full Venue Buyout',
    teamSize: '31 – 50 people',
    priceFormatted: '₹68,000',
    startingPriceNumber: 68000,
    duration: 'Half Day / Custom',
    description: 'The entire Totem arena belongs entirely to your company for your annual day or all-hands celebration.',
    includedStations: [
      'Exclusive access to all 4 stations simultaneously',
      'Parallel VR squad runs with zero wait time',
      'Customized catering & dining lounge setup',
      'AV presentation capabilities on large screens'
    ],
    features: [
      'Complete private facility buyout',
      'Customized scheduling and tournament brackets',
      'Multiple dedicated hosts and VR technicians',
      'Custom catering & food options available on request',
      'Groups > 50 can be accommodated in staggered batches',
      'Full GST billing & corporate vendor onboarding'
    ],
    badge: 'Ultimate Event'
  }
];

export const CORPORATE_STATIONS = [
  {
    number: '01',
    name: 'Free-Roam VR Arena',
    tagline: 'The main event.',
    description: 'Up to 6 teammates inside the same untethered virtual world simultaneously. Real physical walking, zero wires, high-stakes co-op missions.'
  },
  {
    number: '02',
    name: 'Xbox & Console Lounge',
    tagline: 'High-energy party gaming.',
    description: 'Big screens equipped with racing, FIFA, and casual party multiplayer games so teammates waiting between VR batches are having a blast.'
  },
  {
    number: '03',
    name: 'Food & Drinks Refuel',
    tagline: 'Bites & craft refreshments.',
    description: 'Comfortable seating area with cold drinks, gourmet snacks, and artisan coffees to refuel and chat.'
  },
  {
    number: '04',
    name: 'Board Games & Social',
    tagline: 'Low-tech group laughter.',
    description: 'Codenames, Exploding Kittens, and classic card games keeping every single person engaged with zero downtime.'
  }
];

export const TEAM_COMMS_SCRIPT = [
  {
    time: '00:41',
    speaker: 'Karthik (Engineering)',
    role: 'Communication',
    text: 'Two coming up the left corridor and my magazine is dry. Ananya, cover me!',
    lesson: 'Nobody can point or gesture casually. You name people explicitly.'
  },
  {
    time: '00:44',
    speaker: 'Ananya (Product)',
    role: 'Trust',
    text: 'Got you covered! Ravi, seal the vault door behind us right now.',
    lesson: 'Covering a colleague is literal here.'
  },
  {
    time: '00:52',
    speaker: 'Ravi (New Intern)',
    role: 'Leadership',
    text: 'Everyone fall back to the blast crates! Drop smoke!',
    lesson: 'Ravi joined three weeks ago. Hierarchy disappears in the headset.'
  },
  {
    time: '01:03',
    speaker: 'Meera (Design Lead)',
    role: 'Decisive Action',
    text: 'Push or hold? — Push. Pushing together in 3, 2, 1!',
    lesson: 'Decisions made in 2 seconds without meetings or slide decks.'
  }
];
