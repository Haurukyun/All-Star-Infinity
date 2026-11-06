import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameLogic } from '../hooks/useGameLogic';
import { hapticService } from '../services/haptics';
import { Theme } from '../types';
import { ThemeLoreBadge } from './ThemeLoreBadge';

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
    chaosMode,
    toggleChaosMode,
    theme,
  } = logic;

  const [inputName, setInputName] = useState('');

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
          subText: "text-yellow-600 font-mono text-xs",
          input: "bg-black border border-yellow-400 text-yellow-400 placeholder-yellow-800 rounded-none text-sm font-mono",
          addBtn: "bg-yellow-400 text-black hover:bg-yellow-300 rounded-none font-bold text-sm shadow-[0_0_10px_rgba(250,204,21,0.4)] cursor-pointer",
          item: "bg-black border border-yellow-400/40 text-yellow-400 rounded-none",
          primaryBtn: "bg-yellow-400 text-black hover:bg-yellow-300 rounded-none font-bold text-lg shadow-[0_0_15px_rgba(250,204,21,0.5)] cursor-pointer",
          secondaryBtn: "bg-black border border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10 rounded-none text-xs cursor-pointer",
          accentColor: "#facc15",
        };
      case Theme.POKEMON:
        return {
          bg: "bg-[#78C850] text-[#303030] font-['Press_Start_2P']",
          panel: "bg-[#F8F8D0] border-4 border-[#606060] rounded-xl text-[#303030] shadow-[inset_0_0_0_4px_#D0D0A8,0_8px_0_rgba(0,0,0,0.3)]",
          headerText: "text-[#405080]",
          subText: "text-[#606060] text-[9px] font-['Press_Start_2P']",
          input: "bg-[#F8F8F8] border-2 border-[#808080] text-[#404040] placeholder-[#A0A0A0] focus:border-[#405080] rounded text-[10px]",
          addBtn: "bg-[#CC0000] text-white hover:bg-[#B00000] border-2 border-black rounded text-[9px] font-bold shadow-sm cursor-pointer",
          item: "bg-[#F8F8F8] border-2 border-[#808080] text-[#404040] rounded shadow-xs",
          primaryBtn: "bg-[#CC0000] text-white hover:bg-[#B00000] border-3 border-black rounded-lg text-xs font-bold shadow-[0_4px_0_#600] cursor-pointer",
          secondaryBtn: "bg-[#F8F8F8] border-2 border-[#808080] text-[#404040] rounded text-[9px] cursor-pointer",
          accentColor: "#CC0000",
        };
      case Theme.HAZBIN:
        return {
          bg: "bg-[#100207] text-[#FFD700] font-['Lora']",
          panel: "bg-[#1a050f] border-2 border-[#FFD700] rounded-none text-[#ffcccb] shadow-[0_0_20px_rgba(229,43,80,0.3)]",
          headerText: "text-[#FFD700] tracking-widest font-serif",
          subText: "text-[#FFD700]/60 text-xs",
          input: "bg-black border border-[#FFD700]/60 text-[#FFD700] placeholder-[#FFD700]/30 rounded-none text-sm font-serif",
          addBtn: "bg-[#e52b50] text-[#FFD700] border border-[#FFD700] rounded-none font-bold text-xs tracking-wider cursor-pointer shadow-md",
          item: "bg-black/60 border border-[#FFD700]/30 text-[#ffcccb] rounded-none",
          primaryBtn: "bg-[#e52b50] text-[#FFD700] border-2 border-[#FFD700] rounded-none font-bold text-base tracking-widest cursor-pointer shadow-[0_0_15px_rgba(229,43,80,0.5)]",
          secondaryBtn: "bg-black border border-[#FFD700]/50 text-[#FFD700] rounded-none text-xs cursor-pointer",
          accentColor: "#FFD700",
        };
      case Theme.SKYRIM:
        return {
          bg: "bg-[#0b0c0e] text-[#D4AF37] font-['Cinzel']",
          panel: "bg-[#141519] border-2 border-[#D4AF37] rounded-none text-stone-200 shadow-[0_0_20px_rgba(212,175,55,0.2)] tracking-wider",
          headerText: "text-[#D4AF37] tracking-widest",
          subText: "text-stone-400 text-xs",
          input: "bg-black border border-[#D4AF37]/50 text-stone-100 placeholder-stone-600 rounded-none text-sm font-serif",
          addBtn: "bg-[#2A2B30] border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black rounded-none font-bold text-xs tracking-wider cursor-pointer",
          item: "bg-black/60 border border-[#D4AF37]/30 text-stone-300 rounded-none",
          primaryBtn: "bg-[#1F2025] border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black rounded-none font-bold text-base tracking-widest cursor-pointer shadow-lg",
          secondaryBtn: "bg-black border border-[#D4AF37]/40 text-stone-300 rounded-none text-xs cursor-pointer",
          accentColor: "#D4AF37",
        };
      case Theme.KIRBY:
        return {
          bg: "bg-[#FFE4EF] text-[#D81B60] font-['Fredoka_One']",
          panel: "bg-white border-4 border-[#FF85B3] rounded-3xl text-[#D81B60] shadow-xl",
          headerText: "text-[#D81B60]",
          subText: "text-[#D81B60]/70 text-xs",
          input: "bg-[#FFF0F5] border-2 border-[#FF85B3] text-[#D81B60] placeholder-[#FF85B3]/50 rounded-2xl text-sm font-sans",
          addBtn: "bg-[#FF4081] text-white hover:bg-[#F50057] rounded-2xl font-bold shadow-md cursor-pointer",
          item: "bg-[#FFF0F5] border-2 border-[#FFB6C1] text-[#D81B60] rounded-2xl",
          primaryBtn: "bg-gradient-to-r from-[#FF4081] to-[#FF80AB] text-white rounded-3xl font-bold shadow-lg text-lg cursor-pointer",
          secondaryBtn: "bg-[#FFF0F5] text-[#D81B60] rounded-2xl font-bold text-xs cursor-pointer",
          accentColor: "#FF4081",
        };
      case Theme.DANGANRONPA:
        return {
          bg: "bg-[#0A0A0A] text-[#ff007f] font-mono",
          panel: "bg-black border-4 border-[#ff007f] rounded-none text-[#ff007f] shadow-[8px_8px_0_#ff007f]",
          headerText: "text-[#ff007f] font-black uppercase tracking-widest",
          subText: "text-zinc-400 text-xs",
          input: "bg-black border-2 border-[#ff007f] text-[#ff007f] placeholder-zinc-600 rounded-none text-sm font-mono",
          addBtn: "bg-[#ff007f] text-black hover:bg-white rounded-none font-bold text-xs uppercase tracking-wider cursor-pointer shadow-[2px_2px_0_#FFF]",
          item: "bg-black border-2 border-[#ff007f]/50 text-white rounded-none shadow-[2px_2px_0_#ff007f]",
          primaryBtn: "bg-[#ff007f] text-black hover:bg-white rounded-none font-black text-lg shadow-[4px_4px_0_#FFF] cursor-pointer",
          secondaryBtn: "bg-black border-2 border-[#ff007f] text-[#ff007f] hover:bg-[#ff007f] hover:text-black rounded-none text-xs cursor-pointer",
          accentColor: "#ff007f",
        };
      default:
        return {
          bg: "bg-slate-900 text-white font-sans",
          panel: "bg-slate-800 border border-slate-700 rounded-2xl text-white shadow-2xl",
          headerText: "text-white",
          subText: "text-slate-400 text-xs",
          input: "bg-slate-900 border border-slate-700 text-white placeholder-slate-500 rounded-xl text-sm",
          addBtn: "bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-md cursor-pointer",
          item: "bg-slate-900/60 border border-slate-700 text-white rounded-xl",
          primaryBtn: "bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold shadow-lg text-lg cursor-pointer",
          secondaryBtn: "bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs cursor-pointer",
          accentColor: "#6366f1",
        };
    }
  };

  const themeStyle = getThemeSetupStyles(theme);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      addPlayer(inputName.trim(), `P${players.length + 1}`, themeStyle.accentColor);
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
      addPlayer('Player 1', 'P1', '#ef4444');
      addPlayer('Player 2', 'P2', '#3b82f6');
      addPlayer('Player 3', 'P3', '#10b981');
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
            <ThemeLoreBadge theme={theme} index={0} showTitle={false} />
          </div>
          <h1 className={`text-2xl sm:text-3xl font-black ${themeStyle.headerText}`}>
            PASS & PLAY ROSTER
          </h1>
          <p className={`text-xs ${themeStyle.subText} max-w-sm mx-auto`}>
            Assemble your party! Players are assigned universe-native lore designations for turns, forfeits, and live voting.
          </p>
        </div>

        {/* Add Player Input with Live Lore Preview */}
        <form onSubmit={handleAdd} className="space-y-3">
          <div className="flex gap-2 items-center">
            <div className="px-3 py-2.5 rounded-lg border border-current/30 bg-current/5 flex items-center justify-center shrink-0">
              <ThemeLoreBadge theme={theme} index={players.length} showTitle={false} />
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
        </form>

        {/* Chaos Mode Toggle */}
        <div className={`flex items-center justify-between p-3 ${themeStyle.item} text-xs`}>
          <div>
            <div className="font-bold flex items-center gap-1.5">
              <span>CHAOS TURN ORDER ⟳</span>
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
                  + Add 3 Sample Players
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
                    <ThemeLoreBadge theme={theme} index={index} showTitle={true} />
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
