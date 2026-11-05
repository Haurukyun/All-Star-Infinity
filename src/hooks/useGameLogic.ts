import { useState, useEffect, useCallback, useRef } from 'react';
import { Intensity, PromptType, GamePrompt, CustomDeck, Theme, GameMode, Player, TimerDuration, GameView } from '../types';
import { getRandomPrompt, DEFAULT_PROMPTS } from '../services/localPrompts';
import { THEMED_PREBUILT_DECKS } from '../services/themedDecks';
import { hapticService, setHapticsGlobalEnabled } from '../services/haptics';
import { soundService, setSoundGlobalEnabled } from '../services/soundFx';

const generateId = () => Math.random().toString(36).substring(2, 11);

export const DEFAULT_AVATARS = ['🦊', '🐉', '⚡', '💎', '💀', '👑', '🐱', '🚀', '🎭', '🎮', '🔥', '🌸'];
export const DEFAULT_COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#e11d48'];

// Seamless storage migration from legacy 'phantom_' prefix to 'allstarinfinity_'
const getStorageItem = (newKey: string, legacyKey: string): string | null => {
  const newVal = localStorage.getItem(newKey);
  if (newVal !== null) return newVal;
  const legacyVal = localStorage.getItem(legacyKey);
  if (legacyVal !== null) {
    try { localStorage.setItem(newKey, legacyVal); } catch (e) { console.error(e); }
    return legacyVal;
  }
  return null;
};

