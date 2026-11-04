import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TimerDuration } from '../types';

interface CountdownTimerProps {
  enabled: boolean;
  duration: TimerDuration;
  onToggleEnabled: () => void;
  onChangeDuration: (duration: TimerDuration) => void;
  promptId?: string;
  isPromptActive: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  enabled,
  duration,
  onToggleEnabled,
  onChangeDuration,
  promptId,
  isPromptActive,
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
          // Trigger light vibration if available
          try {
            if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
              navigator.vibrate([200, 100, 300]);
            }
          } catch {
            // Ignore vibration errors
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [enabled, isPromptActive, isRunning, timeLeft]);

  const isLowTime = timeLeft <= 5 && timeLeft > 0;
  const isExpired = timeLeft === 0 && isPromptActive;

  // Percentage for progress ring or bar
  const progressPercent = Math.max(0, Math.min(100, (timeLeft / duration) * 100));

  if (!enabled) {
    return (
      <div className="relative inline-block select-none">
        <button
          onClick={onToggleEnabled}
          title="Turn on Countdown Timer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider
                     bg-black/60 hover:bg-black/80 text-white/70 hover:text-white border border-white/20 
                     backdrop-blur-md shadow-md transition-all active:scale-95"
        >
          <span className="text-sm">⏱️</span>
          <span>TIMER: OFF</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative inline-block select-none">
      <motion.div
        animate={
          isExpired
            ? { x: [-3, 3, -3, 3, 0], scale: [1, 1.05, 1] }
            : isLowTime
            ? { scale: [1, 1.08, 1] }
            : { scale: 1 }
        }
        transition={{
          repeat: isLowTime ? Infinity : isExpired ? 3 : 0,
          duration: isLowTime ? 0.6 : 0.3,
        }}
        onClick={() => setShowConfig((prev) => !prev)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider cursor-pointer
                    border-2 backdrop-blur-md shadow-lg transition-colors active:scale-95
                    ${
                      isExpired
                        ? 'bg-red-600/90 text-white border-red-400 shadow-red-500/50'
                        : isLowTime
                        ? 'bg-amber-600/90 text-white border-amber-300 shadow-amber-500/40'
                        : 'bg-black/75 text-white border-white/30'
                    }`}
      >
        <span className="text-sm">{isExpired ? '⏰' : '⏱️'}</span>
        <span className="font-mono text-sm tracking-normal font-black">
          {isExpired ? "TIME'S UP!" : `${timeLeft}s`}
        </span>

        {/* Small circular progress dot */}
        <div className="w-2.5 h-2.5 rounded-full border border-white/40 overflow-hidden bg-black/40">
          <div
            className={`h-full transition-all duration-300 ${
              isExpired ? 'bg-red-400' : isLowTime ? 'bg-amber-400' : 'bg-emerald-400'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </motion.div>

      {/* Quick Config Popover */}
      <AnimatePresence>
        {showConfig && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 w-48 bg-zinc-900 border-2 border-white/30 rounded-xl p-3 shadow-2xl z-50 text-white text-xs space-y-2.5"
          >
            <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
              <span className="font-bold tracking-wider uppercase text-[10px] text-white/70">Timer Controls</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfig(false);
                }}
                className="text-white/50 hover:text-white font-mono text-sm"
              >
                ✕
              </button>
            </div>

            {/* Quick Actions: Pause/Resume + Restart */}
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsRunning((prev) => !prev);
                }}
                className="py-1 px-2 rounded bg-white/10 hover:bg-white/20 font-bold text-[10px] uppercase text-center"
              >
                {isRunning ? '⏸ Pause' : '▶ Resume'}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setTimeLeft(duration);
                  setIsRunning(true);
                }}
                className="py-1 px-2 rounded bg-white/10 hover:bg-white/20 font-bold text-[10px] uppercase text-center"
              >
                🔄 Reset
              </button>
            </div>

            {/* Duration Selector */}
            <div className="space-y-1">
              <span className="text-[10px] text-white/50 uppercase font-semibold">Duration:</span>
              <div className="grid grid-cols-3 gap-1">
                {([15, 30, 60] as TimerDuration[]).map((d) => (
                  <button
                    key={d}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChangeDuration(d);
                      setTimeLeft(d);
                      setIsRunning(true);
                    }}
                    className={`py-1 rounded font-bold text-[10px] transition-colors ${
                      duration === d
                        ? 'bg-red-600 text-white shadow'
                        : 'bg-white/10 hover:bg-white/20 text-white/70'
                    }`}
                  >
                    {d}s
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle Off */}
            <div className="pt-1 border-t border-white/10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfig(false);
                  onToggleEnabled();
                }}
                className="w-full py-1.5 rounded bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-200 font-bold text-[10px] uppercase tracking-wider text-center"
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
