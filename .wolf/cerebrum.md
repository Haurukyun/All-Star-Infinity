---
description: learned preferences, project conventions, and Do-Not-Repeat rules
budget_tokens: 2000
---
# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-11-04 (Pass & Play Mode & Countdown Timer added)

## User Preferences

- **ZERO AI CONTENT / ASSETS RULE (CRITICAL):** NEVER generate AI assets, AI art, or suggest AI prompts. The app must NOT rely on AI at any point for content, assets, or gameplay. Everything must be 100% handcrafted, authored, and offline-first.
- **Party Rule Preset Toggle (Sips vs Physical Dares):** User explicitly dislikes this suggestion. Do NOT implement or re-suggest.
- **Communication:** Explain decisions clearly with context.
- **Ambition over caution:** Prioritize polish, cool animations, and thematic fidelity.
- **Agent directing:** Be proactive — verify real state with compiler/build tools rather than relying on stale text logs.
- **Commit Standards:** ALWAYS include a clear commit title and an itemized description of what has been done and when in every commit.

## Key Learnings

- **Project:** All★Star Infinity (`com.allstarinfinity.app`)
- **Philosophy:** 100% offline-first, handcrafted party game. No AI generation, no network dependency for core play.
- **Architecture:** React 19 + Vite 6 + Capacitor 8 Android.
- **Content:** 225 handcrafted prompts in `src/services/localPrompts.ts` across all 9 categories with custom penalties.
- **Pass & Play Flow:** Pre-game party roster configuration screen (`PlayerSetup.tsx`), active turn banner with targeting and chicken tracking (`PlayerTurnBanner.tsx`), fully integrated with `UnifiedGame.tsx` and `MainMenu.tsx`.
- **Countdown Timer:** Default OFF, togglable via top-corner floating pill on Play screen and Settings tab. 15s/30s/60s durations with pulse (<5s) and shake alarm at 0s.
- **Duplicate Prevention:** `useGameLogic.ts` filters out current prompt when drawing to prevent immediate repeats.
- **Android Gradle Version:** AGP 8.13.0 requires Gradle 8.14.3. Gradle 9.6+ removes internal APIs that break AGP 8.x.
- **Android SDK:** Configured via `android/local.properties` pointing to `C:\Users\Hauru\AppData\Local\Android\Sdk`.
- **APK Output:** `./gradlew assembleDebug` builds `android/app/build/outputs/apk/debug/app-debug.apk` (4.38 MB).

## Do-Not-Repeat

- **[2026-11-04]** NEVER generate AI assets, AI art, or suggest AI prompts. Do not re-add AI SDKs or network dependencies for content.
- **[2026-11-04]** Do NOT implement the "Party Rule Preset Toggle (Sips vs Dares)" — user explicitly dislikes this.
- **[2026-11-04]** Do NOT upgrade Gradle wrapper to 9.6+ while on Android Gradle Plugin 8.x — it causes `InternalProblems` missing API crash. Stick to `gradle-8.14.3-all.zip`.
- **[2026-11-04]** Do NOT commit `android/local.properties` (kept in `.gitignore`).
- **[2026-11-04]** Never make vague or one-liner commits. Always provide a clear title and bulleted description of changes and timestamps.

## Decision Log

- **[2026-11-04]** Removed `@google/genai` dependency and environment defines in `vite.config.ts`. Established permanent strict rule: 100% human-crafted prompts, art, and gameplay only.
- **[2026-11-04]** Expanded prompt library to 225 handcrafted party prompts (25 per combination) ensuring high replayability out of the box without requiring internet or API keys.
- **[2026-11-04]** Standardized Gradle distribution to 8.14.3 ensuring native Android compilation succeeds on Java 25.
- **[2026-11-04]** Implemented Pass & Play Player Roster Mode with `PlayerSetup.tsx`, turn targeting, chicken penalty tracker, and persistent roster in `useGameLogic.ts`.
- **[2026-11-04]** Implemented optional Countdown Timer (default OFF, togglable via corner pill or Settings tab; 15s/30s/60s with 5s red pulse and 0s vibration/shake).
