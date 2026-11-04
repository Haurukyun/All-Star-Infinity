import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Theme, GameMode } from './types';
import { useGameLogic } from './hooks/useGameLogic';
import { getThemeDefinition } from './themes';
import { getFontForTheme } from './themes/allThemesList';

const MainMenu: React.FC<{ logic: ReturnType<typeof useGameLogic> }> = ({ logic }) => {
  const {
    theme,
    setTheme,
    hasExplicitlySelectedTheme,
    setGameMode,
    playersEnabled,
    setPlayersEnabled,
    players,
  } = logic;
  const [isSelectingMode, setIsSelectingMode] = useState(false);
  const activeTheme = theme || Theme.SONIC;
  const themeDef = getThemeDefinition(activeTheme);
  const MenuComponent = themeDef.MenuComponent;
  const MenuLayout = themeDef.MenuLayout;
  const MenuButton = themeDef.MenuButton;

  const handleStartMode = (mode: GameMode) => {
    setGameMode(mode);
    if (playersEnabled) {
      logic.setView('player-setup');
    } else {
      logic.setView('game');
    }
  };

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
              );
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
    setView: (v: 'menu' | 'player-setup' | 'game') => {
      if (v === 'game') setIsSelectingMode(true);
      else logic.setView(v);
    }
  };

  const genericModeOverlay = (
    <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-8 space-y-6">
      <h2 className="text-4xl text-white font-black italic tracking-widest uppercase">SELECT GAMEMODE</h2>

      {/* Pass & Play mode toggle switch */}
      <div className="flex items-center gap-3 bg-white/10 px-4 py-2.5 rounded-full border border-white/20">
        <span className="text-white text-xs font-bold uppercase tracking-wider">👥 Pass & Play Mode:</span>
        <button
          onClick={() => setPlayersEnabled(!playersEnabled)}
          className={`px-3 py-1 rounded-full text-xs font-black uppercase transition-all ${
            playersEnabled ? 'bg-red-600 text-white shadow-md shadow-red-600/50' : 'bg-white/20 text-white/60'
          }`}
        >
          {playersEnabled ? `ON (${players.length} Players)` : 'OFF (Solo)'}
        </button>
      </div>

      <button
        onClick={() => handleStartMode(GameMode.TRUTH_OR_DARE)}
        className="w-full max-w-sm bg-white text-black p-4 text-2xl font-bold uppercase transition hover:scale-105 active:scale-95"
      >
        TRUTH OR DARE
      </button>
      <button
        onClick={() => handleStartMode(GameMode.NEVER_HAVE_I_EVER)}
        className="w-full max-w-sm bg-white text-black p-4 text-2xl font-bold uppercase transition hover:scale-105 active:scale-95"
      >
        NEVER HAVE I EVER
      </button>

      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={() => logic.setView('player-setup')}
          className="text-amber-400 text-xs font-bold uppercase tracking-wider hover:underline"
        >
          ⚙️ Manage Players ({players.length})
        </button>
        <button
          onClick={() => setIsSelectingMode(false)}
          className="text-white/50 text-xs hover:text-white transition uppercase tracking-widest"
        >
          [ GO BACK ]
        </button>
      </div>
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
                  <MenuButton
                    label={playersEnabled ? `ROSTER (${players.length})` : 'PASS & PLAY'}
                    onClick={() => {
                      setPlayersEnabled(true);
                      logic.setView('player-setup');
                    }}
                    isPrimary={false}
                  />
                  <MenuButton label="THEMES" onClick={() => setTheme(Theme.NONE)} isPrimary={false} />
                </>
              ) : (
                <>
                  <div className="flex justify-center mb-2">
                    <button
                      onClick={() => setPlayersEnabled(!playersEnabled)}
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase transition-all border ${
                        playersEnabled ? 'bg-red-600 text-white border-red-400' : 'bg-black/60 text-white/60 border-white/20'
                      }`}
                    >
                      👥 Pass & Play: {playersEnabled ? `ON (${players.length})` : 'OFF'}
                    </button>
                  </div>
                  <MenuButton label="TRUTH OR DARE" onClick={() => handleStartMode(GameMode.TRUTH_OR_DARE)} isPrimary={true} />
                  <MenuButton label="NEVER HAVE I EVER" onClick={() => handleStartMode(GameMode.NEVER_HAVE_I_EVER)} isPrimary={true} />
                  <MenuButton label="GO BACK" onClick={() => setIsSelectingMode(false)} isPrimary={false} />
                </>
              )}
            </MenuLayout>
          ) : MenuComponent ? (
            <>
              <MenuComponent logic={wrappedLogic} />
              {isSelectingMode && genericModeOverlay}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full w-full bg-black text-white p-8 space-y-8">
              <h2 className="text-4xl font-black italic">FALLBACK MENU</h2>
              {!isSelectingMode ? (
                <>
                  <button onClick={() => setIsSelectingMode(true)} className="bg-white text-black px-6 py-3 text-2xl font-bold">START ADVENTURE</button>
                  <button onClick={() => { setPlayersEnabled(true); logic.setView('player-setup'); }} className="bg-zinc-800 text-white px-6 py-3 text-xl font-bold">PASS & PLAY ROSTER</button>
                  <button onClick={() => setTheme(Theme.NONE)} className="bg-gray-800 text-white px-6 py-3 text-2xl font-bold">THEMES</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleStartMode(GameMode.TRUTH_OR_DARE)} className="bg-white text-black px-6 py-3 text-2xl font-bold">TRUTH OR DARE</button>
                  <button onClick={() => handleStartMode(GameMode.NEVER_HAVE_I_EVER)} className="bg-white text-black px-6 py-3 text-2xl font-bold">NEVER HAVE I EVER</button>
                  <button onClick={() => setIsSelectingMode(false)} className="bg-gray-800 text-white px-6 py-3 text-2xl font-bold">GO BACK</button>
                </>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MainMenu;
