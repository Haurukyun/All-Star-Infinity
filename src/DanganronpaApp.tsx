
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme } from './types';
import { useGameLogic } from './hooks/useGameLogic';

const STAGES = [
  { id: Intensity.SOFT, title: 'DAILY LIFE', desc: 'SCHOOL DAYS', color: '#00FFFF', text: '#000000' },
  { id: Intensity.HOT, title: 'DEADLY LIFE', desc: 'INVESTIGATION', color: '#FF00FF', text: '#FFFFFF' },
  { id: Intensity.VULGAR, title: 'CLASS TRIAL', desc: 'TRUTH OR LIE', color: '#000000', text: '#FF00FF' },
];

const SpiralBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <svg className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%] animate-spin-slow opacity-30" viewBox="0 0 100 100">
      <defs>
        <radialGradient id="spiral-grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#2a0a4a" stopOpacity="0" />
          <stop offset="100%" stopColor="#4a0a6a" stopOpacity="1" />
        </radialGradient>
      </defs>
      {Array.from({ length: 20 }).map((_, i) => (
        <path
          key={i}
          d={`M50 50 Q${50 + Math.cos(i) * 50} ${50 + Math.sin(i) * 50} ${50 + Math.cos(i + 0.5) * 100} ${50 + Math.sin(i + 0.5) * 100}`}
          stroke="url(#spiral-grad)"
          strokeWidth="0.5"
          fill="none"
          className="mix-blend-screen"
        />
      ))}
    </svg>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050510_90%)]"></div>
  </div>
);

