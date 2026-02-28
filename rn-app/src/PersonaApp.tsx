
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions } from 'react-native';
import Animated, {
    FadeIn,
    FadeOut,
    SlideInLeft,
    SlideOutRight,
    useSharedValue,
    useAnimatedStyle,
    withSpring
} from 'react-native-reanimated';
import Layout from './components/Layout';
import { Intensity, Theme, PromptType } from './types';
import { STAGES } from './constants';
import { useGameLogic } from './hooks/useGameLogic';

const { width } = Dimensions.get('window');

const PersonaApp: React.FC<{ logic: ReturnType<typeof useGameLogic> }> = ({ logic }) => {
    const {
        activeTab, setActiveTab,
        intensity, setIntensity,
        prompt, setPrompt,
        history,
        theme, setTheme,
        customDecks,
        activeDeckId, setActiveDeckId,
        handleDraw,
    } = logic;

    const renderPlayTab = () => {
        if (!intensity && !prompt) {
            return (
                <ScrollView style={styles.tabContent}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.skewBoxWhite}>
                            <Text style={styles.skewTextBlack}>SELECT SOURCE</Text>
                        </View>
                    </View>

                    <View style={styles.deckList}>
                        <Pressable
                            onPress={() => setActiveDeckId('default')}
                            style={[styles.deckItem, activeDeckId === 'default' ? styles.deckItemActive : styles.deckItemInactive]}
                        >
                            <Text style={[styles.deckText, activeDeckId === 'default' ? styles.textBlack : styles.textWhite]}>★ PHANTOM DEFAULT</Text>
                        </Pressable>
                        {customDecks.map(deck => (
                            <Pressable
                                key={deck.id}
                                onPress={() => setActiveDeckId(deck.id)}
                                style={[styles.deckItem, activeDeckId === deck.id ? styles.deckItemActive : styles.deckItemInactive]}
                            >
                                <Text style={[styles.deckText, activeDeckId === deck.id ? styles.textBlack : styles.textWhite]}>{deck.name.toUpperCase()}</Text>
                                <Text style={styles.deckSubtext}>{deck.prompts.length} CARDS FORGED</Text>
                            </Pressable>
                        ))}
                    </View>

                    <View style={styles.sectionHeader}>
                        <View style={styles.skewBoxRed}>
                            <Text style={styles.skewTextWhite}>SELECT TARGET</Text>
                        </View>
                    </View>

                    <View style={styles.stageList}>
                        {STAGES.map((stage, i) => (
                            <Pressable
                                key={stage.id}
                                onPress={() => setIntensity(stage.id as Intensity)}
                                style={[
                                    styles.stageItem,
                                    i % 2 === 0 ? styles.skewNeg6 : styles.skewPos6,
                                    { backgroundColor: stage.color }
                                ]}
                            >
                                <View style={i % 2 === 0 ? styles.skewPos6 : styles.skewNeg6}>
                                    <Text style={[styles.stageTitle, { color: stage.text }]}>{stage.title}</Text>
                                    <Text style={[styles.stageDesc, { color: stage.text, opacity: 0.6 }]}>{stage.desc}</Text>
                                </View>
                                <Text style={[styles.stageNumber, { color: stage.text, opacity: 0.1 }]}>0{i + 1}</Text>
                            </Pressable>
                        ))}
                    </View>
                </ScrollView>
            );
        }

        if (!prompt) {
            return (
                <View style={styles.selectionView}>
                    <View style={styles.headerCentered}>
                        <Text style={styles.paramsLabel}>MISSION_PARAMS</Text>
                        <Text style={styles.intensityLarge}>{intensity?.toUpperCase()}</Text>
                    </View>
                    <View style={styles.drawButtons}>
                        <Pressable onPress={() => handleDraw('Truth' as PromptType)} style={styles.drawBtnWhite}>
                            <Text style={styles.drawBtnTextBlack}>THE TRUTH</Text>
                        </Pressable>
                        <Pressable onPress={() => handleDraw('Dare' as PromptType)} style={styles.drawBtnRed}>
                            <Text style={styles.drawBtnTextWhite}>THE ACTION</Text>
                        </Pressable>
                        <Pressable onPress={() => setIntensity(null)} style={styles.abortBtn}>
                            <Text style={styles.abortText}>[ ABORT MISSION ]</Text>
                        </Pressable>
                    </View>
                </View>
            );
        }

        return (
            <Animated.View entering={FadeIn} style={styles.cardView}>
                <View style={styles.callingCard}>
                    <View style={styles.cardHeader}>
                        <View style={styles.typeTag}>
                            <Text style={styles.typeText}>{prompt.type.toUpperCase()}</Text>
                        </View>
                        <Text style={styles.logId}>ENTRY_{history.length.toString().padStart(3, '0')}</Text>
                    </View>
                    <Text style={styles.promptText}>"{prompt.text}"</Text>
                    <View style={styles.penaltyContainer}>
                        <Text style={styles.penaltyLabel}>PENALTY_LOG</Text>
                        <Text style={styles.penaltyText}>{prompt.penalty}</Text>
                    </View>
                </View>
                <View style={styles.cardActions}>
                    <Pressable onPress={() => setPrompt(null)} style={styles.actionBtnWhite}>
                        <Text style={styles.actionTextBlack}>DONE</Text>
                    </Pressable>
                    <Pressable onPress={() => handleDraw(prompt.type)} style={styles.actionBtnRed}>
                        <Text style={styles.actionTextWhite}>RE-EXEC</Text>
                    </Pressable>
                </View>
            </Animated.View>
        );
    };

    return (
        <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
            <Animated.View
                key={activeTab}
                entering={FadeIn.duration(300)}
                exiting={FadeOut.duration(300)}
                style={{ flex: 1 }}
            >
                {activeTab === 'play' && renderPlayTab()}
                {activeTab === 'history' && (
                    <ScrollView style={styles.tabContent}>
                        <Text style={styles.viewTitle}>ARCHIVES</Text>
                        {history.map((item, i) => (
                            <View key={i} style={styles.logItem}>
                                <View style={styles.logHeader}>
                                    <Text style={styles.logType}>{item.type}</Text>
                                    <Text style={styles.logLabel}>LOG_0{history.length - i}</Text>
                                </View>
                                <Text style={styles.logText}>"{item.text}"</Text>
                            </View>
                        ))}
                    </ScrollView>
                )}
                {/* Placeholder for other tabs */}
                {(activeTab === 'decks' || activeTab === 'themes' || activeTab === 'settings') && (
                    <View style={styles.centered}>
                        <Text style={styles.placeholderText}>{activeTab.toUpperCase()} IN PROGRESS</Text>
                    </View>
                )}
            </Animated.View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    tabContent: { flex: 1, paddingTop: 10 },
    sectionHeader: { marginBottom: 12, alignItems: 'flex-start' },
    skewBoxWhite: {
        backgroundColor: '#FFF',
        paddingHorizontal: 12,
        paddingVertical: 4,
        transform: [{ skewX: '-12deg' }],
        borderWidth: 2,
        borderColor: '#000',
    },
    skewBoxRed: {
        backgroundColor: '#D80000',
        paddingHorizontal: 12,
        paddingVertical: 4,
        transform: [{ skewX: '12deg' }],
        borderWidth: 2,
        borderColor: '#000',
    },
    skewTextBlack: { color: '#000', fontWeight: '900', fontStyle: 'italic', transform: [{ skewX: '12deg' }] },
    skewTextWhite: { color: '#FFF', fontWeight: '900', fontStyle: 'italic', transform: [{ skewX: '-12deg' }] },
    deckList: { gap: 8, marginBottom: 20 },
    deckItem: {
        padding: 12,
        borderWidth: 2,
        borderColor: '#000',
        transform: [{ skewX: '-6deg' }],
    },
    deckItemActive: { backgroundColor: '#FFF' },
    deckItemInactive: { backgroundColor: '#000', opacity: 0.6 },
    deckText: { fontWeight: '900', fontStyle: 'italic', transform: [{ skewX: '6deg' }] },
    deckSubtext: { fontSize: 8, fontWeight: '700', color: 'gray', marginTop: 2, transform: [{ skewX: '6deg' }] },
    textWhite: { color: '#FFF' },
    textBlack: { color: '#000' },
    stageList: { gap: 10, paddingBottom: 100 },
    stageItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderWidth: 2,
        borderColor: '#000',
    },
    stageTitle: { fontSize: 24, fontWeight: '900', fontStyle: 'italic' },
    stageDesc: { fontSize: 8, fontWeight: '900', letterSpacing: 1 },
    stageNumber: { fontSize: 32, fontWeight: '900' },
    skewNeg6: { transform: [{ skewX: '-6deg' }] },
    skewPos6: { transform: [{ skewX: '6deg' }] },
    selectionView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    headerCentered: { alignItems: 'center', marginBottom: 32 },
    paramsLabel: { color: '#D80000', fontWeight: '900', letterSpacing: 2 },
    intensityLarge: { color: '#FFF', fontSize: 48, fontWeight: '900', fontStyle: 'italic' },
    drawButtons: { width: '100%', gap: 12, paddingHorizontal: 20 },
    drawBtnWhite: { backgroundColor: '#FFF', padding: 16, transform: [{ skewX: '-12deg' }], borderWidth: 2, borderColor: '#000' },
    drawBtnRed: { backgroundColor: '#D80000', padding: 16, transform: [{ skewX: '12deg' }], borderWidth: 2, borderColor: '#000' },
    drawBtnTextBlack: { color: '#000', fontSize: 20, fontWeight: '900', fontStyle: 'italic', transform: [{ skewX: '12deg' }] },
    drawBtnTextWhite: { color: '#FFF', fontSize: 20, fontWeight: '900', fontStyle: 'italic', transform: [{ skewX: '-12deg' }], textAlign: 'right' },
    abortBtn: { marginTop: 20, alignItems: 'center' },
    abortText: { color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: '900', letterSpacing: 4 },
    cardView: { flex: 1, justifyContent: 'center', padding: 10 },
    callingCard: {
        backgroundColor: '#FFF',
        padding: 20,
        borderWidth: 3,
        borderColor: '#000',
        transform: [{ rotate: '-1deg' }],
        shadowColor: '#D80000',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 8,
    },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    typeTag: { backgroundColor: '#D80000', paddingHorizontal: 8, paddingVertical: 2, transform: [{ skewX: '-15deg' }] },
    typeText: { color: '#FFF', fontWeight: '900', fontStyle: 'italic' },
    logId: { color: '#000', fontSize: 10, fontWeight: '900', opacity: 0.4 },
    promptText: { fontSize: 22, fontWeight: '900', fontStyle: 'italic', color: '#000', marginBottom: 20 },
    penaltyContainer: { borderTopWidth: 2, borderColor: '#000', borderStyle: 'dashed', paddingTop: 12 },
    penaltyLabel: { color: '#D80000', fontSize: 12, fontWeight: '900', fontStyle: 'italic' },
    penaltyText: { color: '#000', fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
    cardActions: { flexDirection: 'row', gap: 12, marginTop: 32 },
    actionBtnWhite: { flex: 1, backgroundColor: '#FFF', padding: 14, borderWidth: 2, borderColor: '#000', transform: [{ skewX: '-12deg' }] },
    actionBtnRed: { flex: 1, backgroundColor: '#D80000', padding: 14, borderWidth: 2, borderColor: '#000', transform: [{ skewX: '12deg' }] },
    actionTextBlack: { color: '#000', textAlign: 'center', fontWeight: '900', fontSize: 18, fontStyle: 'italic', transform: [{ skewX: '12deg' }] },
    actionTextWhite: { color: '#FFF', textAlign: 'center', fontWeight: '900', fontSize: 18, fontStyle: 'italic', transform: [{ skewX: '-12deg' }] },
    viewTitle: { color: '#FFF', fontSize: 40, fontWeight: '900', fontStyle: 'italic', marginBottom: 20 },
    logItem: { backgroundColor: '#FFF', padding: 10, marginBottom: 8, transform: [{ skewX: '-6deg' }], borderWidth: 2, borderColor: '#000' },
    logHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    logType: { color: '#D80000', fontWeight: '900', fontSize: 8 },
    logLabel: { color: '#000', fontWeight: '900', fontSize: 8, opacity: 0.4 },
    logText: { color: '#000', fontWeight: '700', fontStyle: 'italic', fontSize: 10 },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    placeholderText: { color: 'rgba(255,255,255,0.2)', fontWeight: '900', letterSpacing: 4 },
});

export default PersonaApp;

export const PersonaMenu: React.FC<{ logic: any }> = ({ logic }) => {
    const { setView } = logic;
    // Simple menu for now, can be expanded to match the web version's complexity later
    return (
        <View style={styles.menuContainer}>
            <Pressable onPress={() => setView('game')} style={styles.menuItem}>
                <View style={styles.menuBox}>
                    <Text style={styles.menuText}>STEAL</Text>
                    <Text style={styles.menuSub}>START_MISSION</Text>
                </View>
            </Pressable>
        </View>
    );
};
