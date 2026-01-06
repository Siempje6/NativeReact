// app/settings/index.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings() {
  const [hourlyRate, setHourlyRate] = useState<string>('');

  useEffect(() => {
    const loadRate = async () => {
      const rate = await AsyncStorage.getItem('hourlyRate');
      if (rate) setHourlyRate(rate);
    };
    loadRate();
  }, []);

  const saveRate = async () => {
    const rate = parseFloat(hourlyRate);
    if (isNaN(rate)) return Alert.alert('Voer een geldig nummer in');
    await AsyncStorage.setItem('hourlyRate', rate.toString());
    Alert.alert('Uurloon opgeslagen!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instellingen</Text>
      <Text style={styles.label}>Uurloon (€):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={hourlyRate}
        onChangeText={setHourlyRate}
      />
      <TouchableOpacity style={styles.button} onPress={saveRate}>
        <Text style={styles.buttonText}>Opslaan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#222' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#F39C12', marginBottom: 20 },
  label: { color: '#fff', marginBottom: 10 },
  input: { backgroundColor: '#333', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 20 },
  button: { backgroundColor: '#F39C12', padding: 15, borderRadius: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
});
