import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

export default function InputField({
    label,
    icon,
    error,
    password,
    onFocus = () => { },
    ...props
}) {
    const [isFocused, setIsFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(password);

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[
                styles.inputContainer,
                { borderColor: error ? COLORS.danger : isFocused ? COLORS.primary : COLORS.border }
            ]}>
                {/* Icon here if needed */}
                <TextInput
                    secureTextEntry={hidePassword}
                    autoCorrect={false}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => setIsFocused(false)}
                    style={styles.input}
                    placeholderTextColor={COLORS.textSecondary}
                    {...props}
                />
                {password && (
                    <Text
                        onPress={() => setHidePassword(!hidePassword)}
                        style={styles.eyeIcon}
                    >
                        {hidePassword ? '👁️' : '🚫'}
                    </Text>
                )}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: SIZES.medium,
    },
    label: {
        marginVertical: 5,
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    inputContainer: {
        height: 55,
        backgroundColor: COLORS.surface,
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 1, // 1px border
        borderRadius: SIZES.radius,
        alignItems: 'center',
    },
    input: {
        color: COLORS.text,
        flex: 1,
        height: '100%',
    },
    eyeIcon: {
        fontSize: 18,
        padding: 5,
    },
    errorText: {
        color: COLORS.danger,
        fontSize: 12,
        marginTop: 4,
        marginLeft: 5,
    },
});
