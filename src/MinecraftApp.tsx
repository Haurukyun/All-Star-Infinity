import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme } from './types';
import { useGameLogic } from './hooks/useGameLogic';

const STAGES = [
  { id: Intensity.SOFT, title: 'PEACEFUL', desc: 'VILLAGE LIFE', color: '#55FF55', text: '#000000', icon: '🌿' },
  { id: Intensity.HOT, title: 'NETHER', desc: 'INTO THE FIRE', color: '#FFAA00', text: '#FFFFFF', icon: '🔥' },
  { id: Intensity.VULGAR, title: 'THE END', desc: 'DRAGON SLAYER', color: '#AA00AA', text: '#FFFFFF', icon: '🔮' },
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

  const tabs = [
    { id: 'play', label: 'PLAY', icon: '⚔️' },
    { id: 'decks', label: 'DECKS', icon: '🎒' },
    { id: 'history', label: 'LOGS', icon: '📜' },
    { id: 'themes', label: 'WORLD', icon: '🗺️' },
    { id: 'settings', label: 'OPTS', icon: '⚙️' },
  ];

  return (
    <div className="minecraft-theme h-[100dvh] w-screen flex flex-col bg-[#111] text-white overflow-hidden font-['VT323'] relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&family=Press+Start+2P&display=swap');

        .minecraft-theme {
          background: radial-gradient(circle at center, #2a1a3a 0%, #050505 100%);
          image-rendering: pixelated;
        }

        .pixel-font {
          font-family: 'Press Start 2P', cursive;
        }

        .rpg-panel {
          background: #212121;
          border: 4px solid #111;
          box-shadow: 
            0 0 0 2px #5e35b1,
            0 0 0 4px #111,
            0 10px 20px rgba(0,0,0,0.8);
          position: relative;
          padding: 20px;
          margin-top: 10px;
        }

        .rpg-panel-gold {
          box-shadow: 
            0 0 0 2px #ffb300,
            0 0 0 4px #111,
            0 10px 20px rgba(0,0,0,0.8);
        }

        .rpg-ribbon {
          background: #5e35b1;
          color: #fff;
          text-align: center;
          position: absolute;
          top: -16px;
          left: 50%;
          transform: translateX(-50%);
          padding: 4px 24px;
          border: 2px solid #000;
          font-family: 'Press Start 2P', cursive;
          font-size: 10px;
          text-transform: uppercase;
          z-index: 10;
          box-shadow: 0 4px 0 rgba(0,0,0,0.5);
        }
        
        .rpg-ribbon::before {
          content: '';
          position: absolute;
          left: -10px;
          top: 6px;
          border-right: 10px solid #311b92;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          z-index: -1;
        }
        .rpg-ribbon::after {
          content: '';
          position: absolute;
          right: -10px;
          top: 6px;
          border-left: 10px solid #311b92;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          z-index: -1;
        }

        .rpg-slot {
          background: #111;
          border: 2px solid #444;
          border-right-color: #666;
          border-bottom-color: #666;
          box-shadow: inset 2px 2px 0 #000;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.1s;
        }
        .rpg-slot:active {
          background: #000;
          border-color: #333;
        }
        .rpg-slot.active {
          border: 2px solid #ffb300;
          background: #2a1a0a;
          box-shadow: inset 0 0 10px #ffb300;
        }

        .rpg-btn {
          background: #444;
          border: 2px solid #000;
          border-top-color: #777;
          border-left-color: #777;
          color: #fff;
          font-family: 'VT323', monospace;
          text-transform: uppercase;
          font-size: 1.2rem;
          cursor: pointer;
          box-shadow: 0 4px 0 #222;
          transition: transform 0.1s, box-shadow 0.1s;
        }
        .rpg-btn:active {
          transform: translateY(4px);
          box-shadow: 0 0 0 #222;
          background: #333;
        }
        .rpg-btn-primary {
          background: #5e35b1;
          border-top-color: #9575cd;
          border-left-color: #9575cd;
          box-shadow: 0 4px 0 #311b92;
        }
        .rpg-btn-primary:active {
          background: #4527a0;
          box-shadow: 0 0 0 #311b92;
        }
        .rpg-btn-danger {
          background: #c62828;
          border-top-color: #ef5350;
          border-left-color: #ef5350;
          box-shadow: 0 4px 0 #8e0000;
        }
        .rpg-btn-danger:active {
          background: #b71c1c;
          box-shadow: 0 0 0 #8e0000;
        }

        .gold-title {
          font-family: 'Press Start 2P', cursive;
          background: linear-gradient(to bottom, #ffd700 0%, #ff8f00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(4px 4px 0 #3e2723);
          text-transform: uppercase;
          line-height: 1.5;
        }

        .nav-slot {
          background: #222;
          border: 2px solid #555;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .nav-slot.active {
          background: #333;
          border-color: #ffb300;
        }
        .nav-slot.active::after {
          content: '';
          position: absolute;
          inset: 2px;
          border: 2px solid #ffb300;
          opacity: 0.5;
        }
      `}</style>

      {/* Header */}
      <header className="p-6 text-center shrink-0 relative z-10">
        <h1 className="text-3xl sm:text-4xl gold-title tracking-widest">OBSIDIAN MENU</h1>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-4 pb-32 relative z-10 no-scrollbar">
        <div className="max-w-md mx-auto h-full pt-4">
          <AnimatePresence mode="wait">
            {activeTab === 'play' && (
              <motion.div key="play" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                {!intensity && !prompt ? (
                  <div className="space-y-8">
                    {/* World Select Panel */}
                    <div className="rpg-panel">
                      <div className="rpg-ribbon">SELECT WORLD</div>
                      <div className="grid grid-cols-1 gap-2 mt-2">
                        <button 
                          onClick={() => setActiveDeckId('default')} 
                          className={`rpg-slot p-3 w-full text-left justify-start gap-3 ${activeDeckId === 'default' ? 'active' : ''}`}
                        >
                          <span className="text-2xl">🌲</span>
                          <div>
                            <div className="text-xl leading-none text-[#ffb300]">OVERWORLD</div>
                            <div className="text-xs text-gray-400">Standard Survival</div>
                          </div>
                        </button>
                        {customDecks.map(deck => (
                          <button 
                            key={deck.id}
                            onClick={() => setActiveDeckId(deck.id)}
                            className={`rpg-slot p-3 w-full text-left justify-start gap-3 ${activeDeckId === deck.id ? 'active' : ''}`}
                          >
                            <span className="text-2xl">📦</span>
                            <div>
                              <div className="text-xl leading-none text-[#ffb300]">{deck.name.toUpperCase()}</div>
                              <div className="text-xs text-gray-400">{deck.prompts.length} Items</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Difficulty Panel */}
                    <div className="rpg-panel rpg-panel-gold">
                      <div className="rpg-ribbon" style={{ background: '#ff8f00', borderColor: '#000' }}>DIFFICULTY</div>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {STAGES.map((stage) => (
                          <button 
                            key={stage.id} 
                            onClick={() => setIntensity(stage.id)}
                            className="rpg-slot flex-col p-2 gap-1 hover:bg-[#333]"
                          >
                            <span className="text-2xl">{stage.icon}</span>
                            <span className="text-sm text-center leading-none" style={{ color: stage.color }}>{stage.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : !prompt ? (
                  <div className="flex flex-col items-center justify-center h-[60vh]">
                    <div className="rpg-panel w-full text-center space-y-6">
                      <div className="rpg-ribbon">QUEST STARTED</div>
                      
                      <div className="py-8">
                        <div className="text-gray-400 text-sm mb-2 pixel-font">CURRENT MODE</div>
                        <div className="text-4xl gold-title">{intensity}</div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 px-4">
                        <button onClick={() => handleDraw('Truth')} className="rpg-btn rpg-btn-primary py-4 text-xl">
                          REVEAL TRUTH
                        </button>
                        <button onClick={() => handleDraw('Dare')} className="rpg-btn py-4 text-xl bg-[#c62828] border-top-[#ef5350] border-left-[#ef5350] shadow-[0_4px_0_#8e0000] active:shadow-none active:bg-[#b71c1c]">
                          TAKE ACTION
                        </button>
                      </div>

                      <button onClick={() => setIntensity(null)} className="text-xs text-gray-500 hover:text-white mt-4 underline">
                        ABANDON QUEST
                      </button>
                    </div>
                  </div>
                ) : (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rpg-panel rpg-panel-gold mt-8">
                    <div className="rpg-ribbon" style={{ background: '#ff8f00' }}>NEW OBJECTIVE</div>
                    
                    <div className="text-center space-y-6 mt-4">
                      <div className="flex justify-center items-center gap-2 mb-4">
                        <span className="text-2xl">{prompt.type === 'Truth' ? '📜' : '⚔️'}</span>
                        <span className="text-[#ffb300] text-xl pixel-font">QUEST #{history.length}</span>
                      </div>

                      <p className="text-2xl leading-relaxed text-white">
                        "{prompt.text}"
                      </p>

                      <div className="bg-[#111] p-3 border-2 border-[#333] mt-4">
                        <div className="text-[#c62828] text-xs mb-1 pixel-font">FAILURE PENALTY</div>
                        <div className="text-gray-300">{prompt.penalty}</div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-6">
                        <button onClick={() => setPrompt(null)} className="rpg-btn py-2">
                          COMPLETE
                        </button>
                        <button onClick={() => handleDraw(prompt.type)} className="rpg-btn rpg-btn-primary py-2">
                          REROLL
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'decks' && (
              <motion.div key="decks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                {!editingDeck ? (
                  <>
                    <div className="rpg-panel">
                      <div className="rpg-ribbon">INVENTORY</div>
                      <div className="flex justify-end mb-2">
                        <button onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })} className="rpg-btn rpg-btn-primary px-4 py-1 text-sm">
                          + CRAFT NEW
                        </button>
                      </div>
                      <div className="space-y-2">
                        {customDecks.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">Inventory Empty</div>
                        ) : (
                          customDecks.map(deck => (
                            <div key={deck.id} className="rpg-slot p-3 justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">📘</span>
                                <div>
                                  <div className="text-[#ffb300] text-lg">{deck.name || 'Unknown Item'}</div>
                                  <div className="text-xs text-gray-500">{deck.prompts.length} Cards</div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button onClick={() => setEditingDeck(deck)} className="rpg-btn px-2 py-1 text-xs">EDIT</button>
                                <button onClick={() => deleteDeck(deck.id)} className="rpg-btn rpg-btn-danger px-2 py-1 text-xs">DROP</button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="rpg-panel rpg-panel-gold">
                    <div className="rpg-ribbon" style={{ background: '#ff8f00' }}>CRAFTING</div>
                    <div className="space-y-4 mt-2">
                      <div className="space-y-2">
                        <label className="text-xs text-[#ffb300] pixel-font">ITEM NAME</label>
                        <input className="w-full bg-[#111] border-2 border-[#555] p-2 text-white outline-none focus:border-[#ffb300]" value={editingDeck.name} onChange={e => setEditingDeck({...editingDeck, name: e.target.value})} placeholder="Name..." />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-[#ffb300] pixel-font">LORE</label>
                        <textarea className="w-full bg-[#111] border-2 border-[#555] p-2 text-white outline-none focus:border-[#ffb300] h-20" value={editingDeck.description} onChange={e => setEditingDeck({...editingDeck, description: e.target.value})} placeholder="Description..." />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-xs text-[#ffb300] pixel-font">ENCHANTMENTS ({editingDeck.prompts.length})</label>
                          <button onClick={addNewPromptToEditingDeck} className="rpg-btn px-2 py-1 text-xs">+ ADD</button>
                        </div>
                        <div className="max-h-[40vh] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                          {editingDeck.prompts.map(p => (
                            <div key={p.id} className="rpg-slot p-2 gap-2 flex-col items-stretch">
                              <div className="flex gap-2">
                                <select className="bg-[#222] text-white border border-[#555] text-xs p-1" value={p.type} onChange={e => updatePromptInEditingDeck(p.id, 'type', e.target.value)}>
                                  <option>Truth</option><option>Dare</option>
                                </select>
                                <input className="flex-1 bg-transparent border-b border-[#555] text-sm outline-none" value={p.text} onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)} placeholder="Effect..." />
                                <button onClick={() => removePromptFromEditingDeck(p.id)} className="text-[#c62828] font-bold">×</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button onClick={() => setEditingDeck(null)} className="rpg-btn flex-1 py-2">CANCEL</button>
                        <button onClick={() => saveDeck(editingDeck)} className="rpg-btn rpg-btn-primary flex-1 py-2">CRAFT</button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="rpg-panel">
                  <div className="rpg-ribbon">QUEST LOG</div>
                  <div className="space-y-2 mt-2">
                    {history.map((item, i) => (
                      <div key={i} className="rpg-slot p-3 justify-start gap-3 border-l-4 border-l-[#5e35b1]">
                        <div className="text-2xl">{item.type === 'Truth' ? '📜' : '⚔️'}</div>
                        <div>
                          <div className="text-gray-300 italic">"{item.text}"</div>
                          <div className="text-[10px] text-[#5e35b1] pixel-font mt-1">LOG ENTRY #{history.length - i}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'themes' && (
              <motion.div key="themes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="rpg-panel rpg-panel-gold">
                  <div className="rpg-ribbon" style={{ background: '#ff8f00' }}>REALM SELECT</div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {[
                      { id: Theme.PERSONA, label: 'PHANTOM', icon: '🎭' },
                      { id: Theme.MINECRAFT, label: 'BLOCKY', icon: '⛏️' },
                      { id: Theme.DANGANRONPA, label: 'DESPAIR', icon: '⚖️' },
                      { id: Theme.OMORI, label: 'DREAM', icon: '💡' },
                      { id: Theme.KIRBY, label: 'POPSTAR', icon: '⭐' },
                      { id: Theme.POKEMON, label: 'KANTO', icon: '🔴' },
                      { id: Theme.ANIMAL_CROSSING, label: 'ISLAND', icon: '🏝️' },
                      { id: Theme.SKYRIM, label: 'SKYRIM', icon: '🐉' },
                    ].map(t => (
                      <button 
                        key={t.id}
                        onClick={() => setTheme(t.id as Theme)}
                        className={`rpg-slot flex-col p-4 gap-2 hover:bg-[#333] ${theme === t.id ? 'active' : ''}`}
                      >
                        <span className="text-3xl">{t.icon}</span>
                        <span className="pixel-font text-xs text-[#ffb300]">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="rpg-panel">
                  <div className="rpg-ribbon">SETTINGS</div>
                  <div className="space-y-4 mt-2">
                    <div className="rpg-slot p-3 justify-between">
                      <span>RENDER DISTANCE</span>
                      <span className="text-[#ffb300]">12 CHUNKS</span>
                    </div>
                    <div className="rpg-slot p-3 justify-between">
                      <span>DIFFICULTY</span>
                      <span className="text-[#c62828]">HARDCORE</span>
                    </div>
                    <div className="rpg-slot p-3 justify-between">
                      <span>GRAPHICS</span>
                      <span className="text-[#55FF55]">FANCY</span>
                    </div>
                    <div className="text-center text-xs text-gray-600 mt-4">
                      Modpack v1.0.0
                    </div>
                    <button onClick={() => logic.setView('menu')} className="w-full mt-4 bg-[#7f7f7f] border-2 border-b-4 border-[#3f3f3f] border-t-[#bfbfbf] border-l-[#bfbfbf] p-2 text-white font-bold text-shadow active:border-t-[#3f3f3f] active:border-l-[#3f3f3f] active:border-b-[#bfbfbf] active:border-r-[#bfbfbf] active:translate-y-1">
                      Save and Quit to Title
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 w-full h-20 z-50 bg-[#111] border-t-4 border-[#333] shadow-[0_-4px_0_#000]">
        <div className="flex justify-around items-center h-full px-2">
          {tabs.map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`nav-slot flex-1 ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="text-2xl mb-1">{tab.icon}</span>
              <span className="text-[10px] pixel-font text-gray-400">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export const MinecraftMenu: React.FC<{ logic: ReturnType<typeof useGameLogic> }> = ({ logic }) => {
  const { setView, setTheme } = logic;
  const [activeSection, setActiveSection] = React.useState<'gamemodes' | 'themes' | 'options' | null>(null);
  const themes = Object.values(Theme).filter(t => t !== Theme.NONE);

  const pixels = React.useMemo(() => [...Array(10)].map((_, i) => ({
    id: i,
    width: 20 + Math.random() * 40,
    height: 20 + Math.random() * 20,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
  })), []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-[#1a1a1a] font-mono text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/dirt.png")' }}></div>
      
      {/* Floating Clouds/Pixels */}
      <div className="absolute inset-0 pointer-events-none">
        {pixels.map((pixel, i) => (
          <motion.div
            key={pixel.id}
            className="absolute bg-white/10"
            style={{
              width: pixel.width,
              height: pixel.height,
              left: pixel.left,
              top: pixel.top,
            }}
            animate={{
              x: [0, 100, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="z-10 flex flex-col items-center gap-8">
        <motion.h1 
          className="text-6xl font-bold tracking-widest text-shadow-[4px_4px_0_#000] mb-8 pixel-font"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          MINECRAFT
        </motion.h1>
        <div className="flex flex-col gap-4 w-64">
          <button onClick={() => setView('game')} className="bg-[#555] border-4 border-black p-3 hover:bg-[#777] active:translate-y-1 shadow-[4px_4px_0_#000] text-xl pixel-font">PLAY GAME</button>
          <button onClick={() => setActiveSection(activeSection === 'themes' ? null : 'themes')} className="bg-[#555] border-4 border-black p-3 hover:bg-[#777] active:translate-y-1 shadow-[4px_4px_0_#000] text-xl pixel-font">THEMES</button>
        </div>
        <AnimatePresence>
          {activeSection === 'themes' && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="grid grid-cols-2 gap-2 bg-[#333] p-4 border-4 border-black shadow-[8px_8px_0_#000] max-h-48 overflow-y-auto custom-scrollbar">
              {themes.map(t => (
                <button key={t} onClick={() => setTheme(t)} className="bg-[#555] border-2 border-black p-2 text-[8px] hover:bg-[#777] pixel-font">{t.toUpperCase()}</button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MinecraftApp;
