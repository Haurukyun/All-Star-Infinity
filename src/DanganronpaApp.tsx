
import React from 'react';
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

  const tabs = [
    { id: 'play', label: 'DEBATE' },
    { id: 'decks', label: 'FILES' },
    { id: 'history', label: 'TRUTH' },
    { id: 'themes', label: 'REALITY' },
    { id: 'settings', label: 'MONOKUMA' },
  ];

  return (
    <div className="dr-theme h-screen w-screen flex flex-col bg-[#1a1a1a] text-white overflow-hidden font-['Orbitron']">
      <style>{`
        .dr-theme {
          background-image: 
            radial-gradient(circle at 2px 2px, rgba(255, 0, 255, 0.15) 1px, transparent 0);
          background-size: 40px 40px;
          position: relative;
        }
        .dr-theme::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(45deg, rgba(255,0,255,0.05) 0%, transparent 100%);
          pointer-events: none;
        }
        .dr-panel {
          background: rgba(0, 0, 0, 0.8);
          border: 2px solid #FF00FF;
          box-shadow: 0 0 15px rgba(255, 0, 255, 0.3), inset 0 0 10px rgba(255, 0, 255, 0.2);
          clip-path: polygon(0 10px, 10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);
        }
        .dr-button {
          background: #000;
          border: 2px solid #00FFFF;
          color: #00FFFF;
          padding: 10px 20px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
          clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
          font-weight: bold;
          letter-spacing: 1px;
        }
        .dr-button:hover {
          background: #00FFFF;
          color: #000;
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
        }
        .dr-button.active {
          background: #FF00FF;
          border-color: #FF00FF;
          color: #fff;
          box-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
        }
        .dr-input {
          background: rgba(255, 0, 255, 0.1);
          color: #fff;
          border: 1px solid #FF00FF;
          padding: 10px;
          font-family: 'Special Elite', cursive;
          outline: none;
        }
        .dr-card {
          background: rgba(0, 0, 0, 0.9);
          border-left: 8px solid #FF00FF;
          border-right: 8px solid #00FFFF;
          padding: 24px;
          position: relative;
        }
        .dr-header {
          font-family: 'Orbitron', sans-serif;
          text-transform: uppercase;
          font-weight: 900;
          font-style: italic;
          color: #FF00FF;
          text-shadow: 2px 2px #00FFFF;
        }
        .dr-prompt-text {
          font-family: 'Special Elite', cursive;
          line-height: 1.4;
        }
        .dr-nav-btn {
          background: transparent;
          border: none;
          color: #fff;
          font-size: 12px;
          letter-spacing: 2px;
          transition: all 0.3s;
          position: relative;
        }
        .dr-nav-btn.active {
          color: #FF00FF;
          text-shadow: 0 0 10px #FF00FF;
        }
        .dr-nav-btn.active::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 2px;
          background: #FF00FF;
          box-shadow: 0 0 10px #FF00FF;
        }
      `}</style>

      {/* Header */}
      <header className="p-6 flex justify-between items-center shrink-0">
        <div className="h-1 bg-[#FF00FF] flex-1 mr-4 shadow-[0_0_10px_#FF00FF]"></div>
        <h1 className="text-3xl dr-header">V3: KILLING HARMONY</h1>
        <div className="h-1 bg-[#00FFFF] flex-1 ml-4 shadow-[0_0_10px_#00FFFF]"></div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-6 pb-24">
        <div className="max-w-md mx-auto h-full">
          <AnimatePresence mode="wait">
            {activeTab === 'play' && (
              <motion.div key="play" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                {!intensity && !prompt ? (
                  <div className="space-y-8">
                    <div className="dr-panel p-6">
                      <h2 className="text-xl mb-4 text-[#00FFFF] border-b border-[#00FFFF] pb-2">SELECT FILE</h2>
                      <div className="grid grid-cols-1 gap-3">
                        <button onClick={() => setActiveDeckId('default')} className={`dr-button ${activeDeckId === 'default' ? 'active' : ''}`}>
                          ULTIMATE ACADEMY
                        </button>
                        {customDecks.map(deck => (
                          <button key={deck.id} onClick={() => setActiveDeckId(deck.id)} className={`dr-button ${activeDeckId === deck.id ? 'active' : ''}`}>
                            {deck.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="dr-panel p-6">
                      <h2 className="text-xl mb-4 text-[#FF00FF] border-b border-[#FF00FF] pb-2">CLASS TRIAL LEVEL</h2>
                      <div className="grid grid-cols-1 gap-4">
                        {STAGES.map((stage) => (
                          <button 
                            key={stage.id} 
                            onClick={() => setIntensity(stage.id)}
                            className="dr-button flex flex-col items-center py-4"
                            style={{ borderColor: stage.color }}
                          >
                            <span className="text-2xl" style={{ color: stage.color }}>{stage.title}</span>
                            <span className="text-[10px] opacity-70">{stage.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : !prompt ? (
                  <div className="flex flex-col items-center gap-8 py-12">
                    <motion.div 
                      initial={{ scale: 0.5, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="text-center relative"
                    >
                      <div className="absolute inset-0 bg-[#FF00FF] blur-2xl opacity-20 animate-pulse"></div>
                      <p className="text-[#00FFFF] text-sm tracking-[4px] mb-2">CURRENT PHASE</p>
                      <h2 className="text-5xl dr-header italic">{intensity}</h2>
                    </motion.div>
                    <div className="grid grid-cols-1 gap-6 w-full">
                      <button onClick={() => handleDraw('Truth')} className="dr-button text-3xl py-6 border-[#00FFFF] text-[#00FFFF]">TRUTH BULLET</button>
                      <button onClick={() => handleDraw('Dare')} className="dr-button text-3xl py-6 border-[#FF00FF] text-[#FF00FF]">LIE BULLET</button>
                      <button onClick={() => setIntensity(null)} className="text-white/40 uppercase text-xs tracking-[4px] mt-4 hover:text-[#FF00FF] transition-colors">Abort Trial</button>
                    </div>
                  </div>
                ) : (
                  <motion.div initial={{ scale: 0.8, opacity: 0, rotateY: 90 }} animate={{ scale: 1, opacity: 1, rotateY: 0 }} className="dr-card space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="bg-[#FF00FF] text-white px-4 py-1 text-xl italic">ARGUMENT</span>
                      <span className="text-[#00FFFF] text-sm">#{history.length}</span>
                    </div>
                    <p className="text-3xl dr-prompt-text italic">"{prompt.text}"</p>
                    <div className="pt-4 border-t-2 border-[#FF00FF] border-dashed">
                      <p className="text-[#00FFFF] text-sm mb-1 tracking-widest">PUNISHMENT TIME</p>
                      <p className="text-xl dr-prompt-text opacity-90">{prompt.penalty}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-6">
                      <button onClick={() => setPrompt(null)} className="dr-button">REBUTTAL</button>
                      <button onClick={() => handleDraw(prompt.type)} className="dr-button active">SHOOT</button>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#00FFFF]"></div>
                    <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#FF00FF]"></div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'decks' && (
              <motion.div key="decks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                {!editingDeck ? (
                  <>
                    <div className="flex justify-between items-end border-b-2 border-[#FF00FF] pb-2">
                      <h2 className="text-3xl dr-header">EVIDENCE FORGE</h2>
                      <button onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })} className="dr-button text-xs">+ NEW FILE</button>
                    </div>
                    <div className="space-y-4">
                      {customDecks.map(deck => (
                        <div key={deck.id} className="dr-panel p-4 flex justify-between items-center">
                          <div>
                            <h3 className="text-xl text-[#00FFFF]">{deck.name || 'Untitled'}</h3>
                            <p className="text-[10px] opacity-60 tracking-widest">{deck.prompts.length} BULLETS LOADED</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => setEditingDeck(deck)} className="dr-button text-[10px]">EDIT</button>
                            <button onClick={() => deleteDeck(deck.id)} className="dr-button text-[10px] border-[#FF00FF] text-[#FF00FF]">WIPE</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="dr-panel p-6 space-y-6">
                    <div className="space-y-4">
                      <input className="dr-input w-full text-2xl" value={editingDeck.name} onChange={e => setEditingDeck({...editingDeck, name: e.target.value})} placeholder="FILE NAME" />
                      <textarea className="dr-input w-full text-sm h-24" value={editingDeck.description} onChange={e => setEditingDeck({...editingDeck, description: e.target.value})} placeholder="FILE DESCRIPTION" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl text-[#FF00FF]">BULLETS ({editingDeck.prompts.length})</h3>
                        <button onClick={addNewPromptToEditingDeck} className="dr-button text-[10px]">+ ADD</button>
                      </div>
                      <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                        {editingDeck.prompts.map(p => (
                          <div key={p.id} className="dr-card p-4 space-y-3 bg-black/50">
                            <div className="flex gap-2">
                              <select className="dr-input text-[10px]" value={p.type} onChange={e => updatePromptInEditingDeck(p.id, 'type', e.target.value)}>
                                <option>Truth</option><option>Dare</option>
                              </select>
                              <select className="dr-input text-[10px]" value={p.intensity} onChange={e => updatePromptInEditingDeck(p.id, 'intensity', e.target.value)}>
                                <option value={Intensity.SOFT}>SOFT</option><option value={Intensity.HOT}>HOT</option><option value={Intensity.VULGAR}>VULGAR</option>
                              </select>
                              <button onClick={() => removePromptFromEditingDeck(p.id)} className="text-[#FF00FF] ml-auto font-bold">X</button>
                            </div>
                            <input className="dr-input w-full text-sm" value={p.text} onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)} placeholder="BULLET CONTENT..." />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setEditingDeck(null)} className="dr-button flex-1">CANCEL</button>
                      <button onClick={() => saveDeck(editingDeck)} className="dr-button flex-1 active">SAVE</button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <h2 className="text-3xl dr-header border-b-2 border-[#00FFFF] pb-2">TRUTH BULLET LOG</h2>
                <div className="space-y-3">
                  {history.map((item, i) => (
                    <div key={i} className="dr-panel p-4 border-l-4 border-[#00FFFF]">
                      <div className="flex justify-between text-[#FF00FF] text-[10px] mb-2 tracking-[2px]">
                        <span>{item.type.toUpperCase()}</span>
                        <span>RECORD {history.length-i}</span>
                      </div>
                      <p className="text-lg dr-prompt-text italic">"{item.text}"</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'themes' && (
              <motion.div key="themes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <h2 className="text-3xl dr-header border-b-2 border-[#FF00FF] pb-2">REALITY SHIFT</h2>
                <div className="grid grid-cols-1 gap-4">
                  <button onClick={() => setTheme(Theme.PERSONA)} className="dr-button py-6 text-xl">PHANTOM THIEF</button>
                  <button onClick={() => setTheme(Theme.MINECRAFT)} className="dr-button py-6 text-xl">BLOCKY WORLD</button>
                  <button onClick={() => setTheme(Theme.DANGANRONPA)} className="dr-button py-6 text-xl active">KILLING HARMONY</button>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <h2 className="text-3xl dr-header border-b-2 border-[#FF00FF] pb-2">MONOKUMA SYSTEM</h2>
                <div className="dr-panel p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm tracking-widest">DESPAIR LEVEL</span><span className="text-[#FF00FF] font-bold">MAXIMUM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm tracking-widest">HOPE SYNC</span><span className="text-[#00FFFF] font-bold">CRITICAL</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm tracking-widest">EXECUTION STATUS</span><span className="text-[#FF00FF] font-bold animate-pulse">PENDING...</span>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-[10px] opacity-40 text-center uppercase tracking-[4px]">Puhuhu... Welcome to the end.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-black/90 border-t-2 border-[#FF00FF] h-20 z-50">
        <div className="flex justify-around items-center h-full px-2">
          {tabs.map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`dr-nav-btn flex-1 h-full font-bold ${activeTab === tab.id ? 'active' : ''}`}
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
