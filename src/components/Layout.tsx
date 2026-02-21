import React from 'react';
import { Theme } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'play', label: 'STEAL' },
    { id: 'decks', label: 'DECKS' },
    { id: 'history', label: 'LOGS' },
    { id: 'themes', label: 'THEME' },
    { id: 'settings', label: 'META' },
  ];

  return (
    <div className="h-[100dvh] w-screen bg-[#111] text-white overflow-hidden font-sans flex flex-col relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
        
        .font-p5-display {
          font-family: 'Anton', sans-serif;
          letter-spacing: -0.05em;
        }

        .p5-bg {
          background-image: 
            linear-gradient(45deg, #1a1a1a 25%, transparent 25%, transparent 75%, #1a1a1a 75%, #1a1a1a),
            linear-gradient(45deg, #1a1a1a 25%, transparent 25%, transparent 75%, #1a1a1a 75%, #1a1a1a);
          background-size: 20px 20px;
          background-position: 0 0, 10px 10px;
        }

        .vibrate-hover:hover {
          animation: vibrate 0.3s linear infinite both;
        }

        @keyframes vibrate {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
      `}</style>

      {/* Background Pattern */}
      <div className="absolute inset-0 p5-bg opacity-10 pointer-events-none z-0"></div>
      
      {/* Red Slash Background */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-[#D80000] transform skew-x-[-20deg] translate-x-1/2 opacity-80 z-0"></div>

      {/* Header */}
      <header className="relative z-10 p-4 flex justify-between items-center transform -skew-x-6 border-b-4 border-white">
        <div className="flex items-center gap-2">
          <h1 className="font-p5-display text-4xl italic text-white drop-shadow-[4px_4px_0_#000] transform -skew-x-6">PHANTOM</h1>
          <div className="bg-[#D80000] px-2 py-0.5 transform -skew-x-12 shadow-[2px_2px_0_black]">
            <span className="font-p5-display text-xl text-white italic transform skew-x-6 block pt-1">OBSIDIAN</span>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-[#D80000] transform rotate-45"></div>
          <div className="w-3 h-3 bg-[#333] transform rotate-45"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 overflow-y-auto p-4 pb-24 custom-scrollbar">
        <div className="max-w-md mx-auto h-full">
          {children}
        </div>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 w-full h-20 bg-black z-50 transform skew-y-[-2deg] origin-bottom-left border-t-4 border-white">
        <div className="flex justify-around items-center h-full px-2 transform skew-y-[2deg]">
          {tabs.map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center w-16 h-16 transition-transform ${activeTab === tab.id ? 'scale-110 -translate-y-4' : 'opacity-50 hover:opacity-100'}`}
            >
              <div className={`w-12 h-12 flex items-center justify-center border-2 border-white transform rotate-45 bg-black ${activeTab === tab.id ? 'bg-[#D80000]' : ''}`}>
                <span className="transform -rotate-45 font-p5-display text-xl italic">{tab.label[0]}</span>
              </div>
              <span className={`text-[10px] font-black mt-1 px-1 transform -skew-x-12 ${activeTab === tab.id ? 'bg-[#D80000] text-white' : 'bg-white text-black'}`}>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
