import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme, ThemeDefinition } from '../types';
import { allThemesList } from './allThemesList';

const STAGES = [
    { id: Intensity.SOFT, title: 'ACT 1', desc: 'CHILL ZONE', color: '#0122e5', secondary: '#ffde00', icon: '🌀' },
    { id: Intensity.HOT, title: 'ACT 2', desc: 'TURBO ZONE', color: '#ffde00', secondary: '#000', icon: '⚡' },
    { id: Intensity.VULGAR, title: 'FINAL BOSS', desc: 'MAX SPEED', color: '#e10000', secondary: '#FFF', icon: '🔥' },
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
        <div className="sonic-theme h-[100dvh] w-screen flex flex-col bg-[#0122e5] text-white overflow-hidden font-['Archivo_Black'] relative">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');
                .sonic-theme { 
                    font-family: 'Archivo Black', sans-serif;
                }
                .sonic-bg-dots {
                    background-color: #0122e5;
                    background-image: radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.2) 2px, transparent 0);
                    background-size: 24px 24px;
                }
                .sonic-panel { 
                    background: #fff; 
                    border: 6px solid #000; 
                    box-shadow: 12px 12px 0 #000; 
                    transform: skewX(-5deg); 
                    padding: 24px; 
                    color: #000; 
                    position: relative; 
                }
                .sonic-button { 
                    background: #ffde00; 
                    color: #000; 
                    border: 6px solid #000; 
                    padding: 16px 24px; 
                    transition: all 0.2s; 
                    transform: skewX(-10deg); 
                    font-weight: 900; 
                    font-style: italic; 
                    text-transform: uppercase; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    gap: 10px;
                    box-shadow: 6px 6px 0 #000;
                }
                .sonic-button:hover { 
                    background: #e10000; 
                    color: #fff; 
                    transform: skewX(-10deg) translate(-4px, -4px); 
                    box-shadow: 10px 10px 0 #000;
                }
                .sonic-button:active {
                    transform: skewX(-10deg) translate(2px, 2px); 
                    box-shadow: 4px 4px 0 #000;
                }
                .sonic-button.active { 
                    background: #fff; 
                    color: #000; 
                }
                .sonic-button.secondary {
                    background: #fff;
                }
                .sonic-button.secondary:hover {
                    background: #0122e5;
                    color: #fff;
                }
                .sonic-tab { 
                    flex: 1; 
                    height: 100%; 
                    display: flex; 
                    flex-direction: column; 
                    align-items: center; 
                    justify-content: center; 
                    gap: 2px; 
                    transition: all 0.2s; 
                    background: #000; 
                    color: #fff; 
                    border: none; 
                    transform: skewX(-15deg); 
                }
                .sonic-tab.active { 
                    background: #ffde00; 
                    color: #000; 
                    transform: skewX(-15deg) translateY(-8px); 
                    box-shadow: -4px 8px 0 #e10000; 
                }
                .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>

            <div className="absolute inset-0 sonic-bg-dots pointer-events-none"></div>

            <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[150%] h-[40%] bg-[#ffde00] transform -rotate-12 border-b-[12px] border-black shadow-[0_20px_0_#e10000]"></div>
            </div>

            <header className="p-6 flex justify-between items-center shrink-0 relative z-10">
                <div className="flex flex-col relative">
                    <h1 className="text-5xl italic font-black text-white text-stroke-black drop-shadow-[6px_6px_0_#000] tracking-tighter" style={{ WebkitTextStroke: '2px black' }}>SONIC</h1>
                    <span className="text-sm bg-[#e10000] text-white border-4 border-black px-3 py-1 transform -skew-x-12 font-black italic w-fit shadow-[4px_4px_0_#000] absolute -bottom-4 -right-12">SUPERSTARS</span>
                </div>
                <div className="flex gap-2">
                    <div className="w-12 h-12 bg-[#ffde00] border-[4px] border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_#000] animate-pulse">
                        <div className="w-8 h-8 rounded-full border-[4px] border-[#e10000]"></div>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto px-4 pb-28 relative z-10 no-scrollbar mt-4">
                <div className="max-w-md mx-auto h-full">{children}</div>
            </main>

            <nav className="fixed bottom-0 left-[-5%] w-[110%] h-24 z-50 flex items-center bg-black border-t-[8px] border-[#ffde00] shadow-[0_-8px_0_#e10000]">
                {tabs.map((tab) => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`sonic-tab ${activeTab === tab.id ? 'active' : ''}`}>
                        <span className="text-2xl transform skew-x-[15deg]">{tab.icon}</span>
                        <span className="text-[11px] transform skew-x-[15deg] font-black tracking-widest uppercase mt-1">{tab.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

export const SonicMenuLayout: React.FC<{ children: React.ReactNode; logic: any }> = ({ children }) => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center space-y-12 pb-20 font-['Archivo_Black'] relative overflow-hidden bg-[#0122e5] select-none">
            <style>{`
                .sonic-menu-dots {
                    background-color: #0122e5;
                    background-image: radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.2) 2px, transparent 0);
                    background-size: 24px 24px;
                }
            `}</style>
            <div className="absolute inset-0 sonic-menu-dots z-0"></div>

            {/* Pop-Art Background Sweeps */}
            <div className="absolute top-0 right-[-20%] w-[150%] h-[60%] bg-[#ffde00] transform -rotate-12 border-b-[16px] border-black shadow-[0_24px_0_#e10000] z-0"></div>

            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative text-center z-10">
                <div className="relative">
                    <h1 className="text-7xl sm:text-[9rem] font-black italic text-white tracking-tighter leading-none mb-2 uppercase" style={{ WebkitTextStroke: '4px black', textShadow: '12px 12px 0 #000' }}>SONIC</h1>
                    <div className="bg-[#e10000] text-white px-8 py-2 transform -skew-x-12 border-8 border-black shadow-[8px_8px_0_#000] inline-block absolute right-[-10%] bottom-[-20%] rotate-[-5deg]">
                        <span className="text-3xl sm:text-5xl font-black italic uppercase">MANIA INFINITY</span>
                    </div>
                </div>
            </motion.div>

            <div className="flex flex-col gap-6 w-[85%] max-w-sm items-stretch z-10 pt-16">
                {children}
            </div>

            <div className="absolute bottom-12 flex gap-4 z-10">
                <span className="text-5xl">★</span>
                <span className="text-5xl text-[#ffde00]">★</span>
                <span className="text-5xl text-[#e10000]">★</span>
            </div>
        </div>
    );
};

export const SonicMenuButton: React.FC<{ label: string; onClick: () => void; isPrimary?: boolean }> = ({ label, onClick, isPrimary }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`sonic-button py-6 text-3xl justify-center ${isPrimary ? '' : 'secondary'}`}
        >
            {label}
        </motion.button>
    );
};

