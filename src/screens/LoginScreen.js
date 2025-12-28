import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import { COLORS, SIZES } from '../constants/theme';
import ScreenWrapper from '../components/ScreenWrapper';
import CustomButton from '../components/CustomButton';

// Warm up the android browser to improve UX
export const useWarmUpBrowser = () => {
    React.useEffect(() => {
        // Check if running on web to avoid errors
        if (Platform.OS !== 'web') {
            void WebBrowser.warmUpAsync();
            return () => {
                void WebBrowser.coolDownAsync();
            };
        }
    }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

    const onGoogleSignIn = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
                redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }), // Adjust scheme if needed
            });

            if (createdSessionId) {
                setActive({ session: createdSessionId });
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error('OAuth error', err);
        }
    }, []);

    return (
        <ScreenWrapper style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Sign in to consult your AI Doctor</Text>
                </View>

                <View style={styles.form}>
                    <Text style={{ textAlign: 'center', marginBottom: 20, color: COLORS.textSecondary }}>
                        Sign in securely with your Google account
                    </Text>

                    <CustomButton
                        title="Continue with Google"
                        onPress={onGoogleSignIn}
                        style={styles.googleBtn}
                        variant="outline"
                    />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>By continuing, you agree to our </Text>
                        <TouchableOpacity onPress={() => { }}>
                            <Text style={styles.signupText}>Terms & Conditions</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SIZES.padding,
    },
    scrollContent: {
        paddingVertical: 50,
    },
    header: {
        marginBottom: 60,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: SIZES.large,
        color: COLORS.textSecondary,
    },
    form: {
        flex: 1,
        justifyContent: 'center',
    },
    googleBtn: {
        marginTop: 10,
        marginBottom: 20,
        borderColor: '#DB4437',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        flexWrap: 'wrap',
    },
    footerText: {
        color: COLORS.textSecondary,
        fontSize: SIZES.small,
    },
    signupText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: SIZES.small,
    },
});
