import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Theme } from './types';
import { useGameLogic } from './hooks/useGameLogic';
import { getThemeDefinition } from './themes';

const MainMenu: React.FC<{ logic: ReturnType<typeof useGameLogic> }> = ({ logic }) => {
  const { theme, setTheme, hasExplicitlySelectedTheme } = logic;
  const activeTheme = theme || Theme.SONIC;
  const themeDef = getThemeDefinition(activeTheme);
  const MenuComponent = themeDef.MenuComponent;

  // Show theme selection if no theme is explicitly selected yet
  if (!hasExplicitlySelectedTheme) {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden font-['Bangers'] select-none">
        <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');
                `}</style>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="z-10 text-center space-y-8 sm:space-y-12 w-full max-w-6xl"
        >
          <h1 className="text-5xl sm:text-8xl font-black italic text-white tracking-tighter uppercase leading-none">
            SELECT YOUR <span className="text-[#D80000]">REALM</span>
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6 max-h-[60vh] overflow-y-auto px-4 py-4 custom-scrollbar">
            {Object.values(Theme).filter(t => t !== Theme.NONE).map((t) => (
              <motion.button
                key={t}
                whileHover={{ scale: 1.05, rotate: -2, backgroundColor: '#D80000', color: '#fff' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(t)}
                className="bg-white text-black p-4 sm:p-6 font-bold border-4 border-black shadow-[4px_4px_0_#D80000] uppercase italic tracking-widest transition-all text-sm sm:text-base leading-tight min-h-[80px]"
                style={{ transform: 'skewX(-10deg)' }}
              >
                {t}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,#fff_1px,transparent_0)] bg-[length:40px_40px]"></div>
        </div>

        <style>{`
                    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: #D80000; border-radius: 10px; }
                `}</style>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTheme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-full w-full"
        >
          <MenuComponent logic={logic} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MainMenu;
