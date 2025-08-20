import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { TV_THEME } from '../styles/theme';

interface AppIconProps {
  size?: number;
}

export const AppIcon: React.FC<AppIconProps> = ({ size = 40 }) => {
  const iconSize = Platform.isTV ? size * 1.2 : size;
  
  return (
    <View style={[styles.container, { width: iconSize, height: iconSize }]}>
      <View style={[styles.tvScreen, { borderWidth: iconSize * 0.06 }]}>
        <View style={styles.playButton} />
      </View>
      <Text style={[styles.text, { fontSize: iconSize * 0.25 }]}>TV</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: TV_THEME.colors.primary,
    borderRadius: 8,
    padding: 4,
  },
  tvScreen: {
    width: '70%',
    height: '50%',
    borderColor: TV_THEME.colors.text,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 0,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderLeftColor: TV_THEME.colors.text,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    marginLeft: 2,
  },
  text: {
    color: TV_THEME.colors.text,
    fontWeight: 'bold',
    marginTop: 2,
  },
});