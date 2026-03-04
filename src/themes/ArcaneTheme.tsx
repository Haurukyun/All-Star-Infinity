import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme, ThemeDefinition } from '../types';
import { allThemesList } from './allThemesList';

const STAGES = [
    { id: Intensity.SOFT, title: 'TOPSIDE (PILTOVER)', desc: 'CITY OF PROGRESS', color: '#c79b3b' },
    { id: Intensity.HOT, title: 'THE LANES (ZAUN)', desc: 'UNDERCITY DEPTHS', color: '#00ffcc' },
    { id: Intensity.VULGAR, title: 'SHIMMER INJECTION', desc: 'LETHAL MUTATION', color: '#9000ff' },
];

export const ArcaneLayout: React.FC<{ children: React.ReactNode; activeTab: string; setActiveTab: (tab: string) => void; logic: any }> = ({ children, activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'play', label: 'THE LANES' },
        { id: 'decks', label: 'BLUEPRINTS' },
        { id: 'history', label: 'ARCHIVES' },
        { id: 'themes', label: 'REALMS' },
        { id: 'settings', label: 'COUNCIL' },
    ];

    const isZaun = activeTab === 'play';

    return (
        <div className={`arcane-theme h-[100dvh] w-screen flex flex-col overflow-hidden relative select-none transition-colors duration-1000 ${isZaun ? 'bg-[#0a1118] text-[#00ffcc]' : 'bg-[#1a1c23] text-[#c79b3b]'}`}>
            <style>{`
                .arcane-theme {
                    font-family: 'Cinzel', serif;
                }
                .arcane-text-body {
                    font-family: 'Rajdhani', sans-serif;
                }
                .arcane-graffiti {
                    font-family: 'Gloria Hallelujah', cursive;
                }
                .arcane-hextech-glow {
                    box-shadow: 0 0 15px rgba(0, 255, 204, 0.4), inset 0 0 20px rgba(0, 255, 204, 0.1);
                    border: 2px solid #00ffcc;
                }
                .arcane-piltover-gold {
                    box-shadow: 0 0 10px rgba(199, 155, 59, 0.4), inset 0 0 10px rgba(199, 155, 59, 0.2);
                    border: 2px solid #c79b3b;
                }
                .arcane-shimmer-glow {
                    box-shadow: 0 0 20px rgba(144, 0, 255, 0.6), inset 0 0 30px rgba(144, 0, 255, 0.3);
                    border: 2px solid #9000ff;
                }
                .arcane-smoke {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at 50% 100%, rgba(0, 255, 204, 0.1) 0%, transparent 60%);
                    pointer-events: none;
                    animation: pulseSmoke 8s infinite alternate;
                }
                @keyframes pulseSmoke {
                    0% { opacity: 0.5; }
                    100% { opacity: 1; }
                }
                .arcane-tab-active {
                    background: linear-gradient(to top, rgba(199, 155, 59, 0.2), transparent);
                    border-bottom: 3px solid #c79b3b;
                    color: #fff;
                }
                .arcane-tab-active-zaun {
}
`}</style>

            {isZaun && <div className="arcane-smoke z-0"></div>}

            <div className="flex-1 w-full max-w-5xl mx-auto p-4 sm:p-6 flex flex-col relative z-10 h-full">
                {/* Header */}
                <header className={`flex justify-between items-center mb-6 pt-4 border-b-2 pb-4 ${isZaun ? 'border-[#00ffcc]/30' : 'border-[#c79b3b]/30'}`}>
                    <div>
                        <h1 className="text-3xl font-bold tracking-widest uppercase">
                            {isZaun ? 'THE UNDERCITY' : 'CITY OF PROGRESS'}
                        </h1>
                        <p className={`text-sm font-bold tracking-widest arcane-text-body ${isZaun ? 'text-[#00ffcc]' : 'text-[#c79b3b]'}`}>
                            {isZaun ? 'SURVIVAL OF THE FITTEST' : 'HEXCORE OPERATIONAL'}
                        </p>
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl ${isZaun ? 'bg-[#00ffcc] text-[#0a1118] shadow-[0_0_15px_#00ffcc]' : 'bg-[#c79b3b] text-[#1a1c23] shadow-[0_0_10px_#c79b3b]'}`}>
                        {isZaun ? 'Z' : 'P'}
                    </div>
                </header >

                {/* Main Content Area */}
                < div className="flex-1 overflow-y-auto mb-4 relative" >
                    {children}
                </div >

                {/* Footer Navigation Tabs */}
                < nav className={`flex justify-center border-t border-white/10 pt-2 z-40 relative`}>
                    <div className="flex overflow-x-auto no-scrollbar gap-2 w-full justify-around max-w-4xl">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            const activeClass = isZaun ? 'arcane-tab-active-zaun' : 'arcane-tab-active';

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`arcane-text-body text-lg font-bold tracking-widest px-4 py-3 transition-all ${isActive ? activeClass : 'text-white/50 hover:text-white'}`}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </nav>
            </div>
        </div>
    );
};

export const ArcaneMenuLayout: React.FC<{ children: React.ReactNode; logic: any }> = ({ children }) => {
    return (
        <div className="h-[100dvh] w-screen flex flex-col justify-center items-center p-8 bg-[#0a1118] text-[#fff] font-['Cinzel'] relative overflow-hidden">
            <style>{`
        .arcane-menu - bg {
    background: radial-gradient(circle at 50 % 50 %, rgba(10, 17, 24, 0.9) 0 %, rgba(5, 8, 12, 1) 100 %);
}
                .arcane-hextech - line {
    position: absolute;
    background: linear-gradient(90deg, transparent, #00ffcc, transparent);
}
                .arcane-shimmer - blob {
    position: absolute;
    background: radial-gradient(circle, rgba(144, 0, 255, 0.15) 0 %, transparent 70 %);
    border-radius: 50 %;
    filter: blur(20px);
    animation: shimTravel 15s linear infinite;
}
@keyframes shimTravel {
    0 % { transform: translateY(100vh) scale(1); opacity: 0; }
    50 % { opacity: 1; transform: translateY(50vh) scale(1.5); }
    100 % { transform: translateY(-20vh) scale(0.8); opacity: 0; }
}
`}</style>

            <div className="absolute inset-0 arcane-menu-bg z-0"></div>
            <div className="arcane-hextech-line w-[2px] h-32 left-[20%]"></div>
            <div className="arcane-hextech-line w-[2px] h-64 left-[80%]" style={{ animationDelay: '2s' }}></div>
            <div className="arcane-shimmer-blob w-48 h-48 top-[10%] left-[10%]" style={{ animationDelay: '0s' }}></div>
            <div className="arcane-shimmer-blob w-64 h-64 top-[60%] right-[15%]" style={{ animationDelay: '5s' }}></div>
            <div className="arcane-shimmer-blob w-32 h-32 bottom-[5%] left-[40%]" style={{ animationDelay: '10s' }}></div>

            <div className="z-10 mb-16 text-center transform relative">
                <div className="absolute -top-12 left-0 sm:-left-12 arcane-graffiti text-3xl sm:text-5xl text-[#9000ff] opacity-80 rotate-[-15deg] whitespace-nowrap">
                    JINX WAS HERE
                </div>
                <h1 className="text-5xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#c79b3b] to-[#8b6b25] tracking-widest drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] filter brightness-125">
                    ALL-STAR<br />INFINITY
                </h1>
                <p className="arcane-text-body text-[#00ffcc] text-xl font-bold tracking-[0.3em] mt-4 uppercase drop-shadow-[0_0_5px_#00ffcc]">
                    Arcane Edition
                </p>
            </div>

            <div className="relative z-20 flex flex-col gap-6 w-full max-w-sm">
                {children}
            </div>
        </div>
    );
};

export const ArcaneMenuButton: React.FC<{ label: string; onClick: () => void; isPrimary?: boolean }> = ({ label, onClick, isPrimary }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full text-center py-4 px-6 text-xl tracking-widest transition-all uppercase ${isPrimary
                ? 'bg-gradient-to-r from-[#c79b3b] to-[#8b6b25] text-[#1a1c23] font-bold shadow-[0_4px_15px_rgba(199,155,59,0.4)] hover:brightness-110'
                : 'bg-transparent border border-[#00ffcc] text-[#00ffcc] arcane-text-body font-bold hover:bg-[#00ffcc]/10 shadow-[0_0_10px_rgba(0,255,204,0.2)]'
                }`}
        >
            {label}
        </button>
    );
};

