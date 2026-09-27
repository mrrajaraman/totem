import React from 'react';
import { IndianRupee, Users, CalendarCheck, Clock, ArrowUpRight } from 'lucide-react';
import { DbBooking } from '../../lib/supabase';

interface AdminStatsCardsProps {
  bookings: DbBooking[];
  corporateCount: number;
}

export const AdminStatsCards: React.FC<AdminStatsCardsProps> = ({ bookings, corporateCount }) => {
  const totalBookings = bookings.length;
  const totalSquadPlayers = bookings.reduce((sum, b) => sum + (b.squad_size || 0), 0);
  const totalDeposits = bookings.reduce((sum, b) => sum + (Number(b.slot_lock_deposit) || 354), 0);
  const totalEstimatedRevenue = bookings.reduce((sum, b) => sum + (Number(b.total_game_fee) || 0), 0);
  
  const todayStr = new Date().toISOString().split('T')[0];
  const todayBookings = bookings.filter((b) => b.session_date === todayStr);

  const stats = [
    {
      title: 'Total Bookings',
      value: totalBookings.toString(),
      description: `${totalSquadPlayers} squad players hosted`,
      icon: CalendarCheck,
      trend: '+14% vs last mo',
    },
    {
      title: 'Slot Deposits Received',
      value: `₹${totalDeposits.toLocaleString('en-IN')}`,
      description: 'Online session reservations',
      icon: IndianRupee,
      trend: '+22%',
    },
    {
      title: 'Projected Revenue',
      value: `₹${totalEstimatedRevenue.toLocaleString('en-IN')}`,
      description: `₹${Math.max(0, totalEstimatedRevenue - totalDeposits).toLocaleString('en-IN')} balance at venue`,
      icon: IndianRupee,
      trend: 'On Track',
    },
    {
      title: "Today's Schedule",
      value: `${todayBookings.length} Sessions`,
      description: `${todayBookings.reduce((sum, b) => sum + (b.squad_size || 0), 0)} players arriving today`,
      icon: Clock,
      trend: 'Active',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, idx) => {
        const Icon = s.icon;
        return (
          <div
            key={idx}
            className="rounded-2xl bg-white border border-gray-200/90 p-5 flex flex-col justify-between shadow-xs hover:border-gray-300 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {s.title}
              </span>
              <div className="p-2 rounded-xl bg-neutral-100 text-black">
                <Icon className="w-4 h-4 text-black" />
              </div>
            </div>

            <div>
              <div className="text-2xl font-black text-black tracking-tight font-sans">
                {s.value}
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100 text-xs">
                <span className="text-neutral-500">{s.description}</span>
                <span className="text-black font-bold flex items-center gap-0.5 text-[11px]">
                  <ArrowUpRight className="w-3 h-3" />
                  {s.trend}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
