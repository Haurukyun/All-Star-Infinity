import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme, ThemeDefinition, GameMode, CustomDeck } from '../types';
import { allThemesList } from './allThemesList';
import { DeckCarousel } from '../components/DeckCarousel';
import { DeckSearchModal } from '../components/DeckSearchModal';
import { ThemedIntensitySelect } from '../components/ThemedIntensitySelect';

const STAGES = [
    { id: Intensity.SOFT, title: 'Welcome Lobby', desc: 'Mild eternal torment.', color: '#fffb00' },
    { id: Intensity.HOT, title: 'Pentagram City', desc: 'Things get chaotic.', color: '#f20a59' },
    { id: Intensity.VULGAR, title: 'Extermination Day', desc: 'Absolute carnage!', color: '#ff0000' },
];

export const HazbinLayout: React.FC<{ children: React.ReactNode; activeTab: string; setActiveTab: (tab: string) => void; logic: any }> = ({ children, activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'play', label: 'THE SHOW' },
        { id: 'decks', label: 'RECORDS' },
        { id: 'history', label: 'GOSSIP' },
        { id: 'themes', label: 'DOMAINS' },
        { id: 'settings', label: 'RULES' },
    ];

    return (
        <div className="hazbin-theme h-[100dvh] w-screen flex flex-col bg-[#1a050f] text-[#ffcccb] overflow-hidden font-serif relative">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fascinate+Inline&family=Lora:ital,wght@0,400;0,700;1,400&display=swap');
                
                .hazbin-theme { 
                    font-family: 'Lora', serif;
                }
                .hazbin-display {
                    font-family: 'Fascinate Inline', cursive;
                    text-transform: uppercase;
                }
                .hazbin-bg {
                    background: radial-gradient(circle at 50% 120%, #4a0011 0%, #1a050f 80%);
                    background-image: radial-gradient(circle at 50% 120%, #4a0011 0%, #1a050f 80%), 
                                      repeating-radial-gradient(circle at 50% 50%, rgba(229, 43, 80, 0.1) 0, rgba(229, 43, 80, 0.1) 10px, transparent 10px, transparent 20px);
                }
                .hazbin-stripes {
                    background: linear-gradient(
                        90deg,
                        rgba(229, 43, 80, 0.05) 0%,
                        rgba(229, 43, 80, 0.05) 50%,
                        transparent 50%,
                        transparent 100%
                    );
                    background-size: 40px 100%;
                }
                .hazbin-panel {
                    background: rgba(26, 5, 15, 0.95);
                    border: 4px solid #e52b50;
                    border-radius: 40px 10px 40px 10px;
                    box-shadow: 0 0 15px rgba(229, 43, 80, 0.4), inset 0 0 20px rgba(0,0,0,0.8);
                    position: relative;
                }
                .hazbin-panel::before {
                    content: '';
                    position: absolute;
                    inset: 4px;
                    border: 1px solid #ffcc00;
                    border-radius: 34px 6px 34px 6px;
                    pointer-events: none;
                }
                .hazbin-border {
                    position: relative;
                }
                .hazbin-border::before, .hazbin-border::after {
                    content: '♦';
                    position: absolute;
                    color: #ffcc00;
                    font-size: 14px;
                }
                .hazbin-neon {
                    text-shadow: 0 0 5px #ff0055, 0 0 10px #ff0055, 0 0 20px #ff0055;
                    color: white;
                }
                .hazbin-neon-gold {
                    text-shadow: 0 0 5px #ffcc00, 0 0 10px #ffcc00;
                    color: #fffb00;
                }
                .custom-scrollbar::-webkit-scrollbar { width: 8px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.5); }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e52b50; border-radius: 4px; }
            `}</style>

            <div className="absolute inset-0 hazbin-bg z-0"></div>
            <div className="absolute inset-0 hazbin-stripes pointer-events-none z-0"></div>

            {/* Top Ornate Border */}
            <div className="h-6 w-full bg-[#e52b50] relative z-20 flex justify-between items-center px-4 shadow-[0_5px_15px_rgba(229,43,80,0.5)]">
                <div className="flex gap-2 text-[#ffcc00]">♦ ♥ ♣ ♠</div>
                <div className="hazbin-display text-white text-xs tracking-widest">HAZBIN HOTEL</div>
                <div className="flex gap-2 text-[#ffcc00]">♠ ♣ ♥ ♦</div>
            </div>

            <main className="flex-1 overflow-y-auto p-4 sm:p-8 relative z-10 custom-scrollbar">
                <div className="max-w-4xl mx-auto h-full">{children}</div>
            </main>

            {/* Navigation Navigation */}
            <nav className="border-t-4 border-[#e52b50] bg-[#1a050f] z-20 shadow-[0_-5px_20px_rgba(0,0,0,0.8)]">
                <div className="flex justify-center flex-wrap sm:flex-nowrap">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-4 px-2 text-center transition-all hazbin-display tracking-widest text-sm sm:text-base border-r border-[#e52b50]/30 last:border-0 relative ${activeTab === tab.id ? 'hazbin-neon bg-[#e52b50]/20' : 'text-[#ffcccb] hover:text-white hover:bg-white/5'}`}
                        >
                            {activeTab === tab.id && <div className="absolute top-0 left-0 w-full h-1 bg-[#ffcc00] shadow-[0_0_10px_#ffcc00]"></div>}
                            {tab.label}
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export const HazbinMenuLayout: React.FC<{ children: React.ReactNode; logic: any }> = ({ children }) => {
    return (
        <div className="h-[100dvh] w-screen flex flex-col justify-center items-center p-8 relative overflow-hidden bg-[#1a050f] font-serif">
            <style>{`
                .hazbin-bg-menu { background: radial-gradient(circle at center, #5a001a 0%, #0a0104 100%); }
                .hazbin-curtain { box-shadow: inset 0 0 100px rgba(0,0,0,0.9); }
            `}</style>

            <div className="absolute inset-0 hazbin-bg-menu hazbin-curtain z-0"></div>
            <div className="absolute inset-0 hazbin-stripes opacity-50 z-0"></div>

            {/* Stage lights effect */}
            <div className="absolute top-0 left-[20%] w-[20%] h-full bg-gradient-to-b from-[rgba(255,204,0,0.1)] to-transparent skew-x-12 z-0 transform origin-top blur-xl"></div>
            <div className="absolute top-0 right-[20%] w-[20%] h-full bg-gradient-to-b from-[rgba(255,204,0,0.1)] to-transparent -skew-x-12 z-0 transform origin-top blur-xl"></div>

            <div className="relative z-10 w-full max-w-md text-center">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="mb-12">
                    <p className="hazbin-display text-[#ffcc00] tracking-[0.3em] mb-2 text-sm sm:text-base hazbin-neon-gold">WELCOME TO THE</p>
                    <h1 className="text-6xl sm:text-8xl hazbin-display hazbin-neon leading-none flex flex-col">
                        <span>ALL-STAR</span>
                        <span className="text-[#e52b50] text-5xl sm:text-7xl mt-2 mix-blend-screen">INFINITY</span>
                    </h1>
                </motion.div>

                <div className="flex flex-col gap-4 items-stretch px-8 py-12 hazbin-border-artdeco relative shadow-[0_0_50px_rgba(229,43,80,0.6)] w-full w-max-[450px]">
                    {/* Decorative sign elements */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-[#ffcc00] bg-[#e52b50] shadow-[0_0_20px_#e52b50] flex items-center justify-center text-3xl">★</div>
                    <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-16 bg-[#e52b50] rounded-r-full border-y-4 border-r-4 border-[#ffcc00]"></div>
                    <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-16 bg-[#e52b50] rounded-l-full border-y-4 border-l-4 border-[#ffcc00]"></div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export const HazbinMenuButton: React.FC<{ label: string; onClick: () => void; isPrimary?: boolean }> = ({ label, onClick, isPrimary }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`py-4 px-6 text-xl hazbin-display tracking-widest transition-all rounded-full border-2 ${isPrimary ? 'bg-[#e52b50] border-[#ffcc00] text-white shadow-[0_0_15px_rgba(229,43,80,0.8)] hover:bg-[#ff0055]' : 'bg-transparent border-[#e52b50] text-[#ffcccb] hover:bg-[#e52b50]/20 hover:text-white hover:border-[#ffcc00]'}`}
        >
            {label}
        </motion.button>
    );
};

export const HazbinIntensitySelector: React.FC<{ logic: any }> = ({ logic }) => {
    const { setIntensity } = logic;
    return (
        <motion.div key="intensity" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col h-full items-center">
            <div className="text-center mb-10">
                <h2 className="text-4xl hazbin-display hazbin-neon-gold">CHOOSE YOUR POISON</h2>
                <p className="text-xl italic opacity-80 mt-2 text-[#ffcccb]">How deep into Hell do you wish to descend?</p>
            </div>

            <div className="flex flex-col gap-6 w-full max-w-xl">
                {STAGES.map((stage) => (
                    <button
                        key={stage.id}
                        onClick={() => setIntensity(stage.id)}
                        className="hazbin-panel p-6 text-left group hover:scale-[1.02] transition-transform overflow-hidden relative"
                        style={{ borderLeftColor: stage.color, borderLeftWidth: '8px' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[rgba(255,255,255,0.05)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <h3 className="text-3xl hazbin-display tracking-widest" style={{ color: stage.color }}>{stage.title}</h3>
                        <p className="text-xl italic mt-2 opacity-80">{stage.desc}</p>
                    </button>
                ))}
            </div>
        </motion.div>
    );
};

export const HazbinPromptTypeSelector: React.FC<{ logic: any }> = ({ logic }) => {
    const { intensity, handleDraw, setIntensity, activeDeckId, setActiveDeckId, customDecks, setGameMode, gameMode } = logic;
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    return (
        <motion.div key="type" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-start h-full pt-4">

            <h2 className="text-4xl hazbin-display mb-8 hazbin-neon-gold">PICK A CARD, ANY CARD!</h2>

            <div className="w-full max-w-2xl mb-12">
                <DeckCarousel
                    decks={customDecks.filter(d => d.intensity === intensity)}
                    activeDeckId={activeDeckId}
                    onSelect={setActiveDeckId}
                    variant="hazbin"
                />
            </div>

            <div className="flex gap-8 w-full max-w-3xl mb-12 flex-col sm:flex-row">
                {gameMode === GameMode.NEVER_HAVE_I_EVER ? (
                    <button onClick={() => handleDraw('NeverHaveIEver')} className="hazbin-panel flex-1 h-64 flex flex-col items-center justify-center group hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(229,43,80,0.6)] transition-all rounded-xl relative overflow-hidden border-4">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/always-grey.png')]"></div>
                        <span className="text-6xl mb-4 group-hover:scale-125 transition-transform">🍷</span>
                        <span className="text-4xl hazbin-display text-white">NHIE</span>
                    </button>
                ) : (
                    <>
                        <button onClick={() => handleDraw('Truth')} className="hazbin-panel flex-1 h-64 flex flex-col items-center justify-center group hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(229,43,80,0.6)] transition-all rounded-xl relative overflow-hidden border-4">
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/always-grey.png')]"></div>
                            <span className="text-6xl mb-4 group-hover:scale-125 transition-transform">👁️</span>
                            <span className="text-4xl hazbin-display text-white">TRUTH</span>
                        </button>
                        <button onClick={() => handleDraw('Dare')} className="hazbin-panel flex-1 h-64 flex flex-col items-center justify-center group hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(255,204,0,0.6)] transition-all rounded-xl relative overflow-hidden border-4 !border-[#ffcc00]">
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/always-grey.png')]"></div>
                            <span className="text-6xl mb-4 group-hover:scale-125 transition-transform text-[#ffcc00]">🔥</span>
                            <span className="text-4xl hazbin-display text-[#ffcc00] hazbin-neon-gold">DARE</span>
                        </button>
                    </>
                )}
            </div>

            <button onClick={() => setIntensity(null)} className="text-[#ffcccb] text-xl italic hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">Actually, I changed my mind...</button>

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
                    accent: '#ffcc00',
                    bg: '#1a050f',
                    textColor: '#ffcccb',
                    borderColor: '#e52b50'
                }}
            />
        </motion.div>
    );
};

export const HazbinPromptLayout: React.FC<{ children: React.ReactNode; logic: any }> = ({ children, logic }) => {
    const { prompt } = logic;
    return (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col h-full items-center justify-center max-w-3xl mx-auto py-8">
            <div className="hazbin-panel p-8 sm:p-12 w-full relative">
                {/* Decorative corners */}
                <div className="absolute top-2 left-2 text-[#ffcc00] text-2xl">☠</div>
                <div className="absolute top-2 right-2 text-[#ffcc00] text-2xl">☠</div>

                <div className="text-center mb-8">
                    <span className="text-[#ffcc00] text-2xl hazbin-display tracking-[0.3em] hazbin-neon-gold">{prompt?.type}</span>
                </div>

                <p className="text-3xl sm:text-4xl font-bold italic leading-relaxed text-center text-white mb-8 [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)]">
                    "{prompt?.text}"
                </p>

                {prompt?.penalty && (
                    <div className="mt-8 pt-6 border-t border-[#e52b50]/50 text-center">
                        <span className="text-[#e52b50] text-lg font-bold uppercase tracking-widest block mb-2">If you fail to comply:</span>
                        <p className="text-2xl text-[#ffcccb]">{prompt.penalty}</p>
                    </div>
                )}
            </div>

            <div className="flex gap-6 mt-12 w-full max-w-md">
                {children}
            </div>
        </motion.div>
    );
};

export const HazbinPlayButton: React.FC<{ label: string; onClick: () => void; isPrimary?: boolean }> = ({ label, onClick, isPrimary }) => {
    return (
        <button onClick={onClick} className={`flex-1 py-4 px-6 text-xl sm:text-2xl hazbin-display tracking-widest rounded-full transition-all border-2 ${isPrimary ? 'bg-[#e52b50] border-[#ffcc00] text-white shadow-[0_0_15px_rgba(229,43,80,0.8)] hover:scale-105' : 'bg-[#1a050f] border-[#e52b50] text-[#ffcccb] hover:bg-[#e52b50]/20'}`}>
            {label}
        </button>
    );
};

export const HazbinDecksScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { customDecks, setEditingDeck, deleteDeck, editingDeck, generateId, saveDeck, addNewPromptToEditingDeck, updatePromptInEditingDeck, removePromptFromEditingDeck, activeDeckId, setActiveDeckId } = logic;

    const [isIntensitySelectOpen, setIsIntensitySelectOpen] = useState(false);

    return (
        <AnimatePresence mode="wait">
            {!editingDeck ? (
                <div className="space-y-8 flex flex-col h-full">
                    <div className="flex justify-between items-end border-b-2 border-[#e52b50] pb-4 px-2">
                        <div>
                            <h2 className="text-4xl hazbin-display hazbin-neon-gold">THE ARCHIVES</h2>
                            <p className="text-sm italic opacity-60 mt-1 text-[#ffcccb]">Bound agreements and eternal contracts.</p>
                        </div>
                        <button
                            onClick={() => setIsIntensitySelectOpen(true)}
                            className="py-2 px-6 rounded-full border-2 border-[#ffcc00] text-[#ffcc00] hover:bg-[#ffcc00] hover:text-black transition-all hazbin-display shadow-[0_0_15px_rgba(255,204,0,0.3)]"
                        >
                            Forge New Agreement
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 content-start">
                        {customDecks.length === 0 ? (
                            <div className="col-span-full py-20 text-center opacity-30 italic text-2xl hazbin-display">
                                - NO SOULS HAVE SIGNED YET -
                            </div>
                        ) : (
                            customDecks.map((deck: any) => (
                                <div key={deck.id} className={`hazbin-panel p-6 flex flex-col relative overflow-hidden group transition-all ${activeDeckId === deck.id ? 'border-[#ffcc00] scale-[1.02] shadow-[0_0_30px_rgba(229,43,80,0.5)]' : 'hover:scale-[1.01]'}`}>
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#e52b50]/20 transform rotate-45 translate-x-12 -translate-y-12 group-hover:bg-[#e52b50]/40 transition-colors"></div>

                                    <div className="flex justify-between items-start mb-4 relative z-10">
                                        <div>
                                            <h3 className={`text-3xl hazbin-display mb-1 ${activeDeckId === deck.id ? 'hazbin-neon-gold' : 'text-white'}`}>{deck.name || 'Untitled Contract'}</h3>
                                            <div className="flex gap-3 text-xs hazbin-display opacity-70">
                                                <span className="text-[#ffcc00]">{deck.gameMode === GameMode.TRUTH_OR_DARE ? 'T/D' : 'NHIE'}</span>
                                                <span className="text-[#e52b50]">|</span>
                                                <span className="text-[#ffcccb]">{deck.intensity} LAYER</span>
                                                <span className="text-[#e52b50]">|</span>
                                                <span className="text-white">{deck.prompts.length} CLAUSES</span>
                                            </div>
                                        </div>
                                        {activeDeckId === deck.id && (
                                            <div className="bg-[#ffcc00] text-black text-[10px] px-2 py-0.5 hazbin-display tracking-tighter font-bold shadow-[0_0_10px_#ffcc00]">IN EFFECT</div>
                                        )}
                                    </div>

                                    <p className="text-[#ffcccb] mb-8 italic line-clamp-2 h-12 text-sm leading-relaxed border-l-2 border-[#e52b50]/30 pl-3">{deck.description || 'No descriptive terms provided for this agreement.'}</p>

                                    <div className="mt-auto flex gap-3 relative z-10 font-serif">
                                        <button
                                            onClick={() => setActiveDeckId(deck.id)}
                                            className={`flex-1 py-2 text-sm hazbin-display transition-all rounded-md border ${activeDeckId === deck.id ? 'bg-[#ffcc00] text-black border-[#ffcc00] shadow-[0_0_15px_rgba(255,204,0,0.4)]' : 'border-[#e52b50] text-[#ffcccb] hover:bg-[#e52b50] hover:text-white'}`}
                                        >
                                            {activeDeckId === deck.id ? 'Signed' : 'Sign'}
                                        </button>
                                        <button onClick={() => setEditingDeck(deck)} className="flex-1 py-2 text-sm border border-[#e52b50]/50 text-[#ffcccb] hover:border-white hover:text-white transition-all hazbin-display rounded-md">Review</button>
                                        <button onClick={() => deleteDeck(deck.id)} className="px-4 py-2 bg-[#4a0011]/50 text-[#e52b50] hover:bg-[#ff0000] hover:text-white transition-all hazbin-display rounded-md text-sm">Shred</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col h-full space-y-8 max-w-4xl mx-auto w-full pb-6">
                    <div className="space-y-6 hazbin-panel p-8">
                        <div className="space-y-2">
                            <label className="hazbin-display text-[#ffcc00] text-sm tracking-widest pl-2">Contract Title</label>
                            <input
                                className="w-full bg-transparent text-5xl font-bold italic text-white focus:outline-none placeholder-[#e52b50]/30 border-b-4 border-[#e52b50] pb-2 px-2 transition-all focus:border-[#ffcc00]"
                                value={editingDeck.name}
                                onChange={e => setEditingDeck({ ...editingDeck, name: e.target.value })}
                                placeholder="Name your agreement..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="hazbin-display text-[#ffcc00] text-sm tracking-widest pl-2">Preamble (Description)</label>
                            <textarea
                                className="w-full bg-transparent text-xl italic text-[#ffcccb] focus:outline-none border-b-2 border-[#e52b50]/50 pb-2 px-2 resize-none h-20 placeholder-[#e52b50]/20"
                                value={editingDeck.description}
                                onChange={e => setEditingDeck({ ...editingDeck, description: e.target.value })}
                                placeholder="Describe the eternal consequences..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="hazbin-display text-[#ffcc00] text-sm tracking-widest pl-2">Governing Protocol</label>
                                <div className="w-full bg-[#1a050f] border-2 border-[#e52b50] p-4 text-[#ffcc00] hazbin-display text-xl rounded-2xl text-center shadow-inner uppercase font-bold">
                                    {editingDeck.gameMode === GameMode.TRUTH_OR_DARE ? 'Truth Or Dare' : 'Never Have I Ever'}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="hazbin-display text-[#ffcc00] text-sm tracking-widest pl-2">Intensity Layer</label>
                                <div className="w-full bg-[#1a050f] border-2 border-[#e52b50] p-4 text-[#ffcc00] hazbin-display text-xl rounded-2xl text-center shadow-inner uppercase font-bold">
                                    {editingDeck.intensity} LAYER
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col min-h-0 bg-black/20 rounded-3xl p-4 border border-[#e52b50]/20">
                        <div className="flex justify-between items-center mb-6 px-4">
                            <h3 className="text-3xl hazbin-display text-white hazbin-neon-gold">Binding Clauses ({editingDeck.prompts.length})</h3>
                            <button
                                onClick={addNewPromptToEditingDeck}
                                className="py-2 px-6 border-2 border-[#ffcc00] text-[#ffcc00] hover:bg-[#ffcc00] hover:text-black transition-all hazbin-display rounded-full text-lg shadow-[0_0_10px_rgba(255,204,0,0.2)]"
                            >
                                + Add Clause
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar pr-4">
                            {editingDeck.prompts.map((p: any) => (
                                <div key={p.id} className="hazbin-panel p-6 bg-[#1a050f]/50 border-2 group hover:border-white transition-colors">
                                    <div className="flex justify-between items-center mb-4 border-b border-[#e52b50]/30 pb-4">
                                        <div className="flex gap-6 items-center flex-1">
                                            {editingDeck.gameMode === GameMode.TRUTH_OR_DARE ? (
                                                <div className="flex gap-4 flex-1">
                                                    <button
                                                        onClick={() => logic.updatePromptInEditingDeck(p.id, 'type', 'Truth')}
                                                        className={`flex-1 py-1 px-4 rounded-full border-2 hazbin-display text-lg transition-all ${p.type === 'Truth' ? 'bg-[#e52b50] text-white border-[#ffcc00]' : 'border-[#e52b50]/30 text-[#ffcccb]/40'}`}
                                                    >
                                                        Truth
                                                    </button>
                                                    <button
                                                        onClick={() => logic.updatePromptInEditingDeck(p.id, 'type', 'Dare')}
                                                        className={`flex-1 py-1 px-4 rounded-full border-2 hazbin-display text-lg transition-all ${p.type === 'Dare' ? 'bg-[#ffcc00] text-black border-[#ffcc00]' : 'border-[#e52b50]/30 text-[#ffcccb]/40'}`}
                                                    >
                                                        Dare
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex-1 py-1 px-4 rounded-full border-2 border-[#e52b50]/20 text-[#ffcccb]/30 hazbin-display text-center">
                                                    NHIE Clause
                                                </div>
                                            )}
                                            <div className="text-[#ffcc00] hazbin-display text-lg opacity-40 italic shrink-0">[{editingDeck.intensity}]</div>
                                        </div>
                                        <button onClick={() => logic.removePromptFromEditingDeck(p.id)} className="text-[#e52b50] hover:text-red-500 hover:scale-125 transition-all text-3xl">✖</button>
                                    </div>
                                    <textarea
                                        className="w-full bg-transparent text-2xl italic text-white focus:outline-none resize-none h-28 placeholder-[#e52b50]/20"
                                        value={p.text}
                                        onChange={e => logic.updatePromptInEditingDeck(p.id, 'text', e.target.value)}
                                        placeholder="Draft the terms of this specific clause..."
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-8 pt-8 border-t-4 border-[#ffcc00]/30">
                        <button onClick={() => setEditingDeck(null)} className="flex-1 py-5 text-2xl hazbin-display rounded-full border-2 border-[#e52b50] text-[#e52b50] hover:bg-[#e52b50]/10 transition-all">Cancel Agreement</button>
                        <button
                            onClick={() => saveDeck(editingDeck)}
                            className="flex-2 py-5 text-3xl hazbin-display rounded-full bg-[#e52b50] text-white border-2 border-[#ffcc00] shadow-[0_0_30px_rgba(229,43,80,0.8)] hover:scale-[1.03] transition-all active:scale-95 px-12"
                        >
                            Sign in Blood
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
                    accent: '#e52b50',
                    bg: '#1a050f',
                    textColor: '#ffcccb',
                    cardBg: 'rgba(26, 5, 15, 0.95)',
                    fontFamily: 'Lora, serif'
                }}
            />
        </AnimatePresence>
    );
};

export const HazbinHistoryScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { history } = logic;
    return (
        <div className="space-y-8 h-full flex flex-col max-w-4xl mx-auto w-full">
            <h2 className="text-4xl text-center hazbin-display hazbin-neon-gold">LITTLE BIRDIE TOLD ME...</h2>
            <div className="space-y-4 overflow-y-auto custom-scrollbar pr-4 flex-1">
                {history.map((item: any, i: number) => (
                    <div key={i} className="flex flex-col p-6 hazbin-panel bg-opacity-50">
                        <span className="text-[#ffcc00] hazbin-display text-lg mb-2">#{history.length - i} — {item.type}</span>
                        <p className="text-2xl text-white italic">"{item.text}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const HazbinThemesScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setTheme, theme } = logic;
    return (
        <div className="space-y-8 h-full flex flex-col items-center">
            <h2 className="text-4xl hazbin-display hazbin-neon mb-4">CHOOSE YOUR RING OF HELL</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-12 overflow-y-auto custom-scrollbar pr-4 w-full max-w-4xl">
                {allThemesList.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`text-center py-4 px-6 text-xl transition-all rounded-lg ${theme === t.id ? 'bg-[#e52b50] text-white border-2 border-[#ffcc00] shadow-[0_0_15px_#e52b50]' : 'bg-[#1a050f] border border-[#e52b50]/30 hover:border-[#e52b50] hover:bg-[#e52b50]/10'}`}
                    >
                        <span className="hazbin-display tracking-widest">{t.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export const HazbinSettingsScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setView } = logic;
    return (
        <div className="space-y-8 h-full flex flex-col items-center max-w-3xl mx-auto w-full">
            <h2 className="text-4xl hazbin-display hazbin-neon-gold">HOUSE RULES</h2>
            <div className="hazbin-panel p-8 w-full space-y-8">
                <div className="flex justify-between items-center border-b border-[#e52b50]/30 pb-4"><span className="text-2xl hazbin-display text-[#ffcccb]">BROADCAST</span><span className="text-2xl text-white italic">ON AIR</span></div>
                <div className="flex justify-between items-center border-b border-[#e52b50]/30 pb-4"><span className="text-2xl hazbin-display text-[#ffcccb]">PROFANITY FILTER</span><span className="text-2xl text-[#e52b50] italic">DISABLED</span></div>

                <div className="pt-8">
                    <button onClick={() => setView('menu')} className="w-full py-4 text-2xl hazbin-display rounded-full border-2 border-[#ffcc00] text-[#ffcc00] hover:bg-[#ffcc00] hover:text-black transition-colors">
                        CHECK OUT EARLY
                    </button>
                </div>
            </div>
        </div>
    );
};

export const HazbinTheme: ThemeDefinition = {
    id: Theme.HAZBIN,
    name: 'Hazbin Hotel',
    cssVars: {
        '--theme-accent': '#e52b50',
    },
    MenuLayout: HazbinMenuLayout,
    MenuButton: HazbinMenuButton,
    LayoutComponent: HazbinLayout,
    IntensitySelector: HazbinIntensitySelector,
    PromptTypeSelector: HazbinPromptTypeSelector,
    PromptLayout: HazbinPromptLayout,
    PlayButton: HazbinPlayButton,
    DecksScreen: HazbinDecksScreen,
    HistoryScreen: HazbinHistoryScreen,
    SettingsScreen: HazbinSettingsScreen,
    ThemesScreen: HazbinThemesScreen,
    tabLabels: {
        play: 'THE SHOW',
        decks: 'RECORDS',
        history: 'GOSSIP',
        themes: 'DOMAINS',
        settings: 'RULES'
    }
};
