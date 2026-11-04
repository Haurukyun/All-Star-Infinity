import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameLogic } from '../hooks/useGameLogic';
import { hapticService } from '../services/haptics';

interface PlayerSetupProps {
  logic: ReturnType<typeof useGameLogic>;
}

export const PlayerSetup: React.FC<PlayerSetupProps> = ({ logic }) => {
  const {
    players,
    addPlayer,
    removePlayer,
    setPlayersEnabled,
    setView,
  } = logic;

  const [inputName, setInputName] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      addPlayer(inputName.trim());
      setInputName('');
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
      addPlayer('Player 1');
      addPlayer('Player 2');
      addPlayer('Player 3');
    }
  };

  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto select-none font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-lg bg-zinc-950 border-2 border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 my-auto"
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
            Assemble your party! Names are used for turn turns, targeting dares, and tracking chicken counts.
          </p>
        </div>

        {/* Add Player Input */}
        <form onSubmit={handleAdd} className="flex gap-2">
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
        </form>

        {/* Player Roster List */}
        <div className="space-y-2 max-h-[36vh] overflow-y-auto pr-1 custom-scrollbar">
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
                  className="flex items-center justify-between p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-white/40 font-bold">#{index + 1}</span>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600/80 to-amber-500/80 flex items-center justify-center font-black text-xs text-white shadow-sm">
                      {p.name.charAt(0).toUpperCase()}
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
