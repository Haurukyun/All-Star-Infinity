import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomDeck } from '../types';

export type DeckVariant =
    | 'default' | 'persona' | 'cyberpunk' | 'minecraft' | 'fallout'
    | 'omori' | 'sanrio' | 'arcane' | 'vocaloid' | 'undertale'
    | 'sonic' | 'skyrim' | 'kirby' | 'iruma' | 'hazbin'
    | 'fnaf' | 'danganronpa' | 'billy' | 'island' | 'pixelfore';

interface DeckCarouselProps {
    decks: CustomDeck[];
    activeDeckId: string;
    onSelect: (id: string) => void;
    variant?: DeckVariant;
    accentColor?: string;
    textColor?: string;
    inactiveColor?: string;
    cardBg?: string;
    showGlow?: boolean;
    fontFamily?: string;
}

export const DeckCarousel: React.FC<DeckCarouselProps> = ({
    decks,
    activeDeckId,
    onSelect,
    variant = 'default',
    accentColor = '#3b82f6',
    textColor = '#000000',
    inactiveColor = '#94a3b8',
    cardBg = '#ffffff',
    showGlow = true,
    fontFamily = 'inherit'
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const allOptions = [
        { id: 'default', name: 'Standard Bag', prompts: [], isCustom: false, intensity: '' },
        ...decks
    ];

    // Auto-scroll to the active card when it changes or when component mounts
    useEffect(() => {
        const activeIndex = allOptions.findIndex(d => d.id === activeDeckId);
        if (activeIndex < 0 || !containerRef.current) return;
        const container = containerRef.current;
        requestAnimationFrame(() => {
            // For snap-center carousels, scrollTarget = (cardWidth + gap) * index
            // centers each card regardless of padding, as long as padding = 50% - halfCardWidth
            const sanrioCard = 176; // w-44
            const defaultCard = 256; // w-64
            const sanrioGap = 12; // gap-3
            const defaultGap = 40; // gap-10
            const cardWidth = variant === 'sanrio' ? sanrioCard : defaultCard;
            const gap = variant === 'sanrio' ? sanrioGap : defaultGap;
            const scrollTarget = Math.max(0, (cardWidth + gap) * activeIndex);
            container.scrollTo({ left: scrollTarget, behavior: 'smooth' });
        });
    }, [activeDeckId, variant]);

    const getVariantStyles = (type: DeckVariant, isActive: boolean) => {
        switch (type) {
            case 'persona':
                return {
                    borderRadius: '4px',
                    transform: isActive ? 'skewX(-10deg) scale(1.1)' : 'skewX(-10deg)',
                    border: `4px solid ${isActive ? '#ff0000' : '#ffffff'}`,
                    background: isActive ? '#000000' : 'rgba(0,0,0,0.8)',
                    boxShadow: isActive ? '8px 8px 0 #ffffff' : 'none',
                    clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)'
                };
            case 'cyberpunk':
                return {
                    borderRadius: '0px',
                    border: `2px solid ${isActive ? accentColor : '#222'}`,
                    background: isActive ? 'rgba(0,0,0,0.9)' : 'rgba(20,20,20,0.7)',
                    boxShadow: isActive ? `inset 0 0 20px ${accentColor}, 0 0 30px ${accentColor}55` : 'none',
                    clipPath: 'polygon(0 15px, 15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)'
                };
            case 'minecraft':
                return {
                    borderRadius: '0px',
                    border: `6px double ${isActive ? '#3d2b1f' : '#1e1e1e'}`,
                    background: isActive ? '#706e6e' : '#4a4a4a',
                    imageRendering: 'pixelated' as any,
                    boxShadow: isActive ? '0 8px 0 #000000' : 'none'
                };
            case 'fallout':
                return {
                    borderRadius: '12px',
                    border: `2px solid ${isActive ? '#00ff00' : '#004400'}`,
                    background: '#0a1a05',
                    boxShadow: isActive ? '0 0 20px #00ff0044' : 'none',
                    overflow: 'hidden'
                };
            case 'omori':
                return {
                    borderRadius: '2px',
                    border: `3px solid ${isActive ? '#ffffff' : '#444444'}`,
                    background: isActive ? '#000000' : '#111111',
                    filter: 'contrast(1.2) brightness(0.9)'
                };
            case 'arcane':
                return {
                    borderRadius: '10px 40px 10px 40px',
                    border: `2px solid ${isActive ? '#c49a3c' : '#4a5b6c'}`,
                    background: isActive ? 'linear-gradient(135deg, #1a2b3c 0%, #0d1621 100%)' : '#0d1621',
                    boxShadow: isActive ? '0 0 25px #c49a3c44' : 'none',
                };
            case 'sanrio':
                return {
                    borderRadius: '45px',
                    border: `5px solid ${isActive ? accentColor : '#ffffff'}`,
                    background: isActive ? 'white' : 'rgba(255,255,255,0.6)',
                    boxShadow: isActive ? `0 10px 40px ${accentColor}33` : 'none',
                    overflow: 'visible'
                };
            case 'fnaf':
                return {
                    borderRadius: '2px',
                    border: `1px solid ${isActive ? '#ff0000' : '#333'}`,
                    background: '#050505',
                    imageRendering: 'pixelated' as any
                };
            case 'island':
                return {
                    borderRadius: '20px',
                    border: `6px solid ${isActive ? '#8d6e63' : '#d7ccc8'}`,
                    background: isActive ? '#f5f5f5' : '#efebe9',
                    backgroundImage: 'radial-gradient(#d7ccc8 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                };
            case 'danganronpa':
                return {
                    borderRadius: '0px',
                    background: isActive ? 'linear-gradient(45deg, #000 50%, #fff 50%)' : '#222',
                    border: `4px solid ${isActive ? '#ff00ff' : '#444'}`,
                    transform: isActive ? 'rotate(3deg) scale(1.1)' : 'rotate(-1deg)',
                    boxShadow: isActive ? '0 0 25px rgba(255, 0, 255, 0.3)' : 'none'
                };
            case 'vocaloid':
                return {
                    borderRadius: '2px',
                    border: `2px solid ${isActive ? '#00f2ff' : '#444'}`,
                    background: isActive ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.6)',
                    boxShadow: isActive ? '0 0 15px #00f2ff, inset 0 0 10px #ff007b33' : 'none',
                    backgroundImage: 'linear-gradient(90deg, transparent 95%, rgba(0,242,255,0.1) 95%)',
                    backgroundSize: '20px 100%'
                };
            case 'undertale':
                return {
                    borderRadius: '0px',
                    border: `4px solid ${isActive ? '#ffff00' : '#ffffff'}`,
                    background: '#000000',
                    imageRendering: 'pixelated' as any
                };
            case 'sonic':
                return {
                    borderRadius: '50px 0 50px 0',
                    border: `4px solid ${isActive ? '#0054ff' : '#ffcc00'}`,
                    background: isActive ? '#0054ff' : '#ffffff',
                    boxShadow: isActive ? '0 0 20px #ffcc00' : 'none',
                    transform: isActive ? 'skewX(-5deg)' : 'none'
                };
            case 'skyrim':
                return {
                    borderRadius: '0px',
                    border: `2px solid #555`,
                    background: isActive ? '#d2b48c' : '#a89070',
                    boxShadow: isActive ? 'inset 0 0 40px rgba(0,0,0,0.3)' : 'none',
                    backgroundImage: 'url("https://www.transparenttextures.com/patterns/parchment.png")'
                };
            case 'kirby':
                return {
                    borderRadius: '50% 50% 40% 60%',
                    border: `6px solid ${isActive ? '#ff69b4' : '#ffb6c1'}`,
                    background: isActive ? '#fff' : 'rgba(255,255,255,0.8)',
                    boxShadow: isActive ? '0 0 30px #ff69b444' : 'none'
                };
            case 'iruma':
                return {
                    borderRadius: '15px',
                    border: `3px solid ${isActive ? '#9d4edd' : '#3c096c'}`,
                    background: isActive ? '#240046' : '#10002b',
                    boxShadow: isActive ? '0 0 20px #9d4edd66' : 'none'
                };
            case 'hazbin':
                return {
                    borderRadius: '0 30px 0 30px',
                    border: `3px double ${isActive ? '#e61e25' : '#7a0005'}`,
                    background: isActive ? '#1a0000' : '#0a0000',
                    boxShadow: isActive ? '0 0 25px #e61e2544' : 'none'
                };
            case 'billy':
                return {
                    borderRadius: '50%',
                    border: `8px solid ${isActive ? '#ffcc00' : '#444'}`,
                    background: isActive ? '#fff' : '#eee',
                    boxShadow: isActive ? '0 10px 0 #ccaa00' : 'none'
                };
            case 'pixelfore':
                return {
                    borderRadius: '0',
                    border: `4px solid #000`,
                    background: isActive ? '#ff1c1c' : '#f0f0f0',
                    boxShadow: isActive ? '0 6px 0 rgba(0,0,0,0.2)' : 'none',
                    backgroundImage: 'linear-gradient(180deg, transparent 48%, #000 48%, #000 52%, transparent 52%)'
                };
            default:
                return {
                    borderRadius: '30px',
                    border: `4px solid ${isActive ? accentColor : `${inactiveColor}44`}`,
                    backgroundColor: isActive ? cardBg : `${cardBg}99`,
                    boxShadow: isActive ? `0 20px 40px -10px ${accentColor}44` : 'none',
                };
        }
    };

    return (
        <div className={`relative w-full overflow-visible select-none ${variant === 'sanrio' ? 'py-12' : 'py-20'}`} style={{ fontFamily }}>
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                
                @keyframes scanline {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                .fallout-scanline {
                    position: absolute; top: 0; left: 0; width: 100%; height: 2px;
                    background: rgba(0, 255, 0, 0.1);
                    animation: scanline 4s linear infinite;
                }
                .cyberpunk-glitch {
                    animation: glitch 2s infinite linear alternate-reverse;
                }
                @keyframes glitch {
                    0% { clip-path: inset(80% 0 0 0); transform: translate(-2px, 2px); }
                    20% { clip-path: inset(20% 0 60% 0); transform: translate(2px, -2px); }
                    40% { clip-path: inset(50% 0 30% 0); transform: translate(-2px, -2px); }
                    60% { clip-path: inset(10% 0 80% 0); transform: translate(2px, 2px); }
                    100% { clip-path: inset(80% 0 0 0); transform: translate(-2px, 2px); }
                }
                .sketch-border {
                    mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurboType type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noise)"/></svg>');
                }
            `}</style>

            <div
                ref={containerRef}
                className={`w-full flex items-center overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth ${variant === 'sanrio' ? 'gap-3 py-12 -my-12 px-[calc(50%-88px)]' : 'gap-10 py-20 -my-20 px-[calc(50%-128px)]'}`}
            >
                {allOptions.map((deck, idx) => {
                    const isActive = activeDeckId === deck.id;
                    const variantStyles = getVariantStyles(variant as DeckVariant, isActive);

                    return (
                        <motion.div
                            key={deck.id}
                            onClick={() => onSelect(deck.id)}
                            className="snap-center shrink-0 cursor-pointer origin-center"
                            whileTap={{ scale: 0.95 }}
                            animate={{
                                scale: isActive ? 1.25 : 0.85,
                                opacity: isActive ? 1 : 0.4,
                                filter: isActive ? 'blur(0px)' : 'blur(0.5px)',
                                rotateZ: isActive ? 0 : (idx % 2 === 0 ? 2 : -2)
                            }}
                            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                        >
                            <div
                                className={`
                                    relative transition-all duration-500 flex flex-col justify-center items-center text-center
                                    group backdrop-blur-sm
                                    ${variant === 'sanrio' ? 'p-4 w-44 h-32' : 'p-7 w-64 h-44'}
                                    ${variant === 'fallout' ? 'fallout-monitor' : ''}
                                    ${variant === 'omori' ? 'sketch-border' : ''}
                                    ${variant === 'cyberpunk' && isActive ? 'cyberpunk-glitch' : ''}
                                `}
                                style={variantStyles as any}
                            >
                                {/* Special Overlays */}
                                {variant === 'fallout' && <div className="fallout-scanline" />}
                                {variant === 'fallout' && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff000a] to-transparent pointer-events-none" />}

                                {variant === 'cyberpunk' && isActive && (
                                    <div className="absolute top-0 right-0 p-1 text-[8px] font-mono text-cyan-400 opacity-50">
                                        VER: 2.0.77
                                    </div>
                                )}

                                {isActive && showGlow && variant !== 'persona' && variant !== 'minecraft' && variant !== 'danganronpa' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.2 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 blur-3xl -z-10"
                                        style={{ backgroundColor: accentColor }}
                                    />
                                )}

                                {variant === 'persona' && (
                                    <div className="absolute top-0 right-0 w-8 h-8 bg-red-600 rotate-45 translate-x-4 -translate-y-4" />
                                )}

                                {/* Emoji removed as per user request */}

                                <span className={`font-black uppercase tracking-tight text-xl mb-3 w-full transition-colors duration-300 break-words overflow-visible`}
                                    style={{
                                        color: variant === 'danganronpa' ? '#fff' : (variant === 'persona' && isActive ? '#fff' : (isActive ? textColor : inactiveColor)),
                                        textShadow: variant === 'danganronpa' ? '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 4px 10px rgba(0,0,0,0.5)' : 'none',
                                        fontFamily: variant === 'minecraft' ? 'Minecraft, monospace' : (variant === 'cyberpunk' ? 'Orbitron, sans-serif' : 'inherit'),
                                        letterSpacing: variant === 'danganronpa' ? '2px' : 'normal',
                                        lineHeight: '1.1'
                                    }}>
                                    {deck.name || 'Untitled Nest'}
                                </span>

                                {(deck.isCustom || deck.id === 'default') && (
                                    <div className="mt-2 flex gap-2">
                                        {deck.isCustom && (
                                            <span className="text-[10px] font-black px-2 py-0.5 rounded-sm border"
                                                style={{
                                                    borderColor: variant === 'persona' ? '#fff' : (variant === 'danganronpa' ? '#00ffff' : `${accentColor}44`),
                                                    backgroundColor: variant === 'persona' ? '#ffffff' : (variant === 'danganronpa' ? '#000' : `${accentColor}15`),
                                                    color: variant === 'persona' ? '#000000' : (variant === 'danganronpa' ? '#00ffff' : accentColor)
                                                }}>
                                                {deck.prompts.length} SHARDS
                                            </span>
                                        )}
                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-sm uppercase 
                                            ${variant === 'persona' ? 'bg-red-600 text-white' :
                                                variant === 'danganronpa' ? 'bg-[#ff00ff] text-white' :
                                                    'bg-black/10 text-black/50'}`}>
                                            {deck.id === 'default' ? 'CORE' : (deck as any).intensity}
                                        </span>
                                    </div>
                                )}

                                {isActive && (
                                    <motion.div
                                        initial={{ scale: 0, rotate: -30 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        className={`absolute top-4 right-4 flex items-center justify-center 
                                            ${variant === 'danganronpa' ? 'w-10 h-10 border-4 border-[#ff00ff] bg-black text-[#ff00ff] font-black italic' :
                                                variant === 'persona' ? 'w-8 h-8 bg-white text-black font-black' :
                                                    variant === 'minecraft' ? 'w-8 h-8 bg-[#55ff55] border-4 border-black text-black font-bold' :
                                                        variant === 'cyberpunk' ? 'w-10 h-10 border-2 border-cyan-400 bg-black/80 text-cyan-400 font-mono text-xs' :
                                                            variant === 'fallout' ? 'w-8 h-8 border border-[#00ff00] bg-black text-[#00ff00] font-mono text-[10px]' :
                                                                variant === 'undertale' ? 'w-6 h-6 bg-yellow-400' :
                                                                    variant === 'sanrio' ? 'w-8 h-8 bg-[#FFB7C5] rounded-full text-white' :
                                                                        variant === 'sonic' ? 'w-10 h-10 border-4 border-[#ffcc00] rounded-full bg-transparent shadow-[0_0_15px_#ffcc00]' :
                                                                            variant === 'kirby' ? 'w-8 h-8 bg-[#ff69b4] text-white' :
                                                                                variant === 'hazbin' ? 'w-10 h-10 border-2 border-[#e61e25] bg-black rotate-45 text-[#e61e25]' :
                                                                                    'w-8 h-8 rounded-full shadow-md text-sm'}
                                        `}
                                        style={{
                                            backgroundColor: (variant === 'persona' || variant === 'danganronpa' || variant === 'minecraft' || variant === 'cyberpunk' || variant === 'fallout' || variant === 'undertale' || variant === 'sanrio' || variant === 'sonic' || variant === 'hazbin') ? undefined : accentColor,
                                            color: (variant === 'persona' || variant === 'danganronpa' || variant === 'minecraft' || variant === 'cyberpunk' || variant === 'fallout' || variant === 'undertale' || variant === 'sanrio' || variant === 'sonic' || variant === 'hazbin') ? undefined : cardBg,
                                            clipPath: variant === 'undertale' ? 'polygon(50% 0%, 100% 38%, 81% 100%, 50% 75%, 19% 100%, 0% 38%)' :
                                                (variant === 'kirby' ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' : 'none')
                                        }}
                                    >
                                        {variant === 'danganronpa' ? 'X' :
                                            variant === 'minecraft' ? '>' :
                                                variant === 'cyberpunk' ? 'OK' :
                                                    variant === 'fallout' ? 'RDY' :
                                                        variant === 'undertale' ? '' :
                                                            variant === 'sanrio' ? '❤' :
                                                                variant === 'hazbin' ? '†' :
                                                                    variant === 'sonic' ? '' :
                                                                        variant === 'kirby' ? '' : '✓'}
                                    </motion.div>
                                )}

                                {variant === 'persona' && isActive && (
                                    <div className="absolute bottom-2 right-2 text-[10px] font-black italic text-red-500">
                                        TAKE YOUR TIME
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};
