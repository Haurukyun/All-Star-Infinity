import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameLogic } from '../hooks/useGameLogic';
import { Intensity, GameMode, TimerDuration, CustomDeck } from '../types';
import { getThemeDefinition } from '../themes';
import { CountdownTimer } from './CountdownTimer';
import { PlayerTurnBanner } from './PlayerTurnBanner';
import { DeckShareModal } from './DeckShareModal';
import { hapticService } from '../services/haptics';

interface UnifiedGameProps {
    logic: ReturnType<typeof useGameLogic>;
}

const UnifiedGame: React.FC<UnifiedGameProps> = ({ logic }) => {
    const {
        activeTab, setActiveTab,
        gameMode, setGameMode,
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
        generateId,
        // Themed prebuilt decks
        themedPrebuiltDecks,
        cloneThemedDeck,
        importCustomDeck,
        // Pass & Play Roster
        players,
        playersEnabled, setPlayersEnabled,
        activePlayer, targetPlayer,
        nextPlayer, prevPlayer,
        incrementChicken,
        addPlayer, removePlayer, resetRosterScores,
        // Countdown Timer
        timerEnabled,
        timerDuration, setTimerDuration,
        toggleTimerEnabled,
        // Easy Font & Haptics
        useEasyFont, toggleEasyFont,
        hapticsEnabled, toggleHapticsEnabled,
        setView,
    } = logic;

    // Deck Sub-tab state
    const [deckSubTab, setDeckSubTab] = useState<'custom' | 'themed'>('custom');

    // Deck Share Modal state
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [shareModalMode, setShareModalMode] = useState<'export' | 'import'>('export');
    const [deckToShare, setDeckToShare] = useState<CustomDeck | null>(null);

    useEffect(() => {
        if (gameMode === GameMode.NEVER_HAVE_I_EVER && intensity && !prompt) {
            handleDraw('NeverHaveIEver');
        }
    }, [gameMode, intensity, prompt, handleDraw]);

    const themeDef = getThemeDefinition(theme);

    const handleOpenExport = (deck: CustomDeck) => {
        hapticService.light();
        setDeckToShare(deck);
        setShareModalMode('export');
        setIsShareModalOpen(true);
    };

    const handleOpenImport = () => {
        hapticService.light();
        setShareModalMode('import');
        setIsShareModalOpen(true);
    };

    const handlePlayThemedDeck = (deck: CustomDeck) => {
        hapticService.medium();
        setActiveDeckId(deck.id);
        setGameMode(deck.gameMode);
        setIntensity(deck.intensity);
        setActiveTab('play');
    };

    // Default Views if Theme doesn't provide them
    const DefaultIntensitySelector = () => {
        const activeDeck = customDecks.find(d => d.id === activeDeckId) || themedPrebuiltDecks.find(d => d.id === activeDeckId);

        return (
            <div className="space-y-6 pt-4">
                <h2 className="theme-text-header text-4xl font-bold italic mb-6">INTENSITY</h2>
                <div className="grid grid-cols-1 gap-4">
                    {Object.values(Intensity).map((i) => (
                        <button
                            key={i}
                            onClick={() => {
                                hapticService.light();
                                setIntensity(i);
                            }}
                            className="theme-button p-6 text-2xl font-black italic tracking-widest uppercase hover:scale-105"
                        >
                            {i}
                        </button>
                    ))}
                </div>
                <div className="mt-8 space-y-3">
                    <p className="theme-text-header text-sm opacity-50 uppercase tracking-widest">Active Deck</p>
                    <button
                        onClick={() => {
                            hapticService.light();
                            setActiveDeckId('default');
                        }}
                        className={`w-full p-4 theme-button justify-start text-sm ${activeDeckId === 'default' ? 'bg-white text-black' : 'opacity-60'}`}
                    >
                        PHANTOM DEFAULT POOL
                    </button>
                    {activeDeck && activeDeckId !== 'default' && (
                        <button
                            className="w-full p-4 theme-button justify-start text-sm bg-white text-black font-black"
                        >
                            ⭐ {activeDeck.name.toUpperCase()} ({activeDeck.prompts.length} CARDS)
                        </button>
                    )}
                </div>
            </div>
        );
    };

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
                    onClick={() => {
                        hapticService.light();
                        setIntensity(null);
                    }}
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
            {playersEnabled && activePlayer && (
                <div className="flex justify-between items-center pb-3 mb-3 border-b border-black/10">
                    <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black uppercase tracking-wider text-[var(--theme-accent,#d90429)]">
                            🎮 {activePlayer.name}'s Turn
                        </span>
                    </div>
                    {targetPlayer && (
                        <span className="text-[11px] font-bold opacity-75">
                            🎯 Target: {targetPlayer.name}
                        </span>
                    )}
                </div>
            )}
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
                {gameMode === GameMode.NEVER_HAVE_I_EVER ? (
                    <>
                        <button
                            onClick={() => {
                                if (playersEnabled) nextPlayer();
                                setIntensity(null);
                                setPrompt(null);
                            }}
                            className="theme-button p-4 text-xl"
                        >
                            DONE
                        </button>
                        <button
                            onClick={() => {
                                if (playersEnabled) nextPlayer();
                                handleDraw('NeverHaveIEver');
                            }}
                            className="theme-button theme-button-alt p-4 text-xl"
                        >
                            NEXT
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => {
                                if (playersEnabled) nextPlayer();
                                setPrompt(null);
                            }}
                            className="theme-button p-4 text-xl"
                        >
                            DONE
                        </button>
                        <button onClick={() => handleDraw(prompt!.type)} className="theme-button theme-button-alt p-4 text-xl">
                            REROLL
                        </button>
                    </>
                )}
            </div>
            {playersEnabled && activePlayer && (
                <div className="mt-4 pt-3 border-t border-black/10 flex justify-center">
                    <button
                        onClick={() => incrementChicken(activePlayer.id)}
                        className="text-xs font-bold opacity-70 hover:opacity-100 transition-opacity uppercase tracking-wider text-amber-500"
                    >
                        🐔 Chickened Out (+1 Chicken)
                    </button>
                </div>
            )}
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
                    className="h-full flex flex-col"
                >
                    {/* Universal Top Bar for Play screen: Quick Player Pill & Countdown Timer */}
                    <div className="flex flex-col gap-2 mb-2 shrink-0">
                        <div className="flex justify-between items-center gap-2">
                            {playersEnabled && activePlayer ? (
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/20 text-white text-xs font-bold">
                                    <span>🎮</span>
                                    <span className="text-red-400 font-black">{activePlayer.name}'s Turn</span>
                                </div>
                            ) : <div />}

                            <CountdownTimer
                                enabled={timerEnabled}
                                duration={timerDuration}
                                onToggleEnabled={toggleTimerEnabled}
                                onChangeDuration={setTimerDuration}
                                promptId={prompt?.id}
                                isPromptActive={!!prompt}
                            />
                        </div>

                        {/* Pass & Play Roster Turn Banner (when active) */}
                        {playersEnabled && players.length > 0 && (
                            <PlayerTurnBanner
                                players={players}
                                activePlayer={activePlayer}
                                targetPlayer={targetPlayer}
                                onNextPlayer={nextPlayer}
                                onPrevPlayer={prevPlayer}
                                onIncrementChicken={incrementChicken}
                                onAddPlayer={addPlayer}
                                onRemovePlayer={removePlayer}
                            />
                        )}
                    </div>

                    {themeDef.PlayScreen ? (
                        <themeDef.PlayScreen logic={logic} />
                    ) : (
                        <>
                            {!intensity && !prompt ? (
                                themeDef.IntensitySelector ? <themeDef.IntensitySelector logic={logic} /> : <DefaultIntensitySelector />
                            ) : !prompt ? (
                                gameMode === GameMode.NEVER_HAVE_I_EVER ? null : (
                                    themeDef.PromptTypeSelector ? <themeDef.PromptTypeSelector logic={logic} /> : <DefaultPromptTypeSelector />
                                )
                            ) : (
                                themeDef.PromptLayout && themeDef.PlayButton ? (
                                    <themeDef.PromptLayout logic={logic}>
                                        {gameMode === GameMode.NEVER_HAVE_I_EVER ? (
                                            <>
                                                <themeDef.PlayButton
                                                    label="DONE"
                                                    onClick={() => {
                                                        if (playersEnabled) nextPlayer();
                                                        setIntensity(null);
                                                        setPrompt(null);
                                                    }}
                                                    isPrimary={true}
                                                />
                                                <themeDef.PlayButton
                                                    label="NEXT"
                                                    onClick={() => {
                                                        if (playersEnabled) nextPlayer();
                                                        handleDraw('NeverHaveIEver');
                                                    }}
                                                    isPrimary={false}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <themeDef.PlayButton
                                                    label="DONE"
                                                    onClick={() => {
                                                        if (playersEnabled) nextPlayer();
                                                        setPrompt(null);
                                                    }}
                                                    isPrimary={true}
                                                />
                                                <themeDef.PlayButton label="REROLL" onClick={() => handleDraw(prompt!.type)} isPrimary={false} />
                                            </>
                                        )}
                                    </themeDef.PromptLayout>
                                ) : themeDef.PromptDisplay ? (
                                    <themeDef.PromptDisplay logic={logic} />
                                ) : (
                                    <DefaultPromptDisplay />
                                )
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
                    className="pt-4 space-y-5 pb-32"
                >
                    {editingDeck ? (
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
                                                    onChange={(e) => updatePromptInEditingDeck(p.id, 'type', e.target.value as any)}
                                                >
                                                    <option value="Truth">Truth</option>
                                                    <option value="Dare">Dare</option>
                                                    <option value="NeverHaveIEver">Never</option>
                                                </select>
                                                <select
                                                    className="bg-black text-white text-[10px] p-1 uppercase"
                                                    value={p.intensity}
                                                    onChange={(e) => updatePromptInEditingDeck(p.id, 'intensity', e.target.value as any)}
                                                >
                                                    {Object.values(Intensity).map(i => <option key={i} value={i}>{i}</option>)}
                                                </select>
                                                <div className="flex-1" />
                                                <button onClick={() => removePromptFromEditingDeck(p.id)} className="text-red-500 font-bold text-[10px]">REMOVE</button>
                                            </div>
                                            <textarea
                                                className="w-full bg-white/10 p-2 text-xs focus:outline-none"
                                                value={p.text}
                                                onChange={(e) => updatePromptInEditingDeck(p.id, 'text', e.target.value)}
                                                placeholder="PROMPT TEXT..."
                                            />
                                            <input
                                                className="w-full bg-white/5 p-1 text-[10px] italic border-b border-black/10 focus:outline-none"
                                                value={p.penalty || ''}
                                                onChange={(e) => updatePromptInEditingDeck(p.id, 'penalty', e.target.value)}
                                                placeholder="PENALTY (OPTIONAL)..."
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-black/10">
                                <button
                                    onClick={() => saveDeck(editingDeck)}
                                    className="flex-1 theme-button py-3 font-bold"
                                >
                                    SAVE ARCHIVE
                                </button>
                                <button
                                    onClick={() => setEditingDeck(null)}
                                    className="flex-1 theme-button theme-button-alt py-3 font-bold opacity-60"
                                >
                                    CANCEL
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Decks Sub-navigation Switcher */}
                            <div className="flex justify-between items-center gap-2">
                                <div className="flex p-1 bg-black/20 rounded-xl border border-black/10">
                                    <button
                                        onClick={() => {
                                            hapticService.light();
                                            setDeckSubTab('custom');
                                        }}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all ${
                                            deckSubTab === 'custom'
                                                ? 'bg-white text-black shadow-sm'
                                                : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
                                        }`}
                                    >
                                        My Decks ({customDecks.length})
                                    </button>
                                    <button
                                        onClick={() => {
                                            hapticService.light();
                                            setDeckSubTab('themed');
                                        }}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all ${
                                            deckSubTab === 'themed'
                                                ? 'bg-white text-black shadow-sm'
                                                : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
                                        }`}
                                    >
                                        ⭐ Themed Packs ({themedPrebuiltDecks.length})
                                    </button>
                                </div>

                                <div className="flex gap-1.5">
                                    <button
                                        onClick={handleOpenImport}
                                        title="Import Deck via QR / Short Code"
                                        className="theme-button px-3 py-1.5 text-xs font-bold"
                                    >
                                        📥 IMPORT
                                    </button>
                                    {deckSubTab === 'custom' && (
                                        <button
                                            onClick={() => {
                                                hapticService.light();
                                                setEditingDeck({
                                                    id: generateId(),
                                                    name: '',
                                                    description: '',
                                                    prompts: [],
                                                    isCustom: true,
                                                    intensity: intensity || Intensity.SOFT,
                                                    gameMode: gameMode || GameMode.TRUTH_OR_DARE
                                                });
                                            }}
                                            className="theme-button px-3 py-1.5 text-xs font-bold"
                                        >
                                            + NEW
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* My Custom Decks View */}
                            {deckSubTab === 'custom' && (
                                <div className="grid grid-cols-1 gap-3">
                                    {customDecks.length === 0 ? (
                                        <div className="py-16 text-center space-y-3 bg-black/5 rounded-2xl border border-dashed border-black/10 p-6">
                                            <p className="text-sm opacity-50 italic">No custom decks forged yet.</p>
                                            <div className="flex justify-center gap-3">
                                                <button
                                                    onClick={() => setDeckSubTab('themed')}
                                                    className="theme-button px-4 py-2 text-xs font-bold"
                                                >
                                                    Browse 10 Themed Packs
                                                </button>
                                                <button
                                                    onClick={handleOpenImport}
                                                    className="theme-button theme-button-alt px-4 py-2 text-xs font-bold"
                                                >
                                                    Import Deck Code / QR
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        customDecks.map(deck => {
                                            const isActive = activeDeckId === deck.id;
                                            return (
                                                <div
                                                    key={deck.id}
                                                    className={`theme-panel p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-all ${
                                                        isActive ? 'ring-2 ring-red-500 shadow-md' : ''
                                                    }`}
                                                >
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="theme-text-header text-lg">{deck.name || 'UNTITLED DECK'}</h3>
                                                            {isActive && (
                                                                <span className="px-2 py-0.5 rounded text-[9px] bg-red-600 text-white font-black uppercase tracking-wider">
                                                                    Active
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-[10px] opacity-60 uppercase tracking-widest">
                                                            {deck.prompts.length} CARDS • {deck.gameMode} • {deck.intensity}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
                                                        <button
                                                            onClick={() => setActiveDeckId(isActive ? 'default' : deck.id)}
                                                            className={`theme-button px-3 py-1.5 text-xs font-bold ${
                                                                isActive ? 'bg-red-600 text-white' : ''
                                                            }`}
                                                        >
                                                            {isActive ? 'ACTIVE' : 'SELECT'}
                                                        </button>
                                                        <button
                                                            onClick={() => handleOpenExport(deck)}
                                                            title="Share deck via QR code / Short Code"
                                                            className="theme-button theme-button-alt px-2.5 py-1.5 text-xs font-bold"
                                                        >
                                                            📤
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingDeck(deck)}
                                                            className="theme-button px-2.5 py-1.5 text-xs font-bold"
                                                        >
                                                            EDIT
                                                        </button>
                                                        <button
                                                            onClick={() => deleteDeck(deck.id)}
                                                            className="theme-button theme-button-alt px-2 py-1.5 text-xs font-bold text-red-500"
                                                        >
                                                            DEL
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            )}

                            {/* Curated Themed Packs View */}
                            {deckSubTab === 'themed' && (
                                <div className="space-y-3">
                                    <p className="text-xs opacity-60 italic">
                                        Handcrafted expansions tailored to each realm's authentic lore, rules, and aesthetic.
                                    </p>
                                    <div className="grid grid-cols-1 gap-3">
                                        {themedPrebuiltDecks.map(pack => {
                                            const isActive = activeDeckId === pack.id;
                                            return (
                                                <div
                                                    key={pack.id}
                                                    className={`theme-panel p-4 space-y-3 transition-all ${
                                                        isActive ? 'ring-2 ring-red-500 shadow-md' : ''
                                                    }`}
                                                >
                                                    <div className="flex justify-between items-start gap-2">
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <h3 className="theme-text-header text-lg">{pack.name}</h3>
                                                                {isActive && (
                                                                    <span className="px-2 py-0.5 rounded text-[9px] bg-red-600 text-white font-black uppercase tracking-wider">
                                                                        Active
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-xs opacity-75 mt-0.5">"{pack.description}"</p>
                                                        </div>
                                                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-red-600 text-white shrink-0">
                                                            {pack.intensity}
                                                        </span>
                                                    </div>

                                                    <div className="flex justify-between items-center pt-2 border-t border-black/10 text-xs">
                                                        <span className="opacity-60 text-[10px] uppercase font-bold tracking-wider">
                                                            🎴 {pack.prompts.length} CARDS • {pack.gameMode}
                                                        </span>

                                                        <div className="flex items-center gap-1.5">
                                                            <button
                                                                onClick={() => handlePlayThemedDeck(pack)}
                                                                className="theme-button px-3 py-1.5 text-xs font-black"
                                                            >
                                                                ▶ PLAY NOW
                                                            </button>
                                                            <button
                                                                onClick={() => cloneThemedDeck(pack.id)}
                                                                title="Clone an editable copy to My Decks"
                                                                className="theme-button theme-button-alt px-2.5 py-1.5 text-xs font-bold"
                                                            >
                                                                📋 CLONE
                                                            </button>
                                                            <button
                                                                onClick={() => handleOpenExport(pack)}
                                                                title="Share this themed pack via QR code"
                                                                className="theme-button theme-button-alt px-2.5 py-1.5 text-xs font-bold"
                                                            >
                                                                📤
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </>
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
                    {/* Gameplay Controls Panel (Always visible across all themes) */}
                    <div className="theme-panel p-5 space-y-4">
                        <h3 className="theme-text-header text-xl font-bold italic border-b border-black/10 pb-2">
                            GAMEPLAY OPTIONS
                        </h3>

                        {/* Easy Font Mode Toggle */}
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="font-bold text-sm">🔤 EASY FONT MODE</div>
                                <div className="text-[10px] opacity-60">High-legibility typography across all 19 realms</div>
                            </div>
                            <button
                                onClick={toggleEasyFont}
                                className={`px-4 py-1.5 rounded-full text-xs font-black uppercase transition-all ${
                                    useEasyFont
                                        ? 'bg-red-600 text-white shadow-md'
                                        : 'bg-black/20 text-black/60 dark:text-white/40'
                                }`}
                            >
                                {useEasyFont ? 'ON' : 'OFF'}
                            </button>
                        </div>

                        {/* Native Haptic Feedback Toggle */}
                        <div className="flex justify-between items-center pt-2 border-t border-black/10">
                            <div>
                                <div className="font-bold text-sm">📳 HAPTIC FEEDBACK</div>
                                <div className="text-[10px] opacity-60">Tactile vibrations on draws, timers & penalties</div>
                            </div>
                            <button
                                onClick={() => {
                                    toggleHapticsEnabled();
                                    if (!hapticsEnabled) hapticService.light();
                                }}
                                className={`px-4 py-1.5 rounded-full text-xs font-black uppercase transition-all ${
                                    hapticsEnabled
                                        ? 'bg-red-600 text-white shadow-md'
                                        : 'bg-black/20 text-black/60 dark:text-white/40'
                                }`}
                            >
                                {hapticsEnabled ? 'ON' : 'OFF'}
                            </button>
                        </div>

                        {/* Countdown Timer Setting */}
                        <div className="space-y-3 pt-2 border-t border-black/10">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="font-bold text-sm">⏱️ COUNTDOWN TIMER</div>
                                    <div className="text-[10px] opacity-60">Timer for answering or completing prompts</div>
                                </div>
                                <button
                                    onClick={toggleTimerEnabled}
                                    className={`px-4 py-1.5 rounded-full text-xs font-black uppercase transition-all ${
                                        timerEnabled
                                            ? 'bg-red-600 text-white shadow-md'
                                            : 'bg-black/20 text-black/60 dark:text-white/40'
                                    }`}
                                >
                                    {timerEnabled ? 'ON' : 'OFF'}
                                </button>
                            </div>

                            {timerEnabled && (
                                <div className="flex items-center justify-between pt-1 text-xs">
                                    <span className="opacity-60 text-[10px] uppercase font-semibold">Timer Duration:</span>
                                    <div className="flex gap-1.5">
                                        {([15, 30, 60] as TimerDuration[]).map((d) => (
                                            <button
                                                key={d}
                                                onClick={() => {
                                                    hapticService.light();
                                                    setTimerDuration(d);
                                                }}
                                                className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                                                    timerDuration === d
                                                        ? 'bg-red-600 text-white shadow'
                                                        : 'bg-black/10 hover:bg-black/20 opacity-70'
                                                }`}
                                            >
                                                {d}s
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Pass & Play Roster Setting */}
                        <div className="space-y-3 pt-2 border-t border-black/10">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="font-bold text-sm">👥 PASS & PLAY ROSTER</div>
                                    <div className="text-[10px] opacity-60">Turn tracker & chicken counter ({players.length} players)</div>
                                </div>
                                <button
                                    onClick={() => {
                                        hapticService.light();
                                        setPlayersEnabled(!playersEnabled);
                                    }}
                                    className={`px-4 py-1.5 rounded-full text-xs font-black uppercase transition-all ${
                                        playersEnabled
                                            ? 'bg-red-600 text-white shadow-md'
                                            : 'bg-black/20 text-black/60 dark:text-white/40'
                                    }`}
                                >
                                    {playersEnabled ? 'ON' : 'OFF'}
                                </button>
                            </div>

                            {playersEnabled && (
                                <div className="flex gap-2 pt-1">
                                    <button
                                        onClick={() => {
                                            hapticService.light();
                                            setView('player-setup');
                                        }}
                                        className="flex-1 theme-button py-2 text-xs font-bold"
                                    >
                                        MANAGE ROSTER ({players.length})
                                    </button>
                                    <button
                                        onClick={resetRosterScores}
                                        title="Reset all chicken counts to 0"
                                        className="theme-button theme-button-alt px-3 py-2 text-xs font-bold opacity-75 hover:opacity-100"
                                    >
                                        RESET STATS
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {themeDef.SettingsScreen ? (
                        <themeDef.SettingsScreen logic={logic} />
                    ) : (
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

            {/* Deck Export / Import QR Code Modal */}
            <DeckShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                mode={shareModalMode}
                deckToExport={deckToShare}
                onImportSuccess={importCustomDeck}
            />
        </AnimatePresence>
    );
};

export default UnifiedGame;
