
import React from 'react';
import { motion } from 'framer-motion';
import { Theme } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, theme, setTheme }) => {
  const tabs = [
    { id: 'play', label: 'STEAL' },
    { id: 'decks', label: 'DECKS' },
    { id: 'history', label: 'LOGS' },
    { id: 'themes', label: 'THEME' },
    { id: 'settings', label: 'META' },
  ];

  return (
    <div className="h-screen w-screen flex flex-col relative overflow-hidden">
      {/* P5 Header */}
      <header className="relative px-4 pt-4 pb-2 shrink-0 z-50">
        <motion.div 
          initial={{ x: -200, skewX: -30, opacity: 0 }}
          animate={{ x: 0, skewX: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 10, stiffness: 200 }}
          className="flex items-center gap-0"
        >
          <div className="bg-white text-black p-1.5 transform -skew-x-12 rotate-[-5deg] shadow-[0_0_0_3px_black] z-20 vibrate-hover cursor-default">
            <h1 className="font-p5-display text-xl tracking-tighter leading-none px-2">PHANTOM</h1>
          </div>
          <div className="bg-[#D80000] text-white p-1.5 transform -skew-x-12 rotate-[3deg] ml-[-12px] mt-2 shadow-[0_0_0_3px_black] z-10 vibrate-hover cursor-default">
            <h1 className="font-p5-display text-base tracking-tighter leading-none px-2">OBSIDIAN</h1>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-6 right-6 flex gap-1"
        >
          <div className="w-2 h-2 bg-white rotate-45"></div>
          <div className="w-2 h-2 bg-[#D80000] rotate-45"></div>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 pb-4 relative z-10 custom-scrollbar">
        <div className="max-w-md mx-auto h-full">
          {children}
        </div>
      </main>

      {/* Navigation */}
      <nav className="relative w-full z-[100] h-20 shrink-0 bg-black/60 backdrop-blur-md border-t border-white/10">
        <div className="flex justify-center items-end h-full gap-1 pb-4 px-2">
          {tabs.map((tab, idx) => {
            const isActive = activeTab === tab.id;
            // Adjust rotations slightly for 5 items
            const rotation = (idx - 2) * 4; 
            return (
              <motion.button
                key={tab.id}
                initial={{ y: 10, opacity: 0, rotate: rotation + 5 }}
                animate={{ y: 0, opacity: 1, rotate: rotation }}
                transition={{ type: 'spring', damping: 15, stiffness: 400 }}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ 
                  scale: 1.05, 
                  y: -4,
                  rotate: rotation - 1,
                  transition: { type: 'spring', stiffness: 1000, damping: 30 }
                }}
                whileTap={{ scale: 0.95, y: 0 }}
                className={`relative px-2 py-2.5 transform origin-bottom transition-colors shadow-[0_0_0_2px_black] ${
                  isActive 
                    ? 'bg-white text-black z-30 -translate-y-2' 
                    : 'bg-[#D80000] text-white opacity-80 z-20'
                }`}
                style={{ 
                  transform: `rotate(${rotation}deg) skewX(-8deg)`,
                }}
              >
                <span className="font-p5-display text-[10px] tracking-widest">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </nav>
      
      {/* Background slash texture */}
      <div className="absolute inset-0 bg-[#D80000] opacity-[0.02] pointer-events-none" 
           style={{ clipPath: 'polygon(0 85%, 100% 15%, 100% 20%, 0 90%)' }}></div>
    </div>
  );
};

export default Layout;
