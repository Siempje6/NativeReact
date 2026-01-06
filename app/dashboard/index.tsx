import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const loadUser = async () => {
            const loggedIn = await AsyncStorage.getItem('loggedInUser');
            if (!loggedIn) {
                router.replace('/login'); 
                return;
            }
            setUser(JSON.parse(loggedIn));
        };
        loadUser();
    }, []);

    const logout = async () => {
        await AsyncStorage.removeItem('loggedInUser');
        router.replace('/login');
    };

    if (!user) return null; 

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome {user.name}!</Text>
            <TouchableOpacity style={styles.button} onPress={logout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222' },
    title: { fontSize: 24, color: '#F39C12', marginBottom: 20 },
    button: { backgroundColor: '#F39C12', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 10 },
    buttonText: { color: '#fff', fontWeight: 'bold' }
});
