import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme, ThemeDefinition, GameMode, CustomDeck } from '../types';
import { allThemesList } from './allThemesList';
import { DeckCarousel } from '../components/DeckCarousel';
import { DeckSearchModal } from '../components/DeckSearchModal';
import { ThemedIntensitySelect } from '../components/ThemedIntensitySelect';

const STAGES = [
    { id: Intensity.SOFT, title: 'DAILY LIFE', desc: 'SCHOOL DAYS', color: '#00FFFF', text: '#000000' },
    { id: Intensity.HOT, title: 'DEADLY LIFE', desc: 'INVESTIGATION', color: '#FF00FF', text: '#FFFFFF' },
    { id: Intensity.VULGAR, title: 'CLASS TRIAL', desc: 'TRUTH OR LIE', color: '#000000', text: '#FF00FF' },
];

const SpiralBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <svg className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%] animate-spin-slow opacity-30" viewBox="0 0 100 100">
            <defs>
                <radialGradient id="spiral-grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="#2a0a4a" stopOpacity="0" />
                    <stop offset="100%" stopColor="#4a0a6a" stopOpacity="1" />
                </radialGradient>
            </defs>
            {Array.from({ length: 20 }).map((_, i) => (
                <path
                    key={i}
                    d={`M50 50 Q${50 + Math.cos(i) * 50} ${50 + Math.sin(i) * 50} ${50 + Math.cos(i + 0.5) * 100} ${50 + Math.sin(i + 0.5) * 100}`}
                    stroke="url(#spiral-grad)"
                    strokeWidth="0.5"
                    fill="none"
                    className="mix-blend-screen"
                />
            ))}
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050510_90%)]"></div>
    </div>
);

const RevolverUI = ({ onShoot }: { onShoot: () => void }) => (
    <button
        onClick={onShoot}
        className="relative w-32 h-32 group transition-transform active:scale-95"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full animate-spin-slow-reverse"></div>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
            <circle cx="50" cy="50" r="45" fill="rgba(0,0,0,0.8)" stroke="#00FFFF" strokeWidth="2" />
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <g key={i} transform={`rotate(${deg} 50 50)`}>
                    <circle cx="50" cy="25" r="8" fill="#1a1a1a" stroke="#00FFFF" strokeWidth="1" className="group-hover:fill-[#00FFFF] transition-colors" />
                </g>
            ))}
            <circle cx="50" cy="50" r="15" fill="#000" stroke="#FF00FF" strokeWidth="2" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-['Orbitron'] text-[10px] font-bold text-[#FF00FF] tracking-widest animate-pulse">SHOOT</span>
        </div>
    </button>
);

