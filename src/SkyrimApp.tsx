import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme } from './types';
import { useGameLogic } from './hooks/useGameLogic';

const STAGES = [
  { id: Intensity.SOFT, title: 'NOVICE', desc: 'Apprentice Level', color: '#FFFFFF', text: '#FFFFFF' },
  { id: Intensity.HOT, title: 'ADEPT', desc: 'Expert Level', color: '#FFD700', text: '#FFFFFF' },
  { id: Intensity.VULGAR, title: 'MASTER', desc: 'Legendary Level', color: '#FF4500', text: '#FFFFFF' },
];

const SkyrimApp: React.FC<{ logic: ReturnType<typeof useGameLogic> }> = ({ logic }) => {
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
    { id: 'play', label: 'QUESTS', icon: '⚔️' },
    { id: 'decks', label: 'ITEMS', icon: '🎒' },
    { id: 'history', label: 'MAGIC', icon: '✨' },
    { id: 'themes', label: 'MAP', icon: '🗺️' },
    { id: 'settings', label: 'SYSTEM', icon: '⚙️' },
  ];

  return (
    <div className="skyrim-theme h-[100dvh] w-screen flex flex-col bg-black text-white overflow-hidden font-['Josefin_Sans'] relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Josefin+Sans:wght@300;400;600&display=swap');

        .skyrim-theme {
          font-family: 'Josefin Sans', sans-serif;
          background: #0a0a0a;
        }

        .skyrim-font-title {
          font-family: 'Cinzel', serif;
        }

        .skyrim-smoke {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 50% 50%, rgba(20, 30, 40, 0.8), rgba(0, 0, 0, 1)),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
          z-index: 0;
        }

        .compass-bar {
          background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
          border-bottom: 1px solid rgba(255,255,255,0.2);
          position: relative;
        }
        
        .compass-marker {
          width: 2px;
          height: 8px;
          background: rgba(255,255,255,0.3);
        }

        .skyrim-btn {
          background: transparent;
          color: #ccc;
          text-align: left;
          padding: 12px 24px;
          font-size: 1.2rem;
          font-weight: 300;
          text-transform: uppercase;
          letter-spacing: 2px;
          transition: all 0.2s;
          position: relative;
        }
        
        .skyrim-btn:hover, .skyrim-btn.active {
          color: #fff;
          text-shadow: 0 0 10px rgba(255,255,255,0.5);
        }

        .skyrim-btn.active::before {
          content: '◆';
          position: absolute;
          left: 8px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.8rem;
          color: #fff;
        }

        .skyrim-panel {
          background: rgba(0, 0, 0, 0.6);
          border-top: 2px solid rgba(255,255,255,0.1);
          border-bottom: 2px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(4px);
        }

        .skyrim-input {
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.3);
          color: white;
          font-family: 'Josefin Sans', sans-serif;
          font-size: 1.2rem;
          padding: 8px;
          width: 100%;
          outline: none;
        }
        .skyrim-input:focus {
          border-bottom: 1px solid white;
        }

        .quest-marker {
          width: 0; 
          height: 0; 
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 10px solid white;
        }

        /* Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.3);
        }
      `}</style>

      <div className="skyrim-smoke"></div>

      {/* Compass Header */}
      <header className="p-4 relative z-10 flex flex-col items-center">
        <div className="w-full max-w-lg h-8 border-b border-white/20 flex justify-between items-end px-4 mb-2">
          <span className="text-xs tracking-widest opacity-50">W</span>
          <div className="flex gap-8">
            <div className="compass-marker h-3"></div>
            <div className="compass-marker h-2"></div>
            <div className="compass-marker h-3"></div>
          </div>
          <div className="quest-marker mb-[-5px]"></div>
          <div className="flex gap-8">
            <div className="compass-marker h-3"></div>
            <div className="compass-marker h-2"></div>
            <div className="compass-marker h-3"></div>
          </div>
          <span className="text-xs tracking-widest opacity-50">E</span>
        </div>
        <h1 className="skyrim-font-title text-2xl tracking-[4px] text-white/90 drop-shadow-lg border-b border-white/10 pb-1 px-8">
          SKYRIM
        </h1>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-4 pb-24 relative z-10 custom-scrollbar">
        <div className="max-w-2xl mx-auto h-full pt-4 flex flex-col">
          <AnimatePresence mode="wait">
            {activeTab === 'play' && (
              <motion.div key="play" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col">
                {!intensity && !prompt ? (
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Left Column: Menu */}
                    <div className="space-y-6">
                      <div>
                        <h2 className="skyrim-font-title text-xl text-white/70 mb-4 border-b border-white/20 pb-2">ACTIVE QUESTS</h2>
                        <div className="flex flex-col">
                          <button 
                            onClick={() => setActiveDeckId('default')}
                            className={`skyrim-btn ${activeDeckId === 'default' ? 'active' : ''}`}
                          >
                            Standard Adventure
                          </button>
                          {customDecks.map(deck => (
                            <button 
                              key={deck.id}
                              onClick={() => setActiveDeckId(deck.id)}
                              className={`skyrim-btn ${activeDeckId === deck.id ? 'active' : ''}`}
                            >
                              {deck.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Details/Difficulty */}
                    <div className="skyrim-panel p-6 min-h-[300px] flex flex-col">
                      <h2 className="skyrim-font-title text-xl text-white/70 mb-6 text-center">SELECT DIFFICULTY</h2>
                      <div className="flex-1 flex flex-col justify-center gap-4">
                        {STAGES.map((stage) => (
                          <button 
                            key={stage.id} 
                            onClick={() => setIntensity(stage.id)}
                            className="group flex items-center justify-between p-2 hover:bg-white/5 transition-colors"
                          >
                            <div className="flex flex-col text-left">
                              <span className="skyrim-font-title text-lg group-hover:text-yellow-100 transition-colors">{stage.title}</span>
                              <span className="text-xs uppercase tracking-widest opacity-60">{stage.desc}</span>
                            </div>
                            <div className="w-2 h-2 bg-white/50 rotate-45 group-hover:bg-white transition-colors"></div>
                          </button>
                        ))}
                      </div>
                      <div className="mt-6 pt-4 border-t border-white/10 text-center">
                        <p className="text-sm italic opacity-60">
                          "Choose your path, Dragonborn."
                        </p>
                      </div>
                    </div>
                  </div>
                ) : !prompt ? (
                  <div className="flex-1 flex flex-col items-center justify-center relative">
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                      <svg viewBox="0 0 100 100" className="w-96 h-96 animate-spin-slow">
                        <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="none" stroke="white" strokeWidth="1" />
                        <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="1" />
                      </svg>
                    </div>

                    <h2 className="skyrim-font-title text-4xl mb-2 tracking-widest">{intensity}</h2>
                    <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mb-12"></div>

                    <div className="flex gap-12">
                      <button onClick={() => handleDraw('Truth')} className="group flex flex-col items-center gap-2">
                        <div className="w-16 h-16 border border-white/30 rotate-45 flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all">
                          <span className="text-2xl -rotate-45">👁️</span>
                        </div>
                        <span className="skyrim-font-title text-sm tracking-widest mt-4 group-hover:text-yellow-100">TRUTH</span>
                      </button>
                      
                      <button onClick={() => handleDraw('Dare')} className="group flex flex-col items-center gap-2">
                        <div className="w-16 h-16 border border-white/30 rotate-45 flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all">
                          <span className="text-2xl -rotate-45">⚔️</span>
                        </div>
                        <span className="skyrim-font-title text-sm tracking-widest mt-4 group-hover:text-yellow-100">DARE</span>
                      </button>
                    </div>

                    <button onClick={() => setIntensity(null)} className="mt-16 text-xs uppercase tracking-[3px] opacity-50 hover:opacity-100 transition-opacity">
                      [ TAB ] Cancel
                    </button>
                  </div>
                ) : (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full">
                    <div className="w-full border-t-2 border-b-2 border-white/20 bg-black/80 backdrop-blur-md p-8 relative">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black px-4">
                        <span className="skyrim-font-title text-yellow-100 tracking-widest text-sm border border-white/20 px-2 py-1">QUEST STARTED</span>
                      </div>

                      <div className="text-center space-y-6">
                        <h3 className="skyrim-font-title text-2xl text-white tracking-wide border-b border-white/10 pb-4">
                          {prompt.type}
                        </h3>
                        <p className="text-xl font-light leading-relaxed">
                          {prompt.text}
                        </p>
                        
                        <div className="flex items-center justify-center gap-4 text-sm opacity-70 pt-4">
                          <span className="uppercase tracking-widest text-xs">Objective:</span>
                          <span className="italic text-red-300">{prompt.penalty}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-8 mt-8">
                      <button onClick={() => setPrompt(null)} className="skyrim-btn text-sm border border-white/20 hover:bg-white/10">
                        COMPLETE
                      </button>
                      <button onClick={() => handleDraw(prompt.type)} className="skyrim-btn text-sm border border-white/20 hover:bg-white/10">
                        REROLL
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'decks' && (
              <motion.div key="decks" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex-1">
                {!editingDeck ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
                    <div className="md:col-span-1 border-r border-white/10 pr-4">
                      <h2 className="skyrim-font-title text-2xl mb-6 px-4">INVENTORY</h2>
                      <div className="flex flex-col">
                        <button onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })} className="skyrim-btn text-yellow-100">
                          + CRAFT NEW ITEM
                        </button>
                        <div className="h-px bg-white/20 my-2 mx-4"></div>
                        {customDecks.map(deck => (
                          <div key={deck.id} className="flex justify-between items-center pr-4 group">
                            <button onClick={() => setEditingDeck(deck)} className="skyrim-btn flex-1 truncate">
                              {deck.name || 'Iron Dagger'}
                            </button>
                            <button onClick={() => deleteDeck(deck.id)} className="opacity-0 group-hover:opacity-50 hover:!opacity-100 text-xs uppercase tracking-widest">
                              DROP
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-2 flex items-center justify-center opacity-30">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🎒</div>
                        <p className="skyrim-font-title tracking-widest">SELECT AN ITEM TO INSPECT</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-xl mx-auto space-y-8">
                    <div className="border-b border-white/20 pb-4 flex justify-between items-end">
                      <h2 className="skyrim-font-title text-3xl">ENCHANTING</h2>
                      <span className="text-xs tracking-widest opacity-50">ARCANE ENCHANTER</span>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="text-xs uppercase tracking-widest opacity-50 block mb-2">Item Name</label>
                        <input className="skyrim-input text-xl" value={editingDeck.name} onChange={e => setEditingDeck({...editingDeck, name: e.target.value})} placeholder="Name your creation..." />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-widest opacity-50 block mb-2">Effect Description</label>
                        <textarea className="skyrim-input text-sm h-24 resize-none" value={editingDeck.description} onChange={e => setEditingDeck({...editingDeck, description: e.target.value})} placeholder="What does this item do?" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <label className="text-xs uppercase tracking-widest opacity-50">Effects ({editingDeck.prompts.length})</label>
                          <button onClick={addNewPromptToEditingDeck} className="text-xs uppercase tracking-widest hover:text-yellow-100 border border-white/20 px-2 py-1">
                            + Add Effect
                          </button>
                        </div>
                        <div className="max-h-[30vh] overflow-y-auto custom-scrollbar space-y-2">
                          {editingDeck.prompts.map(p => (
                            <div key={p.id} className="bg-white/5 p-3 flex gap-4 items-start border border-white/10">
                              <select className="bg-black border border-white/20 text-xs uppercase p-1 outline-none" value={p.type} onChange={e => updatePromptInEditingDeck(p.id, 'type', e.target.value)}>
                                <option>Truth</option><option>Dare</option>
                              </select>
                              <input className="bg-transparent border-b border-white/10 flex-1 text-sm outline-none focus:border-white/50" value={p.text} onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)} placeholder="..." />
                              <button onClick={() => removePromptFromEditingDeck(p.id)} className="text-xs opacity-50 hover:opacity-100">✕</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-6 pt-4 border-t border-white/10">
                      <button onClick={() => setEditingDeck(null)} className="text-sm uppercase tracking-widest opacity-70 hover:opacity-100">Cancel</button>
                      <button onClick={() => saveDeck(editingDeck)} className="text-sm uppercase tracking-widest font-bold hover:text-yellow-100">Craft Item</button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1">
                <div className="max-w-2xl mx-auto">
                  <h2 className="skyrim-font-title text-2xl mb-6 border-b border-white/20 pb-2">COMPLETED QUESTS</h2>
                  <div className="space-y-4">
                    {history.map((item, i) => (
                      <div key={i} className="flex gap-4 items-start opacity-80 hover:opacity-100 transition-opacity">
                        <div className="mt-1 w-2 h-2 bg-white/50 rotate-45 shrink-0"></div>
                        <div>
                          <p className="text-lg font-light">"{item.text}"</p>
                          <div className="flex gap-4 mt-1">
                            <span className="text-xs uppercase tracking-widest opacity-50">{item.type}</span>
                            <span className="text-xs uppercase tracking-widest opacity-50">Level {history.length - i}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {history.length === 0 && (
                      <div className="text-center py-12 opacity-30 italic">No quests completed yet.</div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'themes' && (
              <motion.div key="themes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="skyrim-font-title text-3xl mb-12">WORLD MAP</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                      { id: Theme.PERSONA, label: 'TOKYO' },
                      { id: Theme.MINECRAFT, label: 'OVERWORLD' },
                      { id: Theme.DANGANRONPA, label: 'HOPE\'S PEAK' },
                      { id: Theme.OMORI, label: 'HEADSPACE' },
                      { id: Theme.KIRBY, label: 'POPSTAR' },
                      { id: Theme.POKEMON, label: 'KANTO' },
                      { id: Theme.ANIMAL_CROSSING, label: 'PARADISE' },
                      { id: Theme.SKYRIM, label: 'SKYRIM' },
                    ].map(t => (
                      <button 
                        key={t.id}
                        onClick={() => setTheme(t.id as Theme)}
                        className={`group relative p-6 border border-white/10 hover:border-white/50 transition-all ${theme === t.id ? 'bg-white/10 border-white' : ''}`}
                      >
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black px-2">
                          <div className="w-2 h-2 bg-white rotate-45 group-hover:bg-yellow-100 transition-colors"></div>
                        </div>
                        <span className="skyrim-font-title text-xl tracking-widest group-hover:text-yellow-100 transition-colors">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1">
                <div className="max-w-xl mx-auto">
                  <h2 className="skyrim-font-title text-2xl mb-6 border-b border-white/20 pb-2">SYSTEM</h2>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center py-3 hover:bg-white/5 px-2 cursor-pointer group">
                      <span className="skyrim-font-title text-lg group-hover:text-yellow-100">SAVE GAME</span>
                      <span className="text-xs uppercase tracking-widest opacity-50">Auto-save on</span>
                    </div>
                    <div className="flex justify-between items-center py-3 hover:bg-white/5 px-2 cursor-pointer group">
                      <span className="skyrim-font-title text-lg group-hover:text-yellow-100">LOAD GAME</span>
                      <span className="text-xs uppercase tracking-widest opacity-50">No saves found</span>
                    </div>
                    <div className="flex justify-between items-center py-3 hover:bg-white/5 px-2 cursor-pointer group">
                      <span className="skyrim-font-title text-lg group-hover:text-yellow-100">SETTINGS</span>
                      <span className="text-xs uppercase tracking-widest opacity-50">Gameplay</span>
                    </div>
                    <button onClick={() => logic.setView('menu')} className="w-full flex justify-between items-center py-3 hover:bg-white/5 px-2 cursor-pointer group text-left">
                      <span className="skyrim-font-title text-lg group-hover:text-yellow-100">QUIT</span>
                      <span className="text-xs uppercase tracking-widest opacity-50">To Main Menu</span>
                    </button>
                  </div>
                  
                  <div className="mt-12 flex justify-center opacity-30">
                    <svg viewBox="0 0 100 100" className="w-16 h-16">
                      <path d="M50 10 C 20 10 10 40 10 50 C 10 80 40 90 50 90 C 60 90 90 80 90 50 C 90 40 80 10 50 10" fill="none" stroke="white" strokeWidth="2" />
                      <path d="M50 20 L50 80 M20 50 L80 50" fill="none" stroke="white" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation Footer */}
      <nav className="fixed bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent z-50 flex justify-center items-center border-t border-white/10">
        <div className="flex gap-12">
          {tabs.map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`text-sm uppercase tracking-widest transition-all ${activeTab === tab.id ? 'text-white font-bold scale-110 drop-shadow-[0_0_5px_white]' : 'text-white/50 hover:text-white/80'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default SkyrimApp;
