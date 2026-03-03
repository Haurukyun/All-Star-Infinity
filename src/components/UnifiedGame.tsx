import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameLogic } from '../hooks/useGameLogic';
import { Intensity, Theme } from '../types';
import { getThemeDefinition } from '../themes';

interface UnifiedGameProps {
    logic: ReturnType<typeof useGameLogic>;
}

const UnifiedGame: React.FC<UnifiedGameProps> = ({ logic }) => {
    const {
        activeTab,
        intensity, setIntensity,
        prompt, setPrompt,
        handleDraw,
        customDecks,
        activeDeckId, setActiveDeckId,
        history,
        theme,
        editingDeck, setEditingDeck,
        saveDeck, deleteDeck,
        addNewPromptToEditingDeck,
        updatePromptInEditingDeck,
        removePromptFromEditingDeck,
        generateId
    } = logic;

    const themeDef = getThemeDefinition(theme);

    // Default Views if Theme doesn't provide them
    const DefaultIntensitySelector = () => (
        <div className="space-y-6 pt-4">
            <h2 className="theme-text-header text-4xl font-bold italic mb-6">INTENSITY</h2>
            <div className="grid grid-cols-1 gap-4">
                {Object.values(Intensity).map((i) => (
                    <button
                        key={i}
                        onClick={() => setIntensity(i)}
                        className="theme-button p-6 text-2xl font-black italic tracking-widest uppercase hover:scale-105"
                    >
                        {i}
                    </button>
                ))}
            </div>
            <div className="mt-8 space-y-3">
                <p className="theme-text-header text-sm opacity-50 uppercase tracking-widest">Select Deck</p>
                <button
                    onClick={() => setActiveDeckId('default')}
                    className={`w-full p-4 theme-button justify-start text-sm ${activeDeckId === 'default' ? 'bg-white text-black' : 'opacity-60'}`}
                >
                    PHANTOM DEFAULT
                </button>
                {customDecks.map(deck => (
                    <button
                        key={deck.id}
                        onClick={() => setActiveDeckId(deck.id)}
                        className={`w-full p-4 theme-button justify-start text-sm ${activeDeckId === deck.id ? 'bg-white text-black' : 'opacity-60'}`}
                    >
                        {deck.name.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );

    const DefaultPromptTypeSelector = () => (
        <div className="flex flex-col items-center justify-center h-full gap-8 py-12">
            <div className="text-center space-y-2">
                <p className="theme-text-header text-xs opacity-50">MODE: {intensity}</p>
                <div className="h-1 w-24 bg-[var(--theme-accent)] mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 gap-4 w-full px-4">
                <button
                    onClick={() => handleDraw('Truth')}
                    className="theme-button p-8 text-4xl font-black italic"
                >
                    TRUTH
                </button>
                <button
                    onClick={() => handleDraw('Dare')}
                    className="theme-button theme-button-alt p-8 text-4xl font-black italic"
                >
                    DARE
                </button>
                <button
                    onClick={() => setIntensity(null)}
                    className="mt-4 theme-text-header text-[10px] opacity-40 hover:opacity-100 transition-opacity"
                >
                    [ ABORT MISSION ]
                </button>
            </div>
        </div>
    );

    const DefaultPromptDisplay = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="theme-panel p-6 sm:p-8 mt-4"
        >
            <div className="flex justify-between items-center mb-6">
                <span className="theme-badge px-3 py-1 font-bold italic">{prompt?.type}</span>
                <span className="theme-text-header text-[10px] opacity-40 italic">ENTRY_{history.length}</span>
            </div>
            <p className="theme-text-prompt text-2xl sm:text-3xl leading-tight mb-8">
                "{prompt?.text}"
            </p>
            <div className="theme-penalty-box p-4 border-t-2 border-dashed border-black/20">
                <p className="theme-text-header text-xs text-[var(--theme-accent)] mb-1">PENALTY</p>
                <p className="text-sm italic opacity-80">{prompt?.penalty}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
                <button onClick={() => setPrompt(null)} className="theme-button p-4 text-xl">DONE</button>
                <button onClick={() => handleDraw(prompt!.type)} className="theme-button theme-button-alt p-4 text-xl">REROLL</button>
            </div>
        </motion.div>
    );

    return (
        <AnimatePresence mode="wait">
            {activeTab === 'play' && (
                <motion.div
                    key="play"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="h-full"
                >
                    {themeDef.PlayScreen ? (
                        <themeDef.PlayScreen logic={logic} />
                    ) : (
                        <>
                            {!intensity && !prompt ? (
                                themeDef.IntensitySelector ? <themeDef.IntensitySelector logic={logic} /> : <DefaultIntensitySelector />
                            ) : !prompt ? (
                                themeDef.PromptTypeSelector ? <themeDef.PromptTypeSelector logic={logic} /> : <DefaultPromptTypeSelector />
                            ) : (
                                themeDef.PromptDisplay ? <themeDef.PromptDisplay logic={logic} /> : <DefaultPromptDisplay />
                            )}
                        </>
                    )}
                </motion.div>
            )}

            {activeTab === 'decks' && (
                <motion.div
                    key="decks"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-4 space-y-6 pb-32"
                >
                    {themeDef.DecksScreen ? (
                        <themeDef.DecksScreen logic={logic} />
                    ) : (
                        !editingDeck ? (
                            <>
                                <div className="flex justify-between items-end mb-6">
                                    <h2 className="theme-text-header text-4xl font-bold italic">DECKS</h2>
                                    <button
                                        onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })}
                                        className="theme-button px-4 py-1 text-sm italic"
                                    >
                                        + NEW
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    {customDecks.length === 0 ? (
                                        <div className="py-20 text-center opacity-20 italic">No custom decks forged yet.</div>
                                    ) : (
                                        customDecks.map(deck => (
                                            <div key={deck.id} className="theme-panel p-4 flex justify-between items-center group">
                                                <div>
                                                    <h3 className="theme-text-header text-xl group-hover:text-[var(--theme-accent)] transition-colors">{deck.name || 'UNTITLED'}</h3>
                                                    <p className="text-[10px] opacity-60 uppercase tracking-widest">{deck.prompts.length} CARDS</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => setEditingDeck(deck)} className="theme-button px-3 py-1 text-[10px]">EDIT</button>
                                                    <button onClick={() => deleteDeck(deck.id)} className="theme-button theme-button-alt px-3 py-1 text-[10px]">DEL</button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="theme-panel p-6 space-y-6">
                                <div className="space-y-4">
                                    <label className="theme-text-header text-[10px] block opacity-60">DECK TITLE</label>
                                    <input
                                        className="w-full bg-transparent border-b-2 border-black/20 font-bold text-2xl focus:outline-none focus:border-[var(--theme-accent)] py-2"
                                        value={editingDeck.name}
                                        onChange={(e) => setEditingDeck({ ...editingDeck, name: e.target.value })}
                                        placeholder="DECK NAME..."
                                    />
                                    <label className="theme-text-header text-[10px] block opacity-60">DESCRIPTION</label>
                                    <textarea
                                        className="w-full bg-black/5 p-3 text-xs focus:outline-none border-2 border-transparent focus:border-[var(--theme-accent)] h-20"
                                        value={editingDeck.description}
                                        onChange={(e) => setEditingDeck({ ...editingDeck, description: e.target.value })}
                                        placeholder="WHAT IS THIS DECK'S PURPOSE?"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="theme-text-header text-xl">PROMPTS ({editingDeck.prompts.length})</h3>
                                        <button onClick={addNewPromptToEditingDeck} className="theme-button px-3 py-1 text-xs">+ ADD</button>
                                    </div>
                                    <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                        {editingDeck.prompts.map((p) => (
                                            <div key={p.id} className="p-3 bg-black/5 border-l-4 border-[var(--theme-accent)] space-y-2">
                                                <div className="flex gap-2">
                                                    <select
                                                        className="bg-black text-white text-[10px] p-1 uppercase"
                                                        value={p.type}
                                                        onChange={(e) => updatePromptInEditingDeck(p.id, 'type', e.target.value)}
                                                    >
                                                        <option>Truth</option>
                                                        <option>Dare</option>
                                                    </select>
                                                    <select
                                                        className="bg-black text-white text-[10px] p-1 uppercase"
                                                        value={p.intensity}
                                                        onChange={(e) => updatePromptInEditingDeck(p.id, 'intensity', e.target.value)}
                                                    >
                                                        <option value={Intensity.SOFT}>SOFT</option>
                                                        <option value={Intensity.HOT}>HOT</option>
                                                        <option value={Intensity.VULGAR}>VULGAR</option>
                                                    </select>
                                                    <button onClick={() => removePromptFromEditingDeck(p.id)} className="ml-auto text-red-500 font-bold">×</button>
                                                </div>
                                                <input
                                                    className="w-full bg-transparent text-sm border-b border-black/10 focus:outline-none"
                                                    value={p.text}
                                                    onChange={(e) => updatePromptInEditingDeck(p.id, 'text', e.target.value)}
                                                    placeholder="PROMPT TEXT..."
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button onClick={() => setEditingDeck(null)} className="theme-button flex-1 p-3">CANCEL</button>
                                    <button onClick={() => saveDeck(editingDeck)} className="theme-button flex-1 p-3 bg-black text-white">SAVE</button>
                                </div>
                            </div>
                        )
                    )}
                </motion.div>
            )}

            {activeTab === 'history' && (
                <motion.div
                    key="history"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pt-4 space-y-6 pb-20"
                >
                    {themeDef.HistoryScreen ? (
                        <themeDef.HistoryScreen logic={logic} />
                    ) : (
                        <>
                            <h2 className="theme-text-header text-4xl font-bold italic">ARCHIVES</h2>
                            <div className="flex flex-col gap-3">
                                {history.length === 0 ? (
                                    <div className="py-20 text-center opacity-20 italic">No history yet.</div>
                                ) : (
                                    history.map((item, i) => (
                                        <div key={i} className="theme-panel p-4 flex gap-4 items-start">
                                            <div className="w-10 h-10 theme-badge shrink-0 flex items-center justify-center text-lg">
                                                {item.type === 'Truth' ? '?' : '!'}
                                            </div>
                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="theme-text-header text-[10px] text-[var(--theme-accent)]">ENTRY #{history.length - i}</span>
                                                    <span className="text-[10px] opacity-40 uppercase">{item.intensity}</span>
                                                </div>
                                                <p className="italic font-bold leading-tight">"{item.text}"</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </motion.div>
            )}

            {activeTab === 'settings' && (
                <motion.div
                    key="settings"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pt-4 space-y-6 pb-20"
                >
                    {themeDef.SettingsScreen ? (
                        <themeDef.SettingsScreen logic={logic} />
                    ) : (
                        <>
                            <h2 className="theme-text-header text-4xl font-bold italic">SETTINGS</h2>
                            <div className="theme-panel p-6 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="theme-text-header">COGNITION</span>
                                        <span className="font-bold text-[var(--theme-accent)]">STABLE</span>
                                    </div>
                                    <div className="flex justify-between items-center opacity-40">
                                        <span className="theme-text-header">SYNC_RATE</span>
                                        <span className="font-mono">99.8%</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => logic.setView('menu')}
                                    className="w-full theme-button theme-button-alt p-4 font-bold"
                                >
                                    RETURN TO TITLE
                                </button>
                            </div>
                        </>
                    )}
                </motion.div>
            )}

            {activeTab === 'themes' && (
                <motion.div
                    key="themes"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pt-4 space-y-6 pb-20"
                >
                    {themeDef.ThemesScreen ? (
                        <themeDef.ThemesScreen logic={logic} />
                    ) : null}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default UnifiedGame;
