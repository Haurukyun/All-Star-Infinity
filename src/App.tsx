import React from 'react';
import UnifiedGame from './components/UnifiedGame';
import MainMenu from './MainMenu';
import { useGameLogic } from './hooks/useGameLogic';
import Layout from './components/Layout';
import { getThemeDefinition } from './themes';
import { ErrorBoundary } from './ErrorBoundary';


const App: React.FC = () => {
  const logic = useGameLogic();

  if (logic.view === 'menu') {
    return <ErrorBoundary><MainMenu logic={logic} /></ErrorBoundary>;
  }

  const themeDef = getThemeDefinition(logic.theme);
  const LayoutComponent = themeDef.LayoutComponent || Layout;

  return (
    <ErrorBoundary>
      <LayoutComponent
        activeTab={logic.activeTab}
        setActiveTab={logic.setActiveTab}
        logic={logic}
      >
        <UnifiedGame logic={logic} />
      </LayoutComponent>
    </ErrorBoundary>
  );
};

export default App;
