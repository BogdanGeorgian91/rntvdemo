import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

// Mock the navigation container
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: any) => children,
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => ({
    Navigator: ({ children }: any) => children,
    Screen: ({ children }: any) => children,
  }),
  CardStyleInterpolators: {
    forHorizontalIOS: jest.fn(),
    forFadeFromBottomAndroid: jest.fn(),
  },
}));

// Mock gesture handler
jest.mock('react-native-gesture-handler', () => ({
  Swipeable: jest.fn(),
  DrawerLayout: jest.fn(),
  State: {},
  ScrollView: jest.fn(),
  Slider: jest.fn(),
  Switch: jest.fn(),
  TextInput: jest.fn(),
  ToolbarAndroid: jest.fn(),
  ViewPagerAndroid: jest.fn(),
  DrawerLayoutAndroid: jest.fn(),
  WebView: jest.fn(),
  NativeViewGestureHandler: jest.fn(),
  TapGestureHandler: jest.fn(),
  FlingGestureHandler: jest.fn(),
  ForceTouchGestureHandler: jest.fn(),
  LongPressGestureHandler: jest.fn(),
  PanGestureHandler: jest.fn(),
  PinchGestureHandler: jest.fn(),
  RotationGestureHandler: jest.fn(),
  RawButton: jest.fn(),
  BaseButton: jest.fn(),
  RectButton: jest.fn(),
  BorderlessButton: jest.fn(),
  FlatList: jest.fn(),
  gestureHandlerRootHOC: jest.fn(),
  Directions: {},
}));

// Mock react-native-screens
jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: any) => children,
  SafeAreaView: ({ children }: any) => children,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

// Mock react-native-fast-image
jest.mock('react-native-fast-image', () => ({
  __esModule: true,
  default: 'FastImage',
  priority: {
    low: 'low',
    normal: 'normal',
    high: 'high',
  },
  resizeMode: {
    contain: 'contain',
    cover: 'cover',
    stretch: 'stretch',
    center: 'center',
  },
}));

// Mock react-native-video
jest.mock('react-native-video', () => 'Video');

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