export const useGameLogic = () => {
  const [activeTab, setActiveTab] = useState('play');
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [intensity, setIntensity] = useState<Intensity | null>(null);
  const [prompt, setPrompt] = useState<GamePrompt | null>(null);

  // Globally persisted Game History (last 50 drawn prompts)
  const [history, setHistory] = useState<GamePrompt[]>(() => {
    const saved = getStorageItem('allstarinfinity_history', 'phantom_history');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  // Globally persisted Easy Font mode
  const [useEasyFont, setUseEasyFont] = useState<boolean>(() => {
    return getStorageItem('allstarinfinity_easy_font', 'phantom_easy_font') === 'true';
  });

  // Globally persisted Native Haptic feedback
  const [hapticsEnabled, setHapticsEnabled] = useState<boolean>(() => {
    return getStorageItem('allstarinfinity_haptics_enabled', 'phantom_haptics_enabled') !== 'false'; // default true
  });

  // Globally persisted Procedural Sound FX
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    return getStorageItem('allstarinfinity_sound_enabled', 'phantom_sound_enabled') !== 'false'; // default true
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = getStorageItem('allstarinfinity_theme', 'phantom_theme');
    if (savedTheme && Object.values(Theme).includes(savedTheme as Theme) && savedTheme !== Theme.NONE) {
      return savedTheme as Theme;
    }
    return Theme.NONE;
  });
  const [view, setView] = useState<GameView>('menu');
  const [hasExplicitlySelectedTheme, setHasExplicitlySelectedTheme] = useState(() => {
    const savedTheme = getStorageItem('allstarinfinity_theme', 'phantom_theme');
    return !!(savedTheme && Object.values(Theme).includes(savedTheme as Theme) && savedTheme !== Theme.NONE);
  });

  const [customDecks, setCustomDecks] = useState<CustomDeck[]>(() => {
    const saved = getStorageItem('allstarinfinity_custom_decks', 'phantom_custom_decks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });
  const [activeDeckId, setActiveDeckId] = useState<string>('default');
  const [editingDeck, setEditingDeck] = useState<CustomDeck | null>(null);

  // Pass & Play Player Roster State
  const [players, setPlayers] = useState<Player[]>(() => {
    const saved = getStorageItem('allstarinfinity_players', 'phantom_players');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });
  const [activePlayerIndex, setActivePlayerIndex] = useState<number>(0);
  const [playersEnabled, setPlayersEnabled] = useState<boolean>(() => {
    return getStorageItem('allstarinfinity_players_enabled', 'phantom_players_enabled') === 'true';
  });

  // Countdown Timer State (Default OFF)
  const [timerEnabled, setTimerEnabled] = useState<boolean>(() => {
    return getStorageItem('allstarinfinity_timer_enabled', 'phantom_timer_enabled') === 'true';
  });
  const [timerDuration, setTimerDuration] = useState<TimerDuration>(() => {
    const saved = getStorageItem('allstarinfinity_timer_duration', 'phantom_timer_duration');
    if (saved && (saved === '15' || saved === '30' || saved === '60')) {
      return Number(saved) as TimerDuration;
    }
    return 30;
  });

  // Save History to localStorage (last 50 items)
  useEffect(() => {
    localStorage.setItem('allstarinfinity_history', JSON.stringify(history.slice(0, 50)));
  }, [history]);

  // Save Decks to localStorage
  useEffect(() => {
    localStorage.setItem('allstarinfinity_custom_decks', JSON.stringify(customDecks));
  }, [customDecks]);

  // Save Theme to localStorage
  useEffect(() => {
    localStorage.setItem('allstarinfinity_theme', theme);
  }, [theme]);

  // Save Easy Font to localStorage
  useEffect(() => {
    localStorage.setItem('allstarinfinity_easy_font', String(useEasyFont));
  }, [useEasyFont]);

  // Save Haptics setting to localStorage and update global service
  useEffect(() => {
    localStorage.setItem('allstarinfinity_haptics_enabled', String(hapticsEnabled));
    setHapticsGlobalEnabled(hapticsEnabled);
  }, [hapticsEnabled]);

  // Save Sound FX setting to localStorage and update global service
  useEffect(() => {
    localStorage.setItem('allstarinfinity_sound_enabled', String(soundEnabled));
    setSoundGlobalEnabled(soundEnabled);
  }, [soundEnabled]);

  // Save Players to localStorage
  useEffect(() => {
    localStorage.setItem('allstarinfinity_players', JSON.stringify(players));
  }, [players]);

  // Save Players Enabled setting to localStorage
  useEffect(() => {
    localStorage.setItem('allstarinfinity_players_enabled', String(playersEnabled));
  }, [playersEnabled]);

  // Save Timer Settings to localStorage
  useEffect(() => {
    localStorage.setItem('allstarinfinity_timer_enabled', String(timerEnabled));
  }, [timerEnabled]);

  useEffect(() => {
    localStorage.setItem('allstarinfinity_timer_duration', String(timerDuration));
  }, [timerDuration]);

  // Reset active deck if it no longer matches the current context
  useEffect(() => {
    if (activeDeckId !== 'default') {
      const selected = customDecks.find(d => d.id === activeDeckId) || THEMED_PREBUILT_DECKS.find(d => d.id === activeDeckId);
      if (selected && (selected.intensity !== intensity || selected.gameMode !== gameMode)) {
        setActiveDeckId('default');
      }
    }
  }, [intensity, gameMode, customDecks, activeDeckId]);

  // Keep activePlayerIndex valid when players length changes
  useEffect(() => {
    if (players.length > 0 && activePlayerIndex >= players.length) {
      setActivePlayerIndex(0);
    }
  }, [players.length, activePlayerIndex]);

  const activePlayer = playersEnabled && players.length > 0
    ? players[activePlayerIndex % players.length]
    : null;

  const targetPlayer = playersEnabled && players.length > 1
    ? players[(activePlayerIndex + 1) % players.length]
    : null;

  // Chaos mode (randomized turn order)
  const [chaosMode, setChaosMode] = useState<boolean>(() => {
    return getStorageItem('allstarinfinity_chaos_mode', 'phantom_chaos_mode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('allstarinfinity_chaos_mode', String(chaosMode));
  }, [chaosMode]);

  const chaosBagRef = useRef<number[]>([]);

  // Double stakes mechanic
  const [isDoubleStakes, setIsDoubleStakes] = useState<boolean>(false);

  // Deck loop / exhaustion banner
  const [deckReshuffledAlert, setDeckReshuffledAlert] = useState<string | null>(null);
  const drawnPromptIdsRef = useRef<Set<string>>(new Set());

  // Session stats for awards podium
  const [sessionCompletedCount, setSessionCompletedCount] = useState<number>(0);

  // Pass & Play Actions
  const addPlayer = useCallback((name: string, customAvatar?: string, customColor?: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const newPlayer: Player = {
      id: generateId(),
      name: trimmed,
      chickenCount: 0,
      score: 0,
      avatar: customAvatar || DEFAULT_AVATARS[players.length % DEFAULT_AVATARS.length],
      color: customColor || DEFAULT_COLORS[players.length % DEFAULT_COLORS.length]
    };
    setPlayers(prev => [...prev, newPlayer]);
    hapticService.light();
  }, [players.length]);

  const removePlayer = useCallback((id: string) => {
    setPlayers(prev => prev.filter(p => p.id !== id));
    setActivePlayerIndex(prev => Math.max(0, prev - 1));
    chaosBagRef.current = [];
    hapticService.light();
  }, []);

  const updatePlayer = useCallback((id: string, updates: Partial<Player>) => {
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const updatePlayerName = useCallback((id: string, name: string) => {
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, name } : p));
  }, []);

  const nextPlayer = useCallback(() => {
    if (players.length === 0) return;
    if (chaosMode && players.length > 1) {
      if (chaosBagRef.current.length === 0) {
        const pool = players.map((_, i) => i);
        for (let i = pool.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        if (pool[0] === activePlayerIndex && pool.length > 1) {
          [pool[0], pool[1]] = [pool[1], pool[0]];
        }
        chaosBagRef.current = pool;
      }
      const nextIdx = chaosBagRef.current.shift() ?? 0;
      setActivePlayerIndex(nextIdx);
    } else {
      setActivePlayerIndex(prev => (prev + 1) % players.length);
    }
    hapticService.light();
  }, [players.length, chaosMode, activePlayerIndex]);

  const prevPlayer = useCallback(() => {
    if (players.length === 0) return;
    setActivePlayerIndex(prev => (prev - 1 + players.length) % players.length);
    hapticService.light();
  }, [players.length]);

  const incrementChicken = useCallback((playerId?: string, amount?: number) => {
    const targetId = playerId || activePlayer?.id;
    if (!targetId) return;
    const countToAdd = amount !== undefined ? amount : (isDoubleStakes ? 2 : 1);
    setPlayers(prev => prev.map(p => p.id === targetId ? { ...p, chickenCount: p.chickenCount + countToAdd } : p));
    setIsDoubleStakes(false);
    hapticService.heavy();
    soundService.buzzer();
  }, [activePlayer?.id, isDoubleStakes]);

  const incrementScore = useCallback((playerId?: string) => {
    const targetId = playerId || activePlayer?.id;
    if (!targetId) return;
    setPlayers(prev => prev.map(p => p.id === targetId ? { ...p, score: p.score + 1 } : p));
    hapticService.success();
    soundService.chime();
  }, [activePlayer?.id]);

  const resetRosterScores = useCallback(() => {
    setPlayers(prev => prev.map(p => ({ ...p, chickenCount: 0, score: 0 })));
    chaosBagRef.current = [];
    hapticService.light();
  }, []);

  const toggleChaosMode = useCallback(() => {
    setChaosMode(prev => !prev);
    chaosBagRef.current = [];
    hapticService.light();
  }, []);

  const recordPromptCompleted = useCallback(() => {
    setSessionCompletedCount(prev => prev + 1);
    setIsDoubleStakes(false);
  }, []);

  const getAwardsPodium = useCallback(() => {
    if (players.length === 0) return null;
    const biggestChicken = [...players].sort((a, b) => b.chickenCount - a.chickenCount)[0];
    const hotSeatMaster = [...players].sort((a, b) => b.score - a.score)[0];
    const ironWill = [...players].sort((a, b) => a.chickenCount - b.chickenCount)[0];

    return {
      biggestChicken: biggestChicken && biggestChicken.chickenCount > 0 ? biggestChicken : null,
      hotSeatMaster: hotSeatMaster && hotSeatMaster.score > 0 ? hotSeatMaster : null,
      ironWill: players.length > 1 ? ironWill : null,
      totalPrompts: sessionCompletedCount,
    };
  }, [players, sessionCompletedCount]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try { localStorage.removeItem('allstarinfinity_history'); } catch (e) { console.error(e); }
    hapticService.light();
  }, []);

  // Timer Actions
  const toggleTimerEnabled = useCallback(() => {
    setTimerEnabled(prev => !prev);
    hapticService.light();
  }, []);

  // Easy Font & Haptics Toggles
  const toggleEasyFont = useCallback(() => {
    setUseEasyFont(prev => !prev);
    hapticService.light();
  }, []);

  const toggleHapticsEnabled = useCallback(() => {
    setHapticsEnabled(prev => !prev);
  }, []);

  const toggleSoundEnabled = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  const handleDraw = useCallback((type: PromptType) => {
    let sourcePool = DEFAULT_PROMPTS;

    if (activeDeckId !== 'default') {
      const currentDeck = customDecks.find(d => d.id === activeDeckId) || THEMED_PREBUILT_DECKS.find(d => d.id === activeDeckId);
      if (currentDeck && currentDeck.prompts.length > 0) {
        sourcePool = currentDeck.prompts;
      }
    }

    // Filter by intensity and type
    const filtered = sourcePool.filter(p => {
      const matchType = p.type === type;
      const matchIntensity = p.intensity === (intensity || Intensity.SOFT);
      return matchType && matchIntensity;
    });

    let next: any;

    if (filtered.length === 0) {
      next = getRandomPrompt(type, intensity || Intensity.SOFT);
    } else {
      // Check if all cards in this category have been seen
      if (drawnPromptIdsRef.current.size >= filtered.length) {
        drawnPromptIdsRef.current.clear();
        setDeckReshuffledAlert(`🎉 All ${filtered.length} cards in this deck played! Shuffling deck...`);
        soundService.chime();
        hapticService.success();
        setTimeout(() => setDeckReshuffledAlert(null), 3500);
      }

      const pool = (filtered.length > 1 && prompt) ? filtered.filter(p => p.id !== prompt.id) : filtered;
      next = pool[Math.floor(Math.random() * pool.length)];
      if (next?.id) drawnPromptIdsRef.current.add(next.id);
    }

    setPrompt(next);
    setHistory(prev => [next, ...prev]);

    // Tactile haptic feedback and card flip sound on draw
    if (intensity === Intensity.VULGAR) {
      hapticService.heavy();
    } else {
      hapticService.medium();
    }
    soundService.cardFlip();
  }, [activeDeckId, customDecks, intensity, prompt]);

  const triggerDoubleStakes = useCallback((type: PromptType) => {
    setIsDoubleStakes(true);
    hapticService.heavy();
    handleDraw(type);
  }, [handleDraw]);

  const saveDeck = useCallback((deck: CustomDeck) => {
    const sanitizedPrompts = deck.prompts.map(p => {
      let type: PromptType = p.type;
      if (deck.gameMode === GameMode.NEVER_HAVE_I_EVER) type = 'NeverHaveIEver';
      else if (deck.gameMode === GameMode.MOST_LIKELY_TO) type = 'MostLikelyTo';
      else if (deck.gameMode === GameMode.WOULD_YOU_RATHER) type = 'WouldYouRather';
      else if (deck.gameMode === GameMode.HOT_SEAT) type = 'HotSeat';

      return {
        ...p,
        intensity: deck.intensity,
        type
      };
    });

    const sanitizedDeck = { ...deck, prompts: sanitizedPrompts };

    setCustomDecks(prev => {
      const exists = prev.find(d => d.id === sanitizedDeck.id);
      if (exists) return prev.map(d => d.id === sanitizedDeck.id ? sanitizedDeck : d);
      return [...prev, sanitizedDeck];
    });
    setEditingDeck(null);
    hapticService.success();
  }, []);

  const deleteDeck = useCallback((id: string) => {
    if (activeDeckId === id) setActiveDeckId('default');
    setCustomDecks(prev => prev.filter(d => d.id !== id));
    hapticService.light();
  }, [activeDeckId]);

  const toggleFavoriteDeck = useCallback((id: string) => {
    setCustomDecks(prev => prev.map(d => d.id === id ? { ...d, isFavorite: !d.isFavorite } : d));
    hapticService.light();
  }, []);

  // Pre-built themed decks cloning & import
  const cloneThemedDeck = useCallback((deckId: string) => {
    const themed = THEMED_PREBUILT_DECKS.find(d => d.id === deckId);
    if (!themed) return;
    const cloned: CustomDeck = {
      ...themed,
      id: generateId(),
      name: `${themed.name} (Copy)`,
      isCustom: true,
      isFavorite: false,
      prompts: themed.prompts.map(p => ({ ...p, id: generateId() }))
    };
    setCustomDecks(prev => [...prev, cloned]);
    setActiveDeckId(cloned.id);
    hapticService.success();
    return cloned;
  }, []);

  const importCustomDeck = useCallback((deck: CustomDeck) => {
    setCustomDecks(prev => [...prev, deck]);
    setActiveDeckId(deck.id);
    hapticService.success();
  }, []);

  const addNewPromptToEditingDeck = useCallback(() => {
    if (!editingDeck) return;
    let defaultType: PromptType = 'Truth';
    if (editingDeck.gameMode === GameMode.NEVER_HAVE_I_EVER) defaultType = 'NeverHaveIEver';
    else if (editingDeck.gameMode === GameMode.MOST_LIKELY_TO) defaultType = 'MostLikelyTo';
    else if (editingDeck.gameMode === GameMode.WOULD_YOU_RATHER) defaultType = 'WouldYouRather';
    else if (editingDeck.gameMode === GameMode.HOT_SEAT) defaultType = 'HotSeat';

    const newPrompt: GamePrompt = {
      id: generateId(),
      type: defaultType,
      intensity: editingDeck.intensity,
      text: '',
      penalty: ''
    };
    setEditingDeck({ ...editingDeck, prompts: [...editingDeck.prompts, newPrompt] });
    hapticService.light();
  }, [editingDeck]);

  const updatePromptInEditingDeck = useCallback((id: string, field: 'text' | 'penalty' | 'type' | 'intensity', value: string | PromptType | Intensity) => {
    if (!editingDeck) return;
    setEditingDeck({
      ...editingDeck,
      prompts: editingDeck.prompts.map(p => {
        if (p.id === id) {
          if (field === 'type' && editingDeck.gameMode === GameMode.TRUTH_OR_DARE) {
            if (value !== 'Truth' && value !== 'Dare') return p;
          }
          if (field === 'type' && editingDeck.gameMode === GameMode.NEVER_HAVE_I_EVER) {
            return { ...p, type: 'NeverHaveIEver' };
          }
          return { ...p, [field]: value };
        }
        return p;
      })
    });
  }, [editingDeck]);

  const removePromptFromEditingDeck = useCallback((id: string) => {
    if (!editingDeck) return;
    setEditingDeck({
      ...editingDeck,
      prompts: editingDeck.prompts.filter(p => p.id !== id)
    });
    hapticService.light();
  }, [editingDeck]);

  const handleSetTheme = useCallback((newTheme: Theme, isExplicit: boolean = true) => {
    setTheme(newTheme);
    hapticService.medium();
    if (isExplicit) {
      if (newTheme !== Theme.NONE) {
        setHasExplicitlySelectedTheme(true);
      } else {
        setHasExplicitlySelectedTheme(false);
      }
    }
  }, []);

  return {
    activeTab, setActiveTab: (tab: string) => {
      setActiveTab(tab);
      hapticService.light();
    },
    gameMode, setGameMode: (mode: GameMode | null) => {
      setGameMode(mode);
      if (mode) hapticService.light();
    },
    intensity, setIntensity: (i: Intensity | null) => {
      setIntensity(i);
      if (i) hapticService.light();
    },
    prompt, setPrompt,
    history, setHistory, clearHistory,
    useEasyFont, setUseEasyFont, toggleEasyFont,
    hapticsEnabled, setHapticsEnabled, toggleHapticsEnabled,
    soundEnabled, setSoundEnabled, toggleSoundEnabled,
    theme, setTheme: handleSetTheme,
    hasExplicitlySelectedTheme,
    view, setView: (v: GameView) => {
      setView(v);
      hapticService.light();
    },
    customDecks, setCustomDecks,
    activeDeckId, setActiveDeckId: (id: string) => {
      setActiveDeckId(id);
      hapticService.light();
    },
    editingDeck, setEditingDeck,
    handleDraw, saveDeck, deleteDeck,
    toggleFavoriteDeck,
    cloneThemedDeck, importCustomDeck,
    themedPrebuiltDecks: THEMED_PREBUILT_DECKS,
    addNewPromptToEditingDeck,
    updatePromptInEditingDeck,
    removePromptFromEditingDeck,
    generateId,
    // Pass & Play Roster
    players, setPlayers,
    activePlayerIndex, setActivePlayerIndex,
    playersEnabled, setPlayersEnabled,
    activePlayer, targetPlayer,
    addPlayer, removePlayer, updatePlayer, updatePlayerName,
    nextPlayer, prevPlayer,
    incrementChicken, incrementScore, resetRosterScores,
    chaosMode, toggleChaosMode,
    isDoubleStakes, setIsDoubleStakes, triggerDoubleStakes,
    deckReshuffledAlert, recordPromptCompleted, getAwardsPodium,
    // Countdown Timer
    timerEnabled, setTimerEnabled,
    timerDuration, setTimerDuration,
    toggleTimerEnabled
  };
};
