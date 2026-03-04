import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme, ThemeDefinition, GameMode } from '../types';
import { allThemesList } from './allThemesList';
import { DeckCarousel } from '../components/DeckCarousel';
import { DeckSearchModal } from '../components/DeckSearchModal';

const STAGES = [
    { id: Intensity.SOFT, title: 'NOVICE', desc: 'Apprentice Level', color: '#FFFFFF', text: '#FFFFFF' },
    { id: Intensity.HOT, title: 'ADEPT', desc: 'Expert Level', color: '#FFD700', text: '#FFFFFF' },
    { id: Intensity.VULGAR, title: 'MASTER', desc: 'Legendary Level', color: '#FF4500', text: '#FFFFFF' },
];

export const SkyrimLayout: React.FC<{ children: React.ReactNode; activeTab: string; setActiveTab: (tab: string) => void; logic: any }> = ({ children, activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'play', label: 'QUESTS', icon: '⚔️' },
        { id: 'decks', label: 'ITEMS', icon: '🎒' },
        { id: 'history', label: 'MAGIC', icon: '✨' },
        { id: 'themes', label: 'MAP', icon: '🗺️' },
        { id: 'settings', label: 'SYSTEM', icon: '⚙️' },
    ];

    return (
        <div className="skyrim-theme h-[100dvh] w-screen flex flex-col bg-black text-white overflow-hidden font-['Josefin_Sans'] relative">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Josefin+Sans:wght@300;400;600&display=swap');
                .skyrim-theme { font-family: 'Josefin Sans', sans-serif; background: #0a0a0a; }
                .skyrim-font-title { font-family: 'Cinzel', serif; }
                .skyrim-smoke { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at 50% 50%, rgba(20, 30, 40, 0.8), rgba(0, 0, 0, 1)), url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E"); z-index: 0; }
                .compass-marker { width: 2px; height: 8px; background: rgba(255,255,255,0.3); }
                .skyrim-btn { background: transparent; color: #ccc; text-align: left; padding: 12px 24px; font-size: 1.2rem; font-weight: 300; text-transform: uppercase; letter-spacing: 2px; transition: all 0.2s; position: relative; }
                .skyrim-btn:hover, .skyrim-btn.active { color: #fff; text-shadow: 0 0 10px rgba(255,255,255,0.5); }
                .skyrim-btn.active::before { content: '◆'; position: absolute; left: 8px; top: 50%; transform: translateY(-50%); font-size: 0.8rem; color: #fff; }
                .skyrim-panel { background: rgba(0, 0, 0, 0.6); border-top: 2px solid rgba(255,255,255,0.1); border-bottom: 2px solid rgba(255,255,255,0.1); backdrop-filter: blur(4px); }
                .skyrim-input { background: transparent; border: none; border-bottom: 1px solid rgba(255,255,255,0.3); color: white; font-family: 'Josefin Sans', sans-serif; font-size: 1.2rem; padding: 8px; width: 100%; outline: none; }
                .quest-marker { width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 10px solid white; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); }
            `}</style>
            <div className="skyrim-smoke"></div>
            <header className="p-4 relative z-10 flex flex-col items-center">
                <div className="w-full max-w-lg h-8 border-b border-white/20 flex justify-between items-end px-4 mb-2">
                    <span className="text-xs tracking-widest opacity-50">W</span>
                    <div className="flex gap-8">
                        <div className="compass-marker h-3"></div>
                        <div className="compass-marker h-2"></div>
                        <div className="compass-marker h-3"></div>
                    </div>
                    <div className="quest-marker mb-[-5px]"></div>
                    <div className="flex gap-8">
                        <div className="compass-marker h-3"></div>
                        <div className="compass-marker h-2"></div>
                        <div className="compass-marker h-3"></div>
                    </div>
                    <span className="text-xs tracking-widest opacity-50">E</span>
                </div>
                <h1 className="skyrim-font-title text-2xl tracking-[4px] text-white/90 drop-shadow-lg border-b border-white/10 pb-1 px-8">SKYRIM</h1>
            </header>
            <main className="flex-1 overflow-y-auto px-4 pb-24 relative z-10 custom-scrollbar">
                <div className="max-w-2xl mx-auto h-full pt-4 flex flex-col">{children}</div>
            </main>
            <nav className="fixed bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent z-50 flex justify-center items-center border-t border-white/10">
                <div className="flex gap-8 sm:gap-12">
                    {tabs.map((tab) => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`text-[10px] sm:text-xs uppercase tracking-widest transition-all ${activeTab === tab.id ? 'text-white font-bold scale-110 drop-shadow-[0_0_5px_white]' : 'text-white/50 hover:text-white/80'}`}>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export const SkyrimPlayScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { intensity, setIntensity, prompt, setPrompt, history, activeDeckId, setActiveDeckId, customDecks, handleDraw, setGameMode, gameMode } = logic;
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <AnimatePresence mode="wait">
            {!intensity && !prompt ? (
                <motion.div key="play" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex items-center justify-center">
                    <div className="skyrim-panel p-6 min-h-[400px] w-full max-w-md flex flex-col border-r-2 border-l-2 border-white/10">
                        <h2 className="skyrim-font-title text-2xl text-white/70 mb-8 text-center tracking-[4px]">SELECT DIFFICULTY</h2>
                        <div className="flex-1 flex flex-col justify-center gap-6">
                            {STAGES.map((stage) => (
                                <button key={stage.id} onClick={() => setIntensity(stage.id)} className="group flex items-center justify-between p-4 hover:bg-white/5 transition-colors border border-white/5">
                                    <div className="flex flex-col text-left">
                                        <span className="skyrim-font-title text-xl group-hover:text-yellow-100 transition-colors uppercase tracking-widest">{stage.title}</span>
                                        <span className="text-xs uppercase tracking-[2px] opacity-60 font-light mt-1">{stage.desc}</span>
                                    </div>
                                    <div className="w-3 h-3 border border-white/50 rotate-45 group-hover:bg-white transition-all group-hover:shadow-[0_0_10px_white]"></div>
                                </button>
                            ))}
                        </div>
                        <div className="mt-8 pt-4 border-t border-white/10 text-center">
                            <p className="text-sm italic opacity-40 uppercase tracking-widest">"Choose your path, Dragonborn."</p>
                        </div>
                    </div>
                </motion.div>
            ) : !prompt ? (
                <div className="flex-1 flex flex-col items-center justify-center relative min-h-[60vh] space-y-8">
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                        <svg viewBox="0 0 100 100" className="w-[500px] h-[500px] animate-spin-slow">
                            <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="none" stroke="white" strokeWidth="0.5" />
                            <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="0.5" />
                        </svg>
                    </div>

                    <div className="w-full max-w-md bg-black/40 backdrop-blur-sm p-4 border-y border-white/10 relative z-20">
                        <div className="flex justify-between items-center mb-4 px-2">
                            <span className="skyrim-font-title text-xs tracking-[2px] opacity-60 uppercase">Select Quest Item</span>
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="text-white/40 hover:text-white transition-colors"
                            >
                                🔍
                            </button>
                        </div>
                        <DeckCarousel
                            decks={customDecks.filter(d => d.intensity === intensity)}
                            activeDeckId={activeDeckId}
                            onSelect={(id) => {
                                const deck = customDecks.find(d => d.id === id);
                                if (deck) setGameMode(deck.gameMode);
                                setActiveDeckId(id);
                            }}
                            accentColor="#FFD700"
                        />
                    </div>

                    <div className="text-center relative z-20">
                        <h2 className="skyrim-font-title text-4xl mb-2 tracking-[8px] text-white/90">{intensity}</h2>
                        <div className="w-48 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"></div>
                    </div>

                    <div className="flex gap-16 relative z-20">
                        {gameMode === GameMode.NEVER_HAVE_I_EVER ? (
                            <button onClick={() => handleDraw('NeverHaveIEver')} className="group flex flex-col items-center gap-2">
                                <div className="w-20 h-20 border border-white/30 rotate-45 flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all">
                                    <span className="text-3xl -rotate-45">🤫</span>
                                </div>
                                <span className="skyrim-font-title text-sm tracking-[3px] mt-6 group-hover:text-yellow-100 transition-colors uppercase">CONFESS</span>
                            </button>
                        ) : (
                            <>
                                <button onClick={() => handleDraw('Truth')} className="group flex flex-col items-center gap-2">
                                    <div className="w-20 h-20 border border-white/30 rotate-45 flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all">
                                        <span className="text-3xl -rotate-45">👁️</span>
                                    </div>
                                    <span className="skyrim-font-title text-sm tracking-[3px] mt-6 group-hover:text-yellow-100 transition-colors uppercase">TRUTH</span>
                                </button>
                                <button onClick={() => handleDraw('Dare')} className="group flex flex-col items-center gap-2">
                                    <div className="w-20 h-20 border border-white/30 rotate-45 flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all">
                                        <span className="text-3xl -rotate-45">⚔️</span>
                                    </div>
                                    <span className="skyrim-font-title text-sm tracking-[3px] mt-6 group-hover:text-yellow-100 transition-colors uppercase">DARE</span>
                                </button>
                            </>
                        )}
                    </div>

                    <button onClick={() => setIntensity(null)} className="mt-12 text-[10px] uppercase tracking-[4px] opacity-40 hover:opacity-100 hover:text-yellow-100 transition-all relative z-20 border-b border-transparent hover:border-yellow-100/30 pb-1">
                        [ TAB ] RETURN TO WORLD
                    </button>

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
                </div>
            ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full min-h-[50vh]">
                    <div className="w-full border-t-2 border-b-2 border-white/20 bg-black/80 backdrop-blur-md p-8 relative">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black px-4"><span className="skyrim-font-title text-yellow-100 tracking-widest text-sm border border-white/20 px-2 py-1">QUEST STARTED</span></div>
                        <div className="text-center space-y-6">
                            <h3 className="skyrim-font-title text-2xl text-white tracking-wide border-b border-white/10 pb-4">{prompt.type}</h3>
                            <p className="text-xl font-light leading-relaxed">"{prompt.text}"</p>
                            <div className="flex items-center justify-center gap-4 text-sm opacity-70 pt-4"><span className="uppercase tracking-widest text-xs">Objective:</span><span className="italic text-red-300">{prompt.penalty}</span></div>
                        </div>
                    </div>
                    <div className="flex gap-8 mt-8"><button onClick={() => { setPrompt(null); if (prompt?.type === 'NeverHaveIEver') setIntensity(null); }} className="skyrim-btn text-sm border border-white/20 hover:bg-white/10">COMPLETE</button><button onClick={() => handleDraw(prompt.type)} className="skyrim-btn text-sm border border-white/20 hover:bg-white/10">REROLL</button></div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const SkyrimDecksScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { customDecks, setEditingDeck, deleteDeck, editingDeck, generateId, saveDeck, addNewPromptToEditingDeck, updatePromptInEditingDeck, removePromptFromEditingDeck, activeDeckId, setActiveDeckId } = logic;
    return (
        <AnimatePresence mode="wait">
            {!editingDeck ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
                    <div className="md:col-span-1 border-r border-white/10 pr-4">
                        <h2 className="skyrim-font-title text-2xl mb-6 px-4">INVENTORY</h2>
                        <div className="flex flex-col">
                            <button onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true, intensity: logic.intensity || Intensity.SOFT, gameMode: logic.gameMode || GameMode.TRUTH_OR_DARE })} className="skyrim-btn text-yellow-100">+ CRAFT NEW ITEM</button>
                            <div className="h-px bg-white/20 my-2 mx-4"></div>
                            {customDecks.length === 0 ? (
                                <div className="px-4 py-8 text-white/20 italic text-sm text-center">Your pack is empty...</div>
                            ) : (
                                customDecks.map((deck: any) => (
                                    <div key={deck.id} className={`flex justify-between items-center pr-4 group transition-colors ${activeDeckId === deck.id ? 'bg-white/5' : ''}`}>
                                        <button onClick={() => setEditingDeck(deck)} className="skyrim-btn flex-1 truncate py-2">
                                            {activeDeckId === deck.id && <span className="mr-2">◆</span>}
                                            {deck.name || 'Iron Dagger'}
                                        </button>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setActiveDeckId(deck.id)}
                                                className={`text-[10px] uppercase tracking-tighter transition-all ${activeDeckId === deck.id ? 'text-yellow-100 font-bold' : 'opacity-30 hover:opacity-100'}`}
                                            >
                                                {activeDeckId === deck.id ? 'EQUIPPED' : 'EQUIP'}
                                            </button>
                                            <button onClick={() => deleteDeck(deck.id)} className="opacity-0 group-hover:opacity-30 hover:!opacity-100 text-[10px] uppercase tracking-tighter text-red-300">DROP</button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    <div className="hidden md:flex md:col-span-2 items-center justify-center opacity-30">
                        <div className="text-center">
                            <div className="text-6xl mb-4">{activeDeckId ? '🌟' : '🎒'}</div>
                            <p className="skyrim-font-title tracking-widest uppercase text-sm">
                                {activeDeckId ? 'Item Equipped & Ready' : 'Select an item to inspect'}
                            </p>
                            {activeDeckId && (
                                <p className="text-[10px] opacity-50 mt-2 uppercase tracking-[2px]">
                                    {customDecks.find(d => d.id === activeDeckId)?.name}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="max-w-xl mx-auto space-y-8 pb-12">
                    <div className="border-b border-white/20 pb-4 flex justify-between items-end">
                        <h2 className="skyrim-font-title text-3xl uppercase tracking-widest">Enchanting</h2>
                        <span className="text-[10px] tracking-[4px] opacity-40 uppercase">Arcane Enchanter</span>
                    </div>
                    <div className="space-y-6">
                        <div className="group">
                            <label className="text-[10px] uppercase tracking-[3px] opacity-40 block mb-2 group-focus-within:opacity-100 transition-opacity">Soul Label</label>
                            <input className="skyrim-input text-xl border-white/10 focus:border-white/40 transition-colors" value={editingDeck.name} onChange={e => setEditingDeck({ ...editingDeck, name: e.target.value })} placeholder="Name your creation..." />
                        </div>
                        <div className="group">
                            <label className="text-[10px] uppercase tracking-[3px] opacity-40 block mb-2 group-focus-within:opacity-100 transition-opacity">Item Lore</label>
                            <textarea className="skyrim-input text-sm h-16 resize-none border-white/10 focus:border-white/40 transition-colors" value={editingDeck.description} onChange={e => setEditingDeck({ ...editingDeck, description: e.target.value })} placeholder="Describe the ancient power..." />
                        </div>
                        <div className="flex gap-8">
                            <div className="flex-1 group">
                                <label className="text-[10px] uppercase tracking-[3px] opacity-40 block mb-2">Nature</label>
                                <select value={editingDeck.gameMode} onChange={e => setEditingDeck({ ...editingDeck, gameMode: e.target.value as any })} className="skyrim-input text-sm w-full bg-[#0a0a0a] border-white/10 cursor-pointer">
                                    <option value="TruthOrDare">ADVENTURE (T/D)</option>
                                    <option value="NeverHaveIEver">NHIE</option>
                                </select>
                            </div>
                            <div className="flex-1 group">
                                <label className="text-[10px] uppercase tracking-[3px] opacity-40 block mb-2">Magnitude</label>
                                <select value={editingDeck.intensity} onChange={e => setEditingDeck({ ...editingDeck, intensity: e.target.value as any })} className="skyrim-input text-sm w-full bg-[#0a0a0a] border-white/10 cursor-pointer">
                                    <option value="SOFT">NOVICE</option>
                                    <option value="HOT">ADEPT</option>
                                    <option value="VULGAR">MASTER</option>
                                </select>
                            </div>
                        </div>
                        <div className="pt-4">
                            <div className="flex justify-between items-center mb-6">
                                <label className="text-[10px] uppercase tracking-[4px] opacity-40">Active Enchants ({editingDeck.prompts.length})</label>
                                <button onClick={addNewPromptToEditingDeck} className="text-[10px] uppercase tracking-[3px] hover:text-yellow-100 border border-white/10 hover:border-white/40 px-4 py-2 transition-all">+ Add Enchant</button>
                            </div>
                            <div className="max-h-[35vh] overflow-y-auto custom-scrollbar space-y-3 pr-2">
                                {editingDeck.prompts.map((p: any) => (
                                    <div key={p.id} className="bg-white/[0.02] p-4 flex flex-col gap-3 border border-white/5 hover:border-white/20 transition-colors group">
                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-4">
                                                <select
                                                    className="bg-black border border-white/20 text-[10px] uppercase tracking-widest p-1 outline-none focus:border-yellow-200/50"
                                                    value={p.type}
                                                    onChange={e => updatePromptInEditingDeck(p.id, 'type', e.target.value as any)}
                                                >
                                                    {editingDeck.gameMode === GameMode.TRUTH_OR_DARE ? (
                                                        <><option value="Truth">TRUTH</option><option value="Dare">DARE</option></>
                                                    ) : (
                                                        <option value="NeverHaveIEver">NHIE</option>
                                                    )}
                                                </select>
                                                <div className="text-[9px] uppercase tracking-[2px] opacity-30 flex items-center px-3 border-l border-white/10">{editingDeck.intensity} MAGNITUDE</div>
                                            </div>
                                            <button onClick={() => removePromptFromEditingDeck(p.id)} className="text-xs opacity-30 hover:opacity-100 hover:text-red-400 p-1 transition-all">✕</button>
                                        </div>
                                        <textarea
                                            className="bg-transparent border-b border-white/5 flex-1 text-sm outline-none focus:border-white/30 py-1 transition-all resize-none italic"
                                            value={p.text}
                                            onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)}
                                            placeholder="The enchantment speaks..."
                                            rows={2}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center pt-8 border-t border-white/10">
                        <button onClick={() => setEditingDeck(null)} className="text-[10px] uppercase tracking-[4px] opacity-50 hover:opacity-100 transition-opacity italic">[ ESC ] CANCEL</button>
                        <button onClick={() => saveDeck(editingDeck)} className="skyrim-btn !text-sm border border-white/20 hover:bg-white/5 !px-8 hover:text-yellow-100">CRAFT ITEM</button>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

export const SkyrimHistoryScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { history } = logic;
    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="skyrim-font-title text-2xl mb-6 border-b border-white/20 pb-2">COMPLETED QUESTS</h2>
            <div className="space-y-4">
                {history.map((item: any, i: number) => (
                    <div key={i} className="flex gap-4 items-start opacity-80 hover:opacity-100 transition-opacity">
                        <div className="mt-1 w-2 h-2 bg-white/50 rotate-45 shrink-0"></div>
                        <div><p className="text-lg font-light">"{item.text}"</p><div className="flex gap-4 mt-1"><span className="text-xs uppercase tracking-widest opacity-50">{item.type}</span><span className="text-xs uppercase tracking-widest opacity-50">Level {history.length - i}</span></div></div>
                    </div>
                ))}
                {history.length === 0 && <div className="text-center py-12 opacity-30 italic">No quests completed yet.</div>}
            </div>
        </div>
    );
};

export const SkyrimThemesScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setTheme, theme } = logic;
    return (
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="skyrim-font-title text-3xl mb-12">WORLD MAP</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                {allThemesList.map(t => (
                    <button key={t.id} onClick={() => setTheme(t.id)} className={`group relative p-6 border border-white/10 hover:border-white/50 transition-all ${theme === t.id ? 'bg-white/10 border-white' : ''}`}>
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black px-2"><div className="w-2 h-2 bg-white rotate-45 group-hover:bg-yellow-100 transition-colors"></div></div>
                        <span className="skyrim-font-title text-xl tracking-widest group-hover:text-yellow-100 transition-colors">{t.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export const SkyrimSettingsScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setView } = logic;
    return (
        <div className="max-w-xl mx-auto">
            <h2 className="skyrim-font-title text-2xl mb-6 border-b border-white/20 pb-2">SYSTEM</h2>
            <div className="space-y-1">
                <div className="flex justify-between items-center py-3 hover:bg-white/5 px-2 cursor-pointer group"><span className="skyrim-font-title text-lg group-hover:text-yellow-100">SAVE GAME</span><span className="text-xs uppercase tracking-widest opacity-50">Auto-save on</span></div>
                <div className="flex justify-between items-center py-3 hover:bg-white/5 px-2 cursor-pointer group"><span className="skyrim-font-title text-lg group-hover:text-yellow-100">LOAD GAME</span><span className="text-xs uppercase tracking-widest opacity-50">No saves found</span></div>
                <button onClick={() => setView('menu')} className="w-full flex justify-between items-center py-3 hover:bg-white/5 px-2 cursor-pointer group text-left"><span className="skyrim-font-title text-lg group-hover:text-yellow-100">QUIT</span><span className="text-xs uppercase tracking-widest opacity-50">To Main Menu</span></button>
            </div>
        </div>
    );
};

export const SkyrimMenu: React.FC<{ logic: any }> = ({ logic }) => {
    const { setView, setTheme } = logic;
    const [activeSection, setActiveSection] = useState<'themes' | null>(null);
    const themes = Object.values(Theme).filter(t => t !== Theme.NONE);
    const [fogElements, setFogElements] = useState<{ id: number, width: number, height: number, left: string, top: string, duration: number }[]>([]);

    useEffect(() => {
        setFogElements([...Array(5)].map((_, i) => ({
            id: i,
            width: 300 + Math.random() * 300,
            height: 200 + Math.random() * 200,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: 15 + i * 5
        })));
    }, []);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-[#0a0a0a] font-serif text-[#c0c0c0] relative overflow-hidden select-none">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Josefin+Sans:wght@300;400;600&display=swap');
                .skyrim-font-title { font-family: 'Cinzel', serif; }
            `}</style>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #000 100%)' }}></div>
            <div className="absolute inset-0 pointer-events-none">
                {fogElements.map((fog) => (
                    <motion.div key={fog.id} className="absolute bg-white/5 blur-3xl rounded-full" style={{ width: fog.width, height: fog.height, left: fog.left, top: fog.top }} animate={{ x: [0, 100, -100, 0], y: [0, 50, -50, 0], opacity: [0.05, 0.1, 0.05] }} transition={{ duration: fog.duration, repeat: Infinity, ease: "linear" }} />
                ))}
            </div>
            <div className="z-10 flex flex-col items-center gap-16">
                <motion.h1 className="text-7xl sm:text-8xl font-light tracking-[0.3em] uppercase text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] skyrim-font-title" animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: 5, repeat: Infinity }}>SKYRIM</motion.h1>
                <div className="flex flex-col gap-8 w-80">
                    <button onClick={() => setView('game')} className="border-y border-white/20 py-4 text-3xl tracking-[0.2em] hover:text-white hover:bg-white/5 transition-all uppercase skyrim-font-title">NEW GAME</button>
                    <button onClick={() => setActiveSection(activeSection === 'themes' ? null : 'themes')} className="border-y border-white/20 py-4 text-3xl tracking-[0.2em] hover:text-white hover:bg-white/5 transition-all uppercase skyrim-font-title">WORLD MAP</button>
                </div>
                <AnimatePresence>
                    {activeSection === 'themes' && (
                        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="grid grid-cols-2 gap-4 bg-black/90 backdrop-blur-md p-8 border-y border-white/20 w-full max-w-2xl max-h-48 overflow-y-auto custom-scrollbar">
                            {themes.map(t => <button key={t} onClick={() => setTheme(t)} className="text-sm tracking-widest hover:text-white uppercase transition-colors skyrim-font-title">{t.toUpperCase()}</button>)}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export const SkyrimTheme: ThemeDefinition = {
    id: Theme.SKYRIM,
    name: 'Skyrim',
    cssVars: {
        '--theme-accent': '#fff',
    },
    MenuComponent: SkyrimMenu,
    LayoutComponent: SkyrimLayout,
    PlayScreen: SkyrimPlayScreen,
    DecksScreen: SkyrimDecksScreen,
    HistoryScreen: SkyrimHistoryScreen,
    SettingsScreen: SkyrimSettingsScreen,
    ThemesScreen: SkyrimThemesScreen,
    tabLabels: {
        play: 'QUESTS',
        decks: 'ITEMS',
        history: 'MAGIC',
        themes: 'MAP',
        settings: 'SYSTEM'
    }
};
