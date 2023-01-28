import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = {
  style?: object;
  name: any;
  onPress?: () => void;
};

const CircleButton = ({ style, name, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.circleButton, style]}>
      <Feather name={name} size={32} color='#ffffff' />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circleButton: {
    backgroundColor: '#467FD3',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 40,
    bottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 8, // iOS
    elevation: 8, // Android
  },
  circleButtonLabel: {
    color: '#fff',
    fontSize: 40,
    lineHeight: 40,
  },
});

export default CircleButton;
