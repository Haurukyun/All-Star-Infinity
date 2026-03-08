import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme, ThemeDefinition, GameMode, CustomDeck } from '../types';
import { allThemesList } from './allThemesList';
import { DeckCarousel } from '../components/DeckCarousel';
import { DeckSearchModal } from '../components/DeckSearchModal';
import { ThemedIntensitySelect } from '../components/ThemedIntensitySelect';

const STAGES = [
    { id: Intensity.SOFT, title: 'RANK 1 (ALEPH)', desc: 'MISFIT CLASS REGULAR', color: '#ffb300' },
    { id: Intensity.HOT, title: 'RANK 4 (DALETH)', desc: 'BABYLS HONOR STUDENT', color: '#ff5722' },
    { id: Intensity.VULGAR, title: 'RANK 10 (YOD)', desc: 'DEMON KING CANDIDATE', color: '#d50000' },
];

export const IrumaLayout: React.FC<{ children: React.ReactNode; activeTab: string; setActiveTab: (tab: string) => void; logic: any }> = ({ children, activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'play', label: 'LESSON' },
        { id: 'decks', label: 'SPELLS' },
        { id: 'history', label: 'ARCHIVE' },
        { id: 'themes', label: 'GATES' },
        { id: 'settings', label: 'INFO' },
    ];

    return (
        <div className="iruma-theme h-[100dvh] w-screen flex flex-col bg-[#2e1534] text-[#fff] overflow-hidden font-['Sniglet'] relative select-none">
            <style>{`
                .iruma-theme {
                    font-family: 'Sniglet', cursive;
                    background-image: radial-gradient(circle at top right, #4a148c, #1f0b24 100%);
                }
                .iruma-magic-circle {
                    position: absolute;
                    width: 150vw;
                    height: 150vw;
                    max-width: 1000px;
                    max-height: 1000px;
                    border: 4px dashed rgba(255, 215, 0, 0.1);
                    border-radius: 50%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    animation: rotateCircle 60s linear infinite;
                    z-index: 0;
                }
                .iruma-magic-circle::before {
                    content: '';
                    position: absolute;
                    inset: 40px;
                    border: 2px solid rgba(255, 215, 0, 0.05);
                    border-radius: 50%;
                    animation: rotateCircle 40s linear infinite reverse;
                }
                @keyframes rotateCircle {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
                .iruma-panel {
                    background: rgba(43, 19, 50, 0.85);
                    border: 4px solid #ffd700;
                    border-radius: 20px 20px 0 20px;
                    box-shadow: 6px 6px 0 rgba(0,0,0,0.4), inset 0 0 10px rgba(255, 215, 0, 0.2);
                    backdrop-filter: blur(4px);
                }
                .iruma-button {
                    background: #4a148c;
                    border: 3px solid #ffd700;
                    border-radius: 12px;
                    color: white;
                    text-transform: uppercase;
                    box-shadow: 4px 4px 0 rgba(0,0,0,0.5);
                    transition: transform 0.1s, box-shadow 0.1s, background 0.2s;
                }
                .iruma-button:hover {
                    box-shadow: 2px 2px 0 rgba(0,0,0,0.5);
                    transform: translate(2px, 2px);
                    background: #6a1b9a;
                }
                .iruma-tab {
                    border-bottom: 4px solid transparent;
                    transition: all 0.2s;
                    text-transform: uppercase;
                    font-weight: 800;
                }
                .iruma-tab.active {
                    border-bottom: 4px solid #ffd700;
                    color: #ffd700;
                }
                .custom-scrollbar::-webkit-scrollbar { width: 8px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #ffd700; border-radius: 4px; }
            `}</style>

            <div className="iruma-magic-circle"></div>

            <div className="flex-1 w-full max-w-4xl mx-auto p-4 sm:p-6 flex flex-col relative z-10 h-full">
                {/* Header */}
                <header className="flex justify-between items-center mb-6 pt-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#ffd700] text-[#4a148c] flex items-center justify-center font-black text-2xl shadow-[0_0_10px_rgba(255,215,0,0.5)] border-2 border-white">
                            ★
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-[#ffd700] tracking-wider drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" style={{ fontFamily: "'Cherry Bomb One', cursive" }}>BABYLS</h1>
                            <p className="text-sm font-bold text-pink-300">DEMON SCHOOL</p>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto mb-4 custom-scrollbar relative">
                    {children}
                </div>

                {/* Footer Navigation Tabs */}
                <nav className="flex justify-center border-t-2 border-white/10 pt-4 z-40 relative">
                    <div className="flex overflow-x-auto no-scrollbar py-2 gap-4 w-full justify-around max-w-xl">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`iruma-tab text-lg sm:text-xl pb-1 px-2 whitespace-nowrap ${activeTab === tab.id ? 'active' : 'text-white/60 hover:text-white'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </nav>
            </div >
        </div >
    );
};

export const IrumaMenuLayout: React.FC<{ children: React.ReactNode; logic: any }> = ({ children }) => {
    return (
        <div className="h-[100dvh] w-screen flex flex-col justify-center items-center p-8 bg-[#2e1534] text-[#fff] font-['Sniglet'] relative overflow-hidden">
            <style>{`
                .iruma-menu-bg {
                    background-image: radial-gradient(circle at center, #6a1b9a, #1f0b24 100%);
                }
                .wing-left, .wing-right {
                    position: absolute;
                    top: 50%;
                    width: 30vw;
                    height: 50vh;
                    background-size: contain;
                    background-repeat: no-repeat;
                    opacity: 0.15;
                    pointer-events: none;
                    z-index: 0;
                }
                .wing-left {
                    left: 0;
                    transform: translateY(-50%) scaleX(-1);
                    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%23ffd700" d="M10 50 Q 30 10 90 20 Q 50 40 80 60 Q 40 70 70 90 Q 20 80 10 50 Z"/></svg>');
                }
                .wing-right {
                    right: 0;
                    transform: translateY(-50%);
                    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%23ffd700" d="M10 50 Q 30 10 90 20 Q 50 40 80 60 Q 40 70 70 90 Q 20 80 10 50 Z"/></svg>');
                }
            `}</style>

            <div className="absolute inset-0 iruma-menu-bg z-0"></div>
            <div className="iruma-magic-circle" style={{ animationDuration: '120s' }}></div>
            <div className="wing-left"></div>
            <div className="wing-right"></div>

            <div className="z-10 mb-12 text-center">
                <div className="inline-block px-4 py-1 bg-pink-500 text-white font-black rounded-full mb-4 shadow-[0_4px_0_#c2185b] -rotate-3 text-xs sm:text-sm">
                    DEMON KING CANDIDATE!
                </div>
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-[#ffd700] drop-shadow-[0_6px_0_#4a148c] tracking-wide" style={{ fontFamily: "'Cherry Bomb One', cursive" }}>
                    ALL-STAR<br />INFINITY
                </h1>
            </div>

            <div className="relative z-20 flex flex-col gap-4 w-full max-w-sm">
                {children}
            </div>

            <div className="absolute bottom-6 font-bold text-[#ffd700]/50 tracking-widest text-sm z-20">
                CLASS 1-A REGALIA
            </div>
        </div>
    );
};

export const IrumaMenuButton: React.FC<{ label: string; onClick: () => void; isPrimary?: boolean }> = ({ label, onClick, isPrimary }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full text-center py-4 px-6 text-2xl font-black rounded-xl transition-all shadow-[0_6px_0_rgba(0,0,0,0.5)] hover:shadow-[0_2px_0_rgba(0,0,0,0.5)] hover:translate-y-1 ${isPrimary
                ? 'bg-[#ffd700] text-[#4a148c] border-2 border-[#fff]'
                : 'bg-[#4a148c] text-white border-2 border-[#ffd700]'
                }`}
        >
            {label} {isPrimary && '✨'}
        </button>
    );
};

