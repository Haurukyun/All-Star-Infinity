import React from 'react';
import { Theme, Intensity } from '../types';

interface LoreBadgeProps {
  theme: Theme;
  index: number;
  intensity?: Intensity | null;
  className?: string;
  showTitle?: boolean;
}

export const SOUL_COLORS_UNDERTALE = [
  { color: '#FF0000', name: 'Determination' },
  { color: '#00FFFF', name: 'Patience' },
  { color: '#FFA500', name: 'Bravery' },
  { color: '#0000FF', name: 'Integrity' },
  { color: '#800080', name: 'Perseverance' },
  { color: '#00FF00', name: 'Kindness' },
  { color: '#FFFF00', name: 'Justice' },
];

export const POKEBALL_STYLES = [
  { bg: 'bg-[#FF3B30]', border: 'border-[#333]', text: 'text-white', name: 'Poké' },
  { bg: 'bg-[#007AFF]', border: 'border-[#333]', text: 'text-white', name: 'Great' },
  { bg: 'bg-[#FFCC00]', border: 'border-[#333]', text: 'text-black', name: 'Ultra' },
  { bg: 'bg-[#AF52DE]', border: 'border-[#333]', text: 'text-white', name: 'Master' },
  { bg: 'bg-[#34C759]', border: 'border-[#333]', text: 'text-white', name: 'Safari' },
  { bg: 'bg-[#FF2D55]', border: 'border-[#333]', text: 'text-white', name: 'Cherish' },
];

export const PERSONA_SUITS = [
  { symbol: '♠', role: 'Joker' },
  { symbol: '♣', role: 'Mona' },
  { symbol: '♥', role: 'Skull' },
  { symbol: '♦', role: 'Panther' },
  { symbol: '★', role: 'Fox' },
  { symbol: '☠', role: 'Crow' },
];

export const MINECRAFT_ORES = [
  { color: '#55FFFF', name: 'Diamond' },
  { color: '#55FF55', name: 'Emerald' },
  { color: '#FF5555', name: 'Redstone' },
  { color: '#FFAA00', name: 'Gold' },
  { color: '#5555FF', name: 'Lapis' },
  { color: '#886677', name: 'Netherite' },
];

/**
 * Renders a 100% theme-immersive lore badge for a player slot.
 * Replaces generic emojis and flat corporate web avatar circles.
 */
