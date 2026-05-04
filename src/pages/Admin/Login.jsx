import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Key } from 'lucide-react';
import axios from 'axios';

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
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-6 relative overflow-hidden luxury-noise">
      {/* Background Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[180px] -z-0" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-dark p-12 rounded-[3rem] relative z-10 border-white/5"
      >
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-brand-accent text-brand-bg rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-brand-accent/20">
            <Lock className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-2 tracking-tight text-brand-text">Studio Command</h1>
          <p className="text-brand-text-dim uppercase tracking-[0.3em] text-[10px] font-bold italic">Authorized Access Portal</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 p-5 bg-red-500/10 text-red-400 text-xs rounded-2xl border border-red-500/20 text-center font-bold italic"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-text-dim/60 ml-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-text-dim/40 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-16 pr-8 py-5 rounded-[1.5rem] bg-white/5 border border-white/10 focus:border-brand-accent/40 outline-none transition-all text-lg font-light italic text-brand-text"
                placeholder="admin@stackxxio.studio"
                required
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-text-dim/60 ml-2">Secure Key</label>
            <div className="relative">
              <Key className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-text-dim/40 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-16 pr-8 py-5 rounded-[1.5rem] bg-white/5 border border-white/10 focus:border-brand-accent/40 outline-none transition-all text-lg font-light italic text-brand-text"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-luxury py-6 rounded-full text-[10px] font-bold uppercase tracking-[0.5em] mt-4 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Commence Access'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
