import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { TV_THEME } from '../styles/theme';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  const [retryFocused, setRetryFocused] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <Pressable
          style={[styles.retryButton, retryFocused && styles.retryButtonFocused]}
          onPress={onRetry}
          onFocus={() => setRetryFocused(true)}
          onBlur={() => setRetryFocused(false)}
          hasTVPreferredFocus={true}
        >
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: TV_THEME.colors.background,
    padding: TV_THEME.spacing.xl,
  },
  title: {
    fontSize: TV_THEME.typography.h1.fontSize,
    fontWeight: TV_THEME.typography.h1.fontWeight,
    color: TV_THEME.colors.primary,
    marginBottom: TV_THEME.spacing.md,
  },
  message: {
    fontSize: TV_THEME.typography.body.fontSize,
    color: TV_THEME.colors.text,
    textAlign: 'center',
    marginBottom: TV_THEME.spacing.lg,
  },
  retryButton: {
    backgroundColor: TV_THEME.colors.primary,
    paddingHorizontal: TV_THEME.spacing.lg,
    paddingVertical: TV_THEME.spacing.sm,
    borderRadius: TV_THEME.borderRadius.md,
  },
  retryButtonFocused: {
    transform: [{ scale: 1.1 }],
    backgroundColor: '#ff0a16',
  },
  retryText: {
    color: TV_THEME.colors.text,
    fontSize: TV_THEME.typography.body.fontSize,
    fontWeight: '600',
  },
});