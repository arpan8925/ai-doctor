import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

export default function CustomButton({
    title,
    onPress,
    variant = 'primary', // primary, secondary, outline, ghost
    isLoading = false,
    style,
    textStyle
}) {
    const isGradient = variant === 'primary' || variant === 'secondary';
    const gradientColors = variant === 'secondary' ? COLORS.gradientPurple : COLORS.gradientPrimary;

    const ButtonContent = () => (
        <>
            {isLoading ? (
                <ActivityIndicator color={variant === 'outline' ? COLORS.primary : COLORS.white} />
            ) : (
                <Text style={[
                    styles.text,
                    variant === 'outline' && { color: COLORS.primary },
                    variant === 'ghost' && { color: COLORS.primary },
                    textStyle
                ]}>
                    {title}
                </Text>
            )}
        </>
    );

    if (isGradient) {
        return (
            <TouchableOpacity
                onPress={onPress}
                disabled={isLoading}
                activeOpacity={0.8}
                style={[styles.container, style]}
            >
                <LinearGradient
                    colors={gradientColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}
                >
                    <ButtonContent />
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isLoading}
            style={[
                styles.container,
                variant === 'outline' && styles.outline,
                style
            ]}
        >
            <ButtonContent />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: SIZES.radius,
        overflow: 'hidden',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.small,
    },
    gradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    outline: {
        borderWidth: 1,
        borderColor: COLORS.primary,
        backgroundColor: 'transparent',
    },
    text: {
        color: COLORS.white,
        fontSize: SIZES.medium,
        fontWeight: '600',
    },
});
