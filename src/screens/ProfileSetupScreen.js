import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import ScreenWrapper from '../components/ScreenWrapper';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';

export default function ProfileSetupScreen({ navigation }) {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        height: '',
        weight: '',
        history: ''
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        // Validate and Save
        navigation.replace('Home');
    };

    return (
        <ScreenWrapper style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>Complete Profile</Text>
                    <Text style={styles.subtitle}>Help us know you better for accurate diagnosis</Text>
                </View>

                <View style={styles.form}>
                    <InputField
                        label="Full Name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChangeText={(t) => handleChange('name', t)}
                    />

                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <InputField
                                label="Age"
                                placeholder="25"
                                keyboardType="numeric"
                                value={formData.age}
                                onChangeText={(t) => handleChange('age', t)}
                            />
                        </View>
                        <View style={[styles.halfInput, { marginLeft: 15 }]}>
                            <InputField
                                label="Gender"
                                placeholder="M/F/Other"
                                value={formData.gender}
                                onChangeText={(t) => handleChange('gender', t)}
                            />
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <InputField
                                label="Height (cm)"
                                placeholder="175"
                                keyboardType="numeric"
                                value={formData.height}
                                onChangeText={(t) => handleChange('height', t)}
                            />
                        </View>
                        <View style={[styles.halfInput, { marginLeft: 15 }]}>
                            <InputField
                                label="Weight (kg)"
                                placeholder="70"
                                keyboardType="numeric"
                                value={formData.weight}
                                onChangeText={(t) => handleChange('weight', t)}
                            />
                        </View>
                    </View>

                    <InputField
                        label="Existing Diseases (Optional)"
                        placeholder="e.g. Diabetes, Asthma"
                        value={formData.history}
                        onChangeText={(t) => handleChange('history', t)}
                        multiline
                        numberOfLines={3}
                        style={{ height: 100, textAlignVertical: 'top', paddingTop: 10 }}
                    />

                    <CustomButton
                        title="Continue"
                        onPress={handleNext}
                        style={styles.btn}
                    />
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
        paddingVertical: 30,
    },
    header: {
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 5,
    },
    subtitle: {
        fontSize: SIZES.medium,
        color: COLORS.textSecondary,
    },
    form: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
    },
    halfInput: {
        flex: 1,
    },
    btn: {
        marginTop: 20,
        marginBottom: 40,
    },
});
