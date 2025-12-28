import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import ScreenWrapper from '../components/ScreenWrapper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '@clerk/clerk-expo';

const FEATURES = [
    {
        id: 1,
        title: 'Check Symptoms',
        icon: 'pulse',
        screen: 'SymptomInput',
        colors: ['#FF9A9E', '#FECFEF'],
    },
    {
        id: 2,
        title: 'AI Doctor Chat',
        icon: 'chatbubbles',
        screen: 'AIChat',
        colors: ['#a18cd1', '#fbc2eb'],
    },
    {
        id: 3,
        title: 'Health Records',
        icon: 'document-text',
        screen: 'HealthRecords', // To implement
        colors: ['#84fab0', '#8fd3f4'],
    },
    {
        id: 4,
        title: 'Medicine Reminder',
        icon: 'alarm',
        screen: 'MedicineReminder', // To implement
        colors: ['#fccb90', '#d57eeb'],
    },
];

const FeatureCard = ({ item, onPress }) => {
    return (
        <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.cardContainer}>
            <LinearGradient
                colors={item.colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardGradient}
            >
                <Ionicons name={item.icon} size={32} color={COLORS.white} />
                <Text style={styles.cardTitle}>{item.title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default function HomeScreen({ navigation }) {
    const { user } = useUser();
    const handleEmergency = () => {
        navigation.navigate('Emergency'); // To implement
    };

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Image
                        source={{ uri: user?.imageUrl }}
                        style={styles.avatar}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.greeting}>Hello, {user?.firstName} 👋</Text>
                        <Text style={styles.subGreeting}>How are you feeling today?</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                    <Ionicons name="settings-outline" size={24} color={COLORS.text} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                {/* Emergency Button */}
                <TouchableOpacity style={styles.emergencyBtn} onPress={handleEmergency}>
                    <LinearGradient
                        colors={[COLORS.danger, '#FF6B6B']}
                        style={styles.emergencyGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Ionicons name="alert-circle" size={24} color={COLORS.white} style={{ marginRight: 10 }} />
                        <Text style={styles.emergencyText}>Emergency Help</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Services</Text>

                <View style={styles.grid}>
                    {FEATURES.map((item) => (
                        <FeatureCard
                            key={item.id}
                            item={item}
                            onPress={() => item.screen ? navigation.navigate(item.screen) : alert('Coming Soon')}
                        />
                    ))}
                </View>

                {/* Recent Activity or Insight could go here */}

            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SIZES.padding,
        paddingTop: SIZES.padding,
        marginBottom: 20,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    subGreeting: {
        fontSize: SIZES.font,
        color: COLORS.textSecondary,
    },
    content: {
        paddingHorizontal: SIZES.padding,
        paddingBottom: 50,
    },
    emergencyBtn: {
        marginBottom: 30,
        borderRadius: SIZES.radius,
        ...SHADOWS.medium,
    },
    emergencyGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: SIZES.radius,
    },
    emergencyText: {
        color: COLORS.white,
        fontSize: SIZES.large,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: SIZES.large,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 15,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    cardContainer: {
        width: '48%', // Slightly less than half to account for gap
        height: 140,
        marginBottom: 15,
        borderRadius: SIZES.radius,
        ...SHADOWS.small,
    },
    cardGradient: {
        flex: 1,
        borderRadius: SIZES.radius,
        padding: 15,
        justifyContent: 'space-between',
    },
    cardTitle: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
