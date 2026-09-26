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

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/worlds" element={<WorldsPage />} />
          <Route path="/worlds/:slug" element={<WorldDetailPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/corporate" element={<CorporatePage />} />
          <Route path="/birthday" element={<BirthdayPage />} />
          <Route path="/partner-with-us" element={<PartnerPage />} />
          <Route path="/partner" element={<PartnerPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
