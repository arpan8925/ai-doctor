import * as SecureStore from 'expo-secure-store';

const tokenCache = {
    async getToken(key) {
        try {
            return await SecureStore.getItemAsync(key);
        } catch (err) {
            return null;
        }
    },
    async saveToken(key, value) {
        try {
            await SecureStore.setItemAsync(key, value);
        } catch (err) {
            return;
        }
    },
};

export default tokenCache;
