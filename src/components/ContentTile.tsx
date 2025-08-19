import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import { VideoItem } from '../types';
import { TV_THEME } from '../styles/theme';

interface ContentTileProps {
  item: VideoItem;
  onPress: (item: VideoItem) => void;
  hasTVPreferredFocus?: boolean;
  index?: number;
}

export const ContentTile: React.FC<ContentTileProps> = ({ 
  item, 
  onPress, 
  hasTVPreferredFocus = false,
  index = 0 
}) => {
  const [focused, setFocused] = useState(false);

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Pressable
      style={[
        styles.container,
        focused && styles.containerFocused,
      ]}
      onPress={() => onPress(item)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      hasTVPreferredFocus={hasTVPreferredFocus}
      testID={`content-tile-${index}`}
    >
      <View style={styles.imageContainer}>
        <FastImage
          style={styles.thumbnail}
          source={{
            uri: item.thumbnail,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
          testID="thumbnail"
        />
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{formatDuration(item.duration)}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: TV_THEME.tile.width,
    backgroundColor: TV_THEME.colors.tileBg,
    borderRadius: TV_THEME.borderRadius.md,
    overflow: 'hidden',
    margin: TV_THEME.spacing.xs,
  },
  containerFocused: {
    transform: [{ scale: TV_THEME.tile.focusScale }],
    borderWidth: 3,
    borderColor: TV_THEME.colors.focus,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: TV_THEME.tile.height,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
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
  },
  title: {
    color: TV_THEME.colors.text,
    fontSize: TV_THEME.typography.caption.fontSize,
    fontWeight: '600',
  },
});