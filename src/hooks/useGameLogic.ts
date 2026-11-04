import { useState, useEffect, useCallback } from 'react';
import { Intensity, PromptType, GamePrompt, CustomDeck, Theme, GameMode, Player, TimerDuration, GameView } from '../types';
import { getRandomPrompt, DEFAULT_PROMPTS } from '../services/localPrompts';

const generateId = () => Math.random().toString(36).substring(2, 11);

export const useGameLogic = () => {
  const [activeTab, setActiveTab] = useState('play');
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [intensity, setIntensity] = useState<Intensity | null>(null);
  const [prompt, setPrompt] = useState<GamePrompt | null>(null);
  const [history, setHistory] = useState<GamePrompt[]>([]);
  const [useEasyFont, setUseEasyFont] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('phantom_theme');
    if (savedTheme && Object.values(Theme).includes(savedTheme as Theme) && savedTheme !== Theme.NONE) {
      return savedTheme as Theme;
    }
    return Theme.NONE;
  });
  const [view, setView] = useState<GameView>('menu');
  const [hasExplicitlySelectedTheme, setHasExplicitlySelectedTheme] = useState(() => {
    const savedTheme = localStorage.getItem('phantom_theme');
    return !!(savedTheme && Object.values(Theme).includes(savedTheme as Theme) && savedTheme !== Theme.NONE);
  });

  const [customDecks, setCustomDecks] = useState<CustomDeck[]>(() => {
    const saved = localStorage.getItem('phantom_custom_decks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });
  const [activeDeckId, setActiveDeckId] = useState<string>('default');
  const [editingDeck, setEditingDeck] = useState<CustomDeck | null>(null);

  // Pass & Play Player Roster State
  const [players, setPlayers] = useState<Player[]>(() => {
    const saved = localStorage.getItem('phantom_players');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });
  const [activePlayerIndex, setActivePlayerIndex] = useState<number>(0);
  const [playersEnabled, setPlayersEnabled] = useState<boolean>(() => {
    return localStorage.getItem('phantom_players_enabled') === 'true';
  });

  // Countdown Timer State (Default OFF)
  const [timerEnabled, setTimerEnabled] = useState<boolean>(() => {
    return localStorage.getItem('phantom_timer_enabled') === 'true';
  });
  const [timerDuration, setTimerDuration] = useState<TimerDuration>(() => {
    const saved = localStorage.getItem('phantom_timer_duration');
    if (saved && (saved === '15' || saved === '30' || saved === '60')) {
      return Number(saved) as TimerDuration;
    }
    return 30;
  });

  // Save Decks to localStorage
  useEffect(() => {
    localStorage.setItem('phantom_custom_decks', JSON.stringify(customDecks));
  }, [customDecks]);

  // Save Theme to localStorage
  useEffect(() => {
    localStorage.setItem('phantom_theme', theme);
  }, [theme]);

  // Save Players to localStorage
  useEffect(() => {
    localStorage.setItem('phantom_players', JSON.stringify(players));
  }, [players]);

  // Save Players Enabled setting to localStorage
  useEffect(() => {
    localStorage.setItem('phantom_players_enabled', String(playersEnabled));
  }, [playersEnabled]);

  // Save Timer Settings to localStorage
  useEffect(() => {
    localStorage.setItem('phantom_timer_enabled', String(timerEnabled));
  }, [timerEnabled]);

  useEffect(() => {
    localStorage.setItem('phantom_timer_duration', String(timerDuration));
  }, [timerDuration]);

  // Reset active deck if it no longer matches the current context
  useEffect(() => {
    if (activeDeckId !== 'default') {
      const selected = customDecks.find(d => d.id === activeDeckId);
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

  // Pass & Play Actions
  const addPlayer = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const newPlayer: Player = {
      id: generateId(),
      name: trimmed,
      chickenCount: 0,
      score: 0
    };
    setPlayers(prev => [...prev, newPlayer]);
  }, []);

  const removePlayer = useCallback((id: string) => {
    setPlayers(prev => prev.filter(p => p.id !== id));
    setActivePlayerIndex(prev => Math.max(0, prev - 1));
  }, []);

  const updatePlayerName = useCallback((id: string, name: string) => {
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, name } : p));
  }, []);

  const nextPlayer = useCallback(() => {
    if (players.length === 0) return;
    setActivePlayerIndex(prev => (prev + 1) % players.length);
  }, [players.length]);

  const prevPlayer = useCallback(() => {
    if (players.length === 0) return;
    setActivePlayerIndex(prev => (prev - 1 + players.length) % players.length);
  }, [players.length]);

  const incrementChicken = useCallback((playerId?: string) => {
    const targetId = playerId || activePlayer?.id;
    if (!targetId) return;
    setPlayers(prev => prev.map(p => p.id === targetId ? { ...p, chickenCount: p.chickenCount + 1 } : p));
  }, [activePlayer?.id]);

  const incrementScore = useCallback((playerId?: string) => {
    const targetId = playerId || activePlayer?.id;
    if (!targetId) return;
    setPlayers(prev => prev.map(p => p.id === targetId ? { ...p, score: p.score + 1 } : p));
  }, [activePlayer?.id]);

  const resetRosterScores = useCallback(() => {
    setPlayers(prev => prev.map(p => ({ ...p, chickenCount: 0, score: 0 })));
  }, []);

  // Timer Actions
  const toggleTimerEnabled = useCallback(() => {
    setTimerEnabled(prev => !prev);
  }, []);

  const handleDraw = useCallback((type: PromptType) => {
    let sourcePool = DEFAULT_PROMPTS;
    let currentDeck: CustomDeck | undefined;

    if (activeDeckId !== 'default') {
      currentDeck = customDecks.find(d => d.id === activeDeckId);
      if (currentDeck && currentDeck.prompts.length > 0) {
        sourcePool = currentDeck.prompts;
      }
    }

    // Filter by intensity and type.
    const filtered = sourcePool.filter(p => {
      const matchType = p.type === type;
      const matchIntensity = p.intensity === (intensity || Intensity.SOFT);
      return matchType && matchIntensity;
    });

    if (filtered.length === 0) {
      const next = getRandomPrompt(type, intensity || Intensity.SOFT);
      setPrompt(next);
      setHistory(prev => [next, ...prev]);
    } else {
      const pool = (filtered.length > 1 && prompt) ? filtered.filter(p => p.id !== prompt.id) : filtered;
      const next = pool[Math.floor(Math.random() * pool.length)];
      setPrompt(next);
      setHistory(prev => [next, ...prev]);
    }
  }, [activeDeckId, customDecks, intensity, prompt]);

  const saveDeck = useCallback((deck: CustomDeck) => {
    const sanitizedPrompts = deck.prompts.map(p => ({
      ...p,
      intensity: deck.intensity,
      type: deck.gameMode === GameMode.NEVER_HAVE_I_EVER ? ('NeverHaveIEver' as PromptType) : p.type
    }));

    const sanitizedDeck = { ...deck, prompts: sanitizedPrompts };

    setCustomDecks(prev => {
      const exists = prev.find(d => d.id === sanitizedDeck.id);
      if (exists) return prev.map(d => d.id === sanitizedDeck.id ? sanitizedDeck : d);
      return [...prev, sanitizedDeck];
    });
    setEditingDeck(null);
  }, []);

  const deleteDeck = useCallback((id: string) => {
    if (activeDeckId === id) setActiveDeckId('default');
    setCustomDecks(prev => prev.filter(d => d.id !== id));
  }, [activeDeckId]);

  const toggleFavoriteDeck = useCallback((id: string) => {
    setCustomDecks(prev => prev.map(d => d.id === id ? { ...d, isFavorite: !d.isFavorite } : d));
  }, []);

  const addNewPromptToEditingDeck = useCallback(() => {
    if (!editingDeck) return;
    const newPrompt: GamePrompt = {
      id: generateId(),
      type: editingDeck.gameMode === GameMode.NEVER_HAVE_I_EVER ? 'NeverHaveIEver' : 'Truth',
      intensity: editingDeck.intensity,
      text: '',
      penalty: ''
    };
    setEditingDeck({ ...editingDeck, prompts: [...editingDeck.prompts, newPrompt] });
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
  }, [editingDeck]);

  const handleSetTheme = useCallback((newTheme: Theme, isExplicit: boolean = true) => {
    setTheme(newTheme);
    if (isExplicit) {
      if (newTheme !== Theme.NONE) {
        setHasExplicitlySelectedTheme(true);
      } else {
        setHasExplicitlySelectedTheme(false);
      }
    }
  }, []);

  return {
    activeTab, setActiveTab,
    gameMode, setGameMode,
    intensity, setIntensity,
    prompt, setPrompt,
    history, setHistory,
    useEasyFont, setUseEasyFont,
    theme, setTheme: handleSetTheme,
    hasExplicitlySelectedTheme,
    view, setView,
    customDecks, setCustomDecks,
    activeDeckId, setActiveDeckId,
    editingDeck, setEditingDeck,
    handleDraw, saveDeck, deleteDeck,
    toggleFavoriteDeck,
    addNewPromptToEditingDeck,
    updatePromptInEditingDeck,
    removePromptFromEditingDeck,
    generateId,
    // Pass & Play Roster
    players, setPlayers,
    activePlayerIndex, setActivePlayerIndex,
    playersEnabled, setPlayersEnabled,
    activePlayer, targetPlayer,
    addPlayer, removePlayer, updatePlayerName,
    nextPlayer, prevPlayer,
    incrementChicken, incrementScore, resetRosterScores,
    // Countdown Timer
    timerEnabled, setTimerEnabled,
    timerDuration, setTimerDuration,
    toggleTimerEnabled
  };
};
