import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';

export default function Dashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Root Layout is gemount
  }, []);

  useEffect(() => {
    if (!mounted) return; // wacht tot mounted

    const user = auth.currentUser;

    if (!user) {
      // redirect veilig uitvoeren
      setTimeout(() => {
        router.replace('/'); // terug naar login
      }, 0);
      return;
    }

    setUserName(user.displayName || user.email || 'User');
  }, [mounted]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/'); // terug naar login
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!userName) return null; // voorkomt renderen voor user loaded

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {userName}!</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: '#F39C12',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#F39C12',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
