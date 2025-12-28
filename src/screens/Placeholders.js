import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { COLORS } from '../constants/theme';
import CustomButton from '../components/CustomButton';
import { useAuth } from '@clerk/clerk-expo';

const PlaceholderScreen = ({ navigation, title }) => (
    <ScreenWrapper style={styles.container}>
        <Text style={styles.text}>{title} Coming Soon</Text>
        <CustomButton title="Go Back" onPress={() => navigation.goBack()} variant="outline" style={{ marginTop: 20, width: 200 }} />
    </ScreenWrapper>
);

const Settings = ({ navigation }) => {
    const { signOut } = useAuth();

    return (
        <ScreenWrapper style={styles.container}>
            <Text style={[styles.text, { marginBottom: 30 }]}>Settings</Text>
            <CustomButton title="Sign Out" onPress={() => signOut()} />
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
    },
});

export const HealthAnalysisScreen = (props) => <PlaceholderScreen {...props} title="Health Analysis" />;
export const HealthRecordsScreen = (props) => <PlaceholderScreen {...props} title="Health Records" />;
export const MedicineReminderScreen = (props) => <PlaceholderScreen {...props} title="Medicine Reminder" />;
export const EmergencyScreen = (props) => <PlaceholderScreen {...props} title="Emergency Help" />;
export const SettingsScreen = Settings;
