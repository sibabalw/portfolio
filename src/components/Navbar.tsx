'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiX, FiMenu } from 'react-icons/fi';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  const menuItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1,
        staggerDirection: 1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 font-display font-bold text-xl">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Sibabalwe
              </Link>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden md:flex md:items-center">
              <div className="ml-10 flex items-center space-x-8">
                <Link href="#about" className="text-foreground/80 hover:text-primary transition-colors">
                  About
                </Link>
                <Link href="#skills" className="text-foreground/80 hover:text-primary transition-colors">
                  Skills
                </Link>
                <Link href="#projects" className="text-foreground/80 hover:text-primary transition-colors">
                  Projects
                </Link>
                <Link href="#contact" className="text-foreground/80 hover:text-primary transition-colors">
                  Contact
                </Link>
                <a 
                  href="/resume.pdf" 
                  target="_blank"
                  className="px-4 py-2 rounded-full text-white bg-primary hover:bg-primary-light transition-colors flex items-center gap-1"
                >
                  Resume <FiExternalLink size={16} />
                </a>
                <ThemeToggle />
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center z-[110]">
              <ThemeToggle />
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none ml-1"
                aria-expanded={mobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <FiX className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <FiMenu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu - Full screen overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-[99] md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="fixed inset-0 bg-background backdrop-blur-xl">
              <div className="flex flex-col h-full justify-center px-6 pb-6 pt-20 overflow-hidden">
                <div className="space-y-8">
                  <div className="space-y-6">
                    {menuItems.map((item, index) => (
                      <motion.div 
                        key={item.name}
                        variants={itemVariants}
                        className="group"
                      >
                        <Link 
                          href={item.href} 
                          className="flex items-center py-4 border-b border-muted/20 group-hover:border-primary text-3xl font-display font-bold text-foreground"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <motion.span 
                            className="inline-block"
                            whileHover={{ x: 10 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <span className="text-primary mr-2">0{index + 1}.</span> {item.name}
                          </motion.span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div variants={itemVariants}>
                    <a 
                      href="/resume.pdf" 
                      target="_blank"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white bg-primary hover:bg-primary-light transition-all transform hover:scale-105"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      View Resume <FiExternalLink />
                    </a>
                  </motion.div>
                  
                  <motion.div 
                    variants={itemVariants}
                    className="absolute bottom-10 left-6 right-6 flex justify-between text-muted-foreground text-sm"
                  >
                    <span>© 2024 Sibabalwe</span>
                    <div className="flex space-x-4">
                      <a href="#" className="hover:text-primary transition-colors">
                        GitHub
                      </a>
                      <a href="#" className="hover:text-primary transition-colors">
                        LinkedIn
                      </a>
                      <a href="#" className="hover:text-primary transition-colors">
                        Twitter
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 