
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

  const [emotes, setEmotes] = useState<{ id: number, x: number, y: number, type: string, size: number, duration: number, delay: number }[]>([]);

  useEffect(() => {
    const types = ['⭐', '💖', '☁️', '🍬', '🍭', '✨', '(>^_^)>', '<(^_^<)', 'v(^_^v)', '^(^_^)^', 'poyo!', 'POYO!'];
    const newEmotes = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      type: types[Math.floor(Math.random() * types.length)],
      size: Math.random() * 30 + 20,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5
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
          background: rgba(255, 255, 255, 0.9);
          border: 6px solid #FF69B4;
          border-radius: 40px;
          box-shadow: 0 12px 0px #FF69B4, 0 15px 30px rgba(255, 105, 180, 0.3);
        }
        .kirby-button {
          background: #FFF;
          border: 4px solid #FF69B4;
          color: #FF69B4;
          padding: 12px 24px;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          font-weight: 800;
          box-shadow: 0 6px 0px #FF69B4;
          position: relative;
          overflow: hidden;
        }
        .kirby-button:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 10px 0px #FF69B4;
          background: #FF69B4;
          color: #FFF;
        }
        .kirby-button:active {
          transform: translateY(2px);
          box-shadow: 0 2px 0px #FF69B4;
        }
        .kirby-button.active {
          background: #FF69B4;
          color: #FFF;
          box-shadow: inset 0 6px 0px rgba(0,0,0,0.1);
        }
        .kirby-card {
          background: #FFF;
          border: 8px solid #FF69B4;
          border-radius: 50px;
          padding: 40px;
          box-shadow: 0 15px 0px #FF69B4, 0 20px 40px rgba(255, 105, 180, 0.4);
          position: relative;
        }
        .kirby-header {
          font-family: 'Fredoka One', cursive;
          color: #FF69B4;
          text-shadow: 4px 4px 0px #FFF, 6px 6px 0px rgba(255, 105, 180, 0.2);
          letter-spacing: 3px;
        }
        .kirby-nav-btn {
          background: transparent;
          border: none;
          color: #FF69B4;
          font-weight: 800;
          font-size: 16px;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .kirby-nav-btn.active {
          color: #D21F3C;
          transform: scale(1.3) translateY(-5px);
          text-shadow: 0 0 15px #FFF;
        }
        .floating-emote {
          position: absolute;
          pointer-events: none;
          z-index: 0;
          opacity: 0.5;
          filter: drop-shadow(0 5px 10px rgba(0,0,0,0.1));
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          50% { transform: translateY(-30px) rotate(15deg) scale(1.1); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #FFDEEF;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #FF69B4;
          border-radius: 20px;
          border: 3px solid #FFDEEF;
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
            animation: `float ${emote.duration}s ease-in-out ${emote.delay}s infinite`
          }}
        >
          {emote.type}
        </div>
      ))}

      {/* Header */}
      <header className="p-8 flex justify-center items-center shrink-0 relative z-10">
        <h1 className="text-6xl kirby-header italic">KIRBY'S DREAM</h1>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-6 pb-24 relative z-10">
        <div className="max-w-md mx-auto h-full pt-4">
          <AnimatePresence mode="wait">
            {activeTab === 'play' && (
              <motion.div key="play" initial={{ opacity: 0, scale: 0.8, rotate: -5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.8 }} className="space-y-8">
                {!intensity && !prompt ? (
                  <div className="space-y-10">
                    <div className="kirby-panel p-8">
                      <h2 className="text-3xl mb-6 text-[#FF69B4] border-b-6 border-[#FF69B4]/20 pb-3 font-black tracking-tight">SELECT WORLD</h2>
                      <div className="grid grid-cols-1 gap-4">
                        <button onClick={() => setActiveDeckId('default')} className={`kirby-button text-2xl py-4 ${activeDeckId === 'default' ? 'active' : ''}`}>
                          POPUPO LAND
                        </button>
                        {customDecks.map(deck => (
                          <button key={deck.id} onClick={() => setActiveDeckId(deck.id)} className={`kirby-button text-2xl py-4 ${activeDeckId === deck.id ? 'active' : ''}`}>
                            {deck.name.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="kirby-panel p-8">
                      <h2 className="text-3xl mb-6 text-[#FF69B4] border-b-6 border-[#FF69B4]/20 pb-3 font-black tracking-tight">ADVENTURE LEVEL</h2>
                      <div className="grid grid-cols-1 gap-5">
                        {STAGES.map((stage) => (
                          <button 
                            key={stage.id} 
                            onClick={() => setIntensity(stage.id)}
                            className="kirby-button flex flex-col items-center py-6"
                            style={{ backgroundColor: stage.color, color: stage.text, borderColor: stage.text }}
                          >
                            <span className="text-4xl font-black italic">{stage.title}</span>
                            <span className="text-sm font-bold opacity-80 mt-1">{stage.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : !prompt ? (
                  <div className="flex flex-col items-center gap-12 py-16">
                    <motion.div 
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-center"
                    >
                      <p className="text-[#FF69B4] text-xl font-black mb-4 tracking-widest uppercase">CURRENT STAGE</p>
                      <h2 className="text-8xl kirby-header italic leading-none">{intensity}</h2>
                    </motion.div>
                    <div className="grid grid-cols-1 gap-8 w-full">
                      <button onClick={() => handleDraw('Truth')} className="kirby-button text-5xl py-10 bg-[#FFF4BD] border-[#B8860B] text-[#B8860B]">TRUTH</button>
                      <button onClick={() => handleDraw('Dare')} className="kirby-button text-5xl py-10 bg-[#FFB7C5] border-[#D21F3C] text-[#D21F3C]">DARE</button>
                      <button onClick={() => setIntensity(null)} className="text-[#FF69B4] font-black uppercase text-lg tracking-[6px] mt-8 hover:underline transition-all">Go Back</button>
                    </div>
                  </div>
                ) : (
                  <motion.div initial={{ scale: 0.5, opacity: 0, rotate: -20 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} className="kirby-card space-y-8">
                    <div className="flex justify-between items-center border-b-6 border-[#FF69B4]/10 pb-6">
                      <span className="bg-[#FF69B4] text-white px-6 py-2 rounded-full text-2xl font-black italic">{prompt.type}</span>
                      <span className="text-[#FF69B4] font-black text-xl"># {history.length}</span>
                    </div>
                    <p className="text-5xl font-black leading-[1.1] text-[#D21F3C] italic">"{prompt.text}"</p>
                    <div className="pt-6 border-t-6 border-[#FF69B4] border-dotted">
                      <p className="text-[#FF69B4] text-sm font-black mb-2 uppercase tracking-[4px]">Penalty Time!</p>
                      <p className="text-3xl font-black italic text-[#FF69B4] leading-tight">{prompt.penalty}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6 pt-8">
                      <button onClick={() => setPrompt(null)} className="kirby-button text-xl">DONE</button>
                      <button onClick={() => handleDraw(prompt.type)} className="kirby-button active text-xl">AGAIN!</button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'decks' && (
              <motion.div key="decks" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-8">
                {!editingDeck ? (
                  <>
                    <div className="flex justify-between items-end border-b-6 border-[#FF69B4] pb-4">
                      <h2 className="text-5xl kirby-header italic">FORGE</h2>
                      <button onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })} className="kirby-button text-sm font-black">+ NEW</button>
                    </div>
                    <div className="space-y-5">
                      {customDecks.length === 0 ? (
                        <div className="py-20 text-center text-[#FF69B4] italic text-3xl font-black opacity-40">NO CUSTOM DECKS YET!</div>
                      ) : (
                        customDecks.map(deck => (
                          <div key={deck.id} className="kirby-panel p-6 flex justify-between items-center hover:scale-[1.02] transition-transform">
                            <div>
                              <h3 className="text-3xl font-black text-[#FF69B4] italic">{deck.name || 'Untitled'}</h3>
                              <p className="text-sm font-bold opacity-60 mt-1">{deck.prompts.length} CARDS LOADED</p>
                            </div>
                            <div className="flex gap-3">
                              <button onClick={() => setEditingDeck(deck)} className="kirby-button text-xs">EDIT</button>
                              <button onClick={() => deleteDeck(deck.id)} className="kirby-button text-xs border-red-400 text-red-400">ERASE</button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </>
                ) : (
                  <div className="kirby-panel p-10 space-y-8">
                    <div className="space-y-6">
                      <input className="w-full bg-white border-6 border-[#FF69B4] rounded-3xl p-5 text-3xl focus:outline-none text-[#FF69B4] font-black italic" value={editingDeck.name} onChange={e => setEditingDeck({...editingDeck, name: e.target.value})} placeholder="DECK NAME" />
                      <textarea className="w-full bg-white border-6 border-[#FF69B4] rounded-3xl p-5 text-lg h-32 focus:outline-none text-[#FF69B4] font-bold" value={editingDeck.description} onChange={e => setEditingDeck({...editingDeck, description: e.target.value})} placeholder="DESCRIPTION" />
                    </div>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-3xl font-black text-[#FF69B4] italic">CARDS ({editingDeck.prompts.length})</h3>
                        <button onClick={addNewPromptToEditingDeck} className="kirby-button text-xs">+ ADD</button>
                      </div>
                      <div className="space-y-5 max-h-[400px] overflow-y-auto pr-3 custom-scrollbar">
                        {editingDeck.prompts.map(p => (
                          <div key={p.id} className="kirby-panel p-6 space-y-4 bg-white/50 border-[#FF69B4]/30">
                            <div className="flex gap-3">
                              <select className="bg-white border-4 border-[#FF69B4] rounded-2xl text-xs p-2 font-black text-[#FF69B4]" value={p.type} onChange={e => updatePromptInEditingDeck(p.id, 'type', e.target.value)}>
                                <option>Truth</option><option>Dare</option>
                              </select>
                              <select className="bg-white border-4 border-[#FF69B4] rounded-2xl text-xs p-2 font-black text-[#FF69B4]" value={p.intensity} onChange={e => updatePromptInEditingDeck(p.id, 'intensity', e.target.value)}>
                                <option value={Intensity.SOFT}>SOFT</option><option value={Intensity.HOT}>HOT</option><option value={Intensity.VULGAR}>VULGAR</option>
                              </select>
                              <button onClick={() => removePromptFromEditingDeck(p.id)} className="text-red-500 ml-auto font-black text-xl hover:scale-125 transition-transform">×</button>
                            </div>
                            <input className="w-full bg-white border-b-4 border-[#FF69B4] text-lg p-2 focus:outline-none text-[#FF69B4] font-bold italic" value={p.text} onChange={e => updatePromptInEditingDeck(p.text, 'text', e.target.value)} placeholder="PROMPT TEXT" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={() => setEditingDeck(null)} className="kirby-button flex-1 text-xl">CANCEL</button>
                      <button onClick={() => saveDeck(editingDeck)} className="kirby-button flex-1 active text-xl">SAVE</button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                <h2 className="text-5xl kirby-header italic border-b-6 border-[#FF69B4] pb-4">ARCHIVES</h2>
                <div className="space-y-5">
                  {history.length === 0 ? (
                    <div className="py-20 text-center text-[#FF69B4] italic text-3xl font-black opacity-40">NO LOGS YET!</div>
                  ) : (
                    history.map((item, i) => (
                      <div key={i} className="kirby-panel p-6 border-l-12 border-[#FF69B4]">
                        <div className="flex justify-between text-[#FF69B4] text-sm mb-3 font-black tracking-[4px] uppercase">
                          <span>{item.type}</span>
                          <span>ENTRY {history.length-i}</span>
                        </div>
                        <p className="text-3xl font-black italic text-[#D21F3C]">"{item.text}"</p>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'themes' && (
              <motion.div key="themes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                <h2 className="text-5xl kirby-header italic border-b-6 border-[#FF69B4] pb-4">REALITY</h2>
                <div className="grid grid-cols-1 gap-5">
                  <button onClick={() => setTheme(Theme.PERSONA)} className="kirby-button py-8 text-3xl">PHANTOM THIEF</button>
                  <button onClick={() => setTheme(Theme.MINECRAFT)} className="kirby-button py-8 text-3xl">BLOCKY WORLD</button>
                  <button onClick={() => setTheme(Theme.DANGANRONPA)} className="kirby-button py-8 text-3xl">KILLING HARMONY</button>
                  <button onClick={() => setTheme(Theme.OMORI)} className="kirby-button py-8 text-3xl">DREAM WORLD</button>
                  <button onClick={() => setTheme(Theme.KIRBY)} className="kirby-button py-8 text-3xl active">KIRBY'S DREAM</button>
                  <button onClick={() => setTheme(Theme.SANRIO)} className="kirby-button py-8 text-3xl">SWEET WORLD</button>
                  <button onClick={() => setTheme(Theme.POKEMON)} className="kirby-button py-8 text-3xl">POKÉMON WORLD</button>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                <h2 className="text-5xl kirby-header italic border-b-6 border-[#FF69B4] pb-4">SYSTEM</h2>
                <div className="kirby-panel p-10 space-y-8">
                  <div className="flex justify-between items-center text-2xl">
                    <span className="font-black opacity-60">HAPPINESS</span><span className="text-[#FF69B4] font-black text-3xl">100%</span>
                  </div>
                  <div className="flex justify-between items-center text-2xl">
                    <span className="font-black opacity-60">HUNGER</span><span className="text-[#FF69B4] font-black text-3xl">ALWAYS</span>
                  </div>
                  <div className="flex justify-between items-center text-2xl">
                    <span className="font-black opacity-60">POWER</span><span className="text-[#FF69B4] font-black text-3xl animate-pulse italic">COPYING...</span>
                  </div>
                  <div className="pt-8 border-t-6 border-[#FF69B4] border-dotted">
                    <p className="text-lg font-black text-center text-[#FF69B4] italic">Poyo! Everything is super cute!</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/95 border-t-8 border-[#FF69B4] h-24 z-50 shadow-[0_-15px_40px_rgba(255,105,180,0.3)]">
        <div className="flex justify-around items-center h-full px-4 gap-2">
          {tabs.map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`kirby-nav-btn flex-1 h-full font-black ${activeTab === tab.id ? 'active' : ''}`}
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

