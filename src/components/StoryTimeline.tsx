'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaUserAlt, FaCode, FaBriefcase, FaEnvelope, FaBook } from 'react-icons/fa';

interface TimelineItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
}

interface StoryTimelineProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export default function StoryTimeline({ 
  activeSection = 'hero',
  onSectionChange 
}: StoryTimelineProps) {
  const [active, setActive] = useState(activeSection);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    setActive(activeSection);
  }, [activeSection]);
  
  // Timeline items data
  const timelineItems: TimelineItem[] = [
    {
      id: 'hero',
      title: 'Introduction',
      icon: <FaHome />,
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'about',
      title: 'My Journey',
      icon: <FaUserAlt />,
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'skills',
      title: 'Tools of My Craft',
      icon: <FaCode />,
      color: 'from-indigo-600 to-cyan-500'
    },
    {
      id: 'projects',
      title: 'Digital Stories',
      icon: <FaBriefcase />,
      color: 'from-cyan-500 to-emerald-500'
    },
    {
      id: 'contact',
      title: 'Next Chapter',
      icon: <FaEnvelope />,
      color: 'from-emerald-500 to-amber-500'
    }
  ];
  
  // Handle chapter navigation
  const handleNavigate = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    window.scrollTo({
      top: section.offsetTop,
      behavior: 'smooth'
    });
    
    if (onSectionChange) {
      onSectionChange(sectionId);
    }
    
    setActive(sectionId);
  };
  
  // Calculate the progress percentage through the story
  const getProgressPercentage = () => {
    const currentIndex = timelineItems.findIndex(item => item.id === active);
    if (currentIndex === -1) return 0;
    
    return (currentIndex / (timelineItems.length - 1)) * 100;
  };
  
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
      {/* Toggle button */}
      <motion.button
        className="flex items-center gap-2 mb-4 px-4 py-2 bg-background/90 backdrop-blur-md rounded-full border border-white/10 shadow-lg text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
        onClick={() => setIsOpen(prev => !prev)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <FaBook className="text-primary" />
        <span>{isOpen ? "Hide Story Timeline" : "View Story Timeline"}</span>
      </motion.button>
      
      {/* Timeline panel */}
      <motion.div
        className="bg-background/80 backdrop-blur-lg p-4 rounded-xl border border-white/10 shadow-xl w-[90vw] max-w-3xl"
        initial={{ opacity: 0, y: 50, height: 0, padding: 0 }}
        animate={isOpen ? { 
          opacity: 1, 
          y: 0, 
          height: 'auto', 
          padding: 16 
        } : { 
          opacity: 0, 
          y: 50, 
          height: 0, 
          padding: 0 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ overflow: isOpen ? 'visible' : 'hidden' }}
      >
        {/* Your journey so far */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Your Journey So Far</h3>
          <div className="text-sm text-foreground/60 flex items-center gap-2">
            <span>Progress:</span>
            <span className="font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {getProgressPercentage().toFixed(0)}%
            </span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-1 bg-white/10 rounded-full mb-6 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${getProgressPercentage()}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        {/* Timeline chapters */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-6 left-0 w-full h-[2px] bg-white/10 -z-10"></div>
          
          {/* Progress line */}
          <motion.div 
            className="absolute top-6 left-0 h-[2px] bg-gradient-to-r from-primary to-secondary -z-10 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: getProgressPercentage() / 100 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Chapter markers */}
          <div className="flex justify-between">
            {timelineItems.map((item, index) => {
              const isActiveItem = item.id === active;
              const isPastItem = timelineItems.findIndex(i => i.id === active) >= index;
              
              return (
                <div 
                  key={item.id}
                  className="flex flex-col items-center gap-2" 
                >
                  {/* Chapter node */}
                  <motion.button
                    className={`w-12 h-12 rounded-full flex items-center justify-center relative ${
                      isActiveItem 
                        ? 'bg-gradient-to-r ' + item.color + ' text-white'
                        : isPastItem
                        ? 'bg-primary/30 text-primary'
                        : 'bg-white/10 text-foreground/40'
                    } border-2 ${
                      isActiveItem 
                        ? 'border-white' 
                        : isPastItem 
                        ? 'border-primary/30' 
                        : 'border-transparent'
                    }`}
                    onClick={() => handleNavigate(item.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={isActiveItem ? { 
                      y: [0, -5, 0],
                      transition: {
                        y: { repeat: Infinity, duration: 2, repeatType: "reverse" }
                      }
                    } : {}}
                  >
                    {/* Pulsing effect for active item */}
                    {isActiveItem && (
                      <motion.div 
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.color}`}
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.7, 0, 0.7]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                        style={{ zIndex: -1 }}
                      />
                    )}
                    
                    <span className="text-lg">
                      {item.icon}
                    </span>
                  </motion.button>
                  
                  {/* Chapter title */}
                  <motion.span
                    className={`text-xs font-medium ${
                      isActiveItem 
                        ? 'text-primary' 
                        : isPastItem 
                        ? 'text-foreground/80' 
                        : 'text-foreground/40'
                    } text-center max-w-[80px]`}
                    animate={isActiveItem ? { 
                      scale: [1, 1.05, 1],
                      transition: {
                        scale: { repeat: Infinity, duration: 2, repeatType: "reverse" }
                      }
                    } : {}}
                  >
                    {item.title}
                  </motion.span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
} 