
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme } from './types';
import { useGameLogic } from './hooks/useGameLogic';

const STAGES = [
  { id: Intensity.SOFT, title: 'PEACEFUL', desc: 'VILLAGE LIFE', color: '#55FF55', secondary: '#00AA00', text: '#000000' },
  { id: Intensity.HOT, title: 'NETHER', desc: 'INTO THE FIRE', color: '#FF5555', secondary: '#AA0000', text: '#FFFFFF' },
  { id: Intensity.VULGAR, title: 'THE END', desc: 'DRAGON SLAYER', color: '#AA00AA', secondary: '#550055', text: '#FFFFFF' },
];

const MinecraftApp: React.FC<{ logic: ReturnType<typeof useGameLogic> }> = ({ logic }) => {
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

  const [blocks, setBlocks] = useState<{ id: number, x: number, y: number, size: number, type: string }[]>([]);

  useEffect(() => {
    const types = ['dirt', 'grass', 'stone', 'cobble', 'plank'];
    setBlocks(Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 20,
      type: types[Math.floor(Math.random() * types.length)]
    })));
  }, []);

  const tabs = [
    { id: 'play', label: 'PLAY' },
    { id: 'decks', label: 'ITEMS' },
    { id: 'history', label: 'LOGS' },
    { id: 'themes', label: 'WORLD' },
    { id: 'settings', label: 'META' },
  ];

  return (
    <div className="minecraft-theme h-screen w-screen flex flex-col bg-[#4c4c4c] text-white overflow-hidden font-['VT323']">
      <style>{`
        .minecraft-theme {
          background-color: #313131;
          background-image: 
            linear-gradient(45deg, #3c3c3c 25%, transparent 25%), 
            linear-gradient(-45deg, #3c3c3c 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #3c3c3c 75%), 
            linear-gradient(-45deg, transparent 75%, #3c3c3c 75%);
          background-size: 40px 40px;
          background-position: 0 0, 0 20px, 20px -20px, -20px 0px;
        }
        .mc-panel {
          background: #c6c6c6;
          border: 4px solid #000;
          box-shadow: inset -4px -4px #555, inset 4px 4px #fff;
          color: #000;
          image-rendering: pixelated;
        }
        .mc-button {
          background: #c6c6c6;
          border: 4px solid #000;
          box-shadow: inset -4px -4px #555, inset 4px 4px #fff;
          color: #000;
          padding: 8px 16px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.05s;
          display: inline-block;
          text-align: center;
          position: relative;
        }
        .mc-button:hover {
          background: #dcdcdc;
          box-shadow: inset -4px -4px #333, inset 4px 4px #fff;
        }
        .mc-button:active {
          box-shadow: inset 4px 4px #333, inset -4px -4px #fff;
          transform: translateY(2px);
        }
        .mc-button.active {
          background: #55FF55;
          box-shadow: inset -4px -4px #22aa22, inset 4px 4px #aaffaa;
          color: #000;
        }
        .mc-button.danger {
          background: #FF5555;
          box-shadow: inset -4px -4px #aa0000, inset 4px 4px #ffaaaa;
        }
        .mc-input {
          background: #000;
          color: #55FF55;
          border: 4px solid #555;
          padding: 12px;
          font-family: 'VT323', monospace;
          outline: none;
          box-shadow: inset 4px 4px #222;
        }
        .mc-card {
          background: #c6c6c6;
          border: 4px solid #000;
          box-shadow: inset -6px -6px #555, inset 6px 6px #fff;
          padding: 24px;
          color: #000;
        }
        .mc-header {
          text-shadow: 4px 4px #000;
          letter-spacing: 2px;
        }
        .mc-dirt-header {
          background: #795548;
          border-bottom: 8px solid #4CAF50;
          box-shadow: 0 4px 0 #2E7D32, 0 8px 0 #000;
        }
        .floating-block {
          position: absolute;
          opacity: 0.1;
          pointer-events: none;
          image-rendering: pixelated;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .inventory-slot {
          width: 100%;
          aspect-ratio: 1;
          background: #8b8b8b;
          border: 4px solid #373737;
          box-shadow: inset 4px 4px #000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          cursor: pointer;
        }
        .inventory-slot.active {
          border-color: #fff;
          background: #c6c6c6;
        }
      `}</style>

      {/* Background Blocks */}
      {blocks.map(block => (
        <div 
          key={block.id} 
          className="floating-block"
          style={{
            left: `${block.x}%`,
            top: `${block.y}%`,
            width: `${block.size}px`,
            height: `${block.size}px`,
            backgroundColor: block.type === 'grass' ? '#4CAF50' : block.type === 'dirt' ? '#795548' : '#9e9e9e',
            border: '2px solid #000',
            animation: `float ${10 + block.id}s ease-in-out infinite`
          }}
        />
      ))}

      {/* Header */}
      <header className="mc-dirt-header p-6 text-center shrink-0 relative z-10">
        <h1 className="text-5xl mc-header text-white uppercase italic">MINECRAFT: OBSIDIAN</h1>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-6 pb-24 relative z-10">
        <div className="max-w-md mx-auto h-full pt-6">
          <AnimatePresence mode="wait">
            {activeTab === 'play' && (
              <motion.div key="play" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="space-y-6">
                {!intensity && !prompt ? (
                  <div className="space-y-8">
                    <div className="mc-panel p-6">
                      <h2 className="text-3xl mb-4 uppercase border-b-4 border-black/20 pb-2">Select World</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div 
                          onClick={() => setActiveDeckId('default')}
                          className={`inventory-slot ${activeDeckId === 'default' ? 'active' : ''}`}
                        >
                          <div className="text-center">
                            <div className="w-12 h-12 bg-[#4CAF50] border-2 border-black mx-auto mb-1"></div>
                            <span className="text-xs">OVERWORLD</span>
                          </div>
                        </div>
                        {customDecks.map(deck => (
                          <div 
                            key={deck.id}
                            onClick={() => setActiveDeckId(deck.id)}
                            className={`inventory-slot ${activeDeckId === deck.id ? 'active' : ''}`}
                          >
                            <div className="text-center">
                              <div className="w-12 h-12 bg-[#795548] border-2 border-black mx-auto mb-1"></div>
                              <span className="text-xs truncate w-20 block">{deck.name.toUpperCase()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mc-panel p-6">
                      <h2 className="text-3xl mb-4 uppercase border-b-4 border-black/20 pb-2">Difficulty</h2>
                      <div className="grid grid-cols-1 gap-4">
                        {STAGES.map((stage) => (
                          <button 
                            key={stage.id} 
                            onClick={() => setIntensity(stage.id)}
                            className="mc-button flex flex-col items-center py-4"
                            style={{ backgroundColor: stage.color, color: stage.text, borderColor: '#000' }}
                          >
                            <span className="text-4xl font-bold">{stage.title}</span>
                            <span className="text-lg opacity-70">{stage.desc}</span>
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
                      className="text-center bg-black/40 p-8 border-4 border-white/20"
                    >
                      <p className="text-[#55FF55] text-2xl mb-2">CHALLENGE LEVEL</p>
                      <h2 className="text-7xl mc-header italic">{intensity}</h2>
                    </motion.div>
                    <div className="grid grid-cols-1 gap-6 w-full">
                      <button onClick={() => handleDraw('Truth')} className="mc-button text-5xl py-8 bg-[#55FF55]">TRUTH</button>
                      <button onClick={() => handleDraw('Dare')} className="mc-button text-5xl py-8 bg-[#FF5555]">ACTION</button>
                      <button onClick={() => setIntensity(null)} className="text-white/40 uppercase text-xl tracking-widest mt-4 hover:text-white transition-colors">Abort Mission</button>
                    </div>
                  </div>
                ) : (
                  <motion.div initial={{ scale: 0.8, opacity: 0, rotate: -2 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} className="mc-card space-y-6">
                    <div className="flex justify-between items-center border-b-4 border-black/10 pb-4">
                      <span className="bg-[#55FF55] border-2 border-black text-black px-4 py-1 text-3xl font-bold">{prompt.type.toUpperCase()}</span>
                      <span className="text-black/40 text-xl"># {history.length}</span>
                    </div>
                    <p className="text-5xl leading-tight font-bold">"{prompt.text}"</p>
                    <div className="pt-6 border-t-4 border-black/10 border-dotted">
                      <p className="text-[#AA0000] text-2xl font-bold mb-2">PENALTY</p>
                      <p className="text-3xl italic opacity-90">{prompt.penalty}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-8">
                      <button onClick={() => setPrompt(null)} className="mc-button text-2xl">BACK</button>
                      <button onClick={() => handleDraw(prompt.type)} className="mc-button bg-[#55FF55] text-2xl">RE-ROLL</button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'decks' && (
              <motion.div key="decks" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                {!editingDeck ? (
                  <>
                    <div className="flex justify-between items-end border-b-4 border-white/10 pb-2">
                      <h2 className="text-5xl mc-header">INVENTORY</h2>
                      <button onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })} className="mc-button text-xl">+ NEW ITEM</button>
                    </div>
                    <div className="space-y-4">
                      {customDecks.map(deck => (
                        <div key={deck.id} className="mc-panel p-6 flex justify-between items-center">
                          <div>
                            <h3 className="text-3xl font-bold">{deck.name || 'Untitled'}</h3>
                            <p className="text-xl opacity-60">{deck.prompts.length} items inside</p>
                          </div>
                          <div className="flex gap-3">
                            <button onClick={() => setEditingDeck(deck)} className="mc-button text-xl">EDIT</button>
                            <button onClick={() => deleteDeck(deck.id)} className="mc-button danger text-xl">DEL</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="mc-panel p-8 space-y-8">
                    <div className="space-y-4">
                      <label className="text-xl uppercase opacity-60">Item Name</label>
                      <input className="mc-input w-full text-4xl" value={editingDeck.name} onChange={e => setEditingDeck({...editingDeck, name: e.target.value})} placeholder="DECK NAME" />
                      <label className="text-xl uppercase opacity-60">Lore</label>
                      <textarea className="mc-input w-full text-2xl h-32" value={editingDeck.description} onChange={e => setEditingDeck({...editingDeck, description: e.target.value})} placeholder="DESCRIPTION" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-3xl font-bold">CONTENTS ({editingDeck.prompts.length})</h3>
                        <button onClick={addNewPromptToEditingDeck} className="mc-button text-xl">+ ADD</button>
                      </div>
                      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {editingDeck.prompts.map(p => (
                          <div key={p.id} className="mc-card p-4 space-y-4 bg-black/5">
                            <div className="flex gap-3">
                              <select className="mc-input text-xl flex-1" value={p.type} onChange={e => updatePromptInEditingDeck(p.id, 'type', e.target.value)}>
                                <option>Truth</option><option>Dare</option>
                              </select>
                              <select className="mc-input text-xl flex-1" value={p.intensity} onChange={e => updatePromptInEditingDeck(p.id, 'intensity', e.target.value)}>
                                <option value={Intensity.SOFT}>SOFT</option><option value={Intensity.HOT}>HOT</option><option value={Intensity.VULGAR}>VULGAR</option>
                              </select>
                              <button onClick={() => removePromptFromEditingDeck(p.id)} className="mc-button danger p-2">X</button>
                            </div>
                            <input className="mc-input w-full text-2xl" value={p.text} onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)} placeholder="PROMPT..." />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={() => setEditingDeck(null)} className="mc-button flex-1 text-2xl">CANCEL</button>
                      <button onClick={() => saveDeck(editingDeck)} className="mc-button flex-1 bg-[#55FF55] text-2xl">SAVE</button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <h2 className="text-5xl mc-header border-b-4 border-white/10 pb-2">QUEST LOG</h2>
                <div className="space-y-4">
                  {history.length === 0 ? (
                    <div className="text-center py-20 text-3xl opacity-40 italic">No logs found in this chunk...</div>
                  ) : (
                    history.map((item, i) => (
                      <div key={i} className="mc-panel p-6 border-l-8 border-[#55FF55]">
                        <div className="flex justify-between text-[#AA0000] text-xl mb-2 font-bold">
                          <span>{item.type.toUpperCase()}</span>
                          <span>ENTRY {history.length-i}</span>
                        </div>
                        <p className="text-3xl italic">"{item.text}"</p>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'themes' && (
              <motion.div key="themes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <h2 className="text-5xl mc-header border-b-4 border-white/10 pb-2">DIMENSIONS</h2>
                <div className="grid grid-cols-1 gap-4">
                  <button onClick={() => setTheme(Theme.PERSONA)} className="mc-button py-8 text-4xl">PERSONA 5</button>
                  <button onClick={() => setTheme(Theme.MINECRAFT)} className="mc-button py-8 text-4xl active">MINECRAFT</button>
                  <button onClick={() => setTheme(Theme.DANGANRONPA)} className="mc-button py-8 text-4xl">DANGANRONPA</button>
                  <button onClick={() => setTheme(Theme.OMORI)} className="mc-button py-8 text-4xl">OMORI</button>
                  <button onClick={() => setTheme(Theme.KIRBY)} className="mc-button py-8 text-4xl">KIRBY</button>
                  <button onClick={() => setTheme(Theme.SANRIO)} className="mc-button py-8 text-4xl">SANRIO</button>
                  <button onClick={() => setTheme(Theme.POKEMON)} className="mc-button py-8 text-4xl">POKÉMON</button>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <h2 className="text-5xl mc-header border-b-4 border-white/10 pb-2">SYSTEM</h2>
                <div className="mc-panel p-8 space-y-6">
                  <div className="flex justify-between items-center text-3xl">
                    <span className="opacity-60">HEART SYNC</span><span className="text-[#55FF55] font-bold">STABLE</span>
                  </div>
                  <div className="flex justify-between items-center text-3xl">
                    <span className="opacity-60">COGNITION</span><span className="text-[#55FF55] font-bold">ENHANCED</span>
                  </div>
                  <div className="flex justify-between items-center text-3xl">
                    <span className="opacity-60">PLAYER</span><span className="text-[#55FF55] font-bold">STEVE</span>
                  </div>
                  <div className="pt-6 border-t-4 border-black/10">
                    <p className="text-xl text-center opacity-40 italic">Build your own reality.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-[#c6c6c6] border-t-8 border-black/20 h-24 z-50 flex items-center shadow-[0_-8px_0_#000]">
        <div className="flex justify-around items-center w-full px-4 gap-2">
          {tabs.map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`mc-button text-2xl flex-1 h-16 ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MinecraftApp;

