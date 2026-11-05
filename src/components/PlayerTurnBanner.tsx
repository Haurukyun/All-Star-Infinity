import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player, Theme, Intensity } from '../types';
import { hapticService } from '../services/haptics';

interface PlayerTurnBannerProps {
  players: Player[];
  activePlayer: Player | null;
  targetPlayer: Player | null;
  onNextPlayer: () => void;
  onPrevPlayer: () => void;
  onIncrementChicken: (id?: string) => void;
  onAddPlayer: (name: string) => void;
  onRemovePlayer: (id: string) => void;
  theme?: Theme;
  intensity?: Intensity | null;
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
  theme = Theme.SONIC,
  intensity,
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

  const getThemeStyles = () => {
    switch (theme) {
      case Theme.UNDERTALE:
        return {
          font: "'Press Start 2P', monospace",
          container: "bg-black text-white border-2 border-white rounded-none shadow-[2px_2px_0_#FFF] p-2.5",
          btnNav: "border border-white bg-black text-white hover:bg-white hover:text-black rounded-none text-[10px] w-6 h-6 flex items-center justify-center cursor-pointer transition-colors",
          labelSub: "text-white/60 text-[8px]",
          nameMain: "text-white font-bold text-xs",
          targetPill: "border border-white/60 bg-black text-white rounded-none text-[9px] px-2 py-0.5",
          chickenBtn: "border-2 border-white bg-black text-white hover:bg-white hover:text-black rounded-none shadow-[1px_1px_0_#FFF] text-[9px] font-bold px-2.5 py-1 transition-all active:scale-95 cursor-pointer",
          chickenBtnActive: "bg-red-600 text-white border-red-500",
          rosterBtn: "border border-white bg-black text-white hover:bg-white hover:text-black rounded-none text-[9px] px-2 py-1 cursor-pointer transition-colors",
          modal: "bg-black border-4 border-white text-white font-['Press_Start_2P'] rounded-none shadow-2xl p-6",
          themeIcons: { iconGamepad: "❤", iconTarget: "*", iconChicken: "×", chickenText: "Fled", iconRoster: "♦", iconStar: "★" },
        };
      case Theme.OMORI: {
        const isVulgar = intensity === Intensity.VULGAR;
        const isHot = intensity === Intensity.HOT;
        return {
          font: "'Gloria Hallelujah', cursive",
          container: isVulgar
            ? "bg-black text-[#ff0000] border-2 border-[#ff0000] rounded-none shadow-[3px_3px_0_#ff0000] p-3 font-['Gloria_Hallelujah']"
            : isHot
            ? "bg-[#9B6EFF] text-white border-2 border-white rounded-none shadow-[3px_3px_0_#7B55CC] p-3 font-['Gloria_Hallelujah']"
            : "bg-white text-black border-2 border-black rounded-none shadow-[3px_3px_0_#000] p-3 font-['Gloria_Hallelujah']",
          btnNav: isVulgar
            ? "border-2 border-[#ff0000] bg-black text-[#ff0000] hover:bg-[#ff0000] hover:text-black rounded-none shadow-[1px_1px_0_#ff0000] text-xs w-7 h-7 flex items-center justify-center cursor-pointer transition-colors font-bold"
            : isHot
            ? "border-2 border-white bg-[#7B55CC] text-white hover:bg-white hover:text-[#7B55CC] rounded-none shadow-[1px_1px_0_#fff] text-xs w-7 h-7 flex items-center justify-center cursor-pointer transition-colors font-bold"
            : "border-2 border-black bg-white text-black hover:bg-black hover:text-white rounded-none shadow-[1px_1px_0_#000] text-xs w-7 h-7 flex items-center justify-center cursor-pointer transition-colors font-bold",
          labelSub: isVulgar ? "text-[#ff0000]/60 text-[10px]" : isHot ? "text-white/70 text-[10px]" : "text-black/60 text-[10px]",
          nameMain: isVulgar ? "text-[#ff0000] font-bold text-base" : "text-black font-bold text-base",
          targetPill: isVulgar
            ? "border border-[#ff0000] bg-black text-[#ff0000] rounded-none shadow-[1px_1px_0_#ff0000] text-xs px-2.5 py-0.5 font-bold"
            : isHot
            ? "border border-white bg-[#7B55CC] text-white rounded-none shadow-[1px_1px_0_#fff] text-xs px-2.5 py-0.5 font-bold"
            : "border border-black bg-white text-black rounded-none shadow-[1px_1px_0_#000] text-xs px-2.5 py-0.5 font-bold",
          chickenBtn: isVulgar
            ? "border-2 border-[#ff0000] bg-black text-[#ff0000] hover:bg-[#ff0000] hover:text-black rounded-none shadow-[2px_2px_0_#ff0000] text-xs font-bold px-3 py-1 transition-all active:scale-95 cursor-pointer"
            : isHot
            ? "border-2 border-white bg-[#7B55CC] text-white hover:bg-white hover:text-[#7B55CC] rounded-none shadow-[2px_2px_0_#fff] text-xs font-bold px-3 py-1 transition-all active:scale-95 cursor-pointer"
            : "border-2 border-black bg-white text-black hover:bg-black hover:text-white rounded-none shadow-[2px_2px_0_#000] text-xs font-bold px-3 py-1 transition-all active:scale-95 cursor-pointer",
          chickenBtnActive: isVulgar ? "bg-[#ff0000] text-black border-[#ff0000]" : "bg-black text-white border-black",
          rosterBtn: isVulgar
            ? "border-2 border-[#ff0000] bg-black text-[#ff0000] hover:bg-[#ff0000] hover:text-black rounded-none shadow-[1px_1px_0_#ff0000] text-xs px-2.5 py-1 cursor-pointer font-bold"
            : isHot
            ? "border-2 border-white bg-[#7B55CC] text-white hover:bg-white hover:text-[#7B55CC] rounded-none shadow-[1px_1px_0_#fff] text-xs px-2.5 py-1 cursor-pointer font-bold"
            : "border-2 border-black bg-white text-black hover:bg-black hover:text-white rounded-none shadow-[1px_1px_0_#000] text-xs px-2.5 py-1 cursor-pointer font-bold",
          modal: isVulgar
            ? "bg-black border-4 border-[#ff0000] text-[#ff0000] font-['Gloria_Hallelujah'] rounded-none shadow-[6px_6px_0_#ff0000] p-6"
            : isHot
            ? "bg-[#9B6EFF] border-4 border-white text-white font-['Gloria_Hallelujah'] rounded-none shadow-[6px_6px_0_#7B55CC] p-6"
            : "bg-white border-4 border-black text-black font-['Gloria_Hallelujah'] rounded-none shadow-[6px_6px_0_#000] p-6",
          themeIcons: {
            iconGamepad: isVulgar ? "!" : "○",
            iconTarget: "→",
            iconChicken: isVulgar ? "×" : "!",
            chickenText: "Forfeit",
            iconRoster: "▪",
            iconStar: "★"
          },
        };
      }
      case Theme.SONIC:
        return {
          font: "'Bangers', cursive",
          container: "-skew-x-12 bg-yellow-400 text-black border-3 border-black rounded-xl shadow-[4px_4px_0_#000] p-2.5 font-['Bangers'] tracking-wide",
          btnNav: "border-2 border-black bg-white text-black hover:bg-black hover:text-white rounded-lg shadow-[2px_2px_0_#000] text-sm font-black w-7 h-7 flex items-center justify-center cursor-pointer transition-colors",
          labelSub: "text-black/70 text-xs font-black uppercase",
          nameMain: "text-black font-black text-lg",
          targetPill: "border-2 border-black bg-white text-black rounded-lg shadow-[2px_2px_0_#000] text-xs px-2.5 py-0.5 font-bold",
          chickenBtn: "border-2 border-black bg-red-600 text-white hover:bg-red-500 rounded-lg shadow-[2px_2px_0_#000] text-xs font-black tracking-wider px-3 py-1 transition-all active:scale-95 cursor-pointer",
          chickenBtnActive: "bg-black text-yellow-400",
          rosterBtn: "border-2 border-black bg-white text-black hover:bg-black hover:text-white rounded-lg shadow-[2px_2px_0_#000] text-xs font-bold px-2.5 py-1 cursor-pointer",
          modal: "bg-yellow-400 border-4 border-black text-black font-['Bangers'] rounded-xl shadow-[8px_8px_0_#000] -skew-x-2 p-6",
          themeIcons: { iconGamepad: "★", iconTarget: "▶", iconChicken: "×", chickenText: "Drop", iconRoster: "⚡", iconStar: "★" },
        };
      case Theme.PERSONA:
        return {
          font: "'Edo', sans-serif",
          container: "-skew-x-12 bg-[#0A0A0A] text-white border-2 border-white rounded-none shadow-[4px_4px_0_#D80000] p-2.5 font-['Edo'] italic",
          btnNav: "border border-white bg-black text-white hover:bg-[#D80000] rounded-none shadow-[2px_2px_0_#D80000] text-xs w-7 h-7 flex items-center justify-center cursor-pointer transition-colors font-bold",
          labelSub: "text-[#D80000] text-xs font-bold uppercase",
          nameMain: "text-white font-bold text-base",
          targetPill: "border border-white bg-black text-white rounded-none shadow-[2px_2px_0_#D80000] text-xs px-2.5 py-0.5",
          chickenBtn: "border-2 border-white bg-[#D80000] text-white hover:bg-white hover:text-black rounded-none shadow-[2px_2px_0_#000] text-xs font-bold px-3 py-1 transition-all active:scale-95 cursor-pointer",
          chickenBtnActive: "bg-white text-black",
          rosterBtn: "border border-white bg-black text-white hover:bg-[#D80000] rounded-none text-xs px-2.5 py-1 cursor-pointer",
          modal: "bg-[#0A0A0A] border-4 border-white text-white font-['Edo'] rounded-none shadow-[8px_8px_0_#D80000] -skew-x-2 p-6",
          themeIcons: { iconGamepad: "★", iconTarget: "→", iconChicken: "×", chickenText: "Yield", iconRoster: "♠", iconStar: "★" },
        };
      case Theme.MINECRAFT:
        return {
          font: "'Minecraft', monospace",
          container: "bg-[#707070] text-white border-2 border-t-[#AAA] border-l-[#AAA] border-r-[#222] border-b-[#222] rounded-none font-['Minecraft'] text-xs p-2.5",
          btnNav: "border-2 border-t-[#AAA] border-l-[#AAA] border-r-[#222] border-b-[#222] bg-[#555] hover:bg-[#666] text-white rounded-none text-xs w-6 h-6 flex items-center justify-center cursor-pointer transition-colors",
          labelSub: "text-zinc-300 text-[10px]",
          nameMain: "text-white font-bold text-xs",
          targetPill: "border-2 border-t-[#AAA] border-l-[#AAA] border-r-[#222] border-b-[#222] bg-[#444] text-yellow-300 rounded-none text-[10px] px-2 py-0.5",
          chickenBtn: "border-2 border-t-[#FA0] border-l-[#FA0] border-r-[#740] border-b-[#740] bg-[#C80] text-white hover:bg-[#D90] rounded-none text-[10px] font-bold px-2.5 py-1 transition-all active:scale-95 cursor-pointer",
          chickenBtnActive: "bg-[#A00] border-t-[#F88] border-l-[#F88]",
          rosterBtn: "border-2 border-t-[#AAA] border-l-[#AAA] border-r-[#222] border-b-[#222] bg-[#555] text-white rounded-none text-[10px] px-2 py-1 cursor-pointer",
          modal: "bg-[#4B4B4B] border-4 border-t-[#AAA] border-l-[#AAA] border-r-[#222] border-b-[#222] text-white font-['Minecraft'] rounded-none p-6",
          themeIcons: { iconGamepad: "◆", iconTarget: "→", iconChicken: "×", chickenText: "Yield", iconRoster: "▪", iconStar: "★" },
        };
      case Theme.ANIMAL_CROSSING:
        return {
          font: "'Sniglet', cursive",
          container: "bg-[#FBF8EF] text-[#4A7A56] border-2 border-[#7EBF8F] rounded-2xl shadow-sm font-['Sniglet'] text-xs p-3",
          btnNav: "border border-[#7EBF8F] bg-[#F7F4E9] text-[#4A7A56] hover:bg-[#7EBF8F] hover:text-white rounded-xl text-xs w-7 h-7 flex items-center justify-center cursor-pointer transition-colors",
          labelSub: "text-[#7EBF8F] text-[10px] font-bold",
          nameMain: "text-[#2F6B3D] font-bold text-sm",
          targetPill: "border border-[#7EBF8F] bg-white text-[#4A7A56] rounded-xl text-xs px-2.5 py-0.5 font-bold",
          chickenBtn: "border-2 border-[#E8927C] bg-[#FFF0EC] text-[#D05A3F] hover:bg-[#E8927C] hover:text-white rounded-xl text-xs font-bold px-3 py-1 transition-all active:scale-95 cursor-pointer",
          chickenBtnActive: "bg-[#E8927C] text-white",
          rosterBtn: "border border-[#7EBF8F] bg-white text-[#4A7A56] rounded-xl text-xs font-bold px-2.5 py-1 cursor-pointer",
          modal: "bg-[#FBF8EF] border-4 border-[#7EBF8F] text-[#4A7A56] font-['Sniglet'] rounded-3xl shadow-xl p-6",
          themeIcons: { iconGamepad: "🍃", iconTarget: "→", iconChicken: "×", chickenText: "Pass", iconRoster: "▪", iconStar: "★" },
        };
      case Theme.SANRIO:
        return {
          font: "'Cherry Bomb One', cursive",
          container: "bg-[#FFF5F8] text-[#D84B6B] border-2 border-[#FF8DA1] rounded-2xl shadow-sm font-['Cherry_Bomb_One'] text-xs p-3",
          btnNav: "border border-[#FF8DA1] bg-white text-[#D84B6B] hover:bg-[#FF8DA1] hover:text-white rounded-full text-xs w-7 h-7 flex items-center justify-center cursor-pointer transition-colors",
          labelSub: "text-[#FF8DA1] text-[10px]",
          nameMain: "text-[#D84B6B] font-bold text-sm",
          targetPill: "border border-[#FF8DA1] bg-white text-[#D84B6B] rounded-full text-xs px-2.5 py-0.5",
          chickenBtn: "border-2 border-[#FF69B4] bg-[#FFE4EC] text-[#D84B6B] hover:bg-[#FF69B4] hover:text-white rounded-full text-xs font-bold px-3 py-1 transition-all active:scale-95 cursor-pointer",
          chickenBtnActive: "bg-[#FF1493] text-white",
          rosterBtn: "border border-[#FF8DA1] bg-white text-[#D84B6B] rounded-full text-xs font-bold px-2.5 py-1 cursor-pointer",
          modal: "bg-[#FFF5F8] border-4 border-[#FF8DA1] text-[#D84B6B] font-['Cherry_Bomb_One'] rounded-3xl shadow-2xl p-6",
          themeIcons: { iconGamepad: "★", iconTarget: "♡", iconChicken: "×", chickenText: "Pass", iconRoster: "▪", iconStar: "★" },
        };
      case Theme.CYBERPUNK:
        return {
          font: "'Orbitron', sans-serif",
          container: "bg-black text-yellow-400 border border-yellow-400 rounded-none shadow-[0_0_8px_rgba(250,204,21,0.3)] font-['Orbitron'] text-xs p-2.5",
          btnNav: "border border-yellow-400 bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black rounded-none text-xs w-6 h-6 flex items-center justify-center cursor-pointer transition-colors",
          labelSub: "text-yellow-400/60 text-[9px] uppercase tracking-widest",
          nameMain: "text-yellow-400 font-bold text-sm tracking-wider",
          targetPill: "border border-cyan-400 bg-black text-cyan-400 rounded-none text-xs px-2 py-0.5 shadow-[0_0_6px_rgba(34,211,238,0.3)]",
          chickenBtn: "border border-red-500 bg-black text-red-400 hover:bg-red-500 hover:text-white rounded-none text-xs font-bold shadow-[0_0_6px_rgba(239,68,68,0.4)] px-2.5 py-1 transition-all active:scale-95 cursor-pointer",
          chickenBtnActive: "bg-red-600 text-white",
          rosterBtn: "border border-yellow-400 bg-black text-yellow-400 rounded-none text-xs px-2 py-1 cursor-pointer",
          modal: "bg-black border-2 border-yellow-400 text-yellow-400 font-['Orbitron'] rounded-none shadow-[0_0_25px_rgba(250,204,21,0.25)] p-6",
          themeIcons: { iconGamepad: ">", iconTarget: ">>", iconChicken: "//X", chickenText: "Surrender", iconRoster: "::", iconStar: "◈" },
        };
      case Theme.FNAF:
        return {
          font: "'VT323', monospace",
          container: "bg-black text-green-400 border border-green-500/80 rounded-none shadow-[0_0_10px_rgba(34,197,94,0.3)] font-['VT323'] text-sm tracking-wider p-2.5",
          btnNav: "border border-green-500 bg-black text-green-400 hover:bg-green-500 hover:text-black rounded-none text-sm w-7 h-7 flex items-center justify-center cursor-pointer transition-colors",
          labelSub: "text-green-600 text-xs tracking-widest",
          nameMain: "text-green-300 font-bold text-lg tracking-widest",
          targetPill: "border border-green-600 bg-black text-green-400 rounded-none text-xs px-2 py-0.5",
          chickenBtn: "border border-amber-500 bg-black text-amber-400 hover:bg-amber-500 hover:text-black rounded-none text-sm font-bold tracking-wider px-3 py-0.5 transition-all active:scale-95 cursor-pointer",
          chickenBtnActive: "bg-amber-600 text-black",
          rosterBtn: "border border-green-500 bg-black text-green-400 rounded-none text-sm px-2.5 py-0.5 cursor-pointer",
          modal: "bg-black border-2 border-green-500/80 text-green-400 font-['VT323'] rounded-none shadow-[0_0_20px_rgba(34,197,94,0.3)] p-6",
          themeIcons: { iconGamepad: "●", iconTarget: "▶", iconChicken: "!", chickenText: "Aborted", iconRoster: "■", iconStar: "★" },
        };
      case Theme.FALLOUT:
        return {
          font: "'Share Tech Mono', monospace",
          container: "bg-black text-[#14FF00] border border-[#14FF00] rounded-none shadow-[0_0_8px_rgba(20,255,0,0.3)] font-['Share_Tech_Mono'] text-xs p-2.5",
          btnNav: "border border-[#14FF00] bg-black text-[#14FF00] hover:bg-[#14FF00] hover:text-black rounded-none text-xs w-6 h-6 flex items-center justify-center cursor-pointer transition-colors",
          labelSub: "text-[#14FF00]/60 text-[9px]",
          nameMain: "text-[#14FF00] font-bold text-sm",
          targetPill: "border border-[#14FF00] bg-black text-[#14FF00] rounded-none text-xs px-2 py-0.5",
          chickenBtn: "border border-[#FFAA00] bg-black text-[#FFAA00] hover:bg-[#FFAA00] hover:text-black rounded-none text-xs font-bold px-2.5 py-1 transition-all active:scale-95 cursor-pointer",
          chickenBtnActive: "bg-[#FFAA00] text-black",
          rosterBtn: "border border-[#14FF00] bg-black text-[#14FF00] rounded-none text-xs px-2 py-1 cursor-pointer",
          modal: "bg-black border-2 border-[#14FF00] text-[#14FF00] font-['Share_Tech_Mono'] rounded-none shadow-[0_0_20px_rgba(20,255,0,0.3)] p-6",
          themeIcons: { iconGamepad: "►", iconTarget: "→", iconChicken: "×", chickenText: "Forfeit", iconRoster: "◉", iconStar: "★" },
        };
      case Theme.DANGANRONPA:
        return {
          font: "'Courier New', monospace",
          container: "bg-[#050510] text-white border-2 border-[#FF007F] rounded-none shadow-[0_0_8px_rgba(255,0,127,0.4)] font-mono text-xs p-2.5",
          btnNav: "border border-[#FF007F] bg-black text-[#FF007F] hover:bg-[#FF007F] hover:text-black rounded-none text-xs w-6 h-6 flex items-center justify-center cursor-pointer transition-colors",
          labelSub: "text-[#FF007F] text-[9px] uppercase font-bold tracking-widest",
          nameMain: "text-white font-bold text-sm tracking-wider",
          targetPill: "border border-[#FF007F] bg-black text-[#FF007F] rounded-none text-xs px-2 py-0.5 font-bold",
          chickenBtn: "border border-red-500 bg-[#FF007F]/20 text-[#FF007F] hover:bg-[#FF007F] hover:text-black rounded-none text-xs font-bold tracking-wider px-2.5 py-1 transition-all active:scale-95 cursor-pointer",
          chickenBtnActive: "bg-[#FF007F] text-black",
          rosterBtn: "border border-[#FF007F] bg-black text-[#FF007F] rounded-none text-xs font-bold px-2 py-1 cursor-pointer",
          modal: "bg-[#050510] border-4 border-[#FF007F] text-white font-mono rounded-none shadow-[0_0_30px_rgba(255,0,127,0.3)] p-6",
          themeIcons: { iconGamepad: "★", iconTarget: "→", iconChicken: "×", chickenText: "Despair", iconRoster: "◉", iconStar: "★" },
        };
      case Theme.KIRBY:
        return {
          font: "'Fredoka One', cursive",
          container: "bg-[#FFE4EF] text-[#D81B60] border-2 border-[#FF85B3] rounded-2xl shadow-sm font-['Fredoka_One'] text-xs p-3",
          btnNav: "border border-[#FF85B3] bg-white text-[#D81B60] hover:bg-[#FF85B3] hover:text-white rounded-xl text-xs w-7 h-7 flex items-center justify-center cursor-pointer transition-colors",
          labelSub: "text-[#FF85B3] text-[10px]",
          nameMain: "text-[#D81B60] font-bold text-sm",
          targetPill: "border border-[#FF85B3] bg-white text-[#D81B60] rounded-xl text-xs px-2.5 py-0.5",
          chickenBtn: "border-2 border-[#FFA726] bg-[#FFF3E0] text-[#E65100] hover:bg-[#FFA726] hover:text-white rounded-xl text-xs font-bold px-3 py-1 transition-all active:scale-95 cursor-pointer",
          chickenBtnActive: "bg-[#E91E63] text-white",
          rosterBtn: "border border-[#FF85B3] bg-white text-[#D81B60] rounded-xl text-xs font-bold px-2.5 py-1 cursor-pointer",
          modal: "bg-[#FFF0F5] border-4 border-[#FF85B3] text-[#D81B60] font-['Fredoka_One'] rounded-3xl shadow-2xl p-6",
          themeIcons: { iconGamepad: "★", iconTarget: "♡", iconChicken: "×", chickenText: "Pass", iconRoster: "▪", iconStar: "★" },
        };
      case Theme.POKEMON:
        return {
          font: "'Press Start 2P', monospace",
          container: "bg-zinc-900 text-white border-2 border-[#3B4CCA] rounded-none shadow-[2px_2px_0_#3B4CCA] font-['Press_Start_2P'] text-[10px] p-2.5",
          btnNav: "border border-zinc-500 bg-zinc-800 text-white hover:bg-white hover:text-black rounded-none text-[10px] w-6 h-6 flex items-center justify-center cursor-pointer transition-colors",
          labelSub: "text-[#FFDE00] text-[8px]",
          nameMain: "text-white font-bold text-xs",
          targetPill: "border border-zinc-600 bg-zinc-800 text-[#FFDE00] rounded-none text-[8px] px-2 py-0.5",
          chickenBtn: "border-2 border-[#CC0000] bg-zinc-800 text-[#FF5555] hover:bg-[#CC0000] hover:text-white rounded-none text-[8px] font-bold px-2 py-1 transition-all active:scale-95 cursor-pointer",
          chickenBtnActive: "bg-[#CC0000] text-white",
          rosterBtn: "border border-[#3B4CCA] bg-zinc-800 text-white rounded-none text-[8px] px-2 py-1 cursor-pointer",
          modal: "bg-zinc-900 border-4 border-[#3B4CCA] text-white font-['Press_Start_2P'] rounded-none shadow-[6px_6px_0_#CC0000] p-6",
          themeIcons: { iconGamepad: "●", iconTarget: "→", iconChicken: "×", chickenText: "Run", iconRoster: "▪", iconStar: "★" },
        };
      case Theme.SKYRIM:
        return {
          font: "'Cinzel', serif",
          container: "bg-black/95 text-stone-200 border border-[#D4AF37] rounded-none shadow-[0_0_8px_rgba(212,175,55,0.3)] font-['Cinzel'] tracking-widest uppercase text-xs p-2.5",
          btnNav: "border border-[#D4AF37] bg-black text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black rounded-none text-xs w-6 h-6 flex items-center justify-center cursor-pointer transition-colors",
          labelSub: "text-stone-400 text-[9px]",
          nameMain: "text-[#D4AF37] font-bold text-sm tracking-widest",
          targetPill: "border border-stone-700 bg-black text-[#D4AF37] rounded-none text-xs px-2 py-0.5",
          chickenBtn: "border border-amber-600 bg-black text-amber-400 hover:bg-amber-600 hover:text-black rounded-none text-xs font-bold tracking-widest px-2.5 py-1 transition-all active:scale-95 cursor-pointer",
          chickenBtnActive: "bg-red-800 text-white",
          rosterBtn: "border border-[#D4AF37] bg-black text-[#D4AF37] rounded-none text-xs px-2 py-1 cursor-pointer",
          modal: "bg-[#0A0A0A] border-2 border-[#D4AF37] text-stone-200 font-['Cinzel'] rounded-none shadow-[0_0_30px_rgba(212,175,55,0.2)] p-6",
          themeIcons: { iconGamepad: "†", iconTarget: "→", iconChicken: "‡", chickenText: "Fled", iconRoster: "⚔", iconStar: "★" },
        };
      case Theme.HAZBIN:
        return {
          font: "'Lora', serif",
          container: "bg-[#1a050f] text-[#ffcccb] border border-[#FFD700] rounded-none shadow-[0_0_8px_rgba(229,43,80,0.4)] font-['Lora'] tracking-wider text-xs p-2.5",
          btnNav: "border border-[#FFD700] bg-black text-[#FFD700] hover:bg-[#FFD700] hover:text-black rounded-none text-xs w-6 h-6 flex items-center justify-center cursor-pointer transition-colors",
          labelSub: "text-[#e52b50] text-[9px] uppercase font-bold tracking-widest",
          nameMain: "text-[#FFD700] font-bold text-sm font-['Fascinate_Inline']",
          targetPill: "border border-[#e52b50] bg-black text-[#ffcccb] rounded-none text-xs px-2 py-0.5",
          chickenBtn: "border border-red-600 bg-red-950 text-[#FFD700] hover:bg-red-600 hover:text-white rounded-none text-xs font-bold tracking-wider px-2.5 py-1 transition-all active:scale-95 cursor-pointer",
          chickenBtnActive: "bg-[#FFD700] text-black",
          rosterBtn: "border border-[#FFD700] bg-black text-[#FFD700] rounded-none text-xs px-2 py-1 cursor-pointer",
          modal: "bg-[#1a050f] border-2 border-[#FFD700] text-[#ffcccb] font-['Lora'] rounded-none shadow-[0_0_30px_rgba(229,43,80,0.3)] p-6",
          themeIcons: { iconGamepad: "★", iconTarget: "→", iconChicken: "!", chickenText: "Default", iconRoster: "🍸", iconStar: "★" },
        };
      case Theme.VOCALOID:
        return {
          font: "'Orbitron', sans-serif",
          container: "bg-black text-[#39C5BB] border border-[#39C5BB] rounded-none shadow-[0_0_8px_rgba(57,197,187,0.4)] font-['Orbitron'] text-xs p-2.5",
          btnNav: "border border-[#39C5BB] bg-black text-[#39C5BB] hover:bg-[#39C5BB] hover:text-black rounded-none text-xs w-6 h-6 flex items-center justify-center cursor-pointer transition-colors",
          labelSub: "text-[#FF1493] text-[9px] uppercase tracking-widest",
          nameMain: "text-[#39C5BB] font-bold text-sm tracking-wider",
          targetPill: "border border-[#FF1493] bg-black text-[#FF1493] rounded-none text-xs px-2 py-0.5",
          chickenBtn: "border border-[#FF1493] bg-black text-[#FF1493] hover:bg-[#FF1493] hover:text-white rounded-none text-xs font-bold px-2.5 py-1 transition-all active:scale-95 cursor-pointer",
          chickenBtnActive: "bg-[#FF1493] text-white",
          rosterBtn: "border border-[#39C5BB] bg-black text-[#39C5BB] rounded-none text-xs font-bold px-2 py-1 cursor-pointer",
          modal: "bg-black border-2 border-[#39C5BB] text-[#39C5BB] font-['Orbitron'] rounded-none shadow-[0_0_25px_rgba(57,197,187,0.3)] p-6",
          themeIcons: { iconGamepad: "♫", iconTarget: ">>", iconChicken: "//X", chickenText: "Miss", iconRoster: "◉", iconStar: "◈" },
        };
      case Theme.IRUMA:
        return {
          font: "'Sniglet', cursive",
          container: "bg-[#2e1534] text-white border-2 border-[#ffd700] rounded-xl shadow-[0_0_8px_rgba(255,215,0,0.3)] font-['Sniglet'] text-xs p-3",
          btnNav: "border border-[#ffd700] bg-purple-950 text-[#ffd700] hover:bg-[#ffd700] hover:text-black rounded-lg text-xs w-7 h-7 flex items-center justify-center cursor-pointer transition-colors",
          labelSub: "text-[#ffd700]/70 text-[10px]",
          nameMain: "text-[#ffd700] font-bold text-sm",
          targetPill: "border border-[#7B1FA2] bg-purple-950 text-white rounded-lg text-xs px-2 py-0.5",
          chickenBtn: "border-2 border-[#E040FB] bg-[#3e1544] text-[#E040FB] hover:bg-[#E040FB] hover:text-white rounded-lg text-xs font-bold px-3 py-1 transition-all active:scale-95 cursor-pointer",
          chickenBtnActive: "bg-[#ffd700] text-black",
          rosterBtn: "border border-[#ffd700] bg-purple-950 text-[#ffd700] rounded-lg text-xs font-bold px-2.5 py-1 cursor-pointer",
          modal: "bg-[#2e1534] border-4 border-[#ffd700] text-white font-['Sniglet'] rounded-3xl shadow-[0_0_25px_rgba(255,215,0,0.25)] p-6",
          themeIcons: { iconGamepad: "★", iconTarget: "→", iconChicken: "!", chickenText: "Forfeit", iconRoster: "👑", iconStar: "★" },
        };
      case Theme.ARCANE:
        return {
          font: "'Cinzel', serif",
          container: "bg-black/95 text-stone-200 border border-[#C8AA6E] rounded-none shadow-[0_0_8px_rgba(0,229,255,0.3)] font-['Cinzel'] tracking-widest text-xs p-2.5",
          btnNav: "border border-[#C8AA6E] bg-black text-[#00E5FF] hover:bg-[#C8AA6E] hover:text-black rounded-none text-xs w-6 h-6 flex items-center justify-center cursor-pointer transition-colors",
          labelSub: "text-[#C8AA6E] text-[9px]",
          nameMain: "text-[#00E5FF] font-bold text-sm tracking-widest",
          targetPill: "border border-[#9b59b6] bg-black text-[#9b59b6] rounded-none text-xs px-2 py-0.5",
          chickenBtn: "border border-[#00E5FF] bg-black text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black rounded-none text-xs font-bold tracking-widest px-2.5 py-1 transition-all active:scale-95 cursor-pointer",
          chickenBtnActive: "bg-[#00E5FF] text-black",
          rosterBtn: "border border-[#C8AA6E] bg-black text-[#00E5FF] rounded-none text-xs px-2 py-1 cursor-pointer",
          modal: "bg-[#0b0c10] border-2 border-[#C8AA6E] text-stone-200 font-['Cinzel'] rounded-none shadow-[0_0_30px_rgba(0,229,255,0.25)] p-6",
          themeIcons: { iconGamepad: "◆", iconTarget: "→", iconChicken: "×", chickenText: "Overload", iconRoster: "⚙", iconStar: "◈" },
        };
      case Theme.BILLY_HATCHER:
        return {
          font: "'Fredoka One', cursive",
          container: "bg-[#FDFAF4] text-[#222] border-2 border-[#1873CA] rounded-2xl shadow-sm font-['Fredoka_One'] text-xs p-3",
          btnNav: "border border-[#1873CA] bg-white text-[#1873CA] hover:bg-[#1873CA] hover:text-white rounded-xl text-xs w-7 h-7 flex items-center justify-center cursor-pointer transition-colors",
          labelSub: "text-[#1873CA]/70 text-[10px]",
          nameMain: "text-[#1873CA] font-bold text-sm",
          targetPill: "border border-[#1873CA] bg-white text-[#1873CA] rounded-xl text-xs px-2.5 py-0.5",
          chickenBtn: "border-2 border-[#E53935] bg-[#FFF0F0] text-[#E53935] hover:bg-[#E53935] hover:text-white rounded-xl text-xs font-bold px-3 py-1 transition-all active:scale-95 cursor-pointer",
          chickenBtnActive: "bg-[#E53935] text-white",
          rosterBtn: "border border-[#1873CA] bg-white text-[#1873CA] rounded-xl text-xs font-bold px-2.5 py-1 cursor-pointer",
          modal: "bg-[#FDFAF4] border-4 border-[#1873CA] text-[#222] font-['Fredoka_One'] rounded-3xl shadow-2xl p-6",
          themeIcons: { iconGamepad: "★", iconTarget: "→", iconChicken: "×", chickenText: "Chirp", iconRoster: "▪", iconStar: "★" },
        };
      default:
        return {
          font: "inherit",
          container: "bg-black/85 backdrop-blur-md border border-white/20 rounded-xl p-3 shadow-lg text-white text-xs",
          btnNav: "w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xs font-bold transition-colors cursor-pointer",
          labelSub: "text-white/50 text-[10px] uppercase font-semibold",
          nameMain: "text-white font-black text-base",
          targetPill: "px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs",
          chickenBtn: "bg-amber-950/70 hover:bg-amber-900 border border-amber-500/40 text-amber-200 px-2.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all active:scale-95 cursor-pointer",
          chickenBtnActive: "bg-amber-500 text-black shadow-lg shadow-amber-500/50",
          rosterBtn: "bg-white/10 hover:bg-white/20 border border-white/20 text-white px-2.5 py-1.5 rounded-lg font-bold text-xs uppercase transition-colors cursor-pointer",
          modal: "bg-zinc-950 border-2 border-white/20 rounded-2xl p-5 text-white shadow-2xl",
          themeIcons: { iconGamepad: "★", iconTarget: "→", iconChicken: "×", chickenText: "Forfeit", iconRoster: "▪", iconStar: "★" },
        };
    }
  };

