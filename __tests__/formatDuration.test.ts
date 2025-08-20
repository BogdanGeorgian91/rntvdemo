// Unit Test 1: Test the actual formatDuration utility functions with real values
import { formatDurationTile, formatDurationDetail } from '../src/utils/utils';

describe('formatDuration utility functions', () => {
  describe('formatDurationTile', () => {
    it('formats seconds into MM:SS format correctly', () => {
      // Test with actual video durations from our catalog
      expect(formatDurationTile(596)).toBe('9:56');  // Big Buck Bunny duration
      expect(formatDurationTile(888)).toBe('14:48'); // Sintel duration
      expect(formatDurationTile(75)).toBe('1:15');   // For Bigger Joyrides duration
      expect(formatDurationTile(0)).toBe('0:00');     // Edge case
      expect(formatDurationTile(3661)).toBe('1:01:01'); // Over an hour
    });
  });

  describe('formatDurationDetail', () => {
    it('formats seconds into human readable format', () => {
      // Test with actual video durations
      expect(formatDurationDetail(596)).toBe('9m 56s');  // Big Buck Bunny
      expect(formatDurationDetail(3661)).toBe('1h 1m');  // Over an hour
      expect(formatDurationDetail(60)).toBe('1m 0s');    // Exactly one minute
      expect(formatDurationDetail(30)).toBe('0m 30s');   // Less than a minute
    });
  });
});