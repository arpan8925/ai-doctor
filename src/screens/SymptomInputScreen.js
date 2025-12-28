import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import ScreenWrapper from '../components/ScreenWrapper';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';

export default function SymptomInputScreen({ navigation }) {
    const [symptoms, setSymptoms] = useState('');
    const [duration, setDuration] = useState('');
    const [severity, setSeverity] = useState('Medium'); // Could be a slider

    const handleAnalyze = () => {
        // Navigate to Results (Placeholder)
        navigation.navigate('HealthAnalysis');
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

                {/* Severity Slider Placeholder */}
                <Text style={styles.label}>Severity (1-10)</Text>
                <InputField
                    placeholder="5"
                    keyboardType="numeric"
                    value={severity}
                    onChangeText={setSeverity}
                />

                <CustomButton title="Analyze Health" onPress={handleAnalyze} style={{ marginTop: 20 }} />
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
