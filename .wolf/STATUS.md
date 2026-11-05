---
description: session handoff, regenerate with /handoff when a quest finishes
budget_tokens: 1000
---
# STATUS — All★Star Infinity

> Single source of truth for resuming work. Read this FIRST when starting a session.
> Last updated: 2026-11-05 (Tier 3: Full per-theme visual adaptation – PlayerSetup, PlayerTurnBanner, PartyAwardsModal, CountdownTimer, UnifiedGame top bar)

---

## ✅ Done

- **Tier 3: Per-Theme Visual Adaptation & Strict Aesthetic Integrity (all 19 themes):**
  - **Omori Black Space (Vulgar) Contrast & Box Theming (`OmoriTheme.tsx`, `PlayerTurnBanner.tsx`, `CountdownTimer.tsx`, `UnifiedGame.tsx`):**
    - Fixed CSS cascade bug where `.omori-card` forced `color: #000 !important`, causing text to disappear completely on black background. All prompt text, penalties, tags, and borders now dynamically render `#ff0000` on Black Space and `#ffffff` on Headspace.
    - `OmoriLayout` header, main, and nav dynamically transform to black/red on Vulgar and purple/white on Hot.
    - Top bar (`getThemedModeButton`, `getThemedAwardsButton`), timer (`CountdownTimer`), and turn banner (`PlayerTurnBanner`) now strictly adapt to Omori Black Space (black background with red sketchy border `#ff0000`) instead of floating as a white paper box.
  - **Universal Emoji Purge & Theme-Native Glyphs (`PlayerTurnBanner.tsx`, `PartyAwardsModal.tsx`, `UnifiedGame.tsx`, `CountdownTimer.tsx`, `PlayerSetup.tsx`):**
    - Eradicated all out-of-place cartoon emojis (🎮, 🎯, 🐔, 👥, 🏆, 🛡️, 🔥, ⚡) across retro, indie, and terminal themes.
    - Replaced with theme-native typographic glyphs (`themeIcons`):
      - Undertale: 8-bit text symbols (`❤`, `*`, `×`, `♦`, `★`) and `Fled` forfeits.
      - Omori: Minimalist hand-drawn symbols (`○`, `→`, `!`, `▪`, `★`) and `Forfeit`.
      - FNAF: Security CRT terminal ASCII (`●`, `▶`, `!`, `■`) and `Aborted`.
      - Fallout: Pip-Boy radioactive terminal glyphs (`►`, `→`, `☠`, `◉`).
      - Cyberpunk: High-tech terminal prompts (`>`, `>>`, `//X`, `::`, `◈`).
      - Persona: Shujin tactical glyphs (`★`, `→`, `☠`, `♠`).
      - Minecraft: Pixel glyphs (`◆`, `→`, `×`, `▪`) and `Yield`.
      - Skyrim: Elder stone symbols (`†`, `→`, `‡`, `⚔`).
- **Tier 2: Gameplay Depth & Multiplayer Party Mechanics:**
  - **Would You Rather Live Room Vote Tally (`UnifiedGame.tsx`):**
    - Multi-player voting chips with live vote split (Option A vs Option B).
    - Automatic minority option identification & "Assign Minority Forfeit" one-click action.
  - **Most Likely To Room Pointing Leaderboard (`UnifiedGame.tsx`):**
    - Post-countdown player target chips to record who received the most fingers pointed at them.
    - Animated "Enforce Forfeit" button with buzzer sound & heavy haptic feedback.
  - **The Hot Seat Configurable Timer (`UnifiedGame.tsx`):**
    - User choice of 3 round durations: ⚡ 30s Blitz, 🔥 60s Standard, or 🧨 90s Marathon.
  - **Player Avatars & Color Badges (`PlayerSetup.tsx`, `PlayerTurnBanner.tsx`, `types.ts`):**
    - Added retro avatars (🦊, 🐉, ⚡, 💎, 💀, 👑, 🐱, 🚀, 🎭, 🎮, 🔥, 🌸) and color options to `Player`.
    - Avatar/color picker in `PlayerSetup.tsx`, rendered on turn banners, roster chips, and voting tallies.
  - **Strategic Re-Roll / Double Stakes (`useGameLogic.ts`, `UnifiedGame.tsx`):**
    - "Double or Nothing Re-Roll" option with pulsing 2x penalty badge and +2 chicken forfeit risk.
  - **Chaos Mode / Randomized Fair Turn Order (`useGameLogic.ts`, `PlayerSetup.tsx`):**
    - "🎲 Chaos Turn Order" toggle with fair shuffle bag algorithm (unpredictable order without repeating).
  - **End-of-Game Party Awards Ceremony (`PartyAwardsModal.tsx`):**
    - Full podium celebration modal awarding 🛡️ The Iron Will, 🐔 The Biggest Chicken, and 🔥 The Hot Seat Master.
    - Procedural fanfare audio cue (`soundService.fanfare()`) and success haptics.
  - **Deck Loop Reshuffle Alert Banner (`UnifiedGame.tsx`, `useGameLogic.ts`):**
    - In-game notification banner notifying players when all cards in a deck category have been seen and reshuffled.
- **Tier 1: Mobile UX & Android Integration:**
  - Per-theme minigame chooser (`ThemedMinigameChooser.tsx`) for all 19 themes.
  - Per-theme countdown timers (`CountdownTimer.tsx`) for all 19 themes.
  - Android hardware back button handler (`@capacitor/app`).
  - Notch/cutout safe area insets & portrait lock.
  - Audio background suspension & persistent history storage.
  - Universal prefix migration: `allstarinfinity_*`.
- **Build & Verification:**
  - `npx tsc --noEmit` $\rightarrow$ 0 errors.
  - `npm run build` $\rightarrow$ clean production build (3.0s).
  - `npx cap sync android` $\rightarrow$ synced cleanly.
  - `./gradlew assembleDebug` $\rightarrow$ `BUILD SUCCESSFUL in 4s` (`app-debug.apk`).

---

## 🚀 Next phase

**Goal:** Tier 4: Theme-Specific Visual Frames for New Game Modes.

### Priority order
1. 🟡 **Custom container/card styling for Would You Rather, Most Likely To & Hot Seat** across all 19 themes (vote tally chips, countdown buttons, scoring cards).
2. 🟡 **Hot Seat speedrun top-clock** (`⏰ {hotSeatTimeLeft}s` block) needs per-theme font/color (currently generic mono red).
3. 🟢 **Theme Tab Bar Micro-Animations & Release Packaging:** Adaptive app icons and release keystore signing.

---

## 📁 Active architecture

- **Stack:** React 19, TypeScript 5.8, Vite 6, Framer Motion 12, Capacitor 8 (Android)
- **Zero AI Guarantee:** 100% handcrafted assets, prompts, and code. No AI runtime dependencies.
- **Multiplayer Party Engine:** Live room voting, chaos turn shuffle, double stakes, player avatars/colors, and party awards ceremony.
- **Android Target:** Gradle 8.14.3, AGP 8.13.0, JDK 22. Output APK at `android/app/build/outputs/apk/debug/app-debug.apk`.
