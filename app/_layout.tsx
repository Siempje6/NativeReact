import { Slot } from 'expo-router';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // <-- hier aangepast
import React from 'react';

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#222' }}>
      <StatusBar barStyle="light-content" />
      <Slot />
    </SafeAreaView>
  );
}
