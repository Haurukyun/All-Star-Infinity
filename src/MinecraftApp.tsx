
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme } from './types';
import { useGameLogic } from './hooks/useGameLogic';

const STAGES = [
  { id: Intensity.SOFT, title: 'PEACEFUL', desc: 'VILLAGE LIFE', color: '#55FF55', text: '#000000' },
  { id: Intensity.HOT, title: 'NETHER', desc: 'INTO THE FIRE', color: '#AA0000', text: '#FFFFFF' },
  { id: Intensity.VULGAR, title: 'THE END', desc: 'DRAGON SLAYER', color: '#373737', text: '#FFFFFF' },
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
    { id: 'play', label: 'PLAY' },
    { id: 'decks', label: 'DECKS' },
    { id: 'history', label: 'LOGS' },
    { id: 'themes', label: 'THEME' },
    { id: 'settings', label: 'META' },
  ];

  return (
    <div className="minecraft-theme h-screen w-screen flex flex-col bg-[#4c4c4c] text-white overflow-hidden font-['VT323']">
      <style>{`
        .minecraft-theme {
          background-image: 
            linear-gradient(rgba(0,0,0,0.3) 2px, transparent 2px),
            linear-gradient(90deg, rgba(0,0,0,0.3) 2px, transparent 2px);
          background-size: 32px 32px;
          image-rendering: pixelated;
        }
        .mc-panel {
          background: #c6c6c6;
          border: 4px solid #000;
          box-shadow: inset -4px -4px #555, inset 4px 4px #fff;
          color: #000;
        }
        .mc-button {
          background: #c6c6c6;
          border: 4px solid #000;
          box-shadow: inset -4px -4px #555, inset 4px 4px #fff;
          color: #000;
          padding: 8px 16px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.1s;
          display: inline-block;
          text-align: center;
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
        }
        .mc-input {
          background: #000;
          color: #55FF55;
          border: 2px solid #555;
          padding: 8px;
          font-family: 'VT323', monospace;
          outline: none;
        }
        .mc-card {
          background: #373737;
          border: 4px solid #000;
          padding: 16px;
          color: #fff;
        }
        .mc-header {
          text-shadow: 4px 4px #3f3f3f;
          letter-spacing: 2px;
        }
      `}</style>

      {/* Header */}
      <header className="p-6 text-center shrink-0">
        <h1 className="text-5xl mc-header text-[#55FF55] uppercase">MINECRAFT: OBSIDIAN</h1>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-6 pb-24">
        <div className="max-w-md mx-auto h-full">
          <AnimatePresence mode="wait">
            {activeTab === 'play' && (
              <motion.div key="play" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                {!intensity && !prompt ? (
                  <div className="space-y-8">
                    <div className="mc-panel p-4">
                      <h2 className="text-2xl mb-4 uppercase">Select World</h2>
                      <div className="grid grid-cols-1 gap-3">
                        <button onClick={() => setActiveDeckId('default')} className={`mc-button ${activeDeckId === 'default' ? 'active' : ''}`}>
                          Overworld (Default)
                        </button>
                        {customDecks.map(deck => (
                          <button key={deck.id} onClick={() => setActiveDeckId(deck.id)} className={`mc-button ${activeDeckId === deck.id ? 'active' : ''}`}>
                            {deck.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mc-panel p-4">
                      <h2 className="text-2xl mb-4 uppercase">Difficulty</h2>
                      <div className="grid grid-cols-1 gap-4">
                        {STAGES.map((stage) => (
                          <button 
                            key={stage.id} 
                            onClick={() => setIntensity(stage.id)}
                            className="mc-button flex flex-col items-center py-4"
                            style={{ backgroundColor: stage.color, color: stage.text }}
                          >
                            <span className="text-3xl">{stage.title}</span>
                            <span className="text-sm opacity-70">{stage.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : !prompt ? (
                  <div className="flex flex-col items-center gap-8 py-12">
                    <div className="text-center">
                      <p className="text-[#55FF55] text-xl">CHALLENGE LEVEL</p>
                      <h2 className="text-6xl mc-header">{intensity}</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 w-full">
                      <button onClick={() => handleDraw('Truth')} className="mc-button text-4xl py-6 bg-[#55FF55]">TRUTH</button>
                      <button onClick={() => handleDraw('Dare')} className="mc-button text-4xl py-6 bg-[#FF5555]">ACTION</button>
                      <button onClick={() => setIntensity(null)} className="text-white/40 uppercase tracking-widest mt-4">Abort Mission</button>
                    </div>
                  </div>
                ) : (
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mc-card space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="bg-[#55FF55] text-black px-3 py-1 text-2xl">{prompt.type}</span>
                      <span className="text-white/40">ID {history.length}</span>
                    </div>
                    <p className="text-4xl leading-tight">"{prompt.text}"</p>
                    <div className="pt-4 border-t-4 border-[#555] border-dotted">
                      <p className="text-[#FF5555] text-xl">PENALTY</p>
                      <p className="text-2xl opacity-80">{prompt.penalty}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-6">
                      <button onClick={() => setPrompt(null)} className="mc-button">BACK</button>
                      <button onClick={() => handleDraw(prompt.type)} className="mc-button bg-[#55FF55]">RE-ROLL</button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'decks' && (
              <motion.div key="decks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                {!editingDeck ? (
                  <>
                    <div className="flex justify-between items-end">
                      <h2 className="text-4xl mc-header">FORGE</h2>
                      <button onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })} className="mc-button">+ NEW</button>
                    </div>
                    <div className="space-y-4">
                      {customDecks.map(deck => (
                        <div key={deck.id} className="mc-panel p-4 flex justify-between items-center">
                          <div>
                            <h3 className="text-2xl">{deck.name || 'Untitled'}</h3>
                            <p className="text-sm opacity-60">{deck.prompts.length} cards</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => setEditingDeck(deck)} className="mc-button text-sm">EDIT</button>
                            <button onClick={() => deleteDeck(deck.id)} className="mc-button text-sm bg-[#FF5555]">DEL</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="mc-panel p-6 space-y-6">
                    <div className="space-y-4">
                      <input className="mc-input w-full text-3xl" value={editingDeck.name} onChange={e => setEditingDeck({...editingDeck, name: e.target.value})} placeholder="DECK NAME" />
                      <textarea className="mc-input w-full text-xl h-24" value={editingDeck.description} onChange={e => setEditingDeck({...editingDeck, description: e.target.value})} placeholder="DESCRIPTION" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-2xl">CARDS ({editingDeck.prompts.length})</h3>
                        <button onClick={addNewPromptToEditingDeck} className="mc-button text-sm">+ ADD</button>
                      </div>
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {editingDeck.prompts.map(p => (
                          <div key={p.id} className="mc-card p-3 space-y-2">
                            <div className="flex gap-2">
                              <select className="mc-input text-sm" value={p.type} onChange={e => updatePromptInEditingDeck(p.id, 'type', e.target.value)}>
                                <option>Truth</option><option>Dare</option>
                              </select>
                              <select className="mc-input text-sm" value={p.intensity} onChange={e => updatePromptInEditingDeck(p.id, 'intensity', e.target.value)}>
                                <option value={Intensity.SOFT}>SOFT</option><option value={Intensity.HOT}>HOT</option><option value={Intensity.VULGAR}>VULGAR</option>
                              </select>
                              <button onClick={() => removePromptFromEditingDeck(p.id)} className="text-[#FF5555] ml-auto">X</button>
                            </div>
                            <input className="mc-input w-full text-lg" value={p.text} onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)} placeholder="PROMPT..." />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setEditingDeck(null)} className="mc-button flex-1">CANCEL</button>
                      <button onClick={() => saveDeck(editingDeck)} className="mc-button flex-1 bg-[#55FF55]">SAVE</button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <h2 className="text-4xl mc-header">ARCHIVES</h2>
                <div className="space-y-3">
                  {history.map((item, i) => (
                    <div key={i} className="mc-panel p-3">
                      <div className="flex justify-between text-[#FF5555] text-sm mb-1">
                        <span>{item.type}</span>
                        <span>LOG {history.length-i}</span>
                      </div>
                      <p className="text-xl italic">"{item.text}"</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'themes' && (
              <motion.div key="themes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <h2 className="text-4xl mc-header">DIMENSIONS</h2>
                <div className="grid grid-cols-1 gap-4">
                  <button onClick={() => setTheme(Theme.PERSONA)} className="mc-button py-8 text-3xl">PERSONA 5</button>
                  <button onClick={() => setTheme(Theme.MINECRAFT)} className="mc-button py-8 text-3xl active">MINECRAFT</button>
                  <button onClick={() => setTheme(Theme.DANGANRONPA)} className="mc-button py-8 text-3xl">DANGANRONPA</button>
                  <button onClick={() => setTheme(Theme.OMORI)} className="mc-button py-8 text-3xl">OMORI</button>
                  <button onClick={() => setTheme(Theme.KIRBY)} className="mc-button py-8 text-3xl">KIRBY</button>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <h2 className="text-4xl mc-header">SYSTEM</h2>
                <div className="mc-panel p-6 space-y-4">
                  <div className="flex justify-between items-center text-2xl">
                    <span>HEART SYNC</span><span className="text-[#55FF55]">STABLE</span>
                  </div>
                  <div className="flex justify-between items-center text-2xl">
                    <span>COGNITION</span><span className="text-[#55FF55]">ENHANCED</span>
                  </div>
                  <div className="flex justify-between items-center text-2xl">
                    <span>PLAYER</span><span className="text-[#55FF55]">STEVE</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 w-full mc-panel h-20 z-50">
        <div className="flex justify-around items-center h-full px-2">
          {tabs.map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`mc-button text-xl flex-1 mx-1 ${activeTab === tab.id ? 'active' : ''}`}
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
