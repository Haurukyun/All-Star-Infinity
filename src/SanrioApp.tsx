
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme } from './types';
import { useGameLogic } from './hooks/useGameLogic';

const STAGES = [
  { id: Intensity.SOFT, title: 'SWEET HELLO', desc: 'HELLO KITTY', color: '#FFB6C1', text: '#D21F3C' },
  { id: Intensity.HOT, title: 'MELODY DREAM', desc: 'MY MELODY', color: '#FF69B4', text: '#FFFFFF' },
  { id: Intensity.VULGAR, title: 'KUROMI NIGHT', desc: 'KUROMI', color: '#4B0082', text: '#E6E6FA' },
];

const SanrioApp: React.FC<{ logic: ReturnType<typeof useGameLogic> }> = ({ logic }) => {
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
    { id: 'play', label: 'PLAY' },
    { id: 'decks', label: 'DECKS' },
    { id: 'history', label: 'LOGS' },
    { id: 'themes', label: 'THEME' },
    { id: 'settings', label: 'META' },
  ];

  return (
    <div className="sanrio-theme h-screen w-screen flex flex-col bg-[#FFF0F5] text-[#D21F3C] overflow-hidden font-['Cherry Bomb One']">
      <style>{`
        .sanrio-theme {
          background: linear-gradient(135deg, #FFF0F5 0%, #FFE4E1 100%);
          position: relative;
        }
        .sanrio-panel {
          background: #FFF;
          border: 4px solid #FFB6C1;
          border-radius: 24px;
          box-shadow: 0 6px 0px #FFB6C1;
        }
        .sanrio-button {
          background: #FFF;
          border: 3px solid #FFB6C1;
          color: #FFB6C1;
          padding: 10px 20px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: bold;
        }
        .sanrio-button:hover {
          background: #FFB6C1;
          color: #FFF;
          transform: scale(1.05);
        }
        .sanrio-button.active {
          background: #FF69B4;
          border-color: #FF69B4;
          color: #FFF;
        }
        .sanrio-card {
          background: #FFF;
          border: 5px solid #FFB6C1;
          border-radius: 32px;
          padding: 24px;
          box-shadow: 0 10px 0px #FFB6C1;
        }
        .sanrio-header {
          color: #FF69B4;
          text-shadow: 2px 2px 0px #FFF;
        }
        .sanrio-nav-btn {
          background: transparent;
          border: none;
          color: #FFB6C1;
          font-size: 14px;
          transition: all 0.2s;
        }
        .sanrio-nav-btn.active {
          color: #FF69B4;
          font-weight: bold;
          transform: scale(1.1);
        }
        .kuromi-accent { color: #4B0082; }
        .melody-accent { color: #FF69B4; }
        .kitty-accent { color: #D21F3C; }
      `}</style>

      {/* Header */}
      <header className="p-6 flex justify-center items-center shrink-0">
        <h1 className="text-4xl sanrio-header">SANRIO WORLD</h1>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-6 pb-24">
        <div className="max-w-md mx-auto h-full pt-4">
          <AnimatePresence mode="wait">
            {activeTab === 'play' && (
              <motion.div key="play" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                {!intensity && !prompt ? (
                  <div className="space-y-8">
                    <div className="sanrio-panel p-6">
                      <h2 className="text-xl mb-4 text-[#FF69B4] border-b-2 border-[#FFB6C1] pb-1">WHICH FRIEND?</h2>
                      <div className="grid grid-cols-1 gap-3">
                        <button onClick={() => setActiveDeckId('default')} className={`sanrio-button ${activeDeckId === 'default' ? 'active' : ''}`}>
                          ALL FRIENDS
                        </button>
                        {customDecks.map(deck => (
                          <button key={deck.id} onClick={() => setActiveDeckId(deck.id)} className={`sanrio-button ${activeDeckId === deck.id ? 'active' : ''}`}>
                            {deck.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="sanrio-panel p-6">
                      <h2 className="text-xl mb-4 text-[#FF69B4] border-b-2 border-[#FFB6C1] pb-1">FUN LEVEL</h2>
                      <div className="grid grid-cols-1 gap-4">
                        {STAGES.map((stage) => (
                          <button 
                            key={stage.id} 
                            onClick={() => setIntensity(stage.id)}
                            className="sanrio-button flex flex-col items-center py-4"
                            style={{ backgroundColor: stage.color, color: stage.text, borderColor: stage.text }}
                          >
                            <span className="text-2xl">{stage.title}</span>
                            <span className="text-xs opacity-70">{stage.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : !prompt ? (
                  <div className="flex flex-col items-center gap-8 py-12">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center"
                    >
                      <p className="text-[#FF69B4] text-sm mb-2 uppercase tracking-widest">Current Mood</p>
                      <h2 className="text-5xl sanrio-header italic">{intensity}</h2>
                    </motion.div>
                    <div className="grid grid-cols-1 gap-6 w-full">
                      <button onClick={() => handleDraw('Truth')} className="sanrio-button text-3xl py-6">TRUTH</button>
                      <button onClick={() => handleDraw('Dare')} className="sanrio-button text-3xl py-6">DARE</button>
                      <button onClick={() => setIntensity(null)} className="text-[#FFB6C1] uppercase text-xs tracking-widest mt-4 hover:text-[#FF69B4] transition-colors">Go Back</button>
                    </div>
                  </div>
                ) : (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="sanrio-card space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="bg-[#FFB6C1] text-white px-4 py-1 rounded-full text-lg">{prompt.type}</span>
                      <span className="text-[#FFB6C1] text-sm">#{history.length}</span>
                    </div>
                    <p className="text-3xl leading-tight">"{prompt.text}"</p>
                    <div className="pt-4 border-t-2 border-[#FFB6C1] border-dotted">
                      <p className="text-[#FFB6C1] text-sm mb-1 uppercase tracking-widest">Penalty!</p>
                      <p className="text-xl italic text-[#FF69B4]">{prompt.penalty}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-6">
                      <button onClick={() => setPrompt(null)} className="sanrio-button">DONE</button>
                      <button onClick={() => handleDraw(prompt.type)} className="sanrio-button active">AGAIN</button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'decks' && (
              <motion.div key="decks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                {!editingDeck ? (
                  <>
                    <div className="flex justify-between items-end border-b-2 border-[#FFB6C1] pb-1">
                      <h2 className="text-3xl sanrio-header">FRIENDSHIP FORGE</h2>
                      <button onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })} className="sanrio-button text-xs">+ NEW</button>
                    </div>
                    <div className="space-y-4">
                      {customDecks.map(deck => (
                        <div key={deck.id} className="sanrio-panel p-4 flex justify-between items-center">
                          <div>
                            <h3 className="text-xl text-[#FF69B4]">{deck.name || 'Untitled'}</h3>
                            <p className="text-xs text-[#FFB6C1]">{deck.prompts.length} cards</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => setEditingDeck(deck)} className="sanrio-button text-xs">EDIT</button>
                            <button onClick={() => deleteDeck(deck.id)} className="sanrio-button text-xs border-red-400 text-red-400">ERASE</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="sanrio-panel p-6 space-y-6">
                    <div className="space-y-4">
                      <input className="w-full border-b-2 border-[#FFB6C1] p-2 text-2xl focus:outline-none text-[#FF69B4]" value={editingDeck.name} onChange={e => setEditingDeck({...editingDeck, name: e.target.value})} placeholder="DECK NAME" />
                      <textarea className="w-full border-2 border-[#FFB6C1] rounded-xl p-2 text-sm h-24 focus:outline-none text-[#FF69B4]" value={editingDeck.description} onChange={e => setEditingDeck({...editingDeck, description: e.target.value})} placeholder="DESCRIPTION" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl text-[#FF69B4]">CARDS ({editingDeck.prompts.length})</h3>
                        <button onClick={addNewPromptToEditingDeck} className="sanrio-button text-xs">+ ADD</button>
                      </div>
                      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {editingDeck.prompts.map(p => (
                          <div key={p.id} className="sanrio-panel p-4 space-y-3 bg-[#FFF0F5]">
                            <div className="flex gap-2">
                              <select className="border border-[#FFB6C1] rounded-lg text-xs p-1 text-[#FF69B4]" value={p.type} onChange={e => updatePromptInEditingDeck(p.id, 'type', e.target.value)}>
                                <option>Truth</option><option>Dare</option>
                              </select>
                              <select className="border border-[#FFB6C1] rounded-lg text-xs p-1 text-[#FF69B4]" value={p.intensity} onChange={e => updatePromptInEditingDeck(p.id, 'intensity', e.target.value)}>
                                <option value={Intensity.SOFT}>SOFT</option><option value={Intensity.HOT}>HOT</option><option value={Intensity.VULGAR}>VULGAR</option>
                              </select>
                              <button onClick={() => removePromptFromEditingDeck(p.id)} className="text-red-500 ml-auto font-bold">X</button>
                            </div>
                            <input className="w-full border-b border-[#FFB6C1] text-sm p-1 focus:outline-none text-[#FF69B4]" value={p.text} onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)} placeholder="PROMPT TEXT" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setEditingDeck(null)} className="sanrio-button flex-1">CANCEL</button>
                      <button onClick={() => saveDeck(editingDeck)} className="sanrio-button flex-1 active">SAVE</button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <h2 className="text-3xl sanrio-header border-b-2 border-[#FFB6C1] pb-1">FRIENDSHIP LOGS</h2>
                <div className="space-y-3">
                  {history.map((item, i) => (
                    <div key={i} className="sanrio-panel p-4 border-l-4 border-[#FF69B4]">
                      <div className="flex justify-between text-xs mb-2 text-[#FFB6C1]">
                        <span>{item.type.toUpperCase()}</span>
                        <span>LOG {history.length-i}</span>
                      </div>
                      <p className="text-lg italic">"{item.text}"</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'themes' && (
              <motion.div key="themes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <h2 className="text-3xl sanrio-header border-b-2 border-[#FFB6C1] pb-1">WORLD SHIFT</h2>
                <div className="grid grid-cols-1 gap-4">
                  <button onClick={() => setTheme(Theme.PERSONA)} className="sanrio-button py-6 text-xl">PHANTOM THIEF</button>
                  <button onClick={() => setTheme(Theme.MINECRAFT)} className="sanrio-button py-6 text-xl">BLOCKY WORLD</button>
                  <button onClick={() => setTheme(Theme.DANGANRONPA)} className="sanrio-button py-6 text-xl">KILLING HARMONY</button>
                  <button onClick={() => setTheme(Theme.OMORI)} className="sanrio-button py-6 text-xl">DREAM WORLD</button>
                  <button onClick={() => setTheme(Theme.KIRBY)} className="sanrio-button py-6 text-xl">KIRBY'S DREAM</button>
                  <button onClick={() => setTheme(Theme.SANRIO)} className="sanrio-button py-6 text-xl active">SANRIO WORLD</button>
                  <button onClick={() => setTheme(Theme.POKEMON)} className="sanrio-button py-6 text-xl">POKÉMON WORLD</button>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <h2 className="text-3xl sanrio-header border-b-2 border-[#FFB6C1] pb-1">HEART STATS</h2>
                <div className="sanrio-panel p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <span>FRIENDSHIP</span><span className="text-[#FF69B4] font-bold">MAX</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>CUTENESS</span><span className="text-[#FF69B4] font-bold">OVERLOAD</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>HAPPINESS</span><span className="text-[#FF69B4] font-bold animate-pulse">PEAKING</span>
                  </div>
                  <div className="pt-4 border-t border-[#FFB6C1]">
                    <p className="text-xs text-[#FFB6C1] text-center">You can never have too many friends!</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/90 border-t-2 border-[#FFB6C1] h-20 z-50">
        <div className="flex justify-around items-center h-full px-2">
          {tabs.map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`sanrio-nav-btn flex-1 h-full ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default SanrioApp;
