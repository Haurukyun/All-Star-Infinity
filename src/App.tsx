import React, { useEffect, useRef, useCallback } from 'react';
import { App as CapApp } from '@capacitor/app';
import UnifiedGame from './components/UnifiedGame';
import MainMenu from './MainMenu';
import { PlayerSetup } from './components/PlayerSetup';
import { useGameLogic } from './hooks/useGameLogic';
import Layout from './components/Layout';
import { getThemeDefinition } from './themes';
import { ErrorBoundary } from './ErrorBoundary';
import { suspendAudio, resumeAudio } from './services/soundFx';
import { hapticService } from './services/haptics';

const App: React.FC = () => {
  const logic = useGameLogic();
  const lastBackPressRef = useRef<number>(0);

  const handleHardwareBack = useCallback(() => {
    // 1. If currently showing a drawn prompt -> go back to intensity selector / mode selector
    if (logic.prompt) {
      logic.setPrompt(null);
      hapticService.light();
      return;
    }

    // 2. If intensity is selected but no prompt -> reset intensity
    if (logic.intensity) {
      logic.setIntensity(null);
      hapticService.light();
      return;
    }

    // 3. If in player setup -> go back to menu
    if (logic.view === 'player-setup') {
      logic.setView('menu');
      hapticService.light();
      return;
    }

    // 4. If in game view but not in play tab -> switch to play tab
    if (logic.view === 'game' && logic.activeTab !== 'play') {
      logic.setActiveTab('play');
      hapticService.light();
      return;
    }

    // 5. If in game view on play tab with no active prompt -> return to main menu
    if (logic.view === 'game') {
      logic.setView('menu');
      hapticService.light();
      return;
    }

    // 6. If on menu: double-tap back within 2 seconds exits app
    if (logic.view === 'menu') {
      const now = Date.now();
      if (now - lastBackPressRef.current < 2000) {
        try { CapApp.exitApp(); } catch (e) { console.error(e); }
      } else {
        lastBackPressRef.current = now;
        hapticService.medium();
      }
    }
  }, [logic]);

  // Android Hardware Back Button & Lifecycle Listeners
  useEffect(() => {
    let stateListener: any;
    let backListener: any;

    try {
      stateListener = CapApp.addListener('appStateChange', ({ isActive }) => {
        if (!isActive) {
          suspendAudio();
        } else {
          resumeAudio();
        }
      });
    } catch {
      // Safe no-op on web
    }

    try {
      backListener = CapApp.addListener('backButton', () => {
        handleHardwareBack();
      });
    } catch {
      // Safe no-op on web
    }

    return () => {
      if (stateListener?.remove) stateListener.remove();
      if (backListener?.remove) backListener.remove();
    };
  }, [handleHardwareBack]);

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
