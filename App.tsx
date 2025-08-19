import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent"
        translucent={true}
        hidden={Platform.isTV}
      />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;
