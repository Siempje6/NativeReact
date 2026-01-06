import { TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import React from 'react';

export function HapticTab({ children, onPress }: { children: React.ReactNode; onPress?: () => void }) {
  return (
    <TouchableOpacity
      onPress={() => {
        Haptics.selectionAsync();
        onPress?.();
      }}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      {children}
    </TouchableOpacity>
  );
}
