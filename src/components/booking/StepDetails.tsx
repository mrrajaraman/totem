import React from 'react';
import { User, Phone, Mail, FileText, ShieldCheck } from 'lucide-react';

export interface StepDetailsProps {
  name: string;
  onChangeName: (val: string) => void;
  phone: string;
  onChangePhone: (val: string) => void;
  email: string;
  onChangeEmail: (val: string) => void;
  notes: string;
  onChangeNotes: (val: string) => void;
}

export const StepDetails: React.FC<StepDetailsProps> = ({
  name,
  onChangeName,
  phone,
  onChangePhone,
  email,
  onChangeEmail,
  notes,
  onChangeNotes,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Who is booking this session?
        </h3>
        <p className="text-sm text-[#A3A3A3]">
          Your confirmation pass and arena directions will be sent immediately via WhatsApp and Email.
        </p>
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#39FF14]" />
            <span>Full Name *</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => onChangeName(e.target.value)}
            placeholder="e.g. Karthik Sharma"
            className="w-full h-12 px-4 bg-[#101010] border border-[#2B2B2B] rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#39FF14] transition-colors"
          />
        </div>

        {/* Phone & Email Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#39FF14]" />
              <span>WhatsApp / Phone *</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-mono text-white/40">
                +91
              </span>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => onChangePhone(e.target.value)}
                placeholder="98765 43210"
                className="w-full h-12 pl-12 pr-4 bg-[#101010] border border-[#2B2B2B] rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#39FF14] transition-colors font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#39FF14]" />
              <span>Email Address *</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => onChangeEmail(e.target.value)}
              placeholder="karthik@example.com"
              className="w-full h-12 px-4 bg-[#101010] border border-[#2B2B2B] rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#39FF14] transition-colors"
            />
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-[#39FF14]" />
            <span>Special Requests / Notes (Optional)</span>
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => onChangeNotes(e.target.value)}
            placeholder="e.g. Someone wears thick glasses, celebrating a friend's birthday, first time playing VR..."
            className="w-full p-4 bg-[#101010] border border-[#2B2B2B] rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#39FF14] transition-colors resize-none"
          />
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-[#0A0A0A] border border-[#222222] flex items-center gap-2.5 text-xs text-[#A3A3A3]">
        <ShieldCheck className="w-4 h-4 text-[#39FF14] shrink-0" />
        <span>No spam. Your info is only used to manage your session and send the entry pass.</span>
      </div>
    </div>
  );
};
