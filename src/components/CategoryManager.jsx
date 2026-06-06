import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Tag, Edit2 } from 'lucide-react';
import API from '../api/axios';
import toast from 'react-hot-toast';

const CategoryManager = ({ onClose, onRefresh }) => {
  const [categories, setCategories] = useState([]);
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get('/api/categories');
      setCategories(res.data);
    } catch (err) {
      toast.error('Failed to load categories');
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
      toast.success('New category added');
      setNewName('');
      fetchCategories();
      if (onRefresh) onRefresh();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add category');
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (id) => {
    if (!editName.trim()) {
      setEditingId(null);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await API.put(`/api/categories/${id}`, { name: editName }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Category updated');
      setEditingId(null);
      fetchCategories();
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Update category error:", err);
      toast.error(err.response?.data?.message || 'Failed to update category');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category? This may affect active projects.')) return;
    try {
      const token = localStorage.getItem('token');
      await API.delete(`/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Category deleted');
      fetchCategories();
      if (onRefresh) onRefresh();
    } catch (err) {
      toast.error('Failed to delete category');
    }
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-6 bg-black/35 backdrop-blur-[10px] overflow-y-auto">
      <motion.div 
        initial={{ scale: 0.96, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, y: 20, opacity: 0 }}
        className="bg-[#FFFFFF] w-full max-w-[500px] rounded-[24px] shadow-[0_30px_80px_rgba(0,0,0,0.12)] relative flex flex-col my-auto max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-8 pb-6 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-xl">
              <Tag size={20} className="text-gray-700" />
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-900">
              Categories
            </h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto flex-grow space-y-8">
          <form onSubmit={handleAdd} className="flex gap-3">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-grow h-[56px] bg-[#FFFFFF] border-[1.5px] border-[#D1D5DB] text-[#111111] placeholder-[#9CA3AF] rounded-[14px] px-[18px] font-medium transition-all duration-250 ease-in-out focus:border-[#111111] focus:ring-4 focus:ring-black/5 focus:outline-none"
              placeholder="e.g. Web Design"
            />
            <button 
              type="submit" 
              disabled={loading || !newName.trim()}
              className="h-[56px] px-6 bg-gray-900 text-white font-semibold rounded-[14px] hover:bg-black hover:shadow-lg transition-all flex items-center justify-center disabled:opacity-50 shadow-md"
            >
              <Plus size={20} />
            </button>
          </form>

          <div className="space-y-3">
            <AnimatePresence>
              {categories.map((cat) => (
                <motion.div 
                  key={cat._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="flex justify-between items-center px-5 py-4 bg-[#FFFFFF] border-[1.5px] border-gray-200 rounded-[14px] hover:border-gray-300 transition-colors group"
                >
                  {editingId === cat._id ? (
                    <div className="flex w-full gap-2 items-center">
                      <input 
                        autoFocus
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleEditSubmit(cat._id);
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                        className="flex-grow h-[40px] px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
                      />
                      <button onClick={() => handleEditSubmit(cat._id)} className="px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg font-medium">Save</button>
                      <button onClick={() => setEditingId(null)} className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-lg font-medium">Cancel</button>
                    </div>
                  ) : (
                    <>
                      <span 
                        onDoubleClick={() => {
                          setEditingId(cat._id);
                          setEditName(cat.name);
                        }}
                        className="text-[#111111] font-semibold tracking-tight cursor-default"
                        title="Double click to edit"
                      >
                        {cat.name}
                      </span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        <button 
                          onClick={() => {
                            setEditingId(cat._id);
                            setEditName(cat.name);
                          }}
                          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit Category"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(cat._id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete Category"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {categories.length === 0 && (
              <div className="text-center py-10 text-gray-400 text-sm font-medium">No categories available.</div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CategoryManager;
