import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import Preloader from './components/Preloader';

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const AdminLogin = lazy(() => import('./pages/Admin/Login'));
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));

const AppContent = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isProjectDetail = location.pathname.startsWith('/project/');
  const isServiceDetail = location.pathname.startsWith('/services/');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdmin && !isProjectDetail && !isServiceDetail && <Navbar />}
      <main className="flex-grow">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-brand-surface">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-accent"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/admin/zynexta" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
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
    <Router>
      <Toaster 
        position="bottom-center" 
        reverseOrder={false} 
        toastOptions={{
          style: {
            background: '#111111',
            color: '#ffffff',
            padding: '14px 24px',
            borderRadius: '100px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255,255,255,0.1)'
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
        containerStyle={{
          bottom: 40
        }}
      />
      <AppContent />
      <Analytics />
    </Router>
  );
}

export default App;