export const ArcaneIntensitySelector: React.FC<{ logic: any }> = ({ logic }) => {
    const { setIntensity } = logic;
    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col h-full justify-center space-y-6 sm:space-y-8 p-4 max-w-3xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl text-center font-bold text-[#c79b3b] tracking-wider drop-shadow-md">SELECT YOUR PATH</h2>
            <div className="space-y-4 sm:space-y-6">
                {STAGES.map((stage) => {
                    let borderClass = 'arcane-piltover-gold';
                    let bgHover = 'hover:bg-[#c79b3b]/10';
                    if (stage.id === Intensity.HOT) {
                        borderClass = 'arcane-hextech-glow';
                        bgHover = 'hover:bg-[#00ffcc]/10';
                    } else if (stage.id === Intensity.VULGAR) {
                        borderClass = 'arcane-shimmer-glow';
                        bgHover = 'hover:bg-[#9000ff]/10';
                    }

                    return (
                        <button
                            key={stage.id}
                            onClick={() => setIntensity(stage.id)}
                            className={`w-full text-left p-4 sm:p-6 bg-[#1a1c23]/80 backdrop-blur-md transition-all flex justify-between items-center group ${borderClass} ${bgHover}`}
                        >
                            <div>
                                <h3 className="text-2xl sm:text-3xl font-bold tracking-wider mb-1 sm:mb-2" style={{ color: stage.color }}>{stage.title}</h3>
                                <p className="arcane-text-body text-base sm:text-xl text-white/80 uppercase font-bold tracking-widest">{stage.desc}</p>
                            </div>
                            <div className="text-3xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: stage.color }}>✦</div>
                        </button>
                    )
                })}
            </div>
        </motion.div>
    );
};

