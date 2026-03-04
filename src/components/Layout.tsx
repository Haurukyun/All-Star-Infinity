import React from 'react';
import { Theme } from '../types';
import { getThemeDefinition, themeRegistry } from '../themes';
import { useTheme } from '../theme/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  logic: any;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, logic }) => {
  const { currentThemeDefinition: themeDef } = useTheme();

  const tabs = [
    { id: 'play', label: themeDef.tabLabels?.play || 'PLAY' },
    { id: 'decks', label: themeDef.tabLabels?.decks || 'DECKS' },
    { id: 'history', label: themeDef.tabLabels?.history || 'LOGS' },
    { id: 'themes', label: themeDef.tabLabels?.themes || 'WORLD' },
    { id: 'settings', label: themeDef.tabLabels?.settings || 'OPTS' },
  ];

  // Normalize class name: "Persona 5" -> "theme-persona-5"
  const themeClass = `theme-${logic.theme.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={`h-[100dvh] w-screen overflow-hidden flex flex-col relative ${themeClass}`}>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Anton&family=Archivo+Black&family=VT323&family=Press+Start+2P&family=Orbitron:wght@400;700;900&family=Gloria+Hallelujah&family=Cherry+Bomb+One&family=Bangers&family=DotGothic16&display=swap');
                
                :root {
                    ${Object.entries(themeDef.cssVars).map(([key, value]) => `${key}: ${value};`).join('\n')}
                }

                /* UNIVERSAL THEME CLASSES */
                .theme-text-header { 
                    font-family: var(--theme-font);
                    color: var(--theme-text);
                    text-shadow: var(--theme-shadow-header);
                    text-transform: uppercase;
                }

                .theme-button {
                    background: var(--theme-btn-bg);
                    color: var(--theme-btn-text);
                    border: var(--theme-btn-border);
                    box-shadow: var(--theme-btn-shadow);
                    font-family: var(--theme-font);
                    transform: var(--theme-btn-transform);
                    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .theme-button:hover {
                    background: var(--theme-btn-hover-bg);
                    color: var(--theme-btn-hover-text);
                    transform: var(--theme-btn-hover-transform);
                    box-shadow: var(--theme-btn-hover-shadow, var(--theme-btn-shadow));
                }
                .theme-button:active {
                    transform: scale(0.95) var(--theme-btn-transform);
                }

                .theme-button-alt {
                    background: var(--theme-btn-alt-bg);
                    color: var(--theme-btn-alt-text);
                    border-color: var(--theme-btn-alt-border-color, var(--theme-btn-border));
                }

                .theme-panel {
                    background: var(--theme-panel-bg);
                    border: var(--theme-panel-border);
                    box-shadow: var(--theme-panel-shadow);
                    transform: var(--theme-panel-transform);
                    position: relative;
                }

                .theme-badge {
                    background: var(--theme-accent);
                    color: #fff;
                    border: 2px solid #000;
                    transform: var(--theme-badge-transform);
                    font-family: var(--theme-font);
                }

                .theme-penalty-box {
                    background: var(--theme-penalty-bg);
                    border: var(--theme-penalty-border);
                }

                .theme-text-prompt {
                    font-family: var(--theme-font-prompt);
                    color: var(--theme-text-prompt-color);
                }

                /* THEME-SPECIFIC EFFECTS */
                .p5-dots-bg { 
                    background-color: #050505; 
                    background-image: radial-gradient(circle at 2px 2px, #300 1px, transparent 0); 
                    background-size: 12px 12px; 
                }
                .p5-stars-bg { 
                    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L53 47L100 50L53 53L50 100L47 53L0 50L47 47L50 0Z' fill='rgba(216,0,0,0.05)'/%3E%3C/svg%3E"); 
                    background-size: 50px 50px; 
                }
                .font-p5-display { font-family: 'Bangers', cursive; letter-spacing: 0.05em; }
                .p5-border { box-shadow: 0 0 0 3px #000; }
                
                .fnaf-static { 
                    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEUAAAAAAAABAwEBAgMDAwMAAgECAwEAAgGEfXhFAAAABXRSTlM/fz+/vz8Fv13NAAAAWUlEQVQ4y2NgQAX8DIwwmgnMZGGEUWxgBgsYI0yxgTFMGKqYEUYxlzWMYQZTbGBMYIYp1jDGCAYwg0WMAcxghSlOMMaIggYMGMAMFjCGGYwwxQbGCAYwxQKGGQCb0BU1gK5TdgAAAABJRU5ErkJggg=='); 
                    animation: staticNoise 0.2s steps(2,end) infinite; 
                    mix-blend-mode: overlay;
                }
                @keyframes staticNoise { 0% { background-position: 0 0; } 100% { background-position: 100% 100%; } }
                .fnaf-rec { width: 12px; height: 12px; background-color: #ff0000; border-radius: 50%; animation: blink 1s infinite alternate; }
                @keyframes blink { 0% { opacity: 1; } 100% { opacity: 0; } }
                .fnaf-vignette { background: radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.9) 100%); }

                .fallout-aberration { filter: contrast(1.2) brightness(1.1) sepia(0.3) hue-rotate(60deg); }
                .scanlines { background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3) 50%); background-size: 100% 4px; pointer-events: none; }
                .vignette { background: radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.6) 100%); pointer-events: none; }

                .animate-spin-slow { animation: spin 20s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                
                .ut-heart { display: inline-block; color: #ff0000; animation: heart-pulse 0.8s infinite alternate; }
                @keyframes heart-pulse { 0% { transform: scale(1); } 100% { transform: scale(1.2); } }

                ${themeDef.styles || ''}

                /* Scrollbar Customization */
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { 
                    background: var(--theme-accent, #888); 
                    border-radius: 10px; 
                    border: 2px solid transparent;
                    background-clip: content-box;
                }
            `}</style>

      {/* Theme-Specific Overlays & Backgrounds */}
      {themeDef.id === Theme.PERSONA && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 p5-dots-bg opacity-100" />
          <div className="absolute inset-0 p5-stars-bg opacity-40" />
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-[200%] h-[200%] bg-[#D80000] opacity-20 transform -rotate-45 -translate-x-1/2 -translate-y-1/2 mix-blend-multiply" />
          </div>
        </div>
      )}

      {themeDef.id === Theme.FNAF && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 fnaf-static opacity-15" />
          <div className="absolute inset-0 fnaf-vignette opacity-60" />
          {activeTab === 'play' && (
            <div className="absolute top-6 left-6 flex items-center">
              <div className="fnaf-rec" />
              <span className="text-2xl font-bold tracking-widest text-[#fff] drop-shadow-[0_0_2px_#fff] font-mono">REC</span>
            </div>
          )}
        </div>
      )}

      {themeDef.id === Theme.DANGANRONPA && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
          <svg className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%] animate-spin-slow" viewBox="0 0 100 100">
            {Array.from({ length: 12 }).map((_, i) => (
              <path
                key={i}
                d={`M50 50 Q${50 + Math.cos(i) * 50} ${50 + Math.sin(i) * 50} ${50 + Math.cos(i + 0.5) * 100} ${50 + Math.sin(i + 0.5) * 100}`}
                stroke="#4a0a6a"
                strokeWidth="0.5"
                fill="none"
              />
            ))}
          </svg>
        </div>
      )}

      {themeDef.id === Theme.FALLOUT && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 scanlines opacity-30" />
          <div className="absolute inset-0 vignette opacity-50" />
        </div>
      )}

      {/* Header */}
      <header className="relative z-50 p-4 sm:p-6 flex justify-between items-center shrink-0">
        {themeDef.id === Theme.PERSONA ? (
          <div className="relative flex flex-col items-start scale-[0.65] sm:scale-90 origin-left">
            <div className="bg-white text-black px-4 sm:px-8 py-2 transform -rotate-3 -skew-x-12 relative z-20 shadow-[4px_4px_0_black] p5-border">
              <h1 className="font-p5-display text-3xl sm:text-5xl tracking-tighter uppercase leading-none italic">PHANTOM</h1>
            </div>
            <div className="bg-[#D80000] text-white px-3 sm:px-6 py-1 transform rotate-2 -skew-x-12 relative mt-1 ml-4 sm:ml-8 z-10 whitespace-nowrap shadow-[4px_4px_0_black] p5-border">
              <h1 className="font-p5-display text-lg sm:text-2xl tracking-widest uppercase leading-none italic">OBSIDIAN</h1>
            </div>
          </div>
        ) : themeDef.id === Theme.UNDERTALE ? (
          <div className="flex items-center gap-6 text-white font-bold text-xl sm:text-2xl border-b-4 border-white pb-2 w-full justify-between px-4 font-mono">
            <div className="flex gap-4">
              <span>FRISK</span>
              <span>LV 1</span>
              <span>HP <span className="text-[#00ff00]">20/20</span></span>
            </div>
            <span>G 420</span>
          </div>
        ) : (
          <>
            <div className="theme-text-header scale-90 origin-left">
              <h1 className="font-bold text-2xl tracking-tighter uppercase leading-none italic">{themeDef.name}</h1>
              <div className="h-1 bg-[var(--theme-accent)] w-full mt-1 opacity-50"></div>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-white rounded-full border-2 border-black"></div>
              <div className="w-3 h-3 bg-[var(--theme-accent)] rounded-full border-2 border-black"></div>
            </div>
          </>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 overflow-y-auto p-4 pb-32 custom-scrollbar">
        <div className="max-w-lg mx-auto h-full flex flex-col">
          {activeTab === 'themes' ? (
            <div className="space-y-6 pt-4 h-full flex flex-col">
              <h2 className="theme-text-header text-4xl font-bold italic mb-6">THEMES</h2>
              <div className="grid grid-cols-1 gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1 pb-10">
                {Object.values(Theme).filter(t => t !== Theme.NONE).map((t) => {
                  const isCurrent = logic.theme === t;
                  return (
                    <button
                      key={t}
                      onClick={() => logic.setTheme?.(t)}
                      className={`
                                                p-5 text-left transition-all theme-button justify-start uppercase tracking-[0.1em] text-lg font-black
                                                ${isCurrent ? 'bg-white text-black translate-x-1 translate-y-1 shadow-none opacity-100 ring-2 ring-white' : 'opacity-90'}
                                            `}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className={`flex-1 flex flex-col ${themeDef.id === Theme.PERSONA && activeTab === 'play' ? 'transform -rotate-1' : ''}`}>
              {children}
            </div>
          )}
        </div>
      </main>

      {/* HUD Overlays (Tab Specific) */}
      {themeDef.id === Theme.FALLOUT && activeTab === 'play' && (
        <div className="fixed bottom-24 left-6 right-6 z-40 flex justify-between items-end pointer-events-none opacity-60 font-mono text-xs text-[var(--theme-accent)]">
          <div className="flex flex-col">
            <div className="w-24 h-1 bg-[var(--theme-accent)] opacity-20 mb-1" />
            <span>HP 100/100</span>
          </div>
          <div className="flex flex-col items-end">
            <div className="w-24 h-1 bg-[var(--theme-accent)] opacity-20 mb-1" />
            <span>AP 85/85</span>
          </div>
        </div>
      )}

      {/* Universal Navigation */}
      <nav className="fixed bottom-6 left-0 w-full z-50 px-4 pointer-events-none">
        <div className="flex justify-center items-end max-w-xl mx-auto pointer-events-auto gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const isPersona = themeDef.id === Theme.PERSONA;
            const isUndertale = themeDef.id === Theme.UNDERTALE;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                                    flex items-center justify-center transition-all duration-300
                                    ${isPersona ? 'w-20 sm:w-24 h-14 sm:h-16' : 'w-16 h-14'}
                                    font-bold uppercase text-[10px]
                                    border-4 border-black shadow-[4px_4px_0_#000]
                                    ${isActive
                    ? 'bg-[var(--theme-tab-active-bg)] text-[var(--theme-tab-active-text)] translate-y-[-10px] scale-110 shadow-[8px_8px_0_#000]'
                    : 'bg-[var(--theme-tab-inactive-bg)] text-[var(--theme-tab-inactive-text)] opacity-80'
                  }
                                    ${isPersona ? (isActive ? 'skew-x-[-12deg]' : 'skew-x-[-6deg]') : 'transform var(--theme-tab-transform)'}
                                `}
              >
                {isUndertale && isActive && <span className="mr-1 ut-heart text-xs">♥</span>}
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
