---
description: learned preferences, project conventions, and Do-Not-Repeat rules
budget_tokens: 2000
---
# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-11-04 (Cleanup & Build Restoration completed)

## User Preferences

- **Communication:** Explain decisions clearly with context.
- **Ambition over caution:** Prioritize polish, cool animations, and thematic fidelity.
- **Agent directing:** Be proactive — verify real state with compiler/build tools rather than relying on stale text logs.
- **Commit Standards:** ALWAYS include a clear commit title and an itemized description of what has been done and when in every commit.

## Key Learnings

- **Project:** All★Star Infinity (`com.allstarinfinity.app`)
- **Architecture:** React 19 + Vite 6 + Capacitor 8 Android.
- **Theme system architecture:** `ThemeDefinition` in `src/types.ts` has slot-based overrides (MenuComponent, LayoutComponent, PlayScreen, etc.). Central registry in `src/themes/index.ts`. Metadata (font, color, icon, label) in `allThemesList.ts`. All 19 themes are modularized in `src/themes/*Theme.tsx`.
- **State management:** `useGameLogic` hook handles game mode, intensity, active deck, custom decks, and theme selection with localStorage persistence (`phantom_theme`, `phantom_custom_decks`).
- **Cleaned directories:** `RESTORATION PROJECT/` and `rn-app/` were fully superseded by `src/` and safely removed. Dead root-level `services/` removed.
- **Build Status:** 100% clean build (`npm run build` ~2.3s, `npx tsc --noEmit` 0 errors, `npx cap sync android` syncs in 0.1s).
- **Remaining Need:** Prompt content volume (`src/services/localPrompts.ts` currently only has 19 default prompts).

## Do-Not-Repeat

- **[2026-11-04]** Do NOT assume old log files (`build.txt`, `errors.txt`) reflect current state without running compiler checks — `SanrioTheme.tsx` was already fixed in git, and the real blocker was missing `@types/react` and TypeScript interfaces.
- **[2026-11-04]** In Framer Motion 12 with TypeScript, always write transition types as literals (`type: 'spring' as const`, `ease: 'easeInOut' as const`) to prevent TS2322.
- **[2026-11-04]** In `DeckSearchModal`, keep styling properties like `cardBg`, `borderColor`, and `fontFamily` optional so theme-level style overrides remain flexible.
- **[2026-11-04]** In `tsconfig.json`, always maintain explicit `include` and `exclude` paths so root tools do not attempt to typecheck unrelated directories.
- **[2026-11-04]** Never make vague or one-liner commits. Always provide a clear title and bulleted description of changes and timestamps.

## Decision Log

- **[2026-11-04]** Added universal commit policy: every commit must contain a title and detailed description of changes and timestamps.
- **[2026-11-04]** Removed `RESTORATION PROJECT/` after thorough verification: all 19 themes, custom deck carousels, and styles are fully intact in `src/themes/`.
- **[2026-11-04]** Removed `rn-app/` and root `services/` as dead code. The active app is purely the Vite/Capacitor stack in `src/`.
- **[2026-11-04]** Added comprehensive `.gitignore` rules for Android build outputs (`android/.gradle/`, `android/build/`, `android/app/build/`, etc.), environment files, and OS noise.
