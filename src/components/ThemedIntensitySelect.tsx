
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Intensity, GameMode } from '../types';

interface ThemedIntensitySelectProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (intensity: Intensity, gameMode: GameMode) => void;
    styles: {
        accent: string;
        bg: string;
        textColor: string;
        cardBg: string;
        fontFamily?: string;
    };
    initialGameMode?: GameMode;
}

export const ThemedIntensitySelect: React.FC<ThemedIntensitySelectProps> = ({
    isOpen,
    onClose,
    onSelect,
    styles,
    initialGameMode = GameMode.TRUTH_OR_DARE
}) => {
    const [selectedMode, setSelectedMode] = React.useState<GameMode>(initialGameMode);

    const intensities = [
        { id: Intensity.SOFT, label: 'SOFT', desc: 'Mild & Chill', icon: '🍃' },
        { id: Intensity.HOT, label: 'HOT', desc: 'Spicy & Fun', icon: '🔥' },
        { id: Intensity.VULGAR, label: 'VULGAR', desc: 'Wild & Dirty', icon: '🔞' },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ fontFamily: styles.fontFamily }}
                >
                    <motion.div
                        className="w-full max-w-md rounded-[40px] p-8 shadow-2xl relative overflow-hidden"
                        initial={{ scale: 0.9, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 50 }}
                        style={{ backgroundColor: styles.cardBg, border: `4px solid ${styles.accent}` }}
                    >
                        <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: styles.accent }}></div>

                        <h2 className="text-3xl font-black mb-2 text-center" style={{ color: styles.textColor }}>
                            INITIALIZE DECK
                        </h2>
                        <p className="text-sm opacity-60 mb-8 text-center" style={{ color: styles.textColor }}>
                            Configure your system constraints
                        </p>

                        <div className="space-y-6">
                            <div className="flex bg-black/5 p-1 rounded-2xl gap-1">
                                <button
                                    onClick={() => setSelectedMode(GameMode.TRUTH_OR_DARE)}
                                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${selectedMode === GameMode.TRUTH_OR_DARE ? 'bg-white shadow-sm' : 'opacity-40'}`}
                                    style={{ color: selectedMode === GameMode.TRUTH_OR_DARE ? styles.accent : styles.textColor }}
                                >
                                    TRUTH/DARE
                                </button>
                                <button
                                    onClick={() => setSelectedMode(GameMode.NEVER_HAVE_I_EVER)}
                                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${selectedMode === GameMode.NEVER_HAVE_I_EVER ? 'bg-white shadow-sm' : 'opacity-40'}`}
                                    style={{ color: selectedMode === GameMode.NEVER_HAVE_I_EVER ? styles.accent : styles.textColor }}
                                >
                                    NHIE
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {intensities.map((int) => (
                                    <button
                                        key={int.id}
                                        onClick={() => onSelect(int.id, selectedMode)}
                                        className="group relative flex items-center p-5 rounded-3xl border-4 transition-all hover:scale-[1.02]"
                                        style={{
                                            backgroundColor: styles.bg,
                                            borderColor: `${styles.accent}22`,
                                        }}
                                    >
                                        <div className="text-4xl mr-4 group-hover:rotate-12 transition-transform">{int.icon}</div>
                                        <div className="text-left">
                                            <div className="font-black text-xl" style={{ color: styles.textColor }}>{int.label}</div>
                                            <div className="text-xs opacity-50" style={{ color: styles.textColor }}>{int.desc}</div>
                                        </div>
                                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: styles.accent }}>▶</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="mt-8 w-full py-4 text-sm font-bold opacity-40 hover:opacity-100 transition-opacity"
                            style={{ color: styles.textColor }}
                        >
                            CANCEL
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
