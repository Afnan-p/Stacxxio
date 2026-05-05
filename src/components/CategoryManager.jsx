import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Tag } from 'lucide-react';
import API from '../api/axios';
import toast from 'react-hot-toast';

const CategoryManager = ({ onClose, onRefresh }) => {
  const [categories, setCategories] = useState([]);
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get('/api/categories');
      setCategories(res.data);
    } catch (err) {
      toast.error('Failed to load segments');
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await API.post('/api/categories', { name: newName }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('New segment initialized');
      setNewName('');
      fetchCategories();
      if (onRefresh) onRefresh();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Initialization failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Terminate this segment? This may impact active masterpieces.')) return;
    try {
      const token = localStorage.getItem('token');
      await API.delete(`/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Segment terminated');
      fetchCategories();
      if (onRefresh) onRefresh();
    } catch (err) {
      toast.error('Termination failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-brand-bg/90 backdrop-blur-xl z-[250] flex items-center justify-center p-6">
      <div className="bg-brand-surface w-full max-w-md rounded-[2.5rem] border border-white/5 shadow-premium overflow-hidden relative">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <Tag className="text-brand-accent" size={20} />
            <h2 className="text-2xl font-display font-bold text-white">Segments</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-all text-white/40 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          <form onSubmit={handleAdd} className="flex gap-4">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-grow px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-brand-accent outline-none text-white text-sm transition-all"
              placeholder="Design Systems..."
            />
            <button 
              type="submit" 
              disabled={loading}
              className="p-4 bg-brand-accent text-brand-bg rounded-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              <Plus size={20} />
            </button>
          </form>

          <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
            {categories.map((cat) => (
              <div key={cat._id} className="flex justify-between items-center p-5 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-white/10 transition-all">
                <span className="text-white/80 font-medium tracking-tight">{cat.name}</span>
                <button 
                  onClick={() => handleDelete(cat._id)}
                  className="p-2 text-white/20 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {categories.length === 0 && (
              <div className="text-center py-10 text-brand-text-dim text-sm italic">No segments identified.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
