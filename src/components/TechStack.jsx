import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/IconMap';
import { Monitor, Code, Database as DatabaseIcon, Smartphone, PenTool, Cloud, ShieldCheck, Rocket, Lock, Layers } from 'lucide-react';
import API from '../api/axios';

const baseTechCategories = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Building interactive and responsive user interfaces',
    icon: <Monitor size={24} className="text-gray-800" />,
    iconBg: 'bg-gray-50',
    gradient: 'from-gray-300 to-gray-100',
    number: '01',
    techs: []
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Robust server-side solutions and APIs',
    icon: <Code size={24} className="text-gray-800" />,
    iconBg: 'bg-gray-50',
    gradient: 'from-gray-300 to-gray-100',
    number: '02',
    techs: []
  },
  {
    id: 'database',
    title: 'Database',
    description: 'Secure, scalable and high-performance databases',
    icon: <DatabaseIcon size={24} className="text-gray-800" />,
    iconBg: 'bg-gray-50',
    gradient: 'from-gray-300 to-gray-100',
    number: '03',
    techs: []
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    description: 'Designing beautiful and user-centered experiences',
    icon: <PenTool size={24} className="text-gray-800" />,
    iconBg: 'bg-gray-50',
    gradient: 'from-gray-300 to-gray-100',
    number: '04',
    techs: []
  },
  {
    id: 'cloud',
    title: 'Deployment & Cloud',
    description: 'Reliable deployment and cloud infrastructure',
    icon: <Cloud size={24} className="text-gray-800" />,
    iconBg: 'bg-gray-50',
    gradient: 'from-gray-300 to-gray-100',
    number: '05',
    techs: []
  }
];

const features = [
  {
    title: 'Production Ready',
    desc: 'We use battle-tested technologies for reliable solutions.',
    icon: <ShieldCheck size={24} className="text-gray-800" />
  },
  {
    title: 'Performance Focused',
    desc: 'Optimized for speed, scalability and performance.',
    icon: <Rocket size={24} className="text-gray-800" />
  },
  {
    title: 'Secure by Design',
    desc: 'Security best practices in every layer.',
    icon: <Lock size={24} className="text-gray-800" />
  },
  {
    title: 'Future Proof',
    desc: 'Modern stack that evolves with your business.',
    icon: <Layers size={24} className="text-gray-800" />
  }
];

const TechStack = () => {
  const [categories, setCategories] = useState(baseTechCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechs = async () => {
      try {
        const { data } = await API.get('/api/tech');
        
        // Group the fetched technologies by category
        const grouped = data.reduce((acc, tech) => {
          const cat = tech.category || 'frontend';
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push({
            name: tech.name,
            iconName: tech.icon,
            // You can randomize or assign colors if needed, but the original used specific colors.
            // For dynamic ones, a default nice color or using the original from react-icons via getIcon is fine.
            // In our TechStack, getIcon renders the SVG. We can just pass a default color.
            color: '#111111' 
          });
          return acc;
        }, {});

        // Merge grouped technologies into our base categories layout
        const updatedCategories = baseTechCategories.map(baseCat => ({
          ...baseCat,
          techs: grouped[baseCat.id] || []
        }));

        setCategories(updatedCategories);
      } catch (err) {
        console.error('Error fetching technologies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTechs();
  }, []);

  // If loading or empty, we can still show the layout, it will just be empty.
  // We'll hide categories that have no technologies to keep it clean.
  const visibleCategories = categories.filter(c => c.techs.length > 0);

  return (
    <section className="py-16 md:py-20 bg-[#FAFAFA] relative overflow-hidden font-sans border-y border-gray-100">
      <div className="container mx-auto px-6 md:px-10 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gray-500 font-semibold uppercase tracking-wider text-sm mb-3 block">
              TECHNOLOGY ECOSYSTEM
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Technologies We Trust
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed mb-6">
              Modern technologies, frameworks, and tools that power the digital products we build for our clients.
            </p>
            {/* Minimal solid line instead of gradient */}
            <div className="w-16 h-1 bg-gray-900 mx-auto rounded-full"></div>
          </motion.div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
          {loading ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-10 text-gray-500 animate-pulse">
              Loading Technology Stack...
            </div>
          ) : visibleCategories.length === 0 ? (
             <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-10 text-gray-500">
              No technologies have been added yet.
            </div>
          ) : (
            visibleCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
              >
                {/* Subtle Gray Border instead of rainbow gradient */}
                <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${category.gradient} opacity-50`} />
                
                {/* Watermark Number */}
                <div className="absolute -bottom-2 -right-2 text-8xl font-black text-gray-50 opacity-60 select-none pointer-events-none group-hover:scale-110 transition-transform duration-500">
                  {category.number}
                </div>

                {/* Card Header */}
                <div className="flex items-start gap-5 mb-8 relative z-10">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${category.iconBg} border border-gray-100`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed pr-4">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5 relative z-10">
                  {category.techs.map((tech, i) => {
                    const Icon = getIcon(tech.iconName);
                    return (
                      <div 
                        key={i}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 shadow-sm rounded-lg hover:border-brand-accent/50 hover:bg-gray-50 transition-colors group/item"
                      >
                        <Icon size={14} color={tech.color} className="opacity-80 group-hover/item:opacity-100 transition-opacity" />
                        <span className="text-[13px] font-medium text-gray-700">
                          {tech.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))
          )}
        </div>
        
        {/* Bottom Features Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {features.map((feature, idx) => (
              <div key={idx} className={`flex items-start gap-4 ${idx !== 0 ? 'md:pl-8 pt-6 md:pt-0' : ''}`}>
                <div className="mt-1 bg-gray-50 p-2 rounded-lg border border-gray-100">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">{feature.title}</h4>
                  <p className="text-[13px] text-gray-500 leading-relaxed pr-2">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default TechStack;
