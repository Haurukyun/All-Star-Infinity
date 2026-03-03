import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme, ThemeDefinition } from '../types';

const STAGES = [
  { id: Intensity.SOFT, title: 'HELLO KITTY', desc: 'SWEET GARDEN', color: '#B3E5FC', secondary: '#29B6F6', icon: '🎀' },
  { id: Intensity.HOT, title: 'MY MELODY', desc: 'BERRY FOREST', color: '#F8BBD0', secondary: '#EC407A', icon: '🍓' },
  { id: Intensity.VULGAR, title: 'KUROMI', desc: 'GOTHIC PARTY', color: '#E1BEE7', secondary: '#AB47BC', icon: '💀' },
];

export const SanrioLayout: React.FC<{ children: React.ReactNode; activeTab: string; setActiveTab: (tab: string) => void; logic: any }> = ({ children, activeTab, setActiveTab }) => {
  const [sparkles, setSparkles] = useState<{ id: number, x: number, y: number, size: number, delay: number }[]>([]);

  useEffect(() => {
    // Generate initial static sparkles and clouds for the background
    const items = [];
    for (let i = 0; i < 20; i++) {
      items.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        delay: Math.random() * 2
      });
    }
    setSparkles(items);
  }, []);

  const tabs = [
    { id: 'play', label: 'ADVENTURE' },
    { id: 'decks', label: 'OUTFITS' },
    { id: 'history', label: 'MEMO' },
    { id: 'themes', label: 'WORLD' },
    { id: 'settings', label: 'PROFILE' },
  ];

  return (
    <div className="sanrio-theme h-[100dvh] w-screen flex flex-col bg-gradient-to-b from-[#FFB3D9] via-[#E6C3F8] to-[#FFD8B1] text-[#7B4B94] overflow-hidden font-['Nunito'] relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@800;900&display=swap');
        .sanrio-theme {
          font-family: 'Nunito', sans-serif;
          position: relative;
        }
        
        /* Fluffy cloud overlay */
        .sanrio-theme::after {
            content: '';
            position: absolute;
            bottom: 0; left: 0; right: 0; height: 15vh;
            background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M0,40 C150,120 350,0 500,40 C650,80 850,0 1000,40 C1150,80 1200,60 1200,60 L1200,120 L0,120 Z" fill="%23FFFFFF" opacity="0.4"></path></svg>') no-repeat bottom;
            background-size: cover;
            pointer-events: none;
            z-index: 1;
        }

        .sanrio-panel {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 40px;
          box-shadow: 0 10px 25px rgba(255, 105, 180, 0.15), inset 0 0 0 4px white;
          position: relative;
          padding: 24px;
        }

        .sanrio-title {
            color: white;
            font-weight: 900;
            text-transform: uppercase;
            -webkit-text-stroke: 1.5px #7B4B94;
            text-shadow: 0 4px 0px #FF94D1, 0 6px 12px rgba(255,105,180,0.5);
            letter-spacing: 1px;
        }

        .sanrio-button {
          background: #4DD0E1; /* Cyan Base */
          color: white;
          padding: 16px 28px;
          border-radius: 9999px; /* Pill shape */
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-weight: 900;
          font-size: 1.1rem;
          border: 4px solid white;
          box-shadow: 0 6px 0px #00ACC1, 0 10px 15px rgba(0, 172, 193, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          text-transform: uppercase;
          text-shadow: 1px 1px 0px rgba(0,0,0,0.2);
        }
        
        .sanrio-button.pink {
            background: #FF69B4;
            box-shadow: 0 6px 0px #D81B60, 0 10px 15px rgba(216, 27, 96, 0.3);
        }
        
        .sanrio-button.yellow {
            background: #FFCA28;
            box-shadow: 0 6px 0px #FF8F00, 0 10px 15px rgba(255, 143, 0, 0.3);
            color: #7B4B94;
            text-shadow: none;
        }

        .sanrio-button:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 10px 0px #00ACC1, 0 15px 20px rgba(0, 172, 193, 0.4);
        }
        .sanrio-button.pink:hover { box-shadow: 0 10px 0px #D81B60, 0 15px 20px rgba(216, 27, 96, 0.4); }
        .sanrio-button.yellow:hover { box-shadow: 0 10px 0px #FF8F00, 0 15px 20px rgba(255, 143, 0, 0.4); }

        .sanrio-button:active {
          transform: translateY(4px);
          box-shadow: 0 2px 0px #00ACC1;
        }
        .sanrio-button.pink:active { box-shadow: 0 2px 0px #D81B60; }
        .sanrio-button.yellow:active { box-shadow: 0 2px 0px #FF8F00; }

        .sanrio-button.active {
          background: #26C6DA;
          box-shadow: inset 0 4px 8px rgba(0,0,0,0.2);
          transform: translateY(4px);
        }

        .sanrio-nav-btn {
          background: white;
          border: 3px solid #E1BEE7;
          border-radius: 24px;
          color: #AB47BC;
          font-weight: 800;
          font-size: 11px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 8px 0;
          box-shadow: 0 4px 0px #E1BEE7;
        }
        
        .sanrio-nav-btn.active {
          background: #FF69B4;
          border-color: white;
          color: white;
          transform: scale(1.15) translateY(-5px);
          box-shadow: 0 6px 0px rgba(216,27,96,0.8), 0 10px 15px rgba(255,105,180,0.4);
        }

        .star-sparkle {
          position: absolute;
          z-index: 0;
          color: white;
          opacity: 0.6;
          animation: float 6s ease-in-out infinite alternate;
        }

        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.4; }
          100% { transform: translateY(-30px) rotate(15deg); opacity: 0.9; }
        }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Background Decorative Sparkles */}
      {sparkles.map(s => (
        <div key={s.id} className="star-sparkle font-black text-white drop-shadow-md" style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: `${s.size}px`, animationDelay: `${s.delay}s` }}>
          {s.id % 3 === 0 ? '✨' : s.id % 2 === 0 ? '☁️' : '🌸'}
        </div>
      ))}

      <header className="pt-10 pb-4 flex justify-center items-center shrink-0 relative z-20">
        <h1 className="text-4xl sanrio-title tracking-widest text-center px-4 leading-tight">
          ISLAND<br />ADVENTURE
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-28 relative z-20 no-scrollbar">
        {children}
      </main>

      {/* Dock Navigation */}
      <div className="absolute bottom-6 left-6 right-6 z-30">
        <div className="bg-white/90 backdrop-blur-md rounded-[40px] p-3 shadow-[0_10px_25px_rgba(123,75,148,0.2)] border-4 border-white flex justify-between gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`sanrio-nav-btn flex-1 ${activeTab === tab.id ? 'active' : ''}`}
            >
              <div className="text-2xl mb-1 drop-shadow-sm">
                {tab.id === 'play' ? '🎀' : tab.id === 'decks' ? '👗' : tab.id === 'history' ? '📝' : tab.id === 'themes' ? '✈️' : '💌'}
              </div>
              <span className="truncate w-full text-center px-1 tracking-wider">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SanrioIntensitySelector: React.FC<{ logic: any }> = ({ logic }) => {
  const { setIntensity } = logic;
  return (
    <div className="h-full flex flex-col justify-center space-y-6">
      <h2 className="sanrio-title text-3xl text-center mb-2">FRIENDSHIP LEVEL</h2>
      <div className="space-y-4">
        {STAGES.map((ObjectDef: any) => {
          return (
            <button
              key={ObjectDef.id}
              onClick={() => setIntensity(ObjectDef.id as Intensity)}
              className="w-full relative overflow-hidden sanrio-panel hover:scale-105 transition-transform flex items-center p-4 group border-4 border-white border-l-[#FF69B4] border-l-8"
              style={{ borderLeftColor: ObjectDef?.secondary || '#FF69B4' }}
            >
              <div className="text-5xl mr-5 bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-sm drop-shadow-sm">{ObjectDef?.icon}</div>
              <div className="text-left flex-1">
                <h3 className="text-2xl font-black mb-1 drop-shadow-sm" style={{ color: ObjectDef?.secondary }}>{ObjectDef?.title}</h3>
                <p className="text-[#A188A6] font-bold text-sm tracking-widest">{ObjectDef?.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const SanrioPromptTypeSelector: React.FC<{ logic: any }> = ({ logic }) => {
  const { intensity, setIntensity, handleDraw } = logic;
  return (
    <div className="h-full flex flex-col justify-center space-y-6">
      <h2 className="sanrio-title text-3xl text-center mb-2">FRIENDSHIP LEVEL</h2>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-5">
        <div className="sanrio-panel text-center">
          <div className="inline-block bg-[#FFB3D9] text-[#D81B60] font-black px-4 py-1 rounded-full text-xs mb-4 tracking-widest uppercase shadow-sm">
            {STAGES.find(s => s.id === intensity)?.title}
          </div>
          <h3 className="text-2xl font-black text-[#7B4B94] mb-8">CHOOSE ACTIVITY</h3>
          <div className="flex gap-4">
            <button onClick={() => handleDraw('Truth')} className="sanrio-button pink flex-1 h-32 flex-col justify-center text-xl">
              <span className="text-4xl">🌸</span>
              TRUTH
            </button>
            <button onClick={() => handleDraw('Dare')} className="sanrio-button yellow flex-1 h-32 flex-col justify-center text-xl">
              <span className="text-4xl">🔥</span>
              DARE
            </button>
          </div>
        </div>
        <button onClick={() => setIntensity(null)} className="sanrio-button w-full h-16 opacity-70 bg-white text-[#7B4B94] shadow-sm">
          GO BACK ↩
        </button>
      </motion.div>
    </div>
  );
};

export const SanrioPromptLayout: React.FC<{ children: React.ReactNode; logic: any }> = ({ children, logic }) => {
  const { prompt } = logic;
  return (
    <div className="h-full flex flex-col justify-center space-y-6">
      <motion.div initial={{ scale: 0.8, y: 50, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} className="sanrio-panel text-center flex flex-col items-center p-8">
        <div className="text-5xl mb-4 bg-white w-20 h-20 rounded-full flex items-center justify-center border-4 border-[#FF69B4] shadow-sm">
          {prompt?.type === 'Truth' ? '🌸' : '🔥'}
        </div>
        <h2 className="text-3xl font-black text-[#FF69B4] mb-6 uppercase tracking-wider">{prompt?.type}</h2>
        <p className="text-2xl text-[#7B4B94] font-black leading-snug">"{prompt?.text}"</p>
      </motion.div>

      <div className="flex flex-col gap-4 mt-8">
        {children}
      </div>
    </div>
  );
};

export const SanrioPlayButton: React.FC<{ label: string; onClick: () => void; isPrimary?: boolean }> = ({ label, onClick, isPrimary }) => {
  return (
    <button onClick={onClick} className={`sanrio-button w-full py-5 text-xl ${isPrimary ? 'yellow' : 'pink'}`}>
      <span>{label} {isPrimary ? '🎁' : '🔄'}</span>
    </button>
  );
};

export const SanrioDecksScreen: React.FC<{ logic: any }> = ({ logic }) => {
  const { customDecks, activeDeckId, setActiveDeckId, editingDeck, setEditingDeck, saveDeck } = logic;

  return (
    <AnimatePresence mode="wait">
      {!editingDeck ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
          <h2 className="sanrio-title text-3xl text-center mb-6">WARDROBE</h2>
          <div className="space-y-4">
            {customDecks.map((deck: any) => (
              <div key={deck.id} className="sanrio-panel flex items-center p-5">
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-black text-[#7B4B94] mb-1">{deck.name}</h3>
                  <div className="text-xs text-[#A188A6] font-bold tracking-widest border border-[#E1BEE7] bg-[#FFF0F5] inline-block px-2 py-1 rounded-full">
                    {deck.prompts.length} ITEMS
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setActiveDeckId(deck.id)} className={`w-14 h-8 rounded-full flex items-center p-1 transition-colors ${activeDeckId === deck.id ? 'bg-[#4DD0E1]' : 'bg-[#E0E0E0]'}`}>
                    <div className={`w-6 h-6 bg-white rounded-full transition-transform shadow-sm ${activeDeckId === deck.id ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                  <button onClick={() => setEditingDeck(deck)} className="sanrio-button px-4 py-2 text-sm bg-white text-[#7B4B94] shadow-sm hover:scale-105 active:translate-y-1">EDIT</button>
                </div>
              </div>
            ))}
            <button onClick={() => setEditingDeck({ id: 'new', name: 'New Preset', prompts: [] })} className="sanrio-button pink w-full h-16 text-lg mt-4">
              + NEW OUTFIT
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-4">
          <input
            type="text"
            value={editingDeck.name}
            onChange={(e) => setEditingDeck({ ...editingDeck, name: e.target.value })}
            className="w-full text-2xl font-black text-[#7B4B94] bg-white border-4 border-white shadow-[0_4px_0_#FFB3D9] rounded-[40px] p-4 text-center focus:outline-none"
          />
          <div className="sanrio-panel p-4 shadow-inner bg-[#F8F9FA] min-h-[40vh] border-none shadow-[inset_0_4px_10px_rgba(0,0,0,0.1)]">
            <div className="text-center text-[#A188A6] font-bold py-10">OUTFIT CONTENTS HERE</div>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setEditingDeck(null)} className="sanrio-button flex-1 bg-white text-[#7B4B94] shadow-sm">CANCEL</button>
            <button onClick={() => saveDeck(editingDeck)} className="sanrio-button yellow flex-1 text-lg">SAVE IT</button>
          </div>
        </div>
      )
      }
    </AnimatePresence >
  );
};

export const SanrioHistoryScreen: React.FC<{ logic: any }> = ({ logic }) => {
  const { history } = logic;
  return (
    <div className="space-y-6">
      <h2 className="sanrio-title text-3xl text-center mb-6">MEMORIES</h2>
      <div className="space-y-4">
        {history.length === 0 ? (
          <div className="py-20 text-center text-[#A188A6] font-bold text-xl drop-shadow-sm">NO MEMORIES YET...</div>
        ) : (
          history.map((item: any, i: number) => (
            <div key={i} className="sanrio-panel p-5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#F8BBD0] rounded-bl-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="flex justify-between w-full mb-3">
                <span className="bg-[#FFF0F5] px-3 py-1 rounded-full text-[#AB47BC] text-[10px] font-black tracking-widest w-max shadow-sm">
                  🎀 {item.type}
                </span>
                <span className="text-[#A188A6] text-[10px] font-black tracking-widest">
                  MEMO {history.length - i}
                </span>
              </div>
              <p className="text-lg font-bold text-[#7B4B94] leading-relaxed">"{item.text}"</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export const SanrioThemesScreen: React.FC<{ logic: any }> = ({ logic }) => {
  const { setTheme } = logic;
  return (
    <div className="space-y-6">
      <h2 className="sanrio-title text-3xl text-center mb-6">TRAVEL MAP</h2>
      <div className="grid grid-cols-1 gap-4 pb-4">
        <button onClick={() => setTheme(Theme.PERSONA)} className="sanrio-panel font-black text-[#7B4B94] text-xl py-5 hover:bg-[#FCE4EC] hover:scale-[1.02] transition-all text-center">PHANTOM THIEF</button>
        <button onClick={() => setTheme(Theme.MINECRAFT)} className="sanrio-panel font-black text-[#7B4B94] text-xl py-5 hover:bg-[#F1F8E9] hover:scale-[1.02] transition-all text-center">BLOCKY WORLD</button>
        <button onClick={() => setTheme(Theme.DANGANRONPA)} className="sanrio-panel font-black text-[#7B4B94] text-xl py-5 hover:bg-[#F3E5F5] hover:scale-[1.02] transition-all text-center">KILLING HARMONY</button>
        <button onClick={() => setTheme(Theme.OMORI)} className="sanrio-panel font-black text-[#7B4B94] text-xl py-5 hover:bg-[#E8EAF6] hover:scale-[1.02] transition-all text-center">DREAM WORLD</button>
        <button onClick={() => setTheme(Theme.KIRBY)} className="sanrio-panel font-black text-[#7B4B94] text-xl py-5 hover:bg-[#FCE4EC] hover:scale-[1.02] transition-all text-center">KIRBY'S DREAM</button>
        <button onClick={() => setTheme(Theme.SANRIO)} className="sanrio-button pink w-full py-5 text-xl tracking-wider">SWEET WORLD</button>
        <button onClick={() => setTheme(Theme.POKEMON)} className="sanrio-panel font-black text-[#7B4B94] text-xl py-5 hover:bg-[#E3F2FD] hover:scale-[1.02] transition-all text-center">POKéMON WORLD</button>
        <button onClick={() => setTheme(Theme.SKYRIM)} className="sanrio-panel font-black text-[#7B4B94] text-xl py-5 hover:bg-[#ECEFF1] hover:scale-[1.02] transition-all text-center">SKYRIM</button>
        <button onClick={() => setTheme(Theme.SONIC)} className="sanrio-panel font-black text-[#7B4B94] text-xl py-5 hover:bg-[#E1F5FE] hover:scale-[1.02] transition-all text-center">SONIC MANIA</button>
      </div>
    </div>
  );
};

export const SanrioSettingsScreen: React.FC<{ logic: any }> = ({ logic }) => {
  return (
    <div className="space-y-6">
      <h2 className="sanrio-title text-3xl text-center mb-6">COMPANION</h2>
      <div className="sanrio-panel p-8 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-white rounded-full border-4 border-[#4DD0E1] shadow-md flex items-center justify-center text-5xl mb-4 relative drop-shadow-md">
          🎀
          <div className="absolute -bottom-2 -right-2 bg-[#FFCA28] text-white text-xs font-black w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shadow-sm">Lvl</div>
        </div>
        <h3 className="text-2xl font-black text-[#7B4B94] mb-2">Hello Kitty</h3>
        <p className="bg-[#E1F5FE] text-[#0288D1] px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-8 shadow-sm">Good Friend</p>

        <button className="sanrio-button w-full mb-4">MORE INFO 🔄</button>
        <button className="sanrio-button pink w-full" onClick={() => window.location.reload()}>END SESSION</button>
      </div>
    </div>
  );
};

export const SanrioMenuLayout: React.FC<{ children: React.ReactNode; logic: any }> = ({ children }) => {
  return (
    <div className="sanrio-theme h-full w-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#FFB3D9] via-[#E6C3F8] to-[#FFD8B1] font-['Nunito'] text-[#7B4B94] relative overflow-hidden select-none">
      <style>{`
        .sanrio-button {
          background: #00BCD4; /* Saturated Cyan */
          color: white;
          padding: 18px 32px;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-weight: 900;
          font-size: 1.25rem;
          border: 4px solid white;
          box-shadow: 0 6px 0px #00838F, 0 10px 15px rgba(0, 172, 193, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          text-transform: uppercase;
          text-shadow: 1px 1px 0px rgba(0,0,0,0.2);
        }
        .sanrio-button:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 10px 0px #00838F, 0 15px 20px rgba(0, 172, 193, 0.5);
        }
        .sanrio-button:active {
          transform: translateY(4px);
          box-shadow: 0 2px 0px #00838F;
        }
      `}</style>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 text-6xl opacity-40 animate-pulse">☁️</div>
        <div className="absolute top-20 right-10 text-5xl opacity-30">☁️</div>
        <div className="absolute bottom-20 left-20 text-7xl opacity-50">☁️</div>
        <div className="absolute top-1/2 left-1/4 text-4xl opacity-40">✨</div>
        <div className="absolute top-1/3 right-1/4 text-5xl opacity-40">✨</div>
      </div>

      <div className="z-10 flex flex-col items-center gap-10 w-full max-w-sm">
        <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="w-full relative">
          <h1 className="text-6xl sanrio-title text-center leading-tight mb-2">HELLO KITTY</h1>
          <div className="bg-white px-6 py-2 rounded-full border-4 border-[#4DD0E1] shadow-lg transform -rotate-3 w-max mx-auto">
            <span className="font-black text-xl text-[#FF69B4] tracking-widest">ISLAND ADVENTURE</span>
          </div>
        </motion.div>

        <div className="space-y-4 w-full px-4 mt-12 flex flex-col items-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export const SanrioMenuButton: React.FC<{ label: string; onClick: () => void; isPrimary?: boolean }> = ({ label, onClick, isPrimary }) => {
  return (
    <button onClick={onClick} className="sanrio-button w-[80%] max-w-[300px] py-5 text-xl tracking-widest text-white z-20">
      {label}
    </button>
  );
};

export const SanrioTheme: ThemeDefinition = {
  id: Theme.SANRIO,
  name: 'Sweet Garden',
  cssVars: { '--theme-accent': '#FF69B4' },
  MenuLayout: SanrioMenuLayout,
  MenuButton: SanrioMenuButton,
  LayoutComponent: SanrioLayout,
  IntensitySelector: SanrioIntensitySelector,
  PromptTypeSelector: SanrioPromptTypeSelector,
  PromptLayout: SanrioPromptLayout,
  PlayButton: SanrioPlayButton,
  DecksScreen: SanrioDecksScreen,
  HistoryScreen: SanrioHistoryScreen,
  SettingsScreen: SanrioSettingsScreen,
  ThemesScreen: SanrioThemesScreen,
  tabLabels: {
    play: 'ADVENTURE',
    decks: 'OUTFITS',
    history: 'MEMORIES',
    themes: 'TRAVEL',
    settings: 'PROFILE'
  }
};
