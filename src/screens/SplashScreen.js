import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import ScreenWrapper from '../components/ScreenWrapper';

export default function SplashScreen({ navigation }) {

    useEffect(() => {
        // Simulate loading or check auth
        const timer = setTimeout(() => {
            navigation.replace('Onboarding');
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <ScreenWrapper style={styles.container} backgroundColor={COLORS.primary}>
            <View style={styles.logoContainer}>
                {/* Placeholder for Logo */}
                <View style={styles.logoPlaceholder}>
                    <Text style={styles.logoIcon}>+</Text>
                </View>
                <Text style={styles.title}>AI Doctor</Text>
                <Text style={styles.subtitle}>Your Personal Health Assistant</Text>
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
    },
    logoContainer: {
        alignItems: 'center',
    },
    logoPlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: COLORS.white,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SIZES.medium,
    },
    logoIcon: {
        fontSize: 50,
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.white,
        marginBottom: SIZES.base,
    },
    subtitle: {
        fontSize: SIZES.medium,
        color: 'rgba(255,255,255,0.8)',
    },
});
