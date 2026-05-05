import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit2, Trash2, LogOut, LayoutGrid, 
  Users, Briefcase, ChevronRight, ExternalLink, 
  Image as ImageIcon, Search, Mail, Menu, X 
} from 'lucide-react';
import { FaGithub } from "react-icons/fa";
import API from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import ProjectForm from '../../components/ProjectForm';
import TeamForm from '../../components/TeamForm';
import toast, { Toaster } from 'react-hot-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [team, setTeam] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [isTeamFormOpen, setIsTeamFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projRes, teamRes, inqRes] = await Promise.all([
        API.get('/api/projects'),
        API.get('/api/team'),
        API.get('/api/inquiries', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
      ]);
      setProjects(projRes.data);
      setTeam(teamRes.data);
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
    if (activeTab === 'team') return team.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (activeTab === 'inquiries') return inquiries.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()) || i.email.toLowerCase().includes(searchQuery.toLowerCase()));
    return [];
  };

  const NavContent = () => (
    <>
      <div className="mb-16 hidden md:block">
        <h1 className="text-3xl font-display font-bold tracking-tighter mb-2">STACKXXIO</h1>
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
          onClick={() => { setActiveTab('team'); setIsSidebarOpen(false); }}
          className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl transition-all ${activeTab === 'team' ? 'bg-brand-accent text-brand-bg' : 'hover:bg-white/5 text-brand-text-dim'}`}
        >
          <Users size={20} />
          <span className="text-xs font-bold uppercase tracking-widest">The Collective</span>
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
          <h1 className="text-2xl font-display font-bold tracking-tighter">STACKXXIO</h1>
          <p className="text-[7px] font-black uppercase tracking-[0.4em] text-brand-accent">Control</p>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-3 bg-white/5 rounded-xl">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-80 border-r border-white/5 bg-brand-surface p-10 flex-col h-screen sticky top-0">
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
              {activeTab === 'projects' ? 'Asset Management' : activeTab === 'team' ? 'Collective Intelligence' : 'Transmission Logs'}
            </h2>
            <div className="flex items-center gap-3 text-brand-text-dim text-[10px] font-bold uppercase tracking-[0.3em]">
              <LayoutGrid size={14} className="text-brand-accent" />
              <span>{filteredItems().length} Registered Entities</span>
            </div>
          </div>

          {activeTab !== 'inquiries' && (
            <button 
              onClick={() => activeTab === 'projects' ? setIsProjectFormOpen(true) : setIsTeamFormOpen(true)}
              className="btn-premium flex items-center gap-3 w-full md:w-auto justify-center"
            >
              <Plus size={16} /> {activeTab === 'projects' ? 'New Masterpiece' : 'Recruit Agent'}
            </button>
          )}
        </header>

        {/* Search & Filters */}
        <div className="mb-12 relative group">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-brand-text-dim group-focus-within:text-brand-accent transition-colors" size={20} />
          <input 
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.02] border border-white/5 rounded-3xl py-5 md:py-6 pl-20 pr-10 outline-none focus:border-brand-accent focus:bg-white/[0.04] transition-all text-base md:text-lg font-light italic"
          />
        </div>

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
          ) : (
            filteredItems().map((item) => (
              <div key={item._id} className="glass-card rounded-[2.5rem] p-6 md:p-8 flex flex-col sm:flex-row gap-8 items-center group">
                <div className="w-full sm:w-40 h-48 sm:h-40 rounded-3xl overflow-hidden flex-shrink-0 border border-white/5">
                  <img 
                    src={activeTab === 'projects' ? (item.images?.[0] || '') : item.image} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={item.title || item.name}
                  />
                </div>
                
                <div className="flex-grow w-full">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-brand-accent/60 px-3 py-1 bg-brand-accent/5 rounded-lg">
                      {activeTab === 'projects' ? item.category : item.role}
                    </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setEditingItem(item);
                          activeTab === 'projects' ? setIsProjectFormOpen(true) : setIsTeamFormOpen(true);
                        }}
                        className="p-3 bg-white/5 rounded-xl hover:bg-brand-accent hover:text-brand-bg transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item._id, activeTab)}
                        className="p-3 bg-white/5 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-medium mb-3">{item.title || item.name}</h3>
                  <p className="text-brand-text-dim text-xs font-light line-clamp-2 italic mb-6">
                    {item.description || `Studio agent specializing in ${item.role}`}
                  </p>
                  
                  <div className="flex gap-4">
                    {activeTab === 'projects' ? (
                      <>
                        {item.liveLink && <ExternalLink size={14} className="text-brand-accent" />}
                        {item.githubLink && <FaGithub size={14} className="text-brand-text-dim" />}
                        <span className="text-[8px] font-bold uppercase tracking-widest ml-auto opacity-40">
                          {item.images?.length || 0} Assets
                        </span>
                      </>
                    ) : (
                      <span className="text-[8px] font-bold uppercase tracking-widest opacity-40">
                        Member since {new Date(item.createdAt).getFullYear()}
                      </span>
                    )}
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
        {isTeamFormOpen && (
          <TeamForm 
            editMember={editingItem} 
            onClose={() => { setIsTeamFormOpen(false); setEditingItem(null); }} 
            onRefresh={fetchData} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;

