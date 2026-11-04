import React from 'react';
import UnifiedGame from './components/UnifiedGame';
import MainMenu from './MainMenu';
import { PlayerSetup } from './components/PlayerSetup';
import { useGameLogic } from './hooks/useGameLogic';
import Layout from './components/Layout';
import { getThemeDefinition } from './themes';
import { ErrorBoundary } from './ErrorBoundary';

const App: React.FC = () => {
  const logic = useGameLogic();

  const appContent = () => {
    if (logic.view === 'menu') {
      return <MainMenu logic={logic} />;
    }

    if (logic.view === 'player-setup') {
      return <PlayerSetup logic={logic} />;
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

  return (
    <ErrorBoundary>
      <div className={`w-full h-full ${logic.useEasyFont ? 'easy-font-mode' : ''}`}>
        <style>{`
          .easy-font-mode .theme-text-prompt,
          .easy-font-mode .theme-text-header,
          .easy-font-mode .font-p5-display,
          .easy-font-mode .font-display,
          .easy-font-mode .skyrim-font-title,
          .easy-font-mode .sonic-button,
          .easy-font-mode .omori-button,
          .easy-font-mode .cyber-button,
          .easy-font-mode h1,
          .easy-font-mode h2,
          .easy-font-mode h3,
          .easy-font-mode p {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
            letter-spacing: normal !important;
          }
        `}</style>
        {appContent()}
      </div>
    </ErrorBoundary>
  );
};

export default App;
