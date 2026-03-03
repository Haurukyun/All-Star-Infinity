import { Theme, ThemeDefinition } from '../types';
import { SonicTheme } from './SonicTheme';
import { PersonaTheme } from './PersonaTheme';
import { MinecraftTheme } from './MinecraftTheme';
import { DanganronpaTheme } from './DanganronpaTheme';
import { OmoriTheme } from './OmoriTheme';
import { KirbyTheme } from './KirbyTheme';
import { PokemonTheme } from './PokemonTheme';
import { AnimalCrossingTheme } from './AnimalCrossingTheme';
import { SkyrimTheme } from './SkyrimTheme';
import { SanrioTheme } from './SanrioTheme';
import { CyberpunkTheme } from './CyberpunkTheme';

export const themeRegistry: Record<string, ThemeDefinition> = {
    [Theme.SONIC]: SonicTheme,
    [Theme.PERSONA]: PersonaTheme,
    [Theme.MINECRAFT]: MinecraftTheme,
    [Theme.DANGANRONPA]: DanganronpaTheme,
    [Theme.OMORI]: OmoriTheme,
    [Theme.KIRBY]: KirbyTheme,
    [Theme.POKEMON]: PokemonTheme,
    [Theme.ANIMAL_CROSSING]: AnimalCrossingTheme,
    [Theme.SKYRIM]: SkyrimTheme,
    [Theme.SANRIO]: SanrioTheme,
    [Theme.CYBERPUNK]: CyberpunkTheme,
};

export const getThemeDefinition = (theme: Theme): ThemeDefinition => {
    return themeRegistry[theme] || themeRegistry[Theme.SONIC]; // Fallback to Sonic
};
