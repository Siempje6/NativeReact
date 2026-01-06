// app/dashboard/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard() {
  const router = useRouter();
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [workedHours, setWorkedHours] = useState<number>(0);

  useEffect(() => {
    const loadData = async () => {
      const rate = await AsyncStorage.getItem('hourlyRate');
      setHourlyRate(rate ? parseFloat(rate) : 0);

      const hoursData = await AsyncStorage.getItem('workedHours');
      if (hoursData) {
        const parsed: Record<string, number> = JSON.parse(hoursData);
        const total = Object.values(parsed).reduce((acc, h) => acc + h, 0);
        setWorkedHours(total);
      }
    };
    loadData();
  }, []);

  const monthlyEarnings = workedHours * hourlyRate;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.text}>Totaal gewerkte uren: {workedHours}</Text>
      <Text style={styles.text}>Uurloon: €{hourlyRate.toFixed(2)}</Text>
      <Text style={styles.text}>Verwacht salaris: €{monthlyEarnings.toFixed(2)}</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/calender')}>
        <Text style={styles.buttonText}>Ga naar Kalender</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('../settings')}>
        <Text style={styles.buttonText}>Instellingen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#222' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#F39C12', marginBottom: 20 },
  text: { color: '#fff', fontSize: 18, marginBottom: 10 },
  button: { backgroundColor: '#F39C12', padding: 15, borderRadius: 10, marginVertical: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
