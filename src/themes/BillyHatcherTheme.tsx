import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme, ThemeDefinition } from '../types';
import { allThemesList } from './allThemesList';

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
    const { intensity, setIntensity, prompt, setPrompt, history, activeDeckId, setActiveDeckId, customDecks, handleDraw } = logic;
    return (
        <AnimatePresence mode="wait">
            {!intensity && !prompt ? (
                <motion.div key="play" initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 1.1 }} className="space-y-8 pb-10">
                    <div className="billy-panel">
                        <div className="flex justify-between items-center mb-6 border-b-4 border-[#eef6ff] pb-4">
                            <h2 className="text-2xl text-[${HERO_BLUE}] text-stroke-white !text-white drop-shadow-[0_2px_0_${HERO_BLUE}]" style={{ color: 'white', WebkitTextStroke: `4px ${HERO_BLUE}` }}>CHOOSE NEST</h2>
                            <span className="bg-[${HERO_YELLOW}] text-[${HERO_BLUE}] px-4 py-1.5 rounded-full text-sm font-black box-shadow border-4 border-white" style={{ backgroundColor: HERO_YELLOW, color: HERO_BLUE }}>{customDecks.length + 1}</span>
                        </div>
                        <div className="space-y-4">
                            <button onClick={() => setActiveDeckId('default')} className={`w-full billy-btn !text-left !px-6 flex items-center gap-3 ${activeDeckId === 'default' ? 'billy-btn-yellow' : ''}`}>
                                <span className="text-3xl filter drop-shadow-sm">🥚</span>
                                <span className="flex-1 mt-1 font-black">GIANT EGG (DEFAULT)</span>
                            </button>
                            {customDecks.map((deck: any) => (
                                <button key={deck.id} onClick={() => setActiveDeckId(deck.id)} className={`w-full billy-btn !text-left !px-6 flex items-center gap-3 ${activeDeckId === deck.id ? 'billy-btn-red' : ''}`}>
                                    <span className="text-3xl filter drop-shadow-sm">🧺</span>
                                    <span className="flex-1 mt-1 truncate font-black">{deck.name.toUpperCase() || 'UNNAMED NEST'}</span>
                                </button>
                            ))}
                        </div>
                    </div>

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
                            <div className="text-xl text-[${HERO_BLUE}] font-bold" style={{ color: HERO_BLUE }}>Level: {intensity}</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 px-2 pt-4">
                            <button onClick={() => handleDraw('Truth')} className="billy-btn billy-btn-red !text-2xl !py-6">TRUTH</button>
                            <button onClick={() => handleDraw('Dare')} className="billy-btn billy-btn-yellow !text-2xl !py-6">DARE</button>
                        </div>
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
                        <button onClick={() => setPrompt(null)} className="flex-1 billy-btn !bg-white !text-[${HERO_BLUE}]">FINISHED</button>
                        <button onClick={() => handleDraw(prompt.type)} className="flex-1 billy-btn billy-btn-yellow">AGAIN</button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const BillyDecksScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { customDecks, setEditingDeck, deleteDeck, editingDeck, generateId, saveDeck, addNewPromptToEditingDeck, updatePromptInEditingDeck, removePromptFromEditingDeck } = logic;
    return (
        <AnimatePresence mode="wait">
            {!editingDeck ? (
                <motion.div key="decks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-6">
                    <div className="flex justify-between items-center bg-[${EGG_WHITE}] p-6 rounded-[32px] border-[8px] border-[${HERO_BLUE}] shadow-[0_8px_0_${HERO_BLUE}44]" style={{ backgroundColor: EGG_WHITE, borderColor: HERO_BLUE, boxShadow: `0 8px 0 ${HERO_BLUE}44` }}>
                        <h2 className="text-3xl text-white text-stroke-blue !text-white ml-2 mt-1 drop-shadow-[2px_2px_0_${HERO_BLUE}]" style={{ color: 'white', WebkitTextStroke: `4px ${HERO_BLUE}` }}>YOUR NESTS</h2>
                        <button onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })} className="bg-[${HERO_RED}] text-white px-6 py-3 rounded-full font-black border-4 border-white shadow-[0_6px_0_#b3001b] active:translate-y-1 active:shadow-none transition-all text-xl" style={{ backgroundColor: HERO_RED }}>+ ADD</button>
                    </div>

                    <div className="space-y-4">
                        {customDecks.length === 0 && (
                            <div className="text-center p-12 bg-white/80 rounded-[40px] border-[8px] border-[${HERO_BLUE}] border-dashed text-[${HERO_BLUE}]" style={{ borderColor: HERO_BLUE, color: HERO_BLUE }}>
                                <span className="text-7xl block mb-6 filter drop-shadow-md">🧺</span>
                                <p className="text-3xl font-black">No custom nests found!</p>
                            </div>
                        )}
                        {customDecks.map((deck: any) => (
                            <div key={deck.id} className="billy-panel !py-5 flex items-center justify-between gap-4">
                                <div className="w-20 h-20 bg-[${HERO_YELLOW}] rounded-full flex shrink-0 items-center justify-center text-4xl border-[6px] border-white shadow-sm" style={{ backgroundColor: HERO_YELLOW }}>🧺</div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-2xl text-[${HERO_BLUE}] truncate mt-1 font-black" style={{ color: HERO_BLUE }}>{deck.name || 'UNNAMED NEST'}</div>
                                    <div className="text-base text-white bg-[${HERO_RED}] rounded-lg px-3 py-1 inline-block font-bold mt-1 shadow-sm border-2 border-[${HERO_RED}]" style={{ backgroundColor: HERO_RED, borderColor: HERO_RED }}>{deck.prompts.length} EGGS</div>
                                </div>
                                <div className="flex flex-col gap-2 shrink-0">
                                    <button onClick={() => setEditingDeck(deck)} className="bg-[${SPOT_BLUE}] text-white w-24 py-2 rounded-full text-sm font-black border-[4px] border-[#1873CA] shadow-[0_4px_0_#1873CA] active:translate-y-[4px] active:shadow-none" style={{ backgroundColor: SPOT_BLUE }}>EDIT</button>
                                    <button onClick={() => deleteDeck(deck.id)} className="bg-[${HERO_RED}] text-white w-24 py-2 rounded-full text-sm font-black border-[4px] border-[#b3001b] shadow-[0_4px_0_#b3001b] active:translate-y-[4px] active:shadow-none" style={{ backgroundColor: HERO_RED }}>TOSS</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            ) : (
                <motion.div key="editing" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 z-[100] bg-[${HERO_BLUE}] p-4 flex flex-col font-['Fredoka_One'] pt-[env(safe-area-inset-top)]" style={{ backgroundColor: HERO_BLUE }}>
                    <div className="flex justify-between items-center mb-6 pt-4 bg-[${EGG_WHITE}] p-5 rounded-[32px] border-[8px] border-white shadow-lg" style={{ backgroundColor: EGG_WHITE }}>
                        <h2 className="text-2xl text-[${HERO_BLUE}] mt-1 ml-2 font-black" style={{ color: HERO_BLUE }}>EDIT NEST</h2>
                        <div className="flex gap-2">
                            <button onClick={() => setEditingDeck(null)} className="bg-gray-200 text-gray-600 px-5 py-2.5 rounded-full font-black border-[4px] border-gray-300">CANCEL</button>
                            <button onClick={() => saveDeck(editingDeck)} className="bg-[${HERO_RED}] text-white px-8 py-2.5 rounded-full font-black border-[4px] border-[#b3001b] shadow-[0_4px_0_#b3001b]" style={{ backgroundColor: HERO_RED }}>SAVE</button>
                        </div>
                    </div>

                    <div className="billy-panel mb-6">
                        <input type="text" value={editingDeck.name} onChange={e => setEditingDeck({ ...editingDeck, name: e.target.value })} placeholder="Nest Name" className="w-full bg-[#f1f8ff] p-5 rounded-[20px] border-[6px] border-[#c0deff] text-2xl outline-none focus:border-[${HERO_YELLOW}] focus:bg-white mb-4 font-black" style={{ borderFocusColor: HERO_YELLOW }} />
                        <input type="text" value={editingDeck.description} onChange={e => setEditingDeck({ ...editingDeck, description: e.target.value })} placeholder="Description" className="w-full bg-[#f1f8ff] p-4 rounded-[20px] border-[6px] border-[#c0deff] text-lg outline-none focus:border-[${HERO_YELLOW}] focus:bg-white font-bold" />
                    </div>

                    <div className="flex justify-between items-center mb-4 px-2">
                        <h3 className="text-3xl text-white text-stroke-blue !text-[${HERO_YELLOW}] drop-shadow-md" style={{ color: HERO_YELLOW, WebkitTextStroke: `4px ${HERO_BLUE}` }}>EGGS ({editingDeck.prompts.length})</h3>
                        <button onClick={addNewPromptToEditingDeck} className="bg-white text-[${HERO_BLUE}] px-6 py-3 rounded-full font-black border-[6px] border-[${HERO_YELLOW}] shadow-[0_6px_0_#ccaa00]" style={{ color: HERO_BLUE, borderColor: HERO_YELLOW }}>+ EGG</button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-5 pb-12 no-scrollbar px-1">
                        {editingDeck.prompts.map((p: any) => (
                            <div key={p.id} className="bg-white p-5 rounded-[32px] border-[8px] border-[${HERO_YELLOW}] relative" style={{ borderColor: HERO_YELLOW }}>
                                <button onClick={() => removePromptFromEditingDeck(p.id)} className="absolute -top-4 -right-4 w-10 h-10 bg-[${HERO_RED}] text-white rounded-full border-[4px] border-white shadow-md flex items-center justify-center font-black text-lg z-10" style={{ backgroundColor: HERO_RED }}>X</button>
                                <div className="flex gap-3 mb-4">
                                    <select value={p.type} onChange={e => updatePromptInEditingDeck(p.id, { type: e.target.value as any })} className="p-3 border-[4px] border-[#eef6ff] rounded-[16px] outline-none bg-[#f8fbff] text-base font-black flex-1 text-[${HERO_BLUE}]" style={{ color: HERO_BLUE }}>
                                        <option value="Truth">TRUTH</option>
                                        <option value="Dare">DARE</option>
                                    </select>
                                    <select value={p.intensity} onChange={e => updatePromptInEditingDeck(p.id, { intensity: e.target.value as any })} className="p-3 border-[4px] border-[#eef6ff] rounded-[16px] outline-none bg-[#f8fbff] text-base font-black flex-1 text-[${HERO_BLUE}]" style={{ color: HERO_BLUE }}>
                                        {Object.values(Intensity).map(int => <option key={int} value={int}>{int}</option>)}
                                    </select>
                                </div>
                                <textarea value={p.text} onChange={e => updatePromptInEditingDeck(p.id, { text: e.target.value })} placeholder="What's the challenge?" className="w-full p-4 rounded-[16px] border-[4px] border-[#eef6ff] resize-none mb-3 outline-none focus:border-[${HERO_BLUE}] text-xl font-sans font-bold text-gray-700" rows={2} />
                                <input type="text" value={p.penalty} onChange={e => updatePromptInEditingDeck(p.id, { penalty: e.target.value })} placeholder="Penalty if refused" className="w-full p-4 rounded-[16px] border-[4px] border-[#feeef0] text-base outline-none focus:border-[${HERO_RED}] font-sans font-bold text-gray-700" />
                            </div>
                        ))}
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
                            <p className="text-2xl leading-snug px-2 font-Fredoka font-black text-[${HERO_BLUE}] mt-4" style={{ color: HERO_BLUE }}>"{h.prompt.text}"</p>
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