export const IrumaIntensitySelector: React.FC<{ logic: any }> = ({ logic }) => {
    const { setIntensity } = logic;
    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col h-full justify-center space-y-6 sm:space-y-8 p-4">
            <h2 className="text-3xl sm:text-4xl text-center font-black text-[#ffd700] drop-shadow-[0_2px_2px_#000]">YOUR DEMON RANK?</h2>
            <div className="space-y-4">
                {STAGES.map((stage) => (
                    <button
                        key={stage.id}
                        onClick={() => setIntensity(stage.id)}
                        className="w-full text-left p-4 sm:p-6 iruma-panel iruma-button group hover:scale-[1.02] flex justify-between items-center"
                    >
                        <div>
                            <h3 className="text-2xl sm:text-3xl font-black mb-1 drop-shadow-[0_2px_2px_#000]" style={{ color: stage.color }}>{stage.title}</h3>
                            <p className="text-base sm:text-lg font-bold opacity-90 text-white">{stage.desc}</p>
                        </div>
                        <div className="text-4xl opacity-50 group-hover:opacity-100 group-hover:rotate-12 transition-all">🦇</div>
                    </button>
                ))}
            </div>
        </motion.div>
    );
};

export const IrumaPromptTypeSelector: React.FC<{ logic: any }> = ({ logic }) => {
    const { intensity, handleDraw, setIntensity, activeDeckId, setActiveDeckId, customDecks, setGameMode, gameMode } = logic;
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col h-full justify-start space-y-6 sm:space-y-8 p-4 pt-8">

            <h2 className="text-4xl text-center font-black text-[#ffd700] drop-shadow-[0_2px_2px_#000]">CHOOSE YOUR SPELL</h2>

            <div className="w-full mb-8">
                <DeckCarousel
                    decks={customDecks.filter(d => d.intensity === intensity)}
                    activeDeckId={activeDeckId}
                    onSelect={setActiveDeckId}
                    variant="iruma"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {gameMode === GameMode.NEVER_HAVE_I_EVER ? (
                    <button
                        onClick={() => handleDraw('NeverHaveIEver')}
                        className="aspect-square iruma-button flex flex-col justify-center items-center text-2xl sm:text-3xl font-black gap-4 group col-span-1 sm:col-span-2"
                        style={{ background: '#6a1b9a' }}
                    >
                        <div className="text-5xl sm:text-6xl group-hover:scale-110 transition-transform">🍷</div>
                        NHIE MAGIC
                    </button>
                ) : (
                    <>
                        <button
                            onClick={() => handleDraw('Truth')}
                            className="aspect-square iruma-button flex flex-col justify-center items-center text-2xl sm:text-3xl font-black gap-4 group"
                        >
                            <div className="text-5xl sm:text-6xl group-hover:scale-110 transition-transform">📖</div>
                            TRUTH MAGIC
                        </button>
                        <button
                            onClick={() => handleDraw('Dare')}
                            className="aspect-square iruma-button flex flex-col justify-center items-center text-2xl sm:text-3xl font-black gap-4 group"
                            style={{ background: '#d50000', borderColor: '#ffb300' }}
                        >
                            <div className="text-5xl sm:text-6xl group-hover:scale-110 transition-transform">🔥</div>
                            DARE MAGIC
                        </button>
                    </>
                )}
            </div>

            <button onClick={() => setIntensity(null)} className="w-full p-4 mt-8 text-white/70 font-bold hover:text-white rounded-xl transition-colors border border-white/20">
                LOWER RANK ↩
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
                    accent: '#ffd700',
                    bg: '#2e1534',
                    textColor: '#ffffff',
                    cardBg: '#4a148c'
                }}
            />
        </motion.div>
    );
};

