
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomDeck, GameMode, Intensity } from '../types';

interface DeckSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    decks: CustomDeck[];
    activeDeckId: string;
    onSelect: (id: string) => void;
    gameMode: GameMode | null;
    intensity: Intensity | null;
}

export const DeckSearchModal: React.FC<DeckSearchModalProps> = ({
    isOpen,
    onClose,
    decks,
    activeDeckId,
    onSelect,
    gameMode,
    intensity
}) => {
    const [search, setSearch] = useState('');

    // Filter based on game state + search
    const filteredDecks = decks.filter(d => {
        const matchState = (d.gameMode === gameMode) && (d.intensity === intensity);
        const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
            d.description.toLowerCase().includes(search.toLowerCase());
        return matchState && matchSearch;
    });

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-white w-full max-w-lg rounded-[32px] overflow-hidden flex flex-col max-h-[80vh] shadow-2xl"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 leading-tight">CHOOSE NEST</h2>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{gameMode} • {intensity}</p>
                            </div>
                            <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold">×</button>
                        </div>

                        <div className="p-4">
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search nests..."
                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-lg font-bold outline-none focus:border-blue-500 transition-colors"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                            <div
                                onClick={() => { onSelect('default'); onClose(); }}
                                className={`p-4 rounded-2xl border-4 cursor-pointer flex justify-between items-center transition-all ${activeDeckId === 'default' ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}
                            >
                                <div>
                                    <h3 className="font-black text-lg">Standard Bag</h3>
                                    <p className="text-xs font-bold text-gray-400 uppercase">Default Prompts</p>
                                </div>
                                {activeDeckId === 'default' && <span className="text-blue-500 font-bold">ACTIVE</span>}
                            </div>

                            {filteredDecks.map(deck => (
                                <div
                                    key={deck.id}
                                    onClick={() => { onSelect(deck.id); onClose(); }}
                                    className={`p-4 rounded-2xl border-4 cursor-pointer animation-all ${activeDeckId === deck.id ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="font-black text-lg truncate pr-4">{deck.name}</h3>
                                            <p className="text-xs font-bold text-gray-500 line-clamp-1 italic">{deck.description || 'No description'}</p>
                                        </div>
                                        <div className="bg-gray-100 px-2 py-1 rounded text-[10px] font-black">{deck.prompts.length} ITEMS</div>
                                    </div>
                                </div>
                            ))}

                            {filteredDecks.length === 0 && search && (
                                <div className="py-12 text-center text-gray-400 font-bold">NO NESTS FOUND FOR "{search.toUpperCase()}"</div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
