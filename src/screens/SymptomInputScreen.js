import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import ScreenWrapper from '../components/ScreenWrapper';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';

export default function SymptomInputScreen({ navigation }) {
    const [symptoms, setSymptoms] = useState('');
    const [duration, setDuration] = useState('');
    const [severity, setSeverity] = useState('5');
    const [loading, setLoading] = useState(false);

    const handleAnalyze = () => {
        if (!symptoms.trim()) {
            alert("Please describe your symptoms first");
            return;
        }

        setLoading(true);

        // Mock API Call simulation
        setTimeout(() => {
            setLoading(false);

            // Mock Data Response based on simple keywords (just for show)
            let mockResult = {
                conditions: [
                    { name: 'Viral Infection', probability: 'High' },
                    { name: 'Dehydration', probability: 'Medium' }
                ],
                urgency: 'Medium',
                recommendation: 'Stay hydrated, take rest, and monitor temperature. Consult a doctor if fever persists > 2 days.'
            };

            if (symptoms.toLowerCase().includes('chest') || symptoms.toLowerCase().includes('heart')) {
                mockResult = {
                    conditions: [
                        { name: 'Angina', probability: 'Medium' },
                        { name: 'Muscle Strain', probability: 'High' }
                    ],
                    urgency: 'High',
                    recommendation: 'Seek immediate medical attention to rule out cardiac issues.'
                };
            }

            navigation.navigate('HealthAnalysis', { analysis: mockResult });
        }, 2000);
    };

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <Text style={styles.title}>Describe Symptoms</Text>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.label}>What are you feeling?</Text>
                <InputField
                    placeholder="e.g. Headache, Nausea, Fever"
                    value={symptoms}
                    onChangeText={setSymptoms}
                    multiline
                    numberOfLines={4}
                    style={{ height: 100, textAlignVertical: 'top' }}
                />

                <Text style={styles.label}>How long have you had these symptoms?</Text>
                <InputField
                    placeholder="e.g. 2 days"
                    value={duration}
                    onChangeText={setDuration}
                />

                <Text style={styles.label}>Severity (1-10): {severity}</Text>
                <InputField
                    placeholder="5"
                    keyboardType="numeric"
                    value={severity}
                    onChangeText={setSeverity}
                    maxLength={2}
                />

                <CustomButton
                    title={loading ? "Analyzing..." : "Analyze Health"}
                    onPress={handleAnalyze}
                    isLoading={loading}
                    style={{ marginTop: 20 }}
                />
            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: SIZES.padding,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    content: {
        padding: SIZES.padding,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 8,
        marginTop: 10,
    }
});
