import React from 'react';
import { BookingFlow } from '../components/booking/BookingFlow';
import { SectionHeader } from '../components/ui/SectionHeader';

export const BookingPage: React.FC = () => {
  return (
    <div className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          eyebrow="Direct Reservation"
          title="LOCK YOUR"
          highlight="ARENA SLOT."
          lede="Select your group size, world, date and time. Pay ₹354 online to lock the arena exclusively for your squad; balance settled upon arrival."
        />

        <BookingFlow />
      </div>
    </div>
  );
};
