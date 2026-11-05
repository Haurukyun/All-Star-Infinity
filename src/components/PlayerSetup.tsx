import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameLogic } from '../hooks/useGameLogic';
import { hapticService } from '../services/haptics';
import { Theme } from '../types';

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
    toggleChaosMode,
    theme
  } = logic;

  const [inputName, setInputName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);

  const getThemeSetupStyles = (t: Theme) => {
    switch (t) {
      case Theme.OMORI:
        return {
          bg: "bg-white text-black font-['Gloria_Hallelujah']",
          panel: "bg-white border-4 border-black rounded-none shadow-[8px_8px_0_#000]",
          headerText: "text-black",
          subText: "text-black/60",
          input: "bg-white border-2 border-black text-black placeholder-black/40 focus:border-black rounded-none font-bold",
          addBtn: "bg-black text-white hover:bg-zinc-800 rounded-none font-bold shadow-[2px_2px_0_#000] cursor-pointer",
          item: "bg-white border-2 border-black text-black rounded-none shadow-[2px_2px_0_#000]",
          primaryBtn: "bg-black text-white hover:bg-zinc-800 rounded-none shadow-[4px_4px_0_#000] font-bold cursor-pointer",
          secondaryBtn: "bg-white border-2 border-black text-black hover:bg-black hover:text-white rounded-none shadow-[2px_2px_0_#000] cursor-pointer",
          accentColor: "#000",
        };
      case Theme.UNDERTALE:
        return {
          bg: "bg-black text-white font-['Press_Start_2P']",
          panel: "bg-black border-4 border-white rounded-none shadow-[4px_4px_0_#FFF]",
          headerText: "text-white",
          subText: "text-white/60",
          input: "bg-black border-2 border-white text-white placeholder-white/40 focus:border-white rounded-none text-xs",
          addBtn: "bg-white text-black hover:bg-zinc-200 rounded-none text-xs font-bold shadow-[2px_2px_0_#FFF] cursor-pointer",
          item: "bg-black border-2 border-white text-white rounded-none shadow-[2px_2px_0_#FFF]",
          primaryBtn: "bg-white text-black hover:bg-zinc-200 rounded-none shadow-[4px_4px_0_#FFF] text-xs font-bold cursor-pointer",
          secondaryBtn: "bg-black border-2 border-white text-white hover:bg-white hover:text-black rounded-none text-xs cursor-pointer",
          accentColor: "#FFF",
        };
      case Theme.SONIC:
        return {
          bg: "bg-[#0122e5] text-white font-['Bangers']",
          panel: "bg-yellow-400 text-black border-4 border-black rounded-2xl shadow-[8px_8px_0_#000] -skew-x-2 tracking-wide",
          headerText: "text-black italic uppercase",
          subText: "text-black/70 font-sans text-xs",
          input: "bg-white border-3 border-black text-black placeholder-black/50 focus:border-black rounded-xl text-lg font-bold -skew-x-2",
          addBtn: "bg-red-600 text-white border-3 border-black rounded-xl font-black text-lg shadow-[3px_3px_0_#000] -skew-x-2 cursor-pointer",
          item: "bg-white border-3 border-black text-black rounded-xl shadow-[3px_3px_0_#000] -skew-x-2",
          primaryBtn: "bg-red-600 text-white border-4 border-black rounded-xl font-black text-xl shadow-[5px_5px_0_#000] -skew-x-2 cursor-pointer",
          secondaryBtn: "bg-white border-3 border-black text-black rounded-xl font-bold -skew-x-2 cursor-pointer",
          accentColor: "#E50000",
        };
      case Theme.PERSONA:
        return {
          bg: "bg-black text-white font-['Edo']",
          panel: "bg-[#0A0A0A] border-4 border-white rounded-none shadow-[8px_8px_0_#D80000] -skew-x-3 text-white italic",
          headerText: "text-white italic",
          subText: "text-white/60 font-sans text-xs",
          input: "bg-zinc-900 border-2 border-white/50 text-white placeholder-white/40 focus:border-white rounded-none text-base -skew-x-2",
          addBtn: "bg-[#D80000] text-white border-2 border-white rounded-none font-black text-sm shadow-[3px_3px_0_#000] -skew-x-2 cursor-pointer",
          item: "bg-zinc-900 border-2 border-white/40 text-white rounded-none shadow-[3px_3px_0_#D80000] -skew-x-2",
          primaryBtn: "bg-[#D80000] text-white border-2 border-white rounded-none font-black text-xl shadow-[5px_5px_0_#000] -skew-x-2 cursor-pointer",
          secondaryBtn: "bg-black border-2 border-white/50 text-white hover:bg-white hover:text-black rounded-none -skew-x-2 cursor-pointer",
          accentColor: "#D80000",
        };
      case Theme.MINECRAFT:
        return {
          bg: "bg-[#222] text-white font-['Minecraft']",
          panel: "bg-[#4B4B4B] border-4 border-t-[#AAA] border-l-[#AAA] border-r-[#222] border-b-[#222] rounded-none text-white text-xs shadow-2xl",
          headerText: "text-yellow-300",
          subText: "text-zinc-300 text-[10px]",
          input: "bg-[#333] border-2 border-t-[#222] border-l-[#222] border-r-[#AAA] border-b-[#AAA] text-white placeholder-zinc-500 rounded-none text-xs",
          addBtn: "bg-[#555] border-2 border-t-[#AAA] border-l-[#AAA] border-r-[#222] border-b-[#222] text-white rounded-none font-bold text-xs cursor-pointer",
          item: "bg-[#555] border-2 border-t-[#888] border-l-[#888] border-r-[#222] border-b-[#222] text-white rounded-none",
          primaryBtn: "bg-[#777] border-2 border-t-[#AAA] border-l-[#AAA] border-r-[#222] border-b-[#222] text-white font-bold rounded-none text-sm cursor-pointer",
          secondaryBtn: "bg-[#444] border-2 border-t-[#666] border-l-[#666] border-r-[#222] border-b-[#222] text-white rounded-none text-xs cursor-pointer",
          accentColor: "#55FF55",
        };
      case Theme.ANIMAL_CROSSING:
        return {
          bg: "bg-[#E6F3E6] text-[#4A7A56] font-['Sniglet']",
          panel: "bg-[#FBF8EF] border-4 border-[#7EBF8F] rounded-3xl text-[#4A7A56] shadow-xl",
          headerText: "text-[#2F6B3D]",
          subText: "text-[#4A7A56]/70 text-xs",
          input: "bg-white border-2 border-[#C0D8C5] text-[#4A7A56] placeholder-[#4A7A56]/40 focus:border-[#7EBF8F] rounded-2xl text-sm",
          addBtn: "bg-[#7EBF8F] hover:bg-[#68A879] text-white rounded-2xl font-bold shadow-md cursor-pointer",
          item: "bg-white border-2 border-[#E0EED5] text-[#4A7A56] rounded-2xl shadow-sm",
          primaryBtn: "bg-[#7EBF8F] hover:bg-[#68A879] text-white rounded-2xl font-bold shadow-lg text-lg cursor-pointer",
          secondaryBtn: "bg-[#F0EBE1] hover:bg-[#E4DED4] text-[#4A7A56] rounded-2xl font-bold text-xs cursor-pointer",
          accentColor: "#7EBF8F",
        };
      case Theme.SANRIO:
        return {
          bg: "bg-[#FFF0F5] text-[#D84B6B] font-['Cherry_Bomb_One']",
          panel: "bg-[#FFF5F8] border-4 border-[#FF8DA1] rounded-3xl text-[#D84B6B] shadow-2xl",
          headerText: "text-[#FF1493]",
          subText: "text-[#D84B6B]/70 font-sans text-xs",
          input: "bg-white border-2 border-[#FFB6C1] text-[#D84B6B] placeholder-[#FFB6C1] rounded-2xl text-sm font-sans",
          addBtn: "bg-[#FF69B4] hover:bg-[#FF1493] text-white rounded-2xl font-bold shadow-md cursor-pointer",
          item: "bg-white border-2 border-[#FFE4EC] text-[#D84B6B] rounded-2xl shadow-sm",
          primaryBtn: "bg-gradient-to-r from-[#FF69B4] to-[#FF1493] text-white rounded-2xl font-bold shadow-lg text-lg cursor-pointer",
          secondaryBtn: "bg-[#FFE4EC] text-[#D84B6B] rounded-2xl font-bold text-xs cursor-pointer",
          accentColor: "#FF1493",
        };
      case Theme.FNAF:
        return {
          bg: "bg-black text-green-400 font-['VT323']",
          panel: "bg-black border-2 border-green-500/80 rounded-none text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]",
          headerText: "text-green-400 tracking-widest",
          subText: "text-green-600 text-sm font-mono",
          input: "bg-black border border-green-500 text-green-400 placeholder-green-800 rounded-none text-lg font-mono",
          addBtn: "bg-green-950 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black rounded-none font-bold text-lg cursor-pointer",
          item: "bg-black border border-green-500/50 text-green-400 rounded-none",
          primaryBtn: "bg-green-950 border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black rounded-none font-bold text-xl cursor-pointer tracking-widest",
          secondaryBtn: "bg-black border border-green-700 text-green-600 hover:border-green-400 hover:text-green-400 rounded-none text-sm cursor-pointer",
          accentColor: "#22c55e",
        };
      case Theme.CYBERPUNK:
        return {
          bg: "bg-black text-yellow-400 font-['Orbitron']",
          panel: "bg-zinc-950 border-2 border-yellow-400 rounded-none text-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)]",
          headerText: "text-yellow-400 tracking-widest",
          subText: "text-yellow-400/60 text-xs font-mono",
          input: "bg-black border border-yellow-400 text-yellow-400 placeholder-yellow-800 rounded-none text-xs font-mono",
          addBtn: "bg-yellow-400 text-black font-bold rounded-none hover:bg-yellow-300 text-xs cursor-pointer",
          item: "bg-zinc-900 border border-yellow-400/40 text-yellow-400 rounded-none",
          primaryBtn: "bg-yellow-400 text-black hover:bg-yellow-300 rounded-none font-black text-base cursor-pointer tracking-wider",
          secondaryBtn: "bg-black border border-yellow-400/50 text-yellow-400 rounded-none text-xs cursor-pointer",
          accentColor: "#FACC15",
        };
      case Theme.FALLOUT:
        return {
          bg: "bg-black text-[#14FF00] font-['Share_Tech_Mono']",
          panel: "bg-black border-2 border-[#14FF00] rounded-none text-[#14FF00] shadow-[0_0_15px_rgba(20,255,0,0.3)]",
          headerText: "text-[#14FF00] tracking-widest",
          subText: "text-[#14FF00]/60 text-xs",
          input: "bg-black border border-[#14FF00] text-[#14FF00] placeholder-[#14FF00]/40 rounded-none text-xs",
          addBtn: "bg-[#14FF00]/20 border border-[#14FF00] text-[#14FF00] hover:bg-[#14FF00] hover:text-black rounded-none font-bold text-xs cursor-pointer",
          item: "bg-black border border-[#14FF00]/40 text-[#14FF00] rounded-none",
          primaryBtn: "bg-[#14FF00]/20 border-2 border-[#14FF00] text-[#14FF00] hover:bg-[#14FF00] hover:text-black rounded-none font-bold text-sm cursor-pointer tracking-wider",
          secondaryBtn: "bg-black border border-[#14FF00]/50 text-[#14FF00] rounded-none text-xs cursor-pointer",
          accentColor: "#14FF00",
        };
      case Theme.DANGANRONPA:
        return {
          bg: "bg-[#050510] text-white font-mono",
          panel: "bg-[#0a0a1a] border-2 border-[#FF007F] rounded-none text-white shadow-[0_0_20px_rgba(255,0,127,0.4)]",
          headerText: "text-[#FF007F] font-bold tracking-wider",
          subText: "text-white/60 text-xs",
          input: "bg-black border border-[#FF007F] text-white placeholder-white/30 rounded-none text-xs",
          addBtn: "bg-[#FF007F] text-white hover:bg-[#d6006b] rounded-none font-bold text-xs cursor-pointer",
          item: "bg-black border border-[#FF007F]/40 text-white rounded-none",
          primaryBtn: "bg-[#FF007F] hover:bg-[#d6006b] text-white rounded-none font-bold text-sm cursor-pointer tracking-wider",
          secondaryBtn: "bg-black border border-white/30 text-white rounded-none text-xs cursor-pointer",
          accentColor: "#FF007F",
        };
      case Theme.KIRBY:
        return {
          bg: "bg-[#FFE4EF] text-[#D81B60] font-['Fredoka_One']",
          panel: "bg-[#FFF0F5] border-4 border-[#FF85B3] rounded-3xl text-[#D81B60] shadow-xl",
          headerText: "text-[#E91E63]",
          subText: "text-[#D81B60]/70 text-xs",
          input: "bg-white border-2 border-[#FF85B3] text-[#D81B60] placeholder-[#FF85B3]/50 rounded-2xl text-sm",
          addBtn: "bg-[#FF85B3] hover:bg-[#e66c9a] text-white rounded-2xl font-bold shadow-md cursor-pointer",
          item: "bg-white border-2 border-[#FFD0E0] text-[#D81B60] rounded-2xl",
          primaryBtn: "bg-gradient-to-r from-[#FF85B3] to-[#E91E63] text-white rounded-2xl font-bold shadow-lg text-lg cursor-pointer",
          secondaryBtn: "bg-white border-2 border-[#FF85B3]/40 text-[#D81B60] rounded-2xl text-xs cursor-pointer",
          accentColor: "#FF85B3",
        };
      case Theme.POKEMON:
        return {
          bg: "bg-zinc-900 text-white font-['Press_Start_2P']",
          panel: "bg-zinc-800 border-4 border-[#3B4CCA] rounded-none text-white shadow-[6px_6px_0_#3B4CCA]",
          headerText: "text-[#FFDE00]",
          subText: "text-zinc-400 text-[9px]",
          input: "bg-zinc-900 border-2 border-[#3B4CCA] text-white placeholder-zinc-500 rounded-none text-xs",
          addBtn: "bg-[#CC0000] text-white hover:bg-[#b00000] rounded-none text-xs font-bold cursor-pointer",
          item: "bg-zinc-900 border-2 border-zinc-700 text-white rounded-none",
          primaryBtn: "bg-[#3B4CCA] text-[#FFDE00] hover:bg-[#2f3da2] rounded-none shadow-[4px_4px_0_#000] text-xs font-bold cursor-pointer",
          secondaryBtn: "bg-zinc-900 border-2 border-zinc-600 text-white rounded-none text-[9px] cursor-pointer",
          accentColor: "#FFDE00",
        };
      case Theme.SKYRIM:
        return {
          bg: "bg-black text-[#D4AF37] font-['Cinzel']",
          panel: "bg-[#0A0A0A] border-2 border-[#D4AF37] rounded-none text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)]",
          headerText: "text-[#D4AF37] tracking-widest uppercase",
          subText: "text-[#D4AF37]/60 text-xs font-serif",
          input: "bg-black border border-[#D4AF37] text-[#D4AF37] placeholder-[#D4AF37]/40 rounded-none text-xs font-serif",
          addBtn: "bg-[#D4AF37] text-black hover:bg-[#bfa032] rounded-none font-bold text-xs cursor-pointer",
          item: "bg-zinc-950 border border-[#D4AF37]/40 text-[#D4AF37] rounded-none",
          primaryBtn: "bg-[#D4AF37] text-black hover:bg-[#bfa032] rounded-none font-bold text-base cursor-pointer tracking-widest",
          secondaryBtn: "bg-black border border-[#D4AF37]/50 text-[#D4AF37] rounded-none text-xs cursor-pointer",
          accentColor: "#D4AF37",
        };
      case Theme.HAZBIN:
        return {
          bg: "bg-[#1a050f] text-[#ffcccb] font-['Lora']",
          panel: "bg-[#250815] border-2 border-[#FFD700] rounded-none text-[#ffcccb] shadow-[0_0_20px_rgba(229,43,80,0.4)]",
          headerText: "text-[#FFD700] font-['Fascinate_Inline'] tracking-wider",
          subText: "text-[#ffcccb]/60 text-xs",
          input: "bg-[#1a050f] border border-[#e52b50] text-[#ffcccb] placeholder-[#ffcccb]/40 rounded-none text-xs",
          addBtn: "bg-[#e52b50] text-white hover:bg-[#c22443] rounded-none font-bold text-xs cursor-pointer",
          item: "bg-[#1a050f] border border-[#FFD700]/40 text-[#ffcccb] rounded-none",
          primaryBtn: "bg-gradient-to-r from-[#e52b50] to-[#FFD700] text-black hover:opacity-90 rounded-none font-bold text-base cursor-pointer tracking-wider",
          secondaryBtn: "bg-[#1a050f] border border-[#FFD700]/50 text-[#FFD700] rounded-none text-xs cursor-pointer",
          accentColor: "#FFD700",
        };
      case Theme.VOCALOID:
        return {
          bg: "bg-black text-[#39C5BB] font-['Orbitron']",
          panel: "bg-zinc-950 border-2 border-[#39C5BB] rounded-none text-[#39C5BB] shadow-[0_0_20px_rgba(57,197,187,0.4)]",
          headerText: "text-[#39C5BB] tracking-widest",
          subText: "text-[#39C5BB]/60 text-xs font-mono",
          input: "bg-black border border-[#39C5BB] text-[#39C5BB] placeholder-[#39C5BB]/40 rounded-none text-xs font-mono",
          addBtn: "bg-[#39C5BB] text-black hover:bg-[#32ada4] rounded-none font-bold text-xs cursor-pointer",
          item: "bg-black border border-[#39C5BB]/40 text-[#39C5BB] rounded-none",
          primaryBtn: "bg-[#39C5BB] text-black hover:bg-[#32ada4] rounded-none font-bold text-base cursor-pointer tracking-wider",
          secondaryBtn: "bg-black border border-[#39C5BB]/50 text-[#39C5BB] rounded-none text-xs cursor-pointer",
          accentColor: "#39C5BB",
        };
      case Theme.IRUMA:
        return {
          bg: "bg-[#2e1534] text-white font-['Sniglet']",
          panel: "bg-[#3e1544] border-4 border-[#ffd700] rounded-3xl text-white shadow-[0_0_20px_rgba(255,215,0,0.3)]",
          headerText: "text-[#ffd700] tracking-wide",
          subText: "text-white/60 text-xs",
          input: "bg-[#2e1534] border-2 border-[#ffd700]/60 text-white placeholder-white/40 rounded-2xl text-sm",
          addBtn: "bg-[#ffd700] text-black hover:bg-[#e6c200] rounded-2xl font-bold shadow-md cursor-pointer",
          item: "bg-[#2e1534] border-2 border-[#ffd700]/30 text-white rounded-2xl",
          primaryBtn: "bg-gradient-to-r from-[#ffd700] to-[#E040FB] text-black font-bold rounded-2xl shadow-lg text-lg cursor-pointer",
          secondaryBtn: "bg-[#2e1534] border-2 border-[#ffd700]/50 text-[#ffd700] rounded-2xl text-xs cursor-pointer",
          accentColor: "#ffd700",
        };
      case Theme.ARCANE:
        return {
          bg: "bg-[#0b0c10] text-[#00E5FF] font-['Cinzel']",
          panel: "bg-[#0b0c10] border-2 border-[#C8AA6E] rounded-none text-stone-200 shadow-[0_0_25px_rgba(0,229,255,0.3)]",
          headerText: "text-[#00E5FF] tracking-widest uppercase",
          subText: "text-[#C8AA6E] text-xs font-serif",
          input: "bg-black border border-[#C8AA6E] text-[#00E5FF] placeholder-[#C8AA6E]/40 rounded-none text-xs font-serif",
          addBtn: "bg-black border border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black rounded-none font-bold text-xs cursor-pointer",
          item: "bg-black/80 border border-[#C8AA6E]/40 text-stone-200 rounded-none",
          primaryBtn: "bg-black border-2 border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black rounded-none font-bold text-base cursor-pointer tracking-widest",
          secondaryBtn: "bg-black border border-[#C8AA6E] text-[#C8AA6E] rounded-none text-xs cursor-pointer",
          accentColor: "#00E5FF",
        };
      case Theme.BILLY_HATCHER:
        return {
          bg: "bg-[#FDFAF4] text-[#1873CA] font-['Fredoka_One']",
          panel: "bg-[#FFFDF8] border-4 border-[#1873CA] rounded-3xl text-[#222] shadow-xl",
          headerText: "text-[#1873CA]",
          subText: "text-[#1873CA]/70 text-xs",
          input: "bg-white border-2 border-[#1873CA] text-[#222] placeholder-[#1873CA]/40 rounded-2xl text-sm",
          addBtn: "bg-[#FF9800] text-white hover:bg-[#e68900] rounded-2xl font-bold shadow-md cursor-pointer",
          item: "bg-white border-2 border-[#1873CA]/20 text-[#222] rounded-2xl",
          primaryBtn: "bg-gradient-to-r from-[#1873CA] to-[#00A3E0] text-white rounded-2xl font-bold shadow-lg text-lg cursor-pointer",
          secondaryBtn: "bg-white border-2 border-[#1873CA]/40 text-[#1873CA] rounded-2xl text-xs cursor-pointer",
          accentColor: "#1873CA",
        };
      default:
        return {
          bg: "bg-black text-white font-sans",
          panel: "bg-zinc-950 border-2 border-white/20 rounded-2xl shadow-2xl",
          headerText: "text-white",
          subText: "text-white/60",
          input: "bg-white/5 border-2 border-white/20 focus:border-red-500 rounded-xl text-white placeholder-white/40",
          addBtn: "bg-red-600 hover:bg-red-500 rounded-xl font-black text-sm cursor-pointer",
          item: "bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl",
          primaryBtn: "bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 rounded-xl font-black text-lg cursor-pointer",
          secondaryBtn: "bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white cursor-pointer",
          accentColor: "#ef4444",
        };
    }
  };

  const themeStyle = getThemeSetupStyles(theme);

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
    <div className={`min-h-screen w-screen ${themeStyle.bg} flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto select-none`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`w-full max-w-lg ${themeStyle.panel} p-6 sm:p-8 space-y-5 my-auto`}
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-block p-3 rounded-2xl bg-black/10 dark:bg-white/10 border border-current/20 shadow-md mb-1">
            <span className="text-3xl">👥</span>
          </div>
          <h1 className={`text-2xl sm:text-3xl font-black ${themeStyle.headerText}`}>
            PASS & PLAY ROSTER
          </h1>
          <p className={`text-xs ${themeStyle.subText} max-w-sm mx-auto`}>
            Assemble your party! Select an avatar & color to track turns, forfeits, and live voting.
          </p>
        </div>

        {/* Add Player Input with Avatar & Color Pickers */}
        <form onSubmit={handleAdd} className="space-y-3">
          <div className="flex gap-2">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-md border-2 border-current/20 shrink-0"
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
              className={`flex-1 ${themeStyle.input} px-4 py-3 text-base focus:outline-none transition-colors`}
            />
            <button
              type="submit"
              disabled={!inputName.trim()}
              className={`px-5 py-3 ${themeStyle.addBtn} disabled:opacity-40 uppercase tracking-wider transition-all shadow-md active:scale-95`}
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
                      ? 'bg-current/20 scale-110 shadow-sm border border-current'
                      : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 opacity-70'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
            <div className="flex gap-1.5 shrink-0 pl-2 border-l border-current/20">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setSelectedColor(c);
                    hapticService.light();
                  }}
                  className={`w-5 h-5 rounded-full transition-all ${
                    selectedColor === c ? 'scale-125 ring-2 ring-current' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </form>

        {/* Chaos Mode Toggle */}
        <div className={`flex items-center justify-between p-3 ${themeStyle.item} text-xs`}>
          <div>
            <div className="font-bold flex items-center gap-1.5">
              <span>🎲 CHAOS TURN ORDER</span>
              {chaosMode && <span className="px-1.5 py-0.5 rounded bg-purple-600 text-white text-[9px] font-black uppercase">ON</span>}
            </div>
            <div className={`text-[10px] ${themeStyle.subText}`}>Fair random shuffle: unpredictable order without repeating</div>
          </div>
          <button
            type="button"
            onClick={toggleChaosMode}
            className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
              chaosMode ? 'bg-purple-600 text-white shadow' : 'bg-current/10 border border-current/20 opacity-70'
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
                className={`py-8 text-center space-y-3 ${themeStyle.item} border-dashed p-4`}
              >
                <p className={`text-sm ${themeStyle.subText} italic`}>No players added yet.</p>
                <button
                  type="button"
                  onClick={handleAddPresets}
                  className={`px-4 py-2 ${themeStyle.secondaryBtn} text-xs font-bold uppercase tracking-wider transition-colors`}
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
                  className={`flex items-center justify-between p-3 ${themeStyle.item} transition-colors group`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs opacity-50 font-bold">#{index + 1}</span>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm text-white shadow-sm"
                      style={{ backgroundColor: p.color || '#ef4444' }}
                    >
                      {p.avatar || p.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-bold text-base">{p.name}</span>
                  </div>

                  <button
                    onClick={() => removePlayer(p.id)}
                    title="Remove player"
                    className="w-7 h-7 rounded-lg bg-current/10 hover:bg-red-600 hover:text-white border border-current/20 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                  >
                    ✕
                  </button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Action Controls */}
        <div className="space-y-3 pt-2 border-t border-current/20">
          <button
            onClick={handleStartGame}
            disabled={players.length === 0}
            className={`w-full py-4 ${themeStyle.primaryBtn} disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-wider shadow-lg transition-all active:scale-95`}
          >
            START ADVENTURE ({players.length} {players.length === 1 ? 'PLAYER' : 'PLAYERS'})
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleQuickPlay}
              className={`py-3 px-4 ${themeStyle.secondaryBtn} text-xs font-bold uppercase tracking-wider transition-colors`}
            >
              Skip (Solo Play)
            </button>
            <button
              onClick={() => {
                hapticService.light();
                setView('menu');
              }}
              className={`py-3 px-4 ${themeStyle.secondaryBtn} text-xs font-bold uppercase tracking-wider transition-colors`}
            >
              Back to Menu
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
