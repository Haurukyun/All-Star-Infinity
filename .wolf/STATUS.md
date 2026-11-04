---
description: session handoff, regenerate with /handoff when a quest finishes
budget_tokens: 1000
---
# STATUS — All★Star Infinity (phantom:-obsidian)

> Single source of truth for resuming work. Read this FIRST when starting a session.
> Last updated: 2026-11-04 (Zero AI Rule established, GenAI removed)

---

## ✅ Done

- **Zero AI Architecture:**
  - Removed `@google/genai` dependency and clean uninstalled.
  - Stripped `GEMINI_API_KEY` defines from `vite.config.ts`.
  - Added permanent Zero AI Content/Assets rule to `.wolf/cerebrum.md`.
- **Content Expansion (Handcrafted):**
  - Expanded `src/services/localPrompts.ts` to **225 high-quality handcrafted prompts** across all 9 matrix categories (Soft/Hot/Vulgar × Truth/Dare/NeverHaveIEver; 25 per category with custom penalties).
  - Updated `useGameLogic.ts` `handleDraw` to prevent immediate back-to-back duplicate prompt draws.
- **Android APK Build Verification:**
  - Standardized Gradle wrapper on `gradle-8.14.3-all.zip` for AGP 8.13.0 and OpenJDK 25.
  - Verified `./gradlew assembleDebug` produces working `app-debug.apk` (4.38 MB).
- **Codebase & Types:**
  - `npx tsc --noEmit` exits with **0 errors**.
  - `npm run build` exits with **0 errors** (~2.8s).
  - `npx cap sync android` syncs cleanly in <0.1s.

---

## 🚀 Next phase

**Goal:** Implement feature enhancements (audio/haptics, game modes, player pass-and-play, deck export/import) and theme polish.

### Priority order
1. 🟡 **Theme UI & Visual Pass:** Audit animations, typography, and card carousels across the 19 themes in browser.
2. 🟢 **Pass & Play / Player Roster Mode:** Add optional player names and turn tracker.
3. 🟢 **Deck Export / Import:** JSON or QR code sharing for custom user decks.
4. 🟢 **Haptic Feedback & Sound FX:** Native tactile vibrations on card draw/reveal.
5. 🟢 **App Branding & Release Packaging:** Custom app icon, adaptive splash screen, and release keystore signing.

---

## 📁 Active architecture

- **Stack:** React 19, TypeScript 5.8, Vite 6, Framer Motion 12, Capacitor 8 (Android)
- **Zero AI Guarantee:** 100% handcrafted assets, prompts, and code. No AI runtime dependencies.
- **Content:** 225 curated prompts in `src/services/localPrompts.ts` + Custom deck builder in `useGameLogic.ts`.
- **Android Target:** Gradle 8.14.3, AGP 8.13.0, Compile SDK 36, Min SDK 24. Debug APK at `android/app/build/outputs/apk/debug/app-debug.apk`.
- **Commit Pattern:** ALWAYS include a descriptive commit title and a bulleted list of what was done and when.

---

## 🔧 Useful commands

```bash
# Run web dev server
npm run dev

# Full TypeScript check
npx tsc --noEmit

# Production Vite build
npm run build

# Sync web bundle to Android native project
npx cap sync android

# Build Android debug APK
cd android; ./gradlew assembleDebug
```

---

## 📚 References

- `.wolf/cerebrum.md` — User Preferences + Do-Not-Repeat + Decision Log
- `.wolf/buglog.json` — resolved and tracked bugs
