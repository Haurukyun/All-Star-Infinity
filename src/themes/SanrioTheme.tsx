import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme, ThemeDefinition } from '../types';

const STAGES = [
  { id: Intensity.SOFT, title: 'HELLO KITTY', desc: 'SWEET GARDEN', color: '#FFB7C5', secondary: '#FF1493', icon: '🎀' },
  { id: Intensity.HOT, title: 'MY MELODY', desc: 'BERRY FOREST', color: '#FFC0CB', secondary: '#FF69B4', icon: '🍓' },
  { id: Intensity.VULGAR, title: 'KUROMI', desc: 'GOTHIC PARTY', color: '#E6E6FA', secondary: '#9370DB', icon: '💀' },
];

export const SanrioLayout: React.FC<{ children: React.ReactNode; activeTab: string; setActiveTab: (tab: string) => void; logic: any }> = ({ children, activeTab, setActiveTab }) => {
  const [sparkles, setSparkles] = useState<{ id: number, x: number, y: number, size: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles(prev => [
        ...prev.slice(-15),
        { id: Date.now(), x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 15 + 10 }
      ]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'play', label: 'SWEET' },
    { id: 'decks', label: 'GIFT' },
    { id: 'history', label: 'MEMO' },
    { id: 'themes', label: 'WORLD' },
    { id: 'settings', label: 'LOVE' },
  ];

  return (
    <div className="sanrio-theme h-[100dvh] w-screen flex flex-col bg-[#FFF0F5] text-[#FF1493] overflow-hidden font-['Cherry_Bomb_One'] relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cherry+Bomb+One&display=swap');
        .sanrio-theme {
          font-family: 'Cherry Bomb One', cursive;
          background: radial-gradient(#FFB7C5 10%, transparent 11%), radial-gradient(#FFB7C5 10%, transparent 11%), #FFF0F5;
          background-size: 40px 40px;
          background-position: 0 0, 20px 20px;
          position: relative;
        }
        .sanrio-panel {
          background: #FFF;
          border: 4px solid #FF69B4;
          border-radius: 30px;
          box-shadow: 0 8px 0px #FFB7C5;
          position: relative;
        }
        .sanrio-panel::before {
          content: "";
          position: absolute;
          top: -10px; left: -10px; right: -10px; bottom: -10px;
          border: 2px dashed #FF69B4;
          border-radius: 35px;
          pointer-events: none;
          opacity: 0.3;
        }
        .sanrio-button {
          background: #FFF;
          border: 3px solid #FF69B4;
          color: #FF69B4;
          padding: 12px 24px;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          font-weight: 800;
          box-shadow: 0 5px 0px #FFB7C5;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .sanrio-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 0px #FFB7C5;
          background: #FFF0F5;
        }
        .sanrio-button:active {
          transform: translateY(2px);
          box-shadow: 0 2px 0px #FFB7C5;
        }
        .sanrio-button.active {
          background: #FF69B4;
          color: #FFF;
          box-shadow: inset 0 5px 0px rgba(0,0,0,0.1);
        }
        .sanrio-card {
          background: #FFF;
          border: 6px solid #FF69B4;
          border-radius: 40px;
          padding: 40px;
          box-shadow: 0 12px 0px #FFB7C5;
          position: relative;
          text-align: center;
        }
        .sanrio-header {
          color: #FF1493;
          text-shadow: 3px 3px 0px #FFF;
          letter-spacing: 2px;
        }
        .sanrio-nav-btn {
          background: transparent;
          border: none;
          color: #FF69B4;
          font-size: 14px;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .sanrio-nav-btn.active {
          color: #FF1493;
          transform: scale(1.1);
        }
        .sparkle {
          position: absolute;
          pointer-events: none;
          z-index: 5;
          color: #FFD700;
          text-shadow: 0 0 10px #FFF;
        }
        @keyframes sparkle-anim {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1) rotate(180deg); opacity: 1; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        .scalloped-border {
          background-image: radial-gradient(circle at 10px 0, transparent 10px, #FFF 11px);
          background-size: 20px 10px;
          background-repeat: repeat-x;
          height: 10px;
          width: 100%;
          position: absolute;
          bottom: -10px;
          left: 0;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {sparkles.map(s => (
        <div key={s.id} className="sparkle" style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: `${s.size}px`, animation: 'sparkle-anim 1.5s ease-in-out forwards' }}>✨</div>
      ))}

      <header className="p-8 flex justify-center items-center shrink-0 relative z-10">
        <h1 className="text-5xl sanrio-header italic">SWEET ADVENTURE</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-24 relative z-10 no-scrollbar">
        <div className="max-w-md mx-auto h-full pt-4">{children}</div>
      </main>

      <nav className="fixed bottom-0 left-0 w-full bg-white/95 border-t-4 border-[#FF69B4] h-24 z-50 shadow-[0_-10px_30px_rgba(255,105,180,0.2)]">
        <div className="flex justify-around items-center h-full px-4 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`sanrio-nav-btn flex-1 h-full ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="text-xl">{tab.id === 'play' ? '🎀' : tab.id === 'decks' ? '🎁' : tab.id === 'history' ? '📝' : tab.id === 'themes' ? '🌍' : '💖'}</span>
              <span className="text-[10px] font-black tracking-widest uppercase">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export const SanrioPlayScreen: React.FC<{ logic: any }> = ({ logic }) => {
  const { intensity, setIntensity, prompt, setPrompt, history, activeDeckId, setActiveDeckId, customDecks, handleDraw } = logic;
  return (
    <AnimatePresence mode="wait">
      {!intensity && !prompt ? (
        <motion.div key="play" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-10">
          <div className="sanrio-panel p-8">
            <h2 className="text-2xl mb-6 text-[#FF69B4] border-b-4 border-dashed border-[#FF69B4]/30 pb-3">SELECT GARDEN</h2>
            <div className="grid grid-cols-1 gap-4">
              <button onClick={() => setActiveDeckId('default')} className={`sanrio-button text-xl py-4 ${activeDeckId === 'default' ? 'active' : ''}`}>🎀 HELLO WORLD</button>
              {customDecks.map((deck: any) => (
                <button key={deck.id} onClick={() => setActiveDeckId(deck.id)} className={`sanrio-button text-xl py-4 ${activeDeckId === deck.id ? 'active' : ''}`}>🎁 {deck.name.toUpperCase()}</button>
              ))}
            </div>
          </div>
          <div className="sanrio-panel p-8">
            <h2 className="text-2xl mb-6 text-[#FF69B4] border-b-4 border-dashed border-[#FF69B4]/30 pb-3">SWEETNESS LEVEL</h2>
            <div className="grid grid-cols-1 gap-5">
              {STAGES.map((stage) => (
                <button key={stage.id} onClick={() => setIntensity(stage.id)} className="sanrio-button flex flex-col items-center py-6" style={{ borderColor: stage.secondary, color: stage.secondary }}>
                  <span className="text-3xl flex items-center gap-3">{stage.icon} {stage.title} {stage.icon}</span>
                  <span className="text-xs opacity-60 mt-1 tracking-widest">{stage.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      ) : !prompt ? (
        <div className="flex flex-col items-center gap-12 py-16">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center relative">
            <div className="absolute -top-10 -left-10 text-6xl opacity-20">🎀</div>
            <div className="absolute -bottom-10 -right-10 text-6xl opacity-20">💖</div>
            <p className="text-[#FF69B4] text-lg mb-2 tracking-widest">CURRENT GARDEN</p>
            <h2 className="text-6xl sanrio-header italic">{intensity}</h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 w-full">
            <button onClick={() => handleDraw('Truth')} className="sanrio-button text-4xl py-10 bg-[#FFF] border-[#FF69B4]">SWEET TRUTH</button>
            <button onClick={() => handleDraw('Dare')} className="sanrio-button text-4xl py-10 bg-[#FFB7C5] border-[#FF1493] text-[#FFF]">SWEET DARE</button>
            <button onClick={() => setIntensity(null)} className="text-[#FF69B4] uppercase text-sm tracking-widest mt-6 hover:underline">Go Back</button>
          </div>
        </div>
      ) : (
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="sanrio-card space-y-8">
          <div className="flex justify-between items-center border-b-4 border-dashed border-[#FF69B4]/20 pb-6">
            <span className="bg-[#FF69B4] text-white px-6 py-2 rounded-full text-xl">🎀 {prompt.type}</span>
            <span className="text-[#FF69B4] text-sm">MEMO #{history.length}</span>
          </div>
          <p className="text-4xl leading-tight text-[#FF1493] italic">"{prompt.text}"</p>
          <div className="pt-6 border-t-4 border-[#FF69B4] border-dotted">
            <p className="text-[#FF69B4] text-xs mb-2 uppercase tracking-widest">Oopsie Penalty!</p>
            <p className="text-2xl opacity-80 italic">{prompt.penalty}</p>
          </div>
          <div className="grid grid-cols-2 gap-6 pt-8">
            <button onClick={() => setPrompt(null)} className="sanrio-button text-xl">BYE BYE</button>
            <button onClick={() => handleDraw(prompt.type)} className="sanrio-button active text-xl">AGAIN!</button>
          </div>
          <div className="absolute -top-5 -left-5 text-4xl">🍓</div>
          <div className="absolute -bottom-5 -right-5 text-4xl">🍰</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const SanrioDecksScreen: React.FC<{ logic: any }> = ({ logic }) => {
  const { customDecks, setEditingDeck, deleteDeck, editingDeck, generateId, saveDeck, addNewPromptToEditingDeck, updatePromptInEditingDeck, removePromptFromEditingDeck } = logic;
  return (
    <AnimatePresence mode="wait">
      {!editingDeck ? (
        <>
          <div className="flex justify-between items-end border-b-4 border-[#FF69B4] pb-4">
            <h2 className="text-4xl sanrio-header italic">GIFT SHOP</h2>
            <button onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })} className="sanrio-button text-xs">+ NEW GIFT</button>
          </div>
          <div className="space-y-5 mt-6">
            {customDecks.map((deck: any) => (
              <div key={deck.id} className="sanrio-panel p-6 flex justify-between items-center hover:scale-[1.02] transition-transform">
                <div>
                  <h3 className="text-2xl text-[#FF1493]">{deck.name || 'Untitled'}</h3>
                  <p className="text-xs opacity-60 mt-1 tracking-widest">{deck.prompts.length} SURPRISES INSIDE</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setEditingDeck(deck)} className="sanrio-button text-xs">OPEN</button>
                  <button onClick={() => deleteDeck(deck.id)} className="sanrio-button text-xs border-red-300 text-red-300">TOSS</button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="sanrio-panel p-8 space-y-8">
          <div className="space-y-6">
            <input className="w-full bg-[#FFF0F5] border-2 border-[#FF69B4] rounded-2xl p-4 text-2xl focus:outline-none text-[#FF1493] font-['Cherry_Bomb_One']" value={editingDeck.name} onChange={e => setEditingDeck({ ...editingDeck, name: e.target.value })} placeholder="GIFT NAME" />
            <textarea className="w-full bg-[#FFF0F5] border-2 border-[#FF69B4] rounded-2xl p-4 text-lg h-32 focus:outline-none text-[#FF1493] font-['Cherry_Bomb_One']" value={editingDeck.description} onChange={e => setEditingDeck({ ...editingDeck, description: e.target.value })} placeholder="GIFT DESCRIPTION" />
          </div>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl text-[#FF69B4]">CARDS ({editingDeck.prompts.length})</h3>
              <button onClick={addNewPromptToEditingDeck} className="sanrio-button text-xs">+ ADD</button>
            </div>
            <div className="space-y-5 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
              {editingDeck.prompts.map((p: any) => (
                <div key={p.id} className="sanrio-panel p-5 space-y-4">
                  <div className="flex gap-3">
                    <select className="bg-white border-2 border-[#FF69B4] rounded-xl text-xs p-2 font-['Cherry_Bomb_One']" value={p.type} onChange={e => updatePromptInEditingDeck(p.id, 'type', e.target.value)}>
                      <option>Truth</option><option>Dare</option>
                    </select>
                    <button onClick={() => removePromptFromEditingDeck(p.id)} className="text-red-400 ml-auto text-xl">×</button>
                  </div>
                  <input className="w-full bg-transparent border-b-2 border-[#FF69B4] text-lg p-2 focus:outline-none" value={p.text} onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)} placeholder="PROMPT TEXT" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setEditingDeck(null)} className="sanrio-button flex-1 text-xl">CANCEL</button>
            <button onClick={() => saveDeck(editingDeck)} className="sanrio-button flex-1 active text-xl">SAVE</button>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const SanrioHistoryScreen: React.FC<{ logic: any }> = ({ logic }) => {
  const { history } = logic;
  return (
    <div className="space-y-8">
      <h2 className="text-4xl sanrio-header italic border-b-4 border-[#FF69B4] pb-4">SWEET MEMORIES</h2>
      <div className="space-y-5">
        {history.length === 0 ? (
          <div className="py-20 text-center text-[#FF69B4] italic text-2xl opacity-40">NO MEMORIES YET...</div>
        ) : (
          history.map((item: any, i: number) => (
            <div key={i} className="sanrio-panel p-6 border-l-8 border-[#FF69B4]">
              <div className="flex justify-between text-[#FF69B4] text-xs mb-3 tracking-widest uppercase">
                <span>🎀 {item.type}</span>
                <span>MEMO {history.length - i}</span>
              </div>
              <p className="text-2xl italic text-[#FF1493]">"{item.text}"</p>
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
    <div className="space-y-8">
      <h2 className="text-4xl sanrio-header italic border-b-4 border-[#FF69B4] pb-4">WORLD SHIFT</h2>
      <div className="grid grid-cols-1 gap-5 pb-12">
        <button onClick={() => setTheme(Theme.PERSONA)} className="sanrio-button py-8 text-2xl">PHANTOM THIEF</button>
        <button onClick={() => setTheme(Theme.MINECRAFT)} className="sanrio-button py-8 text-2xl">BLOCKY WORLD</button>
        <button onClick={() => setTheme(Theme.DANGANRONPA)} className="sanrio-button py-8 text-2xl">KILLING HARMONY</button>
        <button onClick={() => setTheme(Theme.OMORI)} className="sanrio-button py-8 text-2xl">DREAM WORLD</button>
        <button onClick={() => setTheme(Theme.KIRBY)} className="sanrio-button py-8 text-2xl">KIRBY'S DREAM</button>
        <button onClick={() => setTheme(Theme.SANRIO)} className="sanrio-button py-8 text-2xl active">SWEET WORLD</button>
        <button onClick={() => setTheme(Theme.POKEMON)} className="sanrio-button py-8 text-2xl">POKéMON WORLD</button>
      </div>
    </div>
  );
};

export const SanrioSettingsScreen: React.FC<{ logic: any }> = ({ logic }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl sanrio-header italic border-b-4 border-[#FF69B4] pb-4">LOVE SYSTEM</h2>
      <div className="sanrio-panel p-10 space-y-8 text-center">
        <div className="flex justify-between items-center text-xl"><span className="opacity-60">FRIENDSHIP</span><span className="text-[#FF1493] font-black">MAX! 💖</span></div>
        <div className="flex justify-between items-center text-xl"><span className="opacity-60">SWEETNESS</span><span className="text-[#FF1493] font-black">OVERFLOW! 🍬</span></div>
        <div className="flex justify-between items-center text-xl"><span className="opacity-60">HAPPINESS</span><span className="text-[#FF1493] font-black animate-bounce">100% ✨</span></div>
        <div className="pt-8 border-t-4 border-dashed border-[#FF69B4]/20">
          <p className="text-sm opacity-60 italic">"You can never have too many friends!"</p>
        </div>
      </div>
    </div>
  );
};

export const SanrioMenu: React.FC<{ logic: any }> = ({ logic }) => {
  const { setView, setTheme } = logic;
  const [activeSection, setActiveSection] = useState<'themes' | null>(null);
  const themes = Object.values(Theme).filter(t => t !== Theme.NONE);
  const [sparkles, setSparkles] = useState<{ id: number, x: number, y: number, size: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles(prev => [...prev.slice(-10), { id: Date.now(), x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 15 + 10 }]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-[#FFF0F5] text-[#FF1493] relative overflow-hidden font-['Cherry_Bomb_One'] select-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cherry+Bomb+One&display=swap');
        .sanrio-theme { font-family: 'Cherry Bomb One', cursive; background: radial-gradient(#FFB7C5 10%, transparent 11%), radial-gradient(#FFB7C5 10%, transparent 11%), #FFF0F5; background-size: 40px 40px; background-position: 0 0, 20px 20px; }
        @keyframes sparkle-anim { 0% { transform: scale(0) rotate(0deg); opacity: 0; } 50% { transform: scale(1) rotate(180deg); opacity: 1; } 100% { transform: scale(0) rotate(360deg); opacity: 0; } }
      `}</style>
      <div className="absolute inset-0 sanrio-theme opacity-50"></div>
      {sparkles.map(s => (
        <div key={s.id} className="absolute pointer-events-none text-[#FFD700]" style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: `${s.size}px`, animation: 'sparkle-anim 1.5s ease-in-out forwards', zIndex: 5 }}>✨</div>
      ))}
      <div className="z-10 flex flex-col items-center gap-12">
        <motion.h1 className="text-6xl sm:text-7xl italic text-center drop-shadow-[5px_5px_0_white]" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }}>SWEET <br /> ADVENTURE</motion.h1>
        <div className="flex flex-col gap-6 w-72">
          <button onClick={() => setView('game')} className="bg-white text-[#FF69B4] border-4 border-[#FF69B4] rounded-[30px] px-8 py-4 text-3xl font-bold shadow-[0_8px_0_#FFB7C5] hover:translate-y-[-4px] hover:shadow-[0_12px_0_#FFB7C5] transition-all">START!</button>
          <button onClick={() => setActiveSection(activeSection === 'themes' ? null : 'themes')} className="bg-[#FFB7C5] text-white border-4 border-white rounded-[25px] px-6 py-2 text-xl font-bold shadow-[0_5px_0_#FF69B4] hover:translate-y-[-2px] hover:shadow-[0_8px_0_#FF69B4] transition-all uppercase">WORLD</button>
          <AnimatePresence>
            {activeSection === 'themes' && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="grid grid-cols-2 gap-2 bg-white/90 p-4 rounded-3xl border-4 border-[#FF69B4] max-h-48 overflow-y-auto no-scrollbar">
                {themes.map(t => <button key={t} onClick={() => setTheme(t)} className="text-[10px] text-left hover:text-[#FF1493] font-bold uppercase">{t}</button>)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="absolute bottom-10 text-4xl animate-bounce">🎀</div>
    </div>
  );
};

export const SanrioTheme: ThemeDefinition = {
  id: Theme.SANRIO,
  name: 'Sanrio',
  cssVars: {
    '--theme-accent': '#FF1493',
  },
  MenuComponent: SanrioMenu,
  LayoutComponent: SanrioLayout,
  PlayScreen: SanrioPlayScreen,
  DecksScreen: SanrioDecksScreen,
  HistoryScreen: SanrioHistoryScreen,
  SettingsScreen: SanrioSettingsScreen,
  ThemesScreen: SanrioThemesScreen,
  tabLabels: {
    play: 'SWEET',
    decks: 'GIFT',
    history: 'MEMO',
    themes: 'WORLD',
    settings: 'LOVE'
  }
};
