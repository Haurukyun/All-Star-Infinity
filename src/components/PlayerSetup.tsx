import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameLogic } from '../hooks/useGameLogic';
import { hapticService } from '../services/haptics';

interface PlayerSetupProps {
  logic: ReturnType<typeof useGameLogic>;
}

const AVATAR_OPTIONS = ['🦊', '🐉', '⚡', '💎', '💀', '👑', '🐱', '🚀', '🎭', '🎮', '🔥', '🌸'];
const COLOR_OPTIONS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#e11d48'];

export const PlayerSetup: React.FC<PlayerSetupProps> = ({ logic }) => {
  const {
    players,
    addPlayer,
    removePlayer,
    setPlayersEnabled,
    setView,
    chaosMode,
    toggleChaosMode
  } = logic;

  const [inputName, setInputName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      addPlayer(inputName.trim(), selectedAvatar, selectedColor);
      setInputName('');
      // Rotate to next avatar & color for next player
      const nextAvatarIdx = (AVATAR_OPTIONS.indexOf(selectedAvatar) + 1) % AVATAR_OPTIONS.length;
      const nextColorIdx = (COLOR_OPTIONS.indexOf(selectedColor) + 1) % COLOR_OPTIONS.length;
      setSelectedAvatar(AVATAR_OPTIONS[nextAvatarIdx]);
      setSelectedColor(COLOR_OPTIONS[nextColorIdx]);
    }
  };

  const handleStartGame = () => {
    hapticService.success();
    setPlayersEnabled(true);
    setView('game');
  };

  const handleQuickPlay = () => {
    hapticService.light();
    setPlayersEnabled(false);
    setView('game');
  };

  const handleAddPresets = () => {
    hapticService.light();
    if (players.length === 0) {
      addPlayer('Player 1', '🦊', '#ef4444');
      addPlayer('Player 2', '🐉', '#3b82f6');
      addPlayer('Player 3', '⚡', '#10b981');
    }
  };

  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto select-none font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-lg bg-zinc-950 border-2 border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5 my-auto"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-block p-3 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 shadow-lg shadow-red-600/30 mb-1">
            <span className="text-3xl">👥</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black italic tracking-tighter uppercase leading-none">
            PASS & PLAY <span className="text-red-500">ROSTER</span>
          </h1>
          <p className="text-xs text-white/60 max-w-sm mx-auto">
            Assemble your party! Select an avatar & color to track turns, forfeits, and live voting.
          </p>
        </div>

        {/* Add Player Input with Avatar & Color Pickers */}
        <form onSubmit={handleAdd} className="space-y-3">
          <div className="flex gap-2">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-md border-2 border-white/20 shrink-0"
              style={{ backgroundColor: selectedColor }}
            >
              {selectedAvatar}
            </div>
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Enter player name..."
              maxLength={20}
              className="flex-1 bg-white/5 border-2 border-white/20 focus:border-red-500 rounded-xl px-4 py-3 text-base text-white placeholder-white/40 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!inputName.trim()}
              className="px-5 py-3 bg-red-600 hover:bg-red-500 disabled:opacity-40 rounded-xl font-black text-sm uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              + ADD
            </button>
          </div>

          {/* Avatar & Color Picker Ribbon */}
          <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 pt-1 custom-scrollbar">
            <div className="flex gap-1.5 shrink-0">
              {AVATAR_OPTIONS.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => {
                    setSelectedAvatar(av);
                    hapticService.light();
                  }}
                  className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center transition-all ${
                    selectedAvatar === av
                      ? 'bg-white/30 scale-110 shadow-sm border border-white'
                      : 'bg-white/5 hover:bg-white/15 opacity-70'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
            <div className="flex gap-1.5 shrink-0 pl-2 border-l border-white/10">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setSelectedColor(c);
                    hapticService.light();
                  }}
                  className={`w-5 h-5 rounded-full transition-all ${
                    selectedColor === c ? 'scale-125 ring-2 ring-white' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </form>

        {/* Chaos Mode Toggle */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
          <div>
            <div className="font-bold flex items-center gap-1.5">
              <span>🎲 CHAOS TURN ORDER</span>
              {chaosMode && <span className="px-1.5 py-0.2 rounded bg-purple-600 text-[9px] font-black uppercase">ON</span>}
            </div>
            <div className="text-[10px] text-white/50">Fair random shuffle: unpredictable order without repeating</div>
          </div>
          <button
            type="button"
            onClick={toggleChaosMode}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-all ${
              chaosMode ? 'bg-purple-600 text-white shadow' : 'bg-white/10 text-white/50'
            }`}
          >
            {chaosMode ? 'ACTIVE' : 'OFF'}
          </button>
        </div>

        {/* Player Roster List */}
        <div className="space-y-2 max-h-[30vh] overflow-y-auto pr-1 custom-scrollbar">
          <AnimatePresence>
            {players.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-8 text-center space-y-3 bg-white/5 rounded-xl border border-dashed border-white/10 p-4"
              >
                <p className="text-sm text-white/50 italic">No players added yet.</p>
                <button
                  type="button"
                  onClick={handleAddPresets}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  ⚡ Add 3 Sample Players
                </button>
              </motion.div>
            ) : (
              players.map((p, index) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-white/40 font-bold">#{index + 1}</span>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm text-white shadow-sm"
                      style={{ backgroundColor: p.color || '#ef4444' }}
                    >
                      {p.avatar || p.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-bold text-base text-white">{p.name}</span>
                  </div>

                  <button
                    onClick={() => removePlayer(p.id)}
                    title="Remove player"
                    className="w-7 h-7 rounded-lg bg-white/5 hover:bg-red-950/80 hover:text-red-400 border border-white/10 flex items-center justify-center text-xs font-bold transition-colors"
                  >
                    ✕
                  </button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Action Controls */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <button
            onClick={handleStartGame}
            disabled={players.length === 0}
            className="w-full py-4 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl font-black text-lg uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all active:scale-95"
          >
            START ADVENTURE ({players.length} {players.length === 1 ? 'PLAYER' : 'PLAYERS'})
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleQuickPlay}
              className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold uppercase tracking-wider text-white transition-colors"
            >
              Skip (Solo Play)
            </button>
            <button
              onClick={() => {
                hapticService.light();
                setView('menu');
              }}
              className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white transition-colors"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
