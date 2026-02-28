
import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    interpolate
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface LayoutProps {
    children: React.ReactNode;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'play', label: 'STEAL' },
        { id: 'decks', label: 'DECKS' },
        { id: 'history', label: 'LOGS' },
        { id: 'themes', label: 'THEME' },
        { id: 'settings', label: 'META' },
    ];

    // Animation values for background
    const bgAnim = useSharedValue(0);
    React.useEffect(() => {
        bgAnim.value = withRepeat(withTiming(1, { duration: 40000 }), -1, false);
    }, []);

    const animatedBgStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: interpolate(bgAnim.value, [0, 1], [0, 100]) },
                { translateY: interpolate(bgAnim.value, [0, 1], [0, 100]) },
            ],
        };
    });

    return (
        <View style={styles.container}>
            {/* Background Layer */}
            <View style={StyleSheet.absoluteFill}>
                <View style={[styles.dotsBg, { width: width * 2, height: height * 2 }]} />
                <LinearGradient
                    colors={['transparent', 'rgba(216,0,0,0.1)']}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                />
                {/* Red Diagonal Half */}
                <View style={styles.redDiagonal} />
            </View>

            <SafeAreaView style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerTitleContainer}>
                        <View style={[styles.box, styles.phantomBox]}>
                            <Text style={styles.phantomText}>PHANTOM</Text>
                        </View>
                        <View style={[styles.box, styles.obsidianBox]}>
                            <Text style={styles.obsidianText}>OBSIDIAN</Text>
                        </View>
                    </View>
                </View>

                {/* Main Content */}
                <View style={styles.main}>
                    {children}
                </View>

                {/* Navigation */}
                <View style={styles.navContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.navScroll}
                    >
                        {tabs.map((tab, index) => {
                            const isActive = activeTab === tab.id;
                            const rotation = [styles.rotNeg6, styles.rotPos3, styles.rotNeg2, styles.rotPos4, styles.rotPos7][index % 5];

                            return (
                                <Pressable
                                    key={tab.id}
                                    onPress={() => setActiveTab(tab.id)}
                                    style={[
                                        styles.navItem,
                                        rotation,
                                        isActive ? styles.navItemActive : styles.navItemInactive
                                    ]}
                                >
                                    <Text style={[
                                        styles.navText,
                                        isActive ? styles.navTextActive : styles.navTextInactive
                                    ]}>
                                        {tab.label}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    dotsBg: {
        backgroundColor: '#050505',
        position: 'absolute',
        top: -50,
        left: -50,
        // Note: Complex radial patterns are hard in RN without SVG or Canvas
        // Using a simpler representation for now
    },
    redDiagonal: {
        position: 'absolute',
        top: -height,
        left: -width,
        width: width * 3,
        height: height * 3,
        backgroundColor: '#D80000',
        opacity: 0.1,
        transform: [{ rotate: '-45deg' }],
    },
    content: {
        flex: 1,
    },
    header: {
        padding: 16,
        paddingTop: 8,
    },
    headerTitleContainer: {
        alignItems: 'flex-start',
        transform: [{ scale: 0.8 }],
    },
    box: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 2,
        borderColor: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 5,
    },
    phantomBox: {
        backgroundColor: '#FFF',
        transform: [{ rotate: '-3deg' }, { skewX: '-12deg' }],
        zIndex: 2,
    },
    obsidianBox: {
        backgroundColor: '#D80000',
        transform: [{ rotate: '2deg' }, { skewX: '-12deg' }],
        marginTop: 4,
        marginLeft: 16,
        zIndex: 1,
    },
    phantomText: {
        fontSize: 32,
        fontWeight: '900',
        color: '#000',
        fontStyle: 'italic',
    },
    obsidianText: {
        fontSize: 20,
        fontWeight: '900',
        color: '#FFF',
        fontStyle: 'italic',
        letterSpacing: 2,
    },
    main: {
        flex: 1,
        paddingHorizontal: 16,
    },
    navContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        paddingHorizontal: 10,
    },
    navScroll: {
        paddingBottom: 10,
        alignItems: 'flex-end',
    },
    navItem: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: -4,
        borderWidth: 2,
        borderColor: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 3,
    },
    navItemActive: {
        backgroundColor: '#FFF',
        width: 100,
        height: 70,
        zIndex: 10,
        transform: [{ translateY: -10 }],
        shadowOffset: { width: 6, height: 6 },
    },
    navItemInactive: {
        backgroundColor: '#D80000',
        width: 80,
        height: 50,
    },
    navText: {
        fontWeight: '900',
        fontStyle: 'italic',
    },
    navTextActive: {
        color: '#000',
        fontSize: 18,
    },
    navTextInactive: {
        color: '#FFF',
        fontSize: 10,
    },
    rotNeg6: { transform: [{ rotate: '-6deg' }] },
    rotPos3: { transform: [{ rotate: '3deg' }] },
    rotNeg2: { transform: [{ rotate: '-2deg' }] },
    rotPos4: { transform: [{ rotate: '4deg' }] },
    rotPos7: { transform: [{ rotate: '7deg' }] },
});

export default Layout;
