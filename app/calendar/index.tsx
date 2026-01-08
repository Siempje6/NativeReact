import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Calender() {
  const router = useRouter();

  const tabs = [
    { name: 'Home', icon: 'home-outline', route: '/dashboard' },
    { name: 'Kalender', icon: 'calendar-outline', route: '/calendar' },
    { name: 'Uren', icon: 'time-outline', route: '/hours' },
    { name: 'Account', icon: 'person-outline', route: '/account' },
    { name: 'Instellingen', icon: 'settings-outline', route: '/settings' },
  ];

  const [activeTab, setActiveTab] = useState('Kalender');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Calender</Text>
        
      </View>

      {/* Bottom Navigation */}
      <View style={navStyles.row}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={navStyles.tabButton}
            onPress={() => {
              setActiveTab(tab.name);
              router.push(tab.route);
            }}
          >
            <Ionicons
              name={tab.icon}
              size={18}
              color={activeTab === tab.name ? '#F39C12' : '#fff'}
            />
            <Text
              style={[
                navStyles.navItem,
                { color: activeTab === tab.name ? '#F39C12' : '#fff' },
              ]}
            >
              {tab.name}
            </Text>
            {activeTab === tab.name && <View style={navStyles.activeDot} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'space-between',
    backgroundColor:'#222',
  },
  inputContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  label: {
    color:'#fff',
    fontSize:18,
    marginBottom:10,
  },
  input: {
    backgroundColor:'#333',
    color:'#fff',
    padding:10,
    width:150,
    borderRadius:10,
    textAlign:'center',
  },
});

const navStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#222',
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    marginBottom: 18,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  navItem: {
    fontSize: 12,
    marginTop: 2,
    color: '#fff',
  },
});
