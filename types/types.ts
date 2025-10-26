/**
 * OneSignalPluginProps refer to the properties set by the user in their app config file (e.g: app.json)
 */
export type OneSignalPluginProps = {
  /**
   * (required) Used to configure APNs environment entitlement. "development" or "production"
   */
  mode: Mode;

  /**
   * (optional) Used to configure Apple Team ID. You can find your Apple Team ID by running expo credentials:manager e.g: "91SW8A37CR"
   */
  devTeam?: string;

  /**
   * (optional) Target IPHONEOS_DEPLOYMENT_TARGET value to be used when adding the iOS NSE. A deployment target is nothing more than
   * the minimum version of the operating system the application can run on. This value should match the value in your Podfile e.g: "12.0".
   */
  iPhoneDeploymentTarget?: string;

  /**
   * (optional) The small notification icons for Android.  Images will be automatically scaled up/down, the recommended size
   * is 96x96 to always scale down.
   */
  smallIcons?: string[];

  /**
   * (optional) The accent color to use for notification icons on Android. Must be a valid Android color resource, for example: "#FF0000"
   */
  smallIconAccentColor?: string;

  /**
   * (optional) The large notification icons for Android. Images will be automatically scaled up/down to 256x256.
   */
  largeIcons?: string[];

  /**
   * (optional) The local path to a custom Notification Service Extension (NSE), written in Objective-C. The NSE will typically start as a copy
   * of the default NSE found at (support/serviceExtensionFiles/NotificationService.m, then altered to support any custom
   * logic required.
   */
  iosNSEFilePath?: string;

  /**
   * (optional) The app group name to use for the OneSignal SDK.
   */
  appGroupName?: string;

  /**
   * (optional) Custom bundle identifier for the NSE (Notification Service Extension).
   *
   * If not provided, defaults to `{mainBundleId}.OneSignalNotificationServiceExtension`
   *
   * **Important:** Must follow Apple's bundle ID rules for app extensions:
   * - If providing a full bundle ID, it MUST start with your main app's bundle ID followed by exactly ONE segment
   * - Example: If main app is `com.example.app`, NSE must be `com.example.app.Something` (only one period after main bundle ID)
   * - ❌ Invalid: `com.example.app.nse.extension` (two periods after main bundle ID)
   * - ✅ Valid: `com.example.app.CustomNSE` (one period after main bundle ID)
   *
   * You can also provide just a suffix starting with a dot (e.g., `.CustomNSE`) which will be appended to the main bundle ID.
   *
   * @example
   * // Using a suffix (recommended)
   * iosNSEBundleIdentifier: ".CustomNSE"
   * // Result: com.example.app.CustomNSE
   *
   * @example
   * // Using a full bundle ID
   * iosNSEBundleIdentifier: "com.example.app.NotificationService"
   * // Result: com.example.app.NotificationService
   */
  iosNSEBundleIdentifier?: string;
};

export const ONESIGNAL_PLUGIN_PROPS: string[] = [
  "mode",
  "devTeam",
  "iPhoneDeploymentTarget",
  "smallIcons",
  "largeIcons",
  "iosNSEFilePath",
  "smallIconAccentColor",
  "appGroupName",
  "iosNSEBundleIdentifier",
];

export enum Mode {
  Dev = "development",
  Prod = "production",
}
