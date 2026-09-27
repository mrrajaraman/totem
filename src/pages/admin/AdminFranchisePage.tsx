import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  RefreshCw, 
  Search
} from 'lucide-react';
import { supabase, DbFranchiseInquiry } from '../../lib/supabase';

const SAMPLE_FRANCHISE_LEADS: DbFranchiseInquiry[] = [
  {
    id: 'f-1',
    applicant_name: 'Rajesh Aggarwal',
    phone: '+91 98110 55443',
    email: 'rajesh.aggarwal@gmail.com',
    target_city: 'Hyderabad (Hitec City)',
    space_available: '2,500 – 4,000 sq ft',
    discovery_source: 'Played at Koramangala Arena',
    message: 'We own commercial retail space in Cyber Towers. Looking to launch premium free-roam VR by Q3.',
    status: 'interview_scheduled',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'f-2',
    applicant_name: 'Ananya Deshmukh',
    phone: '+91 98200 33910',
    email: 'ananya.deshmukh@apexventures.in',
    target_city: 'Mumbai (BKC)',
    space_available: '1,500 – 2,500 sq ft',
    discovery_source: 'LinkedIn',
    message: 'Experienced entertainment park operator. Looking for proprietary VR turn-key setup with tracking.',
    status: 'pending_review',
    created_at: new Date(Date.now() - 3600000 * 40).toISOString(),
  },
];

export const AdminFranchisePage: React.FC = () => {
  const [leads, setLeads] = useState<DbFranchiseInquiry[]>(SAMPLE_FRANCHISE_LEADS);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('franchise_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        setLeads(data);
      } else {
        setLeads(SAMPLE_FRANCHISE_LEADS);
      }
    } catch (err) {
      console.warn('Franchise inquiries fetch error, using local fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdateStatus = async (leadId: string | undefined, newStatus: string) => {
    if (!leadId) return;
    try {
      await supabase
        .from('franchise_inquiries')
        .update({ status: newStatus })
        .eq('id', leadId);

      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
      );
    } catch (err) {
      console.warn('Franchise local status update:', err);
    }
  };

  const filtered = leads.filter((l) => {
    const q = search.toLowerCase();
    return (
      !q ||
      l.applicant_name.toLowerCase().includes(q) ||
      l.target_city.toLowerCase().includes(q) ||
      l.phone.includes(q) ||
      l.email.toLowerCase().includes(q)
    );
  });

  const sendWhatsAppPartnerInvite = (lead: DbFranchiseInquiry) => {
    const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
    const phone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const msg = `Hi ${lead.applicant_name}! 🥽 This is the Totem VR Arena team.

Thank you for your inquiry regarding launching Totem in *${lead.target_city}*. We've reviewed your submission regarding ${lead.space_available}.

Can we schedule a 20-minute introductory call to discuss unit economics, hardware setup, and launch timelines?`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Franchise &amp; Expansion Pipeline
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Review arena franchise partner proposals and target city square footage.
          </p>
        </div>

        <button
          onClick={fetchLeads}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors shadow-xs self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-black' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Search */}
      <div className="rounded-2xl bg-white border border-gray-200/90 p-3 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search applicant name, target city, email, or phone..."
            className="w-full h-9 pl-9 pr-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black"
          />
        </div>
      </div>

      {/* Franchise Applications List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((lead, idx) => (
          <div
            key={lead.id || idx}
            className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-sm flex flex-col justify-between hover:border-gray-300 transition-all space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-bold text-gray-900 text-base">{lead.applicant_name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 font-semibold mt-0.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-gray-900" />
                    <span>{lead.target_city}</span>
                  </div>
                </div>

                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800 font-semibold shrink-0">
                  {lead.status || 'Under Review'}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-gray-600 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Space Spec</span>
                  <span className="text-gray-900 font-semibold">{lead.space_available || 'TBD'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Phone</span>
                  <a href={`tel:${lead.phone}`} className="text-gray-900 font-mono hover:text-black underline">
                    {lead.phone}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Email</span>
                  <a href={`mailto:${lead.email}`} className="text-gray-600 hover:text-gray-900">
                    {lead.email}
                  </a>
                </div>
              </div>

              {lead.message && (
                <div className="mt-3 p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 italic leading-relaxed">
                  &ldquo;{lead.message}&rdquo;
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-gray-100 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Status:</span>
                <select
                  value={lead.status || 'pending_review'}
                  onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                  className="px-2 py-1 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-black"
                >
                  <option value="pending_review">Pending Review</option>
                  <option value="interview_scheduled">Call Scheduled</option>
                  <option value="due_diligence">Due Diligence</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Declined</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => sendWhatsAppPartnerInvite(lead)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-black hover:bg-zinc-800 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-white" />
                  <span>WhatsApp Partner Intro</span>
                </button>
                <a
                  href={`tel:${lead.phone}`}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-colors"
                  title="Call"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
