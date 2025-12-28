import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@clerk/clerk-expo';

// Screens
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import HomeScreen from '../screens/HomeScreen';
import SymptomInputScreen from '../screens/SymptomInputScreen';
import AIChatScreen from '../screens/AIChatScreen';
import HealthAnalysisScreen from '../screens/HealthAnalysisScreen';
import MedicineReminderScreen from '../screens/MedicineReminderScreen';
import AddMedicineScreen from '../screens/AddMedicineScreen';
import ReportAnalysisScreen from '../screens/ReportAnalysisScreen';
import {
    HealthRecordsScreen,
    EmergencyScreen,
    SettingsScreen
} from '../screens/Placeholders';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) {
        return null; // Or keep SplashScreen handled differently
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            >
                {!isSignedIn ? (
                    // Auth Stack
                    <>
                        <Stack.Screen name="Splash" component={SplashScreen} />
                        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                        <Stack.Screen name="Login" component={LoginScreen} />
                    </>
                ) : (
                    // Main App Stack
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />

                        {/* Feature Screens */}
                        <Stack.Screen name="SymptomInput" component={SymptomInputScreen} />
                        <Stack.Screen name="AIChat" component={AIChatScreen} />
                        <Stack.Screen name="HealthAnalysis" component={HealthAnalysisScreen} />
                        <Stack.Screen name="ReportAnalysis" component={ReportAnalysisScreen} />
                        <Stack.Screen name="HealthRecords" component={HealthRecordsScreen} />
                        <Stack.Screen name="MedicineReminder" component={MedicineReminderScreen} />
                        <Stack.Screen name="AddMedicine" component={AddMedicineScreen} options={{ presentation: 'modal' }} />
                        <Stack.Screen name="Emergency" component={EmergencyScreen} />
                        <Stack.Screen name="Settings" component={SettingsScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
