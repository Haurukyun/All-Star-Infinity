import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
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
    <div className="h-[100dvh] w-screen bg-black text-white overflow-hidden font-sans flex flex-col relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
        
        .font-p5-display {
          font-family: 'Anton', sans-serif;
          letter-spacing: -0.02em;
        }

        .p5-dots-bg {
          background-color: #050505;
          background-image: 
            radial-gradient(circle at 2px 2px, #300 1px, transparent 0),
            linear-gradient(45deg, #100 25%, transparent 25%, transparent 75%, #100 75%, #100),
            linear-gradient(-45deg, #100 25%, transparent 25%, transparent 75%, #100 75%, #100);
          background-size: 12px 12px, 100px 100px, 100px 100px;
          animation: bgMove 40s linear infinite;
        }

        @keyframes bgMove {
          0% { background-position: 0 0, 0 0, 0 0; }
          100% { background-position: 0 0, 1000px 1000px, -1000px 1000px; }
        }

        .p5-shards {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(115deg, transparent 20%, rgba(216,0,0,0.05) 21%, rgba(216,0,0,0.05) 24%, transparent 25%),
            linear-gradient(115deg, transparent 40%, rgba(216,0,0,0.03) 41%, rgba(216,0,0,0.03) 46%, transparent 47%),
            linear-gradient(115deg, transparent 70%, rgba(216,0,0,0.08) 71%, rgba(216,0,0,0.08) 78%, transparent 79%);
          background-size: 200% 100%;
          animation: shardMove 20s ease-in-out infinite alternate;
        }

        @keyframes shardMove {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 0%; }
        }

        /* Fix white edges on skewed elements by using box-shadow instead of border */
        .p5-border {
          box-shadow: 0 0 0 3px #000;
        }
        .p5-border-sm {
          box-shadow: 0 0 0 2px #000;
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
      <div className="absolute inset-0 p5-dots-bg z-0 opacity-100"></div>
      <div className="absolute inset-0 p5-shards z-0"></div>
      
      {/* Red Slash Background */}
      <div className="absolute top-0 right-0 w-full h-full bg-[#D80000] transform skew-x-[-35deg] translate-x-1/2 opacity-30 z-0 mix-blend-multiply"></div>

      {/* Header */}
      <header className="relative z-10 p-3 pt-4 sm:pt-6 flex justify-start items-center overflow-visible">
        <div className="relative flex flex-col items-start scale-[0.65] sm:scale-90 origin-left">
          {/* PHANTOM Box */}
          <div className="bg-white text-black px-4 sm:px-8 py-2 sm:py-3 transform -rotate-3 -skew-x-12 relative z-20 shadow-[4px_4px_0_black] sm:shadow-[6px_6px_0_black] p5-border">
            <h1 className="font-p5-display text-3xl sm:text-6xl tracking-tighter uppercase leading-none italic">PHANTOM</h1>
          </div>
          {/* OBSIDIAN Box */}
          <div className="bg-[#D80000] text-white px-3 sm:px-6 py-1 sm:py-1.5 transform rotate-2 -skew-x-12 relative -mt-3 sm:-mt-5 ml-8 sm:ml-24 z-10 whitespace-nowrap shadow-[4px_4px_0_black] sm:shadow-[6px_6px_0_black] p5-border">
            <h1 className="font-p5-display text-xl sm:text-3xl tracking-widest uppercase leading-none italic">OBSIDIAN</h1>
          </div>
        </div>
        <div className="absolute top-4 sm:top-6 right-3 sm:right-6 flex gap-1 sm:gap-1.5">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white transform rotate-45 shadow-[0_0_0_1.5px_#000] sm:shadow-[0_0_0_2px_#000]"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#D80000] transform rotate-45 shadow-[0_0_0_1.5px_#000] sm:shadow-[0_0_0_2px_#000]"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 overflow-y-auto p-3 sm:p-4 pb-24 sm:pb-32 custom-scrollbar">
        <div className="max-w-lg mx-auto h-full flex flex-col">
          {children}
        </div>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-4 left-0 w-full z-50 px-2 pointer-events-none">
        <div className="flex justify-center items-end -space-x-1 sm:-space-x-1.5 max-w-xl mx-auto pointer-events-auto">
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id;
            const rotations = ['-rotate-6', 'rotate-3', '-rotate-2', 'rotate-4', 'rotate-7'];
            const rotation = rotations[index % rotations.length];
            
            return (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center justify-center 
                  transition-all duration-300 ease-[0.22,1,0.36,1]
                  ${rotation}
                  ${isActive 
                    ? 'bg-white text-black w-20 h-16 sm:w-32 sm:h-24 z-20 -translate-y-4 shadow-[6px_6px_0_black] p5-border' 
                    : 'bg-[#D80000] text-white w-16 h-12 sm:w-24 sm:h-18 hover:-translate-y-2 hover:z-10 shadow-[3px_3px_0_black] p5-border'}
                `}
              >
                <span className={`font-p5-display uppercase tracking-wider ${isActive ? 'text-base sm:text-2xl' : 'text-[8px] sm:text-xs'}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
