'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaDownload, FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaStar, FaTimes } from 'react-icons/fa';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect on scroll
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  
  // 3D tilt effect for the image
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current || isProfileExpanded) return;
      
      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({
        x: ((x / rect.width) - 0.5) * 20,
        y: ((y / rect.height) - 0.5) * 20
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isProfileExpanded]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isProfileExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isProfileExpanded]);

  // Section animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  // Create profile component that can be reused in both the main view and modal
  const ProfilePlaceholder = ({ isLarge = false }) => (
    <div className={`relative z-0 rounded-xl overflow-hidden ${isLarge ? 'h-auto aspect-[3/4] sm:aspect-auto sm:h-[80vh] sm:max-h-[700px]' : 'h-[400px] sm:h-[500px] md:h-[600px]'} w-full bg-gradient-to-b from-background via-background/90 to-background shadow-2xl`}>
      {/* Abstract geometric shape background */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id={isLarge ? "grad1-lg" : "grad1"} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0.5"/>
            </linearGradient>
            <linearGradient id={isLarge ? "grad2-lg" : "grad2"} x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.5"/>
            </linearGradient>
          </defs>
          <polygon points="0,0 100,0 100,100 0,100" fill={`url(#${isLarge ? "grad1-lg" : "grad1"})`} />
          <path d="M0,0 C50,50 50,50 100,0 V100 H0 Z" fill={`url(#${isLarge ? "grad2-lg" : "grad2"})`} fillOpacity="0.5" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="var(--primary)" strokeWidth="0.5" strokeDasharray="1,1" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--secondary)" strokeWidth="0.5" strokeDasharray="1,1" />
        </svg>
      </div>
      
      {/* Animated profile silhouette */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0.7 }}
        animate={{ 
          opacity: [0.7, 0.9, 0.7],
          scale: [1, 1.01, 1]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      >
        <div className={`relative ${isLarge ? 'w-3/4 h-3/4' : 'w-4/5 h-4/5'}`}>
          {/* Abstract profile representation */}
          <div className={`absolute top-[20%] left-1/2 -translate-x-1/2 ${isLarge ? 'w-[30%] h-[30%]' : 'w-[35%] h-[35%]'} rounded-full bg-gradient-to-b from-primary/40 to-secondary/40 blur-sm`}></div>
          <div className={`absolute top-[55%] left-1/2 -translate-x-1/2 ${isLarge ? 'w-[45%] h-[35%]' : 'w-[55%] h-[40%]'} rounded-[40px] bg-gradient-to-b from-secondary/30 to-primary/30 blur-sm`}></div>
          
          {/* Geometric accents */}
          <motion.div 
            className={`absolute top-[15%] left-[20%] ${isLarge ? 'w-[12px] h-[12px]' : 'w-[8px] h-[8px]'} rounded-full bg-primary`}
            animate={{ 
              y: [0, 5, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div 
            className={`absolute top-[20%] right-[25%] ${isLarge ? 'w-[10px] h-[10px]' : 'w-[6px] h-[6px]'} rounded-full bg-secondary`}
            animate={{ 
              y: [0, -8, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div 
            className={`absolute bottom-[30%] left-[30%] ${isLarge ? 'w-[15px] h-[15px]' : 'w-[10px] h-[10px]'} rounded-full bg-accent`}
            animate={{ 
              y: [0, 8, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
          />
        </div>
      </motion.div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 inset-x-0 h-[20%] bg-gradient-to-t from-primary/10 to-transparent"></div>
      <div className="absolute top-0 inset-x-0 h-[20%] bg-gradient-to-b from-secondary/10 to-transparent"></div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      {/* Particle effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
      >
        {Array.from({ length: isLarge ? 40 : 20 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${isLarge ? 'w-1.5 h-1.5' : 'w-1 h-1'} rounded-full bg-white/60`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );

  return (
    <section id="about" className="pt-24 pb-12 relative overflow-hidden" ref={sectionRef}>
      {/* Background canvas for particle effect */}
      <div className="absolute inset-0 z-0">
        <canvas id="about-particles" className="absolute top-0 left-0 w-full h-full opacity-40"></canvas>
      </div>
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 right-10 -z-10 w-80 h-80 rounded-full bg-primary/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      ></motion.div>
      
      <motion.div 
        className="absolute bottom-20 left-10 -z-10 w-96 h-96 rounded-full bg-secondary/20 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      ></motion.div>
      
      {/* Animated background grid */}
      <div className="absolute inset-0 z-0 opacity-[0.02] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-3xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            About Me
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.5 }}
          ></motion.div>
        </motion.div>
        
        <motion.div 
          className="flex flex-col lg:flex-row items-center gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Image with 3D tilt effect */}
          <motion.div 
            className="w-full lg:w-2/5 mb-10 lg:mb-0"
            variants={itemVariants}
            style={{ y: imageY }}
            ref={imageRef}
          >
            <motion.div 
              className="relative rounded-xl overflow-hidden cursor-pointer group max-w-md mx-auto"
              style={{
                transform: isProfileExpanded ? 'none' : `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${-mousePosition.x}deg)`
              }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setIsProfileExpanded(true)}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {/* View indicator on hover */}
              {/* <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/30 backdrop-blur-sm">
                <div className="bg-primary text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2">
                  <span>View Profile</span>
                </div>
              </div> */}

              {/* Shimmer effect */}
              <motion.div 
                className="absolute inset-0 w-full h-full z-20 pointer-events-none"
                style={{ 
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
                  transform: 'translateX(-100%)'
                }}
                animate={{ 
                  transform: ['translateX(-100%)', 'translateX(100%)'] 
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 6
                }}
              />
              
              {/* Animated gradient background */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-80 blur-sm rounded-xl animate-pulse"></div>
              
              {/* Animated inner border */}
              <div className="absolute inset-[1px] z-10 rounded-xl border border-white/20 backdrop-blur-sm bg-background/10"></div>
              
              {/* Profile placeholder */}
              <div className="relative">
                <ProfilePlaceholder />
              </div>
              
              {/* Floating badge */}
              <motion.div 
                className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-2 px-3 rounded-full shadow-lg border border-border z-20 text-sm font-medium text-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                Full Stack Developer
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Content */}
          <motion.div 
            className="w-full lg:w-3/5"
            variants={itemVariants}
            style={{ y: contentY }}
          >
            <motion.div 
              className="glass p-8 rounded-2xl backdrop-blur-md bg-background/30 border border-white/10 shadow-xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <motion.h3 
                className="text-2xl font-bold mb-6 text-primary"
                variants={itemVariants}
              >
                Who I Am
              </motion.h3>
              
              <motion.p 
                className="text-foreground/80 mb-4 leading-relaxed"
                variants={itemVariants}
              >
                My story begins with a childhood fascination for taking things apart to understand how they work. 
                This curiosity naturally led me to the digital realm, where I discovered the power of code to build 
                and transform ideas into reality. What started as simple HTML experiments evolved into a lifelong 
                passion for crafting digital experiences that solve real problems and delight users.
              </motion.p>
              
              <motion.p 
                className="text-foreground/80 mb-6 leading-relaxed"
                variants={itemVariants}
              >
                Each project in my journey has been a chapter of growth and discovery. From elegant front-end 
                interfaces that tell visual stories to robust back-end systems that power seamless experiences, 
                I approach every challenge with both technical precision and creative vision. I believe the best 
                digital solutions are those that feel intuitive and human, despite the complex code that powers them.
              </motion.p>
              
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8"
                variants={itemVariants}
              >
                <motion.div 
                  className="flex gap-4 items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4 className="font-bold">Location</h4>
                    <p className="text-muted-foreground">Cape Town, South Africa</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex gap-4 items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <FaGraduationCap />
                  </div>
                  <div>
                    <h4 className="font-bold">Education</h4>
                    <p className="text-muted-foreground">Computer Science, UCT</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex gap-4 items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <FaBriefcase />
                  </div>
                  <div>
                    <h4 className="font-bold">Experience</h4>
                    <p className="text-muted-foreground">5+ years in Web Development</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex gap-4 items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <FaStar />
                  </div>
                  <div>
                    <h4 className="font-bold">Interests</h4>
                    <p className="text-muted-foreground">UI/UX, AI, Open Source</p>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Download CV button */}
              <motion.a 
                href="#download"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                <FaDownload />
                <span>Download CV</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Full-screen modal for profile */}
      <AnimatePresence>
        {isProfileExpanded && (
          <motion.div 
            className="fixed inset-0 z-[200] bg-background/80 backdrop-blur-lg flex items-center justify-center p-2 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsProfileExpanded(false)}
          >
            <motion.div
              className="relative w-full max-w-4xl mx-auto max-h-[95vh] overflow-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-lg border border-border text-foreground hover:text-primary transition-colors"
                onClick={() => setIsProfileExpanded(false)}
              >
                <FaTimes size={20} />
              </button>
              
              {/* Modal content */}
              <div className="glass p-2 sm:p-4 rounded-2xl backdrop-blur-md bg-background/30 border border-white/10 shadow-2xl">
                <div className="rounded-xl overflow-hidden">
                  {/* Animated gradient background */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-80 blur-sm rounded-xl animate-pulse"></div>
                  
                  {/* Animated inner border */}
                  <div className="absolute inset-[1px] z-10 rounded-xl border border-white/20 backdrop-blur-sm bg-background/10"></div>
                  
                  {/* Large profile placeholder */}
                  <div className="relative">
                    <ProfilePlaceholder isLarge={true} />
                    
                    {/* Floating badge */}
                    <div className="absolute top-3 left-3 sm:top-6 sm:left-6 bg-background/80 backdrop-blur-sm p-2 sm:p-3 px-3 sm:px-4 rounded-xl shadow-lg border border-border z-20 font-medium text-primary">
                      <h3 className="text-lg sm:text-xl font-bold">Sibabalwe</h3>
                      <p className="text-sm sm:text-base text-foreground/80">Full Stack Developer</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Initialize particles */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const canvas = document.getElementById('about-particles');
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            
            const particles = [];
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
              particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: 'rgba(109, 40, 217, ' + (Math.random() * 0.2 + 0.1) + ')'
              });
            }
            
            function animate() {
              requestAnimationFrame(animate);
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              
              for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
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
            }
            
            animate();
            
            window.addEventListener('resize', function() {
              canvas.width = canvas.offsetWidth;
              canvas.height = canvas.offsetHeight;
            });
          });
        `
      }} />
    </section>
  );
} 