export const IrumaPromptLayout: React.FC<{ children: React.ReactNode; logic: any }> = ({ children, logic }) => {
    const { prompt } = logic;
    const isDare = prompt?.type === 'Dare';

    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col h-full p-4">
            <div className="flex justify-center mb-6">
                <div className="bg-[#fff] text-[#4a148c] px-6 py-2 rounded-full font-black text-xl shadow-[0_4px_0_#ccc] border-2 border-[#4a148c]">
                    SUMMONED: {prompt?.type.toUpperCase()}
                </div>
            </div>

            <div className={`flex-1 p-6 sm:p-8 iruma-panel flex flex-col justify-center items-center text-center relative ${isDare ? 'border-[#ff5722]' : ''}`}>
                <div className="absolute top-4 left-4 text-3xl sm:text-4xl opacity-20">❝</div>
                <div className="absolute bottom-4 right-4 text-3xl sm:text-4xl opacity-20">❞</div>

                <p className="text-2xl sm:text-4xl font-bold leading-relaxed z-10">
                    {prompt?.text}
                </p>

                {prompt?.penalty && (
                    <div className="mt-8 bg-[#d50000] p-4 rounded-xl border-2 border-[#ffb300] shadow-[0_4px_0_rgba(0,0,0,0.5)] w-full max-w-md transform rotate-1">
                        <div className="text-[#ffd700] font-black text-xl mb-2 drop-shadow-[0_2px_0_#000]">💀 DEMONIC PENALTY 💀</div>
                        <p className="text-xl font-bold">{prompt.penalty}</p>
                    </div>
                )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                {children}
            </div>
        </motion.div>
    );
};

