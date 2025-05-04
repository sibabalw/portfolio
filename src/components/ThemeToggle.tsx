'use client';

import { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { FiSun, FiMoon, FiMonitor, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    closeMenu();
  };

  const getActiveIcon = () => {
    switch (theme) {
      case 'light':
        return <FiSun className="h-[1.2rem] w-[1.2rem]" />;
      case 'dark':
        return <FiMoon className="h-[1.2rem] w-[1.2rem]" />;
      case 'system':
        return <FiMonitor className="h-[1.2rem] w-[1.2rem]" />;
      default:
        return <FiSun className="h-[1.2rem] w-[1.2rem]" />;
    }
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 rounded-md px-3 py-2 hover:bg-muted focus:outline-none"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {getActiveIcon()}
        <FiChevronDown
          className={`ml-1 h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1 w-36 origin-top-right rounded-md bg-card shadow-lg border border-border"
          >
            <div className="py-1" role="menu" aria-orientation="vertical">
              <button
                className={`flex w-full items-center gap-2 px-4 py-2 text-sm ${
                  theme === 'light' ? 'bg-muted text-primary' : 'hover:bg-muted/50'
                }`}
                onClick={() => handleThemeChange('light')}
                role="menuitem"
              >
                <FiSun className="h-4 w-4" />
                Light
              </button>
              <button
                className={`flex w-full items-center gap-2 px-4 py-2 text-sm ${
                  theme === 'dark' ? 'bg-muted text-primary' : 'hover:bg-muted/50'
                }`}
                onClick={() => handleThemeChange('dark')}
                role="menuitem"
              >
                <FiMoon className="h-4 w-4" />
                Dark
              </button>
              <button
                className={`flex w-full items-center gap-2 px-4 py-2 text-sm ${
                  theme === 'system' ? 'bg-muted text-primary' : 'hover:bg-muted/50'
                }`}
                onClick={() => handleThemeChange('system')}
                role="menuitem"
              >
                <FiMonitor className="h-4 w-4" />
                System
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 