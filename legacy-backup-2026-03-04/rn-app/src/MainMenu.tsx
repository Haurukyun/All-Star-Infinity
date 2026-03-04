
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    FadeIn,
    FadeOut
} from 'react-native-reanimated';
import { Theme } from './types';
import { useGameLogic } from './hooks/useGameLogic';
import {
    PersonaMenu,
    MinecraftMenu,
    DanganronpaMenu,
    OmoriMenu,
    KirbyMenu,
    PokemonMenu,
    AnimalCrossingMenu,
    SkyrimMenu
} from './components/ThemedMenus';

const { width, height } = Dimensions.get('window');

const MainMenu: React.FC<{ logic: ReturnType<typeof useGameLogic> }> = ({ logic }) => {
    const { theme, setTheme, hasExplicitlySelectedTheme } = logic;
    const [showcaseIndex, setShowcaseIndex] = useState(0);
    const [isIdle, setIsIdle] = useState(true);
    const idleTimerRef = useRef<any>(null);

    const themes = Object.values(Theme).filter(t => t !== Theme.NONE);

    const resetIdleTimer = useCallback(() => {
        setIsIdle(false);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => {
            setIsIdle(true);
        }, 5000);
    }, []);

    useEffect(() => {
        // Initial timer
        idleTimerRef.current = setTimeout(() => {
            setIsIdle(true);
        }, 5000);

        return () => {
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        };
    }, []);

    // Showcase Mode: Cycle through themes
    useEffect(() => {
        if (!hasExplicitlySelectedTheme && isIdle) {
            const interval = setInterval(() => {
                setShowcaseIndex((prev) => (prev + 1) % themes.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [hasExplicitlySelectedTheme, themes.length, isIdle]);

    // Apply the showcase theme
    useEffect(() => {
        if (!hasExplicitlySelectedTheme) {
            setTheme(themes[showcaseIndex], false);
        }
    }, [showcaseIndex, hasExplicitlySelectedTheme, setTheme, themes]);

    const renderThemedMenu = () => {
        switch (theme) {
            case Theme.PERSONA: return <PersonaMenu logic={logic} />;
            case Theme.MINECRAFT: return <MinecraftMenu logic={logic} />;
            case Theme.DANGANRONPA: return <DanganronpaMenu logic={logic} />;
            case Theme.OMORI: return <OmoriMenu logic={logic} />;
            case Theme.KIRBY: return <KirbyMenu logic={logic} />;
            case Theme.POKEMON: return <PokemonMenu logic={logic} />;
            case Theme.ANIMAL_CROSSING: return <AnimalCrossingMenu logic={logic} />;
            case Theme.SKYRIM: return <SkyrimMenu logic={logic} />;
            default: return <PersonaMenu logic={logic} />;
        }
    };

    return (
        <View style={styles.container} onTouchStart={resetIdleTimer}>
            <Animated.View
                key={theme}
                entering={FadeIn.duration(1500)}
                exiting={FadeOut.duration(1500)}
                style={StyleSheet.absoluteFill}
            >
                {renderThemedMenu()}
            </Animated.View>

            {!hasExplicitlySelectedTheme && (
                <View style={styles.showcaseOverlay} pointerEvents="none">
                    <View style={styles.indicatorContainer}>
                        {themes.map((_, i) => (
                            <View
                                key={i}
                                style={[
                                    styles.indicator,
                                    i === showcaseIndex ? styles.indicatorActive : styles.indicatorInactive
                                ]}
                            />
                        ))}
                    </View>
                    <View style={styles.showcaseBox}>
                        <Text style={styles.showcaseLabel}>SHOWCASE: {theme.replace('_', ' ')}</Text>
                    </View>
                    <Text style={styles.tapPrompt}>TAP ANY THEME TO EXPLORE</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    showcaseOverlay: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        alignItems: 'center',
    },
    indicatorContainer: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 12,
    },
    indicator: {
        height: 4,
        borderRadius: 2,
    },
    indicatorActive: {
        width: 32,
        backgroundColor: '#FFF',
    },
    indicatorInactive: {
        width: 8,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    showcaseBox: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    showcaseLabel: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 4,
        color: '#FFF',
        textTransform: 'uppercase',
    },
    tapPrompt: {
        color: 'rgba(255,255,255,0.3)',
        fontSize: 8,
        letterSpacing: 2,
        marginTop: 12,
        fontWeight: '500',
        textTransform: 'uppercase',
    },
});

export default MainMenu;
