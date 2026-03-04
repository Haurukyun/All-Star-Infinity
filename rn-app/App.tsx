
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useGameLogic } from './src/hooks/useGameLogic';
import { Theme } from './src/types';
import MainMenu from './src/MainMenu';

import PersonaApp from './src/PersonaApp';
import AnimalCrossingApp from './src/AnimalCrossingApp';

// Other Themed App Placeholders
const MinecraftApp = ({ logic }: any) => <View />;
const DanganronpaApp = ({ logic }: any) => <View />;
const OmoriApp = ({ logic }: any) => <View />;
const KirbyApp = ({ logic }: any) => <View />;
const PokemonApp = ({ logic }: any) => <View />;
const SkyrimApp = ({ logic }: any) => <View />;

import { ThemeProvider } from '../src/theme/ThemeContext';
import ThemeSelector from '../src/components/ThemeSelector';

export default function App() {
    const logic = useGameLogic();

    const renderCurrentView = () => {
        if (logic.view === 'menu') {
            return <MainMenu logic={logic} />;
        }

        switch (logic.theme) {
            case Theme.MINECRAFT: return <MinecraftApp logic={logic} />;
            case Theme.DANGANRONPA: return <DanganronpaApp logic={logic} />;
            case Theme.OMORI: return <OmoriApp logic={logic} />;
            case Theme.KIRBY: return <KirbyApp logic={logic} />;
            case Theme.POKEMON: return <PokemonApp logic={logic} />;
            case Theme.ANIMAL_CROSSING: return <AnimalCrossingApp logic={logic} />;
            case Theme.SKYRIM: return <SkyrimApp logic={logic} />;
            default: return <PersonaApp logic={logic} />;
        }
    };

    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <View style={styles.container}>
                    {renderCurrentView()}
                    <ThemeSelector />
                </View>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
});
