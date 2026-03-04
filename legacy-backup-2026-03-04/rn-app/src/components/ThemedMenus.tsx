import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { PersonaMenu } from '../PersonaApp';
import { AnimalCrossingMenu } from '../AnimalCrossingApp';

export { PersonaMenu, AnimalCrossingMenu };

export const MinecraftMenu = ({ logic }: { logic: any }) => (
    <View style={styles.mcContainer}>
        <View style={styles.mcTitleContainer}>
            <Text style={styles.mcTitle}>MINECRAFT</Text>
            <Text style={styles.mcEdition}>PHANTOM EDITION</Text>
        </View>
        <View style={styles.mcMenu}>
            <Pressable onPress={() => logic.setView('game')} style={styles.mcButton}>
                <Text style={styles.mcButtonText}>Play Mission</Text>
            </Pressable>
            <View style={styles.mcButtonDisabled}>
                <Text style={styles.mcButtonTextDisabled}>Options</Text>
            </View>
            <View style={styles.mcButtonDisabled}>
                <Text style={styles.mcButtonTextDisabled}>Quit Game</Text>
            </View>
        </View>
    </View>
);
export const DanganronpaMenu = ({ logic }: { logic: any }) => (
    <View style={styles.drContainer}>
        <View style={styles.drHeader}>
            <Text style={styles.drTitle}>ULTIMATE_DECISION</Text>
        </View>
        <Pressable onPress={() => logic.setView('game')} style={styles.drButton}>
            <View style={styles.drButtonInner}>
                <Text style={styles.drButtonText}>EXECUTE_MISSION</Text>
            </View>
            <View style={styles.drPinkBar} />
        </Pressable>
        <View style={styles.drAbstract1} />
        <View style={styles.drAbstract2} />
    </View>
);

export const OmoriMenu = ({ logic }: { logic: any }) => (
    <View style={styles.omoriContainer}>
        <View style={styles.omoriBorder}>
            <Text style={styles.omoriTitle}>WELCOME TO WHITE SPACE</Text>
            <Pressable onPress={() => logic.setView('game')} style={styles.omoriOption}>
                <Text style={styles.omoriOptionText}>START</Text>
            </Pressable>
            <View style={styles.omoriSketchLine} />
            <Text style={styles.omoriSubtext}>Waiting for something to happen?</Text>
        </View>
    </View>
);
export const KirbyMenu = ({ logic }: { logic: ReturnType<typeof useGameLogic> }) => (
    <View style={[styles.menu, { backgroundColor: '#ffb5d8' }]}><Text style={styles.text}>Kirby Menu Placeholder</Text></View>
);
export const PokemonMenu = ({ logic }: { logic: any }) => (
    <View style={styles.pkContainer}>
        <View style={styles.pkDialog}>
            <View style={styles.pkDialogInner}>
                <Text style={styles.pkText}>Welcome! What would you like to do today?</Text>
            </View>
        </View>
        <View style={styles.pkMenuContainer}>
            <Pressable onPress={() => logic.setView('game')} style={styles.pkMenuOption}>
                <Text style={styles.pkMenuText}>▶ START MISSION</Text>
            </Pressable>
            <View style={styles.pkMenuOption}>
                <Text style={styles.pkMenuText}>  CANCEL</Text>
            </View>
        </View>
    </View>
);
export const SkyrimMenu = ({ logic }: { logic: ReturnType<typeof useGameLogic> }) => (
    <View style={[styles.menu, { backgroundColor: '#444444' }]}><Text style={styles.text}>Skyrim Menu Placeholder</Text></View>
);

