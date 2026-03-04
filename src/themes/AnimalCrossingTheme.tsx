import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme, ThemeDefinition, GameMode, PromptType } from '../types';
import { allThemesList } from './allThemesList';
import { DeckCarousel } from '../components/DeckCarousel';
import { DeckSearchModal } from '../components/DeckSearchModal';

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
    const { intensity, setIntensity, prompt, setPrompt, history, activeDeckId, setActiveDeckId, customDecks, handleDraw, setGameMode } = logic;
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    return (
        <AnimatePresence mode="wait">
            {!intensity && !prompt ? (
                <motion.div key="play" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                        {STAGES.map((stage) => (
                            <button key={stage.id} onClick={() => { setIntensity(stage.id); setGameMode(GameMode.TRUTH_OR_DARE); }} className="ac-card flex items-center justify-between p-4 hover:scale-105 transition-transform" style={{ backgroundColor: stage.color }}>
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
                <div className="flex flex-col items-center justify-start min-h-[60vh] relative pt-4">
                    <div className="w-full mb-6">
                        <div className="flex justify-between items-center mb-2 px-2">
                            <h3 className="text-sm font-black text-[#5D4037] uppercase tracking-widest">Selected Nest</h3>
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="w-8 h-8 rounded-full bg-white border-2 border-[#81D4FA] flex items-center justify-center shadow-sm"
                            >
                                🔍
                            </button>
                        </div>
                        <DeckCarousel
                            decks={customDecks.filter(d => d.intensity === intensity)}
                            activeDeckId={activeDeckId}
                            onSelect={(id) => {
                                const deck = customDecks.find(d => d.id === id);
                                if (deck) logic.setGameMode(deck.gameMode);
                                setActiveDeckId(id);
                            }}
                            accentColor="#81D4FA"
                        />
                    </div>

                    <div className="ac-bubble w-full text-center mb-8">
                        <p className="text-lg font-bold text-[#00BCD4] mb-1">Tom Nook says:</p>
                        <p className="text-sm text-[#5D4037]">"Level: {intensity}. Choose your fate, yes, yes!"</p>
                    </div>

                    <div className="flex gap-4 w-full px-4 mb-4">
                        {logic.gameMode === GameMode.NEVER_HAVE_I_EVER ? (
                            <button onClick={() => handleDraw('NeverHaveIEver')} className="flex-1 ac-btn bg-[#FF7043] text-white border-[#FFCCBC]">NEVER HAVE I EVER</button>
                        ) : (
                            <>
                                <button onClick={() => handleDraw('Truth')} className="flex-1 ac-btn bg-[#4DD0E1] text-white border-[#B2EBF2]">TRUTH</button>
                                <button onClick={() => handleDraw('Dare')} className="flex-1 ac-btn bg-[#FF7043] text-white border-[#FFCCBC]">DARE</button>
                            </>
                        )}
                    </div>
                    <button onClick={() => setIntensity(null)} className="text-sm font-bold text-white bg-[#8D6E63] px-4 py-2 rounded-full shadow-sm hover:bg-[#795548]">Back to Island</button>

                    <DeckSearchModal
                        isOpen={isSearchOpen}
                        onClose={() => setIsSearchOpen(false)}
                        decks={customDecks}
                        activeDeckId={activeDeckId}
                        onSelect={(id) => {
                            const deck = customDecks.find(d => d.id === id);
                            if (deck) {
                                logic.setGameMode(deck.gameMode);
                                logic.setIntensity(deck.intensity);
                            }
                            setActiveDeckId(id);
                        }}
                        gameMode={logic.gameMode}
                        intensity={intensity}
                    />
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
                        <button onClick={() => { setPrompt(null); if (prompt?.type === 'NeverHaveIEver') setIntensity(null); }} className="flex-1 ac-btn bg-[#AED581] text-white border-[#DCEDC8]">Done!</button>
                        <button onClick={() => handleDraw(prompt.type)} className="flex-1 ac-btn bg-[#4DB6AC] text-white border-[#B2DFDB]">Again!</button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const AnimalCrossingDecksScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { customDecks, setEditingDeck, deleteDeck, editingDeck, generateId, saveDeck, addNewPromptToEditingDeck, updatePromptInEditingDeck, removePromptFromEditingDeck, activeDeckId, setActiveDeckId } = logic;
    return (
        <AnimatePresence mode="wait">
            {!editingDeck ? (
                <motion.div key="decks" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
                    <div className="ac-panel p-4 bg-[#FFF3E0]">
                        <div className="flex justify-between items-center mb-4 border-b-2 border-white pb-2">
                            <h2 className="text-xl font-bold text-[#E65100]">DIY Recipes</h2>
                            <button onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true, intensity: logic.intensity || Intensity.SOFT, gameMode: logic.gameMode || GameMode.TRUTH_OR_DARE })} className="bg-[#FFB74D] text-white px-4 py-2 rounded-full text-sm font-bold shadow-sm border-2 border-white hover:scale-105 active:scale-95 transition-all">
                                + Create
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {customDecks.length === 0 ? (
                                <div className="col-span-2 py-12 text-center text-[#E65100]/30 font-bold italic">No recipes in your book...</div>
                            ) : (
                                customDecks.map((deck: any) => (
                                    <div key={deck.id} className={`ac-card flex flex-col items-center text-center gap-2 hover:scale-105 transition-transform cursor-pointer relative ${activeDeckId === deck.id ? 'ring-4 ring-[#81D4FA] bg-[#E1F5FE]' : ''}`} onClick={() => setEditingDeck(deck)}>
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-inner ${activeDeckId === deck.id ? 'bg-[#81D4FA] text-white' : 'bg-[#FFE0B2]'}`}>
                                            {activeDeckId === deck.id ? '✨' : '📜'}
                                        </div>
                                        <div className="w-full">
                                            <div className="font-bold text-sm truncate px-2 text-[#5D4037]">{deck.name || 'Untitled'}</div>
                                            <div className="text-[9px] font-black text-[#E65100] uppercase opacity-50">{deck.prompts.length} ITEMS | {deck.intensity}</div>
                                        </div>
                                        <div className="flex gap-2 mt-1">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setActiveDeckId(deck.id); }}
                                                className={`px-3 py-1 rounded-full text-[9px] font-black border-2 transition-all ${activeDeckId === deck.id ? 'bg-[#81D4FA] text-white border-white' : 'bg-white text-[#81D4FA] border-[#81D4FA]/20'}`}
                                            >
                                                {activeDeckId === deck.id ? 'READY' : 'LOAD'}
                                            </button>
                                            <button onClick={(e) => { e.stopPropagation(); deleteDeck(deck.id); }} className="w-6 h-6 rounded-full bg-red-100 text-red-400 flex items-center justify-center text-xs font-black border-2 border-white">×</button>
                                        </div>
                                        {activeDeckId === deck.id && <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center text-sm shadow-sm rotate-12">⭐</div>}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </motion.div>
            ) : (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="ac-panel p-6 space-y-4 bg-[#FFF3E0] relative border-white">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#FFB74D] rounded-full border-4 border-white flex items-center justify-center text-2xl shadow-md rotate-[-15deg]">🔨</div>
                    <div className="text-center mb-2"><h2 className="text-xl font-bold text-[#E65100] uppercase tracking-widest">Crafting Table</h2></div>

                    <div className="space-y-4">
                        <div className="group">
                            <label className="text-[10px] font-black text-[#E65100] opacity-40 pl-2 uppercase tracking-tighter">Recipe Title</label>
                            <input className="w-full bg-white rounded-2xl p-4 font-bold text-[#5D4037] outline-none shadow-sm border-4 border-transparent focus:border-[#FFE0B2] transition-colors" value={editingDeck.name} onChange={e => setEditingDeck({ ...editingDeck, name: e.target.value })} placeholder="Enter signature name..." />
                        </div>
                        <div className="group">
                            <label className="text-[10px] font-black text-[#E65100] opacity-40 pl-2 uppercase tracking-tighter">Project Notes</label>
                            <textarea className="w-full bg-white rounded-2xl p-4 text-sm font-bold text-[#5D4037] h-24 outline-none shadow-sm resize-none border-4 border-transparent focus:border-[#FFE0B2] transition-colors" value={editingDeck.description} onChange={e => setEditingDeck({ ...editingDeck, description: e.target.value })} placeholder="What's this recipe for?" />
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-[10px] font-black text-[#E65100] opacity-40 pl-2 uppercase tracking-tighter">Mode</label>
                                <select value={editingDeck.gameMode} onChange={e => setEditingDeck({ ...editingDeck, gameMode: e.target.value as any })} className="w-full bg-white rounded-2xl p-3 text-sm font-bold text-[#E65100] outline-none shadow-sm border-4 border-white cursor-pointer">
                                    <option value="TruthOrDare">ISLAND LIFE (T/D)</option>
                                    <option value="NeverHaveIEver">CONFESSIONS</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="text-[10px] font-black text-[#E65100] opacity-40 pl-2 uppercase tracking-tighter">Spiciness</label>
                                <select value={editingDeck.intensity} onChange={e => setEditingDeck({ ...editingDeck, intensity: e.target.value as any })} className="w-full bg-white rounded-2xl p-3 text-sm font-bold text-[#E65100] outline-none shadow-sm border-4 border-white cursor-pointer">
                                    <option value="SOFT">DAILY TASK</option>
                                    <option value="HOT">EXCITING</option>
                                    <option value="VULGAR">DANGEROUS</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t-4 border-white/50">
                        <div className="flex justify-between items-center px-1">
                            <span className="font-bold text-[#E65100] text-sm uppercase">Materials ({editingDeck.prompts.length})</span>
                            <button onClick={addNewPromptToEditingDeck} className="bg-[#8BC34A] text-white text-xs font-black px-4 py-2 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all">+ Add Item</button>
                        </div>
                        <div className="max-h-[35vh] overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                            {editingDeck.prompts.map((p: any) => (
                                <div key={p.id} className="bg-white rounded-[20px] p-4 space-y-3 shadow-sm border-2 border-white group relative">
                                    <div className="flex items-center gap-3">
                                        <select
                                            className="bg-[#F1F8E9] text-[#689F38] text-[10px] font-black rounded-lg px-3 py-1.5 outline-none border-2 border-transparent focus:border-[#C5E1A5] transition-all"
                                            value={p.type}
                                            onChange={e => updatePromptInEditingDeck(p.id, 'type', e.target.value as any)}
                                        >
                                            {editingDeck.gameMode === GameMode.TRUTH_OR_DARE ? (
                                                <><option value="Truth">TRUTH</option><option value="Dare">DARE</option></>
                                            ) : (
                                                <option value="NeverHaveIEver">NHIE</option>
                                            )}
                                        </select>
                                        <div className="bg-[#FFF8E1] text-[#FFB300] text-[9px] font-black rounded-lg px-2 py-1 flex items-center justify-center opacity-70 border border-[#FFE082]/30 uppercase">{editingDeck.intensity}</div>
                                        <button onClick={() => removePromptFromEditingDeck(p.id)} className="text-red-300 font-black text-xl hover:text-red-500 transition-colors ml-auto leading-none">×</button>
                                    </div>
                                    <textarea
                                        className="w-full text-sm font-bold text-[#5D4037] outline-none px-2 bg-transparent border-b-2 border-dashed border-[#FFE0B2] focus:border-[#FFB74D] py-1 resize-none"
                                        value={p.text}
                                        onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)}
                                        placeholder="Type the material effect..."
                                        rows={1}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                        <button onClick={() => setEditingDeck(null)} className="flex-1 bg-white text-[#BCAAA4] font-bold py-4 rounded-2xl shadow-sm border-2 border-[#BCAAA4]/20 hover:bg-[#F5F5F5] transition-colors uppercase text-sm">Cancel</button>
                        <button onClick={() => saveDeck(editingDeck)} className="flex-1 bg-[#FFB74D] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#FFB74D]/20 border-b-4 border-[#E65100]/30 hover:brightness-105 active:translate-y-1 transition-all uppercase text-sm tracking-widest">Learn DIY!</button>
                    </div>
                </motion.div>
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
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="ac-panel p-4 bg-[#E1BEE7]">
                <div className="flex items-center gap-2 mb-4"><span className="text-2xl">✈️</span><h2 className="text-xl font-bold text-[#8E24AA]">Dodo Airlines</h2></div>
                <p className="text-sm text-[#8E24AA] mb-4 font-bold">Where would you like to go?</p>
                <div className="grid grid-cols-2 gap-3">
                    {allThemesList.map(t => (
                        <button key={t.id} onClick={() => setTheme(t.id)} className={`ac-card flex flex-col items-center justify-center gap-2 py-4 hover:scale-105 transition-transform ${theme === t.id ? 'ring-4 ring-[#AB47BC]' : ''}`}>
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
