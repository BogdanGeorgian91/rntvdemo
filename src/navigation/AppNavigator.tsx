import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import { PlayerScreen } from '../screens/PlayerScreen';
import { RootStackParamList } from '../types';
import { TV_THEME } from '../styles/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const screenOptions = {
    headerShown: false,
    contentStyle: {
      backgroundColor: TV_THEME.colors.background,
    },
    animation: (Platform.isTV ? 'fade' : 'slide_from_right') as 'fade' | 'slide_from_right',
    gestureEnabled: !Platform.isTV,
  };

  const playerOptions = {
    animation: 'fade' as 'fade',
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen
          name="Player"
          component={PlayerScreen}
          options={playerOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
