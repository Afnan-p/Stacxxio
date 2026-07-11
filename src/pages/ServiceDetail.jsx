import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const detailedServices = [
  {
    _id: '1',
    title: 'Business Website Development',
    tag: 'Professional business websites designed to establish credibility, drive growth, and enhance your digital presence',
    description: 'Professional business websites designed to establish credibility, drive growth, and enhance your digital presence.',
    fullDescription: 'In today\'s digital landscape, your website is often the first interaction potential clients have with your brand. We design and develop bespoke business websites that not only look stunning but are strategically built to convert visitors into loyal customers.\n\nOur approach combines cutting-edge aesthetics with robust technical architecture, ensuring your site is lightning-fast, fully responsive across all devices, and optimized for search engines. We focus on clear user journeys, compelling calls to action, and seamless integration with your existing business tools.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80',
    features: ['Custom UI/UX Design tailored to your brand', 'Responsive architecture for mobile, tablet, and desktop', 'SEO optimization for maximum search visibility', 'High-performance loading speeds and technical optimization', 'CMS integration for easy content management'],
    faqs: [
      { question: 'How long does it take to build a business website?', answer: 'A standard business website typically takes 4-8 weeks from initial discovery to final launch, depending on the complexity and number of pages.' },
      { question: 'Will I be able to update the website myself?', answer: 'Yes, we integrate a user-friendly Content Management System (CMS) that allows you to easily update text, images, and add new pages without coding knowledge.' },
      { question: 'Is ongoing support included?', answer: 'We offer post-launch support and maintenance packages to ensure your website remains secure, updated, and performing optimally.' }
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Node.js']
  },
  {
    _id: '2',
    title: 'Custom Web Application Development',
    tag: 'Scalable web applications built to streamline operations, automate processes, and scale with your business',
    description: 'Scalable web applications built to streamline operations, automate processes, and scale with your business.',
    fullDescription: 'Off-the-shelf software rarely fits the unique operational needs of a growing business. We engineer custom web applications designed specifically to solve your complex business challenges, automate workflows, and provide unparalleled value to your users.\n\nFrom sophisticated SaaS platforms and internal CRM dashboards to complex data visualization tools, our engineering team utilizes modern, scalable tech stacks to build secure and high-performing applications. We prioritize robust architecture, intuitive user interfaces, and seamless third-party API integrations.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80',
    features: ['Scalable cloud-native architecture', 'Secure authentication and role-based access control', 'Complex third-party API integrations', 'Real-time data processing and analytics dashboards', 'Automated workflow systems and business logic execution'],
    faqs: [
      { question: 'What technologies do you use for web apps?', answer: 'We primarily utilize the MERN stack (MongoDB, Express, React, Node.js) along with Next.js, PostgreSQL, and cloud services like AWS to ensure scalability and high performance.' },
      { question: 'Can the application scale as my business grows?', answer: 'Absolutely. We design our web applications with cloud-native, scalable architectures that can handle increased user loads and data volume without compromising performance.' },
      { question: 'Do you handle the deployment and hosting?', answer: 'Yes, we manage the entire deployment lifecycle, configuring secure, auto-scaling cloud environments on platforms like AWS or Vercel tailored to your application needs.' }
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'AWS']
  },
  {
    _id: '3',
    title: 'E-Commerce Development',
    tag: 'High-converting online stores designed to deliver seamless shopping experiences and maximize online sales',
    description: 'High-converting online stores designed to deliver seamless shopping experiences and maximize online sales.',
    fullDescription: 'Success in e-commerce requires more than just a digital catalog; it demands an immersive, frictionless shopping experience. We build robust e-commerce platforms engineered to maximize conversion rates, reduce cart abandonment, and scale alongside your business.\n\nWhether developing custom headless commerce solutions or leveraging powerful platforms like Shopify Plus, we focus on lightning-fast performance, secure payment gateways, and intuitive inventory management. Our designs prioritize the user journey, ensuring a seamless transition from product discovery to final checkout.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1920&q=80',
    features: ['Custom storefront design optimized for conversions', 'Secure, multi-currency payment gateway integration', 'Headless commerce architecture for ultimate speed', 'Advanced inventory and order management systems', 'Automated abandoned cart recovery workflows'],
    faqs: [
      { question: 'Which e-commerce platforms do you support?', answer: 'We specialize in custom headless commerce solutions (using React/Next.js), Shopify Plus, and scalable custom Node.js/MongoDB e-commerce backends.' },
      { question: 'Can you integrate our existing inventory system?', answer: 'Yes, we can build custom API integrations to sync your online store in real-time with your existing ERP, CRM, or inventory management software.' },
      { question: 'How do you ensure payment security?', answer: 'We implement industry-standard PCI-compliant payment gateways like Stripe or PayPal, ensuring that all transaction data is encrypted and handled securely.' }
    ],
    technologies: ['React', 'Next.js', 'Stripe', 'Shopify', 'Node.js']
  },
  {
    _id: '4',
    title: 'Portfolio & Personal Branding Websites',
    tag: 'Professional portfolio websites crafted to showcase expertise, build personal brand, and attract high-value clients',
    description: 'Professional portfolio websites crafted to showcase expertise, build personal brand, and attract high-value clients.',
    fullDescription: 'For creatives, consultants, and industry leaders, your digital presence is your strongest asset. We craft ultra-premium portfolio and personal branding websites designed to position you as an authority in your field and attract high-value opportunities.\n\nWe utilize advanced layout techniques, cinematic micro-interactions, and flawless typography to create a memorable digital experience. Our portfolio designs don\'t just display your work; they tell the story of your expertise, your unique approach, and the immense value you bring to your clients.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1920&q=80',
    features: ['Cinematic visual design and micro-interactions', 'Dynamic project showcase galleries and case study layouts', 'Optimized for high-end personal branding and authority building', 'Lightning-fast performance and seamless page transitions', 'Integrated booking and inquiry capture forms'],
    faqs: [
      { question: 'Can I upload high-resolution videos and images?', answer: 'Yes, we integrate intelligent media delivery systems (like Cloudinary) to ensure your high-res media loads instantly without slowing down the site.' },
      { question: 'Will the site reflect my personal style?', answer: 'Absolutely. We undergo a thorough discovery phase to understand your brand identity, ensuring the typography, color palette, and animations perfectly align with your aesthetic.' },
      { question: 'Is it easy to add new projects to my portfolio?', answer: 'Yes, we build intuitive admin dashboards allowing you to seamlessly add new case studies, images, and client testimonials without touching the code.' }
    ],
    technologies: ['React', 'Framer Motion', 'Tailwind CSS', 'Vite']
  },
  {
    _id: '5',
    title: 'Website Maintenance & Support',
    tag: 'Ongoing website maintenance, security updates, performance optimization, and dedicated technical support',
    description: 'Ongoing website maintenance, security updates, performance optimization, and dedicated technical support.',
    fullDescription: 'A successful website requires continuous care to remain secure, fast, and aligned with evolving web standards. Our comprehensive maintenance and support services act as your dedicated technical partner, ensuring your digital assets perform flawlessly 24/7.\n\nFrom routine security patching and server monitoring to proactive performance optimizations and content updates, we handle the technical complexities so you can focus on running your business. We provide detailed monthly reporting and dedicated support channels for rapid issue resolution.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80',
    features: ['24/7 uptime monitoring and automated backups', 'Proactive security patching and vulnerability scanning', 'Continuous performance optimization and Core Web Vitals improvements', 'Priority technical support and bug resolution', 'Monthly analytics and health status reporting'],
    faqs: [
      { question: 'What is included in the maintenance plan?', answer: 'Plans typically include daily backups, weekly software/plugin updates, security monitoring, performance optimization, and a set amount of dedicated developer hours for updates.' },
      { question: 'Do you provide emergency support?', answer: 'Yes, our premium support tiers include SLA-backed emergency response times to address critical issues or downtime immediately.' },
      { question: 'Can you maintain a website you didn\'t build?', answer: 'Yes. We begin with a comprehensive technical audit of your existing codebase and server architecture before onboarding your site into our maintenance ecosystem.' }
    ],
    technologies: ['AWS', 'Docker', 'Vercel', 'Datadog', 'GitHub Actions']
  },
  {
    _id: '6',
    title: 'Mobile App Development',
    tag: 'High-performance cross-platform mobile applications built for iOS and Android',
    description: 'High-performance cross-platform mobile applications built for iOS and Android to engage your users on the go.',
    fullDescription: 'In a mobile-first world, delivering a flawless app experience is critical to user engagement and brand loyalty. We develop high-performance, intuitive mobile applications for both iOS and Android platforms that your users will love.\n\nLeveraging modern cross-platform frameworks, we deliver native-like performance and aesthetics while significantly reducing development time and costs. From conceptual wireframing to App Store deployment, we handle the entire lifecycle, ensuring your app is secure, scalable, and perfectly aligned with your business objectives.',
    image: 'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?auto=format&fit=crop&w=1920&q=80',
    features: ['Cross-platform development for iOS and Android', 'Native-level performance and fluid animations', 'Secure API integrations and offline data synchronization', 'Push notification architecture and user engagement tools', 'Comprehensive App Store deployment and compliance management'],
    faqs: [
      { question: 'Do you build for both iOS and Android?', answer: 'Yes, we use modern cross-platform frameworks like React Native or Flutter to develop for both platforms simultaneously, ensuring consistency and cost-efficiency.' },
      { question: 'How do you handle app store submissions?', answer: 'We manage the entire submission process for both the Apple App Store and Google Play Store, ensuring all guidelines, privacy policies, and technical requirements are met.' },
      { question: 'Can the app sync with my existing web platform?', answer: 'Absolutely. We build secure REST or GraphQL APIs to ensure real-time data synchronization between your mobile app, web platform, and central database.' }
    ],
    technologies: ['React Native', 'Flutter', 'Node.js', 'Firebase', 'GraphQL']
  }
];

const ServiceDetail = () => {
  const { slug } = useParams();
  
  const service = detailedServices.find(s => s._id === slug || s.title.toLowerCase().replace(/\s+/g, '-') === slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-brand-surface flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">Service Not Found</h1>
        <p className="text-gray-500 mb-8">The service you are looking for does not exist.</p>
        <Link to="/" className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors">
          Return to Home
        </Link>
      </div>
    );
  }

  const displayImage = service.image;

  return (
    <div className="min-h-screen bg-brand-surface font-sans selection:bg-[#111111] selection:text-white flex flex-col">
      <SEO 
        title={service.seoTitle || `${service.title} - ZYNEXTA Services`}
        description={service.seoDescription || service.description}
        canonical={`https://zynexta.com/services/${slug}`}
      />

      <main className="flex-grow pt-16 pb-20">
        <div className="container mx-auto px-6 md:px-10 max-w-[1400px]">
          
          {/* Back Navigation */}
          <Link to="/#services" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 font-medium">
            <ArrowLeft size={16} /> Back to Services
          </Link>

          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 md:mb-24"
          >
            <div className="max-w-6xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block">
                {service.tag || "Premium Service"}
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-gray-900 tracking-tight leading-[1.1] mb-6">
                {service.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-5xl">
                {service.description}
              </p>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden mb-24 bg-gray-100 border border-gray-200"
          >
            <img 
              src={displayImage} 
              alt={service.title} 
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Main Content (Left) */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* Service Overview */}
              <section>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Service Overview</h2>
                <div className="prose prose-lg text-gray-600 prose-headings:font-display prose-headings:text-gray-900 prose-a:text-gray-900 max-w-none whitespace-pre-wrap">
                  {service.fullDescription || service.description || "Detailed description for this service is currently being updated."}
                </div>
              </section>

              {/* Key Features */}
              {service.features && service.features.length > 0 && (
                <section>
                  <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">Key Capabilities</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <CheckCircle2 className="w-6 h-6 text-gray-900 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* FAQs */}
              {service.faqs && service.faqs.length > 0 && (
                <section>
                  <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {service.faqs.map((faq, idx) => (
                      <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <h4 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h4>
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>

            {/* Sidebar (Right) */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-8">
                
                {/* Tech Stack Widget */}
                {service.technologies && service.technologies.length > 0 && (
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-display font-bold text-gray-900 mb-6">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, idx) => (
                        <span key={idx} className="px-4 py-2 bg-gray-50 border border-gray-100 text-gray-700 rounded-xl text-sm font-medium">
                          {tech.name || tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}



              </div>
            </div>
          </div>

        </div>
      </main>

   
    </div>
  );
};

export default ServiceDetail;
