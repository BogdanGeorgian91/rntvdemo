This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

## Libraries Used:

- "@d11/react-native-fast-image" which is an actively maintained fork of "react-native-fast-image": https://www.npmjs.com/package/@d11/react-native-fast-image
- for navigation: @react-navigation/native and @react-navigation/stack
- react-native-gesture-handler
- react-native-safe-area-context
- react-native-screens
- react-native-video

## While developing

After initial Claude work, I've started reading its work and fixed some minor issues: unused imports highlighted by the editor and a hook which wasn't called at the top most level, which was breaking an essential rule of hooks, though the app didn't crash.

Removed "@react-native/new-app-screen" package as it was not necessary after project init.

Noticed that the links for retrieving the thumbnails for 1st, 4th and 5th assets returned a default placeholder image saying "The image you are requesting does not exist of is no longer available" and I thought initially to create thumbnail from video with "react-native-create-thumbnail" package (https://www.npmjs.com/package/react-native-create-thumbnail), but then I thought for the purpose of the app I shouldn't overcomplicate it and added some working links.

i've realized i need to use somethign different than Pressable. // instead of Pressable to use TouchableNativeFeedback for Android TV platform and TouchableOpacity for tvOS platform.
Removed Pressable from project, replaced with mentioned components.
