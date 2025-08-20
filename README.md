This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Clone Repo, Run npm install comand and Start Metro

First:

- clone the repository
- run "npm/yarn install" in root directory
- run "npm start" to start **Metro dev server**, the JavaScript build tool for React Native.

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run the Android TV or tvOS app:

### Android TV

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### tvOS

For tvOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run in iOS folder:

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

> **Note**: These commands automatically target TV platforms. The Android build launches on Android TV devices/emulators (configured via LEANBACK_LAUNCHER in AndroidManifest.xml), and the iOS build targets tvOS when using react-native-tvos.
> If everything is set up correctly, you should see your new app running in the Android TV Emulator, tvOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode which is what I've done.
I've used:

- Android Studio Narwhal Feature Drop | 2025.1.2 Patch 1 with Android TV simulator - Android 16
- xCode Version 16.4 - Apple TV 3rd generation simulator

## Step 3: Running Tests

This project includes unit and integration tests to ensure code quality and reliability.

### Run Tests

To run the test suite, use one of the following commands from the root of your React Native project:

```sh
# Using npm
npm test

# OR using Yarn
yarn test
```

### Run Tests in Watch Mode

For continuous testing during development:

```sh
# Using npm
npm run test:watch

# OR using Yarn
yarn test:watch
```

### Run Tests with Coverage

To generate a test coverage report:

```sh
# Using npm
npm run test:coverage

# OR using Yarn
yarn test:coverage
```

> **Note**: Test coverage reports will be generated in the `coverage/` directory.

## Development Notes

### Libraries Used

- **[react-native-fast-image](https://github.com/DylanVann/react-native-fast-image)** - High performance image component with caching capabilities for better performance. As it is not actively maintained anymore, in a real project I would have chosen **[@d11/react-native-fast-image](https://github.com/dream-sports-labs/react-native-fast-image)** because it's an actively maintained fork of it.
- **[@react-navigation/native](https://github.com/react-navigation/react-navigation)** & **[@react-navigation/native-stack](https://github.com/react-navigation/react-navigation)** - Default Navigation library for RN apps and "/native-stack" chosen specifically to address focusing issues when navigating back on TV platforms (initially Claude chose "/stack" library). Found this GitHub issue which indicated me the solution as I've noticed the problem: [react-native-tvos#815](https://github.com/react-native-tvos/react-native-tvos/issues/815)
- **[react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler)** - Gesture handling library for enhanced touch interactions
- **[react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context)** - Safe area handling for proper UI layout across different screen sizes
- **[react-native-screens](https://github.com/software-mansion/react-native-screens)** - Native navigation primitives for better performance
- **[react-native-video](https://github.com/react-native-video/react-native-video)** - Video playback component optimized for React Native applications

### Code Quality Improvements

After the initial development phase bootstrapped with Claude Code, several refinements were made to improve code quality and adherence to React best practices:

- **Removed unused imports** - Cleaned up import statements highlighted by the editor to reduce bundle size
- **Fixed React Hooks compliance** - Resolved a hook that wasn't called at the top level, which violated the Rules of Hooks (though the app remained functional)
- **Package cleanup** - Removed the `@react-native/new-app-screen` package as it was no longer necessary after project initialization
- **Fixed layout** - Adjusted flex proportions in HomeScreen and DetailsScreen for better content distribution
- **Fixed focusing issue** - when navigating back to HomeScreen from DetailsScreen, first card was always re-focused although I've previously navigated from different card

### Asset Management

During development, it was discovered that thumbnail URLs for the 1st, 4th, and 5th video assets returned placeholder images with the message "The image you are requesting does not exist or is no longer available."

While considering implementing the `react-native-create-thumbnail` package to generate thumbnails from videos, the decision was made to use working placeholder URLs instead to keep the implementation simpler and avoid unnecessary complexity for this demonstration.

### TV Platform Compatibility

To ensure proper functionality across TV platforms, the touch interaction components were updated:

- **Replaced `Pressable`** with platform-specific components for better TV remote navigation, to support "hasTVPreferredFocus" prop and "useForeground" (Android only).
- **Android TV**: Implemented `TouchableNativeFeedback` for native Android TV feedback
- **tvOS**: Implemented `TouchableOpacity` for iOS TV platform compatibility

This change ensures consistent and expected behavior when using remote controls on both Android TV and Apple TV platforms.

## Known Limitations and TODOs

### Some thoughts on limitations / constraints

- **The Need for a Separate Fork** - TV support has been removed from the core React Native repository and now lives in a separate fork called react-native-tvos. This includes support for both Apple TV (tvOS) and Android TV. You cannot use both the core react-native and the TV fork simultaneously.
- **Platform-Specific Build Setup & Config** - On iOS, you must adjust the project to target tvOS (e.g., in Podfile and Xcode project). The fork only allows one target—either iOS or tvOS. On Android, you must set the Leanback launcher in AndroidManifest.xml—without it, the app won’t appear in the TV launcher or Google Play as a TV app.
- **Thumbnail Generation** - Currently using static placeholder URLs instead of generating thumbnails from video sources, which may result in inconsistent or broken thumbnail images
- **Focus Management & Remote Control UX** - While navigation focus issues have been addressed with React Navigation, fine-tuned focus management for complex UI components may still need optimization. Consistent focus/navigation handling might be tricky for robust UX.
- **Performance** - Video playback performance on lower-end TV devices hasn't been tested and may require additional optimization. TVs often have less processing power than modern smartphones, so a priority should be made to optimize aggressively and also test on real devices, not just emulators.
- **Accessibility** - TV-specific accessibility features and screen reader support have not been addressed and may require native modules creation.
- **Debugging Complexity** - Debugging TV apps often involves traversing multiple layers: the JavaScript and native side. Platform native knowledge is very helpful and platform specific languages Swift, Objective‑C, or Kotlin to troubleshoot.

### Some possible future improvements (TODOs)

- [ ] **Implement dynamic thumbnail generation** using `react-native-create-thumbnail` or similar solution
- [ ] **Add comprehensive error handling** for network failures and video loading issues
- [ ] **Implement caching strategy** for video metadata and thumbnails to improve app performance
- [ ] **Performance optimizations** through optimizing bundle size, code splitting and lazy loading of video components, list specific optimizations etc
- [ ] **Add support for subtitles/captions** for better accessibility
- [ ] **Implement proper loading states** and skeleton screens for better UX
- [ ] **Add app icons** - tried adding for the Android TV app but quit after few unsuccessful attempts, for the sake to completing the demo faster
