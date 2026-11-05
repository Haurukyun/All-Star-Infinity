import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameMode, Theme } from '../types';
import { hapticService } from '../services/haptics';
import { soundService } from '../services/soundFx';

interface ThemedMinigameChooserProps {
  isOpen: boolean;
  onClose: () => void;
  currentMode: GameMode | null;
  onSelectMode: (mode: GameMode) => void;
  theme: Theme;
}

const GAME_MODES = [
  { mode: GameMode.TRUTH_OR_DARE, label: 'TRUTH OR DARE', icon: '🎭', desc: 'Classic confessions & physical dares' },
  { mode: GameMode.NEVER_HAVE_I_EVER, label: 'NEVER HAVE I EVER', icon: '🙈', desc: 'Exposing secrets & drinking forfeits' },
  { mode: GameMode.MOST_LIKELY_TO, label: 'MOST LIKELY TO', icon: '🗳️', desc: 'Point fingers & call out your friends' },
  { mode: GameMode.WOULD_YOU_RATHER, label: 'WOULD YOU RATHER', icon: '⚖️', desc: 'Cursed dilemmas & minority penalties' },
  { mode: GameMode.HOT_SEAT, label: 'HOT SEAT (60s)', icon: '🔥', desc: 'Rapid-fire interrogation speedrun' },
];

