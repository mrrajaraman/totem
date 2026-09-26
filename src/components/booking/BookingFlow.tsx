import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { StepGroup } from './StepGroup';
import { StepWorld } from './StepWorld';
import { StepDateTime } from './StepDateTime';
import { StepDetails } from './StepDetails';
import { BookingSummary } from './BookingSummary';
import { Button } from '../ui/Button';
import { BookingState } from '../../types';
import { Check, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle, Sparkles } from 'lucide-react';

export const BookingFlow: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialWorld = searchParams.get('world') || 'decide-at-venue';

  const todayStr = new Date().toISOString().split('T')[0];

  const [bookingState, setBookingState] = useState<BookingState>({
    groupSize: 4,
    selectedWorldSlug: initialWorld,
    selectedDate: todayStr,
    selectedTimeSlot: '05:15 PM',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    specialRequests: '',
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>('');

  const steps = [
    { number: 1, label: 'GROUP' },
    { number: 2, label: 'WORLD' },
    { number: 3, label: 'DATE & TIME' },
    { number: 4, label: 'DETAILS' },
    { number: 5, label: 'CONFIRM' },
  ];

  const handleNext = () => {
    setValidationError('');
    if (currentStep === 4) {
      if (!bookingState.customerName.trim()) {
        setValidationError('Please enter your full name.');
        return;
      }
      if (!bookingState.customerPhone.trim() || bookingState.customerPhone.length < 8) {
        setValidationError('Please enter a valid 10-digit WhatsApp/phone number.');
        return;
      }
      if (!bookingState.customerEmail.trim() || !bookingState.customerEmail.includes('@')) {
        setValidationError('Please enter a valid email address.');
        return;
      }
    }

    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      setIsSubmitted(true);
    }
  };

  const handleBack = () => {
    setValidationError('');
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Stepper Progress Bar */}
      <div className="mb-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 bg-[#1F1F1F] -z-0" />
          <div
            className="absolute top-1/2 left-0 -translate-y-1/2 h-0.5 bg-[#39FF14] transition-all duration-300 -z-0"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((s) => {
            const isCompleted = currentStep > s.number;
            const isCurrent = currentStep === s.number;

            return (
              <div key={s.number} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                    isCompleted
                      ? 'bg-[#39FF14] text-black'
                      : isCurrent
                      ? 'bg-black border-2 border-[#39FF14] text-[#39FF14] shadow-[0_0_16px_rgba(57,255,20,0.5)]'
                      : 'bg-[#121212] border border-[#2B2B2B] text-white/40'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : `0${s.number}`}
                </div>
                <span className={`text-[10px] font-mono tracking-widest uppercase mt-2 hidden sm:block ${
                  isCurrent ? 'text-[#39FF14] font-semibold' : 'text-[#71717A]'
                }`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {isSubmitted ? (
        /* Booking Confirmation Screen */
        <div className="max-w-2xl mx-auto rounded-3xl bg-[#0E0E0E] border border-[#39FF14]/50 p-8 sm:p-12 text-center shadow-[0_0_50px_-10px_rgba(57,255,20,0.2)]">
          <div className="w-16 h-16 rounded-full bg-[#39FF14]/15 border border-[#39FF14] flex items-center justify-center mx-auto mb-6 text-[#39FF14]">
            <CheckCircle className="w-8 h-8" />
          </div>

          <span className="font-mono text-xs uppercase tracking-widest text-[#39FF14] block mb-2 font-semibold">
            SLOT RESERVED · BOOKING CONFIRMED
          </span>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            You&rsquo;re walking into the game.
          </h2>

          <p className="text-sm text-[#A3A3A3] leading-relaxed mb-8 max-w-lg mx-auto">
            Thank you, <strong className="text-white">{bookingState.customerName}</strong>! Your session is held for{' '}
            <strong className="text-white">{bookingState.groupSize} players</strong> on{' '}
            <strong className="text-[#39FF14]">{bookingState.selectedDate}</strong> at{' '}
            <strong className="text-[#39FF14]">{bookingState.selectedTimeSlot}</strong>.
          </p>

          <div className="p-5 rounded-2xl bg-black border border-[#222222] text-left text-xs font-mono space-y-2 mb-8 max-w-md mx-auto">
            <div className="flex justify-between text-[#A3A3A3]">
              <span>Arena Pass ID:</span>
              <span className="text-white font-semibold">TOTEM-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <div className="flex justify-between text-[#A3A3A3]">
              <span>Advance Paid:</span>
              <span className="text-[#39FF14] font-bold">₹354 (Paid)</span>
            </div>
            <div className="flex justify-between text-[#A3A3A3]">
              <span>Venue Balance:</span>
              <span className="text-white">To be settled at venue (UPI/Card)</span>
            </div>
            <div className="flex justify-between text-[#A3A3A3]">
              <span>Venue:</span>
              <span className="text-white">2nd Floor, 100ft Rd, Koramangala 6th Block</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/917337838303?text=Hi%20Totem%20team%2C%20I%20just%20booked%20slot%20on%20${bookingState.selectedDate}%20at%20${bookingState.selectedTimeSlot}%20for%20${bookingState.groupSize}%20players%20under%20the%20name%20${encodeURIComponent(bookingState.customerName)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto h-12 px-6 rounded-full bg-[#39FF14] text-black font-semibold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#32e612] transition-colors"
            >
              Open WhatsApp Confirmation Pass
            </a>
            <Button
              to="/"
              variant="secondary"
              size="md"
              className="w-full sm:w-auto"
            >
              Back to Home
            </Button>
          </div>
        </div>
      ) : (
        /* 2-Column Booking Interface (Step on Left, Summary on Right) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Step Workspace */}
          <div className="lg:col-span-8 rounded-3xl bg-[#0A0A0A] border border-[#222222] p-6 sm:p-8 md:p-10 shadow-xl">
            {currentStep === 1 && (
              <StepGroup
                selectedGroupSize={bookingState.groupSize}
                onSelectGroupSize={(size) =>
                  setBookingState((prev) => ({ ...prev, groupSize: size }))
                }
              />
            )}

            {currentStep === 2 && (
              <StepWorld
                selectedWorldSlug={bookingState.selectedWorldSlug}
                onSelectWorld={(slug) =>
                  setBookingState((prev) => ({ ...prev, selectedWorldSlug: slug }))
                }
              />
            )}

            {currentStep === 3 && (
              <StepDateTime
                selectedDate={bookingState.selectedDate}
                onSelectDate={(date) =>
                  setBookingState((prev) => ({ ...prev, selectedDate: date }))
                }
                selectedTimeSlot={bookingState.selectedTimeSlot}
                onSelectTimeSlot={(slot) =>
                  setBookingState((prev) => ({ ...prev, selectedTimeSlot: slot }))
                }
              />
            )}

            {currentStep === 4 && (
              <StepDetails
                name={bookingState.customerName}
                onChangeName={(val) =>
                  setBookingState((prev) => ({ ...prev, customerName: val }))
                }
                phone={bookingState.customerPhone}
                onChangePhone={(val) =>
                  setBookingState((prev) => ({ ...prev, customerPhone: val }))
                }
                email={bookingState.customerEmail}
                onChangeEmail={(val) =>
                  setBookingState((prev) => ({ ...prev, customerEmail: val }))
                }
                notes={bookingState.specialRequests}
                onChangeNotes={(val) =>
                  setBookingState((prev) => ({ ...prev, specialRequests: val }))
                }
              />
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Review and lock your slot
                  </h3>
                  <p className="text-sm text-[#A3A3A3]">
                    Review your squad details below. You will pay the ₹354 reservation deposit now to lock the entire arena exclusively for your group.
                  </p>
                </div>

                <div className="rounded-2xl bg-black border border-[#222222] p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <span className="text-[#71717A] block">Lead Guest:</span>
                      <span className="text-white font-semibold text-sm">{bookingState.customerName}</span>
                    </div>
                    <div>
                      <span className="text-[#71717A] block">Phone / WhatsApp:</span>
                      <span className="text-white font-semibold text-sm">+91 {bookingState.customerPhone}</span>
                    </div>
                    <div>
                      <span className="text-[#71717A] block">Email:</span>
                      <span className="text-white font-semibold text-sm">{bookingState.customerEmail}</span>
                    </div>
                    <div>
                      <span className="text-[#71717A] block">Group:</span>
                      <span className="text-white font-semibold text-sm">{bookingState.groupSize} Players</span>
                    </div>
                  </div>

                  {bookingState.specialRequests && (
                    <div className="pt-3 border-t border-[#1C1C1C] text-xs font-mono">
                      <span className="text-[#71717A] block">Special Notes:</span>
                      <span className="text-white/80">{bookingState.specialRequests}</span>
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-[#141414] border border-[#39FF14]/30 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#39FF14] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#A3A3A3] leading-relaxed">
                    <strong className="text-white">Zero Risk Guarantee:</strong> Cancel anytime up to 24 hours before your slot for a 100% full refund with zero questions asked.
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {validationError && (
              <div className="mt-4 p-3 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs font-mono">
                {validationError}
              </div>
            )}

            {/* Stepper Navigation Footer */}
            <div className="mt-8 pt-6 border-t border-[#1E1E1E] flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A3A3A3] hover:text-white px-4 py-3 rounded-full border border-[#2B2B2B] hover:border-[#444] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              <Button
                variant="primary"
                size="md"
                onClick={handleNext}
                className="w-full sm:w-auto font-mono uppercase tracking-wider text-xs font-bold justify-center"
              >
                <span>
                  {currentStep === 1
                    ? 'Continue to World'
                    : currentStep === 2
                    ? 'Choose Date & Time'
                    : currentStep === 3
                    ? 'Enter Details'
                    : currentStep === 4
                    ? 'Review Booking'
                    : 'Confirm & Lock Slot (₹354)'}
                </span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Sticky Summary on Right */}
          <div className="lg:col-span-4">
            <BookingSummary
              booking={bookingState}
              depositAmount={354}
            />
          </div>
        </div>
      )}
    </div>
  );
};
