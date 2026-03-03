import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme, ThemeDefinition } from '../types';

const STAGES = [
    { id: Intensity.SOFT, title: 'MODERATE', desc: 'LOW THREAT LEVEL', color: '#00f0ff', secondary: '#fcee0a', icon: '📶' },
    { id: Intensity.HOT, title: 'HIGH', desc: 'ELEVATED RISK', color: '#fcee0a', secondary: '#ff003c', icon: '⚡' },
    { id: Intensity.VULGAR, title: 'SEVERE', desc: 'CRITICAL THREAT', color: '#ff003c', secondary: '#00f0ff', icon: '💀' },
];

export const CyberpunkLayout: React.FC<{ children: React.ReactNode; activeTab: string; setActiveTab: (tab: string) => void; logic: any }> = ({ children, activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'play', label: 'CRAFTING', icon: '🔧' },
        { id: 'decks', label: 'INVENTORY', icon: '🎒' },
        { id: 'history', label: 'JOURNAL', icon: '📜' },
        { id: 'themes', label: 'MAP', icon: '🗺️' },
        { id: 'settings', label: 'CHARACTER', icon: '👤' },
    ];

    return (
        <div className="cyberpunk-theme h-[100dvh] w-screen flex flex-col bg-[#050505] text-[#ff003c] overflow-hidden font-['Rajdhani'] relative">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');
                .cyberpunk-theme { 
                    font-family: 'Rajdhani', sans-serif;
                }
                .cyber-mono {
                    font-family: 'Share Tech Mono', monospace;
                }
                .glitch-text {
                    position: relative;
                }
                .glitch-text::before, .glitch-text::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0.8;
                }
                .glitch-text::before {
                    color: #00f0ff;
                    z-index: -1;
                    transform: translate(-2px, 1px);
                }
                .glitch-text::after {
                    color: #fcee0a;
                    z-index: -2;
                    transform: translate(2px, -1px);
                }
                .cyber-scanlines {
                    background: linear-gradient(
                        to bottom,
                        rgba(255, 255, 255, 0),
                        rgba(255, 255, 255, 0) 50%,
                        rgba(0, 0, 0, 0.2) 50%,
                        rgba(0, 0, 0, 0.2)
                    );
                    background-size: 100% 4px;
                }
                .cyber-panel {
                    background: rgba(255, 0, 60, 0.05);
                    border: 1px solid rgba(255, 0, 60, 0.3);
                    position: relative;
                }
                .cyber-panel::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0;
                    width: 10px; height: 10px;
                    border-top: 2px solid #ff003c;
                    border-left: 2px solid #ff003c;
                }
                .cyber-panel::after {
                    content: '';
                    position: absolute;
                    bottom: 0; right: 0;
                    width: 10px; height: 10px;
                    border-bottom: 2px solid #ff003c;
                    border-right: 2px solid #ff003c;
                }
                .cyber-button {
                    background: transparent;
                    color: #ff003c;
                    border: 1px solid #ff003c;
                    padding: 8px 16px;
                    text-transform: uppercase;
                    font-weight: 600;
                    letter-spacing: 2px;
                    transition: all 0.2s;
                    position: relative;
                    overflow: hidden;
                }
                .cyber-button::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%;
                    width: 100%; height: 100%;
                    background: #ff003c;
                    transition: all 0.3s;
                    z-index: -1;
                }
                .cyber-button:hover {
                    color: #000;
                    text-shadow: none;
                }
                .cyber-button:hover::before {
                    left: 0;
                }
                .cyber-button.active {
                    background: #ff003c;
                    color: #000;
                }
                .cyber-button.active::after {
                    content: '';
                    position: absolute;
                    bottom: -2px; right: -2px;
                    width: 8px; height: 8px;
                    background: #00f0ff;
                }
                .cyber-button.cyan { border-color: #00f0ff; color: #00f0ff; }
                .cyber-button.cyan::before { background: #00f0ff; }
                .cyber-button.cyan.active { background: #00f0ff; color: #000; }
                .cyber-button.yellow { border-color: #fcee0a; color: #fcee0a; }
                .cyber-button.yellow::before { background: #fcee0a; }
                .cyber-button.yellow.active { background: #fcee0a; color: #000; }
                
                .cyber-tab {
                    color: #00f0ff;
                    font-weight: 600;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    border: 1px solid transparent;
                    transition: all 0.2s;
                    letter-spacing: 1px;
                }
                .cyber-tab.active {
                    color: #ff003c;
                    border: 1px solid rgba(255, 0, 60, 0.3);
                    background: rgba(255, 0, 60, 0.05);
                }
                .cyber-tab:hover {
                    background: rgba(0, 240, 255, 0.05);
                    border-color: rgba(0, 240, 255, 0.3);
                }
            `}</style>

            <div className="absolute inset-0 cyber-scanlines pointer-events-none z-50"></div>

            <div className="absolute" style={{ top: '10%', left: '5%', opacity: 0.1 }}>
                <div className="cyber-mono text-xs text-[#ff003c] whitespace-pre">
                    CONNECTION LOST<br />
                    00      000 x 0000<br />
                    00      000 x 0000<br />
                    00      000 x 0000
                </div>
            </div>

            <div className="absolute" style={{ top: '5%', right: '5%', opacity: 0.1 }}>
                <div className="cyber-mono text-xs text-[#ff003c] text-right">
                    CORE CRITICAL ERROR AT POINT<br />0.0 0002 9 03 XX.00
                </div>
            </div>

            <header className="px-6 py-4 flex justify-between items-center shrink-0 border-b border-[#ff003c]/20 relative z-10">
                <div className="flex items-end gap-4">
                    <span className="text-3xl font-bold text-[#00f0ff]">12 <span className="text-sm">LEVEL</span></span>
                    <span className="text-3xl font-bold text-[#00f0ff]">19 <span className="text-sm">STREET CRED</span></span>
                </div>
                <div className="flex items-center gap-6">
                    <span className="text-[#ff003c] flex items-center gap-2"><span className="text-xs">⚖️</span> 112/240</span>
                    <span className="text-[#fcee0a] text-xl font-bold hidden sm:block">€$ 32214</span>
                </div>
            </header>

            <nav className="flex justify-center border-b border-[#ff003c]/20 bg-[#050505] z-40 relative">
                <div className="flex overflow-x-auto no-scrollbar py-2 px-4 gap-2 w-full max-w-5xl">
                    {tabs.map((tab) => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`cyber-tab flex-1 whitespace-nowrap justify-center ${activeTab === tab.id ? 'active' : ''}`}>
                            <span className="text-lg">{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </nav>

            <main className="flex-1 overflow-y-auto p-4 sm:p-8 relative z-10 custom-scrollbar">
                <div className="max-w-4xl mx-auto h-full">{children}</div>
            </main>

            <footer className="border-t border-[#ff003c]/20 p-2 flex justify-between items-center shrink-0 text-xs cyber-mono text-[#ff003c]/50 relative z-10">
                <span>MODEL LINE L2001A</span>
                <span className="hidden sm:block">IMAGE NAME: BLACKLARCH 00140H</span>
                <span>TRN_TLCAS_010023</span>
            </footer>
        </div>
    );
};

export const CyberpunkMenuLayout: React.FC<{ children: React.ReactNode; logic: any }> = ({ children }) => {
    return (
        <div className="h-[100dvh] w-screen flex flex-col justify-center p-8 sm:p-24 relative overflow-hidden bg-[#050505] text-[#ff003c] font-['Rajdhani']">
            <style>{`
                .cyber-menu-bg {
                    background-image: linear-gradient(to right, rgba(255, 0, 60, 0.1) 1px, transparent 1px),
                                      linear-gradient(to bottom, rgba(255, 0, 60, 0.1) 1px, transparent 1px);
                    background-size: 40px 40px;
                }
            `}</style>

            <div className="absolute inset-0 cyber-menu-bg opacity-20 z-0"></div>
            <div className="absolute inset-0 cyber-scanlines pointer-events-none z-50 opacity-30"></div>

            {/* CP2077 Dark Red Left Overlay */}
            <div className="absolute left-[15%] top-0 bottom-0 w-[40%] bg-gradient-to-r from-[rgba(255,0,60,0.15)] to-transparent border-l-2 border-[#ff003c]/40 z-0"></div>

            <div className="relative z-10 w-full max-w-2xl ml-[15%]">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-20">
                    <h1 className="text-7xl sm:text-[8rem] font-black italic text-[#fcee0a] leading-none tracking-tighter" style={{ textShadow: '4px 4px 0 rgba(0,240,255,0.4)' }}>
                        ALL-STAR<br /><span className="text-[#00f0ff] text-5xl sm:text-[6rem]">INFINITY</span>
                    </h1>
                    <div className="text-xl cyber-mono text-[#ff003c] mt-4 opacity-80">1.05</div>
                </motion.div>

                <div className="flex flex-col gap-2 w-full sm:w-80 items-stretch">
                    {children}
                </div>
            </div>

            {/* Version string fixed bottom left matching UI */}
            <div className="absolute bottom-10 left-10 text-xs cyber-mono text-[#ff003c] opacity-50">
                TRN_TLCAS_000095
            </div>
        </div>
    );
};

export const CyberpunkMenuButton: React.FC<{ label: string; onClick: () => void; isPrimary?: boolean }> = ({ label, onClick, isPrimary }) => {
    return (
        <button
            onClick={onClick}
            className={`text-left py-4 px-6 text-2xl font-medium tracking-widest transition-all cyber-mono group relative ${isPrimary ? 'text-[#00f0ff] hover:bg-[rgba(0,240,255,0.1)]' : 'text-[#ff003c] hover:text-[#fcee0a] hover:bg-white/5'}`}
        >
            <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all ${isPrimary ? 'bg-[#00f0ff] group-hover:w-full group-hover:opacity-10' : 'bg-transparent'}`}></div>
            <div className={`absolute inset-0 border transition-all ${isPrimary ? 'border-[#00f0ff] group-hover:border-[#00f0ff]' : 'border-transparent group-hover:border-[#fcee0a]'}`}></div>

            <span className="relative z-10 flex items-center justify-between">
                <span>{label}</span>
                {isPrimary && <span className="opacity-0 group-hover:opacity-100 text-sm">▶</span>}
            </span>
        </button>
    );
};

export const CyberpunkIntensitySelector: React.FC<{ logic: any }> = ({ logic }) => {
    const { setIntensity } = logic;
    return (
        <motion.div key="intensity" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full">
            <h2 className="text-2xl font-bold tracking-widest text-[#00f0ff] mb-6 border-b border-[#00f0ff]/30 pb-2">SELECT THREAT LEVEL</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {STAGES.map((stage) => (
                    <button key={stage.id} onClick={() => setIntensity(stage.id)} className="cyber-panel p-6 text-center group hover:border-[#fcee0a] transition-colors relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(255,238,10,0.1)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="text-5xl mb-4 block" style={{ color: stage.color }}>{stage.icon}</span>
                        <h3 className="text-2xl font-bold mb-1 group-hover:text-[#fcee0a]" style={{ color: stage.color }}>{stage.title}</h3>
                        <p className="text-xs cyber-mono opacity-70 group-hover:text-[#fcee0a]">{stage.desc}</p>
                        <div className="mt-4 h-1 w-full bg-black">
                            <div className="h-full transition-all duration-500 group-hover:w-full" style={{ width: '20%', backgroundColor: stage.color }}></div>
                        </div>
                    </button>
                ))}
            </div>
        </motion.div>
    );
};

export const CyberpunkPromptTypeSelector: React.FC<{ logic: any }> = ({ logic }) => {
    const { intensity, handleDraw, setIntensity } = logic;
    return (
        <motion.div key="type" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full">
            <div className="flex gap-8 w-full max-w-2xl mb-12">
                <button onClick={() => handleDraw('Truth')} className="cyber-panel p-8 flex-1 flex flex-col items-center group hover:border-[#00f0ff]">
                    <span className="text-6xl mb-4 opacity-80 group-hover:opacity-100 group-hover:text-[#00f0ff]">👁️‍🗨️</span>
                    <span className="text-3xl font-bold tracking-widest group-hover:text-[#00f0ff]">INTEGRITY</span>
                    <span className="text-xs cyber-mono mt-2 opacity-50 block">[ TRUTH ]</span>
                </button>
                <button onClick={() => handleDraw('Dare')} className="cyber-panel p-8 flex-1 flex flex-col items-center group hover:border-[#fcee0a]">
                    <span className="text-6xl mb-4 opacity-80 group-hover:opacity-100 group-hover:text-[#fcee0a]">🔥</span>
                    <span className="text-3xl font-bold tracking-widest group-hover:text-[#fcee0a]">EXECUTION</span>
                    <span className="text-xs cyber-mono mt-2 opacity-50 block">[ DARE ]</span>
                </button>
            </div>
            <button onClick={() => setIntensity(null)} className="text-[#ff003c] cyber-mono text-sm tracking-widest hover:text-[#fcee0a] transition-colors">[ ABORT PROTOCOL ]</button>
        </motion.div>
    );
};

export const CyberpunkPromptLayout: React.FC<{ children: React.ReactNode; logic: any }> = ({ children, logic }) => {
    const { prompt } = logic;
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <span className="bg-[#ff003c] text-black px-3 py-1 font-bold text-xl tracking-widest">{prompt?.type.toUpperCase()}</span>
                    <span className="cyber-mono text-xs text-[#00f0ff] border border-[#00f0ff]/30 px-2 py-1">SYS.MSG</span>
                </div>
            </div>

            <div className="cyber-panel flex-1 p-6 sm:p-10 flex flex-col bg-[rgba(255,0,60,0.02)]">
                <p className="text-3xl sm:text-4xl font-semibold leading-tight text-white mb-8 border-l-4 border-[#ff003c] pl-6 tracking-wide">
                    {prompt?.text}
                </p>

                {prompt?.penalty && (
                    <div className="mt-auto bg-[#050505] border border-[#fcee0a]/30 p-4 relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#fcee0a] to-transparent"></div>
                        <span className="text-[#fcee0a] cyber-mono text-xs tracking-widest mb-1 block">FAILURE CONDITION:</span>
                        <p className="text-xl text-white/90 font-medium">{prompt.penalty}</p>
                    </div>
                )}
            </div>

            <div className="flex gap-4 mt-6">
                {children}
            </div>
        </motion.div>
    );
};

export const CyberpunkPlayButton: React.FC<{ label: string; onClick: () => void; isPrimary?: boolean }> = ({ label, onClick, isPrimary }) => {
    return (
        <button onClick={onClick} className={`cyber-button text-xl flex-1 ${isPrimary ? 'cyan' : 'yellow'}`}>
            {label}
        </button>
    );
};

export const CyberpunkDecksScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { customDecks, setEditingDeck, deleteDeck, editingDeck, generateId, saveDeck, addNewPromptToEditingDeck, updatePromptInEditingDeck, removePromptFromEditingDeck } = logic;
    return (
        <AnimatePresence mode="wait">
            {!editingDeck ? (
                <div className="space-y-6">
                    <div className="flex justify-between items-center bg-[#ff003c]/10 p-4 border-l-4 border-[#ff003c]">
                        <h2 className="text-2xl font-bold tracking-widest text-[#ff003c]">INVENTORY</h2>
                        <button onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })} className="cyber-button text-sm cyan">CRAFT NEW</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {customDecks.map((deck: any) => (
                            <div key={deck.id} className="cyber-panel p-4 flex flex-col">
                                <h3 className="text-2xl font-bold text-[#00f0ff] mb-1">{deck.name}</h3>
                                <p className="text-xs cyber-mono text-[#fcee0a] mb-4">CAPACITY: {deck.prompts.length} SHARDS</p>
                                <div className="mt-auto flex gap-2">
                                    <button onClick={() => setEditingDeck(deck)} className="cyber-button text-xs flex-1 cyan text-center text-black">MODIFY</button>
                                    <button onClick={() => deleteDeck(deck.id)} className="cyber-button text-xs bg-[#ff003c] !text-black flex-1 text-center">SCRAP</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col h-full space-y-4">
                    <input className="w-full bg-[#050505] border border-[#00f0ff]/50 p-4 text-2xl font-bold text-[#00f0ff] focus:outline-none focus:border-[#00f0ff] cyber-mono" value={editingDeck.name} onChange={e => setEditingDeck({ ...editingDeck, name: e.target.value })} placeholder="DATASET_NAME" />

                    <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-2">
                        {editingDeck.prompts.map((p: any) => (
                            <div key={p.id} className="cyber-panel p-4 flex flex-col gap-3">
                                <div className="flex justify-between items-center border-b border-[#ff003c]/20 pb-2">
                                    <select className="bg-transparent text-[#00f0ff] cyber-mono text-sm border-none outline-none font-bold" value={p.type} onChange={e => updatePromptInEditingDeck(p.id, 'type', e.target.value)}>
                                        <option className="bg-black">Truth</option><option className="bg-black">Dare</option><option className="bg-black">NeverHaveIEver</option>
                                    </select>
                                    <button onClick={() => removePromptFromEditingDeck(p.id)} className="text-[#ff003c] hover:text-white">x</button>
                                </div>
                                <textarea className="w-full bg-transparent text-white focus:outline-none font-medium resize-none" value={p.text} onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)} placeholder="Enter command..." />
                            </div>
                        ))}
                    </div>

                    <button onClick={addNewPromptToEditingDeck} className="cyber-button border-dashed w-full py-4 text-center font-bold tracking-widest">+ ADD SHARD</button>

                    <div className="flex gap-4 mt-2">
                        <button onClick={() => setEditingDeck(null)} className="cyber-button flex-1 text-center">DISCARD</button>
                        <button onClick={() => saveDeck(editingDeck)} className="cyber-button cyan flex-1 text-center font-bold">SAVE TO DB</button>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

export const CyberpunkHistoryScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { history } = logic;
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-widest text-[#00f0ff] border-b border-[#00f0ff]/30 pb-2">MESSAGE LOG</h2>
            <div className="space-y-2">
                {history.map((item: any, i: number) => (
                    <div key={i} className="flex flex-col bg-[#ff003c]/5 p-3 border-l-2 border-[#ff003c]">
                        <span className="text-xs cyber-mono text-[#fcee0a] mb-1">SRC: {item.type.toUpperCase()} // ID: {history.length - i}</span>
                        <p className="text-white font-medium">{item.text}</p>
                    </div>
                ))}
                {history.length === 0 && <div className="py-12 text-center cyber-mono text-[#ff003c]/50">NO MESSAGES FOUND.</div>}
            </div>
        </div>
    );
};

export const CyberpunkThemesScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setTheme, theme } = logic;
    const themeLabels: Record<string, string> = {
        [Theme.PERSONA]: 'PERSONA 5',
        [Theme.MINECRAFT]: 'MINECRAFT',
        [Theme.DANGANRONPA]: 'DANGANRONPA',
        [Theme.OMORI]: 'OMORI',
        [Theme.KIRBY]: 'KIRBY',
        [Theme.POKEMON]: 'POKÉMON',
        [Theme.ANIMAL_CROSSING]: 'ANIMAL CROSSING',
        [Theme.SKYRIM]: 'SKYRIM',
        [Theme.SONIC]: 'SONIC MANIA',
        [Theme.SANRIO]: 'SANRIO',
        [Theme.CYBERPUNK]: 'CYBERPUNK 2077',
            [Theme.UNDERTALE]: 'UNDERTALE',
            [Theme.FALLOUT]: 'FALLOUT',
            [Theme.HAZBIN]: 'HAZBIN HOTEL',
    };
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-widest text-[#00f0ff] border-b border-[#00f0ff]/30 pb-2">DATABASE</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-8">
                {Object.values(Theme).filter(t => t !== Theme.NONE).map(t => (
                    <button key={t} onClick={() => setTheme(t)} className={`cyber-button text-left text-sm py-4 ${theme === t ? 'cyan active text-black font-bold' : ''}`}>
                        {themeLabels[t] || t.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
};

export const CyberpunkSettingsScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setView } = logic;
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-widest text-[#00f0ff] border-b border-[#00f0ff]/30 pb-2">SETTINGS</h2>
            <div className="cyber-panel p-6 space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-2"><span className="text-lg">DIFFICULTY</span><span className="text-[#fcee0a] cyber-mono">HARD</span></div>
                <div className="flex justify-between items-center border-b border-white/10 pb-2"><span className="text-lg">LANGUAGE</span><span className="text-[#00f0ff] cyber-mono">EN</span></div>
                <button onClick={() => setView('menu')} className="w-full cyber-button mt-8 !border-[#ff003c] !bg-[#ff003c]/10 text-center font-bold tracking-widest">EXIT TO MAIN MENU</button>
            </div>
        </div>
    );
};

export const CyberpunkTheme: ThemeDefinition = {
    id: Theme.CYBERPUNK,
    name: 'Cyberpunk 2077',
    cssVars: {
        '--theme-accent': '#00f0ff',
    },
    MenuLayout: CyberpunkMenuLayout,
    MenuButton: CyberpunkMenuButton,
    LayoutComponent: CyberpunkLayout,
    IntensitySelector: CyberpunkIntensitySelector,
    PromptTypeSelector: CyberpunkPromptTypeSelector,
    PromptLayout: CyberpunkPromptLayout,
    PlayButton: CyberpunkPlayButton,
    DecksScreen: CyberpunkDecksScreen,
    HistoryScreen: CyberpunkHistoryScreen,
    SettingsScreen: CyberpunkSettingsScreen,
    ThemesScreen: CyberpunkThemesScreen,
    tabLabels: {
        play: 'CRAFTING',
        decks: 'INVENTORY',
        history: 'JOURNAL',
        themes: 'MAP',
        settings: 'CHARACTER'
    }
};