export const ThemedMinigameChooser: React.FC<ThemedMinigameChooserProps> = ({
  isOpen,
  onClose,
  currentMode,
  onSelectMode,
  theme,
}) => {
  if (!isOpen) return null;

  const handleSelect = (mode: GameMode) => {
    hapticService.medium();
    soundService.click();
    onSelectMode(mode);
    onClose();
  };

  const getThemeModalStyles = () => {
    switch (theme) {
      case Theme.UNDERTALE:
        return {
          container: "bg-black border-4 border-white text-white font-['Press_Start_2P'] p-6 max-w-md w-full shadow-2xl",
          header: "text-lg text-white mb-6 border-b-2 border-white pb-3 tracking-widest",
          headerText: "* SELECT ENCOUNTER MODE",
          item: "p-3 text-left border-2 border-transparent hover:border-white transition-all flex items-center gap-3 cursor-pointer my-1.5",
          activeItem: "border-white bg-white/10",
          font: "'Press Start 2P', monospace",
          closeBtn: "mt-6 w-full py-3 border-2 border-white text-white hover:bg-white hover:text-black font-bold uppercase transition-colors",
          cursorIcon: "❤️"
        };
      case Theme.FNAF:
        return {
          container: "bg-black border-2 border-green-500/80 text-green-400 font-['VT323'] p-6 max-w-md w-full shadow-[0_0_20px_rgba(34,197,94,0.3)]",
          header: "text-2xl text-green-400 mb-4 border-b border-green-500/50 pb-2 tracking-widest flex justify-between items-center",
          headerText: "SYSTEM_PROTOCOL_OVERRIDE.EXE",
          item: "p-3 text-left border border-green-500/40 hover:border-green-400 hover:bg-green-950/40 transition-all flex items-center justify-between cursor-pointer my-1.5",
          activeItem: "border-green-400 bg-green-950/60 shadow-[0_0_10px_rgba(34,197,94,0.4)]",
          font: "'VT323', monospace",
          closeBtn: "mt-5 w-full py-2 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-bold uppercase tracking-widest text-xl transition-colors",
          cursorIcon: "▶"
        };
      case Theme.SONIC:
        return {
          container: "bg-yellow-400 border-4 border-black text-black font-['Bangers'] p-6 max-w-md w-full shadow-[8px_8px_0_#000] -skew-x-2",
          header: "text-4xl text-black mb-4 border-b-4 border-black pb-2 tracking-wide uppercase italic",
          headerText: "CHOOSE GAME ACT!",
          item: "p-3 text-left border-3 border-black bg-white hover:bg-black hover:text-white transition-all flex items-center justify-between cursor-pointer my-2 shadow-[3px_3px_0_#000] -skew-x-2",
          activeItem: "bg-black text-yellow-400 shadow-[4px_4px_0_#D80000]",
          font: "'Bangers', cursive",
          closeBtn: "mt-4 w-full py-3 bg-red-600 text-white border-3 border-black font-black uppercase text-2xl shadow-[4px_4px_0_#000] hover:scale-102 active:scale-95 transition-all",
          cursorIcon: "⚡"
        };
      case Theme.PERSONA:
        return {
          container: "bg-[#0A0A0A] border-4 border-white text-white font-['Edo'] p-6 max-w-md w-full shadow-[8px_8px_0_#D80000] -skew-x-3",
          header: "text-3xl text-white mb-6 border-b-4 border-[#D80000] pb-3 tracking-widest uppercase italic flex items-center gap-2",
          headerText: "CHANGE TACTICAL PROTOCOL",
          item: "p-3.5 text-left border-2 border-white/40 bg-zinc-900 hover:bg-[#D80000] hover:border-white transition-all flex items-center justify-between cursor-pointer my-2 shadow-[3px_3px_0_#000] -skew-x-2",
          activeItem: "bg-[#D80000] border-white shadow-[4px_4px_0_#fff]",
          font: "'Edo', sans-serif",
          closeBtn: "mt-5 w-full py-3 bg-white text-black font-black uppercase text-xl shadow-[4px_4px_0_#D80000] hover:bg-[#D80000] hover:text-white transition-colors -skew-x-2",
          cursorIcon: "★"
        };
      case Theme.MINECRAFT:
        return {
          container: "bg-[#4B4B4B] border-4 border-t-[#AAA] border-l-[#AAA] border-r-[#222] border-b-[#222] text-white font-['Minecraft'] p-6 max-w-md w-full shadow-2xl",
          header: "text-xl text-yellow-300 mb-6 border-b-2 border-[#333] pb-3 tracking-wide text-center",
          headerText: "Select Minigame Quest",
          item: "p-3 text-left border-2 border-t-[#888] border-l-[#888] border-r-[#222] border-b-[#222] bg-[#555] hover:bg-[#666] transition-all flex items-center justify-between cursor-pointer my-2",
          activeItem: "bg-[#2E5E2E] border-t-[#55FF55] border-l-[#55FF55] text-green-200",
          font: "'Minecraft', monospace",
          closeBtn: "mt-5 w-full py-2.5 border-2 border-t-[#AAA] border-l-[#AAA] border-r-[#222] border-b-[#222] bg-[#777] hover:bg-[#888] text-white font-bold uppercase",
          cursorIcon: "⛏️"
        };
      case Theme.ANIMAL_CROSSING:
        return {
          container: "bg-[#FBF8EF] border-4 border-[#7EBF8F] text-[#4A7A56] font-['Sniglet'] rounded-3xl p-6 max-w-md w-full shadow-xl",
          header: "text-2xl text-[#2F6B3D] mb-4 border-b-2 border-[#D5E8D4] pb-2 text-center",
          headerText: "🍃 Island Game Menu 🍃",
          item: "p-3 text-left rounded-2xl border-2 border-[#C0D8C5] bg-white hover:bg-[#E8F5E9] hover:border-[#7EBF8F] transition-all flex items-center justify-between cursor-pointer my-2 shadow-sm",
          activeItem: "bg-[#7EBF8F] text-white border-[#5BA46E] shadow",
          font: "'Sniglet', cursive",
          closeBtn: "mt-4 w-full py-3 rounded-2xl bg-[#E8927C] text-white font-bold text-lg hover:bg-[#DF7E66] transition-colors shadow",
          cursorIcon: "🍃"
        };
      case Theme.CYBERPUNK:
        return {
          container: "bg-black border-2 border-yellow-400 text-yellow-400 font-['Orbitron'] p-6 max-w-md w-full shadow-[0_0_25px_rgba(250,204,21,0.25)]",
          header: "text-xl text-yellow-400 mb-5 border-b border-yellow-400/40 pb-2 tracking-widest flex items-center justify-between uppercase",
          headerText: "// SWITCH_PROTOCOL_MOD",
          item: "p-3 text-left border border-yellow-400/30 bg-zinc-950 hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-950/20 transition-all flex items-center justify-between cursor-pointer my-2",
          activeItem: "border-yellow-400 bg-yellow-400/20 text-yellow-300 shadow-[0_0_10px_rgba(250,204,21,0.4)]",
          font: "'Orbitron', sans-serif",
          closeBtn: "mt-5 w-full py-2.5 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold uppercase tracking-wider text-sm transition-colors",
          cursorIcon: "⚡"
        };
      case Theme.DANGANRONPA:
        return {
          container: "bg-[#050510] border-4 border-[#FF007F] text-white font-mono p-6 max-w-md w-full shadow-[0_0_30px_rgba(255,0,127,0.3)]",
          header: "text-2xl text-[#FF007F] mb-4 border-b-2 border-[#FF007F]/60 pb-2 tracking-widest uppercase font-black flex items-center justify-between",
          headerText: "NONSTOP CLASS TRIAL MODE",
          item: "p-3 text-left border-2 border-[#FF007F]/40 bg-black/60 hover:border-[#FF007F] hover:bg-[#FF007F]/10 transition-all flex items-center justify-between cursor-pointer my-2 shadow",
          activeItem: "border-[#FF007F] bg-[#FF007F] text-black font-bold shadow-[0_0_15px_rgba(255,0,127,0.6)]",
          font: "'Courier New', monospace",
          closeBtn: "mt-5 w-full py-2.5 border-2 border-[#FF007F] text-[#FF007F] hover:bg-[#FF007F] hover:text-white font-bold uppercase tracking-widest transition-colors",
          cursorIcon: "🎯"
        };
      case Theme.OMORI:
        return {
          container: "bg-white border-4 border-black text-black font-['Gloria_Hallelujah'] p-6 max-w-md w-full shadow-[6px_6px_0_#000]",
          header: "text-2xl text-black mb-4 border-b-2 border-black pb-2 text-center font-bold",
          headerText: "what will you do?",
          item: "p-3 text-left border-2 border-black/40 hover:border-black hover:bg-zinc-100 transition-all flex items-center justify-between cursor-pointer my-2",
          activeItem: "border-black bg-black text-white shadow-[3px_3px_0_#888]",
          font: "'Gloria Hallelujah', cursive",
          closeBtn: "mt-5 w-full py-2 border-2 border-black bg-white hover:bg-black hover:text-white font-bold uppercase text-sm transition-colors",
          cursorIcon: "💡"
        };
      case Theme.KIRBY:
        return {
          container: "bg-[#FFF0F5] border-4 border-[#FF85B3] text-[#D81B60] font-['Fredoka_One'] rounded-3xl p-6 max-w-md w-full shadow-2xl",
          header: "text-2xl text-[#D81B60] mb-4 border-b-2 border-[#FFB6C1] pb-2 text-center font-bold",
          headerText: "★ DREAM LAND PARTY ★",
          item: "p-3 text-left rounded-2xl border-2 border-[#FFB6C1] bg-white hover:bg-[#FFE4EF] transition-all flex items-center justify-between cursor-pointer my-2 shadow-sm",
          activeItem: "bg-[#FF85B3] text-white border-[#D81B60] shadow-md",
          font: "'Fredoka One', cursive",
          closeBtn: "mt-4 w-full py-2.5 rounded-2xl bg-[#FF85B3] text-white font-bold text-base hover:bg-[#E91E63] transition-colors shadow",
          cursorIcon: "⭐"
        };
      case Theme.POKEMON:
        return {
          container: "bg-zinc-900 border-4 border-[#3B4CCA] text-white font-['Press_Start_2P'] p-6 max-w-md w-full shadow-[6px_6px_0_#CC0000]",
          header: "text-sm text-[#FFDE00] mb-5 border-b-2 border-[#3B4CCA] pb-3 text-center leading-relaxed",
          headerText: "WHAT WILL YOU CHOOSE?",
          item: "p-3 text-left border-2 border-zinc-700 bg-zinc-800 hover:border-[#FFDE00] transition-all flex items-center justify-between cursor-pointer my-2 text-xs",
          activeItem: "border-[#FFDE00] bg-[#3B4CCA] text-white shadow-[2px_2px_0_#FFDE00]",
          font: "'Press Start 2P', monospace",
          closeBtn: "mt-5 w-full py-3 border-2 border-zinc-500 bg-zinc-800 hover:bg-zinc-700 text-white font-bold uppercase text-[10px]",
          cursorIcon: "🔴"
        };
      case Theme.SKYRIM:
        return {
          container: "bg-[#0A0A0A] border-2 border-[#D4AF37] text-stone-200 font-['Cinzel'] p-6 max-w-md w-full shadow-[0_0_30px_rgba(212,175,55,0.2)]",
          header: "text-xl text-[#D4AF37] mb-5 border-b border-[#D4AF37]/50 pb-2 tracking-widest text-center uppercase font-bold",
          headerText: "SELECT YOUR DESTINY",
          item: "p-3 text-left border border-stone-800 bg-black/60 hover:border-[#D4AF37]/80 hover:bg-stone-900 transition-all flex items-center justify-between cursor-pointer my-2",
          activeItem: "border-[#D4AF37] bg-stone-900 text-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.3)]",
          font: "'Cinzel', serif",
          closeBtn: "mt-5 w-full py-2.5 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-bold uppercase tracking-widest text-xs transition-colors",
          cursorIcon: "🐉"
        };
      case Theme.SANRIO:
        return {
          container: "bg-[#FFF5F8] border-4 border-[#FF8DA1] text-[#D84B6B] font-['Cherry_Bomb_One'] rounded-3xl p-6 max-w-md w-full shadow-2xl",
          header: "text-2xl text-[#D84B6B] mb-4 border-b-2 border-[#FFC0CB] pb-2 text-center",
          headerText: "🎀 Sweet Party Menu 🎀",
          item: "p-3 text-left rounded-2xl border-2 border-[#FFB6C1] bg-white hover:bg-[#FFE4EC] transition-all flex items-center justify-between cursor-pointer my-2 shadow-sm",
          activeItem: "bg-[#FF8DA1] text-white border-[#D84B6B] shadow",
          font: "'Cherry Bomb One', cursive",
          closeBtn: "mt-4 w-full py-2.5 rounded-2xl bg-[#FF8DA1] text-white font-bold text-base hover:bg-[#FF69B4] transition-colors shadow",
          cursorIcon: "🎀"
        };
      case Theme.FALLOUT:
        return {
          container: "bg-black border-2 border-[#14FF00] text-[#14FF00] font-['Share_Tech_Mono'] p-6 max-w-md w-full shadow-[0_0_20px_rgba(20,255,0,0.3)]",
          header: "text-xl text-[#14FF00] mb-4 border-b border-[#14FF00]/50 pb-2 tracking-wider flex items-center justify-between",
          headerText: "ROBCO PIP-BOY 3000 SELECTOR",
          item: "p-3 text-left border border-[#14FF00]/40 hover:border-[#14FF00] hover:bg-[#14FF00]/10 transition-all flex items-center justify-between cursor-pointer my-2",
          activeItem: "border-[#14FF00] bg-[#14FF00] text-black font-bold shadow-[0_0_12px_rgba(20,255,0,0.5)]",
          font: "'Share Tech Mono', monospace",
          closeBtn: "mt-5 w-full py-2.5 border border-[#14FF00] text-[#14FF00] hover:bg-[#14FF00] hover:text-black font-bold uppercase tracking-wider text-sm transition-colors",
          cursorIcon: "☢️"
        };
      case Theme.HAZBIN:
        return {
          container: "bg-[#1a050f] border-2 border-[#FFD700] text-[#ffcccb] font-['Lora'] p-6 max-w-md w-full shadow-[0_0_30px_rgba(229,43,80,0.3)]",
          header: "text-2xl text-[#FFD700] mb-4 border-b border-[#FFD700]/50 pb-2 text-center font-['Fascinate_Inline'] tracking-wider",
          headerText: "HOTEL ENTERTAINMENT ROSTER",
          item: "p-3 text-left border border-[#e52b50]/50 bg-black/40 hover:border-[#FFD700] hover:bg-[#e52b50]/20 transition-all flex items-center justify-between cursor-pointer my-2",
          activeItem: "border-[#FFD700] bg-[#8B0000] text-[#FFD700] font-bold shadow-[0_0_15px_rgba(255,215,0,0.4)]",
          font: "'Lora', serif",
          closeBtn: "mt-5 w-full py-2.5 border border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black font-bold uppercase tracking-widest text-xs transition-colors",
          cursorIcon: "😈"
        };
      case Theme.VOCALOID:
        return {
          container: "bg-black border-2 border-[#39C5BB] text-[#39C5BB] font-['Orbitron'] p-6 max-w-md w-full shadow-[0_0_25px_rgba(57,197,187,0.3)]",
          header: "text-xl text-[#39C5BB] mb-4 border-b border-[#39C5BB]/50 pb-2 tracking-widest flex items-center justify-between uppercase font-bold",
          headerText: "SYNTHESIZER TRACK SELECT",
          item: "p-3 text-left border border-[#39C5BB]/30 bg-zinc-950 hover:border-[#FF1493] hover:text-[#FF1493] transition-all flex items-center justify-between cursor-pointer my-2",
          activeItem: "border-[#39C5BB] bg-[#39C5BB]/20 text-white font-bold shadow-[0_0_12px_rgba(57,197,187,0.5)]",
          font: "'Orbitron', sans-serif",
          closeBtn: "mt-5 w-full py-2.5 border border-[#39C5BB] text-[#39C5BB] hover:bg-[#39C5BB] hover:text-black font-bold uppercase tracking-wider text-xs transition-colors",
          cursorIcon: "🎤"
        };
      case Theme.IRUMA:
        return {
          container: "bg-[#2e1534] border-4 border-[#ffd700] text-white font-['Sniglet'] rounded-3xl p-6 max-w-md w-full shadow-[0_0_25px_rgba(255,215,0,0.25)]",
          header: "text-2xl text-[#ffd700] mb-4 border-b-2 border-[#ffd700]/50 pb-2 text-center font-bold",
          headerText: "BABYLS DEMON ACADEMY",
          item: "p-3 text-left rounded-2xl border-2 border-[#7B1FA2] bg-purple-950/60 hover:border-[#ffd700] hover:bg-purple-900/60 transition-all flex items-center justify-between cursor-pointer my-2",
          activeItem: "bg-[#7B1FA2] border-[#ffd700] text-[#ffd700] font-bold shadow-lg",
          font: "'Sniglet', cursive",
          closeBtn: "mt-4 w-full py-2.5 rounded-2xl bg-[#ffd700] text-black font-bold text-base hover:bg-yellow-400 transition-colors shadow",
          cursorIcon: "🦇"
        };
      case Theme.ARCANE:
        return {
          container: "bg-[#0b0c10] border-2 border-[#C8AA6E] text-stone-200 font-['Cinzel'] p-6 max-w-md w-full shadow-[0_0_30px_rgba(0,229,255,0.25)]",
          header: "text-xl text-[#00E5FF] mb-5 border-b border-[#C8AA6E]/60 pb-2 tracking-widest text-center uppercase font-bold",
          headerText: "HEXTECH INITIATIVE DECREE",
          item: "p-3 text-left border border-[#C8AA6E]/40 bg-black/60 hover:border-[#00E5FF] hover:bg-cyan-950/20 transition-all flex items-center justify-between cursor-pointer my-2",
          activeItem: "border-[#00E5FF] bg-[#00E5FF]/20 text-[#00E5FF] font-bold shadow-[0_0_15px_rgba(0,229,255,0.4)]",
          font: "'Cinzel', serif",
          closeBtn: "mt-5 w-full py-2.5 border border-[#C8AA6E] text-[#C8AA6E] hover:bg-[#C8AA6E] hover:text-black font-bold uppercase tracking-widest text-xs transition-colors",
          cursorIcon: "⚡"
        };
      case Theme.BILLY_HATCHER:
        return {
          container: "bg-[#FDFAF4] border-4 border-[#1873CA] text-[#222] font-['Fredoka_One'] rounded-3xl p-6 max-w-md w-full shadow-2xl",
          header: "text-2xl text-[#1873CA] mb-4 border-b-3 border-[#1873CA]/40 pb-2 text-center font-bold",
          headerText: "🥚 MORNING EGG FESTIVAL 🥚",
          item: "p-3 text-left rounded-2xl border-2 border-[#1873CA]/30 bg-white hover:bg-blue-50 hover:border-[#1873CA] transition-all flex items-center justify-between cursor-pointer my-2 shadow-sm",
          activeItem: "bg-[#1873CA] text-white border-[#1873CA] shadow-md",
          font: "'Fredoka One', cursive",
          closeBtn: "mt-4 w-full py-2.5 rounded-2xl bg-[#E53935] text-white font-bold text-base hover:bg-red-700 transition-colors shadow",
          cursorIcon: "🥚"
        };
      default:
        return {
          container: "bg-zinc-900 border-2 border-white/20 text-white rounded-2xl p-6 max-w-md w-full shadow-2xl",
          header: "text-xl font-black mb-4 border-b border-white/10 pb-2 tracking-wider uppercase text-center",
          headerText: "SELECT MINIGAME",
          item: "p-3 text-left rounded-xl border border-white/10 bg-white/5 hover:bg-white/15 hover:border-white/40 transition-all flex items-center justify-between cursor-pointer my-2",
          activeItem: "bg-red-600/80 border-red-400 text-white shadow-md",
          font: "inherit",
          closeBtn: "mt-4 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white font-bold uppercase text-xs transition-colors",
          cursorIcon: "▶"
        };
    }
  };

  const style = getThemeModalStyles();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          className={style.container}
          style={{ fontFamily: style.font }}
        >
          {/* Header */}
          <div className={style.header}>
            <span>{style.headerText}</span>
          </div>

          {/* Modes List */}
          <div className="space-y-1">
            {GAME_MODES.map((item) => {
              const isActive = currentMode === item.mode;
              return (
                <div
                  key={item.mode}
                  onClick={() => handleSelect(item.mode)}
                  className={`${style.item} ${isActive ? style.activeItem : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <div className="font-bold text-sm tracking-wide">{item.label}</div>
                      <div className="text-[10px] opacity-70 tracking-normal">{item.desc}</div>
                    </div>
                  </div>
                  {isActive && (
                    <span className="text-sm font-black">{style.cursorIcon}</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Close button */}
          <button onClick={onClose} className={style.closeBtn}>
            RETURN TO GAME
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

