import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme, ThemeDefinition } from '../types';

const STAGES = [
    { id: Intensity.SOFT, title: 'DAILY TASK', desc: 'EASY PEASY', color: '#88E0EF', text: '#546E7A', icon: '✈️' },
    { id: Intensity.HOT, title: 'BIG CATCH', desc: 'EXCITING', color: '#F9D56E', text: '#795548', icon: '🎣' },
    { id: Intensity.VULGAR, title: 'WASP NEST', desc: 'DANGEROUS', color: '#FF8A80', text: '#BF360C', icon: '🐝' },
];

export const AnimalCrossingLayout: React.FC<{ children: React.ReactNode; activeTab: string; setActiveTab: (tab: string) => void; logic: any }> = ({ children, activeTab, setActiveTab }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const tabs = [
        { id: 'play', label: 'ISLAND', icon: '🏝️' },
        { id: 'decks', label: 'DIY', icon: '🔨' },
        { id: 'history', label: 'MILES', icon: '🎫' },
        { id: 'themes', label: 'TRAVEL', icon: '✈️' },
        { id: 'settings', label: 'PASSPORT', icon: '🛂' },
    ];

    return (
        <div className="ac-theme h-[100dvh] w-screen flex flex-col bg-[#F0F4C3] text-[#5D4037] overflow-hidden font-['Varela_Round'] relative">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
                .ac-theme {
                    font-family: 'Varela Round', sans-serif;
                    background-color: #9CCC65;
                    background-image: radial-gradient(#C5E1A5 15%, transparent 16%), radial-gradient(#C5E1A5 15%, transparent 16%);
                    background-size: 60px 60px;
                    background-position: 0 0, 30px 30px;
                }
                .ac-panel {
                    background: #FFF9C4;
                    border-radius: 20px;
                    box-shadow: 0 4px 0 rgba(0,0,0,0.1);
                    border: 4px solid white;
                    position: relative;
                    overflow: hidden;
                }
                .ac-card {
                    background: white;
                    border-radius: 15px;
                    padding: 15px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                    position: relative;
                    color: inherit;
                }
                .ac-bubble {
                    background: #E0F7FA;
                    border-radius: 20px;
                    padding: 20px;
                    position: relative;
                    border: 4px solid white;
                    box-shadow: 0 4px 0 rgba(0,0,0,0.1);
                }
                .ac-bubble::after {
                    content: '';
                    position: absolute;
                    bottom: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                    border-width: 10px 10px 0;
                    border-style: solid;
                    border-color: #E0F7FA transparent transparent transparent;
                }
                .ac-btn {
                    background: #FFCC80;
                    color: #5D4037;
                    border-radius: 30px;
                    padding: 10px 20px;
                    font-weight: bold;
                    border: 3px solid white;
                    box-shadow: 0 3px 0 rgba(0,0,0,0.1);
                    transition: transform 0.1s;
                    font-family: inherit;
                }
                .ac-btn:active {
                    transform: translateY(3px);
                    box-shadow: none;
                }
                .nook-phone-btn {
                    background: rgba(255,255,255,0.8);
                    backdrop-filter: blur(5px);
                    border-radius: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                    border: none;
                }
                .nook-phone-btn.active {
                    background: white;
                    transform: scale(1.1) translateY(-5px);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                }
                .leaf-pattern {
                    position: absolute;
                    top: -20px;
                    right: -20px;
                    font-size: 100px;
                    opacity: 0.1;
                    transform: rotate(15deg);
                }
                .stamp {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    border: 2px dashed #BDBDBD;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    background: rgba(255,255,255,0.5);
                }
                .stamp.filled {
                    background: #81D4FA;
                    border: 2px solid white;
                    color: white;
                    transform: rotate(-10deg);
                }
            `}</style>

            <header className="p-4 flex justify-between items-center shrink-0 relative z-10">
                <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
                    <span className="text-xl">🏝️</span>
                    <span className="font-bold text-[#5D4037]">PARADISE</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm font-bold text-[#5D4037]">
                    {formatTime(time)}
                </div>
            </header>

            <main className="flex-1 overflow-y-auto px-4 pb-32 relative z-10 no-scrollbar">
                <div className="max-w-md mx-auto h-full pt-2">
                    {children}
                </div>
            </main>

            <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md z-50">
                <div className="bg-white/90 backdrop-blur-md rounded-[30px] p-2 shadow-lg border border-white/50 flex justify-around items-center">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`nook-phone-btn w-12 h-12 ${activeTab === tab.id ? 'active' : ''}`}
                        >
                            <span className="text-xl">{tab.icon}</span>
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export const AnimalCrossingPlayScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { intensity, setIntensity, prompt, setPrompt, history, activeDeckId, setActiveDeckId, customDecks, handleDraw } = logic;
    return (
        <AnimatePresence mode="wait">
            {!intensity && !prompt ? (
                <motion.div key="play" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="space-y-6">
                    <div className="ac-panel p-6">
                        <div className="leaf-pattern">🍃</div>
                        <h2 className="text-xl font-bold mb-4 text-[#795548]">Choose Activity</h2>
                        <div className="grid grid-cols-1 gap-3">
                            <button onClick={() => setActiveDeckId('default')} className={`ac-card flex items-center gap-4 transition-all ${activeDeckId === 'default' ? 'ring-4 ring-[#81D4FA]' : ''}`}>
                                <div className="w-12 h-12 bg-[#B2DFDB] rounded-full flex items-center justify-center text-2xl">⛺</div>
                                <div className="text-left"><div className="font-bold text-lg">Island Life</div><div className="text-xs text-gray-500">Standard Experience</div></div>
                            </button>
                            {customDecks.map((deck: any) => (
                                <button key={deck.id} onClick={() => setActiveDeckId(deck.id)} className={`ac-card flex items-center gap-4 transition-all ${activeDeckId === deck.id ? 'ring-4 ring-[#81D4FA]' : ''}`}>
                                    <div className="w-12 h-12 bg-[#FFCC80] rounded-full flex items-center justify-center text-2xl">📦</div>
                                    <div className="text-left"><div className="font-bold text-lg">{deck.name}</div><div className="text-xs text-gray-500">{deck.prompts.length} Tasks</div></div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {STAGES.map((stage) => (
                            <button key={stage.id} onClick={() => setIntensity(stage.id)} className="ac-card flex items-center justify-between p-4 hover:scale-105 transition-transform" style={{ backgroundColor: stage.color }}>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center text-2xl shadow-sm">{stage.icon}</div>
                                    <div className="text-left"><div className="font-bold text-lg text-white drop-shadow-sm">{stage.title}</div><div className="text-xs text-white/80 font-bold">{stage.desc}</div></div>
                                </div>
                                <div className="text-white text-xl">▶</div>
                            </button>
                        ))}
                    </div>
                </motion.div>
            ) : !prompt ? (
                <div className="flex flex-col items-center justify-center h-[60vh] relative">
                    <div className="ac-bubble w-full text-center mb-8">
                        <p className="text-lg font-bold text-[#00BCD4] mb-2">Tom Nook says:</p>
                        <p className="text-xl text-[#5D4037]">"Ready for a new task, hm? Choose wisely, yes, yes!"</p>
                    </div>
                    <div className="w-32 h-32 bg-white rounded-full border-4 border-[#81D4FA] flex items-center justify-center mb-8 shadow-lg animate-bounce">
                        <span className="text-6xl">{intensity === Intensity.SOFT ? '✈️' : intensity === Intensity.HOT ? '🎣' : '🐝'}</span>
                    </div>
                    <div className="flex gap-4 w-full px-4">
                        <button onClick={() => handleDraw('Truth')} className="flex-1 ac-btn bg-[#4DD0E1] text-white border-[#B2EBF2]">TRUTH</button>
                        <button onClick={() => handleDraw('Dare')} className="flex-1 ac-btn bg-[#FF7043] text-white border-[#FFCCBC]">DARE</button>
                    </div>
                    <button onClick={() => setIntensity(null)} className="mt-8 text-sm font-bold text-white bg-[#8D6E63] px-4 py-2 rounded-full shadow-sm hover:bg-[#795548]">Nevermind</button>
                </div>
            ) : (
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative mt-4">
                    <div className="ac-panel p-6 border-[#FFF9C4]">
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#FFF9C4] px-4 py-1 rounded-t-xl border-t-4 border-x-4 border-white">
                            <span className="font-bold text-[#FBC02D]">{prompt.type.toUpperCase()}</span>
                        </div>
                        <div className="text-center space-y-6 pt-4">
                            <div className="w-16 h-16 mx-auto bg-[#E1F5FE] rounded-full flex items-center justify-center text-3xl border-4 border-white shadow-sm">{prompt.type === 'Truth' ? '🤔' : '⚡'}</div>
                            <p className="text-2xl font-bold text-[#5D4037] leading-relaxed">"{prompt.text}"</p>
                            <div className="bg-[#FFEBEE] rounded-xl p-4 border-2 border-white">
                                <p className="text-[#E57373] text-xs font-bold uppercase mb-1">Penalty</p>
                                <p className="text-[#C62828] font-bold">{prompt.penalty}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button onClick={() => setPrompt(null)} className="flex-1 ac-btn bg-[#AED581] text-white border-[#DCEDC8]">Done!</button>
                        <button onClick={() => handleDraw(prompt.type)} className="flex-1 ac-btn bg-[#4DB6AC] text-white border-[#B2DFDB]">Again!</button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const AnimalCrossingDecksScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { customDecks, setEditingDeck, deleteDeck, editingDeck, generateId, saveDeck, addNewPromptToEditingDeck, updatePromptInEditingDeck, removePromptFromEditingDeck } = logic;
    return (
        <AnimatePresence mode="wait">
            {!editingDeck ? (
                <motion.div key="decks" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
                    <div className="ac-panel p-4 bg-[#FFF3E0]">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-[#E65100]">DIY Recipes</h2>
                            <button onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })} className="bg-[#FFB74D] text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                                + Create
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {customDecks.map((deck: any) => (
                                <div key={deck.id} className="ac-card flex flex-col items-center text-center gap-2 hover:scale-105 transition-transform cursor-pointer" onClick={() => setEditingDeck(deck)}>
                                    <div className="w-12 h-12 bg-[#FFE0B2] rounded-full flex items-center justify-center text-2xl">📜</div>
                                    <div><div className="font-bold text-sm truncate w-full">{deck.name || 'Untitled'}</div><div className="text-xs text-gray-400">{deck.prompts.length} items</div></div>
                                    <button onClick={(e) => { e.stopPropagation(); deleteDeck(deck.id); }} className="absolute top-2 right-2 text-red-400 text-xs">×</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ) : (
                <div className="ac-panel p-6 space-y-4 bg-[#FFF3E0]">
                    <div className="text-center mb-4"><h2 className="text-xl font-bold text-[#E65100]">Crafting Recipe</h2></div>
                    <input className="w-full bg-white rounded-xl p-3 font-bold text-[#E65100] outline-none shadow-sm" value={editingDeck.name} onChange={e => setEditingDeck({ ...editingDeck, name: e.target.value })} placeholder="Recipe Name" />
                    <textarea className="w-full bg-white rounded-xl p-3 text-sm h-20 outline-none shadow-sm resize-none" value={editingDeck.description} onChange={e => setEditingDeck({ ...editingDeck, description: e.target.value })} placeholder="Description..." />
                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-2"><span className="font-bold text-[#E65100]">Materials ({editingDeck.prompts.length})</span><button onClick={addNewPromptToEditingDeck} className="text-[#E65100] text-sm font-bold bg-[#FFE0B2] px-2 py-1 rounded-full">+ Add</button></div>
                        <div className="max-h-[35vh] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                            {editingDeck.prompts.map((p: any) => (
                                <div key={p.id} className="bg-white rounded-xl p-2 flex gap-2 items-center shadow-sm">
                                    <select className="bg-[#FFE0B2] text-[#E65100] text-xs font-bold rounded-lg p-1 outline-none" value={p.type} onChange={e => updatePromptInEditingDeck(p.id, 'type', e.target.value)}><option>Truth</option><option>Dare</option></select>
                                    <input className="flex-1 text-sm font-bold text-gray-600 outline-none" value={p.text} onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)} placeholder="..." />
                                    <button onClick={() => removePromptFromEditingDeck(p.id)} className="text-red-400 font-bold px-2">×</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-2 pt-2"><button onClick={() => setEditingDeck(null)} className="flex-1 bg-[#BCAAA4] text-white font-bold py-3 rounded-xl shadow-sm">Cancel</button><button onClick={() => saveDeck(editingDeck)} className="flex-1 bg-[#FFB74D] text-white font-bold py-3 rounded-xl shadow-sm">Save</button></div>
                </div>
            )}
        </AnimatePresence>
    );
};

export const AnimalCrossingHistoryScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { history } = logic;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="ac-panel p-4 bg-[#E1F5FE]">
                <div className="flex items-center gap-2 mb-4 border-b-2 border-white pb-2"><span className="text-2xl">🎫</span><h2 className="text-xl font-bold text-[#0288D1]">Nook Miles</h2></div>
                <div className="grid grid-cols-3 gap-3">
                    {history.map((item: any, i: number) => (
                        <div key={i} className="bg-white rounded-xl p-2 flex flex-col items-center gap-2 shadow-sm text-center aspect-square justify-center">
                            <div className="stamp filled">{item.type === 'Truth' ? '🤔' : '⚡'}</div>
                            <div className="text-[10px] font-bold text-[#0288D1] leading-tight line-clamp-2 uppercase">{item.text}</div>
                        </div>
                    ))}
                    {Array.from({ length: Math.max(0, 9 - history.length) }).map((_, i) => (
                        <div key={`empty-${i}`} className="bg-white/50 rounded-xl p-2 flex items-center justify-center aspect-square"><div className="stamp"></div></div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export const AnimalCrossingThemesScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setTheme, theme } = logic;
    const themes = [
        { id: Theme.PERSONA, label: 'Tokyo', color: '#EF5350' },
        { id: Theme.MINECRAFT, label: 'Overworld', color: '#66BB6A' },
        { id: Theme.DANGANRONPA, label: 'Academy', color: '#AB47BC' },
        { id: Theme.OMORI, label: 'Headspace', color: '#5C6BC0' },
        { id: Theme.KIRBY, label: 'Popstar', color: '#EC407A' },
        { id: Theme.POKEMON, label: 'Kanto', color: '#42A5F5' },
        { id: Theme.ANIMAL_CROSSING, label: 'Island', color: '#9CCC65' },
        { id: Theme.SKYRIM, label: 'Skyrim', color: '#B0BEC5' },
        { id: Theme.SONIC, label: 'Sonic', color: '#1E90FF' },
        { id: Theme.SANRIO, label: 'Sanrio', color: '#FF69B4' },
        { id: Theme.CYBERPUNK, label: 'Night City', color: '#4DD0E1' },
        { id: Theme.UNDERTALE, label: 'Underground', color: '#9E9E9E' },
        { id: Theme.FALLOUT, label: 'Wasteland', color: '#81C784' },
        { id: Theme.HAZBIN, label: 'Pentagram', color: '#E57373' },
        { id: Theme.VOCALOID, label: 'Stage', color: '#4DD0E1' },
        { id: Theme.FNAF, label: 'Pizzeria', color: '#795548' },
        { id: Theme.IRUMA, label: 'Babyls', color: '#BA68C8' },
        { id: Theme.ARCANE, label: 'Piltover', color: '#7986CB' },
    ];
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="ac-panel p-4 bg-[#E1BEE7]">
                <div className="flex items-center gap-2 mb-4"><span className="text-2xl">✈️</span><h2 className="text-xl font-bold text-[#8E24AA]">Dodo Airlines</h2></div>
                <p className="text-sm text-[#8E24AA] mb-4 font-bold">Where would you like to go?</p>
                <div className="grid grid-cols-2 gap-3">
                    {themes.map(t => (
                        <button key={t.id} onClick={() => setTheme(t.id as Theme)} className={`ac-card flex flex-col items-center justify-center gap-2 py-4 hover:scale-105 transition-transform ${theme === t.id ? 'ring-4 ring-[#AB47BC]' : ''}`}>
                            <div className="w-8 h-8 rounded-full" style={{ backgroundColor: t.color }}></div>
                            <span className="font-bold text-sm text-[#5D4037]">{t.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export const AnimalCrossingSettingsScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setView } = logic;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="ac-panel p-6 bg-[#CFD8DC]">
                <div className="flex items-center gap-4 mb-6"><div className="w-16 h-16 bg-white rounded-lg border-4 border-white shadow-sm flex items-center justify-center text-3xl">🙂</div><div><h2 className="text-2xl font-bold text-[#455A64]">PASSPORT</h2><p className="text-[#78909C] font-bold">Island Resident</p></div></div>
                <div className="space-y-4">
                    <div className="bg-white rounded-xl p-3 shadow-sm"><p className="text-xs text-[#90A4AE] font-bold uppercase">Island Name</p><p className="text-lg font-bold text-[#455A64]">Paradise</p></div>
                    <div className="bg-white rounded-xl p-3 shadow-sm"><p className="text-xs text-[#90A4AE] font-bold uppercase">Title</p><p className="text-lg font-bold text-[#455A64]">Truth Seeker</p></div>
                </div>
                <button onClick={() => setView('menu')} className="w-full mt-6 bg-[#FFAB91] text-white font-bold py-3 rounded-xl shadow-sm active:scale-95 transition-transform">End Session</button>
            </div>
        </motion.div>
    );
};

export const AnimalCrossingMenu: React.FC<{ logic: any }> = ({ logic }) => {
    const { setView, setTheme } = logic;
    const [activeSection, setActiveSection] = React.useState<'themes' | null>(null);
    const themes = Object.values(Theme).filter(t => t !== Theme.NONE);
    const [leaves, setLeaves] = React.useState<{ id: number, left: string, top: string }[]>([]);

    React.useEffect(() => {
        setLeaves([...Array(10)].map((_, i) => ({ id: i, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` })));
    }, []);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-[#F0F4C3] font-sans text-[#5D4037] relative overflow-hidden select-none">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#C5E1A5 15%, transparent 16%)', backgroundSize: '60px 60px' }}></div>
            <div className="absolute inset-0 pointer-events-none">
                {leaves.map((leaf, i) => (
                    <motion.div key={leaf.id} className="absolute text-4xl opacity-20" style={{ left: leaf.left, top: leaf.top }} animate={{ y: [0, 100, 0], x: [0, 50, 0], rotate: [0, 360] }} transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}>🍃</motion.div>
                ))}
            </div>
            <div className="z-10 flex flex-col items-center gap-12">
                <motion.h1 className="text-6xl font-black tracking-tight text-[#795548] drop-shadow-sm text-center" animate={{ rotate: [0, 1, -1, 0] }} transition={{ duration: 4, repeat: Infinity }}>ANIMAL CROSSING</motion.h1>
                <div className="flex flex-col gap-6 w-72">
                    <button onClick={() => setView('game')} className="bg-[#8BC34A] text-white rounded-[30px] p-6 text-3xl font-bold shadow-md hover:scale-105 transition-all border-4 border-white font-['Varela_Round']">GO TO ISLAND</button>
                    <button onClick={() => setActiveSection(activeSection === 'themes' ? null : 'themes')} className="bg-[#FFEB3B] text-[#5D4037] rounded-[30px] p-4 text-xl font-bold shadow-sm hover:rotate-2 transition-all border-4 border-white font-['Varela_Round']">CHANGE THEME</button>
                </div>
                <AnimatePresence>
                    {activeSection === 'themes' && (
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="grid grid-cols-2 gap-3 bg-[#FFF9C4] p-6 rounded-[40px] border-4 border-white shadow-lg max-h-48 overflow-y-auto no-scrollbar">
                            {themes.map(t => (
                                <button key={t} onClick={() => setTheme(t)} className="bg-white/50 rounded-full px-4 py-2 text-[10px] font-bold hover:bg-[#8BC34A] hover:text-white transition-all uppercase">{t}</button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export const AnimalCrossingTheme: ThemeDefinition = {
    id: Theme.ANIMAL_CROSSING,
    name: 'Animal Crossing',
    cssVars: {
        '--theme-accent': '#8BC34A',
    },
    MenuComponent: AnimalCrossingMenu,
    LayoutComponent: AnimalCrossingLayout,
    PlayScreen: AnimalCrossingPlayScreen,
    DecksScreen: AnimalCrossingDecksScreen,
    HistoryScreen: AnimalCrossingHistoryScreen,
    SettingsScreen: AnimalCrossingSettingsScreen,
    ThemesScreen: AnimalCrossingThemesScreen,
    tabLabels: {
        play: 'ISLAND',
        decks: 'DIY',
        history: 'MILES',
        themes: 'TRAVEL',
        settings: 'PASSPORT'
    }
};
