import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme, ThemeDefinition, GameMode } from '../types';
import { allThemesList } from './allThemesList';
import { DeckCarousel } from '../components/DeckCarousel';
import { DeckSearchModal } from '../components/DeckSearchModal';

const EGG_WHITE = '#FDFAF4';
const HERO_BLUE = '#1873CA';
const HERO_RED = '#E81E3B';
const HERO_YELLOW = '#F3C910';
const SPOT_BLUE = '#2B93E6';

const STAGES = [
    { id: Intensity.SOFT, title: 'MORNING SUN', desc: 'BREEZY', color: HERO_YELLOW, bg: HERO_BLUE, icon: '☀️' },
    { id: Intensity.HOT, title: 'CRACKED EGG', desc: 'SCRAMBLED', color: EGG_WHITE, bg: HERO_RED, icon: '🍳' },
    { id: Intensity.VULGAR, title: 'CROWING ROOSTER', desc: 'WAKEY WAKEY', color: HERO_YELLOW, bg: '#000000', icon: '🐓' },
];

export const BillyLayout: React.FC<{ children: React.ReactNode; activeTab: string; setActiveTab: (tab: string) => void; logic: any }> = ({ children, activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'play', label: 'HATCH', icon: '🥚' },
        { id: 'decks', label: 'NEST', icon: '🧺' },
        { id: 'history', label: 'FLOCK', icon: '🐥' },
        { id: 'themes', label: 'WORLDS', icon: '🌍' },
        { id: 'settings', label: 'PAUSE', icon: '⏸️' },
    ];

    return (
        <div className="billy-theme h-[100dvh] w-screen flex flex-col bg-[#FDFAF4] text-[#222222] overflow-hidden font-['Fredoka_One'] relative">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
                .billy-theme { 
                    font-family: 'Fredoka One', cursive;
                }
                .billy-egg-bg {
                    background-color: #FDFAF4;
                    background-image: 
                        radial-gradient(circle at 15% 25%, ${SPOT_BLUE} 0%, ${SPOT_BLUE} 8%, transparent 8.5%),
                        radial-gradient(circle at 85% 75%, ${SPOT_BLUE} 0%, ${SPOT_BLUE} 10%, transparent 10.5%),
                        radial-gradient(circle at 75% 20%, ${SPOT_BLUE} 0%, ${SPOT_BLUE} 6%, transparent 6.5%),
                        radial-gradient(circle at 25% 85%, ${SPOT_BLUE} 0%, ${SPOT_BLUE} 7%, transparent 7.5%),
                        radial-gradient(circle at 50% 50%, ${SPOT_BLUE} 0%, ${SPOT_BLUE} 12%, transparent 12.5%),
                        radial-gradient(circle at 10% 60%, ${HERO_YELLOW} 0%, ${HERO_YELLOW} 4%, transparent 4.5%),
                        radial-gradient(circle at 90% 40%, ${HERO_YELLOW} 0%, ${HERO_YELLOW} 5%, transparent 5.5%),
                        radial-gradient(circle at 40% 15%, ${HERO_YELLOW} 0%, ${HERO_YELLOW} 3%, transparent 3.5%),
                        radial-gradient(circle at 60% 85%, ${HERO_YELLOW} 0%, ${HERO_YELLOW} 4%, transparent 4.5%);
                    background-size: 300px 300px;
                }
                .billy-panel { 
                    background: #ffffff; 
                    border: 8px solid ${HERO_BLUE}; 
                    border-radius: 32px; 
                    padding: 24px;
                    box-shadow: 0 12px 0 ${HERO_BLUE}55, inset 0 0 0 4px #eef6ff;
                    position: relative;
                }
                .billy-btn { 
                    background: ${EGG_WHITE}; 
                    border: 6px solid ${HERO_BLUE}; 
                    border-radius: 9999px; 
                    padding: 16px 24px; 
                    cursor: pointer; 
                    position: relative; 
                    text-align: center; 
                    box-shadow: 0 8px 0 ${HERO_BLUE}44; 
                    color: ${HERO_BLUE};
                    text-transform: uppercase;
                    transition: transform 0.1s, box-shadow 0.1s; 
                    font-size: 1.25rem;
                }
                .billy-btn-red {
                    background: ${HERO_RED};
                    border-color: ${HERO_RED};
                    color: white;
                    box-shadow: 0 8px 0 #b3001b;
                }
                .billy-btn-red:active { 
                    box-shadow: 0 0px 0 #b3001b; 
                }
                .billy-btn-yellow {
                    background: ${HERO_YELLOW};
                    border-color: ${HERO_YELLOW};
                    color: ${HERO_BLUE};
                    box-shadow: 0 8px 0 #ccaa00;
                }
                .billy-btn-yellow:active { 
                    box-shadow: 0 0px 0 #ccaa00; 
                }
                .billy-btn:active { 
                    transform: translateY(8px); 
                    box-shadow: 0 0px 0 ${HERO_BLUE}44; 
                }
                .billy-btn.active { 
                    background: ${HERO_BLUE}; 
                    color: white;
                    border-color: ${HERO_BLUE}; 
                }
                .crest-header {
                    background: ${EGG_WHITE};
                    position: relative;
                }
                .crest-stripe {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 8px;
                    background: ${HERO_RED};
                }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .text-stroke-blue {
                    -webkit-text-stroke: 6px ${HERO_BLUE};
                    paint-order: stroke fill;
                }
                .text-stroke-white {
                    -webkit-text-stroke: 4px white;
                    paint-order: stroke fill;
                }
            `}</style>

            <div className="absolute inset-0 z-0 billy-egg-bg opacity-40"></div>

            <header className="p-4 shrink-0 relative z-20 crest-header shadow-md flex justify-between items-center h-20">
                <div className="crest-stripe"></div>
                <div className="flex items-center gap-4 relative z-10 w-full justify-center">
                    <span className="text-3xl tracking-widest text-white text-stroke-blue !text-[${HERO_YELLOW}] uppercase drop-shadow-[2px_4px_0_1873CA]">MORNING LAND</span>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto px-4 pb-28 relative z-10 no-scrollbar">
                <div className="max-w-md mx-auto h-full pt-8">{children}</div>
            </main>

            <nav className="fixed bottom-0 left-0 w-full h-[90px] z-50 bg-[${HERO_BLUE}] border-t-[8px] border-[#0e58a0] pb-safe" style={{ backgroundColor: HERO_BLUE }}>
                <div className="flex justify-around items-end h-full px-2 pb-3">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 flex flex-col items-center justify-center transition-all duration-300 ${isActive ? '-translate-y-6 scale-125' : 'hover:scale-110'}`}
                            >
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl border-[4px] ${isActive ? 'bg-[${HERO_RED}] border-white text-white shadow-[0_6px_0_#b3001b]' : 'bg-[${EGG_WHITE}] border-transparent text-[${HERO_BLUE}] shadow-[0_4px_0_rgba(0,0,0,0.2)]'}`} style={{ backgroundColor: isActive ? HERO_RED : EGG_WHITE, borderColor: isActive ? 'white' : 'transparent' }}>
                                    {tab.icon}
                                </div>
                                {isActive && <span className="absolute -bottom-5 text-[10px] sm:text-xs font-bold text-white uppercase text-stroke-white !text-[${HERO_BLUE}]" style={{ color: HERO_BLUE }}>{tab.label}</span>}
                            </button>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
};

export const BillyPlayScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { intensity, setIntensity, prompt, setPrompt, history, activeDeckId, setActiveDeckId, customDecks, handleDraw, setGameMode, gameMode } = logic;
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    return (
        <AnimatePresence mode="wait">
            {!intensity && !prompt ? (
                <motion.div key="play" initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 1.1 }} className="space-y-8 pb-10">

                    <div className="billy-panel" style={{ borderColor: HERO_RED, boxShadow: `0 12px 0 ${HERO_RED}55, inset 0 0 0 4px #fff1f1` }}>
                        <h2 className="text-2xl text-[${HERO_RED}] text-stroke-white !text-white drop-shadow-[0_2px_0_${HERO_RED}] mb-6 border-b-4 border-[#fff1f1] pb-4" style={{ color: 'white', WebkitTextStroke: `4px ${HERO_RED}` }}>HATCH DIFFICULTY</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {STAGES.map((stage) => (
                                <button
                                    key={stage.id}
                                    onClick={() => setIntensity(stage.id)}
                                    className="billy-btn flex items-center justify-between !py-4 !px-4"
                                    style={{ background: stage.bg, borderColor: stage.color, color: stage.color, boxShadow: `0 8px 0 ${stage.color}55` }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full flex items-center justify-center text-3xl text-white bg-white/20">{stage.icon}</div>
                                        <div className="text-left mt-1">
                                            <div className="text-2xl text-white tracking-wide" style={{ WebkitTextStroke: `2px ${stage.color === '#ffffff' ? HERO_RED : stage.bg}` }}>{stage.title}</div>
                                            <div className="text-sm opacity-90">{stage.desc}</div>
                                        </div>
                                    </div>
                                    <div className="text-3xl opacity-50 text-white">▶</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ) : !prompt ? (
                <div className="flex flex-col items-center justify-center h-[60vh]">
                    <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="billy-panel w-full text-center space-y-8 !pt-16 relative mt-10">
                        <div className="absolute -top-20 left-1/2 -translate-x-1/2">
                            <div className="w-40 h-40 bg-[${EGG_WHITE}] rounded-[100px_100px_60px_60px] border-[10px] border-[${HERO_BLUE}] flex items-center justify-center shadow-xl relative overflow-hidden animate-[bounce_1s_infinite]" style={{ backgroundColor: EGG_WHITE, borderColor: HERO_BLUE }}>
                                <div className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-[${SPOT_BLUE}]" style={{ backgroundColor: SPOT_BLUE }}></div>
                                <div className="absolute bottom-1/4 right-1/4 w-12 h-12 rounded-full bg-[${SPOT_BLUE}]" style={{ backgroundColor: SPOT_BLUE }}></div>
                                <div className="absolute top-1/2 right-1/4 w-6 h-6 rounded-full bg-[${HERO_YELLOW}]" style={{ backgroundColor: HERO_YELLOW }}></div>
                                <span className="text-6xl absolute z-10 drop-shadow-md">{intensity === Intensity.SOFT ? '☀️' : intensity === Intensity.HOT ? '🍳' : '🐓'}</span>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-4xl text-[${HERO_RED}] uppercase mb-2 font-black" style={{ color: HERO_RED }}>AN EGG APPEARS!</h2>
                            <div className="flex justify-between items-center px-4 mb-2">
                                <div className="text-xl text-[${HERO_BLUE}] font-bold uppercase" style={{ color: HERO_BLUE }}>Level: {intensity}</div>
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    className="w-10 h-10 bg-white border-4 border-[${HERO_BLUE}] rounded-full flex items-center justify-center text-xl shadow-sm hover:bg-[${EGG_WHITE}] transition-colors"
                                    style={{ borderColor: HERO_BLUE }}
                                >
                                    🔍
                                </button>
                            </div>
                        </div>

                        <div className="w-full">
                            <DeckCarousel
                                decks={customDecks.filter(d => d.intensity === intensity)}
                                activeDeckId={activeDeckId}
                                onSelect={(id) => {
                                    const deck = customDecks.find(d => d.id === id);
                                    if (deck) setGameMode(deck.gameMode);
                                    setActiveDeckId(id);
                                }}
                                accentColor={HERO_BLUE}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 px-2 pt-4 w-full">
                            {gameMode === GameMode.NEVER_HAVE_I_EVER ? (
                                <button onClick={() => handleDraw('NeverHaveIEver')} className="billy-btn billy-btn-red !text-2xl !py-6">HATCH NHIE</button>
                            ) : (
                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <button onClick={() => handleDraw('Truth')} className="billy-btn billy-btn-red !text-2xl !py-6">TRUTH</button>
                                    <button onClick={() => handleDraw('Dare')} className="billy-btn billy-btn-yellow !text-2xl !py-6">DARE</button>
                                </div>
                            )}
                        </div>

                        <DeckSearchModal
                            isOpen={isSearchOpen}
                            onClose={() => setIsSearchOpen(false)}
                            decks={customDecks}
                            activeDeckId={activeDeckId}
                            onSelect={(id) => {
                                const deck = customDecks.find(d => d.id === id);
                                if (deck) {
                                    setGameMode(deck.gameMode);
                                    setIntensity(deck.intensity);
                                }
                                setActiveDeckId(id);
                            }}
                            gameMode={gameMode}
                            intensity={intensity}
                        />
                        <div className="pt-4">
                            <button onClick={() => setIntensity(null)} className="text-[${HERO_BLUE}] hover:text-[${HERO_RED}] transition-colors uppercase text-sm font-bold border-b-2 border-dotted pb-1" style={{ color: HERO_BLUE, borderColor: HERO_BLUE }}>RUN AWAY</button>
                        </div>
                    </motion.div>
                </div>
            ) : (
                <motion.div initial={{ scale: 0.5, opacity: 0, rotate: 5 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} className="billy-panel mt-16 text-center !pt-16 relative">
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2">
                        <div className={`w-32 h-32 rounded-full flex items-center justify-center text-6xl border-[8px] ${prompt.type === 'Truth' ? 'bg-[${HERO_BLUE}] border-[${HERO_YELLOW}]' : 'bg-[${HERO_RED}] border-white'} shadow-[0_8px_0_rgba(0,0,0,0.2)]`} style={{ backgroundColor: prompt.type === 'Truth' ? HERO_BLUE : HERO_RED, borderColor: prompt.type === 'Truth' ? HERO_YELLOW : 'white' }}>
                            {prompt.type === 'Truth' ? '🗯️' : '⚡'}
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className={`inline-block px-8 py-2 rounded-full text-white text-xl mb-6 border-[4px] border-white shadow-sm font-black tracking-wider ${prompt.type === 'Truth' ? 'bg-[${HERO_BLUE}]' : 'bg-[${HERO_RED}]'}`} style={{ backgroundColor: prompt.type === 'Truth' ? HERO_BLUE : HERO_RED }}>
                            {prompt.type.toUpperCase()} EGG
                        </div>
                        <p className="text-3xl leading-snug text-[${HERO_BLUE}] font-black drop-shadow-sm" style={{ color: HERO_BLUE }}>"{prompt.text}"</p>
                    </div>

                    <div className={`p-6 rounded-[24px] mb-8 border-[6px] border-dashed bg-[${EGG_WHITE}] ${prompt.type === 'Truth' ? 'border-[${HERO_YELLOW}] text-[${HERO_RED}]' : 'border-[${SPOT_BLUE}] text-[${HERO_BLUE}]'}`} style={{ backgroundColor: EGG_WHITE, borderColor: prompt.type === 'Truth' ? HERO_YELLOW : SPOT_BLUE, color: prompt.type === 'Truth' ? HERO_RED : HERO_BLUE }}>
                        <div className="text-sm font-black opacity-80 mb-2 uppercase tracking-widest">FAILURE PENALTY</div>
                        <div className="text-2xl font-bold">{prompt.penalty}</div>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={() => { setPrompt(null); if (prompt?.type === 'NeverHaveIEver') setIntensity(null); }} className="flex-1 billy-btn !bg-white !text-[${HERO_BLUE}]">FINISHED</button>
                        <button onClick={() => handleDraw(prompt.type)} className="flex-1 billy-btn billy-btn-yellow">AGAIN</button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const BillyDecksScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { customDecks, setEditingDeck, deleteDeck, editingDeck, generateId, saveDeck, addNewPromptToEditingDeck, updatePromptInEditingDeck, removePromptFromEditingDeck, activeDeckId, setActiveDeckId } = logic;

    return (
        <AnimatePresence mode="wait">
            {!editingDeck ? (
                <motion.div key="decks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-20">
                    <div className="billy-panel !py-4" style={{ borderColor: HERO_BLUE, boxShadow: `0 8px 0 ${HERO_BLUE}44`, backgroundColor: EGG_WHITE }}>
                        <div className="flex justify-between items-center px-2">
                            <div>
                                <h2 className="text-3xl font-black text-white text-stroke-blue !text-white drop-shadow-[2px_2px_0_1873CA]" style={{ WebkitTextStroke: `4px ${HERO_BLUE}` }}>YOUR NESTS</h2>
                                <p className="text-xs text-[#1873CA] font-bold tracking-widest uppercase">Incubating custom challenges</p>
                            </div>
                            <button
                                onClick={() => setEditingDeck({
                                    id: generateId(),
                                    name: '',
                                    description: '',
                                    prompts: [],
                                    isCustom: true,
                                    intensity: logic.intensity || Intensity.SOFT,
                                    gameMode: logic.gameMode || GameMode.TRUTH_OR_DARE
                                })}
                                className="bg-[#E81E3B] text-white px-6 py-3 rounded-full font-black border-4 border-white shadow-[0_6px_0_#b3001b] active:translate-y-1 active:shadow-none transition-all text-xl"
                            >
                                + ADD
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6 overflow-y-auto no-scrollbar max-h-[calc(100dvh-300px)]">
                        {customDecks.length === 0 ? (
                            <div className="text-center p-12 bg-white/80 rounded-[40px] border-[8px] border-[#1873CA] border-dashed text-[#1873CA]">
                                <span className="text-7xl block mb-6 filter drop-shadow-md">🧺</span>
                                <p className="text-3xl font-black">NEST IS EMPTY!</p>
                            </div>
                        ) : (
                            customDecks.map((deck: any) => (
                                <div key={deck.id} className={`billy-panel !py-4 transition-all ${activeDeckId === deck.id ? 'border-[#F3C910] bg-[#fffdf0] scale-[1.02] shadow-[0_12px_0_#ccaa0055]' : 'opacity-80 hover:opacity-100'}`}>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`w-20 h-20 rounded-full flex shrink-0 items-center justify-center text-4xl border-[6px] border-white shadow-sm ${activeDeckId === deck.id ? 'bg-[#F3C910] animate-bounce' : 'bg-[#2B93E6]'}`}>
                                            {activeDeckId === deck.id ? '🐣' : '🥚'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-2xl text-[#1873CA] truncate font-black">{deck.name || 'UNTITLED NEST'}</div>
                                            <div className="flex gap-2 mt-1">
                                                <span className="text-[10px] bg-[#E81E3B] text-white rounded-lg px-2 py-0.5 font-bold shadow-sm">{deck.gameMode === GameMode.TRUTH_OR_DARE ? 'T/D' : 'NHIE'}</span>
                                                <span className="text-[10px] bg-[#1873CA] text-white rounded-lg px-2 py-0.5 font-bold shadow-sm">{deck.intensity}</span>
                                                <span className="text-[10px] bg-white text-[#1873CA] border border-[#1873CA]/20 rounded-lg px-2 py-0.5 font-black">{deck.prompts.length} EGGS</span>
                                            </div>
                                        </div>
                                        {activeDeckId === deck.id && (
                                            <div className="text-[#F3C910] font-black text-xs tracking-tighter text-stroke-white" style={{ WebkitTextStroke: '2px white' }}>HATCHING!</div>
                                        )}
                                    </div>

                                    <p className="text-sm text-[#1873CA] opacity-60 mb-6 italic line-clamp-2 h-10 px-2">{deck.description || 'No nest details provided.'}</p>

                                    <div className="flex gap-3 px-1">
                                        <button
                                            onClick={() => setActiveDeckId(deck.id)}
                                            className={`flex-1 py-3 rounded-full text-base font-black border-[4px] transition-all ${activeDeckId === deck.id ? 'bg-[#F3C910] border-white text-white shadow-[0_4px_0_#ccaa00]' : 'bg-[#1873CA] border-[#1873CA] text-white shadow-[0_4px_0_#0e58a0] opacity-70 hover:opacity-100'}`}
                                        >
                                            {activeDeckId === deck.id ? 'ACTIVE' : 'CHOOSE'}
                                        </button>
                                        <button onClick={() => setEditingDeck(deck)} className="px-6 py-3 bg-[#2B93E6] text-white rounded-full text-base font-black border-[4px] border-[#1873CA] shadow-[0_4px_0_#1873CA]">EDIT</button>
                                        <button onClick={() => deleteDeck(deck.id)} className="px-5 py-3 bg-[#E81E3B] text-white rounded-full text-base font-black border-[4px] border-[#b3001b] shadow-[0_4px_0_#b3001b]">TOSS</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </motion.div>
            ) : (
                <motion.div key="editing" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col h-full space-y-6 pb-20">
                    <div className="billy-panel space-y-6 !bg-white">
                        <div className="space-y-2">
                            <label className="text-sm font-black text-[#1873CA] tracking-widest pl-2">NEST NAME</label>
                            <input
                                className="w-full bg-[#f1f8ff] text-4xl font-black text-[#1873CA] focus:outline-none placeholder-[#1873CA]/20 border-b-8 border-[#1873CA] pb-2 px-4 rounded-2xl transition-all focus:border-[#F3C910]"
                                value={editingDeck.name}
                                onChange={e => setEditingDeck({ ...editingDeck, name: e.target.value })}
                                placeholder="ENTER NAME..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-black text-[#1873CA] tracking-widest pl-2">NEST DESCRIPTION</label>
                            <textarea
                                className="w-full bg-[#f1f8ff] text-lg font-bold text-[#1873CA]/80 focus:outline-none border-b-4 border-[#1873CA]/20 pb-2 px-4 rounded-2xl resize-none h-20 placeholder-[#1873CA]/10"
                                value={editingDeck.description}
                                onChange={e => setEditingDeck({ ...editingDeck, description: e.target.value })}
                                placeholder="What's inside this nest?"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-[#1873CA] tracking-widest pl-2">PROTOCOL</label>
                                <select
                                    value={editingDeck.gameMode}
                                    onChange={e => setEditingDeck({ ...editingDeck, gameMode: e.target.value as any })}
                                    className="w-full bg-[#1873CA] text-white p-4 rounded-2xl border-4 border-[#1873CA] outline-none font-black text-lg cursor-pointer shadow-[0_4px_0_#0e58a0]"
                                >
                                    <option value={GameMode.TRUTH_OR_DARE}>TRUTH/DARE</option>
                                    <option value={GameMode.NEVER_HAVE_I_EVER}>NHIE MODE</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-[#1873CA] tracking-widest pl-2">INTENSITY</label>
                                <select
                                    value={editingDeck.intensity}
                                    onChange={e => setEditingDeck({ ...editingDeck, intensity: e.target.value as any })}
                                    className="w-full bg-[#F3C910] text-[#1873CA] p-4 rounded-2xl border-4 border-[#F3C910] outline-none font-black text-lg cursor-pointer shadow-[0_4px_0_#ccaa00]"
                                >
                                    <option value={Intensity.SOFT}>MORNING (SOFT)</option>
                                    <option value={Intensity.HOT}>CRACKED (HOT)</option>
                                    <option value={Intensity.VULGAR}>CROWING (VULGAR)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col min-h-0 bg-[#1873CA]/10 rounded-[40px] p-6 border-[6px] border-[#1873CA]/20 border-dashed">
                        <div className="flex justify-between items-center mb-6 px-2">
                            <h3 className="text-3xl font-black text-[#1873CA] drop-shadow-sm">EGGS <span className="text-[#E81E3B]">({editingDeck.prompts.length})</span></h3>
                            <button
                                onClick={addNewPromptToEditingDeck}
                                className="bg-white text-[#1873CA] px-6 py-3 rounded-full font-black border-[4px] border-[#F3C910] shadow-[0_4px_0_#ccaa00] active:translate-y-1 transition-all"
                            >
                                + ADD EGGS
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-6 no-scrollbar pr-2">
                            {editingDeck.prompts.map((p: any) => (
                                <div key={p.id} className="bg-white p-6 rounded-[32px] border-[6px] border-[#F3C910] relative group hover:scale-[1.01] transition-transform">
                                    <button
                                        onClick={() => logic.removePromptFromEditingDeck(p.id)}
                                        className="absolute -top-3 -right-3 w-10 h-10 bg-[#E81E3B] text-white rounded-full border-[4px] border-white shadow-md flex items-center justify-center font-black text-xl hover:scale-110 transition-all z-10"
                                    >
                                        ×
                                    </button>
                                    <div className="flex gap-4 mb-4">
                                        <select
                                            className="flex-1 bg-[#f1f8ff] text-[#1873CA] font-black p-3 rounded-xl border-4 border-[#1873CA]/10 outline-none"
                                            value={p.type}
                                            onChange={e => logic.updatePromptInEditingDeck(p.id, 'type', e.target.value as any)}
                                        >
                                            {editingDeck.gameMode === GameMode.TRUTH_OR_DARE ? (
                                                <><option value="Truth">TRUTH</option><option value="Dare">DARE</option></>
                                            ) : (
                                                <option value="NeverHaveIEver">NHIE</option>
                                            )}
                                        </select>
                                        <div className="flex-1 bg-[#f1f8ff] text-[#1873CA] font-black p-3 rounded-xl border-4 border-[#1873CA]/10 flex items-center justify-center opacity-50 italic text-sm">
                                            {editingDeck.intensity}
                                        </div>
                                    </div>
                                    <textarea
                                        className="w-full bg-transparent text-[#1873CA] focus:outline-none text-2xl font-black italic resize-none h-24 placeholder-[#1873CA]/10 leading-tight"
                                        value={p.text}
                                        onChange={e => logic.updatePromptInEditingDeck(p.id, 'text', e.target.value)}
                                        placeholder="Write your challenge..."
                                    />
                                    <div className="mt-3">
                                        <input
                                            type="text"
                                            value={p.penalty}
                                            onChange={e => logic.updatePromptInEditingDeck(p.id, 'penalty', e.target.value)}
                                            placeholder="PENALTY IF REFUSED..."
                                            className="w-full bg-[#fff1f1] text-[#E81E3B] font-bold p-3 rounded-xl border-4 border-[#E81E3B]/10 outline-none placeholder-[#E81E3B]/20 text-sm"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4 border-t-8 border-[#1873CA]/10">
                        <button onClick={() => setEditingDeck(null)} className="flex-1 py-5 text-2xl font-black text-[#1873CA] bg-white border-4 border-[#1873CA] rounded-full shadow-[0_6px_0_#0e58a0] active:translate-y-1">ABORT</button>
                        <button
                            onClick={() => saveDeck(editingDeck)}
                            className="flex-2 py-5 text-3xl font-black bg-[#E81E3B] text-white border-4 border-white rounded-full shadow-[0_8px_0_#b3001b] hover:scale-[1.03] active:translate-y-1 transition-all px-12"
                        >
                            SAVE NEST!
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const BillyHistoryScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { history } = logic;
    return (
        <div className="space-y-6">
            <h2 className="text-5xl text-white text-stroke-blue !text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.1)] mb-8 text-center mt-2 font-black" style={{ color: 'white', WebkitTextStroke: `6px ${HERO_BLUE}` }}>ALBUM</h2>
            {history.length === 0 ? (
                <div className="text-center p-12 bg-white/80 rounded-[40px] border-[8px] border-[${HERO_BLUE}] border-dashed text-[${HERO_BLUE}]" style={{ borderColor: HERO_BLUE, color: HERO_BLUE }}>
                    <p className="text-3xl font-black">Album is empty!</p>
                </div>
            ) : (
                <div className="space-y-6 pb-20">
                    {history.map((h: any, i: number) => (
                        <div key={i} className="billy-panel !pt-12 relative" style={{ borderColor: HERO_YELLOW, boxShadow: `0 12px 0 ${HERO_YELLOW}55` }}>
                            <div className="absolute -top-6 -left-4 w-16 h-16 bg-white rounded-full flex items-center justify-center border-[6px] border-[${HERO_BLUE}] shadow-[0_6px_0_${HERO_BLUE}] text-2xl text-[${HERO_BLUE}] font-black z-10" style={{ borderColor: HERO_BLUE, color: HERO_BLUE, boxShadow: `0 6px 0 ${HERO_BLUE}` }}>
                                #{history.length - i}
                            </div>
                            <span className={`absolute top-4 right-4 text-white px-5 py-2 rounded-[16px] border-[4px] text-sm font-black shadow-sm ${h.type === 'Truth' ? 'bg-[${SPOT_BLUE}] border-[${HERO_BLUE}]' : 'bg-[${HERO_RED}] border-white'}`} style={{ backgroundColor: h.type === 'Truth' ? SPOT_BLUE : HERO_RED, borderColor: h.type === 'Truth' ? HERO_BLUE : 'white' }}>
                                {h.type.toUpperCase()}
                            </span>
                            <p className="text-2xl leading-snug px-2 font-Fredoka font-black text-[${HERO_BLUE}] mt-4" style={{ color: HERO_BLUE }}>"{h.text}"</p>
                            <div className="mt-5 text-sm font-black text-[${HERO_RED}] bg-[#fff1f1] border-[4px] border-[#ffccd2] px-4 py-2 rounded-[16px] inline-block" style={{ color: HERO_RED }}>
                                RANK: {h.intensity}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export const BillyThemesScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setTheme, theme } = logic;
    return (
        <div className="space-y-6">
            <h2 className="text-4xl text-white text-stroke-blue !text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.1)] mb-8 text-center mt-2 leading-none font-black" style={{ color: 'white', WebkitTextStroke: `5px ${HERO_BLUE}` }}>THEME SELECT</h2>
            <div className="grid grid-cols-2 gap-4 pb-24">
                {allThemesList.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`
                            rounded-[36px] p-5 flex flex-col items-center gap-4 text-center transition-transform active:scale-95 border-[8px] relative
                            ${theme === t.id
                                ? 'bg-[${HERO_BLUE}] border-white shadow-[0_10px_0_#0e58a0]'
                                : 'bg-white border-[${HERO_YELLOW}] shadow-[0_10px_0_#ccaa00]'}
                        `}
                        style={{ backgroundColor: theme === t.id ? HERO_BLUE : 'white', borderColor: theme === t.id ? 'white' : HERO_YELLOW }}
                    >
                        {theme === t.id && <div className="absolute -top-6 -right-3 text-4xl filter drop-shadow-md">👑</div>}
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-4xl border-[6px] ${theme === t.id ? 'bg-white border-transparent text-[${HERO_BLUE}] drop-shadow-sm' : 'bg-[#f8fbff] border-[${HERO_BLUE}]'}`} style={{ backgroundColor: theme === t.id ? 'white' : '#f8fbff', borderColor: theme === t.id ? 'transparent' : HERO_BLUE, color: theme === t.id ? HERO_BLUE : 'inherit' }}>
                            {t.icon || '🥚'}
                        </div>
                        <span className={`text-xl leading-tight mt-1 font-black ${theme === t.id ? 'text-white' : 'text-[${HERO_BLUE}]'}`} style={{ color: theme === t.id ? 'white' : HERO_BLUE }}>{t.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export const BillySettingsScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setView } = logic;
    return (
        <div className="space-y-6">
            <h2 className="text-4xl text-white text-stroke-blue !text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.1)] mb-8 text-center mt-2 font-black" style={{ color: 'white', WebkitTextStroke: `5px ${HERO_BLUE}` }}>PAUSE</h2>
            <div className="billy-panel space-y-6 text-center">
                <span className="text-7xl mb-4 block filter drop-shadow-lg">🎮</span>
                <button onClick={() => setView('menu')} className="w-full billy-btn billy-btn-red !py-6 text-3xl font-black">MAIN MENU</button>
            </div>
        </div>
    );
};

export const BillyHatcherTheme: ThemeDefinition = {
    id: Theme.BILLY_HATCHER,
    name: 'Billy Hatcher',
    cssVars: {
        '--theme-accent': HERO_BLUE,
    },
    LayoutComponent: BillyLayout,
    PlayScreen: BillyPlayScreen,
    DecksScreen: BillyDecksScreen,
    HistoryScreen: BillyHistoryScreen,
    ThemesScreen: BillyThemesScreen,
    SettingsScreen: BillySettingsScreen,
    tabLabels: {
        play: 'HATCH',
        decks: 'NEST',
        history: 'FLOCK',
        themes: 'WORLDS',
        settings: 'PAUSE'
    }
};
