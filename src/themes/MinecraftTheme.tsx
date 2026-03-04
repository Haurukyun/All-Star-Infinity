import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme, ThemeDefinition } from '../types';
import { allThemesList } from './allThemesList';

const STAGES = [
    { id: Intensity.SOFT, title: 'PEACEFUL', desc: 'VILLAGE LIFE', color: '#55FF55', text: '#000000', icon: '🌿' },
    { id: Intensity.HOT, title: 'NETHER', desc: 'INTO THE FIRE', color: '#FFAA00', text: '#FFFFFF', icon: '🔥' },
    { id: Intensity.VULGAR, title: 'THE END', desc: 'DRAGON SLAYER', color: '#AA00AA', text: '#FFFFFF', icon: '🔮' },
];

export const MinecraftLayout: React.FC<{ children: React.ReactNode; activeTab: string; setActiveTab: (tab: string) => void; logic: any }> = ({ children, activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'play', label: 'PLAY', icon: '⚔️' },
        { id: 'decks', label: 'DECKS', icon: '🎒' },
        { id: 'history', label: 'LOGS', icon: '📜' },
        { id: 'themes', label: 'WORLD', icon: '🗺️' },
        { id: 'settings', label: 'OPTS', icon: '⚙️' },
    ];

    return (
        <div className="minecraft-theme h-[100dvh] w-screen flex flex-col bg-[#111] text-white overflow-hidden font-['VT323'] relative">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=VT323&family=Press+Start+2P&display=swap');

                .minecraft-theme {
                    background: radial-gradient(circle at center, #2a1a3a 0%, #050505 100%);
                    image-rendering: pixelated;
                }

                .pixel-font {
                    font-family: 'Press Start 2P', cursive;
                }

                .rpg-panel {
                    background: #212121;
                    border: 4px solid #111;
                    box-shadow: 
                        0 0 0 2px #5e35b1,
                        0 0 0 4px #111,
                        0 10px 20px rgba(0,0,0,0.8);
                    position: relative;
                    padding: 20px;
                    margin-top: 10px;
                }

                .rpg-panel-gold {
                    box-shadow: 
                        0 0 0 2px #ffb300,
                        0 0 0 4px #111,
                        0 10px 20px rgba(0,0,0,0.8);
                }

                .rpg-ribbon {
                    background: #5e35b1;
                    color: #fff;
                    text-align: center;
                    position: absolute;
                    top: -16px;
                    left: 50%;
                    transform: translateX(-50%);
                    padding: 4px 24px;
                    border: 2px solid #000;
                    font-family: 'Press Start 2P', cursive;
                    font-size: 10px;
                    text-transform: uppercase;
                    z-index: 10;
                    box-shadow: 0 4px 0 rgba(0,0,0,0.5);
                }
                
                .rpg-ribbon::before {
                    content: '';
                    position: absolute;
                    left: -10px;
                    top: 6px;
                    border-right: 10px solid #311b92;
                    border-top: 10px solid transparent;
                    border-bottom: 10px solid transparent;
                    z-index: -1;
                }
                .rpg-ribbon::after {
                    content: '';
                    position: absolute;
                    right: -10px;
                    top: 6px;
                    border-left: 10px solid #311b92;
                    border-top: 10px solid transparent;
                    border-bottom: 10px solid transparent;
                    z-index: -1;
                }

                .rpg-slot {
                    background: #111;
                    border: 2px solid #444;
                    border-right-color: #666;
                    border-bottom-color: #666;
                    box-shadow: inset 2px 2px 0 #000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.1s;
                }
                .rpg-slot:active {
                    background: #000;
                    border-color: #333;
                }
                .rpg-slot.active {
                    border: 2px solid #ffb300;
                    background: #2a1a0a;
                    box-shadow: inset 0 0 10px #ffb300;
                }

                .rpg-btn {
                    background: #444;
                    border: 2px solid #000;
                    border-top-color: #777;
                    border-left-color: #777;
                    color: #fff;
                    font-family: 'VT323', monospace;
                    text-transform: uppercase;
                    font-size: 1.2rem;
                    cursor: pointer;
                    box-shadow: 0 4px 0 #222;
                    transition: transform 0.1s, box-shadow 0.1s;
                }
                .rpg-btn:active {
                    transform: translateY(4px);
                    box-shadow: 0 0 0 #222;
                    background: #333;
                }
                .rpg-btn-primary {
                    background: #5e35b1;
                    border-top-color: #9575cd;
                    border-left-color: #9575cd;
                    box-shadow: 0 4px 0 #311b92;
                }
                .rpg-btn-primary:active {
                    background: #4527a0;
                    box-shadow: 0 0 0 #311b92;
                }
                .rpg-btn-danger {
                    background: #c62828;
                    border-top-color: #ef5350;
                    border-left-color: #ef5350;
                    box-shadow: 0 4px 0 #8e0000;
                }
                .rpg-btn-danger:active {
                    background: #b71c1c;
                    box-shadow: 0 0 0 #8e0000;
                }

                .gold-title {
                    font-family: 'Press Start 2P', cursive;
                    background: linear-gradient(to bottom, #ffd700 0%, #ff8f00 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    filter: drop-shadow(4px 4px 0 #3e2723);
                    text-transform: uppercase;
                    line-height: 1.5;
                }

                .nav-slot {
                    background: #222;
                    border: 2px solid #555;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                .nav-slot.active {
                    background: #333;
                    border-color: #ffb300;
                }
                .nav-slot.active::after {
                    content: '';
                    position: absolute;
                    inset: 2px;
                    border: 2px solid #ffb300;
                    opacity: 0.5;
                }
                .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>

            <header className="p-6 text-center shrink-0 relative z-10">
                <h1 className="text-3xl sm:text-4xl gold-title tracking-widest">OBSIDIAN MENU</h1>
            </header>

            <main className="flex-1 overflow-y-auto px-4 pb-32 relative z-10 no-scrollbar">
                <div className="max-w-md mx-auto h-full pt-4">
                    {children}
                </div>
            </main>

            <nav className="fixed bottom-0 left-0 w-full h-20 z-50 bg-[#111] border-t-4 border-[#333] shadow-[0_-4px_0_#000]">
                <div className="flex justify-around items-center h-full px-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`nav-slot flex-1 ${activeTab === tab.id ? 'active' : ''}`}
                        >
                            <span className="text-2xl mb-1">{tab.icon}</span>
                            <span className="text-[10px] pixel-font text-gray-400">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export const MinecraftPlayScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { intensity, setIntensity, prompt, setPrompt, history, activeDeckId, setActiveDeckId, customDecks, handleDraw } = logic;
    return (
        <AnimatePresence mode="wait">
            {!intensity && !prompt ? (
                <motion.div key="play" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                    <div className="rpg-panel">
                        <div className="rpg-ribbon">SELECT WORLD</div>
                        <div className="grid grid-cols-1 gap-2 mt-2">
                            <button onClick={() => setActiveDeckId('default')} className={`rpg-slot p-3 w-full text-left justify-start gap-3 ${activeDeckId === 'default' ? 'active' : ''}`}>
                                <span className="text-2xl">🌲</span>
                                <div>
                                    <div className="text-xl leading-none text-[#ffb300]">OVERWORLD</div>
                                    <div className="text-xs text-gray-400">Standard Survival</div>
                                </div>
                            </button>
                            {customDecks.map((deck: any) => (
                                <button key={deck.id} onClick={() => setActiveDeckId(deck.id)} className={`rpg-slot p-3 w-full text-left justify-start gap-3 ${activeDeckId === deck.id ? 'active' : ''}`}>
                                    <span className="text-2xl">📦</span>
                                    <div>
                                        <div className="text-xl leading-none text-[#ffb300]">{deck.name.toUpperCase()}</div>
                                        <div className="text-xs text-gray-400">{deck.prompts.length} Items</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="rpg-panel rpg-panel-gold">
                        <div className="rpg-ribbon" style={{ background: '#ff8f00', borderColor: '#000' }}>DIFFICULTY</div>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            {STAGES.map((stage) => (
                                <button key={stage.id} onClick={() => setIntensity(stage.id)} className="rpg-slot flex-col p-2 gap-1 hover:bg-[#333]">
                                    <span className="text-2xl">{stage.icon}</span>
                                    <span className="text-sm text-center leading-none" style={{ color: stage.color }}>{stage.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ) : !prompt ? (
                <div className="flex flex-col items-center justify-center h-[60vh]">
                    <div className="rpg-panel w-full text-center space-y-6">
                        <div className="rpg-ribbon">QUEST STARTED</div>
                        <div className="py-8"><div className="text-gray-400 text-sm mb-2 pixel-font">CURRENT MODE</div><div className="text-4xl gold-title">{intensity}</div></div>
                        <div className="grid grid-cols-1 gap-4 px-4">
                            <button onClick={() => handleDraw('Truth')} className="rpg-btn rpg-btn-primary py-4 text-xl">REVEAL TRUTH</button>
                            <button onClick={() => handleDraw('Dare')} className="rpg-btn py-4 text-xl bg-[#c62828] border-top-[#ef5350] border-left-[#ef5350] shadow-[0_4px_0_#8e0000] active:shadow-none active:bg-[#b71c1c]">TAKE ACTION</button>
                        </div>
                        <button onClick={() => setIntensity(null)} className="text-xs text-gray-500 hover:text-white mt-4 underline">ABANDON QUEST</button>
                    </div>
                </div>
            ) : (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rpg-panel rpg-panel-gold mt-8">
                    <div className="rpg-ribbon" style={{ background: '#ff8f00' }}>NEW OBJECTIVE</div>
                    <div className="text-center space-y-6 mt-4">
                        <div className="flex justify-center items-center gap-2 mb-4">
                            <span className="text-2xl">{prompt.type === 'Truth' ? '📜' : '⚔️'}</span>
                            <span className="text-[#ffb300] text-xl pixel-font">QUEST #{history.length}</span>
                        </div>
                        <p className="text-2xl leading-relaxed text-white">"{prompt.text}"</p>
                        <div className="bg-[#111] p-3 border-2 border-[#333] mt-4">
                            <div className="text-[#c62828] text-xs mb-1 pixel-font uppercase">Failure Penalty</div>
                            <div className="text-gray-300">{prompt.penalty}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-6">
                            <button onClick={() => { setPrompt(null); if (prompt?.type === 'NeverHaveIEver') setIntensity(null); }} className="rpg-btn py-2">COMPLETE</button>
                            <button onClick={() => handleDraw(prompt.type)} className="rpg-btn rpg-btn-primary py-2">REROLL</button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const MinecraftDecksScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { customDecks, setEditingDeck, deleteDeck, editingDeck, generateId, saveDeck, addNewPromptToEditingDeck, updatePromptInEditingDeck, removePromptFromEditingDeck } = logic;
    return (
        <AnimatePresence mode="wait">
            {!editingDeck ? (
                <motion.div key="decks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="rpg-panel">
                        <div className="rpg-ribbon">INVENTORY</div>
                        <div className="flex justify-end mb-2">
                            <button onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })} className="rpg-btn rpg-btn-primary px-4 py-1 text-sm">+ CRAFT NEW</button>
                        </div>
                        <div className="space-y-2">
                            {customDecks.length === 0 ? <div className="text-center py-8 text-gray-500">Inventory Empty</div> :
                                customDecks.map((deck: any) => (
                                    <div key={deck.id} className="rpg-slot p-3 justify-between">
                                        <div className="flex items-center gap-3"><span className="text-2xl">📘</span><div><div className="text-[#ffb300] text-lg">{deck.name || 'Unknown Item'}</div><div className="text-xs text-gray-500">{deck.prompts.length} Cards</div></div></div>
                                        <div className="flex gap-2"><button onClick={() => setEditingDeck(deck)} className="rpg-btn px-2 py-1 text-xs">EDIT</button><button onClick={() => deleteDeck(deck.id)} className="rpg-btn rpg-btn-danger px-2 py-1 text-xs">DROP</button></div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </motion.div>
            ) : (
                <div className="rpg-panel rpg-panel-gold">
                    <div className="rpg-ribbon" style={{ background: '#ff8f00' }}>CRAFTING</div>
                    <div className="space-y-4 mt-2">
                        <div className="space-y-2"><label className="text-xs text-[#ffb300] pixel-font">ITEM NAME</label><input className="w-full bg-[#111] border-2 border-[#555] p-2 text-white outline-none focus:border-[#ffb300]" value={editingDeck.name} onChange={e => setEditingDeck({ ...editingDeck, name: e.target.value })} placeholder="Name..." /></div>
                        <div className="space-y-2"><label className="text-xs text-[#ffb300] pixel-font">LORE</label><textarea className="w-full bg-[#111] border-2 border-[#555] p-2 text-white outline-none focus:border-[#ffb300] h-20" value={editingDeck.description} onChange={e => setEditingDeck({ ...editingDeck, description: e.target.value })} placeholder="Description..." /></div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center"><label className="text-xs text-[#ffb300] pixel-font">ENCHANTMENTS ({editingDeck.prompts.length})</label><button onClick={addNewPromptToEditingDeck} className="rpg-btn px-2 py-1 text-xs">+ ADD</button></div>
                            <div className="max-h-[40vh] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                                {editingDeck.prompts.map((p: any) => (
                                    <div key={p.id} className="rpg-slot p-2 gap-2 flex-col items-stretch">
                                        <div className="flex gap-2">
                                            <select className="bg-[#222] text-white border border-[#555] text-xs p-1" value={p.type} onChange={e => updatePromptInEditingDeck(p.id, 'type', e.target.value)}><option>Truth</option><option>Dare</option></select>
                                            <input className="flex-1 bg-transparent border-b border-[#555] text-sm outline-none" value={p.text} onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)} placeholder="Effect..." />
                                            <button onClick={() => removePromptFromEditingDeck(p.id)} className="text-[#c62828] font-bold">×</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-2 pt-2"><button onClick={() => setEditingDeck(null)} className="rpg-btn flex-1 py-2">CANCEL</button><button onClick={() => saveDeck(editingDeck)} className="rpg-btn rpg-btn-primary flex-1 py-2">CRAFT</button></div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

export const MinecraftHistoryScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { history } = logic;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="rpg-panel">
                <div className="rpg-ribbon">QUEST LOG</div>
                <div className="space-y-2 mt-2">
                    {history.map((item: any, i: number) => (
                        <div key={i} className="rpg-slot p-3 justify-start gap-3 border-l-4 border-l-[#5e35b1]">
                            <div className="text-2xl">{item.type === 'Truth' ? '📜' : '⚔️'}</div>
                            <div>
                                <div className="text-gray-300 italic">"{item.text}"</div>
                                <div className="text-[10px] text-[#5e35b1] pixel-font mt-1 lowercase">Log Entry #{history.length - i}</div>
                            </div>
                        </div>
                    ))}
                    {history.length === 0 && <div className="text-center py-8 text-gray-500">Log Empty</div>}
                </div>
            </div>
        </motion.div>
    );
};

export const MinecraftThemesScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { theme, setTheme } = logic;
    const iconMap: Record<string, string> = {
        [Theme.PERSONA]: '🎭', [Theme.MINECRAFT]: '⛏️', [Theme.DANGANRONPA]: '⚖️',
        [Theme.OMORI]: '💡', [Theme.KIRBY]: '⭐', [Theme.POKEMON]: '🔴',
        [Theme.ANIMAL_CROSSING]: '🏝️', [Theme.SKYRIM]: '🐉', [Theme.SONIC]: '💨',
        [Theme.SANRIO]: '🎀', [Theme.CYBERPUNK]: '🌆', [Theme.UNDERTALE]: '❤️',
        [Theme.FALLOUT]: '☢️', [Theme.HAZBIN]: '😈', [Theme.VOCALOID]: '🎤',
        [Theme.FNAF]: '🐻', [Theme.IRUMA]: '🦇', [Theme.ARCANE]: '⚙️',
    };
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="rpg-panel rpg-panel-gold">
                <div className="rpg-ribbon" style={{ background: '#ff8f00' }}>REALM SELECT</div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                    {allThemesList.map(t => (
                        <button key={t.id} onClick={() => setTheme(t.id)} className={`rpg-slot flex-col p-4 gap-2 hover:bg-[#333] ${theme === t.id ? 'active' : ''}`}>
                            <span className="text-3xl">{iconMap[t.id] || '⭐'}</span>
                            <span className="pixel-font text-xs text-[#ffb300]">{t.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export const MinecraftSettingsScreen: React.FC<{ logic: any }> = ({ logic }) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="rpg-panel">
                <div className="rpg-ribbon">SETTINGS</div>
                <div className="space-y-4 mt-2">
                    <div className="rpg-slot p-3 justify-between"><span>RENDER DISTANCE</span><span className="text-[#ffb300]">12 CHUNKS</span></div>
                    <div className="rpg-slot p-3 justify-between"><span>DIFFICULTY</span><span className="text-[#c62828]">HARDCORE</span></div>
                    <div className="rpg-slot p-3 justify-between"><span>GRAPHICS</span><span className="text-[#55FF55]">FANCY</span></div>
                    <div className="text-center text-xs text-gray-600 mt-4 uppercase">Modpack v1.0.0</div>
                    <button onClick={() => logic.setView('menu')} className="w-full mt-4 bg-[#7f7f7f] border-2 border-b-4 border-[#3f3f3f] border-t-[#bfbfbf] border-l-[#bfbfbf] p-2 text-white font-bold text-shadow active:border-t-[#3f3f3f] active:border-l-[#3f3f3f] active:border-b-[#bfbfbf] active:border-r-[#bfbfbf] active:translate-y-1">SAVE AND QUIT TO TITLE</button>
                </div>
            </div>
        </motion.div>
    );
};

export const MinecraftMenu: React.FC<{ logic: any }> = ({ logic }) => {
    const { setView, setTheme, theme } = logic;
    const [activeSection, setActiveSection] = useState<'themes' | null>(null);
    const themes = Object.values(Theme).filter(t => t !== Theme.NONE);
    const SPLASH_TEXTS = ["AWESOME!", "BLOCKY!", "PHANTOM!", "OBSIDIAN!", "CRAFTY!", "SLEEK!"];
    const [splash, setSplash] = useState(SPLASH_TEXTS[0]);

    useEffect(() => {
        setSplash(SPLASH_TEXTS[Math.floor(Math.random() * SPLASH_TEXTS.length)]);
    }, []);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-4 bg-[#1a1a1a] font-['VT323'] text-white relative overflow-hidden select-none">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=VT323&family=Press+Start+2P&display=swap');
                .gold-title {
                    font-family: 'Press Start 2P', cursive;
                    background: linear-gradient(to bottom, #ffd700 0%, #ff8f00 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    filter: drop-shadow(4px 4px 0 #3e2723);
                    text-transform: uppercase;
                }
            `}</style>
            <div className="absolute inset-0 z-0">
                <motion.div
                    className="absolute inset-[-10%] opacity-20"
                    style={{
                        backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-linen.png"), linear-gradient(45deg, #1a1a1a 25%, #2a2a2a 25%, #2a2a2a 50%, #1a1a1a 50%, #1a1a1a 75%, #2a2a2a 75%, #2a2a2a 100%)',
                        backgroundSize: '100px 100px'
                    }}
                    animate={{ x: [-20, 20], y: [-20, 20] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
                />
            </div>

            <div className="absolute inset-0 z-0 overflow-hidden">
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white/5"
                        style={{
                            width: 160,
                            height: 40,
                            left: `${-20 + i * 30}%`,
                            top: `${10 + (i % 3) * 20}%`,
                            boxShadow: '20px 0 0 0 transparent, 40px 0 0 0 transparent, 0 20px 0 0 rgba(255,255,255,0.05)'
                        }}
                        animate={{ x: [0, 100, 0] }}
                        transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                    />
                ))}
            </div>

            <div className="z-10 flex flex-col items-center w-full max-w-sm gap-12">
                <div className="flex flex-col items-center relative">
                    <motion.h1
                        className="text-7xl sm:text-9xl font-bold tracking-widest text-white"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        style={{
                            textShadow: '8px 8px 0px #373737, 12px 12px 0px #000'
                        }}
                    >
                        MINECRAFT
                    </motion.h1>
                    <motion.div
                        className="absolute -bottom-4 -right-8 sm:-right-12 bg-transparent text-yellow-400 text-xl sm:text-2xl font-black drop-shadow-[2px_2px_0_#000] rotate-[-15deg]"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {splash}
                    </motion.div>
                </div>
                <div className="flex flex-col gap-6 w-full px-4">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setView('game')} className="relative h-16 w-full group">
                        <div className="absolute inset-0 bg-[#7c7c7c] border-t-[4px] border-l-[4px] border-[#bababa] border-b-[4px] border-r-[4px] border-[#373737] shadow-[4px_4px_0_#000]"></div>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        <span className="relative z-10 text-3xl font-bold drop-shadow-[2px_2px_0_#373737]">PLAY GAME</span>
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveSection(activeSection === 'themes' ? null : 'themes')} className="relative h-16 w-full group">
                        <div className="absolute inset-0 bg-[#7c7c7c] border-t-[4px] border-l-[4px] border-[#bababa] border-b-[4px] border-r-[4px] border-[#373737] shadow-[4px_4px_0_#000]"></div>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        <span className="relative z-10 text-3xl font-bold drop-shadow-[2px_2px_0_#373737]">THEMES</span>
                    </motion.button>
                    <AnimatePresence>
                        {activeSection === 'themes' && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-[#373737] border-4 border-[#1e1e1e] p-4 flex flex-col gap-2 shadow-[8px_8px_0_#000]">
                                <div className="text-[10px] text-yellow-400 mb-2 tracking-widest uppercase pixel-font">Select World</div>
                                <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto no-scrollbar">
                                    {themes.map(t => (
                                        <button key={t} onClick={() => setTheme(t)} className={`p-2 text-left text-sm border-2 transition-colors uppercase ${theme === t ? 'border-[#55FF55] bg-[#1e1e1e] text-[#55FF55]' : 'border-transparent hover:bg-[#1e1e1e]'}`}>{t}</button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <div className="absolute bottom-6 right-6 text-[10px] opacity-30">
                Minecraft 1.21-PHANTOM
            </div>
        </div>
    );
};

export const MinecraftTheme: ThemeDefinition = {
    id: Theme.MINECRAFT,
    name: 'Minecraft',
    cssVars: {
        '--theme-accent': '#55FF55',
    },
    MenuComponent: MinecraftMenu,
    LayoutComponent: MinecraftLayout,
    PlayScreen: MinecraftPlayScreen,
    DecksScreen: MinecraftDecksScreen,
    HistoryScreen: MinecraftHistoryScreen,
    SettingsScreen: MinecraftSettingsScreen,
    ThemesScreen: MinecraftThemesScreen,
    tabLabels: {
        play: 'PLAY',
        decks: 'DECKS',
        history: 'LOGS',
        themes: 'WORLD',
        settings: 'OPTS'
    }
};
