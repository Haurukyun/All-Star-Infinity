
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
        <div className="space-y-6 pt-2">
          {/* SELECT SOURCE Header */}
          <div className="relative mb-2 transform -skew-x-12 bg-white text-black px-4 py-1.5 sm:px-6 sm:py-2 inline-block border-[3px] sm:border-[4px] border-black z-10 shadow-[4px_4px_0_black]">
            <h2 className="font-p5-display text-2xl sm:text-4xl tracking-tighter transform skew-x-12 uppercase italic">Select Source</h2>
          </div>

          {/* Deck Selector */}
          <div className="flex flex-col gap-2 sm:gap-3 mb-6 sm:mb-8">
            <button 
              onClick={() => setActiveDeckId('default')}
              className={`p-3 sm:p-4 text-left border-[2px] sm:border-[3px] border-black transition-all transform -skew-x-6 group shadow-[4px_4px_0_black] ${activeDeckId === 'default' ? 'bg-white text-black translate-x-1 translate-y-1 shadow-none' : 'bg-black text-white border-white/20 opacity-60'}`}
            >
              <span className="font-p5-display text-xl sm:text-2xl transform skew-x-6 block italic">★ PHANTOM DEFAULT</span>
            </button>
            {customDecks.map(deck => (
              <button 
                key={deck.id}
                onClick={() => setActiveDeckId(deck.id)}
                className={`p-3 sm:p-4 text-left border-[2px] sm:border-[3px] border-black transition-all transform -skew-x-6 group shadow-[4px_4px_0_black] ${activeDeckId === deck.id ? 'bg-white text-black translate-x-1 translate-y-1 shadow-none' : 'bg-black text-white border-white/20 opacity-60'}`}
              >
                <span className="font-p5-display text-xl sm:text-2xl transform skew-x-6 block italic">{deck.name.toUpperCase()}</span>
                <span className="block text-[8px] sm:text-[10px] opacity-60 font-bold tracking-widest mt-0.5 transform skew-x-6">{deck.prompts.length} CARDS FORGED</span>
              </button>
            ))}
          </div>

          {/* SELECT TARGET Header */}
          <div className="relative mb-3 transform skew-x-12 bg-[#D80000] text-white px-4 py-1.5 sm:px-6 sm:py-2 inline-block border-[3px] sm:border-[4px] border-black z-10 shadow-[4px_4px_0_black]">
            <h2 className="font-p5-display text-2xl sm:text-4xl tracking-tighter transform -skew-x-12 uppercase italic">Select Target</h2>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            {STAGES.map((stage, i) => (
              <motion.button
                key={stage.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
                whileHover={{ 
                  x: 5, 
                  scale: 1.01,
                  transition: { type: 'spring', stiffness: 600, damping: 20 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIntensity(stage.id)}
                className={`group relative flex items-center justify-between p-4 sm:p-6 overflow-hidden border-[2px] sm:border-[3px] border-black transform ${i % 2 === 0 ? '-skew-x-6' : 'skew-x-6'} shadow-[4px_4px_0_black] ${stage.id === 'soft' ? 'bg-white text-black' : stage.id === 'hot' ? 'bg-[#D80000] text-white' : 'bg-black text-white'}`}
              >
                <div className={`flex flex-col text-left transform ${i % 2 === 0 ? 'skew-x-6' : '-skew-x-6'}`}>
                  <span className="font-p5-display text-3xl sm:text-5xl leading-none uppercase italic">{stage.title}</span>
                  <span className="text-[8px] sm:text-[10px] font-black tracking-[0.2em] uppercase opacity-60 mt-0.5">{stage.desc}</span>
                </div>
                <span className={`font-p5-display text-4xl sm:text-6xl opacity-10 font-bold transform ${i % 2 === 0 ? 'skew-x-6' : '-skew-x-6'}`}>0{i+1}</span>
              </motion.button>
            ))}
          </div>
        </div>
      ) : !prompt ? (
        <div className="flex flex-col items-center gap-8 sm:gap-12 pt-6 sm:pt-10">
          <motion.div 
            initial={{ scale: 1.2, opacity: 0, rotate: -3 }} 
            animate={{ scale: 1, opacity: 1, rotate: 0 }} 
            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
            className="text-center relative"
          >
            <div className="absolute -inset-4 bg-white/5 blur-xl rounded-full"></div>
            <p className="font-p5-display text-base sm:text-lg text-[#D80000] tracking-widest relative z-10">MISSION_PARAMS</p>
            <h2 className="font-p5-display text-5xl sm:text-7xl text-white italic tracking-tighter drop-shadow-[4px_4px_0px_#D80000] relative z-10 uppercase">
              {intensity}
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 w-full px-2 sm:px-4">
            <motion.button 
              whileHover={{ scale: 1.02, rotate: -1, x: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleDraw('Truth')} 
              className="bg-white text-black p-4 sm:p-6 transform -skew-x-12 border-[3px] sm:border-[4px] border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] font-p5-display text-3xl sm:text-4xl italic text-left"
            >
              <span className="transform skew-x-12 block">THE TRUTH</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02, rotate: 1, x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleDraw('Dare')} 
              className="bg-[#D80000] text-white p-4 sm:p-6 transform skew-x-12 border-[3px] sm:border-[4px] border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] font-p5-display text-3xl sm:text-4xl italic text-right"
            >
              <span className="transform -skew-x-12 block">THE ACTION</span>
            </motion.button>
            <button onClick={() => setIntensity(null)} className="mt-4 sm:mt-8 font-black text-white/40 uppercase tracking-[0.4em] text-[8px] sm:text-[10px] hover:text-[#D80000] transition-colors vibrate-hover">[ ABORT MISSION ]</button>
          </div>
        </div>
      ) : (
        <motion.div 
          key="calling-card" 
          initial={{ opacity: 0, scale: 0.9, rotateY: 25, y: 30 }} 
          animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }} 
          transition={{ type: 'spring', damping: 18, stiffness: 300 }}
          className="relative mt-2 sm:mt-4"
        >
          <div className="bg-white text-black p-6 sm:p-8 border-[4px] sm:border-[6px] border-black shadow-[8px_8px_0px_rgba(216,0,0,1)] relative z-20 overflow-hidden transform -rotate-1">
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#D80000] opacity-5 transform rotate-45 translate-x-12 -translate-y-12 sm:translate-x-16 sm:-translate-y-16"></div>
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <span className="bg-[#D80000] text-white px-3 py-1 sm:px-4 sm:py-1.5 font-p5-display text-xl sm:text-2xl skew-x-[-15deg] border-[2px] sm:border-[3px] border-black italic uppercase">{prompt.type}</span>
              <div className="text-black font-black text-[8px] sm:text-xs italic opacity-40 tracking-widest">ENTRY_{history.length.toString().padStart(3, '0')}</div>
            </div>
            <p className="font-p5-display text-2xl sm:text-4xl italic leading-tight mb-8 sm:mb-10 tracking-tight">"{prompt.text}"</p>
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t-[3px] sm:border-t-[4px] border-black border-dashed">
              <p className="font-p5-display text-lg sm:text-xl text-[#D80000] mb-1 sm:mb-2 italic">PENALTY_LOG</p>
              <p className="font-bold text-[10px] sm:text-xs uppercase italic opacity-90 leading-relaxed">{prompt.penalty}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-8 sm:mt-10 px-1 sm:px-2 relative z-30">
            <button onClick={() => setPrompt(null)} className="bg-white text-black font-p5-display text-xl sm:text-2xl h-14 sm:h-16 transform -skew-x-12 border-[3px] sm:border-[4px] border-black shadow-[4px_4px_0_black] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
              <span className="transform skew-x-12 block">DONE</span>
            </button>
            <button onClick={() => handleDraw(prompt.type)} className="bg-[#D80000] text-white font-p5-display text-xl sm:text-2xl h-14 sm:h-16 transform skew-x-12 border-[3px] sm:border-[4px] border-black shadow-[4px_4px_0_black] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
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
{editingDeck.prompts.map((p, idx) => (
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
    { id: 'gamemodes', label: 'STEAL' },
    { id: 'themes', label: 'DECKS' },
    { id: 'options', label: 'META' },
  ];

  const themes = Object.values(Theme).filter(t => t !== Theme.NONE);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-black">
      <div className="absolute inset-0 p5-dots-bg opacity-40"></div>
      <div className="absolute top-0 right-0 w-full sm:w-2/3 h-full bg-[#D80000] transform skew-x-[-25deg] translate-x-1/2 opacity-30 z-0 mix-blend-multiply"></div>
      
      <div className="z-10 w-full max-w-lg flex flex-col gap-8 sm:gap-12">
        <div className="relative flex flex-col items-center gap-4 sm:gap-6">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveSection(activeSection === item.id ? null : item.id as any)}
              className={`
                font-p5-display text-5xl sm:text-7xl tracking-tighter uppercase italic transform -skew-x-12 transition-all duration-300 w-full text-center py-2
                ${activeSection === item.id ? 'bg-white text-black shadow-[4px_4px_0_black] sm:shadow-[8px_8px_0_black] scale-105' : 'text-white hover:text-[#D80000] hover:translate-x-2'}
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="transform skew-x-12 block">{item.label}</span>
            </motion.button>
          ))}
        </div>

        <div className="h-48 sm:h-64 relative">
          <AnimatePresence mode="wait">
            {activeSection === 'gamemodes' && (
              <motion.div 
                key="gamemodes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col gap-4"
              >
                <button 
                  onClick={() => setView('game')}
                  className="bg-white text-black p-4 transform -skew-x-6 shadow-[4px_4px_0_black] font-p5-display text-xl sm:text-2xl italic text-left hover:bg-[#D80000] hover:text-white transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
                >
                  <span className="transform skew-x-6 block">★ START MISSION</span>
                </button>
              </motion.div>
            )}

            {activeSection === 'themes' && (
              <motion.div 
                key="themes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-2 gap-2 sm:gap-3"
              >
                {themes.map((t) => (
                  <button 
                    key={t}
                    onClick={() => setTheme(t)}
                    className="bg-black text-white border-2 border-white/20 p-2 sm:p-3 transform -skew-x-12 font-p5-display text-[10px] sm:text-sm italic hover:bg-white hover:text-black transition-all"
                  >
                    <span className="transform skew-x-12 block">{t.toUpperCase()}</span>
                  </button>
                ))}
              </motion.div>
            )}

            {activeSection === 'options' && (
              <motion.div 
                key="options"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white text-black p-4 sm:p-6 transform -skew-x-6 shadow-[4px_4px_0_black] sm:shadow-[8px_8px_0_black] space-y-3 sm:space-y-4"
              >
                <div className="flex justify-between items-center border-b-2 border-black pb-1 sm:pb-2">
                  <span className="font-p5-display text-lg sm:text-xl italic">HEART_SYNC</span>
                  <span className="font-black text-[10px]">STABLE</span>
                </div>
                <div className="flex justify-between items-center border-b-2 border-black pb-1 sm:pb-2">
                  <span className="font-p5-display text-lg sm:text-xl italic">VERSION</span>
                  <span className="font-black text-[10px]">1.0.0</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PersonaApp;