import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  useTVEventHandler,
  BackHandler,
} from 'react-native';
import Video, { VideoRef } from 'react-native-video';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
// import { TV_THEME } from '../styles/theme';

interface PlayerScreenProps {
  navigation: NavigationProp<RootStackParamList, 'Player'>;
  route: RouteProp<RootStackParamList, 'Player'>;
}

export const PlayerScreen: React.FC<PlayerScreenProps> = ({
  navigation,
  route,
}) => {
  const { item } = route.params;
  const videoRef = useRef<VideoRef>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);

  // TV event handler hook for react-native-tvos
  useTVEventHandler(event => {
    if (Platform.isTV) {
      if (event && event.eventType === 'playPause') {
        setPaused(prev => !prev);
      }
    }
  });

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      },
    );

    return () => backHandler.remove();
  }, [navigation]);

  const handleLoadStart = () => {
    setLoading(true);
    setError(null);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = (errorData: any) => {
    console.error('Video playback error:', errorData);
    setLoading(false);

    let errorMessage = 'Unable to play this video.';
    if (errorData?.error?.errorCode === '22004') {
      errorMessage =
        'Video not found or unavailable. Please try another video.';
    } else if (errorData?.error?.errorString) {
      errorMessage = `Playback error: ${errorData.error.errorString}`;
    }

    setError(errorMessage);
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    setPaused(false);
  };

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: item.streamUrl }}
        style={styles.fullScreen}
        controls={true}
        resizeMode="contain"
        onLoadStart={handleLoadStart}
        onLoad={handleLoad}
        onError={handleError}
        paused={paused}
        repeat={false}
        fullscreen={true}
        fullscreenAutorotate={false}
        fullscreenOrientation="landscape"
      />
      {loading && (
        <View style={styles.loadingOverlay}>
          <LoadingSpinner message={`Loading ${item.title}...`} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});
