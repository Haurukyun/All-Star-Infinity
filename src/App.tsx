import React from 'react';
import UnifiedGame from './components/UnifiedGame';
import MainMenu from './MainMenu';
import { useGameLogic } from './hooks/useGameLogic';
import Layout from './components/Layout';
import { getThemeDefinition } from './themes';


const App: React.FC = () => {
  const logic = useGameLogic();

  if (logic.view === 'menu') {
    return <MainMenu logic={logic} />;
  }

  const themeDef = getThemeDefinition(logic.theme);
  const LayoutComponent = themeDef.LayoutComponent || Layout;

  return (
    <LayoutComponent
      activeTab={logic.activeTab}
      setActiveTab={logic.setActiveTab}
      logic={logic}
    >
      <UnifiedGame logic={logic} />
    </LayoutComponent>
  );
};

export default App;
