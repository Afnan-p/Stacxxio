import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const AdminLogin = lazy(() => import('./pages/Admin/Login'));
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'));

const GA_MEASUREMENT_ID = 'G-M126ZJWD4S';

const AppContent = () => {
  const location = useLocation();

  const isAdmin = location.pathname.startsWith('/admin');
  const isProjectDetail = location.pathname.startsWith('/project/');
  const isServiceDetail = location.pathname.startsWith('/services/');

  // Google Analytics 4 SPA Tracking
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdmin && !isProjectDetail && !isServiceDetail && <Navbar />}

      <main className="flex-grow">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-brand-surface">
              <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-brand-accent"></div>
            </div>
          }
        >
          <Routes>
            {/* Home */}
            <Route
              path="/"
              element={<Home key="home" />}
            />

            {/* Services Landing */}
            <Route
              path="/services"
              element={<Home key="services" />}
            />

            {/* Portfolio */}
            <Route
              path="/portfolio"
              element={<Portfolio />}
            />

            {/* Project Detail */}
            <Route
              path="/project/:id"
              element={<ProjectDetail />}
            />

            {/* Service Detail */}
            <Route
              path="/services/:slug"
              element={<ServiceDetail />}
            />

            {/* Admin */}
            <Route
              path="/admin/zynexta"
              element={<AdminLogin />}
            />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route
              path="*"
              element={<Home key="not-found" />}
            />
          </Routes>
        </Suspense>
      </main>

      {!isAdmin && <Footer />}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          containerStyle={{ bottom: 40 }}
          toastOptions={{
            style: {
              background: '#111111',
              color: '#ffffff',
              padding: '14px 24px',
              borderRadius: '100px',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              border: '1px solid rgba(255,255,255,0.1)',
            },
            success: {
              iconTheme: {
                primary: '#ffffff',
                secondary: '#111111',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#111111',
              },
            },
          }}
        />

        <AppContent />

        <Analytics />
      </Router>
    </ThemeProvider>
  );
}

export default App;