// Unit Test 2: Test ContentTile component with real catalog data
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ContentTile } from '../src/components/ContentTile';
import catalogData from '../src/assets/catalog.json';

describe('ContentTile component', () => {
  it('renders video information correctly with real catalog data', () => {
    // Use actual video data from catalog
    const videoItem = catalogData.items[0]; // Big Buck Bunny
    const mockOnPress = jest.fn();
    
    const { getByText, getByTestId } = render(
      <ContentTile 
        item={videoItem}
        onPress={mockOnPress}
        index={0}
      />
    );
    
    // Check that actual title is displayed
    expect(getByText('Big Buck Bunny')).toBeTruthy();
    
    // Check that duration is displayed (9:56 for 596 seconds)
    expect(getByText('9:56')).toBeTruthy();
    
    // Check that the tile is touchable
    const tile = getByTestId('content-tile-0');
    expect(tile).toBeTruthy();
    
    // Test press event
    fireEvent.press(tile);
    expect(mockOnPress).toHaveBeenCalledWith(videoItem);
  });

  it('handles different catalog items correctly', () => {
    // Test with a different video from catalog
    const videoItem = catalogData.items[1]; // Sintel
    const mockOnPress = jest.fn();
    
    const { getByText } = render(
      <ContentTile 
        item={videoItem}
        onPress={mockOnPress}
        index={1}
      />
    );
    
    // Check Sintel's title and duration
    expect(getByText('Sintel (MP4)')).toBeTruthy();
    expect(getByText('14:48')).toBeTruthy(); // 888 seconds
  });
});