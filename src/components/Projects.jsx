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

const Projects = () => {
  return (
    <section id="work" className="py-24 bg-brand-bg">
      <div className="container mx-auto px-6">
        <div className="mb-16 flex justify-between items-end">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">Selected Work</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">Crafting digital excellence.</h3>
          </div>
        </div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
            >
              {/* Image Area */}
              <div className="w-full md:w-3/5 group cursor-pointer overflow-hidden rounded-3xl shadow-xl border border-white/50">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content Area */}
              <div className="w-full md:w-2/5">
                <div className="flex gap-2 mb-6 flex-wrap">
                  {project.tech.map(t => (
                    <span key={t} className="px-3 py-1 bg-white border border-neutral-100 rounded-full text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      {t}
                    </span>
                  ))}
                </div>
                <h4 className="text-3xl font-display font-bold mb-4">{project.title}</h4>
                <p className="text-lg text-brand-dark/60 mb-8 leading-relaxed">
                  {project.description}
                </p>
                <button className="flex items-center gap-2 font-bold group">
                  View Case Study 
                  <span className="w-10 h-10 rounded-full border border-brand-dark/10 flex items-center justify-center group-hover:bg-brand-dark group-hover:text-white transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
