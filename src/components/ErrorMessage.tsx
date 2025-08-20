import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { TV_THEME } from '../styles/theme';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
}) => {
  const [retryFocused, setRetryFocused] = useState(false);

  const canUseForeground =
    Platform.OS === 'android' &&
    TouchableNativeFeedback.canUseNativeForeground &&
    TouchableNativeFeedback.canUseNativeForeground();

  const returnPlatformBtn =
    onRetry &&
    (Platform.OS === 'android' && Platform.isTV ? (
      <TouchableNativeFeedback
        onPress={onRetry}
        onFocus={() => setRetryFocused(true)}
        onBlur={() => setRetryFocused(false)}
        hasTVPreferredFocus={true}
        useForeground={canUseForeground}
      >
        <View
          style={[
            styles.retryButton,
            retryFocused && styles.retryButtonFocused,
          ]}
        >
          <Text style={styles.retryText}>Retry</Text>
        </View>
      </TouchableNativeFeedback>
    ) : (
      <TouchableOpacity
        style={[styles.retryButton, retryFocused && styles.retryButtonFocused]}
        activeOpacity={0.7}
        onPress={onRetry}
        onFocus={() => setRetryFocused(true)}
        onBlur={() => setRetryFocused(false)}
        hasTVPreferredFocus={true}
      >
        <Text style={styles.retryText}>Retry</Text>
      </TouchableOpacity>
    ));

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>⚠️</Text>
      </View>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>{message}</Text>
      {returnPlatformBtn}
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
  iconContainer: {
    marginBottom: TV_THEME.spacing.lg,
  },
  icon: {
    fontSize: Platform.isTV ? 72 : 48,
  },
  title: {
    fontSize: Platform.isTV ? 36 : TV_THEME.typography.h2.fontSize,
    fontWeight: TV_THEME.typography.h1.fontWeight,
    color: TV_THEME.colors.text,
    marginBottom: TV_THEME.spacing.md,
  },
  message: {
    fontSize: Platform.isTV ? 20 : TV_THEME.typography.body.fontSize,
    color: TV_THEME.colors.textSecondary,
    textAlign: 'center',
    marginBottom: TV_THEME.spacing.xl,
    maxWidth: 600,
    lineHeight: Platform.isTV ? 28 : 24,
  },
  retryButton: {
    backgroundColor: TV_THEME.colors.primary,
    paddingHorizontal: TV_THEME.spacing.xl,
    paddingVertical: TV_THEME.spacing.md,
    borderRadius: TV_THEME.borderRadius.md,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  retryButtonFocused: {
    transform: [{ scale: 1.1 }],
    backgroundColor: '#ff0a16',
    elevation: 8,
  },
  retryText: {
    color: TV_THEME.colors.text,
    fontSize: Platform.isTV ? 20 : TV_THEME.typography.body.fontSize,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
