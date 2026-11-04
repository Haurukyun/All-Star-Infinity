---
description: learned preferences, project conventions, and Do-Not-Repeat rules
budget_tokens: 2000
---
# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-11-04 (Haptics, QR Deck Sharing, Easy Font, Themed Packs added)

## User Preferences

- **ZERO AI CONTENT / ASSETS RULE (CRITICAL):** NEVER generate AI assets, AI art, or suggest AI prompts. The app must NOT rely on AI at any point for content, assets, or gameplay. Everything must be 100% handcrafted, authored, and offline-first.
- **Theme Aesthetic Preservation (CRITICAL):** Every single theme has its own aesthetic and rules that must not be broken or altered. Any new features must integrate into each theme's unique vibe, palette, and layout respectfully.
- **Party Rule Preset Toggle (Sips vs Physical Dares):** User explicitly dislikes this suggestion. Do NOT implement or re-suggest.
- **Communication:** Explain decisions clearly with context.
- **Ambition over caution:** Prioritize polish, cool animations, and thematic fidelity.
- **Agent directing:** Be proactive — verify real state with compiler/build tools rather than relying on stale text logs.
- **Commit Standards:** ALWAYS include a clear commit title and an itemized description of what has been done and when in every commit.

## Key Learnings

- **Project:** All★Star Infinity (`com.allstarinfinity.app`)
- **Philosophy:** 100% offline-first, handcrafted party game. No AI generation, no network dependency for core play.
- **Architecture:** React 19 + Vite 6 + Capacitor 8 Android.
- **Native Haptics:** Installed `@capacitor/haptics` with multi-tier tactile feedback (`light`, `medium`, `heavy`, `warning`, `error`, `success`) and `navigator.vibrate` web fallback in `src/services/haptics.ts`.
- **Easy Font Mode:** Persisted to `localStorage` (`phantom_easy_font`). Swaps stylized display/pixel fonts with crisp high-legibility sans-serif via global `.easy-font-mode` while preserving 100% of each theme's borders, shadows, skews, colors, and layout.
- **QR Code & Short Code Deck Sharing:** Implemented in `src/services/deckShare.ts` and `src/components/DeckShareModal.tsx` using `qrcode` for offline image generation and base64 `ASI:1:` serialization.
- **Pre-Built Themed Packs:** 10 authentic lore-accurate expansion decks in `src/services/themedDecks.ts` for Persona 5, Undertale, Cyberpunk, Minecraft, Danganronpa, Animal Crossing, Sanrio, Skyrim, and Arcane.
- **Android Gradle Version:** AGP 8.13.0 + Gradle 8.14.3. Configured `org.gradle.java.home=C:\\Program Files\\Java\\jdk-22` in `android/gradle.properties` to ensure daemon compilation stability.
- **APK Output:** `./gradlew assembleDebug` builds `android/app/build/outputs/apk/debug/app-debug.apk` (4.5 MB).

## Do-Not-Repeat

- **[2026-11-04]** NEVER generate AI assets, AI art, or suggest AI prompts. Do not re-add AI SDKs or network dependencies for content.
- **[2026-11-04]** Do NOT break theme aesthetics. Easy font must only modify font-family, keeping colors, shapes, badges, and layout untouched.
- **[2026-11-04]** Do NOT implement the "Party Rule Preset Toggle (Sips vs Dares)" — user explicitly dislikes this.
- **[2026-11-04]** Do NOT upgrade Gradle wrapper to 9.6+ while on Android Gradle Plugin 8.x. Keep `gradle-8.14.3-all.zip`.
- **[2026-11-04]** Do NOT commit `android/local.properties` (kept in `.gitignore`).
- **[2026-11-04]** Never make vague or one-liner commits. Always provide a clear title and bulleted description of changes and timestamps.

## Decision Log

- **[2026-11-04]** Removed `@google/genai` dependency and environment defines in `vite.config.ts`. Established permanent strict rule: 100% human-crafted prompts, art, and gameplay only.
- **[2026-11-04]** Expanded prompt library to 225 handcrafted party prompts (25 per combination) ensuring high replayability out of the box without requiring internet or API keys.
- **[2026-11-04]** Standardized Gradle distribution to 8.14.3 ensuring native Android compilation succeeds on Java 22/25.
- **[2026-11-04]** Implemented Pass & Play Player Roster Mode with `PlayerSetup.tsx`, turn targeting, chicken penalty tracker, and persistent roster in `useGameLogic.ts`.
- **[2026-11-04]** Implemented optional Countdown Timer (default OFF, togglable via corner pill or Settings tab; 15s/30s/60s with 5s red pulse and 0s vibration/shake).
- **[2026-11-04]** Implemented Native Haptic Feedback (`@capacitor/haptics` + `navigator.vibrate` fallback) across cards, penalties, timers, and buttons.
- **[2026-11-04]** Implemented offline Deck Export/Import via QR Code (`qrcode`) and `ASI:1:` short code string with live preview card.
- **[2026-11-04]** Implemented global persistence for "Easy Font Mode" with universal non-destructive accessibility overrides across all 19 themes.
- **[2026-11-04]** Created 10 handcrafted, lore-rich Pre-Built Themed Deck Packs with in-game browser, direct play, cloning, and QR export.
