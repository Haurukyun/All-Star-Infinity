import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '../types';

interface PlayerTurnBannerProps {
  players: Player[];
  activePlayer: Player | null;
  targetPlayer: Player | null;
  onNextPlayer: () => void;
  onPrevPlayer: () => void;
  onIncrementChicken: (id?: string) => void;
  onAddPlayer: (name: string) => void;
  onRemovePlayer: (id: string) => void;
}

export const PlayerTurnBanner: React.FC<PlayerTurnBannerProps> = ({
  players,
  activePlayer,
  targetPlayer,
  onNextPlayer,
  onPrevPlayer,
  onIncrementChicken,
  onAddPlayer,
  onRemovePlayer,
}) => {
  const [showRosterModal, setShowRosterModal] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [justChickened, setJustChickened] = useState(false);

  if (!activePlayer || players.length === 0) return null;

  const handleChicken = () => {
    onIncrementChicken(activePlayer.id);
    setJustChickened(true);
    setTimeout(() => setJustChickened(false), 1500);
  };

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlayerName.trim()) {
      onAddPlayer(newPlayerName.trim());
      setNewPlayerName('');
    }
  };

  return (
    <div className="w-full mb-3 select-none">
      {/* Turn Banner Bar */}
      <div className="bg-black/85 backdrop-blur-md border-2 border-white/20 rounded-xl p-3 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-2.5">
        {/* Active Player Info */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={onPrevPlayer}
            title="Previous Player"
            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white text-xs font-bold transition-colors"
          >
            ◀
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white font-black text-sm shadow-md">
              {activePlayer.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-white/50 uppercase font-semibold tracking-wider">Current Turn</span>
                <span className="text-xs">🎮</span>
              </div>
              <div className="text-base font-black tracking-wide text-white leading-tight">
                {activePlayer.name}
              </div>
            </div>
          </div>

          <button
            onClick={onNextPlayer}
            title="Next Player"
            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white text-xs font-bold transition-colors"
          >
            ▶
          </button>
        </div>

        {/* Target Player (if group >= 2) */}
        {targetPlayer && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
            <span className="text-white/40 uppercase text-[10px] font-semibold">Target:</span>
            <span className="font-bold text-amber-300">🎯 {targetPlayer.name}</span>
          </div>
        )}

        {/* Quick Actions: Chicken Counter & Roster button */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <motion.button
            whileTap={{ scale: 0.92 }}
            animate={justChickened ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            onClick={handleChicken}
            title="Active player chickened out of the prompt!"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all
              ${
                justChickened
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/50'
                  : 'bg-amber-950/70 hover:bg-amber-900 border border-amber-500/40 text-amber-200'
              }`}
          >
            <span>🐔</span>
            <span>Chickened ({activePlayer.chickenCount})</span>
          </motion.button>

          <button
            onClick={() => setShowRosterModal(true)}
            title="View Player Roster & Standings"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase transition-colors"
          >
            <span>👥</span>
            <span>({players.length})</span>
          </button>
        </div>
      </div>

      {/* Target indicator on mobile if group >= 2 */}
      {targetPlayer && (
        <div className="sm:hidden mt-1 text-center">
          <span className="text-[10px] text-white/60 uppercase">Target: </span>
          <span className="text-xs font-bold text-amber-300">🎯 {targetPlayer.name}</span>
        </div>
      )}

      {/* Roster & Standings Modal */}
      <AnimatePresence>
        {showRosterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-zinc-950 border-2 border-white/20 rounded-2xl w-full max-w-md p-6 text-white shadow-2xl space-y-4 max-h-[85vh] flex flex-col"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">👥</span>
                  <h3 className="font-black text-xl tracking-tight uppercase">Party Roster</h3>
                </div>
                <button
                  onClick={() => setShowRosterModal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Player list */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {players.map((p, index) => {
                  const isActive = p.id === activePlayer.id;
                  return (
                    <div
                      key={p.id}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                        isActive
                          ? 'bg-red-950/40 border-red-500 shadow-md'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs opacity-50">#{index + 1}</span>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-black text-sm">
                          {p.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-sm flex items-center gap-2">
                            <span>{p.name}</span>
                            {isActive && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] bg-red-600 font-black uppercase tracking-wider">
                                Active Turn
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-white/50 flex items-center gap-3">
                            <span>🐔 {p.chickenCount} Chickens</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onIncrementChicken(p.id)}
                          title="Add chicken penalty"
                          className="px-2 py-1 rounded bg-amber-950 hover:bg-amber-900 border border-amber-500/30 text-amber-200 text-xs font-bold"
                        >
                          +🐔
                        </button>
                        {players.length > 1 && (
                          <button
                            onClick={() => onRemovePlayer(p.id)}
                            title="Remove player"
                            className="px-2 py-1 rounded bg-red-950/40 hover:bg-red-900 border border-red-500/30 text-red-300 text-xs font-bold"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add New Player Form */}
              <form onSubmit={handleAddNew} className="flex gap-2 pt-2 border-t border-white/10">
                <input
                  type="text"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  placeholder="Add friend's name..."
                  className="flex-1 bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                />
                <button
                  type="submit"
                  disabled={!newPlayerName.trim()}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-40 rounded-xl font-black text-xs uppercase tracking-wider transition-colors"
                >
                  + Add
                </button>
              </form>

              {/* Close Button */}
              <button
                onClick={() => setShowRosterModal(false)}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 font-bold uppercase text-xs tracking-wider transition-colors"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
