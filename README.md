This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## Table of Contents

- [Android TV simulator demo](#android-tv-simulator-demo)
- [tvOS simulator demo](#tvos-simulator-demo)
- [Getting Started](#getting-started)
  - [Android TV Simulator Setup](#android-tv-simulator-setup)
    - [Option 1: Using Android Studio (Recommended)](#option-1-using-android-studio-recommended)
    - [Option 2: Command Line Setup](#option-2-command-line-setup)
  - [tvOS Simulator Setup](#tvos-simulator-setup)
    - [Prerequisites](#prerequisites)
    - [Setting Up Apple TV Simulator](#setting-up-apple-tv-simulator)
    - [Alternative: Command Line Setup](#alternative-command-line-setup)
    - [Launching the tvOS Simulator](#launching-the-tvos-simulator)
  - [Step 1: Clone Repo, Run npm install command and Start Metro](#step-1-clone-repo-run-npm-install-command-and-start-metro)
  - [Step 2: Build and run your app](#step-2-build-and-run-your-app)
    - [Android TV](#android-tv)
    - [tvOS](#tvos)
  - [Step 3: Running Tests](#step-3-running-tests)
    - [Run Tests](#run-tests)
    - [Run Tests in Watch Mode](#run-tests-in-watch-mode)
    - [Run Tests with Coverage](#run-tests-with-coverage)
- [Development Notes](#development-notes)
  - [Libraries Used](#libraries-used)
  - [Code Quality Improvements](#code-quality-improvements)
  - [Asset Management](#asset-management)
  - [TV Platform Compatibility](#tv-platform-compatibility)
- [Known Limitations and TODOs](#known-limitations-and-todos)
  - [Some thoughts on limitations / constraints](#some-thoughts-on-limitations--constraints)
  - [Some possible future improvements (TODOs)](#some-possible-future-improvements-todos)

# Android TV simulator demo

https://github.com/user-attachments/assets/acf6d06c-e858-4d1b-ac51-8fc1e3764437

# tvOS simulator demo (everything just looks better on Apple platforms)

https://github.com/user-attachments/assets/9d6cf373-d55b-4519-b24f-f7f09dde3036

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Android TV Simulator Setup

Before running the app on Android TV, you'll need to set up an Android TV emulator. Here are two approaches:

### Option 1: Using Android Studio (Recommended)

1. **Open Android Studio** and navigate to **Tools > AVD Manager** (or click the AVD Manager icon in the toolbar)

2. **Create a new Virtual Device**:

   - Click **"+ Create Virtual Device"**
   - In the **Category** section, select **TV**
   - Choose a device (e.g., "Android TV (1080p)" or "Android TV (4K)")
   - Click **Next**

3. **Select a System Image**:

   - Go to the **Recommended** tab
   - Download an Android TV system image (API 29 or higher recommended)
   - Look for images that say "Android TV" in the Target column
   - Click **Download** if not already installed
   - Select the image and click **Next**

4. **Configure AVD Settings**:

   - Give your AVD a descriptive name (e.g., "Android_TV_API_29")
   - Adjust performance settings if needed:
     - Graphics: **Hardware - GLES 2.0** (for better performance)
     - RAM: At least **2048 MB**
   - Click **Finish**

5. **Launch the Emulator**:
   - In AVD Manager, click the **Play button** next to your TV AVD
   - Wait for the emulator to fully boot (you should see the Android TV home screen)

### Option 2: Command Line Setup

If you prefer using the command line or need to automate the setup:

```bash
# Install Android TV system image (example with API 29)
sdkmanager "system-images;android-29;android-tv;x86"

# Create the AVD
avdmanager create avd \
  -n "AndroidTV_API29" \
  -k "system-images;android-29;android-tv;x86" \
  -d "tv_1080p"

# Launch the emulator
emulator -avd AndroidTV_API29
```

For newer API levels with Google Play:

```bash
# Install system image with Google Play Store
sdkmanager "system-images;android-34;google_apis_playstore;x86_64"

# Create AVD with Play Store support
avdmanager create avd \
  -n "AndroidTV_PlayStore" \
  -k "system-images;android-34;google_apis_playstore;x86_64" \
  -d "tv_4k"
```

## tvOS Simulator Setup

Before running the app on tvOS, you'll need to set up an Apple TV simulator in Xcode:

### Prerequisites

- **macOS**: tvOS development requires a Mac
- **Xcode**: Install from the Mac App Store (13.0 or later recommended)
- **Command Line Tools**: Install via `xcode-select --install` if not already installed

### Setting Up Apple TV Simulator

1. **Open Xcode** and navigate to **Window > Devices and Simulators** (or press Cmd+Shift+2)

2. **Access Simulators Tab**:

   - Click on the **Simulators** tab at the top
   - You'll see a list of available simulators

3. **Add Apple TV Simulator** (if not already available):

   - Click the **"+"** button at the bottom left
   - **Simulator Name**: Enter a descriptive name (e.g., "Apple TV 4K (3rd gen)")
   - **Device Type**: Select from available Apple TV options:
     - Apple TV (for standard resolution)
     - Apple TV 4K (2nd generation)
     - Apple TV 4K (3rd generation) - Recommended
   - **OS Version**: Select tvOS version (17.0 or later recommended)
   - Click **Create**

4. **Download tvOS Runtime** (if needed):
   - Go to **Xcode > Settings** (or Cmd+,)
   - Click on **Platforms** tab
   - Find **tvOS** in the list
   - Click **GET** to download the tvOS simulator runtime
   - Wait for download to complete (may take several minutes)

### Alternative: Command Line Setup

You can also manage simulators via command line:

```bash
# List available device types
xcrun simctl list devicetypes | grep "Apple TV"

# List available tvOS runtimes
xcrun simctl list runtimes | grep tvOS

# Create a new Apple TV simulator
xcrun simctl create "Apple TV 4K" \
  "com.apple.CoreSimulator.SimDeviceType.Apple-TV-4K-3rd-generation-4K" \
  "com.apple.CoreSimulator.SimRuntime.tvOS-17-0"

# Boot the simulator
xcrun simctl boot "Apple TV 4K"

# Open Simulator app
open -a Simulator
```

### Launching the tvOS Simulator

**Option 1: From Xcode**

- Open **Xcode > Open Developer Tool > Simulator**
- In Simulator app, go to **Device > tvOS > [Your Apple TV device]**

**Option 2: From Terminal**

```bash
# Launch Simulator app
open -a Simulator

# Or launch specific device
open -a Simulator --args -CurrentDeviceUDID $(xcrun simctl list devices | grep "Apple TV" | head -1 | grep -o "[0-9A-F\-]*")
```

## Step 1: Clone Repo, Run npm install command and Start Metro

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
- **Missing other features** - no subtitle support, offline caching, search, data is limited/hardcoded
- **Focus Management & Remote Control UX** - While navigation focus issues have been addressed with React Navigation, fine-tuned focus management for complex UI components may still need optimization. Consistent focus/navigation handling might be tricky for robust UX.
- **Performance** - Video playback performance on lower-end TV devices hasn't been tested and may require additional optimization. TVs often have less processing power than modern smartphones, so a priority should be made to optimize aggressively and also test on real devices, not just emulators.
- **Accessibility** - TV-specific accessibility features and screen reader support have not been addressed and may require native modules creation.
- **Debugging Complexity** - Debugging TV apps often involves traversing multiple layers: the JavaScript and native side. Platform native knowledge is very helpful and platform specific languages Swift, Objective‑C, or Kotlin to troubleshoot.

### Some possible future improvements (TODOs)

- [ ] **Implement dynamic thumbnail generation** using `react-native-create-thumbnail` or similar solution
- [ ] **Add comprehensive error handling** for network failures and video loading issues
- [ ] **Add search feature** for filtering videos by title
- [ ] **Performance optimizations** through optimizing bundle size, code splitting and lazy loading of video components, list specific optimizations, platform specific optimizations etc
- [ ] **Add support for subtitles/captions** for better accessibility
- [ ] **Implement proper loading states** and skeleton screens for better UX
- [ ] **Add app icons** - tried adding for the Android TV app but quit after few unsuccessful attempts, for the sake to completing the demo faster
