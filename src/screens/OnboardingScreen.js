import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Animated } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import ScreenWrapper from '../components/ScreenWrapper';
import CustomButton from '../components/CustomButton';

const { width } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        title: 'AI Health Assistant',
        description: 'Get instant health advice and preliminary diagnosis using advanced AI technology.',
        icon: '🤖',
    },
    {
        id: '2',
        title: 'Symptom Checker',
        description: 'Input your symptoms and get a detailed analysis of potential conditions and risk levels.',
        icon: 'stethoscope',
    },
    {
        id: '3',
        title: '24×7 Support',
        description: 'Access health guidance anytime, anywhere. Your personal health companion is always awake.',
        icon: 'clock',
    },
];

const Slide = ({ item }) => {
    return (
        <View style={styles.slide}>
            <View style={styles.imageContainer}>
                <Text style={styles.icon}>{item.icon === 'stethoscope' ? '🩺' : item.icon === 'clock' ? '🕒' : item.icon}</Text>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );
};

export default function OnboardingScreen({ navigation }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems && viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const handleNext = () => {
        if (currentIndex < SLIDES.length - 1) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
        } else {
            navigation.replace('Login');
        }
    };

    const handleSkip = () => {
        navigation.replace('Login');
    };

    return (
        <ScreenWrapper>
            <View style={{ flex: 3 }}>
                <FlatList
                    data={SLIDES}
                    renderItem={({ item }) => <Slide item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false,
                    })}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
            </View>

            <View style={styles.footer}>
                {/* Paginator */}
                <View style={styles.paginator}>
                    {SLIDES.map((_, i) => {
                        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                        const dotWidth = scrollX.interpolate({
                            inputRange,
                            outputRange: [10, 20, 10],
                            extrapolate: 'clamp',
                        });
                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp',
                        });

                        return (
                            <Animated.View
                                style={[styles.dot, { width: dotWidth, opacity }]}
                                key={i.toString()}
                            />
                        );
                    })}
                </View>

                <View style={styles.buttonContainer}>
                    {currentIndex < SLIDES.length - 1 ? (
                        <View style={styles.rowButtons}>
                            <CustomButton
                                title="Skip"
                                variant="ghost"
                                onPress={handleSkip}
                                style={{ flex: 1, marginRight: 10 }}
                            />
                            <CustomButton
                                title="Next"
                                onPress={handleNext}
                                style={{ flex: 1, marginLeft: 10 }}
                            />
                        </View>
                    ) : (
                        <CustomButton title="Get Started" onPress={handleNext} />
                    )}
                </View>
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    slide: {
        width,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.padding * 2,
    },
    imageContainer: {
        width: 200,
        height: 200,
        backgroundColor: COLORS.background, // Or a light tint of primary
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        elevation: 5,
        shadowColor: COLORS.primary,
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 }
    },
    icon: {
        fontSize: 80,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.text,
        textAlign: 'center',
        marginBottom: SIZES.medium,
    },
    description: {
        fontSize: SIZES.medium,
        color: COLORS.textSecondary,
        textAlign: 'center',
        paddingHorizontal: SIZES.padding,
        lineHeight: 24,
    },
    footer: {
        flex: 1,
        paddingHorizontal: SIZES.padding * 2,
        justifyContent: 'space-between',
        paddingBottom: 50,
    },
    paginator: {
        flexDirection: 'row',
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.primary,
        marginHorizontal: 8,
    },
    buttonContainer: {
        // marginBottom: 20,
    },
    rowButtons: {
        flexDirection: 'row',
    }
});
