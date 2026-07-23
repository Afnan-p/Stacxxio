import React, { useEffect, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import SEO from '../components/SEO';
import TechMarquee from '../components/TechMarquee';

const Services = React.lazy(() => import('../components/Services'));
const WorkShowcase = React.lazy(() => import('../components/WorkShowcase'));
const Approach = React.lazy(() => import('../components/Approach'));
const TechStack = React.lazy(() => import('../components/TechStack'));
const Team = React.lazy(() => import('../components/Team'));
const Contact = React.lazy(() => import('../components/Contact'));

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/services' || location.hash === '#services') {
      const timer = setTimeout(() => {
        const el = document.getElementById('services');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <>
      <SEO 
        title={location.pathname === '/services' ? "Services - ZYNEXTA | Premium Web & Software Agency" : "ZYNEXTA | Premium Web & Software Agency"}
        description="ZYNEXTA builds modern, high-performance websites and custom software solutions designed to scale your business."
        canonical={location.pathname === '/services' ? "https://zynexta.com/services" : "https://zynexta.com/"}
      />
      <Hero />
      <TechMarquee />
      <Suspense fallback={<div className="h-20 w-full flex items-center justify-center"><div className="w-6 h-6 border-2 border-brand-accent rounded-full border-t-transparent animate-spin"></div></div>}>
        <Services />
        <WorkShowcase />
        <Approach />
        <TechStack />
        <Team />
        <Contact />
      </Suspense>
    </>
  );
};

export default Home;
