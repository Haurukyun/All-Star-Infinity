
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
    styles: {
        accent: string;
        bg: string;
        textColor: string;
        cardBg: string;
    };
}

export const DeckSearchModal: React.FC<DeckSearchModalProps> = ({
    isOpen,
    onClose,
    decks,
    activeDeckId,
    onSelect,
    gameMode,
    intensity,
    styles
}) => {
    const [search, setSearch] = useState('');

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
                        className="w-full max-w-lg rounded-[32px] overflow-hidden flex flex-col max-h-[80vh] shadow-2xl border-4"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        onClick={e => e.stopPropagation()}
                        style={{ backgroundColor: styles.cardBg, borderColor: styles.accent }}
                    >
                        <div className="p-6 border-b flex justify-between items-center" style={{ borderColor: `${styles.accent}22` }}>
                            <div>
                                <h2 className="text-2xl font-black leading-tight" style={{ color: styles.textColor }}>CHOOSE NEST</h2>
                                <p className="text-xs font-bold uppercase tracking-widest opacity-40" style={{ color: styles.textColor }}>{gameMode} • {intensity}</p>
                            </div>
                            <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold opacity-40 hover:opacity-100" style={{ backgroundColor: `${styles.accent}11`, color: styles.textColor }}>×</button>
                        </div>

                        <div className="p-4">
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search nests..."
                                className="w-full border-2 rounded-2xl p-4 text-lg font-bold outline-none transition-colors"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                style={{
                                    backgroundColor: styles.bg,
                                    borderColor: `${styles.accent}22`,
                                    color: styles.textColor,
                                }}
                            />
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                            <div
                                onClick={() => { onSelect('default'); onClose(); }}
                                className={`p-4 rounded-2xl border-4 cursor-pointer flex justify-between items-center transition-all`}
                                style={{
                                    backgroundColor: activeDeckId === 'default' ? `${styles.accent}11` : styles.bg,
                                    borderColor: activeDeckId === 'default' ? styles.accent : `${styles.accent}11`,
                                    color: styles.textColor
                                }}
                            >
                                <div>
                                    <h3 className="font-black text-lg">Standard Bag</h3>
                                    <p className="text-xs font-bold uppercase opacity-40">Default Prompts</p>
                                </div>
                                {activeDeckId === 'default' && <span className="font-bold" style={{ color: styles.accent }}>ACTIVE</span>}
                            </div>

                            {filteredDecks.map(deck => (
                                <div
                                    key={deck.id}
                                    onClick={() => { onSelect(deck.id); onClose(); }}
                                    className={`p-4 rounded-2xl border-4 cursor-pointer transition-all`}
                                    style={{
                                        backgroundColor: activeDeckId === deck.id ? `${styles.accent}11` : styles.bg,
                                        borderColor: activeDeckId === deck.id ? styles.accent : `${styles.accent}11`,
                                        color: styles.textColor
                                    }}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="font-black text-lg truncate pr-4">{deck.name}</h3>
                                            <p className="text-xs font-bold opacity-50 line-clamp-1 italic">{deck.description || 'No description'}</p>
                                        </div>
                                        <div className="px-2 py-1 rounded text-[10px] font-black" style={{ backgroundColor: `${styles.accent}22`, color: styles.accent }}>{deck.prompts.length} ITEMS</div>
                                    </div>
                                </div>
                            ))}

                            {filteredDecks.length === 0 && search && (
                                <div className="py-12 text-center font-bold opacity-30" style={{ color: styles.textColor }}>NO NESTS FOUND FOR "{search.toUpperCase()}"</div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
