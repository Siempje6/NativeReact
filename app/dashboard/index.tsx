import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebaseConfig';

export default function Dashboard() {
  const [username, setUsername] = useState<string | null>(null);

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
      </View>
    </View>
  );
}

const account = StyleSheet.create({
  account: {
    flexDirection: 'row',
    height: '20%',
    width: '70%',
    backgroundColor: '#222',
    marginHorizontal: 5,
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
  usernameText:{
    color: '#fff',
    fontSize: 16,
    fontFamily  
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

});
