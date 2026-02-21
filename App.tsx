
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import { Intensity, PromptType, GamePrompt, CustomDeck } from './types';
import { getRandomPrompt, DEFAULT_PROMPTS } from './services/localPrompts';

const STAGES = [
  { id: Intensity.SOFT, title: 'TEASE', desc: 'STOLEN GLANCES', color: '#FFFFFF', text: '#000000' },
  { id: Intensity.HOT, title: 'REVEAL', desc: 'DEEP DESIRE', color: '#D80000', text: '#FFFFFF' },
  { id: Intensity.VULGAR, title: 'SURRENDER', desc: 'ZERO LIMITS', color: '#000000', text: '#FFFFFF' },
];

const generateId = () => Math.random().toString(36).substring(2, 11);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('play');
  const [intensity, setIntensity] = useState<Intensity | null>(null);
  const [prompt, setPrompt] = useState<GamePrompt | null>(null);
  const [history, setHistory] = useState<GamePrompt[]>([]);
  const [useEasyFont, setUseEasyFont] = useState(false);
  
  // Custom Deck States
  const [customDecks, setCustomDecks] = useState<CustomDeck[]>([]);
  const [activeDeckId, setActiveDeckId] = useState<string>('default');
  const [editingDeck, setEditingDeck] = useState<CustomDeck | null>(null);

  // Load Decks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('phantom_custom_decks');
    if (saved) {
      try {
        setCustomDecks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load custom decks", e);
      }
    }
  }, []);

  // Save Decks to localStorage
  useEffect(() => {
    localStorage.setItem('phantom_custom_decks', JSON.stringify(customDecks));
  }, [customDecks]);

  // Sync font class to body
  useEffect(() => {
    const body = document.getElementById('body-root');
    if (body) {
      if (useEasyFont) body.classList.add('use-easy-font');
      else body.classList.remove('use-easy-font');
    }
  }, [useEasyFont]);

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
      // Fallback if the custom deck doesn't have prompts for this level/type
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

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <AnimatePresence mode="wait">
        {/* STEAL (PLAY) TAB */}
        {activeTab === 'play' && (
          <motion.div key="play" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full">
            {!intensity && !prompt ? (
              <div className="space-y-4 pt-2">
                <div className="relative mb-4">
                  <motion.h2 className="font-p5-display text-4xl text-white italic tracking-tighter">SELECT SOURCE</motion.h2>
                  <div className="absolute -bottom-1 left-0 w-1/2 h-1 bg-white transform -skew-x-12"></div>
                </div>

                {/* Deck Selector */}
                <div className="flex flex-col gap-2 mb-6">
                  <button 
                    onClick={() => setActiveDeckId('default')}
                    className={`p-3 text-left shadow-[0_0_0_2px_black] transform -skew-x-6 transition-all ${activeDeckId === 'default' ? 'bg-white text-black' : 'bg-black text-white border-white/20 opacity-60'}`}
                  >
                    <span className="font-p5-display text-lg">★ PHANTOM DEFAULT</span>
                  </button>
                  {customDecks.map(deck => (
                    <button 
                      key={deck.id}
                      onClick={() => setActiveDeckId(deck.id)}
                      className={`p-3 text-left shadow-[0_0_0_2px_black,4px_4px_0px_#D80000] transform -skew-x-6 transition-all ${activeDeckId === deck.id ? 'bg-white text-black' : 'bg-black text-white border-white/20 opacity-60'}`}
                    >
                      <span className="font-p5-display text-lg">{deck.name.toUpperCase()}</span>
                      <span className="block text-[8px] opacity-60">{deck.prompts.length} CARDS FORGED</span>
                    </button>
                  ))}
                </div>

                <div className="relative mb-4 mt-8">
                  <h2 className="font-p5-display text-4xl text-white italic tracking-tighter">SELECT TARGET</h2>
                  <div className="absolute -bottom-1 left-0 w-1/2 h-1 bg-[#D80000] transform -skew-x-12"></div>
                </div>

                <div className="flex flex-col gap-3">
                  {STAGES.map((stage, i) => (
                    <motion.button
                      key={stage.id}
                      whileHover={{ x: 10 }}
                      onClick={() => setIntensity(stage.id)}
                      className="group relative flex items-center justify-between p-4 overflow-hidden transform -skew-x-12 shadow-[0_0_0_3px_black,4px_4px_0px_rgba(0,0,0,0.5)]"
                      style={{ backgroundColor: stage.color, color: stage.text }}
                    >
                      <div className="flex flex-col text-left transform skew-x-12">
                        <span className="font-p5-display text-3xl leading-none italic">{stage.title}</span>
                        <span className="text-[9px] font-black tracking-widest uppercase opacity-70 mt-1">{stage.desc}</span>
                      </div>
                      <span className="font-p5-display text-4xl opacity-10 transform skew-x-12">0{i+1}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : !prompt ? (
              <div className="flex flex-col items-center gap-8 pt-6">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                  <p className="font-p5-display text-lg text-[#D80000] tracking-widest">MISSION_PARAMS</p>
                  <h2 className="font-p5-display text-5xl text-white italic tracking-tighter drop-shadow-[3px_3px_0px_#D80000]">
                    {intensity}
                  </h2>
                </motion.div>
                <div className="grid grid-cols-1 gap-4 w-full px-4">
                  <button onClick={() => handleDraw('Truth')} className="bg-white text-black p-5 transform -skew-x-6 shadow-[0_0_0_3px_black,6px_6px_0px_rgba(0,0,0,1)] font-p5-display text-3xl italic">THE TRUTH</button>
                  <button onClick={() => handleDraw('Dare')} className="bg-[#D80000] text-white p-5 transform skew-x-6 shadow-[0_0_0_3px_black,6px_6px_0px_rgba(0,0,0,1)] font-p5-display text-3xl italic">THE ACTION</button>
                  <button onClick={() => setIntensity(null)} className="mt-4 font-black text-white/30 uppercase tracking-[0.3em] text-[8px] hover:text-[#D80000] transition-colors">[ ABORT ]</button>
                </div>
              </div>
            ) : (
              <motion.div key="calling-card" initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="relative mt-4">
                <div className="bg-white text-black p-6 shadow-[0_0_0_6px_black,10px_10px_0px_rgba(216,0,0,1)] relative z-20 overflow-hidden">
                  <div className="flex justify-between items-center mb-6">
                    <span className="bg-[#D80000] text-white px-3 py-1 font-p5-display text-xl skew-x-[-12deg] shadow-[0_0_0_2px_black]">{prompt.type}</span>
                    <div className="text-black font-black text-xs italic opacity-40">ENTRY_{history.length}</div>
                  </div>
                  <p className="font-p5-display text-3xl italic leading-tight mb-8">"{prompt.text}"</p>
                  <div className="mt-6 pt-4 border-t-[3px] border-black border-dashed">
                    <p className="font-p5-display text-lg text-[#D80000] mb-1">PENALTY_LOG</p>
                    <p className="font-bold text-[10px] uppercase italic opacity-80">{prompt.penalty}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-8 px-2 relative z-30">
                  <button onClick={() => setPrompt(null)} className="p5-btn bg-white text-black">DONE</button>
                  <button onClick={() => handleDraw(prompt.type)} className="p5-btn bg-[#D80000] text-white">RE-EXEC</button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* DECKS (MANAGEMENT) TAB */}
        {activeTab === 'decks' && (
          <motion.div key="decks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-2 space-y-6">
            {!editingDeck ? (
              <>
                <div className="flex justify-between items-end">
                  <h2 className="font-p5-display text-5xl italic text-white drop-shadow-[3px_3px_0px_#D80000]">FORGE</h2>
                  <button 
                    onClick={() => setEditingDeck({ id: generateId(), name: '', description: '', prompts: [], isCustom: true })}
                    className="p5-btn !bg-white !text-black border-black mb-1"
                  >
                    + NEW
                  </button>
                </div>
                
                <div className="flex flex-col gap-4">
                  {customDecks.length === 0 ? (
                    <div className="py-12 text-center opacity-20 italic font-p5-display text-2xl">NO_CUSTOM_DECKS</div>
                  ) : (
                    customDecks.map(deck => (
                      <div key={deck.id} className="p-4 bg-white text-black shadow-[0_0_0_3px_black] transform -skew-x-6 relative group">
                        <div className="absolute top-0 right-0 w-12 h-12 bg-[#D80000] opacity-5 rotate-45 translate-x-6 -translate-y-6"></div>
                        <h3 className="font-p5-display text-2xl mb-1">{deck.name || 'UNTITLED'}</h3>
                        <p className="text-[10px] font-bold opacity-60 mb-3 uppercase tracking-wider">{deck.description || 'NO DESCRIPTION'}</p>
                        <div className="flex gap-2">
                          <button onClick={() => setEditingDeck(deck)} className="px-3 py-1 bg-black text-white text-[10px] font-black uppercase skew-x-6">EDIT</button>
                          <button onClick={() => deleteDeck(deck.id)} className="px-3 py-1 bg-[#D80000] text-white text-[10px] font-black uppercase skew-x-6">DELETE</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <div className="space-y-6 pb-20">
                <div className="bg-white text-black p-4 shadow-[0_0_0_4px_black] transform -skew-x-3">
                  <label className="block text-[10px] font-black uppercase mb-1">DECK_TITLE</label>
                  <input 
                    className="w-full bg-transparent border-b-2 border-black font-p5-display text-3xl focus:outline-none"
                    value={editingDeck.name}
                    onChange={(e) => setEditingDeck({ ...editingDeck, name: e.target.value })}
                    placeholder="NAME THE OBSIDIAN..."
                  />
                  <label className="block text-[10px] font-black uppercase mt-4 mb-1">DESCRIPTION</label>
                  <textarea 
                    className="w-full bg-transparent border-b-2 border-black text-xs font-bold focus:outline-none"
                    value={editingDeck.description}
                    onChange={(e) => setEditingDeck({ ...editingDeck, description: e.target.value })}
                    placeholder="WHAT IS THE PURPOSE OF THIS DECK?"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-p5-display text-2xl text-white">PROMPTS ({editingDeck.prompts.length})</h3>
                    <button onClick={addNewPromptToEditingDeck} className="p5-btn !bg-[#D80000] !text-white">+ ADD PROMPT</button>
                  </div>

                  <div className="space-y-4">
                    {editingDeck.prompts.map((p, idx) => (
                      <div key={p.id} className="bg-white/10 p-4 border-l-4 border-[#D80000] space-y-3">
                        <div className="flex gap-2">
                          <select 
                            className="bg-black text-white text-[10px] font-bold p-1"
                            value={p.type}
                            onChange={(e) => updatePromptInEditingDeck(p.id, 'type', e.target.value)}
                          >
                            <option>Truth</option>
                            <option>Dare</option>
                          </select>
                          <select 
                            className="bg-black text-white text-[10px] font-bold p-1"
                            value={p.intensity}
                            onChange={(e) => updatePromptInEditingDeck(p.id, 'intensity', e.target.value)}
                          >
                            <option value={Intensity.SOFT}>SOFT</option>
                            <option value={Intensity.HOT}>HOT</option>
                            <option value={Intensity.VULGAR}>VULGAR</option>
                          </select>
                          <button onClick={() => removePromptFromEditingDeck(p.id)} className="ml-auto text-[#D80000] font-black text-[10px]">REMOVE</button>
                        </div>
                        <input 
                          className="w-full bg-transparent border-b border-white/20 text-sm italic py-1 focus:outline-none focus:border-white"
                          value={p.text}
                          onChange={(e) => updatePromptInEditingDeck(p.id, 'text', e.target.value)}
                          placeholder="PROMPT TEXT..."
                        />
                        <input 
                          className="w-full bg-transparent border-b border-white/20 text-[10px] py-1 focus:outline-none focus:border-[#D80000]"
                          value={p.penalty}
                          onChange={(e) => updatePromptInEditingDeck(p.id, 'penalty', e.target.value)}
                          placeholder="PENALTY FOR COWARDICE..."
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="fixed bottom-24 left-0 w-full px-6 flex gap-3 z-[110]">
                  <button onClick={() => setEditingDeck(null)} className="p5-btn w-1/2 !bg-black !text-white !border-white/20">CANCEL</button>
                  <button onClick={() => saveDeck(editingDeck)} className="p5-btn w-1/2 !bg-white !text-black">SAVE DECK</button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* LOGS TAB */}
        {activeTab === 'history' && (
          <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-2 space-y-4">
            <h2 className="font-p5-display text-5xl italic text-white drop-shadow-[3px_3px_0px_#D80000]">ARCHIVES</h2>
            <div className="flex flex-col gap-3 pb-8">
              {history.length === 0 ? <div className="py-16 text-center font-p5-display text-2xl opacity-10">EMPTY_LOG</div> : 
                history.map((item, i) => (
                  <motion.div key={i} className="p-3 bg-white text-black shadow-[0_0_0_3px_black] transform -skew-x-6">
                    <div className="flex justify-between text-[8px] font-black uppercase text-[#D80000] mb-1">
                      <span>{item.type}</span>
                      <span>LOG_0{history.length - i}</span>
                    </div>
                    <p className="text-xs font-bold italic">"{item.text}"</p>
                  </motion.div>
                ))
              }
            </div>
          </motion.div>
        )}

        {/* META TAB */}
        {activeTab === 'settings' && (
          <motion.div key="meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-2 space-y-6">
            <h2 className="font-p5-display text-5xl italic text-white drop-shadow-[3px_3px_0px_#D80000]">SYSTEM</h2>
            <div className="space-y-3">
              {[ { label: 'HEART_SYNC', val: 'STABLE' }, { label: 'COGNITION', val: 'ENHANCED' }, { label: 'MASK_ID', val: 'JOKER' }].map((s, i) => (
                <div key={i} className="flex justify-between items-center p-3.5 bg-black border-2 border-white/10 transform skew-x-12">
                  <span className="font-p5-display text-lg text-white transform skew-x-[-12deg]">{s.label}</span>
                  <span className="font-black text-[9px] text-[#D80000] transform skew-x-[-12deg]">{s.val}</span>
                </div>
              ))}
              <button onClick={() => setUseEasyFont(!useEasyFont)} className="w-full flex justify-between items-center p-3.5 bg-white text-black shadow-[0_0_0_2px_black] transform -skew-x-12 hover:bg-[#D80000] hover:text-white transition-colors">
                <span className="font-p5-display text-lg transform skew-x-[12deg]">EASY_READ_FONT</span>
                <span className="font-black text-[9px] transform skew-x-[12deg]">{useEasyFont ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default App;
