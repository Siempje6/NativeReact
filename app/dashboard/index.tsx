import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebaseConfig';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SwitchButton from '../../components/switchbutton/switchbutton';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateMonthlySalary } from '../utils/salaryUtils';

export default function Dashboard() {
  const [urenDezeMaand, setUrenDezeMaand] = useState<number>(40);

  useEffect(() => {
    const loadUren = async () => {
      const saved = await AsyncStorage.getItem('urenDezeMaand');
      if (saved) setUrenDezeMaand(Number(saved));
    };
    loadUren();
  }, []);

  const uurloon = 10.50;

  const { bedrag, maandloon, vakantiegeld } = calculateMonthlySalary(urenDezeMaand, uurloon);


  const [activeTab, setActiveTab] = useState('Home');

  const tabs = [
    { name: 'Home', icon: 'home-outline', route: '/dashboard' },
    { name: 'Kalender', icon: 'calendar-outline', route: '/calendar' },
    { name: 'Uren', icon: 'time-outline', route: '/hours' },
    { name: 'Account', icon: 'person-outline', route: '/account' },
    { name: 'Instellingen', icon: 'settings-outline', route: '/settings' },
  ];

  const router = useRouter();

  const [isLeftActive, setIsLeftActive] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setIsLoggedIn(false);
        setUsername(null);
        router.replace('/login');
        return;
      }

      setIsLoggedIn(true);
      setLoadingUser(true);

      try {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data() as { name?: string };
          setUsername(data.name ?? firebaseUser.email ?? 'User');
        } else {
          setUsername(firebaseUser.displayName ?? firebaseUser.email ?? 'User');
        }
      } catch (error) {
        console.log('Error loading user:', error);
        setUsername(firebaseUser.displayName ?? firebaseUser.email ?? 'User');
      } finally {
        setLoadingUser(false);
      }

    });

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/login');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={account.account}>
          <TouchableOpacity
            onPress={() => router.push('/account')}
            style={[
              account.accountProfile,
              { backgroundColor: isLoggedIn ? '#2ecc71' : '#333' }
            ]}
          >
            <Image
              source={require('../../assets/images/User.png')}
              style={account.user}
            />
          </TouchableOpacity>

          <View style={account.username}>
            <Text style={account.usernameText}>
              {loadingUser ? 'Loading...' : username}
            </Text>
          </View>

          <View style={account.bgImage}>
            <TouchableOpacity onPress={handleLogout}>
              <Image
                source={require('../../assets/images/Logout.png')}
                style={account.settings}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.euro}>
            €<Text style={styles.mothlypay}> {maandloon.toFixed(2)}</Text>
          </Text>
        </View>
      </View>

      <View style={month.month}>
        <View style={month.blocks}>
          <View style={month.monthBlockLeft}>
            <Text style={month.text}>
              {urenDezeMaand.toFixed(0)} <Text style={month.hour}>hours</Text>
            </Text>
          </View>

          <View style={month.monthBlockRight}>
            <Text style={month.text}>
              <Text style={month.euro}>€</Text>{uurloon.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ alignItems: 'center', marginTop: 5 }}>
        <SwitchButton
          leftLabel="Maand"
          rightLabel="Jaar"
          isLeftButtonActive={isLeftActive}
          onLeftTabClicked={() => setIsLeftActive(true)}
          onRightTabClicked={() => setIsLeftActive(false)}
        />
      </View>

      <View style={tabsswitch.contentContainer}>
        {isLeftActive ? (
          <View style={tabsswitch.tabView}>
            <View style={tabsswitch.year}>
              <Text style={tabsswitch.tabTitle}>Vakantiegeld Januari</Text>
            </View>

            <View style={tabsswitch.months}>
              <View style={tabsswitch.hours}>
                <Text style={month.text}>
                  {urenDezeMaand.toFixed(0)} <Text style={month.hour}>hours</Text>
                </Text>
              </View>

              <View style={tabsswitch.month}>
                <Text style={month.text}>
                  <Text style={month.euro}>€</Text> {vakantiegeld.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={tabsswitch.tabView}>
            <View style={tabsswitch.year}>
              <Text style={tabsswitch.tabTitle}>Vakantiegeld 2026</Text>
            </View>

            <View style={tabsswitch.months}>
              <View style={tabsswitch.hours}>
                <Text style={month.text}>
                  {urenDezeMaand.toFixed(0)} <Text style={month.hour}>hours</Text>
                </Text>
              </View>

              <View style={tabsswitch.month}>
                <Text style={month.text}>
                  <Text style={month.euro}>€</Text> {vakantiegeld.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>

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

const navStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#222',
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: 15,
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



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  topSection: {
    height: '40%',
    backgroundColor: '#333',
  },
  card: {
    height: '70%',
    width: '94%',
    backgroundColor: '#222',
    margin: 10,
    borderRadius: 20,
    justifyContent: 'flex-end',
  },
  mothlypay: {
    fontSize: 33,
    color: '#fff',
    fontWeight: 'bold',
  },
  euro: {
    margin: 20,
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  navigation: {
    width: '94%',
    height: '10%',
    backgroundColor: '#333',
    marginTop: 30,
    borderRadius: 20,
  },
});

const tabsswitch = StyleSheet.create({
  contentContainer: {
    width: '94%',
    height: '19%',
    margin: 10,
  },
  tabView: {
    flexDirection: 'column',
  },
  year: {
    width: '100%',
    backgroundColor: '#222',
    alignItems: 'center',
  },
  tabTitle: {
    color: '#fff',
    fontWeight: 'bold',
    margin: 10,
  },
  months: {
    flexDirection: 'row',
    height: '120%',
  },
  hours: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '49%',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: '#333',
  },
  month: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '49%',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#333',
  },
});

const month = StyleSheet.create({
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 32,
  },
  euro: {
    fontSize: 12,
  },
  hour: {
    fontSize: 12,
  },
  month: {
    margin: 10,
    height: '13%',
    width: '94%',
    borderRadius: 20,
  },
  blocks: {
    height: '100%',
    width: '100%',
    backgroundColor: '#222',
    borderRadius: 20,
    flexDirection: 'row',
    gap: 5,
  },
  monthBlockLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '49.5%',
    borderColor: '#333',
    borderWidth: 2,
    backgroundColor: '#333',
    borderRadius: 20,
  },
  monthBlockRight: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '49.5%',
    borderColor: '#333',
    borderWidth: 2,
    backgroundColor: '#333',
    borderRadius: 20,
  },
});

const account = StyleSheet.create({
  account: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '20%',
    width: '94%',
    backgroundColor: '#222',
    marginHorizontal: 10,
    marginTop: 5,
    borderRadius: 50,
  },
  accountProfile: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '12%',
    height: '80%',
    backgroundColor: '#333',
    margin: 5,
    borderRadius: 50,
  },
  username: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  usernameText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  bgImage: {
    backgroundColor: '#e74c3c',
    padding: 8,
    paddingRight: 0,
    margin: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settings: {
    width: 27,
    height: 27,
    marginRight: 7,
  },
  user: {
    width: 32,
    height: 32,
  },
});
