import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme, ThemeDefinition, GameMode } from '../types';
import { allThemesList } from './allThemesList';
import { DeckCarousel } from '../components/DeckCarousel';
import { DeckSearchModal } from '../components/DeckSearchModal';

const STAGES = [
    { id: Intensity.SOFT, title: 'NORMAL', desc: 'EFFECTIVE', color: '#A8A878', text: '#FFFFFF', icon: '⚪' },
    { id: Intensity.HOT, title: 'FIRE', desc: 'SUPER EFFECTIVE', color: '#F08030', text: '#FFFFFF', icon: '🔥' },
    { id: Intensity.VULGAR, title: 'GHOST', desc: 'CRITICAL HIT', color: '#705898', text: '#FFFFFF', icon: '👻' },
];

export const PokemonLayout: React.FC<{ children: React.ReactNode; activeTab: string; setActiveTab: (tab: string) => void; logic: any }> = ({ children, activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'play', label: 'FIGHT', icon: '⚔️' },
        { id: 'decks', label: 'BAG', icon: '🎒' },
        { id: 'history', label: 'DEX', icon: '📱' },
        { id: 'themes', label: 'MAP', icon: '🗺️' },
        { id: 'settings', label: 'SAVE', icon: '💾' },
    ];

    return (
        <div className="pokemon-theme h-[100dvh] w-screen flex flex-col bg-[#202020] text-[#404040] overflow-hidden font-['Press_Start_2P'] relative">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
                .pokemon-theme { 
                    font-family: 'Press Start 2P', cursive;
                    background-image: linear-gradient(45deg, #252525 25%, transparent 25%), linear-gradient(-45deg, #252525 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #252525 75%), linear-gradient(-45deg, transparent 75%, #252525 75%);
                    background-size: 20px 20px;
                    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
                }
                .poke-panel { background: #F8F8D0; border: 4px solid #606060; border-radius: 8px; box-shadow: inset 0 0 0 4px #D0D0A8, 0 4px 0 rgba(0,0,0,0.4); position: relative; padding: 16px; }
                .poke-panel-blue { background: #E0F0F8; border-color: #405080; box-shadow: inset 0 0 0 4px #A8C0D8, 0 4px 0 rgba(0,0,0,0.4); }
                .poke-btn { background: #F8F8F8; border: 2px solid #808080; border-radius: 4px; padding: 12px; cursor: pointer; position: relative; text-align: left; box-shadow: 0 4px 0 #C0C0C0; transition: transform 0.1s, box-shadow 0.1s; }
                .poke-btn:active { transform: translateY(4px); box-shadow: 0 0 0 #C0C0C0; }
                .poke-btn.active { background: #F8D030; border-color: #C08000; box-shadow: 0 4px 0 #D0A000; }
                .poke-type-tag { padding: 4px 8px; border-radius: 4px; color: white; font-size: 10px; text-transform: uppercase; text-shadow: 1px 1px 0 rgba(0,0,0,0.3); border: 1px solid rgba(0,0,0,0.2); }
                .poke-list-item { display: flex; align-items: center; padding: 8px; border-bottom: 2px dashed #C0C0C0; }
                .cursor-triangle { width: 0; height: 0; border-top: 6px solid transparent; border-bottom: 6px solid transparent; border-left: 10px solid #404040; margin-right: 8px; }
                .nav-pill { background: #404040; color: #808080; border-radius: 8px 8px 0 0; padding: 8px; text-align: center; border: 2px solid #202020; border-bottom: none; margin: 0 2px; }
                .nav-pill.active { background: #F8F8D0; color: #404040; padding-bottom: 12px; margin-top: -4px; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>
            <header className="p-4 shrink-0 relative z-10 bg-[#D04040] border-b-4 border-[#802020] shadow-md flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-full border-4 border-[#404040] flex items-center justify-center relative overflow-hidden">
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-[#404040] -translate-y-1/2"></div>
                        <div className="w-3 h-3 bg-white rounded-full border-2 border-[#404040] relative z-10"></div>
                    </div>
                    <span className="text-sm tracking-tighter">POKéMON TRUTH/DARE</span>
                </div>
                <div className="text-xs bg-[#A03030] px-2 py-1 rounded border border-[#802020]">v1.0</div>
            </header>
            <main className="flex-1 overflow-y-auto px-2 pb-24 relative z-10 bg-[#70D090] no-scrollbar">
                <div className="max-w-md mx-auto h-full pt-4">{children}</div>
            </main>
            <nav className="fixed bottom-0 left-0 w-full h-16 z-50 bg-[#404040] border-t-4 border-[#202020]">
                <div className="flex justify-around items-end h-full px-2">
                    {tabs.map((tab) => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`nav-pill flex-1 flex flex-col items-center justify-center gap-1 h-14 transition-all ${activeTab === tab.id ? 'active' : ''}`}>
                            <span className="text-lg">{tab.icon}</span>
                            <span className="text-[8px]">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export const PokemonPlayScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { intensity, setIntensity, prompt, setPrompt, history, activeDeckId, setActiveDeckId, customDecks, handleDraw, setGameMode, gameMode } = logic;
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    return (
        <AnimatePresence mode="wait">
            {!intensity && !prompt ? (
                <motion.div key="play" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                    <div className="poke-panel poke-panel-blue">
                        <h2 className="text-sm mb-4">SELECT LEVEL</h2>
                        <div className="grid grid-cols-1 gap-3">
                            {STAGES.map((stage) => (
                                <button key={stage.id} onClick={() => setIntensity(stage.id)} className="poke-btn flex items-center gap-4">
                                    <div className="w-8 h-8 flex items-center justify-center text-xl bg-white rounded border border-gray-400">{stage.icon}</div>
                                    <div className="flex-1"><div className="text-sm" style={{ color: stage.color }}>{stage.title}</div><div className="text-[10px] text-gray-500">{stage.desc}</div></div>
                                    <div className="text-xs">▶</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ) : !prompt ? (
                <div className="flex flex-col items-center justify-start h-full pt-2">
                    <div className="poke-panel w-full mb-6">
                        <div className="flex justify-between items-center mb-2 px-2">
                            <h3 className="text-[10px] text-gray-400 uppercase">SELECT ITEM</h3>
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="w-8 h-8 rounded border-2 border-[#606060] flex items-center justify-center hover:bg-[#D0D0A8] transition-colors"
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
                            accentColor="#3B4CCA"
                        />
                    </div>

                    <div className="poke-panel w-full text-center space-y-4 border-double border-8 border-[#404040]">
                        <div className="bg-[#404040] text-white py-1 -mx-4 -mt-4 mb-2 text-center text-[8px]">LEVEL: {intensity}</div>

                        <div className="bg-[#A0A0A0] p-4 rounded border-2 border-[#606060] grid grid-cols-1 gap-2">
                            {gameMode === GameMode.NEVER_HAVE_I_EVER ? (
                                <button onClick={() => handleDraw('NeverHaveIEver')} className="bg-[#F8F8F8] border-2 border-[#404040] p-3 hover:bg-[#E0E0E0] text-center text-xs">USE NHIE</button>
                            ) : (
                                <>
                                    <button onClick={() => handleDraw('Truth')} className="bg-[#F8F8F8] border-2 border-[#404040] p-3 hover:bg-[#E0E0E0] text-left text-xs">TRUTH</button>
                                    <button onClick={() => handleDraw('Dare')} className="bg-[#F8F8F8] border-2 border-[#404040] p-3 hover:bg-[#E0E0E0] text-left text-xs">DARE</button>
                                </>
                            )}
                        </div>
                        <button onClick={() => setIntensity(null)} className="text-[8px] text-gray-500 hover:text-black mt-2 uppercase tracking-tight">◀ Run Away</button>
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
                </div>
            ) : (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="poke-panel mt-4">
                    <div className="flex justify-between items-start mb-4 border-b-2 border-[#D0D0A8] pb-2">
                        <div><span className="text-[10px] text-gray-500">No. {history.length.toString().padStart(3, '0')}</span><h2 className="text-sm">{prompt.type.toUpperCase()}</h2></div>
                        <span className={`poke-type-tag ${prompt.type === 'Truth' ? 'bg-[#6890F0]' : 'bg-[#C03028]'}`}>{prompt.type.toUpperCase()}</span>
                    </div>
                    <div className="bg-white border-2 border-[#C0C0C0] p-4 rounded mb-4 min-h-[120px] flex items-center justify-center text-center"><p className="text-xs leading-relaxed">{prompt.text}</p></div>
                    <div className="bg-[#E0E0E0] p-2 rounded border border-[#C0C0C0] mb-4"><div className="text-[8px] text-gray-500 mb-1">EFFECT:</div><div className="text-[10px] text-[#C03028]">{prompt.penalty}</div></div>
                    <div className="flex gap-2"><button onClick={() => { setPrompt(null); if (prompt?.type === 'NeverHaveIEver') setIntensity(null); }} className="flex-1 poke-btn text-center text-xs">DONE</button><button onClick={() => handleDraw(prompt.type)} className="flex-1 poke-btn text-center text-xs bg-[#E0F0F8]">AGAIN</button></div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const PokemonDecksScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { customDecks, setEditingDeck, deleteDeck, editingDeck, generateId, saveDeck, addNewPromptToEditingDeck, updatePromptInEditingDeck, removePromptFromEditingDeck } = logic;
    return (
        <AnimatePresence mode="wait">
            {!editingDeck ? (
                <motion.div key="decks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="poke-panel poke-panel-blue">
                        <div className="flex justify-between items-center mb-4"><h2 className="text-sm">YOUR BAG</h2><button onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true, intensity: logic.intensity || 'SOFT', gameMode: logic.gameMode || 'TruthOrDare' })} className="text-[8px] bg-[#6890F0] text-white px-2 py-1 rounded border border-[#405080]">NEW ITEM</button></div>
                        <div className="bg-white border-2 border-[#A8C0D8] rounded h-[60vh] overflow-y-auto p-2 no-scrollbar">
                            {customDecks.map((deck: any) => (
                                <div key={deck.id} className="poke-list-item"><div className="w-8 h-8 bg-[#F8F8F8] border border-gray-300 rounded flex items-center justify-center mr-2 text-lg">💿</div><div className="flex-1"><div className="text-[10px]">{deck.name || '????'}</div><div className="text-[8px] text-gray-500">x{deck.prompts.length}</div></div><button onClick={() => setEditingDeck(deck)} className="text-[8px] text-blue-500 mr-2">USE</button><button onClick={() => deleteDeck(deck.id)} className="text-[8px] text-red-500">TOSS</button></div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ) : (
                <div className="poke-panel">
                    <h2 className="text-sm mb-4">TM CASE</h2>
                    <div className="space-y-4">
                        <input className="w-full bg-white border-2 border-[#C0C0C0] p-2 text-xs outline-none focus:border-[#6890F0]" value={editingDeck.name} onChange={e => setEditingDeck({ ...editingDeck, name: e.target.value })} placeholder="TM NAME" />
                        <textarea className="w-full bg-white border-2 border-[#C0C0C0] p-2 text-xs outline-none focus:border-[#6890F0] resize-none h-16" value={editingDeck.description} onChange={e => setEditingDeck({ ...editingDeck, description: e.target.value })} placeholder="TM DESCRIPTION" />
                        <div className="flex gap-2">
                            <select value={editingDeck.gameMode} onChange={e => setEditingDeck({ ...editingDeck, gameMode: e.target.value as any })} className="flex-1 bg-white border-2 border-[#C0C0C0] p-2 text-[10px] outline-none">
                                <option value="TruthOrDare">T/D</option>
                                <option value="NeverHaveIEver">NHIE</option>
                            </select>
                            <select value={editingDeck.intensity} onChange={e => setEditingDeck({ ...editingDeck, intensity: e.target.value as any })} className="flex-1 bg-white border-2 border-[#C0C0C0] p-2 text-[10px] outline-none">
                                <option value="SOFT">SOFT</option>
                                <option value="HOT">HOT</option>
                                <option value="VULGAR">VULGAR</option>
                            </select>
                        </div>
                        <div className="bg-white border-2 border-[#C0C0C0] rounded h-[30vh] overflow-y-auto p-2 no-scrollbar space-y-2">
                            {editingDeck.prompts.map((p: any) => (
                                <div key={p.id} className="bg-[#F8F8F8] border border-[#E0E0E0] p-2 rounded">
                                    <div className="flex gap-2 mb-1">
                                        <select className="bg-white border border-[#C0C0C0] text-[8px] p-1 rounded" value={p.type} onChange={e => logic.updatePromptInEditingDeck(p.id, 'type', e.target.value)}>
                                            {editingDeck.gameMode === 'TruthOrDare' ? (
                                                <><option value="Truth">Truth</option><option value="Dare">Dare</option></>
                                            ) : (
                                                <option value="NeverHaveIEver">NHIE</option>
                                            )}
                                        </select>
                                        <div className="text-[8px] text-gray-500 font-bold flex items-center px-1 border border-[#C0C0C0] rounded bg-[#E0E0E0]">{editingDeck.intensity}</div>
                                        <button onClick={() => logic.removePromptFromEditingDeck(p.id)} className="ml-auto text-red-500 text-xs font-bold leading-none">×</button>
                                    </div>
                                    <input className="w-full bg-transparent border-b border-[#E0E0E0] text-[10px] outline-none" value={p.text} onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)} placeholder="Move..." />
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2"><button onClick={() => setEditingDeck(null)} className="flex-1 poke-btn text-center text-xs">BACK</button><button onClick={() => saveDeck(editingDeck)} className="flex-1 poke-btn text-center text-xs bg-[#78C850] text-white border-[#408020]">SAVE</button></div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

export const PokemonHistoryScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { history } = logic;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="poke-panel poke-panel-blue">
            <h2 className="text-sm mb-4">POKéDEX</h2>
            <div className="bg-white border-2 border-[#A8C0D8] rounded h-[70vh] overflow-y-auto no-scrollbar">
                {history.map((item: any, i: number) => (
                    <div key={i} className="poke-list-item hover:bg-[#E0F0F8]">
                        <div className="text-[8px] text-gray-500 w-8">{(history.length - i).toString().padStart(3, '0')}</div>
                        <div className="w-6 h-6 bg-[#F0F0F0] rounded-full flex items-center justify-center mr-2 text-xs">{item.type === 'Truth' ? '🔵' : '🔴'}</div>
                        <div className="flex-1 text-[10px] truncate">{item.text}</div>
                        <span className="text-[8px] bg-[#E0E0E0] px-1 rounded">SEEN</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export const PokemonThemesScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setTheme, theme } = logic;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="poke-panel">
            <h2 className="text-sm mb-4">TOWN MAP</h2>
            <div className="grid grid-cols-2 gap-3">
                {allThemesList.map(t => (
                    <button key={t.id} onClick={() => setTheme(t.id)} className={`poke-btn flex flex-col items-center justify-center gap-2 h-24 ${theme === t.id ? 'bg-[#F8D030] active' : ''}`}>
                        <div className="w-8 h-8 rounded-full border-2 border-gray-400" style={{ background: t.color }}></div>
                        <span className="text-[8px]">{t.label}</span>
                    </button>
                ))}
            </div>
        </motion.div>
    );
};

export const PokemonSettingsScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setView } = logic;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="poke-panel">
            <h2 className="text-sm mb-4">TRAINER CARD</h2>
            <div className="bg-[#E0E0E0] p-4 rounded border-2 border-[#A0A0A0] space-y-4">
                <div className="flex justify-between border-b border-gray-400 pb-2"><span className="text-[10px]">NAME</span><span className="text-[10px] font-bold">PLAYER</span></div>
                <div className="flex justify-between border-b border-gray-400 pb-2"><span className="text-[10px]">BADGES</span><div className="flex gap-1">{[1, 2, 3].map(i => <div key={i} className="w-3 h-3 bg-yellow-400 border border-yellow-700 rounded-full"></div>)}</div></div>
            </div>
            <button onClick={() => setView('menu')} className="w-full mt-4 bg-[#F8F8F8] border-2 border-[#808080] p-2 text-[10px] font-bold hover:bg-[#E0E0E0]">SAVE AND QUIT</button>
        </motion.div>
    );
};

export const PokemonMenu: React.FC<{ logic: any }> = ({ logic }) => {
    const { setView, setTheme } = logic;
    const [activeSection, setActiveSection] = useState<'themes' | null>(null);
    const themes = Object.values(Theme).filter(t => t !== Theme.NONE);

    return (
        <div className="h-full w-full flex flex-col items-center justify-end p-4 pb-12 bg-[#6890F0] font-['Press_Start_2P'] text-[#404040] relative overflow-hidden select-none">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
            `}</style>
            <div className="absolute inset-0 z-0">
                {[...Array(10)].map((_, i) => (
                    <motion.div key={i} className="absolute bg-white/20" style={{ width: 8, height: 8, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} animate={{ y: [-20, -120], opacity: [0, 1, 0] }} transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "linear" }} />
                ))}
            </div>
            <div className="z-10 w-full max-w-2xl flex flex-col gap-6">
                <motion.div className="flex flex-col items-center mb-8" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                    <h1 className="text-4xl text-yellow-400 drop-shadow-[4px_4px_0_#3b4cca]">POKéMON</h1>
                    <div className="bg-white px-4 py-1 mt-2 border-2 border-[#3b4cca] shadow-[4px_4px_0_#000]"><span className="text-[8px] text-[#3b4cca]">UNIVERSAL VERSION</span></div>
                </motion.div>
                <div className="bg-[#5870B8] p-1.5 rounded-lg shadow-[6px_6px_0_black]">
                    <div className="bg-[#F8F8F8] p-1 rounded-md">
                        <div className="bg-[#F8F8F8] border-2 border-[#5870B8] rounded-md p-6 flex flex-col gap-6">
                            <button onClick={() => setView('game')} className="flex items-center gap-4 group/item"><span className="text-xl opacity-0 hover:opacity-100">▶</span><span className="text-xl hover:text-[#5870B8]">NEW GAME</span></button>
                            <button onClick={() => setActiveSection(activeSection === 'themes' ? null : 'themes')} className="flex items-center gap-4 group/item"><span className="text-xl opacity-0 hover:opacity-100">▶</span><span className="text-xl hover:text-[#5870B8]">REGION MAP</span></button>
                            {activeSection === 'themes' && (
                                <div className="grid grid-cols-2 gap-4 mt-2 border-t-2 border-[#5870B8] pt-4">
                                    {themes.map(t => <button key={t} onClick={() => setTheme(t)} className="text-[8px] text-left hover:text-[#5870B8] transition-colors">{t.toUpperCase()}</button>)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const PokemonTheme: ThemeDefinition = {
    id: Theme.POKEMON,
    name: 'Pokemon',
    cssVars: {
        '--theme-accent': '#3B4CCA',
    },
    MenuComponent: PokemonMenu,
    LayoutComponent: PokemonLayout,
    PlayScreen: PokemonPlayScreen,
    DecksScreen: PokemonDecksScreen,
    HistoryScreen: PokemonHistoryScreen,
    SettingsScreen: PokemonSettingsScreen,
    ThemesScreen: PokemonThemesScreen,
    tabLabels: {
        play: 'FIGHT',
        decks: 'BAG',
        history: 'DEX',
        themes: 'MAP',
        settings: 'SAVE'
    }
};
