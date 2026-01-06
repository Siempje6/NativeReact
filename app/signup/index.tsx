import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const criteria = {
    length: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const strengthCount = Object.values(criteria).filter(Boolean).length; 
  const strengthPercent = (strengthCount / Object.keys(criteria).length) * 100;

  const handleSignUp = async () => {
    setError('');
    if (!name || !email || !password) {
      setError('Vul alle velden in!');
      return;
    }

    if (strengthCount < 5) {
      setError('Wachtwoord voldoet niet aan alle eisen.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      router.replace('/dashboard');
    } catch (err: any) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Deze email is al in gebruik.');
          break;
        case 'auth/invalid-email':
          setError('Ongeldig emailadres.');
          break;
        case 'auth/weak-password':
          setError('Wachtwoord is te zwak.');
          break;
        default:
          setError(err.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#fff" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#ccc"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#fff" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="#fff" style={{ marginRight: 10 }} />
        </TouchableOpacity>
      </View>

      <View style={styles.strengthBarContainer}>
        <View style={[styles.strengthBar, { width: `${strengthPercent}%`, backgroundColor: strengthPercent < 60 ? '#ff4d4d' : strengthPercent < 100 ? '#ffd11a' : '#4dff4d' }]} />
      </View>

      <View style={styles.criteriaList}>
        {[
          { label: 'Min. 8 tekens', key: 'length' },
          { label: 'Min. 1 hoofdletter', key: 'hasUpper' },
          { label: 'Min. 1 kleine letter', key: 'hasLower' },
          { label: 'Min. 1 nummer', key: 'hasNumber' },
          { label: 'Min. 1 speciaal teken', key: 'hasSpecial' },
        ].map((c) => (
          <View key={c.key} style={styles.criteriaItem}>
            <Ionicons name="ellipse" size={12} color={criteria[c.key as keyof typeof criteria] ? 'green' : 'red'} style={{ marginRight: 8 }} />
            <Text style={styles.criteriaText}>{c.label}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, { opacity: strengthCount < 5 ? 0.6 : 1 }]}
        onPress={handleSignUp}
        disabled={strengthCount < 5}
      >
        <Text style={styles.buttonText}>Register</Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#222', paddingHorizontal: 24, justifyContent: 'center' },
  title: { fontSize: 28, color: '#F39C12', fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#333', borderRadius: 8, marginBottom: 20 },
  icon: { paddingLeft: 10, paddingRight: 10 },
  input: { flex: 1, height: 50, color: '#fff', fontSize: 16 },
  button: { flexDirection: 'row', backgroundColor: '#F39C12', paddingVertical: 15, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  linkText: { color: '#ccc', textAlign: 'center', fontSize: 14 },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
  strengthBarContainer: { height: 6, backgroundColor: '#444', borderRadius: 4, marginBottom: 10 },
  strengthBar: { height: 6, borderRadius: 4 },
  criteriaList: { marginBottom: 20 },
  criteriaItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  criteriaText: { color: '#ccc', fontSize: 14 },
});
