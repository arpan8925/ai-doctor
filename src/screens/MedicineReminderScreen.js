import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import ScreenWrapper from '../components/ScreenWrapper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function MedicineReminderScreen({ navigation }) {
    const [reminders, setReminders] = useState([
        { id: '1', name: 'Amoxicillin', dosage: '500mg', time: '08:00 AM', taken: false },
        { id: '2', name: 'Vitamin D', dosage: '1 Tablet', time: '02:00 PM', taken: false },
    ]);

    const toggleTaken = (id) => {
        setReminders(prev => prev.map(item =>
            item.id === id ? { ...item, taken: !item.taken } : item
        ));
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardLeft}>
                <View style={[styles.iconBox, { backgroundColor: item.taken ? COLORS.success : COLORS.primary }]}>
                    <Ionicons name="medkit" size={24} color={COLORS.white} />
                </View>
                <View>
                    <Text style={[styles.medName, item.taken && styles.medNameTaken]}>{item.name}</Text>
                    <Text style={styles.medDetails}>{item.dosage} • {item.time}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => toggleTaken(item.id)}>
                <Ionicons
                    name={item.taken ? "checkbox" : "square-outline"}
                    size={28}
                    color={item.taken ? COLORS.success : COLORS.textSecondary}
                />
            </TouchableOpacity>
        </View>
    );

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5 }}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Medicine Scheduler</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.content}>
                <View style={styles.infoBox}>
                    <Text style={styles.dateText}>Today, {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
                    <Text style={styles.subText}>2 of 3 medicines taken</Text>
                </View>

                <FlatList
                    data={reminders}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingVertical: 20 }}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 50, color: COLORS.textSecondary }}>No medicines scheduled for today.</Text>}
                />
            </View>

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddMedicine')}
            >
                <LinearGradient
                    colors={[COLORS.primary, '#9D50BB']}
                    style={styles.fabGradient}
                >
                    <Ionicons name="add" size={32} color={COLORS.white} />
                </LinearGradient>
            </TouchableOpacity>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: SIZES.padding,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    content: {
        flex: 1,
        paddingHorizontal: SIZES.padding,
    },
    infoBox: {
        marginBottom: 10,
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    subText: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginTop: 5,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        padding: 15,
        borderRadius: SIZES.radius,
        marginBottom: 15,
        ...SHADOWS.small,
    },
    cardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 45,
        height: 45,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    medName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    medNameTaken: {
        textDecorationLine: 'line-through',
        color: COLORS.textSecondary,
    },
    medDetails: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        borderRadius: 30,
        ...SHADOWS.medium,
    },
    fabGradient: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
