import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme } from './types';
import { useGameLogic } from './hooks/useGameLogic';

const STAGES = [
  { id: Intensity.SOFT, title: 'FRIEND GO!', desc: 'BREEZY', color: '#FF69B4', text: '#FFFFFF', icon: '⭐' },
  { id: Intensity.HOT, title: 'ARENA', desc: 'SPICY', color: '#FF4500', text: '#FFFFFF', icon: '🔥' },
  { id: Intensity.VULGAR, title: 'SOUL MELTER', desc: 'EX', color: '#800080', text: '#FFFFFF', icon: '💀' },
];

const StarBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#1a237e]">
    <div className="absolute inset-0 opacity-20" style={{ 
      backgroundImage: 'radial-gradient(#4fc3f7 2px, transparent 2px)', 
      backgroundSize: '20px 20px' 
    }}></div>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a237e]/50 to-[#1a237e]"></div>
    {/* Floating shapes */}
    <motion.div 
      animate={{ rotate: 360 }} 
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-300/10 rounded-full blur-3xl"
    />
    <motion.div 
      animate={{ rotate: -360 }} 
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute top-40 -left-20 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl"
    />
  </div>
);

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
    const types = ['⭐', '❤️', '🍭', '☁️', '✨'];
    const newEmotes = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      type: types[Math.floor(Math.random() * types.length)],
      size: Math.random() * 15 + 10,
      duration: Math.random() * 5 + 5
    }));
    setEmotes(newEmotes);
  }, []);

  const tabs = [
    { id: 'play', label: 'MODE', icon: '🎮' },
    { id: 'decks', label: 'FILES', icon: '📁' },
    { id: 'history', label: 'LOGS', icon: '📝' },
    { id: 'themes', label: 'WORLD', icon: '🌍' },
    { id: 'settings', label: 'OPTS', icon: '⚙️' },
  ];

  return (
    <div className="kirby-theme h-[100dvh] w-screen flex flex-col bg-[#1a237e] text-white overflow-hidden font-['Fredoka_One'] relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Sniglet:wght@400;800&display=swap');
        
        .kirby-theme {
          font-family: 'Sniglet', cursive;
        }
        
        .font-display {
          font-family: 'Fredoka One', cursive;
        }

        .pop-card {
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 8px 0 rgba(0,0,0,0.1), 0 0 0 4px #fff;
          position: relative;
          overflow: hidden;
        }

        .btn-story {
          background: linear-gradient(135deg, #ff69b4 0%, #ff1493 100%);
          border: 4px solid #fff;
          border-radius: 30px;
          box-shadow: 0 6px 0 #c71585, 0 10px 10px rgba(0,0,0,0.2);
          transition: transform 0.1s;
        }
        .btn-story:active {
          transform: translateY(4px);
          box-shadow: 0 2px 0 #c71585, 0 4px 4px rgba(0,0,0,0.2);
        }

        .btn-cloud {
          background: linear-gradient(180deg, #e0f7fa 0%, #81d4fa 100%);
          border: 4px solid #fff;
          border-radius: 50px;
          box-shadow: 0 6px 0 #0288d1, 0 8px 10px rgba(0,0,0,0.2);
          color: #01579b;
        }
        
        .btn-fire {
          background: linear-gradient(135deg, #ffeb3b 0%, #ff5722 100%);
          border: 4px solid #fff;
          border-radius: 20px 50px 20px 50px;
          box-shadow: 0 6px 0 #bf360c, 0 8px 10px rgba(0,0,0,0.2);
          color: #fff;
          text-shadow: 2px 2px 0 #bf360c;
        }

        .btn-void {
          background: linear-gradient(135deg, #7b1fa2 0%, #4a148c 100%);
          border: 4px solid #fff;
          border-radius: 20px;
          box-shadow: 0 6px 0 #311b92, 0 8px 10px rgba(0,0,0,0.2);
          color: #e1bee7;
          position: relative;
          overflow: hidden;
        }
        .btn-void::after {
          content: '';
          position: absolute;
          top: -50%; left: -50%; width: 200%; height: 200%;
          background: radial-gradient(circle, transparent 20%, rgba(255,255,255,0.1) 21%, transparent 22%);
          background-size: 20px 20px;
          transform: rotate(45deg);
        }

        .nav-wave {
          background: #ff69b4;
          border-top: 4px solid #fff;
          border-radius: 50% 50% 0 0 / 20px 20px 0 0;
          box-shadow: 0 -4px 10px rgba(0,0,0,0.2);
        }

        .bubble-icon {
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.1));
          box-shadow: inset 0 0 10px rgba(255,255,255,0.5), 0 4px 4px rgba(0,0,0,0.1);
          backdrop-filter: blur(2px);
        }

        .text-stroke {
          -webkit-text-stroke: 4px #fff;
          paint-order: stroke fill;
        }
        
        .text-stroke-sm {
          -webkit-text-stroke: 2px #fff;
          paint-order: stroke fill;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <StarBackground />

      {/* Floating Emotes */}
      {emotes.map(emote => (
        <motion.div
          key={emote.id}
          className="absolute pointer-events-none opacity-40 z-0"
          initial={{ x: `${emote.x}vw`, y: `${emote.y}vh` }}
          animate={{ 
            y: [`${emote.y}vh`, `${emote.y - 10}vh`, `${emote.y}vh`],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: emote.duration, repeat: Infinity }}
          style={{ fontSize: emote.size }}
        >
          {emote.type}
        </motion.div>
      ))}

      {/* Header */}
      <header className="p-4 flex justify-between items-center shrink-0 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-pink-400 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
            <span className="text-2xl">⭐</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-2xl text-pink-400 text-stroke-sm drop-shadow-md leading-none">KIRBY</span>
            <span className="text-xs font-bold text-blue-200 tracking-wider">STAR ALLIES</span>
          </div>
        </div>
        <div className="bg-blue-900/50 rounded-full px-3 py-1 border border-blue-400/30 backdrop-blur-sm">
          <span className="text-xs font-bold text-blue-200">FILE 1 <span className="text-yellow-400">100%</span></span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-4 pb-32 relative z-10 no-scrollbar">
        <div className="max-w-md mx-auto h-full pt-2">
          <AnimatePresence mode="wait">
            {activeTab === 'play' && (
              <motion.div key="play" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="space-y-6">
                {!intensity && !prompt ? (
                  <div className="space-y-6">
                    {/* Deck Selector - Story Mode Style */}
                    <div className="relative group cursor-pointer" onClick={() => setActiveDeckId(activeDeckId === 'default' ? customDecks[0]?.id || 'default' : 'default')}>
                      <div className="absolute inset-0 bg-white rounded-[35px] transform rotate-1 group-hover:rotate-2 transition-transform"></div>
                      <div className="btn-story p-6 relative overflow-hidden min-h-[160px] flex flex-col justify-center items-center text-center">
                        <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #fff 20%, transparent 20%)', backgroundSize: '10px 10px' }}></div>
                        <span className="text-sm font-bold text-pink-200 uppercase tracking-widest mb-1 bg-black/10 px-2 rounded-full">Current Mode</span>
                        <h2 className="font-display text-4xl text-white drop-shadow-md text-stroke-sm mb-2">
                          {activeDeckId === 'default' ? 'STORY MODE' : (customDecks.find(d => d.id === activeDeckId)?.name || 'CUSTOM').toUpperCase()}
                        </h2>
                        <div className="bg-white/20 rounded-full px-4 py-1 backdrop-blur-sm">
                          <span className="text-xs font-bold">Tap to Switch</span>
                        </div>
                        <div className="absolute -bottom-4 -right-4 text-6xl opacity-50 rotate-12">❤️</div>
                        <div className="absolute -top-4 -left-4 text-6xl opacity-50 -rotate-12">⭐</div>
                      </div>
                    </div>

                    {/* Difficulty Selector - Side Games Style */}
                    <div className="grid grid-cols-1 gap-4">
                      {STAGES.map((stage) => (
                        <button 
                          key={stage.id} 
                          onClick={() => setIntensity(stage.id)}
                          className={`
                            relative p-4 flex items-center justify-between transition-transform active:scale-95
                            ${stage.id === Intensity.SOFT ? 'btn-cloud' : stage.id === Intensity.HOT ? 'btn-fire' : 'btn-void'}
                          `}
                        >
                          <div className="flex items-center gap-4 relative z-10">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl shadow-inner">
                              {stage.icon}
                            </div>
                            <div className="flex flex-col text-left">
                              <span className={`font-display text-2xl leading-none ${stage.id === Intensity.SOFT ? 'text-blue-600' : 'text-white'} drop-shadow-sm`}>
                                {stage.title}
                              </span>
                              <span className={`text-xs font-bold ${stage.id === Intensity.SOFT ? 'text-blue-400' : 'text-white/70'}`}>
                                {stage.desc}
                              </span>
                            </div>
                          </div>
                          <div className="text-2xl opacity-50 relative z-10">▶</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : !prompt ? (
                  <div className="flex flex-col items-center justify-center h-[60vh] relative">
                    <motion.div 
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="relative z-10 mb-8"
                    >
                      <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-pink-400 to-yellow-300 p-2 animate-spin-slow shadow-[0_0_30px_rgba(255,105,180,0.6)]">
                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center border-4 border-pink-500">
                          <span className="text-6xl animate-bounce">
                            {intensity === Intensity.SOFT ? '☁️' : intensity === Intensity.HOT ? '🔥' : '💀'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                    
                    <h2 className="font-display text-4xl text-white text-stroke-sm drop-shadow-[0_4px_0_rgba(0,0,0,0.2)] mb-8 text-center">
                      {intensity}
                    </h2>

                    <div className="flex gap-4 w-full px-4">
                      <button onClick={() => handleDraw('Truth')} className="flex-1 btn-story py-4 text-xl font-display text-white">
                        TRUTH
                      </button>
                      <button onClick={() => handleDraw('Dare')} className="flex-1 btn-fire py-4 text-xl font-display text-white">
                        DARE
                      </button>
                    </div>
                    
                    <button onClick={() => setIntensity(null)} className="mt-8 bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full text-sm font-bold backdrop-blur-md transition-colors">
                      Return to Map
                    </button>
                  </div>
                ) : (
                  <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative mt-8">
                    {/* Character Dialogue Box */}
                    <div className="bg-white border-4 border-pink-400 rounded-[30px] p-6 shadow-[0_10px_0_rgba(0,0,0,0.1)] relative">
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                        <div className="w-20 h-20 bg-pink-400 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                          <span className="text-4xl">
                            {prompt.type === 'Truth' ? '🤔' : '✨'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-8 text-center space-y-4">
                        <div className="bg-pink-50 inline-block px-3 py-1 rounded-full text-pink-500 text-xs font-bold uppercase tracking-widest mb-2">
                          {prompt.type} Card #{history.length}
                        </div>
                        <p className="text-3xl font-display text-pink-500 leading-tight">
                          "{prompt.text}"
                        </p>
                        
                        <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-100">
                          <p className="text-blue-400 text-xs font-bold uppercase mb-1">Penalty</p>
                          <p className="text-blue-600 font-bold">{prompt.penalty}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button onClick={() => setPrompt(null)} className="flex-1 bg-gray-200 text-gray-600 font-bold py-3 rounded-2xl border-b-4 border-gray-300 active:border-b-0 active:translate-y-1">
                        Done
                      </button>
                      <button onClick={() => handleDraw(prompt.type)} className="flex-1 bg-pink-400 text-white font-bold py-3 rounded-2xl border-b-4 border-pink-600 active:border-b-0 active:translate-y-1">
                        Again!
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'decks' && (
              <motion.div key="decks" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
                {!editingDeck ? (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="font-display text-3xl text-white text-stroke-sm drop-shadow-md">FILE SELECT</h2>
                      <button onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })} className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold border-2 border-white shadow-lg hover:scale-105 transition-transform">
                        + New File
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {customDecks.length === 0 ? (
                        <div className="text-center py-12 text-white/50 font-bold">No custom files yet!</div>
                      ) : (
                        customDecks.map(deck => (
                          <div key={deck.id} className="bg-white rounded-2xl p-1 flex items-center gap-3 shadow-lg group">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-300 to-blue-500 rounded-xl flex items-center justify-center text-3xl text-white shadow-inner shrink-0">
                              📁
                            </div>
                            <div className="flex-1 py-2">
                              <h3 className="font-display text-xl text-blue-600 leading-none mb-1">{deck.name || 'Untitled'}</h3>
                              <p className="text-xs text-blue-300 font-bold">{deck.prompts.length} Cards • {deck.description?.substring(0, 20) || 'No desc'}...</p>
                            </div>
                            <div className="flex flex-col gap-1 pr-2">
                              <button onClick={() => setEditingDeck(deck)} className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-xs shadow-sm">✏️</button>
                              <button onClick={() => deleteDeck(deck.id)} className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center text-xs shadow-sm">🗑️</button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </>
                ) : (
                  <div className="bg-white rounded-[30px] p-6 shadow-xl space-y-4 border-4 border-pink-300">
                    <input className="w-full text-2xl font-display text-pink-500 border-b-4 border-pink-100 focus:border-pink-400 outline-none bg-transparent placeholder-pink-200" value={editingDeck.name} onChange={e => setEditingDeck({...editingDeck, name: e.target.value})} placeholder="File Name" />
                    <textarea className="w-full bg-pink-50 rounded-xl p-3 text-pink-600 font-bold text-sm h-20 outline-none resize-none" value={editingDeck.description} onChange={e => setEditingDeck({...editingDeck, description: e.target.value})} placeholder="Description..." />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-display text-xl text-pink-400">Cards</span>
                        <button onClick={addNewPromptToEditingDeck} className="bg-blue-400 text-white px-3 py-1 rounded-full text-xs font-bold">+ Add</button>
                      </div>
                      <div className="max-h-[40vh] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                        {editingDeck.prompts.map(p => (
                          <div key={p.id} className="bg-white border-2 border-blue-100 rounded-xl p-2 flex gap-2 items-center shadow-sm">
                            <select className="bg-blue-50 text-blue-500 text-xs font-bold rounded-lg p-1 outline-none" value={p.type} onChange={e => updatePromptInEditingDeck(p.id, 'type', e.target.value)}>
                              <option>Truth</option><option>Dare</option>
                            </select>
                            <input className="flex-1 text-sm font-bold text-gray-600 outline-none" value={p.text} onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)} placeholder="..." />
                            <button onClick={() => removePromptFromEditingDeck(p.id)} className="text-red-400 font-bold px-2">×</button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingDeck(null)} className="flex-1 bg-gray-200 text-gray-500 font-bold py-3 rounded-xl">Cancel</button>
                      <button onClick={() => saveDeck(editingDeck)} className="flex-1 bg-pink-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-pink-200">Save File</button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="font-display text-3xl text-white text-stroke-sm drop-shadow-md text-center">BEST MOMENTS</h2>
                <div className="space-y-3">
                  {history.map((item, i) => (
                    <div key={i} className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 flex items-center gap-3 shadow-lg border-2 border-white">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 border-white shadow-md ${item.type === 'Truth' ? 'bg-blue-300' : 'bg-pink-300'}`}>
                        {item.type === 'Truth' ? '🤔' : '✨'}
                      </div>
                      <div>
                        <p className="text-gray-600 font-bold leading-tight">"{item.text}"</p>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Record #{history.length - i}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'themes' && (
              <motion.div key="themes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="font-display text-3xl text-white text-stroke-sm drop-shadow-md text-center">WORLD SELECT</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: Theme.PERSONA, label: 'PHANTOM', color: 'from-red-500 to-red-700' },
                    { id: Theme.MINECRAFT, label: 'BLOCKY', color: 'from-green-500 to-green-700' },
                    { id: Theme.DANGANRONPA, label: 'DESPAIR', color: 'from-pink-500 to-purple-700' },
                    { id: Theme.OMORI, label: 'DREAM', color: 'from-gray-700 to-black' },
                    { id: Theme.KIRBY, label: 'POPSTAR', color: 'from-pink-400 to-pink-600' },
                    { id: Theme.POKEMON, label: 'KANTO', color: 'from-blue-400 to-blue-600' },
                    { id: Theme.ANIMAL_CROSSING, label: 'ISLAND', color: 'from-green-400 to-green-600' },
                  ].map(t => (
                    <button 
                      key={t.id}
                      onClick={() => setTheme(t.id as Theme)}
                      className={`
                        bg-gradient-to-br ${t.color} p-4 rounded-3xl shadow-lg border-4 border-white
                        flex flex-col items-center justify-center gap-2
                        transform transition-transform active:scale-95
                        ${theme === t.id ? 'ring-4 ring-yellow-300 scale-105' : 'opacity-90'}
                      `}
                    >
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
                        🌍
                      </div>
                      <span className="font-display text-white text-stroke-sm">{t.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="bg-white rounded-[30px] p-6 shadow-xl border-4 border-blue-300 space-y-6">
                  <h2 className="font-display text-2xl text-blue-500 text-center">OPTIONS</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b-2 border-blue-50 pb-2">
                      <span className="font-bold text-gray-500">Music Volume</span>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(i => <div key={i} className="w-4 h-6 bg-blue-300 rounded-sm"></div>)}
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-b-2 border-blue-50 pb-2">
                      <span className="font-bold text-gray-500">Friend Hearts</span>
                      <span className="font-display text-pink-500 text-xl">ON</span>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded-xl text-center">
                      <p className="text-yellow-700 font-bold text-sm">Thanks for playing!</p>
                      <p className="text-yellow-600 text-xs mt-1">HAL Laboratory Inc.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation - Friend Select Wave Style */}
      <nav className="fixed bottom-0 left-0 w-full h-24 z-50">
        <div className="absolute inset-0 nav-wave"></div>
        <div className="relative h-full flex justify-around items-center px-2 pb-2">
          {tabs.map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex flex-col items-center justify-center gap-1 w-14 h-14 rounded-full transition-all
                ${activeTab === tab.id ? 'transform -translate-y-4 scale-110' : 'opacity-70 hover:opacity-100'}
              `}
            >
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-lg bubble-icon border-2 border-white
                ${activeTab === tab.id ? 'bg-yellow-300 text-yellow-800' : 'bg-white/20 text-white'}
              `}>
                {tab.icon}
              </div>
              <span className="text-[10px] font-bold text-white drop-shadow-md">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default KirbyApp;
