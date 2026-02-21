import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Theme } from './types';
import { useGameLogic } from './hooks/useGameLogic';

const MainMenu: React.FC<{ logic: ReturnType<typeof useGameLogic> }> = ({ logic }) => {
  const { setView, theme, setTheme } = logic;
  const [activeSection, setActiveSection] = useState<'gamemodes' | 'themes' | 'options' | null>(null);

  const menuItems = [
    { id: 'gamemodes', label: 'GAMEMODES' },
    { id: 'themes', label: 'THEMES' },
    { id: 'options', label: 'OPTIONS' },
  ];

  const themes = [
    { id: Theme.PERSONA, label: 'PERSONA 5' },
    { id: Theme.MINECRAFT, label: 'MINECRAFT' },
    { id: Theme.DANGANRONPA, label: 'DANGANRONPA' },
    { id: Theme.OMORI, label: 'OMORI' },
    { id: Theme.KIRBY, label: 'KIRBY' },
    { id: Theme.POKEMON, label: 'POKEMON' },
    { id: Theme.ANIMAL_CROSSING, label: 'ANIMAL CROSSING' },
    { id: Theme.SKYRIM, label: 'SKYRIM' },
  ];

  const getThemeStyles = () => {
    switch (theme) {
      case Theme.PERSONA:
        return {
          wrapper: "bg-[#111] font-sans",
          bg: "radial-gradient(circle at 50% 50%, #222 0%, #000 100%)",
          text: "font-black tracking-tighter uppercase italic transform -skew-x-6",
          button: "hover:text-[#D80000] hover:translate-x-2 transition-all duration-100",
          active: "text-[#D80000] text-shadow-[2px_2px_0_#fff]",
          submenu: "border-2 border-white/20 bg-black/80 transform -skew-x-6",
          font: "'Inter', sans-serif"
        };
      case Theme.MINECRAFT:
        return {
          wrapper: "bg-[#1a1a1a] font-mono",
          bg: "url('https://www.transparenttextures.com/patterns/dirt.png'), linear-gradient(#333, #111)",
          text: "font-bold tracking-normal text-shadow-[2px_2px_0_#000]",
          button: "hover:text-[#55FF55] hover:scale-105 transition-transform duration-75",
          active: "text-[#55FF55] underline decoration-4 underline-offset-8",
          submenu: "border-4 border-[#555] bg-[#222]",
          font: "'VT323', monospace"
        };
      case Theme.DANGANRONPA:
        return {
          wrapper: "bg-[#2b002b] font-sans",
          bg: "repeating-linear-gradient(45deg, #2b002b 0, #2b002b 20px, #3b003b 20px, #3b003b 40px)",
          text: "font-black tracking-widest text-[#ff00ff] drop-shadow-[4px_4px_0_rgba(0,0,0,1)]",
          button: "hover:rotate-2 hover:scale-110 transition-transform duration-100",
          active: "text-white rotate-[-2deg]",
          submenu: "border-4 border-[#ff00ff] bg-black/90",
          font: "'Arial Black', sans-serif"
        };
      case Theme.OMORI:
        return {
          wrapper: "bg-white text-black font-mono",
          bg: "#fff",
          text: "font-normal tracking-wide",
          button: "hover:underline decoration-wavy decoration-black underline-offset-4",
          active: "font-bold underline decoration-wavy",
          submenu: "border border-black bg-white",
          font: "'Courier New', monospace"
        };
      case Theme.KIRBY:
        return {
          wrapper: "bg-pink-100 text-pink-600 font-sans",
          bg: "radial-gradient(circle, #fce4ec 0%, #f8bbd0 100%)",
          text: "font-black tracking-tight drop-shadow-md text-white stroke-pink-600 stroke-2",
          button: "hover:scale-110 hover:rotate-3 transition-all duration-200",
          active: "text-yellow-400 scale-110",
          submenu: "rounded-3xl border-4 border-white bg-pink-300/50 backdrop-blur-sm",
          font: "'Fredoka One', cursive"
        };
      case Theme.POKEMON:
        return {
          wrapper: "bg-[#384858] text-white font-mono",
          bg: "linear-gradient(to bottom, #384858, #202830)",
          text: "font-bold tracking-wide drop-shadow-md",
          button: "hover:text-yellow-300 hover:translate-x-2 transition-transform",
          active: "text-yellow-300",
          submenu: "rounded-lg border-4 border-white/20 bg-[#202830] shadow-xl",
          font: "'Press Start 2P', cursive"
        };
      case Theme.ANIMAL_CROSSING:
        return {
          wrapper: "bg-[#F0F4C3] text-[#5D4037] font-sans",
          bg: "radial-gradient(#C5E1A5 15%, transparent 16%) 0 0 / 60px 60px, #F0F4C3",
          text: "font-bold tracking-normal",
          button: "hover:text-[#00BCD4] hover:scale-105 transition-transform",
          active: "text-[#00BCD4] bg-white/50 rounded-full px-4",
          submenu: "rounded-[30px] border-4 border-white bg-[#FFF9C4] shadow-lg",
          font: "'Varela Round', sans-serif"
        };
      case Theme.SKYRIM:
        return {
          wrapper: "bg-[#0a0a0a] text-[#c0c0c0] font-serif",
          bg: "radial-gradient(circle at 50% 50%, #1a1a1a 0%, #000 100%)",
          text: "font-light tracking-[0.2em] uppercase",
          button: "hover:text-white hover:text-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-300",
          active: "text-white font-normal",
          submenu: "border-y border-white/20 bg-black/80 backdrop-blur-md",
          font: "'Cinzel', serif"
        };
      default:
        return {
          wrapper: "bg-[#111] font-sans",
          bg: "#111",
          text: "font-bold",
          button: "hover:opacity-80",
          active: "opacity-100",
          submenu: "bg-gray-800",
          font: "sans-serif"
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <div className={`h-[100dvh] w-screen overflow-y-auto overflow-x-hidden flex flex-col items-center justify-center relative transition-colors duration-500 ${styles.wrapper}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@900&family=VT323&family=Press+Start+2P&family=Fredoka+One&family=Varela+Round&family=Cinzel:wght@400;700&display=swap');
        
        .menu-bg-custom {
          background: ${styles.bg};
          transition: background 0.5s ease;
        }
        
        .theme-text {
          font-family: ${styles.font};
        }
      `}</style>

      <div className="absolute inset-0 menu-bg-custom z-0"></div>
      
      {/* Background Particles/Noise - Only for some themes */}
      {(theme === Theme.PERSONA || theme === Theme.SKYRIM || theme === Theme.DANGANRONPA) && (
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'1\'/%3E%3C/svg%3E")' }}></div>
      )}

      <div className="z-10 w-full max-w-4xl flex flex-col items-center justify-center h-full gap-8 md:gap-12 p-4">
        
        {/* Main Menu Items */}
        <div className="flex flex-col items-center gap-4 md:gap-6 w-full">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveSection(activeSection === item.id ? null : item.id as any)}
              className={`
                theme-text text-4xl sm:text-5xl md:text-7xl lg:text-8xl cursor-pointer relative py-2 px-4 w-full text-center
                ${styles.text}
                ${styles.button}
                ${activeSection === item.id ? styles.active : ''}
                ${activeSection && activeSection !== item.id ? 'opacity-30 scale-95' : 'opacity-100'}
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {item.label}
            </motion.button>
          ))}
        </div>

        {/* Submenu Area */}
        <div className="h-48 w-full flex justify-center items-start relative">
          <AnimatePresence mode="wait">
            {activeSection === 'gamemodes' && (
              <motion.div 
                key="gamemodes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex flex-col gap-3 items-center w-full max-w-md p-6 ${styles.submenu}`}
              >
                <button 
                  onClick={() => setView('game')}
                  className={`theme-text w-full text-center py-3 text-lg md:text-xl uppercase transition-colors ${theme === Theme.SKYRIM ? 'hover:text-white hover:bg-white/10' : 'hover:bg-black/10'}`}
                >
                  Truth or Dare
                </button>
                <button 
                  className="theme-text w-full text-center py-3 text-lg md:text-xl uppercase opacity-40 cursor-not-allowed"
                  disabled
                >
                  Never Have I Ever <span className="text-xs block mt-1">(Coming Soon)</span>
                </button>
              </motion.div>
            )}

            {activeSection === 'themes' && (
              <motion.div 
                key="themes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 w-full max-w-4xl p-6 overflow-y-auto max-h-[40vh] custom-scrollbar ${styles.submenu}`}
              >
                {themes.map((t) => (
                  <button 
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`
                      theme-text text-center py-3 px-2 text-xs sm:text-sm uppercase transition-all rounded
                      ${theme === t.id ? 'bg-current text-white invert font-bold shadow-md' : 'hover:bg-black/10 hover:scale-105'}
                    `}
                  >
                    {t.label}
                  </button>
                ))}
              </motion.div>
            )}

            {activeSection === 'options' && (
              <motion.div 
                key="options"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex flex-col gap-3 items-center w-full max-w-md p-6 ${styles.submenu}`}
              >
                <div className="w-full flex justify-between items-center p-2 border-b border-current/20">
                  <span className="theme-text uppercase tracking-widest text-sm">Sound</span>
                  <span className="opacity-50 text-sm">OFF</span>
                </div>
                <div className="w-full flex justify-between items-center p-2 border-b border-current/20">
                  <span className="theme-text uppercase tracking-widest text-sm">Version</span>
                  <span className="opacity-50 text-sm">1.0.0</span>
                </div>
                <div className="text-[10px] opacity-30 mt-4 uppercase tracking-[4px] text-center w-full">
                  Created by AntiGravity
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default MainMenu;
