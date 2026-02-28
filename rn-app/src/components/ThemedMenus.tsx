import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { PersonaMenu } from '../PersonaApp';
import { AnimalCrossingMenu } from '../AnimalCrossingApp';

export { PersonaMenu, AnimalCrossingMenu };

export const MinecraftMenu = ({ logic }: { logic: ReturnType<typeof useGameLogic> }) => (
    <View style={[styles.menu, { backgroundColor: '#3c8527' }]}><Text style={styles.text}>Minecraft Menu Placeholder</Text></View>
);
export const DanganronpaMenu = ({ logic }: { logic: ReturnType<typeof useGameLogic> }) => (
    <View style={[styles.menu, { backgroundColor: '#f000ff' }]}><Text style={styles.text}>Danganronpa Menu Placeholder</Text></View>
);
export const OmoriMenu = ({ logic }: { logic: ReturnType<typeof useGameLogic> }) => (
    <View style={[styles.menu, { backgroundColor: '#000000' }]}><Text style={styles.text}>Omori Menu Placeholder</Text></View>
);
export const KirbyMenu = ({ logic }: { logic: ReturnType<typeof useGameLogic> }) => (
    <View style={[styles.menu, { backgroundColor: '#ffb5d8' }]}><Text style={styles.text}>Kirby Menu Placeholder</Text></View>
);
export const PokemonMenu = ({ logic }: { logic: ReturnType<typeof useGameLogic> }) => (
    <View style={[styles.menu, { backgroundColor: '#ffcb05' }]}><Text style={styles.text}>Pokemon Menu Placeholder</Text></View>
);
export const SkyrimMenu = ({ logic }: { logic: ReturnType<typeof useGameLogic> }) => (
    <View style={[styles.menu, { backgroundColor: '#444444' }]}><Text style={styles.text}>Skyrim Menu Placeholder</Text></View>
);

const styles = StyleSheet.create({
    menu: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { color: 'white', fontWeight: '900', fontSize: 24, textAlign: 'center' }
});
