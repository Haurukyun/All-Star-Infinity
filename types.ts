
export enum Intensity {
  SOFT = 'SOFT',
  HOT = 'HOT',
  VULGAR = 'VULGAR'
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
