import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme, ThemeDefinition, GameMode } from '../types';
import { allThemesList } from './allThemesList';
import { DeckCarousel } from '../components/DeckCarousel';
import { DeckSearchModal } from '../components/DeckSearchModal';
import { ThemedIntensitySelect } from '../components/ThemedIntensitySelect';

const STAGES = [
    { id: Intensity.SOFT, title: '* Easy', desc: 'No one gets hurt.', color: '#ffffff' },
    { id: Intensity.HOT, title: '* Normal', desc: 'A fair challenge.', color: '#ffffff' },
    { id: Intensity.VULGAR, title: '* Hard', desc: 'You\'re gonna have a bad time.', color: '#ff0000' },
];

export const UndertaleLayout: React.FC<{ children: React.ReactNode; activeTab: string; setActiveTab: (tab: string) => void; logic: any }> = ({ children, activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'play', label: 'ACT' },
        { id: 'decks', label: 'ITEM' },
        { id: 'history', label: 'MERCY' },
        { id: 'themes', label: 'FIGHT' },
        { id: 'settings', label: 'STAT' },
    ];

    return (
        <div className="undertale-theme h-[100dvh] w-screen flex flex-col items-center bg-black text-white overflow-hidden font-['DotGothic16'] relative">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');
                .undertale-theme { 
                    font-family: 'DotGothic16', monospace;
                }
                .ut-border {
                    border: 4px solid white;
                    border-radius: 0px;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: black;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: white;
                }
            `}</style>

            <header className="w-full max-w-4xl p-4 flex justify-between items-center shrink-0 border-b-4 border-white z-10">
                <div className="flex items-center gap-6">
                    <span className="text-2xl font-bold">FRISK</span>
                    <span className="text-xl">LV 1</span>
                    <span className="text-xl">HP <span className="text-[#00ff00]">20/20</span></span>
                </div>
                <div className="text-xl">G 420</div>
            </header>

            <main className="flex-1 w-full overflow-y-auto p-4 sm:p-8 relative z-10 custom-scrollbar">
                <div className="max-w-3xl mx-auto h-full">{children}</div>
            </main>

            <nav className="w-full max-w-4xl p-6 flex justify-center gap-2 sm:gap-6 shrink-0 z-10">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`text-xl sm:text-2xl px-4 py-2 border-4 transition-colors relative flex items-center justify-center min-w-[120px] ${activeTab === tab.id ? 'border-[#ff0000] text-[#ff0000]' : 'border-[#ff9900] text-[#ff9900] hover:border-white hover:text-white'}`}
                    >
                        {activeTab === tab.id && <span className="absolute left-2 text-2xl text-[#ff0000] animate-pulse">♥</span>}
                        {tab.label}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export const UndertaleMenuLayout: React.FC<{ children: React.ReactNode; logic: any }> = ({ children }) => {
    return (
        <div className="h-[100dvh] w-screen flex flex-col justify-center items-center p-8 bg-black text-white font-['DotGothic16']">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-center mb-16">
                <h1 className="text-6xl sm:text-8xl tracking-[0.2em] mb-4">UNDERTALE</h1>
                <p className="text-xl opacity-50 tracking-[0.5em]">--- ALL-STAR ---</p>
            </motion.div>

            <div className="flex flex-col gap-6 w-full max-w-md">
                {children}
            </div>

            <div className="absolute bottom-10 text-xl opacity-50">
                Press ESC to exit
            </div>
        </div>
    );
};

export const UndertaleMenuButton: React.FC<{ label: string; onClick: () => void; isPrimary?: boolean }> = ({ label, onClick, isPrimary }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            className="text-center py-2 px-4 text-3xl transition-colors relative"
        >
            <div className="flex items-center justify-center gap-4">
                <span className={`text-2xl ${isHovered ? 'opacity-100 text-[#ff0000]' : 'opacity-0'} transition-opacity`}>♥</span>
                <span className={isHovered ? 'text-white' : 'text-gray-400'}>{label}</span>
                <span className={`text-2xl ${isHovered ? 'opacity-100 text-[#ff0000]' : 'opacity-0'} transition-opacity`}>♥</span>
            </div>
        </button>
    );
};

export const UndertaleIntensitySelector: React.FC<{ logic: any }> = ({ logic }) => {
    const { setIntensity } = logic;
    const [hoveredIntensity, setHoveredIntensity] = useState<string | null>(null);

    return (
        <motion.div key="intensity" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full items-center justify-center">
            <div className="w-full max-w-2xl ut-border p-8 text-2xl mb-8 min-h-[120px]">
                {hoveredIntensity
                    ? STAGES.find(s => s.id === hoveredIntensity)?.desc
                    : "* Choose your destiny."}
            </div>

            <div className="grid grid-cols-1 gap-6 w-full max-w-md pl-12">
                {STAGES.map((stage) => (
                    <button
                        key={stage.id}
                        onMouseEnter={() => setHoveredIntensity(stage.id)}
                        onMouseLeave={() => setHoveredIntensity(null)}
                        onClick={() => setIntensity(stage.id)}
                        className="text-left py-2 text-3xl hover:text-white text-gray-400 relative flex items-center"
                        style={{ color: hoveredIntensity === stage.id ? stage.color : undefined }}
                    >
                        <span className={`absolute -left-10 text-2xl text-[#ff0000] ${hoveredIntensity === stage.id ? 'opacity-100' : 'opacity-0'}`}>♥</span>
                        {stage.title}
                    </button>
                ))}
            </div>
        </motion.div>
    );
};

