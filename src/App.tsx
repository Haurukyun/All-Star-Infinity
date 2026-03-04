import React from 'react';
import UnifiedGame from './components/UnifiedGame';
import MainMenu from './MainMenu';
import { useGameLogic } from './hooks/useGameLogic';
import Layout from './components/Layout';
import { getThemeDefinition } from './themes';
import { ThemeProvider } from './theme/ThemeContext';
import ThemeSelector from './components/ThemeSelector';


const App: React.FC = () => {
  const logic = useGameLogic();

  if (logic.view === 'menu') {
    return (
      <ThemeProvider>
        <ThemeSelector />
        <MainMenu logic={logic} />
      </ThemeProvider>
    );
  }

  const themeDef = getThemeDefinition(logic.theme);
  const LayoutComponent = themeDef.LayoutComponent || Layout;

  return (
    <ThemeProvider>
      <ThemeSelector />
      <LayoutComponent
        activeTab={logic.activeTab}
        setActiveTab={logic.setActiveTab}
        logic={logic}
      >
        <UnifiedGame logic={logic} />
      </LayoutComponent>
    </ThemeProvider>
  );
};

export default App;
