import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import { PlayerScreen } from '../screens/PlayerScreen';
import { RootStackParamList } from '../types';
import { TV_THEME } from '../styles/theme';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const screenOptions = {
    headerShown: false,
    cardStyle: {
      backgroundColor: TV_THEME.colors.background,
    },
    cardStyleInterpolator: Platform.isTV
      ? CardStyleInterpolators.forFadeFromBottomAndroid
      : CardStyleInterpolators.forHorizontalIOS,
    gestureEnabled: !Platform.isTV,
  };

  const playerOptions = {
    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
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
