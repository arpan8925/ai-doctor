import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = '@health_history';

export const saveHealthRecord = async (record) => {
    try {
        const existingData = await AsyncStorage.getItem(HISTORY_KEY);
        let history = existingData ? JSON.parse(existingData) : [];

        // Add new record at the top with timestamp
        const newRecord = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            ...record
        };

        history = [newRecord, ...history];
        await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
        console.error('Failed to save health record', e);
    }
};

export const getHealthHistory = async () => {
    try {
        const existingData = await AsyncStorage.getItem(HISTORY_KEY);
        return existingData ? JSON.parse(existingData) : [];
    } catch (e) {
        console.error('Failed to fetch health history', e);
        return [];
    }
};

export const clearHealthHistory = async () => {
    try {
        await AsyncStorage.removeItem(HISTORY_KEY);
    } catch (e) {
        console.error('Failed to clear history');
    }
};