export const UndertalePromptTypeSelector: React.FC<{ logic: any }> = ({ logic }) => {
    const { handleDraw, setIntensity, intensity, customDecks, activeDeckId, setActiveDeckId, setGameMode, gameMode } = logic;
    const [hoveredType, setHoveredType] = useState<string | null>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <motion.div key="type" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full items-center justify-center space-y-8">
            <div className="w-full max-w-2xl ut-border p-8 text-2xl min-h-[120px]">
                * A wild prompt appears!<br />
                * Difficulty: {intensity}<br />
                * What will you do?
            </div>

            <div className="w-full mb-12 flex justify-center">
                <div className="w-full max-w-lg">
                    <DeckCarousel
                        decks={customDecks.filter(d => d.intensity === intensity)}
                        activeDeckId={activeDeckId}
                        onSelect={setActiveDeckId}
                        accentColor="#ffff00"
                        textColor="#ffffff"
                        inactiveColor="#888888"
                        cardBg="#000000"
                        showGlow={true}
                        fontFamily="'Determination Sans', sans-serif"
                    />
                </div>
            </div>

            <div className="w-full mb-8">
                <DeckCarousel
                    decks={customDecks.filter((d: any) => d.intensity === intensity)}
                    activeDeckId={activeDeckId}
                    onSelect={setActiveDeckId}
                    variant="undertale"
                />
            </div>

            <div className="grid grid-cols-2 gap-x-24 gap-y-8 pl-8">
                {gameMode === GameMode.NEVER_HAVE_I_EVER ? (
                    <button
                        onMouseEnter={() => setHoveredType('NeverHaveIEver')}
                        onMouseLeave={() => setHoveredType(null)}
                        onClick={() => handleDraw('NeverHaveIEver')}
                        className="text-left text-3xl relative flex items-center col-span-2"
                    >
                        <span className={`absolute -left-10 text-[#ff0000] ${hoveredType === 'NeverHaveIEver' ? 'opacity-100' : 'opacity-0'}`}>♥</span>
                        * Never Have I Ever
                    </button>
                ) : (
                    <>
                        <button
                            onMouseEnter={() => setHoveredType('Truth')}
                            onMouseLeave={() => setHoveredType(null)}
                            onClick={() => handleDraw('Truth')}
                            className="text-left text-3xl relative flex items-center"
                        >
                            <span className={`absolute -left-10 text-[#ff0000] ${hoveredType === 'Truth' ? 'opacity-100' : 'opacity-0'}`}>♥</span>
                            * Truth
                        </button>
                        <button
                            onMouseEnter={() => setHoveredType('Dare')}
                            onMouseLeave={() => setHoveredType(null)}
                            onClick={() => handleDraw('Dare')}
                            className="text-left text-3xl relative flex items-center"
                        >
                            <span className={`absolute -left-10 text-[#ff0000] ${hoveredType === 'Dare' ? 'opacity-100' : 'opacity-0'}`}>♥</span>
                            * Dare
                        </button>
                    </>
                )}
                <button
                    onMouseEnter={() => setHoveredType('Abort')}
                    onMouseLeave={() => setHoveredType(null)}
                    onClick={() => setIntensity(null)}
                    className="text-left text-3xl relative flex items-center col-span-2 mt-8 text-gray-500 hover:text-white"
                >
                    <span className={`absolute -left-10 text-[#ff0000] ${hoveredType === 'Abort' ? 'opacity-100' : 'opacity-0'}`}>♥</span>
                    * Spare (Go Back)
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
                    accent: '#ff0000',
                    bg: '#000',
                    textColor: '#fff',
                    borderColor: '#fff'
                }}
            />
        </motion.div>
    );
};

