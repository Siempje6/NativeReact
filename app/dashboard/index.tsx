import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebaseConfig';

import SwitchButton from '../../components/switchbutton/switchbutton';

export default function Dashboard() {
  const [username, setUsername] = useState<string | null>(null);
  const [isLeftActive, setIsLeftActive] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUsername(userDoc.data().name);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={account.account}>
          <View style={account.accountProfile} />
          <View style={account.username}>
            <Text style={account.usernameText}>
              {username ?? 'Loading...'}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardInfo} >
            <Text style={styles.euro}>€<Text style={styles.mothlypay}> 453.6</Text></Text>
          </View>
        </View>
      </View>

      <View style={month.month}>
        <View style={month.blocks}>

          <View style={month.monthBlockLeft} >
            <Text style={month.text}>
              40 <Text style={month.hour}>hours</Text>
            </Text>
          </View>

          <View style={month.monthBlockRight} >
            <Text style={month.text}>
              <Text style={month.euro}>€</Text>10.50 
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
    </View>
  );
}


const month = StyleSheet.create({
  text:{
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 32,
  },
  euro:{
    fontSize: 12,
  },
  hour:{
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
  },
  cardInfo: {
    marginHorizontal: 20,
    marginTop: 130,
  },
  mothlypay: {
    fontSize: 33,
    color: '#fff',
    fontWeight: 'bold',
  },
  euro:{
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
});

const account = StyleSheet.create({
  account: {
    flexDirection: 'row',
    height: '20%',
    width: '70%',
    backgroundColor: '#222',
    marginHorizontal: 10,
    marginTop: 5,
    borderRadius: 50,
  },
  accountProfile: {
    width: '20%',
    height: '80%',
    backgroundColor: '#333',
    margin: 5,
    borderRadius: 50,
  },
  username: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  usernameText: {
    color: '#fff',
    fontSize: 16,
  },
});
