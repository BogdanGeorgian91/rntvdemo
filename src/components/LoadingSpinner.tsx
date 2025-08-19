import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { TV_THEME } from '../styles/theme';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={TV_THEME.colors.primary} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: TV_THEME.colors.background,
  },
  message: {
    marginTop: TV_THEME.spacing.md,
    color: TV_THEME.colors.text,
    fontSize: TV_THEME.typography.body.fontSize,
  },
});