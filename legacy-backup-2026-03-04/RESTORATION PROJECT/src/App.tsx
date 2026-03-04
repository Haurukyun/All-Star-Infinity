
import React from 'react';
import PersonaApp from './PersonaApp';
import MinecraftApp from './MinecraftApp';
import DanganronpaApp from './DanganronpaApp';
import OmoriApp from './OmoriApp';
import KirbyApp from './KirbyApp';
import PokemonApp from './PokemonApp';
import AnimalCrossingApp from './AnimalCrossingApp';
import SkyrimApp from './SkyrimApp';
import MainMenu from './MainMenu';
import { useGameLogic } from './hooks/useGameLogic';
import { Theme } from './types';

const App: React.FC = () => {
  const logic = useGameLogic();

  if (logic.view === 'menu') {
    return <MainMenu logic={logic} />;
  }

  if (logic.theme === Theme.MINECRAFT) {
    return <MinecraftApp logic={logic} />;
  }

  if (logic.theme === Theme.DANGANRONPA) {
    return <DanganronpaApp logic={logic} />;
  }

  if (logic.theme === Theme.OMORI) {
    return <OmoriApp logic={logic} />;
  }

  if (logic.theme === Theme.KIRBY) {
    return <KirbyApp logic={logic} />;
  }

  if (logic.theme === Theme.POKEMON) {
    return <PokemonApp logic={logic} />;
  }

  if (logic.theme === Theme.ANIMAL_CROSSING) {
    return <AnimalCrossingApp logic={logic} />;
  }

  if (logic.theme === Theme.SKYRIM) {
    return <SkyrimApp logic={logic} />;
  }

  return <PersonaApp logic={logic} />;
};

export default App;
