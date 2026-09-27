import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar as CalendarIcon, 
  Ticket, 
  Building2, 
  Briefcase, 
  LogOut, 
  ExternalLink, 
  Search, 
  Bell, 
  Menu, 
  X, 
  Plus,
  HelpCircle,
  Settings
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { BookingSlideOverDrawer } from './BookingSlideOverDrawer';
import { DbBooking } from '../../lib/supabase';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [newBookingDrawerOpen, setNewBookingDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    {
      to: '/admin',
      label: 'Calendar & Arena',
      icon: CalendarIcon,
      exact: true,
    },
    {
      to: '/admin/bookings',
      label: 'All Bookings',
      icon: Ticket,
      exact: false,
    },
    {
      to: '/admin/corporate',
      label: 'Corporate Events',
      icon: Building2,
      exact: false,
    },
    {
      to: '/admin/franchise',
      label: 'Franchise Pipeline',
      icon: Briefcase,
      exact: false,
    },
  ];

  return (
    <div className="h-screen w-full bg-[#F8F9FA] text-black flex font-sans antialiased overflow-hidden">
      {/* Desktop Sidebar (Pinned 100vh height, never scrolls or stretches with right content) */}
      <aside className="hidden lg:flex w-64 h-full flex-col justify-between border-r border-gray-200 bg-white p-5 shrink-0 z-30 overflow-y-auto">
        <div className="space-y-6">
          {/* Brand Logo Header */}
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center font-mono font-black text-sm text-white shadow-xs">
              T
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-black block leading-tight">
                TOTEM VR
              </span>
              <span className="text-[11px] text-gray-500 font-medium">Arena Operations</span>
            </div>
          </div>

          {/* Navigation Section */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 mb-2 block">
              Main Menu
            </span>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact 
                  ? location.pathname === item.to 
                  : location.pathname.startsWith(item.to);

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={`
                      flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all
                      ${isActive 
                        ? 'bg-black text-white font-bold shadow-xs' 
                        : 'text-gray-600 hover:text-black hover:bg-gray-100 border border-transparent'
                      }
                    `}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* User Profile & Logout at Bottom (Locked to bottom of viewport) */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-black text-white font-bold text-xs flex items-center justify-center">
              AD
            </div>
            <div>
              <p className="text-xs font-bold text-black leading-none">{user?.name || 'Arena Director'}</p>
              <p className="text-[11px] text-gray-500 truncate max-w-[110px] leading-tight mt-0.5">{user?.email || 'admin@totemvr.in'}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-black transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay (Portaled to document.body with z-[100]) */}
      {mobileSidebarOpen && createPortal(
        <div className="fixed inset-0 z-[100] lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
            onClick={() => setMobileSidebarOpen(false)} 
          />
          <aside className="relative w-64 max-w-[80vw] h-full bg-white p-5 flex flex-col justify-between z-50 border-r border-gray-200 shadow-2xl overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center font-mono font-black text-sm text-white">
                    T
                  </div>
                  <span className="font-extrabold text-base tracking-tight text-black">
                    TOTEM VR
                  </span>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.exact 
                    ? location.pathname === item.to 
                    : location.pathname.startsWith(item.to);

                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive 
                          ? 'bg-black text-white font-bold' 
                          : 'text-gray-600 hover:text-black hover:bg-gray-100'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-black text-white font-bold text-xs flex items-center justify-center">
                  AD
                </div>
                <div>
                  <p className="text-xs font-bold text-black leading-none">{user?.name || 'Arena Director'}</p>
                  <p className="text-[11px] text-gray-500 truncate max-w-[110px] leading-tight mt-0.5">{user?.email || 'admin@totemvr.in'}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-black transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </aside>
        </div>,
        document.body
      )}

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Topbar matching Quixera reference */}
        <header className="h-16 shrink-0 border-b border-gray-200 bg-white px-4 sm:px-8 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>Home</span>
                <span>/</span>
                <span className="text-black font-semibold">Calendar</span>
              </div>
              <h1 className="text-sm sm:text-base font-bold text-black tracking-tight leading-tight">
                Koramangala Arena Calendar &amp; Sessions
              </h1>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors"
            >
              <span>Guest Arena</span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
            </a>

            <button
              onClick={() => setNewBookingDrawerOpen(true)}
              className="px-4 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>New Booking</span>
            </button>
          </div>
        </header>

        {/* Page Body: The ONLY element that scrolls vertically */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>

      {/* Global Slide-Over Drawer for "New Booking" button in Topbar */}
      {newBookingDrawerOpen && (
        <BookingSlideOverDrawer
          isOpen={newBookingDrawerOpen}
          onClose={() => setNewBookingDrawerOpen(false)}
          booking={null}
          onSave={() => setNewBookingDrawerOpen(false)}
        />
      )}
    </div>
  );
};
