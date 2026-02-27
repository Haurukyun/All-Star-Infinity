
import { useState, useEffect } from 'react';
import { Intensity, PromptType, GamePrompt, CustomDeck, Theme } from '../types';
import { getRandomPrompt, DEFAULT_PROMPTS } from '../services/localPrompts';

const generateId = () => Math.random().toString(36).substring(2, 11);

export const useGameLogic = () => {
  const [activeTab, setActiveTab] = useState('play');
  const [intensity, setIntensity] = useState<Intensity | null>(null);
  const [prompt, setPrompt] = useState<GamePrompt | null>(null);
  const [history, setHistory] = useState<GamePrompt[]>([]);
  const [useEasyFont, setUseEasyFont] = useState(true);
  const [theme, setTheme] = useState<Theme>(Theme.NONE);
  const [view, setView] = useState<'menu' | 'game'>('menu');
  
  // Custom Deck States
  const [customDecks, setCustomDecks] = useState<CustomDeck[]>(() => {
    const saved = localStorage.getItem('phantom_custom_decks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });
  const [activeDeckId, setActiveDeckId] = useState<string>('default');
  const [editingDeck, setEditingDeck] = useState<CustomDeck | null>(null);
  const [hasExplicitlySelectedTheme, setHasExplicitlySelectedTheme] = useState(false);

  // Load Theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('phantom_theme');
    if (savedTheme && Object.values(Theme).includes(savedTheme as Theme) && savedTheme !== Theme.NONE) {
      setTheme(savedTheme as Theme);
    }
  }, []);

  // Save Decks to localStorage
  useEffect(() => {
    localStorage.setItem('phantom_custom_decks', JSON.stringify(customDecks));
  }, [customDecks]);

  // Save Theme to localStorage
  useEffect(() => {
    localStorage.setItem('phantom_theme', theme);
  }, [theme]);

  const handleDraw = (type: PromptType) => {
    let sourcePool = DEFAULT_PROMPTS;
    if (activeDeckId !== 'default') {
      const selected = customDecks.find(d => d.id === activeDeckId);
      if (selected && selected.prompts.length > 0) {
        sourcePool = selected.prompts;
      }
    }

    const filtered = sourcePool.filter(p => p.type === type && p.intensity === (intensity || Intensity.SOFT));
    
    if (filtered.length === 0) {
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
    setCustomDecks(prev => {
      const exists = prev.find(d => d.id === deck.id);
      if (exists) return prev.map(d => d.id === deck.id ? deck : d);
      return [...prev, deck];
    });
    setEditingDeck(null);
  };

  const deleteDeck = (id: string) => {
    if (activeDeckId === id) setActiveDeckId('default');
    setCustomDecks(prev => prev.filter(d => d.id !== id));
  };

  const addNewPromptToEditingDeck = () => {
    if (!editingDeck) return;
    const newPrompt: GamePrompt = {
      id: generateId(),
      type: 'Truth',
      intensity: Intensity.SOFT,
      text: '',
      penalty: ''
    };
    setEditingDeck({ ...editingDeck, prompts: [...editingDeck.prompts, newPrompt] });
  };

  const updatePromptInEditingDeck = (id: string, field: keyof GamePrompt, value: any) => {
    if (!editingDeck) return;
    setEditingDeck({
      ...editingDeck,
      prompts: editingDeck.prompts.map(p => p.id === id ? { ...p, [field]: value } : p)
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
    addNewPromptToEditingDeck,
    updatePromptInEditingDeck,
    removePromptFromEditingDeck,
    generateId
  };
};
