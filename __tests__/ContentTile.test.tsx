import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ContentTile } from '../src/components/ContentTile';
import { VideoItem } from '../src/types';

describe('ContentTile', () => {
  const mockItem: VideoItem = {
    id: 'test-id',
    title: 'Test Video',
    description: 'Test description',
    thumbnail: 'https://example.com/image.jpg',
    streamUrl: 'https://example.com/video.mp4',
    duration: 596,
  };

  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it('renders title correctly', () => {
    const { getByText } = render(
      <ContentTile item={mockItem} onPress={mockOnPress} />
    );
    
    expect(getByText('Test Video')).toBeTruthy();
  });

  it('renders thumbnail', () => {
    const { getByTestId } = render(
      <ContentTile item={mockItem} onPress={mockOnPress} />
    );
    
    expect(getByTestId('thumbnail')).toBeTruthy();
  });

  it('formats duration correctly', () => {
    const { getByText } = render(
      <ContentTile item={mockItem} onPress={mockOnPress} />
    );
    
    expect(getByText('9:56')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByTestId } = render(
      <ContentTile item={mockItem} onPress={mockOnPress} index={0} />
    );
    
    fireEvent.press(getByTestId('content-tile-0'));
    expect(mockOnPress).toHaveBeenCalledWith(mockItem);
  });

  it('applies hasTVPreferredFocus when specified', () => {
    const { getByTestId } = render(
      <ContentTile 
        item={mockItem} 
        onPress={mockOnPress} 
        hasTVPreferredFocus={true}
        index={0}
      />
    );
    
    const tile = getByTestId('content-tile-0');
    expect(tile.props.hasTVPreferredFocus).toBe(true);
  });
});