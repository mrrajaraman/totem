export type WorldCategory = 
  | 'All' 
  | 'Action' 
  | 'Sci-Fi' 
  | 'Zombie' 
  | 'Horror' 
  | 'Party' 
  | 'Escape';

export interface World {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: WorldCategory;
  duration: string;
  players: string;
  ageRating: string;
  difficulty: 'Easy' | 'Medium' | 'Challenging' | 'Expert';
  intensity: 'Mild' | 'Moderate' | 'High' | 'Extreme';
  thumbnail: string;
  heroImage: string;
  overview: string;
  whatToExpect: string[];
  mechanics: string[];
  whoItsFor: string;
  recommendedForFirstTimers?: boolean;
  isHorror?: boolean;
  featured?: boolean;
}

export interface CorporatePackage {
  id: string;
  name: string;
  teamSize: string;
  priceFormatted: string;
  startingPriceNumber: number;
  duration: string;
  description: string;
  includedStations: string[];
  features: string[];
  badge?: string;
}

export interface BirthdayPackage {
  id: string;
  name: string;
  pricePerPerson: string;
  startingPriceNumber: number;
  minGroup: string;
  duration: string;
  description: string;
  features: string[];
  badge?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Booking' | 'VR Experience' | 'Age & Safety' | 'Pricing' | 'Corporate' | 'Venue';
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  quote: string;
  rating: number;
  badge?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  heroImage: string;
  content: string[];
}

export interface BookingState {
  groupSize: number;
  selectedWorldSlug: string;
  selectedDate: string;
  selectedTimeSlot: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialRequests: string;
}
