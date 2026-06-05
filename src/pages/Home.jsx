import React, { Suspense } from 'react';
import Hero from '../components/Hero';

const Services = React.lazy(() => import('../components/Services'));
const WorkShowcase = React.lazy(() => import('../components/WorkShowcase'));
const Approach = React.lazy(() => import('../components/Approach'));
const TechStack = React.lazy(() => import('../components/TechStack'));
const Team = React.lazy(() => import('../components/Team'));
const Contact = React.lazy(() => import('../components/Contact'));

const Home = () => {
  return (
    <>
      <Hero />
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
