import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme, ThemeDefinition } from '../types';

const STAGES = [
    { id: Intensity.SOFT, title: 'EASY MODE', desc: 'SLOW TEMPO', color: '#39C5BB' },
    { id: Intensity.HOT, title: 'NORMAL MODE', desc: 'UPBEAT TEMPO', color: '#FF1493' },
    { id: Intensity.VULGAR, title: 'EXTREME MODE', desc: 'BPM 200+', color: '#FF1493' },
];

export const VocaloidLayout: React.FC<{ children: React.ReactNode; activeTab: string; setActiveTab: (tab: string) => void; logic: any }> = ({ children, activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'play', label: 'PLAY' },
        { id: 'decks', label: 'TRACKLIST' },
        { id: 'history', label: 'REPLAY' },
        { id: 'themes', label: 'STAGE' },
        { id: 'settings', label: 'SYSTEM' },
    ];

    return (
        <div className="vocaloid-theme h-[100dvh] w-screen flex flex-col bg-[#111111] text-[#39C5BB] overflow-hidden font-['Orbitron'] relative">
            <style>{`
                .vocaloid-theme {
                    font-family: 'Orbitron', sans-serif;
                }
                .vocaloid-glow {
                    box-shadow: 0 0 10px rgba(57, 197, 187, 0.5), inset 0 0 15px rgba(57, 197, 187, 0.2);
                }
                .vocaloid-glow-pink {
                    box-shadow: 0 0 10px rgba(255, 20, 147, 0.5), inset 0 0 15px rgba(255, 20, 147, 0.2);
                }
                .vocaloid-bg {
                    background: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.02) 0px, rgba(255, 255, 255, 0.02) 2px, transparent 2px, transparent 10px);
                }
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #39C5BB; border-radius: 10px; }
            `}</style>

            <div className="absolute inset-0 vocaloid-bg z-0 pointer-events-none"></div>

            <div className="flex-1 w-full max-w-5xl mx-auto p-4 sm:p-6 flex flex-col relative z-10 h-full">
                {/* Header */}
                <div className="z-20 mb-8 border-4 border-[#39C5BB] bg-black/80 p-4 sm:p-12 transform sm:-skew-x-12 vocaloid-glow relative mx-4 sm:mx-0">
                    <div className="transform sm:skew-x-12">
                        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-2 justify-center">
                            <div className="w-12 h-12 bg-[#FF1493] rounded-full flex items-center justify-center text-black font-black text-2xl rotate-12 mb-2 sm:mb-0">01</div>
                            <div className="text-center sm:text-left">
                                <h1 className="text-xl sm:text-2xl font-black tracking-widest text-white drop-shadow-[0_0_5px_rgba(57,197,187,0.8)]">VIRTUAL SINGER</h1>
                                <p className="text-[10px] sm:text-xs text-[#FF1493] tracking-widest">VOCALOID SOUND SYSTEM</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto mb-4 custom-scrollbar relative">
                    {children}
                </div>

                {/* Footer Navigation Tabs */}
                <nav className="flex justify-center border-t-2 border-[#FF1493] pt-4 z-40 relative">
                    <div className="flex overflow-x-auto no-scrollbar py-2 px-2 gap-4 w-full justify-around max-w-2xl bg-[#1a1a1a] rounded-xl vocaloid-glow-pink">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`text-base sm:text-lg hover:text-white transition-all duration-300 relative whitespace-nowrap px-4 py-2 rounded-lg ${activeTab === tab.id ? 'bg-[#39C5BB] text-[#111] font-bold' : 'text-[#39C5BB] hover:bg-[#39C5BB]/20'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </nav>
            </div>
        </div>
    );
};

export const VocaloidMenuLayout: React.FC<{ children: React.ReactNode; logic: any }> = ({ children }) => {
    return (
        <div className="h-[100dvh] w-screen flex flex-col justify-center items-center p-8 bg-[#111] text-[#39C5BB] font-['Orbitron'] relative overflow-hidden">
            <style>{`
                .vocaloid-menu-bg {
                    background: repeating-linear-gradient(-45deg, rgba(57, 197, 187, 0.1) 0px, rgba(57, 197, 187, 0.1) 10px, transparent 10px, transparent 40px);
                }
                @keyframes eq-bar {
                    0%, 100% { height: 10%; }
                    50% { height: 100%; }
                }
            `}</style>

            <div className="absolute inset-0 vocaloid-menu-bg z-0 opacity-50"></div>

            <div className="absolute bottom-0 left-0 w-full h-32 flex items-end justify-center gap-2 opacity-20 pointer-events-none z-10">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="w-8 bg-[#39C5BB] rounded-t-md" style={{ animation: `eq-bar ${Math.random() * 1 + 0.5}s infinite ease-in-out`, height: `${Math.random() * 80 + 20}%` }}></div>
                ))}
            </div>

            <div className="text-center z-20 mb-12">
                <div className="inline-block px-4 py-1 bg-[#FF1493] text-white text-sm font-bold tracking-widest rounded-full mb-4">SYSTEM READY</div>
                <h1 className="text-6xl sm:text-8xl font-black text-white italic tracking-tighter drop-shadow-[0_0_15px_rgba(57,197,187,0.8)]">
                    ALL-STAR<br /><span className="text-[#39C5BB]">INFINITY</span>
                </h1>
            </div>

            <div className="relative z-20 flex flex-col gap-4 w-full max-w-sm">
                {children}
            </div>
        </div >
    );
};

export const VocaloidMenuButton: React.FC<{ label: string; onClick: () => void; isPrimary?: boolean }> = ({ label, onClick, isPrimary }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full text-center py-4 px-6 text-xl sm:text-2xl font-bold tracking-widest rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${isPrimary
                ? 'bg-[#39C5BB] text-[#111] shadow-[0_0_15px_rgba(57,197,187,0.5)] hover:shadow-[0_0_25px_rgba(57,197,187,0.8)]'
                : 'border-2 border-[#FF1493] text-[#FF1493] hover:bg-[#FF1493] hover:text-white shadow-[0_0_10px_rgba(255,20,147,0.3)] hover:shadow-[0_0_20px_rgba(255,20,147,0.6)]'
                }`}
        >
            {label} {isPrimary && '▶'}
        </button>
    );
};