export const ArcanePromptTypeSelector: React.FC<{ logic: any }> = ({ logic }) => {
    const { handleDraw, setIntensity } = logic;
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col h-full justify-center space-y-8 sm:space-y-12 p-4 max-w-4xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl text-center font-bold text-[#00ffcc] drop-shadow-[0_0_5px_rgba(0,255,204,0.5)] tracking-wider">INITIATE SEQUENCE</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                <button
                    onClick={() => handleDraw('Truth')}
                    className="aspect-square bg-[#1a1c23]/80 arcane-piltover-gold hover:bg-[#c79b3b]/10 transition-all flex flex-col justify-center items-center p-6 sm:p-8 group relative overflow-hidden"
                >
                    <div className="absolute -right-4 -top-4 w-24 h-24 border-2 border-[#c79b3b]/20 rounded-full"></div>
                    <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 text-[#c79b3b] group-hover:scale-110 transition-transform">⚖</div>
                    <span className="text-3xl sm:text-4xl font-bold tracking-widest text-[#c79b3b]">TRUTH</span>
                    <span className="arcane-text-body text-white/60 mt-2 sm:mt-4 tracking-widest uppercase text-xs sm:text-sm">COUNCIL INTERROGATION</span>
                </button>
                <button
                    onClick={() => handleDraw('Dare')}
                    className="aspect-square bg-[#0a1118]/80 arcane-shimmer-glow hover:bg-[#9000ff]/10 transition-all flex flex-col justify-center items-center p-6 sm:p-8 group relative overflow-hidden"
                >
                    <div className="absolute -left-4 -bottom-4 w-32 h-32 border-4 border-[#9000ff]/10 rounded-full"></div>
                    <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 text-[#9000ff] group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_#9000ff]">⚠</div>
                    <span className="text-3xl sm:text-4xl font-bold tracking-widest text-[#9000ff] drop-shadow-[0_0_5px_#9000ff]">DARE</span>
                    <span className="arcane-text-body text-white/60 mt-2 sm:mt-4 tracking-widest uppercase text-xs sm:text-sm">UNDERCITY SURVIVAL</span>
                </button>
            </div>

            <button onClick={() => setIntensity(null)} className="arcane-text-body font-bold text-xl uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                Cancel Sequence
            </button>
        </motion.div>
    );
};

export const ArcanePromptLayout: React.FC<{ children: React.ReactNode; logic: any }> = ({ children, logic }) => {
    const { prompt } = logic;
    const isDare = prompt?.type === 'Dare';

    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col h-full p-4 max-w-4xl mx-auto w-full">
            <div className="flex justify-center mb-8">
                <div className={`px-8 py-2 font-bold text-xl tracking-widest uppercase border ${isDare ? 'text-[#9000ff] border-[#9000ff] bg-[#9000ff]/10 drop-shadow-[0_0_5px_#9000ff]' : 'text-[#c79b3b] border-[#c79b3b] bg-[#c79b3b]/10'}`}>
                    {isDare ? 'SHIMMER DETECTED' : 'EVIDENCE LOGGED'}
                </div>
            </div>

            <div className={`flex-1 p-6 md:p-12 flex flex-col justify-center items-center text-center bg-[#1a1c23]/80 backdrop-blur-md relative ${isDare ? 'arcane-shimmer-glow' : 'arcane-hextech-glow'}`}>
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 m-4 opacity-50 border-current" style={{ color: isDare ? '#9000ff' : '#00ffcc' }}></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 m-4 opacity-50 border-current" style={{ color: isDare ? '#9000ff' : '#00ffcc' }}></div>

                <p className={`text-2xl sm:text-3xl md:text-5xl font-bold leading-tight ${isDare ? 'arcane-graffiti text-white drop-shadow-[0_2px_5px_rgba(144,0,255,0.8)]' : 'text-[#00ffcc]'}`}>
                    "{prompt?.text}"
                </p>

                {prompt?.penalty && (
                    <div className="mt-12 bg-black/60 p-6 border-l-4 border-[#9000ff] w-full max-w-2xl text-left">
                        <div className="text-[#9000ff] font-bold text-xl mb-2 tracking-widest arcane-text-body">WARNING: CASUALTY RISK</div>
                        <p className="text-xl text-white/90 arcane-text-body font-bold">{prompt.penalty}</p>
                    </div>
                )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                {children}
            </div>
        </motion.div>
    );
};

export const ArcanePlayButton: React.FC<{ label: string; onClick: () => void; isPrimary?: boolean }> = ({ label, onClick, isPrimary }) => {
    return (
        <button
            onClick={onClick}
            className={`flex-1 py-4 px-6 text-xl tracking-widest font-bold uppercase transition-all ${isPrimary
                ? 'bg-transparent border-2 border-[#00ffcc] text-[#00ffcc] shadow-[0_0_15px_rgba(0,255,204,0.3)] hover:bg-[#00ffcc] hover:text-[#0a1118]'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
        >
            {label}
        </button>
    );
};

export const ArcaneDecksScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { customDecks, activeDeckId, setActiveDeckId } = logic;
    return (
        <div className="space-y-6 p-4 max-w-4xl mx-auto w-full">
            <h2 className="text-4xl font-bold text-[#c79b3b] tracking-wider border-b border-[#c79b3b]/30 pb-4 mb-8">SCHEMATICS LIST</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {customDecks.map((deck: any) => (
                    <button
                        key={deck.id}
                        onClick={() => setActiveDeckId(deck.id)}
                        className={`text-left p-6 bg-[#1a1c23] transition-all flex flex-col ${activeDeckId === deck.id ? 'arcane-hextech-glow' : 'border border-white/10 hover:border-[#c79b3b]'}`}
                    >
                        <h3 className="text-2xl font-bold text-white mb-2 tracking-wider">{deck.name}</h3>
                        <p className="arcane-text-body text-lg text-white/60 mb-6 h-12 overflow-hidden">{deck.description}</p>
                        <div className="flex justify-between items-center w-full mt-auto arcane-text-body font-bold tracking-widest uppercase">
                            <span className="text-[#c79b3b]">{deck.prompts.length} FILES</span>
                            {activeDeckId === deck.id && <span className="text-[#00ffcc]">CONNECTED</span>}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export const ArcaneHistoryScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { history } = logic;
    return (
        <div className="space-y-6 p-4 max-w-4xl mx-auto w-full">
            <h2 className="text-4xl font-bold text-[#c79b3b] tracking-wider border-b border-[#c79b3b]/30 pb-4 mb-8">INCIDENT REPORTS</h2>
            <div className="space-y-4">
                {history.map((item: any, i: number) => (
                    <div key={i} className={`p-6 bg-[#1a1c23] border-l-4 ${item.type === 'Truth' ? 'border-[#00ffcc]' : 'border-[#9000ff]'}`}>
                        <div className="flex justify-between arcane-text-body font-bold text-sm tracking-widest uppercase mb-3 opacity-60">
                            <span style={{ color: item.type === 'Truth' ? '#00ffcc' : '#9000ff' }}>{item.type}</span>
                            <span>CASE #{history.length - i}</span>
                        </div>
                        <p className="text-2xl text-white font-bold tracking-wide">"{item.text}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


export const ArcaneThemesScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setTheme } = logic;
    return (
        <div className="space-y-6 p-4 max-w-5xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#c79b3b] tracking-wider border-b border-[#c79b3b]/30 pb-4 mb-4 sm:mb-8">HEKGATES</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {allThemesList.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className="py-3 sm:py-4 px-4 sm:px-6 border border-white/10 bg-[#1a1c23]/50 hover:bg-[#c79b3b]/20 hover:border-[#c79b3b] transition-all text-center sm:text-left group"
                    >
                        <div className="arcane-text-body font-bold text-xs sm:text-lg tracking-widest text-white/80 group-hover:text-white uppercase whitespace-nowrap">
                            {t.label}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export const ArcaneSettingsScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setView } = logic;
    return (
        <div className="space-y-6 p-4 flex flex-col items-center max-w-4xl mx-auto w-full">
            <h2 className="text-4xl font-bold text-[#c79b3b] tracking-wider border-b border-[#c79b3b]/30 pb-4 mb-8 w-full text-center">THE COUNCIL</h2>

            <div className="w-full max-w-md arcane-piltover-gold bg-[#1a1c23] p-10 flex flex-col items-center">
                <div className="text-6xl text-[#c79b3b] mb-6 drop-shadow-[0_0_10px_#c79b3b]">⚖</div>
                <h3 className="text-3xl font-bold text-white mb-2 tracking-widest">SYSTEM OVERRIDE</h3>
                <p className="arcane-text-body text-[#00ffcc] font-bold text-lg tracking-widest uppercase mb-12">Authorized Personnel Only</p>

                <button onClick={() => setView('menu')} className="w-full py-4 text-xl font-bold tracking-widest uppercase bg-[#c79b3b] text-[#1a1c23] hover:bg-white transition-colors">
                    TERMINATE SESSION
                </button>
            </div>
        </div>
    );
};

export const ArcaneTheme: ThemeDefinition = {
    id: Theme.ARCANE,
    name: 'Arcane',
    cssVars: {
        '--theme-primary': '#00ffcc',
        '--theme-secondary': '#9000ff',
        '--theme-bg': '#0a1118',
        '--theme-text': '#FFFFFF',
    },
    MenuLayout: ArcaneMenuLayout,
    MenuButton: ArcaneMenuButton,
    LayoutComponent: ArcaneLayout,
    IntensitySelector: ArcaneIntensitySelector,
    PromptTypeSelector: ArcanePromptTypeSelector,
    PromptLayout: ArcanePromptLayout,
    PlayButton: ArcanePlayButton,
    DecksScreen: ArcaneDecksScreen,
    HistoryScreen: ArcaneHistoryScreen,
    SettingsScreen: ArcaneSettingsScreen,
    ThemesScreen: ArcaneThemesScreen,
};
