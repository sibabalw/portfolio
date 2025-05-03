'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface SectionConnectorProps {
  fromSection: string;
  toSection: string;
  icon?: React.ReactNode;
  message?: string;
}

export default function SectionConnector({ 
  fromSection, 
  toSection, 
  icon = <FaChevronDown />,
  message = "Continue the journey"
}: SectionConnectorProps) {
  const connectorRef = useRef<HTMLDivElement>(null);
  
  // Use the scroll position to animate the connector
  const { scrollYProgress } = useScroll({
    target: connectorRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values based on scroll progress
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 40]);
  
  // Handle scroll to next section
  const scrollToSection = () => {
    const section = document.getElementById(toSection);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Particle count for the connector visuals
  const particleCount = 10;
  const particles = Array.from({ length: particleCount });
  
  return (
    <motion.div 
      ref={connectorRef}
      className="w-full py-10 flex flex-col items-center justify-center relative z-10 overflow-hidden"
      style={{ opacity, scale, y }}
    >
      {/* Decorative particles */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/60"
          style={{
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, Math.random() * 40 + 20],
            x: [0, (Math.random() - 0.5) * 30],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      
      {/* Main vertical connecting line */}
      <div className="relative w-px h-16 mb-4">
        {/* Animated gradient line */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/60 to-primary/20 rounded-full"
          animate={{
            backgroundPosition: ['0% 0%', '0% 100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        {/* Animated flowing dot */}
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/30"
          animate={{
            y: [0, 80, 0],
            scale: [1, 0.8, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Message with animated underline */}
      <div className="relative mb-6 text-center">
        <motion.p 
          className="text-md md:text-lg text-foreground/80 font-medium px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm border border-white/10 shadow-lg"
          whileHover={{ y: -3 }}
        >
          <span className="relative">
            {message}
            <motion.span 
              className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"
              initial={{ width: '0%', left: '50%' }}
              animate={{ width: '100%', left: '0%' }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            />
          </span>
        </motion.p>
      </div>
      
      {/* Icon button */}
      <motion.button
        className="w-14 h-14 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-lg text-foreground relative overflow-hidden group"
        onClick={scrollToSection}
        whileHover={{ 
          scale: 1.1, 
          boxShadow: "0 0 20px rgba(100, 100, 255, 0.4)",
          backgroundColor: "#4c1d95"
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated gradient background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-primary/40 to-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Ripple effect on hover */}
        <div className="absolute inset-0 group-hover:scale-100 scale-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out rounded-full">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-white/10"
              animate={{
                scale: [1, 2],
                opacity: [0.1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
        
        <motion.div
          className="relative z-10"
          animate={{ 
            y: [0, 3, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut"
          }}
        >
          {icon}
        </motion.div>
      </motion.button>
    </motion.div>
  );
} 