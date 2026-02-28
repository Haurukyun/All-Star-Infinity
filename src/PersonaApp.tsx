
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
                className={`group relative flex items-center justify-between p-3 sm:p-4 overflow-hidden border-[2px] border-black transform ${i % 2 === 0 ? '-skew-x-6' : 'skew-x-6'} shadow-[3px_3px_0_black] ${stage.id === 'soft' ? 'bg-white text-black' : stage.id === 'hot' ? 'bg-[#D80000] text-white' : 'bg-black text-white'}`}
              >
                <div className={`flex flex-col text-left transform ${i % 2 === 0 ? 'skew-x-6' : '-skew-x-6'}`}>
                  <span className="font-p5-display text-xl sm:text-3xl leading-none uppercase italic">{stage.title}</span>
                  <span className="text-[6px] sm:text-[8px] font-black tracking-[0.2em] uppercase opacity-60 mt-0.5">{stage.desc}</span>
                </div>
                <span className={`font-p5-display text-2xl sm:text-4xl opacity-10 font-bold transform ${i % 2 === 0 ? 'skew-x-6' : '-skew-x-6'}`}>0{i+1}</span>
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
              className="bg-white text-black p-3 sm:p-4 transform -skew-x-12 border-[2px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] font-p5-display text-xl sm:text-2xl italic text-left"
            >
              <span className="transform skew-x-12 block">THE TRUTH</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02, rotate: 1, x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleDraw('Dare')} 
              className="bg-[#D80000] text-white p-3 sm:p-4 transform skew-x-12 border-[2px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] font-p5-display text-xl sm:text-2xl italic text-right"
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
{[ { label: 'HEART SYNC', val: 'STABLE' }, { label: 'COGNITION', val: 'ENHANCED' }, { label: 'MASK ID', val: 'JOKER' }].map((s, i) => (
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
  const { setView, setTheme } = logic;
  const [activeSection, setActiveSection] = React.useState<'gamemodes' | 'themes' | 'options' | null>(null);

  const menuItems = [
    { id: 'gamemodes', label: 'STEAL', sub: 'START_MISSION', rotation: -5, x: -20 },
    { id: 'themes', label: 'DECKS', sub: 'FORGE_CARDS', rotation: 3, x: 10 },
    { id: 'options', label: 'META', sub: 'SYSTEM_CONFIG', rotation: -2, x: -5 },
  ];

  const themes = Object.values(Theme).filter(t => t !== Theme.NONE);

  const [shards, setShards] = React.useState<{ id: number, width: number, height: number, left: string, top: string, rotate: number }[]>([]);

  React.useEffect(() => {
    setShards([...Array(12)].map((_, i) => ({
      id: i,
      width: Math.random() * 150 + 50,
      height: Math.random() * 150 + 50,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      rotate: Math.random() * 360,
    })));
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden bg-black select-none">
      {/* Dynamic Background */}
      <div className="absolute inset-0 p5-dots-bg opacity-40"></div>
      <div className="absolute top-0 right-0 w-full sm:w-2/3 h-full bg-[#D80000] transform skew-x-[-25deg] translate-x-1/2 opacity-20 z-0 mix-blend-multiply"></div>
      
      {/* Floating Shards */}
      <div className="absolute inset-0 pointer-events-none">
        {shards.map((shard, i) => (
          <motion.div
            key={shard.id}
            className="absolute bg-white/5 border border-white/10"
            style={{
              width: shard.width,
              height: shard.height,
              left: shard.left,
              top: shard.top,
              rotate: shard.rotate,
              skewX: -15,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              rotate: [shard.rotate, shard.rotate + 10, shard.rotate],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="z-10 w-full max-w-2xl flex flex-col sm:flex-row items-center sm:items-start justify-center gap-8 sm:gap-12">
        {/* Main Menu Items */}
        <div className="relative flex flex-col items-center sm:items-start gap-4 sm:gap-6 w-full sm:w-1/2">
          {menuItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1, type: 'spring', stiffness: 200 }}
              className="w-full"
            >
              <button
                onClick={() => setActiveSection(activeSection === item.id ? null : item.id as 'gamemodes' | 'themes' | 'options')}
                className={`
                  relative group w-full text-left transition-all duration-300
                  ${activeSection === item.id ? 'scale-105 z-30' : 'hover:scale-102 z-10'}
                `}
              >
                <div 
                  className={`
                    absolute inset-0 bg-black border-[3px] border-black transform transition-colors
                    ${activeSection === item.id ? 'bg-white' : 'group-hover:bg-[#D80000]'}
                  `}
                  style={{ transform: `skewX(-15deg) rotate(${item.rotation}deg)` }}
                ></div>
                
                <div className="relative px-6 py-3 sm:py-5 flex flex-col">
                  <span 
                    className={`
                      font-p5-display text-4xl sm:text-6xl tracking-tighter uppercase italic leading-none transition-colors
                      ${activeSection === item.id ? 'text-black' : 'text-white'}
                    `}
                  >
                    {item.label}
                  </span>
                  <span 
                    className={`
                      font-black text-[8px] sm:text-[10px] tracking-[0.3em] uppercase italic mt-0.5 transition-colors
                      ${activeSection === item.id ? 'text-[#D80000]' : 'text-white/40'}
                    `}
                  >
                    {item.sub}
                  </span>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Sub-menu Content */}
        <div className="w-full sm:w-1/2 h-48 sm:h-80 relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!activeSection && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                className="text-center"
              >
                <div className="font-p5-display text-white/10 text-8xl italic tracking-tighter select-none">P5</div>
                <p className="text-white/20 font-black tracking-[1em] uppercase text-[10px] mt-[-1.5rem]">WAITING_FOR_INPUT</p>
              </motion.div>
            )}

            {activeSection === 'gamemodes' && (
              <motion.div 
                key="gamemodes"
                initial={{ opacity: 0, x: 50, rotate: 5 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                exit={{ opacity: 0, x: -50, rotate: -5 }}
                className="w-full flex flex-col gap-3"
              >
                <button 
                  onClick={() => setView('game')}
                  className="group relative bg-white text-black p-4 sm:p-6 transform -skew-x-6 shadow-[8px_8px_0_black] p5-border transition-all hover:-translate-y-1 active:translate-y-0.5 active:shadow-none"
                >
                  <div className="absolute inset-0 bg-[#D80000] opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <span className="font-p5-display text-2xl sm:text-4xl italic block leading-none">★ START MISSION</span>
                  <span className="block text-[8px] font-black tracking-widest mt-1.5 opacity-60">EXECUTE_COGNITIVE_HEIST</span>
                </button>
              </motion.div>
            )}

            {activeSection === 'themes' && (
              <motion.div 
                key="themes"
                initial={{ opacity: 0, scale: 0.9, skewX: 10 }}
                animate={{ opacity: 1, scale: 1, skewX: 0 }}
                exit={{ opacity: 0, scale: 1.1, skewX: -10 }}
                className="w-full grid grid-cols-2 gap-2"
              >
                {themes.map((t, i) => (
                  <motion.button 
                    key={t}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setTheme(t)}
                    className={`
                      p-2 sm:p-3 transform -skew-x-12 font-p5-display text-[10px] sm:text-xs italic transition-all border-[2px] border-black shadow-[3px_3px_0_black]
                      ${theme === t ? 'bg-white text-black scale-105 z-10' : 'bg-black text-white border-white/20 hover:bg-[#D80000]'}
                    `}
                  >
                    <span className="transform skew-x-12 block">{t.toUpperCase()}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {activeSection === 'options' && (
              <motion.div 
                key="options"
                initial={{ opacity: 0, y: 30, rotate: -3 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -30, rotate: 3 }}
                className="w-full bg-white text-black p-4 sm:p-6 transform -skew-x-3 shadow-[12px_12px_0_black] p5-border space-y-3"
              >
                <div className="flex justify-between items-end border-b-2 border-black pb-1">
                  <span className="font-p5-display text-xl sm:text-2xl italic">HEART_SYNC</span>
                  <span className="font-black text-[10px] text-[#D80000]">STABLE</span>
                </div>
                <div className="flex justify-between items-end border-b-2 border-black pb-1">
                  <span className="font-p5-display text-xl sm:text-2xl italic">COGNITION</span>
                  <span className="font-black text-[10px] text-[#D80000]">ENHANCED</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Decoration */}
      <div className="absolute bottom-10 left-10 hidden sm:block">
        <div className="font-p5-display text-white/5 text-4xl italic tracking-widest">TAKE_YOUR_HEART</div>
      </div>
    </div>
  );
};

export default PersonaApp;