'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaDribbble,
  FaPaperPlane,
  FaCheck,
  FaExclamationTriangle
} from 'react-icons/fa';

interface AnimatedInputProps {
  type?: 'text' | 'email' | 'textarea';
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label: string;
  disabled?: boolean;
  rows?: number;
}

// Custom Animated Input component with floating label
const AnimatedInput = ({ 
  type = 'text', 
  id, 
  name, 
  value, 
  onChange, 
  label, 
  disabled = false,
  rows = 1
}: AnimatedInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const isTextarea = type === 'textarea';
  const hasValue = value.length > 0;
  
  return (
    <div className="relative">
      {/* Bottom border animation container */}
      <div className="relative">
        {isTextarea ? (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
            required
            className="w-full px-4 pt-6 pb-2 bg-background/30 border-none focus:outline-none peer text-foreground resize-none rounded-t-xl"
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        ) : (
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required
            className="w-full px-4 pt-6 pb-2 bg-background/30 border-none focus:outline-none peer text-foreground rounded-t-xl"
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        )}
        
        {/* Animated Label */}
        <label 
          htmlFor={id}
          className={`absolute left-4 transition-all duration-200 pointer-events-none ${
            (isFocused || hasValue) 
              ? 'text-xs text-primary top-2' 
              : 'text-base text-foreground/70 top-4'
          }`}
        >
          {label}
        </label>
        
        {/* Bottom border with animation - UPDATED FOR BETTER VISIBILITY */}
        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/30 shadow-sm"></div>
        <div 
          className={`absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-primary to-secondary transform origin-left transition-transform duration-300 ${
            isFocused ? 'scale-x-100' : hasValue ? 'scale-x-100 opacity-70' : 'scale-x-0'
          }`}
          style={{ width: '100%' }}
        ></div>
      </div>
    </div>
  );
};

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values for parallax scrolling
  const backgroundY1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const backgroundY2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0.8]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setFormStatus('idle');
      }, 3000);
    }, 1500);
  };
  
  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };
  
  const contactInfoVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };
  
  const formVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.2
      }
    }
  };
  
  const statusVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    exit: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden" ref={sectionRef}>
      {/* Background canvas for particle effect */}
      <div className="absolute inset-0 z-0">
        <canvas id="contact-particles" className="absolute top-0 left-0 w-full h-full opacity-30"></canvas>
      </div>
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-40 -right-20 -z-10 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{ y: backgroundY1 }}
      ></motion.div>
      
      <motion.div 
        className="absolute -bottom-20 left-40 -z-10 w-[30rem] h-[30rem] rounded-full bg-secondary/10 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
        style={{ y: backgroundY2 }}
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
          style={{ opacity: contentOpacity }}
        >
          <motion.h2 
            className="text-3xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Get In Touch
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.5 }}
          ></motion.div>
          
          <motion.p 
            className="mt-6 text-foreground/80 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            Have a project in mind or want to collaborate? Feel free to contact me and I'll get back to you as soon as possible.
          </motion.p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="flex flex-col lg:flex-row gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Contact Information */}
            <motion.div 
              className="lg:w-2/5"
              variants={contactInfoVariants}
            >
              <motion.div 
                className="glass backdrop-blur-md bg-background/20 p-8 rounded-2xl h-full border border-white/10 shadow-xl"
                whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <motion.h3 
                  className="text-2xl font-bold mb-6 text-foreground"
                  variants={itemVariants}
                >
                  Contact Information
                </motion.h3>
                <motion.p 
                  className="text-foreground/70 mb-8 leading-relaxed"
                  variants={itemVariants}
                >
                  Feel free to reach out to me through any of these channels. I'm always open to discussing new projects and opportunities.
                </motion.p>
                
                <motion.div 
                  className="space-y-6"
                  variants={itemVariants}
                >
                  <motion.div 
                    className="flex items-start gap-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center text-primary shadow-md">
                      <FaPhone />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Phone</h4>
                      <p className="text-foreground/70">+27 12 345 6789</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start gap-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center text-primary shadow-md">
                      <FaEnvelope />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Email</h4>
                      <p className="text-foreground/70">hello@sibabalwe.com</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start gap-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center text-primary shadow-md">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Location</h4>
                      <p className="text-foreground/70">Cape Town, South Africa</p>
                    </div>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="mt-12"
                  variants={itemVariants}
                >
                  <h4 className="font-semibold text-foreground mb-4">Connect with me</h4>
                  <div className="flex gap-4">
                    <motion.a 
                      href="https://github.com/sibabalwe" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-background/40 flex items-center justify-center text-foreground/70 hover:text-primary hover:bg-background/60 transition-colors shadow-md border border-white/5"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaGithub />
                    </motion.a>
                    <motion.a 
                      href="https://linkedin.com/in/sibabalwe" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-background/40 flex items-center justify-center text-foreground/70 hover:text-primary hover:bg-background/60 transition-colors shadow-md border border-white/5"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaLinkedin />
                    </motion.a>
                    <motion.a 
                      href="https://twitter.com/sibabalwe" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-background/40 flex items-center justify-center text-foreground/70 hover:text-primary hover:bg-background/60 transition-colors shadow-md border border-white/5"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTwitter />
                    </motion.a>
                    <motion.a 
                      href="https://dribbble.com/sibabalwe" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-background/40 flex items-center justify-center text-foreground/70 hover:text-primary hover:bg-background/60 transition-colors shadow-md border border-white/5"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaDribbble />
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div 
              className="lg:w-3/5"
              variants={formVariants}
            >
              <motion.div 
                className="glass backdrop-blur-md bg-background/20 p-8 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden"
                whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                {/* Decorative elements */}
                <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/5 blur-2xl"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-secondary/5 blur-2xl"></div>
                
                <motion.h3 
                  className="text-2xl font-bold mb-6 text-foreground"
                  variants={itemVariants}
                >
                  Send Me a Message
                </motion.h3>
                
                <motion.form 
                  onSubmit={handleSubmit} 
                  className="space-y-6 relative z-10"
                  variants={itemVariants}
                  ref={formRef}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <AnimatedInput
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        label="Your Name"
                        disabled={formStatus === 'submitting'}
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <AnimatedInput
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        label="Email Address"
                        disabled={formStatus === 'submitting'}
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <AnimatedInput
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      label="Subject"
                      disabled={formStatus === 'submitting'}
                    />
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <AnimatedInput
                      type="textarea"
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      label="Message"
                      disabled={formStatus === 'submitting'}
                      rows={5}
                    />
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className={`w-full px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium flex items-center justify-center gap-2 ${
                        formStatus === 'submitting' ? 'opacity-80' : 'hover:shadow-lg'
                      } transition-all duration-300`}
                    >
                      {formStatus === 'idle' && (
                        <>
                          <span>Send Message</span>
                          <FaPaperPlane />
                        </>
                      )}
                      {formStatus === 'submitting' && (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending...</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                </motion.form>
                
                {/* Status messages */}
                <AnimatePresence mode="wait">
                  {formStatus === 'success' && (
                    <motion.div
                      key="success"
                      className="absolute inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm rounded-2xl"
                      variants={statusVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="text-center p-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FaCheck className="text-green-500 text-2xl" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                        <p className="text-foreground/70 mb-4">Thank you for your message. I'll get back to you shortly.</p>
                      </div>
                    </motion.div>
                  )}
                  
                  {formStatus === 'error' && (
                    <motion.div
                      key="error"
                      className="absolute inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm rounded-2xl"
                      variants={statusVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="text-center p-8">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FaExclamationTriangle className="text-red-500 text-2xl" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Oops!</h3>
                        <p className="text-foreground/70 mb-4">Something went wrong. Please try again later.</p>
                        <button
                          onClick={() => setFormStatus('idle')}
                          className="px-6 py-2 bg-foreground/10 rounded-lg hover:bg-foreground/20 transition-colors"
                        >
                          Try Again
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Initialize particles */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const canvas = document.getElementById('contact-particles');
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            
            const particles = [];
            const particleCount = 40;
            
            // Create particles that resemble mail/envelope
            for (let i = 0; i < particleCount; i++) {
              const size = Math.random() * 4 + 1;
              const shape = Math.floor(Math.random() * 3); // 0: circle (dot), 1: triangle, 2: square (envelope)
              
              particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: size,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.01,
                shape: shape,
                color: shape === 2 
                  ? 'rgba(37, 99, 235, ' + (Math.random() * 0.1 + 0.05) + ')'
                  : 'rgba(109, 40, 217, ' + (Math.random() * 0.1 + 0.05) + ')'
              });
            }
            
            function animate() {
              requestAnimationFrame(animate);
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              
              for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                ctx.fillStyle = p.color;
                
                // Update position
                p.x += p.speedX;
                p.y += p.speedY;
                p.rotation += p.rotationSpeed;
                
                // Boundary check
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
                
                // Draw shape based on type
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                
                if (p.shape === 0) { // Circle
                  ctx.beginPath();
                  ctx.arc(0, 0, p.size, 0, Math.PI * 2);
                  ctx.fill();
                } else if (p.shape === 1) { // Triangle
                  ctx.beginPath();
                  ctx.moveTo(0, -p.size);
                  ctx.lineTo(-p.size, p.size);
                  ctx.lineTo(p.size, p.size);
                  ctx.closePath();
                  ctx.fill();
                } else { // Square/Envelope
                  ctx.fillRect(-p.size, -p.size, p.size * 2, p.size * 2);
                }
                
                ctx.restore();
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