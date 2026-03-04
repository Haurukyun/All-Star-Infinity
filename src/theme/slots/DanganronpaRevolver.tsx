import React from 'react';

export const DanganronpaRevolver: React.FC<{ onShoot: () => void }> = ({ onShoot }) => {
    return (
        <button
            onClick={onShoot}
            className="relative w-32 h-32 group transition-transform active:scale-95 font-['Orbitron']"
        >
            <style>{`
                .animate-spin-slow-reverse { animation: spin 15s linear infinite reverse; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full animate-spin-slow-reverse"></div>
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
                <circle cx="50" cy="50" r="45" fill="rgba(0,0,0,0.8)" stroke="#00FFFF" strokeWidth="2" />
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                    <g key={i} transform={`rotate(${deg} 50 50)`}>
                        <circle cx="50" cy="25" r="8" fill="#1a1a1a" stroke="#00FFFF" strokeWidth="1" className="group-hover:fill-[#00FFFF] transition-colors" />
                    </g>
                ))}
                <circle cx="50" cy="50" r="15" fill="#000" stroke="#FF00FF" strokeWidth="2" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-bold text-[#FF00FF] tracking-widest animate-pulse">SHOOT</span>
            </div>
        </button>
    );
};
