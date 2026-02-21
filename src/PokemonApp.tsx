
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme } from './types';
import { useGameLogic } from './hooks/useGameLogic';

const STAGES = [
  { id: Intensity.SOFT, title: 'PALLET TOWN', desc: 'NEW ADVENTURE', color: '#FF0000', text: '#FFFFFF' },
  { id: Intensity.HOT, title: 'GYM BATTLE', desc: 'FEEL THE HEAT', color: '#FF8C00', text: '#FFFFFF' },
  { id: Intensity.VULGAR, title: 'ELITE FOUR', desc: 'CHAMPION LEVEL', color: '#4B0082', text: '#FFFFFF' },
];

const PokemonApp: React.FC<{ logic: ReturnType<typeof useGameLogic> }> = ({ logic }) => {
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
    { id: 'play', label: 'BATTLE' },
    { id: 'decks', label: 'PC' },
    { id: 'history', label: 'DEX' },
    { id: 'themes', label: 'REGION' },
    { id: 'settings', label: 'STATS' },
  ];

  return (
    <div className="pokemon-theme h-screen w-screen flex flex-col bg-[#f0f0f0] text-[#333] overflow-hidden font-['Press Start 2P']">
      <style>{`
        .pokemon-theme {
          background: #f0f0f0;
          position: relative;
        }
        .pk-panel {
          background: #fff;
          border: 4px solid #333;
          box-shadow: 6px 6px 0px #333;
          image-rendering: pixelated;
        }
        .pk-button {
          background: #fff;
          border: 4px solid #333;
          color: #333;
          padding: 12px;
          cursor: pointer;
          transition: all 0.1s;
          font-size: 10px;
          box-shadow: 4px 4px 0px #333;
        }
        .pk-button:hover {
          background: #333;
          color: #fff;
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0px #333;
        }
        .pk-button.active {
          background: #333;
          color: #fff;
        }
        .pk-card {
          background: #fff;
          border: 6px solid #333;
          padding: 20px;
          box-shadow: 8px 8px 0px #333;
        }
        .pk-header {
          color: #FF0000;
          text-shadow: 3px 3px 0px #333;
          font-size: 18px;
        }
        .pk-nav-btn {
          background: transparent;
          border: none;
          color: #333;
          font-size: 8px;
          transition: all 0.2s;
        }
        .pk-nav-btn.active {
          color: #FF0000;
          font-weight: bold;
          transform: scale(1.1);
        }
        .pokedex-red { background-color: #FF0000 !important; color: #fff !important; }
        .pokedex-blue { background-color: #3B4CCA !important; color: #fff !important; }
        .pokedex-yellow { background-color: #FFDE00 !important; color: #333 !important; }
      `}</style>

      {/* Header */}
      <header className="p-6 flex justify-center items-center shrink-0 border-b-4 border-black bg-white">
        <h1 className="pk-header">POKÉMON JOURNEY</h1>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-6 pb-24 pt-4">
        <div className="max-w-md mx-auto h-full">
          <AnimatePresence mode="wait">
            {activeTab === 'play' && (
              <motion.div key="play" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                {!intensity && !prompt ? (
                  <div className="space-y-8">
                    <div className="pk-panel p-6">
                      <h2 className="text-[12px] mb-4 border-b-4 border-black pb-2">CHOOSE YOUR DECK</h2>
                      <div className="grid grid-cols-1 gap-3">
                        <button onClick={() => setActiveDeckId('default')} className={`pk-button ${activeDeckId === 'default' ? 'active' : ''}`}>
                          KANTO STARTER
                        </button>
                        {customDecks.map(deck => (
                          <button key={deck.id} onClick={() => setActiveDeckId(deck.id)} className={`pk-button ${activeDeckId === deck.id ? 'active' : ''}`}>
                            {deck.name.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pk-panel p-6">
                      <h2 className="text-[12px] mb-4 border-b-4 border-black pb-2">SELECT DIFFICULTY</h2>
                      <div className="grid grid-cols-1 gap-4">
                        {STAGES.map((stage) => (
                          <button 
                            key={stage.id} 
                            onClick={() => setIntensity(stage.id)}
                            className="pk-button flex flex-col items-center py-4"
                            style={{ backgroundColor: stage.color, color: stage.text, borderColor: '#333' }}
                          >
                            <span className="text-[14px]">{stage.title}</span>
                            <span className="text-[8px] mt-2 opacity-80">{stage.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : !prompt ? (
                  <div className="flex flex-col items-center gap-8 py-12">
                    <motion.div 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="text-center pk-panel p-6 w-full"
                    >
                      <p className="text-[8px] mb-4">CURRENT LOCATION:</p>
                      <h2 className="text-[16px] text-[#FF0000]">{intensity}</h2>
                    </motion.div>
                    <div className="grid grid-cols-1 gap-6 w-full">
                      <button onClick={() => handleDraw('Truth')} className="pk-button text-[18px] py-8">TRUTH</button>
                      <button onClick={() => handleDraw('Dare')} className="pk-button text-[18px] py-8">DARE</button>
                      <button onClick={() => setIntensity(null)} className="text-[8px] mt-4 hover:text-[#FF0000]">RUN AWAY</button>
                    </div>
                  </div>
                ) : (
                  <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="pk-card space-y-6">
                    <div className="flex justify-between items-center border-b-2 border-black pb-2">
                      <span className="text-[10px] font-bold">{prompt.type.toUpperCase()}</span>
                      <span className="text-[8px]">NO. {history.length}</span>
                    </div>
                    <p className="text-[14px] leading-relaxed">"{prompt.text}"</p>
                    <div className="pt-4 border-t-4 border-black border-double">
                      <p className="text-[8px] mb-2 text-[#FF0000]">IT'S SUPER EFFECTIVE!</p>
                      <p className="text-[12px] italic">{prompt.penalty}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-6">
                      <button onClick={() => setPrompt(null)} className="pk-button">SWITCH</button>
                      <button onClick={() => handleDraw(prompt.type)} className="pk-button active">FIGHT</button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'decks' && (
              <motion.div key="decks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                {!editingDeck ? (
                  <>
                    <div className="flex justify-between items-end border-b-4 border-black pb-2">
                      <h2 className="text-[14px]">PC STORAGE</h2>
                      <button onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })} className="pk-button text-[8px]">+ NEW</button>
                    </div>
                    <div className="space-y-4">
                      {customDecks.map(deck => (
                        <div key={deck.id} className="pk-panel p-4 flex justify-between items-center">
                          <div>
                            <h3 className="text-[10px]">{deck.name || 'UNTITLED'}</h3>
                            <p className="text-[8px] opacity-60">{deck.prompts.length} DATA UNITS</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => setEditingDeck(deck)} className="pk-button text-[8px]">EDIT</button>
                            <button onClick={() => deleteDeck(deck.id)} className="pk-button text-[8px] border-red-500 text-red-500">RELEASE</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="pk-panel p-6 space-y-6">
                    <div className="space-y-4">
                      <input className="w-full border-b-4 border-black p-2 text-[12px] focus:outline-none" value={editingDeck.name} onChange={e => setEditingDeck({...editingDeck, name: e.target.value})} placeholder="DECK NAME" />
                      <textarea className="w-full border-4 border-black p-2 text-[8px] h-24 focus:outline-none" value={editingDeck.description} onChange={e => setEditingDeck({...editingDeck, description: e.target.value})} placeholder="DESCRIPTION" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-[10px]">DATA ({editingDeck.prompts.length})</h3>
                        <button onClick={addNewPromptToEditingDeck} className="pk-button text-[8px]">+ ADD</button>
                      </div>
                      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {editingDeck.prompts.map(p => (
                          <div key={p.id} className="pk-panel p-4 space-y-3">
                            <div className="flex gap-2">
                              <select className="border-2 border-black text-[8px] p-1" value={p.type} onChange={e => updatePromptInEditingDeck(p.id, 'type', e.target.value)}>
                                <option>Truth</option><option>Dare</option>
                              </select>
                              <select className="border-2 border-black text-[8px] p-1" value={p.intensity} onChange={e => updatePromptInEditingDeck(p.id, 'intensity', e.target.value)}>
                                <option value={Intensity.SOFT}>SOFT</option><option value={Intensity.HOT}>HOT</option><option value={Intensity.VULGAR}>VULGAR</option>
                              </select>
                              <button onClick={() => removePromptFromEditingDeck(p.id)} className="text-red-500 ml-auto font-bold">X</button>
                            </div>
                            <input className="w-full border-b-2 border-black text-[8px] p-1 focus:outline-none" value={p.text} onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)} placeholder="DATA CONTENT" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setEditingDeck(null)} className="pk-button flex-1">CANCEL</button>
                      <button onClick={() => saveDeck(editingDeck)} className="pk-button flex-1 active">SAVE</button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <h2 className="text-[14px] border-b-4 border-black pb-2">POKÉDEX LOG</h2>
                <div className="space-y-3">
                  {history.map((item, i) => (
                    <div key={i} className="pk-panel p-4 border-l-8 border-[#FF0000]">
                      <div className="flex justify-between text-[8px] mb-2 opacity-60">
                        <span>{item.type.toUpperCase()}</span>
                        <span>ENTRY {history.length-i}</span>
                      </div>
                      <p className="text-[10px]">"{item.text}"</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'themes' && (
              <motion.div key="themes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <h2 className="text-[14px] border-b-4 border-black pb-2">REGION SELECT</h2>
                <div className="grid grid-cols-1 gap-4">
                  <button onClick={() => setTheme(Theme.PERSONA)} className="pk-button py-6 text-[12px]">PHANTOM THIEF</button>
                  <button onClick={() => setTheme(Theme.MINECRAFT)} className="pk-button py-6 text-[12px]">BLOCKY WORLD</button>
                  <button onClick={() => setTheme(Theme.DANGANRONPA)} className="pk-button py-6 text-[12px]">KILLING HARMONY</button>
                  <button onClick={() => setTheme(Theme.OMORI)} className="pk-button py-6 text-[12px]">DREAM WORLD</button>
                  <button onClick={() => setTheme(Theme.KIRBY)} className="pk-button py-6 text-[12px]">KIRBY'S DREAM</button>
                  <button onClick={() => setTheme(Theme.SANRIO)} className="pk-button py-6 text-[12px]">SANRIO WORLD</button>
                  <button onClick={() => setTheme(Theme.POKEMON)} className="pk-button py-6 text-[12px] active">POKÉMON WORLD</button>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <h2 className="text-[14px] border-b-4 border-black pb-2">TRAINER STATS</h2>
                <div className="pk-panel p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px]">BADGES</span><span className="text-[#FF0000] font-bold">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px]">POKÉMON</span><span className="text-[#FF0000] font-bold">151</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px]">STATUS</span><span className="text-[#FF0000] font-bold animate-pulse">CHAMPION</span>
                  </div>
                  <div className="pt-4 border-t-4 border-black">
                    <p className="text-[8px] text-center">Gotta catch 'em all!</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t-4 border-black h-20 z-50">
        <div className="flex justify-around items-center h-full px-2">
          {tabs.map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`pk-nav-btn flex-1 h-full ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default PokemonApp;
