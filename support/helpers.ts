import { ONESIGNAL_PLUGIN_PROPS } from "../types/types";

export function validatePluginProps(props: any): void {
  // check the type of each property
  if (typeof props.mode !== "string") {
    throw new Error("OneSignal Expo Plugin: 'mode' must be a string.");
  }

  if (props.devTeam && typeof props.devTeam !== "string") {
    throw new Error("OneSignal Expo Plugin: 'devTeam' must be a string.");
  }

  if (
    props.iPhoneDeploymentTarget &&
    typeof props.iPhoneDeploymentTarget !== "string"
  ) {
    throw new Error(
      "OneSignal Expo Plugin: 'iPhoneDeploymentTarget' must be a string."
    );
  }

  if (props.smallIcons && !Array.isArray(props.smallIcons)) {
    throw new Error("OneSignal Expo Plugin: 'smallIcons' must be an array.");
  }

  if (
    props.smallIconAccentColor &&
    typeof props.smallIconAccentColor !== "string"
  ) {
    throw new Error(
      "OneSignal Expo Plugin: 'smallIconAccentColor' must be a string."
    );
  }

  if (props.largeIcons && !Array.isArray(props.largeIcons)) {
    throw new Error("OneSignal Expo Plugin: 'largeIcons' must be an array.");
  }

  if (props.iosNSEFilePath && typeof props.iosNSEFilePath !== "string") {
    throw new Error(
      "OneSignal Expo Plugin: 'iosNSEFilePath' must be a string."
    );
  }

  if (props.appGroupName && typeof props.appGroupName !== "string") {
    throw new Error("OneSignal Expo Plugin: 'appGroupName' must be a string.");
  }

  if (
    props.iosNSEBundleIdentifier &&
    typeof props.iosNSEBundleIdentifier !== "string"
  ) {
    throw new Error(
      "OneSignal Expo Plugin: 'iosNSEBundleIdentifier' must be a string."
    );
  }

  // check for extra properties
  const inputProps = Object.keys(props);

  for (const prop of inputProps) {
    if (!ONESIGNAL_PLUGIN_PROPS.includes(prop)) {
      throw new Error(
        `OneSignal Expo Plugin: You have provided an invalid property "${prop}" to the OneSignal plugin.`
      );
    }
  }
}

/**
 * Computes the NSE bundle identifier based on the main bundle identifier and optional custom setting
 * @param mainBundleIdentifier The main app's bundle identifier
 * @param customNSEBundleIdentifier Optional custom NSE bundle identifier from plugin props
 * @returns The computed NSE bundle identifier
 * @throws Error if the bundle identifier doesn't follow Apple's rules
 */
export function computeNSEBundleIdentifier(
  mainBundleIdentifier: string,
  customNSEBundleIdentifier?: string
): string {
  if (!customNSEBundleIdentifier) {
    // Default behavior
    return `${mainBundleIdentifier}.OneSignalNotificationServiceExtension`;
  }

  // If it starts with a dot, treat it as a suffix
  if (customNSEBundleIdentifier.startsWith(".")) {
    const suffix = customNSEBundleIdentifier.substring(1); // Remove the leading dot

    // Validate that the suffix doesn't contain dots (Apple's rule: only ONE segment after main bundle ID)
    if (suffix.includes(".")) {
      throw new Error(
        `OneSignal Expo Plugin: 'iosNSEBundleIdentifier' suffix "${customNSEBundleIdentifier}" is invalid. ` +
          `The suffix cannot contain dots. Apple requires the NSE bundle ID to have only ONE segment after the main app's bundle ID. ` +
          `Example: If your main bundle ID is "${mainBundleIdentifier}", you can use ".CustomNSE" but not ".custom.nse"`
      );
    }

    return `${mainBundleIdentifier}${customNSEBundleIdentifier}`;
  }

  // Otherwise, use it as the full bundle identifier - validate it follows Apple's rules
  if (!customNSEBundleIdentifier.startsWith(mainBundleIdentifier + ".")) {
    throw new Error(
      `OneSignal Expo Plugin: 'iosNSEBundleIdentifier' "${customNSEBundleIdentifier}" is invalid. ` +
        `Apple requires that the NSE bundle ID must start with your main app's bundle ID followed by a dot. ` +
        `Your main app's bundle ID is "${mainBundleIdentifier}", so the NSE bundle ID must start with "${mainBundleIdentifier}."`
    );
  }

  // Extract the part after the main bundle ID
  const extensionPart = customNSEBundleIdentifier.substring(
    mainBundleIdentifier.length + 1
  );

  // Validate that there's only ONE segment after the main bundle ID (no additional dots)
  if (extensionPart.includes(".")) {
    throw new Error(
      `OneSignal Expo Plugin: 'iosNSEBundleIdentifier' "${customNSEBundleIdentifier}" is invalid. ` +
        `Apple requires the NSE bundle ID to have only ONE segment after the main app's bundle ID. ` +
        `Your main app's bundle ID is "${mainBundleIdentifier}", so the NSE bundle ID must be in the format "${mainBundleIdentifier}.SomeName" (without additional dots). ` +
        `Example: "${mainBundleIdentifier}.CustomNSE" is valid, but "${mainBundleIdentifier}.custom.nse" is not.`
    );
  }

  return customNSEBundleIdentifier;
}