export const SonicIntensitySelector: React.FC<{ logic: any }> = ({ logic }) => {
    const { setIntensity } = logic;
    return (
        <motion.div key="intensity" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="space-y-8">
            <div className="sonic-panel !p-6">
                <h2 className="text-4xl italic font-black mb-6 text-center text-stroke-black text-white" style={{ WebkitTextStroke: '1px black', textShadow: '4px 4px 0 #000' }}>ACT SELECT</h2>
                <div className="flex flex-col gap-5">
                    {STAGES.map((stage) => (
                        <button key={stage.id} onClick={() => setIntensity(stage.id)} className="sonic-button py-6 group" style={{ borderColor: stage.secondary }}>
                            <div className="flex flex-col items-center">
                                <span className="text-3xl font-black group-hover:text-white transition-colors">{stage.title}</span>
                                <span className="text-sm opacity-80 tracking-[.2em] group-hover:text-white">{stage.desc}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export const SonicPromptTypeSelector: React.FC<{ logic: any }> = ({ logic }) => {
    const { intensity, handleDraw, setIntensity } = logic;
    return (
        <motion.div key="type" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-10 py-6">
            <div className="text-center relative">
                <h2 className="text-6xl italic font-black text-white drop-shadow-[8px_8px_0_black]" style={{ WebkitTextStroke: '2px black' }}>{intensity}</h2>
                <div className="w-[120%] h-4 bg-[#ffde00] transform -skew-x-12 border-4 border-black absolute -bottom-2 -left-[10%] -z-10 shadow-[4px_4px_0_#e10000]"></div>
            </div>
            <div className="grid grid-cols-1 gap-6 w-full max-w-sm">
                <button onClick={() => handleDraw('Truth')} className="sonic-button text-4xl py-10 !bg-[#0122e5] !text-white hover:!bg-[#ffde00] hover:!text-black">TRUTH</button>
                <button onClick={() => handleDraw('Dare')} className="sonic-button text-4xl py-10 !bg-[#e10000] !text-white hover:!bg-[#ffde00] hover:!text-black">DARE</button>
                <div className="pt-8 text-center">
                    <button onClick={() => setIntensity(null)} className="text-white italic font-black tracking-widest text-lg hover:text-[#ffde00] uppercase" style={{ textShadow: '2px 2px 0 #000' }}>[ ABORT MISSION ]</button>
                </div>
            </div>
        </motion.div>
    );
};

export const SonicPromptLayout: React.FC<{ children: React.ReactNode; logic: any }> = ({ children, logic }) => {
    const { prompt } = logic;
    return (
        <motion.div initial={{ rotate: -5, scale: 0.8 }} animate={{ rotate: 0, scale: 1 }} className="sonic-panel space-y-6 text-center !p-8 !bg-white">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#ffde00] border-l-[6px] border-b-[6px] border-black rounded-bl-full shadow-[-4px_4px_0_#e10000]"></div>

            <div className="flex flex-col items-start border-b-[6px] border-black pb-4 relative z-10 w-full">
                <span className="bg-[#e10000] text-white px-6 py-2 text-2xl italic font-black transform -skew-x-12 border-[4px] border-black shadow-[4px_4px_0_#000] rotate-[-2deg]">{prompt?.type}</span>
            </div>

            <p className="text-4xl sm:text-5xl italic font-black leading-[1.1] text-left pt-4 relative z-10 drop-shadow-[2px_2px_0_#ffde00]">
                "{prompt?.text.toUpperCase()}"
            </p>

            {prompt?.penalty && (
                <div className="pt-6 border-t-[6px] border-black text-left mt-8">
                    <div className="inline-block bg-[#0122e5] text-white px-3 py-1 font-black mb-2 text-sm tracking-[.2em] transform -skew-x-12 border-2 border-black">PENALTY ZONE</div>
                    <p className="text-3xl italic font-black text-[#e10000] drop-shadow-[2px_2px_0_black]" style={{ WebkitTextStroke: '1px black' }}>{prompt?.penalty.toUpperCase()}</p>
                </div>
            )}

            <div className="flex flex-col gap-4 pt-8 w-full">
                {children}
            </div>
        </motion.div>
    );
};

export const SonicPlayButton: React.FC<{ label: string; onClick: () => void; isPrimary?: boolean }> = ({ label, onClick, isPrimary }) => {
    return (
        <button onClick={onClick} className={`sonic-button text-2xl w-full py-5 ${isPrimary ? '' : 'secondary'}`}>
            {label}
        </button>
    );
};

export const SonicDecksScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { customDecks, setEditingDeck, deleteDeck, editingDeck, generateId, saveDeck, addNewPromptToEditingDeck, updatePromptInEditingDeck, removePromptFromEditingDeck } = logic;
    return (
        <AnimatePresence mode="wait">
            {!editingDeck ? (
                <div className="space-y-6">
                    <div className="flex justify-between items-end border-b-[8px] border-black pb-2 drop-shadow-[4px_4px_0_#000]">
                        <h2 className="text-5xl italic font-black text-white" style={{ WebkitTextStroke: '2px black' }}>ZONE SELECT</h2>
                        <button onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })} className="sonic-button secondary text-sm py-2 px-4">+ NEW</button>
                    </div>
                    <div className="space-y-5">
                        {customDecks.map((deck: any) => (
                            <div key={deck.id} className="sonic-panel !p-5 flex justify-between items-center bg-[#ffde00]">
                                <div><h3 className="text-3xl italic font-black tracking-tighter">{deck.name.toUpperCase()}</h3><p className="text-sm font-black text-[#e10000] bg-white border-2 border-black px-2 mt-1 inline-block transform -skew-x-12">{deck.prompts.length} FILES</p></div>
                                <div className="flex gap-2"><button onClick={() => setEditingDeck(deck)} className="sonic-button secondary py-2 px-4 shadow-[4px_4px_0_#000]">EDIT</button><button onClick={() => deleteDeck(deck.id)} className="sonic-button !bg-[#e10000] !text-white py-2 px-4 shadow-[4px_4px_0_#000]">DEL</button></div>
                            </div>
                        ))}
                        {customDecks.length === 0 && <div className="sonic-panel !p-10 text-center text-xl font-black">NO CUSTOM ZONES DEPLOYED</div>}
                    </div>
                </div>
            ) : (
                <div className="sonic-panel space-y-8 bg-[#0122e5]">
                    <div className="space-y-5">
                        <input className="w-full bg-white border-[6px] border-black p-4 text-3xl italic font-black focus:outline-none shadow-[6px_6px_0_#000] transform -skew-x-6" value={editingDeck.name} onChange={e => setEditingDeck({ ...editingDeck, name: e.target.value })} placeholder="ZONE IDENTIFIER" />
                        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                            {editingDeck.prompts.map((p: any) => (
                                <div key={p.id} className="bg-white border-[6px] border-black p-5 space-y-4 shadow-[4px_4px_0_#000]">
                                    <div className="flex gap-2 justify-between items-center">
                                        <select className="bg-black text-white p-2 italic font-black text-sm border-[3px] border-[#ffde00]" value={p.type} onChange={e => updatePromptInEditingDeck(p.id, 'type', e.target.value)}>
                                            <option>Truth</option><option>Dare</option><option>NeverHaveIEver</option>
                                        </select>
                                        <button onClick={() => removePromptFromEditingDeck(p.id)} className="bg-[#e10000] text-white px-3 py-1 font-black text-xl border-4 border-black shadow-[2px_2px_0_#000] hover:scale-110">×</button>
                                    </div>
                                    <textarea className="w-full bg-[#ffde00] border-[4px] border-black text-xl p-3 italic font-black resize-none h-24 shadow-[inset_4px_4px_0_rgba(0,0,0,0.1)]" value={p.text} onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)} placeholder="ENTER DATA..." />
                                </div>
                            ))}
                        </div>
                        <button onClick={addNewPromptToEditingDeck} className="w-full sonic-button text-2xl font-black py-4">+ ADD FILE</button>
                    </div>
                    <div className="flex gap-4"><button onClick={() => setEditingDeck(null)} className="flex-1 sonic-button secondary text-2xl font-black">ABORT</button><button onClick={() => saveDeck(editingDeck)} className="flex-1 sonic-button !bg-[#e10000] !text-white text-2xl font-black">SAVE</button></div>
                </div>
            )}
        </AnimatePresence>
    );
};