export const DanganronpaLayout: React.FC<{ children: React.ReactNode; activeTab: string; setActiveTab: (tab: string) => void; logic: any }> = ({ children, activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'play', label: 'TRIAL' },
        { id: 'decks', label: 'EVIDENCE' },
        { id: 'history', label: 'TRANSCRIPT' },
        { id: 'themes', label: 'SHIFT' },
        { id: 'settings', label: 'SYSTEM' },
    ];

    return (
        <div className="dr-theme h-[100dvh] w-screen flex flex-col bg-[#050510] text-white overflow-hidden font-['Orbitron'] relative">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Playfair+Display:ital,wght@1,700;1,900&display=swap');
                
                .dr-theme { background-color: #050510; }
                .animate-spin-slow { animation: spin 20s linear infinite; }
                .animate-spin-slow-reverse { animation: spin 15s linear infinite reverse; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

                .dr-text-box {
                    background: linear-gradient(90deg, rgba(0,20,40,0.9) 0%, rgba(0,10,20,0.95) 100%);
                    border: 1px solid #00FFFF;
                    border-left: 4px solid #00FFFF;
                    clip-path: polygon(0 0, 100% 0, 95% 100%, 0 100%);
                    box-shadow: 0 0 15px rgba(0, 255, 255, 0.2);
                    position: relative;
                }

                .dr-text-box::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 1px;
                    background: linear-gradient(90deg, #00FFFF, transparent);
                }

                .dr-argument-text {
                    font-family: 'Playfair Display', serif;
                    font-style: italic;
                    font-weight: 900;
                    text-shadow: 2px 2px 0px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
                }

                .dr-ui-btn {
                    background: rgba(0,0,0,0.6);
                    border: 1px solid rgba(255,255,255,0.2);
                    clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
                    transition: all 0.2s;
                }

                .dr-ui-btn:hover {
                    background: rgba(0, 255, 255, 0.2);
                    border-color: #00FFFF;
                    box-shadow: 0 0 10px rgba(0, 255, 255, 0.4);
                }

                .dr-ui-btn.active {
                    background: rgba(255, 0, 255, 0.2);
                    border-color: #FF00FF;
                    box-shadow: 0 0 10px rgba(255, 0, 255, 0.4);
                }

                .dr-nav-item {
                    position: relative;
                    transform: skewX(-20deg);
                    border-right: 1px solid rgba(255,255,255,0.1);
                }
                
                .dr-nav-content { transform: skewX(20deg); }

                .dr-nav-item.active {
                    background: linear-gradient(to top, rgba(0, 255, 255, 0.3), transparent);
                    border-bottom: 2px solid #00FFFF;
                }

                .scanline {
                    background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.3) 51%);
                    background-size: 100% 4px;
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    z-index: 50;
                    opacity: 0.3;
                }
                .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>

            <SpiralBackground />
            <div className="scanline"></div>

            <header className="p-4 flex justify-between items-start shrink-0 relative z-20">
                <div className="flex flex-col">
                    <div className="flex items-center gap-1 mb-1">
                        <div className="w-2 h-2 rounded-full bg-[#00FFFF] animate-pulse"></div>
                        <span className="text-[10px] tracking-[2px] text-[#00FFFF] font-bold">NONSTOP DEBATE</span>
                    </div>
                    <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div className="w-2/3 h-full bg-gradient-to-r from-[#00FFFF] to-[#FF00FF]"></div>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex -space-x-1">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="w-6 h-6 transform rotate-45 border-2 border-[#FF00FF] bg-black flex items-center justify-center shadow-[0_0_5px_#FF00FF]">
                                <div className="w-3 h-3 bg-[#FF00FF]"></div>
                            </div>
                        ))}
                    </div>
                    <span className="text-[10px] italic font-black text-[#FF00FF] mt-1 pr-2">INFLUENCE</span>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto px-4 relative z-10 no-scrollbar">
                <div className="max-w-md mx-auto h-full flex flex-col">
                    {children}
                    <div className="h-32"></div>
                </div>
            </main>

            <nav className="fixed bottom-0 left-0 w-full h-20 z-50">
                <div className="absolute inset-0 bg-[#050510] border-t border-[#00FFFF] shadow-[0_-5px_20px_rgba(0,255,255,0.2)]" style={{ clipPath: 'polygon(0 20%, 5% 0, 95% 0, 100% 20%, 100% 100%, 0 100%)' }}></div>
                <div className="relative h-full flex justify-around items-center px-2 pt-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`dr-nav-item flex-1 h-full flex flex-col justify-center items-center transition-all ${activeTab === tab.id ? 'active' : 'opacity-50 hover:opacity-100'}`}
                        >
                            <div className="dr-nav-content flex flex-col items-center">
                                <span className="text-lg mb-1">{tab.id === 'play' ? '⚖️' : tab.id === 'decks' ? '📁' : tab.id === 'history' ? '👁️' : tab.id === 'themes' ? '🌍' : '⚙️'}</span>
                                <span className="text-[8px] font-black tracking-widest">{tab.label}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export const DanganronpaPlayScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { intensity, setIntensity, prompt, setPrompt, history, activeDeckId, setActiveDeckId, customDecks, handleDraw } = logic;
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    return (
        <AnimatePresence mode="wait">
            {!intensity && !prompt ? (
                <motion.div key="play" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col justify-center space-y-8">
                    <div className="dr-text-box p-6 !border-[#FF00FF] !border-l-4">
                        <h2 className="text-xl text-[#FF00FF] font-black italic tracking-wider mb-4 flex items-center gap-2">
                            <span className="text-2xl">▶</span> DIFFICULTY
                        </h2>
                        <div className="flex flex-col gap-3">
                            {STAGES.map((stage) => (
                                <button key={stage.id} onClick={() => { setIntensity(stage.id); logic.setGameMode(GameMode.TRUTH_OR_DARE); }} className="flex items-center justify-between p-3 bg-black/40 border border-white/10 hover:border-[#FF00FF] hover:bg-[#FF00FF]/10 transition-all group">
                                    <span className="font-black italic text-lg group-hover:translate-x-2 transition-transform" style={{ color: stage.color }}>{stage.title}</span>
                                    <span className="text-[9px] font-mono opacity-60 uppercase">{stage.desc}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ) : !prompt ? (
                <div className="flex-1 flex flex-col items-stretch justify-start relative pt-8 w-full overflow-x-hidden">
                    <div className="relative z-10 w-full max-w-md mx-auto space-y-2 px-4">
                        <div className="text-center space-y-2">
                            <p className="text-[#00FFFF] text-[10px] font-black tracking-[4px] animate-pulse">Level: {intensity} | Trial Protocol Initiated</p>
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent"></div>
                        </div>
                    </div>

                    <div className="w-full relative z-20 overflow-visible py-4">
                        <DeckCarousel
                            decks={customDecks.filter(d => d.intensity === intensity)}
                            activeDeckId={activeDeckId}
                            onSelect={setActiveDeckId}
                            variant="danganronpa"
                        />
                    </div>

                    <div className="relative z-10 w-full max-w-md mx-auto space-y-12 px-4">
                        {logic.gameMode === GameMode.NEVER_HAVE_I_EVER ? (
                            <div className="flex flex-col items-center gap-4">
                                <RevolverUI onShoot={() => handleDraw('NeverHaveIEver')} />
                                <span className="text-[#FF00FF] font-black tracking-widest text-sm bg-black/50 px-2 border border-[#FF00FF]">NHIE</span>
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col items-center gap-4">
                                    <RevolverUI onShoot={() => handleDraw('Truth')} />
                                    <span className="text-[#00FFFF] font-black tracking-widest text-sm bg-black/50 px-2 border border-[#00FFFF]">TRUTH</span>
                                </div>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="relative">
                                        <RevolverUI onShoot={() => handleDraw('Dare')} />
                                        <div className="absolute inset-0 bg-[#FF00FF] mix-blend-overlay rounded-full"></div>
                                    </div>
                                    <span className="text-[#FF00FF] font-black tracking-widest text-sm bg-black/50 px-2 border border-[#FF00FF]">LIE</span>
                                </div>
                            </>
                        )}
                    </div>
                    <button onClick={() => setIntensity(null)} className="w-full text-center text-xs text-white/30 hover:text-white mt-8 tracking-[2px] uppercase">[ ABORT TRIAL ]</button>

                    <DeckSearchModal
                        isOpen={isSearchOpen}
                        onClose={() => setIsSearchOpen(false)}
                        decks={customDecks}
                        activeDeckId={activeDeckId}
                        onSelect={(id) => {
                            const deck = customDecks.find(d => d.id === id);
                            if (deck) {
                                logic.setGameMode(deck.gameMode);
                                logic.setIntensity(deck.intensity);
                            }
                            setActiveDeckId(id);
                        }}
                        gameMode={logic.gameMode}
                        intensity={intensity}
                        styles={{
                            accent: '#00FFFF',
                            bg: '#050510',
                            textColor: '#ffffff',
                            cardBg: 'rgba(0, 255, 255, 0.1)',
                            fontFamily: 'Orbitron, sans-serif'
                        }}
                    />
                </div>
            ) : (
                <div className="flex-1 flex flex-col justify-center relative">
                    <motion.div initial={{ scale: 0.8, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} className="relative z-20 mb-12">
                        {prompt.text.split(' ').map((word: string, i: number) => (
                            <motion.span key={i} className="inline-block dr-argument-text text-4xl sm:text-5xl mx-1 text-white" animate={{ y: [0, -5, 0], rotate: [0, i % 2 === 0 ? 2 : -2, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }} style={{ textShadow: '3px 3px 0px #2a0a4a' }}>{word}</motion.span>
                        ))}
                    </motion.div>
                    <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="dr-text-box p-4 mb-4">
                        <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-1">
                            <span className="text-[#00FFFF] font-bold text-xs tracking-widest">MONOKUMA FILE #{history.length}</span>
                            <span className="text-[#FF00FF] font-bold text-xs">{prompt.type.toUpperCase()}</span>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="w-12 h-12 border border-[#FF00FF] bg-black/50 flex items-center justify-center shrink-0"><span className="text-2xl">💀</span></div>
                            <div>
                                <p className="text-[#FF00FF] text-[10px] font-black uppercase mb-1">PENALTY GAME</p>
                                <p className="text-sm font-mono leading-tight text-gray-300">{prompt.penalty}</p>
                            </div>
                        </div>
                    </motion.div>
                    <div className="flex justify-end gap-2">
                        <button onClick={() => { setPrompt(null); if (prompt?.type === 'NeverHaveIEver') setIntensity(null); }} className="dr-ui-btn px-6 py-2 text-xs font-bold text-white">BACK</button>
                        <button onClick={() => handleDraw(prompt.type)} className="dr-ui-btn px-6 py-2 text-xs font-bold text-[#00FFFF] border-[#00FFFF]">RELOAD</button>
                    </div>
                </div>
            )
            }
        </AnimatePresence >
    );
};

export const DanganronpaDecksScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { customDecks, setEditingDeck, deleteDeck, editingDeck, generateId, saveDeck, addNewPromptToEditingDeck, updatePromptInEditingDeck, removePromptFromEditingDeck, activeDeckId, setActiveDeckId } = logic;

    const [isIntensitySelectOpen, setIsIntensitySelectOpen] = useState(false);

    return (
        <AnimatePresence mode="wait">
            {!editingDeck ? (
                <motion.div key="decks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pt-4">
                    <div className="flex justify-between items-center border-b-2 border-[#00FFFF] pb-2 mb-4">
                        <h2 className="text-2xl font-black italic text-[#00FFFF]">EVIDENCE LIST</h2>
                        <button
                            onClick={() => setIsIntensitySelectOpen(true)}
                            className="bg-[#00FFFF] text-black px-3 py-1 text-xs font-bold"
                        >
                            + NEW BULLET
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        {customDecks.map((deck: any) => (
                            <div key={deck.id} className={`bg-black/60 p-3 flex justify-between items-center hover:bg-white/5 transition-colors border-l-4 ${activeDeckId === deck.id ? 'border-[#00FFFF]' : 'border-[#FF00FF]'}`}>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg">{deck.name || 'UNTITLED'}</h3>
                                    <p className="text-[10px] text-gray-400 font-mono tracking-widest">{deck.prompts.length} BULLETS | {deck.intensity}</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex gap-2">
                                        <button onClick={() => setEditingDeck(deck)} className="text-[#00FFFF] text-xs font-bold hover:underline">RECODE</button>
                                        <button onClick={() => deleteDeck(deck.id)} className="text-[#FF00FF] text-xs font-bold hover:underline">EXTRACT</button>
                                    </div>
                                    <button
                                        onClick={() => setActiveDeckId(deck.id)}
                                        className={`px-3 py-1 text-[10px] border font-black ${activeDeckId === deck.id ? 'bg-[#00FFFF] text-black border-[#00FFFF]' : 'text-white/40 border-white/20'}`}
                                    >
                                        {activeDeckId === deck.id ? 'LOADED' : 'LOAD'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            ) : (
                <div className="dr-text-box p-4 space-y-4 pt-4 !border-[#FF00FF]">
                    <h2 className="text-xl font-black italic text-[#FF00FF] border-b border-[#FF00FF]/20 pb-2">DATA MODIFICATION</h2>
                    <input className="w-full bg-transparent border-b border-[#00FFFF] text-xl font-bold py-2 focus:outline-none uppercase" value={editingDeck.name} onChange={e => setEditingDeck({ ...editingDeck, name: e.target.value })} placeholder="FILE NAME" />
                    <textarea className="w-full bg-black/30 border border-white/20 p-2 text-xs font-mono h-20 focus:border-[#FF00FF] outline-none" value={editingDeck.description} onChange={e => setEditingDeck({ ...editingDeck, description: e.target.value })} placeholder="DESCRIPTION" />

                    <div className="flex gap-4 pb-2 border-b border-white/20">
                        <div className="flex-1">
                            <label className="text-[9px] text-[#00FFFF] font-black mb-1 block">TRIAL MODE</label>
                            <div className="w-full bg-black/30 border border-white/20 p-2 text-xs font-mono text-[#00FFFF] uppercase">
                                {editingDeck.gameMode === GameMode.TRUTH_OR_DARE ? 'TRIAL (T/D)' : 'NHIE'}
                            </div>
                        </div>
                        <div className="flex-1">
                            <label className="text-[9px] text-[#FF00FF] font-black mb-1 block">INTENSITY LEVEL</label>
                            <div className="w-full bg-black/30 border border-white/20 p-2 text-xs font-mono text-[#FF00FF] uppercase">
                                {editingDeck.intensity}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-[#00FFFF] font-bold text-sm tracking-widest uppercase">Truth Bullets</span>
                            <button onClick={addNewPromptToEditingDeck} className="text-[10px] bg-white/10 px-3 py-1 hover:bg-[#00FFFF]/20 border border-[#00FFFF]/30 font-black">+ ADD</button>
                        </div>
                        <div className="max-h-[40vh] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                            {editingDeck.prompts.map((p: any) => (
                                <div key={p.id} className="bg-black/60 p-3 border border-white/10 space-y-2 relative group">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2">
                                            {editingDeck.gameMode === GameMode.TRUTH_OR_DARE ? (
                                                <div className="flex gap-1">
                                                    <button
                                                        onClick={() => logic.updatePromptInEditingDeck(p.id, 'type', 'Truth')}
                                                        className={`px-3 py-1 font-black text-[9px] border transition-all ${p.type === 'Truth' ? 'bg-[#00FFFF] text-black border-[#00FFFF]' : 'bg-black text-[#00FFFF] border-[#00FFFF]/30'}`}
                                                    >
                                                        TRUTH
                                                    </button>
                                                    <button
                                                        onClick={() => logic.updatePromptInEditingDeck(p.id, 'type', 'Dare')}
                                                        className={`px-3 py-1 font-black text-[9px] border transition-all ${p.type === 'Dare' ? 'bg-[#FF00FF] text-white border-[#FF00FF]' : 'bg-black text-[#FF00FF] border-[#FF00FF]/30'}`}
                                                    >
                                                        LIE
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-[9px] text-[#FF00FF] font-black border border-[#FF00FF] px-2 py-1 flex items-center bg-black/50">BULLET</span>
                                            )}
                                            <span className="text-[9px] text-[#00FFFF] font-black border border-[#00FFFF] px-2 py-1 flex items-center bg-black/50">{editingDeck.intensity}</span>
                                        </div>
                                        <button onClick={() => removePromptFromEditingDeck(p.id)} className="text-[#FF00FF] hover:text-white font-black text-lg leading-none">×</button>
                                    </div>
                                    <textarea
                                        className="w-full bg-transparent text-sm border-b border-white/10 focus:border-[#00FFFF] outline-none py-1 text-white font-mono resize-none"
                                        value={p.text}
                                        onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)}
                                        placeholder="DATA_STREAM_CONTENT..."
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-4 pt-2">
                        <button onClick={() => setEditingDeck(null)} className="flex-1 py-3 text-xs font-black tracking-widest text-white/50 hover:text-white uppercase">[ ABORT ]</button>
                        <button onClick={() => saveDeck(editingDeck)} className="flex-1 bg-[#00FFFF] text-black py-3 text-xs font-black tracking-widest uppercase shadow-[0_0_15px_#00FFFF]">COMMIT_CHANGES</button>
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
                    accent: '#00FFFF',
                    bg: '#050510',
                    textColor: '#ffffff',
                    cardBg: 'rgba(0, 255, 255, 0.1)',
                    fontFamily: 'Orbitron, sans-serif'
                }}
            />
        </AnimatePresence>
    );
};

export const DanganronpaHistoryScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { history } = logic;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pt-4">
            <h2 className="text-2xl font-black italic text-[#FF00FF] border-b-2 border-[#FF00FF] pb-2 mb-4">TRANSCRIPT LOG</h2>
            <div className="space-y-2">
                {history.map((item: any, i: number) => (
                    <div key={i} className="bg-gradient-to-r from-black/80 to-transparent p-3 border-l-2 border-[#00FFFF]">
                        <div className="flex justify-between items-center mb-1"><span className="text-[10px] font-bold text-[#00FFFF] tracking-widest">{item.type.toUpperCase()}</span><span className="text-[10px] text-gray-500 uppercase">#{history.length - i}</span></div>
                        <p className="font-serif italic text-lg leading-tight">"{item.text}"</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export const DanganronpaThemesScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { theme, setTheme } = logic;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pt-4">
            <h2 className="text-2xl font-black italic text-white border-b-2 border-white/20 pb-2 mb-4">REALITY SHIFT</h2>
            <div className="grid grid-cols-1 gap-3">
                {allThemesList.map(t => (
                    <button key={t.id} onClick={() => setTheme(t.id)} className={`p-4 text-left border border-white/10 hover:border-white transition-all ${theme === t.id ? 'bg-white/10 border-white' : ''}`}>
                        <span className="font-black text-lg" style={{ color: theme === t.id ? '#fff' : t.color }}>{t.label}</span>
                    </button>
                ))}
            </div>
        </motion.div>
    );
};

export const DanganronpaSettingsScreen: React.FC<{ logic: any }> = ({ logic }) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pt-4">
            <div className="dr-text-box p-6 space-y-6">
                <h2 className="text-xl font-bold text-[#00FFFF] mb-4">SYSTEM STATUS</h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-end border-b border-white/10 pb-1"><span className="text-xs text-gray-400">HOPE FRAGMENTS</span><span className="text-[#00FFFF] font-mono">999/999</span></div>
                    <div className="flex justify-between items-end border-b border-white/10 pb-1"><span className="text-xs text-gray-400">MONOCOINS</span><span className="text-[#FFB700] font-mono">000</span></div>
                    <div className="flex justify-between items-end border-b border-white/10 pb-1"><span className="text-xs text-gray-400">LEVEL</span><span className="text-[#FF00FF] font-mono">99</span></div>
                </div>
                <div className="text-center pt-8 opacity-50 text-[10px] tracking-[4px]">TEAM DANGANRONPA</div>
                <button onClick={() => logic.setView('menu')} className="w-full mt-4 bg-[#FF00FF]/20 border border-[#FF00FF] p-2 text-[#FF00FF] font-black text-xs hover:bg-[#FF00FF] hover:text-black transition-colors">RETURN TO TITLE</button>
            </div>
        </motion.div>
    );
};

export const DanganronpaMenu: React.FC<{ logic: any }> = ({ logic }) => {
    const { setView, setTheme, theme } = logic;
    const [activeSection, setActiveSection] = useState<'themes' | null>(null);
    const themes = Object.values(Theme).filter(t => t !== Theme.NONE);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-4 sm:p-8 bg-[#000] font-['Orbitron'] text-white relative overflow-hidden select-none">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
            `}</style>
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,0,255,0.15)_0%,transparent_70%)]"></div>
                <motion.div className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] border-[2px] border-[#ff00ff]/20 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} />
                <motion.div className="absolute -bottom-[20%] -right-[20%] w-[120%] h-[120%] border-[1px] border-[#00ffff]/10 rounded-full" animate={{ rotate: -360 }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }} />
            </div>
            <div className="absolute inset-0 pointer-events-none z-10 opacity-20" style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 4px, 3px 100%' }}></div>
            <div className="z-20 w-full max-w-5xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2 relative">
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative">
                        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white drop-shadow-[5px_5px_0_#ff00ff] italic relative z-10">DANGAN<span className="text-[#00ffff]">RONPA</span></h1>
                        <div className="absolute -inset-1 bg-[#ff00ff] opacity-20 blur-sm -skew-x-12 animate-pulse"></div>
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-white/40 -skew-y-2 z-20"></div>
                    </motion.div>
                    <div className="bg-[#ff00ff] text-white text-[10px] sm:text-xs font-bold px-3 py-1 rotate-[-2deg] mt-[-10px] z-30 shadow-[4px_4px_0_#000]">ULTIMATE_DECISION_MAKER_v3</div>
                </div>
                <div className="flex flex-col gap-4 w-full max-w-xs sm:max-w-sm">
                    <motion.button whileHover={{ x: 10, scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setView('game')} className="group relative bg-black border-l-8 border-[#ff00ff] p-5 flex items-center justify-between transition-all hover:bg-white hover:text-black overflow-hidden">
                        <div className="absolute inset-0 bg-[#ff00ff] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 z-0"></div>
                        <div className="relative z-10 flex flex-col items-start"><span className="text-2xl sm:text-3xl font-black italic">START TRIAL</span><span className="text-[8px] tracking-widest opacity-60">NON-STOP DEBATE</span></div>
                        <span className="relative z-10 text-3xl font-bold group-hover:translate-x-2 transition-transform">▶</span>
                    </motion.button>
                    <motion.button whileHover={{ x: 10, scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setActiveSection(activeSection === 'themes' ? null : 'themes')} className={`group relative border-l-8 ${activeSection === 'themes' ? 'border-[#00ffff] bg-white text-black' : 'border-white bg-black'} p-5 flex items-center justify-between transition-all hover:border-[#00ffff] overflow-hidden`}>
                        <div className="relative z-10 flex flex-col items-start"><span className="text-2xl sm:text-3xl font-black italic">SHIFTER</span><span className="text-[8px] tracking-widest opacity-60">REALITY COLLAPSE</span></div>
                        <span className={`relative z-10 text-2xl transition-transform ${activeSection === 'themes' ? 'rotate-90' : ''}`}>▼</span>
                    </motion.button>
                    <AnimatePresence>
                        {activeSection === 'themes' && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-[#111] border-l-8 border-[#00ffff] grid grid-cols-2 gap-px">
                                {themes.map(t => (
                                    <button key={t} onClick={() => setTheme(t)} className={`p-3 text-[9px] font-black uppercase tracking-widest transition-colors hover:bg-[#00ffff] hover:text-black ${theme === t ? 'bg-[#00ffff] text-black' : 'text-white/50'}`}>{t.replace('_', ' ')}</button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 opacity-10 pointer-events-none">
                <motion.div className="w-full h-full border-[40px] border-double border-[#ff00ff] rounded-full" animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
            </div>
        </div>
    );
};

export const DanganronpaTheme: ThemeDefinition = {
    id: Theme.DANGANRONPA,
    name: 'Danganronpa',
    cssVars: {
        '--theme-accent': '#ff00ff',
    },
    MenuComponent: DanganronpaMenu,
    LayoutComponent: DanganronpaLayout,
    PlayScreen: DanganronpaPlayScreen,
    DecksScreen: DanganronpaDecksScreen,
    HistoryScreen: DanganronpaHistoryScreen,
    SettingsScreen: DanganronpaSettingsScreen,
    ThemesScreen: DanganronpaThemesScreen,
    tabLabels: {
        play: 'TRIAL',
        decks: 'EVIDENCE',
        history: 'TRANSCRIPT',
        themes: 'SHIFT',
        settings: 'SYSTEM'
    }
};
