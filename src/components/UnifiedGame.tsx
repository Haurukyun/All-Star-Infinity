import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameLogic } from '../hooks/useGameLogic';
import { Intensity, Theme, GameMode } from '../types';
import { getThemeDefinition } from '../themes';
import { useTheme } from '../theme/ThemeContext';

interface UnifiedGameProps {
    logic: ReturnType<typeof useGameLogic>;
}

const UnifiedGame: React.FC<UnifiedGameProps> = ({ logic }) => {
    const { setTheme: contextSetTheme, currentThemeDefinition } = useTheme();

    useEffect(() => {
        console.log('--- THEME CONTEXT TEST ---');
        console.log('Current context theme:', currentThemeDefinition.name);
        // contextSetTheme(Theme.PERSONA); // Uncomment to test hard-switch
    }, [currentThemeDefinition]);

    const {
        activeTab,
        gameMode,
        intensity, setIntensity,
        prompt, setPrompt,
        handleDraw,
        customDecks,
        activeDeckId, setActiveDeckId,
        history,
        theme,
        editingDeck, setEditingDeck,
        saveDeck, deleteDeck,
        addNewPromptToEditingDeck,
        updatePromptInEditingDeck,
        removePromptFromEditingDeck,
        generateId
    } = logic;

    const DefaultIntensitySelector = () => (
        <div className="space-y-6 pt-4">
            <h2 className="theme-text-header text-4xl font-bold italic mb-6">INTENSITY</h2>
            <div className="grid grid-cols-1 gap-4">
                {Object.values(Intensity).map((i) => (
                    <button
                        key={i}
                        onClick={() => setIntensity(i)}
                        className="theme-button p-6 text-2xl font-black italic tracking-widest uppercase hover:scale-105"
                    >
                        {i}
                    </button>
                ))}
            </div>
            <div className="mt-8 space-y-3">
                <p className="theme-text-header text-sm opacity-50 uppercase tracking-widest">Select Deck</p>
                <button
                    onClick={() => setActiveDeckId('default')}
                    className={`w-full p-4 theme-button justify-start text-sm ${activeDeckId === 'default' ? 'bg-white text-black' : 'opacity-60'}`}
                >
                    PHANTOM DEFAULT
                </button>
                {customDecks.map(deck => (
                    <button
                        key={deck.id}
                        onClick={() => setActiveDeckId(deck.id)}
                        className={`w-full p-4 theme-button justify-start text-sm ${activeDeckId === deck.id ? 'bg-white text-black' : 'opacity-60'}`}
                    >
                        {deck.name.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );

    const DefaultPromptTypeSelector = () => (
        <div className="flex flex-col items-center justify-center h-full gap-8 py-12">
            <div className="text-center space-y-2">
                <p className="theme-text-header text-xs opacity-50">MODE: {intensity}</p>
                <div className="h-1 w-24 bg-[var(--theme-accent)] mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 gap-4 w-full px-4">
                <button
                    onClick={() => handleDraw('Truth')}
                    className="theme-button p-8 text-4xl font-black italic"
                >
                    TRUTH
                </button>
                <button
                    onClick={() => handleDraw('Dare')}
                    className="theme-button theme-button-alt p-8 text-4xl font-black italic"
                >
                    DARE
                </button>
                <button
                    onClick={() => setIntensity(null)}
                    className="mt-4 theme-text-header text-[10px] opacity-40 hover:opacity-100 transition-opacity"
                >
                    [ ABORT MISSION ]
                </button>
            </div>
        </div>
    );

    const DefaultPromptDisplay = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="theme-panel p-6 sm:p-8 mt-4"
        >
            <div className="flex justify-between items-center mb-6">
                <span className="theme-badge px-3 py-1 font-bold italic">{prompt?.type}</span>
                <span className="theme-text-header text-[10px] opacity-40 italic">ENTRY_{history.length}</span>
            </div>
            <p className="theme-text-prompt text-2xl sm:text-3xl leading-tight mb-8">
                "{prompt?.text}"
            </p>
            <div className="theme-penalty-box p-4 border-t-2 border-dashed border-black/20">
                <p className="theme-text-header text-xs text-[var(--theme-accent)] mb-1">PENALTY</p>
                <p className="text-sm italic opacity-80">{prompt?.penalty}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
                {gameMode === GameMode.NEVER_HAVE_I_EVER ? (
                    <>
                        <button onClick={() => { setIntensity(null); setPrompt(null); }} className="theme-button p-4 text-xl">DONE</button>
                        <button onClick={() => handleDraw('NeverHaveIEver')} className="theme-button theme-button-alt p-4 text-xl">NEXT</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setPrompt(null)} className="theme-button p-4 text-xl">DONE</button>
                        <button onClick={() => handleDraw(prompt!.type)} className="theme-button theme-button-alt p-4 text-xl">REROLL</button>
                    </>
                )}
            </div>
        </motion.div>
    );

    useEffect(() => {
        if (gameMode === GameMode.NEVER_HAVE_I_EVER && intensity && !prompt) {
            handleDraw('NeverHaveIEver');
        }
    }, [gameMode, intensity, prompt, handleDraw]);

    const themeDef = currentThemeDefinition;
    console.log('Rendering UI with active theme from context:', themeDef.name);

    // Persona 5 Animation Settings
    const P5_VARIANTS = {
        initial: { opacity: 0, x: -30, skewX: -5, scale: 1.02 },
        animate: {
            opacity: 1, x: 0, skewX: 0, scale: 1,
            transition: { type: 'spring', damping: 20, stiffness: 300, mass: 0.5 }
        },
        exit: { opacity: 0, x: 30, skewX: 5, scale: 0.98, transition: { duration: 0.2, ease: 'easeInOut' } }
    };

    const PlayTabContent = () => {
        // --- PERSONA 5 OVERRIDE ---
        if (themeDef.id === Theme.PERSONA) {
            return (
                <AnimatePresence mode="wait">
                    {!intensity && !prompt ? (
                        <motion.div key="p5-intensity" variants={P5_VARIANTS} initial="initial" animate="animate" exit="exit" className="space-y-4 pt-1">
                            <div className="relative mb-1 transform -skew-x-12 bg-white text-black px-3 py-1 inline-block border-[2px] border-black z-10 shadow-[3px_3px_0_black]">
                                <h2 className="font-p5-display text-lg sm:text-2xl tracking-tighter transform skew-x-12 uppercase italic">Select Source</h2>
                            </div>
                            <div className="flex flex-col gap-1.5 mb-4">
                                <button
                                    onClick={() => setActiveDeckId('default')}
                                    className={`p-2 text-left border-[2px] border-black transition-all transform -skew-x-6 group shadow-[3px_3px_0_black] ${activeDeckId === 'default' ? 'bg-white text-black' : 'bg-black text-white border-white/20 opacity-60'}`}
                                >
                                    <span className="font-p5-display text-lg transform skew-x-6 block italic">★ PHANTOM DEFAULT</span>
                                </button>
                                {customDecks.map((deck) => (
                                    <button
                                        key={deck.id}
                                        onClick={() => setActiveDeckId(deck.id)}
                                        className={`p-2 text-left border-[2px] border-black transition-all transform -skew-x-6 group shadow-[3px_3px_0_black] ${activeDeckId === deck.id ? 'bg-white text-black' : 'bg-black text-white border-white/20 opacity-60'}`}
                                    >
                                        <span className="font-p5-display text-lg transform skew-x-6 block italic">{deck.name.toUpperCase()}</span>
                                    </button>
                                ))}
                            </div>
                            <div className="relative mb-2 transform skew-x-12 bg-[#D80000] text-white px-3 py-1 inline-block border-[2px] border-black z-10 shadow-[3px_3px_0_black]">
                                <h2 className="font-p5-display text-lg sm:text-2xl tracking-tighter transform -skew-x-12 uppercase italic">Select Target</h2>
                            </div>
                            <div className="flex flex-col gap-2">
                                {[
                                    { id: Intensity.SOFT, title: 'SOFT', desc: 'CASUAL_COGNITION' },
                                    { id: Intensity.HOT, title: 'HOT', desc: 'MODELING_TARGET' },
                                    { id: Intensity.VULGAR, title: 'VULGAR', desc: 'TOTAL_EXPOSURE' }
                                ].map((stage, i) => (
                                    <button
                                        key={stage.id}
                                        onClick={() => setIntensity(stage.id)}
                                        className={`p-3 overflow-hidden transform ${i % 2 === 0 ? '-skew-x-6' : 'skew-x-6'} p5-border ${stage.id === Intensity.SOFT ? 'bg-white text-black' : stage.id === Intensity.HOT ? 'bg-[#D80000] text-white' : 'bg-black text-white'} flex justify-between items-center`}
                                    >
                                        <div className={`flex flex-col text-left transform ${i % 2 === 0 ? 'skew-x-6' : '-skew-x-6'}`}>
                                            <span className="font-p5-display text-xl sm:text-3xl leading-none uppercase italic">{stage.title}</span>
                                            <span className="text-[6px] font-black tracking-[0.2em] uppercase opacity-60 mt-0.5">{stage.desc}</span>
                                        </div>
                                        <span className={`font-p5-display text-2xl sm:text-4xl opacity-10 transform ${i % 2 === 0 ? 'skew-x-6' : '-skew-x-6'}`}>0{i + 1}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    ) : !prompt ? (
                        <motion.div key="p5-type" variants={P5_VARIANTS} initial="initial" animate="animate" exit="exit" className="flex flex-col items-center gap-6 pt-4">
                            <div className="text-center">
                                <p className="font-p5-display text-sm text-[#D80000] tracking-widest relative z-10">MISSION_PARAMS</p>
                                <h2 className="font-p5-display text-3xl sm:text-5xl text-white italic tracking-tighter drop-shadow-[3px_3px_0px_#D80000] uppercase">{intensity}</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-3 w-full px-2">
                                <button onClick={() => handleDraw('Truth')} className="bg-white text-black p-3 transform -skew-x-12 p5-border font-p5-display text-xl sm:text-2xl italic text-left">
                                    <span className="transform skew-x-12 block">THE TRUTH</span>
                                </button>
                                <button onClick={() => handleDraw('Dare')} className="bg-[#D80000] text-white p-3 transform skew-x-12 p5-border font-p5-display text-xl sm:text-2xl italic text-right">
                                    <span className="transform -skew-x-12 block">THE ACTION</span>
                                </button>
                                <button onClick={() => setIntensity(null)} className="mt-2 font-black text-white/40 uppercase tracking-[0.4em] text-[7px] hover:text-[#D80000] transition-colors">[ ABORT MISSION ]</button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="p5-prompt" variants={P5_VARIANTS} initial="initial" animate="animate" exit="exit" className="relative mt-1">
                            <div className="bg-white text-black p-4 sm:p-6 border-[3px] border-black shadow-[6px_6px_0px_rgba(216,0,0,1)] relative z-20 overflow-hidden transform -rotate-1">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="bg-[#D80000] text-white px-2 py-0.5 font-p5-display text-base sm:text-xl skew-x-[-15deg] border-[2px] border-black italic uppercase">{prompt.type}</span>
                                    <div className="text-black font-black text-[6px] italic opacity-40 uppercase tracking-widest">ENTRY_{history.length.toString().padStart(3, '0')}</div>
                                </div>
                                <p className="font-p5-display text-lg sm:text-2xl italic leading-tight mb-4 tracking-tight">"{prompt.text}"</p>
                                <div className="mt-3 pt-2 border-t-[2px] border-black border-dashed">
                                    <p className="font-p5-display text-sm text-[#D80000] mb-0.5 italic">PENALTY_LOG</p>
                                    <p className="font-bold text-[8px] uppercase italic opacity-90">{prompt.penalty}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-6 relative z-30 px-1">
                                <button onClick={() => setPrompt(null)} className="bg-white text-black font-p5-display text-lg h-12 transform -skew-x-12 border-[2px] border-black shadow-[3px_3px_0_black]">
                                    <span className="transform skew-x-12 block">DONE</span>
                                </button>
                                <button onClick={() => handleDraw(prompt.type)} className="bg-[#D80000] text-white font-p5-display text-lg h-12 transform skew-x-12 border-[2px] border-black shadow-[3px_3px_0_black]">
                                    <span className="transform -skew-x-12 block">RE-EXEC</span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            );
        }

        // --- FNAF OVERRIDE ---
        if (themeDef.id === Theme.FNAF) {
            return (
                <div className="space-y-6 pt-4 font-mono text-white">
                    {!intensity && !prompt ? (
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold border-b-2 border-white/30 pb-2">SELECT FEED</h2>
                            <div className="flex flex-col gap-2">
                                {[
                                    { id: Intensity.SOFT, title: 'CAM 1A', desc: 'SHOW STAGE' },
                                    { id: Intensity.HOT, title: 'CAM 4B', desc: 'EAST HALL' },
                                    { id: Intensity.VULGAR, title: 'CAM 2B', desc: 'W HALL CORNER' }
                                ].map(stage => (
                                    <button
                                        key={stage.id}
                                        onClick={() => setIntensity(stage.id)}
                                        className="w-full text-left p-4 border border-white/20 bg-black/60 hover:bg-white hover:text-black transition-colors"
                                    >
                                        <h3 className="text-xl font-bold">{stage.title} - {stage.desc}</h3>
                                        <span className="text-[10px] opacity-60">SIGNAL STRENGTH: 98%</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : !prompt ? (
                        <div className="flex flex-col items-center gap-8 py-10">
                            <h2 className="text-2xl font-bold text-center drop-shadow-[0_0_2px_#fff]">MONITOR FEED DETECTED</h2>
                            <div className="grid grid-cols-2 gap-4 w-full">
                                <button onClick={() => handleDraw('Truth')} className="p-6 border-2 border-white bg-black/40 text-2xl font-bold hover:bg-white hover:text-black">TRUTH</button>
                                <button onClick={() => handleDraw('Dare')} className="p-6 border-2 border-[#cc0000] text-[#cc0000] bg-black/40 text-2xl font-bold hover:bg-[#cc0000] hover:text-white">DARE</button>
                            </div>
                            <button onClick={() => setIntensity(null)} className="opacity-40 hover:opacity-100 uppercase tracking-widest text-xs">[ BACK TO SYSTEM ]</button>
                        </div>
                    ) : (
                        <div className="space-y-6 p-4 border-2 border-white/50 bg-black/80">
                            <div className="text-sm opacity-60 border-b border-white/20 pb-2 flex justify-between">
                                <span>&gt; FEED: {prompt.type.toUpperCase()}</span>
                                <span className="text-red-500">LIVE</span>
                            </div>
                            <p className="text-2xl sm:text-3xl leading-snug">"{prompt.text}"</p>
                            <div className="pt-4 border-t border-dashed border-red-500/50">
                                <p className="text-red-500 font-bold mb-1">!! CRITICAL PENALTY !!</p>
                                <p className="text-lg opacity-80">{prompt.penalty}</p>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => setPrompt(null)} className="flex-1 p-4 border-2 border-white font-bold hover:bg-white hover:text-black">DONE</button>
                                <button onClick={() => handleDraw(prompt.type)} className="flex-1 p-4 border-2 border-white/20 font-bold hover:bg-white/10">RESCAN</button>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        // --- DANGANRONPA OVERRIDE ---
        if (themeDef.id === Theme.DANGANRONPA) {
            return (
                <div className="h-full flex flex-col font-['Orbitron']">
                    {!intensity && !prompt ? (
                        <div className="space-y-6 pt-4">
                            <div className="p-4 border-l-4 border-[#00FFFF] bg-black/40">
                                <h2 className="text-[#00FFFF] font-black italic tracking-widest mb-4">▶ SELECT FILE</h2>
                                <button onClick={() => setActiveDeckId('default')} className={`w-full text-left p-2 border-l-2 mb-2 ${activeDeckId === 'default' ? 'border-[#FF00FF] bg-white/10' : 'border-white/20 opacity-60'}`}>
                                    <span className="font-bold tracking-widest text-sm">ULTIMATE ACADEMY</span>
                                </button>
                            </div>
                            <div className="p-4 border-l-4 border-[#FF00FF] bg-black/40">
                                <h2 className="text-[#FF00FF] font-black italic tracking-widest mb-4">▶ DIFFICULTY</h2>
                                {Object.values(Intensity).map(i => (
                                    <button key={i} onClick={() => setIntensity(i)} className="w-full text-left p-3 border border-white/10 mb-2 hover:border-[#FF00FF] hover:bg-[#FF00FF]/10 text-[#FF00FF] font-black italic">
                                        {i === Intensity.SOFT ? 'DAILY LIFE' : i === Intensity.HOT ? 'DEADLY LIFE' : 'CLASS TRIAL'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : !prompt ? (
                        <div className="flex-1 flex flex-col items-center justify-center gap-12">
                            <h2 className="text-[#00FFFF] text-xs font-black tracking-[4px] animate-pulse">MAKE YOUR ARGUMENT</h2>
                            <div className="flex gap-8 items-center">
                                <div className="flex flex-col items-center gap-2">
                                    <button onClick={() => handleDraw('Truth')} className="w-24 h-24 rounded-full border-2 border-[#00FFFF] flex items-center justify-center font-black text-[#00FFFF] text-xs tracking-widest hover:bg-[#00FFFF]/20">TRUTH</button>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <button onClick={() => handleDraw('Dare')} className="w-24 h-24 rounded-full border-2 border-[#FF00FF] flex items-center justify-center font-black text-[#FF00FF] text-xs tracking-widest hover:bg-[#FF00FF]/20">LIE</button>
                                </div>
                            </div>
                            <button onClick={() => setIntensity(null)} className="text-white/30 text-[10px] tracking-widest">[ ABORT TRIAL ]</button>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col justify-center gap-6">
                            <div className="relative text-3xl sm:text-4xl font-black italic text-center p-4">
                                {prompt.text.split(' ').map((word, i) => (
                                    <motion.span key={i} className="inline-block mx-1 text-white" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, delay: i * 0.1, duration: 2 }} style={{ textShadow: '2px 2px 0px #2a0a4a' }}>{word}</motion.span>
                                ))}
                            </div>
                            <div className="p-4 border-l-4 border-[#00FFFF] bg-black/60">
                                <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-1">
                                    <span className="text-[#00FFFF] font-bold text-[10px]">MONOKUMA FILE #{history.length}</span>
                                    <span className="text-[#FF00FF] font-bold text-[10px]">{prompt.type.toUpperCase()}</span>
                                </div>
                                <p className="text-[#FF00FF] text-[10px] font-black uppercase mb-1">PENALTY GAME</p>
                                <p className="text-sm font-mono opacity-80">{prompt.penalty}</p>
                            </div>
                            <div className="flex justify-center gap-4">
                                <button onClick={() => setPrompt(null)} className="px-6 py-2 border border-white text-xs font-bold hover:bg-white hover:text-black">BACK</button>
                                <button onClick={() => handleDraw(prompt.type)} className="px-6 py-2 border border-[#00FFFF] text-[#00FFFF] text-xs font-bold hover:bg-[#00FFFF]/20">RELOAD</button>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        // --- UNDERTALE OVERRIDE ---
        if (themeDef.id === Theme.UNDERTALE) {
            return (
                <div className="h-full flex flex-col font-['DotGothic16'] text-white">
                    {!intensity && !prompt ? (
                        <div className="flex flex-col items-center justify-center flex-1 gap-8">
                            <div className="w-full border-4 border-white p-6 text-2xl mb-4 italic">
                                * Choose your destiny.
                            </div>
                            <div className="flex flex-col gap-4 w-full pl-8">
                                {Object.values(Intensity).map(i => (
                                    <button key={i} onClick={() => setIntensity(i)} className="text-left text-3xl text-gray-400 hover:text-white flex items-center group">
                                        <span className="text-red-500 opacity-0 group-hover:opacity-100 mr-4">♥</span>
                                        * {i === Intensity.SOFT ? 'Easy' : i === Intensity.HOT ? 'Normal' : 'Hard'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : !prompt ? (
                        <div className="flex flex-col items-center justify-center flex-1 gap-8">
                            <div className="w-full border-4 border-white p-6 text-2xl italic">
                                * A fresh prompt appeared.<br />* What will you do?
                            </div>
                            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                                <button onClick={() => handleDraw('Truth')} className="text-left text-3xl group flex items-center">
                                    <span className="text-red-500 opacity-0 group-hover:opacity-100 mr-4">♥</span>
                                    * Truth
                                </button>
                                <button onClick={() => handleDraw('Dare')} className="text-left text-3xl group flex items-center">
                                    <span className="text-red-500 opacity-0 group-hover:opacity-100 mr-4">♥</span>
                                    * Dare
                                </button>
                                <button onClick={() => setIntensity(null)} className="text-left text-3xl group flex items-center col-span-2 text-gray-500 hover:text-white mt-4">
                                    <span className="text-red-500 opacity-0 group-hover:opacity-100 mr-4">♥</span>
                                    * Spare (Back)
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col justify-between">
                            <div className="border-4 border-white p-8 flex-1 flex flex-col">
                                <h3 className="text-2xl text-gray-400 mb-4 uppercase">* {prompt.type}</h3>
                                <p className="text-4xl leading-snug flex-1">* {prompt.text}</p>
                                <div className="mt-6 pt-4 border-t-4 border-dashed border-gray-700">
                                    <span className="text-red-500 text-lg">* PENALTY:</span>
                                    <p className="text-2xl text-gray-300">* {prompt.penalty}</p>
                                </div>
                            </div>
                            <div className="flex justify-around py-8">
                                <button onClick={() => setPrompt(null)} className="text-2xl border-b-4 border-white pb-1 hover:text-red-500">DONE</button>
                                <button onClick={() => handleDraw(prompt.type)} className="text-2xl text-gray-500 hover:text-white pb-1">REROLL</button>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        // --- VOCALOID OVERRIDE ---
        if (themeDef.id === Theme.VOCALOID) {
            return (
                <div className="h-full font-['Orbitron'] text-[#39C5BB]">
                    {!intensity && !prompt ? (
                        <div className="space-y-6 pt-4">
                            <h2 className="text-2xl text-center font-black text-white drop-shadow-[0_0_5px_rgba(57,197,187,0.8)]">SELECT TEMPO</h2>
                            <div className="space-y-4">
                                {Object.values(Intensity).map(i => (
                                    <button key={i} onClick={() => setIntensity(i)} className="w-full text-left p-4 rounded-lg border-l-4 border-[#39C5BB] bg-[#1a1a1a] hover:bg-[#39C5BB] hover:text-[#111] transition-all font-bold">
                                        TRACK_0{i === Intensity.SOFT ? '1' : i === Intensity.HOT ? '2' : '3'} - {i}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : !prompt ? (
                        <div className="flex flex-col items-center justify-center flex-1 gap-12 py-10">
                            <h2 className="text-3xl font-black text-white drop-shadow-[0_0_5px_#39C5BB]">CHOOSE TRACK</h2>
                            <div className="grid grid-cols-2 gap-4 w-full">
                                <button onClick={() => handleDraw('Truth')} className="p-8 border-2 border-[#39C5BB] rounded-xl text-center font-bold hover:bg-[#39C5BB]/20">🎤 TRUTH</button>
                                <button onClick={() => handleDraw('Dare')} className="p-8 border-2 border-[#FF1493] text-[#FF1493] rounded-xl text-center font-bold hover:bg-[#FF1493]/20">🎸 DARE</button>
                            </div>
                            <button onClick={() => setIntensity(null)} className="text-white/40 hover:text-white uppercase tracking-widest text-[10px]">[ RESET STAGE ]</button>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col justify-between pt-4">
                            <div className={`p-6 rounded-2xl bg-[#1a1a1a] border-y-4 ${prompt.type === 'Truth' ? 'border-[#39C5BB]' : 'border-[#FF1493]'}`}>
                                <h4 className="text-center font-bold opacity-60 text-xs mb-4">NOW PLAYING: {prompt.type.toUpperCase()}</h4>
                                <p className="text-2xl text-center text-white font-bold mb-8">"{prompt.text}"</p>
                                <div className="text-center border-t border-white/10 pt-4">
                                    <span className="text-[#FF1493] text-[10px] font-black italic tracking-widest">PENALTY_ZONE</span>
                                    <p className="text-sm italic text-gray-300 mt-1">{prompt.penalty}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 py-8">
                                <button onClick={() => setPrompt(null)} className="flex-1 p-4 bg-[#39C5BB] text-[#111] font-bold rounded-xl shadow-lg">DONE</button>
                                <button onClick={() => handleDraw(prompt.type)} className="flex-1 p-4 bg-white/10 text-white font-bold rounded-xl">NEXT</button>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        // --- FALLOUT OVERRIDE ---
        if (themeDef.id === Theme.FALLOUT) {
            return (
                <div className="h-full flex flex-col font-mono text-[#21ed43]">
                    {!intensity && !prompt ? (
                        <div className="flex flex-col h-full space-y-4">
                            <h2 className="text-2xl mb-4 border-b-2 border-[#21ed43] pb-1">&gt; SELECT RADIATION LEVEL</h2>
                            <div className="space-y-4">
                                {[
                                    { id: Intensity.SOFT, title: '> LOCAL_THREAT', desc: 'RAD LEVEL: NOMINAL' },
                                    { id: Intensity.HOT, title: '> REGIONAL_RISK', desc: 'RAD LEVEL: ELEVATED' },
                                    { id: Intensity.VULGAR, title: '> GLOBAL_CRISIS', desc: 'RAD LEVEL: LETHAL' }
                                ].map((stage) => (
                                    <button
                                        key={stage.id}
                                        onClick={() => setIntensity(stage.id)}
                                        className="w-full text-left p-4 border-2 border-[#21ed43] bg-[#0a1e0a]/80 hover:bg-[#21ed43] hover:text-black transition-colors group relative"
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-xl font-bold">{stage.title}</span>
                                            <span className="text-xs opacity-60 group-hover:text-black">{stage.desc}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : !prompt ? (
                        <div className="flex flex-col h-full">
                            <div className="border-2 border-[#21ed43] p-4 mb-8 text-lg bg-[#0a1e0a]/80">
                                &gt; WAITING FOR INPUT...<br />
                                &gt; SELECT DIRECTORY:
                            </div>
                            <div className="space-y-4 w-full">
                                <button onClick={() => handleDraw('Truth')} className="w-full text-left p-4 text-2xl border border-[#21ed43] hover:bg-[#21ed43] hover:text-black transition-colors">[ TRUTH.exe ]</button>
                                <button onClick={() => handleDraw('Dare')} className="w-full text-left p-4 text-2xl border border-[#21ed43] hover:bg-[#21ed43] hover:text-black transition-colors">[ DARE.bat ]</button>
                                <button onClick={() => setIntensity(null)} className="w-full text-center p-3 text-lg opacity-40 hover:opacity-100 hover:text-[#21ed43]">[ CANCEL_BOOT ]</button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col justify-between">
                            <div className="text-lg opacity-60 mb-2">&gt; EXECUTING: {prompt.type.toUpperCase()}</div>
                            <div className="flex-1 border-2 border-[#21ed43] p-6 mb-8 bg-[#0a1e0a]/90 flex flex-col justify-center relative">
                                <p className="text-2xl leading-relaxed">{prompt.text}</p>
                                <div className="mt-8 pt-4 border-t-2 border-dashed border-[#21ed43]/40">
                                    <div className="text-sm text-[#21ed43]/60">&gt; FAILURE_PROTOCOL:</div>
                                    <p className="text-xl mt-2">{prompt.penalty}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 pb-4">
                                <button onClick={() => setPrompt(null)} className="flex-1 text-xl py-3 border-2 border-[#21ed43] bg-[#21ed43]/20 hover:bg-[#21ed43] hover:text-black transition-colors font-bold">[ DONE ]</button>
                                <button onClick={() => handleDraw(prompt.type)} className="flex-1 text-xl py-3 border border-[#21ed43]/50 hover:bg-[#21ed43]/10 transition-colors">[ REROLL ]</button>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        // --- ANIMAL CROSSING OVERRIDE ---
        if (themeDef.id === Theme.ANIMAL_CROSSING) {
            return (
                <div className="h-full flex flex-col font-['Varela_Round'] text-[#5D4037]">
                    {!intensity && !prompt ? (
                        <div className="space-y-6">
                            <div className="bg-[#FFF9C4] p-5 rounded-[25px] border-4 border-white shadow-sm relative overflow-hidden">
                                <div className="absolute -top-4 -right-4 text-6xl opacity-10 rotate-12">🍃</div>
                                <h2 className="text-lg font-bold mb-3 text-[#795548]">Island Tasks</h2>
                                <button onClick={() => setActiveDeckId('default')} className={`w-full p-3 rounded-2xl flex items-center gap-3 mb-2 border-2 transition-all ${activeDeckId === 'default' ? 'bg-white border-[#81D4FA] shadow-md' : 'bg-white/50 border-transparent'}`}>
                                    <span className="text-2xl">⛺</span>
                                    <div className="text-left"><p className="font-bold text-sm">Main Island</p></div>
                                </button>
                                {customDecks.map(deck => (
                                    <button key={deck.id} onClick={() => setActiveDeckId(deck.id)} className={`w-full p-3 rounded-2xl flex items-center gap-3 mb-2 border-2 transition-all ${activeDeckId === deck.id ? 'bg-white border-[#81D4FA] shadow-md' : 'bg-white/50 border-transparent'}`}>
                                        <span className="text-2xl">📦</span>
                                        <div className="text-left"><p className="font-bold text-sm">{deck.name}</p></div>
                                    </button>
                                ))}
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                {[
                                    { id: Intensity.SOFT, title: 'DAILY TASK', color: '#88E0EF', icon: '✈️' },
                                    { id: Intensity.HOT, title: 'BIG CATCH', color: '#F9D56E', icon: '🎣' },
                                    { id: Intensity.VULGAR, title: 'WASP NEST', color: '#FF8A80', icon: '🐝' }
                                ].map(stage => (
                                    <button key={stage.id} onClick={() => setIntensity(stage.id)} className="p-4 rounded-[20px] flex items-center justify-between border-4 border-white shadow-sm hover:scale-102 transition-transform" style={{ backgroundColor: stage.color }}>
                                        <div className="flex items-center gap-3 text-white">
                                            <div className="w-10 h-10 bg-white/40 rounded-full flex items-center justify-center text-xl shadow-inner">{stage.icon}</div>
                                            <span className="font-black tracking-tight">{stage.title}</span>
                                        </div>
                                        <span className="text-white opacity-50 font-bold">▶</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : !prompt ? (
                        <div className="flex flex-col items-center justify-center flex-1 py-4">
                            <div className="bg-[#E0F7FA] border-4 border-white p-6 rounded-[30px] shadow-sm relative mb-8 w-full text-center">
                                <p className="text-xs font-bold text-[#00BCD4] mb-1">TOM NOOK SAYS:</p>
                                <p className="text-lg font-bold">"Ready for a new adventure, yes, yes!"</p>
                                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 border-8 border-[#E0F7FA] border-x-transparent border-b-transparent"></div>
                            </div>
                            <div className="w-24 h-24 bg-white rounded-full border-4 border-[#81D4FA] flex items-center justify-center mb-8 shadow-md animate-bounce">
                                <span className="text-5xl">{intensity === Intensity.SOFT ? '✈️' : intensity === Intensity.HOT ? '🎣' : '🐝'}</span>
                            </div>
                            <div className="flex gap-4 w-full">
                                <button onClick={() => handleDraw('Truth')} className="flex-1 bg-[#4DD0E1] text-white p-4 rounded-full font-bold border-4 border-white shadow-sm active:translate-y-1">TRUTH</button>
                                <button onClick={() => handleDraw('Dare')} className="flex-1 bg-[#FF7043] text-white p-4 rounded-full font-bold border-4 border-white shadow-sm active:translate-y-1">DARE</button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col justify-center">
                            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-[#FFF9C4] p-6 rounded-[30px] border-4 border-white shadow-md relative">
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 rounded-full border-2 border-[#FFF9C4] text-[10px] font-black text-[#FBC02D]">
                                    {prompt.type.toUpperCase()}
                                </div>
                                <div className="text-center space-y-4 pt-2">
                                    <p className="text-2xl font-black leading-tight italic">"{prompt.text}"</p>
                                    <div className="bg-[#FFEBEE] p-3 rounded-2xl border-2 border-white">
                                        <p className="text-[10px] font-black text-[#E57373] uppercase mb-0.5">Penalty</p>
                                        <p className="text-sm font-bold text-[#C62828] leading-tight">{prompt.penalty}</p>
                                    </div>
                                </div>
                            </motion.div>
                            <div className="flex gap-3 mt-6">
                                <button onClick={() => setPrompt(null)} className="flex-1 bg-[#AED581] text-white p-4 rounded-full font-bold border-4 border-white shadow-sm">DONE!</button>
                                <button onClick={() => handleDraw(prompt.type)} className="flex-1 bg-[#4DB6AC] text-white p-4 rounded-full font-bold border-4 border-white shadow-sm">NEXT!</button>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        // --- DEFAULT FALLBACK ---
        return (
            <>
                {!intensity && !prompt ? (
                    themeDef.IntensitySelector ? <themeDef.IntensitySelector logic={logic} /> : <DefaultIntensitySelector />
                ) : !prompt ? (
                    gameMode === GameMode.NEVER_HAVE_I_EVER ? null : (
                        themeDef.PromptTypeSelector ? <themeDef.PromptTypeSelector logic={logic} /> : <DefaultPromptTypeSelector />
                    )
                ) : (
                    themeDef.PromptLayout && themeDef.PlayButton ? (
                        <themeDef.PromptLayout logic={logic}>
                            {gameMode === GameMode.NEVER_HAVE_I_EVER ? (
                                <>
                                    <themeDef.PlayButton label="DONE" onClick={() => { setIntensity(null); setPrompt(null); }} isPrimary={true} />
                                    <themeDef.PlayButton label="NEXT" onClick={() => handleDraw('NeverHaveIEver')} isPrimary={false} />
                                </>
                            ) : (
                                <>
                                    <themeDef.PlayButton label="DONE" onClick={() => setPrompt(null)} isPrimary={true} />
                                    <themeDef.PlayButton label="REROLL" onClick={() => handleDraw(prompt!.type)} isPrimary={false} />
                                </>
                            )}
                        </themeDef.PromptLayout>
                    ) : themeDef.PromptDisplay ? (
                        <themeDef.PromptDisplay logic={logic} />
                    ) : (
                        <DefaultPromptDisplay />
                    )
                )}
            </>
        );
    };

    return (
        <AnimatePresence mode="wait">
            {activeTab === 'play' && (
                <motion.div
                    key="play"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="h-full"
                >
                    <PlayTabContent />
                </motion.div>
            )}

            {activeTab === 'decks' && (
                <motion.div
                    key="decks"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`pt-4 space-y-6 pb-32 ${themeDef.id === Theme.PERSONA ? 'transform -rotate-1' : ''}`}
                >
                    {editingDeck ? (
                        <div className={`theme-panel p-6 space-y-6 ${themeDef.id === Theme.FALLOUT ? 'font-mono' : ''}`}>
                            <div className="space-y-4">
                                <label className="theme-text-header text-[10px] block opacity-60">{themeDef.id === Theme.FALLOUT ? '> DATABASE NAME' : 'DECK TITLE'}</label>
                                <input
                                    className={`w-full bg-transparent border-b-2 font-bold text-2xl focus:outline-none focus:border-[var(--theme-accent)] py-2 ${themeDef.id === Theme.PERSONA ? '-skew-x-6 px-4' : ''} ${themeDef.id === Theme.FALLOUT ? 'border-[#21ed43]/30 text-[#21ed43]' : 'border-black/20'}`}
                                    value={editingDeck.name}
                                    onChange={(e) => setEditingDeck({ ...editingDeck, name: e.target.value })}
                                    placeholder={themeDef.id === Theme.FALLOUT ? 'ENTER RECORD ID...' : 'DECK NAME...'}
                                />
                                <label className="theme-text-header text-[10px] block opacity-60">{themeDef.id === Theme.FALLOUT ? '> DESCRIPTION' : 'DESCRIPTION'}</label>
                                <textarea
                                    className={`w-full p-3 text-xs focus:outline-none border-2 border-transparent focus:border-[var(--theme-accent)] h-20 ${themeDef.id === Theme.FALLOUT ? 'bg-[#0a1e0a] text-[#21ed43] border-[#21ed43]/20' : 'bg-black/5'}`}
                                    value={editingDeck.description}
                                    onChange={(e) => setEditingDeck({ ...editingDeck, description: e.target.value })}
                                    placeholder="WHAT IS THIS DECK'S PURPOSE?"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="theme-text-header text-xl">{themeDef.id === Theme.FALLOUT ? `> RECORDS (${editingDeck.prompts.length})` : `PROMPTS (${editingDeck.prompts.length})`}</h3>
                                    <button onClick={addNewPromptToEditingDeck} className="theme-button px-3 py-1 text-xs">{themeDef.id === Theme.FALLOUT ? '[ ADD ]' : '+ ADD'}</button>
                                </div>
                                <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                    {editingDeck.prompts.map((p) => (
                                        <div key={p.id} className={`p-3 border-l-4 border-[var(--theme-accent)] space-y-2 ${themeDef.id === Theme.FALLOUT ? 'bg-[#0a1e0a] border-[#21ed43]' : 'bg-black/5'}`}>
                                            <div className="flex gap-2">
                                                <select
                                                    className="bg-black text-white text-[10px] p-1 uppercase"
                                                    value={p.type}
                                                    onChange={(e) => updatePromptInEditingDeck(p.id, 'type', e.target.value as any)}
                                                >
                                                    <option value="Truth">Truth</option>
                                                    <option value="Dare">Dare</option>
                                                    <option value="NeverHaveIEver">Never</option>
                                                </select>
                                                <div className="flex-1" />
                                                <button onClick={() => removePromptFromEditingDeck(p.id)} className="text-red-500 font-bold text-[10px]">REMOVE</button>
                                            </div>
                                            <textarea
                                                className={`w-full p-2 text-xs focus:outline-none ${themeDef.id === Theme.FALLOUT ? 'bg-black text-[#21ed43] border border-[#21ed43]/20' : 'bg-white/10'}`}
                                                value={p.text}
                                                onChange={(e) => updatePromptInEditingDeck(p.id, 'text', e.target.value)}
                                                placeholder="PROMPT TEXT..."
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-black/10">
                                <button
                                    onClick={() => saveDeck(editingDeck)}
                                    className="flex-1 theme-button py-3 font-bold"
                                >
                                    {themeDef.id === Theme.FALLOUT ? '[ COMMIT ]' : 'SAVE ARCHIVE'}
                                </button>
                                <button
                                    onClick={() => setEditingDeck(null)}
                                    className="flex-1 theme-button theme-button-alt py-3 font-bold opacity-60"
                                >
                                    {themeDef.id === Theme.FALLOUT ? '[ ABORT ]' : 'CANCEL'}
                                </button>
                            </div>
                        </div>
                    ) : themeDef.DecksScreen ? (
                        <themeDef.DecksScreen logic={logic} />
                    ) : (
                        <>
                            <div className="flex justify-between items-end mb-6">
                                <h2 className="theme-text-header text-4xl font-bold italic">{themeDef.id === Theme.FALLOUT ? '> INVENTORY' : 'DECKS'}</h2>
                                <button
                                    onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })}
                                    className="theme-button px-4 py-1 text-sm italic"
                                >
                                    {themeDef.id === Theme.FALLOUT ? '[ ADD ENTRY ]' : '+ NEW'}
                                </button>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {customDecks.length === 0 ? (
                                    <div className="py-20 text-center opacity-20 italic">{themeDef.id === Theme.FALLOUT ? '> NO HOLOTAPES DETECTED' : 'No custom decks forged yet.'}</div>
                                ) : (
                                    customDecks.map(deck => (
                                        <div key={deck.id} className={`theme-panel p-4 flex justify-between items-center group ${themeDef.id === Theme.FALLOUT ? 'font-mono text-[#21ed43]' : ''}`}>
                                            <div>
                                                <h3 className="theme-text-header text-xl group-hover:text-[var(--theme-accent)] transition-colors">{deck.name || 'UNTITLED'}</h3>
                                                <p className="text-[10px] opacity-60 uppercase tracking-widest">{deck.prompts.length} ITEMS</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => setEditingDeck(deck)} className="theme-button px-3 py-1 text-[10px]">{themeDef.id === Theme.FALLOUT ? '[ EDIT ]' : 'EDIT'}</button>
                                                <button onClick={() => deleteDeck(deck.id)} className="theme-button theme-button-alt px-3 py-1 text-[10px]">{themeDef.id === Theme.FALLOUT ? '[ DEL ]' : 'DEL'}</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </motion.div>
            )}

            {activeTab === 'history' && (
                <motion.div
                    key="history"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pt-4 space-y-6 pb-20"
                >
                    {themeDef.HistoryScreen ? (
                        <themeDef.HistoryScreen logic={logic} />
                    ) : (
                        <>
                            <h2 className="theme-text-header text-4xl font-bold italic">{themeDef.id === Theme.FALLOUT ? '> DATA LOG' : 'ARCHIVES'}</h2>
                            <div className="flex flex-col gap-3">
                                {history.length === 0 ? (
                                    <div className="py-20 text-center opacity-20 italic">No history yet.</div>
                                ) : (
                                    history.map((item, i) => (
                                        <div key={i} className={`theme-panel p-4 flex gap-4 items-start ${themeDef.id === Theme.FALLOUT ? 'font-mono text-[#21ed43]' : ''}`}>
                                            <div className={`w-10 h-10 theme-badge shrink-0 flex items-center justify-center text-lg ${themeDef.id === Theme.PERSONA ? 'transform rotate-12' : ''}`}>
                                                {item.type === 'Truth' ? '?' : '!'}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="theme-text-header text-[10px] text-[var(--theme-accent)]">{themeDef.id === Theme.FALLOUT ? `MSG ID: ${history.length - i}` : `ENTRY #${history.length - i}`}</span>
                                                    <span className="text-[10px] opacity-40 uppercase">{item.intensity}</span>
                                                </div>
                                                <p className="italic font-bold leading-tight">"{item.text}"</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </motion.div>
            )}

            {activeTab === 'settings' && (
                <motion.div
                    key="settings"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pt-4 space-y-6 pb-20"
                >
                    {themeDef.SettingsScreen ? (
                        <themeDef.SettingsScreen logic={logic} />
                    ) : (
                        <>
                            <h2 className="theme-text-header text-4xl font-bold italic">{themeDef.id === Theme.FALLOUT ? '> RADIO / SETTINGS' : 'SETTINGS'}</h2>
                            <div className={`theme-panel p-6 space-y-6 ${themeDef.id === Theme.FALLOUT ? 'font-mono' : ''}`}>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="theme-text-header">{themeDef.id === Theme.FALLOUT ? '> COGNITION' : 'COGNITION'}</span>
                                        <span className="font-bold text-[var(--theme-accent)]">STABLE</span>
                                    </div>
                                    <div className="flex justify-between items-center opacity-40">
                                        <span className="theme-text-header">{themeDef.id === Theme.FALLOUT ? '> SYNC_RATE' : 'SYNC_RATE'}</span>
                                        <span className="font-mono">99.8%</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => logic.setView('menu')}
                                    className="w-full theme-button theme-button-alt p-4 font-bold"
                                >
                                    {themeDef.id === Theme.FALLOUT ? '[ SHUTDOWN SYSTEM ]' : 'RETURN TO TITLE'}
                                </button>
                            </div>
                        </>
                    )}
                </motion.div>
            )}

            {activeTab === 'themes' && (
                <motion.div
                    key="themes"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pt-4 space-y-6 pb-20"
                >
                    {themeDef.ThemesScreen ? (
                        <themeDef.ThemesScreen logic={logic} />
                    ) : null}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default UnifiedGame;
