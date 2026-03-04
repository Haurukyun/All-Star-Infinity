import React from 'react';
import UnifiedGame from './components/UnifiedGame';
import MainMenu from './MainMenu';
import { useGameLogic } from './hooks/useGameLogic';
import Layout from './components/Layout';
import { getThemeDefinition } from './themes';
import { ThemeProvider, useTheme } from './theme/ThemeContext';
import ThemeSelector from './components/ThemeSelector';


const ThemedApp: React.FC<{ logic: any }> = ({ logic }) => {
  const { currentThemeDefinition: themeDef } = useTheme();

  if (logic.view === 'menu') {
    return <MainMenu logic={logic} />;
  }

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

const App: React.FC = () => {
  const logic = useGameLogic();

  return (
    <ThemeProvider>
      <ThemeSelector />
      <ThemedApp logic={logic} />
    </ThemeProvider>
  );
};

export default App;
