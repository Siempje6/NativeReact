import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topcontainer}>
        <Image
          source={require('../assets/images/Logo.png')}
          style={styles.logoImg}
        />
        <Text style={styles.h2}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </Text>
        <Text style={styles.p}>
          A quidem consequuntur harum doloribus nesciunt similique blanditiis
        </Text>
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
  container: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40, 
    paddingHorizontal: 24,
  },
  topcontainer: {
    alignItems: 'center',
  },
  logoImg: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  h2: {
    fontSize: 28,
    fontWeight: '600',
    color: '#F39C12',
    textAlign: 'center',
    marginBottom: 15,
  },
  p: {
    fontSize: 16,
    fontWeight: '300',
    color: '#f9f9ed',
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomcontainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    paddingVertical: 18,
    borderRadius: 12,
    backgroundColor: '#F39C12',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
