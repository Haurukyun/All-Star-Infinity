import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme, ThemeDefinition } from '../types';

const STAGES = [
    { id: Intensity.SOFT, title: 'CAM 1A-SHOW STAGE', desc: 'LOW RISK', color: '#ffffff' },
    { id: Intensity.HOT, title: 'CAM 4B-EAST HALL', desc: 'MODERATE RISK', color: '#ffaa00' },
    { id: Intensity.VULGAR, title: 'CAM 2B-W HALL CORNER', desc: 'MAXIMUM SECURITY', color: '#cc0000' },
];

export const FnafLayout: React.FC<{ children: React.ReactNode; activeTab: string; setActiveTab: (tab: string) => void; logic: any }> = ({ children, activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'play', label: 'CAM 1' },
        { id: 'decks', label: 'CAM 2' },
        { id: 'history', label: 'CAM 3' },
        { id: 'themes', label: 'CAM 4' },
        { id: 'settings', label: 'MNT' },
    ];

    const [time, setTime] = useState('12:00 AM');

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            let hours = date.getHours();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            setTime(`${hours}:${date.getMinutes().toString().padStart(2, '0')} ${ampm}`);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fnaf-theme h-[100dvh] w-screen flex flex-col bg-[#050505] text-[#fff] overflow-hidden font-['VT323'] relative select-none">
            <style>{`
                .fnaf-theme {
                    font- family: 'VT323', monospace;
        }
                .fnaf-static {
                background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEUAAAAAAAABAwEBAgMDAwMAAgECAwEAAgGEfXhFAAAABXRSTlM/fz+/vz8Fv13NAAAAWUlEQVQ4y2NgQAX8DIwwmgnMZGGEUWxgBgsYI0yxgTFMGKqYEUYxlzWMYQZTbGBMYIYp1jDGCAYwg0WMAcxghSlOMMaIggYMGMAMFjCGGYwwxQbGCAYwxQKGGQCb0BU1gK5TdgAAAABJRU5ErkJggg==');
        opacity: 0.15;
        mix-blend-mode: overlay;
        pointer-events: none;
        animation: staticNoise 0.2s steps(2, end) infinite;
    }
                @keyframes staticNoise {
        0% { background- position: 0 0;
    }
                    100 % { background- position: 100 % 100 %;
}
                }
                .fnaf-border {
    border: 2px solid rgba(255, 255, 255, 0.2);
    background: rgba(0, 0, 0, 0.6);
}
                .fnaf-red - text { color: #cc0000; text - shadow: 0 0 5px rgba(204, 0, 0, 0.8); }
                .fnaf-rec {
    display: inline - block;
    width: 12px;
    height: 12px;
    background-color: #ff0000;
    border-radius: 50 %;
    margin - right: 8px;
    animation: blink 1s infinite alternate;
}
@keyframes blink { 0 % { opacity: 1; } 100 % { opacity: 0; } }
                .fnaf-vignette {
    background: radial-gradient(circle at center, transparent 40 %, rgba(0, 0, 0, 0.9) 100 %);
    pointer-events: none;
}
`}</style>

            <div className="absolute inset-0 fnaf-static z-50"></div>
            <div className="absolute inset-0 fnaf-vignette z-40"></div>

            {/* Overlays */}
            <div className="absolute top-6 left-6 z-50 flex items-center">
                <div className="fnaf-rec"></div>
                <span className="text-3xl font-bold tracking-widest text-[#fff] drop-shadow-[0_0_2px_#fff]">REC</span>
            </div>

            <div className="absolute top-6 right-6 z-50 text-right">
                <div className="text-4xl font-bold drop-shadow-[0_0_2px_#fff]">{time}</div>
                <div className="text-xl">Night 1</div>
            </div>

            <div className="flex-1 w-full max-w-4xl mx-auto p-4 sm:p-8 flex flex-col relative z-10 h-full mt-16">

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto mb-4 relative z-30">
                    {children}
                </div>

                {/* Footer Navigation Tabs - Elevated much higher for overlap protection */}
                <nav className="flex justify-center border-t border-white/20 pt-4 z-40 relative bg-black/80 p-2 mb-20 sm:mb-24">
                    <div className="flex overflow-x-auto no-scrollbar py-2 gap-2 sm:gap-4 w-full justify-around max-w-3xl">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`text-xl sm:text-2xl border border-white/30 px-4 py-2 hover:bg-white hover:text-black transition-colors ${activeTab === tab.id ? 'bg-white text-black font-bold' : 'text-white/60 bg-black'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </nav>
            </div>

            {/* Battery UI - Repositioned to very bottom left */}
            <div className="absolute bottom-4 left-6 z-50 text-base sm:text-xl flex items-center gap-2 drop-shadow-[0_0_2px_#fff]">
                <span>Power left: 99%</span>
                <div className="flex gap-1">
                    <div className="w-3 h-6 sm:w-4 sm:h-8 bg-green-500 border border-white"></div>
                    <div className="w-3 h-6 sm:w-4 sm:h-8 bg-green-500 border border-white"></div>
                    <div className="w-3 h-6 sm:w-4 sm:h-8 bg-green-500 border border-white"></div>
                </div>
            </div>

            {/* Usage UI - Repositioned to very bottom right */}
            <div className="absolute bottom-4 right-6 z-50 text-base sm:text-xl drop-shadow-[0_0_2px_#fff] text-right">
                Usage: <span className="text-green-500">██</span>▒▒▒
            </div>
        </div>
    );
};

export const FnafMenuLayout: React.FC<{ children: React.ReactNode; logic: any }> = ({ children }) => {
    return (
        <div className="h-[100dvh] w-screen flex flex-col justify-center items-start pl-[10%] pt-[10%] bg-[#000] text-[#fff] font-['VT323'] relative overflow-hidden">
            <style>{`
    .fnaf-menu - static {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEUAAAAAAAABAwEBAgMDAwMAAgECAwEAAgGEfXhFAAAABXRSTlM/fz+/vz8Fv13NAAAAWUlEQVQ4y2NgQAX8DIwwmgnMZGGEUWxgBgsYI0yxgTFMGKqYEUYxlzWMYQZTbGBMYIYp1jDGCAYwg0WMAcxghSlOMMaIggYMGMAMFjCGGYwwxQbGCAYwxQKGGQCb0BU1gK5TdgAAAABJRU5ErkJggg==');
    opacity: 0.1;
    mix-blend-mode: overlay;
    pointer-events: none;
    animation: staticNoise 0.1s steps(2, end) infinite;
}
                .fnaf-checkers {
    background: repeating-linear-gradient(45deg, #111 25 %, transparent 25 %, transparent 75 %, #111 75 %, #111), repeating-linear-gradient(45deg, #111 25 %, #050505 25 %, #050505 75 %, #111 75 %, #111);
    background-position: 0 0, 40px 40px;
    background-size: 80px 80px;
    opacity: 0.2;
    transform: perspective(500px) rotateX(60deg);
    transform-origin: bottom;
    bottom: 0;
    height: 50vh;
    width: 100vw;
    position: absolute;
    z-index: 10;
}
                .fnaf-flicker { animation: textFlicker 4s infinite; }
@keyframes textFlicker {
    0 %, 19 %, 21 %, 23 %, 25 %, 54 %, 56 %, 100 % { opacity: 1; }
    20 %, 24 %, 55 % { opacity: 0; }
}
`}</style>

            <div className="absolute inset-0 fnaf-menu-static z-20"></div>
            <div className="fnaf-checkers"></div>

            <div className="z-30 mb-16 max-w-2xl px-4">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-widest leading-relaxed drop-shadow-[0_0_5px_rgba(255,255,255,0.4)] fnaf-flicker text-center sm:text-left">
                    FIVE NIGHTS AT<br />
                    ALL-STAR INFINITY
                </h1>
                <p className="text-xl mt-4 opacity-70">© 2026 Fazbear Entertainment</p>
                <div className="text-2xl mt-8 text-[#cc0000] font-bold fnaf-flicker">WARNING: PROCEED WITH CAUTION.</div>
            </div>

            <div className="relative z-30 flex flex-col gap-2 w-full max-w-sm pl-4 sm:pl-0">
                {children}
            </div>

            <div className="absolute bottom-4 right-4 text-white/30 text-xs z-30">
                v1.0.51
            </div>
        </div>
    );
};

export const FnafMenuButton: React.FC<{ label: string; onClick: () => void; isPrimary?: boolean }> = ({ label, onClick, isPrimary }) => {
    return (
        <button
            onClick={onClick}
            className={`text-left py-2 px-4 text-2xl sm:text-4xl font-bold transition-all relative overflow-hidden group w-max ${isPrimary ? 'text-[#fff]' : 'text-[#fff] opacity-60'}`}
        >
            <span className="relative z-10 group-hover:pl-6 transition-all">{label}</span>
            <span className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-[#fff] text-3xl transition-all">&gt;&gt;</span>
        </button>
    );
};

export const FnafIntensitySelector: React.FC<{ logic: any }> = ({ logic }) => {
    const { setIntensity } = logic;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full mt-12 px-4 sm:px-12 w-full max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold mb-8 sm:mb-12 border-b-2 border-white/30 pb-4">SELECT CAMERA FEED</h2>
            <div className="space-y-6">
                {STAGES.map((stage) => (
                    <button
                        key={stage.id}
                        onClick={() => setIntensity(stage.id)}
                        className="w-full text-left p-6 fnaf-border hover:bg-white hover:text-black transition-colors group flex justify-between items-center"
                    >
                        <div>
                            <h3 className="text-2xl sm:text-3xl font-bold">{stage.title}</h3>
                            <p className="text-lg sm:text-xl mt-2 opacity-80" style={{ color: stage.color }}>{stage.desc}</p>
                        </div>
                        <div className="text-4xl opacity-0 group-hover:opacity-100">&gt;</div>
                    </button>
                ))}
            </div>
        </motion.div>
    );
};

export const FnafPromptTypeSelector: React.FC<{ logic: any }> = ({ logic }) => {
    const { handleDraw, setIntensity } = logic;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full justify-center px-4 sm:px-12 w-full max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center drop-shadow-[0_0_2px_#fff]">MONITOR FEED DETECTED</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <button
                    onClick={() => handleDraw('Truth')}
                    className="aspect-video fnaf-border hover:bg-white/10 transition-all flex flex-col justify-center items-center text-4xl font-bold gap-4 relative"
                >
                    <div className="absolute top-2 left-2 text-sm opacity-50">CAM A</div>
                    <span>TRUTH</span>
                    <span className="text-sm opacity-50">AUDIO ONLY AUDIO ONLY</span>
                </button>
                <button
                    onClick={() => handleDraw('Dare')}
                    className="aspect-video fnaf-border border-[#cc0000] text-[#cc0000] hover:bg-[#cc0000]/10 transition-all flex flex-col justify-center items-center text-3xl sm:text-4xl font-bold gap-4 relative"
                >
                    <div className="absolute top-2 left-2 text-sm opacity-50">CAM B</div>
                    <span>DARE</span>
                    <span className="text-sm opacity-50">VISUAL CONFIRMATION REQ</span>
                </button>
            </div>

            <button onClick={() => setIntensity(null)} className="w-full p-6 mt-12 text-2xl text-center border border-white/30 hover:bg-white hover:text-black transition-colors">
                RETURN TO SYSTEM
            </button>
        </motion.div>
    );
};

export const FnafPromptLayout: React.FC<{ children: React.ReactNode; logic: any }> = ({ children, logic }) => {
    const { prompt } = logic;
    const isDare = prompt?.type === 'Dare';

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full p-4 sm:p-8">
            <div className="text-2xl opacity-60 mb-8 border-b border-white/30 pb-2">
                &gt; FEED: {prompt?.type.toUpperCase()}
            </div>

            <div className={`flex-1 p-6 sm:p-8 fnaf-border flex flex-col justify-center ${isDare ? 'border-[#cc0000]' : ''}`}>
                <p className={`text-2xl sm:text-4xl leading-relaxed whitespace-pre-wrap ${isDare ? 'fnaf-red-text' : ''}`}>
                    "{prompt?.text}"
                </p>

                {prompt?.penalty && (
                    <div className="mt-12 pt-6 border-t-2 border-dashed border-[#cc0000]/50 relative">
                        <div className="text-2xl text-[#cc0000] font-bold mb-4">!! CRITICAL FAILURE PENALTY !!</div>
                        <p className="text-2xl opacity-90">{prompt.penalty}</p>
                    </div>
                )}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mt-12 max-w-2xl mx-auto w-full">
                {children}
            </div>
        </motion.div>
    );
};

export const FnafPlayButton: React.FC<{ label: string; onClick: () => void; isPrimary?: boolean }> = ({ label, onClick, isPrimary }) => {
    return (
        <button
            onClick={onClick}
            className={`flex-1 py-6 px-4 text-3xl font-bold transition-all border-2 ${isPrimary
                ? 'bg-white text-black border-white hover:bg-black hover:text-white'
                : 'bg-black text-white border-white/50 hover:bg-white/20'
                }`}
        >
            [ {label} ]
        </button>
    );
};

export const FnafDecksScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { activeDeckId, setActiveDeckId, customDecks, setEditingDeck, generateId } = logic;
    return (
        <div className="space-y-8 p-4 sm:p-8 pb-40">
            <div className="flex justify-between items-end border-b border-white/30 pb-4">
                <h2 className="text-4xl font-bold">DATA ARCHIVE</h2>
                <button
                    onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })}
                    className="p-2 border-2 border-white hover:bg-white hover:text-black font-bold text-sm sm:text-base transition-all"
                >
                    + NEW SYSTEM FILE
                </button>
            </div>
            <div className="grid grid-cols-1 gap-6">
                {customDecks.length === 0 ? (
                    <div className="py-20 text-center opacity-40 border-2 border-dashed border-white/10 text-xl font-bold italic">
                        NO EXTERNAL DRIVE DETECTED
                    </div>
                ) : (
                    customDecks.map((deck: any) => (
                        <button
                            key={deck.id}
                            onClick={() => setActiveDeckId(deck.id)}
                            className={`text-left p-6 fnaf-border hover:bg-white/10 transition-all flex justify-between items-center ${activeDeckId === deck.id ? 'border-white bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'border-white/20'}`}
                        >
                            <div>
                                <h3 className="text-3xl font-bold mb-2">{deck.name || 'UNNAMED_FILE'}</h3>
                                <p className="text-xl opacity-60 mb-4">{deck.description || 'No system metadata provided.'}</p>
                                <span className="text-sm border border-white/40 px-2 py-1">{deck.prompts.length} FILES</span>
                            </div>
                            {activeDeckId === deck.id ? (
                                <div className="text-2xl border-2 border-white px-4 py-2 font-black bg-white text-black">MOUNTED</div>
                            ) : (
                                <div className="text-xl opacity-40 group-hover:opacity-100 transition-opacity">MOUNT DRIVE</div>
                            )}
                        </button>
                    ))
                )}
            </div>
        </div>
    );
};

