
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Intensity, Theme } from './types';
import { useGameLogic } from './hooks/useGameLogic';

const AC_STAGES = [
    { id: Intensity.SOFT, title: 'DAILY TASK', desc: 'EASY PEASY', color: '#88E0EF', text: '#546E7A', icon: '✈️' },
    { id: Intensity.HOT, title: 'BIG CATCH', desc: 'EXCITING', color: '#F9D56E', text: '#795548', icon: '🎣' },
    { id: Intensity.VULGAR, title: 'WASP NEST', desc: 'DANGEROUS', color: '#FF8A80', text: '#BF360C', icon: '🐝' },
];

const AnimalCrossingApp: React.FC<{ logic: ReturnType<typeof useGameLogic> }> = ({ logic }) => {
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

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const renderContent = () => {
        if (activeTab === 'play') {
            if (!intensity && !prompt) {
                return (
                    <ScrollView style={styles.scroll}>
                        <View style={styles.acPanel}>
                            <Text style={styles.panelTitle}>Choose Activity</Text>
                            <View style={styles.deckList}>
                                <Pressable
                                    onPress={() => setActiveDeckId('default')}
                                    style={[styles.acCard, activeDeckId === 'default' ? styles.acCardActive : null]}
                                >
                                    <View style={[styles.iconCircle, { backgroundColor: '#B2DFDB' }]}>
                                        <Text style={styles.iconText}>⛺</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.cardTitle}>Island Life</Text>
                                        <Text style={styles.cardSub}>Standard Experience</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>

                        <View style={styles.stageGrid}>
                            {AC_STAGES.map((stage) => (
                                <Pressable
                                    key={stage.id}
                                    onPress={() => setIntensity(stage.id as Intensity)}
                                    style={[styles.stageCard, { backgroundColor: stage.color }]}
                                >
                                    <View style={styles.stageContent}>
                                        <View style={styles.stageIconCircle}>
                                            <Text style={styles.iconText}>{stage.icon}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.stageTitleText}>{stage.title}</Text>
                                            <Text style={styles.stageDescText}>{stage.desc}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.arrowText}>▶</Text>
                                </Pressable>
                            ))}
                        </View>
                    </ScrollView>
                );
            }

            if (!prompt) {
                return (
                    <View style={styles.centered}>
                        <View style={styles.acBubble}>
                            <Text style={styles.bubbleNook}>Tom Nook says:</Text>
                            <Text style={styles.bubbleText}>"Ready for a new task, hm? Choose wisely, yes, yes!"</Text>
                        </View>
                        <Animated.View entering={FadeIn} style={styles.largeIconCircle}>
                            <Text style={styles.largeIconText}>
                                {intensity === Intensity.SOFT ? '✈️' : intensity === Intensity.HOT ? '🎣' : '🐝'}
                            </Text>
                        </Animated.View>
                        <View style={styles.drawRow}>
                            <Pressable onPress={() => handleDraw('Truth')} style={[styles.acBtn, { backgroundColor: '#4DD0E1' }]}><Text style={styles.btnText}>TRUTH</Text></Pressable>
                            <Pressable onPress={() => handleDraw('Dare')} style={[styles.acBtn, { backgroundColor: '#FF7043' }]}><Text style={styles.btnText}>DARE</Text></Pressable>
                        </View>
                        <Pressable onPress={() => setIntensity(null)} style={styles.nevermindBtn}>
                            <Text style={styles.nevermindText}>Nevermind</Text>
                        </Pressable>
                    </View>
                );
            }

            return (
                <Animated.View entering={FadeIn} style={styles.resultView}>
                    <View style={styles.resultPanel}>
                        <View style={styles.typeBadge}>
                            <Text style={styles.badgeText}>{prompt.type.toUpperCase()}</Text>
                        </View>
                        <View style={styles.resultIconCircle}>
                            <Text style={styles.iconText}>{prompt.type === 'Truth' ? '🤔' : '⚡'}</Text>
                        </View>
                        <Text style={styles.promptText}>"{prompt.text}"</Text>
                        <View style={styles.penaltyBox}>
                            <Text style={styles.penaltyLabel}>PENALTY</Text>
                            <Text style={styles.penaltyValue}>{prompt.penalty}</Text>
                        </View>
                    </View>
                    <View style={styles.drawRow}>
                        <Pressable onPress={() => setPrompt(null)} style={[styles.acBtn, { backgroundColor: '#AED581' }]}><Text style={styles.btnText}>Done!</Text></Pressable>
                        <Pressable onPress={() => handleDraw(prompt.type)} style={[styles.acBtn, { backgroundColor: '#4DB6AC' }]}><Text style={styles.btnText}>Again!</Text></Pressable>
                    </View>
                </Animated.View>
            );
        }
        return <View style={styles.centered}><Text style={styles.placeholder}>AC Tab {activeTab} Placeholder</Text></View>;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerPill}>
                    <Text style={styles.pillText}>🏝️ PARADISE</Text>
                </View>
                <View style={styles.headerPill}>
                    <Text style={styles.pillText}>{formatTime(time)}</Text>
                </View>
            </View>
            <View style={styles.main}>
                {renderContent()}
            </View>
            <View style={styles.nav}>
                {['play', 'decks', 'history', 'themes', 'settings'].map((tab, idx) => {
                    const icons = ['🏝️', '🔨', '🎫', '✈️', '🛂'];
                    const isActive = activeTab === tab;
                    return (
                        <Pressable key={tab} onPress={() => setActiveTab(tab)} style={[styles.navBtn, isActive ? styles.navBtnActive : null]}>
                            <Text style={styles.navIcon}>{icons[idx]}</Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#9CCC65' },
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, paddingTop: 40 },
    headerPill: { backgroundColor: 'rgba(255,255,255,0.8)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
    pillText: { color: '#5D4037', fontWeight: 'bold' },
    main: { flex: 1, paddingHorizontal: 16 },
    scroll: { flex: 1 },
    acPanel: { backgroundColor: '#FFF9C4', borderRadius: 20, padding: 20, borderWidth: 4, borderColor: '#FFF', marginBottom: 20 },
    panelTitle: { fontSize: 20, fontWeight: '900', color: '#795548', marginBottom: 12 },
    deckList: { gap: 10 },
    acCard: { backgroundColor: '#FFF', padding: 12, borderRadius: 15, flexDirection: 'row', alignItems: 'center', gap: 12 },
    acCardActive: { borderColor: '#81D4FA', borderWidth: 4 },
    iconCircle: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
    iconText: { fontSize: 24 },
    cardTitle: { fontWeight: 'bold', fontSize: 18, color: '#5D4037' },
    cardSub: { fontSize: 10, color: 'gray' },
    stageGrid: { gap: 12, paddingBottom: 100 },
    stageCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 15, borderWidth: 3, borderColor: '#FFF' },
    stageContent: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    stageIconCircle: { width: 48, height: 48, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
    stageTitleText: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
    stageDescText: { fontSize: 10, fontWeight: '900', color: 'rgba(255,255,255,0.8)' },
    arrowText: { color: '#FFF', fontSize: 20 },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    acBubble: { backgroundColor: '#E0F7FA', padding: 20, borderRadius: 20, borderWidth: 4, borderColor: '#FFF', marginBottom: 30, width: '100%' },
    bubbleNook: { color: '#00BCD4', fontWeight: 'bold', marginBottom: 4 },
    bubbleText: { color: '#5D4037', fontSize: 18 },
    largeIconCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#FFF', borderWidth: 4, borderColor: '#81D4FA', justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
    largeIconText: { fontSize: 60 },
    drawRow: { flexDirection: 'row', gap: 12, width: '100%' },
    acBtn: { flex: 1, padding: 16, borderRadius: 30, borderWidth: 3, borderColor: '#FFF', alignItems: 'center' },
    btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
    nevermindBtn: { marginTop: 30, backgroundColor: '#8D6E63', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
    nevermindText: { color: '#FFF', fontWeight: 'bold' },
    resultView: { flex: 1, justifyContent: 'center' },
    resultPanel: { backgroundColor: '#FFF9C4', padding: 24, borderRadius: 20, borderWidth: 4, borderColor: '#FFF', marginBottom: 30, alignItems: 'center' },
    typeBadge: { position: 'absolute', top: -15, backgroundColor: '#FFF9C4', paddingHorizontal: 20, paddingVertical: 4, borderRadius: 15, borderWidth: 4, borderColor: '#FFF' },
    badgeText: { color: '#FBC02D', fontWeight: 'bold' },
    resultIconCircle: { width: 64, height: 64, backgroundColor: '#E1F5FE', borderRadius: 32, borderWidth: 4, borderColor: '#FFF', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    promptText: { fontSize: 24, fontWeight: 'bold', color: '#5D4037', textAlign: 'center', marginBottom: 20 },
    penaltyBox: { backgroundColor: '#FFEBEE', padding: 16, borderRadius: 15, borderWidth: 2, borderColor: '#FFF', width: '100%' },
    penaltyLabel: { color: '#E57373', fontSize: 10, fontWeight: '900', marginBottom: 4 },
    penaltyValue: { color: '#C62828', fontWeight: 'bold', fontSize: 14 },
    nav: { position: 'absolute', bottom: 30, alignSelf: 'center', flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.9)', padding: 8, borderRadius: 40, gap: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 },
    navBtn: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
    navBtnActive: { backgroundColor: '#FFF', transform: [{ scale: 1.2 }, { translateY: -5 }] },
    navIcon: { fontSize: 24 },
    placeholder: { color: 'white', opacity: 0.5, fontWeight: 'bold' }
});

export default AnimalCrossingApp;

export const AnimalCrossingMenu = ({ logic }: any) => {
    const { setView } = logic;
    return (
        <View style={styles.container}>
            <View style={styles.centered}>
                <Text style={[styles.cardTitle, { fontSize: 32, marginBottom: 40 }]}>ANIMAL CROSSING</Text>
                <Pressable onPress={() => setView('game')} style={[styles.acBtn, { backgroundColor: '#8BC34A', paddingHorizontal: 40 }]}>
                    <Text style={styles.btnText}>GO TO ISLAND</Text>
                </Pressable>
            </View>
        </View>
    );
};
