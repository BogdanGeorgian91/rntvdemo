import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Platform,
  useTVEventHandler,
  Dimensions,
  ScrollView,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { ContentTile } from '../components/ContentTile';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { AppIcon } from '../components/AppIcon';
import { TV_THEME } from '../styles/theme';
import { VideoItem, RootStackParamList } from '../types';
import catalogData from '../assets/catalog.json';

interface HomeScreenProps {
  navigation: NavigationProp<RootStackParamList, 'Home'>;
}

const { width: screenWidth } = Dimensions.get('window');
const PADDING_HORIZONTAL = Platform.isTV ? 60 : 20;
const TILE_MARGIN = 15; // Increased to accommodate scaling
const COLUMNS = 3;

// Calculate tile width based on screen width
const TILE_WIDTH =
  (screenWidth - PADDING_HORIZONTAL * 2 - TILE_MARGIN * 2 * COLUMNS) / COLUMNS;
const TILE_HEIGHT = TILE_WIDTH * 0.56; // 16:9 aspect ratio

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [items, setItems] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    loadCatalog();
  }, []);

  // Listen for when we navigate back to this screen
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     // Screen is focused, the focus will be restored to the last selected tile
  //     // The hasTVPreferredFocus prop will handle restoring focus
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  // the TV event handler hook for react-native-tvos
  useTVEventHandler(event => {
    if (Platform.isTV) {
      console.log('TV event handler:', event);
      if (event && event.eventType === 'playPause') {
        // Play/Pause pressed on home screen
      }
    }
  });

  const loadCatalog = () => {
    setLoading(true);
    setError(null);

    // Simulate async loading with longer delay for visibility
    setTimeout(() => {
      // 🧪 TEST MODE: Change to true to test error state
      const shouldSimulateError = false;
      // const shouldSimulateError = true;

      if (shouldSimulateError) {
        setError(
          'Unable to load content. Please check your connection and try again.',
        );
        setLoading(false);
      } else {
        try {
          setItems(catalogData.items);
          setLoading(false);
        } catch (err) {
          setError('Failed to load content. Please try again.');
          setLoading(false);
        }
      }
    }, 2000); // Increased to 2 seconds for better visibility
  };

  const handleTilePress = (item: VideoItem, index: number) => {
    setFocusedIndex(index); // Remember which tile was pressed
    navigation.navigate('Details', { item });
  };

  const renderItem = ({ item, index }: { item: VideoItem; index: number }) => {
    return (
      <ContentTile
        item={item}
        onPress={() => handleTilePress(item, index)}
        hasTVPreferredFocus={index === focusedIndex}
        index={index}
        tileWidth={TILE_WIDTH}
        tileHeight={TILE_HEIGHT}
      />
    );
  };

  if (loading) {
    return <LoadingSpinner message="Loading your video catalog..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadCatalog} />;
  }

  console.log('Rendering focusedIndex', focusedIndex);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.headerContainer}>
          <AppIcon size={Platform.isTV ? 50 : 40} />
          <Text style={styles.header}>Featured Content</Text>
        </View>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={COLUMNS}
          scrollEnabled={false}
          columnWrapperStyle={styles.row}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TV_THEME.colors.background,
  },
  scrollContent: {
    paddingTop: Platform.isTV ? 40 : 20,
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingBottom: Platform.isTV ? 40 : 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Platform.isTV ? 30 : 20,
  },
  header: {
    fontSize: Platform.isTV ? 36 : 28,
    fontWeight: TV_THEME.typography.h1.fontWeight,
    color: TV_THEME.colors.text,
    marginLeft: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: TILE_MARGIN * 2,
  },
});
