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

    // Features based on 9-Screen PRD
    const SECONDARY_FEATURES = [
        {
            id: 2,
            title: 'Report Analysis',
            icon: 'scan',
            screen: 'ReportAnalysis',
            colors: ['#4FACFE', '#00F2FE'],
        },
        {
            id: 3,
            title: 'AI Helper',
            icon: 'happy',
            screen: 'AIChat',
            colors: ['#a18cd1', '#fbc2eb'],
        },
        {
            id: 4,
            title: 'Health History',
            icon: 'time',
            screen: 'HealthHistory',
            colors: ['#84fab0', '#8fd3f4'],
        },
    ];

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

                {/* Main Feature: Primary Symptom Analysis */}
                <Text style={styles.sectionTitle}>Start Health Check</Text>
                <TouchableOpacity
                    style={styles.mainFeatureBtn}
                    onPress={() => navigation.navigate('SymptomInput')}
                    activeOpacity={0.9}
                >
                    <LinearGradient
                        colors={['#FF9A9E', '#FECFEF']}
                        style={styles.mainFeatureGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <View style={styles.mainIconCircle}>
                            <Ionicons name="pulse" size={40} color={COLORS.primary} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.mainFeatureTitle}>Primary Symptom Analysis</Text>
                            <Text style={styles.mainFeatureSubtitle}>
                                Check symptoms & get instant advice
                            </Text>
                        </View>
                        <Ionicons name="arrow-forward-circle" size={32} color={COLORS.white} />
                    </LinearGradient>
                </TouchableOpacity>

                <Text style={[styles.sectionTitle, { marginTop: 30 }]}>More Options</Text>

                <View style={styles.grid}>
                    {SECONDARY_FEATURES.map((item) => (
                        <FeatureCard
                            key={item.id}
                            item={item}
                            onPress={() => item.screen ? navigation.navigate(item.screen) : alert('Coming Soon')}
                        />
                    ))}
                </View>

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
    mainFeatureBtn: {
        borderRadius: SIZES.radius,
        ...SHADOWS.medium,
        marginBottom: 10,
    },
    mainFeatureGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: SIZES.radius,
    },
    mainIconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    mainFeatureTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    mainFeatureSubtitle: {
        fontSize: 14,
        color: '#FFF',
        opacity: 0.9,
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
