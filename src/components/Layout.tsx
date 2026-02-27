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
      <header className="relative z-10 p-4 pt-10 flex justify-start items-center overflow-visible">
        <div className="relative flex flex-col items-start scale-90 sm:scale-100 origin-left">
          {/* PHANTOM Box */}
          <div className="bg-white text-black px-10 py-4 transform -rotate-3 -skew-x-12 relative z-20 shadow-[8px_8px_0_black] p5-border">
            <h1 className="font-p5-display text-5xl sm:text-7xl tracking-tighter uppercase leading-none italic">PHANTOM</h1>
          </div>
          {/* OBSIDIAN Box */}
          <div className="bg-[#D80000] text-white px-8 py-2 transform rotate-2 -skew-x-12 relative -mt-6 ml-20 sm:ml-32 z-10 whitespace-nowrap shadow-[8px_8px_0_black] p5-border">
            <h1 className="font-p5-display text-3xl sm:text-4xl tracking-widest uppercase leading-none italic">OBSIDIAN</h1>
          </div>
        </div>
        <div className="absolute top-10 right-6 flex gap-2">
          <div className="w-4 h-4 bg-white transform rotate-45 shadow-[0_0_0_3px_#000]"></div>
          <div className="w-4 h-4 bg-[#D80000] transform rotate-45 shadow-[0_0_0_3px_#000]"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 overflow-y-auto p-4 pb-32 custom-scrollbar">
        <div className="max-w-md mx-auto h-full flex flex-col">
          {children}
        </div>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-6 left-0 w-full z-50 px-2 pointer-events-none">
        <div className="flex justify-center items-end -space-x-1 sm:-space-x-2 max-w-xl mx-auto pointer-events-auto">
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id;
            const rotations = ['-rotate-8', 'rotate-4', '-rotate-3', 'rotate-6', 'rotate-9'];
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
                    ? 'bg-white text-black w-24 h-20 sm:w-36 sm:h-28 z-20 -translate-y-6 shadow-[8px_8px_0_black] p5-border' 
                    : 'bg-[#D80000] text-white w-20 h-16 sm:w-28 sm:h-22 hover:-translate-y-3 hover:z-10 shadow-[4px_4px_0_black] p5-border'}
                `}
              >
                <span className={`font-p5-display uppercase tracking-wider ${isActive ? 'text-xl sm:text-3xl' : 'text-[10px] sm:text-sm'}`}>
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
