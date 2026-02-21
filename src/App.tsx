
import React from 'react';
import PersonaApp from './PersonaApp';
import MinecraftApp from './MinecraftApp';
import DanganronpaApp from './DanganronpaApp';
import OmoriApp from './OmoriApp';
import { useGameLogic } from './hooks/useGameLogic';
import { Theme, Intensity } from './types';

export const STAGES = [
  { id: Intensity.SOFT, title: 'TEASE', desc: 'STOLEN GLANCES', color: '#FFFFFF', text: '#000000' },
  { id: Intensity.HOT, title: 'REVEAL', desc: 'DEEP DESIRE', color: '#D80000', text: '#FFFFFF' },
  { id: Intensity.VULGAR, title: 'SURRENDER', desc: 'ZERO LIMITS', color: '#000000', text: '#FFFFFF' },
];

const App: React.FC = () => {
  const logic = useGameLogic();

  if (logic.theme === Theme.MINECRAFT) {
    return <MinecraftApp logic={logic} />;
  }

  if (logic.theme === Theme.DANGANRONPA) {
    return <DanganronpaApp logic={logic} />;
  }

  if (logic.theme === Theme.OMORI) {
    return <OmoriApp logic={logic} />;
  }

  return <PersonaApp logic={logic} />;
};

export default App;
