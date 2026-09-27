import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MessageSquare, 
  RefreshCw, 
  Search
} from 'lucide-react';
import { supabase, DbCorporateInquiry } from '../../lib/supabase';

const SAMPLE_CORP_LEADS: DbCorporateInquiry[] = [
  {
    id: 'corp-1',
    company_name: 'Razorpay Technologies',
    contact_name: 'Priya Nair',
    work_email: 'priya.nair@razorpay.com',
    phone: '+91 98450 77112',
    team_size: '16 – 30 people',
    hear_about: 'Google Search',
    status: 'new',
    created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: 'corp-2',
    company_name: 'Swiggy Instamart Ops',
    contact_name: 'Rahul Sen',
    work_email: 'rahul.sen@swiggy.in',
    phone: '+91 97312 44332',
    team_size: '31 – 50 people',
    hear_about: 'LinkedIn',
    status: 'contacted',
    created_at: new Date(Date.now() - 3600000 * 26).toISOString(),
  },
  {
    id: 'corp-3',
    company_name: 'Cred Engineering',
    contact_name: 'Vikram Joshi',
    work_email: 'vikram@cred.club',
    phone: '+91 99001 88441',
    team_size: '8 – 15 people',
    hear_about: 'Played at Koramangala Arena',
    status: 'walkthrough_scheduled',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

export const AdminCorporatePage: React.FC = () => {
  const [leads, setLeads] = useState<DbCorporateInquiry[]>(SAMPLE_CORP_LEADS);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('corporate_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        setLeads(data);
      } else {
        setLeads(SAMPLE_CORP_LEADS);
      }
    } catch (err) {
      console.warn('Corp leads load notice:', err);
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
        .from('corporate_inquiries')
        .update({ status: newStatus })
        .eq('id', leadId);

      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
      );
    } catch (err) {
      console.warn('Update local fallback:', err);
    }
  };

  const filtered = leads.filter((l) => {
    const q = search.toLowerCase();
    return (
      !q ||
      l.company_name.toLowerCase().includes(q) ||
      l.contact_name.toLowerCase().includes(q) ||
      l.phone.includes(q) ||
      l.work_email.toLowerCase().includes(q)
    );
  });

  const sendWhatsAppPitch = (lead: DbCorporateInquiry) => {
    const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
    const phone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const msg = `Hi ${lead.contact_name}! 🥽 This is Totem VR Arena Corporate Team.

We received your inquiry for a team outing for *${lead.company_name}* (${lead.team_size}). We'd love to host your squad for an adrenaline-fueled free-roam VR experience with catering and private arena access.

Can we schedule a 15-minute arena walkthrough or share our customized packages deck?`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Corporate Inquiries &amp; Events
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage B2B company outing quotes, headcount, and walkthrough schedules.
          </p>
        </div>

        <button
          onClick={fetchLeads}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors shadow-xs self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-black' : ''}`} />
          <span>Sync Leads</span>
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
            placeholder="Search company, contact person, phone..."
            className="w-full h-9 pl-9 pr-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black"
          />
        </div>
      </div>

      {/* Pipeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((lead, idx) => (
          <div
            key={lead.id || idx}
            className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-sm flex flex-col justify-between hover:border-gray-300 transition-all space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-gray-100 text-gray-900 border border-gray-200">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm truncate">{lead.company_name}</h3>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-800 font-semibold shrink-0">
                  {lead.team_size}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-gray-600 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Contact</span>
                  <span className="text-gray-900 font-semibold">{lead.contact_name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Phone</span>
                  <a href={`tel:${lead.phone}`} className="text-gray-900 font-mono hover:text-black underline">
                    {lead.phone}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Email</span>
                  <a href={`mailto:${lead.work_email}`} className="text-gray-600 hover:text-gray-900 truncate max-w-[170px]">
                    {lead.work_email}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Pipeline Stage:</span>
                <select
                  value={lead.status || 'new'}
                  onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                  className="px-2 py-1 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-black"
                >
                  <option value="new">New Lead</option>
                  <option value="contacted">Contacted</option>
                  <option value="walkthrough_scheduled">Walkthrough Booked</option>
                  <option value="booked">Offsite Confirmed</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => sendWhatsAppPitch(lead)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-black hover:bg-zinc-800 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-white" />
                  <span>WhatsApp Pitch</span>
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
