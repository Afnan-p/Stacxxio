import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';

const projects = [
  {
    id: 1,
    title: 'E-commerce Analytics',
    description: 'A comprehensive dashboard for tracking sales and user behavior.',
    image: project1,
    tech: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
  },
  {
    id: 2,
    title: 'Luxury Real Estate',
    description: 'A premium property listing platform with immersive visual experience.',
    image: project2,
    tech: ['Next.js', 'Framer Motion', 'Cloudinary'],
  },
  {
    id: 3,
    title: 'Fintech Mobile App',
    description: 'Modern banking experience with glassmorphism UI and secure transactions.',
    image: project3,
    tech: ['React Native', 'Firebase', 'Redux'],
  },
];

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import API from '../api/axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const responseData = Array.isArray(res.data) ? res.data.slice(0, 3) : (res.data.projects || []);
        setProjects(responseData);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return null;

  return (
    <section id="work" className="py-20 md:py-40 bg-brand-bg relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="mb-20 md:mb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-accent mb-6">Selected Works</h2>
            <h3 className="text-5xl md:text-8xl font-display font-medium text-brand-text tracking-tighter leading-none">
              Crafting Digital <br />
              <span className="text-brand-accent/20 italic font-light">Excellence.</span>
            </h3>
          </motion.div>
        </div>

        <div className="space-y-32 md:space-y-56">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 md:gap-24 items-center`}
            >
              {/* Image Reveal Area */}
              <div className="w-full lg:w-3/5 group relative overflow-hidden rounded-[2.5rem] md:rounded-[4rem] bg-brand-surface border border-white/5">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={project.images?.[0] || 'https://via.placeholder.com/1200x800'}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 ease-out"
                  />
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-brand-bg/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center">
                  <div className="flex gap-4">
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="p-6 bg-brand-accent text-brand-bg rounded-full hover:scale-110 active:scale-95 transition-all">
                        <ExternalLink size={24} />
                      </a>
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="p-6 bg-white/10 text-white rounded-full hover:bg-white/20 hover:scale-110 active:scale-95 transition-all">
                        <Github size={24} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Content Context Area */}
              <div className="w-full lg:w-2/5">
                <div className="flex flex-wrap gap-4 mb-8">
                  {project.technologies?.map(t => (
                    <span key={t} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold uppercase tracking-widest text-brand-text-dim">
                      {t}
                    </span>
                  ))}
                </div>
                
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent/60 mb-4 block italic">
                  {project.category}
                </span>
                <h4 className="text-4xl md:text-6xl font-display font-medium text-brand-text mb-6 tracking-tight leading-tight">
                  {project.title}
                </h4>
                <p className="text-lg md:text-xl text-brand-text-dim mb-12 font-light italic leading-relaxed">
                  {project.description}
                </p>
                
                <a 
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-6 group"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-text group-hover:text-brand-accent transition-colors">View Case Study</span>
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-brand-accent group-hover:text-brand-bg transition-all duration-500 transform group-hover:rotate-45">
                    <ArrowUpRight size={20} />
                  </div>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
