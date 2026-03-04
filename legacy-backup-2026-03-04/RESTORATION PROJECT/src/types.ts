
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
  SKYRIM = 'Skyrim'
}

export type PromptType = 'Truth' | 'Dare';

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
