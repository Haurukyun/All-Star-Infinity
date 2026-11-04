import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomDeck } from '../types';
import { exportDeckToString, importDeckFromString, generateDeckQRCode } from '../services/deckShare';
import { hapticService } from '../services/haptics';

interface DeckShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'export' | 'import';
  deckToExport?: CustomDeck | null;
  onImportSuccess: (deck: CustomDeck) => void;
}

export const DeckShareModal: React.FC<DeckShareModalProps> = ({
  isOpen,
  onClose,
  mode,
  deckToExport,
  onImportSuccess,
}) => {
  // Export State
  const [shareString, setShareString] = useState<string>('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Import State
  const [importInput, setImportInput] = useState<string>('');
  const [previewDeck, setPreviewDeck] = useState<CustomDeck | null>(null);
  const [importError, setImportError] = useState<string | null>(null);

  // Prepare export data
  useEffect(() => {
    if (mode === 'export' && deckToExport) {
      const code = exportDeckToString(deckToExport);
      setShareString(code);
      generateDeckQRCode(code)
        .then(url => setQrDataUrl(url))
        .catch(err => console.error('Failed to generate QR:', err));
    } else {
      setShareString('');
      setQrDataUrl('');
    }
  }, [mode, deckToExport]);

  // Live validate import code
  useEffect(() => {
    if (mode === 'import') {
      if (!importInput.trim()) {
        setPreviewDeck(null);
        setImportError(null);
        return;
      }

      const deck = importDeckFromString(importInput);
      if (deck) {
        setPreviewDeck(deck);
        setImportError(null);
      } else {
        setPreviewDeck(null);
        setImportError('Invalid deck short code or JSON format.');
      }
    }
  }, [mode, importInput]);

  const handleCopy = async () => {
    if (!shareString) return;
    try {
      await navigator.clipboard.writeText(shareString);
      setIsCopied(true);
      hapticService.light();
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Fallback
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (!shareString || !deckToExport) return;
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({
          title: `All★Star Infinity: ${deckToExport.name}`,
          text: `Check out my custom party deck "${deckToExport.name}" on All★Star Infinity!\n\nImport code:\n${shareString}`,
        });
        hapticService.success();
      } catch {
        // User dismissed share dialog
      }
    } else {
      handleCopy();
    }
  };

  const handleConfirmImport = () => {
    if (previewDeck) {
      hapticService.success();
      onImportSuccess(previewDeck);
      setImportInput('');
      setPreviewDeck(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          className="bg-zinc-950 border-2 border-white/20 rounded-2xl w-full max-w-md p-6 text-white shadow-2xl space-y-5 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">{mode === 'export' ? '📤' : '📥'}</span>
              <h3 className="font-black text-xl tracking-tight uppercase">
                {mode === 'export' ? 'Export Deck' : 'Import Deck'}
              </h3>
            </div>
            <button
              onClick={() => {
                hapticService.light();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm font-bold transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Export View */}
          {mode === 'export' && deckToExport && (
            <div className="space-y-4 overflow-y-auto pr-1 custom-scrollbar">
              <div className="text-center space-y-1">
                <h4 className="font-black text-lg text-white">{deckToExport.name}</h4>
                <div className="flex justify-center items-center gap-2 text-xs opacity-60">
                  <span className="uppercase font-bold">{deckToExport.gameMode}</span>
                  <span>•</span>
                  <span>{deckToExport.prompts.length} PROMPTS</span>
                  <span>•</span>
                  <span className="uppercase font-bold text-red-400">{deckToExport.intensity}</span>
                </div>
              </div>

              {/* QR Code Display */}
              <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl shadow-inner">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Deck QR Code"
                    className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
                  />
                ) : (
                  <div className="w-48 h-48 flex items-center justify-center text-black/50 text-xs font-bold">
                    Generating QR Code...
                  </div>
                )}
                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider mt-2">
                  Scan to share with party guests
                </p>
              </div>

              {/* Short Code Area */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-white/50 tracking-wider">
                  Deck Short Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={shareString}
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-xs font-mono text-white/80 focus:outline-none pr-20 select-all"
                  />
                  <button
                    onClick={handleCopy}
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-2.5 rounded-lg bg-red-600 hover:bg-red-500 font-black text-[10px] uppercase tracking-wider transition-colors shadow-sm"
                  >
                    {isCopied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleNativeShare}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 font-black text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all active:scale-95"
                >
                  🔗 Share Deck
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Import View */}
          {mode === 'import' && (
            <div className="space-y-4 overflow-y-auto pr-1 custom-scrollbar">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-white/60 tracking-wider">
                  Paste Short Code or JSON
                </label>
                <textarea
                  value={importInput}
                  onChange={(e) => setImportInput(e.target.value)}
                  placeholder="Paste ASI:1:... short code or raw deck JSON here..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/20 focus:border-red-500 rounded-xl p-3 text-xs font-mono text-white placeholder-white/30 focus:outline-none transition-colors"
                />
              </div>

              {importError && (
                <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs font-semibold">
                  ⚠️ {importError}
                </div>
              )}

              {/* Preview Card */}
              {previewDeck && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-white/10 border-2 border-emerald-500/50 space-y-2 shadow-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                        ✓ Ready to Import
                      </span>
                      <h4 className="font-black text-lg text-white leading-tight">
                        {previewDeck.name}
                      </h4>
                      {previewDeck.description && (
                        <p className="text-xs text-white/70 italic mt-0.5">
                          "{previewDeck.description}"
                        </p>
                      )}
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-red-600 text-white">
                      {previewDeck.intensity}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pt-2 border-t border-white/10 text-xs text-white/70">
                    <span>🎴 {previewDeck.prompts.length} Prompts</span>
                    <span>•</span>
                    <span className="uppercase">{previewDeck.gameMode}</span>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleConfirmImport}
                  disabled={!previewDeck}
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40 disabled:cursor-not-allowed font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition-all active:scale-95 text-white"
                >
                  + Add to My Decks
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 font-bold text-xs uppercase tracking-wider transition-colors text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