export const UndertalePromptLayout: React.FC<{ children: React.ReactNode; logic: any }> = ({ children, logic }) => {
    const { prompt } = logic;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full justify-between">
            <div className="flex-1 ut-border p-8 mb-8 flex flex-col">
                <h2 className="text-3xl mb-6 text-gray-400 uppercase">* {prompt?.type}</h2>
                <p className="text-4xl leading-relaxed whitespace-pre-wrap flex-1">
                    * {prompt?.text}
                </p>

                {prompt?.penalty && (
                    <div className="mt-8 pt-6 border-t-[4px] border-dashed border-gray-700">
                        <span className="text-xl text-[#ff0000] mb-2 block">* PENALTY:</span>
                        <p className="text-2xl text-gray-300">* {prompt.penalty}</p>
                    </div>
                )}
            </div>

            <div className="flex justify-center gap-8 w-full mt-auto">
                {children}
            </div>
        </motion.div>
    );
};

export const UndertalePlayButton: React.FC<{ label: string; onClick: () => void; isPrimary?: boolean }> = ({ label, onClick, isPrimary }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            className={`text-2xl px-6 py-4 flex items-center justify-center gap-4 transition-colors ${isPrimary ? 'text-white border-b-4 border-white' : 'text-gray-500 hover:text-white'}`}
        >
            <span className={`text-[#ff0000] ${isHovered ? 'opacity-100' : 'opacity-0'}`}>♥</span>
            {label}
            <span className={`text-black ${isHovered ? 'opacity-100' : 'opacity-0'}`}>♥</span> {/* Spacer for alignment */}
        </button>
    );
};

