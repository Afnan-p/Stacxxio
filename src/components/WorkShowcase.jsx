import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import API from '../api/axios';

const WorkShowcase = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await API.get('/api/projects?paginate=false');
        // If it's an array, take first 6
        const projectsArray = Array.isArray(res.data) ? res.data : (res.data.projects || []);
        setProjects(projectsArray.slice(0, 6)); 
      } catch (err) {
        console.error("Failed to load projects", err);
      }
    };
    loadProjects();
  }, []);

  return (
    <section id="work" className="py-24 md:py-32 bg-brand-bg relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-10 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-brand-accent font-medium uppercase tracking-wider text-sm mb-4 block">Our Masterpieces</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">Featured Work</h2>
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onClick={() => navigate('/portfolio')}
          className="flex items-center gap-2 text-brand-text-dim hover:text-white transition-colors group"
        >
          <span className="font-medium">View All Projects</span>
          <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>

      <div className="w-full overflow-x-auto pb-12 pt-4 px-6 md:px-10 snap-x snap-mandatory hide-scrollbar">
        <div className="flex gap-6 w-max">
          {projects.map((project, index) => (
            <motion.div
              key={`${project._id}-${index}`}
              initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.8, delay: (index % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => navigate(`/project/${project._id}`)}
              className="group glass-card rounded-[2rem] overflow-hidden flex flex-col h-full snap-center w-[calc(100vw-2.5rem)] sm:w-[320px] lg:w-[380px] max-w-[420px] cursor-pointer transition-all active:scale-95 border border-white/5 bg-white/5"
            >
              <div className="aspect-[4/3] w-full relative overflow-hidden bg-black/50">
                <img
                  src={
                    project.type === 'video'
                      ? (project.thumbnail 
                          ? (project.thumbnail.startsWith('http') ? project.thumbnail : `${import.meta.env.VITE_API_URL}/${project.thumbnail}`)
                          : '/fallback.jpg')
                      : (project.mediaUrl 
                          ? (project.mediaUrl.startsWith('http') ? project.mediaUrl : `${import.meta.env.VITE_API_URL}/${project.mediaUrl}`)
                          : (project.images?.[0] 
                              ? (project.images[0].startsWith('http') ? project.images[0] : `${import.meta.env.VITE_API_URL}/${project.images[0]}`) 
                              : '/fallback.jpg')
                        )
                  }
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100"
                />
                
                {project.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <Play size={20} className="text-white ml-1" />
                    </div>
                  </div>
                )}
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">
                    {project.category?.name || 'Case Study'}
                  </span>
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex-grow flex flex-col justify-center">
                <h3 className="text-2xl font-display font-medium text-white mb-2 group-hover:text-brand-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-brand-text-dim text-sm line-clamp-2">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkShowcase;
