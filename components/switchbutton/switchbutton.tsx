import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  leftLabel: string;
  rightLabel: string;
  isLeftButtonActive: boolean;
  onLeftTabClicked: () => void;
  onRightTabClicked: () => void;
}

export default function SwitchButton({
  leftLabel,
  rightLabel,
  isLeftButtonActive,
  onLeftTabClicked,
  onRightTabClicked,
}: Props) {
  const translateX = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerWidth === 0) return;

    Animated.spring(translateX, {
      toValue: isLeftButtonActive ? 0 : containerWidth / 2,
      useNativeDriver: false,
    }).start();
  }, [isLeftButtonActive, containerWidth]);

  return (
    <View
      style={styles.container}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <Animated.View
        style={[
          styles.indicator,
          { transform: [{ translateX }] },
        ]}
      />

      <TouchableOpacity style={styles.tab} onPress={onLeftTabClicked}>
        <Text style={[styles.label, isLeftButtonActive && styles.active]}>
          {leftLabel}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={onRightTabClicked}>
        <Text style={[styles.label, !isLeftButtonActive && styles.active]}>
          {rightLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '94%',
    height: 44,
    backgroundColor: '#333',
    borderRadius: 22,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  label: {
    color: '#F39C12',
    fontSize: 14,
    fontWeight: '600',
  },
  active: {
    color: '#fff',
  },
  indicator: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    backgroundColor: '#F39C12',
    borderRadius: 22,
    zIndex: 1,
  },
});
