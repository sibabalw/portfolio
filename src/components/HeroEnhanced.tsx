'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaTwitter, FaArrowDown } from 'react-icons/fa';
import SpaceScene from './3d/SpaceScene';

export default function HeroEnhanced() {
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Transform values based on scroll position
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = containerRef.current.getBoundingClientRect();
      
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const moveX = (x - centerX) / 25;
      const moveY = (y - centerY) / 25;
      
      Array.from(document.querySelectorAll('.animate-layer')).forEach((layer, index) => {
        const speed = 0.2 + index * 0.1;
        const htmlLayer = layer as HTMLElement;
        htmlLayer.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Particle background effect
  useEffect(() => {
    const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }[] = [];
    
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: `rgba(${37 + Math.random() * 100}, ${99 + Math.random() * 50}, ${235 + Math.random() * 20}, ${0.2 + Math.random() * 0.3})`
      });
    }
    
    function animate() {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!ctx) continue;
        
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;
      }
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Staggered animation variants for child elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  // Text animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    })
  };

  const nameLetters = "Sibabalwe".split("");

  return (
    <motion.div 
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background"
      ref={containerRef}
      style={{ 
        opacity, 
        scale,
        y
      }}
    >
      {/* Particle Canvas Background */}
      <canvas id="particle-canvas" className="absolute top-0 left-0 w-full h-full z-0"></canvas>
      
      {/* Background effects */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-secondary to-accent"></div>
      <div className="animate-layer absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
      <div className="animate-layer absolute top-60 -right-40 w-[30rem] h-[30rem] rounded-full bg-secondary/10 blur-3xl"></div>
      <div className="animate-layer absolute -bottom-40 left-60 w-80 h-80 rounded-full bg-accent/10 blur-3xl"></div>
      
      {/* Additional ambient particles */}
      <div className="absolute top-1/4 right-1/4 w-4 h-4 rounded-full bg-primary/40 blur-sm animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 rounded-full bg-secondary/40 blur-sm animate-pulse-slow"></div>
      <div className="absolute top-1/2 left-1/5 w-2 h-2 rounded-full bg-accent/40 blur-sm animate-pulse"></div>
      
      {/* Animated background grid */}
      <div className="absolute inset-0 z-0 opacity-[0.02] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      {/* Social links floating on the left */}
      <motion.div 
        className="fixed left-6 bottom-0 z-20 hidden md:flex flex-col items-center gap-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.a 
          href="https://github.com/sibabalwe" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
          whileHover={{ scale: 1.2, y: -2 }}
        >
          <FaGithub size={22} />
        </motion.a>
        <motion.a 
          href="https://linkedin.com/in/sibabalwe" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
          whileHover={{ scale: 1.2, y: -2 }}
        >
          <FaLinkedin size={22} />
        </motion.a>
        <motion.a 
          href="https://twitter.com/sibabalwe" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
          whileHover={{ scale: 1.2, y: -2 }}
        >
          <FaTwitter size={22} />
        </motion.a>
        <div className="h-24 w-[1px] bg-border"></div>
      </motion.div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="flex flex-col lg:flex-row items-center gap-16 py-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content */}
          <motion.div 
            className="lg:w-1/2 space-y-6 relative"
            variants={itemVariants}
          >
            {/* Connector line to 3D section (only visible on desktop) */}
            <div className="hidden lg:block absolute -right-8 top-1/3 w-16 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
            
            <motion.h2 
              className="text-lg sm:text-xl font-medium text-primary relative inline-block"
              variants={itemVariants}
            >
              Hello, I'm
              <motion.span 
                className="absolute -bottom-1 left-0 h-[2px] bg-primary"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1, duration: 0.8 }}
              ></motion.span>
            </motion.h2>
            
            <motion.div 
              className="flex items-center overflow-hidden"
              variants={itemVariants}
            >
              {nameLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-5xl sm:text-6xl md:text-7xl font-bold inline-block bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
            
            <motion.p 
              className="text-xl sm:text-2xl text-foreground/80 mt-4"
              variants={itemVariants}
            >
              I <span className="text-accent font-semibold">transform</span> ideas into digital realities
            </motion.p>
            
            <motion.p 
              className="text-muted-foreground text-lg max-w-xl"
              variants={itemVariants}
            >
              As a full-stack developer with a storyteller's heart, I blend code and creativity 
              to craft meaningful digital journeys. Every project is an opportunity to 
              solve problems and create experiences that resonate and inspire.
            </motion.p>
            
            <motion.div 
              className="flex gap-4 pt-8"
              variants={itemVariants}
            >
              <motion.a 
                href="#contact" 
                className="px-7 py-3 bg-primary hover:bg-primary-light text-white rounded-full transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Get in Touch</span>
                <span className="absolute inset-0 bg-primary-light transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
              </motion.a>
              <motion.a 
                href="#projects" 
                className="px-7 py-3 border border-border hover:border-primary text-foreground hover:text-primary rounded-full transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View My Work</span>
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* 3D Scene */}
          <motion.div 
            className="lg:w-1/2 h-[400px] md:h-[500px] w-full relative overflow-visible"
            variants={itemVariants}
          >
            {/* Gradient background for 3D scene */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/30 to-transparent rounded-[40px] backdrop-blur-sm -z-5"></div>
            
            {/* Accent glow behind 3D scene */}
            <div className="absolute top-1/4 left-1/4 w-2/3 h-2/3 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-2/3 h-2/3 bg-secondary/20 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
            
            {/* 3D Scene container with no visible borders */}
            <div className="w-full h-full absolute top-0 left-0 z-10 overflow-visible">
              <SpaceScene />
            </div>
            
            {/* Floating badges */}
            <motion.div 
              className="absolute -top-5 -left-10 bg-background/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-border z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">React</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-10 -right-5 bg-background/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-border z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm font-medium">TypeScript</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute top-1/3 right-0 bg-background/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-border z-20"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.8, duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-sm font-medium">Next.js</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll down indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <span className="text-muted-foreground text-sm">Scroll Down</span>
        <motion.div
          animate={{ 
            y: [0, 8, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 1.5,
          }}
        >
          <FaArrowDown className="text-primary" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 