export const VocaloidIntensitySelector: React.FC<{ logic: any }> = ({ logic }) => {
    const { setIntensity } = logic;
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col h-full justify-center space-y-6 sm:space-y-8 px-4 sm:px-0">
            <h2 className="text-2xl sm:text-3xl text-center font-black text-white drop-shadow-[0_0_5px_rgba(57,197,187,0.8)]">SELECT DIFFIULTY</h2>
            <div className="space-y-4">
                {STAGES.map((stage) => (
                    <button
                        key={stage.id}
                        onClick={() => setIntensity(stage.id)}
                        className="w-full relative overflow-hidden group p-6 rounded-xl border-l-4 vocaloid-glow transition-all hover:scale-[1.02]"
                        style={{ borderLeftColor: stage.color, backgroundColor: 'rgba(30,30,30,0.8)' }}
                    >
                        <div className="flex justify-between items-center text-left relative z-10">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]">{stage.title}</h3>
                                <p className="text-sm font-semibold tracking-widest" style={{ color: stage.color }}>{stage.desc}</p>
                            </div>
                            <div className="text-3xl opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: stage.color }}>➔</div>
                        </div>
                    </button>
                ))}
            </div>
        </motion.div>
    );
};

export const VocaloidPromptTypeSelector: React.FC<{ logic: any }> = ({ logic }) => {
    const { handleDraw, setIntensity } = logic;
    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col h-full justify-center space-y-6 sm:space-y-8 px-4 sm:px-0">
            <div className="text-center">
                <div className="inline-block px-4 py-1 bg-[#39C5BB] text-[#111] font-bold rounded-full text-xs tracking-widest mb-4">MODE SELECTED</div>
                <h2 className="text-3xl sm:text-4xl text-white font-black drop-shadow-[0_0_5px_rgba(57,197,187,0.8)]">CHOOSE TRACK</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                    onClick={() => handleDraw('Truth')}
                    className="p-4 sm:p-8 text-xl sm:text-2xl font-bold bg-[#1a1a1a] rounded-xl border-2 border-[#39C5BB] text-[#39C5BB] hover:bg-[#39C5BB] hover:text-[#111] transition-all vocaloid-glow text-center"
                >
                    <div className="text-3xl sm:text-4xl mb-2 sm:mb-4">🎤</div>
                    TRUTH TRACK
                </button>
                <button
                    onClick={() => handleDraw('Dare')}
                    className="p-4 sm:p-8 text-xl sm:text-2xl font-bold bg-[#1a1a1a] rounded-xl border-2 border-[#FF1493] text-[#FF1493] hover:bg-[#FF1493] hover:text-white transition-all vocaloid-glow-pink text-center"
                >
                    <div className="text-3xl sm:text-4xl mb-2 sm:mb-4">🎸</div>
                    DARE TRACK
                </button>
            </div>

            <button onClick={() => setIntensity(null)} className="w-full p-4 mt-8 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-bold tracking-widest">
                BACK TO DIFFICULTY
            </button>
        </motion.div>
    );
};

