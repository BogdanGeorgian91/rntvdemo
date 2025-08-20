// Unit Test 3: Test ErrorMessage component functionality
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ErrorMessage } from '../src/components/ErrorMessage';

describe('ErrorMessage component', () => {
  it('displays error message and retry button', () => {
    const mockOnRetry = jest.fn();
    const errorText = 'Failed to load videos';
    
    const { getByText } = render(
      <ErrorMessage 
        message={errorText}
        onRetry={mockOnRetry}
      />
    );
    
    // Check that error message is displayed
    expect(getByText(errorText)).toBeTruthy();
    
    // Check that retry button exists
    const retryButton = getByText('Retry');
    expect(retryButton).toBeTruthy();
    
    // Test retry button press
    fireEvent.press(retryButton);
    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it('displays with empty message when provided', () => {
    const mockOnRetry = jest.fn();
    
    const { getByText } = render(
      <ErrorMessage message="" onRetry={mockOnRetry} />
    );
    
    // Check that title is always shown
    expect(getByText('Something went wrong')).toBeTruthy();
    expect(getByText('Retry')).toBeTruthy();
  });
});