---
description: learned preferences, project conventions, and Do-Not-Repeat rules
budget_tokens: 2000
---
# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-11-04 (Content Expansion & Android Build Verified)

## User Preferences

- **Communication:** Explain decisions clearly with context.
- **Ambition over caution:** Prioritize polish, cool animations, and thematic fidelity.
- **Agent directing:** Be proactive — verify real state with compiler/build tools rather than relying on stale text logs.
- **Commit Standards:** ALWAYS include a clear commit title and an itemized description of what has been done and when in every commit.

## Key Learnings

- **Project:** All★Star Infinity (`com.allstarinfinity.app`)
- **Architecture:** React 19 + Vite 6 + Capacitor 8 Android.
- **Content:** Expanded from 19 to 225 curated prompts across all 9 intensity/gamemode combinations (25 each) with custom penalties in `src/services/localPrompts.ts`.
- **Duplicate Prevention:** `useGameLogic.ts` filters out current prompt when drawing to prevent immediate repeats.
- **Android Gradle Version:** AGP 8.13.0 requires Gradle 8.14.3. Gradle 9.6+ removes internal APIs that break AGP 8.x.
- **Android SDK:** Configured via `android/local.properties` pointing to `C:\Users\Hauru\AppData\Local\Android\Sdk`.
- **APK Output:** `./gradlew assembleDebug` builds `android/app/build/outputs/apk/debug/app-debug.apk` (4.38 MB).

## Do-Not-Repeat

- **[2026-11-04]** Do NOT upgrade Gradle wrapper to 9.6+ while on Android Gradle Plugin 8.x — it causes `InternalProblems` missing API crash. Stick to `gradle-8.14.3-all.zip`.
- **[2026-11-04]** Do NOT commit `android/local.properties` (kept in `.gitignore`).
- **[2026-11-04]** Never make vague or one-liner commits. Always provide a clear title and bulleted description of changes and timestamps.

## Decision Log

- **[2026-11-04]** Expanded prompt library to 225 party prompts (25 per combination) ensuring high replayability out of the box without requiring internet or API keys.
- **[2026-11-04]** Standardized Gradle distribution to 8.14.3 ensuring native Android compilation succeeds on Java 25.
