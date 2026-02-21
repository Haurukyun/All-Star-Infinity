
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import { Intensity, Theme } from './types';
import { STAGES } from './App'; // We'll move STAGES to a better place if needed, but for now let's keep it simple
import { useGameLogic } from './hooks/useGameLogic';

const PersonaApp: React.FC<{ logic: ReturnType<typeof useGameLogic> }> = ({ logic }) => {
  const {
    activeTab, setActiveTab,
    intensity, setIntensity,
    prompt, setPrompt,
    history,
    useEasyFont, setUseEasyFont,
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

  const P5_VARIANTS = {
    initial: { opacity: 0, x: -50, skewX: -10, scale: 1.05 },
    animate: { 
      opacity: 1, 
      x: 0, 
      skewX: 0, 
      scale: 1,
      transition: { 
        type: 'spring',
        damping: 15,
        stiffness: 250,
        mass: 0.6
      }
    },
    exit: { 
      opacity: 0, 
      x: 50, 
      skewX: 10, 
      scale: 0.95,
      transition: { duration: 0.15 }
    }
  };

  // Sync font class to body
  useEffect(() => {
    const body = document.getElementById('body-root');
    if (body) {
      if (useEasyFont) body.classList.add('use-easy-font');
      else body.classList.remove('use-easy-font');
    }
  }, [useEasyFont]);

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} setTheme={setTheme}>
      <AnimatePresence mode="wait">
        {/* STEAL (PLAY) TAB */}
        {activeTab === 'play' && (
          <motion.div 
            key="play" 
            variants={P5_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col h-full"
          >
            {!intensity && !prompt ? (
              <div className="space-y-4 pt-2">
                <div className="relative mb-4">
                  <motion.h2 className="font-p5-display text-4xl text-white italic tracking-tighter vibrate-hover cursor-default">SELECT SOURCE</motion.h2>
                  <div className="absolute -bottom-1 left-0 w-1/2 h-1 bg-white transform -skew-x-12"></div>
                </div>

                {/* Deck Selector */}
                <div className="flex flex-col gap-2 mb-6">
                  <button 
                    onClick={() => setActiveDeckId('default')}
                    className={`p-3 text-left shadow-[0_0_0_2px_black] transform -skew-x-6 transition-all ${activeDeckId === 'default' ? 'bg-white text-black' : 'bg-black text-white border-white/20 opacity-60'}`}
                  >
                    <span className="font-p5-display text-lg">★ PHANTOM DEFAULT</span>
                  </button>
                  {customDecks.map(deck => (
                    <button 
                      key={deck.id}
                      onClick={() => setActiveDeckId(deck.id)}
                      className={`p-3 text-left shadow-[0_0_0_2px_black,4px_4px_0px_#D80000] transform -skew-x-6 transition-all ${activeDeckId === deck.id ? 'bg-white text-black' : 'bg-black text-white border-white/20 opacity-60'}`}
                    >
                      <span className="font-p5-display text-lg">{deck.name.toUpperCase()}</span>
                      <span className="block text-[8px] opacity-60">{deck.prompts.length} CARDS FORGED</span>
                    </button>
                  ))}
                </div>

                <div className="relative mb-4 mt-8">
                  <h2 className="font-p5-display text-4xl text-white italic tracking-tighter vibrate-hover cursor-default">SELECT TARGET</h2>
                  <div className="absolute -bottom-1 left-0 w-1/2 h-1 bg-[#D80000] transform -skew-x-12"></div>
                </div>

                <div className="flex flex-col gap-3">
                  {STAGES.map((stage, i) => (
                    <motion.button
                      key={stage.id}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
                      whileHover={{ 
                        x: 10, 
                        scale: 1.01,
                        transition: { type: 'spring', stiffness: 600, damping: 20 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIntensity(stage.id)}
                      className="group relative flex items-center justify-between p-4 overflow-hidden transform -skew-x-12 shadow-[0_0_0_3px_black,4px_4px_0px_rgba(0,0,0,0.5)]"
                      style={{ backgroundColor: stage.color, color: stage.text }}
                    >
                      <div className="flex flex-col text-left transform skew-x-12">
                        <span className="font-p5-display text-3xl leading-none italic">{stage.title}</span>
                        <span className="text-[9px] font-black tracking-widest uppercase opacity-70 mt-1">{stage.desc}</span>
                      </div>
                      <span className="font-p5-display text-4xl opacity-10 transform skew-x-12">0{i+1}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : !prompt ? (
              <div className="flex flex-col items-center gap-8 pt-6">
                <motion.div 
                  initial={{ scale: 1.5, opacity: 0, rotate: -5 }} 
                  animate={{ scale: 1, opacity: 1, rotate: 0 }} 
                  transition={{ type: 'spring', damping: 12, stiffness: 300 }}
                  className="text-center"
                >
                  <p className="font-p5-display text-lg text-[#D80000] tracking-widest">MISSION_PARAMS</p>
                  <h2 className="font-p5-display text-5xl text-white italic tracking-tighter drop-shadow-[3px_3px_0px_#D80000]">
                    {intensity}
                  </h2>
                </motion.div>
                <div className="grid grid-cols-1 gap-4 w-full px-4">
                  <motion.button 
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDraw('Truth')} 
                    className="bg-white text-black p-5 transform -skew-x-6 shadow-[0_0_0_3px_black,6px_6px_0px_rgba(0,0,0,1)] font-p5-display text-3xl italic"
                  >
                    THE TRUTH
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDraw('Dare')} 
                    className="bg-[#D80000] text-white p-5 transform skew-x-6 shadow-[0_0_0_3px_black,6px_6px_0px_rgba(0,0,0,1)] font-p5-display text-3xl italic"
                  >
                    THE ACTION
                  </motion.button>
                  <button onClick={() => setIntensity(null)} className="mt-4 font-black text-white/30 uppercase tracking-[0.3em] text-[8px] hover:text-[#D80000] transition-colors">[ ABORT ]</button>
                </div>
              </div>
            ) : (
              <motion.div 
                key="calling-card" 
                initial={{ opacity: 0, scale: 0.8, rotateY: 45, y: 50 }} 
                animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }} 
                transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                className="relative mt-4"
              >
                <div className="bg-white text-black p-6 shadow-[0_0_0_6px_black,10px_10px_0px_rgba(216,0,0,1)] relative z-20 overflow-hidden">
                  <div className="flex justify-between items-center mb-6">
                    <span className="bg-[#D80000] text-white px-3 py-1 font-p5-display text-xl skew-x-[-12deg] shadow-[0_0_0_2px_black]">{prompt.type}</span>
                    <div className="text-black font-black text-xs italic opacity-40">ENTRY_{history.length}</div>
                  </div>
                  <p className="font-p5-display text-3xl italic leading-tight mb-8">"{prompt.text}"</p>
                  <div className="mt-6 pt-4 border-t-[3px] border-black border-dashed">
                    <p className="font-p5-display text-lg text-[#D80000] mb-1">PENALTY_LOG</p>
                    <p className="font-bold text-[10px] uppercase italic opacity-80">{prompt.penalty}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-8 px-2 relative z-30">
                  <button onClick={() => setPrompt(null)} className="p5-btn bg-white text-black">DONE</button>
                  <button onClick={() => handleDraw(prompt.type)} className="p5-btn bg-[#D80000] text-white">RE-EXEC</button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* DECKS (MANAGEMENT) TAB */}
        {activeTab === 'decks' && (
          <motion.div 
            key="decks" 
            variants={P5_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            className="pt-2 space-y-6"
          >
            {!editingDeck ? (
              <>
                <div className="flex justify-between items-end">
                  <h2 className="font-p5-display text-5xl italic text-white drop-shadow-[3px_3px_0px_#D80000] vibrate-hover cursor-default">FORGE</h2>
                  <button 
                    onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })}
                    className="p5-btn !bg-white !text-black border-black mb-1"
                  >
                    + NEW
                  </button>
                </div>
                
                <div className="flex flex-col gap-4">
                  {customDecks.length === 0 ? (
                    <div className="py-12 text-center opacity-20 italic font-p5-display text-2xl">NO_CUSTOM_DECKS</div>
                  ) : (
                    customDecks.map(deck => (
                      <div key={deck.id} className="p-4 bg-white text-black shadow-[0_0_0_3px_black] transform -skew-x-6 relative group">
                        <div className="absolute top-0 right-0 w-12 h-12 bg-[#D80000] opacity-5 rotate-45 translate-x-6 -translate-y-6"></div>
                        <h3 className="font-p5-display text-2xl mb-1">{deck.name || 'UNTITLED'}</h3>
                        <p className="text-[10px] font-bold opacity-60 mb-3 uppercase tracking-wider">{deck.description || 'NO DESCRIPTION'}</p>
                        <div className="flex gap-2">
                          <button onClick={() => setEditingDeck(deck)} className="px-3 py-1 bg-black text-white text-[10px] font-black uppercase skew-x-6">EDIT</button>
                          <button onClick={() => deleteDeck(deck.id)} className="px-3 py-1 bg-[#D80000] text-white text-[10px] font-black uppercase skew-x-6">DELETE</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <div className="space-y-6 pb-20">
                <div className="bg-white text-black p-4 shadow-[0_0_0_4px_black] transform -skew-x-3">
                  <label className="block text-[10px] font-black uppercase mb-1">DECK_TITLE</label>
                  <input 
                    className="w-full bg-transparent border-b-2 border-black font-p5-display text-3xl focus:outline-none"
                    value={editingDeck.name}
                    onChange={(e) => setEditingDeck({ ...editingDeck, name: e.target.value })}
                    placeholder="NAME THE OBSIDIAN..."
                  />
                  <label className="block text-[10px] font-black uppercase mt-4 mb-1">DESCRIPTION</label>
                  <textarea 
                    className="w-full bg-transparent border-b-2 border-black text-xs font-bold focus:outline-none"
                    value={editingDeck.description}
                    onChange={(e) => setEditingDeck({ ...editingDeck, description: e.target.value })}
                    placeholder="WHAT IS THE PURPOSE OF THIS DECK?"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-p5-display text-2xl text-white">PROMPTS ({editingDeck.prompts.length})</h3>
                    <button onClick={addNewPromptToEditingDeck} className="p5-btn !bg-[#D80000] !text-white">+ ADD PROMPT</button>
                  </div>

                  <div className="space-y-4">
                    {editingDeck.prompts.map((p, idx) => (
                      <div key={p.id} className="bg-white/10 p-4 border-l-4 border-[#D80000] space-y-3">
                        <div className="flex gap-2">
                          <select 
                            className="bg-black text-white text-[10px] font-bold p-1"
                            value={p.type}
                            onChange={(e) => updatePromptInEditingDeck(p.id, 'type', e.target.value)}
                          >
                            <option>Truth</option>
                            <option>Dare</option>
                          </select>
                          <select 
                            className="bg-black text-white text-[10px] font-bold p-1"
                            value={p.intensity}
                            onChange={(e) => updatePromptInEditingDeck(p.id, 'intensity', e.target.value)}
                          >
                            <option value={Intensity.SOFT}>SOFT</option>
                            <option value={Intensity.HOT}>HOT</option>
                            <option value={Intensity.VULGAR}>VULGAR</option>
                          </select>
                          <button onClick={() => removePromptFromEditingDeck(p.id)} className="ml-auto text-[#D80000] font-black text-[10px]">REMOVE</button>
                        </div>
                        <input 
                          className="w-full bg-transparent border-b border-white/20 text-sm italic py-1 focus:outline-none focus:border-white"
                          value={p.text}
                          onChange={(e) => updatePromptInEditingDeck(p.id, 'text', e.target.value)}
                          placeholder="PROMPT TEXT..."
                        />
                        <input 
                          className="w-full bg-transparent border-b border-white/20 text-[10px] py-1 focus:outline-none focus:border-[#D80000]"
                          value={p.penalty}
                          onChange={(e) => updatePromptInEditingDeck(p.id, 'penalty', e.target.value)}
                          placeholder="PENALTY FOR COWARDICE..."
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="fixed bottom-24 left-0 w-full px-6 flex gap-3 z-[110]">
                  <button onClick={() => setEditingDeck(null)} className="p5-btn w-1/2 !bg-black !text-white !border-white/20">CANCEL</button>
                  <button onClick={() => saveDeck(editingDeck)} className="p5-btn w-1/2 !bg-white !text-black">SAVE DECK</button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* LOGS TAB */}
        {activeTab === 'history' && (
          <motion.div 
            key="history" 
            variants={P5_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            className="pt-2 space-y-4"
          >
            <h2 className="font-p5-display text-5xl italic text-white drop-shadow-[3px_3px_0px_#D80000] vibrate-hover cursor-default">ARCHIVES</h2>
            <div className="flex flex-col gap-3 pb-8">
              {history.length === 0 ? <div className="py-16 text-center font-p5-display text-2xl opacity-10">EMPTY_LOG</div> : 
                history.map((item, i) => (
                  <motion.div key={i} className="p-3 bg-white text-black shadow-[0_0_0_3px_black] transform -skew-x-6">
                    <div className="flex justify-between text-[8px] font-black uppercase text-[#D80000] mb-1">
                      <span>{item.type}</span>
                      <span>LOG_0{history.length - i}</span>
                    </div>
                    <p className="text-xs font-bold italic">"{item.text}"</p>
                  </motion.div>
                ))
              }
            </div>
          </motion.div>
        )}

        {/* THEMES TAB */}
        {activeTab === 'themes' && (
          <motion.div 
            key="themes" 
            variants={P5_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            className="pt-2 space-y-6"
          >
            <h2 className="font-p5-display text-5xl italic text-white drop-shadow-[3px_3px_0_#D80000] vibrate-hover cursor-default">THEMES</h2>
            <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={() => setTheme(Theme.PERSONA)}
                className={`p-6 text-left transform -skew-x-6 transition-all shadow-[0_0_0_3px_black] ${theme === Theme.PERSONA ? 'bg-white text-black' : 'bg-black text-white border-white/10 opacity-60'}`}
              >
                <span className="font-p5-display text-3xl italic">PERSONA 5</span>
                <span className="block text-[10px] font-black opacity-60 mt-1 uppercase tracking-widest">THE PHANTOM THIEF</span>
              </button>
              
              <button 
                onClick={() => setTheme(Theme.MINECRAFT)}
                className={`p-6 text-left transform -skew-x-6 transition-all shadow-[0_0_0_3px_black] ${theme === Theme.MINECRAFT ? 'bg-white text-black' : 'bg-black text-white border-white/10 opacity-60'}`}
              >
                <span className="font-p5-display text-3xl italic">MINECRAFT</span>
                <span className="block text-[10px] font-black opacity-60 mt-1 uppercase tracking-widest">BLOCKY DIMENSION</span>
              </button>

              <button 
                onClick={() => setTheme(Theme.DANGANRONPA)}
                className={`p-6 text-left transform -skew-x-6 transition-all shadow-[0_0_0_3px_black] ${theme === Theme.DANGANRONPA ? 'bg-white text-black' : 'bg-black text-white border-white/10 opacity-60'}`}
              >
                <span className="font-p5-display text-3xl italic">DANGANRONPA</span>
                <span className="block text-[10px] font-black opacity-60 mt-1 uppercase tracking-widest">KILLING HARMONY</span>
              </button>

              <button 
                onClick={() => setTheme(Theme.OMORI)}
                className={`p-6 text-left transform -skew-x-6 transition-all shadow-[0_0_0_3px_black] ${theme === Theme.OMORI ? 'bg-white text-black' : 'bg-black text-white border-white/10 opacity-60'}`}
              >
                <span className="font-p5-display text-3xl italic">OMORI</span>
                <span className="block text-[10px] font-black opacity-60 mt-1 uppercase tracking-widest">DREAM WORLD</span>
              </button>

              <button 
                onClick={() => setTheme(Theme.KIRBY)}
                className={`p-6 text-left transform -skew-x-6 transition-all shadow-[0_0_0_3px_black] ${theme === Theme.KIRBY ? 'bg-white text-black' : 'bg-black text-white border-white/10 opacity-60'}`}
              >
                <span className="font-p5-display text-3xl italic">KIRBY</span>
                <span className="block text-[10px] font-black opacity-60 mt-1 uppercase tracking-widest">DREAM LAND</span>
              </button>

              <button 
                onClick={() => setTheme(Theme.POKEMON)}
                className={`p-6 text-left transform -skew-x-6 transition-all shadow-[0_0_0_3px_black] ${theme === Theme.POKEMON ? 'bg-white text-black' : 'bg-black text-white border-white/10 opacity-60'}`}
              >
                <span className="font-p5-display text-3xl italic">POKEMON</span>
                <span className="block text-[10px] font-black opacity-60 mt-1 uppercase tracking-widest">KANTO REGION</span>
              </button>

              <button 
                onClick={() => setTheme(Theme.ANIMAL_CROSSING)}
                className={`p-6 text-left transform -skew-x-6 transition-all shadow-[0_0_0_3px_black] ${theme === Theme.ANIMAL_CROSSING ? 'bg-white text-black' : 'bg-black text-white border-white/10 opacity-60'}`}
              >
                <span className="font-p5-display text-3xl italic">ANIMAL CROSSING</span>
                <span className="block text-[10px] font-black opacity-60 mt-1 uppercase tracking-widest">ISLAND PARADISE</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* META TAB */}
        {activeTab === 'settings' && (
          <motion.div 
            key="meta" 
            variants={P5_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            className="pt-2 space-y-6"
          >
            <h2 className="font-p5-display text-5xl italic text-white drop-shadow-[3px_3px_0px_#D80000] vibrate-hover cursor-default">SYSTEM</h2>
            <div className="space-y-3">
              {[ { label: 'HEART SYNC', val: 'STABLE' }, { label: 'COGNITION', val: 'ENHANCED' }, { label: 'MASK ID', val: 'JOKER' }].map((s, i) => (
                <div key={i} className="flex justify-between items-center p-3.5 bg-black border-2 border-white/10 transform skew-x-12">
                  <span className="font-p5-display text-lg text-white transform skew-x-[-12deg]">{s.label}</span>
                  <span className="font-black text-[9px] text-[#D80000] transform skew-x-[-12deg]">{s.val}</span>
                </div>
              ))}
              <button onClick={() => setUseEasyFont(!useEasyFont)} className="w-full flex justify-between items-center p-3.5 bg-white text-black shadow-[0_0_0_2px_black] transform -skew-x-12 hover:bg-[#D80000] hover:text-white transition-colors">
                <span className="font-p5-display text-lg transform skew-x-[12deg]">EASY READ FONT</span>
                <span className="font-black text-[9px] transform skew-x-[12deg]">{useEasyFont ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default PersonaApp;
