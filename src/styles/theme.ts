export const TV_THEME = {
  colors: {
    background: '#1a1a1a',
    primary: '#e50914',
    text: '#ffffff',
    textSecondary: '#999999',
    focus: '#ffffff',
    tileBg: '#2a2a2a',
    tileHover: '#3a3a3a',
  },
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  },
  typography: {
    h1: { fontSize: 48, fontWeight: 'bold' as const },
    h2: { fontSize: 32, fontWeight: '600' as const },
    body: { fontSize: 20, lineHeight: 28 },
    caption: { fontSize: 16 },
  },
  tile: {
    width: 320, // fallback width
    height: 180, // fallback height
    focusScale: 1.05,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
};
