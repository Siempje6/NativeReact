import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.topcontainer}>
                <View style={styles.logo}>
                    <Text>MR</Text>
                </View>
            </View>

            <View style={styles.bottomcontainer}>
                <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    logo: {

    },
    container: {
        width: '100%',
        height: '100%',
    },
    topcontainer: {
        height: '80%',
        width: '100%',
    },
    bottomcontainer: {
        height: '20%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#005eff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 80,
        paddingVertical: 20,
        borderRadius: 20
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    },
});
