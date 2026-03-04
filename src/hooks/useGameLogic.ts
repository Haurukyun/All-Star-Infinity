
import { useState, useEffect } from 'react';
import { Intensity, PromptType, GamePrompt, CustomDeck, Theme, GameMode } from '../types';
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
  const [view, setView] = useState<'menu' | 'game'>('menu');
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


  // Save Decks to localStorage
  useEffect(() => {
    localStorage.setItem('phantom_custom_decks', JSON.stringify(customDecks));
  }, [customDecks]);

  // Save Theme to localStorage
  useEffect(() => {
    localStorage.setItem('phantom_theme', theme);
  }, [theme]);

  // Reset active deck if it no longer matches the current context
  useEffect(() => {
    if (activeDeckId !== 'default') {
      const selected = customDecks.find(d => d.id === activeDeckId);
      if (selected && (selected.intensity !== intensity || selected.gameMode !== gameMode)) {
        setActiveDeckId('default');
      }
    }
  }, [intensity, gameMode, customDecks, activeDeckId]);

  const handleDraw = (type: PromptType) => {
    let sourcePool = DEFAULT_PROMPTS;
    let currentDeck: CustomDeck | undefined;

    if (activeDeckId !== 'default') {
      currentDeck = customDecks.find(d => d.id === activeDeckId);
      if (currentDeck && currentDeck.prompts.length > 0) {
        sourcePool = currentDeck.prompts;
      }
    }

    // Filter by intensity and type. 
    // If it's a custom deck, we assume the deck already matches the active game state per the auto-reset effect.
    const filtered = sourcePool.filter(p => {
      const matchType = p.type === type;
      // If no intensity is set in logic, default to SOFT
      const matchIntensity = p.intensity === (intensity || Intensity.SOFT);
      return matchType && matchIntensity;
    });

    if (filtered.length === 0) {
      // Fallback to random prompt from defaults if the filtered pool is empty
      const next = getRandomPrompt(type, intensity || Intensity.SOFT);
      setPrompt(next);
      setHistory(prev => [next, ...prev]);
    } else {
      const next = filtered[Math.floor(Math.random() * filtered.length)];
      setPrompt(next);
      setHistory(prev => [next, ...prev]);
    }
  };

  const saveDeck = (deck: CustomDeck) => {
    // Force all prompts in the deck to match the deck's intensity and appropriate game mode
    const sanitizedPrompts = deck.prompts.map(p => ({
      ...p,
      intensity: deck.intensity,
      type: deck.gameMode === GameMode.NEVER_HAVE_I_EVER ? 'NeverHaveIEver' : p.type
    }));

    const sanitizedDeck = { ...deck, prompts: sanitizedPrompts };

    setCustomDecks(prev => {
      const exists = prev.find(d => d.id === sanitizedDeck.id);
      if (exists) return prev.map(d => d.id === sanitizedDeck.id ? sanitizedDeck : d);
      return [...prev, sanitizedDeck];
    });
    setEditingDeck(null);
  };

  const deleteDeck = (id: string) => {
    if (activeDeckId === id) setActiveDeckId('default');
    setCustomDecks(prev => prev.filter(d => d.id !== id));
  };

  const toggleFavoriteDeck = (id: string) => {
    setCustomDecks(prev => prev.map(d => d.id === id ? { ...d, isFavorite: !d.isFavorite } : d));
  };

  const addNewPromptToEditingDeck = () => {
    if (!editingDeck) return;
    const newPrompt: GamePrompt = {
      id: generateId(),
      type: editingDeck.gameMode === GameMode.NEVER_HAVE_I_EVER ? 'NeverHaveIEver' : 'Truth',
      intensity: editingDeck.intensity,
      text: '',
      penalty: ''
    };
    setEditingDeck({ ...editingDeck, prompts: [...editingDeck.prompts, newPrompt] });
  };

  const updatePromptInEditingDeck = (id: string, field: 'text' | 'penalty' | 'type', value: string | PromptType) => {
    if (!editingDeck) return;
    setEditingDeck({
      ...editingDeck,
      prompts: editingDeck.prompts.map(p => {
        if (p.id === id) {
          // If editing type in TOD mode, it must be Truth or Dare
          if (field === 'type' && editingDeck.gameMode === GameMode.TRUTH_OR_DARE) {
            if (value !== 'Truth' && value !== 'Dare') return p;
          }
          // If editing type in NHIE mode, it's locked to NHIE
          if (field === 'type' && editingDeck.gameMode === GameMode.NEVER_HAVE_I_EVER) {
            return { ...p, type: 'NeverHaveIEver' };
          }
          return { ...p, [field]: value };
        }
        return p;
      })
    });
  };

  const removePromptFromEditingDeck = (id: string) => {
    if (!editingDeck) return;
    setEditingDeck({
      ...editingDeck,
      prompts: editingDeck.prompts.filter(p => p.id !== id)
    });
  };

  const handleSetTheme = (newTheme: Theme, isExplicit: boolean = true) => {
    setTheme(newTheme);
    if (isExplicit) {
      if (newTheme !== Theme.NONE) {
        setHasExplicitlySelectedTheme(true);
      } else {
        setHasExplicitlySelectedTheme(false);
      }
    }
  };

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
    generateId
  };
};
