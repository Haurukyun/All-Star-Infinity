import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player, Theme } from '../types';
import { soundService } from '../services/soundFx';
import { hapticService } from '../services/haptics';
import { ThemeLoreBadge } from './ThemeLoreBadge';

interface PartyAwardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReturnToTitle: () => void;
  players: Player[];
  totalCardsCompleted: number;
  theme?: Theme;
}

export const PartyAwardsModal: React.FC<PartyAwardsModalProps> = ({
  isOpen,
  onClose,
  onReturnToTitle,
  players,
  totalCardsCompleted,
  theme = Theme.SONIC,
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

  const getThemeModalStyles = () => {
    switch (theme) {
      case Theme.UNDERTALE:
        return {
          font: "'Press Start 2P', monospace",
          container: "bg-black border-4 border-white text-white font-['Press_Start_2P'] rounded-none shadow-2xl p-6 text-[10px]",
          title: "text-lg text-white font-bold tracking-widest uppercase mb-1",
          sub: "text-white/60 text-[8px]",
          card: "border-2 border-white bg-black p-3 rounded-none my-2 text-left",
          btnPrimary: "w-full py-3 border-2 border-white bg-black text-white hover:bg-white hover:text-black font-bold uppercase transition-colors rounded-none text-xs cursor-pointer",
          btnSecondary: "w-full py-2 border border-white/60 text-white/80 hover:text-white uppercase transition-colors rounded-none text-[9px] cursor-pointer mt-2",
        };
      case Theme.OMORI:
        return {
          font: "'Gloria Hallelujah', cursive",
          container: "bg-white border-4 border-black text-black font-['Gloria_Hallelujah'] rounded-none shadow-[6px_6px_0_#000] p-6 text-sm",
          title: "text-2xl text-black font-bold tracking-tight mb-1",
          sub: "text-black/60 text-xs italic",
          card: "border-2 border-black bg-white p-3.5 rounded-none shadow-[2px_2px_0_#000] my-2 text-left",
          btnPrimary: "w-full py-3 border-2 border-black bg-white text-black hover:bg-black hover:text-white font-bold uppercase transition-colors rounded-none text-sm shadow-[3px_3px_0_#000] cursor-pointer",
          btnSecondary: "w-full py-2 border border-black/40 text-black/70 hover:text-black uppercase transition-colors rounded-none text-xs cursor-pointer mt-2 font-bold",
        };
      case Theme.SONIC:
        return {
          font: "'Bangers', cursive",
          container: "bg-yellow-400 border-4 border-black text-black font-['Bangers'] rounded-xl shadow-[8px_8px_0_#000] -skew-x-2 p-6 text-base tracking-wide",
          title: "text-4xl text-black font-black uppercase tracking-wider mb-1",
          sub: "text-black/70 text-sm font-bold uppercase",
          card: "border-3 border-black bg-white p-3.5 rounded-xl shadow-[3px_3px_0_#000] my-2 text-left -skew-x-2",
          btnPrimary: "w-full py-3.5 bg-red-600 text-white border-3 border-black font-black uppercase text-xl shadow-[4px_4px_0_#000] hover:scale-102 active:scale-95 transition-all rounded-xl cursor-pointer",
          btnSecondary: "w-full py-2 border-2 border-black bg-white text-black font-bold uppercase rounded-lg text-xs cursor-pointer mt-2",
        };
      case Theme.PERSONA:
        return {
          font: "'Edo', sans-serif",
          container: "bg-[#0A0A0A] border-4 border-white text-white font-['Edo'] rounded-none shadow-[8px_8px_0_#D80000] -skew-x-3 p-6 text-xs",
          title: "text-3xl text-white font-bold italic uppercase tracking-wider mb-1",
          sub: "text-[#D80000] text-xs font-bold uppercase",
          card: "border-2 border-white/40 bg-zinc-900 p-3.5 rounded-none shadow-[3px_3px_0_#D80000] my-2 text-left -skew-x-2",
          btnPrimary: "w-full py-3.5 bg-[#D80000] text-white border-2 border-white font-black uppercase text-lg shadow-[4px_4px_0_#000] hover:scale-102 active:scale-95 transition-all rounded-none -skew-x-2 cursor-pointer",
          btnSecondary: "w-full py-2 border border-white/40 text-white/70 hover:text-white uppercase transition-colors rounded-none text-xs cursor-pointer mt-2 -skew-x-2",
        };
      case Theme.MINECRAFT:
        return {
          font: "'Minecraft', monospace",
          container: "bg-[#4B4B4B] border-4 border-t-[#AAA] border-l-[#AAA] border-r-[#222] border-b-[#222] text-white font-['Minecraft'] rounded-none shadow-2xl p-6 text-xs",
          title: "text-xl text-yellow-300 font-bold tracking-wide mb-1",
          sub: "text-zinc-300 text-[10px]",
          card: "border-2 border-t-[#888] border-l-[#888] border-r-[#222] border-b-[#222] bg-[#555] p-3 rounded-none my-2 text-left",
          btnPrimary: "w-full py-3 border-2 border-t-[#AAA] border-l-[#AAA] border-r-[#222] border-b-[#222] bg-[#777] hover:bg-[#888] text-white font-bold uppercase rounded-none text-xs cursor-pointer",
          btnSecondary: "w-full py-2 text-zinc-300 hover:text-white uppercase text-[10px] cursor-pointer mt-2",
        };
      case Theme.ANIMAL_CROSSING:
        return {
          font: "'Sniglet', cursive",
          container: "bg-[#FBF8EF] border-4 border-[#7EBF8F] text-[#4A7A56] font-['Sniglet'] rounded-3xl p-6 shadow-xl text-xs",
          title: "text-2xl text-[#2F6B3D] font-bold mb-1",
          sub: "text-[#7EBF8F] text-xs font-bold",
          card: "border-2 border-[#C0D8C5] bg-white p-3.5 rounded-2xl shadow-sm my-2 text-left",
          btnPrimary: "w-full py-3.5 rounded-2xl bg-[#E8927C] text-white font-bold text-base hover:bg-[#DF7E66] transition-colors shadow cursor-pointer",
          btnSecondary: "w-full py-2 text-[#4A7A56]/70 hover:text-[#4A7A56] uppercase text-xs cursor-pointer mt-2 font-bold",
        };
      default:
        return {
          font: "inherit",
          container: "bg-zinc-950 border-2 border-white/20 text-white rounded-2xl p-6 shadow-2xl text-xs",
          title: "text-2xl font-black italic uppercase tracking-tight text-white mb-1",
          sub: "text-white/60 text-xs",
          card: "border border-white/10 bg-white/5 p-3.5 rounded-xl my-2 text-left",
          btnPrimary: "w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-wider text-sm shadow cursor-pointer",
          btnSecondary: "w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white uppercase text-xs cursor-pointer mt-2",
        };
    }
  };

  const style = getThemeModalStyles();

  const getThemeIcons = () => {
    switch (theme) {
      case Theme.UNDERTALE:
        return { trophy: "★", shield: "❤", forfeit: "×", flame: "⚡", forfeitText: "fled" };
      case Theme.OMORI:
        return { trophy: "○", shield: "■", forfeit: "×", flame: "!", forfeitText: "forfeits" };
      case Theme.FNAF:
        return { trophy: "●", shield: "◆", forfeit: "!", flame: "▲", forfeitText: "aborts" };
      case Theme.FALLOUT:
        return { trophy: "►", shield: "◈", forfeit: "☠", flame: "▲", forfeitText: "forfeits" };
      case Theme.CYBERPUNK:
        return { trophy: "◈", shield: "▣", forfeit: "//X", flame: "⚡", forfeitText: "surrenders" };
      case Theme.SKYRIM:
        return { trophy: "†", shield: "‡", forfeit: "☠", flame: "⚔", forfeitText: "fled" };
      case Theme.PERSONA:
        return { trophy: "★", shield: "♠", forfeit: "☠", flame: "★", forfeitText: "yields" };
      case Theme.MINECRAFT:
        return { trophy: "◆", shield: "■", forfeit: "×", flame: "▲", forfeitText: "yields" };
      case Theme.POKEMON:
        return { trophy: "●", shield: "■", forfeit: "×", flame: "▲", forfeitText: "runs" };
      case Theme.DANGANRONPA:
        return { trophy: "★", shield: "◉", forfeit: "☠", flame: "★", forfeitText: "despairs" };
      default:
        return { trophy: "★", shield: "◆", forfeit: "×", flame: "▲", forfeitText: "forfeits" };
    }
  };

  const icons = getThemeIcons();


  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 20 }}
          className={`${style.container} max-w-lg w-full text-center relative overflow-hidden`}
          style={{ fontFamily: style.font }}
        >
          {/* Header */}
          <div className="space-y-1">
            <div className="text-4xl font-bold">{icons.trophy}</div>
            <h2 className={style.title}>PARTY AWARDS</h2>
            <p className={style.sub}>
              Session Wrap-up · {totalCardsCompleted} Cards Conquered
            </p>
          </div>

          {/* Podium Cards */}
          <div className="space-y-2 py-2">
            {/* The Iron Will */}
            {ironWill && (
              <div className={`${style.card} flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold">{icons.shield}</div>
                  <div className="text-left">
                    <div className="text-[10px] font-black uppercase opacity-60">THE IRON WILL</div>
                    <div className="font-black text-sm flex items-center gap-1.5">
                      {theme && <ThemeLoreBadge theme={theme} index={players.findIndex(p => p.id === ironWill.id)} />}
                      <span>{ironWill.name}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold opacity-80">{ironWill.chickenCount} forfeits</span>
                </div>
              </div>
            )}

            {/* The Biggest Chicken */}
            {biggestChicken && biggestChicken.chickenCount > 0 && (
              <div className={`${style.card} flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold">{icons.forfeit}</div>
                  <div className="text-left">
                    <div className="text-[10px] font-black uppercase opacity-60">THE BIGGEST CHICKEN</div>
                    <div className="font-black text-sm flex items-center gap-1.5">
                      {theme && <ThemeLoreBadge theme={theme} index={players.findIndex(p => p.id === biggestChicken.id)} />}
                      <span>{biggestChicken.name}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold opacity-80">{biggestChicken.chickenCount} {icons.forfeitText}</span>
                </div>
              </div>
            )}

            {/* The Hot Seat Master */}
            {hotSeatMaster && hotSeatMaster.score > 0 && (
              <div className={`${style.card} flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold">{icons.flame}</div>
                  <div className="text-left">
                    <div className="text-[10px] font-black uppercase opacity-60">HOT SEAT SPEEDRUNNER</div>
                    <div className="font-black text-sm flex items-center gap-1.5">
                      {theme && <ThemeLoreBadge theme={theme} index={players.findIndex(p => p.id === hotSeatMaster.id)} />}
                      <span>{hotSeatMaster.name}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold opacity-80">{hotSeatMaster.score} answered</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-2">
            <button
              onClick={() => {
                hapticService.light();
                onClose();
              }}
              className={style.btnPrimary}
            >
              Keep Playing ⟳
            </button>
            <button
              onClick={() => {
                hapticService.medium();
                onClose();
                onReturnToTitle();
              }}
              className={style.btnSecondary}
            >
              Return to Title
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
