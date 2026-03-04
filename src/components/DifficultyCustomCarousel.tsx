import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomDeck, GameMode, Intensity } from '../types';

interface DifficultyCustomCarouselProps {
    decks: CustomDeck[];
    activeDeckId: string;
    onSelect: (deckId: string) => void;
    currentIntensity: Intensity;
    currentGameMode: GameMode;
    toggleFavorite: (deckId: string) => void;
}

export const DifficultyCustomCarousel: React.FC<DifficultyCustomCarouselProps> = ({
    decks,
    activeDeckId,
    onSelect,
    currentIntensity,
    currentGameMode,
    toggleFavorite
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Filter valid decks
    const validDecks = decks.filter(d => d.intensity === currentIntensity && d.gameMode === currentGameMode);

    // Sort valid decks: Favorites first, then by name
    const sortedDecks = [...validDecks].sort((a, b) => {
        if (a.isFavorite && !b.isFavorite) return -1;
        if (!a.isFavorite && b.isFavorite) return 1;
        return a.name.localeCompare(b.name);
    });

    const filteredOptions = sortedDecks.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));

    // Center the active card logic (roughly)
    const activeIndex = sortedDecks.findIndex(d => d.id === activeDeckId);

    // Fallback if no decks
    if (validDecks.length === 0) return null;

    return (
        <div className="w-full my-6 relative z-30">
            <div className="flex justify-between items-center px-4 mb-2">
                <span className="text-sm font-black uppercase opacity-70 tracking-widest">Select Nest</span>
                <button onClick={() => setIsModalOpen(true)} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-sm hover:scale-110 active:scale-95 transition-transform">
                    <span className="text-xl">🔍</span>
                </button>
            </div>

            {/* Horizontal Snap Carousel */}
            <div className="flex overflow-x-auto gap-4 px-[10%] pb-4 pt-2 snap-x snap-mandatory no-scrollbar" style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
                {/* Default Deck Card */}
                <button
                    onClick={() => onSelect('default')}
                    className={`shrink-0 w-[80%] snap-center rounded-[24px] p-4 transition-all border-4 shadow-md flex flex-col items-center justify-center gap-2 ${activeDeckId === 'default' ? 'scale-105 border-white bg-black/60 text-white backdrop-blur-md z-10' : 'scale-95 border-transparent bg-black/20 text-white/70 backdrop-blur-sm hover:bg-black/30'}`}
                >
                    <span className="text-4xl filter drop-shadow-md">🥚</span>
                    <span className="font-black tracking-widest text-sm text-center">DEFAULT</span>
                </button>

                {/* Custom Deck Cards */}
                {sortedDecks.map(deck => (
                    <button
                        key={deck.id}
                        onClick={() => onSelect(deck.id)}
                        className={`shrink-0 w-[80%] snap-center rounded-[24px] p-4 transition-all border-4 shadow-md flex flex-col items-center justify-center gap-2 relative ${activeDeckId === deck.id ? 'scale-105 border-white bg-black/60 text-white backdrop-blur-md z-10' : 'scale-95 border-transparent bg-black/20 text-white/70 backdrop-blur-sm hover:bg-black/30'}`}
                    >
                        {deck.isFavorite && <span className="absolute top-2 right-2 text-sm drop-shadow-sm">⭐</span>}
                        <span className="text-4xl filter drop-shadow-md">🧺</span>
                        <span className="font-black tracking-widest text-sm text-center truncate w-full px-2">{deck.name.toUpperCase()}</span>
                        <span className="text-[10px] opacity-80 bg-white/20 px-2 py-0.5 rounded-full">{deck.prompts.length}</span>
                    </button>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl p-4 flex flex-col pt-[env(safe-area-inset-top,20px)]">
                        <div className="flex justify-between items-center mb-6 px-2">
                            <h2 className="text-2xl font-black text-white tracking-widest">Nests ({validDecks.length})</h2>
                            <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 bg-white/10 rounded-full text-white font-black text-xl flex items-center justify-center">X</button>
                        </div>

                        <div className="px-2 mb-6">
                            <input
                                type="text"
                                placeholder="Search nests..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full bg-white/10 border-2 border-white/20 rounded-[20px] p-4 text-white text-lg focus:outline-none focus:border-white transition-colors placeholder:text-white/30 font-bold"
                            />
                        </div>

                        <div className="flex-1 overflow-y-auto w-full px-2 pb-12 space-y-3 custom-scrollbar">
                            <button
                                onClick={() => { onSelect('default'); setIsModalOpen(false); }}
                                className={`w-full text-left p-4 rounded-[20px] border-2 flex items-center gap-4 transition-colors ${activeDeckId === 'default' ? 'bg-white text-black border-white' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}
                            >
                                <span className="text-3xl">🥚</span>
                                <span className="flex-1 font-black text-lg">DEFAULT</span>
                            </button>
                            {filteredOptions.map(deck => (
                                <div key={deck.id} className={`w-full flex items-center gap-2 p-2 rounded-[20px] border-2 transition-colors ${activeDeckId === deck.id ? 'bg-white/20 border-white' : 'bg-white/5 text-white border-white/10'}`}>
                                    <button
                                        onClick={() => toggleFavorite(deck.id)}
                                        className="w-12 h-12 shrink-0 flex items-center justify-center text-2xl hover:scale-125 transition-transform"
                                    >
                                        {deck.isFavorite ? '⭐' : '☆'}
                                    </button>
                                    <button
                                        onClick={() => { onSelect(deck.id); setIsModalOpen(false); }}
                                        className="flex-1 flex items-center gap-4 py-2 pr-2 text-left"
                                    >
                                        <span className="text-3xl">🧺</span>
                                        <div className="flex-1 min-w-0">
                                            <div className={`font-black text-lg truncate ${activeDeckId === deck.id ? 'text-white' : ''}`}>{deck.name}</div>
                                            <div className="text-xs opacity-60 font-medium">{deck.prompts.length} PROMPTS</div>
                                        </div>
                                    </button>
                                </div>
                            ))}
                            {filteredOptions.length === 0 && <div className="text-center text-white/50 text-xl font-bold mt-10">No nests found</div>}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
