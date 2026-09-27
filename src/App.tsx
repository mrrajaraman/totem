import React, { useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { WorldsPage } from './pages/WorldsPage';
import { WorldDetailPage } from './pages/WorldDetailPage';
import { BookingPage } from './pages/BookingPage';
import { PricingPage } from './pages/PricingPage';
import { CorporatePage } from './pages/CorporatePage';
import { BirthdayPage } from './pages/BirthdayPage';
import { PartnerPage } from './pages/PartnerPage';
import { FAQPage } from './pages/FAQPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { LocationPage } from './pages/LocationPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Imports
import { AdminAuthProvider } from './context/AdminAuthContext';
import { AdminProtectedRoute } from './components/admin/AdminProtectedRoute';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';
import { AdminCorporatePage } from './pages/admin/AdminCorporatePage';
import { AdminFranchisePage } from './pages/admin/AdminFranchisePage';

// Scroll to top helper on page change - instant top reset before paint
const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation();

  useLayoutEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    } catch {
      window.scrollTo(0, 0);
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, search]);

  return null;
};

// Wrapper for public guest-facing pages inside consumer Layout
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export const App: React.FC = () => {
  return (
    <AdminAuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Admin Command Center Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <AdminDashboardPage />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <AdminBookingsPage />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/corporate"
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <AdminCorporatePage />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/franchise"
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <AdminFranchisePage />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />

          {/* Public Guest Experience Routes */}
          <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />
          <Route path="/worlds" element={<PublicRoute><WorldsPage /></PublicRoute>} />
          <Route path="/worlds/:slug" element={<PublicRoute><WorldDetailPage /></PublicRoute>} />
          <Route path="/booking" element={<PublicRoute><BookingPage /></PublicRoute>} />
          <Route path="/pricing" element={<PublicRoute><PricingPage /></PublicRoute>} />
          <Route path="/corporate" element={<PublicRoute><CorporatePage /></PublicRoute>} />
          <Route path="/birthday" element={<PublicRoute><BirthdayPage /></PublicRoute>} />
          <Route path="/partner-with-us" element={<PublicRoute><PartnerPage /></PublicRoute>} />
          <Route path="/partner" element={<PublicRoute><PartnerPage /></PublicRoute>} />
          <Route path="/faq" element={<PublicRoute><FAQPage /></PublicRoute>} />
          <Route path="/blog" element={<PublicRoute><BlogPage /></PublicRoute>} />
          <Route path="/blog/:slug" element={<PublicRoute><BlogPostPage /></PublicRoute>} />
          <Route path="/location" element={<PublicRoute><LocationPage /></PublicRoute>} />
          <Route path="*" element={<PublicRoute><NotFoundPage /></PublicRoute>} />
        </Routes>
      </Router>
    </AdminAuthProvider>
  );
};

export default App;