  const style = getThemeStyles();

  return (
    <div className="w-full mb-3 select-none" style={{ fontFamily: style.font }}>
      {/* Themed Turn Banner Bar */}
      <div className={`${style.container} flex flex-col sm:flex-row items-center justify-between gap-2.5 transition-all`}>
        {/* Active Player Info */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={() => {
              hapticService.light();
              onPrevPlayer();
            }}
            title="Previous Player"
            className={style.btnNav}
          >
            ◀
          </button>

          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shadow-md"
              style={{ backgroundColor: activePlayer.color || '#ef4444' }}
            >
              {activePlayer.avatar || activePlayer.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className={style.labelSub}>CURRENT TURN</span>
                <span className="text-xs">{style.themeIcons.iconGamepad}</span>
              </div>
              <div className={style.nameMain}>
                {activePlayer.name}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              hapticService.light();
              onNextPlayer();
            }}
            title="Next Player"
            className={style.btnNav}
          >
            ▶
          </button>
        </div>

        {/* Target Player (if group >= 2) */}
        {targetPlayer && (
          <div className={`hidden sm:flex items-center gap-1.5 ${style.targetPill}`}>
            <span className="opacity-60 uppercase text-[9px] font-semibold">Target:</span>
            <span className="font-bold">
              {targetPlayer.avatar || style.themeIcons.iconTarget} {targetPlayer.name}
            </span>
          </div>
        )}

        {/* Quick Actions: Chicken Counter & Roster button */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <motion.button
            whileTap={{ scale: 0.92 }}
            animate={justChickened ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            onClick={handleChicken}
            title="Active player chickened out of the prompt!"
            className={`${justChickened ? style.chickenBtnActive : style.chickenBtn} flex items-center gap-1.5 transition-all`}
          >
            <span>{style.themeIcons.iconChicken}</span>
            <span>{style.themeIcons.chickenText || 'Forfeit'} ({activePlayer.chickenCount})</span>
          </motion.button>

          <button
            onClick={() => {
              hapticService.light();
              setShowRosterModal(true);
            }}
            title="View Player Roster & Standings"
            className={`${style.rosterBtn} flex items-center gap-1 transition-all`}
          >
            <span>{style.themeIcons.iconRoster}</span>
            <span>({players.length})</span>
          </button>
        </div>
      </div>

      {/* Target indicator on mobile if group >= 2 */}
      {targetPlayer && (
        <div className="sm:hidden mt-1 text-center">
          <span className="text-[10px] opacity-60 uppercase">Target: </span>
          <span className="text-xs font-bold">
            {targetPlayer.avatar || style.themeIcons.iconTarget} {targetPlayer.name}
          </span>
        </div>
      )}

      {/* Roster & Standings Themed Modal */}
      <AnimatePresence>
        {showRosterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              className={`${style.modal} max-w-md w-full max-h-[85vh] flex flex-col space-y-4`}
              style={{ fontFamily: style.font }}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center pb-2 border-b border-current/20">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{style.themeIcons.iconRoster}</span>
                  <h3 className="text-lg font-black uppercase tracking-wider">Party Roster</h3>
                </div>
                <button
                  onClick={() => setShowRosterModal(false)}
                  className="w-7 h-7 rounded flex items-center justify-center opacity-60 hover:opacity-100 font-bold transition-opacity cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Player Standings List */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {players.map((p, index) => {
                  const isActive = p.id === activePlayer.id;
                  return (
                    <div
                      key={p.id}
                      className={`p-3 rounded-lg border flex items-center justify-between transition-colors ${
                        isActive
                          ? 'border-current bg-current/10 font-bold shadow-sm'
                          : 'border-current/20 bg-current/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs opacity-50">#{index + 1}</span>
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shadow"
                          style={{ backgroundColor: p.color || '#3b82f6' }}
                        >
                          {p.avatar || p.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-sm flex items-center gap-2">
                            <span>{p.name}</span>
                            {isActive && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] bg-red-600 text-white font-black uppercase tracking-wider">
                                Turn
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] opacity-60 flex items-center gap-3">
                            <span>{style.themeIcons.iconChicken} {p.chickenCount} {style.themeIcons.chickenText || 'forfeits'}</span>
                            {p.score > 0 && <span>{style.themeIcons.iconStar} {p.score} pts</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            onIncrementChicken(p.id);
                            hapticService.heavy();
                          }}
                          title="Add chicken penalty"
                          className="px-2 py-1 rounded border border-current/30 text-xs font-bold hover:bg-current/10 cursor-pointer"
                        >
                          +{style.themeIcons.iconChicken}
                        </button>
                        {players.length > 1 && (
                          <button
                            onClick={() => {
                              onRemovePlayer(p.id);
                              hapticService.light();
                            }}
                            title="Remove player"
                            className="px-2 py-1 rounded border border-red-500/40 text-red-400 text-xs font-bold hover:bg-red-950/40 cursor-pointer"
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
              <form onSubmit={handleAddNew} className="flex gap-2 pt-2 border-t border-current/20">
                <input
                  type="text"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  placeholder="Add friend..."
                  maxLength={18}
                  className="flex-1 bg-current/10 border border-current/30 rounded px-3 py-2 text-xs placeholder-current/40 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!newPlayerName.trim()}
                  className="px-4 py-2 rounded bg-current/20 hover:bg-current/30 disabled:opacity-30 text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
                >
                  + Add
                </button>
              </form>

              {/* Close Button */}
              <button
                onClick={() => setShowRosterModal(false)}
                className="w-full py-2.5 rounded border border-current/30 text-xs font-bold uppercase tracking-wider hover:bg-current/10 transition-colors cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
