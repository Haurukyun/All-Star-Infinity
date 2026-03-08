import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme, ThemeDefinition, GameMode, CustomDeck } from '../types';
import { allThemesList } from './allThemesList';
import { DeckCarousel } from '../components/DeckCarousel';
import { DeckSearchModal } from '../components/DeckSearchModal';
import { ThemedIntensitySelect } from '../components/ThemedIntensitySelect';

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
    const { intensity, handleDraw, setIntensity, activeDeckId, setActiveDeckId, customDecks, setGameMode, gameMode } = logic;
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    return (
        <motion.div key="type" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full pt-4">

            <div className="pip-border p-6 mb-8 text-2xl">
                &gt; WAITING FOR COMMAND...<br />
                &gt; INTENSITY: {intensity}<br />
                &gt; SECTOR: {gameMode === GameMode.NEVER_HAVE_I_EVER ? 'NHIE' : 'TRUTH/DARE'}
            </div>

            <div className="mb-8 p-1 pip-border">
                <DeckCarousel
                    decks={customDecks.filter(d => d.intensity === intensity)}
                    activeDeckId={activeDeckId}
                    onSelect={setActiveDeckId}
                    variant="fallout"
                />
            </div>

            <div className="space-y-4 max-w-xl mx-auto w-full">
                {gameMode === GameMode.NEVER_HAVE_I_EVER ? (
                    <button
                        onClick={() => handleDraw('NeverHaveIEver')}
                        className="w-full text-left p-4 text-3xl border border-[#21ed43] hover:bg-[#21ed43] hover:text-black transition-colors"
                    >
                        [ NHIE.v7 ]
                    </button>
                ) : (
                    <>
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
                    </>
                )}
                <div className="py-2 text-center opacity-40">-----------------</div>
                <button
                    onClick={() => setIntensity(null)}
                    className="w-full text-center p-4 text-2xl hover:bg-[#21ed43]/20 transition-colors opacity-70"
                >
                    [ ABORT_AND_RETURN ]
                </button>
            </div>

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
                    accent: '#21ed43',
                    bg: '#051505',
                    textColor: '#21ed43',
                    borderColor: '#21ed43'
                }}
            />
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
    const { customDecks, setEditingDeck, deleteDeck, editingDeck, generateId, saveDeck, addNewPromptToEditingDeck, updatePromptInEditingDeck, removePromptFromEditingDeck, activeDeckId, setActiveDeckId } = logic;

    const [isIntensitySelectOpen, setIsIntensitySelectOpen] = useState(false);

    return (
        <AnimatePresence mode="wait">
            {!editingDeck ? (
                <div className="space-y-6 flex flex-col h-full">
                    <div className="flex justify-between items-end border-b-2 border-[#21ed43] pb-2 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[#21ed43]/5 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <div>
                            <h2 className="text-3xl tracking-widest">&gt; INVENTORY_MANAGER</h2>
                            <p className="text-xs opacity-60 mt-1">&gt; 38.2 GB FREE // HOLOTAPE_STORAGE</p>
                        </div>
                        <button
                            onClick={() => setIsIntensitySelectOpen(true)}
                            className="text-xl hover:bg-[#21ed43] hover:text-black px-3 py-1 transition-colors border border-[#21ed43]/50"
                        >
                            [ ADD_ENTRY ]
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 space-y-4">
                        {customDecks.length === 0 ? (
                            <div className="py-20 text-center opacity-30 border border-dashed border-[#21ed43]/30">
                                &gt; NO COMPATIBLE HOLOTAPES DETECTED
                            </div>
                        ) : (
                            customDecks.map((deck: any) => (
                                <div key={deck.id} className={`pip-border p-5 flex flex-col group transition-all ${activeDeckId === deck.id ? 'bg-[#21ed43]/10 border-white' : 'hover:bg-[#21ed43]/5'}`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className={`text-2xl font-bold ${activeDeckId === deck.id ? 'text-white' : ''}`}>&gt; {deck.name || 'UNKNOWN_DATA'}</h3>
                                            <div className="flex gap-4 text-xs opacity-70 mt-1">
                                                <span>PROT: {deck.gameMode === GameMode.TRUTH_OR_DARE ? 'T/D' : 'NHIE'}</span>
                                                <span>RAD: {deck.intensity}</span>
                                                <span>LEN: {deck.prompts.length} SHARDS</span>
                                            </div>
                                        </div>
                                        {activeDeckId === deck.id && <span className="bg-[#21ed43] text-black px-2 py-0.5 text-[10px] font-black animate-pulse">BOOTED</span>}
                                    </div>

                                    <p className="text-sm opacity-60 mb-6 italic line-clamp-2 h-10">{deck.description || 'No metadata description found for this entry.'}</p>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setActiveDeckId(deck.id)}
                                            className={`text-xl px-4 py-1 transition-colors border ${activeDeckId === deck.id ? 'bg-[#21ed43] text-black border-[#21ed43]' : 'border-[#21ed43]/50 hover:bg-[#21ed43] hover:text-black'}`}
                                        >
                                            {activeDeckId === deck.id ? '[ ONLINE ]' : '[ BOOT ]'}
                                        </button>
                                        <button onClick={() => setEditingDeck(deck)} className="text-xl px-4 py-1 border border-[#21ed43]/50 hover:bg-[#21ed43]/20 transition-colors">[ MODIFY ]</button>
                                        <button onClick={() => deleteDeck(deck.id)} className="text-xl px-4 py-1 ml-auto text-red-500/70 hover:text-red-500 hover:bg-red-900/20 transition-colors">[ SCRAP ]</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col h-full space-y-6 pb-2">
                    <div className="pip-border p-6 space-y-6 bg-black/40">
                        <div className="space-y-1">
                            <label className="text-xs opacity-50">&gt; FILE_HEADER_IDENTIFIER</label>
                            <input
                                className="w-full bg-[#21ed43]/10 border border-[#21ed43]/30 p-3 text-3xl focus:outline-none focus:bg-[#21ed43]/20 transition-all"
                                value={editingDeck.name}
                                onChange={e => setEditingDeck({ ...editingDeck, name: e.target.value })}
                                placeholder="ENTER_DATASET_ID..."
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs opacity-50">&gt; METADATA_LOG</label>
                            <textarea
                                className="w-full bg-transparent border border-[#21ed43]/30 p-3 text-lg focus:outline-none focus:bg-[#21ed43]/5 transition-all h-20 resize-none placeholder:opacity-20"
                                value={editingDeck.description}
                                onChange={e => setEditingDeck({ ...editingDeck, description: e.target.value })}
                                placeholder="Input description log..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-xs opacity-50">&gt; EXEC_PROTOCOL</label>
                                <div className="w-full bg-[#21ed43]/10 text-[#21ed43] p-3 text-xl border border-[#21ed43]/30 text-center uppercase font-bold">
                                    {editingDeck.gameMode === GameMode.TRUTH_OR_DARE ? 'TRUTH_OR_DARE.exe' : 'NHIE_SYSTEM.bat'}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs opacity-50">&gt; RADIATION_LVL</label>
                                <div className="w-full bg-[#21ed43]/10 text-[#21ed43] p-3 text-xl border border-[#21ed43]/30 text-center uppercase font-bold">
                                    {editingDeck.intensity}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col min-h-0">
                        <div className="flex justify-between items-center mb-4 px-2">
                            <h3 className="text-2xl font-bold tracking-tighter">&gt; DATA_SHARDS ({editingDeck.prompts.length})</h3>
                            <button onClick={addNewPromptToEditingDeck} className="text-xl hover:bg-[#21ed43] hover:text-black px-4 py-1 border border-[#21ed43]/50 transition-colors">[ + INJECT ]</button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-2">
                            {editingDeck.prompts.map((p: any) => (
                                <div key={p.id} className="border border-[#21ed43]/30 p-4 space-y-3 bg-[#21ed43]/5 group hover:border-[#21ed43] transition-colors">
                                    <div className="flex justify-between items-center border-b border-[#21ed43]/20 pb-2">
                                        <div className="flex gap-4 items-center flex-1">
                                            {editingDeck.gameMode === GameMode.TRUTH_OR_DARE ? (
                                                <div className="flex gap-2 flex-1">
                                                    <button
                                                        onClick={() => logic.updatePromptInEditingDeck(p.id, 'type', 'Truth')}
                                                        className={`flex-1 text-sm font-bold py-1 border transition-all ${p.type === 'Truth' ? 'bg-[#21ed43] text-black border-[#21ed43]' : 'border-[#21ed43]/30 text-[#21ed43]/50'}`}
                                                    >
                                                        [ TRUTH ]
                                                    </button>
                                                    <button
                                                        onClick={() => logic.updatePromptInEditingDeck(p.id, 'type', 'Dare')}
                                                        className={`flex-1 text-sm font-bold py-1 border transition-all ${p.type === 'Dare' ? 'bg-[#21ed43] text-black border-[#21ed43]' : 'border-[#21ed43]/30 text-[#21ed43]/50'}`}
                                                    >
                                                        [ DARE ]
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex-1 bg-black text-[#21ed43] text-sm py-1 border border-[#21ed43]/30 text-center font-bold opacity-50 uppercase">
                                                    [ NHIE ]
                                                </div>
                                            )}
                                            <div className="text-[10px] opacity-40 tracking-widest shrink-0 uppercase">[RAD: {editingDeck.intensity}]</div>
                                        </div>
                                        <button onClick={() => logic.removePromptFromEditingDeck(p.id)} className="text-red-500/50 hover:text-red-500 transition-colors text-xl leading-none px-2 font-bold">×</button>
                                    </div>
                                    <textarea
                                        className="w-full bg-transparent text-[#21ed43] focus:outline-none text-xl resize-none h-20 placeholder:opacity-20 italic px-2"
                                        value={p.text}
                                        onChange={e => logic.updatePromptInEditingDeck(p.id, 'text', e.target.value)}
                                        placeholder="Enter program data..."
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-6 pt-4 border-t-2 border-[#21ed43]">
                        <button onClick={() => setEditingDeck(null)} className="flex-1 py-3 border border-[#21ed43]/50 hover:bg-red-900/20 hover:text-red-400 transition-colors text-2xl">[ ABORT ]</button>
                        <button onClick={() => saveDeck(editingDeck)} className="flex-1 py-3 bg-[#21ed43]/10 border-2 border-[#21ed43] hover:bg-[#21ed43] hover:text-black font-bold text-2xl shadow-[0_0_10px_rgba(33,237,67,0.3)] transition-all">[ COMMIT_DATA ]</button>
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
                    accent: '#21ed43',
                    bg: '#051505',
                    textColor: '#21ed43',
                    cardBg: 'rgba(10, 30, 10, 0.9)',
                    fontFamily: 'Share Tech Mono, monospace'
                }}
            />
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
