import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Theme } from './types';
import { useGameLogic } from './hooks/useGameLogic';
import { PersonaMenu } from './PersonaApp';
import { MinecraftMenu } from './MinecraftApp';
import { DanganronpaMenu } from './DanganronpaApp';
import { OmoriMenu } from './OmoriApp';
import { KirbyMenu } from './KirbyApp';
import { PokemonMenu } from './PokemonApp';
import { AnimalCrossingMenu } from './AnimalCrossingApp';
import { SkyrimMenu } from './SkyrimApp';

const MainMenu: React.FC<{ logic: ReturnType<typeof useGameLogic> }> = ({ logic }) => {
  const { theme, setTheme, hasExplicitlySelectedTheme } = logic;
  const [showcaseIndex, setShowcaseIndex] = useState(0);
  const [isIdle, setIsIdle] = useState(true);
  const idleTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const themes = Object.values(Theme).filter(t => t !== Theme.NONE);

  const resetIdleTimer = React.useCallback(() => {
    setIsIdle(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setIsIdle(true);
    }, 5000); // 5 seconds of no input before resuming showcase
  }, []);

  useEffect(() => {
    window.addEventListener('mousedown', resetIdleTimer);
    window.addEventListener('touchstart', resetIdleTimer);
    window.addEventListener('keydown', resetIdleTimer);

    // Initial timer
    idleTimerRef.current = setTimeout(() => {
      setIsIdle(true);
    }, 5000);

    return () => {
      window.removeEventListener('mousedown', resetIdleTimer);
      window.removeEventListener('touchstart', resetIdleTimer);
      window.removeEventListener('keydown', resetIdleTimer);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [resetIdleTimer]);

  // Showcase Mode: Cycle through themes if none selected and idle
  useEffect(() => {
    if (!hasExplicitlySelectedTheme && isIdle) {
      const interval = setInterval(() => {
        setShowcaseIndex((prev) => (prev + 1) % themes.length);
      }, 5000); // Cycle every 5 seconds
      return () => clearInterval(interval);
    }
  }, [hasExplicitlySelectedTheme, themes.length, isIdle]);

  // Apply the showcase theme if in showcase mode
  useEffect(() => {
    if (!hasExplicitlySelectedTheme) {
      setTheme(themes[showcaseIndex], false);
    }
  }, [showcaseIndex, hasExplicitlySelectedTheme, setTheme, themes]);

  const renderThemedMenu = () => {
    switch (theme) {
      case Theme.PERSONA:
        return <PersonaMenu logic={logic} />;
      case Theme.MINECRAFT:
        return <MinecraftMenu logic={logic} />;
      case Theme.DANGANRONPA:
        return <DanganronpaMenu logic={logic} />;
      case Theme.OMORI:
        return <OmoriMenu logic={logic} />;
      case Theme.KIRBY:
        return <KirbyMenu logic={logic} />;
      case Theme.POKEMON:
        return <PokemonMenu logic={logic} />;
      case Theme.ANIMAL_CROSSING:
        return <AnimalCrossingMenu logic={logic} />;
      case Theme.SKYRIM:
        return <SkyrimMenu logic={logic} />;
      default:
        return <PersonaMenu logic={logic} />;
    }
  };

  return (
    <div className="h-[100dvh] w-screen overflow-hidden flex flex-col items-center justify-center relative bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, scale: 1.2, rotate: -2, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.8, rotate: 2, filter: 'blur(20px)' }}
          transition={{ 
            duration: 1.5, 
            ease: [0.22, 1, 0.36, 1],
            opacity: { duration: 1 },
            filter: { duration: 1 }
          }}
          className="absolute inset-0 w-full h-full"
        >
          {renderThemedMenu()}
        </motion.div>
      </AnimatePresence>

      {!hasExplicitlySelectedTheme && (
        <div className="absolute bottom-12 left-0 w-full z-[100] flex flex-col items-center gap-3 pointer-events-none">
          <div className="flex gap-2 mb-2">
            {themes.map((_, i) => (
              <motion.div
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${i === showcaseIndex ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
              />
            ))}
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 backdrop-blur-xl border border-white/10 px-8 py-3 rounded-xl text-[10px] font-black tracking-[0.5em] text-white uppercase shadow-2xl"
          >
            SHOWCASE: {theme.replace('_', ' ')}
          </motion.div>
          <p className="text-white/30 text-[8px] uppercase tracking-[0.3em] font-medium">TAP ANY THEME TO EXPLORE</p>
        </div>
      )}
    </div>
  );
};

export default MainMenu;