export const FnafHistoryScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { history } = logic;
    return (
        <div className="space-y-8 p-4 sm:p-8">
            <h2 className="text-4xl font-bold border-b border-white/30 pb-4">SECURITY LOGS</h2>
            <div className="space-y-6">
                {history.map((item: any, i: number) => (
                    <div key={i} className="p-6 fnaf-border bg-black/80">
                        <div className="flex justify-between text-lg mb-4 opacity-50 border-b border-white/10 pb-2">
                            <span>{item.type.toUpperCase()}</span>
                            <span>CAM LOG_{history.length - i}</span>
                        </div>
                        <p className="text-2xl opacity-90">"{item.text}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Hardcoded themes list fallback for layout compatibility
const THEME_LIST = [
    { id: Theme.PERSONA, label: 'PHANTOM THIEF' },
    { id: Theme.MINECRAFT, label: 'BLOCKY WORLD' },
    { id: Theme.DANGANRONPA, label: 'KILLING HARMONY' },
    { id: Theme.OMORI, label: 'DREAM WORLD' },
    { id: Theme.KIRBY, label: 'DREAM LAND' },
    { id: Theme.POKEMON, label: 'KANTO REGION' },
    { id: Theme.ANIMAL_CROSSING, label: 'ISLAND PARADISE' },
    { id: Theme.SKYRIM, label: 'SKYRIM' },
    { id: Theme.SONIC, label: 'SONIC MANIA' },
    { id: Theme.SANRIO, label: 'SWEET WORLD' },
    { id: Theme.CYBERPUNK, label: 'NIGHT CITY' },
    { id: Theme.UNDERTALE, label: 'THE UNDERGROUND' },
    { id: Theme.FALLOUT, label: 'THE WASTELAND' },
    { id: Theme.HAZBIN, label: 'PENTAGRAM CITY' },
    { id: Theme.VOCALOID, label: 'VIRTUAL SINGER' },
    { id: Theme.FNAF, label: 'FREDDY FAZBEAR' },
    { id: Theme.IRUMA, label: 'BABYLS ACADEMY' },
    { id: Theme.ARCANE, label: 'PILTOVER & ZAUN' }
];

export const FnafThemesScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setTheme } = logic;
    return (
        <div className="space-y-6 pt-6 sm:pt-12 px-4 sm:px-12 w-full max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold mb-8 sm:mb-12 border-b-2 border-white/30 pb-4 fnaf-flicker">CONNECT TO OTHER LOCATIONS</h2>
            <div className="space-y-2">
                {THEME_LIST.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className="w-full text-left py-4 sm:py-6 px-4 hover:bg-white hover:text-black transition-colors border-b border-white/10 group flex items-center justify-between"
                    >
                        <span className="text-xl sm:text-2xl font-bold group-hover:pl-4 transition-all">CAM {t.id.substring(0, 6).toUpperCase()}</span>
                        <span className="text-xl sm:text-2xl opacity-0 group-hover:opacity-100">&gt;&gt;</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export const FnafSettingsScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setView } = logic;
    return (
        <div className="space-y-8 p-4 sm:p-8 flex flex-col items-center">
            <h2 className="text-4xl font-bold border-b border-white/30 pb-4 w-full">MAINTENANCE PANEL</h2>

            <div className="w-full max-w-md fnaf-border p-8 mt-12">
                <h3 className="text-center text-3xl font-bold mb-8 fnaf-flicker">SYSTEM MAINTENANCE</h3>

                <div className="space-y-6">
                    <button className="w-full text-left p-4 border border-white/30 hover:bg-white hover:text-black text-2xl flex justify-between">
                        <span>REBOOT CAMERAS</span> <span>[ ]</span>
                    </button>
                    <button className="w-full text-left p-4 border border-white/30 hover:bg-white hover:text-black text-2xl flex justify-between">
                        <span>AUDIO DEVICES</span> <span>[ ]</span>
                    </button>
                    <button className="w-full text-left p-4 border border-white/30 hover:bg-white hover:text-black text-2xl flex justify-between">
                        <span>REBOOT ALL</span> <span>[ ]</span>
                    </button>
                </div>

                <button onClick={() => setView('menu')} className="w-full p-4 mt-12 bg-[#cc0000] text-white text-2xl font-bold hover:bg-[#8b0000] transition-colors border-2 border-[#cc0000]">
                    EXIT MODULE
                </button>
            </div>
        </div>
    );
};

export const FnafTheme: ThemeDefinition = {
    id: Theme.FNAF,
    name: 'Fnaf',
    cssVars: {
        '--theme-primary': '#cc0000',
        '--theme-secondary': '#ffffff',
        '--theme-bg': '#050505',
        '--theme-text': '#FFFFFF',
    },
    MenuLayout: FnafMenuLayout,
    MenuButton: FnafMenuButton,
    LayoutComponent: FnafLayout,
    IntensitySelector: FnafIntensitySelector,
    PromptTypeSelector: FnafPromptTypeSelector,
    PromptLayout: FnafPromptLayout,
    PlayButton: FnafPlayButton,
    DecksScreen: FnafDecksScreen,
    HistoryScreen: FnafHistoryScreen,
    SettingsScreen: FnafSettingsScreen,
    ThemesScreen: FnafThemesScreen,
};
