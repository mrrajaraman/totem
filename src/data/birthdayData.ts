import { BirthdayPackage } from '../types';

export const BIRTHDAY_PACKAGES: BirthdayPackage[] = [
  {
    id: 'bday-standard',
    name: 'The Epic Squad Party',
    pricePerPerson: '₹1,099',
    startingPriceNumber: 1099,
    minGroup: 'Min 6 players',
    duration: '90 – 120 Minutes',
    description: 'High-energy celebration where the birthday group gets the arena and private party lounge.',
    features: [
      'Private free-roam VR sessions (batches of 6)',
      'Dedicated game master to manage games and supervise',
      'Private lounge for cake cutting and birthday songs',
      'Choice of 20 VR worlds (from Monkey Madness to DragonFall)',
      'Digital photos and team victory reaction clips',
      'Clean up handled 100% by Totem staff'
    ],
    badge: 'Popular for Ages 8–16'
  },
  {
    id: 'bday-vip',
    name: 'The Ultimate Legendary Bash',
    pricePerPerson: '₹1,499',
    startingPriceNumber: 1499,
    minGroup: 'Min 8 players',
    duration: '2.5 – 3 Hours',
    description: 'Full multi-round tournament, party decorations, custom pizza/snacks package, and extended lounge time.',
    features: [
      'Multiple rounds across different VR worlds',
      'Custom party decorations & birthday banner setup',
      'Gourmet snacks, juice boxes, and sodas included',
      'Console gaming lounge & Nintendo/Xbox party games',
      'Exclusive Totem VIP birthday gift badge for the birthday star',
      'Dedicated host handling cake delivery, timing, and games'
    ],
    badge: 'All-Inclusive Fun'
  }
];

export const BIRTHDAY_MOMENTS = [
  {
    title: 'Actual Chaos, Zero Boredom',
    description: 'While 6 players are screaming inside the VR arena, the rest are in the lounge playing Xbox, eating snacks, or playing cards. Nobody sits out on a bench.',
    tag: 'No Waiting'
  },
  {
    title: 'Private to Your Group',
    description: 'No strangers sharing the arena or interrupting your party. The space is locked exclusively for your friends and family.',
    tag: '100% Private'
  },
  {
    title: 'We Run It, You Just Show Up',
    description: 'Our energetic hosts handle the fitting, the tutorials, the game rotations, and the scoreboards. Parents can actually sit back and enjoy coffee.',
    tag: 'Zero Stress'
  }
];
