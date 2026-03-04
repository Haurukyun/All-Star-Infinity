/**
 * allThemesList.ts
 *
 * Central source of truth for all theme metadata used across:
 *  - ThemesScreen renderers (replaces hardcoded per-file arrays)
 *  - getThemeFont in MainMenu.tsx (replaces the switch statement)
 *
 * HOW TO ADD A NEW THEME:
 *  1. Create your new theme file (e.g., `src/themes/MyTheme.tsx`)
 *  2. Add an entry to the `allThemesList` array below.
 *  3. Register the theme's ThemeDefinition in `src/themes/index.ts`.
 *  4. Add the Theme enum value in `src/types.ts`.
 *  That's it — no other files need manual edits for the list or font mapping.
 */

import { Theme } from '../types';

export interface ThemeMeta {
    /** Theme enum key (used as ID everywhere) */
    id: Theme;
    /** Human-readable display label shown on ThemesScreen buttons */
    label: string;
    /** Accent / brand color for this theme, as a hex string */
    color: string;
    /** Optional icon emoji shown alongside the label */
    icon?: string;
    /**
     * CSS font-family string for this theme.
     * Used by getThemeFont() in MainMenu.tsx.
     * Keep in sync with the @import in each theme's layout component.
     */
    font: string;
}

export const allThemesList: ThemeMeta[] = [
    {
        id: Theme.PERSONA,
        label: 'Persona 5',
        color: '#c41e3b',
        icon: '🃏',
        font: "'Edo', 'Edo SZ', sans-serif",
    },
    {
        id: Theme.MINECRAFT,
        label: 'Minecraft',
        color: '#4e7f2c',
        icon: '⛏️',
        font: "'Minecraft', 'Courier New', monospace",
    },
    {
        id: Theme.DANGANRONPA,
        label: 'Danganronpa',
        color: '#e71a38',
        icon: '🐻',
        font: "'Courier New', monospace",
    },
    {
        id: Theme.OMORI,
        label: 'Omori',
        color: '#000000',
        icon: '🐱',
        font: "'Gloria Hallelujah', cursive",
    },
    {
        id: Theme.KIRBY,
        label: 'Kirby',
        color: '#ff7bac',
        icon: '⭐',
        font: "'Titan One', 'Fredoka One', cursive",
    },
    {
        id: Theme.POKEMON,
        label: 'Pokémon',
        color: '#3B4CCA',
        icon: '🔴',
        font: "'Press Start 2P', monospace",
    },
    {
        id: Theme.ANIMAL_CROSSING,
        label: 'Animal Crossing',
        color: '#7ec8a0',
        icon: '🍃',
        font: "'FinkHeavy', 'Arial Rounded MT Bold', sans-serif",
    },
    {
        id: Theme.SKYRIM,
        label: 'Skyrim',
        color: '#ffffff',
        icon: '🐉',
        font: "'Cinzel', serif",
    },
    {
        id: Theme.SONIC,
        label: 'Sonic',
        color: '#1E90FF',
        icon: '💨',
        font: "'Archivo Black', sans-serif",
    },
    {
        id: Theme.SANRIO,
        label: 'Sanrio',
        color: '#FF69B4',
        icon: '🎀',
        font: "'Cherry Bomb One', cursive",
    },
    {
        id: Theme.CYBERPUNK,
        label: 'Cyberpunk',
        color: '#00FFFF',
        icon: '🌆',
        font: "'Share Tech Mono', monospace",
    },
    {
        id: Theme.UNDERTALE,
        label: 'Undertale',
        color: '#ff0000',
        icon: '❤️',
        font: "'DotGothic16', monospace",
    },
    {
        id: Theme.FALLOUT,
        label: 'Fallout',
        color: '#00ff00',
        icon: '☢️',
        font: "'Share Tech Mono', monospace",
    },
    {
        id: Theme.HAZBIN,
        label: 'Hazbin Hotel',
        color: '#e52b50',
        icon: '😈',
        font: "'Fascinate Inline', cursive",
    },
    {
        id: Theme.VOCALOID,
        label: 'Vocaloid',
        color: '#39C5BB',
        icon: '🎤',
        font: "'Orbitron', sans-serif",
    },
    {
        id: Theme.FNAF,
        label: 'FNAF',
        color: '#8B0000',
        icon: '🐻',
        font: "'VT323', monospace",
    },
    {
        id: Theme.IRUMA,
        label: 'Iruma-kun',
        color: '#ffd700',
        icon: '🦇',
        font: "'Sniglet', cursive",
    },
    {
        id: Theme.ARCANE,
        label: 'Arcane',
        color: '#9b59b6',
        icon: '⚡',
        font: "'Cinzel', serif",
    },
];

/**
 * Quick lookup map: Theme → ThemeMeta
 * Use this when you need O(1) access by theme ID.
 */
export const themeMetaMap: Map<Theme, ThemeMeta> = new Map(
    allThemesList.map((t) => [t.id, t])
);

/**
 * Returns the CSS font-family string for a given theme.
 * Drop-in replacement for the switch statement in MainMenu.tsx.
 */
export function getFontForTheme(theme: Theme): string {
    return themeMetaMap.get(theme)?.font ?? "'Bangers', cursive";
}
