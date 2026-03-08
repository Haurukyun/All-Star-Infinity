import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme, ThemeDefinition, GameMode, CustomDeck } from '../types';
import { allThemesList } from './allThemesList';
import { DeckCarousel } from '../components/DeckCarousel';
import { DeckSearchModal } from '../components/DeckSearchModal';
import { ThemedIntensitySelect } from '../components/ThemedIntensitySelect';

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
    const { handleDraw, setIntensity, intensity, customDecks, activeDeckId, setActiveDeckId, setGameMode, gameMode } = logic;
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full justify-center px-4 sm:px-12 w-full max-w-4xl mx-auto space-y-8">

            <h2 className="text-3xl sm:text-4xl font-bold text-center drop-shadow-[0_0_2px_#fff]">MONITOR FEED DETECTED: {intensity}</h2>

            <div className="w-full mb-8">
                <DeckCarousel
                    decks={customDecks.filter(d => d.intensity === intensity)}
                    activeDeckId={activeDeckId}
                    onSelect={setActiveDeckId}
                    variant="fnaf"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {gameMode === GameMode.NEVER_HAVE_I_EVER ? (
                    <button
                        onClick={() => handleDraw('NeverHaveIEver')}
                        className="col-span-1 sm:col-span-2 aspect-[21/9] fnaf-border border-[#cc0000] text-[#cc0000] hover:bg-[#cc0000]/10 transition-all flex flex-col justify-center items-center text-4xl font-bold gap-4 relative"
                    >
                        <div className="absolute top-2 left-2 text-sm opacity-50">CAM NHIE</div>
                        <span>I HAVE NEVER...</span>
                        <span className="text-sm opacity-50">AUDIO LOG CONFESSION</span>
                    </button>
                ) : (
                    <>
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
                    </>
                )}
            </div>

            <button onClick={() => setIntensity(null)} className="w-full p-6 mt-4 text-2xl text-center border border-white/30 hover:bg-white hover:text-black transition-colors">
                RETURN TO SYSTEM
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
                styles={{
                    accent: '#cc0000',
                    bg: '#050505',
                    textColor: '#ffffff',
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                }}
            />
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
    const { customDecks, setEditingDeck, deleteDeck, editingDeck, generateId, saveDeck, addNewPromptToEditingDeck, updatePromptInEditingDeck, removePromptFromEditingDeck, activeDeckId, setActiveDeckId } = logic;

    const [isIntensitySelectOpen, setIsIntensitySelectOpen] = useState(false);

    return (
        <AnimatePresence mode="wait">
            {!editingDeck ? (
                <div className="space-y-8 flex flex-col h-full pb-40">
                    <div className="flex justify-between items-end border-b-2 border-white/20 pb-4 px-2">
                        <div>
                            <h2 className="text-4xl font-bold tracking-tighter">DATA_ARCHIVE_MGR</h2>
                            <p className="text-sm opacity-50 font-mono mt-1">&gt; STATUS: SYSTEMS_STABLE // STORAGE: 99%</p>
                        </div>
                        <button
                            onClick={() => setIsIntensitySelectOpen(true)}
                            className="p-3 border-2 border-white hover:bg-white hover:text-black transition-all font-bold text-lg"
                        >
                            [ CREATE_NEW_FILE ]
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 content-start">
                        {customDecks.length === 0 ? (
                            <div className="col-span-full py-20 text-center opacity-30 border-2 border-dashed border-white/10 text-3xl italic">
                                &gt; NO_EXTERNAL_DRIVES_DETECTED
                            </div>
                        ) : (
                            customDecks.map((deck: any) => (
                                <div key={deck.id} className={`fnaf-border p-6 flex flex-col relative overflow-hidden group transition-all ${activeDeckId === deck.id ? 'border-white bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'hover:bg-white/5 opacity-80 hover:opacity-100'}`}>
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className={`text-4xl font-bold mb-2 tracking-tighter ${activeDeckId === deck.id ? 'fnaf-flicker' : ''}`}>
                                                {deck.name || 'UNNAMED_FILE'}
                                            </h3>
                                            <div className="flex gap-4 text-sm font-mono opacity-60">
                                                <span>MODE: {deck.gameMode === GameMode.TRUTH_OR_DARE ? 'T/D' : 'NHIE'}</span>
                                                <span>INT: {deck.intensity}</span>
                                                <span>LEN: {deck.prompts.length}</span>
                                            </div>
                                        </div>
                                        {activeDeckId === deck.id && (
                                            <div className="bg-white text-black text-xs px-2 py-1 font-black animate-pulse">DRIVE_MOUNTED</div>
                                        )}
                                    </div>

                                    <p className="text-xl opacity-60 mb-8 italic line-clamp-2 h-14 border-l border-white/20 pl-4">{deck.description || 'No system metadata provided for this archive.'}</p>

                                    <div className="mt-auto flex gap-4">
                                        <button
                                            onClick={() => setActiveDeckId(deck.id)}
                                            className={`flex-1 py-3 text-2xl font-bold transition-all border ${activeDeckId === deck.id ? 'bg-white text-black border-white' : 'border-white/50 text-white hover:bg-white hover:text-black'}`}
                                        >
                                            {activeDeckId === deck.id ? 'UNMOUNT' : 'MOUNT'}
                                        </button>
                                        <button onClick={() => setEditingDeck(deck)} className="px-6 py-3 border border-white/20 text-white/70 hover:border-white hover:text-white transition-all text-xl font-bold">EDIT</button>
                                        <button onClick={() => deleteDeck(deck.id)} className="px-4 py-3 bg-[#4a0000]/30 text-[#cc0000] hover:bg-[#cc0000] hover:text-white transition-all text-xl font-bold border border-[#cc0000]/30">WIPE</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col h-full space-y-8 pb-40 max-w-4xl mx-auto w-full">
                    <div className="space-y-8 fnaf-border p-8 bg-black/40">
                        <div className="space-y-2">
                            <label className="text-xl opacity-50 tracking-widest">&gt; FILE_HEADER</label>
                            <input
                                className="w-full bg-transparent text-6xl font-black text-white focus:outline-none placeholder-white/10 border-b-2 border-white/20 pb-4 transition-all focus:border-white"
                                value={editingDeck.name}
                                onChange={e => setEditingDeck({ ...editingDeck, name: e.target.value })}
                                placeholder="ENTER_FILENAME_HERE..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xl opacity-50 tracking-widest">&gt; METADATA_DESC</label>
                            <textarea
                                className="w-full bg-transparent text-2xl font-mono text-white/80 focus:outline-none border-b border-white/10 pb-4 resize-none h-24 placeholder-white/5"
                                value={editingDeck.description}
                                onChange={e => setEditingDeck({ ...editingDeck, description: e.target.value })}
                                placeholder="Add system description for this archive..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-12">
                            <div className="space-y-2">
                                <label className="text-xl opacity-50 tracking-widest">&gt; SYSTEM_MODE</label>
                                <div className="w-full bg-black text-white p-4 border-2 border-white/30 font-bold text-2xl text-center uppercase">
                                    {editingDeck.gameMode === GameMode.TRUTH_OR_DARE ? 'CAM_TRUTH_DARE' : 'CAM_NHIE_LOGS'}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xl opacity-50 tracking-widest">&gt; RISK_INTENSITY</label>
                                <div className="w-full bg-black text-[#cc0000] p-4 border-2 border-[#cc0000]/30 font-bold text-2xl text-center uppercase">
                                    {editingDeck.intensity}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col min-h-0 bg-white/5 p-6 fnaf-border">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-3xl font-bold tracking-tighter">&gt; DATA_LOGS <span className="opacity-40">({editingDeck.prompts.length})</span></h3>
                            <button
                                onClick={addNewPromptToEditingDeck}
                                className="px-6 py-2 border-2 border-white text-white hover:bg-white hover:text-black transition-all font-bold text-xl"
                            >
                                [ APPEND_LOG ]
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-8 custom-scrollbar pr-4">
                            {editingDeck.prompts.map((p: any) => (
                                <div key={p.id} className="p-8 fnaf-border bg-black/60 group hover:border-white transition-all relative">
                                    <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                                        <div className="flex gap-6 items-center flex-1">
                                            {editingDeck.gameMode === GameMode.TRUTH_OR_DARE ? (
                                                <div className="flex gap-4 flex-1">
                                                    <button
                                                        onClick={() => logic.updatePromptInEditingDeck(p.id, 'type', 'Truth')}
                                                        className={`flex-1 py-1 border-2 font-bold transition-all ${p.type === 'Truth' ? 'bg-white text-black border-white' : 'border-white/20 text-white/40'}`}
                                                    >
                                                        LOG_TRUTH
                                                    </button>
                                                    <button
                                                        onClick={() => logic.updatePromptInEditingDeck(p.id, 'type', 'Dare')}
                                                        className={`flex-1 py-1 border-2 font-bold transition-all ${p.type === 'Dare' ? 'bg-[#cc0000] text-white border-[#cc0000]' : 'border-white/20 text-white/40'}`}
                                                    >
                                                        LOG_DARE
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex-1 py-1 border-2 border-white/10 text-white/30 font-bold text-center uppercase">
                                                    LOG_NHIE
                                                </div>
                                            )}
                                            <div className="text-xl font-mono text-white/30 italic shrink-0">[{editingDeck.intensity}]</div>
                                        </div>
                                        <button onClick={() => logic.removePromptFromEditingDeck(p.id)} className="text-[#cc0000]/50 hover:text-[#cc0000] text-4xl transition-all">×</button>
                                    </div>
                                    <textarea
                                        className="w-full bg-transparent text-white focus:outline-none text-3xl font-mono leading-relaxed resize-none h-32 placeholder-white/5"
                                        value={p.text}
                                        onChange={e => logic.updatePromptInEditingDeck(p.id, 'text', e.target.value)}
                                        placeholder="Type manual data entry..."
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-8 pt-8 border-t-2 border-white/20">
                        <button onClick={() => setEditingDeck(null)} className="flex-1 py-6 text-3xl font-bold border-2 border-white/30 text-white/50 hover:border-white hover:text-white transition-all">[ ABORT_CHANGES ]</button>
                        <button
                            onClick={() => saveDeck(editingDeck)}
                            className="flex-2 py-6 text-4xl font-bold bg-[#cc0000] text-white border-2 border-[#cc0000] hover:bg-white hover:text-black hover:border-white transition-all px-12 fnaf-flicker"
                        >
                            [ OVERWRITE_SYSTEM_FILE ]
                        </button>
                    </div>
                </div>
            )}
            <ThemedIntensitySelect
                isOpen={isIntensitySelectOpen}
                onClose={() => setIsIntensitySelectOpen(false)}
                onSelect={(intensity, gameMode) => {
                    setEditingDeck({
                        id: generateId(),
                        name: '',
                        description: '',
                        prompts: [],
                        isCustom: true,
                        intensity,
                        gameMode
                    });
                    setIsIntensitySelectOpen(false);
                }}
                styles={{
                    accent: '#cc0000',
                    bg: '#050505',
                    textColor: '#ffffff',
                    cardBg: 'rgba(5, 5, 5, 0.9)',
                    fontFamily: 'VT323, monospace'
                }}
            />
        </AnimatePresence>
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



export const FnafThemesScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setTheme } = logic;
    return (
        <div className="space-y-6 pt-6 sm:pt-12 px-4 sm:px-12 w-full max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold mb-8 sm:mb-12 border-b-2 border-white/30 pb-4 fnaf-flicker">CONNECT TO OTHER LOCATIONS</h2>
            <div className="space-y-2">
                {allThemesList.map(t => (
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