export const UndertaleDecksScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { customDecks, setEditingDeck, deleteDeck, editingDeck, generateId, saveDeck, addNewPromptToEditingDeck, updatePromptInEditingDeck, removePromptFromEditingDeck, activeDeckId, setActiveDeckId } = logic;

    const [isIntensitySelectOpen, setIsIntensitySelectOpen] = useState(false);

    return (
        <AnimatePresence mode="wait">
            {!editingDeck ? (
                <div className="space-y-6 h-full flex flex-col">
                    <div className="flex justify-between items-end mb-4 border-b-4 border-white pb-2">
                        <div>
                            <h2 className="text-4xl tracking-tighter">* INVENTORY</h2>
                            <p className="text-sm text-gray-500 mt-1">* 8 slots available.</p>
                        </div>
                        <button
                            onClick={() => setIsIntensitySelectOpen(true)}
                            className="text-2xl hover:text-[#ff0000] transition-colors"
                        >
                            * NEW_ITEM
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 overflow-y-auto custom-scrollbar pr-4 flex-1">
                        {customDecks.length === 0 ? (
                            <div className="py-20 text-center opacity-30 italic text-2xl">
                                * (It's an empty box.)
                            </div>
                        ) : (
                            customDecks.map((deck: any) => (
                                <div key={deck.id} className={`ut-border p-6 flex flex-col gap-4 group transition-all ${activeDeckId === deck.id ? 'border-[#ff0000]' : 'hover:border-[#ff9900]'}`}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className={`text-3xl ${activeDeckId === deck.id ? 'text-[#ff0000]' : 'text-white'}`}>
                                                {activeDeckId === deck.id && <span className="mr-4 animate-pulse">♥</span>}
                                                * {deck.name || 'NULL'}
                                            </h3>
                                            <div className="flex gap-4 text-sm text-gray-500 mt-1 ml-8">
                                                <span>[{deck.gameMode === GameMode.TRUTH_OR_DARE ? 'T/D' : 'NHIE'}]</span>
                                                <span>[{deck.intensity}]</span>
                                                <span>({deck.prompts.length} pages)</span>
                                            </div>
                                        </div>
                                        {activeDeckId === deck.id && <span className="text-[#ff0000] text-sm font-bold tracking-widest mt-2">ACTIVE</span>}
                                    </div>

                                    <p className="text-lg text-gray-400 ml-8 italic leading-snug line-clamp-2">{deck.description || '* No description provided.'}</p>

                                    <div className="flex gap-8 ml-8 mt-2">
                                        <button
                                            onClick={() => setActiveDeckId(deck.id)}
                                            className={`text-2xl transition-colors ${activeDeckId === deck.id ? 'text-[#00ff00]' : 'text-gray-500 hover:text-white'}`}
                                        >
                                            {activeDeckId === deck.id ? '* EQUIPPED' : '* EQUIP'}
                                        </button>
                                        <button onClick={() => setEditingDeck(deck)} className="text-2xl hover:text-[#ff9900] text-gray-500 transition-colors">* INFO</button>
                                        <button onClick={() => deleteDeck(deck.id)} className="text-2xl hover:text-[#ff0000] text-gray-500 transition-colors ml-auto">* DROP</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col h-full space-y-6 pb-4">
                    <div className="space-y-6 ut-border p-6 bg-black">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-500 block">* ITEM_NAME</label>
                            <input
                                className="w-full bg-transparent text-4xl focus:outline-none border-b-4 border-white pb-1 placeholder:opacity-20 translate-x-2"
                                value={editingDeck.name}
                                onChange={e => setEditingDeck({ ...editingDeck, name: e.target.value })}
                                placeholder="Enter name..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-500 block">* LORE_DESCRIPTION</label>
                            <textarea
                                className="w-full bg-transparent text-2xl focus:outline-none border-b-4 border-white pb-1 resize-none h-20 placeholder:opacity-20 translate-x-2"
                                value={editingDeck.description}
                                onChange={e => setEditingDeck({ ...editingDeck, description: e.target.value })}
                                placeholder="Enter lore..."
                            />
                        </div>

                        <div className="flex gap-8">
                            <div className="flex-1 space-y-2">
                                <label className="text-sm text-gray-500 block">* ACTION_PROTOCOL</label>
                                <div className="text-white border-b-4 border-white pb-1 text-2xl w-full translate-x-2">
                                    {editingDeck.gameMode === GameMode.TRUTH_OR_DARE ? 'TRUTH_OR_DARE' : 'NHIE_PROTOCOL'}
                                </div>
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="text-sm text-gray-500 block">* DIFFICULTY_SETTING</label>
                                <div className="text-white border-b-4 border-white pb-1 text-2xl w-full translate-x-2">
                                    {editingDeck.intensity}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col min-h-0">
                        <div className="flex justify-between items-center mb-4 px-2">
                            <h3 className="text-3xl font-bold tracking-tighter text-white">* PAGES ({editingDeck.prompts.length})</h3>
                            <button onClick={addNewPromptToEditingDeck} className="text-2xl hover:text-[#00ff00] transition-colors">* ADD_PAGE</button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-4">
                            {editingDeck.prompts.map((p: any) => (
                                <div key={p.id} className="ut-border p-5 space-y-4 bg-black/50 group hover:border-white transition-colors">
                                    <div className="flex justify-between items-center border-b-2 border-gray-800 pb-2">
                                        <div className="flex gap-6 items-center flex-1">
                                            {editingDeck.gameMode === GameMode.TRUTH_OR_DARE ? (
                                                <div className="flex gap-4 flex-1">
                                                    <button
                                                        onClick={() => updatePromptInEditingDeck(p.id, 'type', 'Truth')}
                                                        className={`text-xl transition-colors ${p.type === 'Truth' ? 'text-[#ff0000]' : 'text-gray-600 hover:text-white'}`}
                                                    >
                                                        * Truth
                                                    </button>
                                                    <button
                                                        onClick={() => updatePromptInEditingDeck(p.id, 'type', 'Dare')}
                                                        className={`text-xl transition-colors ${p.type === 'Dare' ? 'text-[#ff0000]' : 'text-gray-600 hover:text-white'}`}
                                                    >
                                                        * Dare
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="text-xl text-gray-700 italic flex-1">* NHIE_PAGE</div>
                                            )}
                                            <div className="text-lg text-gray-600 italic shrink-0">[{editingDeck.intensity}]</div>
                                        </div>
                                        <button onClick={() => removePromptFromEditingDeck(p.id)} className="text-[#ff0000] text-2xl hover:scale-125 transition-transform ml-4 shrink-0">X</button>
                                    </div>
                                    <textarea
                                        className="w-full bg-transparent text-white focus:outline-none text-2xl resize-none h-24 placeholder:opacity-20"
                                        value={p.text}
                                        onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)}
                                        placeholder="* Something happened..."
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t-4 border-white">
                        <button onClick={() => setEditingDeck(null)} className="text-3xl text-gray-500 hover:text-white transition-colors">* CANCEL</button>
                        <button onClick={() => saveDeck(editingDeck)} className="text-3xl text-[#ff0000] hover:text-[#00ff00] transition-colors">* SAVE_ITEM</button>
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
                    accent: '#ff0000',
                    bg: '#000',
                    textColor: '#fff',
                    cardBg: '#000',
                    fontFamily: 'DotGothic16, sans-serif'
                }}
            />
        </AnimatePresence>
    );
};

export const UndertaleHistoryScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { history } = logic;
    return (
        <div className="space-y-6 h-full flex flex-col">
            <h2 className="text-4xl mb-4">* MEMORIES</h2>
            <div className="space-y-4 overflow-y-auto custom-scrollbar pr-4 flex-1">
                {history.map((item: any, i: number) => (
                    <div key={i} className="flex flex-col p-4 border-l-4 border-white">
                        <span className="text-xl text-gray-500 mb-2">* [{item.type.toUpperCase()}] #{history.length - i}</span>
                        <p className="text-2xl">* "{item.text}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const UndertaleThemesScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setTheme, theme } = logic;
    return (
        <div className="space-y-6 h-full flex flex-col">
            <h2 className="text-4xl mb-8">* SELECT DIMENSION</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 pb-8 overflow-y-auto custom-scrollbar pr-4">
                {allThemesList.map(t => (
                    <button key={t.id} onClick={() => setTheme(t.id)} className={`text-left text-2xl relative flex items-center ${theme === t.id ? 'text-white' : 'text-gray-500 border-transparent hover:text-white'}`}>
                        <span className={`absolute -left-8 text-[#ff0000] ${theme === t.id ? 'opacity-100' : 'opacity-0'}`}>♥</span>
                        * {t.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export const UndertaleSettingsScreen: React.FC<{ logic: any }> = ({ logic }) => {
    const { setView } = logic;
    return (
        <div className="space-y-8 h-full">
            <h2 className="text-4xl mb-8">* SETTINGS</h2>
            <div className="ut-border p-8 space-y-8">
                <div className="flex justify-between items-center border-b-4 border-gray-800 pb-4"><span className="text-3xl">* SOUND</span><span className="text-3xl text-gray-500">ON</span></div>
                <div className="flex justify-between items-center border-b-4 border-gray-800 pb-4"><span className="text-3xl">* CONTROLS</span><span className="text-3xl text-gray-500">KEYBOARD</span></div>
                <button onClick={() => setView('menu')} className="w-full text-center text-4xl pt-8 hover:text-[#ff0000] transition-colors">* RESET GAME</button>
            </div>
        </div>
    );
};

export const UndertaleTheme: ThemeDefinition = {
    id: Theme.UNDERTALE,
    name: 'Undertale',
    cssVars: {
        '--theme-accent': '#ff0000',
    },
    MenuLayout: UndertaleMenuLayout,
    MenuButton: UndertaleMenuButton,
    LayoutComponent: UndertaleLayout,
    IntensitySelector: UndertaleIntensitySelector,
    PromptTypeSelector: UndertalePromptTypeSelector,
    PromptLayout: UndertalePromptLayout,
    PlayButton: UndertalePlayButton,
    DecksScreen: UndertaleDecksScreen,
    HistoryScreen: UndertaleHistoryScreen,
    SettingsScreen: UndertaleSettingsScreen,
    ThemesScreen: UndertaleThemesScreen,
    tabLabels: {
        play: 'ACT',
        decks: 'ITEM',
        history: 'MERCY',
        themes: 'FIGHT',
        settings: 'STAT'
    }
};
