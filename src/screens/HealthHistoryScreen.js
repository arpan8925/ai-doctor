import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import ScreenWrapper from '../components/ScreenWrapper';
import { Ionicons } from '@expo/vector-icons';
import { getHealthHistory, clearHealthHistory } from '../utils/storage';

export default function HealthHistoryScreen({ navigation }) {
    const [history, setHistory] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const loadHistory = async () => {
        setRefreshing(true);
        const data = await getHealthHistory();
        setHistory(data);
        setRefreshing(false);
    };

    useEffect(() => {
        loadHistory();
    }, []);

    const handleClear = async () => {
        await clearHealthHistory();
        loadHistory();
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.iconBox}>
                    <Ionicons name={item.type === 'Symptom Analysis' ? 'pulse' : 'document-text'} size={24} color={COLORS.primary} />
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.cardTitle}>{item.summary}</Text>
                    <Text style={styles.cardDate}>{new Date(item.date).toLocaleDateString()} • {new Date(item.date).toLocaleTimeString()}</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: item.details?.urgency === 'High' ? COLORS.danger : COLORS.success }]}>
                    <Text style={styles.badgeText}>{item.details?.urgency || 'Info'}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5 }}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Health History</Text>
                <TouchableOpacity onPress={handleClear}>
                    <Text style={{ color: COLORS.danger }}>Clear</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={history}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: SIZES.padding }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={loadHistory} tintColor={COLORS.primary} />
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="time-outline" size={60} color={COLORS.border} />
                        <Text style={styles.emptyText}>No history yet.</Text>
                        <Text style={styles.emptySubText}>Your health analysis records will appear here.</Text>
                    </View>
                }
            />
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SIZES.padding,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    card: {
        backgroundColor: COLORS.white,
        padding: 15,
        borderRadius: SIZES.radius,
        marginBottom: 15,
        ...SHADOWS.small,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    cardDate: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    badgeText: {
        color: COLORS.white,
        fontSize: 10,
        fontWeight: 'bold',
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textSecondary,
        marginTop: 10,
    },
    emptySubText: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginTop: 5,
        textAlign: 'center',
    }
});