const styles = StyleSheet.create({
    menu: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { color: 'white', fontWeight: '900', fontSize: 24, textAlign: 'center' },
    // Danganronpa Styles
    drContainer: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        padding: 30,
    },
    drHeader: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    drTitle: {
        color: '#ff00ff',
        fontSize: 32,
        fontWeight: '900',
        letterSpacing: 2,
        textShadowColor: 'rgba(255, 0, 255, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    drButton: {
        backgroundColor: '#FFF',
        height: 80,
        justifyContent: 'center',
        transform: [{ skewX: '-20deg' }],
        borderLeftWidth: 10,
        borderLeftColor: '#ff00ff',
        position: 'relative',
    },
    drButtonInner: {
        paddingLeft: 30,
    },
    drButtonText: {
        color: '#000',
        fontSize: 28,
        fontWeight: '900',
        transform: [{ skewX: '20deg' }],
    },
    drPinkBar: {
        position: 'absolute',
        right: -20,
        top: 0,
        bottom: 0,
        width: 15,
        backgroundColor: '#ff00ff',
    },
    drAbstract1: {
        position: 'absolute',
        bottom: -50,
        right: -50,
        width: 200,
        height: 200,
        backgroundColor: '#ff00ff',
        opacity: 0.2,
        transform: [{ rotate: '45deg' }],
    },
    drAbstract2: {
        position: 'absolute',
        top: -30,
        left: -30,
        width: 100,
        height: 100,
        borderWidth: 2,
        borderColor: '#ff00ff',
        opacity: 0.3,
        transform: [{ rotate: '15deg' }],
    },
    // Omori Styles
    omoriContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    omoriBorder: {
        width: '100%',
        padding: 40,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
    },
    omoriTitle: {
        fontSize: 20,
        fontWeight: '400',
        color: '#000',
        marginBottom: 40,
        textAlign: 'center',
        letterSpacing: 1,
    },
    omoriOption: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderWidth: 1,
        borderColor: '#000',
    },
    omoriOptionText: {
        fontSize: 18,
        color: '#000',
        fontWeight: '500',
    },
    omoriSketchLine: {
        width: 150,
        height: 1,
        backgroundColor: '#000',
        marginVertical: 40,
        opacity: 0.5,
    },
    omoriSubtext: {
        fontSize: 12,
        color: '#888',
        fontStyle: 'italic',
    },
    // Minecraft Styles
    mcContainer: {
        flex: 1,
        backgroundColor: '#4c4c4c',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mcTitleContainer: {
        marginBottom: 50,
        alignItems: 'center',
    },
    mcTitle: {
        fontSize: 40,
        fontWeight: '900',
        color: '#FFF',
        textShadowColor: '#000',
        textShadowOffset: { width: 4, height: 4 },
        textShadowRadius: 1,
    },
    mcEdition: {
        color: '#ffff00',
        fontSize: 16,
        fontWeight: '700',
        transform: [{ rotate: '-10deg' }],
        marginTop: -10,
    },
    mcMenu: {
        width: '80%',
        gap: 10,
    },
    mcButton: {
        backgroundColor: '#6b6b6b',
        borderWidth: 2,
        borderTopColor: '#b0b0b0',
        borderLeftColor: '#b0b0b0',
        borderBottomColor: '#2d2d2d',
        borderRightColor: '#2d2d2d',
        paddingVertical: 12,
        alignItems: 'center',
    },
    mcButtonDisabled: {
        backgroundColor: '#4a4a4a',
        borderWidth: 2,
        borderColor: '#333',
        paddingVertical: 12,
        alignItems: 'center',
        opacity: 0.5,
    },
    mcButtonText: {
        color: '#FFF',
        fontSize: 18,
        textShadowColor: '#000',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
    },
    mcButtonTextDisabled: {
        color: '#a0a0a0',
        fontSize: 18,
    },
    // Pokemon Styles
    pkContainer: {
        flex: 1,
        backgroundColor: '#74c365', // Grass color
        justifyContent: 'flex-end',
        padding: 10,
    },
    pkDialog: {
        backgroundColor: '#FFF',
        borderWidth: 4,
        borderColor: '#225588', // Classic blue
        borderRadius: 10,
        padding: 4,
        height: 120,
        marginBottom: 20,
    },
    pkDialogInner: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#88aadd',
        borderRadius: 6,
        padding: 15,
    },
    pkText: {
        fontSize: 18,
        color: '#333',
        fontWeight: '600',
        lineHeight: 24,
    },
    pkMenuContainer: {
        backgroundColor: '#FFF',
        borderWidth: 4,
        borderColor: '#225588',
        borderRadius: 10,
        padding: 10,
        width: '60%',
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    pkMenuOption: {
        paddingVertical: 8,
    },
    pkMenuText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
    },
});
