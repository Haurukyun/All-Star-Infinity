
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme } from './types';
import { useGameLogic } from './hooks/useGameLogic';

const STAGES = [
  { id: Intensity.SOFT, title: 'PALLET TOWN', desc: 'BEGINNER TRAINER', color: '#90EE90', text: '#006400', icon: '🌿' },
  { id: Intensity.HOT, title: 'GYM BATTLE', desc: 'ACE TRAINER', color: '#FFD700', text: '#8B4513', icon: '⚡' },
  { id: Intensity.VULGAR, title: 'ELITE FOUR', desc: 'CHAMPION', color: '#FF4500', text: '#FFFFFF', icon: '🔥' },
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

  const [grass, setGrass] = useState<{ id: number, x: number, y: number }[]>([]);

  useEffect(() => {
    setGrass(Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5
    })));
  }, []);

  const tabs = [
    { id: 'play', label: 'BATTLE' },
    { id: 'decks', label: 'PC' },
    { id: 'history', label: 'DEX' },
    { id: 'themes', label: 'MAP' },
    { id: 'settings', label: 'BAG' },
  ];

  return (
    <div className="pokemon-theme h-screen w-screen flex flex-col bg-[#78C850] text-[#000] overflow-hidden font-['Press Start 2P']">
      <style>{`
        .pokemon-theme {
          background-color: #78C850;
          background-image: 
            linear-gradient(45deg, #68B840 25%, transparent 25%, transparent 75%, #68B840 75%, #68B840),
            linear-gradient(45deg, #68B840 25%, transparent 25%, transparent 75%, #68B840 75%, #68B840);
          background-size: 60px 60px;
          background-position: 0 0, 30px 30px;
          position: relative;
        }
        .pkmn-panel {
          background: #F8F8F8;
          border: 4px solid #303030;
          box-shadow: 
            inset -4px -4px 0px #A0A0A0,
            4px 4px 0px #000;
          position: relative;
        }
        .pkmn-button {
          background: #F8F8F8;
          border: 4px solid #303030;
          padding: 12px;
          cursor: pointer;
          transition: all 0.1s;
          box-shadow: 
            inset -4px -4px 0px #A0A0A0,
            4px 4px 0px #000;
          text-transform: uppercase;
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .pkmn-button:hover {
          background: #E0E0E0;
          transform: translate(2px, 2px);
          box-shadow: 
            inset -2px -2px 0px #A0A0A0,
            2px 2px 0px #000;
        }
        .pkmn-button:active {
          transform: translate(4px, 4px);
          box-shadow: none;
        }
        .pkmn-button.active {
          background: #303030;
          color: #FFF;
          box-shadow: inset 4px 4px 0px #000;
        }
        .pkmn-card {
          background: #F8F8F8;
          border: 6px solid #303030;
          padding: 24px;
          box-shadow: 8px 8px 0px #000;
          position: relative;
        }
        .pkmn-header {
          background: #303030;
          color: #FFF;
          padding: 12px;
          text-align: center;
          border-bottom: 4px solid #000;
        }
        .pkmn-nav-btn {
          background: #D0D0D0;
          border: 4px solid #303030;
          font-size: 8px;
          transition: all 0.2s;
          box-shadow: inset -4px -4px 0px #A0A0A0;
        }
        .pkmn-nav-btn.active {
          background: #F8F8F8;
          box-shadow: inset 4px 4px 0px #A0A0A0;
          transform: translateY(-4px);
        }
        .tall-grass {
          position: absolute;
          width: 40px;
          height: 40px;
          background: #489830;
          clip-path: polygon(0% 100%, 20% 0%, 40% 100%, 60% 0%, 80% 100%, 100% 0%, 100% 100%);
          opacity: 0.6;
          z-index: 0;
        }
        .hp-bar-container {
          width: 100%;
          height: 12px;
          background: #303030;
          border: 2px solid #000;
          position: relative;
        }
        .hp-bar-fill {
          height: 100%;
          background: #70F8A8;
          border-right: 2px solid #000;
          transition: width 0.5s ease;
        }
        .pkmn-input {
          background: #FFF;
          border: 4px solid #303030;
          padding: 12px;
          font-size: 10px;
          width: 100%;
          outline: none;
        }
        .battle-text {
          line-height: 1.8;
          font-size: 12px;
        }
      `}</style>

      {/* Tall Grass Background */}
      {grass.map(g => (
        <div key={g.id} className="tall-grass" style={{ left: `${g.x}%`, top: `${g.y}%` }} />
      ))}

      {/* Header */}
      <header className="p-6 shrink-0 relative z-10">
        <div className="pkmn-panel bg-[#FF0000] border-b-8 border-[#000] p-4 text-center">
          <h1 className="text-xl text-white tracking-widest">POKéMON BATTLE</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-6 pb-24 relative z-10">
        <div className="max-w-md mx-auto h-full pt-4">
          <AnimatePresence mode="wait">
            {activeTab === 'play' && (
              <motion.div key="play" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                {!intensity && !prompt ? (
                  <div className="space-y-10">
                    <div className="pkmn-panel p-6">
                      <div className="mb-6 flex items-center gap-4">
                        <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-black animate-pulse" />
                        <h2 className="text-sm">CHOOSE YOUR DECK</h2>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        <button onClick={() => setActiveDeckId('default')} className={`pkmn-button ${activeDeckId === 'default' ? 'active' : ''}`}>
                          Kanto Classics
                        </button>
                        {customDecks.map(deck => (
                          <button key={deck.id} onClick={() => setActiveDeckId(deck.id)} className={`pkmn-button ${activeDeckId === deck.id ? 'active' : ''}`}>
                            {deck.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pkmn-panel p-6">
                      <h2 className="text-sm mb-6">SELECT DIFFICULTY</h2>
                      <div className="grid grid-cols-1 gap-5">
                        {STAGES.map((stage) => (
                          <button 
                            key={stage.id} 
                            onClick={() => setIntensity(stage.id)}
                            className="pkmn-button flex flex-col items-start p-6"
                            style={{ backgroundColor: stage.color, color: stage.text }}
                          >
                            <span className="text-lg mb-2">{stage.icon} {stage.title}</span>
                            <span className="text-[8px] opacity-80">{stage.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : !prompt ? (
                  <div className="flex flex-col items-center gap-12 py-12">
                    <div className="pkmn-panel p-8 w-full text-center">
                      <p className="text-[10px] mb-4 opacity-60">WILD ENCOUNTER!</p>
                      <h2 className="text-2xl mb-6">{intensity}</h2>
                      <div className="hp-bar-container">
                        <div className="hp-bar-fill w-[100%]" />
                      </div>
                      <p className="text-[8px] mt-2 text-right">HP: 100/100</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6 w-full">
                      <button onClick={() => handleDraw('Truth')} className="pkmn-button py-8 text-lg bg-[#F8F8F8]">TRUTH</button>
                      <button onClick={() => handleDraw('Dare')} className="pkmn-button py-8 text-lg bg-[#F8F8F8]">DARE</button>
                      <button onClick={() => setIntensity(null)} className="col-span-2 pkmn-button py-4 bg-[#D0D0D0]">RUN AWAY</button>
                    </div>
                  </div>
                ) : (
                  <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="pkmn-card space-y-8">
                    <div className="flex justify-between items-center border-b-4 border-[#303030] pb-4">
                      <span className="text-xs font-bold">{prompt.type}</span>
                      <span className="text-[10px]">Lv. {history.length}</span>
                    </div>
                    <div className="pkmn-panel bg-white p-6 min-h-[150px]">
                      <p className="battle-text">"{prompt.text}"</p>
                    </div>
                    <div className="space-y-4">
                      <p className="text-[8px] uppercase tracking-widest text-[#FF0000]">Critical Hit Penalty!</p>
                      <p className="text-xs italic leading-relaxed">"{prompt.penalty}"</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <button onClick={() => setPrompt(null)} className="pkmn-button">DONE</button>
                      <button onClick={() => handleDraw(prompt.type)} className="pkmn-button active">RE-BATTLE</button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'decks' && (
              <motion.div key="decks" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                {!editingDeck ? (
                  <>
                    <div className="flex justify-between items-end border-b-4 border-[#303030] pb-2">
                      <h2 className="text-lg">TRAINER PC</h2>
                      <button onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })} className="pkmn-button text-[8px]">+ NEW</button>
                    </div>
                    <div className="space-y-5">
                      {customDecks.length === 0 ? (
                        <div className="py-20 text-center opacity-40 text-xs italic">NO DATA FOUND IN PC...</div>
                      ) : (
                        customDecks.map(deck => (
                          <div key={deck.id} className="pkmn-panel p-6 flex justify-between items-center">
                            <div>
                              <h3 className="text-sm mb-1">{deck.name || 'Untitled'}</h3>
                              <p className="text-[8px] opacity-60">{deck.prompts.length} ITEMS STORED</p>
                            </div>
                            <div className="flex gap-3">
                              <button onClick={() => setEditingDeck(deck)} className="pkmn-button text-[8px]">ACCESS</button>
                              <button onClick={() => deleteDeck(deck.id)} className="pkmn-button text-[8px] border-red-500 text-red-500">RELEASE</button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </>
                ) : (
                  <div className="pkmn-panel p-8 space-y-8">
                    <div className="space-y-6">
                      <input className="pkmn-input text-lg" value={editingDeck.name} onChange={e => setEditingDeck({...editingDeck, name: e.target.value})} placeholder="DECK NAME" />
                      <textarea className="pkmn-input h-32" value={editingDeck.description} onChange={e => setEditingDeck({...editingDeck, description: e.target.value})} placeholder="DESCRIPTION" />
                    </div>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xs">ITEMS ({editingDeck.prompts.length})</h3>
                        <button onClick={addNewPromptToEditingDeck} className="pkmn-button text-[8px]">+ ADD</button>
                      </div>
                      <div className="space-y-5 max-h-[400px] overflow-y-auto pr-2">
                        {editingDeck.prompts.map(p => (
                          <div key={p.id} className="pkmn-panel p-5 space-y-4 bg-white">
                            <div className="flex gap-3">
                              <select className="pkmn-input !w-auto !p-1 !text-[8px]" value={p.type} onChange={e => updatePromptInEditingDeck(p.id, 'type', e.target.value)}>
                                <option>Truth</option><option>Dare</option>
                              </select>
                              <select className="pkmn-input !w-auto !p-1 !text-[8px]" value={p.intensity} onChange={e => updatePromptInEditingDeck(p.id, 'intensity', e.target.value)}>
                                <option value={Intensity.SOFT}>SOFT</option><option value={Intensity.HOT}>HOT</option><option value={Intensity.VULGAR}>VULGAR</option>
                              </select>
                              <button onClick={() => removePromptFromEditingDeck(p.id)} className="text-red-500 ml-auto text-xs">X</button>
                            </div>
                            <input className="pkmn-input !border-0 !border-b-2" value={p.text} onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)} placeholder="PROMPT TEXT" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={() => setEditingDeck(null)} className="pkmn-button flex-1">CANCEL</button>
                      <button onClick={() => saveDeck(editingDeck)} className="pkmn-button flex-1 active">SAVE</button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                <h2 className="text-lg border-b-4 border-[#303030] pb-2">HALL OF FAME</h2>
                <div className="space-y-5">
                  {history.length === 0 ? (
                    <div className="py-20 text-center opacity-40 text-xs italic">NO BATTLES RECORDED...</div>
                  ) : (
                    history.map((item, i) => (
                      <div key={i} className="pkmn-panel p-6 border-l-8 border-[#303030]">
                        <div className="flex justify-between text-[8px] mb-3 opacity-60">
                          <span>{item.type}</span>
                          <span>BATTLE {history.length-i}</span>
                        </div>
                        <p className="text-xs leading-relaxed">"{item.text}"</p>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'themes' && (
              <motion.div key="themes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                <h2 className="text-lg border-b-4 border-[#303030] pb-2">REGION MAP</h2>
                <div className="grid grid-cols-1 gap-5">
                  <button onClick={() => setTheme(Theme.PERSONA)} className="pkmn-button py-8 text-xs">PHANTOM THIEF</button>
                  <button onClick={() => setTheme(Theme.MINECRAFT)} className="pkmn-button py-8 text-xs">BLOCKY WORLD</button>
                  <button onClick={() => setTheme(Theme.DANGANRONPA)} className="pkmn-button py-8 text-xs">KILLING HARMONY</button>
                  <button onClick={() => setTheme(Theme.OMORI)} className="pkmn-button py-8 text-xs">DREAM WORLD</button>
                  <button onClick={() => setTheme(Theme.KIRBY)} className="pkmn-button py-8 text-xs">KIRBY'S DREAM</button>
                  <button onClick={() => setTheme(Theme.SANRIO)} className="pkmn-button py-8 text-xs">SWEET WORLD</button>
                  <button onClick={() => setTheme(Theme.POKEMON)} className="pkmn-button py-8 text-xs active">POKÉMON WORLD</button>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                <h2 className="text-lg border-b-4 border-[#303030] pb-2">TRAINER BAG</h2>
                <div className="pkmn-panel p-10 space-y-10">
                  <div className="flex justify-between items-center text-xs">
                    <span>BADGES</span><span className="font-bold">8 / 8</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span>POKéDEX</span><span className="font-bold">151 / 151</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span>MONEY</span><span className="font-bold">¥999999</span>
                  </div>
                  <div className="pt-8 border-t-4 border-dotted border-[#303030]">
                    <p className="text-[8px] text-center leading-relaxed">"I like shorts! They're comfy and easy to wear!"</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-[#D0D0D0] border-t-8 border-[#303030] h-24 z-50">
        <div className="flex justify-around items-center h-full px-4 gap-4">
          {tabs.map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`pkmn-nav-btn flex-1 h-16 ${activeTab === tab.id ? 'active' : ''}`}
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

