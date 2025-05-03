'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionIntroProps {
  title: string;
  subtitle: string;
  description: string;
  align?: 'left' | 'center' | 'right';
  gradientText?: boolean;
}

export default function SectionIntro({ 
  title, 
  subtitle, 
  description, 
  align = 'center',
  gradientText = true
}: SectionIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  // Define text alignment classes
  const alignmentClasses = {
    container: {
      left: "items-start text-left",
      center: "items-center text-center",
      right: "items-end text-right"
    },
    divider: {
      left: "mr-auto",
      center: "mx-auto",
      right: "ml-auto"
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };
  
  const dividerVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };
  
  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
        delay: 0.4
      }
    }
  };
  
  // Split description into words for staggered animation
  const words = description.split(' ');
  
  // Generate decorative particles (small dots for visual interest)
  const particleCount = 8;
  const particles = Array.from({ length: particleCount });
  
  return (
    <motion.div 
      ref={containerRef}
      className={`flex flex-col gap-3 max-w-2xl ${alignmentClasses.container[align]} relative`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Particles */}
        {isInView && particles.map((_, i) => (
          <motion.div 
            key={i}
            className={`absolute w-1 h-1 rounded-full bg-primary/30`}
            style={{
              left: `${align === 'right' ? 80 - Math.random() * 40 : Math.random() * 40}%`,
              top: `${Math.random() * 100}%`
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1, 0.8],
              opacity: [0, 0.8, 0],
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 100]
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        ))}
        
        {/* Decorative circle */}
        {isInView && align !== 'center' && (
          <motion.div 
            className={`absolute w-64 h-64 rounded-full bg-gradient-to-r from-primary/5 to-secondary/5 blur-3xl -z-10`}
            style={{
              left: align === 'right' ? '-20%' : '70%',
              top: '10%'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        )}
      </div>
      
      {/* Subtitle with decorative line */}
      <div className="relative">
        <motion.span 
          className="text-sm uppercase tracking-widest text-primary font-medium mb-2 relative inline-block"
          variants={titleVariants}
        >
          {subtitle}
          {/* Decorative line extending from subtitle */}
          <motion.span 
            className={`absolute top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-primary/60 to-transparent h-[1px] ${align === 'right' ? 'right-full mr-3' : 'left-full ml-3'}`}
            style={{ display: align !== 'center' ? 'block' : 'none' }}
            initial={{ width: 0 }}
            animate={isInView ? { width: '3rem' } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.span>
      </div>
      
      {/* Main title */}
      <motion.h2 
        className={`text-3xl sm:text-5xl font-bold mb-2 ${
          gradientText 
            ? 'bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text' 
            : 'text-foreground'
        } relative`}
        variants={titleVariants}
      >
        {title}
        
        {/* Subtle highlight effect behind the title */}
        <motion.div 
          className="absolute -inset-1 -z-10 opacity-30 blur-lg bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.3, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1 }}
        />
      </motion.h2>
      
      {/* Animated divider with glow effect */}
      <div className="relative h-1 overflow-visible mb-6">
        <motion.div 
          className={`w-24 h-full bg-gradient-to-r from-primary to-secondary rounded-full ${alignmentClasses.divider[align]} relative`}
          variants={dividerVariants}
        >
          {/* Glow element on the divider */}
          <motion.div 
            className="absolute top-0 bottom-0 w-8 bg-white/70 blur-sm -z-1"
            initial={{ left: '-10%' }}
            animate={isInView ? { left: '120%' } : { left: '-10%' }}
            transition={{ 
              duration: 2, 
              delay: 0.8,
              repeat: Infinity,
              repeatDelay: 3
            }}
          />
        </motion.div>
      </div>
      
      {/* Description with word-by-word animation */}
      <motion.div 
        className="relative overflow-hidden p-4 rounded-lg bg-gradient-to-r from-background/30 to-background/10 backdrop-blur-sm border border-white/5"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="relative">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-1 relative"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ 
                delay: 0.5 + (i * 0.02), 
                duration: 0.3,
                ease: "easeOut"
              }}
            >
              {word}
            </motion.span>
          ))}
          
          {/* Reading progress line */}
          <motion.div 
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary/40 to-secondary/40"
            initial={{ width: '0%' }}
            animate={isInView ? { width: '100%' } : { width: '0%' }}
            transition={{ duration: 2, delay: 0.8 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
} 