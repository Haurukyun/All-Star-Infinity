
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import { Intensity, Theme } from './types';
import { STAGES } from './constants';
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
    initial: { opacity: 0, x: -30, skewX: -5, scale: 1.02 },
    animate: {
      opacity: 1,
      x: 0,
      skewX: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 300,
        mass: 0.5
      }
    },
    exit: {
      opacity: 0,
      x: 30,
      skewX: 5,
      scale: 0.98,
      transition: { duration: 0.2, ease: 'easeInOut' }
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
              <div className="space-y-4 pt-1">
                {/* SELECT SOURCE Header */}
                <div className="relative mb-1 transform -skew-x-12 bg-white text-black px-3 py-1 sm:px-5 sm:py-1.5 inline-block border-[2px] border-black z-10 shadow-[3px_3px_0_black]">
                  <h2 className="font-p5-display text-lg sm:text-2xl tracking-tighter transform skew-x-12 uppercase italic">Select Source</h2>
                </div>

                {/* Deck Selector */}
                <div className="flex flex-col gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                  <button
                    onClick={() => setActiveDeckId('default')}
                    className={`p-2 sm:p-3 text-left border-[2px] border-black transition-all transform -skew-x-6 group shadow-[3px_3px_0_black] ${activeDeckId === 'default' ? 'bg-white text-black translate-x-0.5 translate-y-0.5 shadow-none' : 'bg-black text-white border-white/20 opacity-60'}`}
                  >
                    <span className="font-p5-display text-lg sm:text-xl transform skew-x-6 block italic">★ PHANTOM DEFAULT</span>
                  </button>
                  {customDecks.map(deck => (
                    <button
                      key={deck.id}
                      onClick={() => setActiveDeckId(deck.id)}
                      className={`p-2 sm:p-3 text-left border-[2px] border-black transition-all transform -skew-x-6 group shadow-[3px_3px_0_black] ${activeDeckId === deck.id ? 'bg-white text-black translate-x-0.5 translate-y-0.5 shadow-none' : 'bg-black text-white border-white/20 opacity-60'}`}
                    >
                      <span className="font-p5-display text-lg sm:text-xl transform skew-x-6 block italic">{deck.name.toUpperCase()}</span>
                      <span className="block text-[7px] sm:text-[9px] opacity-60 font-bold tracking-widest mt-0.5 transform skew-x-6">{deck.prompts.length} CARDS FORGED</span>
                    </button>
                  ))}
                </div>

                {/* SELECT TARGET Header */}
                <div className="relative mb-2 transform skew-x-12 bg-[#D80000] text-white px-3 py-1 sm:px-5 sm:py-1.5 inline-block border-[2px] border-black z-10 shadow-[3px_3px_0_black]">
                  <h2 className="font-p5-display text-lg sm:text-2xl tracking-tighter transform -skew-x-12 uppercase italic">Select Target</h2>
                </div>

                <div className="flex flex-col gap-2 sm:gap-3">
                  {STAGES.map((stage, i) => (
                    <motion.button
                      key={stage.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
                      whileHover={{
                        x: 3,
                        scale: 1.01,
                        transition: { type: 'spring', stiffness: 600, damping: 20 }
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIntensity(stage.id)}
                      className={`group relative flex items-center justify-between p-3 sm:p-4 overflow-hidden transform ${i % 2 === 0 ? '-skew-x-6' : 'skew-x-6'} p5-border ${stage.id === Intensity.SOFT ? 'bg-white text-black' : stage.id === Intensity.HOT ? 'bg-[#D80000] text-white' : 'bg-black text-white'}`}
                    >
                      <div className={`flex flex-col text-left transform ${i % 2 === 0 ? 'skew-x-6' : '-skew-x-6'}`}>
                        <span className="font-p5-display text-xl sm:text-3xl leading-none uppercase italic">{stage.title}</span>
                        <span className="text-[6px] sm:text-[8px] font-black tracking-[0.2em] uppercase opacity-60 mt-0.5">{stage.desc}</span>
                      </div>
                      <span className={`font-p5-display text-2xl sm:text-4xl opacity-10 font-bold transform ${i % 2 === 0 ? 'skew-x-6' : '-skew-x-6'}`}>0{i + 1}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : !prompt ? (
              <div className="flex flex-col items-center gap-6 sm:gap-8 pt-4 sm:pt-6">
                <motion.div
                  initial={{ scale: 1.2, opacity: 0, rotate: -3 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                  className="text-center relative"
                >
                  <div className="absolute -inset-4 bg-white/5 blur-xl rounded-full"></div>
                  <p className="font-p5-display text-sm sm:text-base text-[#D80000] tracking-widest relative z-10">MISSION_PARAMS</p>
                  <h2 className="font-p5-display text-3xl sm:text-5xl text-white italic tracking-tighter drop-shadow-[3px_3px_0px_#D80000] relative z-10 uppercase">
                    {intensity}
                  </h2>
                </motion.div>
                <div className="grid grid-cols-1 gap-3 sm:gap-4 w-full px-2 sm:px-4">
                  <motion.button
                    whileHover={{ scale: 1.02, rotate: -1, x: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDraw('Truth')}
                    className="bg-white text-black p-3 sm:p-4 transform -skew-x-12 p5-border font-p5-display text-xl sm:text-2xl italic text-left"
                  >
                    <span className="transform skew-x-12 block">THE TRUTH</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, rotate: 1, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDraw('Dare')}
                    className="bg-[#D80000] text-white p-3 sm:p-4 transform skew-x-12 p5-border font-p5-display text-xl sm:text-2xl italic text-right"
                  >
                    <span className="transform -skew-x-12 block">THE ACTION</span>
                  </motion.button>
                  <button onClick={() => setIntensity(null)} className="mt-2 sm:mt-4 font-black text-white/40 uppercase tracking-[0.4em] text-[7px] sm:text-[9px] hover:text-[#D80000] transition-colors vibrate-hover">[ ABORT MISSION ]</button>
                </div>
              </div>
            ) : (
              <motion.div
                key="calling-card"
                initial={{ opacity: 0, scale: 0.9, rotateY: 25, y: 30 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
                transition={{ type: 'spring', damping: 18, stiffness: 300 }}
                className="relative mt-1 sm:mt-2"
              >
                <div className="bg-white text-black p-4 sm:p-6 border-[3px] border-black shadow-[6px_6px_0px_rgba(216,0,0,1)] relative z-20 overflow-hidden transform -rotate-1">
                  <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-[#D80000] opacity-5 transform rotate-45 translate-x-10 -translate-y-10 sm:translate-x-12 sm:-translate-y-12"></div>
                  <div className="flex justify-between items-center mb-3 sm:mb-6">
                    <span className="bg-[#D80000] text-white px-2 py-0.5 sm:px-3 sm:py-1 font-p5-display text-base sm:text-xl skew-x-[-15deg] border-[2px] border-black italic uppercase">{prompt.type}</span>
                    <div className="text-black font-black text-[6px] sm:text-[10px] italic opacity-40 tracking-widest">ENTRY_{history.length.toString().padStart(3, '0')}</div>
                  </div>
                  <p className="font-p5-display text-lg sm:text-2xl italic leading-tight mb-4 sm:mb-8 tracking-tight">"{prompt.text}"</p>
                  <div className="mt-3 sm:mt-6 pt-2 sm:pt-4 border-t-[2px] border-black border-dashed">
                    <p className="font-p5-display text-sm sm:text-lg text-[#D80000] mb-0.5 sm:mb-1 italic">PENALTY_LOG</p>
                    <p className="font-bold text-[8px] sm:text-[10px] uppercase italic opacity-90 leading-relaxed">{prompt.penalty}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-6 sm:mt-8 px-1 sm:px-2 relative z-30">
                  <button onClick={() => setPrompt(null)} className="bg-white text-black font-p5-display text-lg sm:text-xl h-12 sm:h-14 transform -skew-x-12 border-[2px] border-black shadow-[3px_3px_0_black] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all">
                    <span className="transform skew-x-12 block">DONE</span>
                  </button>
                  <button onClick={() => handleDraw(prompt.type)} className="bg-[#D80000] text-white font-p5-display text-lg sm:text-xl h-12 sm:h-14 transform skew-x-12 border-[2px] border-black shadow-[3px_3px_0_black] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all">
                    <span className="transform -skew-x-12 block">RE-EXEC</span>
                  </button>
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
            className="pt-2 space-y-4 sm:space-y-6"
          >
            {!editingDeck ? (
              <>
                <div className="flex justify-between items-end mb-2">
                  <h2 className="font-p5-display text-4xl sm:text-5xl italic text-white drop-shadow-[3px_3px_0px_#D80000] vibrate-hover cursor-default">FORGE</h2>
                  <button
                    onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })}
                    className="bg-white text-black px-4 py-1.5 border-[3px] border-black transform -skew-x-12 font-p5-display text-lg sm:text-xl italic shadow-[4px_4px_0_black] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                  >
                    + NEW
                  </button>
                </div>

                <div className="flex flex-col gap-3 sm:gap-4">
                  {customDecks.length === 0 ? (
                    <div className="py-12 text-center opacity-20 italic font-p5-display text-xl sm:text-2xl">NO_CUSTOM_DECKS</div>
                  ) : (
                    customDecks.map(deck => (
                      <div key={deck.id} className="p-3 sm:p-4 bg-white text-black border-[3px] border-black transform -skew-x-6 relative group shadow-[4px_4px_0_black]">
                        <div className="absolute top-0 right-0 w-10 h-10 sm:w-12 sm:h-12 bg-[#D80000] opacity-5 rotate-45 translate-x-5 -translate-y-5 sm:translate-x-6 sm:-translate-y-6"></div>
                        <h3 className="font-p5-display text-xl sm:text-2xl mb-0.5">{deck.name || 'UNTITLED'}</h3>
                        <p className="text-[8px] sm:text-[10px] font-bold opacity-60 mb-2 sm:mb-3 uppercase tracking-wider line-clamp-1">{deck.description || 'NO DESCRIPTION'}</p>
                        <div className="flex gap-2">
                          <button onClick={() => setEditingDeck(deck)} className="px-3 py-1 bg-black text-white text-[8px] sm:text-[10px] font-black uppercase skew-x-6 hover:bg-[#D80000] transition-colors">EDIT</button>
                          <button onClick={() => deleteDeck(deck.id)} className="px-3 py-1 bg-[#D80000] text-white text-[8px] sm:text-[10px] font-black uppercase skew-x-6 hover:bg-black transition-colors">DELETE</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <div className="space-y-4 sm:space-y-6 pb-24">
                <div className="bg-white text-black p-3 sm:p-4 border-[3px] border-black transform -skew-x-3 shadow-[4px_4px_0_black]">
                  <label className="block text-[8px] sm:text-[10px] font-black uppercase mb-1">DECK_TITLE</label>
                  <input
                    className="w-full bg-transparent border-b-2 border-black font-p5-display text-2xl sm:text-3xl focus:outline-none"
                    value={editingDeck.name}
                    onChange={(e) => setEditingDeck({ ...editingDeck, name: e.target.value })}
                    placeholder="NAME THE OBSIDIAN..."
                  />
                  <label className="block text-[8px] sm:text-[10px] font-black uppercase mt-3 sm:mt-4 mb-1">DESCRIPTION</label>
                  <textarea
                    className="w-full bg-transparent border-b-2 border-black text-[10px] sm:text-xs font-bold focus:outline-none"
                    value={editingDeck.description}
                    onChange={(e) => setEditingDeck({ ...editingDeck, description: e.target.value })}
                    placeholder="WHAT IS THE PURPOSE OF THIS DECK?"
                  />
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-p5-display text-xl sm:text-2xl text-white">PROMPTS ({editingDeck.prompts.length})</h3>
                    <button onClick={addNewPromptToEditingDeck} className="bg-[#D80000] text-white px-3 py-1 border-[2px] border-black transform skew-x-12 font-p5-display text-sm sm:text-base italic shadow-[2px_2px_0_black] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all">+ ADD PROMPT</button>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {editingDeck.prompts.map((p) => (
                      <div key={p.id} className="bg-white/10 p-3 sm:p-4 border-l-4 border-[#D80000] space-y-2 sm:space-y-3">
                        <div className="flex gap-2">
                          <select
                            className="bg-black text-white text-[8px] sm:text-[10px] font-bold p-1 border border-white/20"
                            value={p.type}
                            onChange={(e) => updatePromptInEditingDeck(p.id, 'type', e.target.value)}
                          >
                            <option>Truth</option>
                            <option>Dare</option>
                          </select>
                          <select
                            className="bg-black text-white text-[8px] sm:text-[10px] font-bold p-1 border border-white/20"
                            value={p.intensity}
                            onChange={(e) => updatePromptInEditingDeck(p.id, 'intensity', e.target.value)}
                          >
                            <option value={Intensity.SOFT}>SOFT</option>
                            <option value={Intensity.HOT}>HOT</option>
                            <option value={Intensity.VULGAR}>VULGAR</option>
                          </select>
                          <button onClick={() => removePromptFromEditingDeck(p.id)} className="ml-auto text-[#D80000] font-black text-[8px] sm:text-[10px] hover:text-white transition-colors">REMOVE</button>
                        </div>
                        <input
                          className="w-full bg-transparent border-b border-white/20 text-xs sm:text-sm italic py-1 focus:outline-none focus:border-white"
                          value={p.text}
                          onChange={(e) => updatePromptInEditingDeck(p.id, 'text', e.target.value)}
                          placeholder="PROMPT TEXT..."
                        />
                        <input
                          className="w-full bg-transparent border-b border-white/20 text-[8px] sm:text-[10px] py-1 focus:outline-none focus:border-[#D80000]"
                          value={p.penalty}
                          onChange={(e) => updatePromptInEditingDeck(p.id, 'penalty', e.target.value)}
                          placeholder="PENALTY FOR COWARDICE..."
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="fixed bottom-24 left-0 w-full px-4 sm:px-6 flex gap-2 sm:gap-3 z-[110]">
                  <button onClick={() => setEditingDeck(null)} className="bg-black text-white px-4 py-2 border-[2px] border-white/20 transform -skew-x-12 font-p5-display text-lg sm:text-xl italic w-1/2 shadow-[4px_4px_0_rgba(255,255,255,0.1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">CANCEL</button>
                  <button onClick={() => saveDeck(editingDeck)} className="bg-white text-black px-4 py-2 border-[2px] border-black transform skew-x-12 font-p5-display text-lg sm:text-xl italic w-1/2 shadow-[4px_4px_0_black] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">SAVE DECK</button>
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
            <h2 className="font-p5-display text-4xl sm:text-5xl italic text-white drop-shadow-[3px_3px_0px_#D80000] vibrate-hover cursor-default">ARCHIVES</h2>
            <div className="flex flex-col gap-2 sm:gap-3 pb-8">
              {history.length === 0 ? <div className="py-16 text-center font-p5-display text-xl sm:text-2xl opacity-10">EMPTY_LOG</div> :
                history.map((item, i) => (
                  <motion.div key={i} className="p-2.5 sm:p-3 bg-white text-black border-[2px] sm:border-[3px] border-black transform -skew-x-6 shadow-[3px_3px_0_black]">
                    <div className="flex justify-between text-[7px] sm:text-[8px] font-black uppercase text-[#D80000] mb-0.5">
                      <span>{item.type}</span>
                      <span>LOG_0{history.length - i}</span>
                    </div>
                    <p className="text-[10px] sm:text-xs font-bold italic line-clamp-2">"{item.text}"</p>
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
            className="pt-2 space-y-4 sm:space-y-6"
          >
            <h2 className="font-p5-display text-4xl sm:text-5xl italic text-white drop-shadow-[3px_3px_0_#D80000] vibrate-hover cursor-default">THEMES</h2>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {[
                { id: Theme.PERSONA, label: 'PERSONA 5', sub: 'THE PHANTOM THIEF' },
                { id: Theme.MINECRAFT, label: 'MINECRAFT', sub: 'BLOCKY DIMENSION' },
                { id: Theme.DANGANRONPA, label: 'DANGANRONPA', sub: 'KILLING HARMONY' },
                { id: Theme.OMORI, label: 'OMORI', sub: 'DREAM WORLD' },
                { id: Theme.KIRBY, label: 'KIRBY', sub: 'DREAM LAND' },
                { id: Theme.POKEMON, label: 'POKEMON', sub: 'KANTO REGION' },
                { id: Theme.ANIMAL_CROSSING, label: 'ANIMAL CROSSING', sub: 'ISLAND PARADISE' },
                { id: Theme.SKYRIM, label: 'SKYRIM', sub: 'THE ELDER SCROLLS' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`p-4 sm:p-6 text-left transform -skew-x-6 transition-all border-[2px] sm:border-[3px] border-black shadow-[4px_4px_0_black] ${theme === t.id ? 'bg-white text-black translate-x-1 translate-y-1 shadow-none' : 'bg-black text-white border-white/10 opacity-60'}`}
                >
                  <span className="font-p5-display text-2xl sm:text-3xl italic block">{t.label}</span>
                  <span className="block text-[8px] sm:text-[10px] font-black opacity-60 mt-0.5 uppercase tracking-widest">{t.sub}</span>
                </button>
              ))}
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
            className="pt-2 space-y-4 sm:space-y-6"
          >
            <h2 className="font-p5-display text-4xl sm:text-5xl italic text-white drop-shadow-[3px_3px_0px_#D80000] vibrate-hover cursor-default">SYSTEM</h2>
            <div className="space-y-2 sm:space-y-3">
              {[{ label: 'HEART SYNC', val: 'STABLE' }, { label: 'COGNITION', val: 'ENHANCED' }, { label: 'MASK ID', val: 'JOKER' }].map((s, i) => (
                <div key={i} className="flex justify-between items-center p-3 sm:p-3.5 bg-black border-2 border-white/10 transform skew-x-12">
                  <span className="font-p5-display text-base sm:text-lg text-white transform skew-x-[-12deg]">{s.label}</span>
                  <span className="font-black text-[8px] sm:text-[9px] text-[#D80000] transform skew-x-[-12deg]">{s.val}</span>
                </div>
              ))}
              <button onClick={() => setUseEasyFont(!useEasyFont)} className="w-full flex justify-between items-center p-3 sm:p-3.5 bg-white text-black border-[2px] sm:border-[3px] border-black transform -skew-x-12 shadow-[4px_4px_0_black] hover:bg-[#D80000] hover:text-white transition-colors active:translate-x-1 active:translate-y-1 active:shadow-none">
                <span className="font-p5-display text-base sm:text-lg transform skew-x-[12deg]">EASY READ FONT</span>
                <span className="font-black text-[8px] sm:text-[9px] transform skew-x-[12deg]">{useEasyFont ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export const PersonaMenu: React.FC<{ logic: ReturnType<typeof useGameLogic> }> = ({ logic }) => {
  const { setView, setTheme, theme } = logic;
  const [activeSection, setActiveSection] = React.useState<'gamemodes' | 'themes' | null>(null);
  const themes = Object.values(Theme).filter(t => t !== Theme.NONE);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden bg-black select-none">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 p5-dots-bg opacity-30"></div>
        <div className="absolute top-0 right-[-10%] w-[120%] h-full bg-[#D80000] transform skew-x-[-15deg] translate-x-[30%] opacity-90 shadow-[inset_20px_0_40px_rgba(0,0,0,0.5)]"></div>

        {/* Decorative Jagged Shapes */}
        <div className="absolute top-[10%] left-[-5%] w-1/2 h-[60px] bg-white transform rotate-6 skew-x-[-20deg] opacity-10"></div>
        <div className="absolute bottom-[15%] right-[-10%] w-[60%] h-[120px] bg-black transform -rotate-12 skew-x-[15deg] opacity-40 shadow-[15px_15px_0_#D80000]"></div>
      </div>

      <div className="z-10 w-full max-w-5xl flex flex-col items-center justify-center gap-12 sm:gap-20">

        {/* Overlapping Strips Selection Zone */}
        <div className="flex flex-col items-center gap-10 w-full">

          {/* STEAL STRIP */}
          <motion.div
            initial={{ x: -600, rotate: -10 }}
            animate={{ x: 20, rotate: -4 }}
            whileHover={{ x: 50, scale: 1.02 }}
            className={`cursor-pointer relative w-[95%] sm:w-[85%] h-20 sm:h-28 transition-all duration-300 ${activeSection === 'gamemodes' ? 'z-50' : 'z-30 opacity-90'}`}
            onClick={() => setActiveSection(activeSection === 'gamemodes' ? null : 'gamemodes')}
          >
            <div className={`absolute inset-0 bg-white transform skew-x-[-15deg] shadow-[15px_15px_0_#000] border-r-[12px] border-[#D80000] p5-border`}></div>
            <div className={`absolute top-0 left-0 h-full w-4 bg-[#D80000] transform skew-y-[45deg] origin-top`}></div>
            <div className="relative h-full flex items-center justify-between px-10 sm:px-16">
              <span className="font-p5-display text-5xl sm:text-8xl italic text-black uppercase tracking-tighter">STEAL</span>
              <div className="flex flex-col items-end opacity-40">
                <span className="text-black font-black text-[10px] sm:text-xs tracking-[0.4em] italic leading-none">START_MISSION</span>
                <div className="w-16 h-[2px] bg-black mt-1"></div>
              </div>
            </div>
          </motion.div>

          {/* DECKS STRIP */}
          <motion.div
            initial={{ x: 600, rotate: 10 }}
            animate={{ x: -20, rotate: 2 }}
            whileHover={{ x: -50, scale: 1.02 }}
            className={`cursor-pointer relative w-[95%] sm:w-[85%] h-20 sm:h-28 transition-all duration-300 ${activeSection === 'themes' ? 'z-50' : 'z-30 opacity-90'}`}
            onClick={() => setActiveSection(activeSection === 'themes' ? null : 'themes')}
          >
            <div className={`absolute inset-0 bg-black transform skew-x-[-15deg] shadow-[15px_15px_0_#D80000] border-l-[12px] border-white p5-border`}></div>
            <div className="relative h-full flex items-center justify-between px-10 sm:px-16 text-white">
              <div className="flex flex-col items-start opacity-40">
                <span className="font-black text-[10px] sm:text-xs tracking-[0.4em] italic leading-none">FORGE_CARDS</span>
                <div className="w-16 h-[2px] bg-white mt-1"></div>
              </div>
              <span className="font-p5-display text-5xl sm:text-8xl italic uppercase tracking-tighter text-shadow-[4px_4px_0_#D80000]">DECKS</span>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Sub-menu Content */}
        <div className="h-64 sm:h-80 w-full flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            {!activeSection && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                className="flex flex-col items-center opacity-20 group"
              >
                <div className="font-p5-display text-[10rem] sm:text-[14rem] italic tracking-tighter text-white/30 leading-none">P5</div>
                <div className="mt-[-2rem] text-white/50 font-black tracking-[1.5em] text-[10px] uppercase italic animate-pulse">Waiting_Input</div>
              </motion.div>
            )}

            {activeSection === 'gamemodes' && (
              <motion.div
                key="steal-sub"
                initial={{ opacity: 0, y: 30, rotate: 5 }}
                animate={{ opacity: 1, y: 0, rotate: -3 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-full max-w-sm px-4"
              >
                <button
                  onClick={() => setView('game')}
                  className="w-full bg-white text-black p-8 sm:p-12 transform hover:scale-105 transition-all shadow-[20px_20px_0_#000] p5-border group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-12 h-12 bg-[#D80000] transform translate-x-1/2 -translate-y-1/2 rotate-45 z-0"></div>
                  <span className="font-p5-display text-4xl sm:text-7xl italic block leading-none mb-6 relative z-10 group-hover:text-[#D80000]">★ START MISSION</span>
                  <div className="flex items-center gap-5 border-t-8 border-black pt-6 relative z-10">
                    <div className="w-10 h-10 bg-black flex items-center justify-center transform rotate-45 border-4 border-[#D80000] group-hover:scale-125 transition-transform duration-500">
                      <div className="w-4 h-4 bg-white animate-pulse"></div>
                    </div>
                    <div className="flex flex-col items-start translate-y-[-2px]">
                      <span className="text-[10px] sm:text-xs font-black tracking-[0.3em] italic uppercase text-[#D80000]">Operation_Heist</span>
                      <span className="text-[8px] sm:text-[10px] font-bold tracking-widest uppercase opacity-40">Execute_Cognitive_Sync</span>
                    </div>
                  </div>
                </button>
              </motion.div>
            )}

            {activeSection === 'themes' && (
              <motion.div
                key="decks-sub"
                initial={{ opacity: 0, x: 100, rotate: -5 }}
                animate={{ opacity: 1, x: 0, rotate: 2 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-full max-w-2xl grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 px-4"
              >
                {themes.map((t, i) => (
                  <motion.button
                    key={t}
                    whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 3 : -3, zIndex: 10 }}
                    onClick={() => setTheme(t)}
                    className={`
                      p-3 sm:p-5 italic font-p5-display transition-all transform shadow-[6px_6px_0_#000] p5-border border-[3px]
                      ${theme === t
                        ? 'bg-[#D80000] text-white scale-110 !shadow-[10px_10px_0_white] -rotate-2 border-white'
                        : 'bg-black text-white border-white/10 hover:bg-white hover:text-black hover:-translate-y-1'}
                    `}
                  >
                    <span className="text-xs sm:text-lg">{t.toUpperCase()}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Decorative Brand Elements */}
      <div className="absolute top-10 left-10 text-white/10 font-black text-[12rem] italic leading-none pointer-events-none -z-10 tracking-tighter">01</div>
      <div className="absolute bottom-10 right-10 flex flex-col items-end pointer-events-none opacity-20 italic">
        <span className="font-p5-display text-4xl sm:text-7xl tracking-tighter text-white">THIEVE_SYNC</span>
        <span className="text-[10px] font-black tracking-[0.8em] text-[#D80000]">V_1.21-PHANTOM</span>
      </div>
    </div>
  );
};

export default PersonaApp;