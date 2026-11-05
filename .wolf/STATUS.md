---
description: session handoff, regenerate with /handoff when a quest finishes
budget_tokens: 1000
---
# STATUS — All★Star Infinity

> Single source of truth for resuming work. Read this FIRST when starting a session.
> Last updated: 2026-11-05 (Themed Minigame Chooser, Per-Theme Timers, Hardware Back Button, Platform Insets, & allstarinfinity_ migration complete)

---

## ✅ Done

- **Per-Theme Minigame Chooser (`ThemedMinigameChooser.tsx`):**
  - Allows in-game switching between all 5 minigames (Truth or Dare, Never Have I Ever, Most Likely To, Would You Rather, Hot Seat).
  - Custom UI implementations for all 19 themes (Undertale 8-bit, FNAF terminal, Sonic skewed Bangers, Persona 5 tactical red/black, Minecraft stone/wood, Animal Crossing pastel, Cyberpunk neon, Danganronpa trial, Omori sketchbook, Kirby Dreamland, Pokemon GBA battle, Skyrim Elder Scrolls, Sanrio kawaii, Fallout Pip-Boy, Hazbin Art Deco, Vocaloid synth, Iruma Babyls, Arcane Hextech, Billy Hatcher morning egg).
  - Integrated into `UnifiedGame.tsx` top bar with authentic themed switch buttons.
- **Per-Theme Visual Countdown Timer (`CountdownTimer.tsx`):**
  - Bespoke visual styles across all 19 themes (fonts, borders, colors, icons, and status labels) matching each realm's identity.
  - Replaced generic dark pills with authentic theme-specific indicators and popovers.
  - Synthesizer sound integration (ticks, countdown beeps, buzzer) and haptics.
- **Android Hardware Back Button Handler (`@capacitor/app`):**
  - Multi-tier prioritized hardware back button stack in `src/App.tsx`:
    1. Active card prompt → returns to intensity selector.
    2. Selected intensity → clears intensity.
    3. Player setup view → returns to main menu.
    4. Non-play game tab → switches back to 'play' tab.
    5. Play tab with no prompt → returns to main menu.
    6. Main menu → double-tap back within 2 seconds exits app.
- **Notch, Cutout & Safe Area Insets:**
  - CSS variables `--sat`, `--sar`, `--sab`, `--sal` defined in `index.html` with `env(safe-area-inset-*)` fallbacks.
  - `viewport-fit=cover` active in viewport meta tag.
- **Screen Orientation Lock (Portrait-First Party Flow):**
  - Set `android:screenOrientation="portrait"` on MainActivity in `AndroidManifest.xml`.
- **Background Audio & Interval Suspension (`appStateChange`):**
  - Connected `App.addListener('appStateChange')` in `App.tsx` to `suspendAudio()` / `resumeAudio()` in `soundFx.ts`.
- **Persistent Game History Storage (`allstarinfinity_history`):**
  - Last 50 drawn prompts persisted to `localStorage` across app restarts.
  - Added "🗑️ Clear" action button with confirmation in the Archives/History tab.
- **Universal Storage Prefix Migration (`phantom_` $\rightarrow$ `allstarinfinity_`):**
  - Renamed all 19 `phantom_*` keys in `src/hooks/useGameLogic.ts` to `allstarinfinity_*` with graceful legacy migration via `getStorageItem`.
  - App internal title updated to `All★Star Infinity`.
- **Build & Native Android:**
  - `npx tsc --noEmit` $\rightarrow$ 0 errors.
  - `npm run build` $\rightarrow$ clean production build (2.9s).
  - `npx cap sync android` $\rightarrow$ synced assets & plugins (`@capacitor/app` 8.1.2, `@capacitor/haptics` 8.0.2).
  - `./gradlew assembleDebug` $\rightarrow$ `BUILD SUCCESSFUL in 6s` (`app-debug.apk`).

---

## 🚀 Next phase

**Goal:** Theme Visual Polish, Release Packaging & Design QC.

### Priority order
1. 🟡 **Visual Design Review:** Test/inspect in-game screens across all 19 themes with the new minigame chooser and timers.
2. 🟢 **App Branding & Release Packaging:** Release keystore signing configuration, adaptive icons, and launch splash screen.

---

## 📁 Active architecture

- **Stack:** React 19, TypeScript 5.8, Vite 6, Framer Motion 12, Capacitor 8 (Android)
- **Zero AI Guarantee:** 100% handcrafted assets, prompts, and code. No AI runtime dependencies.
- **Platform:** Hardware back button, safe area insets, portrait lock, background audio lifecycle via `@capacitor/app`.
- **Storage Prefix:** `allstarinfinity_*` universal internal prefix with automatic backward-compatibility migration.
- **Android Target:** Gradle 8.14.3, AGP 8.13.0, JDK 22 configured in `android/gradle.properties`. Output APK at `android/app/build/outputs/apk/debug/app-debug.apk`.
