import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
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
            <Route path="/admin/login" element={<AdminLogin />} />
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
      <Toaster position="top-center" reverseOrder={false} />
      <AppContent />
    </Router>
  );
}

export default App;

