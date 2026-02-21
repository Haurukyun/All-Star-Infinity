
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme } from './types';
import { useGameLogic } from './hooks/useGameLogic';

const STAGES = [
  { id: Intensity.SOFT, title: 'DAILY LIFE', desc: 'SCHOOL DAYS', color: '#00FFFF', text: '#000000' },
  { id: Intensity.HOT, title: 'DEADLY LIFE', desc: 'INVESTIGATION', color: '#FF00FF', text: '#FFFFFF' },
  { id: Intensity.VULGAR, title: 'CLASS TRIAL', desc: 'TRUTH OR LIE', color: '#000000', text: '#FF00FF' },
];

const DanganronpaApp: React.FC<{ logic: ReturnType<typeof useGameLogic> }> = ({ logic }) => {
  const {
    activeTab, setActiveTab,
    intensity, setIntensity,
    prompt, setPrompt,
    history,
    theme, setTheme,
    customDecks,
    activeDeckId, setActiveDeckId,
    editingDeck, setEditingDeck,
    handleDraw, saveDeck, deleteDeck,
    addNewPromptToEditingDeck,
    updatePromptInEditingDeck,
    removePromptFromEditingDeck,
    generateId
  } = logic;

  const [glitches, setGlitches] = useState<{ id: number, top: number, left: number, width: number, height: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitches(Array.from({ length: 3 }).map((_, i) => ({
          id: Date.now() + i,
          top: Math.random() * 100,
          left: Math.random() * 100,
          width: Math.random() * 200 + 50,
          height: Math.random() * 2 + 1
        })));
        setTimeout(() => setGlitches([]), 150);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'play', label: 'DEBATE' },
    { id: 'decks', label: 'FILES' },
    { id: 'history', label: 'TRUTH' },
    { id: 'themes', label: 'REALITY' },
    { id: 'settings', label: 'MONOKUMA' },
  ];

  return (
    <div className="dr-theme h-screen w-screen flex flex-col bg-[#050505] text-white overflow-hidden font-['Orbitron']">
      <style>{`
        .dr-theme {
          background-image: 
            linear-gradient(rgba(255, 0, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
          position: relative;
        }
        .dr-theme::after {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.8) 100%);
          pointer-events: none;
        }
        .dr-panel {
          background: rgba(10, 10, 10, 0.95);
          border: 2px solid #FF00FF;
          box-shadow: 0 0 20px rgba(255, 0, 255, 0.2), inset 0 0 15px rgba(255, 0, 255, 0.1);
          clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);
        }
        .dr-button {
          background: #000;
          border: 2px solid #00FFFF;
          color: #00FFFF;
          padding: 12px 24px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.15s cubic-bezier(0.23, 1, 0.32, 1);
          clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
          font-weight: 900;
          letter-spacing: 2px;
          position: relative;
          overflow: hidden;
        }
        .dr-button::before {
          content: "";
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent);
          transition: 0.5s;
        }
        .dr-button:hover::before {
          left: 100%;
        }
        .dr-button:hover {
          background: #00FFFF;
          color: #000;
          box-shadow: 0 0 30px rgba(0, 255, 255, 0.6);
          transform: scale(1.05) skewX(-5deg);
        }
        .dr-button.active {
          background: #FF00FF;
          border-color: #FF00FF;
          color: #fff;
          box-shadow: 0 0 30px rgba(255, 0, 255, 0.6);
        }
        .dr-input {
          background: rgba(255, 0, 255, 0.05);
          color: #fff;
          border: 1px solid #FF00FF;
          padding: 15px;
          font-family: 'Special Elite', cursive;
          outline: none;
          transition: 0.3s;
        }
        .dr-input:focus {
          background: rgba(255, 0, 255, 0.15);
          box-shadow: 0 0 15px rgba(255, 0, 255, 0.3);
        }
        .dr-card {
          background: rgba(5, 5, 5, 0.98);
          border: 2px solid #FF00FF;
          padding: 40px;
          position: relative;
          box-shadow: 0 0 50px rgba(255, 0, 255, 0.15);
        }
        .dr-header {
          font-family: 'Orbitron', sans-serif;
          text-transform: uppercase;
          font-weight: 900;
          font-style: italic;
          color: #FF00FF;
          text-shadow: 3px 3px #00FFFF, -1px -1px #fff;
          letter-spacing: -2px;
        }
        .dr-prompt-text {
          font-family: 'Special Elite', cursive;
          line-height: 1.2;
          transform: skewX(-2deg);
        }
        .dr-nav-btn {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          font-size: 11px;
          letter-spacing: 3px;
          transition: all 0.3s;
          position: relative;
          font-weight: 900;
        }
        .dr-nav-btn.active {
          color: #FF00FF;
          text-shadow: 0 0 15px #FF00FF;
          transform: translateY(-5px) scale(1.1);
        }
        .dr-nav-btn.active::after {
          content: "";
          position: absolute;
          bottom: -10px;
          left: 10%;
          width: 80%;
          height: 3px;
          background: #FF00FF;
          box-shadow: 0 0 15px #FF00FF;
        }
        .glitch-line {
          position: absolute;
          background: #FF00FF;
          z-index: 100;
          pointer-events: none;
          mix-blend-mode: screen;
        }
        .blood-splatter {
          position: absolute;
          width: 100px;
          height: 100px;
          background: #FF00FF;
          filter: blur(20px);
          opacity: 0.15;
          pointer-events: none;
          border-radius: 50%;
        }
      `}</style>

      {/* Glitch Effects */}
      {glitches.map(g => (
        <div key={g.id} className="glitch-line" style={{ top: `${g.top}%`, left: `${g.left}%`, width: `${g.width}px`, height: `${g.height}px` }} />
      ))}
      <div className="blood-splatter top-10 left-10" />
      <div className="blood-splatter bottom-20 right-10" />

      {/* Header */}
      <header className="p-8 flex justify-between items-center shrink-0 relative z-10">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#FF00FF] to-transparent flex-1 mr-6 shadow-[0_0_15px_#FF00FF]"></div>
        <h1 className="text-4xl dr-header">V3: KILLING HARMONY</h1>
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent flex-1 ml-6 shadow-[0_0_15px_#00FFFF]"></div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-6 pb-24 relative z-10">
        <div className="max-w-md mx-auto h-full pt-4">
          <AnimatePresence mode="wait">
            {activeTab === 'play' && (
              <motion.div key="play" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-8">
                {!intensity && !prompt ? (
                  <div className="space-y-10">
                    <div className="dr-panel p-8">
                      <h2 className="text-2xl mb-6 text-[#00FFFF] border-b-2 border-[#00FFFF]/30 pb-3 font-black italic tracking-tighter">SELECT FILE</h2>
                      <div className="grid grid-cols-1 gap-4">
                        <button onClick={() => setActiveDeckId('default')} className={`dr-button text-xl ${activeDeckId === 'default' ? 'active' : ''}`}>
                          ULTIMATE ACADEMY
                        </button>
                        {customDecks.map(deck => (
                          <button key={deck.id} onClick={() => setActiveDeckId(deck.id)} className={`dr-button text-xl ${activeDeckId === deck.id ? 'active' : ''}`}>
                            {deck.name.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="dr-panel p-8">
                      <h2 className="text-2xl mb-6 text-[#FF00FF] border-b-2 border-[#FF00FF]/30 pb-3 font-black italic tracking-tighter">CLASS TRIAL LEVEL</h2>
                      <div className="grid grid-cols-1 gap-5">
                        {STAGES.map((stage) => (
                          <button 
                            key={stage.id} 
                            onClick={() => setIntensity(stage.id)}
                            className="dr-button flex flex-col items-center py-6"
                            style={{ borderColor: stage.color }}
                          >
                            <span className="text-3xl font-black italic" style={{ color: stage.color }}>{stage.title}</span>
                            <span className="text-xs opacity-60 tracking-[4px] mt-1">{stage.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : !prompt ? (
                  <div className="flex flex-col items-center gap-12 py-16">
                    <motion.div 
                      initial={{ scale: 0.5, rotate: -180, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      className="text-center relative"
                    >
                      <div className="absolute inset-0 bg-[#FF00FF] blur-3xl opacity-30 animate-pulse"></div>
                      <p className="text-[#00FFFF] text-sm tracking-[8px] mb-4 font-black">CURRENT PHASE</p>
                      <h2 className="text-7xl dr-header italic leading-none">{intensity}</h2>
                    </motion.div>
                    <div className="grid grid-cols-1 gap-6 w-full">
                      <button onClick={() => handleDraw('Truth')} className="dr-button text-4xl py-10 border-[#00FFFF] text-[#00FFFF]">TRUTH BULLET</button>
                      <button onClick={() => handleDraw('Dare')} className="dr-button text-4xl py-10 border-[#FF00FF] text-[#FF00FF]">LIE BULLET</button>
                      <button onClick={() => setIntensity(null)} className="text-white/30 uppercase text-xs tracking-[6px] mt-8 hover:text-[#FF00FF] transition-colors font-black">Abort Trial</button>
                    </div>
                  </div>
                ) : (
                  <motion.div initial={{ scale: 0.5, opacity: 0, rotateY: 90 }} animate={{ scale: 1, opacity: 1, rotateY: 0 }} className="dr-card space-y-8">
                    <div className="flex justify-between items-center border-b-2 border-[#FF00FF]/20 pb-4">
                      <span className="bg-[#FF00FF] text-white px-6 py-2 text-2xl font-black italic skew-x-[-10deg]">ARGUMENT</span>
                      <span className="text-[#00FFFF] text-sm font-black tracking-widest">RECORD #{history.length}</span>
                    </div>
                    <p className="text-5xl dr-prompt-text italic font-black text-white leading-[1.1]">"{prompt.text}"</p>
                    <div className="pt-6 border-t-2 border-[#FF00FF] border-dashed">
                      <p className="text-[#00FFFF] text-sm mb-2 tracking-[6px] font-black">PUNISHMENT TIME</p>
                      <p className="text-2xl dr-prompt-text opacity-80 text-[#FF00FF]">{prompt.penalty}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6 pt-8">
                      <button onClick={() => setPrompt(null)} className="dr-button text-xl">REBUTTAL</button>
                      <button onClick={() => handleDraw(prompt.type)} className="dr-button active text-xl">SHOOT</button>
                    </div>
                    <div className="absolute -top-3 -right-3 w-12 h-12 border-t-4 border-r-4 border-[#00FFFF]"></div>
                    <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-4 border-l-4 border-[#FF00FF]"></div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'decks' && (
              <motion.div key="decks" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-8">
                {!editingDeck ? (
                  <>
                    <div className="flex justify-between items-end border-b-4 border-[#FF00FF] pb-4">
                      <h2 className="text-4xl dr-header">EVIDENCE FORGE</h2>
                      <button onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })} className="dr-button text-xs font-black">+ NEW FILE</button>
                    </div>
                    <div className="space-y-5">
                      {customDecks.map(deck => (
                        <div key={deck.id} className="dr-panel p-6 flex justify-between items-center group hover:border-[#00FFFF] transition-colors">
                          <div>
                            <h3 className="text-2xl text-[#00FFFF] font-black italic">{deck.name || 'Untitled'}</h3>
                            <p className="text-[10px] opacity-40 tracking-[4px] mt-1 uppercase font-black">{deck.prompts.length} BULLETS LOADED</p>
                          </div>
                          <div className="flex gap-3">
                            <button onClick={() => setEditingDeck(deck)} className="dr-button text-[10px]">EDIT</button>
                            <button onClick={() => deleteDeck(deck.id)} className="dr-button text-[10px] border-[#FF00FF] text-[#FF00FF]">WIPE</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="dr-panel p-8 space-y-8">
                    <div className="space-y-6">
                      <input className="dr-input w-full text-3xl font-black italic" value={editingDeck.name} onChange={e => setEditingDeck({...editingDeck, name: e.target.value})} placeholder="FILE NAME" />
                      <textarea className="dr-input w-full text-lg h-32" value={editingDeck.description} onChange={e => setEditingDeck({...editingDeck, description: e.target.value})} placeholder="FILE DESCRIPTION" />
                    </div>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-2xl text-[#FF00FF] font-black italic">BULLETS ({editingDeck.prompts.length})</h3>
                        <button onClick={addNewPromptToEditingDeck} className="dr-button text-[10px]">+ ADD</button>
                      </div>
                      <div className="space-y-5 max-h-[400px] overflow-y-auto pr-3 custom-scrollbar">
                        {editingDeck.prompts.map(p => (
                          <div key={p.id} className="dr-card p-6 space-y-4 bg-black/80 border-[#FF00FF]/30">
                            <div className="flex gap-3">
                              <select className="dr-input text-xs flex-1" value={p.type} onChange={e => updatePromptInEditingDeck(p.id, 'type', e.target.value)}>
                                <option>Truth</option><option>Dare</option>
                              </select>
                              <select className="dr-input text-xs flex-1" value={p.intensity} onChange={e => updatePromptInEditingDeck(p.id, 'intensity', e.target.value)}>
                                <option value={Intensity.SOFT}>SOFT</option><option value={Intensity.HOT}>HOT</option><option value={Intensity.VULGAR}>VULGAR</option>
                              </select>
                              <button onClick={() => removePromptFromEditingDeck(p.id)} className="text-[#FF00FF] ml-auto font-black text-xl hover:scale-125 transition-transform">×</button>
                            </div>
                            <input className="dr-input w-full text-lg" value={p.text} onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)} placeholder="BULLET CONTENT..." />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={() => setEditingDeck(null)} className="dr-button flex-1 text-lg">CANCEL</button>
                      <button onClick={() => saveDeck(editingDeck)} className="dr-button flex-1 active text-lg">SAVE</button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                <h2 className="text-4xl dr-header border-b-4 border-[#00FFFF] pb-4">TRUTH BULLET LOG</h2>
                <div className="space-y-5">
                  {history.length === 0 ? (
                    <div className="text-center py-20 text-2xl opacity-30 italic font-black tracking-widest">NO TRUTHS FOUND...</div>
                  ) : (
                    history.map((item, i) => (
                      <div key={i} className="dr-panel p-6 border-l-8 border-[#00FFFF]">
                        <div className="flex justify-between text-[#FF00FF] text-[11px] mb-3 tracking-[4px] font-black">
                          <span>{item.type.toUpperCase()}</span>
                          <span>RECORD {history.length-i}</span>
                        </div>
                        <p className="text-2xl dr-prompt-text italic font-black">"{item.text}"</p>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'themes' && (
              <motion.div key="themes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                <h2 className="text-4xl dr-header border-b-4 border-[#FF00FF] pb-4">REALITY SHIFT</h2>
                <div className="grid grid-cols-1 gap-5">
                  <button onClick={() => setTheme(Theme.PERSONA)} className="dr-button py-8 text-2xl">PHANTOM THIEF</button>
                  <button onClick={() => setTheme(Theme.MINECRAFT)} className="dr-button py-8 text-2xl">BLOCKY WORLD</button>
                  <button onClick={() => setTheme(Theme.DANGANRONPA)} className="dr-button py-8 text-2xl active">KILLING HARMONY</button>
                  <button onClick={() => setTheme(Theme.OMORI)} className="dr-button py-8 text-2xl">DREAM WORLD</button>
                  <button onClick={() => setTheme(Theme.KIRBY)} className="dr-button py-8 text-2xl">DREAM LAND</button>
                  <button onClick={() => setTheme(Theme.SANRIO)} className="dr-button py-8 text-2xl">SWEET WORLD</button>
                  <button onClick={() => setTheme(Theme.POKEMON)} className="dr-button py-8 text-2xl">POKÉMON WORLD</button>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                <h2 className="text-4xl dr-header border-b-4 border-[#FF00FF] pb-4">MONOKUMA SYSTEM</h2>
                <div className="dr-panel p-10 space-y-8">
                  <div className="flex justify-between items-center">
                    <span className="text-sm tracking-[6px] font-black opacity-50">DESPAIR LEVEL</span><span className="text-[#FF00FF] font-black text-2xl italic">MAXIMUM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm tracking-[6px] font-black opacity-50">HOPE SYNC</span><span className="text-[#00FFFF] font-black text-2xl italic">CRITICAL</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm tracking-[6px] font-black opacity-50">EXECUTION STATUS</span><span className="text-[#FF00FF] font-black text-2xl italic animate-pulse">PENDING...</span>
                  </div>
                  <div className="pt-8 border-t-2 border-white/5">
                    <p className="text-[11px] opacity-30 text-center uppercase tracking-[8px] font-black">Puhuhu... Welcome to the end.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-black/95 border-t-4 border-[#FF00FF] h-24 z-50 shadow-[0_-10px_30px_rgba(255,0,255,0.2)]">
        <div className="flex justify-around items-center h-full px-4 gap-2">
          {tabs.map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`dr-nav-btn flex-1 h-full font-black ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default DanganronpaApp;

