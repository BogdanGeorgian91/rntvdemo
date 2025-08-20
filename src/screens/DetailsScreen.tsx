import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { RootStackParamList } from '../types';
import { TV_THEME } from '../styles/theme';
import { formatDurationDetail } from '../utils/utils';

interface DetailsScreenProps {
  navigation: NavigationProp<RootStackParamList, 'Details'>;
  route: RouteProp<RootStackParamList, 'Details'>;
}

export const DetailsScreen: React.FC<DetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const { item } = route.params;
  const [playButtonFocused, setPlayButtonFocused] = useState(false);

  const canUseForeground =
    Platform.OS === 'android' &&
    TouchableNativeFeedback.canUseNativeForeground &&
    TouchableNativeFeedback.canUseNativeForeground();

  const handlePlayPress = () => {
    navigation.navigate('Player', { item });
  };

  const imgSrc = item?.thumbnail
    ? {
        uri: item.thumbnail,
        priority: FastImage.priority.high,
      }
    : require('../assets/imgs/videoPlaceholder.png');

  const returnPlatformBtn =
    Platform.OS === 'android' && Platform.isTV ? (
      <TouchableNativeFeedback
        onPress={handlePlayPress}
        onFocus={() => setPlayButtonFocused(true)}
        onBlur={() => setPlayButtonFocused(false)}
        hasTVPreferredFocus={true}
        useForeground={canUseForeground}
      >
        <View
          style={[
            styles.playButton,
            playButtonFocused && styles.playButtonFocused,
          ]}
        >
          <Text style={styles.playButtonText}>PLAY</Text>
        </View>
      </TouchableNativeFeedback>
    ) : (
      <TouchableOpacity
        style={[
          styles.playButton,
          playButtonFocused && styles.playButtonFocused,
        ]}
        activeOpacity={0.7}
        onPress={handlePlayPress}
        onFocus={() => setPlayButtonFocused(true)}
        onBlur={() => setPlayButtonFocused(false)}
        hasTVPreferredFocus={true}
      >
        <Text style={styles.playButtonText}>PLAY</Text>
      </TouchableOpacity>
    );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <View style={styles.posterSection}>
          <FastImage
            style={styles.poster}
            source={imgSrc}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.title}>{item?.title}</Text>

          <View style={styles.metadata}>
            <Text style={styles.duration}>
              Duration: {formatDurationDetail(item?.duration)}
            </Text>
            <Text style={styles.format}>
              Format: {item?.streamUrl.includes('.m3u8') ? 'HLS' : 'MP4'}
            </Text>
          </View>

          <Text style={styles.description}>{item?.description}</Text>

          {returnPlatformBtn}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TV_THEME.colors.background,
  },
  content: {
    flexDirection: 'row',
    padding: TV_THEME.spacing.xl,
  },
  posterSection: {
    flex: 0.4,
    marginRight: TV_THEME.spacing.xl,
  },
  poster: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: TV_THEME.borderRadius.lg,
  },
  infoSection: {
    flex: 0.6,
    justifyContent: 'center',
  },
  title: {
    fontSize: TV_THEME.typography.h1.fontSize,
    fontWeight: TV_THEME.typography.h1.fontWeight,
    color: TV_THEME.colors.text,
    marginBottom: TV_THEME.spacing.md,
  },
  metadata: {
    flexDirection: 'row',
    marginBottom: TV_THEME.spacing.lg,
  },
  duration: {
    fontSize: TV_THEME.typography.caption.fontSize,
    color: TV_THEME.colors.textSecondary,
    marginRight: TV_THEME.spacing.lg,
  },
  format: {
    fontSize: TV_THEME.typography.caption.fontSize,
    color: TV_THEME.colors.textSecondary,
  },
  description: {
    fontSize: TV_THEME.typography.body.fontSize,
    lineHeight: TV_THEME.typography.body.lineHeight,
    color: TV_THEME.colors.text,
    marginBottom: TV_THEME.spacing.xl,
  },
  playButton: {
    backgroundColor: TV_THEME.colors.primary,
    paddingHorizontal: TV_THEME.spacing.xl,
    paddingVertical: TV_THEME.spacing.md,
    borderRadius: TV_THEME.borderRadius.md,
    alignSelf: 'flex-start',
  },
  playButtonFocused: {
    transform: [{ scale: 1.1 }],
    backgroundColor: '#ff0a16',
  },
  playButtonText: {
    color: TV_THEME.colors.text,
    fontSize: TV_THEME.typography.body.fontSize,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
