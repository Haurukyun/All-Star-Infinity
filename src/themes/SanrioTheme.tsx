import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, Theme, ThemeDefinition, GameMode, CustomDeck } from '../types';
import { allThemesList } from './allThemesList';
import { DeckCarousel } from '../components/DeckCarousel';
import { DeckSearchModal } from '../components/DeckSearchModal';
import { ThemedIntensitySelect } from '../components/ThemedIntensitySelect';

const STAGES = [
  { id: Intensity.SOFT, title: 'HELLO KITTY', desc: 'SWEET GARDEN', color: '#B3E5FC', secondary: '#29B6F6', icon: '🎀' },
  { id: Intensity.HOT, title: 'MY MELODY', desc: 'BERRY FOREST', color: '#F8BBD0', secondary: '#EC407A', icon: '🍓' },
  { id: Intensity.VULGAR, title: 'KUROMI', desc: 'GOTHIC PARTY', color: '#E1BEE7', secondary: '#AB47BC', icon: '💀' },
];

export const SanrioLayout: React.FC<{ children: React.ReactNode; activeTab: string; setActiveTab: (tab: string) => void; logic: any }> = ({ children, activeTab, setActiveTab }) => {
  const [sparkles, setSparkles] = useState<{ id: number, x: number, y: number, size: number, delay: number }[]>([]);

  useEffect(() => {
    // Generate initial static sparkles and clouds for the background
    const items = [];
    for (let i = 0; i < 20; i++) {
      items.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        delay: Math.random() * 2
      });
    }
    setSparkles(items);
  }, []);

  const tabs = [
    { id: 'play', label: 'ADVENTURE' },
    { id: 'decks', label: 'OUTFITS' },
    { id: 'history', label: 'MEMO' },
    { id: 'themes', label: 'WORLD' },
    { id: 'settings', label: 'PROFILE' },
  ];

  return (
    <div className="sanrio-theme h-[100dvh] w-screen flex flex-col bg-gradient-to-b from-[#FFB3D9] via-[#E6C3F8] to-[#FFD8B1] text-[#7B4B94] overflow-hidden font-['Nunito'] relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@800;900&display=swap');
        .sanrio-theme {
          font-family: 'Nunito', sans-serif;
          position: relative;
        }
        
        /* Fluffy cloud overlay */
        .sanrio-theme::after {
            content: '';
            position: absolute;
            bottom: 0; left: 0; right: 0; height: 15vh;
            background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M0,40 C150,120 350,0 500,40 C650,80 850,0 1000,40 C1150,80 1200,60 1200,60 L1200,120 L0,120 Z" fill="%23FFFFFF" opacity="0.4"></path></svg>') no-repeat bottom;
            background-size: cover;
            pointer-events: none;
            z-index: 1;
        }

        .sanrio-panel {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 40px;
          box-shadow: 0 10px 25px rgba(255, 105, 180, 0.15), inset 0 0 0 4px white;
          position: relative;
          padding: 24px;
        }

        .sanrio-title {
            color: white;
            font-weight: 900;
            text-transform: uppercase;
            -webkit-text-stroke: 1.5px #7B4B94;
            text-shadow: 0 4px 0px #FF94D1, 0 6px 12px rgba(255,105,180,0.5);
            letter-spacing: 1px;
        }

        .sanrio-button {
          background: #4DD0E1; /* Cyan Base */
          color: white;
          padding: 16px 28px;
          border-radius: 9999px; /* Pill shape */
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-weight: 900;
          font-size: 1.1rem;
          border: 4px solid white;
          box-shadow: 0 6px 0px #00ACC1, 0 10px 15px rgba(0, 172, 193, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          text-transform: uppercase;
          text-shadow: 1px 1px 0px rgba(0,0,0,0.2);
        }
        
        .sanrio-button.pink {
            background: #FF69B4;
            box-shadow: 0 6px 0px #D81B60, 0 10px 15px rgba(216, 27, 96, 0.3);
        }
        
        .sanrio-button.yellow {
            background: #FFCA28;
            box-shadow: 0 6px 0px #FF8F00, 0 10px 15px rgba(255, 143, 0, 0.3);
            color: #7B4B94;
            text-shadow: none;
        }

        .sanrio-button:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 10px 0px #00ACC1, 0 15px 20px rgba(0, 172, 193, 0.4);
        }
        .sanrio-button.pink:hover { box-shadow: 0 10px 0px #D81B60, 0 15px 20px rgba(216, 27, 96, 0.4); }
        .sanrio-button.yellow:hover { box-shadow: 0 10px 0px #FF8F00, 0 15px 20px rgba(255, 143, 0, 0.4); }

        .sanrio-button:active {
          transform: translateY(4px);
          box-shadow: 0 2px 0px #00ACC1;
        }
        .sanrio-button.pink:active { box-shadow: 0 2px 0px #D81B60; }
        .sanrio-button.yellow:active { box-shadow: 0 2px 0px #FF8F00; }

        .sanrio-button.active {
          background: #26C6DA;
          box-shadow: inset 0 4px 8px rgba(0,0,0,0.2);
          transform: translateY(4px);
        }

        .sanrio-nav-btn {
          background: white;
          border: 3px solid #E1BEE7;
          border-radius: 24px;
          color: #AB47BC;
          font-weight: 800;
          font-size: 11px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 8px 0;
          box-shadow: 0 4px 0px #E1BEE7;
        }
        
        .sanrio-nav-btn.active {
          background: #FF69B4;
          border-color: white;
          color: white;
          transform: scale(1.15) translateY(-5px);
          box-shadow: 0 6px 0px rgba(216,27,96,0.8), 0 10px 15px rgba(255,105,180,0.4);
        }

        .star-sparkle {
          position: absolute;
          z-index: 0;
          color: white;
          opacity: 0.6;
          animation: float 6s ease-in-out infinite alternate;
        }

        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.4; }
          100% { transform: translateY(-30px) rotate(15deg); opacity: 0.9; }
        }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Background Decorative Sparkles */}
      {sparkles.map(s => (
        <div key={s.id} className="star-sparkle font-black text-white drop-shadow-md" style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: `${s.size}px`, animationDelay: `${s.delay}s` }}>
          {s.id % 3 === 0 ? '✨' : s.id % 2 === 0 ? '☁️' : '🌸'}
        </div>
      ))}

      <header className="pt-10 pb-4 flex justify-center items-center shrink-0 relative z-20">
        <h1 className="text-4xl sanrio-title tracking-widest text-center px-4 leading-tight">
          ISLAND<br />ADVENTURE
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-28 relative z-20 no-scrollbar">
        {children}
      </main>

      {/* Dock Navigation */}
      <div className="absolute bottom-6 left-6 right-6 z-30">
        <div className="bg-white/90 backdrop-blur-md rounded-[40px] p-3 shadow-[0_10px_25px_rgba(123,75,148,0.2)] border-4 border-white flex justify-between gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`sanrio-nav-btn flex-1 ${activeTab === tab.id ? 'active' : ''}`}
            >
              <div className="text-2xl mb-1 drop-shadow-sm">
                {tab.id === 'play' ? '🎀' : tab.id === 'decks' ? '👗' : tab.id === 'history' ? '📝' : tab.id === 'themes' ? '✈️' : '💌'}
              </div>
              <span className="truncate w-full text-center px-1 tracking-wider">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SanrioIntensitySelector: React.FC<{ logic: any }> = ({ logic }) => {
  const { setIntensity } = logic;
  return (
    <div className="h-full flex flex-col justify-center space-y-6">
      <h2 className="sanrio-title text-3xl text-center mb-2">FRIENDSHIP LEVEL</h2>
      <div className="space-y-4">
        {STAGES.map((ObjectDef: any) => {
          return (
            <button
              key={ObjectDef.id}
              onClick={() => setIntensity(ObjectDef.id as Intensity)}
              className="w-full relative overflow-hidden sanrio-panel hover:scale-105 transition-transform flex items-center p-4 group border-4 border-white border-l-[#FF69B4] border-l-8"
              style={{ borderLeftColor: ObjectDef?.secondary || '#FF69B4' }}
            >
              <div className="text-5xl mr-5 bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-sm drop-shadow-sm">{ObjectDef?.icon}</div>
              <div className="text-left flex-1">
                <h3 className="text-2xl font-black mb-1 drop-shadow-sm" style={{ color: ObjectDef?.secondary }}>{ObjectDef?.title}</h3>
                <p className="text-[#A188A6] font-bold text-sm tracking-widest">{ObjectDef?.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const SanrioPromptTypeSelector: React.FC<{ logic: any }> = ({ logic }) => {
  const { intensity, setIntensity, handleDraw, activeDeckId, setActiveDeckId, customDecks, setGameMode, gameMode } = logic;
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="h-full flex flex-col justify-center space-y-4">
      <h2 className="sanrio-title text-3xl text-center">LEVEL: {intensity}</h2>

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-4">
        <div className="sanrio-panel text-center">
          <h3 className="text-xl font-black text-[#7B4B94] mb-2">CHOOSE ACTIVITY</h3>

          <div className="w-full mb-6">
            <DeckCarousel
              decks={customDecks.filter(d => d.intensity === intensity)}
              activeDeckId={activeDeckId}
              onSelect={setActiveDeckId}
              variant="sanrio"
              accentColor="#FF69B4"
            />
          </div>

          <div className="flex gap-4">
            {gameMode === GameMode.NEVER_HAVE_I_EVER ? (
              <button onClick={() => handleDraw('NeverHaveIEver')} className="sanrio-button pink flex-1 h-32 flex-col justify-center text-xl">
                <span className="text-4xl">🤫</span>
                CONFESS
              </button>
            ) : (
              <>
                <button onClick={() => handleDraw('Truth')} className="sanrio-button pink flex-1 h-32 flex-col justify-center text-xl">
                  <span className="text-4xl">🌸</span>
                  TRUTH
                </button>
                <button onClick={() => handleDraw('Dare')} className="sanrio-button yellow flex-1 h-32 flex-col justify-center text-xl">
                  <span className="text-4xl">🔥</span>
                  DARE
                </button>
              </>
            )}
          </div>
        </div>
        <button onClick={() => setIntensity(null)} className="sanrio-button w-full h-14 bg-white text-[#7B4B94] shadow-sm text-sm border-2">
          GO BACK ↩
        </button>
      </motion.div>

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
          accent: '#FF69B4',
          bg: '#FFF0F5',
          textColor: '#7B4B94',
          borderColor: '#FFB6C1'
        }}
      />
    </div>
  );
};

export const SanrioPromptLayout: React.FC<{ children: React.ReactNode; logic: any }> = ({ children, logic }) => {
  const { prompt } = logic;
  return (
    <div className="h-full flex flex-col justify-center space-y-6">
      <motion.div initial={{ scale: 0.8, y: 50, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} className="sanrio-panel text-center flex flex-col items-center p-8">
        <div className="text-5xl mb-4 bg-white w-20 h-20 rounded-full flex items-center justify-center border-4 border-[#FF69B4] shadow-sm">
          {prompt?.type === 'Truth' ? '🌸' : (prompt?.type === 'NeverHaveIEver' ? '🤫' : '🔥')}
        </div>
        <h2 className="text-3xl font-black text-[#FF69B4] mb-6 uppercase tracking-wider">{prompt?.type}</h2>
        <p className="text-2xl text-[#7B4B94] font-black leading-snug">"{prompt?.text}"</p>

        {prompt?.penalty && (
          <div className="mt-8 pt-6 border-t-[3px] border-dashed border-[#FFB6C1] w-full">
            <h4 className="text-lg font-black text-[#FF69B4] tracking-widest uppercase mb-2">🎈 Penalty 🎈</h4>
            <p className="text-xl text-[#7B4B94] font-bold opacity-80">{prompt.penalty}</p>
          </div>
        )}
      </motion.div>

      <div className="flex flex-col gap-4 mt-8">
        {children}
      </div>
    </div>
  );
};

export const SanrioPlayButton: React.FC<{ label: string; onClick: () => void; isPrimary?: boolean }> = ({ label, onClick, isPrimary }) => {
  return (
    <button onClick={onClick} className={`sanrio-button w-full py-5 text-xl ${isPrimary ? 'yellow' : 'pink'}`}>
      <span>{label} {isPrimary ? '🎁' : '🔄'}</span>
    </button>
  );
};

export const SanrioDecksScreen: React.FC<{ logic: any }> = ({ logic }) => {
  const { customDecks, activeDeckId, setActiveDeckId, editingDeck, setEditingDeck, saveDeck, generateId, addNewPromptToEditingDeck, updatePromptInEditingDeck, removePromptFromEditingDeck } = logic;

  const [isIntensitySelectOpen, setIsIntensitySelectOpen] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!editingDeck ? (
        <motion.div key="list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="sanrio-title text-3xl">WARDROBE</h2>
            <button
              onClick={() => setIsIntensitySelectOpen(true)}
              className="bg-white text-[#FF69B4] px-4 py-2 rounded-full font-black text-xs border-4 border-[#FF69B4] shadow-sm hover:scale-105 active:scale-95 transition-all"
            >
              + NEW LOOK
            </button>
          </div>
          <div className="space-y-4">
            {customDecks.length === 0 ? (
              <div className="sanrio-panel py-16 text-center text-[#A188A6] font-bold italic border-dashed border-[#E1BEE7]">No outfits in your closet...</div>
            ) : (
              customDecks.map((deck: any) => (
                <div key={deck.id} className={`sanrio-panel flex items-center p-5 group transition-all ${activeDeckId === deck.id ? 'border-[#4DD0E1] bg-[#F0FBFC]' : ''}`}>
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-black text-[#7B4B94] mb-1 flex items-center gap-2">
                      {activeDeckId === deck.id && <span className="text-sm">🌟</span>}
                      {deck.name || 'Cozy Outfit'}
                    </h3>
                    <div className="flex gap-2">
                      <div className="text-[9px] text-[#A188A6] font-black tracking-widest border-2 border-[#E1BEE7] bg-white inline-block px-3 py-1 rounded-full uppercase">
                        {deck.prompts.length} PIECES
                      </div>
                      <div className="text-[9px] text-white font-black tracking-widest bg-[#FFB6C1] inline-block px-3 py-1 rounded-full uppercase">
                        {deck.intensity}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveDeckId(deck.id)}
                      className={`sanrio-button !py-2 !px-4 !text-xs !shadow-sm ${activeDeckId === deck.id ? '!bg-[#4DD0E1]' : '!bg-white !text-[#4DD0E1]'}`}
                    >
                      {activeDeckId === deck.id ? 'ON' : 'LOAD'}
                    </button>
                    <div className="flex flex-col gap-1">
                      <button onClick={() => setEditingDeck(deck)} className="text-[#A188A6] hover:text-[#FF69B4] text-[10px] font-black uppercase tracking-tighter transition-colors">EDIT</button>
                      <button onClick={() => logic.deleteDeck(deck.id)} className="text-[#A188A6] hover:text-red-400 text-[10px] font-black uppercase tracking-tighter transition-colors">DROP</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div key="editor" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="space-y-6">
          <div className="relative">
            <div className="absolute -top-6 -right-2 text-4xl animate-bounce">🎀</div>
            <input
              type="text"
              value={editingDeck.name}
              onChange={(e) => setEditingDeck({ ...editingDeck, name: e.target.value })}
              className="w-full text-2xl font-black text-[#7B4B94] bg-white border-4 border-white shadow-[0_6px_0_#FFB3D9] rounded-[40px] p-6 text-center focus:outline-none focus:shadow-[0_8px_0_#FFB3D9] transition-all"
              placeholder="NAME YOUR STYLE..."
            />
          </div>

          <div className="sanrio-panel p-6 space-y-6">
            <textarea
              value={editingDeck.description}
              onChange={(e) => setEditingDeck({ ...editingDeck, description: e.target.value })}
              className="w-full bg-[#FAFAFA] rounded-[30px] p-4 text-sm font-bold text-[#7B4B94] h-24 outline-none resize-none border-4 border-transparent focus:border-[#F8BBD0] transition-colors shadow-inner"
              placeholder="Describe this magical look..."
            />

            <div className="flex gap-4">
              <div className="flex-1 space-y-1">
                <label className="text-[10px] font-black text-[#FF69B4] pl-4 uppercase tracking-widest">Adventure Type</label>
                <div className="w-full bg-white border-4 border-[#F8BBD0] rounded-full p-3 text-xs font-black text-[#7B4B94] text-center">
                  {editingDeck.gameMode === GameMode.TRUTH_OR_DARE ? 'PARTY (T/D)' : 'GOSSIP (NHIE)'}
                </div>
              </div>
              <div className="flex-1 space-y-1">
                <label className="text-[10px] font-black text-[#FF69B4] pl-4 uppercase tracking-widest">Sweetness</label>
                <div className="w-full bg-white border-4 border-[#F8BBD0] rounded-full p-3 text-xs font-black text-[#7B4B94] text-center uppercase">
                  {editingDeck.intensity}
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t-4 border-[#FFF0F5]">
              <div className="flex justify-between items-center px-2">
                <span className="font-black text-[#7B4B94] text-lg">ACCESSORIES ({editingDeck.prompts.length})</span>
                <button onClick={addNewPromptToEditingDeck} className="bg-[#FF69B4] text-white px-4 py-2 rounded-full font-black text-[10px] border-4 border-white shadow-sm hover:scale-110 active:scale-95 transition-all uppercase">+ ADD PIECE</button>
              </div>

              <div className="max-h-[35vh] overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {editingDeck.prompts.map((p: any) => (
                  <div key={p.id} className="bg-white border-4 border-[#FFF0F5] rounded-[25px] p-4 space-y-3 shadow-sm hover:shadow-md transition-shadow relative group">
                    <div className="flex items-center gap-3">
                      {editingDeck.gameMode === GameMode.TRUTH_OR_DARE ? (
                        <div className="flex gap-2 flex-1">
                          <button
                            onClick={() => updatePromptInEditingDeck(p.id, 'type', 'Truth')}
                            className={`flex-1 text-[10px] font-black rounded-full px-4 py-1.5 transition-all border-2 ${p.type === 'Truth' ? 'bg-[#FF69B4] text-white border-white' : 'bg-[#FCE4EC] text-[#D81B60] border-transparent'}`}
                          >
                            TRUTH
                          </button>
                          <button
                            onClick={() => updatePromptInEditingDeck(p.id, 'type', 'Dare')}
                            className={`flex-1 text-[10px] font-black rounded-full px-4 py-1.5 transition-all border-2 ${p.type === 'Dare' ? 'bg-[#FFCA28] text-[#7B4B94] border-white' : 'bg-[#FCE4EC] text-[#D81B60] border-transparent'}`}
                          >
                            DARE
                          </button>
                        </div>
                      ) : (
                        <div className="flex-1 bg-[#F5F5F5] text-[#BCAAA4] text-[10px] font-black rounded-full px-4 py-1.5 text-center">GOSSIP PIECE</div>
                      )}
                      <div className="text-[9px] font-black text-[#FF69B4] opacity-50 uppercase tracking-tighter px-2 border-l-2 border-[#FFF0F5] shrink-0">{editingDeck.intensity}</div>
                      <button onClick={() => removePromptFromEditingDeck(p.id)} className="text-[#FFB6C1] hover:text-[#FF69B4] font-black text-2xl transition-colors ml-auto leading-none shrink-0">×</button>
                    </div>
                    <textarea
                      className="w-full text-sm font-bold text-[#7B4B94] outline-none px-2 bg-transparent border-b-2 border-dashed border-[#FFF0F5] focus:border-[#FFB6C1] py-1 resize-none italic"
                      value={p.text}
                      onChange={e => updatePromptInEditingDeck(p.id, 'text', e.target.value)}
                      placeholder="Write your magical prompt..."
                      rows={1}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 relative z-50">
            <button onClick={() => setEditingDeck(null)} className="sanrio-button flex-1 !bg-white !text-[#BCAAA4] !shadow-none !border-[#F5F5F5] uppercase tracking-widest text-sm">Cancel</button>
            <button onClick={() => saveDeck(editingDeck)} className="sanrio-button yellow flex-1 text-lg tracking-widest">GLOW UP!</button>
          </div>
        </motion.div>
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
          accent: '#FF69B4',
          bg: '#FFF0F5',
          textColor: '#7B4B94',
          cardBg: '#FFFFFF',
          fontFamily: 'Nunito, sans-serif'
        }}
      />
    </AnimatePresence>
  );
};

export const SanrioHistoryScreen: React.FC<{ logic: any }> = ({ logic }) => {
  const { history } = logic;
  return (
    <div className="space-y-6">
      <h2 className="sanrio-title text-3xl text-center mb-6">MEMORIES</h2>
      <div className="space-y-4">
        {history.length === 0 ? (
          <div className="py-20 text-center text-[#A188A6] font-bold text-xl drop-shadow-sm">NO MEMORIES YET...</div>
        ) : (
          history.map((item: any, i: number) => (
            <div key={i} className="sanrio-panel p-5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#F8BBD0] rounded-bl-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="flex justify-between w-full mb-3">
                <span className="bg-[#FFF0F5] px-3 py-1 rounded-full text-[#AB47BC] text-[10px] font-black tracking-widest w-max shadow-sm">
                  🎀 {item.type}
                </span>
                <span className="text-[#A188A6] text-[10px] font-black tracking-widest">
                  MEMO {history.length - i}
                </span>
              </div>
              <p className="text-lg font-bold text-[#7B4B94] leading-relaxed">"{item.text}"</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export const SanrioThemesScreen: React.FC<{ logic: any }> = ({ logic }) => {
  const { setTheme, theme } = logic;
  return (
    <div className="space-y-6">
      <h2 className="sanrio-title text-3xl text-center mb-6">TRAVEL MAP</h2>
      <div className="grid grid-cols-1 gap-4 pb-4">
        {allThemesList.map(t => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`${theme === t.id ? 'sanrio-button pink w-full py-5 text-xl tracking-wider' : 'sanrio-panel font-black text-[#7B4B94] text-xl py-5 hover:bg-[#FCE4EC] hover:scale-[1.02] transition-all text-center'}`}
          >{t.label}</button>
        ))}
      </div>
    </div>
  );
};

export const SanrioSettingsScreen: React.FC<{ logic: any }> = ({ logic }) => {
  return (
    <div className="space-y-6">
      <h2 className="sanrio-title text-3xl text-center mb-6">COMPANION</h2>
      <div className="sanrio-panel p-8 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-white rounded-full border-4 border-[#4DD0E1] shadow-md flex items-center justify-center text-5xl mb-4 relative drop-shadow-md">
          🎀
          <div className="absolute -bottom-2 -right-2 bg-[#FFCA28] text-white text-xs font-black w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shadow-sm">Lvl</div>
        </div>
        <h3 className="text-2xl font-black text-[#7B4B94] mb-2">Hello Kitty</h3>
        <p className="bg-[#E1F5FE] text-[#0288D1] px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-8 shadow-sm">Good Friend</p>

        <button className="sanrio-button w-full mb-4">MORE INFO 🔄</button>
        <button className="sanrio-button pink w-full" onClick={() => window.location.reload()}>END SESSION</button>
      </div>
    </div>
  );
};

export const SanrioMenuLayout: React.FC<{ children: React.ReactNode; logic: any }> = ({ children }) => {
  return (
    <div className="sanrio-theme h-full w-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#FFB3D9] via-[#E6C3F8] to-[#FFD8B1] font-['Nunito'] text-[#7B4B94] relative overflow-hidden select-none">
      <style>{`
        .sanrio-button {
          background: #00BCD4; /* Saturated Cyan */
          color: white;
          padding: 18px 32px;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-weight: 900;
          font-size: 1.25rem;
          border: 4px solid white;
          box-shadow: 0 6px 0px #00838F, 0 10px 15px rgba(0, 172, 193, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          text-transform: uppercase;
          text-shadow: 1px 1px 0px rgba(0,0,0,0.2);
        }
        .sanrio-button:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 10px 0px #00838F, 0 15px 20px rgba(0, 172, 193, 0.5);
        }
        .sanrio-button:active {
          transform: translateY(4px);
          box-shadow: 0 2px 0px #00838F;
        }
      `}</style>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 text-6xl opacity-40 animate-pulse">☁️</div>
        <div className="absolute top-20 right-10 text-5xl opacity-30">☁️</div>
        <div className="absolute bottom-20 left-20 text-7xl opacity-50">☁️</div>
        <div className="absolute top-1/2 left-1/4 text-4xl opacity-40">✨</div>
        <div className="absolute top-1/3 right-1/4 text-5xl opacity-40">✨</div>
      </div>

      <div className="z-10 flex flex-col items-center gap-10 w-full max-w-sm">
        <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="w-full relative">
          <h1 className="text-6xl sanrio-title text-center leading-tight mb-2">HELLO KITTY</h1>
          <div className="bg-white px-6 py-2 rounded-full border-4 border-[#4DD0E1] shadow-lg transform -rotate-3 w-max mx-auto">
            <span className="font-black text-xl text-[#FF69B4] tracking-widest">ISLAND ADVENTURE</span>
          </div>
        </motion.div>

        <div className="space-y-4 w-full px-4 mt-12 flex flex-col items-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export const SanrioMenuButton: React.FC<{ label: string; onClick: () => void; isPrimary?: boolean }> = ({ label, onClick, isPrimary }) => {
  return (
    <button onClick={onClick} className="sanrio-button w-[80%] max-w-[300px] py-5 text-xl tracking-widest text-white z-20">
      {label}
    </button>
  );
};

export const SanrioTheme: ThemeDefinition = {
  id: Theme.SANRIO,
  name: 'Sweet Garden',
  cssVars: { '--theme-accent': '#FF69B4' },
  MenuLayout: SanrioMenuLayout,
  MenuButton: SanrioMenuButton,
  LayoutComponent: SanrioLayout,
  IntensitySelector: SanrioIntensitySelector,
  PromptTypeSelector: SanrioPromptTypeSelector,
  PromptLayout: SanrioPromptLayout,
  PlayButton: SanrioPlayButton,
  DecksScreen: SanrioDecksScreen,
  HistoryScreen: SanrioHistoryScreen,
  SettingsScreen: SanrioSettingsScreen,
  ThemesScreen: SanrioThemesScreen,
  tabLabels: {
    play: 'ADVENTURE',
    decks: 'OUTFITS',
    history: 'MEMORIES',
    themes: 'TRAVEL',
    settings: 'PROFILE'
  }
};
