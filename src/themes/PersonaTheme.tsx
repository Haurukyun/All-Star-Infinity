import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme, ThemeDefinition } from '../types';

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

const STAGES = [
    { id: Intensity.SOFT, title: 'SOFT', desc: 'CASUAL_COGNITION', color: 'white', text: 'black' },
    { id: Intensity.HOT, title: 'HOT', desc: 'MODELING_TARGET', color: '#D80000', text: 'white' },
    { id: Intensity.VULGAR, title: 'VULGAR', desc: 'TOTAL_EXPOSURE', color: 'black', text: 'white' },
];

export const PersonaLayout: React.FC<{ children: React.ReactNode; activeTab: string; setActiveTab: (tab: string) => void; logic: any }> = ({ children, activeTab, setActiveTab, logic }) => {
    const tabs = [
        { id: 'play', label: 'STEAL' },
        { id: 'decks', label: 'FORGE' },
        { id: 'history', label: 'LOGS' },
        { id: 'themes', label: 'SHIFT' },
        { id: 'settings', label: 'META' },
    ];

    const { useEasyFont } = logic;

    return (
        <div className={`h-[100dvh] w-screen bg-black text-white overflow-hidden font-sans flex flex-col relative persona-theme-root ${useEasyFont ? 'p5-easy-font' : ''}`}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Nunito:wght@400;600;700;800;900&display=swap');
        
        .p5-easy-font .font-p5-display { font-family: 'Nunito', sans-serif; font-weight: 900; letter-spacing: 0.02em; }
        .p5-easy-font p, .p5-easy-font span, .p5-easy-font div { font-family: 'Nunito', sans-serif; }
        .p5-easy-font h1, .p5-easy-font h2, .p5-easy-font h3 { font-family: 'Nunito', sans-serif; font-weight: 900; }
        
        .font-p5-display {
          font-family: 'Bangers', cursive;
          letter-spacing: 0.05em;
        }

        .p5-dots-bg {
          background-color: #050505;
          background-image: 
            radial-gradient(circle at 2px 2px, #300 1px, transparent 0),
            linear-gradient(45deg, #100 25%, transparent 25%, transparent 75%, #100 75%, #100),
            linear-gradient(-45deg, #100 25%, transparent 25%, transparent 75%, #100 75%, #100);
          background-size: 12px 12px, 100px 100px, 100px 100px;
          animation: p5bgMove 40s linear infinite;
        }

        .p5-stars-bg {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L53 47L100 50L53 53L50 100L47 53L0 50L47 47L50 0Z' fill='rgba(216,0,0,0.1)'/%3E%3C/svg%3E");
          background-size: 50px 50px;
          opacity: 0.3;
        }

        @keyframes p5bgMove {
          0% { background-position: 0 0, 0 0, 0 0; }
          100% { background-position: 0 0, 1000px 1000px, -1000px 1000px; }
        }

        .p5-shards {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(115deg, transparent 20%, rgba(216,0,0,0.05) 21%, rgba(216,0,0,0.05) 24%, transparent 25%),
            linear-gradient(115deg, transparent 40%, rgba(216,0,0,0.03) 41%, rgba(216,0,0,0.03) 46%, transparent 47%),
            linear-gradient(115deg, transparent 70%, rgba(216,0,0,0.08) 71%, rgba(216,0,0,0.08) 78%, transparent 79%);
          background-size: 200% 100%;
          animation: p5shardMove 20s ease-in-out infinite alternate;
        }

        @keyframes p5shardMove {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 0%; }
        }

        .p5-border {
          box-shadow: 0 0 0 3px #000;
        }
        .p5-border-sm {
          box-shadow: 0 0 0 2px #000;
        }

        .vibrate-hover:hover {
          animation: p5vibrate 0.3s linear infinite both;
        }

        @keyframes p5vibrate {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
      `}</style>

            {/* Background Pattern */}
            <div className="absolute inset-0 p5-dots-bg z-0 opacity-100"></div>
            <div className="absolute inset-0 p5-stars-bg z-0"></div>
            <div className="absolute inset-0 p5-shards z-0"></div>

            {/* Red Diagonal Half Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-[200%] h-[200%] bg-[#D80000] opacity-20 transform -rotate-45 -translate-x-1/2 -translate-y-1/2 mix-blend-multiply"></div>
            </div>

            {/* Silhouette Decoration */}
            <div className="absolute bottom-0 right-0 w-full h-full pointer-events-none z-0 opacity-10 overflow-hidden">
                <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[80%] bg-black transform skew-x-[-10deg]"></div>
            </div>

            {/* Header */}
            <header className="relative z-10 p-3 pt-4 sm:pt-6 flex justify-start items-center overflow-visible">
                <div className="relative flex flex-col items-start scale-[0.65] sm:scale-90 origin-left">
                    {/* PHANTOM Box */}
                    <div className="bg-white text-black px-4 sm:px-8 py-2 sm:py-3 transform -rotate-3 -skew-x-12 relative z-20 shadow-[4px_4px_0_black] sm:shadow-[6px_6px_0_black] p5-border">
                        <h1 className="font-p5-display text-3xl sm:text-6xl tracking-tighter uppercase leading-none italic">PHANTOM</h1>
                    </div>
                    {/* OBSIDIAN Box */}
                    <div className="bg-[#D80000] text-white px-3 sm:px-6 py-1 sm:py-1.5 transform rotate-2 -skew-x-12 relative mt-1 sm:mt-2 ml-4 sm:ml-8 z-10 whitespace-nowrap shadow-[4px_4px_0_black] sm:shadow-[6px_6px_0_black] p5-border">
                        <h1 className="font-p5-display text-xl sm:text-3xl tracking-widest uppercase leading-none italic">OBSIDIAN</h1>
                    </div>
                </div>
                <div className="absolute top-4 sm:top-6 right-3 sm:right-6 flex gap-1 sm:gap-1.5">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white transform rotate-45 shadow-[0_0_0_1.5px_#000] sm:shadow-[0_0_0_2px_#000]"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#D80000] transform rotate-45 shadow-[0_0_0_1.5px_#000] sm:shadow-[0_0_0_2px_#000]"></div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 relative z-10 overflow-y-auto p-3 sm:p-4 pb-24 sm:pb-32 custom-scrollbar">
                <div className="max-w-lg mx-auto h-full flex flex-col">
                    {children}
                </div>
            </main>

            {/* Navigation */}
            <nav className="fixed bottom-4 left-0 w-full z-50 px-2 pointer-events-none">
                <div className="flex justify-center items-end -space-x-1 sm:-space-x-1.5 max-w-xl mx-auto pointer-events-auto">
                    {tabs.map((tab, index) => {
                        const isActive = activeTab === tab.id;
                        const rotations = ['-rotate-6', 'rotate-3', '-rotate-2', 'rotate-4', 'rotate-7'];
                        const rotation = rotations[index % rotations.length];

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                  flex items-center justify-center 
                  transition-all duration-300 ease-[0.22,1,0.36,1]
                  ${rotation}
                  ${isActive
                                        ? 'bg-white text-black w-20 h-16 sm:w-32 sm:h-24 z-20 -translate-y-4 shadow-[6px_6px_0_black] p5-border'
                                        : 'bg-[#D80000] text-white w-16 h-12 sm:w-24 sm:h-18 hover:-translate-y-2 hover:z-10 shadow-[3px_3px_0_black] p5-border'}
                `}
                            >
                                <span className={`font-p5-display uppercase tracking-wider ${isActive ? 'text-base sm:text-2xl' : 'text-[8px] sm:text-xs'}`}>
                                    {tab.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
};

export const PersonaPlayScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const {
        intensity, setIntensity,
        prompt, setPrompt,
        history,
        activeDeckId, setActiveDeckId,
        customDecks,
        handleDraw
    } = logic;

    return (
        <AnimatePresence mode="wait">
            {!intensity && !prompt ? (
                <motion.div key="intensity" variants={P5_VARIANTS} initial="initial" animate="animate" exit="exit" className="space-y-4 pt-1">
                    <div className="relative mb-1 transform -skew-x-12 bg-white text-black px-3 py-1 sm:px-5 sm:py-1.5 inline-block border-[2px] border-black z-10 shadow-[3px_3px_0_black]">
                        <h2 className="font-p5-display text-lg sm:text-2xl tracking-tighter transform skew-x-12 uppercase italic">Select Source</h2>
                    </div>
                    <div className="flex flex-col gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                        <button
                            onClick={() => setActiveDeckId('default')}
                            className={`p-2 sm:p-3 text-left border-[2px] border-black transition-all transform -skew-x-6 group shadow-[3px_3px_0_black] ${activeDeckId === 'default' ? 'bg-white text-black translate-x-0.5 translate-y-0.5 shadow-none' : 'bg-black text-white border-white/20 opacity-60'}`}
                        >
                            <span className="font-p5-display text-lg sm:text-xl transform skew-x-6 block italic">★ PHANTOM DEFAULT</span>
                        </button>
                        {customDecks.map((deck: any) => (
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
                                whileHover={{ x: 3, scale: 1.01 }}
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
                </motion.div>
            ) : !prompt ? (
                <motion.div key="choice" variants={P5_VARIANTS} initial="initial" animate="animate" exit="exit" className="flex flex-col items-center gap-6 sm:gap-8 pt-4 sm:pt-6">
                    <div className="text-center relative">
                        <div className="absolute -inset-4 bg-white/5 blur-xl rounded-full"></div>
                        <p className="font-p5-display text-sm sm:text-base text-[#D80000] tracking-widest relative z-10">MISSION_PARAMS</p>
                        <h2 className="font-p5-display text-3xl sm:text-5xl text-white italic tracking-tighter drop-shadow-[3px_3px_0px_#D80000] relative z-10 uppercase">
                            {intensity}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:gap-4 w-full px-2 sm:px-4">
                        <motion.button onClick={() => handleDraw('Truth')} whileHover={{ scale: 1.02, rotate: -1, x: -2 }} className="bg-white text-black p-3 sm:p-4 transform -skew-x-12 p5-border font-p5-display text-xl sm:text-2xl italic text-left">
                            <span className="transform skew-x-12 block">THE TRUTH</span>
                        </motion.button>
                        <motion.button onClick={() => handleDraw('Dare')} whileHover={{ scale: 1.02, rotate: 1, x: 2 }} className="bg-[#D80000] text-white p-3 sm:p-4 transform skew-x-12 p5-border font-p5-display text-xl sm:text-2xl italic text-right">
                            <span className="transform -skew-x-12 block">THE ACTION</span>
                        </motion.button>
                        <button onClick={() => setIntensity(null)} className="mt-2 sm:mt-4 font-black text-white/40 uppercase tracking-[0.4em] text-[7px] sm:text-[9px] hover:text-[#D80000] transition-colors vibrate-hover">[ ABORT MISSION ]</button>
                    </div>
                </motion.div>
            ) : (
                <motion.div key="prompt" variants={P5_VARIANTS} initial="initial" animate="animate" exit="exit" className="relative mt-1 sm:mt-2">
                    <div className="bg-white text-black p-4 sm:p-6 border-[3px] border-black shadow-[6px_6px_0px_rgba(216,0,0,1)] relative z-20 overflow-hidden transform -rotate-1">
                        <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-[#D80000] opacity-5 transform rotate-45 translate-x-10 -translate-y-10"></div>
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
        </AnimatePresence>
    );
};

export const PersonaDecksScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { customDecks, setEditingDeck, deleteDeck, editingDeck, generateId, saveDeck, addNewPromptToEditingDeck, updatePromptInEditingDeck, removePromptFromEditingDeck } = logic;

    return (
        <AnimatePresence mode="wait">
            {!editingDeck ? (
                <motion.div key="decks-list" variants={P5_VARIANTS} initial="initial" animate="animate" exit="exit" className="space-y-4">
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
                            customDecks.map((deck: any) => (
                                <div key={deck.id} className="p-3 sm:p-4 bg-white text-black border-[3px] border-black transform -skew-x-6 relative group shadow-[4px_4px_0_black]">
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
                </motion.div>
            ) : (
                <motion.div key="deck-editor" variants={P5_VARIANTS} initial="initial" animate="animate" exit="exit" className="space-y-4 sm:space-y-6 pb-24">
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
                        <div className="space-y-3 sm:space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                            {editingDeck.prompts.map((p: any) => (
                                <div key={p.id} className="bg-white/10 p-3 sm:p-4 border-l-4 border-[#D80000] space-y-2">
                                    <div className="flex gap-2">
                                        <select className="bg-black text-white text-[8px] sm:text-[10px] font-bold p-1 border border-white/20" value={p.type} onChange={(e) => updatePromptInEditingDeck(p.id, 'type', e.target.value)}><option>Truth</option><option>Dare</option></select>
                                        <select className="bg-black text-white text-[8px] sm:text-[10px] font-bold p-1 border border-white/20" value={p.intensity} onChange={(e) => updatePromptInEditingDeck(p.id, 'intensity', e.target.value)}><option value={Intensity.SOFT}>SOFT</option><option value={Intensity.HOT}>HOT</option><option value={Intensity.VULGAR}>VULGAR</option></select>
                                        <button onClick={() => removePromptFromEditingDeck(p.id)} className="ml-auto text-[#D80000] font-black text-[8px] sm:text-[10px]">REMOVE</button>
                                    </div>
                                    <input className="w-full bg-transparent border-b border-white/20 text-xs sm:text-sm italic py-1 focus:outline-none focus:border-white" value={p.text} onChange={(e) => updatePromptInEditingDeck(p.id, 'text', e.target.value)} placeholder="PROMPT TEXT..." />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                        <button onClick={() => setEditingDeck(null)} className="bg-black text-white px-4 py-2 border-[2px] border-white/20 transform -skew-x-12 font-p5-display text-lg sm:text-xl italic w-1/2 shadow-[4px_4px_0_rgba(255,255,255,0.1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">CANCEL</button>
                        <button onClick={() => saveDeck(editingDeck)} className="bg-white text-black px-4 py-2 border-[2px] border-black transform skew-x-12 font-p5-display text-lg sm:text-xl italic w-1/2 shadow-[4px_4px_0_black] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">SAVE</button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const PersonaHistoryScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { history } = logic;
    return (
        <motion.div variants={P5_VARIANTS} initial="initial" animate="animate" exit="exit" className="pt-2 space-y-4">
            <h2 className="font-p5-display text-4xl sm:text-5xl italic text-white drop-shadow-[3px_3px_0px_#D80000] vibrate-hover cursor-default">ARCHIVES</h2>
            <div className="flex flex-col gap-2 sm:gap-3 pb-8">
                {history.length === 0 ? <div className="py-16 text-center font-p5-display text-xl sm:text-2xl opacity-10">EMPTY_LOG</div> :
                    history.map((item: any, i: number) => (
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
    );
};

export const PersonaSettingsScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setView, useEasyFont, setUseEasyFont } = logic;
    return (
        <motion.div variants={P5_VARIANTS} initial="initial" animate="animate" exit="exit" className="pt-2 space-y-4 sm:space-y-6">
            <h2 className="font-p5-display text-4xl sm:text-5xl italic text-white drop-shadow-[3px_3px_0px_#D80000] vibrate-hover cursor-default">SYSTEM</h2>
            <div className="space-y-2 sm:space-y-3">
                {[{ label: 'HEART SYNC', val: 'STABLE' }, { label: 'COGNITION', val: 'ENHANCED' }, { label: 'MASK ID', val: 'JOKER' }].map((s, i) => (
                    <div key={i} className="flex justify-between items-center p-3 sm:p-3.5 bg-black border-2 border-white/10 transform skew-x-12">
                        <span className="font-p5-display text-base sm:text-lg text-white transform skew-x-[-12deg]">{s.label}</span>
                        <span className="font-black text-[8px] sm:text-[9px] text-[#D80000] transform skew-x-[-12deg]">{s.val}</span>
                    </div>
                ))}
                <button
                    onClick={() => setUseEasyFont(!useEasyFont)}
                    className="w-full flex justify-between items-center p-3 sm:p-3.5 bg-black border-2 border-white/20 transform skew-x-12 hover:border-white/60 transition-colors"
                >
                    <span className="font-p5-display text-base sm:text-lg text-white transform skew-x-[-12deg]">EASY FONT MODE</span>
                    <span className={`font-black text-[9px] sm:text-[10px] transform skew-x-[-12deg] ${useEasyFont ? 'text-[#D80000]' : 'text-white/40'}`}>
                        {useEasyFont ? 'ON' : 'OFF'}
                    </span>
                </button>
                <button onClick={() => setView('menu')} className="w-full flex justify-between items-center p-3 sm:p-3.5 bg-white text-black border-[2px] sm:border-[3px] border-black transform -skew-x-12 shadow-[4px_4px_0_black] hover:bg-[#D80000] hover:text-white transition-colors active:translate-x-1 active:translate-y-1 active:shadow-none">
                    <span className="font-p5-display text-base sm:text-lg transform skew-x-[12deg]">RETURN TO TITLE</span>
                    <span className="font-black text-[8px] sm:text-[9px] transform skew-x-[12deg]">EXEC</span>
                </button>
            </div>
        </motion.div>
    );
};

export const PersonaThemesScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { theme, setTheme } = logic;
    const themes = [
        { id: Theme.PERSONA, label: 'PERSONA 5', sub: 'THE PHANTOM THIEF' },
        { id: Theme.MINECRAFT, label: 'MINECRAFT', sub: 'BLOCKY DIMENSION' },
        { id: Theme.DANGANRONPA, label: 'DANGANRONPA', sub: 'KILLING HARMONY' },
        { id: Theme.OMORI, label: 'OMORI', sub: 'DREAM WORLD' },
        { id: Theme.KIRBY, label: 'KIRBY', sub: 'DREAM LAND' },
        { id: Theme.POKEMON, label: 'POKEMON', sub: 'KANTO REGION' },
        { id: Theme.ANIMAL_CROSSING, label: 'ANIMAL CROSSING', sub: 'ISLAND PARADISE' },
        { id: Theme.SKYRIM, label: 'SKYRIM', sub: 'THE ELDER SCROLLS' },
        { id: Theme.SONIC, label: 'SONIC', sub: 'MANIA INFINITY' },
        { id: Theme.SANRIO, label: 'SANRIO', sub: 'SWEET WORLD' },
        { id: Theme.CYBERPUNK, label: 'CYBERPUNK', sub: 'NIGHT CITY' },
        { id: Theme.UNDERTALE, label: 'UNDERTALE', sub: 'THE UNDERGROUND' },
        { id: Theme.FALLOUT, label: 'FALLOUT', sub: 'THE WASTELAND' },
        { id: Theme.HAZBIN, label: 'HAZBIN HOTEL', sub: 'PENTAGRAM CITY' },
        { id: Theme.VOCALOID, label: 'VOCALOID', sub: 'VIRTUAL SINGER' },
        { id: Theme.FNAF, label: 'FNAF', sub: 'FREDDY FAZBEAR' },
        { id: Theme.IRUMA, label: 'IRUMA-KUN', sub: 'BABYLS ACADEMY' },
        { id: Theme.ARCANE, label: 'ARCANE', sub: 'PILTOVER & ZAUN' }
    ];

    return (
        <motion.div variants={P5_VARIANTS} initial="initial" animate="animate" exit="exit" className="pt-2 space-y-4 sm:space-y-6">
            <h2 className="font-p5-display text-4xl sm:text-5xl italic text-white drop-shadow-[3px_3px_0_#D80000] vibrate-hover cursor-default">THEMES</h2>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {themes.map((t) => (
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
    );
}

export const PersonaMenu: React.FC<{ logic: any }> = ({ logic }) => {
    const { setView, setTheme, theme } = logic;
    const [activeSection, setActiveSection] = React.useState<'gamemodes' | 'themes' | null>(null);
    const themes = Object.values(Theme).filter(t => t !== Theme.NONE);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden bg-black select-none font-p5-display">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');
                .font-p5-display { font-family: 'Bangers', cursive; }
                .p5-dots-bg {
                    background-color: #050505;
                    background-image: radial-gradient(circle at 2px 2px, #300 1px, transparent 0);
                    background-size: 12px 12px;
                }
            `}</style>
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 p5-dots-bg opacity-30"></div>
                <div className="absolute top-0 right-[-10%] w-[120%] h-full bg-[#D80000] transform skew-x-[-15deg] translate-x-[30%] opacity-90 shadow-[inset_20px_0_40px_rgba(0,0,0,0.5)]"></div>
            </div>

            <div className="z-10 w-full max-w-5xl flex flex-col items-center justify-center gap-12 sm:gap-20">
                <div className="flex flex-col items-center gap-10 w-full">
                    <motion.div initial={{ x: -600, rotate: -10 }} animate={{ x: 20, rotate: -4 }} whileHover={{ x: 50, scale: 1.02 }} className="cursor-pointer relative w-[95%] sm:w-[85%] h-20 sm:h-28 transition-all duration-300 z-30 opacity-90" onClick={() => setActiveSection(activeSection === 'gamemodes' ? null : 'gamemodes')}>
                        <div className="absolute inset-0 bg-white transform skew-x-[-15deg] shadow-[15px_15px_0_#000] border-r-[12px] border-[#D80000]"></div>
                        <div className="relative h-full flex items-center justify-between px-10 sm:px-16 text-black">
                            <span className="font-p5-display text-5xl sm:text-8xl italic uppercase tracking-tighter">STEAL</span>
                        </div>
                    </motion.div>
                    <motion.div initial={{ x: 600, rotate: 10 }} animate={{ x: -20, rotate: 2 }} whileHover={{ x: -50, scale: 1.02 }} className="cursor-pointer relative w-[95%] sm:w-[85%] h-20 sm:h-28 transition-all duration-300 z-30 opacity-90" onClick={() => setActiveSection(activeSection === 'themes' ? null : 'themes')}>
                        <div className="absolute inset-0 bg-black transform skew-x-[-15deg] shadow-[15px_15px_0_#D80000] border-l-[12px] border-white"></div>
                        <div className="relative h-full flex items-center justify-between px-10 sm:px-16 text-white text-shadow-[4px_4px_0_#D80000]">
                            <span className="font-p5-display text-5xl sm:text-8xl italic uppercase tracking-tighter">DECKS</span>
                        </div>
                    </motion.div>
                </div>
                <div className="h-64 sm:h-80 w-full flex items-center justify-center relative">
                    <AnimatePresence mode="wait">
                        {!activeSection && (
                            <motion.div key="idle" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2 }} className="flex flex-col items-center opacity-20">
                                <div className="font-p5-display text-[10rem] sm:text-[14rem] italic tracking-tighter text-white/30 leading-none">P5</div>
                            </motion.div>
                        )}
                        {activeSection === 'gamemodes' && (
                            <motion.div key="steal-sub" initial={{ opacity: 0, y: 30, rotate: 5 }} animate={{ opacity: 1, y: 0, rotate: -3 }} exit={{ opacity: 0, scale: 0.8 }} className="w-full max-w-sm px-4">
                                <button onClick={() => setView('game')} className="w-full bg-white text-black p-8 sm:p-12 transform hover:scale-105 transition-all shadow-[20px_20px_0_#000] border-4 border-black group relative overflow-hidden">
                                    <span className="font-p5-display text-4xl sm:text-7xl italic block leading-none relative z-10 group-hover:text-[#D80000]">★ START MISSION</span>
                                </button>
                            </motion.div>
                        )}
                        {activeSection === 'themes' && (
                            <motion.div key="decks-sub" initial={{ opacity: 0, x: 100, rotate: -5 }} animate={{ opacity: 1, x: 0, rotate: 2 }} exit={{ opacity: 0, scale: 0.8 }} className="w-full max-w-2xl grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 px-4">
                                {themes.map((t, i) => (
                                    <motion.button key={t} whileHover={{ scale: 1.1 }} onClick={() => setTheme(t)} className={`p-3 sm:p-5 italic font-p5-display transition-all transform shadow-[6px_6px_0_#000] border-[3px] ${theme === t ? 'bg-[#D80000] text-white' : 'bg-black text-white hover:bg-white hover:text-black'}`}>
                                        <span className="text-xs sm:text-lg">{t.toUpperCase()}</span>
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export const PersonaTheme: ThemeDefinition = {
    id: Theme.PERSONA,
    name: 'Persona 5',
    cssVars: {
        '--theme-accent': '#D80000',
    },
    MenuComponent: PersonaMenu,
    LayoutComponent: PersonaLayout,
    PlayScreen: PersonaPlayScreen,
    DecksScreen: PersonaDecksScreen,
    HistoryScreen: PersonaHistoryScreen,
    SettingsScreen: PersonaSettingsScreen,
    ThemesScreen: PersonaThemesScreen,
    tabLabels: {
        play: 'STEAL',
        decks: 'FORGE',
        history: 'LOGS',
        themes: 'SHIFT',
        settings: 'META'
    }
};
