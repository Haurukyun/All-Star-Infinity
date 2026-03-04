import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme, ThemeDefinition, GameMode } from '../types';
import { allThemesList } from './allThemesList';
import { DeckCarousel } from '../components/DeckCarousel';
import { DeckSearchModal } from '../components/DeckSearchModal';

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
    const { handleDraw, setIntensity, intensity, customDecks, activeDeckId, setActiveDeckId, setGameMode, gameMode } = logic;
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col h-full justify-center space-y-6 sm:space-y-8 px-4 sm:px-0">
            <div className="w-full max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-4 px-2">
                    <span className="text-xs font-black tracking-[3px] text-[#39C5BB]">SELECT TRACKLIST</span>
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="w-8 h-8 rounded-lg border-2 border-[#39C5BB] flex items-center justify-center text-[#39C5BB] hover:bg-[#39C5BB] hover:text-[#111] transition-all vocaloid-glow"
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
                    accentColor="#39C5BB"
                />
            </div>

            <div className="text-center">
                <div className="inline-block px-4 py-1 bg-[#39C5BB] text-[#111] font-bold rounded-full text-xs tracking-widest mb-4 uppercase">{intensity} MODE ACTIVE</div>
                <h2 className="text-3xl sm:text-4xl text-white font-black drop-shadow-[0_0_5px_rgba(57,197,187,0.8)]">CHOOSE TRACK</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gameMode === GameMode.NEVER_HAVE_I_EVER ? (
                    <button
                        onClick={() => handleDraw('NeverHaveIEver')}
                        className="p-4 sm:p-8 text-xl sm:text-2xl font-bold bg-[#1a1a1a] rounded-xl border-2 border-[#39C5BB] text-[#39C5BB] hover:bg-[#39C5BB] hover:text-[#111] transition-all vocaloid-glow text-center col-span-2"
                    >
                        <div className="text-3xl sm:text-4xl mb-2 sm:mb-4">🎼</div>
                        NEVER HAVE I EVER TRACK
                    </button>
                ) : (
                    <>
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
                    </>
                )}
            </div>

            <button onClick={() => setIntensity(null)} className="w-full p-4 mt-8 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-bold tracking-widest">
                BACK TO DIFFICULTY
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
            />
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
    const { customDecks, setEditingDeck, deleteDeck, editingDeck, generateId, saveDeck, addNewPromptToEditingDeck, updatePromptInEditingDeck, removePromptFromEditingDeck, activeDeckId, setActiveDeckId } = logic;

    return (
        <AnimatePresence mode="wait">
            {!editingDeck ? (
                <div className="space-y-6 pb-20 flex flex-col h-full">
                    <div className="flex justify-between items-end border-b-2 border-[#39C5BB] pb-4">
                        <div>
                            <h2 className="text-3xl font-black text-white drop-shadow-[0_0_5px_rgba(57,197,187,0.8)]">TRACKLIST_LIBRARY</h2>
                            <p className="text-[10px] text-[#FF1493] tracking-[4px] mt-1">AVAILABLE STORAGE: 393.9 MB</p>
                        </div>
                        <button
                            onClick={() => setEditingDeck({
                                id: generateId(),
                                name: '',
                                description: '',
                                prompts: [],
                                isCustom: true,
                                intensity: logic.intensity || Intensity.SOFT,
                                gameMode: logic.gameMode || GameMode.TRUTH_OR_DARE
                            })}
                            className="px-4 py-2 bg-[#39C5BB] text-[#111] font-bold rounded-lg hover:shadow-[0_0_15px_rgba(57,197,187,0.8)] transition-all text-sm"
                        >
                            + NEW_TRACK
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 overflow-y-auto custom-scrollbar pr-2 flex-1 content-start">
                        {customDecks.length === 0 ? (
                            <div className="col-span-full py-20 text-center opacity-30 border-2 border-dashed border-white/10 rounded-2xl">
                                <span className="text-4xl block mb-4">💿</span>
                                NO CUSTOM TRACKS FOUND
                            </div>
                        ) : (
                            customDecks.map((deck: any) => (
                                <div
                                    key={deck.id}
                                    className={`p-5 rounded-2xl border-2 transition-all group flex flex-col justify-between ${activeDeckId === deck.id ? 'border-[#39C5BB] bg-[#39C5BB]/5 vocaloid-glow' : 'border-white/5 bg-[#1a1a1a] hover:border-white/20'}`}
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className={`font-black text-xl truncate pr-2 ${activeDeckId === deck.id ? 'text-white' : 'text-white/80'}`}>{deck.name || 'UNTITLED_PROJ'}</h3>
                                            {activeDeckId === deck.id && <div className="w-2 h-2 rounded-full bg-[#FF1493] animate-ping shadow-[0_0_8px_#FF1493]"></div>}
                                        </div>
                                        <div className="flex gap-2 text-[10px] font-bold mb-4">
                                            <span className="px-2 py-0.5 bg-[#111] text-[#39C5BB] border border-[#39C5BB]/30 rounded">{deck.gameMode === GameMode.TRUTH_OR_DARE ? 'T/D' : 'NHIE'}</span>
                                            <span className="px-2 py-0.5 bg-[#111] text-[#FF1493] border border-[#FF1493]/30 rounded">{deck.intensity}</span>
                                            <span className="px-2 py-0.5 bg-[#111] text-white/50 rounded">{deck.prompts.length} SHARDS</span>
                                        </div>
                                        <p className="text-sm opacity-50 italic line-clamp-2 h-10 mb-6">{deck.description || 'No project metadata provided.'}</p>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setActiveDeckId(deck.id)}
                                            className={`flex-1 py-2 rounded-lg font-bold text-xs transition-all ${activeDeckId === deck.id ? 'bg-[#39C5BB] text-[#111]' : 'bg-black text-[#39C5BB] border border-[#39C5BB]/50 hover:bg-[#39C5BB]/20'}`}
                                        >
                                            {activeDeckId === deck.id ? 'PLAYING' : 'MOUNT'}
                                        </button>
                                        <button onClick={() => setEditingDeck(deck)} className="px-4 py-2 bg-black border border-white/10 text-white hover:border-white/40 rounded-lg text-xs font-bold transition-all">EDIT</button>
                                        <button onClick={() => deleteDeck(deck.id)} className="px-3 py-2 bg-black border border-red-900/30 text-red-500/70 hover:bg-red-500 hover:text-white rounded-lg text-xs font-bold transition-all">DEL</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col h-full space-y-6 pb-20">
                    <div className="bg-[#1a1a1a] rounded-2xl p-6 border-b-4 border-[#39C5BB] vocaloid-glow space-y-6">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-[#39C5BB] tracking-[2px] opacity-70">TRACK_TITLE</label>
                            <input
                                className="w-full bg-transparent text-4xl font-black text-white focus:outline-none placeholder-white/10"
                                value={editingDeck.name}
                                onChange={e => setEditingDeck({ ...editingDeck, name: e.target.value })}
                                placeholder="ENTER_NAME..."
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-[#39C5BB] tracking-[2px] opacity-70">TRACK_LINER_NOTES</label>
                            <textarea
                                className="w-full bg-transparent text-lg text-white/80 focus:outline-none resize-none h-20 placeholder-white/5"
                                value={editingDeck.description}
                                onChange={e => setEditingDeck({ ...editingDeck, description: e.target.value })}
                                placeholder="Input project description..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-[#39C5BB] tracking-[2px] opacity-70">SYNTH_PROTOCOL</label>
                                <select
                                    value={editingDeck.gameMode}
                                    onChange={e => setEditingDeck({ ...editingDeck, gameMode: e.target.value as any })}
                                    className="w-full bg-black text-[#39C5BB] p-3 rounded-lg border border-[#39C5BB]/30 focus:border-[#39C5BB] outline-none font-bold text-sm cursor-pointer"
                                >
                                    <option value={GameMode.TRUTH_OR_DARE}>V_TRUTH_DARE</option>
                                    <option value={GameMode.NEVER_HAVE_I_EVER}>V_NHIE_PROT</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-[#39C5BB] tracking-[2px] opacity-70">BPM_INTENSITY</label>
                                <select
                                    value={editingDeck.intensity}
                                    onChange={e => setEditingDeck({ ...editingDeck, intensity: e.target.value as any })}
                                    className="w-full bg-black text-[#FF1493] p-3 rounded-lg border border-[#FF1493]/30 focus:border-[#FF1493] outline-none font-bold text-sm cursor-pointer"
                                >
                                    <option value={Intensity.SOFT}>SLOW (SOFT)</option>
                                    <option value={Intensity.HOT}>UPBEAT (HOT)</option>
                                    <option value={Intensity.VULGAR}>EXTREME (VULGAR)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col min-h-0 bg-[#0a0a0a] rounded-2xl p-4 border border-white/5">
                        <div className="flex justify-between items-center mb-4 px-2">
                            <h3 className="text-xl font-black text-white italic tracking-tighter self-end">TRACK_SEGMENTS <span className="text-[#39C5BB] ml-2">[{editingDeck.prompts.length}]</span></h3>
                            <button
                                onClick={addNewPromptToEditingDeck}
                                className="px-4 py-2 border-2 border-[#39C5BB] text-[#39C5BB] hover:bg-[#39C5BB] hover:text-[#111] transition-all rounded-lg text-xs font-black shadow-[0_0_10px_rgba(57,197,187,0.2)]"
                            >
                                + ADD_SEGMENT
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-2">
                            {editingDeck.prompts.map((p: any) => (
                                <div key={p.id} className="p-5 rounded-xl bg-[#1a1a1a] border border-white/10 group hover:border-[#39C5BB]/50 transition-all">
                                    <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
                                        <div className="flex gap-4 items-center">
                                            <select
                                                className="bg-black text-[#39C5BB] text-xs font-black rounded-md px-2 py-1 border border-[#39C5BB]/30 outline-none"
                                                value={p.type}
                                                onChange={e => logic.updatePromptInEditingDeck(p.id, 'type', e.target.value as any)}
                                            >
                                                {editingDeck.gameMode === GameMode.TRUTH_OR_DARE ? (
                                                    <><option value="Truth">CH_TRUTH</option><option value="Dare">CH_DARE</option></>
                                                ) : (
                                                    <option value="NeverHaveIEver">CH_NHIE</option>
                                                )}
                                            </select>
                                            <div className="text-[10px] font-bold text-white/30 italic">[{editingDeck.intensity}]</div>
                                        </div>
                                        <button onClick={() => logic.removePromptFromEditingDeck(p.id)} className="text-[#FF1493]/50 hover:text-[#FF1493] text-xl transition-colors">×</button>
                                    </div>
                                    <textarea
                                        className="w-full bg-transparent text-white focus:outline-none text-xl font-bold italic resize-none h-20 placeholder-white/5"
                                        value={p.text}
                                        onChange={e => logic.updatePromptInEditingDeck(p.id, 'text', e.target.value)}
                                        placeholder="Enter vocal lyrics..."
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4 border-t-2 border-[#FF1493]/30">
                        <button onClick={() => setEditingDeck(null)} className="flex-1 py-4 font-black text-[#FF1493] border-2 border-[#FF1493] hover:bg-[#FF1493] hover:text-white rounded-xl transition-all">CANCEL</button>
                        <button
                            onClick={() => saveDeck(editingDeck)}
                            className="flex-2 py-4 font-black bg-[#39C5BB] text-[#111] border-2 border-[#39C5BB] rounded-xl shadow-[0_0_20px_rgba(57,197,187,0.4)] hover:shadow-[0_0_30px_rgba(57,197,187,0.7)] transition-all px-8"
                        >
                            EXPORT_TRACK ▶
                        </button>
                    </div>
                </div>
            )}
        </AnimatePresence>
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
    const { setTheme, theme } = logic;
    return (
        <div className="space-y-6 pb-20 px-4 sm:px-0">
            <h2 className="text-2xl sm:text-3xl font-black text-white border-b-2 border-[#39C5BB] pb-2 drop-shadow-[0_0_5px_rgba(57,197,187,0.8)]">CONNECT TO STAGE</h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {allThemesList.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`p-3 sm:p-4 rounded-xl font-bold text-center transition-all bg-[#1a1a1a] hover:bg-[#39C5BB] hover:text-[#111] text-xs sm:text-base ${theme === t.id ? 'border-2 border-[#39C5BB] text-[#39C5BB] shadow-[0_0_10px_rgba(57,197,187,0.5)]' : 'border border-white/10 text-white/80'}`}
                    >
                        {t.label}
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
