
import React from 'react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'play', label: 'STEAL' },
    { id: 'decks', label: 'DECKS' },
    { id: 'history', label: 'LOGS' },
    { id: 'settings', label: 'META' },
  ];

  return (
    <div className="h-screen w-screen flex flex-col relative overflow-hidden">
      {/* P5 Header */}
      <header className="relative px-6 pt-6 pb-2 shrink-0 z-50">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="flex items-center gap-0"
        >
          <div className="bg-white text-black p-1.5 transform -skew-x-12 rotate-[-5deg] shadow-[0_0_0_3px_black] z-20">
            <h1 className="font-p5-display text-2xl tracking-tighter leading-none px-2">PHANTOM</h1>
          </div>
          <div className="bg-[#D80000] text-white p-1.5 transform -skew-x-12 rotate-[3deg] ml-[-12px] mt-2 shadow-[0_0_0_3px_black] z-10">
            <h1 className="font-p5-display text-lg tracking-tighter leading-none px-2">OBSIDIAN</h1>
          </div>
        </motion.div>
        
        <div className="absolute top-8 right-8 flex gap-1 opacity-40">
          <div className="w-2 h-2 bg-white rotate-45"></div>
          <div className="w-2 h-2 bg-[#D80000] rotate-45"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 pb-4 relative z-10 custom-scrollbar">
        <div className="max-w-md mx-auto h-full">
          {children}
        </div>
      </main>

      {/* Navigation */}
      <nav className="relative w-full z-[100] h-20 shrink-0 bg-black/60 backdrop-blur-md border-t border-white/10">
        <div className="flex justify-center items-end h-full gap-1 pb-4 px-2">
          {tabs.map((tab, idx) => {
            const isActive = activeTab === tab.id;
            // Adjust rotations slightly for 4 items
            const rotation = (idx - 1.5) * 4; 
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-3 py-2.5 transform origin-bottom transition-all duration-300 shadow-[0_0_0_2px_black] ${
                  isActive 
                    ? 'bg-white text-black z-30 -translate-y-2' 
                    : 'bg-[#D80000] text-white opacity-80 z-20'
                }`}
                style={{ 
                  transform: `rotate(${rotation}deg) skewX(-8deg)`,
                }}
              >
                <span className="font-p5-display text-sm tracking-widest">{tab.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="p5-star"
                    className="absolute -top-2 -right-2 text-sm text-[#D80000]"
                  >
                    ★
                  </motion.div>
                )}
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
