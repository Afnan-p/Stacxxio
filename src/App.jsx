import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import Preloader from './components/Preloader';

const AppContent = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isProjectDetail = location.pathname.startsWith('/project/');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdmin && !isProjectDetail && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
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
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Prevent scroll during load
  }, []);

  const handleComplete = React.useCallback(() => {
    setLoading(false);
    document.body.style.overflow = 'auto'; // Restore scroll
  }, []);

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={handleComplete} />}
      </AnimatePresence>

      <AppContent />
    </Router>
  );
}

export default App;

