import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit2, Trash2, LogOut, LayoutGrid, 
  Briefcase, ExternalLink, 
  Search, Mail, Menu, X, Globe, Tag, Play
} from 'lucide-react';
import { FaGithub } from "react-icons/fa";
import API from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import ProjectForm from '../../components/ProjectForm';
import FooterForm from '../../components/FooterForm';
import CategoryManager from '../../components/CategoryManager';
import toast, { Toaster } from 'react-hot-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [isFooterFormOpen, setIsFooterFormOpen] = useState(false);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projRes, inqRes] = await Promise.all([
        API.get('/api/projects?paginate=false'),
        API.get('/api/inquiries', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
      ]);
      setProjects(projRes.data);
      console.log('DEBUG: Admin Dashboard Projects:', projRes.data);
      setInquiries(inqRes.data);
    } catch (err) {
      toast.error('Failed to synchronize data');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Securely logged out');
    navigate('/admin/login');
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm('This action will permanently delete this asset. Proceed?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const endpoint = type === 'inquiries' ? `/api/inquiries/${id}` : `/api/${type}/${id}`;
      
      await API.delete(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Asset liquidated successfully');
      fetchData();
    } catch (err) {
      toast.error('Deletion sequence failed');
    }
  };

  const filteredItems = () => {
    if (activeTab === 'projects') return projects.filter(i => i.title.toLowerCase().includes(searchQuery.toLowerCase()));
    if (activeTab === 'inquiries') return inquiries.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()) || i.email.toLowerCase().includes(searchQuery.toLowerCase()));
    if (activeTab === 'branding') return [];
    return [];
  };

  const NavContent = () => (
    <>
      <div className="mb-16 hidden md:block">
        <h1 className="text-3xl font-display font-bold tracking-tighter mb-2 text-brand-text">ZYNEXTA</h1>
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-accent">Control Center</p>
      </div>

      <nav className="space-y-4 flex-grow">
        <button 
          onClick={() => { setActiveTab('projects'); setIsSidebarOpen(false); }}
          className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl transition-all ${activeTab === 'projects' ? 'bg-brand-accent text-brand-bg' : 'hover:bg-white/5 text-brand-text-dim'}`}
        >
          <Briefcase size={20} />
          <span className="text-xs font-bold uppercase tracking-widest">Masterpieces</span>
        </button>
        <button 
          onClick={() => { setActiveTab('branding'); setIsSidebarOpen(false); }}
          className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl transition-all ${activeTab === 'branding' ? 'bg-brand-accent text-brand-bg' : 'hover:bg-white/5 text-brand-text-dim'}`}
        >
          <Globe size={20} />
          <span className="text-xs font-bold uppercase tracking-widest">Global Branding</span>
        </button>
        <button 
          onClick={() => { setActiveTab('inquiries'); setIsSidebarOpen(false); }}
          className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl transition-all ${activeTab === 'inquiries' ? 'bg-brand-accent text-brand-bg' : 'hover:bg-white/5 text-brand-text-dim'}`}
        >
          <Mail size={20} />
          <span className="text-xs font-bold uppercase tracking-widest">Formal Inquiries</span>
        </button>
      </nav>

      <button 
        onClick={handleLogout}
        className="mt-auto flex items-center gap-4 px-6 py-5 rounded-2xl text-red-400 hover:bg-red-400/10 transition-all"
      >
        <LogOut size={20} />
        <span className="text-xs font-bold uppercase tracking-widest">Terminate Session</span>
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-brand-bg text-white luxury-noise flex flex-col md:flex-row">
      <Toaster position="top-right" toastOptions={{
        style: { background: '#0B0F1A', color: '#F8FAFC', border: '1px solid rgba(255,255,255,0.05)' }
      }} />

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-6 border-b border-white/5 bg-brand-surface sticky top-0 z-[60]">
        <div>
          <h1 className="text-2xl font-display font-bold tracking-tighter">ZYNEXTA</h1>
          <p className="text-[7px] font-black uppercase tracking-[0.4em] text-brand-accent">Control</p>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-3 bg-white/5 rounded-xl">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-80 shrink-0 border-r border-white/5 bg-brand-surface p-10 flex-col h-screen sticky top-0 overflow-y-auto custom-scrollbar">
        <NavContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] md:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[80%] bg-brand-surface p-10 flex flex-col z-[80] md:hidden"
            >
              <NavContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-16 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-medium mb-4">
              {activeTab === 'projects' ? 'Asset Management' : activeTab === 'branding' ? 'Global Identity' : 'Transmission Logs'}
            </h2>
            <div className="flex items-center gap-3 text-brand-text-dim text-[10px] font-bold uppercase tracking-[0.3em]">
              <LayoutGrid size={14} className="text-brand-accent" />
              <span>{filteredItems().length} Registered Entities</span>
            </div>
          </div>

          {activeTab !== 'inquiries' && activeTab !== 'branding' && (
            <div className="flex gap-4">
              {activeTab === 'projects' && (
                <button 
                  onClick={() => setIsCategoryManagerOpen(true)}
                  className="p-5 bg-white/5 text-brand-text-dim rounded-2xl hover:bg-white/10 transition-all border border-white/5"
                  title="Manage Segments"
                >
                  <Tag size={20} />
                </button>
              )}
              <button 
                onClick={() => {
                  if (activeTab === 'projects') setIsProjectFormOpen(true);
                  setEditingItem(null);
                }}
                className="btn-premium px-10 flex items-center gap-3"
              >
                <Plus size={18} />
                <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Add Asset</span>
              </button>
            </div>
          )}
        </header>

        {/* Search & Filters */}
        {activeTab !== 'branding' && (
          <div className="mb-12 relative group">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-[#9CA3AF] group-focus-within:text-[#111111] transition-colors" size={24} />
          <input 
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[72px] bg-[#FFFFFF] border-[1.5px] border-[#D1D5DB] text-[#111111] placeholder-[#9CA3AF] rounded-[24px] pl-20 pr-10 outline-none focus:border-[#111111] focus:ring-4 focus:ring-black/5 transition-all text-lg font-medium"
          />
        </div>
        )}

        {/* Asset Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
          {activeTab === 'inquiries' ? (
            filteredItems().map((inquiry) => (
              <div key={inquiry._id} className="glass-card rounded-[2.5rem] p-8 md:p-10 group relative border border-white/5">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                  <div>
                    <h3 className="text-2xl font-display font-medium mb-1">{inquiry.name}</h3>
                    <p className="text-brand-accent text-xs font-bold uppercase tracking-widest break-all">{inquiry.email}</p>
                  </div>
                  <button 
                    onClick={() => handleDelete(inquiry._id, 'inquiries')}
                    className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all w-full md:w-auto flex justify-center"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="p-6 md:p-8 bg-brand-bg/50 rounded-3xl border border-white/5 mb-8">
                  <p className="text-brand-text-dim text-base md:text-lg font-light italic leading-relaxed">
                    "{inquiry.message}"
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.4em] text-brand-text-dim/40">
                  <span className="w-2 h-2 rounded-full bg-brand-accent/40" />
                  Received {new Date(inquiry.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))
          ) : activeTab === 'branding' ? (
            <div className="flex flex-col items-center justify-center py-20 text-center col-span-1 xl:col-span-2">
              <div className="w-32 h-32 bg-brand-accent/5 rounded-full flex items-center justify-center text-brand-accent mb-8 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                <Globe size={48} />
              </div>
              <h3 className="text-3xl font-display font-medium mb-4">Global Site Protocols</h3>
              <p className="text-brand-text-dim text-lg italic font-light max-w-md mb-12">
                "Control the global narrative, social connectivity, and architectural branding of the studio."
              </p>
              <button 
                onClick={() => setIsFooterFormOpen(true)}
                className="btn-premium px-12"
              >
                Modify Identity
              </button>
            </div>
          ) : (
            filteredItems().map((item) => (
              <div 
                key={item._id} 
                onClick={() => navigate(`/project/${item._id}`)}
                className="glass-card rounded-[2.5rem] p-6 md:p-8 flex flex-col sm:flex-row gap-8 items-center group cursor-pointer transition-all active:scale-[0.98] hover:border-brand-accent/20"
              >
                <div className="w-full sm:w-40 h-48 sm:h-40 rounded-3xl overflow-hidden flex-shrink-0 border border-white/5 bg-brand-bg/40 relative">
                  <img 
                    src={
                      item.type === 'video'
                        ? (item.thumbnail 
                            ? (item.thumbnail.startsWith('http') ? item.thumbnail : `${import.meta.env.VITE_API_URL}/${item.thumbnail}`)
                            : '/fallback.jpg')
                        : (item.mediaUrl 
                            ? (item.mediaUrl.startsWith('http') ? item.mediaUrl : `${import.meta.env.VITE_API_URL}/${item.mediaUrl}`)
                            : (item.images?.[0] ? (item.images[0].startsWith('http') ? item.images[0] : `${import.meta.env.VITE_API_URL}/${item.images[0]}`) : '/fallback.jpg')
                          )
                    } 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={item.title || item.name}
                    onError={(e) => {
                      e.target.src = "/fallback.jpg";
                      console.log('Admin Preview Error: Image failed to load', item);
                    }}
                  />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                      <div className="relative flex items-center justify-center">
                        <div className="absolute w-12 h-12 rounded-full border border-white/10 animate-pulse-slow" />
                        <div className="w-8 h-8 rounded-full bg-white/[0.05] backdrop-blur-xl border border-white/20 flex items-center justify-center text-white">
                          <Play size={10} fill="white" className="ml-0.5" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex-grow w-full">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-brand-accent/60 px-3 py-1 bg-brand-accent/5 rounded-lg">
                      {item.category?.name || 'Archive'}
                    </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingItem(item);
                          setIsProjectFormOpen(true);
                        }}
                        className="p-3 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-900 hover:text-white transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item._id, activeTab);
                        }}
                        className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-medium mb-3 group-hover:text-brand-accent transition-colors">{item.title}</h3>
                  <p className="text-brand-text-dim text-xs font-light line-clamp-2 italic mb-6">
                    {item.description}
                  </p>
                  
                  <div className="flex gap-4">
                    {item.liveLink && (
                      <a 
                        href={item.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={14} className="text-brand-accent hover:scale-125 transition-transform" />
                      </a>
                    )}
                    {item.githubLink && (
                      <a 
                        href={item.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub size={14} className="text-brand-text-dim hover:text-white transition-colors" />
                      </a>
                    )}
                    <span className="text-[8px] font-bold uppercase tracking-widest ml-auto opacity-40">
                      {item.images?.length || 0} Assets
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Forms Modal Overlay */}
      <AnimatePresence>
        {isProjectFormOpen && (
          <ProjectForm 
            editProject={editingItem} 
            onClose={() => { setIsProjectFormOpen(false); setEditingItem(null); }} 
            onRefresh={fetchData} 
          />
        )}
        {isFooterFormOpen && (
          <FooterForm 
            onClose={() => { setIsFooterFormOpen(false); }} 
            onRefresh={fetchData} 
          />
        )}
        {isCategoryManagerOpen && (
          <CategoryManager 
            onClose={() => setIsCategoryManagerOpen(false)} 
            onRefresh={fetchData} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
