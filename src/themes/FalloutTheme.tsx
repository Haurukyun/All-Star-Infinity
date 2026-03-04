import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme, ThemeDefinition } from '../types';
import { allThemesList } from './allThemesList';

const STAGES = [
    { id: Intensity.SOFT, title: '> LOCAL_THREAT', desc: 'RAD LEVEL: NOMINAL', color: '#21ed43' },
    { id: Intensity.HOT, title: '> REGIONAL_RISK', desc: 'RAD LEVEL: ELEVATED', color: '#21ed43' },
    { id: Intensity.VULGAR, title: '> GLOBAL_CRISIS', desc: 'RAD LEVEL: LETHAL', color: '#21ed43' },
];

export const FalloutLayout: React.FC<{ children: React.ReactNode; activeTab: string; setActiveTab: (tab: string) => void; logic: any }> = ({ children, activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'play', label: 'STAT' },
        { id: 'decks', label: 'INV' },
        { id: 'history', label: 'DATA' },
        { id: 'themes', label: 'MAP' },
        { id: 'settings', label: 'RADIO' },
    ];

    return (
        <div className="fallout-theme h-[100dvh] w-screen flex flex-col bg-[#000000] text-[#21ed43] overflow-hidden font-['Share_Tech_Mono'] relative">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
                .fallout-theme { 
                    font-family: 'Share Tech Mono', monospace;
                    text-shadow: 0 0 2px rgba(33, 237, 67, 0.4);
                }
                .pip-scanlines {
                    background: linear-gradient(
                        to bottom,
                        rgba(33, 237, 67, 0),
                        rgba(33, 237, 67, 0) 50%,
                        rgba(0, 0, 0, 0.4) 50%,
                        rgba(0, 0, 0, 0.4)
                    );
                    background-size: 100% 4px;
                    pointer-events: none;
                }
                .pip-vignette {
                    background: radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.9) 110%);
                    box-shadow: inset 0 0 80px rgba(0,0,0,0.7);
                    pointer-events: none;
                }
                .pip-glare {
                    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 100%);
                    pointer-events: none;
                    border-radius: 20px;
                }
                .pip-border {
                    border: 2px solid #21ed43;
                    border-radius: 12px;
                    box-shadow: 0 0 10px rgba(33, 237, 67, 0.4), inset 0 0 15px rgba(33, 237, 67, 0.2);
                    background-color: rgba(10, 30, 10, 0.8);
                }
                .fallout-aberration {
                    text-shadow: 2px 0 1px rgba(255,0,0,0.3), -2px 0 1px rgba(0,0,255,0.3), 0 0 4px rgba(33,237,67,0.5);
                }
                .pip-screen-container {
                    background: #051505;
                    position: relative;
                    overflow: hidden;
                    height: 100%;
                }
                .pip-hr {
                    width: 100%;
                    height: 2px;
                    background: repeating-linear-gradient(to right, #21ed43, #21ed43 10px, transparent 10px, transparent 20px);
                }
                .custom-scrollbar::-webkit-scrollbar { width: 12px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; border-left: 1px solid rgba(33, 237, 67, 0.3); }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(33, 237, 67, 0.7); border-radius: 6px; }
            `}</style>

            <div className="flex-1 w-full max-w-5xl mx-auto p-4 sm:p-8 flex flex-col relative z-10 h-full">
                <div className="pip-screen-container">
                    <div className="absolute inset-0 pip-scanlines z-40"></div>
                    <div className="absolute inset-0 pip-vignette z-50"></div>
                    <div className="absolute inset-0 pip-glare z-50"></div>

                    <div className="relative z-10 p-6 h-full flex flex-col fallout-aberration">
                        {/* Pip-Boy Header */}
                        <header className="flex justify-between items-end mb-4 border-b-2 border-[#21ed43] pb-2">
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold tracking-widest text-shadow">ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM</span>
                                <span className="text-sm opacity-70">COPYRIGHT 2075-2077 ROBCO INDUSTRIES</span>
                            </div>
                            <div className="text-2xl">-Server 1-</div>
                        </header>

                        {/* Main Content Area */}
                        <div className="flex-1 overflow-y-auto mb-4 custom-scrollbar pr-4 relative">
                            <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#051505] to-transparent z-20 pointer-events-none"></div>
                            <div className="py-4 h-full">{children}</div>
                            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#051505] to-transparent z-20 pointer-events-none"></div>
                        </div>

                        {/* Footer Navigation Tabs */}
                        <nav className="flex justify-between items-center border-t-2 border-[#21ed43] pt-4">
                            <div className="flex gap-4 sm:gap-8 overflow-x-auto no-scrollbar w-full px-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`text-xl sm:text-2xl hover:text-white transition-colors relative whitespace-nowrap min-w-[80px] text-center ${activeTab === tab.id ? 'opacity-100 font-bold' : 'opacity-60'}`}
                                    >
                                        {activeTab === tab.id && <span className="absolute -bottom-2 left-0 right-0 h-1 bg-[#21ed43]"></span>}
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                            <div className="hidden sm:flex text-xl opacity-70 border-l border-[#21ed43] pl-4 ml-4 shrink-0">
                                HP 115/115  |  AP 90/90
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const FalloutMenuLayout: React.FC<{ children: React.ReactNode; logic: any }> = ({ children }) => {
    return (
        <div className="h-[100dvh] w-screen flex flex-col justify-center items-center p-8 bg-[#000000] text-[#21ed43] font-['Share_Tech_Mono'] relative overflow-hidden">
            <style>{`
                .pip-scanlines {
                    background: linear-gradient(to bottom, rgba(33, 237, 67, 0), rgba(33, 237, 67, 0) 50%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.4));
                    background-size: 100% 4px;
                }
                .pip-vignette {
                    background: radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.9) 110%);
                    box-shadow: inset 0 0 80px rgba(0,0,0,0.7);
                    pointer-events: none;
                }
                .pip-glare {
                    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 100%);
                    pointer-events: none;
                    border-radius: 20px;
                }
                .fallout-aberration {
                    text-shadow: 2px 0 1px rgba(255,0,0,0.3), -2px 0 1px rgba(0,0,255,0.3), 0 0 4px rgba(33,237,67,0.5);
                }
                .pip-screen-container {
                    background: #051505;
                    position: relative;
                    overflow: hidden;
                    height: 100%;
                }
            `}</style>

            <div className="pip-screen-container flex flex-col justify-center items-center py-12">
                <div className="absolute inset-0 pip-scanlines pointer-events-none z-40 opacity-40"></div>
                <div className="absolute inset-0 pip-vignette pointer-events-none z-50"></div>
                <div className="absolute inset-0 pip-glare pointer-events-none z-50"></div>

                <div className="text-center mb-12 relative z-10 w-full max-w-3xl fallout-aberration">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                        <div className="text-left text-xl opacity-60 mb-2">&gt; Initialize... OK</div>
                        <div className="text-left text-xl opacity-60 mb-8">&gt; Loading Vault-Tec interface... OK</div>
                    </motion.div>

                    <h1 className="text-5xl sm:text-7xl tracking-widest border-2 border-[#21ed43] p-4 bg-[#21ed43]/10">
                        ALL-STAR INFINITY
                    </h1>
                    <p className="text-xl mt-4 opacity-80">&gt; v1.0.5 [HOLOTAPE VERSION]</p>
                </div>

                <div className="flex flex-col gap-4 w-full max-w-sm relative z-10 p-6 pip-border bg-[#051505] fallout-aberration">
                    {children}
                </div>
            </div>
        </div>
    );
};

export const FalloutMenuButton: React.FC<{ label: string; onClick: () => void; isPrimary?: boolean }> = ({ label, onClick, isPrimary }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            className="text-left py-2 px-4 text-3xl transition-colors relative"
        >
            <div className={`absolute inset-0 ${isHovered ? 'bg-[#21ed43]' : 'bg-transparent'}`}></div>
            <span className={`relative z-10 ${isHovered ? 'text-black' : 'text-[#21ed43]'}`}>
                {isHovered ? `> ${label}` : `  ${label}`}
            </span>
        </button>
    );
};

export const FalloutIntensitySelector: React.FC<{ logic: any }> = ({ logic }) => {
    const { setIntensity } = logic;
    return (
        <motion.div key="intensity" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full">
            <h2 className="text-3xl mb-8 border-b-2 border-[#21ed43] pb-2">&gt; SELECT RADIATION LEVEL</h2>
            <div className="space-y-6">
                {STAGES.map((stage) => (
                    <button
                        key={stage.id}
                        onClick={() => setIntensity(stage.id)}
                        className="w-full text-left py-4 px-6 text-3xl pip-border hover:bg-[#21ed43] hover:text-black transition-colors group relative"
                    >
                        <span className="group-hover:opacity-0 transition-opacity">{stage.title}</span>
                        <div className="absolute inset-0 flex flex-col justify-center px-6 opacity-0 group-hover:opacity-100 text-black">
                            <span>{stage.title}</span>
                            <span className="text-xl opacity-80">{stage.desc}</span>
                        </div>
                    </button>
                ))}
            </div>
        </motion.div>
    );
};

export const FalloutPromptTypeSelector: React.FC<{ logic: any }> = ({ logic }) => {
    const { handleDraw, setIntensity } = logic;
    return (
        <motion.div key="type" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
            <div className="pip-border p-6 mb-8 text-2xl">
                &gt; WAITING FOR INPUT...<br />
                &gt; SELECT DIRECTORY:
            </div>

            <div className="space-y-4 max-w-xl mx-auto w-full">
                <button
                    onClick={() => handleDraw('Truth')}
                    className="w-full text-left p-4 text-3xl border border-[#21ed43] hover:bg-[#21ed43] hover:text-black transition-colors"
                >
                    [ TRUTH.exe ]
                </button>
                <button
                    onClick={() => handleDraw('Dare')}
                    className="w-full text-left p-4 text-3xl border border-[#21ed43] hover:bg-[#21ed43] hover:text-black transition-colors"
                >
                    [ DARE.bat ]
                </button>
                <div className="py-4 text-center">--- OR ---</div>
                <button
                    onClick={() => setIntensity(null)}
                    className="w-full text-center p-4 text-3xl hover:bg-[#21ed43]/20 transition-colors"
                >
                    [ RETURN TO MAIN ]
                </button>
            </div>
        </motion.div>
    );
};

export const FalloutPromptLayout: React.FC<{ children: React.ReactNode; logic: any }> = ({ children, logic }) => {
    const { prompt } = logic;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full justify-between">
            <div className="text-2xl opacity-70 mb-2">&gt; EXECUTING: {prompt?.type.toUpperCase()}</div>

            <div className="flex-1 pip-border p-8 mb-8 bg-[#21ed43]/5 flex flex-col justify-center">
                <p className="text-4xl leading-relaxed whitespace-pre-wrap">
                    {prompt?.text}
                </p>

                {prompt?.penalty && (
                    <div className="mt-12 pt-6 relative border-t-0">
                        <div className="absolute top-0 left-0 pip-hr"></div>
                        <div className="text-xl opacity-80 mt-2">&gt; FAILURE PROTOCOL:</div>
                        <p className="text-2xl mt-4">{prompt.penalty}</p>
                    </div>
                )}
            </div>

            <div className="flex justify-between gap-4">
                {children}
            </div>
        </motion.div>
    );
};

export const FalloutPlayButton: React.FC<{ label: string; onClick: () => void; isPrimary?: boolean }> = ({ label, onClick, isPrimary }) => {
    return (
        <button
            onClick={onClick}
            className={`flex-1 text-2xl py-4 transition-colors ${isPrimary ? 'bg-[#21ed43]/20 border-2 border-[#21ed43] hover:bg-[#21ed43] hover:text-black font-bold' : 'border border-[#21ed43]/50 hover:bg-[#21ed43]/10'}`}
        >
            [ {label} ]
        </button>
    );
};

export const FalloutDecksScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { customDecks, setEditingDeck, deleteDeck, editingDeck, generateId, saveDeck, addNewPromptToEditingDeck, updatePromptInEditingDeck, removePromptFromEditingDeck } = logic;
    return (
        <AnimatePresence mode="wait">
            {!editingDeck ? (
                <div className="space-y-6 flex flex-col h-full">
                    <div className="flex justify-between items-end border-b-2 border-[#21ed43] pb-2">
                        <h2 className="text-3xl">&gt; INVENTORY</h2>
                        <button onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })} className="text-xl hover:bg-[#21ed43] hover:text-black px-2">[ ADD ENTRY ]</button>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 space-y-4">
                        {customDecks.map((deck: any) => (
                            <div key={deck.id} className="pip-border p-4 flex justify-between items-center group">
                                <div className="flex flex-col">
                                    <span className="text-2xl">{deck.name}</span>
                                    <span className="text-lg opacity-60">LOC: {deck.prompts.length} ITEMS</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button onClick={() => setEditingDeck(deck)} className="hover:bg-[#21ed43] hover:text-black px-2 text-xl">[ EDIT ]</button>
                                    <button onClick={() => deleteDeck(deck.id)} className="hover:bg-red-500 hover:text-black px-2 text-xl text-red-400">[ DEL ]</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col h-full space-y-6">
                    <div className="flex items-center gap-4 border-b border-[#21ed43] pb-2">
                        <span className="text-2xl">&gt; NAME:</span>
                        <input className="flex-1 bg-transparent text-3xl focus:outline-none" value={editingDeck.name} onChange={e => setEditingDeck({ ...editingDeck, name: e.target.value })} placeholder="Enter database name..." />
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar pr-4">
                        {editingDeck.prompts.map((p: any) => (
                            <div key={p.id} className="border border-[#21ed43]/40 p-4">
                                <div className="flex justify-between items-center bg-[#21ed43]/10 p-2 mb-2">
                                    <select className="bg-black text-[#21ed43] text-xl outline-none" value={p.type} onChange={e => updatePromptInEditingDeck(p.id, 'type', e.target.value)}>
                                        <option>Truth</option><option>Dare</option><option>NeverHaveIEver</option>
                                    </select>
                                    <button onClick={() => removePromptFromEditingDeck(p.id)} className="hover:bg-[#21ed43] hover:text-black px-2">X</button>
                                </div>
                                <textarea className="w-full bg-transparent text-[#21ed43] focus:outline-none text-2xl resize-none h-24" value={p.text} onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)} placeholder="Entry log..." />
                            </div>
                        ))}
                        <button onClick={addNewPromptToEditingDeck} className="w-full text-center py-4 border border-dashed border-[#21ed43] hover:bg-[#21ed43]/20">[ + NEW RECORD ]</button>
                    </div>

                    <div className="flex gap-4 pt-4 border-t-2 border-[#21ed43]">
                        <button onClick={() => setEditingDeck(null)} className="flex-1 py-2 hover:bg-[#21ed43]/20">[ ABORT ]</button>
                        <button onClick={() => saveDeck(editingDeck)} className="flex-1 py-2 bg-[#21ed43]/20 border border-[#21ed43] hover:bg-[#21ed43] hover:text-black font-bold">[ COMMIT ]</button>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

export const FalloutHistoryScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { history } = logic;
    return (
        <div className="space-y-6 h-full flex flex-col">
            <h2 className="text-3xl border-b-2 border-[#21ed43] pb-2">&gt; DATA LOG</h2>
            <div className="space-y-2 overflow-y-auto custom-scrollbar pr-4 flex-1">
                {history.map((item: any, i: number) => (
                    <div key={i} className="flex flex-col p-2 border-l border-[#21ed43] bg-[#21ed43]/5">
                        <span className="text-lg opacity-60">MSG ID: {history.length - i} // {item.type.toUpperCase()}</span>
                        <p className="text-xl">{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const FalloutThemesScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setTheme, theme } = logic;
    const falloutLabels: Record<string, string> = {
        [Theme.PERSONA]: 'PERSONA_OS', [Theme.MINECRAFT]: 'MINECRAFT_OS',
        [Theme.DANGANRONPA]: 'DANGAN_OS', [Theme.OMORI]: 'OMORI_OS',
        [Theme.KIRBY]: 'KIRBY_OS', [Theme.POKEMON]: 'PKMN_OS',
        [Theme.ANIMAL_CROSSING]: 'ACNH_OS', [Theme.SKYRIM]: 'SKYRIM_OS',
        [Theme.SONIC]: 'SONIC_OS', [Theme.SANRIO]: 'SANRIO_OS',
        [Theme.CYBERPUNK]: 'NETRUN_OS', [Theme.UNDERTALE]: 'MTT_OS',
        [Theme.FALLOUT]: 'ROBCO_OS', [Theme.HAZBIN]: 'HELL_OS',
        [Theme.VOCALOID]: 'MIKU_OS', [Theme.FNAF]: 'FAZBEAR_OS',
        [Theme.IRUMA]: 'BABYLS_OS', [Theme.ARCANE]: 'HEX_OS',
    };
    return (
        <div className="space-y-6 h-full flex flex-col">
            <h2 className="text-3xl border-b-2 border-[#21ed43] pb-2">&gt; OVERRIDE SYSTEM THEME</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-8 overflow-y-auto custom-scrollbar pr-4">
                {allThemesList.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`text-left text-2xl p-2 border ${theme === t.id ? 'border-[#21ed43] bg-[#21ed43] text-black font-bold' : 'border-transparent hover:border-[#21ed43]/50'}`}
                    >
                        {theme === t.id ? '► ' : '  '}{falloutLabels[t.id] || t.id.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
};

export const FalloutSettingsScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setView } = logic;
    return (
        <div className="space-y-8 h-full">
            <h2 className="text-3xl border-b-2 border-[#21ed43] pb-2">&gt; RADIO / SETTINGS</h2>
            <div className="pip-border p-6 space-y-6">
                <div className="flex justify-between items-center border-b border-[#21ed43]/30 pb-2"><span className="text-2xl">VOLUME</span><span className="text-2xl">100%</span></div>
                <div className="flex justify-between items-center border-b border-[#21ed43]/30 pb-2"><span className="text-2xl">CRT FLICKER</span><span className="text-2xl">ON</span></div>
                <button onClick={() => setView('menu')} className="w-full text-center text-3xl pt-8 hover:bg-[#21ed43]/20 transition-colors p-4 mt-8">[ SHUTDOWN SYSTEM ]</button>
            </div>
        </div>
    );
};

export const FalloutTheme: ThemeDefinition = {
    id: Theme.FALLOUT,
    name: 'Fallout Pip-Boy',
    cssVars: {
        '--theme-accent': '#21ed43',
    },
    MenuLayout: FalloutMenuLayout,
    MenuButton: FalloutMenuButton,
    LayoutComponent: FalloutLayout,
    IntensitySelector: FalloutIntensitySelector,
    PromptTypeSelector: FalloutPromptTypeSelector,
    PromptLayout: FalloutPromptLayout,
    PlayButton: FalloutPlayButton,
    DecksScreen: FalloutDecksScreen,
    HistoryScreen: FalloutHistoryScreen,
    SettingsScreen: FalloutSettingsScreen,
    ThemesScreen: FalloutThemesScreen,
    tabLabels: {
        play: 'STAT',
        decks: 'INV',
        history: 'DATA',
        themes: 'MAP',
        settings: 'RADIO'
    }
};