export const VocaloidPromptLayout: React.FC<{ children: React.ReactNode; logic: any }> = ({ children, logic }) => {
    const { prompt } = logic;
    const isTruth = prompt?.type === 'Truth';

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col h-full justify-between pb-8 px-4 sm:px-0">
            <div className="flex justify-center mb-6 sm:mb-8 mt-4 sm:mt-0">
                <div className={`px-4 sm:px-6 py-2 rounded-full font-bold text-sm sm:text-lg tracking-widest text-[#111] ${isTruth ? 'bg-[#39C5BB]' : 'bg-[#FF1493]'}`}>
                    NOW PLAYING: {prompt?.type.toUpperCase()}
                </div>
            </div>

            <div className={`flex-1 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-[#1a1a1a] border-y-4 ${isTruth ? 'border-[#39C5BB] vocaloid-glow' : 'border-[#FF1493] vocaloid-glow-pink'}`}>
                <p className="text-2xl sm:text-4xl text-center text-white font-bold leading-snug">
                    "{prompt?.text}"
                </p>

                {prompt?.penalty && (
                    <div className="mt-8 w-full max-w-md bg-black/50 p-4 rounded-lg border border-[#FF1493]/50">
                        <h4 className="text-[#FF1493] text-sm font-bold tracking-widest mb-2 text-center">PENALTY ZONE</h4>
                        <p className="text-white text-center text-lg">{prompt.penalty}</p>
                    </div>
                )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-xl mx-auto">
                {children}
            </div>
        </motion.div>
    );
};

export const VocaloidPlayButton: React.FC<{ label: string; onClick: () => void; isPrimary?: boolean }> = ({ label, onClick, isPrimary }) => {
    return (
        <button
            onClick={onClick}
            className={`flex-1 py-4 px-6 text-xl font-bold tracking-widest rounded-xl transition-all ${isPrimary
                ? 'bg-[#39C5BB] text-[#111] hover:shadow-[0_0_15px_rgba(57,197,187,0.8)]'
                : 'bg-white/10 text-white hover:bg-white/20'
                }`}
        >
            {label}
        </button>
    );
};

export const VocaloidDecksScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { customDecks, activeDeckId, setActiveDeckId } = logic;
    return (
        <div className="space-y-6 pb-20">
            <h2 className="text-3xl font-black text-white border-b-2 border-[#39C5BB] pb-2 drop-shadow-[0_0_5px_rgba(57,197,187,0.8)]">TRACKLISTS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {customDecks.map((deck: any) => (
                    <div
                        key={deck.id}
                        onClick={() => setActiveDeckId(deck.id)}
                        className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${activeDeckId === deck.id ? 'border-[#39C5BB] bg-[#39C5BB]/10 vocaloid-glow' : 'border-white/10 hover:border-white/30 bg-[#1a1a1a]'}`}
                    >
                        <h3 className="font-bold text-xl text-white mb-2">{deck.name}</h3>
                        <p className="text-sm opacity-70 mb-4 h-10 overflow-hidden line-clamp-2">{deck.description}</p>
                        <div className="flex justify-between items-center text-xs font-bold">
                            <span className="px-2 py-1 bg-[#FF1493] text-white rounded">{deck.prompts.length} TRACKS</span>
                            {activeDeckId === deck.id && <span className="text-[#39C5BB]">SELECTED ▶</span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const VocaloidHistoryScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { history } = logic;
    return (
        <div className="space-y-6 pb-20">
            <h2 className="text-3xl font-black text-white border-b-2 border-[#39C5BB] pb-2 drop-shadow-[0_0_5px_rgba(57,197,187,0.8)]">REPLAY MEMORIES</h2>
            <div className="space-y-4">
                {history.map((item: any, i: number) => (
                    <div key={i} className="p-4 bg-[#1a1a1a] rounded-lg border-l-4 border-[#39C5BB] shadow-lg">
                        <div className="flex justify-between text-xs mb-2 opacity-60">
                            <span className="font-bold text-[#FF1493]">{item.type.toUpperCase()}</span>
                            <span>RECORD {history.length - i}</span>
                        </div>
                        <p className="text-lg text-white">"{item.text}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const VocaloidThemesScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setTheme } = logic;
    // Hardcoded theme list based on index.ts registration
    const themeLabels: Record<string, string> = {
        [Theme.PERSONA]: 'PHANTOM STAGE',
        [Theme.MINECRAFT]: 'BLOCK WORLD',
        [Theme.DANGANRONPA]: 'DESPAIR HIGH',
        [Theme.OMORI]: 'DREAM SPACE',
        [Theme.KIRBY]: 'DREAM LAND',
        [Theme.POKEMON]: 'KANTO STADIUM',
        [Theme.ANIMAL_CROSSING]: 'ISLAND RESORT',
        [Theme.SKYRIM]: 'TAMIREL',
        [Theme.SONIC]: 'GREEN HILL',
        [Theme.SANRIO]: 'HELLO KITTY',
        [Theme.CYBERPUNK]: 'NIGHT CITY',
        [Theme.UNDERTALE]: 'UNDERGROUND',
        [Theme.FALLOUT]: 'WASTELAND',
        [Theme.HAZBIN]: 'PENTAGRAM CITY',
        [Theme.VOCALOID]: 'VIRTUAL SINGER',
        [Theme.FNAF]: 'FREDDY FAZBEAR',
        [Theme.IRUMA]: 'BABYLS ACADEMY',
        [Theme.ARCANE]: 'PILTOVER & ZAUN'
    };

    return (
        <div className="space-y-6 pb-20 px-4 sm:px-0">
            <h2 className="text-2xl sm:text-3xl font-black text-white border-b-2 border-[#39C5BB] pb-2 drop-shadow-[0_0_5px_rgba(57,197,187,0.8)]">CONNECT TO STAGE</h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {Object.keys(themeLabels).map(t => (
                    <button
                        key={t}
                        onClick={() => setTheme(t as Theme)}
                        className={`p-3 sm:p-4 rounded-xl font-bold text-center transition-all bg-[#1a1a1a] hover:bg-[#39C5BB] hover:text-[#111] text-xs sm:text-base ${t === Theme.VOCALOID ? 'border-2 border-[#39C5BB] text-[#39C5BB] shadow-[0_0_10px_rgba(57,197,187,0.5)]' : 'border border-white/10 text-white/80'}`}
                    >
                        {themeLabels[t]}
                    </button>
                ))}
            </div>
        </div>
    );
};

