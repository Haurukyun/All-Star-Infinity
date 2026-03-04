
import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Theme } from '../types';
import { useTheme } from '../theme/ThemeContext';

const UNIFIED_THEMES = [
    { id: Theme.SONIC, label: 'SONIC' },
    { id: Theme.PERSONA, label: 'PERSONA' },
    { id: Theme.FALLOUT, label: 'FALLOUT' },
    { id: Theme.FNAF, label: 'FNAF' },
    { id: Theme.ANIMAL_CROSSING, label: 'ANIMAL' },
    { id: Theme.MINECRAFT, label: 'MC' },
    { id: Theme.KIRBY, label: 'KIRBY' },
    { id: Theme.POKEMON, label: 'PKMN' },
    { id: Theme.ARCANE, label: 'ARCANE' },
    { id: Theme.VOCALOID, label: 'VOCA' }
];

const ThemeSelector: React.FC = () => {
    const { setTheme, currentThemeDefinition } = useTheme();

    useEffect(() => {
        console.log('--- NATIVE THEME SELECTOR MOUNTED ---');
        console.log('ThemeSelector is mounting NOW (NATIVE)');
        console.log('Current context theme:', currentThemeDefinition.name);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerLabel}>DEBUG SELECTOR (NATIVE)</Text>
                <Text style={styles.currentTheme}>Active: {currentThemeDefinition.name}</Text>
            </View>

            <ScrollView style={styles.list} showsVerticalScrollIndicator={true}>
                {UNIFIED_THEMES.map((t) => (
                    <Pressable
                        key={t.id}
                        onPress={() => {
                            console.log('Switching Native Theme:', t.label);
                            setTheme(t.id);
                        }}
                        style={[
                            styles.item,
                            currentThemeDefinition.id === t.id && styles.itemActive
                        ]}
                    >
                        <Text style={[
                            styles.itemText,
                            currentThemeDefinition.id === t.id && styles.itemTextActive
                        ]}>
                            {t.label}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 40,
        right: 20,
        width: 180,
        maxHeight: 500,
        backgroundColor: 'red',
        borderRadius: 12,
        borderWidth: 4,
        borderColor: 'yellow',
        zIndex: 9999,
        elevation: 9999,
        padding: 10,
        overflow: 'hidden',
    },
    header: {
        marginBottom: 8,
        paddingBottom: 4,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.3)',
    },
    headerLabel: {
        fontSize: 10,
        color: 'white',
        fontWeight: 'bold',
    },
    currentTheme: {
        fontSize: 12,
        color: '#FFF',
        fontWeight: '700',
    },
    list: {
        flex: 1,
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 6,
        marginBottom: 6,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    itemActive: {
        backgroundColor: '#FFF',
    },
    itemText: {
        fontSize: 12,
        color: 'white',
        fontWeight: '600',
    },
    itemTextActive: {
        color: '#000',
        fontWeight: '900',
    }
});

export default ThemeSelector;