export const SonicHistoryScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { history } = logic;
    return (
        <div className="space-y-8">
            <h2 className="text-5xl italic font-black border-b-[8px] border-black pb-2 text-white" style={{ WebkitTextStroke: '2px black', textShadow: '4px 4px 0 #000' }}>DATA LOGS</h2>
            <div className="space-y-6">
                {history.map((item: any, i: number) => (
                    <div key={i} className="sonic-panel !p-6 border-l-[16px] border-[#ffde00]">
                        <div className="flex justify-between items-center text-sm font-black italic mb-3 tracking-widest text-[#0122e5]">
                            <span className="bg-black text-white px-2 py-1 transform -skew-x-12">{item.type.toUpperCase()}</span>
                            <span className="bg-white border-2 border-black px-2 mt-1">FILE {history.length - i}</span>
                        </div>
                        <p className="text-3xl font-black italic leading-[1.1]">"{item.text.toUpperCase()}"</p>
                    </div>
                ))}
                {history.length === 0 && <div className="py-20 text-center italic font-black text-4xl opacity-50 text-white" style={{ textShadow: '2px 2px 0 #000' }}>NO LOGS RECORDED</div>}
            </div>
        </div>
    );
};

export const SonicThemesScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setTheme, theme } = logic;
    return (
        <div className="space-y-8 mt-2">
            <h2 className="text-5xl flex items-center gap-4 italic font-black border-b-[8px] border-black pb-2 text-white" style={{ WebkitTextStroke: '2px black', textShadow: '4px 4px 0 #000' }}>
                <span className="text-4xl">🗺️</span> STAGE OUTPOST
            </h2>
            <div className="grid grid-cols-1 gap-5 pb-20">
                {allThemesList.map(t => (
                    <button key={t.id} onClick={() => setTheme(t.id)} className={`sonic-button py-6 text-3xl font-black italic ${theme === t.id ? 'active !bg-[#e10000] !text-white' : 'secondary'}`}>
                        {t.label.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
};

export const SonicSettingsScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setView } = logic;
    return (
        <div className="space-y-8">
            <h2 className="text-5xl italic font-black border-b-[8px] border-black pb-2 text-white" style={{ WebkitTextStroke: '2px black', textShadow: '4px 4px 0 #000' }}>SYSTEM OPTIONS</h2>
            <div className="sonic-panel !p-10 space-y-8 bg-[#ffde00]">
                <div className="flex justify-between items-center border-b-[6px] border-black pb-4"><span className="text-3xl italic font-black">SAVE DATA</span><span className="bg-[#e10000] text-white px-4 py-1 italic font-black border-4 border-black transform -skew-x-12 shadow-[4px_4px_0_#000]">AUTO</span></div>
                <div className="flex justify-between items-center border-b-[6px] border-black pb-4"><span className="text-3xl italic font-black">SOUND TEST</span><span className="bg-[#0122e5] text-white px-4 py-1 italic font-black border-4 border-black transform -skew-x-12 shadow-[4px_4px_0_#000]">BGM 01</span></div>
                <button onClick={() => setView('menu')} className="w-full sonic-button text-4xl py-8 mt-12 !bg-[#0122e5] !text-white hover:!bg-[#e10000]">RESTART</button>
            </div>
        </div>
    );
};

export const SonicTheme: ThemeDefinition = {
    id: Theme.SONIC,
    name: 'Sonic Mania',
    cssVars: {
        '--theme-accent': '#ffde00',
    },
    MenuLayout: SonicMenuLayout,
    MenuButton: SonicMenuButton,
    LayoutComponent: SonicLayout,
    IntensitySelector: SonicIntensitySelector,
    PromptTypeSelector: SonicPromptTypeSelector,
    PromptLayout: SonicPromptLayout,
    PlayButton: SonicPlayButton,
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
