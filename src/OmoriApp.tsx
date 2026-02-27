
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme } from './types';
import { useGameLogic } from './hooks/useGameLogic';

const STAGES = [
  { id: Intensity.SOFT, title: 'WHITE SPACE', desc: 'CALM AND EMPTY', color: '#FFFFFF', text: '#000000' },
  { id: Intensity.HOT, title: 'HEADSPACE', desc: 'VIVID DREAMS', color: '#B088FF', text: '#FFFFFF' },
  { id: Intensity.VULGAR, title: 'BLACK SPACE', desc: 'DEEP TRUTHS', color: '#000000', text: '#FF0000' },
];

const OmoriApp: React.FC<{ logic: ReturnType<typeof useGameLogic> }> = ({ logic }) => {
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
    { id: 'play', label: 'DREAM' },
    { id: 'decks', label: 'MEMORIES' },
    { id: 'history', label: 'TRUTH' },
    { id: 'themes', label: 'REALITY' },
    { id: 'settings', label: 'HEART' },
  ];

  return (
    <div className="omori-theme h-[100dvh] w-screen flex flex-col bg-white text-black overflow-hidden font-['Gloria_Hallelujah']">
      <style>{`
        @keyframes sketchy {
          0% { border-radius: 2px 4px 2px 8px; }
          50% { border-radius: 8px 2px 4px 2px; }
          100% { border-radius: 2px 4px 2px 8px; }
        }
        .omori-theme {
          background-color: #fff;
          background-image: radial-gradient(#ddd 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .omori-panel {
          background: #fff;
          border: 3px solid #000;
          box-shadow: 4px 4px 0px #000;
          animation: sketchy 2s ease-in-out infinite;
        }
        .omori-button {
          background: #fff;
          border: 2px solid #000;
          color: #000;
          padding: 8px 16px;
          cursor: pointer;
          transition: all 0.1s;
          box-shadow: 2px 2px 0px #000;
        }
        .omori-button:hover {
          background: #000;
          color: #fff;
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0px #000;
        }
        .omori-button.active {
          background: #000;
          color: #fff;
        }
        .omori-card {
          background: #fff;
          border: 4px solid #000;
          padding: 24px;
          box-shadow: 8px 8px 0px #000;
          animation: sketchy 3s ease-in-out infinite;
        }
        .omori-header {
          font-family: 'Gloria Hallelujah', cursive;
          font-weight: bold;
          font-size: 2.5rem;
        }
        .omori-nav-btn {
          background: transparent;
          border: none;
          color: #000;
          font-size: 14px;
          transition: all 0.2s;
        }
        .omori-nav-btn.active {
          text-decoration: underline;
          font-weight: bold;
          transform: scale(1.1);
        }
        .headspace-bg {
          background-color: #B088FF !important;
          color: #fff !important;
        }
        .blackspace-bg {
          background-color: #000 !important;
          color: #ff0000 !important;
          border-color: #ff0000 !important;
        }
        .blackspace-bg .omori-panel, .blackspace-bg .omori-card {
          border-color: #ff0000 !important;
          box-shadow: 4px 4px 0px #ff0000 !important;
          background: #000 !important;
        }
        .blackspace-bg .omori-button {
          border-color: #ff0000 !important;
          color: #ff0000 !important;
          background: #000 !important;
        }
        .blackspace-bg .omori-button:hover {
          background: #ff0000 !important;
          color: #000 !important;
        }
      `}</style>

      {/* Header */}
      <header className="p-6 flex justify-center items-center shrink-0">
        <h1 className="omori-header">OMORI</h1>
      </header>

      {/* Content */}
      <main className={`flex-1 overflow-y-auto px-6 transition-colors duration-500 ${intensity === Intensity.HOT ? 'headspace-bg' : intensity === Intensity.VULGAR ? 'blackspace-bg' : ''}`}>
        <div className="max-w-md mx-auto pt-4">
          <AnimatePresence mode="wait">
            {activeTab === 'play' && (
              <motion.div key="play" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                {!intensity && !prompt ? (
                  <div className="space-y-8">
                    <div className="omori-panel p-6">
                      <h2 className="text-xl mb-4 border-b-2 border-black pb-1">WHICH MEMORY?</h2>
                      <div className="grid grid-cols-1 gap-3">
                        <button onClick={() => setActiveDeckId('default')} className={`omori-button ${activeDeckId === 'default' ? 'active' : ''}`}>
                          STILL HERE
                        </button>
                        {customDecks.map(deck => (
                          <button key={deck.id} onClick={() => setActiveDeckId(deck.id)} className={`omori-button ${activeDeckId === deck.id ? 'active' : ''}`}>
                            {deck.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="omori-panel p-6">
                      <h2 className="text-xl mb-4 border-b-2 border-black pb-1">HOW DEEP?</h2>
                      <div className="grid grid-cols-1 gap-4">
                        {STAGES.map((stage) => (
                          <button 
                            key={stage.id} 
                            onClick={() => setIntensity(stage.id)}
                            className="omori-button flex flex-col items-center py-4"
                            style={{ backgroundColor: stage.color, color: stage.text }}
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
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-center"
                    >
                      <p className="text-sm opacity-60 mb-2">YOU ARE AT...</p>
                      <h2 className="text-4xl font-bold">{intensity}</h2>
                    </motion.div>
                    <div className="grid grid-cols-1 gap-6 w-full">
                      <button onClick={() => handleDraw('Truth')} className="omori-button text-3xl py-6">TRUTH</button>
                      <button onClick={() => handleDraw('Dare')} className="omori-button text-3xl py-6">DARE</button>
                      <button onClick={() => setIntensity(null)} className="text-xs opacity-40 mt-4 hover:opacity-100 transition-opacity">Go back to sleep</button>
                    </div>
                  </div>
                ) : (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="omori-card space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="border-2 border-black px-3 py-1 text-lg">{prompt.type}</span>
                      <span className="opacity-40 text-sm">#{history.length}</span>
                    </div>
                    <p className="text-3xl leading-tight">"{prompt.text}"</p>
                    <div className="pt-4 border-t-2 border-black border-dotted">
                      <p className="text-sm opacity-60 mb-1 uppercase">Something happened...</p>
                      <p className="text-xl italic">{prompt.penalty}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-6">
                      <button onClick={() => setPrompt(null)} className="omori-button">FORGET</button>
                      <button onClick={() => handleDraw(prompt.type)} className="omori-button active">REMEMBER</button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'decks' && (
              <motion.div key="decks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                {!editingDeck ? (
                  <>
                    <div className="flex justify-between items-end border-b-2 border-black pb-1">
                      <h2 className="text-3xl">SKETCHBOOK</h2>
                      <button onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })} className="omori-button text-xs">+ NEW</button>
                    </div>
                    <div className="space-y-4">
                      {customDecks.map(deck => (
                        <div key={deck.id} className="omori-panel p-4 flex justify-between items-center">
                          <div>
                            <h3 className="text-xl">{deck.name || 'Untitled'}</h3>
                            <p className="text-xs opacity-60">{deck.prompts.length} drawings</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => setEditingDeck(deck)} className="omori-button text-xs">EDIT</button>
                            <button onClick={() => deleteDeck(deck.id)} className="omori-button text-xs border-red-500 text-red-500">ERASE</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="omori-panel p-6 space-y-6">
                    <div className="space-y-4">
                      <input className="w-full border-b-2 border-black p-2 text-2xl focus:outline-none" value={editingDeck.name} onChange={e => setEditingDeck({...editingDeck, name: e.target.value})} placeholder="NAME YOUR MEMORY" />
                      <textarea className="w-full border-2 border-black p-2 text-sm h-24 focus:outline-none" value={editingDeck.description} onChange={e => setEditingDeck({...editingDeck, description: e.target.value})} placeholder="WHAT HAPPENED?" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl">DRAWINGS ({editingDeck.prompts.length})</h3>
                        <button onClick={addNewPromptToEditingDeck} className="omori-button text-xs">+ ADD</button>
                      </div>
                      <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                        {editingDeck.prompts.map(p => (
                          <div key={p.id} className="omori-panel p-4 space-y-3">
                            <div className="flex gap-2">
                              <select className="border border-black text-xs p-1" value={p.type} onChange={e => updatePromptInEditingDeck(p.id, 'type', e.target.value)}>
                                <option>Truth</option><option>Dare</option>
                              </select>
                              <select className="border border-black text-xs p-1" value={p.intensity} onChange={e => updatePromptInEditingDeck(p.id, 'intensity', e.target.value)}>
                                <option value={Intensity.SOFT}>SOFT</option><option value={Intensity.HOT}>HOT</option><option value={Intensity.VULGAR}>VULGAR</option>
                              </select>
                              <button onClick={() => removePromptFromEditingDeck(p.id)} className="text-red-500 ml-auto font-bold">X</button>
                            </div>
                            <input className="w-full border-b border-black text-sm p-1 focus:outline-none" value={p.text} onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)} placeholder="What is it?" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setEditingDeck(null)} className="omori-button flex-1">CANCEL</button>
                      <button onClick={() => saveDeck(editingDeck)} className="omori-button flex-1 active">SAVE</button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <h2 className="text-3xl border-b-2 border-black pb-1">PAST MEMORIES</h2>
                <div className="space-y-3">
                  {history.map((item, i) => (
                    <div key={i} className="omori-panel p-4">
                      <div className="flex justify-between text-xs mb-2 opacity-60">
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
                <h2 className="text-3xl border-b-2 border-black pb-1">REALITY CHECK</h2>
                <div className="grid grid-cols-1 gap-4">
                  <button onClick={() => setTheme(Theme.PERSONA)} className="omori-button py-6 text-xl">PHANTOM THIEF</button>
                  <button onClick={() => setTheme(Theme.MINECRAFT)} className="omori-button py-6 text-xl">BLOCKY WORLD</button>
                  <button onClick={() => setTheme(Theme.DANGANRONPA)} className="omori-button py-6 text-xl">KILLING HARMONY</button>
                  <button onClick={() => setTheme(Theme.OMORI)} className="omori-button py-6 text-xl active">DREAM WORLD</button>
                  <button onClick={() => setTheme(Theme.KIRBY)} className="omori-button py-6 text-xl">DREAM LAND</button>
                  <button onClick={() => setTheme(Theme.POKEMON)} className="omori-button py-6 text-xl">KANTO REGION</button>
                  <button onClick={() => setTheme(Theme.ANIMAL_CROSSING)} className="omori-button py-6 text-xl">ISLAND PARADISE</button>
                  <button onClick={() => setTheme(Theme.SKYRIM)} className="omori-button py-6 text-xl">SKYRIM</button>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <h2 className="text-3xl border-b-2 border-black pb-1">INNER HEART</h2>
                <div className="omori-panel p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <span>HAPPINESS</span><span className="font-bold">LOW</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>SADNESS</span><span className="font-bold">HIGH</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>ANXIETY</span><span className="font-bold animate-pulse">PEAK</span>
                  </div>
                  <div className="pt-4 border-t border-black/10">
                    <p className="text-xs opacity-40 text-center">Everything is going to be okay.</p>
                  </div>
                  <button onClick={() => logic.setView('menu')} className="w-full omori-button text-xs mt-4">
                    WAKE UP
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="h-32"></div>
        </div>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t-4 border-black h-20 z-50">
        <div className="flex justify-around items-center h-full px-2">
          {tabs.map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`omori-nav-btn flex-1 h-full ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export const OmoriMenu: React.FC<{ logic: ReturnType<typeof useGameLogic> }> = ({ logic }) => {
  const { setView, setTheme } = logic;
  const [activeSection, setActiveSection] = React.useState<'gamemodes' | 'themes' | 'options' | null>(null);
  const themes = Object.values(Theme).filter(t => t !== Theme.NONE);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-white font-['Gloria_Hallelujah'] text-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      <div className="z-10 flex flex-col items-center gap-12">
        <h1 className="text-8xl font-bold tracking-tighter">OMORI</h1>
        <div className="flex flex-col gap-4 w-64">
          <button onClick={() => setView('game')} className="omori-button text-3xl py-4">ENTER DREAM</button>
          <button onClick={() => setActiveSection(activeSection === 'themes' ? null : 'themes')} className="omori-button text-3xl py-4">REALITY CHECK</button>
        </div>
        <AnimatePresence>
          {activeSection === 'themes' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="grid grid-cols-2 gap-4 bg-white p-6 border-4 border-black shadow-[10px_10px_0_#000]">
              {themes.map(t => (
                <button key={t} onClick={() => setTheme(t)} className="text-sm hover:underline decoration-wavy">{t.toUpperCase()}</button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OmoriApp;
