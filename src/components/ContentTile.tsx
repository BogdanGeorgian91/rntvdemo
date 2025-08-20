import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Platform,
  TouchableOpacity,
  Animated,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { VideoItem } from '../types';
import { TV_THEME } from '../styles/theme';
import { formatDurationTile } from '../utils/utils';

interface ContentTileProps {
  item: VideoItem;
  onPress: (item: VideoItem) => void;
  hasTVPreferredFocus?: boolean;
  index?: number;
  tileWidth?: number;
  tileHeight?: number;
}

export const ContentTile: React.FC<ContentTileProps> = ({
  item,
  onPress,
  hasTVPreferredFocus = false,
  index = 0,
  tileWidth = TV_THEME.tile.width,
  tileHeight = TV_THEME.tile.height,
}) => {
  const [focused, setFocused] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  const canUseForeground =
    Platform.OS === 'android' &&
    TouchableNativeFeedback.canUseNativeForeground &&
    TouchableNativeFeedback.canUseNativeForeground();

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: focused ? TV_THEME.tile.focusScale : 1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  }, [focused, scaleAnim]);

  const imgSrc = item.thumbnail
    ? {
        uri: item.thumbnail,
        priority: FastImage.priority.normal,
      }
    : require('../assets/imgs/videoPlaceholder.png');

  const dynamicStyles = StyleSheet.create({
    container: {
      width: tileWidth,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageContainer: {
      height: tileHeight,
      position: 'relative',
      backgroundColor: TV_THEME.colors.tileBg,
    },
  });

  const content = (
    <Animated.View 
      style={[
        styles.tileContent, 
        focused && styles.tileContentFocused,
        { 
          transform: [{ scale: scaleAnim }],
          width: tileWidth - 20, // Account for wrapper padding
        }
      ]}
    >
      <View style={styles.imgCtr}>
        <View style={dynamicStyles.imageContainer}>
          <FastImage
            style={styles.thumbnail}
            source={imgSrc}
            resizeMode={FastImage.resizeMode.cover}
            testID="thumbnail"
          />
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>
              {formatDurationTile(item?.duration)}
            </Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {item?.title}
          </Text>
        </View>
      </View>
    </Animated.View>
  );

  if (Platform.OS === 'android' && Platform.isTV) {
    return (
      <TouchableNativeFeedback
        onPress={() => onPress(item)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        hasTVPreferredFocus={hasTVPreferredFocus}
        focusable={true}
        useForeground={canUseForeground}
        testID={`content-tile-${index}`}
      >
        <View style={[dynamicStyles.container, styles.tileWrapper]}>{content}</View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity
      style={[dynamicStyles.container, styles.tileWrapper]}
      activeOpacity={0.7}
      onPress={() => onPress(item)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      hasTVPreferredFocus={hasTVPreferredFocus}
      testID={`content-tile-${index}`}
    >
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tileWrapper: {
    overflow: 'visible',
    padding: 10, // Add padding to prevent clipping when scaled
  },
  tileContent: {
    backgroundColor: TV_THEME.colors.tileBg,
    borderRadius: TV_THEME.borderRadius.md,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  tileContentFocused: {
    borderWidth: 2,
    borderColor: TV_THEME.colors.focus,
    elevation: 8,
    shadowColor: TV_THEME.colors.focus,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  imgCtr: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    backgroundColor: TV_THEME.colors.tileBg,
    borderRadius: TV_THEME.borderRadius.md,
  },
  durationBadge: {
    position: 'absolute',
    bottom: TV_THEME.spacing.xs,
    right: TV_THEME.spacing.xs,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: TV_THEME.spacing.xs,
    paddingVertical: 4,
    borderRadius: TV_THEME.borderRadius.sm,
  },
  durationText: {
    color: TV_THEME.colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  infoContainer: {
    padding: TV_THEME.spacing.sm,
    backgroundColor: TV_THEME.colors.tileBg,
  },
  title: {
    color: TV_THEME.colors.text,
    fontSize: TV_THEME.typography.caption.fontSize,
    fontWeight: '600',
  },
});
