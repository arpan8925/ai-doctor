import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import ScreenWrapper from '../components/ScreenWrapper';
import CustomButton from '../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { saveHealthRecord } from '../utils/storage';

export default function HealthAnalysisScreen({ route, navigation }) {
    // Get data passed from input screen
    const { analysis } = route.params || {
        analysis: {
            conditions: [{ name: 'Common Cold', probability: 'High' }],
            urgency: 'Low',
            recommendation: 'Rest and fluids'
        }
    };

    useEffect(() => {
        if (route.params?.analysis) {
            saveHealthRecord({
                type: 'Symptom Analysis',
                summary: analysis.conditions[0]?.name || 'Unknown Condition',
                details: analysis
            });
        }
    }, []);

    const getUrgencyColor = (level) => {
        switch (level.toLowerCase()) {
            case 'high': return COLORS.danger;
            case 'medium': return COLORS.warning;
            default: return COLORS.success;
        }
    };

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <Text style={styles.title}>Analysis Result</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                {/* Risk Level Card */}
                <Animated.View style={[styles.card, { borderLeftColor: getUrgencyColor(analysis.urgency), borderLeftWidth: 5 }]}>
                    <Text style={styles.cardLabel}>Risk Level</Text>
                    <Text style={[styles.urgencyText, { color: getUrgencyColor(analysis.urgency) }]}>
                        {analysis.urgency} Risk
                    </Text>
                </Animated.View>

                {/* Potential Causes */}
                <Text style={styles.sectionTitle}>Potential Causes</Text>
                {analysis.conditions.map((item, index) => (
                    <View key={index} style={styles.conditionItem}>
                        <View style={styles.dot} />
                        <Text style={styles.conditionText}>{item.name}</Text>
                        <Text style={styles.probabilityText}>{item.probability} Probability</Text>
                    </View>
                ))}

                {/* Smart Health Advice */}
                <Text style={styles.sectionTitle}>Advice & Recommendation</Text>
                <LinearGradient
                    colors={['#e0c3fc', '#8ec5fc']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    style={styles.recommendationBox}
                >
                    <Ionicons name="medkit-outline" size={32} color={COLORS.primary} style={{ marginBottom: 10 }} />
                    <Text style={styles.recText}>{analysis.recommendation}</Text>
                </LinearGradient>

                {/* Disclaimer */}
                <View style={styles.disclaimerBox}>
                    <Ionicons name="information-circle-outline" size={20} color={COLORS.textSecondary} />
                    <Text style={styles.disclaimerText}>
                        Disclaimer: This Analysis is AI-generated and for informational purposes only. It is not a medical diagnosis. Please consult a doctor for serious concerns.
                    </Text>
                </View>

                <CustomButton
                    title="Consult a Specialist"
                    onPress={() => navigation.navigate('AIChat')} // Or booking flow
                    style={{ marginTop: 30 }}
                />

                <CustomButton
                    title="Back to Home"
                    variant="outline"
                    onPress={() => navigation.navigate('Home')}
                    style={{ marginTop: 15 }}
                />

            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: SIZES.padding,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    content: {
        padding: SIZES.padding,
    },
    card: {
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: SIZES.radius,
        marginBottom: 25,
        ...SHADOWS.medium,
    },
    cardLabel: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 5,
    },
    urgencyText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 15,
    },
    conditionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: COLORS.surface,
        padding: 15,
        borderRadius: 10,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.primary,
        marginRight: 10,
    },
    conditionText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
        flex: 1,
    },
    probabilityText: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    recommendationBox: {
        padding: 20,
        borderRadius: SIZES.radius,
        alignItems: 'center',
    },
    recText: {
        fontSize: 16,
        color: COLORS.text,
        textAlign: 'center',
        lineHeight: 24,
        fontWeight: '500',
    },
    disclaimerBox: {
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: COLORS.background,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    disclaimerText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 12,
        color: COLORS.textSecondary,
        fontStyle: 'italic',
    },
});
