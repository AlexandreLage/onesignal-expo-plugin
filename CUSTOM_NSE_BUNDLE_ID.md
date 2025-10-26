# Custom NSE Bundle Identifier

This document explains how to use the `iosNSEBundleIdentifier` configuration option to customize the bundle identifier for the OneSignal Notification Service Extension (NSE) on iOS.

## Background

By default, the OneSignal Expo plugin creates an NSE with a bundle identifier following this pattern:

```
{ios.bundleIdentifier}.OneSignalNotificationServiceExtension
```

For example, if your main app bundle identifier is `com.example.myapp`, the NSE bundle identifier would be:

```
com.example.myapp.OneSignalNotificationServiceExtension
```

## Problem

In some scenarios, this default bundle identifier may already be registered in Apple's developer portal, particularly in production apps where you cannot easily change your app's bundle identifier. This can cause conflicts and prevent successful builds.

## Solution

The `iosNSEBundleIdentifier` plugin property allows you to specify a custom bundle identifier for the NSE.

## Usage

### Option 1: Use a Custom Suffix

You can provide a suffix that will be appended to your main bundle identifier. This is useful when you want to maintain a consistent naming pattern.

```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.example.myapp"
    },
    "plugins": [
      [
        "onesignal-expo-plugin",
        {
          "mode": "production",
          "iosNSEBundleIdentifier": ".CustomNotifications"
        }
      ]
    ]
  }
}
```

**Result:** The NSE bundle identifier will be `com.example.myapp.CustomNotifications`

### Option 2: Use a Complete Bundle Identifier

You can provide a complete bundle identifier if you need full control over the naming.

```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.example.myapp"
    },
    "plugins": [
      [
        "onesignal-expo-plugin",
        {
          "mode": "production",
          "iosNSEBundleIdentifier": "com.example.notifications.onesignal"
        }
      ]
    ]
  }
}
```

**Result:** The NSE bundle identifier will be `com.example.notifications.onesignal`

### Option 3: Use Default Behavior

If you don't specify `iosNSEBundleIdentifier`, the plugin will use the default naming convention.

```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.example.myapp"
    },
    "plugins": [
      [
        "onesignal-expo-plugin",
        {
          "mode": "production"
        }
      ]
    ]
  }
}
```

**Result:** The NSE bundle identifier will be `com.example.myapp.OneSignalNotificationServiceExtension`

## Important Notes

1. **Apple Developer Portal**: When using a custom NSE bundle identifier, make sure to register it in your Apple Developer Portal and create the necessary provisioning profiles.

2. **EAS Build**: If you're using EAS Build, the custom bundle identifier will be automatically configured in your EAS credentials configuration.

3. **Existing Projects**: If you're migrating an existing project that already uses a different NSE bundle identifier, use this option to maintain consistency and avoid conflicts.

4. **Bundle Identifier Rules**: Remember that bundle identifiers must follow Apple's naming conventions:
   - Use only alphanumeric characters, hyphens, and periods
   - Each segment should start with a letter
   - Example: `com.company.app.extension`

## How It Works

The plugin applies the custom bundle identifier in two places:

1. **Xcode Project Configuration**: Updates the NSE target in your iOS project
2. **EAS Credentials**: Configures the app extension credentials for EAS builds

This ensures that both local builds (`expo run:ios`) and cloud builds (EAS) use the correct bundle identifier.
