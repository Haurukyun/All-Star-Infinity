
import React from 'react';

export enum Intensity {
  SOFT = 'SOFT',
  HOT = 'HOT',
  VULGAR = 'VULGAR'
}

export enum Theme {
  NONE = 'None',
  PERSONA = 'Persona 5',
  MINECRAFT = 'Minecraft',
  DANGANRONPA = 'Danganronpa',
  OMORI = 'Omori',
  KIRBY = 'Kirby',
  POKEMON = 'Pokemon',
  ANIMAL_CROSSING = 'Animal Crossing',
  SKYRIM = 'Skyrim',
  SONIC = 'Sonic',
  SANRIO = 'Sanrio',
  CYBERPUNK = 'Cyberpunk',
  UNDERTALE = 'Undertale',
  FALLOUT = 'Fallout',
  HAZBIN = 'Hazbin',
  VOCALOID = 'Vocaloid',
  FNAF = 'Fnaf',
  IRUMA = 'Iruma',
  ARCANE = 'Arcane'
}

export enum GameMode {
  TRUTH_OR_DARE = 'TruthOrDare',
  NEVER_HAVE_I_EVER = 'NeverHaveIEver'
}

export type PromptType = 'Truth' | 'Dare' | 'NeverHaveIEver';

export interface GamePrompt {
  id: string;
  type: PromptType;
  text: string;
  intensity: Intensity;
  penalty: string;
}

export interface CustomDeck {
  id: string;
  name: string;
  description: string;
  prompts: GamePrompt[];
  isCustom: boolean;
}
export interface ThemeDefinition {
  id: Theme;
  name: string;
  cssVars: Record<string, string>;
  styles?: string;
  MenuComponent?: React.ComponentType<{ logic: any }>;
  // Slot-based overrides for unique theme visuals
  MenuLayout?: React.ComponentType<{ children: React.ReactNode; logic: any }>;
  MenuButton?: React.ComponentType<{ label: string; onClick: () => void; isPrimary?: boolean }>;
  LayoutComponent?: React.ComponentType<{ children: React.ReactNode; activeTab: string; setActiveTab: (tab: string) => void; logic: any }>;
  PlayScreen?: React.ComponentType<{ logic: any }>;
  DecksScreen?: React.ComponentType<{ logic: any }>;
  HistoryScreen?: React.ComponentType<{ logic: any }>;
  SettingsScreen?: React.ComponentType<{ logic: any }>;
  ThemesScreen?: React.ComponentType<{ logic: any }>;
  // Internal sub-slots for the default Play screen
  IntensitySelector?: React.ComponentType<{ logic: any }>;
  PromptTypeSelector?: React.ComponentType<{ logic: any }>;
  PromptDisplay?: React.ComponentType<{ logic: any }>;
  PromptLayout?: React.ComponentType<{ children: React.ReactNode; logic: any }>;
  PlayButton?: React.ComponentType<{ label: string; onClick: () => void; isPrimary?: boolean }>;
  tabLabels?: Record<string, string>;
}
