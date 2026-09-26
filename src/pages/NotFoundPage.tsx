import React from 'react';
import { Button } from '../components/ui/Button';
import { AlertCircle, Home, Compass, Gamepad2 } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center rounded-3xl bg-[#0A0A0A] border border-[#222222] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-[#161616] border border-[#2A2A2A] flex items-center justify-center mx-auto mb-6 text-[#39FF14]">
          <AlertCircle className="w-8 h-8" />
        </div>

        <span className="font-mono text-xs uppercase tracking-widest text-[#39FF14] block mb-2 font-semibold">
          ERROR 404 · SECTOR DISCONNECTED
        </span>

        <h1 className="text-3xl font-black text-white mb-3">
          Virtual Boundary Reached
        </h1>

        <p className="text-sm text-[#A3A3A3] leading-relaxed mb-8">
          The coordinate or simulation layer you are trying to reach does not exist or has been relocated to another sector.
        </p>

        <div className="flex flex-col gap-3">
          <Button
            to="/"
            variant="primary"
            size="md"
            className="w-full justify-center font-mono uppercase tracking-wider text-xs font-bold"
            icon={<Home className="w-4 h-4 ml-1" />}
          >
            Return to Arena Home
          </Button>

          <Button
            to="/worlds"
            variant="secondary"
            size="md"
            className="w-full justify-center font-mono uppercase tracking-wider text-xs"
            icon={<Gamepad2 className="w-4 h-4 ml-1" />}
          >
            Explore 20 Worlds
          </Button>
        </div>
      </div>
    </div>
  );
};
