'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

interface StoryScrollProps {
  children: ReactNode;
}

interface Section {
  id: string;
  heading: string;
  description: string;
}

export default function StoryScroll({ children }: StoryScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState<boolean>(true);
  
  // Reference to each section element
  const sectionsRef = useRef<{[key: string]: HTMLElement | null}>({
    hero: null,
    about: null,
    skills: null,
    projects: null,
    contact: null
  });
  
  // Sections for the navigation dots and guided messaging
  const sections: Section[] = [
    { id: 'hero', heading: 'Welcome', description: 'Begin the journey through my portfolio.' },
    { id: 'about', heading: 'About Me', description: 'Learn about my background and experience.' },
    { id: 'skills', heading: 'My Skills', description: 'Discover my technical expertise and capabilities.' },
    { id: 'projects', heading: 'Projects', description: 'See what I\'ve built and accomplished.' },
    { id: 'contact', heading: 'Contact', description: 'Reach out and let\'s create something together.' },
  ];
  
  // Main scroll progress for overall effects
  const { scrollY, scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Smoothed scroll progress
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Parallax and opacity effects
  const backgroundY = useTransform(smoothScrollProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(smoothScrollProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.8, 0.7]);
  
  // Handle scroll direction detection
  useEffect(() => {
    const handleScroll = () => {
      const st = window.scrollY || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setLastScrollTop(st <= 0 ? 0 : st);
      
      // Hide scroll indicator after some scrolling
      if (st > window.innerHeight * 0.3) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);
  
  // Update active section based on scroll position
  useEffect(() => {
    const handleScrollForActiveSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      // Go through each section and check if it's in view
      for (const id of Object.keys(sectionsRef.current)) {
        const section = sectionsRef.current[id];
        if (!section) continue;
        
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(id);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScrollForActiveSection);
    handleScrollForActiveSection(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScrollForActiveSection);
    };
  }, []);
  
  // Register section refs when they're mounted
  useEffect(() => {
    sectionsRef.current = {
      hero: document.getElementById('hero'),
      about: document.getElementById('about'),
      skills: document.getElementById('skills'),
      projects: document.getElementById('projects'),
      contact: document.getElementById('contact')
    };
  }, []);
  
  // Scroll to section function
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <motion.div 
      ref={containerRef}
      className="relative"
      style={{ 
        opacity: opacity,
        backgroundPositionY: backgroundY 
      }}
    >
      {/* Scroll progress indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary z-50"
        style={{ scaleX: smoothScrollProgress, transformOrigin: "0%" }}
      />
      
      {/* Scroll indicator at the start */}
      {showScrollIndicator && (
        <motion.div 
          className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p className="text-foreground/70 text-sm">Scroll to explore my journey</p>
          <motion.div 
            className="w-8 h-8 rounded-full border-2 border-primary/50 flex items-center justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <FaChevronDown className="text-primary" />
          </motion.div>
        </motion.div>
      )}
      
      {/* Navigation dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col items-center gap-4">
          {sections.map((section) => (
            <div key={section.id} className="group relative">
              <motion.button
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeSection === section.id 
                    ? 'bg-primary scale-125' 
                    : 'bg-foreground/30 hover:bg-foreground/50'
                }`}
                onClick={() => scrollToSection(section.id)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
              
              {/* Tooltip */}
              <div className="absolute right-8 top-0 transform -translate-y-1/2 hidden group-hover:block w-48">
                <div className="bg-background/80 backdrop-blur-md border border-white/10 rounded-md p-2 shadow-lg">
                  <p className="font-medium text-sm">{section.heading}</p>
                  <p className="text-xs text-foreground/70">{section.description}</p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Connecting line */}
          <div className="absolute h-full w-0.5 bg-foreground/10 top-0 left-1/2 transform -translate-x-1/2 -z-10"></div>
          <motion.div 
            className="absolute w-0.5 bg-primary top-0 left-1/2 transform -translate-x-1/2 -z-10"
            style={{ 
              height: smoothScrollProgress,
              transformOrigin: "top"
            }}
          ></motion.div>
        </div>
      </div>
      
      {/* Current section indicator on mobile */}
      <motion.div 
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 lg:hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="bg-background/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 shadow-lg">
          <p className="text-center text-sm">
            {sections.find(s => s.id === activeSection)?.heading || 'Welcome'}
          </p>
        </div>
      </motion.div>
      
      {/* Narrative overlay - shows context about the current section */}
      <motion.div
        className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40 max-w-xs hidden lg:block"
        initial={{ opacity: 0, x: -50 }}
        animate={{ 
          opacity: activeSection !== 'hero' ? 1 : 0,
          x: activeSection !== 'hero' ? 0 : -50
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-background/60 backdrop-blur-md border border-white/10 rounded-lg p-4 shadow-lg">
          <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">
            {sections.find(s => s.id === activeSection)?.heading}
          </h3>
          <p className="text-foreground/70 text-sm leading-relaxed">
            {sections.find(s => s.id === activeSection)?.description}
          </p>
        </div>
      </motion.div>
      
      {/* Scrolling decoration elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Animated lines that follow scroll */}
        <motion.div 
          className="absolute top-0 left-[15%] w-px h-full bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0"
          style={{ 
            y: useTransform(scrollY, [0, 1000], ['-60%', '10%']),
            opacity: useTransform(scrollY, [0, 300, 600], [0, 1, 0])
          }}
        />
        <motion.div 
          className="absolute top-0 right-[25%] w-px h-full bg-gradient-to-b from-secondary/0 via-secondary/20 to-secondary/0"
          style={{ 
            y: useTransform(scrollY, [0, 1000], ['0%', '70%']),
            opacity: useTransform(scrollY, [300, 600, 900], [0, 1, 0])
          }}
        />
        
        {/* Floating shape elements */}
        <motion.div 
          className="absolute top-[30%] left-[30%] w-32 h-32 rounded-full border border-primary/20 backdrop-blur-3xl"
          style={{ 
            y: useTransform(scrollY, [0, 500], ['0%', '100%']),
            scale: useTransform(scrollY, [0, 300, 600], [1, 1.5, 0.8]),
            opacity: useTransform(scrollY, [0, 300, 600], [0.1, 0.3, 0.1])
          }}
        />
        <motion.div 
          className="absolute top-[60%] right-[20%] w-40 h-40 rounded-full border border-secondary/20 backdrop-blur-3xl"
          style={{ 
            y: useTransform(scrollY, [300, 800], ['0%', '-100%']),
            scale: useTransform(scrollY, [300, 600, 900], [0.8, 1.2, 0.9]),
            opacity: useTransform(scrollY, [300, 600, 900], [0.1, 0.3, 0.1])
          }}
        />
      </div>
      
      {children}
    </motion.div>
  );
} 