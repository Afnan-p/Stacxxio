import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, BarChart3, Rocket } from 'lucide-react';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, 
  SiExpress, SiNestjs, SiMongodb, SiPostgresql, SiRedis, SiPython, 
  SiFigma, SiDocker, SiVercel, SiFlutter, SiGithub, SiCloudinary, SiGit 
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

const techPills = [
  // Top area
  { name: 'Next.js', icon: <SiNextdotjs size={20} color="#000000" />, y: 20, delay: 0.1 },
  { name: 'React', icon: <SiReact size={28} color="#61DAFB" />, y: -10, delay: 0.2, featured: true },
  { name: 'TypeScript', icon: <SiTypescript size={20} color="#3178C6" />, y: 15, delay: 0.3 },
  
  // Upper middle
  { name: 'Tailwind CSS', icon: <SiTailwindcss size={20} color="#06B6D4" />, y: 0, delay: 0.4 },
  { name: 'Node.js', icon: <SiNodedotjs size={20} color="#339933" />, y: 15, delay: 0.5 },
  { name: 'Express.js', icon: <SiExpress size={20} color="#000000" />, y: -10, delay: 0.6 },
  { name: 'NestJS', icon: <SiNestjs size={20} color="#E0234E" />, y: 10, delay: 0.7 },
  
  // Center area
  { name: 'MongoDB', icon: <SiMongodb size={20} color="#47A248" />, y: 10, delay: 0.8 },
  { name: 'PostgreSQL', icon: <SiPostgresql size={20} color="#4169E1" />, y: -5, delay: 0.9 },
  { name: 'Redis', icon: <SiRedis size={20} color="#DC382D" />, y: 15, delay: 1.0 },
  { name: 'Python', icon: <SiPython size={20} color="#3776AB" />, y: 0, delay: 1.1 },
  
  // Lower middle
  { name: 'Figma', icon: <SiFigma size={20} color="#F24E1E" />, y: 5, delay: 1.2 },
  { name: 'Docker', icon: <SiDocker size={20} color="#2496ED" />, y: -15, delay: 1.3 },
  { name: 'AWS', icon: <FaAws size={26} color="#232F3E" />, y: 5, delay: 1.4 },
  { name: 'Vercel', icon: <SiVercel size={20} color="#000000" />, y: -10, delay: 1.5 },
  { name: 'Flutter', icon: <SiFlutter size={20} color="#02569B" />, y: 15, delay: 1.6 },
  
  // Bottom area
  { name: 'GitHub', icon: <SiGithub size={20} color="#181717" />, y: -5, delay: 1.7 },
  { name: 'Git', icon: <SiGit size={20} color="#F05032" />, y: 10, delay: 1.8 },
  { name: 'Cloudinary', icon: <SiCloudinary size={20} color="#3448C5" />, y: -10, delay: 1.9 },
];

const features = [
  {
    title: 'Performance First',
    desc: 'We choose technologies that ensure speed, efficiency and best performance.',
    icon: <Zap size={22} className="text-brand-text" />
  },
  {
    title: 'Secure & Reliable',
    desc: 'Security and reliability are at the core of every technology we use.',
    icon: <ShieldCheck size={22} className="text-brand-text" />
  },
  {
    title: 'Scalable Solutions',
    desc: 'Our tech stack grows with your business and scales without limits.',
    icon: <BarChart3 size={22} className="text-brand-text" />
  },
  {
    title: 'Future Ready',
    desc: 'We use modern, future-ready technologies to keep you ahead of the curve.',
    icon: <Rocket size={22} className="text-brand-text" />
  }
];

const TechStack = () => {
  return (
    <section className="py-20 md:py-28 bg-brand-surface relative overflow-hidden font-sans border-y border-gray-100">
      
      {/* Abstract Background with Gradients and Dots */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Soft Radial Gradients (Grayscale) */}
        <div className="absolute top-[0%] left-[-10%] w-96 h-96 bg-gray-200/30 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[0%] right-[-10%] w-[30rem] h-[30rem] bg-gray-200/20 rounded-full blur-[120px]"></div>
        
        {/* Network / Dotted Paths */}
        <svg className="absolute w-full h-full opacity-[0.2]" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100 200 Q 300 50, 600 250 T 1200 150" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="6 8" />
          <path d="M-50 450 Q 250 550, 500 350 T 1100 400" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4 6" />
          <path d="M 200 -50 Q 400 250, 550 400 T 900 700" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="5 10" />
        </svg>

        {/* Floating Mini Dots */}
        <div className="absolute top-[25%] left-[20%] w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
        <div className="absolute top-[35%] right-[25%] w-2 h-2 bg-gray-300 rounded-full"></div>
        <div className="absolute bottom-[30%] left-[30%] w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
        <div className="absolute bottom-[20%] right-[20%] w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
        
        {/* Dot Matrix Decoration */}
        <div className="absolute bottom-[10%] left-[2%] w-24 h-24" style={{ backgroundImage: 'radial-gradient(#9ca3af 1px, transparent 1px)', backgroundSize: '12px 12px', opacity: 0.15 }}></div>
      </div>

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gray-500 font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
              TECHNOLOGY ECOSYSTEM
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Technologies <span className="text-gray-500">We Trust</span>
            </h2>
            <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              We use modern technologies, frameworks, and tools to build fast, secure, and scalable digital products.
            </p>
          </motion.div>
        </div>

        {/* Floating Tech Cluster */}
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center items-center gap-4 md:gap-5 lg:gap-6 py-10 relative">
          {techPills.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8, y: tech.y + 20 }}
              whileInView={{ opacity: 1, scale: 1, y: tech.y }}
              viewport={{ once: true }}
              transition={{ delay: tech.delay * 0.3, duration: 0.6, type: 'spring', bounce: 0.4 }}
              className={`flex items-center gap-3 px-5 py-3 md:px-6 md:py-3.5 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer ${
                tech.featured 
                  ? 'md:px-8 md:py-4 border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.08)]' 
                  : ''
              }`}
            >
              {tech.icon}
              <span className={`font-semibold text-gray-800 ${tech.featured ? 'text-base md:text-lg' : 'text-sm md:text-base'}`}>
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom Features Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 max-w-6xl mx-auto bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 p-8 md:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:divide-x divide-gray-100">
            {features.map((feature, idx) => (
              <div key={idx} className={`flex items-start gap-4 ${idx !== 0 ? 'lg:pl-8' : ''}`}>
                <div className="bg-gray-50 p-3.5 rounded-2xl flex-shrink-0 border border-gray-100">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-gray-900 mb-1.5">{feature.title}</h4>
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
