// Integration Test: Test basic screen rendering and navigation
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { HomeScreen } from '../src/screens/HomeScreen';
import { DetailsScreen } from '../src/screens/DetailsScreen';
import { PlayerScreen } from '../src/screens/PlayerScreen';
import catalogData from '../src/assets/catalog.json';

// Mock react-native-video since we can't play actual video in tests
jest.mock('react-native-video', () => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const React = require('react');
  const { View, Text } = require('react-native');
  return React.forwardRef((_props: any, ref: any) => (
    <View ref={ref} testID="video-player">
      <Text>Video Player Mock</Text>
    </View>
  ));
});

describe('Screen Integration Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('HomeScreen loads and displays catalog data', async () => {
    const mockNavigate = jest.fn();
    const mockNavigation = { navigate: mockNavigate } as any;

    const { getByText, getByTestId, queryByText } = render(
      <HomeScreen navigation={mockNavigation} />,
    );

    // Initially shows loading
    expect(getByText('Loading your video catalog...')).toBeTruthy();

    // Advance timers to trigger loading completion
    jest.advanceTimersByTime(2000);

    // Wait for loading to complete and content to appear
    await waitFor(() => {
      expect(queryByText('Loading your video catalog...')).toBeNull();
    });

    // Now check that content is displayed
    expect(getByText('Featured Content')).toBeTruthy();
    expect(getByText('Big Buck Bunny')).toBeTruthy();
    expect(getByText('Sintel (MP4)')).toBeTruthy();

    // Test navigation on tile press
    const firstTile = getByTestId('content-tile-0');
    fireEvent.press(firstTile);

    // Should call navigate with correct data
    expect(mockNavigate).toHaveBeenCalledWith('Details', {
      item: catalogData.items[0],
    });
  });

  it('DetailsScreen displays video information and navigates to Player', () => {
    const mockNavigate = jest.fn();
    const mockNavigation = { navigate: mockNavigate } as any;
    const mockRoute = {
      params: { item: catalogData.items[0] }, // Big Buck Bunny
    } as any;

    const { getByText } = render(
      <DetailsScreen navigation={mockNavigation} route={mockRoute} />,
    );

    // Should display video details
    expect(getByText('Big Buck Bunny')).toBeTruthy();
    expect(getByText('Short animated film about a giant rabbit.')).toBeTruthy();
    expect(getByText(/Duration:/)).toBeTruthy();
    expect(getByText('PLAY')).toBeTruthy();

    // Test PLAY button navigation
    const playButton = getByText('PLAY');
    fireEvent.press(playButton);

    // Should navigate to Player with video item
    expect(mockNavigate).toHaveBeenCalledWith('Player', {
      item: catalogData.items[0],
    });
  });

  it('PlayerScreen renders with video information', () => {
    const mockGoBack = jest.fn();
    const mockNavigation = { goBack: mockGoBack } as any;
    const mockRoute = {
      params: { item: catalogData.items[0] }, // Big Buck Bunny
    } as any;

    const { getByText, getByTestId } = render(
      <PlayerScreen navigation={mockNavigation} route={mockRoute} />,
    );

    // Should show loading text with video name
    expect(getByText('Loading Big Buck Bunny...')).toBeTruthy();

    // Should render video player mock
    expect(getByTestId('video-player')).toBeTruthy();
  });
});
