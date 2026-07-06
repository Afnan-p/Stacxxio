import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, CheckCircle2, AlertCircle, Phone } from 'lucide-react';
import API from '../api/axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });
  const [contactInfo, setContactInfo] = useState({
    email: 'zynextaweb@gmail.com',
    phones: []
  });

  React.useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const res = await API.get('/api/footer');
        if (res.data) {
          setContactInfo({
            email: res.data.email || 'zynextaweb@gmail.com',
            phones: res.data.phones || []
          });
        }
      } catch (err) {
        console.error("Failed to fetch contact info:", err);
      }
    };
    fetchContactInfo();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status.error || status.success) {
      setStatus({ loading: false, success: false, error: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ ...status, error: 'Please fulfill all fields.' });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      await API.post('/api/inquiries', formData);
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(s => ({ ...s, success: false })), 5000);
    } catch (err) {
      console.error(err);
      setStatus({ 
        loading: false, 
        success: false, 
        error: err.response?.data?.message || 'Submission failed. Please try again.' 
      });
    }
  };

  return (
    <section id="contact" className="py-16 md:py-20 bg-brand-surface relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <span className="text-brand-accent font-medium uppercase tracking-wider text-sm mb-4 block">Get In Touch</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-brand-text mb-8 tracking-tight">
              Let's Discuss Your Next Project
            </h2>
            
            <p className="text-brand-text-dim text-lg leading-relaxed mb-12 max-w-lg">
              We are ready to bring your ideas to life. Reach out to us today to start a conversation about how our web agency can help you achieve your business goals.
            </p>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 shrink-0 rounded-full bg-white border border-[#E5E7EB] shadow-sm flex items-center justify-center text-brand-text group-hover:bg-[#111111] group-hover:text-white transition-colors duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-brand-text-dim mb-1">Email Us Directly</p>
                  <p className="text-xl font-bold text-brand-text break-all">{contactInfo.email}</p>
                </div>
              </div>

              {contactInfo.phones && contactInfo.phones.length > 0 && (
                <div className="flex items-start gap-6 group">
                  <div className="w-16 h-16 shrink-0 rounded-full bg-white border border-[#E5E7EB] shadow-sm flex items-center justify-center text-brand-text group-hover:bg-[#111111] group-hover:text-white transition-colors duration-300 mt-1">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brand-text-dim mb-1">Call Us Directly</p>
                    <div className="space-y-1">
                      {contactInfo.phones.map((phone, idx) => (
                        <p key={idx} className="text-xl font-bold text-brand-text break-all">{phone}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {status.success && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700"
                >
                  <CheckCircle2 size={20} />
                  <span className="text-sm font-medium">Message sent successfully. We will be in touch soon.</span>
                </motion.div>
              )}

              {status.error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600"
                >
                  <AlertCircle size={20} />
                  <span className="text-sm font-medium">{status.error}</span>
                </motion.div>
              )}

              <div>
                <label className="text-sm font-medium text-brand-text mb-2 block">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-brand-surface border border-[#E5E7EB] rounded-xl focus:border-brand-accent outline-none transition-colors text-brand-text" 
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-brand-text mb-2 block">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-brand-surface border border-[#E5E7EB] rounded-xl focus:border-brand-accent outline-none transition-colors text-brand-text" 
                  placeholder="john@company.com"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-brand-text mb-2 block">Project Details</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4" 
                  className="w-full px-5 py-4 bg-brand-surface border border-[#E5E7EB] rounded-xl focus:border-brand-accent outline-none transition-colors text-brand-text resize-none" 
                  placeholder="Tell us about your project requirements..."
                />
              </div>
              
              <button 
                type="submit"
                disabled={status.loading}
                className={`w-full py-4 bg-[#111111] text-white font-medium rounded-xl flex items-center justify-center gap-3 hover:shadow-brand-glow transition-all ${status.loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {status.loading ? 'Sending...' : 'Send Message'} <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
