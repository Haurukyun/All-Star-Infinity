import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameLogic } from '../hooks/useGameLogic';
import { Intensity, GameMode, TimerDuration, CustomDeck, Theme } from '../types';
import { getThemeDefinition } from '../themes';
import { CountdownTimer } from './CountdownTimer';
import { ThemedMinigameChooser } from './ThemedMinigameChooser';
import { PlayerTurnBanner } from './PlayerTurnBanner';
import { DeckShareModal } from './DeckShareModal';
import { hapticService } from '../services/haptics';
import { soundService } from '../services/soundFx';

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
        history, clearHistory,
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
        incrementChicken, incrementScore, resetRosterScores,
        addPlayer, removePlayer,
        // Countdown Timer
        timerEnabled,
        timerDuration, setTimerDuration,
        toggleTimerEnabled,
        // Easy Font, Haptics & Sound FX
        useEasyFont, toggleEasyFont,
        hapticsEnabled, toggleHapticsEnabled,
        soundEnabled, toggleSoundEnabled,
        setView,
    } = logic;

    // Deck Sub-tab state
    const [deckSubTab, setDeckSubTab] = useState<'custom' | 'themed'>('custom');

    // Deck Share Modal state
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [shareModalMode, setShareModalMode] = useState<'export' | 'import'>('export');
    const [deckToShare, setDeckToShare] = useState<CustomDeck | null>(null);

    // Themed Minigame Chooser Modal state
    const [isMinigameChooserOpen, setIsMinigameChooserOpen] = useState(false);

    // Most Likely To Countdown state
    const [pointCountdown, setPointCountdown] = useState<number | string | null>(null);

    // Would You Rather Selected Option
    const [selectedWyrOption, setSelectedWyrOption] = useState<'A' | 'B' | null>(null);

    // Hot Seat 60s Speedrun state
    const [hotSeatTimeLeft, setHotSeatTimeLeft] = useState<number>(60);
    const [isHotSeatRunning, setIsHotSeatRunning] = useState<boolean>(false);
    const [hotSeatAnswered, setHotSeatAnswered] = useState<number>(0);
    const [hotSeatPassed, setHotSeatPassed] = useState<number>(0);
    const [isHotSeatFinished, setIsHotSeatFinished] = useState<boolean>(false);

    // Auto-draw prompts for single-action modes when intensity is chosen
    useEffect(() => {
        if (intensity && !prompt) {
            if (gameMode === GameMode.NEVER_HAVE_I_EVER) {
                handleDraw('NeverHaveIEver');
            } else if (gameMode === GameMode.MOST_LIKELY_TO) {
                handleDraw('MostLikelyTo');
            } else if (gameMode === GameMode.WOULD_YOU_RATHER) {
                handleDraw('WouldYouRather');
            } else if (gameMode === GameMode.HOT_SEAT) {
                handleDraw('HotSeat');
            }
        }
    }, [gameMode, intensity, prompt, handleDraw]);

    // Reset prompt-specific interaction states when prompt changes
    useEffect(() => {
        setSelectedWyrOption(null);
        setPointCountdown(null);
    }, [prompt?.id]);

    // Hot Seat 60s interval
    useEffect(() => {
        if (gameMode !== GameMode.HOT_SEAT || !isHotSeatRunning || hotSeatTimeLeft <= 0) {
            return;
        }

        const interval = setInterval(() => {
            setHotSeatTimeLeft((prev) => {
                if (prev <= 1) {
                    setIsHotSeatRunning(false);
                    setIsHotSeatFinished(true);
                    hapticService.error();
                    soundService.buzzer();
                    return 0;
                }
                if (prev <= 5) {
                    hapticService.warning();
                    soundService.countdownStep(1.2);
                } else {
                    soundService.tick();
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [gameMode, isHotSeatRunning, hotSeatTimeLeft]);

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

    const triggerPointCountdown = () => {
        hapticService.light();
        soundService.countdownStep(0.9);
        setPointCountdown(3);
        setTimeout(() => {
            hapticService.light();
            soundService.countdownStep(1.1);
            setPointCountdown(2);
            setTimeout(() => {
                hapticService.light();
                soundService.countdownStep(1.3);
                setPointCountdown(1);
                setTimeout(() => {
                    hapticService.heavy();
                    soundService.buzzer();
                    setPointCountdown('POINT! 👉');
                }, 750);
            }, 750);
        }, 750);
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

    // ==========================================
    // 🗳️ MOST LIKELY TO DISPLAY
    // ==========================================
    const MostLikelyToDisplay = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="theme-panel p-6 sm:p-8 mt-4 space-y-6"
        >
            <div className="flex justify-between items-center">
                <span className="theme-badge px-3 py-1 font-bold italic">🗳️ MOST LIKELY TO</span>
                <span className="theme-text-header text-[10px] opacity-40 italic">ENTRY_{history.length}</span>
            </div>

            <p className="theme-text-prompt text-2xl sm:text-3xl leading-tight font-black">
                "{prompt?.text}"
            </p>

            {/* Point Countdown Interactive Button */}
            <div className="py-2 flex flex-col items-center justify-center">
                {pointCountdown === null ? (
                    <button
                        onClick={triggerPointCountdown}
                        className="theme-button p-4 text-base font-black w-full uppercase tracking-wider"
                    >
                        👉 3, 2, 1... TAP TO POINT!
                    </button>
                ) : (
                    <motion.div
                        key={String(pointCountdown)}
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: [1, 1.15, 1], opacity: 1 }}
                        className="p-5 text-center font-black text-3xl sm:text-4xl text-[var(--theme-accent,#ef4444)] uppercase tracking-wider"
                    >
                        {pointCountdown}
                    </motion.div>
                )}
            </div>

            {/* Quick Player Target / Voter (Pass & Play) */}
            {playersEnabled && players.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-black/10">
                    <p className="text-[10px] uppercase font-bold opacity-60">Who got the most points?</p>
                    <div className="flex flex-wrap gap-2">
                        {players.map((p) => (
                            <button
                                key={p.id}
                                onClick={() => {
                                    incrementChicken(p.id);
                                    hapticService.heavy();
                                }}
                                className="px-3 py-1.5 rounded-full text-xs font-bold bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 transition-all active:scale-95 flex items-center gap-1.5"
                            >
                                <span>{p.name}</span>
                                <span className="opacity-50 text-[10px]">🐔 {p.chickenCount}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="theme-penalty-box p-4 border-t-2 border-dashed border-black/20">
                <p className="theme-text-header text-xs text-[var(--theme-accent)] mb-1">PENALTY FOR MOST VOTES</p>
                <p className="text-sm italic opacity-80">{prompt?.penalty}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
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
                        handleDraw('MostLikelyTo');
                    }}
                    className="theme-button theme-button-alt p-4 text-xl"
                >
                    NEXT
                </button>
            </div>
        </motion.div>
    );

    // ==========================================
    // ⚖️ WOULD YOU RATHER DISPLAY
    // ==========================================
    const WouldYouRatherDisplay = () => {
        const parts = prompt?.text.split('||') || [];
        const optionA = parts[0]?.trim() || prompt?.text || '';
        const optionB = parts[1]?.trim() || 'Do the penalty instead.';

        const handleSelectOption = (opt: 'A' | 'B') => {
            hapticService.medium();
            soundService.click();
            setSelectedWyrOption(opt);
        };

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="theme-panel p-6 sm:p-8 mt-4 space-y-6"
            >
                <div className="flex justify-between items-center">
                    <span className="theme-badge px-3 py-1 font-bold italic">⚖️ WOULD YOU RATHER</span>
                    <span className="theme-text-header text-[10px] opacity-40 italic">ENTRY_{history.length}</span>
                </div>

                {/* 2 Interactive Choice Cards */}
                <div className="grid grid-cols-1 gap-3.5">
                    {/* Option A */}
                    <motion.div
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectOption('A')}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedWyrOption === 'A'
                                ? 'bg-red-600 text-white border-red-400 shadow-lg scale-[1.02]'
                                : 'bg-black/5 dark:bg-white/5 border-black/20 dark:border-white/20 hover:border-red-500'
                        }`}
                    >
                        <div className="flex justify-between items-center mb-1.5">
                            <span className="text-xs font-black uppercase tracking-wider opacity-60">OPTION A</span>
                            {selectedWyrOption === 'A' && <span className="text-sm">✓ YOUR VOTE</span>}
                        </div>
                        <p className="text-lg sm:text-xl font-bold leading-snug">{optionA}</p>
                    </motion.div>

                    <div className="text-center font-black italic text-xs opacity-50 uppercase tracking-widest">— OR —</div>

                    {/* Option B */}
                    <motion.div
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectOption('B')}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedWyrOption === 'B'
                                ? 'bg-red-600 text-white border-red-400 shadow-lg scale-[1.02]'
                                : 'bg-black/5 dark:bg-white/5 border-black/20 dark:border-white/20 hover:border-red-500'
                        }`}
                    >
                        <div className="flex justify-between items-center mb-1.5">
                            <span className="text-xs font-black uppercase tracking-wider opacity-60">OPTION B</span>
                            {selectedWyrOption === 'B' && <span className="text-sm">✓ YOUR VOTE</span>}
                        </div>
                        <p className="text-lg sm:text-xl font-bold leading-snug">{optionB}</p>
                    </motion.div>
                </div>

                <div className="theme-penalty-box p-4 border-t-2 border-dashed border-black/20">
                    <p className="theme-text-header text-xs text-[var(--theme-accent)] mb-1">MINORITY FORFEIT</p>
                    <p className="text-sm italic opacity-80">{prompt?.penalty || 'Minority voters take 1 sip.'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
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
                            handleDraw('WouldYouRather');
                        }}
                        className="theme-button theme-button-alt p-4 text-xl"
                    >
                        NEXT
                    </button>
                </div>
            </motion.div>
        );
    };

    // ==========================================
    // 🔥 THE HOT SEAT (60s SPEEDRUN) DISPLAY
    // ==========================================
    const HotSeatDisplay = () => {
        const handleStartHotSeat = () => {
            hapticService.success();
            soundService.chime();
            setHotSeatTimeLeft(60);
            setHotSeatAnswered(0);
            setHotSeatPassed(0);
            setIsHotSeatFinished(false);
            setIsHotSeatRunning(true);
            handleDraw('HotSeat');
        };

        const handleHotSeatAnswer = () => {
            hapticService.success();
            soundService.chime();
            setHotSeatAnswered(prev => prev + 1);
            incrementScore();
            handleDraw('HotSeat');
        };

        const handleHotSeatPass = () => {
            hapticService.heavy();
            soundService.passSlide();
            setHotSeatPassed(prev => prev + 1);
            incrementChicken();
            handleDraw('HotSeat');
        };

        const handleNextRound = () => {
            if (playersEnabled) nextPlayer();
            setHotSeatTimeLeft(60);
            setHotSeatAnswered(0);
            setHotSeatPassed(0);
            setIsHotSeatFinished(false);
            setIsHotSeatRunning(false);
            setPrompt(null);
        };

        if (isHotSeatFinished) {
            return (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="theme-panel p-6 sm:p-8 mt-4 text-center space-y-6"
                >
                    <div className="inline-block p-3 rounded-full bg-red-600 text-white text-3xl shadow-lg mb-1">
                        🔥
                    </div>
                    <h3 className="theme-text-header text-3xl font-black italic">HOT SEAT COMPLETE!</h3>

                    <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-black/10 dark:bg-white/5 border border-black/10">
                        <div>
                            <div className="text-3xl font-black text-emerald-500">{hotSeatAnswered}</div>
                            <div className="text-xs uppercase font-bold opacity-60">Answered</div>
                        </div>
                        <div>
                            <div className="text-3xl font-black text-amber-500">{hotSeatPassed}</div>
                            <div className="text-xs uppercase font-bold opacity-60">Chickened Out</div>
                        </div>
                    </div>

                    <div className="space-y-3 pt-2">
                        <button
                            onClick={handleNextRound}
                            className="w-full theme-button p-4 text-lg font-black"
                        >
                            PASS TO NEXT PLAYER ➔
                        </button>
                        <button
                            onClick={handleStartHotSeat}
                            className="w-full theme-button theme-button-alt p-3 text-sm font-bold opacity-80"
                        >
                            RETRY ROUND (60s)
                        </button>
                        <button
                            onClick={() => {
                                setIntensity(null);
                                setPrompt(null);
                            }}
                            className="text-xs opacity-50 hover:opacity-100 uppercase tracking-widest"
                        >
                            [ QUIT TO MAIN MENU ]
                        </button>
                    </div>
                </motion.div>
            );
        }

        if (!isHotSeatRunning && hotSeatTimeLeft === 60 && hotSeatAnswered === 0) {
            return (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="theme-panel p-6 sm:p-8 mt-4 text-center space-y-6"
                >
                    <div className="text-4xl">🔥</div>
                    <h3 className="theme-text-header text-3xl font-black italic">THE HOT SEAT</h3>
                    <p className="text-sm opacity-80 max-w-sm mx-auto leading-relaxed">
                        {activePlayer ? (
                            <span><strong className="text-red-500">{activePlayer.name}</strong> is in the Hot Seat! </span>
                        ) : null}
                        Answer as many rapid-fire questions as you can in <strong>60 seconds</strong> without hesitating!
                    </p>

                    <button
                        onClick={handleStartHotSeat}
                        className="w-full py-5 theme-button text-2xl font-black uppercase tracking-wider hover:scale-105 active:scale-95 shadow-xl"
                    >
                        ⚡ START 60s SPEEDRUN
                    </button>

                    <button
                        onClick={() => {
                            setIntensity(null);
                            setPrompt(null);
                        }}
                        className="text-xs opacity-40 hover:opacity-100 uppercase tracking-widest block mx-auto"
                    >
                        [ CANCEL ]
                    </button>
                </motion.div>
            );
        }

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="theme-panel p-6 sm:p-8 mt-4 space-y-5"
            >
                {/* 60s Speedrun Top Clock */}
                <div className="flex justify-between items-center p-3 rounded-xl bg-black/10 dark:bg-white/10 border border-black/10">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">⏰</span>
                        <span className="font-mono text-2xl font-black text-red-500">{hotSeatTimeLeft}s</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold">
                        <span className="text-emerald-500">⭐ {hotSeatAnswered}</span>
                        <span className="text-amber-500">🐔 {hotSeatPassed}</span>
                    </div>
                </div>

                <div className="py-2">
                    <span className="theme-badge px-3 py-1 font-bold italic text-xs mb-3 inline-block">RAPID FIRE</span>
                    <p className="theme-text-prompt text-2xl sm:text-3xl leading-snug font-black">
                        "{prompt?.text}"
                    </p>
                </div>

                {/* Big Rapid Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                        onClick={handleHotSeatAnswer}
                        className="theme-button p-5 text-xl font-black uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white shadow-md active:scale-95"
                    >
                        ✅ ANSWERED
                    </button>
                    <button
                        onClick={handleHotSeatPass}
                        className="theme-button theme-button-alt p-5 text-xl font-black uppercase tracking-wider bg-amber-600/80 hover:bg-amber-600 text-white shadow-md active:scale-95"
                    >
                        🐔 PASS (+1)
                    </button>
                </div>
            </motion.div>
        );
    };

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

    const renderGameModePrompt = () => {
        if (gameMode === GameMode.MOST_LIKELY_TO) {
            return <MostLikelyToDisplay />;
        }
        if (gameMode === GameMode.WOULD_YOU_RATHER) {
            return <WouldYouRatherDisplay />;
        }
        if (gameMode === GameMode.HOT_SEAT) {
            return <HotSeatDisplay />;
        }
        return <DefaultPromptDisplay />;
    };

    const getModeDisplayLabel = () => {
        switch (gameMode) {
            case GameMode.TRUTH_OR_DARE: return 'TRUTH OR DARE';
            case GameMode.NEVER_HAVE_I_EVER: return 'NEVER HAVE I EVER';
            case GameMode.MOST_LIKELY_TO: return 'MOST LIKELY TO';
            case GameMode.WOULD_YOU_RATHER: return 'WOULD YOU RATHER';
            case GameMode.HOT_SEAT: return 'THE HOT SEAT';
            default: return 'SELECT MODE';
        }
    };

    const getThemedModeButton = () => {
        const modeLabel = getModeDisplayLabel();
        switch (theme) {
            case Theme.UNDERTALE:
                return {
                    className: "border-2 border-white bg-black text-white font-['Press_Start_2P'] text-[10px] px-3 py-1.5 shadow-[2px_2px_0_#FFF] rounded-none active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer",
                    text: `* ${modeLabel} ⟳`
                };
            case Theme.FNAF:
                return {
                    className: "border border-green-500/80 bg-black text-green-400 font-['VT323'] text-base px-3 py-0.5 rounded-none shadow-[0_0_8px_rgba(34,197,94,0.3)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer tracking-wider",
                    text: `[CAM_PROTOCOL: ${modeLabel}] ⟳`
                };
            case Theme.SONIC:
                return {
                    className: "-skew-x-12 border-3 border-black bg-white text-black font-['Bangers'] text-base px-3.5 py-1 rounded-xl shadow-[3px_3px_0_#000] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer tracking-wide",
                    text: `ACT: ${modeLabel} ⟳`
                };
            case Theme.PERSONA:
                return {
                    className: "-skew-x-12 border-2 border-white bg-black text-white font-['Edo'] text-xs px-3.5 py-1 rounded-none shadow-[3px_3px_0_#D80000] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer italic font-bold",
                    text: `TACTIC: ${modeLabel} ⟳`
                };
            case Theme.MINECRAFT:
                return {
                    className: "border-2 border-t-[#AAA] border-l-[#AAA] border-r-[#373737] border-b-[#373737] bg-[#707070] text-white font-['Minecraft'] text-xs px-3 py-1.5 rounded-none active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer",
                    text: `Quest: ${modeLabel} ⟳`
                };
            case Theme.ANIMAL_CROSSING:
                return {
                    className: "border-2 border-[#7EBF8F] bg-[#F7F4E9] text-[#4A7A56] font-['Sniglet'] text-xs px-3.5 py-1 rounded-2xl shadow-sm font-bold active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer",
                    text: `🍃 ${modeLabel} ⟳`
                };
            case Theme.CYBERPUNK:
                return {
                    className: "border border-yellow-400 bg-black text-yellow-400 font-['Orbitron'] text-[11px] px-3 py-1 rounded-none shadow-[0_0_8px_rgba(250,204,21,0.3)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer",
                    text: `// MOD: ${modeLabel} ⟳`
                };
            case Theme.DANGANRONPA:
                return {
                    className: "border-2 border-[#FF007F] bg-[#050510] text-[#FF007F] font-mono text-xs px-3 py-1 rounded-none shadow-[0_0_8px_rgba(255,0,127,0.4)] font-bold active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer tracking-wider",
                    text: `BULLET: ${modeLabel} ⟳`
                };
            case Theme.OMORI:
                return {
                    className: "border-2 border-black bg-white text-black font-['Gloria_Hallelujah'] text-xs px-3 py-1 rounded-none shadow-[2px_2px_0_#000] font-bold active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer",
                    text: `(act: ${modeLabel}) ⟳`
                };
            case Theme.KIRBY:
                return {
                    className: "border-2 border-[#FF85B3] bg-[#FFE4EF] text-[#D81B60] font-['Fredoka_One'] text-xs px-3.5 py-1 rounded-full shadow-sm font-bold active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer",
                    text: `⭐ ${modeLabel} ⟳`
                };
            case Theme.POKEMON:
                return {
                    className: "border-2 border-[#3B4CCA] bg-zinc-900 text-[#FFDE00] font-['Press_Start_2P'] text-[10px] px-3 py-1.5 rounded-none shadow-[2px_2px_0_#3B4CCA] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer",
                    text: `BATTLE: ${modeLabel} ⟳`
                };
            case Theme.SKYRIM:
                return {
                    className: "border border-[#D4AF37] bg-black text-[#D4AF37] font-['Cinzel'] text-xs px-3 py-1 rounded-none shadow-[0_0_8px_rgba(212,175,55,0.3)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer tracking-widest uppercase font-bold",
                    text: `DESTINY: ${modeLabel} ⟳`
                };
            case Theme.SANRIO:
                return {
                    className: "border-2 border-[#FF8DA1] bg-[#FFE4EC] text-[#D84B6B] font-['Cherry_Bomb_One'] text-xs px-3.5 py-1 rounded-full shadow-sm font-bold active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer",
                    text: `🎀 ${modeLabel} ⟳`
                };
            case Theme.FALLOUT:
                return {
                    className: "border border-[#14FF00] bg-black text-[#14FF00] font-['Share_Tech_Mono'] text-xs px-3 py-1 rounded-none shadow-[0_0_8px_rgba(20,255,0,0.3)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer",
                    text: `[PIP: ${modeLabel}] ⟳`
                };
            case Theme.HAZBIN:
                return {
                    className: "border border-[#FFD700] bg-[#1a050f] text-[#FFD700] font-['Lora'] text-xs px-3 py-1 rounded-none shadow-[0_0_8px_rgba(229,43,80,0.4)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer tracking-wider font-bold",
                    text: `PACT: ${modeLabel} ⟳`
                };
            case Theme.VOCALOID:
                return {
                    className: "border border-[#39C5BB] bg-black text-[#39C5BB] font-['Orbitron'] text-xs px-3 py-1 rounded-none shadow-[0_0_8px_rgba(57,197,187,0.4)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer font-bold",
                    text: `TRACK: ${modeLabel} ⟳`
                };
            case Theme.IRUMA:
                return {
                    className: "border-2 border-[#ffd700] bg-[#2e1534] text-[#ffd700] font-['Sniglet'] text-xs px-3.5 py-1 rounded-xl shadow-[0_0_8px_rgba(255,215,0,0.3)] font-bold active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer",
                    text: `BABYLS: ${modeLabel} ⟳`
                };
            case Theme.ARCANE:
                return {
                    className: "border border-[#C8AA6E] bg-black text-[#00E5FF] font-['Cinzel'] text-xs px-3 py-1 rounded-none shadow-[0_0_8px_rgba(0,229,255,0.3)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer tracking-widest font-bold",
                    text: `HEXTECH: ${modeLabel} ⟳`
                };
            case Theme.BILLY_HATCHER:
                return {
                    className: "border-2 border-[#1873CA] bg-[#FDFAF4] text-[#1873CA] font-['Fredoka_One'] text-xs px-3.5 py-1 rounded-2xl shadow-sm font-bold active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer",
                    text: `EGG: ${modeLabel} ⟳`
                };
            default:
                return {
                    className: "border border-white/30 bg-black/70 text-white text-xs px-3 py-1 rounded-full active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-md",
                    text: `🎮 ${modeLabel} ⟳`
                };
        }
    };

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
                    {/* Universal Top Bar for Play screen: Themed Minigame Chooser & Themed Countdown Timer */}
                    <div className="flex flex-col gap-2 mb-2 shrink-0">
                        <div className="flex flex-wrap justify-between items-center gap-2">
                            {/* Themed Mode Switcher Button */}
                            <button
                                onClick={() => {
                                    hapticService.light();
                                    soundService.click();
                                    setIsMinigameChooserOpen(true);
                                }}
                                title="Switch Minigame Mode"
                                className={getThemedModeButton().className}
                            >
                                <span>{getThemedModeButton().text}</span>
                            </button>

                            <div className="flex items-center gap-2">
                                {playersEnabled && activePlayer && (
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-black/60 border border-white/20 text-white text-xs font-bold">
                                        <span>🎮</span>
                                        <span className="text-red-400 font-black">{activePlayer.name}'s Turn</span>
                                    </div>
                                )}

                                {/* Themed Corner Timer: Only show if not in 60s Hot Seat mode */}
                                {gameMode !== GameMode.HOT_SEAT && (
                                    <CountdownTimer
                                        enabled={timerEnabled}
                                        duration={timerDuration}
                                        onToggleEnabled={toggleTimerEnabled}
                                        onChangeDuration={setTimerDuration}
                                        promptId={prompt?.id}
                                        isPromptActive={!!prompt}
                                        theme={theme}
                                    />
                                )}
                            </div>
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

                    {/* Custom Theme PlayScreen is reserved for legacy TOD / NHIE; new modes always use specialized interactive engines */}
                    {themeDef.PlayScreen && (gameMode === GameMode.TRUTH_OR_DARE || gameMode === GameMode.NEVER_HAVE_I_EVER) ? (
                        <themeDef.PlayScreen logic={logic} />
                    ) : (
                        <>
                            {!intensity && !prompt ? (
                                themeDef.IntensitySelector ? <themeDef.IntensitySelector logic={logic} /> : <DefaultIntensitySelector />
                            ) : !prompt ? (
                                gameMode === GameMode.TRUTH_OR_DARE ? (
                                    themeDef.PromptTypeSelector ? <themeDef.PromptTypeSelector logic={logic} /> : <DefaultPromptTypeSelector />
                                ) : null
                            ) : (
                                renderGameModePrompt()
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
                                                    <option value="MostLikelyTo">Most Likely</option>
                                                    <option value="WouldYouRather">Rather</option>
                                                    <option value="HotSeat">Hot Seat</option>
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
                                                placeholder={editingDeck.gameMode === GameMode.WOULD_YOU_RATHER ? "Option A || Option B" : "PROMPT TEXT..."}
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
                            <div className="flex items-center justify-between">
                                <h2 className="theme-text-header text-4xl font-bold italic">ARCHIVES</h2>
                                {history.length > 0 && (
                                    <button
                                        onClick={() => {
                                            if (window.confirm('Clear all history? This cannot be undone.')) {
                                                clearHistory();
                                                hapticService.medium();
                                            }
                                        }}
                                        className="text-[10px] uppercase font-bold opacity-50 hover:opacity-90 transition-opacity border border-current/30 px-2 py-1 rounded"
                                    >
                                        🗑️ Clear
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-col gap-3">
                                {history.length === 0 ? (
                                    <div className="py-20 text-center opacity-20 italic">No history yet.</div>
                                ) : (
                                    history.map((item, i) => (
                                        <div key={i} className="theme-panel p-4 flex gap-4 items-start">
                                            <div className="w-10 h-10 theme-badge shrink-0 flex items-center justify-center text-lg">
                                                {item.type === 'Truth' ? '?' : item.type === 'Dare' ? '!' : '🎴'}
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

                        {/* Procedural Sound FX Toggle */}
                        <div className="flex justify-between items-center pt-2 border-t border-black/10">
                            <div>
                                <div className="font-bold text-sm">🔊 SOUND EFFECTS</div>
                                <div className="text-[10px] opacity-60">Procedural audio for card flips, ticks, buzzers & chimes</div>
                            </div>
                            <button
                                onClick={() => {
                                    toggleSoundEnabled();
                                    if (!soundEnabled) soundService.click();
                                }}
                                className={`px-4 py-1.5 rounded-full text-xs font-black uppercase transition-all ${
                                    soundEnabled
                                        ? 'bg-red-600 text-white shadow-md'
                                        : 'bg-black/20 text-black/60 dark:text-white/40'
                                }`}
                            >
                                {soundEnabled ? 'ON' : 'OFF'}
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

            {/* Themed Minigame Chooser Modal */}
            <ThemedMinigameChooser
                isOpen={isMinigameChooserOpen}
                onClose={() => setIsMinigameChooserOpen(false)}
                currentMode={gameMode}
                onSelectMode={(mode) => {
                    setGameMode(mode);
                    setIntensity(null);
                    setPrompt(null);
                }}
                theme={theme}
            />
        </AnimatePresence>
    );
};

export default UnifiedGame;
