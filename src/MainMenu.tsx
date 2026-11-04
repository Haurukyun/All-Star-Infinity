import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Theme, GameMode } from './types';
import { useGameLogic } from './hooks/useGameLogic';
import { getThemeDefinition } from './themes';
import { allThemesList, getFontForTheme } from './themes/allThemesList';
import { hapticService } from './services/haptics';
import { soundService } from './services/soundFx';

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
    hapticService.medium();
    soundService.click();
    setGameMode(mode);
    if (playersEnabled) {
      logic.setView('player-setup');
    } else {
      logic.setView('game');
    }
  };

  const GAME_MODES = [
    { mode: GameMode.TRUTH_OR_DARE, label: 'TRUTH OR DARE', icon: '🎭', desc: 'Classic confessions & physical dares' },
    { mode: GameMode.NEVER_HAVE_I_EVER, label: 'NEVER HAVE I EVER', icon: '🙈', desc: 'Exposing secrets & drinking forfeits' },
    { mode: GameMode.MOST_LIKELY_TO, label: 'MOST LIKELY TO', icon: '🗳️', desc: 'Point fingers & call out your friends' },
    { mode: GameMode.WOULD_YOU_RATHER, label: 'WOULD YOU RATHER', icon: '⚖️', desc: 'Cursed dilemmas & minority penalties' },
    { mode: GameMode.HOT_SEAT, label: 'HOT SEAT (60s)', icon: '🔥', desc: 'Rapid-fire interrogation speedrun' },
  ];

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

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5 max-h-[65vh] overflow-y-auto px-4 py-4 custom-scrollbar">
            {allThemesList.map((t) => {
              return (
                <motion.button
                  key={t.id}
                  whileHover={{ scale: 1.05, rotate: -2, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    hapticService.medium();
                    soundService.click();
                    setTheme(t.id);
                  }}
                  className="group relative bg-[#141414] hover:bg-black text-white p-4 rounded-2xl border-2 flex flex-col items-center justify-between gap-3 transition-all text-center shadow-lg active:scale-95"
                  style={{
                    borderColor: t.color,
                    boxShadow: '0 8px 24px ' + t.color + '22, 0 4px 0 ' + t.color,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border shadow-inner transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: t.color + '22',
                      borderColor: t.color + '55',
                    }}
                  >
                    {t.icon || '✨'}
                  </div>
                  <div>
                    <div
                      className="font-black text-xs sm:text-sm uppercase tracking-wide leading-tight group-hover:text-white transition-colors"
                      style={{ fontFamily: t.font }}
                    >
                      {t.label}
                    </div>
                  </div>
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
    <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 sm:p-8 space-y-4 overflow-y-auto">
      <h2 className="text-3xl sm:text-4xl text-white font-black italic tracking-widest uppercase">
        SELECT GAMEMODE
      </h2>

      {/* Pass & Play mode toggle switch */}
      <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full border border-white/20">
        <span className="text-white text-xs font-bold uppercase tracking-wider">👥 Pass & Play:</span>
        <button
          onClick={() => {
            hapticService.light();
            setPlayersEnabled(!playersEnabled);
          }}
          className={`px-3 py-1 rounded-full text-xs font-black uppercase transition-all ${
            playersEnabled ? 'bg-red-600 text-white shadow-md shadow-red-600/50' : 'bg-white/20 text-white/60'
          }`}
        >
          {playersEnabled ? `ON (${players.length} Players)` : 'OFF (Solo)'}
        </button>
      </div>

      {/* 5 Game Modes */}
      <div className="grid grid-cols-1 gap-2.5 w-full max-w-md max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
        {GAME_MODES.map((item) => (
          <button
            key={item.mode}
            onClick={() => handleStartMode(item.mode)}
            className="w-full bg-white text-black p-3.5 sm:p-4 text-left border-2 border-black hover:border-red-600 hover:bg-zinc-100 transition-all hover:scale-[1.02] active:scale-95 shadow-md flex items-center gap-3.5 group"
          >
            <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">{item.icon}</span>
            <div className="flex-1">
              <div className="text-base sm:text-lg font-black uppercase tracking-wide leading-none group-hover:text-red-600 transition-colors">
                {item.label}
              </div>
              <div className="text-[11px] text-black/60 font-medium mt-1">
                {item.desc}
              </div>
            </div>
            <span className="text-xs font-black opacity-30 group-hover:opacity-100 text-red-600">▶</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-2">
        <button
          onClick={() => {
            hapticService.light();
            logic.setView('player-setup');
          }}
          className="text-amber-400 text-xs font-bold uppercase tracking-wider hover:underline"
        >
          ⚙️ Manage Players ({players.length})
        </button>
        <button
          onClick={() => {
            hapticService.light();
            setIsSelectingMode(false);
          }}
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
                  <MenuButton label="START ADVENTURE" onClick={() => { hapticService.light(); setIsSelectingMode(true); }} isPrimary={true} />
                  <MenuButton
                    label={playersEnabled ? `ROSTER (${players.length})` : 'PASS & PLAY'}
                    onClick={() => {
                      hapticService.light();
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
                      onClick={() => {
                        hapticService.light();
                        setPlayersEnabled(!playersEnabled);
                      }}
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase transition-all border ${
                        playersEnabled ? 'bg-red-600 text-white border-red-400' : 'bg-black/60 text-white/60 border-white/20'
                      }`}
                    >
                      👥 Pass & Play: {playersEnabled ? `ON (${players.length})` : 'OFF'}
                    </button>
                  </div>
                  <MenuButton label="TRUTH OR DARE" onClick={() => handleStartMode(GameMode.TRUTH_OR_DARE)} isPrimary={true} />
                  <MenuButton label="NEVER HAVE I EVER" onClick={() => handleStartMode(GameMode.NEVER_HAVE_I_EVER)} isPrimary={true} />
                  <MenuButton label="MOST LIKELY TO" onClick={() => handleStartMode(GameMode.MOST_LIKELY_TO)} isPrimary={true} />
                  <MenuButton label="WOULD YOU RATHER" onClick={() => handleStartMode(GameMode.WOULD_YOU_RATHER)} isPrimary={true} />
                  <MenuButton label="HOT SEAT (60s)" onClick={() => handleStartMode(GameMode.HOT_SEAT)} isPrimary={true} />
                  <MenuButton label="GO BACK" onClick={() => { hapticService.light(); setIsSelectingMode(false); }} isPrimary={false} />
                </>
              )}
            </MenuLayout>
          ) : MenuComponent ? (
            <>
              <MenuComponent logic={wrappedLogic} />
              {isSelectingMode && genericModeOverlay}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full w-full bg-black text-white p-8 space-y-4">
              <h2 className="text-4xl font-black italic">ALL★STAR INFINITY</h2>
              {!isSelectingMode ? (
                <>
                  <button onClick={() => { hapticService.light(); setIsSelectingMode(true); }} className="bg-white text-black px-6 py-3 text-2xl font-bold">START ADVENTURE</button>
                  <button onClick={() => { hapticService.light(); setPlayersEnabled(true); logic.setView('player-setup'); }} className="bg-zinc-800 text-white px-6 py-3 text-xl font-bold">PASS & PLAY ROSTER</button>
                  <button onClick={() => setTheme(Theme.NONE)} className="bg-gray-800 text-white px-6 py-3 text-2xl font-bold">THEMES</button>
                </>
              ) : (
                <div className="w-full max-w-sm space-y-2">
                  {GAME_MODES.map((item) => (
                    <button
                      key={item.mode}
                      onClick={() => handleStartMode(item.mode)}
                      className="w-full bg-white text-black p-3 font-bold text-lg text-left"
                    >
                      {item.icon} {item.label}
                    </button>
                  ))}
                  <button onClick={() => setIsSelectingMode(false)} className="w-full bg-gray-800 text-white p-2 text-sm mt-4">GO BACK</button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MainMenu;
