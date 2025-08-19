import { formatDuration } from '../src/utils/formatDuration';

describe('formatDuration', () => {
  it('formats seconds to MM:SS for durations under an hour', () => {
    expect(formatDuration(596)).toBe('9:56');
    expect(formatDuration(60)).toBe('1:00');
    expect(formatDuration(75)).toBe('1:15');
    expect(formatDuration(0)).toBe('0:00');
  });

  it('formats seconds to H:MM:SS for durations over an hour', () => {
    expect(formatDuration(3600)).toBe('1:00:00');
    expect(formatDuration(3661)).toBe('1:01:01');
    expect(formatDuration(7200)).toBe('2:00:00');
    expect(formatDuration(5432)).toBe('1:30:32');
  });

  it('pads minutes and seconds with leading zeros when needed', () => {
    expect(formatDuration(65)).toBe('1:05');
    expect(formatDuration(3605)).toBe('1:00:05');
    expect(formatDuration(3665)).toBe('1:01:05');
  });
});