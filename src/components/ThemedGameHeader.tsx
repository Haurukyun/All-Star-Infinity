import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player, Theme, Intensity, GameMode, TimerDuration } from '../types';
import { CountdownTimer } from './CountdownTimer';
import { ThemeLoreBadge } from './ThemeLoreBadge';
import { hapticService } from '../services/haptics';

interface ThemedGameHeaderProps {
  theme: Theme;
  intensity: Intensity | null;
  gameMode: GameMode | null;
  onOpenModeChooser: () => void;
  onOpenAwards: () => void;
  timerEnabled: boolean;
  timerDuration: TimerDuration;
  onToggleTimer: () => void;
  onChangeTimerDuration: (d: TimerDuration) => void;
  promptId?: string;
  isPromptActive: boolean;
  playersEnabled: boolean;
  players: Player[];
  activePlayer: Player | null;
  targetPlayer: Player | null;
  onNextPlayer: () => void;
  onPrevPlayer: () => void;
  onIncrementChicken: (id?: string) => void;
  onAddPlayer: (name: string) => void;
  onRemovePlayer: (id: string) => void;
}

export const ThemedGameHeader: React.FC<ThemedGameHeaderProps> = ({
  theme,
  intensity,
  gameMode,
  onOpenModeChooser,
  onOpenAwards,
  timerEnabled,
  timerDuration,
  onToggleTimer,
  onChangeTimerDuration,
  promptId,
  isPromptActive,
  playersEnabled,
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

  const getModeLabel = () => {
    switch (gameMode) {
      case GameMode.TRUTH_OR_DARE: return 'TRUTH OR DARE';
      case GameMode.NEVER_HAVE_I_EVER: return 'NEVER HAVE I EVER';
      case GameMode.MOST_LIKELY_TO: return 'MOST LIKELY TO';
      case GameMode.WOULD_YOU_RATHER: return 'WOULD YOU RATHER';
      case GameMode.HOT_SEAT: return 'HOT SEAT';
      default: return 'MINIGAME';
    }
  };

  const handleChicken = () => {
    if (!activePlayer) return;
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

  const getThemeStyles = () => {
    const isVulgar = theme === Theme.OMORI && intensity === Intensity.VULGAR;
    const isHot = theme === Theme.OMORI && intensity === Intensity.HOT;

    switch (theme) {
      case Theme.UNDERTALE:
        return {
          font: "'Press Start 2P', monospace",
          frame: "bg-black border-2 border-white rounded-none shadow-[2px_2px_0_#FFF] p-2 text-white text-[10px] space-y-1.5 mb-2",
          topRow: "flex justify-between items-center gap-1.5 border-b border-white/30 pb-1.5",
          modeBtn: "border border-white bg-black text-white hover:bg-white hover:text-black px-2 py-0.5 rounded-none text-[9px] active:scale-95 transition-all cursor-pointer",
          awardsBtn: "border border-white bg-black text-white hover:bg-white hover:text-black px-2 py-0.5 rounded-none text-[9px] cursor-pointer",
          rosterBtn: "border border-white bg-black text-white hover:bg-white hover:text-black px-2 py-0.5 rounded-none text-[9px] cursor-pointer",
          navBtn: "border border-white bg-black text-white hover:bg-white hover:text-black w-5 h-5 flex items-center justify-center rounded-none text-[9px] cursor-pointer",
          forfeitBtn: "border border-white bg-black text-white hover:bg-white hover:text-black px-2 py-0.5 rounded-none text-[9px] font-bold cursor-pointer active:scale-95",
          forfeitBtnActive: "bg-red-600 text-white border-red-500",
          modal: "bg-black border-4 border-white text-white font-['Press_Start_2P'] rounded-none p-5 text-[10px]",
          forfeitLabel: "Fled",
          forfeitIcon: "×",
          targetPrefix: "TARGET: * ",
          rosterIcon: "♦",
        };

      case Theme.POKEMON:
        return {
          font: "'Press Start 2P', monospace",
          frame: "bg-[#F8F8D0] border-2 border-[#606060] rounded-lg shadow-[inset_0_0_0_2px_#D0D0A8,0_3px_0_rgba(0,0,0,0.3)] p-2 text-[#404040] text-[9px] space-y-1.5 mb-2",
          topRow: "flex justify-between items-center gap-1.5 border-b-2 border-[#D0D0A8] pb-1.5",
          modeBtn: "bg-[#F8F8F8] border border-[#808080] text-[#404040] hover:bg-[#F8D030] px-2 py-1 rounded shadow-xs text-[8px] active:scale-95 cursor-pointer",
          awardsBtn: "bg-[#F8F8F8] border border-[#808080] text-[#404040] hover:bg-[#F8D030] px-2 py-1 rounded shadow-xs text-[8px] cursor-pointer",
          rosterBtn: "bg-[#F8F8F8] border border-[#808080] text-[#404040] hover:bg-[#F8D030] px-2 py-1 rounded shadow-xs text-[8px] cursor-pointer",
          navBtn: "bg-[#F8F8F8] border border-[#808080] text-[#404040] hover:bg-[#F8D030] w-5 h-5 flex items-center justify-center rounded text-[9px] cursor-pointer",
          forfeitBtn: "bg-[#CC0000] text-white hover:bg-[#B00000] border border-black px-2 py-1 rounded text-[8px] font-bold cursor-pointer active:scale-95",
          forfeitBtnActive: "bg-black text-white",
          modal: "bg-[#F8F8D0] border-4 border-[#606060] text-[#404040] font-['Press_Start_2P'] rounded-lg p-5 text-[9px]",
          forfeitLabel: "Run",
          forfeitIcon: "×",
          targetPrefix: "VS: ",
          rosterIcon: "▪",
        };

      case Theme.OMORI:
        return {
          font: "'Gloria Hallelujah', cursive",
          frame: isVulgar
            ? "bg-black border-2 border-[#ff0000] rounded-none shadow-[3px_3px_0_#ff0000] p-2 text-[#ff0000] text-xs space-y-1 mb-2 font-['Gloria_Hallelujah']"
            : isHot
            ? "bg-[#9B6EFF] border-2 border-white rounded-none shadow-[3px_3px_0_#7B55CC] p-2 text-white text-xs space-y-1 mb-2 font-['Gloria_Hallelujah']"
            : "bg-white border-2 border-black rounded-none shadow-[3px_3px_0_#000] p-2 text-black text-xs space-y-1 mb-2 font-['Gloria_Hallelujah']",
          topRow: isVulgar
            ? "flex justify-between items-center gap-1.5 border-b border-[#ff0000]/40 pb-1"
            : isHot
            ? "flex justify-between items-center gap-1.5 border-b border-white/40 pb-1"
            : "flex justify-between items-center gap-1.5 border-b border-black/30 pb-1",
          modeBtn: isVulgar
            ? "border border-[#ff0000] bg-black text-[#ff0000] hover:bg-[#ff0000] hover:text-black px-2 py-0.5 rounded-none text-xs cursor-pointer font-bold"
            : isHot
            ? "border border-white bg-[#7B55CC] text-white hover:bg-white hover:text-[#7B55CC] px-2 py-0.5 rounded-none text-xs cursor-pointer font-bold"
            : "border border-black bg-white text-black hover:bg-black hover:text-white px-2 py-0.5 rounded-none text-xs cursor-pointer font-bold",
          awardsBtn: isVulgar
            ? "border border-[#ff0000] bg-black text-[#ff0000] px-2 py-0.5 rounded-none text-xs cursor-pointer font-bold"
            : isHot
            ? "border border-white bg-[#7B55CC] text-white px-2 py-0.5 rounded-none text-xs cursor-pointer font-bold"
            : "border border-black bg-white text-black px-2 py-0.5 rounded-none text-xs cursor-pointer font-bold",
          rosterBtn: isVulgar
            ? "border border-[#ff0000] bg-black text-[#ff0000] px-2 py-0.5 rounded-none text-xs cursor-pointer font-bold"
            : isHot
            ? "border border-white bg-[#7B55CC] text-white px-2 py-0.5 rounded-none text-xs cursor-pointer font-bold"
            : "border border-black bg-white text-black px-2 py-0.5 rounded-none text-xs cursor-pointer font-bold",
          navBtn: isVulgar
            ? "border border-[#ff0000] bg-black text-[#ff0000] w-6 h-6 flex items-center justify-center rounded-none font-bold cursor-pointer"
            : isHot
            ? "border border-white bg-[#7B55CC] text-white w-6 h-6 flex items-center justify-center rounded-none font-bold cursor-pointer"
            : "border border-black bg-white text-black w-6 h-6 flex items-center justify-center rounded-none font-bold cursor-pointer",
          forfeitBtn: isVulgar
            ? "border border-[#ff0000] bg-black text-[#ff0000] px-2.5 py-0.5 rounded-none font-bold cursor-pointer active:scale-95"
            : isHot
            ? "border border-white bg-[#7B55CC] text-white px-2.5 py-0.5 rounded-none font-bold cursor-pointer active:scale-95"
            : "border border-black bg-white text-black px-2.5 py-0.5 rounded-none font-bold cursor-pointer active:scale-95",
          forfeitBtnActive: isVulgar ? "bg-[#ff0000] text-black" : "bg-black text-white",
          modal: isVulgar
            ? "bg-black border-4 border-[#ff0000] text-[#ff0000] font-['Gloria_Hallelujah'] rounded-none p-5"
            : isHot
            ? "bg-[#9B6EFF] border-4 border-white text-white font-['Gloria_Hallelujah'] rounded-none p-5"
            : "bg-white border-4 border-black text-black font-['Gloria_Hallelujah'] rounded-none p-5",
          forfeitLabel: "Forfeit",
          forfeitIcon: "×",
          targetPrefix: "target: ",
          rosterIcon: "▪",
        };

      case Theme.HAZBIN:
        return {
          font: "'Lora', serif",
          frame: "bg-[#1a050f] border border-[#FFD700] rounded-none shadow-[0_0_10px_rgba(229,43,80,0.3)] p-2 text-[#ffcccb] text-xs space-y-1.5 mb-2 font-['Lora']",
          topRow: "flex justify-between items-center gap-1.5 border-b border-[#FFD700]/30 pb-1.5",
          modeBtn: "border border-[#FFD700] bg-[#1a050f] text-[#FFD700] hover:bg-[#FFD700] hover:text-black px-2 py-0.5 rounded-none text-xs cursor-pointer font-bold tracking-wider",
          awardsBtn: "border border-[#FFD700]/70 bg-[#1a050f] text-[#FFD700] px-2 py-0.5 rounded-none text-xs cursor-pointer",
          rosterBtn: "border border-[#FFD700]/70 bg-[#1a050f] text-[#FFD700] px-2 py-0.5 rounded-none text-xs cursor-pointer",
          navBtn: "border border-[#FFD700] bg-black text-[#FFD700] w-6 h-6 flex items-center justify-center rounded-none cursor-pointer",
          forfeitBtn: "border border-red-600 bg-red-950 text-[#FFD700] px-2.5 py-0.5 rounded-none font-bold cursor-pointer active:scale-95",
          forfeitBtnActive: "bg-[#FFD700] text-black",
          modal: "bg-[#1a050f] border-2 border-[#FFD700] text-[#ffcccb] font-['Lora'] rounded-none p-5",
          forfeitLabel: "Default",
          forfeitIcon: "!",
          targetPrefix: "TARGET: ",
          rosterIcon: "✦",
        };

      case Theme.PERSONA:
        return {
          font: "'Edo', sans-serif",
          frame: "-skew-x-12 bg-[#0A0A0A] border-2 border-white rounded-none shadow-[4px_4px_0_#D80000] p-2 text-white text-xs space-y-1.5 mb-2 font-['Edo'] italic",
          topRow: "flex justify-between items-center gap-1.5 border-b border-[#D80000] pb-1.5",
          modeBtn: "border border-white bg-black text-white hover:bg-[#D80000] px-2.5 py-0.5 rounded-none text-xs cursor-pointer font-bold",
          awardsBtn: "border border-white bg-[#D80000] text-white px-2 py-0.5 rounded-none text-xs cursor-pointer font-bold",
          rosterBtn: "border border-white bg-black text-white px-2 py-0.5 rounded-none text-xs cursor-pointer",
          navBtn: "border border-white bg-black text-white hover:bg-[#D80000] w-6 h-6 flex items-center justify-center rounded-none text-xs cursor-pointer",
          forfeitBtn: "border-2 border-white bg-[#D80000] text-white px-2.5 py-0.5 rounded-none text-xs font-bold cursor-pointer active:scale-95",
          forfeitBtnActive: "bg-white text-black",
          modal: "bg-[#0A0A0A] border-4 border-white text-white font-['Edo'] rounded-none shadow-[8px_8px_0_#D80000] p-5",
          forfeitLabel: "Yield",
          forfeitIcon: "☠",
          targetPrefix: "TARGET: ",
          rosterIcon: "♠",
        };

      case Theme.SONIC:
        return {
          font: "'Bangers', cursive",
          frame: "-skew-x-12 bg-yellow-400 border-3 border-black rounded-xl shadow-[4px_4px_0_#000] p-2 text-black text-sm space-y-1 mb-2 font-['Bangers'] tracking-wide",
          topRow: "flex justify-between items-center gap-1.5 border-b-2 border-black pb-1",
          modeBtn: "border-2 border-black bg-white text-black hover:bg-black hover:text-white px-2.5 py-0.5 rounded-lg text-sm cursor-pointer font-black",
          awardsBtn: "border-2 border-black bg-white text-black px-2 py-0.5 rounded-lg text-xs cursor-pointer font-black",
          rosterBtn: "border-2 border-black bg-white text-black px-2 py-0.5 rounded-lg text-xs cursor-pointer font-black",
          navBtn: "border-2 border-black bg-white text-black w-6 h-6 flex items-center justify-center rounded-lg text-xs cursor-pointer font-black",
          forfeitBtn: "border-2 border-black bg-red-600 text-white px-2.5 py-0.5 rounded-lg font-black text-xs cursor-pointer active:scale-95",
          forfeitBtnActive: "bg-black text-yellow-400",
          modal: "bg-yellow-400 border-4 border-black text-black font-['Bangers'] rounded-xl p-5",
          forfeitLabel: "Drop",
          forfeitIcon: "⚡",
          targetPrefix: "RIVAL: ",
          rosterIcon: "★",
        };

      case Theme.MINECRAFT:
        return {
          font: "'Minecraft', monospace",
          frame: "bg-[#707070] border-2 border-t-[#AAA] border-l-[#AAA] border-r-[#222] border-b-[#222] rounded-none p-2 text-white text-[10px] space-y-1.5 mb-2 font-['Minecraft']",
          topRow: "flex justify-between items-center gap-1.5 border-b border-[#373737] pb-1.5",
          modeBtn: "border-2 border-t-[#AAA] border-l-[#AAA] border-r-[#373737] border-b-[#373737] bg-[#555] hover:bg-[#666] text-white px-2 py-0.5 rounded-none cursor-pointer",
          awardsBtn: "border-2 border-t-[#AAA] border-l-[#AAA] border-r-[#373737] border-b-[#373737] bg-[#555] text-white px-2 py-0.5 rounded-none cursor-pointer",
          rosterBtn: "border-2 border-t-[#AAA] border-l-[#AAA] border-r-[#373737] border-b-[#373737] bg-[#555] text-white px-2 py-0.5 rounded-none cursor-pointer",
          navBtn: "border-2 border-t-[#AAA] border-l-[#AAA] border-r-[#373737] border-b-[#373737] bg-[#555] w-5 h-5 flex items-center justify-center rounded-none cursor-pointer",
          forfeitBtn: "border-2 border-t-[#FA0] border-l-[#FA0] border-r-[#740] border-b-[#740] bg-[#C80] text-white px-2 py-0.5 rounded-none font-bold cursor-pointer active:scale-95",
          forfeitBtnActive: "bg-[#A00]",
          modal: "bg-[#4B4B4B] border-4 border-t-[#AAA] border-l-[#AAA] border-r-[#222] border-b-[#222] text-white font-['Minecraft'] rounded-none p-5 text-[10px]",
          forfeitLabel: "Yield",
          forfeitIcon: "×",
          targetPrefix: "Target: ",
          rosterIcon: "▪",
        };

      case Theme.FNAF:
        return {
          font: "'VT323', monospace",
          frame: "bg-black border border-green-500/80 rounded-none shadow-[0_0_10px_rgba(34,197,94,0.3)] p-2 text-green-400 text-sm space-y-1 mb-2 font-['VT323'] tracking-wider",
          topRow: "flex justify-between items-center gap-1.5 border-b border-green-500/30 pb-1",
          modeBtn: "border border-green-500 bg-black text-green-400 hover:bg-green-500 hover:text-black px-2 py-0.5 rounded-none cursor-pointer text-sm",
          awardsBtn: "border border-green-500/60 bg-black text-green-400 px-2 py-0.5 rounded-none text-xs cursor-pointer",
          rosterBtn: "border border-green-500/60 bg-black text-green-400 px-2 py-0.5 rounded-none text-xs cursor-pointer",
          navBtn: "border border-green-500 bg-black text-green-400 w-6 h-6 flex items-center justify-center rounded-none cursor-pointer",
          forfeitBtn: "border border-amber-500 bg-black text-amber-400 hover:bg-amber-500 hover:text-black px-2.5 py-0.5 rounded-none font-bold cursor-pointer active:scale-95",
          forfeitBtnActive: "bg-amber-500 text-black",
          modal: "bg-black border-2 border-green-500/80 text-green-400 font-['VT323'] rounded-none p-5 text-sm",
          forfeitLabel: "Aborted",
          forfeitIcon: "!",
          targetPrefix: "MONITORING: ",
          rosterIcon: "■",
        };

      case Theme.FALLOUT:
        return {
          font: "'Share Tech Mono', monospace",
          frame: "bg-black border border-[#14FF00] rounded-none shadow-[0_0_8px_rgba(20,255,0,0.3)] p-2 text-[#14FF00] text-xs space-y-1 mb-2 font-['Share_Tech_Mono']",
          topRow: "flex justify-between items-center gap-1.5 border-b border-[#14FF00]/30 pb-1",
          modeBtn: "border border-[#14FF00] bg-black text-[#14FF00] hover:bg-[#14FF00] hover:text-black px-2 py-0.5 rounded-none cursor-pointer text-xs",
          awardsBtn: "border border-[#14FF00]/60 bg-black text-[#14FF00] px-2 py-0.5 rounded-none text-xs cursor-pointer",
          rosterBtn: "border border-[#14FF00]/60 bg-black text-[#14FF00] px-2 py-0.5 rounded-none text-xs cursor-pointer",
          navBtn: "border border-[#14FF00] bg-black text-[#14FF00] w-5 h-5 flex items-center justify-center rounded-none cursor-pointer",
          forfeitBtn: "border border-[#FFAA00] bg-black text-[#FFAA00] hover:bg-[#FFAA00] hover:text-black px-2 py-0.5 rounded-none font-bold cursor-pointer active:scale-95",
          forfeitBtnActive: "bg-[#FFAA00] text-black",
          modal: "bg-black border-2 border-[#14FF00] text-[#14FF00] font-['Share_Tech_Mono'] rounded-none p-5 text-xs",
          forfeitLabel: "Forfeit",
          forfeitIcon: "×",
          targetPrefix: "TARGET: ",
          rosterIcon: "◉",
        };

      case Theme.CYBERPUNK:
        return {
          font: "'Orbitron', sans-serif",
          frame: "bg-black border border-yellow-400 rounded-none shadow-[0_0_8px_rgba(250,204,21,0.3)] p-2 text-yellow-400 text-xs space-y-1 mb-2 font-['Orbitron']",
          topRow: "flex justify-between items-center gap-1.5 border-b border-yellow-400/30 pb-1",
          modeBtn: "border border-yellow-400 bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black px-2 py-0.5 rounded-none cursor-pointer text-[10px]",
          awardsBtn: "border border-yellow-400/60 bg-black text-yellow-400 px-2 py-0.5 rounded-none text-[10px] cursor-pointer",
          rosterBtn: "border border-yellow-400/60 bg-black text-yellow-400 px-2 py-0.5 rounded-none text-[10px] cursor-pointer",
          navBtn: "border border-yellow-400 bg-black text-yellow-400 w-5 h-5 flex items-center justify-center rounded-none text-[10px] cursor-pointer",
          forfeitBtn: "border border-red-500 bg-black text-red-400 hover:bg-red-500 hover:text-white px-2 py-0.5 rounded-none font-bold text-[10px] cursor-pointer active:scale-95",
          forfeitBtnActive: "bg-red-600 text-white",
          modal: "bg-black border-2 border-yellow-400 text-yellow-400 font-['Orbitron'] rounded-none p-5 text-xs",
          forfeitLabel: "Surrender",
          forfeitIcon: "//X",
          targetPrefix: ">> TARGET: ",
          rosterIcon: "::",
        };

      case Theme.KIRBY:
        return {
          font: "'Fredoka One', cursive",
          frame: "bg-[#FFE4EF] border-2 border-[#FF85B3] rounded-2xl shadow-sm p-2.5 text-[#D81B60] text-xs space-y-1 mb-2 font-['Fredoka_One']",
          topRow: "flex justify-between items-center gap-1.5 border-b border-[#FF85B3]/40 pb-1",
          modeBtn: "border border-[#FF85B3] bg-white text-[#D81B60] hover:bg-[#FF85B3] hover:text-white px-2.5 py-0.5 rounded-xl text-xs cursor-pointer font-bold",
          awardsBtn: "border border-[#FF85B3]/60 bg-white text-[#D81B60] px-2 py-0.5 rounded-xl text-xs cursor-pointer font-bold",
          rosterBtn: "border border-[#FF85B3]/60 bg-white text-[#D81B60] px-2 py-0.5 rounded-xl text-xs cursor-bold font-bold",
          navBtn: "border border-[#FF85B3] bg-white text-[#D81B60] w-6 h-6 flex items-center justify-center rounded-xl text-xs cursor-pointer",
          forfeitBtn: "border border-[#FFA726] bg-[#FFF3E0] text-[#E65100] px-2.5 py-0.5 rounded-xl text-xs font-bold cursor-pointer active:scale-95",
          forfeitBtnActive: "bg-[#E91E63] text-white",
          modal: "bg-[#FFF0F5] border-4 border-[#FF85B3] text-[#D81B60] font-['Fredoka_One'] rounded-3xl p-5 text-xs",
          forfeitLabel: "Pass",
          forfeitIcon: "×",
          targetPrefix: "BUDDY: ",
          rosterIcon: "▪",
        };

      case Theme.SKYRIM:
        return {
          font: "'Cinzel', serif",
          frame: "bg-black/95 border border-[#D4AF37] rounded-none shadow-[0_0_8px_rgba(212,175,55,0.3)] p-2 text-[#D4AF37] text-xs space-y-1 mb-2 font-['Cinzel'] tracking-widest",
          topRow: "flex justify-between items-center gap-1.5 border-b border-[#D4AF37]/30 pb-1",
          modeBtn: "border border-[#D4AF37] bg-black text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black px-2 py-0.5 rounded-none text-xs cursor-pointer font-bold",
          awardsBtn: "border border-[#D4AF37]/60 bg-black text-[#D4AF37] px-2 py-0.5 rounded-none text-xs cursor-pointer",
          rosterBtn: "border border-[#D4AF37]/60 bg-black text-[#D4AF37] px-2 py-0.5 rounded-none text-xs cursor-pointer",
          navBtn: "border border-[#D4AF37] bg-black text-[#D4AF37] w-5 h-5 flex items-center justify-center rounded-none text-xs cursor-pointer",
          forfeitBtn: "border border-amber-600 bg-black text-amber-400 hover:bg-amber-600 hover:text-black px-2.5 py-0.5 rounded-none font-bold text-xs cursor-pointer active:scale-95",
          forfeitBtnActive: "bg-red-800 text-white",
          modal: "bg-[#0A0A0A] border-2 border-[#D4AF37] text-stone-200 font-['Cinzel'] rounded-none p-5 text-xs",
          forfeitLabel: "Fled",
          forfeitIcon: "‡",
          targetPrefix: "TARGET: ",
          rosterIcon: "⚔",
        };

      case Theme.DANGANRONPA:
        return {
          font: "'Courier New', monospace",
          frame: "bg-black border-2 border-[#ff007f] rounded-none shadow-[3px_3px_0_#ff007f] p-2 text-[#ff007f] text-xs space-y-1 mb-2 font-mono",
          topRow: "flex justify-between items-center gap-1.5 border-b border-[#ff007f]/40 pb-1",
          modeBtn: "border border-[#ff007f] bg-black text-[#ff007f] hover:bg-[#ff007f] hover:text-black px-2 py-0.5 rounded-none text-xs cursor-pointer font-bold",
          awardsBtn: "border border-[#ff007f]/60 bg-black text-[#ff007f] px-2 py-0.5 rounded-none text-xs cursor-pointer",
          rosterBtn: "border border-[#ff007f]/60 bg-black text-[#ff007f] px-2 py-0.5 rounded-none text-xs cursor-pointer",
          navBtn: "border border-[#ff007f] bg-black text-[#ff007f] hover:bg-[#ff007f] hover:text-black w-6 h-6 flex items-center justify-center rounded-none cursor-pointer",
          forfeitBtn: "border border-red-600 bg-red-950 text-white hover:bg-red-600 px-2.5 py-0.5 rounded-none font-bold text-xs cursor-pointer active:scale-95",
          forfeitBtnActive: "bg-[#ff007f] text-black",
          modal: "bg-black border-4 border-[#ff007f] text-[#ff007f] font-mono rounded-none p-5 text-xs shadow-[8px_8px_0_#ff007f]",
          forfeitLabel: "Execute",
          forfeitIcon: "☠",
          targetPrefix: "CULPRIT: ",
          rosterIcon: "◈",
        };

      case Theme.ANIMAL_CROSSING:
        return {
          font: "'FinkHeavy', 'Arial Rounded MT Bold', sans-serif",
          frame: "bg-[#FBF7EE] border-3 border-[#7EC8A0] rounded-2xl shadow-[0_3px_0_#5DA67E] p-2 text-[#4A6B56] text-xs space-y-1 mb-2 font-['FinkHeavy']",
          topRow: "flex justify-between items-center gap-1.5 border-b border-[#7EC8A0]/40 pb-1",
          modeBtn: "border border-[#7EC8A0] bg-[#FFF] text-[#4A6B56] hover:bg-[#7EC8A0] hover:text-white px-2 py-0.5 rounded-xl text-xs cursor-pointer font-bold shadow-xs",
          awardsBtn: "border border-[#7EC8A0]/60 bg-[#FFF] text-[#4A6B56] px-2 py-0.5 rounded-xl text-xs cursor-pointer font-bold shadow-xs",
          rosterBtn: "border border-[#7EC8A0]/60 bg-[#FFF] text-[#4A6B56] px-2 py-0.5 rounded-xl text-xs cursor-pointer font-bold shadow-xs",
          navBtn: "border border-[#7EC8A0] bg-[#FFF] text-[#4A6B56] w-6 h-6 flex items-center justify-center rounded-xl cursor-pointer shadow-xs",
          forfeitBtn: "border border-[#E67E22] bg-[#FDEBD0] text-[#D35400] px-2.5 py-0.5 rounded-xl font-bold text-xs cursor-pointer active:scale-95",
          forfeitBtnActive: "bg-[#E67E22] text-white",
          modal: "bg-[#FBF7EE] border-4 border-[#7EC8A0] text-[#4A6B56] font-['FinkHeavy'] rounded-3xl p-5 text-xs shadow-lg",
          forfeitLabel: "Pass",
          forfeitIcon: "×",
          targetPrefix: "NEIGHBOR: ",
          rosterIcon: "☘",
        };

      case Theme.SANRIO:
        return {
          font: "'Cherry Bomb One', cursive",
          frame: "bg-[#FFF0F5] border-3 border-[#FF80BF] rounded-2xl shadow-[0_3px_0_#FF4081] p-2 text-[#C2185B] text-xs space-y-1 mb-2 font-['Cherry_Bomb_One']",
          topRow: "flex justify-between items-center gap-1.5 border-b border-[#FF80BF]/40 pb-1",
          modeBtn: "border border-[#FF80BF] bg-white text-[#C2185B] hover:bg-[#FF80BF] hover:text-white px-2.5 py-0.5 rounded-xl text-xs cursor-pointer font-bold shadow-xs",
          awardsBtn: "border border-[#FF80BF]/60 bg-white text-[#C2185B] px-2 py-0.5 rounded-xl text-xs cursor-pointer font-bold shadow-xs",
          rosterBtn: "border border-[#FF80BF]/60 bg-white text-[#C2185B] px-2 py-0.5 rounded-xl text-xs cursor-pointer font-bold shadow-xs",
          navBtn: "border border-[#FF80BF] bg-white text-[#C2185B] w-6 h-6 flex items-center justify-center rounded-xl cursor-pointer shadow-xs",
          forfeitBtn: "border border-[#FF4081] bg-[#FFD1DC] text-[#C2185B] px-2.5 py-0.5 rounded-xl font-bold text-xs cursor-pointer active:scale-95",
          forfeitBtnActive: "bg-[#FF4081] text-white",
          modal: "bg-[#FFF0F5] border-4 border-[#FF80BF] text-[#C2185B] font-['Cherry_Bomb_One'] rounded-3xl p-5 text-xs shadow-lg",
          forfeitLabel: "Skip",
          forfeitIcon: "୨୧",
          targetPrefix: "SWEETIE: ",
          rosterIcon: "୨୧",
        };

      case Theme.VOCALOID:
        return {
          font: "'Orbitron', sans-serif",
          frame: "bg-[#001417] border border-[#39C5BB] rounded-none shadow-[0_0_10px_rgba(57,197,187,0.3)] p-2 text-[#39C5BB] text-xs space-y-1 mb-2 font-['Orbitron']",
          topRow: "flex justify-between items-center gap-1.5 border-b border-[#39C5BB]/30 pb-1",
          modeBtn: "border border-[#39C5BB] bg-black text-[#39C5BB] hover:bg-[#39C5BB] hover:text-black px-2 py-0.5 rounded-none text-[10px] cursor-pointer font-bold",
          awardsBtn: "border border-[#39C5BB]/60 bg-black text-[#39C5BB] px-2 py-0.5 rounded-none text-[10px] cursor-pointer",
          rosterBtn: "border border-[#39C5BB]/60 bg-black text-[#39C5BB] px-2 py-0.5 rounded-none text-[10px] cursor-pointer",
          navBtn: "border border-[#39C5BB] bg-black text-[#39C5BB] w-5 h-5 flex items-center justify-center rounded-none cursor-pointer",
          forfeitBtn: "border border-[#FF007F] bg-black text-[#FF007F] hover:bg-[#FF007F] hover:text-white px-2 py-0.5 rounded-none font-bold text-[10px] cursor-pointer active:scale-95",
          forfeitBtnActive: "bg-[#FF007F] text-white",
          modal: "bg-[#001417] border-2 border-[#39C5BB] text-[#39C5BB] font-['Orbitron'] rounded-none p-5 text-xs",
          forfeitLabel: "Mute",
          forfeitIcon: "//M",
          targetPrefix: "CH-SYNC: ",
          rosterIcon: "||",
        };

      case Theme.IRUMA:
        return {
          font: "'Sniglet', cursive",
          frame: "bg-[#1C0522] border-2 border-[#FFD700] rounded-xl shadow-[0_0_8px_rgba(255,215,0,0.3)] p-2 text-[#FFD700] text-xs space-y-1 mb-2 font-['Sniglet']",
          topRow: "flex justify-between items-center gap-1.5 border-b border-[#FFD700]/30 pb-1",
          modeBtn: "border border-[#FFD700] bg-[#3B1146] text-[#FFD700] hover:bg-[#FFD700] hover:text-black px-2 py-0.5 rounded-lg text-xs cursor-pointer font-bold",
          awardsBtn: "border border-[#FFD700]/60 bg-[#3B1146] text-[#FFD700] px-2 py-0.5 rounded-lg text-xs cursor-pointer",
          rosterBtn: "border border-[#FFD700]/60 bg-[#3B1146] text-[#FFD700] px-2 py-0.5 rounded-lg text-xs cursor-pointer",
          navBtn: "border border-[#FFD700] bg-[#3B1146] text-[#FFD700] w-6 h-6 flex items-center justify-center rounded-lg cursor-pointer",
          forfeitBtn: "border border-purple-400 bg-purple-950 text-amber-300 hover:bg-purple-800 px-2.5 py-0.5 rounded-lg font-bold text-xs cursor-pointer active:scale-95",
          forfeitBtnActive: "bg-[#FFD700] text-black",
          modal: "bg-[#1C0522] border-3 border-[#FFD700] text-[#FFD700] font-['Sniglet'] rounded-2xl p-5 text-xs",
          forfeitLabel: "Devi-Pass",
          forfeitIcon: "▲",
          targetPrefix: "RIVAL: ",
          rosterIcon: "▲",
        };

      case Theme.ARCANE:
        return {
          font: "'Cinzel', serif",
          frame: "bg-[#0B121E] border border-[#00FFFF] rounded-none shadow-[0_0_12px_rgba(0,255,255,0.25)] p-2 text-[#C0D9E5] text-xs space-y-1 mb-2 font-['Cinzel'] tracking-wider",
          topRow: "flex justify-between items-center gap-1.5 border-b border-[#00FFFF]/30 pb-1",
          modeBtn: "border border-[#00FFFF] bg-[#0B121E] text-[#00FFFF] hover:bg-[#00FFFF] hover:text-black px-2 py-0.5 rounded-none text-xs cursor-pointer font-bold",
          awardsBtn: "border border-[#00FFFF]/60 bg-[#0B121E] text-[#00FFFF] px-2 py-0.5 rounded-none text-xs cursor-pointer",
          rosterBtn: "border border-[#00FFFF]/60 bg-[#0B121E] text-[#00FFFF] px-2 py-0.5 rounded-none text-xs cursor-pointer",
          navBtn: "border border-[#00FFFF] bg-[#0B121E] text-[#00FFFF] w-5 h-5 flex items-center justify-center rounded-none cursor-pointer",
          forfeitBtn: "border border-[#FF3366] bg-[#1E0B12] text-[#FF3366] hover:bg-[#FF3366] hover:text-white px-2 py-0.5 rounded-none font-bold text-xs cursor-pointer active:scale-95",
          forfeitBtnActive: "bg-[#00FFFF] text-black",
          modal: "bg-[#0B121E] border-2 border-[#00FFFF] text-[#C0D9E5] font-['Cinzel'] rounded-none p-5 text-xs",
          forfeitLabel: "Surrender",
          forfeitIcon: "◇",
          targetPrefix: "TARGET: ",
          rosterIcon: "◇",
        };

      case Theme.BILLY_HATCHER:
        return {
          font: "'Fredoka One', cursive",
          frame: "bg-[#FFF9E6] border-3 border-[#1873CA] rounded-2xl shadow-[0_3px_0_#0D47A1] p-2 text-[#1873CA] text-xs space-y-1 mb-2 font-['Fredoka_One']",
          topRow: "flex justify-between items-center gap-1.5 border-b border-[#1873CA]/30 pb-1",
          modeBtn: "border-2 border-[#1873CA] bg-white text-[#1873CA] hover:bg-[#1873CA] hover:text-white px-2.5 py-0.5 rounded-xl text-xs cursor-pointer font-bold shadow-xs",
          awardsBtn: "border-2 border-[#1873CA]/60 bg-white text-[#1873CA] px-2 py-0.5 rounded-xl text-xs cursor-pointer font-bold shadow-xs",
          rosterBtn: "border-2 border-[#1873CA]/60 bg-white text-[#1873CA] px-2 py-0.5 rounded-xl text-xs cursor-pointer font-bold shadow-xs",
          navBtn: "border-2 border-[#1873CA] bg-white text-[#1873CA] w-6 h-6 flex items-center justify-center rounded-xl cursor-pointer shadow-xs",
          forfeitBtn: "border-2 border-[#E65100] bg-[#FFE0B2] text-[#BF360C] px-2.5 py-0.5 rounded-xl font-bold text-xs cursor-pointer active:scale-95",
          forfeitBtnActive: "bg-[#1873CA] text-white",
          modal: "bg-[#FFF9E6] border-4 border-[#1873CA] text-[#1873CA] font-['Fredoka_One'] rounded-3xl p-5 text-xs shadow-lg",
          forfeitLabel: "Crack",
          forfeitIcon: "◈",
          targetPrefix: "HATCHER: ",
          rosterIcon: "◈",
        };

      default:
        return {
          font: "inherit",
          frame: "bg-black/80 border border-white/20 rounded-xl shadow-md p-2.5 text-white text-xs space-y-1.5 mb-2",
          topRow: "flex justify-between items-center gap-1.5 border-b border-white/10 pb-1.5",
          modeBtn: "border border-white/30 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg text-xs cursor-pointer font-bold",
          awardsBtn: "border border-white/20 bg-white/5 px-2 py-1 rounded-lg text-xs cursor-pointer",
          rosterBtn: "border border-white/20 bg-white/5 px-2 py-1 rounded-lg text-xs cursor-pointer",
          navBtn: "border border-white/20 bg-white/10 hover:bg-white/20 w-6 h-6 flex items-center justify-center rounded-lg text-xs cursor-pointer",
          forfeitBtn: "border border-amber-500/40 bg-amber-950/60 text-amber-200 px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer active:scale-95",
          forfeitBtnActive: "bg-amber-500 text-black",
          modal: "bg-zinc-950 border border-white/20 text-white rounded-2xl p-5 text-xs",
          forfeitLabel: "Forfeit",
          forfeitIcon: "×",
          targetPrefix: "Target: ",
          rosterIcon: "▪",
        };
    }
  };

  const style = getThemeStyles();
  const activeIdx = activePlayer ? players.findIndex(p => p.id === activePlayer.id) : 0;
  const targetIdx = targetPlayer ? players.findIndex(p => p.id === targetPlayer.id) : 1;

  return (
    <div className={style.frame} style={{ fontFamily: style.font }}>
      {/* Unified Top Utility Row: Mode Switcher + Awards + Timer */}
      <div className={style.topRow}>
        <button
          onClick={() => {
            hapticService.light();
            onOpenModeChooser();
          }}
          title="Switch Minigame Mode"
          className={style.modeBtn}
        >
          <span>{getModeLabel()} ⟳</span>
        </button>

        <div className="flex items-center gap-1.5">
          {playersEnabled && players.length > 0 && (
            <button
              onClick={() => {
                hapticService.light();
                onOpenAwards();
              }}
              title="Party Awards Podium"
              className={style.awardsBtn}
            >
              <span>HONORS</span>
            </button>
          )}

          {gameMode !== GameMode.HOT_SEAT && (
            <CountdownTimer
              enabled={timerEnabled}
              duration={timerDuration}
              onToggleEnabled={onToggleTimer}
              onChangeDuration={onChangeTimerDuration}
              promptId={promptId}
              isPromptActive={isPromptActive}
              theme={theme}
              intensity={intensity}
            />
          )}

          {playersEnabled && players.length > 0 && (
            <button
              onClick={() => {
                hapticService.light();
                setShowRosterModal(true);
              }}
              title="View Roster"
              className={style.rosterBtn}
            >
              <span>{style.rosterIcon} ({players.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Unified Active Player Turn Line (when Pass & Play Roster is active) */}
      {playersEnabled && activePlayer && players.length > 0 && (
        <div className="flex items-center justify-between gap-2 pt-0.5 flex-wrap sm:flex-nowrap">
          {/* Turn Navigator + Active Player */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                hapticService.light();
                onPrevPlayer();
              }}
              title="Previous Player"
              className={style.navBtn}
            >
              ◀
            </button>

            <div className="flex items-center font-bold text-xs sm:text-sm tracking-wide gap-1">
              <ThemeLoreBadge theme={theme} index={activeIdx} intensity={intensity} />
              <span>{activePlayer.name}</span>
            </div>

            <button
              onClick={() => {
                hapticService.light();
                onNextPlayer();
              }}
              title="Next Player"
              className={style.navBtn}
            >
              ▶
            </button>
          </div>

          {/* Target Player (if >= 2 players) */}
          {targetPlayer && (
            <div className="text-[11px] opacity-80 font-semibold flex items-center gap-1">
              <span className="opacity-60">{style.targetPrefix}</span>
              <ThemeLoreBadge theme={theme} index={targetIdx} intensity={intensity} />
              <span>{targetPlayer.name}</span>
            </div>
          )}

          {/* Forfeit / Chicken Action */}
          <motion.button
            whileTap={{ scale: 0.94 }}
            animate={justChickened ? { scale: [1, 1.15, 1] } : { scale: 1 }}
            onClick={handleChicken}
            title="Active player forfeits prompt"
            className={justChickened ? style.forfeitBtnActive : style.forfeitBtn}
          >
            <span>{style.forfeitIcon} {style.forfeitLabel} ({activePlayer.chickenCount})</span>
          </motion.button>
        </div>
      )}

      {/* Integrated Roster Standings Modal */}
      <AnimatePresence>
        {showRosterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              className={`${style.modal} max-w-md w-full max-h-[85vh] flex flex-col space-y-3.5`}
              style={{ fontFamily: style.font }}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center pb-2 border-b border-current/20">
                <div className="flex items-center gap-2">
                  <span>{style.rosterIcon}</span>
                  <h3 className="font-bold uppercase tracking-wider text-sm">PARTY ROSTER</h3>
                </div>
                <button
                  onClick={() => setShowRosterModal(false)}
                  className="w-6 h-6 rounded flex items-center justify-center opacity-60 hover:opacity-100 font-bold transition-opacity cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Player Standings List */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {players.map((p, index) => {
                  const isActive = activePlayer && p.id === activePlayer.id;
                  return (
                    <div
                      key={p.id}
                      className={`p-2.5 rounded border flex items-center justify-between transition-colors ${
                        isActive
                          ? 'border-current bg-current/15 font-bold'
                          : 'border-current/20 bg-current/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <ThemeLoreBadge theme={theme} index={index} intensity={intensity} showTitle={true} />
                        <span className="text-sm font-semibold">{p.name}</span>
                        {isActive && (
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded border border-current opacity-80">
                            Active
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs opacity-75">
                          {style.forfeitLabel}: {p.chickenCount}
                        </span>
                        {players.length > 2 && (
                          <button
                            onClick={() => {
                              hapticService.light();
                              onRemovePlayer(p.id);
                            }}
                            title="Remove player"
                            className="opacity-40 hover:opacity-100 text-xs px-1 hover:text-red-500 transition-colors cursor-pointer"
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
              <form onSubmit={handleAddNew} className="pt-2 border-t border-current/20 flex gap-2">
                <input
                  type="text"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  placeholder="New player name..."
                  maxLength={16}
                  className="flex-1 px-3 py-1.5 rounded border border-current/40 bg-black/20 text-current text-xs focus:outline-none focus:border-current"
                />
                <button
                  type="submit"
                  disabled={!newPlayerName.trim()}
                  className="px-3 py-1.5 rounded border border-current bg-current/10 hover:bg-current/25 text-xs font-bold disabled:opacity-40 cursor-pointer transition-colors"
                >
                  + Add
                </button>
              </form>

              {/* Modal Footer */}
              <div className="pt-1 flex justify-end">
                <button
                  onClick={() => setShowRosterModal(false)}
                  className="px-4 py-1.5 rounded border border-current bg-current/10 hover:bg-current/25 font-bold text-xs uppercase cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
