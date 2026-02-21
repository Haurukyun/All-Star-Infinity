import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme } from './types';
import { useGameLogic } from './hooks/useGameLogic';

const STAGES = [
  { id: Intensity.SOFT, title: 'NORMAL', desc: 'EFFECTIVE', color: '#A8A878', text: '#FFFFFF', icon: '⚪' },
  { id: Intensity.HOT, title: 'FIRE', desc: 'SUPER EFFECTIVE', color: '#F08030', text: '#FFFFFF', icon: '🔥' },
  { id: Intensity.VULGAR, title: 'GHOST', desc: 'CRITICAL HIT', color: '#705898', text: '#FFFFFF', icon: '👻' },
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
    { id: 'play', label: 'FIGHT', icon: '⚔️' },
    { id: 'decks', label: 'BAG', icon: '🎒' },
    { id: 'history', label: 'DEX', icon: '📱' },
    { id: 'themes', label: 'MAP', icon: '🗺️' },
    { id: 'settings', label: 'SAVE', icon: '💾' },
  ];

  return (
    <div className="pokemon-theme h-[100dvh] w-screen flex flex-col bg-[#303030] text-[#404040] overflow-hidden font-['Press_Start_2P'] relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        .pokemon-theme {
          font-family: 'Press Start 2P', cursive;
          background-color: #202020;
          background-image: 
            linear-gradient(45deg, #252525 25%, transparent 25%), 
            linear-gradient(-45deg, #252525 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #252525 75%), 
            linear-gradient(-45deg, transparent 75%, #252525 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }

        .poke-panel {
          background: #F8F8D0;
          border: 4px solid #606060;
          border-radius: 8px;
          box-shadow: 
            inset 0 0 0 4px #D0D0A8,
            0 4px 0 rgba(0,0,0,0.4);
          position: relative;
          padding: 16px;
        }

        .poke-panel-blue {
          background: #E0F0F8;
          border-color: #405080;
          box-shadow: 
            inset 0 0 0 4px #A8C0D8,
            0 4px 0 rgba(0,0,0,0.4);
        }

        .poke-header {
          background: #F08030;
          color: white;
          text-shadow: 2px 2px 0 #A04000;
          padding: 8px 16px;
          border-radius: 16px;
          border: 2px solid white;
          box-shadow: 0 2px 0 rgba(0,0,0,0.2);
          display: inline-block;
          margin-bottom: 12px;
        }

        .poke-btn {
          background: #F8F8F8;
          border: 2px solid #808080;
          border-radius: 4px;
          padding: 12px;
          cursor: pointer;
          position: relative;
          text-align: left;
          box-shadow: 0 4px 0 #C0C0C0;
          transition: transform 0.1s, box-shadow 0.1s;
        }
        .poke-btn:active {
          transform: translateY(4px);
          box-shadow: 0 0 0 #C0C0C0;
        }
        .poke-btn.active {
          background: #F8D030;
          border-color: #C08000;
          box-shadow: 0 4px 0 #D0A000;
        }
        .poke-btn.active:active {
          box-shadow: 0 0 0 #D0A000;
        }

        .poke-type-tag {
          padding: 4px 8px;
          border-radius: 4px;
          color: white;
          font-size: 10px;
          text-transform: uppercase;
          text-shadow: 1px 1px 0 rgba(0,0,0,0.3);
          border: 1px solid rgba(0,0,0,0.2);
        }

        .poke-list-item {
          display: flex;
          align-items: center;
          padding: 8px;
          border-bottom: 2px dashed #C0C0C0;
        }
        .poke-list-item:last-child {
          border-bottom: none;
        }

        .cursor-triangle {
          width: 0; 
          height: 0; 
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 10px solid #404040;
          margin-right: 8px;
        }

        .nav-pill {
          background: #404040;
          color: #808080;
          border-radius: 8px 8px 0 0;
          padding: 8px;
          text-align: center;
          border: 2px solid #202020;
          border-bottom: none;
          margin: 0 2px;
        }
        .nav-pill.active {
          background: #F8F8D0;
          color: #404040;
          padding-bottom: 12px;
          margin-top: -4px;
        }

        /* Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F0F0F0;
          border-left: 2px solid #C0C0C0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #C0C0C0;
          border: 2px solid #808080;
          border-radius: 4px;
        }
      `}</style>

      {/* Header */}
      <header className="p-4 shrink-0 relative z-10 bg-[#D04040] border-b-4 border-[#802020] shadow-md flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full border-4 border-[#404040] flex items-center justify-center relative overflow-hidden">
             <div className="absolute top-1/2 left-0 w-full h-1 bg-[#404040] -translate-y-1/2"></div>
             <div className="w-3 h-3 bg-white rounded-full border-2 border-[#404040] relative z-10"></div>
          </div>
          <span className="text-sm tracking-tighter">POKéMON TRUTH/DARE</span>
        </div>
        <div className="text-xs bg-[#A03030] px-2 py-1 rounded border border-[#802020]">
          v1.0
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-2 pb-24 relative z-10 custom-scrollbar bg-[#70D090]">
        <div className="max-w-md mx-auto h-full pt-4">
          <AnimatePresence mode="wait">
            {activeTab === 'play' && (
              <motion.div key="play" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                {!intensity && !prompt ? (
                  <div className="space-y-4">
                    {/* Deck Selector */}
                    <div className="poke-panel">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-sm">SELECT DECK</h2>
                        <span className="text-xs text-gray-500">{customDecks.length + 1} ITEMS</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div 
                          onClick={() => setActiveDeckId('default')}
                          className={`poke-list-item cursor-pointer hover:bg-[#F0F0C0] ${activeDeckId === 'default' ? 'bg-[#E8E8A0]' : ''}`}
                        >
                          {activeDeckId === 'default' && <div className="cursor-triangle"></div>}
                          <div className="flex-1">
                            <div className="text-sm">STANDARD DECK</div>
                            <div className="text-[10px] text-gray-500">The classic experience</div>
                          </div>
                          <span className="poke-type-tag bg-[#A8A878]">NORMAL</span>
                        </div>
                        
                        {customDecks.map(deck => (
                          <div 
                            key={deck.id}
                            onClick={() => setActiveDeckId(deck.id)}
                            className={`poke-list-item cursor-pointer hover:bg-[#F0F0C0] ${activeDeckId === deck.id ? 'bg-[#E8E8A0]' : ''}`}
                          >
                            {activeDeckId === deck.id && <div className="cursor-triangle"></div>}
                            <div className="flex-1">
                              <div className="text-sm">{deck.name.toUpperCase()}</div>
                              <div className="text-[10px] text-gray-500">{deck.prompts.length} CARDS</div>
                            </div>
                            <span className="poke-type-tag bg-[#6890F0]">CUSTOM</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Difficulty Selector */}
                    <div className="poke-panel poke-panel-blue">
                      <h2 className="text-sm mb-4">SELECT DIFFICULTY</h2>
                      <div className="grid grid-cols-1 gap-3">
                        {STAGES.map((stage) => (
                          <button 
                            key={stage.id} 
                            onClick={() => setIntensity(stage.id)}
                            className="poke-btn flex items-center gap-4"
                          >
                            <div className="w-8 h-8 flex items-center justify-center text-xl bg-white rounded border border-gray-400">
                              {stage.icon}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm" style={{ color: stage.color }}>{stage.title}</div>
                              <div className="text-[10px] text-gray-500">{stage.desc}</div>
                            </div>
                            <div className="text-xs">▶</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : !prompt ? (
                  <div className="flex flex-col items-center justify-center h-[60vh]">
                    <div className="poke-panel w-full text-center space-y-6 border-double border-8 border-[#404040]">
                      <div className="bg-[#404040] text-white py-2 -mx-4 -mt-4 mb-4 text-center text-xs">
                        A WILD PROMPT APPEARED!
                      </div>
                      
                      <div className="py-4">
                        <div className="w-24 h-24 mx-auto bg-[#F8F8F8] rounded-full border-4 border-[#D0D0D0] flex items-center justify-center mb-4">
                          <span className="text-4xl animate-bounce">
                            {intensity === Intensity.SOFT ? '⚪' : intensity === Intensity.HOT ? '🔥' : '👻'}
                          </span>
                        </div>
                        <div className="text-sm">Lv.{intensity === Intensity.SOFT ? '5' : intensity === Intensity.HOT ? '50' : '100'} {intensity}</div>
                      </div>

                      <div className="bg-[#A0A0A0] p-4 rounded border-2 border-[#606060] grid grid-cols-2 gap-2">
                        <button onClick={() => handleDraw('Truth')} className="bg-[#F8F8F8] border-2 border-[#404040] p-2 hover:bg-[#E0E0E0] text-left text-xs">
                          TRUTH
                        </button>
                        <button onClick={() => handleDraw('Dare')} className="bg-[#F8F8F8] border-2 border-[#404040] p-2 hover:bg-[#E0E0E0] text-left text-xs">
                          DARE
                        </button>
                        <button onClick={() => setIntensity(null)} className="bg-[#F8F8F8] border-2 border-[#404040] p-2 hover:bg-[#E0E0E0] text-left text-xs">
                          RUN
                        </button>
                        <button className="bg-[#F8F8F8] border-2 border-[#404040] p-2 hover:bg-[#E0E0E0] text-left text-xs text-gray-400 cursor-not-allowed">
                          BAG
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="poke-panel mt-4">
                    <div className="flex justify-between items-start mb-4 border-b-2 border-[#D0D0A8] pb-2">
                      <div>
                        <span className="text-xs text-gray-500">No. {history.length.toString().padStart(3, '0')}</span>
                        <h2 className="text-sm">{prompt.type.toUpperCase()}</h2>
                      </div>
                      <span className={`poke-type-tag ${prompt.type === 'Truth' ? 'bg-[#6890F0]' : 'bg-[#C03028]'}`}>
                        {prompt.type.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="bg-white border-2 border-[#C0C0C0] p-4 rounded mb-4 min-h-[120px] flex items-center justify-center text-center">
                      <p className="text-sm leading-relaxed">
                        {prompt.text}
                      </p>
                    </div>

                    <div className="bg-[#E0E0E0] p-2 rounded border border-[#C0C0C0] mb-4">
                      <div className="text-[10px] text-gray-500 mb-1">EFFECT:</div>
                      <div className="text-xs text-[#C03028]">{prompt.penalty}</div>
                    </div>

                    <div className="flex gap-2">
                      <button onClick={() => setPrompt(null)} className="flex-1 poke-btn text-center text-xs">
                        GOT IT!
                      </button>
                      <button onClick={() => handleDraw(prompt.type)} className="flex-1 poke-btn text-center text-xs bg-[#E0F0F8]">
                        AGAIN
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'decks' && (
              <motion.div key="decks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                {!editingDeck ? (
                  <>
                    <div className="poke-panel poke-panel-blue">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-sm">YOUR BAG</h2>
                        <button onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })} className="text-[10px] bg-[#6890F0] text-white px-2 py-1 rounded border border-[#405080]">
                          NEW ITEM
                        </button>
                      </div>
                      
                      <div className="bg-white border-2 border-[#A8C0D8] rounded h-[60vh] overflow-y-auto p-2 custom-scrollbar">
                        {customDecks.length === 0 ? (
                          <div className="text-center py-8 text-gray-500 text-xs">
                            THE BAG IS EMPTY.
                          </div>
                        ) : (
                          customDecks.map(deck => (
                            <div key={deck.id} className="poke-list-item">
                              <div className="w-8 h-8 bg-[#F8F8F8] border border-gray-300 rounded flex items-center justify-center mr-2 text-lg">
                                💿
                              </div>
                              <div className="flex-1">
                                <div className="text-xs">{deck.name || '????'}</div>
                                <div className="text-[10px] text-gray-500">x{deck.prompts.length}</div>
                              </div>
                              <button onClick={() => setEditingDeck(deck)} className="text-[10px] text-blue-500 mr-2">USE</button>
                              <button onClick={() => deleteDeck(deck.id)} className="text-[10px] text-red-500">TOSS</button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="poke-panel">
                    <h2 className="text-sm mb-4">TM CASE</h2>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500">NAME</label>
                        <input className="w-full bg-white border-2 border-[#C0C0C0] p-2 text-xs outline-none focus:border-[#6890F0]" value={editingDeck.name} onChange={e => setEditingDeck({...editingDeck, name: e.target.value})} placeholder="TM NAME" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500">DESCRIPTION</label>
                        <textarea className="w-full bg-white border-2 border-[#C0C0C0] p-2 text-xs outline-none focus:border-[#6890F0] h-16" value={editingDeck.description} onChange={e => setEditingDeck({...editingDeck, description: e.target.value})} placeholder="INFO..." />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] text-gray-500">MOVES ({editingDeck.prompts.length})</label>
                          <button onClick={addNewPromptToEditingDeck} className="text-[10px] bg-[#78C850] text-white px-2 py-1 rounded border border-[#408020]">+ ADD</button>
                        </div>
                        <div className="bg-white border-2 border-[#C0C0C0] rounded h-[30vh] overflow-y-auto p-2 custom-scrollbar space-y-2">
                          {editingDeck.prompts.map(p => (
                            <div key={p.id} className="bg-[#F8F8F8] border border-[#E0E0E0] p-2 rounded">
                              <div className="flex gap-2 mb-1">
                                <select className="bg-white border border-[#C0C0C0] text-[10px] p-1 rounded" value={p.type} onChange={e => updatePromptInEditingDeck(p.id, 'type', e.target.value)}>
                                  <option>Truth</option><option>Dare</option>
                                </select>
                                <button onClick={() => removePromptFromEditingDeck(p.id)} className="ml-auto text-red-500 text-xs">×</button>
                              </div>
                              <input className="w-full bg-transparent border-b border-[#E0E0E0] text-xs outline-none mb-1" value={p.text} onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)} placeholder="Move Name..." />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button onClick={() => setEditingDeck(null)} className="flex-1 poke-btn text-center text-xs">BACK</button>
                        <button onClick={() => saveDeck(editingDeck)} className="flex-1 poke-btn text-center text-xs bg-[#78C850] text-white border-[#408020]">SAVE</button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="poke-panel poke-panel-blue">
                  <h2 className="text-sm mb-4">POKéDEX</h2>
                  <div className="bg-white border-2 border-[#A8C0D8] rounded h-[70vh] overflow-y-auto custom-scrollbar">
                    {history.map((item, i) => (
                      <div key={i} className="poke-list-item hover:bg-[#E0F0F8]">
                        <div className="text-[10px] text-gray-500 w-8">{(history.length - i).toString().padStart(3, '0')}</div>
                        <div className="w-6 h-6 bg-[#F0F0F0] rounded-full flex items-center justify-center mr-2 text-xs">
                          {item.type === 'Truth' ? '🔵' : '🔴'}
                        </div>
                        <div className="flex-1">
                          <div className="text-xs truncate">{item.text}</div>
                        </div>
                        <span className="text-[10px] bg-[#E0E0E0] px-1 rounded">SEEN</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'themes' && (
              <motion.div key="themes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="poke-panel">
                  <h2 className="text-sm mb-4">TOWN MAP</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: Theme.PERSONA, label: 'TOKYO', color: '#D04040' },
                      { id: Theme.MINECRAFT, label: 'MINING', color: '#78C850' },
                      { id: Theme.DANGANRONPA, label: 'ACADEMY', color: '#F08030' },
                      { id: Theme.OMORI, label: 'HEADSPACE', color: '#A890F0' },
                      { id: Theme.KIRBY, label: 'DREAMLAND', color: '#F85888' },
                      { id: Theme.POKEMON, label: 'KANTO', color: '#6890F0' },
                    ].map(t => (
                      <button 
                        key={t.id}
                        onClick={() => setTheme(t.id as Theme)}
                        className={`poke-btn flex flex-col items-center justify-center gap-2 h-24 ${theme === t.id ? 'active' : ''}`}
                      >
                        <div className="w-8 h-8 rounded-full border-2 border-gray-400" style={{ background: t.color }}></div>
                        <span className="text-[10px]">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="poke-panel">
                  <h2 className="text-sm mb-4">TRAINER CARD</h2>
                  <div className="bg-[#E0E0E0] p-4 rounded border-2 border-[#A0A0A0] space-y-4">
                    <div className="flex justify-between border-b border-gray-400 pb-2">
                      <span className="text-xs">NAME</span>
                      <span className="text-xs font-bold">PLAYER</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-400 pb-2">
                      <span className="text-xs">MONEY</span>
                      <span className="text-xs font-bold">$999999</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-400 pb-2">
                      <span className="text-xs">TIME</span>
                      <span className="text-xs font-bold">12:00</span>
                    </div>
                    <div className="pt-2">
                      <span className="text-xs">BADGES</span>
                      <div className="flex gap-1 mt-2">
                        {[1,2,3,4,5,6,7,8].map(i => (
                          <div key={i} className="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 border border-yellow-700 shadow-sm"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center text-[10px] text-gray-500">
                    GAME FREAK / NINTENDO
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 w-full h-16 z-50 bg-[#404040] border-t-4 border-[#202020]">
        <div className="flex justify-around items-end h-full px-2 pb-0">
          {tabs.map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`nav-pill flex-1 flex flex-col items-center justify-center gap-1 h-14 transition-all ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="text-[8px]">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default PokemonApp;
