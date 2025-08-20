module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-screens|react-native-safe-area-context|react-native-gesture-handler|react-native-fast-image|react-native-video|@react-native-tvos)/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