export const ThemeLoreBadge: React.FC<LoreBadgeProps> = ({
  theme,
  index,
  intensity,
  className = '',
  showTitle = false,
}) => {
  const isVulgar = theme === Theme.OMORI && intensity === Intensity.VULGAR;
  const isHot = theme === Theme.OMORI && intensity === Intensity.HOT;

  switch (theme) {
    case Theme.UNDERTALE: {
      const soul = SOUL_COLORS_UNDERTALE[index % SOUL_COLORS_UNDERTALE.length];
      return (
        <span
          className={`inline-flex items-center gap-1 font-['Press_Start_2P'] select-none ${className}`}
          title={`Soul: ${soul.name}`}
        >
          <span
            className="text-base leading-none transition-transform hover:scale-125 inline-block drop-shadow-[0_0_4px_currentColor]"
            style={{ color: soul.color }}
          >
            ❤
          </span>
          <span className="text-[9px] text-white/90 font-bold">
            P{index + 1}
          </span>
          {showTitle && (
            <span className="text-[8px] opacity-60 ml-0.5">({soul.name})</span>
          )}
        </span>
      );
    }

    case Theme.POKEMON: {
      const ball = POKEBALL_STYLES[index % POKEBALL_STYLES.length];
      return (
        <span
          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-[#606060] bg-[#E0F0F8] text-[#405080] font-bold text-[9px] shadow-xs select-none ${className}`}
          title={`${ball.name} Trainer #${index + 1}`}
        >
          <span className={`inline-block w-2.5 h-2.5 rounded-full border border-black ${ball.bg}`} />
          <span className="tracking-tighter">P{index + 1}</span>
          {showTitle && <span className="opacity-60 text-[8px]">({ball.name})</span>}
        </span>
      );
    }

    case Theme.OMORI: {
      const textColor = isVulgar ? 'text-[#ff0000]' : isHot ? 'text-white' : 'text-black';
      return (
        <span
          className={`inline-flex items-center gap-1 font-['Gloria_Hallelujah'] font-black text-xs select-none ${textColor} ${className}`}
        >
          <span className="opacity-70">~</span>
          <span>P{index + 1}</span>
          <span className="opacity-70">~</span>
        </span>
      );
    }

    case Theme.PERSONA: {
      const suit = PERSONA_SUITS[index % PERSONA_SUITS.length];
      return (
        <span
          className={`inline-flex items-center gap-1 font-['Edo'] italic font-bold select-none text-white ${className}`}
          title={`Thief: ${suit.role}`}
        >
          <span className="text-base text-[#D80000] drop-shadow-[0_0_3px_#D80000]">{suit.symbol}</span>
          <span className="text-xs tracking-wider">P{index + 1}</span>
          {showTitle && <span className="text-[10px] text-zinc-400">[{suit.role}]</span>}
        </span>
      );
    }

    case Theme.MINECRAFT: {
      const ore = MINECRAFT_ORES[index % MINECRAFT_ORES.length];
      return (
        <span
          className={`inline-flex items-center gap-1 font-['Minecraft'] text-[10px] px-1 py-0.5 bg-[#404040] border border-t-[#AAA] border-l-[#AAA] border-r-[#222] border-b-[#222] select-none ${className}`}
          title={`Ore: ${ore.name}`}
        >
          <span style={{ color: ore.color }} className="text-xs">◆</span>
          <span className="text-white">P{index + 1}</span>
          {showTitle && <span className="text-[#AAA] text-[8px]">({ore.name})</span>}
        </span>
      );
    }

    case Theme.FNAF:
      return (
        <span
          className={`inline-flex items-center gap-1 font-['VT323'] text-green-400 text-sm tracking-wider select-none ${className}`}
          title={`Guard ID: ${index + 1}`}
        >
          <span className="border border-green-500/60 bg-green-950/40 px-1 py-0.2 rounded-none">
            [ID:0{index + 1}]
          </span>
        </span>
      );

    case Theme.FALLOUT:
      return (
        <span
          className={`inline-flex items-center gap-1 font-['Share_Tech_Mono'] text-[#14FF00] text-xs select-none ${className}`}
          title={`Vault-Tec Citizen #${index + 1}`}
        >
          <span className="border border-[#14FF00]/50 bg-[#14FF00]/10 px-1 py-0.2">
            [V{101 + index}]
          </span>
        </span>
      );

    case Theme.CYBERPUNK:
      return (
        <span
          className={`inline-flex items-center gap-1 font-['Orbitron'] text-yellow-400 text-[10px] tracking-widest select-none ${className}`}
          title={`Subnet Port 0${index + 1}`}
        >
          <span className="border border-yellow-400/50 bg-yellow-400/10 px-1 py-0.5">
            //0{index + 1}
          </span>
        </span>
      );

    case Theme.HAZBIN:
      return (
        <span
          className={`inline-flex items-center gap-1 font-['Lora'] text-[#FFD700] text-xs select-none ${className}`}
          title={`Overlord Seal #${index + 1}`}
        >
          <span className="text-sm">✦</span>
          <span className="font-bold">P{index + 1}</span>
        </span>
      );

    case Theme.SKYRIM: {
      const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
      const roman = romans[index % romans.length];
      return (
        <span
          className={`inline-flex items-center gap-1 font-['Cinzel'] text-[#D4AF37] text-xs tracking-wider select-none ${className}`}
          title={`Nord Thane ${roman}`}
        >
          <span className="text-sm">†</span>
          <span className="font-bold">{roman}</span>
        </span>
      );
    }

    case Theme.KIRBY: {
      const starColors = ['#FF4081', '#FFD54F', '#40C4FF', '#69F0AE', '#E040FB'];
      const starColor = starColors[index % starColors.length];
      return (
        <span
          className={`inline-flex items-center gap-1 font-['Fredoka_One'] text-xs select-none ${className}`}
          title={`Star Warrior #${index + 1}`}
        >
          <span style={{ color: starColor }} className="text-sm font-bold">★</span>
          <span className="text-[#D81B60] font-bold">P{index + 1}</span>
        </span>
      );
    }

    case Theme.SONIC:
      return (
        <span
          className={`inline-flex items-center gap-1 font-['Bangers'] text-black bg-yellow-400 px-1.5 py-0.2 rounded border border-black text-xs font-black select-none ${className}`}
          title={`Act ${index + 1}`}
        >
          <span>ACT {index + 1}</span>
        </span>
      );

    case Theme.DANGANRONPA:
      return (
        <span
          className={`inline-flex items-center gap-1 font-mono text-[#ff007f] text-xs font-bold select-none ${className}`}
          title={`Ultimate Student #${index + 1}`}
        >
          <span className="border border-[#ff007f] bg-black px-1 py-0.2 shadow-[1px_1px_0_#ff007f]">
            ◈ #{index + 1 < 10 ? `0${index + 1}` : index + 1}
          </span>
        </span>
      );

    case Theme.ANIMAL_CROSSING:
      return (
        <span
          className={`inline-flex items-center gap-1 font-['FinkHeavy'] text-[#2E7D32] bg-[#E8F5E9] border border-[#A5D6A7] px-1.5 py-0.5 rounded-full text-xs font-bold select-none ${className}`}
          title={`Resident #${index + 1}`}
        >
          <span className="text-sm">☘</span>
          <span>P{index + 1}</span>
        </span>
      );

    case Theme.SANRIO:
      return (
        <span
          className={`inline-flex items-center gap-1 font-['Cherry_Bomb_One'] text-[#E91E63] bg-[#FCE4EC] border border-[#F48FB1] px-1.5 py-0.5 rounded-full text-xs font-bold select-none ${className}`}
          title={`Cutie #${index + 1}`}
        >
          <span className="text-xs">୨୧</span>
          <span>P{index + 1}</span>
        </span>
      );

    case Theme.VOCALOID:
      return (
        <span
          className={`inline-flex items-center gap-1 font-['Orbitron'] text-[#39C5BB] bg-[#002B2E] border border-[#39C5BB] px-1.5 py-0.5 text-[9px] tracking-widest font-bold select-none ${className}`}
          title={`Synth Channel 0${index + 1}`}
        >
          <span>[CH-0{index + 1}]</span>
        </span>
      );

    case Theme.IRUMA:
      return (
        <span
          className={`inline-flex items-center gap-1 font-['Sniglet'] text-[#FFD700] bg-[#2E0854] border border-[#FFD700] px-1.5 py-0.5 rounded text-xs font-bold select-none ${className}`}
          title={`Demon Rank #${index + 1}`}
        >
          <span>▲ P{index + 1}</span>
        </span>
      );

    case Theme.ARCANE:
      return (
        <span
          className={`inline-flex items-center gap-1 font-['Cinzel'] text-[#00FFFF] bg-[#0A192F] border border-[#00FFFF]/60 px-1.5 py-0.5 text-[10px] tracking-wider font-bold select-none ${className}`}
          title={`Hextech Unit #${index + 1}`}
        >
          <span>◇ P{index + 1}</span>
        </span>
      );

    case Theme.BILLY_HATCHER:
      return (
        <span
          className={`inline-flex items-center gap-1 font-['Fredoka_One'] text-[#1873CA] bg-[#FFF8E7] border-2 border-[#1873CA] px-1.5 py-0.5 rounded-lg text-xs font-bold select-none ${className}`}
          title={`Egg Master #${index + 1}`}
        >
          <span>◈ P{index + 1}</span>
        </span>
      );

    default:
      return (
        <span
          className={`inline-flex items-center gap-1 text-xs font-bold opacity-80 select-none ${className}`}
        >
          <span>#{index + 1}</span>
        </span>
      );
  }
};

