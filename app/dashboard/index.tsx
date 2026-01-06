import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';

export default function Dashboard() {
  const expectedSalary = 1520.75;
  const workedHoursThisMonth = 72;
  const vacationPay = 121.66;
  const savedVacationPay = 54.32;
  const username = "Siem van Hoof";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welkom terug,</Text>
        <Text style={styles.username}>{username}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Verwacht Maandloon</Text>
        <Text style={styles.cardValue}>€ {expectedSalary.toFixed(2)}</Text>
      </View>

      <View style={styles.savingContainer}>
        <View style={styles.savingBlock}>
          <Text style={styles.savingTitle}>Uren gewerkt deze maand</Text>
          <Text style={styles.savingValue}>{workedHoursThisMonth}u</Text>
        </View>
        <View style={styles.savingBlock}>
          <Text style={styles.savingTitle}>Saving Goal</Text>
          <Text style={styles.savingValue}>€ 0.00</Text> 
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoBlock}>
          <Text style={styles.infoTitle}>Vakantiegeld dit jaar</Text>
          <Text style={styles.infoValue}>€ {vacationPay.toFixed(2)}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.infoTitle}>Gespaard vakantiegeld</Text>
          <Text style={styles.infoValue}>€ {savedVacationPay.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },

  /* HEADER */
  header: {
    marginTop: 20,
  },
  headerText: {
    color: '#888',
    fontSize: 16,
  },
  username: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
  },

  /* SALARY CARD */
  card: {
    backgroundColor: '#333',
    borderRadius: 14,
    padding: 20,
    marginTop: 20,
  },
  cardTitle: {
    color: '#ccc',
    fontSize: 14,
  },
  cardValue: {
    color: '#F39C12',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 10,
  },

  /* SAVING GOALS */
  savingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  savingBlock: {
    backgroundColor: '#333',
    borderRadius: 14,
    flex: 1,
    padding: 15,
    marginHorizontal: 5,
  },
  savingTitle: {
    color: '#888',
    fontSize: 14,
    marginBottom: 8,
  },
  savingValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  infoBlock: {
    backgroundColor: '#333',
    borderRadius: 14,
    flex: 1,
    padding: 15,
    marginHorizontal: 5,
  },
  infoTitle: {
    color: '#888',
    fontSize: 14,
    marginBottom: 8,
  },
  infoValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },

  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 14,
    backgroundColor: '#111',
    borderTopWidth: 1,
    borderColor: '#333',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#888',
    fontSize: 14,
  },
});
