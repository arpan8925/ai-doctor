import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Platform, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import ScreenWrapper from '../components/ScreenWrapper';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import { schedulePushNotification } from '../utils/notificationHelper';

import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddMedicineScreen({ navigation }) {
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [time, setTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || time;
        setShowPicker(Platform.OS === 'ios');
        setTime(currentDate);
    };

    const handleSave = async () => {
        if (!name || !dosage || !time) {
            Alert.alert('Missing Info', 'Please fill in all fields.');
            return;
        }

        // Schedule Notification
        await schedulePushNotification(
            `Time for ${name}`,
            `Please take your ${dosage} dosage now.`,
            5 // Mock: Alert in 5 seconds
        );

        Alert.alert('Success', 'Medicine reminder added successfully!', [
            { text: 'OK', onPress: () => navigation.goBack() }
        ]);
    };

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <Text style={styles.title}>Add New Medicine</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <InputField
                    label="Medicine Name"
                    placeholder="e.g. Paracetamol"
                    value={name}
                    onChangeText={setName}
                />

                <InputField
                    label="Dosage"
                    placeholder="e.g. 500mg, 1 Tablet"
                    value={dosage}
                    onChangeText={setDosage}
                />

                {/* Time Picker */}
                <Text style={{ fontSize: 16, fontWeight: '600', color: COLORS.text, marginBottom: 8, marginTop: 10 }}>
                    Time
                </Text>
                <TouchableOpacity
                    onPress={() => setShowPicker(true)}
                    style={styles.timePickerBtn}
                >
                    <Text style={styles.timeText}>
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                    <Ionicons name="time-outline" size={24} color={COLORS.textSecondary} />
                </TouchableOpacity>

                {showPicker && (
                    <DateTimePicker
                        value={time}
                        mode="time"
                        is24Hour={false}
                        display="default"
                        onChange={onChange}
                    />
                )}

                <Text style={{ fontSize: 12, color: COLORS.textSecondary, marginBottom: 20 }}>
                    * For this demo, reminder will trigger 5 seconds after saving.
                </Text>

                <CustomButton
                    title="Save Reminder"
                    onPress={handleSave}
                />

                <CustomButton
                    title="Cancel"
                    variant="outline"
                    onPress={() => navigation.goBack()}
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
        paddingTop: 30,
    },
    timePickerBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        padding: 15,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginBottom: 10,
    },
    timeText: {
        fontSize: 16,
        color: COLORS.text,
    }
});
