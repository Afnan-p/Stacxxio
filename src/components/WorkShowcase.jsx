import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Globe } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { 
  SiReact, SiNodedotjs, SiMongodb, SiExpress, SiTailwindcss, SiNextdotjs, 
  SiFirebase, SiTypescript, SiJavascript, SiFramer, SiShopify 
} from 'react-icons/si';
import API from '../api/axios';
import { getOptimizedMedia } from '../utils/cloudinary';

// Helper to get correct icon based on tech name
const getTechIcon = (name) => {
  if (!name) return null;
  const n = name.toLowerCase();
  if (n.includes('react')) return SiReact;
  if (n.includes('node')) return SiNodedotjs;
  if (n.includes('mongo')) return SiMongodb;
  if (n.includes('express')) return SiExpress;
  if (n.includes('tailwind')) return SiTailwindcss;
  if (n.includes('next')) return SiNextdotjs;
  if (n.includes('firebase')) return SiFirebase;
  if (n.includes('typescript') || n === 'ts') return SiTypescript;
  if (n.includes('javascript') || n === 'js') return SiJavascript;
  if (n.includes('framer')) return SiFramer;
  if (n.includes('shopify')) return SiShopify;
  return null;
};

const WorkShowcase = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await API.get('/api/projects?paginate=false');
        const projectsArray = Array.isArray(res.data) ? res.data : (res.data.projects || []);
        setProjects(projectsArray.slice(0, 4)); 
      } catch (err) {
        console.error("Failed to load projects", err);
      }
    };
    loadProjects();
  }, []);

  return (
    <section id="work" className="py-16 md:py-20 bg-[#FAFAFA] relative overflow-hidden font-sans border-y border-gray-100" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-10 max-w-[1400px] mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <span className="text-gray-400 font-semibold uppercase tracking-[0.2em] text-xs mb-4 block">
            FEATURED WORK
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4 tracking-tight">
            Projects That Drive Results
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            A collection of websites, e-commerce platforms, and software solutions built to help businesses grow and succeed online.
          </p>
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onClick={() => navigate('/portfolio')}
          className="flex items-center gap-3 px-6 py-3 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all group shrink-0 shadow-sm"
        >
          <span className="font-semibold text-sm">View All Projects</span>
          <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>

      <div className="container mx-auto px-6 md:px-10 max-w-[1400px] mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={`${project._id}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => navigate(`/project/${project._id}`)}
              className="group bg-white rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer transition-all border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200"
            >
              {/* Image Area - Reduced Height 16:10 */}
              <div className="aspect-[16/10] w-full relative overflow-hidden bg-gray-50">
                <img
                  src={
                    project.type === 'video'
                      ? getOptimizedMedia(project.thumbnail || '/fallback.jpg', 'thumbnail')
                      : getOptimizedMedia(project.mediaUrl || project.images?.[0] || '/fallback.jpg', 'thumbnail')
                  }
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {project.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Play size={18} className="text-gray-900 ml-1" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-5 flex-grow flex flex-col">
                
                {/* Category Badge */}
                <div className="mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                    {project.category?.name || 'CASE STUDY'}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-1.5 group-hover:text-brand-accent transition-colors">
                  {project.title}
                </h3>
                
                {/* Short Description */}
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">
                  {project.description}
                </p>
                
                {/* Modern Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack?.slice(0, 3).map((tech, i) => {
                    const techName = tech.name || tech;
                    const Icon = getTechIcon(techName);
                    return (
                      <div key={i} className="flex items-center gap-1.5 px-2 py-1 bg-white border border-gray-200 rounded-md text-[11px] font-semibold text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-colors">
                        {Icon && <Icon size={12} className="text-gray-500" />}
                        <span>{techName}</span>
                      </div>
                    );
                  })}
                  {project.techStack?.length > 3 && (
                    <div className="flex items-center px-2 py-1 bg-gray-50 border border-gray-100 rounded-md text-[11px] font-semibold text-gray-500">
                      +{project.techStack.length - 3}
                    </div>
                  )}
                </div>
                
                {/* Bottom Action Area */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5 text-gray-900 font-semibold text-[13px] group-hover:text-brand-accent transition-colors">
                    <span>View Project</span>
                    <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" title="Source Code">
                        <FaGithub size={16} />
                      </a>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-accent transition-colors" title="Live Preview">
                        <Globe size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkShowcase;
