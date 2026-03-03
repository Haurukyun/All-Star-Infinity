import React from 'react';
import { Theme } from '../types';
import { getThemeDefinition, themeRegistry } from '../themes';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  logic: any;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, logic }) => {
  const themeDef = getThemeDefinition(logic.theme);

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
                @import url('https://fonts.googleapis.com/css2?family=Anton&family=Archivo+Black&family=VT323&family=Press+Start+2P&family=Orbitron:wght@400;700;900&family=Gloria+Hallelujah&family=Cherry+Bomb+One&family=Bangers&display=swap');
                
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

      {/* Header */}
      <header className="relative z-50 p-4 sm:p-6 flex justify-between items-center shrink-0">
        <div className="theme-text-header scale-90 origin-left">
          <h1 className="font-bold text-2xl tracking-tighter uppercase leading-none italic">{themeDef.name}</h1>
          <div className="h-1 bg-[var(--theme-accent)] w-full mt-1 opacity-50"></div>
        </div>
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-white rounded-full border-2 border-black"></div>
          <div className="w-3 h-3 bg-[var(--theme-accent)] rounded-full border-2 border-black"></div>
        </div>
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
          ) : children}
        </div>
      </main>

      {/* Universal Navigation */}
      <nav className="fixed bottom-6 left-0 w-full z-50 px-4 pointer-events-none">
        <div className="flex justify-center items-end max-w-xl mx-auto pointer-events-auto gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                                    flex items-center justify-center transition-all duration-300
                                    w-16 h-14 font-bold uppercase text-[10px]
                                    border-4 border-black shadow-[4px_4px_0_#000]
                                    ${isActive
                    ? 'bg-[var(--theme-tab-active-bg)] text-[var(--theme-tab-active-text)] translate-y-[-10px] scale-110 shadow-[8px_8px_0_#000]'
                    : 'bg-[var(--theme-tab-inactive-bg)] text-[var(--theme-tab-inactive-text)] opacity-80'
                  }
                                    transform var(--theme-tab-transform)
                                `}
              >
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
