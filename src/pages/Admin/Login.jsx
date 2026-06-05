import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Key, ArrowRight } from 'lucide-react';
import API from '../../api/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await API.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full h-[56px] bg-[#FFFFFF] border-[1.5px] border-[#D1D5DB] text-[#111111] placeholder-[#9CA3AF] rounded-[14px] pl-[52px] pr-[18px] font-medium transition-all duration-250 ease-in-out focus:border-[#111111] focus:ring-4 focus:ring-black/5 focus:outline-none";

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Soft Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-200/50 rounded-full blur-[120px] -z-0 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[440px] bg-white p-10 rounded-[28px] relative z-10 border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.05)]"
      >
        <div className="mb-10 text-center">
          <div className="w-[72px] h-[72px] bg-gray-50 border border-gray-100 rounded-[20px] flex items-center justify-center mx-auto mb-6 shadow-sm">
            <ShieldCheck className="w-8 h-8 text-gray-900" />
          </div>
          <h1 className="text-3xl font-display font-bold mb-2 tracking-tight text-gray-900">Admin Control</h1>
          <p className="text-gray-500 font-medium text-sm">Secure Access Portal</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-4 bg-red-50 text-red-600 text-sm rounded-2xl border border-red-100 text-center font-semibold"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2 relative">
            <label className="block text-gray-900 font-semibold text-[13px] tracking-[0.04em]">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-[18px] top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="admin@stackxxio.studio"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2 relative">
            <label className="block text-gray-900 font-semibold text-[13px] tracking-[0.04em]">Password</label>
            <div className="relative">
              <Key className="absolute left-[18px] top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-[56px] bg-gray-900 text-white font-semibold rounded-[14px] hover:bg-black hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 group"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            {!loading && <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
        
        <div className="mt-8 text-center text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Stackxxio Dashboard
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
