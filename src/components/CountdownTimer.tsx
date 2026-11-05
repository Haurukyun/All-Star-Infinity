import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TimerDuration, Theme, Intensity } from '../types';
import { hapticService } from '../services/haptics';
import { soundService } from '../services/soundFx';

interface CountdownTimerProps {
  enabled: boolean;
  duration: TimerDuration;
  onToggleEnabled: () => void;
  onChangeDuration: (duration: TimerDuration) => void;
  promptId?: string;
  isPromptActive: boolean;
  theme?: Theme;
  intensity?: Intensity | null;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  enabled,
  duration,
  onToggleEnabled,
  onChangeDuration,
  promptId,
  isPromptActive,
  theme = Theme.SONIC,
  intensity,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const prevPromptIdRef = useRef<string | undefined>(promptId);

  // Reset timer whenever duration changes or a new prompt is drawn
  useEffect(() => {
    setTimeLeft(duration);
    setIsRunning(true);
  }, [duration, promptId]);

  // Track prompt changes
  useEffect(() => {
    if (promptId !== prevPromptIdRef.current) {
      prevPromptIdRef.current = promptId;
      setTimeLeft(duration);
      setIsRunning(true);
    }
  }, [promptId, duration]);

  // Main countdown interval
  useEffect(() => {
    if (!enabled || !isPromptActive || !isRunning || timeLeft <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          hapticService.error();
          soundService.buzzer();
          return 0;
        }
        if (prev <= 4) {
          hapticService.warning();
          soundService.countdownStep(1.3);
        } else {
          soundService.tick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [enabled, isPromptActive, isRunning, timeLeft]);

  const isLowTime = timeLeft <= 5 && timeLeft > 0;
  const isExpired = timeLeft === 0 && isPromptActive;

  // Percentage for progress indicator
  const progressPercent = Math.max(0, Math.min(100, (timeLeft / duration) * 100));

  // Themed visual styling configuration
  const getThemeStyle = () => {
    switch (theme) {
      case Theme.UNDERTALE:
        return {
          font: "'Press Start 2P', monospace",
          offBtn: "border-2 border-white/60 bg-black text-white/70 font-['Press_Start_2P'] text-[10px] px-3 py-1.5 shadow-[2px_2px_0_#FFF] rounded-none",
          activeBtn: "border-2 border-white bg-black text-white font-['Press_Start_2P'] text-[10px] px-3 py-1.5 shadow-[2px_2px_0_#FFF] rounded-none",
          lowBtn: "border-2 border-amber-300 bg-black text-amber-300 font-['Press_Start_2P'] text-[10px] px-3 py-1.5 shadow-[2px_2px_0_#FBBF24] rounded-none",
          expiredBtn: "border-2 border-red-500 bg-red-950 text-white font-['Press_Start_2P'] text-[10px] px-3 py-1.5 shadow-[2px_2px_0_#EF4444] rounded-none",
          activeIcon: "❤️",
          offIcon: "♡",
          expiredIcon: "💔",
          offLabel: "* TIMER OFF",
          activePrefix: "* ",
          expiredLabel: "* TIME UP!",
          popoverBg: "bg-black border-2 border-white text-white font-['Press_Start_2P'] rounded-none text-[10px]",
        };
      case Theme.FNAF:
        return {
          font: "'VT323', monospace",
          offBtn: "border border-green-900 bg-black text-green-700 font-['VT323'] text-base px-3 py-0.5 rounded-none shadow-[0_0_5px_rgba(34,197,94,0.1)]",
          activeBtn: "border border-green-500/80 bg-black text-green-400 font-['VT323'] text-lg px-3 py-0.5 rounded-none shadow-[0_0_10px_rgba(34,197,94,0.3)] tracking-wider",
          lowBtn: "border border-amber-400 bg-black text-amber-300 font-['VT323'] text-lg px-3 py-0.5 rounded-none shadow-[0_0_10px_rgba(251,191,36,0.4)] tracking-wider",
          expiredBtn: "border border-red-500 bg-black text-red-500 font-['VT323'] text-lg px-3 py-0.5 rounded-none shadow-[0_0_15px_rgba(239,68,68,0.5)] tracking-wider",
          activeIcon: "●",
          offIcon: "○",
          expiredIcon: "!",
          offLabel: "[REC_TMR: OFF]",
          activePrefix: "[REC 00:",
          activeSuffix: "]",
          expiredLabel: "[TIME EXPIRED]",
          popoverBg: "bg-black border border-green-500 text-green-400 font-['VT323'] rounded-none text-sm",
        };
      case Theme.SONIC:
        return {
          font: "'Bangers', cursive",
          offBtn: "-skew-x-12 border-3 border-black bg-white/80 text-black/70 font-['Bangers'] text-base px-3.5 py-1 rounded-xl shadow-[3px_3px_0_#000] tracking-wide",
          activeBtn: "-skew-x-12 border-3 border-black bg-yellow-400 text-black font-['Bangers'] text-lg px-3.5 py-1 rounded-xl shadow-[3px_3px_0_#000] tracking-wide",
          lowBtn: "-skew-x-12 border-3 border-black bg-orange-500 text-white font-['Bangers'] text-lg px-3.5 py-1 rounded-xl shadow-[3px_3px_0_#000] tracking-wide",
          expiredBtn: "-skew-x-12 border-3 border-black bg-red-600 text-white font-['Bangers'] text-lg px-3.5 py-1 rounded-xl shadow-[3px_3px_0_#000] tracking-wide",
          activeIcon: "⚡",
          offIcon: "⏱",
          expiredIcon: "💥",
          offLabel: "TIME: OFF",
          activePrefix: "TIME: ",
          expiredLabel: "TIME'S UP!",
          popoverBg: "bg-yellow-400 border-3 border-black text-black font-['Bangers'] rounded-xl -skew-x-2 text-base shadow-[5px_5px_0_#000]",
        };
      case Theme.PERSONA:
        return {
          font: "'Edo', sans-serif",
          offBtn: "-skew-x-12 border-2 border-white/40 bg-black/90 text-white/50 font-['Edo'] text-xs px-3 py-1 rounded-none shadow-[2px_2px_0_#D80000]",
          activeBtn: "-skew-x-12 border-2 border-white bg-[#D80000] text-white font-['Edo'] text-sm px-3.5 py-1 rounded-none shadow-[3px_3px_0_#000] italic font-bold",
          lowBtn: "-skew-x-12 border-2 border-white bg-amber-500 text-black font-['Edo'] text-sm px-3.5 py-1 rounded-none shadow-[3px_3px_0_#000] italic font-bold",
          expiredBtn: "-skew-x-12 border-2 border-yellow-400 bg-black text-yellow-400 font-['Edo'] text-sm px-3.5 py-1 rounded-none shadow-[3px_3px_0_#D80000] italic font-bold",
          activeIcon: "★",
          offIcon: "☆",
          expiredIcon: "💀",
          offLabel: "LIMIT: OFF",
          activePrefix: "LIMIT: ",
          expiredLabel: "TIME EXPIRED!",
          popoverBg: "bg-[#0A0A0A] border-2 border-[#D80000] text-white font-['Edo'] rounded-none -skew-x-2 text-xs shadow-[4px_4px_0_#D80000]",
        };
      case Theme.MINECRAFT:
        return {
          font: "'Minecraft', monospace",
          offBtn: "border-2 border-t-[#666] border-l-[#666] border-r-[#222] border-b-[#222] bg-[#444] text-[#888] font-['Minecraft'] text-xs px-3 py-1.5 rounded-none",
          activeBtn: "border-2 border-t-[#AAA] border-l-[#AAA] border-r-[#373737] border-b-[#373737] bg-[#707070] text-white font-['Minecraft'] text-xs px-3 py-1.5 rounded-none shadow-sm",
          lowBtn: "border-2 border-t-[#FA0] border-l-[#FA0] border-r-[#740] border-b-[#740] bg-[#C80] text-white font-['Minecraft'] text-xs px-3 py-1.5 rounded-none shadow-sm",
          expiredBtn: "border-2 border-t-[#F88] border-l-[#F88] border-r-[#800] border-b-[#800] bg-[#A00] text-white font-['Minecraft'] text-xs px-3 py-1.5 rounded-none shadow-sm",
          activeIcon: "⏱",
          offIcon: "⏱",
          expiredIcon: "🧨",
          offLabel: "Timer: Off",
          activePrefix: "Timer: ",
          expiredLabel: "Time's Up!",
          popoverBg: "bg-[#4B4B4B] border-2 border-t-[#AAA] border-l-[#AAA] border-r-[#222] border-b-[#222] text-white font-['Minecraft'] rounded-none text-xs",
        };
      case Theme.CYBERPUNK:
        return {
          font: "'Orbitron', sans-serif",
          offBtn: "border border-yellow-400/30 bg-black/80 text-yellow-400/40 font-['Orbitron'] text-[11px] px-3 py-1 rounded-none",
          activeBtn: "border border-yellow-400 bg-black text-yellow-400 font-['Orbitron'] text-[11px] px-3 py-1 rounded-none shadow-[0_0_8px_rgba(250,204,21,0.3)]",
          lowBtn: "border border-amber-400 bg-amber-950 text-amber-300 font-['Orbitron'] text-[11px] px-3 py-1 rounded-none shadow-[0_0_10px_rgba(251,191,36,0.4)]",
          expiredBtn: "border border-cyan-400 bg-red-950 text-cyan-300 font-['Orbitron'] text-[11px] px-3 py-1 rounded-none shadow-[0_0_12px_rgba(34,211,238,0.5)]",
          activeIcon: ">",
          offIcon: "x",
          expiredIcon: "!",
          offLabel: "[TMR: OFF]",
          activePrefix: "[T-",
          activeSuffix: "]",
          expiredLabel: "[T-EXPIRED]",
          popoverBg: "bg-black border border-yellow-400 text-yellow-400 font-['Orbitron'] rounded-none text-xs",
        };
      case Theme.ANIMAL_CROSSING:
        return {
          font: "'Sniglet', cursive",
          offBtn: "border-2 border-[#C0D8C5] bg-[#F0EBE1] text-[#90A895] font-['Sniglet'] text-xs px-3.5 py-1 rounded-2xl shadow-sm",
          activeBtn: "border-2 border-[#7EBF8F] bg-[#F7F4E9] text-[#4A7A56] font-['Sniglet'] text-xs px-3.5 py-1 rounded-2xl shadow-sm font-bold",
          lowBtn: "border-2 border-[#F6BB42] bg-[#FFF9E6] text-[#D48900] font-['Sniglet'] text-xs px-3.5 py-1 rounded-2xl shadow-sm font-bold",
          expiredBtn: "border-2 border-[#E57373] bg-[#FFEBEE] text-[#C62828] font-['Sniglet'] text-xs px-3.5 py-1 rounded-2xl shadow-sm font-bold",
          activeIcon: "🍃",
          offIcon: "🍃",
          expiredIcon: "🔔",
          offLabel: "Timer Off",
          activePrefix: "",
          expiredLabel: "Ring Ring!",
          popoverBg: "bg-[#FBF8EF] border-2 border-[#7EBF8F] text-[#4A7A56] font-['Sniglet'] rounded-2xl shadow-xl text-xs",
        };
      case Theme.SANRIO:
        return {
          font: "'Cherry Bomb One', cursive",
          offBtn: "border-2 border-[#FFB6C1]/50 bg-[#FFF0F5] text-[#DB7093]/60 font-['Cherry_Bomb_One'] text-xs px-3.5 py-1 rounded-full shadow-sm",
          activeBtn: "border-2 border-[#FF8DA1] bg-[#FFE4EC] text-[#D84B6B] font-['Cherry_Bomb_One'] text-xs px-3.5 py-1 rounded-full shadow-sm",
          lowBtn: "border-2 border-[#FFB347] bg-[#FFF5E6] text-[#D2691E] font-['Cherry_Bomb_One'] text-xs px-3.5 py-1 rounded-full shadow-sm",
          expiredBtn: "border-2 border-[#FF1493] bg-[#FF69B4] text-white font-['Cherry_Bomb_One'] text-xs px-3.5 py-1 rounded-full shadow-sm",
          activeIcon: "⭐",
          offIcon: "✨",
          expiredIcon: "🎀",
          offLabel: "Timer Off",
          activePrefix: "",
          expiredLabel: "Time's Up!",
          popoverBg: "bg-[#FFF5F8] border-2 border-[#FF8DA1] text-[#D84B6B] font-['Cherry_Bomb_One'] rounded-2xl shadow-xl text-xs",
        };
      case Theme.FALLOUT:
        return {
          font: "'Share Tech Mono', monospace",
          offBtn: "border border-[#14FF00]/30 bg-black text-[#14FF00]/40 font-['Share_Tech_Mono'] text-xs px-3 py-1 rounded-none",
          activeBtn: "border border-[#14FF00] bg-black text-[#14FF00] font-['Share_Tech_Mono'] text-xs px-3 py-1 rounded-none shadow-[0_0_8px_rgba(20,255,0,0.3)]",
          lowBtn: "border border-[#FFAA00] bg-black text-[#FFAA00] font-['Share_Tech_Mono'] text-xs px-3 py-1 rounded-none shadow-[0_0_10px_rgba(255,170,0,0.4)]",
          expiredBtn: "border border-[#FF3B00] bg-black text-[#FF3B00] font-['Share_Tech_Mono'] text-xs px-3 py-1 rounded-none shadow-[0_0_12px_rgba(255,59,0,0.5)]",
          activeIcon: "►",
          offIcon: "○",
          expiredIcon: "!",
          offLabel: "[SYS.TMR: OFF]",
          activePrefix: "[SEC: ",
          activeSuffix: "]",
          expiredLabel: "[TIME ZERO]",
          popoverBg: "bg-black border border-[#14FF00] text-[#14FF00] font-['Share_Tech_Mono'] rounded-none text-xs",
        };
      case Theme.DANGANRONPA:
        return {
          font: "'Courier New', monospace",
          offBtn: "border-2 border-[#FF007F]/40 bg-[#050510] text-[#FF007F]/50 font-mono text-xs px-3 py-1 rounded-none",
          activeBtn: "border-2 border-[#FF007F] bg-[#050510] text-[#FF007F] font-mono text-xs px-3 py-1 rounded-none shadow-[0_0_10px_rgba(255,0,127,0.4)] font-bold tracking-wider",
          lowBtn: "border-2 border-yellow-400 bg-black text-yellow-300 font-mono text-xs px-3 py-1 rounded-none shadow-[0_0_12px_rgba(250,204,21,0.5)] font-bold",
          expiredBtn: "border-2 border-red-600 bg-red-950 text-white font-mono text-xs px-3 py-1 rounded-none shadow-[0_0_15px_rgba(220,38,38,0.7)] font-bold",
          activeIcon: "🎯",
          offIcon: "🎯",
          expiredIcon: "💀",
          offLabel: "TRIAL: OFF",
          activePrefix: "TRIAL: ",
          expiredLabel: "GUILTY!",
          popoverBg: "bg-[#050510] border-2 border-[#FF007F] text-white font-mono rounded-none text-xs shadow-2xl",
        };
      case Theme.OMORI: {
        const isVulgar = intensity === Intensity.VULGAR;
        const isHot = intensity === Intensity.HOT;
        return {
          font: "'Gloria Hallelujah', cursive",
          offBtn: isVulgar
            ? "border-2 border-[#ff0000]/50 bg-black text-[#ff0000]/60 font-['Gloria_Hallelujah'] text-xs px-3 py-1 rounded-none shadow-sm"
            : isHot
            ? "border-2 border-white/50 bg-[#9B6EFF] text-white/70 font-['Gloria_Hallelujah'] text-xs px-3 py-1 rounded-none shadow-sm"
            : "border-2 border-black/40 bg-white/70 text-black/50 font-['Gloria_Hallelujah'] text-xs px-3 py-1 rounded-none shadow-sm",
          activeBtn: isVulgar
            ? "border-2 border-[#ff0000] bg-black text-[#ff0000] font-['Gloria_Hallelujah'] text-xs px-3 py-1 rounded-none shadow-[2px_2px_0_#ff0000] font-bold"
            : isHot
            ? "border-2 border-white bg-[#7B55CC] text-white font-['Gloria_Hallelujah'] text-xs px-3 py-1 rounded-none shadow-[2px_2px_0_#fff] font-bold"
            : "border-2 border-black bg-white text-black font-['Gloria_Hallelujah'] text-xs px-3 py-1 rounded-none shadow-[2px_2px_0_#000] font-bold",
          lowBtn: isVulgar
            ? "border-2 border-[#ff0000] bg-red-950 text-[#ff0000] font-['Gloria_Hallelujah'] text-xs px-3 py-1 rounded-none shadow-[2px_2px_0_#ff0000] font-bold animate-pulse"
            : isHot
            ? "border-2 border-white bg-[#5B35AC] text-white font-['Gloria_Hallelujah'] text-xs px-3 py-1 rounded-none shadow-[2px_2px_0_#fff] font-bold animate-pulse"
            : "border-2 border-red-500 bg-red-50 text-red-600 font-['Gloria_Hallelujah'] text-xs px-3 py-1 rounded-none shadow-[2px_2px_0_#EF4444] font-bold",
          expiredBtn: isVulgar
            ? "border-2 border-[#ff0000] bg-[#ff0000] text-black font-['Gloria_Hallelujah'] text-xs px-3 py-1 rounded-none shadow-[2px_2px_0_#ff0000] font-bold"
            : isHot
            ? "border-2 border-white bg-white text-[#7B55CC] font-['Gloria_Hallelujah'] text-xs px-3 py-1 rounded-none shadow-[2px_2px_0_#7B55CC] font-bold"
            : "border-2 border-black bg-black text-white font-['Gloria_Hallelujah'] text-xs px-3 py-1 rounded-none shadow-[2px_2px_0_#FFF] font-bold",
          activeIcon: isVulgar ? "!" : isHot ? "★" : "!",
          offIcon: "○",
          expiredIcon: "×",
          offLabel: "(timer off)",
          activePrefix: "(",
          activeSuffix: ")",
          expiredLabel: "something happened",
          popoverBg: isVulgar
            ? "bg-black border-2 border-[#ff0000] text-[#ff0000] font-['Gloria_Hallelujah'] rounded-none text-xs shadow-lg"
            : isHot
            ? "bg-[#9B6EFF] border-2 border-white text-white font-['Gloria_Hallelujah'] rounded-none text-xs shadow-lg"
            : "bg-white border-2 border-black text-black font-['Gloria_Hallelujah'] rounded-none text-xs shadow-lg",
        };
      }
      case Theme.KIRBY:
        return {
          font: "'Fredoka One', cursive",
          offBtn: "border-2 border-[#FF85B3]/40 bg-[#FFE4EF]/60 text-[#D81B60]/50 font-['Fredoka_One'] text-xs px-3.5 py-1 rounded-full",
          activeBtn: "border-2 border-[#FF85B3] bg-[#FFE4EF] text-[#D81B60] font-['Fredoka_One'] text-xs px-3.5 py-1 rounded-full shadow-[0_2px_8px_rgba(255,133,179,0.3)] font-bold",
          lowBtn: "border-2 border-[#FFA726] bg-[#FFF3E0] text-[#E65100] font-['Fredoka_One'] text-xs px-3.5 py-1 rounded-full shadow-md font-bold",
          expiredBtn: "border-2 border-[#E91E63] bg-[#E91E63] text-white font-['Fredoka_One'] text-xs px-3.5 py-1 rounded-full shadow-md font-bold",
          activeIcon: "⭐",
          offIcon: "⭐",
          expiredIcon: "💫",
          offLabel: "★ Timer Off",
          activePrefix: "★ ",
          activeSuffix: " ★",
          expiredLabel: "Time's Up!",
          popoverBg: "bg-[#FFF0F5] border-2 border-[#FF85B3] text-[#D81B60] font-['Fredoka_One'] rounded-2xl text-xs shadow-xl",
        };
      case Theme.POKEMON:
        return {
          font: "'Press Start 2P', monospace",
          offBtn: "border-2 border-zinc-600 bg-zinc-800 text-zinc-400 font-['Press_Start_2P'] text-[10px] px-3 py-1.5 rounded-none",
          activeBtn: "border-2 border-[#3B4CCA] bg-zinc-900 text-[#FFDE00] font-['Press_Start_2P'] text-[10px] px-3 py-1.5 rounded-none shadow-[2px_2px_0_#3B4CCA]",
          lowBtn: "border-2 border-[#CC0000] bg-zinc-900 text-[#FF5555] font-['Press_Start_2P'] text-[10px] px-3 py-1.5 rounded-none shadow-[2px_2px_0_#CC0000]",
          expiredBtn: "border-2 border-[#CC0000] bg-[#CC0000] text-white font-['Press_Start_2P'] text-[10px] px-3 py-1.5 rounded-none shadow-[2px_2px_0_#000]",
          activeIcon: "🔴",
          offIcon: "⚪",
          expiredIcon: "💥",
          offLabel: "TURN: OFF",
          activePrefix: "TURN: ",
          expiredLabel: "FAINTED!",
          popoverBg: "bg-zinc-900 border-2 border-[#3B4CCA] text-white font-['Press_Start_2P'] rounded-none text-[10px] shadow-2xl",
        };
      case Theme.SKYRIM:
        return {
          font: "'Cinzel', serif",
          offBtn: "border border-stone-600/50 bg-black/80 text-stone-400 font-['Cinzel'] text-xs px-3 py-1 rounded-none",
          activeBtn: "border border-[#D4AF37] bg-black/95 text-[#D4AF37] font-['Cinzel'] text-xs px-3 py-1 rounded-none shadow-[0_0_8px_rgba(212,175,55,0.3)] tracking-widest uppercase font-bold",
          lowBtn: "border border-amber-600 bg-black text-amber-500 font-['Cinzel'] text-xs px-3 py-1 rounded-none shadow-[0_0_10px_rgba(217,119,6,0.4)] tracking-widest uppercase font-bold",
          expiredBtn: "border border-red-700 bg-red-950 text-red-200 font-['Cinzel'] text-xs px-3 py-1 rounded-none shadow-[0_0_12px_rgba(185,28,28,0.5)] tracking-widest uppercase font-bold",
          activeIcon: "🐉",
          offIcon: "🐉",
          expiredIcon: "⚔️",
          offLabel: "TIME: OFF",
          activePrefix: "TIME: ",
          expiredLabel: "FATE SEALED",
          popoverBg: "bg-[#0A0A0A] border border-[#D4AF37] text-[#D4AF37] font-['Cinzel'] rounded-none text-xs shadow-2xl",
        };
      case Theme.HAZBIN:
        return {
          font: "'Fascinate Inline', cursive",
          offBtn: "border border-[#e52b50]/40 bg-[#1a050f] text-[#ffcccb]/40 font-['Fascinate_Inline'] text-xs px-3 py-1 rounded-none",
          activeBtn: "border border-[#FFD700] bg-[#1a050f] text-[#e52b50] font-['Fascinate_Inline'] text-xs px-3 py-1 rounded-none shadow-[0_0_10px_rgba(229,43,80,0.4)] tracking-wider",
          lowBtn: "border border-[#FFD700] bg-[#2a0515] text-[#FFD700] font-['Fascinate_Inline'] text-xs px-3 py-1 rounded-none shadow-[0_0_12px_rgba(255,215,0,0.5)] tracking-wider",
          expiredBtn: "border border-red-600 bg-red-900 text-white font-['Fascinate_Inline'] text-xs px-3 py-1 rounded-none shadow-[0_0_15px_rgba(220,38,38,0.6)] tracking-wider",
          activeIcon: "😈",
          offIcon: "🍸",
          expiredIcon: "🔥",
          offLabel: "PACT: OFF",
          activePrefix: "PACT: ",
          expiredLabel: "DEAL SEALED!",
          popoverBg: "bg-[#1a050f] border border-[#FFD700] text-[#ffcccb] font-['Lora'] rounded-none text-xs shadow-2xl",
        };
      case Theme.VOCALOID:
        return {
          font: "'Orbitron', sans-serif",
          offBtn: "border border-[#39C5BB]/30 bg-black text-[#39C5BB]/40 font-['Orbitron'] text-xs px-3 py-1 rounded-none",
          activeBtn: "border border-[#39C5BB] bg-black text-[#39C5BB] font-['Orbitron'] text-xs px-3 py-1 rounded-none shadow-[0_0_10px_rgba(57,197,187,0.4)] tracking-wider font-bold",
          lowBtn: "border border-[#FF1493] bg-black text-[#FF1493] font-['Orbitron'] text-xs px-3 py-1 rounded-none shadow-[0_0_12px_rgba(255,20,147,0.5)] tracking-wider font-bold",
          expiredBtn: "border border-red-500 bg-black text-red-500 font-['Orbitron'] text-xs px-3 py-1 rounded-none shadow-[0_0_15px_rgba(239,68,68,0.6)] tracking-wider font-bold",
          activeIcon: "🎤",
          offIcon: "🎵",
          expiredIcon: "💥",
          offLabel: "BPM: OFF",
          activePrefix: "BPM: ",
          expiredLabel: "OUT OF TIME!",
          popoverBg: "bg-black border border-[#39C5BB] text-[#39C5BB] font-['Orbitron'] rounded-none text-xs shadow-2xl",
        };
      case Theme.IRUMA:
        return {
          font: "'Sniglet', cursive",
          offBtn: "border-2 border-[#7B1FA2]/40 bg-[#2e1534] text-[#ffd700]/40 font-['Sniglet'] text-xs px-3 py-1 rounded-xl",
          activeBtn: "border-2 border-[#ffd700] bg-[#2e1534] text-[#ffd700] font-['Sniglet'] text-xs px-3.5 py-1 rounded-xl shadow-[0_0_8px_rgba(255,215,0,0.3)] font-bold",
          lowBtn: "border-2 border-[#E040FB] bg-[#3e1544] text-[#E040FB] font-['Sniglet'] text-xs px-3.5 py-1 rounded-xl shadow-[0_0_10px_rgba(224,64,251,0.4)] font-bold",
          expiredBtn: "border-2 border-red-500 bg-red-950 text-white font-['Sniglet'] text-xs px-3.5 py-1 rounded-xl shadow-lg font-bold",
          activeIcon: "🦇",
          offIcon: "🦇",
          expiredIcon: "👑",
          offLabel: "Babyls: Off",
          activePrefix: "Babyls: ",
          expiredLabel: "Penalty Time!",
          popoverBg: "bg-[#2e1534] border-2 border-[#ffd700] text-white font-['Sniglet'] rounded-xl text-xs shadow-2xl",
        };
      case Theme.ARCANE:
        return {
          font: "'Cinzel', serif",
          offBtn: "border border-[#C8AA6E]/30 bg-black text-[#C8AA6E]/40 font-['Cinzel'] text-xs px-3 py-1 rounded-none",
          activeBtn: "border border-[#C8AA6E] bg-black text-[#00E5FF] font-['Cinzel'] text-xs px-3 py-1 rounded-none shadow-[0_0_10px_rgba(0,229,255,0.3)] tracking-widest font-bold",
          lowBtn: "border border-[#9b59b6] bg-black text-[#9b59b6] font-['Cinzel'] text-xs px-3 py-1 rounded-none shadow-[0_0_12px_rgba(155,89,182,0.4)] tracking-widest font-bold",
          expiredBtn: "border border-red-600 bg-red-950 text-red-300 font-['Cinzel'] text-xs px-3 py-1 rounded-none shadow-[0_0_15px_rgba(220,38,38,0.5)] tracking-widest font-bold",
          activeIcon: "⚡",
          offIcon: "⚙️",
          expiredIcon: "🔮",
          offLabel: "CHARGE: OFF",
          activePrefix: "CHARGE: ",
          expiredLabel: "OVERLOAD!",
          popoverBg: "bg-[#0b0c10] border border-[#C8AA6E] text-[#00E5FF] font-['Cinzel'] rounded-none text-xs shadow-2xl",
        };
      case Theme.BILLY_HATCHER:
        return {
          font: "'Fredoka One', cursive",
          offBtn: "border-2 border-[#1873CA]/40 bg-[#FDFAF4] text-[#1873CA]/40 font-['Fredoka_One'] text-xs px-3.5 py-1 rounded-2xl",
          activeBtn: "border-2 border-[#1873CA] bg-[#FDFAF4] text-[#1873CA] font-['Fredoka_One'] text-xs px-3.5 py-1 rounded-2xl shadow-sm font-bold",
          lowBtn: "border-2 border-[#FF9800] bg-[#FFF3E0] text-[#E65100] font-['Fredoka_One'] text-xs px-3.5 py-1 rounded-2xl shadow font-bold",
          expiredBtn: "border-2 border-[#E53935] bg-[#E53935] text-white font-['Fredoka_One'] text-xs px-3.5 py-1 rounded-2xl shadow font-bold",
          activeIcon: "🥚",
          offIcon: "🥚",
          expiredIcon: "🐔",
          offLabel: "Hatch: Off",
          activePrefix: "Hatch: ",
          expiredLabel: "Cock-a-doodle-doo!",
          popoverBg: "bg-[#FDFAF4] border-2 border-[#1873CA] text-[#1873CA] font-['Fredoka_One'] rounded-2xl text-xs shadow-xl",
        };
      default:
        return {
          font: "inherit",
          offBtn: "border border-white/20 bg-black/70 text-white/60 text-xs px-3 py-1 rounded-full",
          activeBtn: "border border-white/40 bg-black/80 text-white text-xs px-3 py-1 rounded-full shadow",
          lowBtn: "border border-amber-400 bg-amber-900 text-white text-xs px-3 py-1 rounded-full shadow",
          expiredBtn: "border border-red-500 bg-red-800 text-white text-xs px-3 py-1 rounded-full shadow",
          activeIcon: "⏱",
          offIcon: "⏱",
          expiredIcon: "⏰",
          offLabel: "TIMER: OFF",
          activePrefix: "",
          expiredLabel: "TIME'S UP!",
          popoverBg: "bg-zinc-900 border border-white/30 text-white rounded-xl text-xs",
        };
    }
  };

  const style = getThemeStyle();

  if (!enabled) {
    return (
      <div className="relative inline-block select-none">
        <button
          onClick={() => {
            hapticService.light();
            soundService.click();
            onToggleEnabled();
          }}
          title="Turn on Countdown Timer"
          className={`${style.offBtn} flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer`}
          style={{ fontFamily: style.font }}
        >
          <span>{style.offIcon}</span>
          <span>{style.offLabel}</span>
        </button>
      </div>
    );
  }

  const currentBtnClass = isExpired
    ? style.expiredBtn
    : isLowTime
    ? style.lowBtn
    : style.activeBtn;

  const currentIcon = isExpired
    ? style.expiredIcon
    : isLowTime
    ? "⚠️"
    : style.activeIcon;

  const displayText = isExpired
    ? style.expiredLabel
    : (style.activePrefix || '') + timeLeft + 's' + (style.activeSuffix || '');

  return (
    <div className="relative inline-block select-none">
      <motion.div
        animate={
          isExpired
            ? { x: [-3, 3, -3, 3, 0], scale: [1, 1.05, 1] }
            : isLowTime
            ? { scale: [1, 1.06, 1] }
            : { scale: 1 }
        }
        transition={{
          repeat: isLowTime ? Infinity : isExpired ? 3 : 0,
          duration: isLowTime ? 0.6 : 0.3,
        }}
        onClick={() => {
          hapticService.light();
          soundService.click();
          setShowConfig((prev) => !prev);
        }}
        className={`${currentBtnClass} flex items-center gap-2 cursor-pointer transition-colors active:scale-95`}
        style={{ fontFamily: style.font }}
      >
        <span>{currentIcon}</span>
        <span className="tracking-normal font-black">{displayText}</span>

        {/* Small progress meter dot (hidden in monochrome sketch / 8-bit themes like Omori & Undertale) */}
        {theme !== Theme.OMORI && theme !== Theme.UNDERTALE && (
          <div className="w-2.5 h-2.5 border border-current/40 overflow-hidden bg-black/20 inline-block align-middle ml-0.5">
            <div
              className={`h-full transition-all duration-300 ${
                isExpired ? 'bg-red-500' : isLowTime ? 'bg-amber-400' : 'bg-current'
              }`}
              style={{ width: progressPercent + '%' }}
            />
          </div>
        )}
      </motion.div>

      {/* Quick Config Popover */}
      <AnimatePresence>
        {showConfig && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            className={`absolute right-0 top-full mt-2 w-48 p-3 shadow-2xl z-50 space-y-2.5 ${style.popoverBg}`}
            style={{ fontFamily: style.font }}
          >
            <div className="flex justify-between items-center border-b border-white/20 pb-1.5">
              <span className="font-bold tracking-wider uppercase opacity-80">Timer Settings</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  hapticService.light();
                  soundService.click();
                  setShowConfig(false);
                }}
                className="opacity-60 hover:opacity-100 font-mono text-sm px-1"
              >
                ✕
              </button>
            </div>

            {/* Quick Actions: Pause/Resume + Restart */}
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  hapticService.light();
                  soundService.click();
                  setIsRunning((prev) => !prev);
                }}
                className="py-1 px-2 border border-white/20 bg-white/10 hover:bg-white/20 font-bold uppercase text-center"
              >
                {isRunning ? '⏸ Pause' : '▶ Play'}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  hapticService.light();
                  soundService.click();
                  setTimeLeft(duration);
                  setIsRunning(true);
                }}
                className="py-1 px-2 border border-white/20 bg-white/10 hover:bg-white/20 font-bold uppercase text-center"
              >
                🔄 Reset
              </button>
            </div>

            {/* Duration Selector */}
            <div className="space-y-1">
              <span className="opacity-70 uppercase font-semibold text-[10px] block">Duration:</span>
              <div className="grid grid-cols-3 gap-1">
                {([15, 30, 60] as TimerDuration[]).map((d) => (
                  <button
                    key={d}
                    onClick={(e) => {
                      e.stopPropagation();
                      hapticService.light();
                      soundService.click();
                      onChangeDuration(d);
                      setTimeLeft(d);
                      setIsRunning(true);
                    }}
                    className={`py-1 border font-bold text-center transition-colors ${
                      duration === d
                        ? 'bg-red-600 text-white border-white shadow'
                        : 'border-white/20 bg-white/10 hover:bg-white/20 opacity-80'
                    }`}
                  >
                    {d}s
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle Off */}
            <div className="pt-1 border-t border-white/20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  hapticService.light();
                  soundService.click();
                  setShowConfig(false);
                  onToggleEnabled();
                }}
                className="w-full py-1.5 border border-red-500/50 bg-red-950/70 hover:bg-red-900 text-red-200 font-bold uppercase tracking-wider text-center"
              >
                Turn Timer Off
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