export const IrumaPlayButton: React.FC<{ label: string; onClick: () => void; isPrimary?: boolean }> = ({ label, onClick, isPrimary }) => {
    return (
        <button
            onClick={onClick}
            className={`flex-1 py-4 px-4 text-xl sm:text-2xl font-black transition-all ${isPrimary
                ? 'iruma-button text-black bg-[#ffd700] hover:bg-white'
                : 'iruma-button bg-[#4a148c]'
                }`}
        >
            {label}
        </button>
    );
};

export const IrumaDecksScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { customDecks, activeDeckId, setActiveDeckId, setEditingDeck, editingDeck, generateId, deleteDeck, saveDeck, addNewPromptToEditingDeck, updatePromptInEditingDeck, removePromptFromEditingDeck } = logic;

    const [isIntensitySelectOpen, setIsIntensitySelectOpen] = useState(false);

    return (
        <AnimatePresence mode="wait">
            {!editingDeck ? (
                <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pt-4">
                    <div className="flex justify-between items-end border-b-4 border-[#ffd700]/30 pb-2 mb-8">
                        <h2 className="text-4xl font-black text-[#ffd700] drop-shadow-[0_2px_2px_#000]">GRIMOIRES</h2>
                        <button
                            onClick={() => setIsIntensitySelectOpen(true)}
                            className="iruma-button bg-[#ffd700] text-[#4a148c] px-4 py-2 text-sm"
                        >
                            + NEW SPELLS
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {customDecks.map((deck: any) => (
                            <div
                                key={deck.id}
                                className={`text-left p-6 iruma-panel iruma-button flex flex-col ${activeDeckId === deck.id ? 'border-[#ffd700] bg-[#6a1b9a]' : 'border-[#4a148c] bg-[#2b1332]'}`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-2xl font-black text-white">{deck.name || '???'}</h3>
                                    <div className="flex gap-2">
                                        <button onClick={() => setEditingDeck(deck)} className="text-[#ffd700] text-xs font-bold hover:underline">REWRITE</button>
                                        <button onClick={() => deleteDeck(deck.id)} className="text-red-400 text-xs font-bold hover:underline">BURN</button>
                                    </div>
                                </div>
                                <p className="text-md opacity-80 mb-4 h-12 overflow-hidden">{deck.description}</p>
                                <div className="flex justify-between items-center w-full mt-auto">
                                    <span className="bg-[#ff5722] px-3 py-1 rounded-full text-sm font-bold shadow-sm">{deck.prompts.length} SPELLS</span>
                                    <button
                                        onClick={() => setActiveDeckId(deck.id)}
                                        className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${activeDeckId === deck.id ? 'bg-[#ffd700] text-[#4a148c]' : 'bg-black/20 text-white/40'}`}
                                    >
                                        {activeDeckId === deck.id ? 'EQUIPPED' : 'EQUIP'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            ) : (
                <motion.div key="editor" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-4 iruma-panel p-6">
                    <h2 className="text-3xl font-black text-[#ffd700] drop-shadow-[0_2px_2px_#000] border-b-2 border-[#ffd700]/20 pb-2">SPELLBOOK EDITOR</h2>
                    <div className="space-y-4">
                        <input
                            className="w-full bg-[#1f0b24] border-2 border-[#ffd700]/30 p-3 text-white font-bold rounded-xl outline-none focus:border-[#ffd700]"
                            value={editingDeck.name}
                            onChange={e => setEditingDeck({ ...editingDeck, name: e.target.value })}
                            placeholder="BOOK TITLE"
                        />
                        <textarea
                            className="w-full bg-[#1f0b24] border-2 border-[#ffd700]/30 p-3 text-white font-bold rounded-xl outline-none focus:border-[#ffd700] h-24"
                            value={editingDeck.description}
                            onChange={e => setEditingDeck({ ...editingDeck, description: e.target.value })}
                            placeholder="DESCRIPTION"
                        />
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-xs text-[#ffd700] font-black mb-1 block">GAME MODE</label>
                                <div className="w-full bg-[#1f0b24] border-2 border-[#ffd700]/30 p-2 text-white font-bold rounded-xl text-center cursor-default">
                                    {editingDeck.gameMode === GameMode.TRUTH_OR_DARE ? 'TRUTH/DARE' : 'NHIE'}
                                </div>
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-[#ffd700] font-black mb-1 block">RANK (DIFF)</label>
                                <div className="w-full bg-[#1f0b24] border-2 border-[#ffd700]/30 p-2 text-white font-bold rounded-xl text-center cursor-default">
                                    {editingDeck.intensity}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                            {editingDeck.prompts.map((p: any) => (
                                <div key={p.id} className="p-4 border-2 border-[#ffd700]/10 bg-[#2b1332] rounded-xl space-y-3 relative">
                                    <div className="flex justify-between items-center">
                                        {editingDeck.gameMode === GameMode.TRUTH_OR_DARE ? (
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => logic.updatePromptInEditingDeck(p.id, 'type', 'Truth')}
                                                    className={`px-3 py-1 text-[10px] font-black border-2 rounded-lg transition-all ${p.type === 'Truth' ? 'bg-[#ffd700] text-[#4a148c] border-[#ffd700]' : 'bg-transparent text-[#ffd700] border-[#ffd700]/30'}`}
                                                >
                                                    TRUTH
                                                </button>
                                                <button
                                                    onClick={() => logic.updatePromptInEditingDeck(p.id, 'type', 'Dare')}
                                                    className={`px-3 py-1 text-[10px] font-black border-2 rounded-lg transition-all ${p.type === 'Dare' ? 'bg-[#d50000] text-white border-[#d50000]' : 'bg-transparent text-[#d50000] border-[#d50000]/30'}`}
                                                >
                                                    DARE
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="bg-[#4a148c] text-white text-[10px] font-black border-2 border-transparent px-3 py-1 rounded-lg">MAGIC</div>
                                        )}
                                        <span className="text-[10px] font-black bg-[#ffd700]/10 text-[#ffd700] px-3 py-1 rounded-full uppercase">{editingDeck.intensity}</span>
                                        <button onClick={() => removePromptFromEditingDeck(p.id)} className="text-red-500 hover:text-white font-black text-xl">×</button>
                                    </div>
                                    <textarea
                                        className="w-full bg-transparent border-b-2 border-[#ffd700]/10 text-white font-bold p-1 outline-none focus:border-[#ffd700] resize-none"
                                        value={p.text}
                                        onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)}
                                        placeholder="SPELL WORDS..."
                                    />
                                </div>
                            ))}
                        </div>
                        <button onClick={addNewPromptToEditingDeck} className="w-full py-4 iruma-button bg-[#6a1b9a] text-white font-black">+ SUMMON NEW SPELL</button>
                        <div className="flex gap-4">
                            <button onClick={() => setEditingDeck(null)} className="flex-1 py-4 text-white/50 font-black hover:text-white">CANCEL</button>
                            <button onClick={() => saveDeck(editingDeck)} className="flex-1 iruma-button bg-[#ffd700] text-[#4a148c] font-black">SEAL GRIMOIRE</button>
                        </div>
                    </div>
                </motion.div>
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
                    accent: '#ffd700',
                    bg: '#2e1534',
                    textColor: '#ffffff',
                    cardBg: '#4a148c',
                    fontFamily: 'Sniglet, cursive'
                }}
            />
        </AnimatePresence>
    );
};

export const IrumaHistoryScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { history } = logic;
    return (
        <div className="space-y-6 p-4">
            <h2 className="text-4xl font-black text-[#ffd700] drop-shadow-[0_2px_2px_#000] border-b-4 border-[#ffd700]/30 pb-2">AKUDOL ARCHIVES</h2>
            <div className="space-y-4">
                {history.map((item: any, i: number) => (
                    <div key={i} className="p-5 iruma-panel border-l-8 border-[#ffd700]">
                        <div className="flex justify-between text-sm mb-3 font-bold opacity-70 text-[#ffb300]">
                            <span>{item.type.toUpperCase()}</span>
                            <span>CAST {history.length - i}</span>
                        </div>
                        <p className="text-xl font-bold">"{item.text}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


export const IrumaThemesScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setTheme } = logic;
    return (
        <div className="space-y-6 p-4">
            <h2 className="text-3xl sm:text-4xl font-black text-[#ffd700] drop-shadow-[0_2px_2px_#000] border-b-4 border-[#ffd700]/30 pb-2">OTHERWORLD GATES</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
                {allThemesList.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className="p-3 sm:p-4 iruma-button text-xs sm:text-xl flex justify-between group bg-[#2b1332] items-center"
                    >
                        <span>{t.label}</span>
                        <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all ml-2">➔</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export const IrumaSettingsScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setView } = logic;
    return (
        <div className="space-y-6 p-4 flex flex-col items-center">
            <h2 className="text-4xl font-black text-[#ffd700] drop-shadow-[0_2px_2px_#000] border-b-4 border-[#ffd700]/30 pb-2 w-full text-center">FAMILIAR STATUS</h2>

            <div className="w-full max-w-sm iruma-panel p-8 mt-8 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-[#ffd700] rounded-full flex items-center justify-center text-5xl border-4 border-[#fff] shadow-[0_0_15px_rgba(255,215,0,0.8)] mb-6">
                    🦅
                </div>
                <h3 className="text-3xl font-black text-[#ffd700] drop-shadow-[0_2px_2px_#000] mb-2">KALLEGO-SENSEI</h3>
                <p className="bg-pink-500 text-white font-bold px-4 py-1 rounded-full text-sm mb-8 shadow-sm">FLUFFY FAMILIAR</p>

                <button onClick={() => setView('menu')} className="w-full py-4 text-xl iruma-button bg-[#d50000] border-[#fff]">
                    RETURN TO EARTH
                </button>
            </div>
        </div>
    );
};

export const IrumaTheme: ThemeDefinition = {
    id: Theme.IRUMA,
    name: 'Iruma',
    cssVars: {
        '--theme-primary': '#ffd700',
        '--theme-secondary': '#4a148c',
        '--theme-bg': '#2e1534',
        '--theme-text': '#FFFFFF',
    },
    MenuLayout: IrumaMenuLayout,
    MenuButton: IrumaMenuButton,
    LayoutComponent: IrumaLayout,
    IntensitySelector: IrumaIntensitySelector,
    PromptTypeSelector: IrumaPromptTypeSelector,
    PromptLayout: IrumaPromptLayout,
    PlayButton: IrumaPlayButton,
    DecksScreen: IrumaDecksScreen,
    HistoryScreen: IrumaHistoryScreen,
    SettingsScreen: IrumaSettingsScreen,
    ThemesScreen: IrumaThemesScreen,
};
