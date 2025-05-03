'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaDownload, FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaStar } from 'react-icons/fa';
import Timeline from './Timeline';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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
      if (!imageRef.current) return;
      
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
  }, []);

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
            className="lg:w-2/5"
            variants={itemVariants}
            style={{ y: imageY }}
            ref={imageRef}
          >
            <motion.div 
              className="relative rounded-xl overflow-hidden"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${-mousePosition.x}deg)`
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
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
              
              {/* Animated border gradient */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-70 blur-sm rounded-xl animate-pulse"></div>
              
              {/* Animated inner border */}
              <div className="absolute inset-0 z-10 rounded-xl border border-white/10"></div>
              
              {/* Image */}
              <div className="relative z-0 rounded-xl overflow-hidden shadow-2xl">
                <motion.div
                  initial={{ filter: "brightness(0.8) contrast(1.2)", scale: 1.05 }}
                  animate={{ 
                    filter: ["brightness(0.8) contrast(1.2)", "brightness(1) contrast(1)", "brightness(0.9) contrast(1.1)"],
                    scale: [1.05, 1, 1.02]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    repeatType: "reverse",
                    times: [0, 0.5, 1]
                  }}
                  className="w-full h-full"
                >
                  <Image 
                    src="https://placehold.co/500x600/6d28d9/FFFFFF?text=About+Sibabalwe" 
                    alt="About Sibabalwe" 
                    width={500} 
                    height={600} 
                    className="w-full object-cover transition-transform"
                  />
                </motion.div>
                
                {/* Animated photo elements */}
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-primary/30 via-transparent to-transparent mix-blend-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.7, 0] }}
                  transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                />
                
                {/* Light sweep effect */}
                <motion.div 
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 4 }}
                  style={{ mixBlendMode: "overlay" }}
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
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
            className="lg:w-3/5"
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

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-24"
        >
          <Timeline />
        </motion.div>
      </div>
      
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