import { FAQItem } from '../types';

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-01',
    category: 'VR Experience',
    question: 'What actually happens when I arrive?',
    answer: 'You check in at our reception on the 2nd floor, get fitted with an untethered VR headset, and your personal game host walks you through the intuitive controls in about 5 minutes. Then the virtual world boots up and you are completely free to walk, explore, duck, and play. No wires, no backpacks, no clunky controls. When the mission completes, headsets come off and you can review your stats and debrief in the lounge.'
  },
  {
    id: 'faq-02',
    category: 'Age & Safety',
    question: 'Will I feel motion sick?',
    answer: 'Free-roam VR is fundamentally different from seated or console VR. Because you physically walk across real floor space instead of using a joystick to artificially slide or teleport, your inner ear and your visual perception remain 100% in sync. Over 95% of our guests experience zero motion discomfort. If you ever feel uneasy, simply remove the headset; your host is standing right beside the arena to assist immediately.'
  },
  {
    id: 'faq-03',
    category: 'VR Experience',
    question: 'I wear glasses. Will the headset fit?',
    answer: 'Yes! Our untethered headsets are custom-molded with spacious facial interfaces designed to comfortably fit over almost all standard eyeglasses. For guests with wider frames, we also keep custom optical inserts on hand. You can also mention it when booking or via WhatsApp and our team will have the headset prepared for you.'
  },
  {
    id: 'faq-04',
    category: 'Age & Safety',
    question: 'How old should kids be? Can families play together?',
    answer: 'Most of our worlds are accessible from age 8 and up. Games like Monkey Madness, Arrowsong, and DragonFall are wildly popular for kids and families. For our intense horror and zombie survival titles (like Dark Z, Insanity, and City Z), we enforce a strict 14+ minimum age rating.'
  },
  {
    id: 'faq-05',
    category: 'VR Experience',
    question: 'I have never tried VR or played video games. Will I be able to keep up?',
    answer: 'Over 60% of our first-time guests have never put on a VR headset before. Unlike traditional video games that require memorizing button combos on a controller, free-roam VR is natural: you look with your eyes, walk with your legs, and grab objects with your hands. Every session includes a friendly 5-minute host briefing, and your host monitors the session continuously.'
  },
  {
    id: 'faq-06',
    category: 'Pricing',
    question: 'How much does it cost and what is included?',
    answer: 'Consumer sessions start from ₹799 per person (+ GST) depending on game duration (ranging from 12 to 45 minutes). The entire arena is 100% private to your group — you will never share the floor with strangers. To lock your preferred time slot, you pay an advance deposit of ₹354 online, and the balance is settled at the venue.'
  },
  {
    id: 'faq-07',
    category: 'Booking',
    question: 'What is your cancellation and refund policy?',
    answer: 'We provide free cancellation with a 100% full refund up to 24 hours prior to your scheduled session. If you need to make changes within 24 hours, contact us on WhatsApp and our concierge team will do everything possible to move your reservation to another available slot within the same week.'
  },
  {
    id: 'faq-08',
    category: 'VR Experience',
    question: 'Is Totem an escape room or an arcade?',
    answer: 'Totem is a free-roam VR arena, which is a major leap beyond both traditional arcades and physical escape rooms. Instead of static screens or plastic padlocks in a small painted room, you step into a 1,500+ sq ft arena and walk freely inside breathtaking virtual temples, deep space stations, and fantasy realms. We offer dedicated VR escape worlds (like Wayfinders and Lost Sanctuary) that offer puzzle solving with boundless virtual scale.'
  },
  {
    id: 'faq-09',
    category: 'Venue',
    question: 'Where is Totem located and what about parking?',
    answer: 'We are located on the 2nd Floor, 648 Mahakavi Vemana Road, 100 Feet Road, 6th Block, Koramangala, Bengaluru (560095) — right near the iconic Sony World signal. Street parking is accessible along 100 Feet Road, and Uber / Ola cabs drop off directly at our entrance.'
  },
  {
    id: 'faq-10',
    category: 'Corporate',
    question: 'How do corporate team outings work with larger groups?',
    answer: 'We host corporate groups from 8 to 50+ people with our four-station model. While 6 colleagues play inside the VR arena, others compete on Xbox in the console lounge, enjoy snacks and cold drinks, or play tabletop games. Your dedicated event host rotates squads systematically so nobody is left waiting on a bench. Official GST invoices and custom catering are provided.'
  },
  {
    id: 'faq-11',
    category: 'Corporate',
    question: 'Can we inspect the arena before committing to a corporate event?',
    answer: 'Absolutely. We offer a complimentary 20-minute venue walkthrough on weekdays before 6 PM. HR leaders and team managers can tour the space, try on a headset for a quick demo round, and discuss custom formats with our event director. Message us on WhatsApp to schedule your walkthrough.'
  }
];

export const FAQ_CATEGORIES = ['All', 'VR Experience', 'Booking', 'Pricing', 'Age & Safety', 'Corporate', 'Venue'] as const;
