import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Theme, GameMode } from './types';
import { useGameLogic } from './hooks/useGameLogic';
import { getThemeDefinition } from './themes';
import { getFontForTheme } from './themes/allThemesList';

const MainMenu: React.FC<{ logic: ReturnType<typeof useGameLogic> }> = ({ logic }) => {
  const { theme, setTheme, hasExplicitlySelectedTheme, setGameMode } = logic;
  const [isSelectingMode, setIsSelectingMode] = useState(false);
  const activeTheme = theme || Theme.SONIC;
  const themeDef = getThemeDefinition(activeTheme);
  const MenuComponent = themeDef.MenuComponent;
  const MenuLayout = themeDef.MenuLayout;
  const MenuButton = themeDef.MenuButton;

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
            {Object.values(Theme).filter(t => t !== Theme.NONE).map((t) => {
              return (
                <motion.button
                  key={t}
                  whileHover={{ scale: 1.05, rotate: -2, backgroundColor: '#D80000', color: '#fff' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTheme(t)}
                  className="bg-white text-black p-4 sm:p-6 font-bold border-4 border-black shadow-[4px_4px_0_#D80000] uppercase tracking-widest transition-all text-sm sm:text-base leading-tight min-h-[80px]"
                  style={{ transform: 'skewX(-10deg)', fontFamily: getFontForTheme(t) }}
                >
                  {t}
                </motion.button>
              )
            })}
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

  // Intercept normal "play" actions for legacy MenuComponents
  const wrappedLogic = {
    ...logic,
    setView: (v: 'menu' | 'game') => {
      if (v === 'game') setIsSelectingMode(true);
      else logic.setView(v);
    }
  };

  const genericModeOverlay = (
    <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-8 space-y-6">
      <h2 className="text-4xl text-white font-black italic tracking-widest uppercase">SELECT GAMEMODE</h2>
      <button onClick={() => { setGameMode(GameMode.TRUTH_OR_DARE); logic.setView('game'); }} className="w-full max-w-sm bg-white text-black p-4 text-2xl font-bold uppercase transition hover:scale-105 active:scale-95">TRUTH OR DARE</button>
      <button onClick={() => { setGameMode(GameMode.NEVER_HAVE_I_EVER); logic.setView('game'); }} className="w-full max-w-sm bg-white text-black p-4 text-2xl font-bold uppercase transition hover:scale-105 active:scale-95">NEVER HAVE I EVER</button>
      <button onClick={() => setIsSelectingMode(false)} className="mt-8 text-white/50 text-sm hover:text-white transition uppercase tracking-widest">[ GO BACK ]</button>
    </div>
  );

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
          {MenuLayout && MenuButton ? (
            <MenuLayout logic={logic}>
              {!isSelectingMode ? (
                <>
                  <MenuButton label="START ADVENTURE" onClick={() => setIsSelectingMode(true)} isPrimary={true} />
                  <MenuButton label="THEMES" onClick={() => setTheme(Theme.NONE)} isPrimary={false} />
                </>
              ) : (
                <>
                  <MenuButton label="TRUTH OR DARE" onClick={() => { setGameMode(GameMode.TRUTH_OR_DARE); logic.setView('game'); }} isPrimary={true} />
                  <MenuButton label="NEVER HAVE I EVER" onClick={() => { setGameMode(GameMode.NEVER_HAVE_I_EVER); logic.setView('game'); }} isPrimary={true} />
                  <MenuButton label="GO BACK" onClick={() => setIsSelectingMode(false)} isPrimary={false} />
                </>
              )}
            </MenuLayout>
          ) : (
            <>
              <MenuComponent logic={wrappedLogic} />
              {isSelectingMode && genericModeOverlay}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MainMenu;
