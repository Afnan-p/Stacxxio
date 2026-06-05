import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import API from '../../api/axios';
import { toast } from 'react-hot-toast';

const ManageStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStat, setEditingStat] = useState(null);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    number: '',
    label: '',
    order: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await API.get('/api/stats');
      setStats(data);
    } catch (error) {
      toast.error('Failed to load metrics');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      if (editingStat) {
        await API.put(`/api/stats/${editingStat._id}`, formData, config);
        toast.success('Metric updated successfully');
      } else {
        await API.post('/api/stats', formData, config);
        toast.success('Metric added successfully');
      }
      setIsModalOpen(false);
      setEditingStat(null);
      setFormData({ number: '', label: '', order: 0 });
      fetchStats();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authorization denied or request failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this metric?')) {
      try {
        const token = localStorage.getItem('token');
        await API.delete(`/api/stats/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Metric deleted successfully');
        fetchStats();
      } catch (error) {
        toast.error('Failed to delete metric');
      }
    }
  };

  const openModal = (stat = null) => {
    if (stat) {
      setEditingStat(stat);
      setFormData({
        number: stat.number,
        label: stat.label,
        order: stat.order
      });
    } else {
      setEditingStat(null);
      setFormData({ number: '', label: '', order: stats.length + 1 });
    }
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // --- Reusable UI ---
  const InputLabel = ({ children, required }) => (
    <label className="block text-[#111111] font-semibold text-[13px] tracking-[0.04em] mb-2 flex items-center gap-1.5">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );

  const inputClass = "w-full h-[56px] bg-[#FFFFFF] border-[1.5px] border-[#D1D5DB] text-[#111111] placeholder-[#9CA3AF] rounded-[14px] px-[18px] font-medium transition-all duration-250 ease-in-out focus:border-[#111111] focus:ring-4 focus:ring-black/5 focus:outline-none";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-[#FFFFFF] border-[1.5px] border-[#D1D5DB] p-8 rounded-[24px] shadow-sm">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Performance Metrics</h1>
          <p className="text-gray-500 text-sm font-medium">Control the numeric parameters of the agency expertise section</p>
        </div>
        <button
          onClick={() => openModal()}
          className="h-[56px] px-8 bg-gray-900 text-white font-semibold rounded-[14px] hover:bg-black hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus size={18} />
          <span>Add Metric</span>
        </button>
      </div>

      {stats.length === 0 ? (
        <div className="bg-[#FFFFFF] border-[1.5px] border-[#D1D5DB] rounded-[24px] p-12 text-center shadow-sm">
          <p className="text-gray-500 font-medium text-lg">No explicit metrics configured. The frontend is currently operating on fallback analytical data. Add your metrics to overwrite the defaults.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat._id} className="bg-[#FFFFFF] border-[1.5px] border-[#D1D5DB] rounded-[24px] p-8 flex items-center gap-6 group hover:border-gray-900 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="flex-grow">
                <h3 className="text-4xl font-display font-bold text-gray-900 mb-2 group-hover:text-gray-900">{stat.number}</h3>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-gray-400 text-xs font-medium">Sort Order: {stat.order}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => openModal(stat)}
                  className="p-3 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-900 hover:text-white transition-all"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(stat._id)}
                  className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/35 backdrop-blur-[10px] overflow-y-auto">
            <motion.div
              initial={{ scale: 0.96, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 20, opacity: 0 }}
              className="bg-[#FFFFFF] w-full max-w-[500px] rounded-[24px] shadow-[0_30px_80px_rgba(0,0,0,0.12)] relative flex flex-col my-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-8 pb-6 border-b border-gray-100 shrink-0">
                <h2 className="text-2xl font-display font-bold text-gray-900">
                  {editingStat ? 'Modify Metric' : 'Add New Metric'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-8 overflow-y-auto flex-grow">
                <form id="stat-form" onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <InputLabel required>Numeric Value</InputLabel>
                    <input
                      type="text"
                      required
                      placeholder='e.g., "50+" or "100%"'
                      className={inputClass}
                      value={formData.number}
                      onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <InputLabel required>Label</InputLabel>
                    <input
                      type="text"
                      required
                      placeholder='e.g., "Projects Delivered"'
                      className={inputClass}
                      value={formData.label}
                      onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    />
                  </div>

                  <div>
                    <InputLabel>Display Order</InputLabel>
                    <input
                      type="number"
                      className={inputClass}
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    />
                  </div>
                </form>
              </div>

              <div className="p-8 border-t border-gray-100 flex items-center justify-end shrink-0 bg-gray-50/30 rounded-b-[24px]">
                <button
                  type="submit"
                  form="stat-form"
                  disabled={saving}
                  className="h-[56px] px-8 bg-gray-900 text-white font-semibold rounded-[14px] hover:bg-black hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 shadow-md w-full sm:w-auto justify-center"
                >
                  {saving ? 'Saving...' : (editingStat ? 'Update Metric' : 'Add Metric')}
                  {!saving && <Check size={18} />}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageStats;
