import React, { useEffect, useRef } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Platform,
  Animated,
} from 'react-native';
import { TV_THEME } from '../styles/theme';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <ActivityIndicator size={'large'} color={TV_THEME.colors.primary} />
        {message && <Text style={styles.message}>{message}</Text>}
        <Text style={styles.hint}>Please wait...</Text>
      </Animated.View>
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
  content: {
    alignItems: 'center',
    padding: TV_THEME.spacing.xl,
  },
  message: {
    marginTop: TV_THEME.spacing.md,
    color: TV_THEME.colors.text,
    fontSize: Platform.isTV ? 24 : TV_THEME.typography.body.fontSize,
    fontWeight: '600',
  },
  hint: {
    marginTop: TV_THEME.spacing.sm,
    color: TV_THEME.colors.textSecondary,
    fontSize: Platform.isTV ? 18 : 14,
  },
});