export const VocaloidSettingsScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setView } = logic;
    return (
        <div className="space-y-6 pb-20 flex flex-col items-center">
            <h2 className="text-3xl font-black text-white border-b-2 border-[#39C5BB] pb-2 drop-shadow-[0_0_5px_rgba(57,197,187,0.8)] w-full text-center">SYSTEM SETTINGS</h2>

            <div className="w-full max-w-md bg-[#1a1a1a] rounded-xl p-8 border border-[#39C5BB]/30 vocaloid-glow">
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-[#39C5BB] rounded-full flex items-center justify-center text-4xl shadow-[0_0_15px_rgba(57,197,187,0.8)]">🎤</div>
                </div>
                <h3 className="text-center text-2xl font-bold text-white mb-8">MIKU OS v3.9</h3>

                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-bold border-b border-white/10 pb-2">
                        <span className="text-[#39C5BB]">AUDIO</span>
                        <span className="text-white">ON</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold border-b border-white/10 pb-2">
                        <span className="text-[#39C5BB]">HAPTICS</span>
                        <span className="text-white">ON</span>
                    </div>
                </div>

                <button onClick={() => setView('menu')} className="w-full py-3 mt-8 bg-[#FF1493] text-white font-bold rounded-lg hover:bg-white hover:text-[#FF1493] transition-colors shadow-[0_0_10px_rgba(255,20,147,0.5)]">
                    DISCONNECT
                </button>
            </div>
        </div>
    );
};

export const VocaloidTheme: ThemeDefinition = {
    id: Theme.VOCALOID,
    name: 'Vocaloid',
    cssVars: {
        '--theme-primary': '#39C5BB',
        '--theme-secondary': '#FF1493',
        '--theme-bg': '#111111',
        '--theme-text': '#FFFFFF',
    },
    MenuLayout: VocaloidMenuLayout,
    MenuButton: VocaloidMenuButton,
    LayoutComponent: VocaloidLayout,
    IntensitySelector: VocaloidIntensitySelector,
    PromptTypeSelector: VocaloidPromptTypeSelector,
    PromptLayout: VocaloidPromptLayout,
    PlayButton: VocaloidPlayButton,
    DecksScreen: VocaloidDecksScreen,
    HistoryScreen: VocaloidHistoryScreen,
    SettingsScreen: VocaloidSettingsScreen,
    ThemesScreen: VocaloidThemesScreen,
};
