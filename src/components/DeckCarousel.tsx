
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomDeck } from '../types';

interface DeckCarouselProps {
    decks: CustomDeck[];
    activeDeckId: string;
    onSelect: (id: string) => void;
    accentColor?: string;
}

export const DeckCarousel: React.FC<DeckCarouselProps> = ({
    decks,
    activeDeckId,
    onSelect,
    accentColor = '#3b82f6'
}) => {
    if (decks.length === 0) return null;

    // Add the "Default" deck as the first option
    const allOptions = [
        { id: 'default', name: 'Standard Bag', prompts: [], isCustom: false },
        ...decks
    ];

    return (
        <div className="relative w-full py-4 overflow-hidden">
            <div className="flex justify-center items-center gap-4 px-12">
                <motion.div
                    className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory px-[20%]"
                    initial={false}
                >
                    {allOptions.map((deck) => (
                        <motion.div
                            key={deck.id}
                            onClick={() => onSelect(deck.id)}
                            className="snap-center shrink-0 cursor-pointer"
                            whileTap={{ scale: 0.95 }}
                        >
                            <div
                                className={`
                  relative transition-all duration-300 rounded-2xl p-4 w-48 h-24 flex flex-col justify-center items-center text-center
                  border-4 ${activeDeckId === deck.id ? 'scale-110 shadow-lg' : 'opacity-60 scale-90'}
                `}
                                style={{
                                    backgroundColor: 'white',
                                    borderColor: activeDeckId === deck.id ? accentColor : '#e2e8f0',
                                    boxShadow: activeDeckId === deck.id ? `0 0 20px ${accentColor}44` : 'none'
                                }}
                            >
                                {activeDeckId === deck.id && (
                                    <motion.div
                                        layoutId="active-glow"
                                        className="absolute inset-0 rounded-xl blur-md -z-10"
                                        style={{ backgroundColor: accentColor, opacity: 0.2 }}
                                    />
                                )}
                                <span className="text-2xl mb-1">{deck.id === 'default' ? '🎯' : '🎒'}</span>
                                <span className={`font-black uppercase tracking-tighter text-sm truncate w-full ${activeDeckId === deck.id ? 'text-black' : 'text-gray-400'}`}>
                                    {deck.name || 'Untitled Nest'}
                                </span>
                                {deck.isCustom && (
                                    <div className="absolute top-2 right-2 bg-black text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">
                                        LVL {deck.prompts.length}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
