
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme } from './types';
import { useGameLogic } from './hooks/useGameLogic';

const STAGES = [
  { id: Intensity.SOFT, title: 'DREAM LAND', desc: 'SWEET DREAMS', color: '#FFB7C5', text: '#D21F3C' },
  { id: Intensity.HOT, title: 'STAR RIDE', desc: 'TWINKLE TWINKLE', color: '#FFF4BD', text: '#B8860B' },
  { id: Intensity.VULGAR, title: 'VOID SOUL', desc: 'DEEP PINK', color: '#FF69B4', text: '#FFFFFF' },
];

const KirbyApp: React.FC<{ logic: ReturnType<typeof useGameLogic> }> = ({ logic }) => {
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

  const [emotes, setEmotes] = useState<{ id: number, x: number, y: number, type: string, size: number, duration: number }[]>([]);

  useEffect(() => {
    const types = ['⭐', '💖', '☁️', '🍬', '🍭', '✨', '(>^_^)>', '<(^_^<)', 'v(^_^v)', '^(^_^)^', 'poyo!', 'POYO!'];
    const newEmotes = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      type: types[Math.floor(Math.random() * types.length)],
      size: Math.random() * 20 + 20,
      duration: Math.random() * 10 + 10
    }));
    setEmotes(newEmotes);
  }, []);

  const tabs = [
    { id: 'play', label: 'PLAY' },
    { id: 'decks', label: 'FORGE' },
    { id: 'history', label: 'LOGS' },
    { id: 'themes', label: 'THEME' },
    { id: 'settings', label: 'META' },
  ];

  return (
    <div className="kirby-theme h-screen w-screen flex flex-col bg-[#FFDEEF] text-[#D21F3C] overflow-hidden font-['Sniglet']">
      <style>{`
        .kirby-theme {
          background: linear-gradient(180deg, #FFDEEF 0%, #FFB7C5 100%);
          position: relative;
        }
        .kirby-panel {
          background: rgba(255, 255, 255, 0.8);
          border: 4px solid #FF69B4;
          border-radius: 30px;
          box-shadow: 0 8px 0px #FF69B4;
        }
        .kirby-button {
          background: #FFF;
          border: 3px solid #FF69B4;
          color: #FF69B4;
          padding: 10px 20px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 800;
          box-shadow: 0 4px 0px #FF69B4;
        }
        .kirby-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 0px #FF69B4;
          background: #FF69B4;
          color: #FFF;
        }
        .kirby-button.active {
          background: #FF69B4;
          color: #FFF;
          box-shadow: inset 0 4px 0px rgba(0,0,0,0.1);
          transform: translateY(2px);
        }
        .kirby-card {
          background: #FFF;
          border: 6px solid #FF69B4;
          border-radius: 40px;
          padding: 30px;
          box-shadow: 0 12px 0px #FF69B4;
          position: relative;
        }
        .kirby-header {
          font-family: 'Fredoka One', cursive;
          color: #FF69B4;
          text-shadow: 3px 3px 0px #FFF;
          letter-spacing: 2px;
        }
        .kirby-nav-btn {
          background: transparent;
          border: none;
          color: #FF69B4;
          font-weight: 800;
          font-size: 14px;
          transition: all 0.2s;
        }
        .kirby-nav-btn.active {
          color: #D21F3C;
          transform: scale(1.2);
          text-shadow: 0 0 10px #FFF;
        }
        .floating-emote {
          position: absolute;
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #FFDEEF;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #FF69B4;
          border-radius: 10px;
        }
      `}</style>

      {/* Floating Emotes */}
      {emotes.map(emote => (
        <div
          key={emote.id}
          className="floating-emote"
          style={{
            left: `${emote.x}%`,
            top: `${emote.y}%`,
            fontSize: `${emote.size}px`,
            animation: `float ${emote.duration}s ease-in-out infinite`
          }}
        >
          {emote.type}
        </div>
      ))}

      {/* Header */}
      <header className="p-6 flex justify-center items-center shrink-0 relative z-10">
        <h1 className="text-5xl kirby-header">KIRBY'S DREAM</h1>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-6 pb-24 relative z-10">
        <div className="max-w-md mx-auto h-full pt-4">
          <AnimatePresence mode="wait">
            {activeTab === 'play' && (
              <motion.div key="play" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="space-y-6">
                {!intensity && !prompt ? (
                  <div className="space-y-8">
                    <div className="kirby-panel p-6">
                      <h2 className="text-2xl mb-4 text-[#FF69B4] border-b-4 border-[#FF69B4] pb-2 font-bold">SELECT WORLD</h2>
                      <div className="grid grid-cols-1 gap-3">
                        <button onClick={() => setActiveDeckId('default')} className={`kirby-button text-xl ${activeDeckId === 'default' ? 'active' : ''}`}>
                          POPUPO LAND
                        </button>
                        {customDecks.map(deck => (
                          <button key={deck.id} onClick={() => setActiveDeckId(deck.id)} className={`kirby-button text-xl ${activeDeckId === deck.id ? 'active' : ''}`}>
                            {deck.name.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="kirby-panel p-6">
                      <h2 className="text-2xl mb-4 text-[#FF69B4] border-b-4 border-[#FF69B4] pb-2 font-bold">ADVENTURE LEVEL</h2>
                      <div className="grid grid-cols-1 gap-4">
                        {STAGES.map((stage) => (
                          <button 
                            key={stage.id} 
                            onClick={() => setIntensity(stage.id)}
                            className="kirby-button flex flex-col items-center py-4"
                            style={{ backgroundColor: stage.color, color: stage.text, borderColor: stage.text }}
                          >
                            <span className="text-3xl font-black">{stage.title}</span>
                            <span className="text-xs font-bold opacity-80">{stage.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : !prompt ? (
                  <div className="flex flex-col items-center gap-8 py-12">
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-center"
                    >
                      <p className="text-[#FF69B4] text-lg font-bold mb-2">CURRENT STAGE</p>
                      <h2 className="text-6xl kirby-header italic">{intensity}</h2>
                    </motion.div>
                    <div className="grid grid-cols-1 gap-6 w-full">
                      <button onClick={() => handleDraw('Truth')} className="kirby-button text-4xl py-8 bg-[#FFF4BD] border-[#B8860B] text-[#B8860B]">TRUTH</button>
                      <button onClick={() => handleDraw('Dare')} className="kirby-button text-4xl py-8 bg-[#FFB7C5] border-[#D21F3C] text-[#D21F3C]">DARE</button>
                      <button onClick={() => setIntensity(null)} className="text-[#FF69B4] font-bold uppercase text-sm tracking-widest mt-4 hover:underline">Go Back</button>
                    </div>
                  </div>
                ) : (
                  <motion.div initial={{ scale: 0.5, opacity: 0, rotate: -10 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} className="kirby-card space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="bg-[#FF69B4] text-white px-4 py-1 rounded-full text-xl font-bold">{prompt.type}</span>
                      <span className="text-[#FF69B4] font-bold">#{history.length}</span>
                    </div>
                    <p className="text-4xl font-bold leading-tight text-[#D21F3C]">"{prompt.text}"</p>
                    <div className="pt-4 border-t-4 border-[#FF69B4] border-dotted">
                      <p className="text-[#FF69B4] text-sm font-bold mb-1 uppercase tracking-widest">Penalty Time!</p>
                      <p className="text-2xl font-bold italic text-[#FF69B4]">{prompt.penalty}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-6">
                      <button onClick={() => setPrompt(null)} className="kirby-button">DONE</button>
                      <button onClick={() => handleDraw(prompt.type)} className="kirby-button active">AGAIN!</button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'decks' && (
              <motion.div key="decks" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                {!editingDeck ? (
                  <>
                    <div className="flex justify-between items-end border-b-4 border-[#FF69B4] pb-2">
                      <h2 className="text-4xl kirby-header">FORGE</h2>
                      <button onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })} className="kirby-button text-sm">+ NEW</button>
                    </div>
                    <div className="space-y-4">
                      {customDecks.length === 0 ? (
                        <div className="py-12 text-center text-[#FF69B4] italic text-2xl">NO CUSTOM DECKS YET!</div>
                      ) : (
                        customDecks.map(deck => (
                          <div key={deck.id} className="kirby-panel p-4 flex justify-between items-center">
                            <div>
                              <h3 className="text-2xl font-bold text-[#FF69B4]">{deck.name || 'Untitled'}</h3>
                              <p className="text-xs font-bold opacity-60">{deck.prompts.length} CARDS</p>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => setEditingDeck(deck)} className="kirby-button text-xs">EDIT</button>
                              <button onClick={() => deleteDeck(deck.id)} className="kirby-button text-xs border-red-400 text-red-400">ERASE</button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </>
                ) : (
                  <div className="kirby-panel p-6 space-y-6">
                    <div className="space-y-4">
                      <input className="w-full bg-white border-4 border-[#FF69B4] rounded-2xl p-3 text-2xl focus:outline-none text-[#FF69B4] font-bold" value={editingDeck.name} onChange={e => setEditingDeck({...editingDeck, name: e.target.value})} placeholder="DECK NAME" />
                      <textarea className="w-full bg-white border-4 border-[#FF69B4] rounded-2xl p-3 text-sm h-24 focus:outline-none text-[#FF69B4] font-bold" value={editingDeck.description} onChange={e => setEditingDeck({...editingDeck, description: e.target.value})} placeholder="DESCRIPTION" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-[#FF69B4]">CARDS ({editingDeck.prompts.length})</h3>
                        <button onClick={addNewPromptToEditingDeck} className="kirby-button text-xs">+ ADD</button>
                      </div>
                      <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                        {editingDeck.prompts.map(p => (
                          <div key={p.id} className="kirby-panel p-4 space-y-3 bg-white/50">
                            <div className="flex gap-2">
                              <select className="bg-white border-2 border-[#FF69B4] rounded-lg text-xs p-1 font-bold text-[#FF69B4]" value={p.type} onChange={e => updatePromptInEditingDeck(p.id, 'type', e.target.value)}>
                                <option>Truth</option><option>Dare</option>
                              </select>
                              <select className="bg-white border-2 border-[#FF69B4] rounded-lg text-xs p-1 font-bold text-[#FF69B4]" value={p.intensity} onChange={e => updatePromptInEditingDeck(p.id, 'intensity', e.target.value)}>
                                <option value={Intensity.SOFT}>SOFT</option><option value={Intensity.HOT}>HOT</option><option value={Intensity.VULGAR}>VULGAR</option>
                              </select>
                              <button onClick={() => removePromptFromEditingDeck(p.id)} className="text-red-500 ml-auto font-bold">REMOVE</button>
                            </div>
                            <input className="w-full bg-white border-b-2 border-[#FF69B4] text-sm p-1 focus:outline-none text-[#FF69B4] font-bold" value={p.text} onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)} placeholder="PROMPT TEXT" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setEditingDeck(null)} className="kirby-button flex-1">CANCEL</button>
                      <button onClick={() => saveDeck(editingDeck)} className="kirby-button flex-1 active">SAVE</button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <h2 className="text-4xl kirby-header border-b-4 border-[#FF69B4] pb-2">ARCHIVES</h2>
                <div className="space-y-3">
                  {history.length === 0 ? (
                    <div className="py-12 text-center text-[#FF69B4] italic text-2xl">NO LOGS YET!</div>
                  ) : (
                    history.map((item, i) => (
                      <div key={i} className="kirby-panel p-4 border-l-8 border-[#FF69B4]">
                        <div className="flex justify-between text-[#FF69B4] text-xs mb-2 font-bold tracking-widest">
                          <span>{item.type.toUpperCase()}</span>
                          <span>ENTRY {history.length-i}</span>
                        </div>
                        <p className="text-xl font-bold italic">"{item.text}"</p>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'themes' && (
              <motion.div key="themes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <h2 className="text-4xl kirby-header border-b-4 border-[#FF69B4] pb-2">REALITY</h2>
                <div className="grid grid-cols-1 gap-4">
                  <button onClick={() => setTheme(Theme.PERSONA)} className="kirby-button py-6 text-2xl">PHANTOM THIEF</button>
                  <button onClick={() => setTheme(Theme.MINECRAFT)} className="kirby-button py-6 text-2xl">BLOCKY WORLD</button>
                  <button onClick={() => setTheme(Theme.DANGANRONPA)} className="kirby-button py-6 text-2xl">KILLING HARMONY</button>
                  <button onClick={() => setTheme(Theme.OMORI)} className="kirby-button py-6 text-2xl">DREAM WORLD</button>
                  <button onClick={() => setTheme(Theme.KIRBY)} className="kirby-button py-6 text-2xl active">KIRBY'S DREAM</button>
                  <button onClick={() => setTheme(Theme.SANRIO)} className="kirby-button py-6 text-2xl">SWEET WORLD</button>
                  <button onClick={() => setTheme(Theme.POKEMON)} className="kirby-button py-6 text-2xl">POKÉMON WORLD</button>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <h2 className="text-4xl kirby-header border-b-4 border-[#FF69B4] pb-2">SYSTEM</h2>
                <div className="kirby-panel p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">HAPPINESS</span><span className="text-[#FF69B4] font-black">100%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">HUNGER</span><span className="text-[#FF69B4] font-black">ALWAYS</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">POWER</span><span className="text-[#FF69B4] font-black animate-pulse">COPYING...</span>
                  </div>
                  <div className="pt-4 border-t-4 border-[#FF69B4] border-dotted">
                    <p className="text-sm font-bold text-center text-[#FF69B4]">Poyo! Everything is super cute!</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/90 border-t-4 border-[#FF69B4] h-20 z-50">
        <div className="flex justify-around items-center h-full px-2">
          {tabs.map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`kirby-nav-btn flex-1 h-full ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default KirbyApp;