const RevolverUI = ({ onShoot }: { onShoot: () => void }) => (
  <button 
    onClick={onShoot}
    className="relative w-32 h-32 group transition-transform active:scale-95"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full animate-spin-slow-reverse"></div>
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
      <circle cx="50" cy="50" r="45" fill="rgba(0,0,0,0.8)" stroke="#00FFFF" strokeWidth="2" />
      {/* Cylinder holes */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <g key={i} transform={`rotate(${deg} 50 50)`}>
          <circle cx="50" cy="25" r="8" fill="#1a1a1a" stroke="#00FFFF" strokeWidth="1" className="group-hover:fill-[#00FFFF] transition-colors" />
        </g>
      ))}
      <circle cx="50" cy="50" r="15" fill="#000" stroke="#FF00FF" strokeWidth="2" />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="font-['Orbitron'] text-[10px] font-bold text-[#FF00FF] tracking-widest animate-pulse">SHOOT</span>
    </div>
  </button>
);

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

  const tabs = [
    { id: 'play', label: 'TRIAL' },
    { id: 'decks', label: 'EVIDENCE' },
    { id: 'history', label: 'TRANSCRIPT' },
    { id: 'themes', label: 'SHIFT' },
    { id: 'settings', label: 'SYSTEM' },
  ];

  return (
    <div className="dr-theme h-[100dvh] w-screen flex flex-col bg-[#050510] text-white overflow-hidden font-['Orbitron'] relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Playfair+Display:ital,wght@1,700;1,900&display=swap');
        
        .dr-theme {
          background-color: #050510;
        }

        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin 15s linear infinite reverse;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .dr-text-box {
          background: linear-gradient(90deg, rgba(0,20,40,0.9) 0%, rgba(0,10,20,0.95) 100%);
          border: 1px solid #00FFFF;
          border-left: 4px solid #00FFFF;
          clip-path: polygon(0 0, 100% 0, 95% 100%, 0 100%);
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.2);
          position: relative;
        }

        .dr-text-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, #00FFFF, transparent);
        }

        .dr-argument-text {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 900;
          text-shadow: 2px 2px 0px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
        }

        .dr-ui-btn {
          background: rgba(0,0,0,0.6);
          border: 1px solid rgba(255,255,255,0.2);
          clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
          transition: all 0.2s;
        }

        .dr-ui-btn:hover {
          background: rgba(0, 255, 255, 0.2);
          border-color: #00FFFF;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.4);
        }

        .dr-ui-btn.active {
          background: rgba(255, 0, 255, 0.2);
          border-color: #FF00FF;
          box-shadow: 0 0 10px rgba(255, 0, 255, 0.4);
        }

        .dr-nav-item {
          position: relative;
          transform: skewX(-20deg);
          border-right: 1px solid rgba(255,255,255,0.1);
        }
        
        .dr-nav-content {
          transform: skewX(20deg);
        }

        .dr-nav-item.active {
          background: linear-gradient(to top, rgba(0, 255, 255, 0.3), transparent);
          border-bottom: 2px solid #00FFFF;
        }

        .scanline {
          background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.3) 51%);
          background-size: 100% 4px;
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 50;
          opacity: 0.3;
        }
      `}</style>

      <SpiralBackground />
      <div className="scanline"></div>

      {/* HUD Header */}
      <header className="p-4 flex justify-between items-start shrink-0 relative z-20">
        <div className="flex flex-col">
          <div className="flex items-center gap-1 mb-1">
            <div className="w-2 h-2 rounded-full bg-[#00FFFF] animate-pulse"></div>
            <span className="text-[10px] tracking-[2px] text-[#00FFFF] font-bold">NONSTOP DEBATE</span>
          </div>
          <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="w-2/3 h-full bg-gradient-to-r from-[#00FFFF] to-[#FF00FF]"></div>
          </div>
        </div>
        
        {/* Influence Gauge */}
        <div className="flex flex-col items-end">
           <div className="flex -space-x-1">
             {[1,2,3,4,5].map(i => (
               <div key={i} className="w-6 h-6 transform rotate-45 border-2 border-[#FF00FF] bg-black flex items-center justify-center shadow-[0_0_5px_#FF00FF]">
                 <div className="w-3 h-3 bg-[#FF00FF]"></div>
               </div>
             ))}
           </div>
           <span className="text-[10px] italic font-black text-[#FF00FF] mt-1 pr-2">INFLUENCE</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 relative z-10 no-scrollbar">
        <div className="max-w-md mx-auto h-full flex flex-col">
          <AnimatePresence mode="wait">
            {activeTab === 'play' && (
              <motion.div key="play" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col">
                {!intensity && !prompt ? (
                  <div className="flex-1 flex flex-col justify-center space-y-8">
                    <div className="dr-text-box p-6">
                      <h2 className="text-xl text-[#00FFFF] font-black italic tracking-wider mb-4 flex items-center gap-2">
                        <span className="text-2xl">▶</span> SELECT FILE
                      </h2>
                      <div className="grid grid-cols-1 gap-2">
                        <button onClick={() => setActiveDeckId('default')} className={`text-left p-3 border-l-2 transition-all ${activeDeckId === 'default' ? 'border-[#FF00FF] bg-white/10 pl-6' : 'border-white/20 pl-4 hover:pl-6 hover:border-[#00FFFF]'}`}>
                          <span className="font-bold tracking-widest text-sm">ULTIMATE ACADEMY</span>
                        </button>
                        {customDecks.map(deck => (
                          <button key={deck.id} onClick={() => setActiveDeckId(deck.id)} className={`text-left p-3 border-l-2 transition-all ${activeDeckId === deck.id ? 'border-[#FF00FF] bg-white/10 pl-6' : 'border-white/20 pl-4 hover:pl-6 hover:border-[#00FFFF]'}`}>
                            <span className="font-bold tracking-widest text-sm uppercase">{deck.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="dr-text-box p-6 !border-[#FF00FF] !border-l-4">
                      <h2 className="text-xl text-[#FF00FF] font-black italic tracking-wider mb-4 flex items-center gap-2">
                        <span className="text-2xl">▶</span> DIFFICULTY
                      </h2>
                      <div className="flex flex-col gap-3">
                        {STAGES.map((stage) => (
                          <button 
                            key={stage.id} 
                            onClick={() => setIntensity(stage.id)}
                            className="flex items-center justify-between p-3 bg-black/40 border border-white/10 hover:border-[#FF00FF] hover:bg-[#FF00FF]/10 transition-all group"
                          >
                            <span className="font-black italic text-lg group-hover:translate-x-2 transition-transform" style={{ color: stage.color }}>{stage.title}</span>
                            <span className="text-[9px] font-mono opacity-60 uppercase">{stage.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : !prompt ? (
                  <div className="flex-1 flex flex-col items-center justify-center relative">
                    {/* Floating Text Effect */}
                    <motion.div 
                      initial={{ scale: 2, opacity: 0, rotate: -10 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      className="absolute top-10 w-full text-center"
                    >
                      <h2 className="text-6xl dr-argument-text text-white drop-shadow-[0_0_10px_#00FFFF] opacity-20 select-none">
                        {intensity}
                      </h2>
                    </motion.div>

                    <div className="relative z-10 w-full max-w-xs space-y-12">
                      <div className="text-center space-y-2">
                        <p className="text-[#00FFFF] text-xs font-black tracking-[4px] animate-pulse">MAKE YOUR ARGUMENT</p>
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent"></div>
                      </div>

                      <div className="flex justify-center gap-8">
                        <div className="flex flex-col items-center gap-4">
                          <RevolverUI onShoot={() => handleDraw('Truth')} />
                          <span className="text-[#00FFFF] font-black tracking-widest text-sm bg-black/50 px-2 border border-[#00FFFF]">TRUTH</span>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                          <div className="relative">
                            <RevolverUI onShoot={() => handleDraw('Dare')} />
                            <div className="absolute inset-0 bg-[#FF00FF] mix-blend-overlay rounded-full"></div>
                          </div>
                          <span className="text-[#FF00FF] font-black tracking-widest text-sm bg-black/50 px-2 border border-[#FF00FF]">LIE</span>
                        </div>
                      </div>

                      <button onClick={() => setIntensity(null)} className="w-full text-center text-xs text-white/30 hover:text-white mt-8 tracking-[2px]">
                        [ ABORT TRIAL ]
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col justify-center relative">
                    {/* The "Argument" Text */}
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0, y: 50 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      className="relative z-20 mb-12"
                    >
                      {prompt.text.split(' ').map((word, i) => (
                        <motion.span
                          key={i}
                          className="inline-block dr-argument-text text-4xl sm:text-5xl mx-1 text-white"
                          animate={{ 
                            y: [0, -5, 0],
                            rotate: [0, i % 2 === 0 ? 2 : -2, 0]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: "easeInOut"
                          }}
                          style={{
                            textShadow: '3px 3px 0px #2a0a4a'
                          }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.div>

                    {/* Speaker Box */}
                    <motion.div 
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="dr-text-box p-4 mb-4"
                    >
                      <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-1">
                        <span className="text-[#00FFFF] font-bold text-xs tracking-widest">MONOKUMA FILE #{history.length}</span>
                        <span className="text-[#FF00FF] font-bold text-xs">{prompt.type.toUpperCase()}</span>
                      </div>
                      <div className="flex gap-4 items-start">
                        <div className="w-12 h-12 border border-[#FF00FF] bg-black/50 flex items-center justify-center shrink-0">
                          <span className="text-2xl">💀</span>
                        </div>
                        <div>
                          <p className="text-[#FF00FF] text-[10px] font-black uppercase mb-1">PENALTY GAME</p>
                          <p className="text-sm font-mono leading-tight text-gray-300">{prompt.penalty}</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setPrompt(null)} className="dr-ui-btn px-6 py-2 text-xs font-bold text-white">
                        BACK
                      </button>
                      <button onClick={() => handleDraw(prompt.type)} className="dr-ui-btn px-6 py-2 text-xs font-bold text-[#00FFFF] border-[#00FFFF]">
                        RELOAD
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'decks' && (
              <motion.div key="decks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pt-4">
                {!editingDeck ? (
                  <>
                    <div className="flex justify-between items-center border-b-2 border-[#00FFFF] pb-2 mb-4">
                      <h2 className="text-2xl font-black italic text-[#00FFFF]">EVIDENCE LIST</h2>
                      <button onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })} className="bg-[#00FFFF] text-black px-3 py-1 text-xs font-bold clip-path-polygon">+ NEW</button>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {customDecks.map(deck => (
                        <div key={deck.id} className="bg-black/60 border-l-4 border-[#FF00FF] p-3 flex justify-between items-center hover:bg-white/5 transition-colors">
                          <div>
                            <h3 className="font-bold text-lg">{deck.name || 'UNTITLED'}</h3>
                            <p className="text-[10px] text-gray-400 font-mono">{deck.prompts.length} BULLETS</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => setEditingDeck(deck)} className="text-[#00FFFF] text-xs font-bold hover:underline">EDIT</button>
                            <button onClick={() => deleteDeck(deck.id)} className="text-[#FF00FF] text-xs font-bold hover:underline">DISCARD</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="dr-text-box p-4 space-y-4">
                    <input className="w-full bg-transparent border-b border-[#00FFFF] text-xl font-bold py-2 focus:outline-none" value={editingDeck.name} onChange={e => setEditingDeck({...editingDeck, name: e.target.value})} placeholder="FILE NAME" />
                    <textarea className="w-full bg-black/30 border border-white/20 p-2 text-xs font-mono h-20 focus:border-[#FF00FF] outline-none" value={editingDeck.description} onChange={e => setEditingDeck({...editingDeck, description: e.target.value})} placeholder="DESCRIPTION" />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[#00FFFF] font-bold text-sm">BULLETS</span>
                        <button onClick={addNewPromptToEditingDeck} className="text-xs bg-white/10 px-2 py-1 hover:bg-white/20">+ ADD</button>
                      </div>
                      <div className="max-h-[40vh] overflow-y-auto space-y-2 pr-2">
                        {editingDeck.prompts.map(p => (
                          <div key={p.id} className="bg-black/40 p-2 border border-white/10 space-y-2">
                            <div className="flex justify-between">
                              <select className="bg-transparent text-[10px] text-[#FF00FF] font-bold border border-[#FF00FF] px-1" value={p.type} onChange={e => updatePromptInEditingDeck(p.id, 'type', e.target.value)}>
                                <option>Truth</option><option>Dare</option>
                              </select>
                              <button onClick={() => removePromptFromEditingDeck(p.id)} className="text-red-500 text-xs">×</button>
                            </div>
                            <input className="w-full bg-transparent text-sm border-b border-white/10 focus:border-[#00FFFF] outline-none" value={p.text} onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)} placeholder="Content..." />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button onClick={() => setEditingDeck(null)} className="flex-1 bg-white/10 py-2 text-xs font-bold">CANCEL</button>
                      <button onClick={() => saveDeck(editingDeck)} className="flex-1 bg-[#00FFFF] text-black py-2 text-xs font-bold">SAVE</button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pt-4">
                <h2 className="text-2xl font-black italic text-[#FF00FF] border-b-2 border-[#FF00FF] pb-2 mb-4">TRANSCRIPT LOG</h2>
                <div className="space-y-2">
                  {history.map((item, i) => (
                    <div key={i} className="bg-gradient-to-r from-black/80 to-transparent p-3 border-l-2 border-[#00FFFF]">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-[#00FFFF] tracking-widest">{item.type.toUpperCase()}</span>
                        <span className="text-[10px] text-gray-500">#{history.length - i}</span>
                      </div>
                      <p className="font-serif italic text-lg leading-tight">"{item.text}"</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'themes' && (
              <motion.div key="themes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pt-4">
                <h2 className="text-2xl font-black italic text-white border-b-2 border-white/20 pb-2 mb-4">REALITY SHIFT</h2>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: Theme.PERSONA, label: 'PHANTOM THIEF', color: '#D80000' },
                    { id: Theme.MINECRAFT, label: 'BLOCKY WORLD', color: '#55FF55' },
                    { id: Theme.DANGANRONPA, label: 'KILLING HARMONY', color: '#FF00FF' },
                    { id: Theme.OMORI, label: 'DREAM WORLD', color: '#FFFFFF' },
                    { id: Theme.KIRBY, label: 'DREAM LAND', color: '#FFB7C5' },
                    { id: Theme.POKEMON, label: 'KANTO REGION', color: '#6890F0' },
                    { id: Theme.ANIMAL_CROSSING, label: 'ISLAND PARADISE', color: '#9CCC65' },
                    { id: Theme.SKYRIM, label: 'SKYRIM', color: '#CCCCCC' },
                  ].map(t => (
                    <button 
                      key={t.id}
                      onClick={() => setTheme(t.id as Theme)}
                      className={`p-4 text-left border border-white/10 hover:border-white transition-all ${theme === t.id ? 'bg-white/10 border-white' : ''}`}
                    >
                      <span className="font-black text-lg" style={{ color: theme === t.id ? '#fff' : t.color }}>{t.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pt-4">
                <div className="dr-text-box p-6 space-y-6">
                  <h2 className="text-xl font-bold text-[#00FFFF] mb-4">SYSTEM STATUS</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end border-b border-white/10 pb-1">
                      <span className="text-xs text-gray-400">HOPE FRAGMENTS</span>
                      <span className="text-[#00FFFF] font-mono">999/999</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/10 pb-1">
                      <span className="text-xs text-gray-400">MONOCOINS</span>
                      <span className="text-[#FFB700] font-mono">000</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/10 pb-1">
                      <span className="text-xs text-gray-400">LEVEL</span>
                      <span className="text-[#FF00FF] font-mono">99</span>
                    </div>
                  </div>
                  <div className="text-center pt-8 opacity-50 text-[10px] tracking-[4px]">
                    TEAM DANGANRONPA
                  </div>
                  <button onClick={() => logic.setView('menu')} className="w-full mt-4 bg-[#FF00FF]/20 border border-[#FF00FF] p-2 text-[#FF00FF] font-black text-xs hover:bg-[#FF00FF] hover:text-black transition-colors">
                    RETURN TO TITLE
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="h-32"></div>
        </div>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 w-full h-20 z-50">
        {/* Angled background shape */}
        <div className="absolute inset-0 bg-[#050510] border-t border-[#00FFFF] shadow-[0_-5px_20px_rgba(0,255,255,0.2)]" style={{ clipPath: 'polygon(0 20%, 5% 0, 95% 0, 100% 20%, 100% 100%, 0 100%)' }}></div>
        
        <div className="relative h-full flex justify-around items-center px-2 pt-2">
          {tabs.map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`dr-nav-item flex-1 h-full flex flex-col justify-center items-center transition-all ${activeTab === tab.id ? 'active' : 'opacity-50 hover:opacity-100'}`}
            >
              <div className="dr-nav-content flex flex-col items-center">
                <span className="text-lg mb-1">{tab.label === 'TRIAL' ? '⚖️' : tab.label === 'EVIDENCE' ? '📁' : tab.label === 'TRANSCRIPT' ? '👁️' : tab.label === 'SHIFT' ? '🌍' : '⚙️'}</span>
                <span className="text-[8px] font-black tracking-widest">{tab.label}</span>
              </div>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export const DanganronpaMenu: React.FC<{ logic: ReturnType<typeof useGameLogic> }> = ({ logic }) => {
  const { setView, setTheme } = logic;
  const [activeSection, setActiveSection] = React.useState<'gamemodes' | 'themes' | 'options' | null>(null);
  const themes = Object.values(Theme).filter(t => t !== Theme.NONE);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-[#2b002b] font-sans text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #2b002b 0, #2b002b 20px, #3b003b 20px, #3b003b 40px)' }}></div>
      <div className="z-10 flex flex-col items-center gap-12">
        <motion.h1 animate={{ rotate: [0, -2, 2, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="text-7xl font-black tracking-widest text-[#ff00ff] drop-shadow-[6px_6px_0_#000] italic">DANGANRONPA</motion.h1>
        <div className="flex flex-col gap-6 w-72">
          <button onClick={() => setView('game')} className="bg-black border-4 border-[#ff00ff] p-4 hover:rotate-2 hover:scale-105 transition-all text-2xl font-black italic shadow-[8px_8px_0_#ff00ff]">START TRIAL</button>
          <button onClick={() => setActiveSection(activeSection === 'themes' ? null : 'themes')} className="bg-black border-4 border-[#ff00ff] p-4 hover:-rotate-2 hover:scale-105 transition-all text-2xl font-black italic shadow-[8px_8px_0_#ff00ff]">SELECT THEME</button>
        </div>
        <AnimatePresence>
          {activeSection === 'themes' && (
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="grid grid-cols-2 gap-3 bg-black/90 p-6 border-4 border-[#ff00ff] shadow-[12px_12px_0_#000]">
              {themes.map(t => (
                <button key={t} onClick={() => setTheme(t)} className="text-[#ff00ff] hover:text-white font-bold text-xs uppercase tracking-widest">{t}</button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DanganronpaApp;
