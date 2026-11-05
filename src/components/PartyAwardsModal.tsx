import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '../types';
import { soundService } from '../services/soundFx';
import { hapticService } from '../services/haptics';

interface PartyAwardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReturnToTitle: () => void;
  players: Player[];
  totalCardsCompleted: number;
}

export const PartyAwardsModal: React.FC<PartyAwardsModalProps> = ({
  isOpen,
  onClose,
  onReturnToTitle,
  players,
  totalCardsCompleted,
}) => {
  useEffect(() => {
    if (isOpen) {
      soundService.fanfare();
      hapticService.success();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Compute award winners
  const biggestChicken = [...players].sort((a, b) => b.chickenCount - a.chickenCount)[0];
  const hotSeatMaster = [...players].sort((a, b) => b.score - a.score)[0];
  const ironWill = [...players].sort((a, b) => a.chickenCount - b.chickenCount)[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 25 }}
          className="bg-zinc-950 border-4 border-amber-400 text-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_40px_rgba(251,191,36,0.3)] space-y-6 text-center relative overflow-hidden"
        >
          {/* Decorative Corner Glow */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="space-y-1">
            <div className="text-4xl sm:text-5xl animate-bounce">🏆</div>
            <h2 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tight text-amber-400">
              PARTY AWARDS
            </h2>
            <p className="text-xs text-white/60">
              Session Wrap-up · {totalCardsCompleted} Cards Conquered
            </p>
          </div>

          {/* Podium Badges */}
          <div className="space-y-3">
            {/* The Iron Will */}
            {ironWill && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/70 to-indigo-950/70 border-2 border-blue-400/50 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-xl shadow">
                    🛡️
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-black uppercase tracking-wider text-blue-300">THE IRON WILL</div>
                    <div className="text-base font-black text-white">{ironWill.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-blue-300">{ironWill.chickenCount} forfeits</span>
                </div>
              </motion.div>
            )}

            {/* The Biggest Chicken */}
            {biggestChicken && biggestChicken.chickenCount > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/70 to-orange-950/70 border-2 border-amber-400/50 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-xl shadow">
                    🐔
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-black uppercase tracking-wider text-amber-300">THE BIGGEST CHICKEN</div>
                    <div className="text-base font-black text-white">{biggestChicken.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-amber-300">{biggestChicken.chickenCount} chickened</span>
                </div>
              </motion.div>
            )}

            {/* The Hot Seat Master */}
            {hotSeatMaster && hotSeatMaster.score > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/70 to-teal-950/70 border-2 border-emerald-400/50 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-xl shadow">
                    🔥
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-black uppercase tracking-wider text-emerald-300">HOT SEAT SPEEDRUNNER</div>
                    <div className="text-base font-black text-white">{hotSeatMaster.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-300">{hotSeatMaster.score} answered</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                hapticService.light();
                onClose();
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-black uppercase tracking-wider shadow-lg active:scale-95 transition-all text-sm"
            >
              🔄 Keep Playing
            </button>
            <button
              onClick={() => {
                hapticService.medium();
                onClose();
                onReturnToTitle();
              }}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white font-bold uppercase tracking-wider text-xs transition-colors"
            >
              🏠 Return to Title
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
