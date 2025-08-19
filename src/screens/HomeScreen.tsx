import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, Platform, useTVEventHandler } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { ContentTile } from '../components/ContentTile';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { TV_THEME } from '../styles/theme';
import { VideoItem, RootStackParamList } from '../types';
import catalogData from '../assets/catalog.json';

interface HomeScreenProps {
  navigation: NavigationProp<RootStackParamList, 'Home'>;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [items, setItems] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCatalog();
  }, []);

  // Use the TV event handler hook for react-native-tvos
  if (Platform.isTV) {
    useTVEventHandler((event) => {
      if (event && event.eventType === 'playPause') {
        console.log('Play/Pause pressed on home screen');
      }
    });
  }

  const loadCatalog = () => {
    try {
      setLoading(true);
      setError(null);
      // Simulate async loading
      setTimeout(() => {
        setItems(catalogData.items);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to load content. Please try again.');
      setLoading(false);
    }
  };

  const handleTilePress = (item: VideoItem) => {
    navigation.navigate('Details', { item });
  };

  const renderItem = ({ item, index }: { item: VideoItem; index: number }) => (
    <ContentTile
      item={item}
      onPress={handleTilePress}
      hasTVPreferredFocus={index === 0}
      index={index}
    />
  );

  if (loading) {
    return <LoadingSpinner message="Loading content..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadCatalog} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Featured Content</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        removeClippedSubviews={Platform.isTV}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TV_THEME.colors.background,
    paddingTop: TV_THEME.spacing.lg,
  },
  header: {
    fontSize: TV_THEME.typography.h1.fontSize,
    fontWeight: TV_THEME.typography.h1.fontWeight,
    color: TV_THEME.colors.text,
    marginBottom: TV_THEME.spacing.lg,
    paddingHorizontal: TV_THEME.spacing.xl,
  },
  grid: {
    paddingHorizontal: TV_THEME.spacing.lg,
    paddingBottom: TV_THEME.spacing.lg,
  },
  row: {
    justifyContent: 'space-evenly',
    marginBottom: TV_THEME.spacing.md,
  },
});