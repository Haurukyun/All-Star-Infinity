import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme, ThemeDefinition } from '../types';

const STAGES = [
    { id: Intensity.SOFT, title: 'ACT 1', desc: 'CHILL ZONE', color: '#1E90FF', secondary: '#FFD700', icon: '🌀' },
    { id: Intensity.HOT, title: 'ACT 2', desc: 'TURBO ZONE', color: '#FFD700', secondary: '#000', icon: '⚡' },
    { id: Intensity.VULGAR, title: 'FINAL BOSS', desc: 'MAX SPEED', color: '#FF4500', secondary: '#FFF', icon: '🔥' },
];

export const SonicLayout: React.FC<{ children: React.ReactNode; activeTab: string; setActiveTab: (tab: string) => void; logic: any }> = ({ children, activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'play', label: 'ACT', icon: '🌀' },
        { id: 'decks', label: 'ZONE', icon: '💎' },
        { id: 'history', label: 'LOGS', icon: '💾' },
        { id: 'themes', label: 'STAGE', icon: '🗺️' },
        { id: 'settings', label: 'META', icon: '⚙️' },
    ];

    return (
        <div className="sonic-theme h-[100dvh] w-screen flex flex-col bg-[#1e90ff] text-white overflow-hidden font-['Archivo_Black'] relative">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');
                .sonic-theme { 
                    font-family: 'Archivo Black', sans-serif;
                    background: #1e90ff;
                    background-image: linear-gradient(rgba(255, 255, 255, 0.1) 2px, transparent 2px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 2px, transparent 2px);
                    background-size: 50px 50px;
                }
                .sonic-panel { background: #fff; border: 6px solid #000; box-shadow: 12px 12px 0 rgba(0,0,0,0.2); transform: skewX(-5deg); padding: 24px; color: #000; position: relative; }
                .sonic-button { background: #000; color: #fff; border: 4px solid #000; padding: 12px 24px; transition: all 0.2s; transform: skewX(-15deg); font-weight: 900; font-style: italic; text-transform: uppercase; display: flex; align-items: center; justify-content: center; gap: 10px; }
                .sonic-button:hover { background: #FFD700; color: #000; transform: skewX(-15deg) translateX(10px); }
                .sonic-button.active { background: #fff; color: #000; border-color: #000; }
                .sonic-tab { flex: 1; height: 100%; display: flex; flex-direction: column; items: center; justify-content: center; gap: 1; transition: all 0.2s; background: #000; color: #fff; border: none; transform: skewX(-15deg); }
                .sonic-tab.active { background: #fff; color: #000; transform: skewX(-15deg) translateY(-8px); box-shadow: 0 8px 0 #FFD700; }
                .speed-lines { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; overflow: hidden; opacity: 0.1; }
                .line { position: absolute; background: white; height: 1px; animation: move-line linear infinite; }
                @keyframes move-line { from { transform: translateX(100vw); } to { transform: translateX(-100px); } }
                .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>
            <div className="speed-lines">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="line" style={{ top: `${Math.random() * 100}%`, width: `${Math.random() * 100 + 50}px`, left: '100vw', animationDuration: `${Math.random() * 0.5 + 0.2}s`, animationDelay: `${Math.random() * 2}s` }}></div>
                ))}
            </div>
            <header className="p-6 flex justify-between items-center shrink-0 relative z-10">
                <div className="flex flex-col">
                    <h1 className="text-4xl italic font-black text-blue-100 drop-shadow-[4px_4px_0_#000] tracking-tighter">SONIC</h1>
                    <span className="text-xs bg-red-600 px-2 transform -skew-x-12 font-black italic w-fit">MANIA INFINITY</span>
                </div>
                <div className="flex gap-1">
                    {[1, 2, 3].map(i => <div key={i} className="w-2 h-8 bg-black transform skew-x-12" style={{ opacity: 1 - (i * 0.2) }}></div>)}
                </div>
            </header>
            <main className="flex-1 overflow-y-auto px-4 pb-24 relative z-10 no-scrollbar">
                <div className="max-w-md mx-auto h-full pt-4">{children}</div>
            </main>
            <nav className="fixed bottom-0 left-0 w-full h-20 z-50 flex items-center bg-black/50 backdrop-blur-md">
                {tabs.map((tab) => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`sonic-tab ${activeTab === tab.id ? 'active' : ''}`}>
                        <span className="text-xl transform skewX(15deg)">{tab.icon}</span>
                        <span className="text-[10px] transform skewX(15deg) font-black tracking-widest uppercase">{tab.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

export const SonicPlayScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { intensity, setIntensity, prompt, setPrompt, history, activeDeckId, setActiveDeckId, customDecks, handleDraw } = logic;
    return (
        <AnimatePresence mode="wait">
            {!intensity && !prompt ? (
                <motion.div key="play" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-8">
                    <div className="sonic-panel">
                        <h2 className="text-2xl italic font-black mb-4 border-b-4 border-black pb-2">ZONE SELECT</h2>
                        <div className="flex flex-col gap-3">
                            <button onClick={() => setActiveDeckId('default')} className={`sonic-button ${activeDeckId === 'default' ? 'active' : ''}`}>GREEN HILL ZONE</button>
                            {customDecks.map((deck: any) => (
                                <button key={deck.id} onClick={() => setActiveDeckId(deck.id)} className={`sonic-button ${activeDeckId === deck.id ? 'active' : ''}`}>{deck.name.toUpperCase()}</button>
                            ))}
                        </div>
                    </div>
                    <div className="sonic-panel">
                        <h2 className="text-2xl italic font-black mb-4 border-b-4 border-black pb-2">ACT SELECT</h2>
                        <div className="flex flex-col gap-4">
                            {STAGES.map((stage) => (
                                <button key={stage.id} onClick={() => setIntensity(stage.id)} className="sonic-button py-4" style={{ borderLeftWidth: '12px', borderLeftColor: stage.secondary }}>
                                    <div className="flex flex-col items-center">
                                        <span className="text-2xl">{stage.title}</span>
                                        <span className="text-[10px] opacity-70 tracking-[.2em]">{stage.desc}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ) : !prompt ? (
                <div className="flex flex-col items-center gap-12 py-12">
                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center relative">
                        <h2 className="text-6xl italic font-black drop-shadow-[6px_6px_0_black] mb-2">{intensity}</h2>
                        <div className="w-full h-2 bg-yellow-400 transform -skew-x-12"></div>
                    </motion.div>
                    <div className="grid grid-cols-1 gap-6 w-full">
                        <button onClick={() => handleDraw('Truth')} className="sonic-button text-4xl py-8 bg-blue-600 border-white text-white italic">SPEED TRUTH</button>
                        <button onClick={() => handleDraw('Dare')} className="sonic-button text-4xl py-8 bg-red-600 border-white text-white italic">SPEED DARE</button>
                        <button onClick={() => setIntensity(null)} className="text-white italic underline font-black tracking-widest text-sm hover:text-yellow-400">ABORT MISSION</button>
                    </div>
                </div>
            ) : (
                <motion.div initial={{ rotate: -5, scale: 0.8 }} animate={{ rotate: 0, scale: 1 }} className="sonic-panel space-y-8 text-center bg-blue-50">
                    <div className="absolute top-0 left-0 w-full h-4 bg-yellow-400 -mt-2"></div>
                    <div className="flex justify-between items-center border-b-4 border-black pb-4">
                        <span className="bg-red-600 text-white px-6 py-2 italic font-black transform -skew-x-12">{prompt.type}</span>
                        <span className="font-black italic text-xl">RANK S</span>
                    </div>
                    <p className="text-4xl italic font-black leading-none drop-shadow-sm">"{prompt.text.toUpperCase()}"</p>
                    <div className="pt-6 border-t-4 border-black">
                        <p className="text-xs font-black mb-1 tracking-[.3em] text-red-600">MISSION PENALTY</p>
                        <p className="text-2xl italic font-black">{prompt.penalty.toUpperCase()}</p>
                    </div>
                    <div className="flex gap-4 pt-6">
                        <button onClick={() => setPrompt(null)} className="flex-1 sonic-button text-xl">FINISH</button>
                        <button onClick={() => handleDraw(prompt.type)} className="flex-1 sonic-button active text-xl">RETRY</button>
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center border-4 border-black shadow-lg"><span className="text-3xl">🌀</span></div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const SonicDecksScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { customDecks, setEditingDeck, deleteDeck, editingDeck, generateId, saveDeck, addNewPromptToEditingDeck, updatePromptInEditingDeck, removePromptFromEditingDeck } = logic;
    return (
        <AnimatePresence mode="wait">
            {!editingDeck ? (
                <div className="space-y-6">
                    <div className="flex justify-between items-end border-b-8 border-black pb-2">
                        <h2 className="text-4xl italic font-black drop-shadow-[3px_3px_0_black]">DATABASE</h2>
                        <button onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })} className="sonic-button text-[10px] py-1 px-3">+ NEW ENTRY</button>
                    </div>
                    <div className="space-y-4">
                        {customDecks.map((deck: any) => (
                            <div key={deck.id} className="sonic-panel flex justify-between items-center p-4 hover:bg-yellow-50 transition-colors">
                                <div><h3 className="text-2xl italic font-black">{deck.name.toUpperCase()}</h3><p className="text-[10px] font-black italic">{deck.prompts.length} DATA FILES</p></div>
                                <div className="flex gap-2"><button onClick={() => setEditingDeck(deck)} className="sonic-button text-[10px] py-1 px-3">EDIT</button><button onClick={() => deleteDeck(deck.id)} className="sonic-button text-[10px] py-1 px-3 bg-red-600">DEL</button></div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="sonic-panel space-y-6">
                    <div className="space-y-4">
                        <input className="w-full bg-blue-50 border-4 border-black p-4 text-2xl italic font-black focus:outline-none" value={editingDeck.name} onChange={e => setEditingDeck({ ...editingDeck, name: e.target.value })} placeholder="ENTRY NAME" />
                        <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2 no-scrollbar">
                            {editingDeck.prompts.map((p: any) => (
                                <div key={p.id} className="bg-white border-4 border-black p-4 space-y-4 transform -skew-x-2">
                                    <div className="flex gap-2"><select className="bg-black text-white p-2 italic font-black text-xs" value={p.type} onChange={e => updatePromptInEditingDeck(p.id, 'type', e.target.value)}><option>Truth</option><option>Dare</option></select><button onClick={() => removePromptFromEditingDeck(p.id)} className="ml-auto text-red-600 font-black text-2xl">×</button></div>
                                    <textarea className="w-full bg-transparent border-b-4 border-black text-lg p-1 italic font-black resize-none" value={p.text} onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)} placeholder="..." />
                                </div>
                            ))}
                        </div>
                        <button onClick={addNewPromptToEditingDeck} className="w-full sonic-button text-lg font-black">+ ADD FILE</button>
                    </div>
                    <div className="flex gap-4"><button onClick={() => setEditingDeck(null)} className="flex-1 sonic-button text-2xl font-black bg-white !text-black">BACK</button><button onClick={() => saveDeck(editingDeck)} className="flex-1 sonic-button active text-2xl font-black !bg-black !text-white">SAVE</button></div>
                </div>
            )}
        </AnimatePresence>
    );
};

export const SonicHistoryScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { history } = logic;
    return (
        <div className="space-y-8">
            <h2 className="text-4xl italic font-black border-b-8 border-black pb-2 drop-shadow-[3px_3px_0_black]">LOGS</h2>
            <div className="space-y-4">
                {history.map((item: any, i: number) => (
                    <div key={i} className="sonic-panel p-6 border-l-[12px] border-black">
                        <div className="flex justify-between items-center text-xs font-black italic mb-2 tracking-widest text-blue-600">
                            <span>{item.type.toUpperCase()}</span>
                            <span>FILE {history.length - i}</span>
                        </div>
                        <p className="text-2xl font-black italic leading-none">"{item.text.toUpperCase()}"</p>
                    </div>
                ))}
                {history.length === 0 && <div className="py-20 text-center italic font-black text-4xl opacity-10">NO DATA FOUND</div>}
            </div>
        </div>
    );
};

export const SonicThemesScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setTheme, theme } = logic;
    return (
        <div className="space-y-6">
            <h2 className="text-4xl italic font-black border-b-8 border-black pb-2 drop-shadow-[3px_3px_0_black]">STAGE SELECT</h2>
            <div className="grid grid-cols-1 gap-4 pb-20">
                {[Theme.PERSONA, Theme.MINECRAFT, Theme.DANGANRONPA, Theme.OMORI, Theme.KIRBY, Theme.POKEMON, Theme.ANIMAL_CROSSING, Theme.SKYRIM, Theme.SONIC, Theme.SANRIO].map(t => (
                    <button key={t} onClick={() => setTheme(t)} className={`sonic-button py-6 text-2xl font-black italic ${theme === t ? 'active !bg-yellow-400 !text-black border-white' : ''}`}>{t.toUpperCase()}</button>
                ))}
            </div>
        </div>
    );
};

export const SonicSettingsScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setView } = logic;
    return (
        <div className="space-y-8">
            <h2 className="text-4xl italic font-black border-b-8 border-black pb-2 drop-shadow-[3px_3px_0_black]">SYSTEM</h2>
            <div className="sonic-panel p-10 space-y-8">
                <div className="flex justify-between items-center border-b-4 border-black pb-4"><span className="text-2xl italic font-black">SAVE DATA</span><span className="bg-green-600 text-white px-4 py-1 italic font-black">AUTO</span></div>
                <div className="flex justify-between items-center border-b-4 border-black pb-4"><span className="text-2xl italic font-black">SPEED LIMIT</span><span className="bg-blue-600 text-white px-4 py-1 italic font-black">NONE</span></div>
                <button onClick={() => setView('menu')} className="w-full sonic-button text-3xl py-6 !bg-red-600">QUIT GAME</button>
            </div>
            <div className="text-center italic font-black text-xl opacity-50 tracking-widest animate-pulse">PRESS START TO BEGIN</div>
        </div>
    );
};

export const SonicMenu: React.FC<{ logic: any }> = ({ logic }) => {
    const { setView, setTheme } = logic;
    const [activeSection, setActiveSection] = useState<'themes' | null>(null);
    const themes = Object.values(Theme).filter(t => t !== Theme.NONE);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center space-y-12 pb-20 font-['Archivo_Black'] relative overflow-hidden bg-[#1e90ff] select-none">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');
                .sonic-theme-bg { background: #1e90ff; background-image: linear-gradient(rgba(255, 255, 255, 0.1) 2px, transparent 2px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 2px, transparent 2px); background-size: 50px 50px; }
            `}</style>
            <div className="absolute inset-0 sonic-theme-bg opacity-30"></div>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative text-center z-10">
                <div className="absolute -inset-10 bg-white/20 blur-3xl rounded-full animate-pulse"></div>
                <div className="relative">
                    <h1 className="text-7xl sm:text-9xl font-black italic text-blue-600 drop-shadow-[8px_8px_0_white] tracking-tighter leading-none mb-2 uppercase">SONIC</h1>
                    <div className="bg-black text-white px-8 py-2 transform -skew-x-12 border-l-8 border-red-600 inline-block font-['Archivo_Black']"><span className="text-3xl sm:text-4xl font-black italic uppercase">MANIA INFINITY</span></div>
                </div>
            </motion.div>
            <div className="flex flex-col gap-6 w-80 items-stretch z-10 font-['Archivo_Black']">
                <motion.button whileHover={{ scale: 1.05, translateX: 10 }} whileTap={{ scale: 0.95 }} onClick={() => setView('game')} className="sonic-button py-6 text-4xl italic font-black shadow-[10px_10px_0_rgba(0,0,0,0.3)]">GO FAST!!</motion.button>
                <div className="flex flex-col gap-2">
                    <button onClick={() => setActiveSection(activeSection === 'themes' ? null : 'themes')} className="sonic-button py-2 text-xl font-black italic bg-white !text-black border-white">SELECT STAGE</button>
                    <AnimatePresence>
                        {activeSection === 'themes' && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-black text-white grid grid-cols-2 gap-2 p-4 transform -skew-x-6 overflow-hidden max-h-48 overflow-y-auto no-scrollbar">
                                {themes.map(t => <button key={t} onClick={() => setTheme(t)} className="text-[10px] text-left hover:text-yellow-400 font-black italic uppercase">{t}</button>)}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <div className="absolute bottom-10 flex gap-4">
                {[1, 2, 3, 4].map(i => <div key={i} className="w-4 h-4 bg-black transform skew-x-12" style={{ opacity: 1 - (i * 0.2) }}></div>)}
            </div>
        </div>
    );
};

export const SonicTheme: ThemeDefinition = {
    id: Theme.SONIC,
    name: 'Sonic Mania',
    cssVars: {
        '--theme-accent': '#FF4500',
    },
    MenuComponent: SonicMenu,
    LayoutComponent: SonicLayout,
    PlayScreen: SonicPlayScreen,
    DecksScreen: SonicDecksScreen,
    HistoryScreen: SonicHistoryScreen,
    SettingsScreen: SonicSettingsScreen,
    ThemesScreen: SonicThemesScreen,
    tabLabels: {
        play: 'ACT',
        decks: 'ZONE',
        history: 'LOGS',
        themes: 'STAGE',
        settings: 'META'
    }
};
