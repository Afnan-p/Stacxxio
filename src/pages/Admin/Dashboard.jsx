import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit2, Trash2, LogOut, LayoutGrid, 
  Users, Briefcase, ChevronRight, ExternalLink, 
  Image as ImageIcon, Search 
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
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [isTeamFormOpen, setIsTeamFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projRes, teamRes] = await Promise.all([
        API.get('/api/projects'),
        API.get('/api/team')
      ]);
      setProjects(projRes.data);
      setTeam(teamRes.data);
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
      await API.delete(`/api/${type}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Asset liquidated successfully');
      fetchData();
    } catch (err) {
      toast.error('Deletion sequence failed');
    }
  };

  const filteredItems = (activeTab === 'projects' ? projects : team).filter(item => 
    (item.title || item.name).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-brand-bg text-white luxury-noise flex">
      <Toaster position="top-right" toastOptions={{
        style: { background: '#0B0F1A', color: '#F8FAFC', border: '1px solid rgba(255,255,255,0.05)' }
      }} />

      {/* Sidebar Navigation */}
      <div className="w-80 border-r border-white/5 bg-brand-surface p-10 flex flex-col">
        <div className="mb-16">
          <h1 className="text-3xl font-display font-bold tracking-tighter mb-2">STACKXXIO</h1>
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-accent">Control Center</p>
        </div>

        <nav className="space-y-4 flex-grow">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl transition-all ${activeTab === 'projects' ? 'bg-brand-accent text-brand-bg' : 'hover:bg-white/5 text-brand-text-dim'}`}
          >
            <Briefcase size={20} />
            <span className="text-xs font-bold uppercase tracking-widest">Masterpieces</span>
          </button>
          <button 
            onClick={() => setActiveTab('team')}
            className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl transition-all ${activeTab === 'team' ? 'bg-brand-accent text-brand-bg' : 'hover:bg-white/5 text-brand-text-dim'}`}
          >
            <Users size={20} />
            <span className="text-xs font-bold uppercase tracking-widest">The Collective</span>
          </button>
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-4 px-6 py-5 rounded-2xl text-red-400 hover:bg-red-400/10 transition-all"
        >
          <LogOut size={20} />
          <span className="text-xs font-bold uppercase tracking-widest">Terminate Session</span>
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-grow p-16 overflow-y-auto">
        <header className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-5xl font-display font-medium mb-4">
              {activeTab === 'projects' ? 'Asset Management' : 'Collective Intelligence'}
            </h2>
            <div className="flex items-center gap-3 text-brand-text-dim text-[10px] font-bold uppercase tracking-[0.3em]">
              <LayoutGrid size={14} className="text-brand-accent" />
              <span>{filteredItems.length} Total Registered Assets</span>
            </div>
          </div>

          <button 
            onClick={() => activeTab === 'projects' ? setIsProjectFormOpen(true) : setIsTeamFormOpen(true)}
            className="btn-premium flex items-center gap-3"
          >
            <Plus size={16} /> {activeTab === 'projects' ? 'New Masterpiece' : 'Recruit Agent'}
          </button>
        </header>

        {/* Search & Filters */}
        <div className="mb-12 relative group">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-brand-text-dim group-focus-within:text-brand-accent transition-colors" size={20} />
          <input 
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.02] border border-white/5 rounded-3xl py-6 pl-20 pr-10 outline-none focus:border-brand-accent focus:bg-white/[0.04] transition-all text-lg font-light italic"
          />
        </div>

        {/* Asset Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <div key={item._id} className="glass-card rounded-[2.5rem] p-8 flex gap-8 items-center group">
              <div className="w-40 h-40 rounded-3xl overflow-hidden flex-shrink-0 border border-white/5">
                <img 
                  src={activeTab === 'projects' ? (item.images?.[0] || '') : item.image} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
              
              <div className="flex-grow">
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
          ))}
        </div>
      </main>

      {/* Forms Modal Overlay */}
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
    </div>
  );
};

export default AdminDashboard;
